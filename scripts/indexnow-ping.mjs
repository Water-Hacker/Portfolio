#!/usr/bin/env node
/**
 * IndexNow auto-indexing ping — Bing, Yandex, Naver, Seznam, IndexNow.org.
 *
 * Submits every section URL to the IndexNow API so participating search
 * engines re-crawl immediately instead of waiting for their scheduled cycle.
 *
 * Run after every production deploy. The GitHub Actions workflow in
 * .github/workflows/auto-index.yml calls this automatically on push to main.
 *
 * Manual usage:
 *   node scripts/indexnow-ping.mjs
 *
 * Environment variables (all optional):
 *   INDEXNOW_HOST   — host to submit (default: thuramnana.com)
 *   INDEXNOW_KEY    — IndexNow key (default: the value pinned in index.html
 *                     and in public/<key>.txt — keep all three in sync)
 *   INDEXNOW_ENDPOINT — which engine to ping (default: api.indexnow.org,
 *                       which fans out to participating engines)
 */
const HOST = process.env.INDEXNOW_HOST || 'thuramnana.com'
const KEY = process.env.INDEXNOW_KEY || 'thuramnana-2026-sovereign-indexnow-key-1a7b9c3d5e7f9a1b3c5d7e9f1a3b5c7d'
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/IndexNow'

// Every URL on the canonical site that we want re-indexed immediately.
const urls = [
  `https://${HOST}/`,
  `https://${HOST}/#arsenal`,
  `https://${HOST}/#intel`,
  `https://${HOST}/#infrastructure`,
  `https://${HOST}/#library`,
  `https://${HOST}/#vault`,
  `https://${HOST}/#mentorship`,
  `https://${HOST}/#pgp`,
  `https://${HOST}/#contact`,
  `https://${HOST}/sitemap.xml`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/robots.txt`,
  `https://${HOST}/feed.xml`,
]

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
}

async function ping(endpoint) {
  process.stdout.write(`[indexnow] POST ${endpoint} (${urls.length} urls)\n`)
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  const text = await res.text().catch(() => '')
  process.stdout.write(`[indexnow] ← ${res.status} ${res.statusText} ${text ? '— ' + text.slice(0, 200) : ''}\n`)
  if (!res.ok && res.status !== 202 && res.status !== 200) {
    throw new Error(`IndexNow returned ${res.status}`)
  }
}

// IndexNow.org fans out to participating engines, but also pinging direct
// engine endpoints maximises coverage if any engine deprecates the relay.
const endpoints = [
  ENDPOINT,
  // Direct engine endpoints (uncomment / extend as engines publish them):
  // 'https://www.bing.com/indexnow',
  // 'https://yandex.com/indexnow',
  // 'https://searchadvisor.naver.com/indexnow',
  // 'https://search.seznam.cz/indexnow',
]

async function main() {
  for (const ep of endpoints) {
    try {
      await ping(ep)
    } catch (err) {
      process.stderr.write(`[indexnow] ${ep} FAILED: ${err.message}\n`)
    }
  }
}

main().catch((err) => {
  console.error('[indexnow] fatal:', err)
  process.exit(1)
})
