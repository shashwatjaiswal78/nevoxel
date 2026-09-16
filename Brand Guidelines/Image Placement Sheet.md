# Nevoxel — Image Placement Sheet

**Harbour v1.0 · all 36 routes · density: moderate**

The site currently contains **zero photographs**. Every visual on it is either an inline
SVG or a coloured surface. Harbour specifies photography in detail (§14), so this is an
unfinished part of the design system rather than a stylistic choice.

This sheet is a **sourcing brief**. Nothing is shot or licensed yet, so every slot below
carries a subject brief you can hand to a photographer or a stock researcher. No code has
been changed — these are the places images *can* go, with the exact box each one lands in.

**Total: 42 photographs + 7 vector logos.** See [Phasing](#phasing) — you do not need all
42 to get most of the visual lift.

---

## 1. How to read this sheet

Every slot has an ID (`S1`–`S13`). Use the ID in a shot list so images can be matched back
to a position without describing the page.

| Term | Meaning |
|---|---|
| **Rendered** | The actual CSS pixel box the image occupies, measured on the live site at a 1440px viewport |
| **Min source** | 2× the rendered box, so it stays sharp on a Retina screen. Deliver at least this. |
| **Ratio** | The Harbour ratio for that class of image. Crop to it before delivery — do not rely on CSS cropping. |
| **New assets** | How many *distinct* images the slot needs. Some slots reuse another slot's images. |

Layout arithmetic, for reference: the container is **1240px** with 24px gutters, giving
**1192px** of content width. Column widths follow from that — a 4-up card grid is 286px, a
3-up is 387px, the two dual-path doors are 584px each, and an article column is 760px.

---

## 2. Rules that apply to every image

From Harbour §14. These are not preferences — breaking them is what made the previous
design read as a tech company.

**Subject**

| Class | Ratio | Rule |
|---|---|---|
| Vessels & ports | 16:9 or 21:9 | Real working ships. No renders, no CGI, no data overlays. |
| Crew at work | 3:2 | Faces, PPE, daylight. Candid over posed. No stock handshakes. |
| Portraits | 4:5 | Neutral wall, eye-level, **consistent crop across the whole team**. |

**Treatment**

- Any image carrying text over it gets the navy scrim: `linear-gradient` of `#071426` from
  **94% → 22%** opacity. This already exists in CSS for the home hero.
- Corner radius **12px** on media. Never rounded further.
- **No duotone, no orange wash, no filters.** Keep the grain natural.
- Orange (`#E8541F`) never appears in or over an image. It is reserved for actions.

**Three clichés to reject.** Stock libraries push these hardest for a maritime brief, and
all three are banned by Harbour's first principle:

1. Bow-on container ship at sunset.
2. Businesspeople shaking hands with a port in the background.
3. Globe-with-shipping-routes composite, or anything with an overlaid data graphic.

**Alt text** is literal — vessel type and location, not mood. *"Product tanker alongside at
Jawaharlal Nehru Port"*, never *"a journey of opportunity"*.

**Licensing.** Anything showing an identifiable crew member needs a model release.
Client logos (S4) need each company's written permission **and** their own artwork.

---

## 3. Slot register

| ID | Slot | Ratio | Rendered | Min source | New assets |
|---|---|---|---|---|---|
| **S1** | Home hero background | 16:9 | full-bleed, 760px tall | 2560×1440 | 1 |
| **S2** | Interior page-hero aside | 3:2 | 479×320 | 1440×960 | 9 |
| **S3** | Team portrait | 4:5 | 379×474 | 1200×1500 | 3 |
| **S4** | Client logo *(vector)* | — | ≤120×32 optical | SVG | 7 |
| **S5** | Article cover | 16:9 | 760×428 · 387×218 | 1600×900 | 5 |
| **S6** | Blog lead-post image | 21:9 | 1192×511 | 2400×1030 | reuses S5 |
| **S7** | Service / programme card | 3:2 | 238×159 | 900×600 | 5 |
| **S8** | Dual-path door | 16:9 | 504×284 | 1600×900 | 2 |
| **S9** | Sector tile | 4:3 | 230×172 | 800×600 | 9 |
| **S10** | Full-bleed section break | 21:9 | full-bleed | 2400×1030 | 4 |
| **S11** | Office photo | 3:2 | 381×254 | 1200×800 | 3 |
| **S12** | Leadership credential portrait | 4:5 | 120×150 | reuses S3 | 0 |
| **S13** | Social share image (`og:image`) | 1.91:1 | — | 1200×630 | 1 |

---

## 4. Slot detail

### S1 — Home hero background · 1 image

**Where** `/` — behind the headline. `src/pages/home.js:69`, styled at
`src/assets/css/site.css:1116`.

**Already prepared.** `.hero--home::after` (`site.css:1123`) is *already* the exact navy
scrim Harbour's hero pattern A puts over a vessel photograph, running left-to-right at
94% → 22%. The photo goes behind it; no new CSS is needed for the scrim.

**Brief.** A real vessel alongside at a working berth, golden hour, **no text in frame**.
Product tanker, bulker or gas carrier — not a container ship, which is the cliché. Shoot
or select so the visually quiet part of the frame sits on the **left third**, because the
headline sits there and the scrim is darkest there. The interesting detail — bridge,
cranes, mooring lines — should fall right of centre where the scrim lightens to 22%.

**Crop warning.** The hero is a fixed 760px tall across a full-width viewport, so at
2560px wide it crops to roughly 3.4:1. Keep the subject in the **middle horizontal band**;
anything in the top or bottom sixth of a 16:9 frame will be cut.

**Decision to make.** Harbour's hero A is single-column text over a full-bleed image, with
no aside. The passage-plan drawing currently in the aside can either stay (line work reads
fine over a dark photo) or be dropped. Dropping it is the more faithful reading; keeping it
preserves the layout you liked. Worth judging once the photo exists.

---

### S2 — Interior page-hero aside · 9 images

**Where** The right-hand side of the navy hero on nine destination pages.

**Zero-cost slot.** `pageHero()` already accepts an `aside` parameter
(`src/components.js:304`) and injects it raw at line 313. The CSS for both states already
exists (`site.css:1298–1321`) — with an aside the hero becomes a 1.15fr / 0.85fr grid,
without one it collapses to a single column. **Not one of the 35 interior pages currently
passes an aside.** Measured live: the slot is exactly **479×320** at 3:2.

| # | Page | Subject brief |
|---|---|---|
| 1 | `/employers` | A shore office in use — someone at a fleet-monitoring screen or a whiteboarded vessel schedule. Working, not staged. |
| 2 | `/employers/maritime-recruitment` | Superintendent on deck or in an engine room with PPE, mid-inspection. |
| 3 | `/employers/executive-search` | A quiet, senior setting — a small meeting room, two people, no handshake. Discretion is the message. |
| 4 | `/employers/hr-advisory` | A training or briefing session with crew or shore staff, seated, daylight. |
| 5 | `/candidates` | An officer ashore in office clothes — the transition itself. Avoid uniform. |
| 6 | `/candidates/sea2shore` | The clearest sea-to-shore frame you have: gangway, quayside, or an officer with a bag leaving a vessel. |
| 7 | `/candidates/resume-coaching` | Someone working through a document with another person. Over-shoulder, no eye contact with camera. |
| 8 | `/about` | The Mumbai team at work, or the office itself. This is the company, not a stock proxy. |
| 9 | `/contact` | Mumbai port or the Thane office exterior — a real, locatable place. |

**Treatment.** Radius 12. No scrim needed — no text sits over these.

---

### S3 — Team portraits · 3 images

**Where** `/about/team`. `src/pages/about.js:114` (`memberCard`), styled at
`site.css:2876`.

**Already half-wired.** `.member__portrait` is a flat navy tile with `overflow: hidden`
holding the person's initials. The page even carries a note at `src/pages/about.js:149`
telling the reader to drop headshots into `src/assets/img/team/` — but **that directory
does not exist and no code reads it.** The note is aspirational.

| Person | Role | Suggested filename |
|---|---|---|
| Neetu Jaiswal | Founder & Chief Executive | `neetu-jaiswal.webp` |
| Rajesh Menon | Advisor & Wellness Coach | `rajesh-menon.webp` |
| Adv. Surangama Sharma | Legal Advisor | `surangama-sharma.webp` |

The `slug` field already exists on each team member in `src/content/site.js:154`, so those
filenames match the data with no new naming scheme.

**Brief.** 4:5, neutral wall, eye-level, natural light. The single most important rule:
**the crop must be identical across all three.** Same distance, same eye height, same
background. Three portraits that don't match will look worse than three monograms.

**One note.** The CSS box is currently 4:3 (379×285) while Harbour asks for 4:5. Shoot 4:5
and the ratio can be corrected when the images are wired in.

---

### S4 — Client logos · 7 vector files

**Where** The logo wall, in four places: `trustBar()` on `/`, `/employers` and `/about`,
plus the full wall on `/about/clients` (`src/pages/about.js:199`).

Currently seven typeset wordmarks. Measured cell: **198×78**.

Mitsui O.S.K. Lines · TORM · Aditya Birla Group · Scorpio Marine · Navig8 Group · ATPI ·
MTM Ship Management

**Spec.** Single-colour SVG rendered at slate-400 (`#77848F`), going to navy on hover,
capped at **120×32px optical size**. Vector only — a bitmap logo will look broken beside
the others.

**Blocked on permission.** The site already says so at `src/pages/about.js:205`.
Reproducing a third-party mark needs that company's written permission and their own
artwork. Until then the wordmarks are the correct, honest fallback.

---

### S5 — Article covers · 5 images

**Where** Three positions each, from one file per post:
- The article page itself, below the hero — **760×428**
- `articleCard` thumbnails in 3-up grids — **387×218**
- The blog index grid (`src/pages/insights.js:39`)

One cover propagates widely: the home page shows three, the blog index four, and every
article's "Keep reading" section shows three more.

| Post | Subject brief |
|---|---|
| How to read a sea CV when you have never been to sea | A CV or certificate on a desk, hands present. Documents, not people. |
| The first year ashore is where placements fail | An office interior that reads as *new* to the person in it — a desk, a window, a single figure. |
| Shore-side hiring in 2026: three things moving the market | A port or terminal at scale. This is the market-overview piece. |
| Where women are actually being hired in maritime — and where they are not | A woman in a working maritime role, PPE, candid. Do not stage this one. |
| What a confidential search actually involves | Something quiet and closed — a shut door, an empty meeting room. Restraint is the subject. |

**Note.** Article body paragraphs pass through `esc()` (`src/pages/insights.js:103`), so
inline images inside body copy are not possible without a template change. The cover slot
is the natural home for these.

---

### S6 — Blog lead-post image · 0 new assets

**Where** `/insights/blog`, the hand-rolled oversized lead article at
`src/pages/insights.js:27`.

The lead post is already styled differently from the grid — larger title, no top border. A
21:9 crop of that post's S5 cover across the full **1192px** content width would make the
blog index read as a publication rather than a list. Reuses the S5 file; supply the 16:9
master and crop.

---

### S7 — Service & programme cards · 5 images

**Where** Three card grids, sharing five subjects:
- `/` "Four desks, one specialism" — 4 cards (`src/pages/home.js:116`)
- `/employers` "Three ways we work with you" — 3 cards
- `/candidates` programmes — 2 cards

Rendered image box inside a 4-up card: **238×159**. Small — these carry a subject, not a
scene. One clear object or figure, no wide vistas.

| Subject | Used by |
|---|---|
| Maritime shore recruitment | home, `/employers` |
| Executive search | home, `/employers` |
| HR advisory (NECD) | home, `/employers` |
| Sea2Shore | home, `/candidates` |
| Resume & coaching | `/candidates` |

**Risk to watch.** Four photos above four card titles is the exact composition that reads
as a SaaS feature grid. If in doubt, run these three grids text-only and put the budget
into S1 and S8 instead.

---

### S8 — Dual-path doors · 2 images

**Where** `/` — the two large "Which way are you heading?" cards
(`src/components.js:102`). Measured: 584px cards, **504px** of inner width. Highest-impact
slot after the hero, because these two cards *are* the two-door rule made visible.

| Card | Surface | Brief |
|---|---|---|
| "I want a job ashore" | navy | Crew at work at sea — PPE, daylight, candid. The life being left. |
| "I want to hire" | mist | A shore office or terminal operations room. The place being joined. |

The sea/shore contrast between the two frames is the whole point. Shoot or select them as
a pair, not separately.

---

### S9 — Sector tiles · 9 images ⚠️

**Where** `/employers` sectors section, currently nine text chips via `sectorChips()`
(`src/components.js:140`).

Maritime · Logistics · Energy · Manufacturing · BFSI · Pharma · Technology · IT · Finance

**This is the one place the sheet stretches the design system.** Harbour renders sectors as
**text tags** (§06), not image tiles. Turning them into a photo grid is a deliberate
departure — it will add visual richness and it will move the page a little toward the
generic look Harbour is built to avoid. Flagged so the decision is made knowingly.

**Lower-risk alternative:** keep the nine chips and add **one** 21:9 sector band above them
(reuse an S10 asset). One image instead of nine, no departure from the system.

If you do go with tiles: 4:3, **230×172** rendered, min 800×600, and treat the six
non-maritime sectors carefully — generic office stock for "BFSI" and "IT" is exactly the
material that dilutes a specialist maritime brand.

---

### S10 — Full-bleed section breaks · 4 images

**Where** Four navy `band--shoal` sections that currently break long pages with colour
alone. A photograph behind the existing navy scrim turns each into a breath.

| Page | Band | Brief |
|---|---|---|
| `/` | "Why Nevoxel — Seventeen years on one desk" | Wide port or anchorage, horizon-led, calm. |
| `/employers` | "Brief to placement, then the first year" (`#process`) | Terminal or shipyard at working scale. |
| `/candidates/sea2shore` | "What actually changes" | Open sea from a vessel, or a wake. The thing being left behind. |
| `/about` | Company timeline | Mumbai's working waterfront — place the company geographically. |

**Treatment.** 21:9, min 2400px wide, with the `#071426` 94% → 22% scrim over it, because
all four carry text. These crop hard at wide viewports — keep subjects central.

---

### S11 — Office photos · 3 images

**Where** `/contact`, the three office cards (`src/pages/contact.js:6`). Card measured at
**381px**; image box **381×254** at 3:2.

| Office | Note |
|---|---|
| Mumbai | Head office — the one worth shooting properly |
| Delhi / Noida | North India desk |
| Lucknow | Sourcing centre |

**Brief.** Real interiors or building exteriors. A recognisable, locatable place beats a
tidy stock office — the page already carries an OpenStreetMap embed
(`src/pages/contact.js:65`), so the photographs should feel like the same real addresses.

---

### S12 — Leadership credential portrait · 0 new assets

**Where** `/about`, as a new block. Harbour §09 defines a "leadership credential" device: a
4:5 portrait at **120×150** on navy, beside a pull quote, the person's name and role, and
credential tags.

This is Harbour's designated way of making the experience claim concrete, and `/about` is
the page that makes that claim. Reuses Neetu Jaiswal's S3 portrait — **no new photography**.

---

### S13 — Social share image · 1 image ⚡

**Where** `src/layout.js`, affecting **all 36 routes**.

**This is a live bug, not just a missing image.** Line 297 emits
`<meta name="twitter:card" content="summary_large_image">` — a promise of a large preview
image — but there is **no `og:image` and no `twitter:image` anywhere in the page**. Every
link shared to LinkedIn, WhatsApp or Slack today renders with no picture at all.

**Spec.** 1200×630 exactly. One site-wide default is enough to fix the bug: navy field,
the Nevoxel wordmark, and the "Steering Maritime Talent" line — no photograph required.
Per-page images (article covers for `/insights/blog/*`) can follow later.

**Do this one first.** It is the only item on this sheet that needs no photography, and it
is currently costing you on every share.

---

## 5. Coverage across all 36 routes

Every route in `src/routes.js` is accounted for.

| # | Route | Slots |
|---|---|---|
| 1 | `/` | S1 hero · S8 ×2 doors · S7 ×4 cards · S10 why-band · S5 ×3 via cards · S4 logo wall |
| 2 | `/employers` | S2 · S7 ×3 · S9 ×9 sectors · S10 process band · S4 logo wall |
| 3 | `/employers/maritime-recruitment` | S2 |
| 4 | `/employers/executive-search` | S2 |
| 5 | `/employers/hr-advisory` | S2 |
| 6 | `/candidates` | S2 · S7 ×2 |
| 7 | `/jobs` | — *(search-first by design)* |
| 8–19 | `/jobs/<slug>` ×12 | optional S9 reuse · **no new assets** |
| 20 | `/candidates/sea2shore` | S2 · S10 |
| 21 | `/candidates/resume-coaching` | S2 |
| 22 | `/about` | S2 · S10 timeline · S12 credential · S4 logo wall |
| 23 | `/about/team` | S3 ×3 |
| 24 | `/about/clients` | S4 ×7 |
| 25 | `/insights/blog` | S6 lead · S5 ×4 grid |
| 26–30 | `/insights/blog/<slug>` ×5 | S5 cover each · S5 ×3 in "Keep reading" |
| 31 | `/insights/press` | — |
| 32 | `/insights/events` | — *(empty state, `noindex`)* |
| 33 | `/contact` | S2 · S11 ×3 |
| 34 | `/privacy` | — |
| 35 | `/terms` | — |
| 36 | `/404` | — |
| **all** | every route | **S13** via `src/layout.js` |

The 12 job routes: `marine-superintendent-mumbai`, `technical-superintendent-mumbai`,
`chartering-manager-mumbai`, `hseq-manager-navi-mumbai`, `crewing-manager-mumbai`,
`port-captain-kandla`, `operations-executive-mumbai`, `vetting-superintendent-mumbai`,
`supply-chain-manager-navi-mumbai`, `naval-architect-pune`,
`marine-claims-executive-mumbai`, `digital-product-manager-mumbai`.

The 5 article routes, each taking one S5 cover: `reading-a-sea-cv`, `first-year-ashore`,
`shore-hiring-market-2026`, `women-in-maritime-shore-roles`,
`confidential-search-explained`.

**Three templates cover 20 of the 36 routes** — `servicePage()` (3), `jobDetailPage()` (12)
and `articlePage()` (5). Defining a slot once there fills every page in the family.

---

## 6. What stays text-only, and why

Listed so nobody fills these in later by default.

**Job cards and the 12 job detail pages.** These are data, not brochure. A photo on a job
listing implies a specific vessel or employer we may not be able to show, slows the board,
and dates fast as roles turn over. The optional S9 sector reuse is the only concession, and
it adds no new assets.

**The jobs board hero.** Harbour's hero pattern C is deliberately light and search-first —
a headline, a search field and filter chips. A photograph would push the search below the
fold, which is the one thing that page must not do.

**Outcome cards (`01`–`04`), values cards, differentiators.** These are numbered text
devices. Images turn them into a SaaS feature grid — the exact effect the redesign removed.

**Testimonial slider.** Harbour shows an avatar beside a quote, but all three quotes are
currently placeholders awaiting client sign-off (`isPlaceholder: true` in
`src/content/site.js`). Portraits should wait for real, approved quotes.

**Legal pages and the 404.** Nothing to illustrate.

---

## 7. Phasing

42 images is a real commission. This order front-loads the visual impact.

| Phase | Images | Contents |
|---|---|---|
| **0** | 1, no photography | **S13** social share image — fixes a live bug on every page |
| **1** | 11 | **S1** home hero · **S3** ×3 portraits · **S8** ×2 doors · **S5** ×5 article covers |
| **2** | 9 | **S2** hero asides across the nine destination pages |
| **3** | 12 | **S10** ×4 section bands · **S11** ×3 offices · **S7** ×5 service cards |
| **4** | 9 + 7 | **S9** sector tiles (or the one-band fallback) · **S4** logos once permissions land |

**Phase 0 + 1 is twelve images and delivers most of the lift.** The home hero, the two
doors and three matched portraits change how the site reads more than the remaining thirty
combined.

If a single shooting day is all that is available: Mumbai office and team portraits (S3,
S2 #8, S11 Mumbai), plus one vessel visit for S1, S8 and S10.

---

## 8. Delivery spec

**Format.** WebP for the web files, with the original JPEG/TIFF masters kept separately.
Deliver at the "min source" size or larger; do not upscale.

**Suggested paths.** `build.js:95` copies `src/assets/` to `dist/assets/` verbatim with no
filtering or transformation, so images placed here need **no build change** and are served
at the matching `/assets/img/...` URL.

```
src/assets/img/hero/home-vessel.webp          S1
src/assets/img/hero/employers.webp            S2  (one per page, named by route)
src/assets/img/team/neetu-jaiswal.webp        S3  (filenames match the `slug` field)
src/assets/img/logos/mitsui-osk.svg           S4
src/assets/img/insights/first-year-ashore.webp S5  (filenames match the post `slug`)
src/assets/img/services/executive-search.webp S7
src/assets/img/doors/at-sea.webp              S8
src/assets/img/sectors/maritime.webp          S9
src/assets/img/bands/why-nevoxel.webp         S10
src/assets/img/offices/mumbai.webp            S11
src/assets/img/social/default.png             S13
```

**Per file, supply:** the image, a literal alt-text line, the location and date, the
photographer credit, and the model release where a person is identifiable.

**Not yet wired.** No content object in `src/content/site.js`, `jobs.js` or `insights.js`
currently has an image field, and there is no `src/assets/img/` directory. Dropping files
in will not make them appear on its own — the template work is a separate step, and this
sheet is the specification for it.
