import { describe, expect, it } from "vitest";
import type { Property } from "../data/properties";
import {
  analyticsItem,
  isAirbnbUrl,
  isProductionHost,
  itemEventParams,
  leadMethod,
  searchTerm,
} from "./analytics";

describe("isProductionHost", () => {
  it("accepts the live domain only", () => {
    expect(isProductionHost("www.wanderlund.com")).toBe(true);
    expect(isProductionHost("localhost")).toBe(false);
    expect(isProductionHost("wanderlund--preview-abc.web.app")).toBe(false);
  });
});

describe("item events", () => {
  it("builds a GA4 item and event params from a property", () => {
    const property = { slug: "test-flat", title: "Test Flat", nightlyFrom: 250 } as Property;
    const item = analyticsItem(property);
    expect(item).toEqual({ item_id: "test-flat", item_name: "Test Flat", price: 250 });
    expect(itemEventParams(item)).toEqual({ currency: "USD", value: 250, items: [item] });
  });
});

describe("leadMethod", () => {
  it("classifies tel and mailto links", () => {
    expect(leadMethod("tel:+18657121490")).toBe("phone");
    expect(leadMethod("mailto:a@b.com")).toBe("email");
    expect(leadMethod("https://www.wanderlund.com/contact/")).toBeNull();
  });
});

describe("isAirbnbUrl", () => {
  it("matches airbnb.com and its subdomains", () => {
    expect(isAirbnbUrl("https://www.airbnb.com/rooms/123")).toBe(true);
    expect(isAirbnbUrl("https://airbnb.com/rooms/123")).toBe(true);
  });

  it("rejects look-alike hosts and invalid URLs", () => {
    expect(isAirbnbUrl("https://notairbnb.com/rooms/123")).toBe(false);
    expect(isAirbnbUrl("/properties/")).toBe(false);
  });
});

describe("searchTerm", () => {
  it("returns the query string without the leading ?", () => {
    expect(searchTerm("?checkin=2026-12-01&guests=2")).toBe("checkin=2026-12-01&guests=2");
  });

  it("returns null for an empty query and caps length at 100", () => {
    expect(searchTerm("")).toBeNull();
    expect(searchTerm("?" + "a".repeat(150))).toHaveLength(100);
  });
});
