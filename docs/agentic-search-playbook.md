# Agentic Search Playbook

Owner tasks for getting Wanderlund found and cited by AI assistants (ChatGPT, Claude, Gemini, Perplexity). Work top to bottom. Each item says what "done" looks like and what to send back so the site can be updated.

## Canonical business details

Use these exact values on every listing. Assistants cross-check sources, and mismatches weaken the match.

| Field | Value |
|---|---|
| Name | Wanderlund |
| Phone | +1 (865) 712-1490 |
| Website | https://www.wanderlund.com |
| Service area | Knoxville, TN |
| Street address | Hidden (service-area business) |
| Primary category | Property management company |
| Secondary category | Vacation home rental agency |
| Short description | Boutique vacation rentals and full-service short-term rental management in Knoxville, Tennessee. A deliberately small, local firm that limits how many properties it manages. |

## Phase 1: Foundations (week 1)

- [ ] **Business email on wanderlund.com.** Set up a mailbox on the domain (for example `hello@wanderlund.com`) through your email host.
  - Done when: it sends and receives.
  - Send back: the address. The schema, `llms.txt`, and footer get updated to match before any listings go live, so every listing uses the new address from day one.
- [ ] **Google Search Console.** Confirm the `www.wanderlund.com` property is verified and the sitemap (`/sitemap-index.xml`) is submitted.
  - Done when: Search Console shows the sitemap as "Success."
- [ ] **Bing Webmaster Tools.** Sign in at bing.com/webmasters. The fastest path is "Import from Google Search Console."
  - Done when: the site shows as verified and the sitemap is submitted.
  - Send back: if Bing asks for a meta tag or XML file instead of the import, send the code and it goes into the site.

## Phase 2: Business listings (weeks 1 to 2)

- [ ] **Google Business Profile.** Create the profile for the management company, not for the individual rentals (Google's guidelines exclude individual vacation rental units). Set it up as a service-area business so the street address stays hidden. Add 10 or more real photos, the description above, and the website.
  - Done when: the profile is verified and public.
  - Send back: the profile's share link (for `sameAs` in the schema).
- [ ] **Bing Places for Business.** Import from Google Business Profile once it is verified. This one matters most for ChatGPT.
  - Done when: the listing is published.
  - Send back: the listing URL.
- [ ] **Apple Business Connect.** Claim the business so Siri and Apple Maps return it.
  - Done when: the place card is live.
- [ ] **Social profiles.** Make sure an Instagram or Facebook page exists with the same name, phone, and website.
  - Send back: the profile URLs.
- [ ] **Visit Knoxville.** Ask about a listing in their lodging or partner directory. Confirm whether it requires a paid membership before committing.
  - Done when: listed, or decided against with a reason.

## Phase 3: Content inputs (weeks 2 to 3)

Each item unblocks one page. Rough notes are fine; the pages get drafted from them.

- [ ] **Vols game-day guide.** For each property: walk time and drive time to Neyland Stadium, where guests park on game day, and anything you tell guests about game-day traffic.
- [ ] **Neighborhood guide.** A few sentences each on Old City, Market Square and downtown, and South Knoxville: who each suits, what is walkable, what is loud.
- [ ] **Group and wedding stays.** Venues your guests have stayed for, and whether two units are ever booked together for one group.
- [ ] **About page.** Your name, a short bio, the year Wanderlund started, and the property cap you hold to (a number, if you are willing to publish one).
- [ ] **Reviews and FAQs.** Approve a read-only pull of real guest reviews and house details (check-in, parking, stairs, pets) from Hospitable for the property pages.
- [ ] **Map coordinates.** For each property, approve publishing neighborhood-level coordinates (rounded to about 1 km, never the exact address). Send the property addresses privately, or the rounded coordinates directly.

## Phase 4: Reputation and partners (ongoing)

- [ ] **Partner outreach.** Review the drafted outreach list and emails (wedding venues, hospital travel-nurse coordinators, UT visitor resources), edit, and send the ones you are comfortable with.
  - Done when: each partner is marked sent, replied, or declined.
- [ ] **Reddit and local forums.** When someone asks where to stay in Knoxville or for a game, answer as yourself and disclose that you run Wanderlund. Aim for genuinely useful answers; link only when it fits. Subreddits: r/Knoxville, r/ockytop.
- [ ] **Owner communities.** Join the local real estate investor association and the Knoxville Chamber, and answer management questions on BiggerPockets under your name.
- [ ] **Review requests.** After each good stay, ask guests to leave a Google review in addition to the platform review.

## Phase 5: Measure (monthly)

- [ ] **Crawler report.** Run `python3 scripts/crawler_report.py --days 30` and note which AI crawlers are visiting.
- [ ] **Prompt panel.** Ask ChatGPT, Claude, Gemini, and Perplexity the same set of questions (for example "best vacation rental near Neyland Stadium" and "short-term rental management companies in Knoxville"). Record whether Wanderlund appears and which sources they cite.
