#!/usr/bin/env node
/**
 * Postbuild prerender — captures React-rendered HTML into dist/index.html.
 *
 * Flow:
 *   1. Boots `vite preview` against the freshly-built dist/.
 *   2. Launches Puppeteer (headless Chromium) with window.__PRERENDER__=true
 *      injected before any script runs, so App.jsx skips BootSequence.
 *   3. Waits for network-idle + #root to contain real content.
 *   4. Snapshots full document HTML, strips Puppeteer-runtime artefacts,
 *      and overwrites dist/index.html.
 *   5. Tears the preview server down.
 *
 * Result: bots/LLMs that can't run JS now receive the fully-rendered DOM
 * with every project, section, and aria-attribute already in place.
 * Users with JS get React mounting on the prerendered tree.
 */
import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')
const PORT = 4173
const URL = `http://localhost:${PORT}/`

function log(msg) {
  process.stdout.write(`[prerender] ${msg}\n`)
}

async function startPreview() {
  log('starting vite preview…')
  const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host', 'localhost'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  await new Promise((res, rej) => {
    const timeout = setTimeout(() => rej(new Error('preview server timeout')), 15000)
    proc.stdout.on('data', (b) => {
      if (b.toString().includes('Local:')) {
        clearTimeout(timeout)
        res()
      }
    })
    proc.stderr.on('data', (b) => process.stderr.write(b))
    proc.on('exit', (code) => {
      clearTimeout(timeout)
      rej(new Error(`preview exited with code ${code}`))
    })
  })
  log(`preview ready at ${URL}`)
  return proc
}

async function snapshot() {
  log('launching headless chromium…')
  const launchOpts = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  }
  // Use system Chromium when set (CI tip: leave unset, let Puppeteer use its bundled binary).
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
  }
  const browser = await puppeteer.launch(launchOpts)
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 Prerender (compatible; thuramnana-portfolio-snapshot)')
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true
  })

  log(`navigating to ${URL}…`)
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

  // Wait until React has hydrated and at least the hero <h1> is present
  await page.waitForSelector('h1', { timeout: 15000 })
  // Give framer-motion + canvas one frame to settle
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  await new Promise((r) => setTimeout(r, 250))

  log('extracting rendered HTML…')
  const html = await page.evaluate(() => {
    // Drop any script-injected dev artefacts (react-refresh, vite client)
    document.querySelectorAll('script[src*="@vite"], script[src*="@react-refresh"]').forEach((n) => n.remove())
    return '<!doctype html>\n' + document.documentElement.outerHTML
  })

  await browser.close()
  return html
}

async function main() {
  const indexBefore = await readFile(resolve(DIST, 'index.html'), 'utf8').then((s) => s.length)
  log(`baseline dist/index.html: ${indexBefore} bytes`)

  const preview = await startPreview()
  try {
    const html = await snapshot()
    const target = resolve(DIST, 'index.html')
    await writeFile(target, html, 'utf8')
    log(`wrote ${target} — ${html.length} bytes`)
  } finally {
    preview.kill('SIGTERM')
    log('preview terminated')
  }
}

main().catch((err) => {
  // Soft-fail: the static body in dist/index.html already covers LLM/SEO needs.
  // Prerender is an enhancement, not a blocker. Set PRERENDER_STRICT=1 to enforce.
  console.error('[prerender] FAILED:', err.message)
  if (process.env.PRERENDER_STRICT === '1') {
    process.exit(1)
  }
  console.error('[prerender] continuing — dist/index.html keeps the manual static body')
  process.exit(0)
})
