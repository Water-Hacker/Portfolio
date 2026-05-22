#!/usr/bin/env node
/**
 * Refresh <lastmod> across sitemap.xml + Atom feed <updated> + index.html
 * meta date refs, so every build advertises today's date.
 *
 * Why: search engines weight recently-modified URLs higher in re-crawl
 * priority queues. By advancing lastmod on every deploy, we keep the
 * portfolio at the front of every engine's freshness signal — even on
 * builds that don't touch the content corpus.
 *
 * Operates on the source files under public/ before vite copies them into
 * dist/. Idempotent — re-runs that produce the same date are no-ops.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const today = new Date()
const isoDate = today.toISOString().slice(0, 10)
const isoFull = today.toISOString().replace(/\.\d{3}Z$/, 'Z')

function log(msg) { process.stdout.write(`[update-lastmod] ${msg}\n`) }

async function patch(path, replacer) {
  const abs = resolve(ROOT, path)
  const before = await readFile(abs, 'utf8')
  const after = replacer(before)
  if (after !== before) {
    await writeFile(abs, after, 'utf8')
    log(`updated ${path}`)
    return true
  }
  log(`${path}: already current`)
  return false
}

await patch('public/sitemap.xml', (s) =>
  s.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${isoDate}</lastmod>`)
)

await patch('public/feed.xml', (s) =>
  s.replace(/<updated>[^<]+<\/updated>/g, `<updated>${isoFull}</updated>`)
)

await patch('public/llms.txt', (s) =>
  // Refresh the "> ... Last updated:" footer line if present.
  s.replace(/Last updated: \d{4}-\d{2}-\d{2}/g, `Last updated: ${isoDate}`)
)

await patch('public/llms-full.txt', (s) =>
  s.replace(/# Last updated: \d{4}-\d{2}-\d{2}/g, `# Last updated: ${isoDate}`)
)

await patch('public/robots.txt', (s) =>
  s.replace(/# Last updated: \d{4}-\d{2}-\d{2}/g, `# Last updated: ${isoDate}`)
)

await patch('public/.well-known/security.txt', (s) => {
  // Push Expires one year out so the file never goes stale.
  const next = new Date(today)
  next.setUTCFullYear(today.getUTCFullYear() + 1)
  return s.replace(/Expires: [^\n]+/g, `Expires: ${next.toISOString().replace(/\.\d{3}Z$/, 'Z')}`)
})

log(`done — date set to ${isoDate}`)
