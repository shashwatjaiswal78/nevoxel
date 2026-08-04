# Nevoxel — website

Shore-based maritime recruitment since 2008. A static site built from the brief in
`nevoxel-website-project.md`.

```bash
npm run build     # build once -> dist/
npm run dev       # rebuild on change
npm start         # serve dist/ at http://localhost:4173
```

No dependencies, no install step. Node 18+.

---

## What this replaces

| Problem in the audit | How it's fixed |
|---|---|
| Audience ambiguity | Two named journeys. The home page asks once (dual-path cards) and the header carries both CTAs on every page. |
| WPBakery **and** Elementor | No page builder and no framework. Hand-written HTML composed by a 120-line Node script. |
| Iframe job board | Native board at `/jobs`, server-rendered, filterable, with `JobPosting` schema on every role. An iframe cannot carry that schema on your own domain — this is the main reason it had to go. |
| Seven scattered contact addresses | One routed form. A segment toggle sends candidates to `resume@` and employers to `recruitment@`. |
| Broken slugs and 404s | Clean URLs throughout, a real `/candidates/resume-coaching` page (the old Coaching link 404'd), proper team URLs (the "berry-castle" slug is gone), and a 404 page with job search. |

## Structure

```
src/
  routes.js          every page, in sitemap order — add pages here
  layout.js          <head>, sticky header, footer, per-page SEO
  components.js      reusable sections (bands, cards, job cards, forms…)
  util.js            escaping, date and salary formatting
  content/
    site.js          nav, offices, clients, team, values, testimonials
    jobs.js          job board data
    insights.js      blog, press, events
  pages/             one module per template
  assets/            css, js — copied to dist/ verbatim
dist/                build output — deploy this folder
```

**Editing copy?** Almost everything lives in `src/content/`. You rarely need to touch
`pages/`.

**Adding a page?** Create it in `src/pages/`, then register it in `src/routes.js`. The
sitemap and nav follow automatically. Duplicate URLs throw at build time.

## Design

The visual system is the **Admiralty nautical chart** — chosen because it belongs to the
client's world rather than to recruitment-site convention (navy + container-ship stock
photo + wave dividers).

- **Deep water → shallows → land.** The page descends from sea to shore as you scroll.
  That's the brand thesis as structure, not a slogan. `band({ coast: true })` draws the
  depth-contour boundary — now a navy-to-white transition, which reads the concept even
  more literally than the original cream.
- **Palette — derived from the Nevoxel logo:** white `#ffffff` · navy `#003c5f` · ocean
  `#0090d0` · yellow `#ffd000` · magenta `#de3163` (buttons use `#d02a59`, a near-invisible
  shift that clears WCAG AA as white-on-magenta — the exact logo value sat at 4.44:1,
  just under the 4.5:1 line for 18px bold text). White is the dominant surface, alternating
  with a whisper tint (`#f1f6fa`) so sections separate without hard borders. Navy is both
  the "sea" dark-section colour and the body ink (11.6:1 on white). Ocean is kept as a UI
  accent only — focus rings, links, hover — because it fails as small text on white
  (3.56:1); the darkened `--ocean-ink` (`#0072a8`, 5.29:1) carries links instead. Yellow
  never sits as text on a light surface (1.47:1) — it appears only on navy or as a filled
  chip with navy text (both ≈7.9:1): the award badge, and the shore waypoint in the hero,
  which is deliberately the one "landfall beacon" moment on the page.
  All colour tokens live in `:root` in `site.css`, still under their original chart-era
  names (`--deep`, `--paper`, `--tide`, etc.) with a legend comment mapping each to its
  brand role — swapping the palette again means editing values there, not renaming
  anything through the component rules.
- **Italic = water, roman = land.** Charts label water features in italic and land
  features in roman. The site follows that rule, which is why "*from sea* to shore" is
  set the way it is.
- **Depth soundings** — the scattered numbers over dark sections — are generated
  deterministically, so builds are reproducible.
- **Type:** **Cooper Hewitt** throughout (Chester Jenkins, SIL OFL), self-hosted as woff
  in `src/assets/fonts/` — no external font host, no Google Fonts request. It's the one
  family for the whole site; the legacy `--display` / `--body` / `--mono` token names all
  resolve to it. **Heavy (900)** carries the display headings and **Thin (100)** the large
  pull-quotes, so the named pairing reads as a deliberate contrast. Book (400), Medium
  (500), Semibold (600) and Bold (700) fill the scale; Book Italic keeps the sea→shore
  `<em>` a true italic.

  The type scale lives in `:root` as `--fs-*` / `--lh-*` / `--fw-*` tokens (h1 48 · h2 45 ·
  h3 26 · h4 20 · body 14 · link 16 · button 18). Per the supplied spec, **no uppercase and
  no letter-spacing anywhere** — the old chart-style labels now read as labels through
  weight and size, not caps. Two deliberate deviations from the literal spec, both
  discussed and agreed: long-form article and prose copy stays 16–17px (14px was too tight
  for reading), and buttons take their height from a 54px `min-height` rather than a
  fixed 56px line-height, so padded and icon buttons stay aligned.

  To change the whole system, edit the `:root` type tokens and the `@font-face` block at
  the top of `site.css`. To swap the family, replace the fonts in `src/assets/fonts/`,
  update the `@font-face` `src` URLs and the two `<link rel="preload">` tags in
  `layout.js`, and repoint `--font-primary`.

### CSS convention

`.band` owns **all** section vertical rhythm. No component class sets section-level
top/bottom padding. This is deliberate: it makes it impossible for two selectors to fight
over the gap between sections.

## Accessibility

WCAG 2.1 AA. Verified: all 21 foreground/background pairs across the current brand
palette meet AA — including the deliberate exclusion of yellow and raw ocean blue from
any small-text role, and a magenta-lift tuned to 4.78:1 on navy (its logo-nearest value
sat at 4.43:1, just under the line). Single `<h1>` per page across all 36 pages, visible
focus states (an ocean-blue ring, 3.3–3.6:1 against both navy and white — the WCAG
non-text threshold), keyboard-operable mega-menus with `aria-expanded`, skip link,
semantic landmarks, `prefers-reduced-motion` respected, and a `<noscript>` fallback so the
motion layer can never leave content invisible.

Motion is documented separately in **[MOTION.md](MOTION.md)** — including how to swap in
[Motion](https://motion.dev) or GSAP without touching page markup.

---

## Before launch

These are the deliberate gaps. Nothing here is broken; each is waiting on real content or
a service you need to choose.

### 1. Forms have no backend

`src/assets/js/site.js` validates and reports where a submission *would* go, then stops.
Nothing is sent. Wire `handleSubmit()` to a real endpoint — Formspree, Netlify Forms, or
your own route:

```js
await fetch('https://your-endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), to: ROUTING[segment] }),
});
```

The same applies to the newsletter signup.

### 2. Placeholder content

Marked in the source and visibly flagged in the UI so it cannot ship by accident:

- **Testimonials** (`src/content/site.js`) — three placeholders, rendered with a dashed
  "awaiting client sign-off" badge. The brief supplied no approved quotes. Replace the
  text and delete `isPlaceholder: true`.
- **Press entries** (`src/content/insights.js`) — the Star Women in Maritime 2022 award
  is real; two entries below it are placeholders.
- **Blog articles** — written as genuine editorial so the templates could be reviewed, but
  never published by Nevoxel. Treat as drafts.
- **Job listings** (`src/content/jobs.js`) — realistic sample mandates, not live
  vacancies. Deliberately none is attributed to a named client company.
- **Privacy and Terms** — structurally complete drafts covering the DPDP Act 2023, with
  bracketed fields unfilled. **Not legal advice** — have Adv. Surangama Sharma review them.
- **Phone numbers** — placeholder format. Real numbers weren't in the brief.

### 3. Images

There are none, by design — all artwork is generated SVG, which is faster and more
distinctive than stock photography. Two places expect real assets eventually:

- **Team portraits** render a chart-style monogram card. Add headshots to
  `src/assets/img/team/` and swap `member__initials` for an `<img>` in
  `src/pages/about.js`.
- **Client logos** are set as typographic wordmarks. Reproducing third-party marks needs
  each company's permission and their artwork — get both before switching to images.

### 4. Content cadence

The brief flags that Insights needs a real publishing rhythm. One article a month is
enough to keep the section credible; below that, it reads as abandoned. `/insights/events`
is empty and therefore `noindex` and excluded from the sitemap — add an event and it
indexes itself.

### 5. Analytics

The cookie banner stores consent under `nevoxel-consent` in `localStorage` and sets no
tracking cookies. Load analytics only when the value is `all`, and add the conversion
events the brief asks for (job search, application, form submit, CTA clicks).

## Deploying

Build and upload `dist/`. It's plain static files — Netlify, Vercel, Cloudflare Pages, S3
or ordinary shared hosting all work.

Update `site.origin` in `src/content/site.js` to the production domain **before** the
final build; canonicals, OG tags and `sitemap.xml` are generated from it.

Server config: serve `404.html` for unmatched routes, and make sure clean URLs resolve to
`index.html` (most static hosts do this by default; `serve.js` mirrors the behaviour
locally).
