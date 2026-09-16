# Nevoxel — website

Shore-based recruitment since 2008 — three specialist desks: maritime, logistics and legal.
A static site built from the brief in `nevoxel-website-project.md`.

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
  layout.js          <head>, sticky header, footer, per-page SEO, breadcrumbs
  components.js      reusable sections (bands, cards, job cards, forms…)
  util.js            escaping, date and salary formatting
  content/
    site.js          nav, offices, clients, team, values, testimonials, sectors
    expertise.js     the practice verticals — maritime, logistics, legal
    jobs.js          job board data
    insights.js      blog, press, events
  pages/             one module per template
    expertise.js     the three vertical hubs + the /expertise overview
    policies.js      privacy, terms, 404 — NOT the legal vertical, which is /legal
  assets/            css, js — copied to dist/ verbatim
dist/                build output — deploy this folder
```

**Editing copy?** Almost everything lives in `src/content/`. You rarely need to touch
`pages/`.

**Adding a page?** Create it in `src/pages/`, then register it in `src/routes.js`, **and**
add it to the `nav` array in `src/content/site.js` — the nav is a separate list and is not
derived from the routes. The sitemap follows automatically. Duplicate URLs throw at build
time.

## The three axes

The site is organised on three axes, and keeping them apart is what stops the IA turning
into a matrix:

| Axis | Where it lives | Answers |
|---|---|---|
| **Audience** | `/candidates`, `/employers`, the two door CTAs | "Which one am I?" |
| **Service** | `/employers/*` | "How would you run my vacancy?" |
| **Practice vertical** | `/maritime`, `/logistics`, `/legal` | "Do you know my market?" |

> **Verticals prove expertise. Audiences convert. Services explain method.**

A vertical hub never explains process and never duplicates a service page — that is what
keeps `/maritime` and `/employers/maritime-recruitment` from competing for the same search
terms. The hub is the market and the live roles; the service page is the method.

Verticals are cross-cutting on purpose: **executive search is a service, not a sector**, so
it stays under `/employers` and must not enter the Expertise menu. Energy & Chemicals and
Engineering & Infrastructure are named on `/expertise` as planned for 2027 but have no hub
pages, because neither has a track record to put on one.

**One sector per job.** `sector` in `content/jobs.js` names the desk that runs the mandate,
not the client's industry — a General Counsel role at a shipping company is `sector: 'Legal'`.
Each hub lists the roles matching its own sector, so a role filed twice appears twice, and a
role filed wrongly is invisible to its desk. The board's Sector filter is derived from the
job data, so a new sector value appears in the dropdown with no code change; the editorial
list in `content/site.js` is separate and allowed to differ.

## Design

The visual system is **Harbour v1.0**, the Nevoxel design system
(`Brand Guidelines/Marine recruitment design system-handoff.zip`). It is built to read as
an operating maritime business rather than a software product. Four rules drive it:

1. **Structure over effect.** Rules, borders and grids do the work. No gradient meshes,
   glows, glass panels or animated blobs — those read as tech.
2. **One orange, one job.** Signal orange marks action and nothing else: never body text,
   never headings, never decoration, never a fill larger than a button.
3. **Two doors, always.** Find Jobs (navy) and Hire Talent (orange) appear as a fixed
   pair, in that order — header, hero, mobile drawer, and the closing CTA of every page.
4. **Evidence, not adjectives.** Years, places, clients and credentials carry the
   experience claim, so they are set plainly and ruled rather than dramatised.

- **Palette.** Navy scale `#071426 / #0b1f3a / #173352 / #33455a` for structure and ink;
  slate `#465666 / #5a6876 / #77848f / #a9b3bc` for body and muted text; signal orange
  `#fdede7 / #ff7a47 / #e8541f / #b33f13` for action only; page white, mist `#f4f6f8`,
  border `#e2e6ea` / `#c8d0d8`, success `#1f7a5c`. The target proportion on any full page
  is **white/mist 60% · navy 33% · orange 7%** — if orange is doing more than that, it has
  been spent on something that is not an action.

  Tokens live in `:root` in `site.css`: the raw scales first, then semantic aliases
  (`--paper`, `--ink`, `--sea-fg`, …) that the component rules address. Restating a
  surface means editing a value there, not renaming anything downstream.
- **Type — three families, three jobs.** All three are SIL OFL and self-hosted as variable
  woff2 in `src/assets/fonts/`; no external font host, no Google Fonts request at runtime.
  - **Plus Jakarta Sans** — display and headings, 700/800 only, negative tracking. Never
    body copy.
  - **Onest** — body, leads, UI, forms, labels, buttons. 400/500/600.
  - **JetBrains Mono** — eyebrows, reference numbers and dates. 11px, `0.14em`, uppercase.

  The scale lives in `:root` as `--fs-*` / `--lh-*` / `--fw-*` / `--tracking-*` tokens:
  display-xl 56 · display-l 42 · heading-l 30 · heading-m 20 · body-l 17 · body-m 15 ·
  body-s 13 · eyebrow 11. Buttons are 14/600 with heights SM 40 · MD 48 · LG 56.

  To swap a family, replace the woff2 in `src/assets/fonts/`, update the `@font-face`
  `src` URLs and the `<link rel="preload">` tags in `layout.js`, and repoint `--display`,
  `--body` or `--mono`.
- **Shape and elevation.** Radius 4 inputs · 6 tags · 8 cards · 12 media and hero · full
  rounding for buttons and filter chips only. Elevation is restrained: border first, then
  `--shadow-sm` on cards, `--shadow-md` on hover and dropdowns, `--shadow-lg` on the
  cookie bar. Motion is 160ms for hovers and 240ms for panels; no parallax, no
  scroll-jacking.
- **Section rhythm.** 96px desktop, 56px mobile, on a 1240px container.
  `band({ coast: true })` marks a section that follows a navy one and simply adds a little
  head-room — Harbour draws no divider between sections, because the change of surface
  *is* the break.
- **Imagery.** Harbour's hero pattern A calls for a photograph of a real working vessel
  behind a left-to-right navy scrim (`#071426` at 94% → 22%). Until that photography
  exists the home hero holds the slot with the passage-plan drawing, redrawn as plain
  white line work with the landfall waypoint as the one signal mark. Team portraits are
  4:5, neutral wall, eye-level, consistent crop across the whole team.

### CSS convention

`.band` owns **all** section vertical rhythm. No component class sets section-level
top/bottom padding. This is deliberate: it makes it impossible for two selectors to fight
over the gap between sections.

## Accessibility

WCAG 2.1 AA. Body text never sits lighter than slate-500 on white; on navy, headings are
white at 100% and body at 75–78%. Signal orange appears as small text only at signal-800
on white or signal-400 on navy — never as light-on-light. Focus is a 2px navy ring on
every interactive element, **including orange buttons**, flipping to white on navy
surfaces. Minimum touch target 44px. Single `<h1>` per page across all 44 pages,
keyboard-operable mega-menus with `aria-expanded`, skip link, semantic landmarks,
`prefers-reduced-motion` respected, and a `<noscript>` fallback so the motion layer can
never leave content invisible.

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
- **Desk rosters** (`src/content/expertise.js`) — the "who runs this desk" band on
  `/logistics` and `/legal` carries a visible placeholder flag. The legal desk in particular
  is new: the site records only Adv. Surangama Sharma, and as advisor *to* Nevoxel rather
  than head of a legal recruitment desk. Add the real advisors, then delete
  `isPlaceholder: true`. This is the single biggest blocker on shipping `/legal`.

### 2a. What the Legal vertical still needs

The structure is complete; the evidence is not. In Harbour's terms these are adjectives
waiting to become evidence:

- **Legal clients.** `clients` in `src/content/site.js` is entirely maritime, so
  `C.trustBar()` is deliberately *not* on `/legal` — a shipping logo wall under a legal
  headline borrows proof that isn't there. Add legal clients before adding the trust bar.
- **Legal testimonials.** All three existing quotes are placeholders and none is legal.
- **Legal mandates.** The five roles on the desk are samples (`src/content/jobs.js`).
- **Legal insights.** Posts carry a `category` that is the *audience* axis ("For Employers",
  "Market"), not a sector. There is no way to associate an article with a desk yet. Adding
  an optional `sector` field to `posts` would let each hub surface its own editorial.

### 3. Images

There are none yet. Harbour asks for real photography of working ships and crew — no
renders, no CGI globes, no data overlays — so three places are holding slots until that
exists:

- **Home hero.** Pattern A wants a full-bleed 16:9 vessel photograph, min 2400px wide,
  alongside at golden hour, no text in frame, behind the navy scrim. The passage-plan
  drawing holds the slot in the meantime.
- **Team portraits** render a monogram on flat navy. Shoot at 4:5, neutral wall,
  eye-level, consistent crop across the whole team, then add headshots to
  `src/assets/img/team/` and swap `member__initials` for an `<img>` in
  `src/pages/about.js`.
- **Client logos** are set as typographic wordmarks in the ruled logo wall. Harbour wants
  single-colour SVGs at slate-400, capped at 120×32px optical size. Reproducing
  third-party marks needs each company's permission and their artwork — get both before
  switching to images.

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

**Vercel** is configured in `vercel.json`: build command `node build.js`, output directory
`dist`, no install step, and `trailingSlash: true` so live URLs match the canonical and
sitemap URLs (`/about/team/`). No project settings need changing in the dashboard.

Update `site.origin` in `src/content/site.js` to the production domain **before** the
final build; canonicals, OG tags and `sitemap.xml` are generated from it.

Server config: serve `404.html` for unmatched routes, and make sure clean URLs resolve to
`index.html` (most static hosts do this by default; `serve.js` mirrors the behaviour
locally).
