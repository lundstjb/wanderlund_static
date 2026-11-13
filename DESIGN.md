---
name: Wanderlund
description: Warm parchment, serif voice, and a single brass accent for a small Knoxville short-term rental firm.
colors:
  parchment: "#f3efe7"
  linen: "#e8e2d6"
  charcoal: "#2c2c2c"
  graphite: "#5c5c5c"
  brass: "#bb924e"
  brass-light: "#c9a465"
  brass-text: "#7d5f2c"
  on-brass: "#2c2c2c"
  sand-line: "#dcd4c8"
typography:
  display:
    fontFamily: "'Cormorant Garamond', serif"
    fontSize: "clamp(2.5rem, 8vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Cormorant Garamond', serif"
    fontSize: "clamp(2rem, 6vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Cormorant Garamond', serif"
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.01em"
  label:
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0.1em"
rounded:
  card: "1.5rem"
  pill: "99px"
  control: "8px"
spacing:
  section-mobile: "4rem"
  section-desktop: "7rem"
  gutter: "2rem"
  card-padding: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.on-brass}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.brass-light}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.sand-line}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 2rem"
  property-card:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.card}"
    padding: "2rem"
  service-card:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.card}"
    padding: "2rem"
  location-badge:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 1rem"
---

# Design System: Wanderlund

## Overview

**Creative North Star: "The Quiet Concierge"**

The site behaves like a good concierge: attentive, unhurried, never loud. A warm parchment ground, a high-contrast serif voice, and one brass accent create the sense of a small, personally run house rather than a platform. Photography of real rooms carries the emotion, and the interface stays out of its way.

Density is low and generous. Sections breathe (4rem on mobile, 7rem on desktop), cards center their content, and motion is slow and soft. The system supports two equal audiences, guests deciding on a stay and owners judging a manager, with the same calm register for both.

**Key Characteristics:**
- Warm neutral ground with a single metallic accent, used sparingly.
- Serif display type over a light geometric sans for labels and body.
- Pill-shaped actions and generously rounded cards.
- Full-bleed photographic hero with a dark scrim and centered white type.
- Soft lift on hover; no hard edges or heavy shadows.

## Colors

A restrained warm palette: two parchment neutrals, two charcoal text tones, and one brass accent with a deeper hover shade.

### Primary
- **Antique Brass** (#bb924e): the single accent. Primary buttons, eyebrow labels (`sub-header`), card "View Details" links, and service icons. It marks the next action or a category, nothing else.
- **Light Brass** (#c9a465): hover state for brass fills. Charcoal text on it stays above 4.5:1.
- **Text Brass** (#7d5f2c, `--accent-text`): the only brass allowed for text and thin underlines on parchment or linen (5.1:1 on parchment). Card "View Details" links and footer link hovers use it. Antique Brass as text measures 2.50:1 and fails.

### Neutral
- **Parchment** (#f3efe7): page ground, card surfaces on tinted sections, and the translucent sticky header (80% opacity with 10px blur).
- **Linen** (#e8e2d6): alternating section bands (`bg-secondary`) and card fill on parchment sections.
- **Charcoal** (#2c2c2c): headings, logo, and primary text.
- **Graphite** (#5c5c5c): body paragraphs and nav links at rest.
- **Sand Line** (#dcd4c8): 1px borders on cards, header, and menu toggle.
- **White** (#ffffff): headline and subcopy over the hero scrim only.

A dark theme is defined in `global.css` under `[data-theme='dark']` (charcoal ground, parchment text, same brass) but nothing in the site sets that attribute today.

### Named Rules
**The One Brass Rule.** Brass is the only accent and appears only on actions, eyebrows, and icons. Never use it for large fills, backgrounds, or body text.

**The Warm Neutral Rule.** Every neutral leans warm. No cool grays and no pure white or pure black grounds.

## Typography

**Display Font:** Cormorant Garamond (400, 600, 700; serif fallback)
**Body Font:** Montserrat (300, 400, 500, 600; system sans fallback)

**Character:** An elegant, editorial serif sets the voice for headings, and a clean geometric sans handles everything functional. The contrast reads as boutique hospitality rather than booking platform.

### Hierarchy
- **Display** (600, clamp(2.5rem, 8vw, 4.5rem), 1.1): h1 and the hero headline. Hero h1 renders at 500 weight in 90% white.
- **Headline** (600, clamp(2rem, 6vw, 3.5rem), 1.1): h2 section titles, centered in `section-header`.
- **Title** (600, clamp(1.5rem, 4vw, 2.5rem), 1.1): h3 on cards and services; card titles are set at 1.5rem.
- **Body** (400, 1rem, 1.7, 0.01em tracking): paragraphs in Graphite; hero subcopy is 300 weight at 1.25rem.
- **Label** (500, 0.8 to 0.9rem, 0.05 to 0.2em tracking, uppercase): buttons, nav links, eyebrows, card meta, "View Details". Eyebrows track widest (0.2em, 600 weight, brass).

### Named Rules
**The Serif Speaks, Sans Serves Rule.** Serif is for headings and the mobile menu links only. All controls, metadata, and paragraphs are sans.

**The Spaced Caps Rule.** Uppercase is always paired with added letter-spacing (0.05em or more). Never uppercase body-length text.

## Layout

A single centered container (max-width 1140px) with 2rem side padding on desktop, 1.5rem on phones, 1.25rem at 375px and below. Sections stack vertically with 7rem vertical padding on desktop (4rem on mobile) and alternate Parchment and Linen bands for rhythm.

Property listings use an auto-fill grid with a 400px minimum column and a 3rem gap. At 1024px and below, grids collapse to one column and cards, card images, and main images go edge to edge with square corners. The header drops from 90px to 70px, the nav and header CTA hide, and a 44px menu toggle opens a full-screen parchment overlay with centered serif links.

Content in cards and section headers is center-aligned; long-form About copy sits in a two-column text and image grid.

## Elevation & Depth

Flat at rest, lifted on interaction. Depth comes from tonal banding (Parchment against Linen) and 1px Sand Line borders. Shadows appear only on hover.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08)` with `translateY(-8px)`): property cards on hover.
- **Service lift** (`box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1)` with `translateY(-5px)`): service cards on hover.
- **Button glow** (`box-shadow: 0 12px 24px rgba(187, 146, 78, 0.15)` with `translateY(-4px)`): buttons on hover, tinted brass.
- **Header glass** (`backdrop-filter: blur(10px)` over 80% Parchment): sticky header. The location badge uses a 4px blur over 90% Parchment.

### Named Rules
**The Flat-Until-Touched Rule.** No resting shadows. A shadow means the user is interacting with the element.

## Shapes

Soft and rounded. Cards, images inside cards, and containers use a 1.5rem radius (the `--radius` token). Buttons and badges are full pills (99px). Icons sit in 64px circles. The menu toggle uses an 8px radius. At 1024px and below, card radii and side borders are removed so cards run edge to edge.

## Components

### Buttons
- **Shape:** full pill (99px)
- **Primary:** Antique Brass fill, Charcoal uppercase label (0.9rem, 500, 0.05em tracking; 4.9:1 on brass), 1px brass border, padding 0.9rem 2rem. Full width with 1rem vertical padding at 1024px and below.
- **Hover:** lifts 4px with a brass-tinted glow and lightens to Light Brass over 0.4s on a `cubic-bezier(0.165, 0.84, 0.44, 1)` ease.
- **Light (hero secondary):** Parchment fill with Charcoal label, same pill and padding. Pairs with the primary at equal visual weight when two audiences share one action row.
- **Outline:** transparent with a Sand Line border and text. Intended for use over the dark hero scrim; the Sand Line color is low contrast on Parchment.

### Property Card
- **Corner Style:** 1.5rem radius, 1px Sand Line border, Parchment fill.
- **Image:** 4:3 crop, location badge pinned top-left (pill, blurred Parchment, 0.7rem uppercase), image scales to 1.05 on hover over 0.6s.
- **Content:** centered, 2rem padding, serif title at 1.5rem, a row of icon-and-count facts (guests, bedrooms, beds, bathrooms) in 0.8rem uppercase Graphite, then a brass "View Details" link with an arrow that gains an underline on hover.
- **Shadow Strategy:** card lift on hover only.

### Service Card
- **Style:** 1.5rem radius, 1px Sand Line border, 2rem padding. Fill inverts against its section: Linen on Parchment bands, Parchment on Linen bands.
- **Icon:** brass Lucide icon (32px) inside a 64px circle that takes the opposite neutral of the card.
- **Hover:** lifts 5px with the service lift shadow.

### Navigation
- **Style:** sticky 90px glass header with a bottom Sand Line border. Logo is an uppercase 1.25rem sans wordmark with a Lucide home icon. Links are 0.9rem uppercase with 0.1em tracking, Graphite at rest and Charcoal on hover. A brass "Book a Stay" button sits at the right.
- **Mobile:** 44px bordered hamburger that morphs to an X, opening a full-screen Parchment overlay with centered 1.5rem serif links and a full-width brass button.

### Hero
- A full-bleed photograph, 90vh tall, under a bottom-weighted warm-black scrim (82% at the base fading to clear by about 70% of the height), so the room stays visible above the copy. Centered white serif headline, light sans subcopy, and two equal-weight actions (brass primary, parchment light) are anchored to the bottom.

### Booking and Search Widgets
- Hospitable iframes are injected by third-party script (`data-theme="multi"`). Their interior is not styled by this system. Wrap them in the page's card or container language and do not rely on matching their internals. Properties without a Hospitable ID fall back to a full-width brass "Check Availability" button.

## Do's and Don'ts

### Do:
- **Do** keep Antique Brass (#bb924e) to actions, eyebrows, and icons.
- **Do** use Text Brass (#7d5f2c) whenever brass appears as text on a light ground.
- **Do** keep a visible 2px Charcoal focus ring (3px offset) on every interactive element; it turns white over the hero.
- **Do** put Charcoal text on brass fills; white on brass measures 2.86:1 and fails.
- **Do** pair every uppercase label with at least 0.05em letter-spacing.
- **Do** use the 1.5rem card radius and full-pill buttons together; they define the soft silhouette.
- **Do** let real property photography carry emotion, and keep hero imagery under a scrim so white type stays legible.
- **Do** alternate Parchment and Linen section bands and invert card fills against them.
- **Do** reserve shadows for hover and focus responses.

### Don't:
- **Don't** introduce a second accent color or use brass as a large surface or body text color.
- **Don't** use cool grays, pure white, or pure black as page grounds.
- **Don't** set body copy or controls in the serif, or headings in the sans.
- **Don't** add resting drop shadows or hard-edged, square cards on desktop.
- **Don't** flatten hero photography under a uniform dark scrim; keep the image readable above the copy.
- **Don't** put Sand Line outline buttons on a Parchment ground; they lose contrast.
- **Don't** assume a dark theme exists. The tokens are defined but unwired.
