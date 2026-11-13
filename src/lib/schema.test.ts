import { describe, expect, it } from "vitest";
import type { Property } from "../data/properties";
import {
  jsonLdString,
  managementServiceSchema,
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

  it("points the offer at the property page when direct booking is set up", () => {
    const s = vacationRentalSchema({ ...base, hospitablePropertyId: "123" }) as any;
    expect(s.makesOffer.url).toBe("https://www.wanderlund.com/properties/test-flat/");
    expect(s.sameAs).toEqual(["https://www.airbnb.com/rooms/1"]);
  });

  it("points the offer at Airbnb when there is no direct booking widget", () => {
    const s = vacationRentalSchema(base) as any;
    expect(s.makesOffer.url).toBe("https://www.airbnb.com/rooms/1");
  });

  it("omits amenityFeature when there are no amenities", () => {
    const s = vacationRentalSchema({ ...base, amenities: [] }) as any;
    expect(s.containsPlace).not.toHaveProperty("amenityFeature");
  });
});

describe("managementServiceSchema", () => {
  it("describes the Knoxville management service and links to the organization", () => {
    const s = managementServiceSchema() as any;
    expect(s["@type"]).toBe("Service");
    expect(s.url).toBe("https://www.wanderlund.com/services/");
    expect(s.provider["@id"]).toBe(organizationSchema()["@id"]);
    expect(s.areaServed.name).toBe("Knoxville, TN");
    const names = s.hasOfferCatalog.itemListElement.map(
      (o: any) => o.itemOffered.name,
    );
    expect(names).toEqual([
      "Listing Management",
      "Dynamic Pricing",
      "Guest Services",
      "Professional Turnover",
      "Routine Inspections",
      "Financial Reporting",
    ]);
  });
});

describe("jsonLdString", () => {
  it("escapes < so text cannot close the script tag", () => {
    const out = jsonLdString({ description: "</script><b>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).description).toBe("</script><b>");
  });
});
