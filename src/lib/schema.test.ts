import { describe, expect, it } from "vitest";
import type { Property } from "../data/properties";
import {
  jsonLdString,
  organizationSchema,
  vacationRentalSchema,
} from "./schema";

const base: Property = {
  id: "1",
  isActive: true,
  slug: "test-flat",
  title: "Test Flat",
  location: "Knoxville, TN",
  nightlyFrom: 250,
  guests: 6,
  bedrooms: 2,
  beds: 2,
  bathrooms: 2,
  image: "/images/a.jpg",
  images: ["/images/a.jpg", "/images/b.jpg"],
  description: "A nice place.",
  amenities: ["Wi-Fi", "Free Parking"],
  airbnbUrl: "https://www.airbnb.com/rooms/1",
};

describe("vacationRentalSchema", () => {
  it("maps a property to VacationRental fields", () => {
    const s = vacationRentalSchema(base) as any;
    expect(s["@type"]).toBe("VacationRental");
    expect(s.url).toBe("https://www.wanderlund.com/properties/test-flat/");
    expect(s.image).toEqual([
      "https://www.wanderlund.com/images/a.jpg",
      "https://www.wanderlund.com/images/b.jpg",
    ]);
    expect(s.containsPlace.numberOfBedrooms).toBe(2);
    expect(s.containsPlace.occupancy.maxValue).toBe(6);
    expect(s.containsPlace.amenityFeature).toHaveLength(2);
    expect(s.makesOffer.priceSpecification.minPrice).toBe(250);
    expect(s.parentOrganization["@id"]).toBe(organizationSchema()["@id"]);
  });

  it("omits amenityFeature when there are no amenities", () => {
    const s = vacationRentalSchema({ ...base, amenities: [] }) as any;
    expect(s.containsPlace).not.toHaveProperty("amenityFeature");
  });
});

describe("jsonLdString", () => {
  it("escapes < so text cannot close the script tag", () => {
    const out = jsonLdString({ description: "</script><b>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).description).toBe("</script><b>");
  });
});
