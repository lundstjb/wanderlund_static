import type { Property } from "../data/properties";

export const SITE = "https://www.wanderlund.com";
const ORG_ID = `${SITE}/#organization`;

type JsonLd = Record<string, unknown>;

const KNOXVILLE_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Knoxville",
  addressRegion: "TN",
  addressCountry: "US",
};

/** Absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE).toString();
}

/** Schema.org LocalBusiness for Wanderlund, included on every page. */
export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: "Wanderlund",
    url: `${SITE}/`,
    description:
      "Boutique vacation rentals and full-service short-term rental property management in Knoxville, Tennessee.",
    telephone: "+1-865-712-1490",
    email: "wanderlundventures@gmail.com",
    address: KNOXVILLE_ADDRESS,
    areaServed: { "@type": "City", name: "Knoxville, TN" },
  };
}

/** Same for every property in Hospitable (4:00 PM in, 10:00 AM out). */
const CHECKIN_TIME = "16:00:00";
const CHECKOUT_TIME = "10:00:00";

const MANAGEMENT_SERVICES = [
  "Listing Management",
  "Dynamic Pricing",
  "Guest Services",
  "Professional Turnover",
  "Routine Inspections",
  "Financial Reporting",
];

/** Schema.org Service for the property management offering on /services/. */
export function managementServiceSchema(): JsonLd {
  const url = absoluteUrl("/services/");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Short-term rental property management in Knoxville, TN",
    serviceType: "Short-term rental property management",
    description:
      "Full-service Airbnb and VRBO management for furnished residential properties in Knoxville, Tennessee.",
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Knoxville, TN" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Property management services",
      itemListElement: MANAGEMENT_SERVICES.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

/** Schema.org VacationRental for a single property page. */
export function vacationRentalSchema(property: Property): JsonLd {
  const url = absoluteUrl(`/properties/${property.slug}/`);
  const accommodation: JsonLd = {
    "@type": "Accommodation",
    additionalType: "EntirePlace",
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: property.guests },
  };
  if (property.amenities.length > 0) {
    accommodation.amenityFeature = property.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    }));
  }

  // Google's vacation rental markup reads top-level latitude/longitude; geo is kept for other consumers.
  const geo = property.geo
    ? { ...property.geo, geo: { "@type": "GeoCoordinates", ...property.geo } }
    : {};

  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    ...geo,
    "@id": `${url}#rental`,
    identifier: property.slug,
    name: property.title,
    url,
    description: property.description,
    image: property.images.map(absoluteUrl),
    address: KNOXVILLE_ADDRESS,
    priceRange: `From $${property.nightlyFrom}/night`,
    checkinTime: CHECKIN_TIME,
    checkoutTime: CHECKOUT_TIME,
    brand: { "@type": "Brand", name: "Wanderlund" },
    parentOrganization: { "@id": ORG_ID },
    sameAs: [property.airbnbUrl],
    containsPlace: accommodation,
    makesOffer: {
      "@type": "Offer",
      url: property.hospitablePropertyId ? url : property.airbnbUrl,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        minPrice: property.nightlyFrom,
        priceCurrency: "USD",
        unitText: "night",
      },
    },
  };
}

/** Serialize JSON-LD for a <script> tag, escaping "<" so content cannot close the tag. */
export function jsonLdString(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
