// Checks a deployed (or local) site:
//   1. every internal link reachable from / returns 200 (after redirects);
//   2. optionally, every old URL in a JSON file returns 200, or a 301 to its new URL
//      (useful when moving from another site). The file is a list of
//      { "old": "/old-path", "new": "/new-path" }; use the same path twice for "still 200".
// Exits 1 if anything fails.
//
// Usage: node scripts/check-urls.mjs https://example.com [old-urls.json]
//        node scripts/check-urls.mjs http://localhost:4321
// For a protected Vercel preview, set VERCEL_BYPASS to a Protection Bypass for Automation token.
import { readFileSync } from 'node:fs';

const [site, oldUrlsFile] = process.argv.slice(2);
const base = (site ?? '').replace(/\/$/, '');
if (!base) throw new Error('Pass the site to check, e.g. node scripts/check-urls.mjs http://localhost:4321');

const headers = process.env.VERCEL_BYPASS ? { 'x-vercel-protection-bypass': process.env.VERCEL_BYPASS } : {};
const get = (path, redirect = 'follow') => fetch(base + path, { headers, redirect });
const failures = [];
const fail = (message) => (failures.push(message), console.log(`FAIL ${message}`));

for (const { old, new: target } of oldUrlsFile ? JSON.parse(readFileSync(oldUrlsFile, 'utf8')) : []) {
  const response = await get(old, 'manual');
  if (response.status === 200 && old === target) {
    console.log(`ok   ${old}`);
    continue;
  }
  const location = response.headers.get('location');
  if (response.status !== 301 || !location || new URL(location, base).pathname !== target) {
    fail(`${old}: expected ${old === target ? '200' : `301 to ${target}`}, got ${response.status}${location ? ` to ${location}` : ''}`);
    continue;
  }
  const final = await get(target);
  if (final.status === 200) console.log(`ok   ${old} -> ${target}`);
  else fail(`${old} -> ${target}: target returned ${final.status}`);
}

// Crawl internal links breadth-first from the home page.
const seen = new Set(['/']);
const queue = ['/'];
while (queue.length) {
  const path = queue.shift();
  const response = await get(path);
  if (response.status !== 200) {
    fail(`link ${path}: ${response.status}`);
    continue;
  }
  if (!response.headers.get('content-type')?.includes('text/html')) continue;
  for (const [, href] of (await response.text()).matchAll(/href="(\/[^"#]*)/g)) {
    if (!seen.has(href)) seen.add(href), queue.push(href);
  }
}
console.log(`crawled ${seen.size} internal URLs`);

if (failures.length) {
  console.log(`\n${failures.length} failed`);
  process.exit(1);
}
