import { describe, expect, it } from "vitest";
import type { Property } from "../data/properties";
import { llmsFull, llmsSummary } from "./llms";

const base: Property = {
  id: "1",
  isActive: true,
  slug: "test-flat",
  title: "Test Flat",
  location: "Knoxville, TN",
  nightlyFrom: 250,
  guests: 6,
  bedrooms: 2,
  beds: 3,
  bathrooms: 1,
  image: "/images/a.jpg",
  images: ["/images/a.jpg"],
  description: "A long description of the flat.",
  amenities: ["Wi-Fi", "Free Parking"],
  airbnbUrl: "https://www.airbnb.com/rooms/1",
  hospitablePropertyId: "abc",
};

const inactive: Property = { ...base, slug: "hidden-flat", title: "Hidden Flat", isActive: false };

describe("llmsSummary", () => {
  it("lists active properties and links to the full version", () => {
    const text = llmsSummary([base, inactive]);
    expect(text).toContain("[Test Flat](https://www.wanderlund.com/properties/test-flat/)");
    expect(text).toContain("2 bedrooms, 1 bathroom, sleeps 6");
    expect(text).toContain("https://www.wanderlund.com/llms-full.txt");
    expect(text).not.toContain("Hidden Flat");
  });
});

describe("llmsFull", () => {
  it("includes full descriptions, bed counts, and service pricing", () => {
    const text = llmsFull([base]);
    expect(text).toContain("### Test Flat");
    expect(text).toContain("A long description of the flat.");
    expect(text).toContain("3 beds");
    expect(text).toContain("Book direct: https://www.wanderlund.com/properties/test-flat/");
    expect(text).toContain("Management Fee:");
  });

  it("falls back to the Airbnb link when there is no direct booking ID", () => {
    const text = llmsFull([{ ...base, hospitablePropertyId: undefined }]);
    expect(text).toContain("Book on Airbnb: https://www.airbnb.com/rooms/1");
  });

  it("omits inactive properties", () => {
    expect(llmsFull([inactive])).not.toContain("Hidden Flat");
  });
});
