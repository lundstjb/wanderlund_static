// Submit every URL in the built sitemap to IndexNow (Bing, Yandex, and other
// participating engines) so new and changed pages are recrawled quickly.
//
// Usage (after `npm run build`): node scripts/indexnow.mjs
// The key is public by design; IndexNow verifies it by fetching /<key>.txt.

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const HOST = "www.wanderlund.com";
export const KEY = "24aa0c401cdb92ce4fcd1c952bcd5a48";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * Extract page URLs from sitemap XML.
 * @param {string} xml
 * @returns {string[]}
 */
export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

/**
 * Build the IndexNow request body.
 * @param {string[]} urls
 */
export function indexNowPayload(urls) {
  return {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  };
}

async function main() {
  const urls = sitemapUrls(readFileSync("dist/sitemap-0.xml", "utf8"));
  if (urls.length === 0) throw new Error("No URLs found in dist/sitemap-0.xml");

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(indexNowPayload(urls)),
  });
  console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${res.status}`);
  // 200 = accepted, 202 = accepted pending key verification.
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
