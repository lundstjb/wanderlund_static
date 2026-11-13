import type { APIRoute } from "astro";
import { properties } from "../data/properties";

const SITE = "https://www.wanderlund.com";

/** Plain-text site summary for AI agents, generated from property data. */
export const GET: APIRoute = () => {
  const listings = properties
    .filter((p) => p.isActive)
    .map(
      (p) =>
        `- [${p.title}](${SITE}/properties/${p.slug}/): ${p.location}. ` +
        `${p.bedrooms} bedrooms, ${p.bathrooms} bathroom${p.bathrooms === 1 ? "" : "s"}, sleeps ${p.guests}. ` +
        `From $${p.nightlyFrom}/night. Amenities: ${p.amenities.join(", ")}. ` +
        (p.hospitablePropertyId
          ? `Book direct: ${SITE}/properties/${p.slug}/ (also on Airbnb: ${p.airbnbUrl})`
          : `Book on Airbnb: ${p.airbnbUrl}`),
    )
    .join("\n");

  const body = `# Wanderlund

> Wanderlund manages boutique short-term vacation rentals in Knoxville, Tennessee, and offers full-service property management to Knoxville owners.

## Vacation rentals

${listings}

## Property management services

- [Management Services](${SITE}/services/): Full-service short-term rental management for furnished residential properties in Knoxville. Covers Airbnb and VRBO listing management, dynamic pricing, guest services, turnover cleaning, routine inspections, and monthly financial reporting. Fees: a percentage management fee on the accommodation rate, a one-time onboarding fee, and a flat monthly supply fee.
- [About](${SITE}/about/): A small, hands-on firm that limits how many properties it manages.

## Contact

- [Contact](${SITE}/contact/)
- Phone: +1 (865) 712-1490
- Email: wanderlundventures@gmail.com
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
