import type { Property } from "../data/properties";
import { SITE } from "./schema";

const INTRO = `# Wanderlund

> Wanderlund manages boutique short-term vacation rentals in Knoxville, Tennessee, and offers full-service property management to Knoxville owners.`;

const CONTACT = `## Contact

- [Contact](${SITE}/contact/)
- Phone: +1 (865) 712-1490
- Email: wanderlundventures@gmail.com`;

function bathLabel(n: number): string {
  return `${n} bathroom${n === 1 ? "" : "s"}`;
}

function bookingLine(p: Property): string {
  return p.hospitablePropertyId
    ? `Book direct: ${SITE}/properties/${p.slug}/ (also on Airbnb: ${p.airbnbUrl})`
    : `Book on Airbnb: ${p.airbnbUrl}`;
}

/** Short llms.txt index: one line per active property plus service links. */
export function llmsSummary(properties: Property[]): string {
  const listings = properties
    .filter((p) => p.isActive)
    .map(
      (p) =>
        `- [${p.title}](${SITE}/properties/${p.slug}/): ${p.location}. ` +
        `${p.bedrooms} bedrooms, ${bathLabel(p.bathrooms)}, sleeps ${p.guests}. ` +
        `From $${p.nightlyFrom}/night. Amenities: ${p.amenities.join(", ")}. ` +
        bookingLine(p),
    )
    .join("\n");

  return `${INTRO}

Full text version: ${SITE}/llms-full.txt

## Vacation rentals

${listings}

## Property management services

- [Management Services](${SITE}/services/): Full-service short-term rental management for furnished residential properties in Knoxville. Covers Airbnb and VRBO listing management, dynamic pricing, guest services, turnover cleaning, routine inspections, and monthly financial reporting. Fees: a percentage management fee on the accommodation rate, a one-time onboarding fee, and a flat monthly supply fee.
- [About](${SITE}/about/): A small, hands-on firm that limits how many properties it manages.

${CONTACT}
`;
}

/** Long-form llms-full.txt: full property details and service copy in one document. */
export function llmsFull(properties: Property[]): string {
  const listings = properties
    .filter((p) => p.isActive)
    .map(
      (p) => `### ${p.title}

- URL: ${SITE}/properties/${p.slug}/
- Location: ${p.location}
- Sleeps ${p.guests}. ${p.bedrooms} bedrooms, ${p.beds} beds, ${bathLabel(p.bathrooms)}.
- Nightly rate: from $${p.nightlyFrom} before taxes and fees.
- Amenities: ${p.amenities.join(", ")}
- ${bookingLine(p)}

${p.description}`,
    )
    .join("\n\n");

  // Service and about copy mirrors src/pages/services.astro and about.astro.
  // Update both places when that copy changes.
  return `${INTRO}

## Vacation rentals

All rentals are entire homes in Knoxville, Tennessee, managed by Wanderlund. Rates are starting prices before taxes and fees; exact totals depend on dates.

${listings}

## Property management services

Source: ${SITE}/services/

Wanderlund provides full-service short-term rental management for furnished residential properties in Knoxville.

- Listing Management: Professional listings on Airbnb and VRBO, including photography and direct booking options.
- Dynamic Pricing: Demand-based pricing to capture peak market rates and maximize occupancy.
- Guest Services: Round-the-clock support, automated check-in, and customized digital guidebooks for every stay.
- Professional Turnover: Coordination of cleaning, laundry, and property staging.
- Routine Inspections: Regular walkthroughs so appliances and features stay in good condition.
- Financial Reporting: Detailed monthly statements and real-time booking information.

### Pricing

- Management Fee: A percentage of the accommodation rate, net of taxes and platform fees.
- Onboarding Fee: A one-time setup fee covering photography, portal integration, and guidebook publishing.
- Supply Fee: A flat monthly rate to keep the property stocked with essential amenities.

### Owner perks

- Unlimited Personal Use: Owners keep full access for personal stays with no blackout dates.
- Maintenance Authority: Minor repairs are handled immediately to protect the property and the guest experience.
- Inventory Support: The property stays stocked with essentials like paper products, coffee, and soaps.

## About Wanderlund

Source: ${SITE}/about/

Wanderlund is a Knoxville-based firm that manages boutique vacation stays in the city's most desirable neighborhoods, concentrated in Old City and downtown. It is deliberately not a high-volume management company: it limits how many properties it represents so each one gets individual strategy and hands-on oversight, and it accepts properties that meet its standards for design, comfort, and local character. Its team is local, with people on the ground in Knoxville.

${CONTACT}
`;
}
