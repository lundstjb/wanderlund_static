# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences with equal weight, each needing its own path through the site.

- Guests: travelers booking a short stay in Knoxville, TN (weekend getaways, University of Tennessee sporting events, weddings, general visits). They compare properties and book directly or through Airbnb.
- Property owners: people who own furnished residential property in Knoxville and want rental income without operating it. They evaluate whether Wanderlund is the right manager.

## Product Purpose

Wanderlund is a small short-term rental management firm in Knoxville, TN. The site does two jobs: it drives direct bookings for the properties Wanderlund manages, and it wins new owner clients for full-service management. Success is direct bookings taken, and qualified owner inquiries through the contact page.

## Positioning

Wanderlund is a deliberately capped, hands-on firm, not a high-volume manager. It limits how many properties it represents so each gets individual strategy and oversight, backed by a local Knoxville presence. It accepts properties that meet its standards for design, comfort, and local character. A large management company cannot truthfully claim a capped portfolio.

## Operating Context

- Properties are in Knoxville, TN, concentrated in Old City and downtown.
- Direct booking runs through an embedded Hospitable widget. Properties without a Hospitable ID fall back to an Airbnb link.
- Owners are served through listing management on Airbnb and VRBO, dynamic pricing, guest services, turnover coordination, inspections, and monthly reporting.
- The site is a static Astro build deployed to Firebase Hosting.

## Capabilities and Constraints

- Static site: no server runtime. Booking and search depend on third-party Hospitable widgets that inject iframes, so widget script tags must stay inline.
- Property data lives in `src/data/properties.ts` (price from, guests, bedrooms, beds, bathrooms, amenities, photos, Airbnb URL, optional Hospitable ID).
- Pages: home, properties index and detail, search, services, about, contact. Structured data and `llms.txt` support search and AI discovery for Knoxville short-term rental queries.
- Nightly rates are "from" prices before taxes and fees.

## Brand Commitments

Name: Wanderlund. Voice on existing copy is hospitality-minded and owner-focused: "stewardship, not mass management," "precision over scale."

## Evidence on Hand

- Property photography for Jackson Flat (Old City), White Lily, and other listings under `public/images/properties/`.
- Guest reviews and ratings exist (on Airbnb or the direct-booking platform) but are not yet in the repo. Capture real ones before displaying them.
- Owner results (occupancy, revenue, testimonials) exist but are not yet in the repo. Capture real figures and wording before use.
- Do not fabricate reviews, ratings, owner figures, or portfolio counts. Use only what the owner supplies.

## Product Principles

1. Serve guests and owners with equal care, with a clear separate path for each.
2. Let the capped portfolio and local presence carry the argument, with specifics over claims.
3. Show proof only when it is real and supplied.
4. Keep the path to booking or inquiry short, and never let a third-party widget dead-end a visitor.
5. Stay discoverable: content should answer Knoxville short-term rental questions directly.
