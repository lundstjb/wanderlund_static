import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HOST, KEY, indexNowPayload, sitemapUrls } from "./indexnow.mjs";

describe("sitemapUrls", () => {
  it("extracts every <loc> from a single-line sitemap", () => {
    const xml =
      '<?xml version="1.0"?><urlset><url><loc>https://www.wanderlund.com/</loc></url>' +
      "<url><loc>https://www.wanderlund.com/about/</loc></url></urlset>";
    expect(sitemapUrls(xml)).toEqual([
      "https://www.wanderlund.com/",
      "https://www.wanderlund.com/about/",
    ]);
  });

  it("returns an empty list when the sitemap has no URLs", () => {
    expect(sitemapUrls("<urlset></urlset>")).toEqual([]);
  });
});

describe("indexNowPayload", () => {
  it("points keyLocation at the key file served from public/", () => {
    const p = indexNowPayload(["https://www.wanderlund.com/"]);
    expect(p.host).toBe(HOST);
    expect(p.keyLocation).toBe(`https://${HOST}/${KEY}.txt`);
    expect(readFileSync(`public/${KEY}.txt`, "utf8")).toBe(KEY);
  });
});
