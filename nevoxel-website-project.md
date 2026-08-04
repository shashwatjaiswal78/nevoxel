# Nevoxel Website Development Project

**Client:** Nevoxel — Mumbai-based maritime (shore-based) recruitment firm
**Positioning:** "Steering Maritime Talent — Shore-based recruitment since 2008"
**Objective:** Rebuild the site around an audience-first structure with two clear journeys (Candidates and Employers), a native job board, routed contact, and a lean, performant, SEO-ready stack.

---

## Part A — Project Overview

The current site suffers from audience ambiguity, a page-builder-heavy stack (WPBakery plus Elementor together), scattered contact addresses, an iframe job board, and legacy broken slugs and 404s. This project resolves those issues through a redesigned information architecture, wireframed page templates, and a fresh design system.

**Primary goals**
- Separate and clarify the two core audiences: Candidates and Employers.
- Replace the iframe job board with a native, filterable board (with JobPosting schema for Google Jobs).
- Consolidate seven scattered contact addresses into one routed form.
- Fix legacy slugs, broken links, and 404 pages.
- Rebuild on a lean stack with an accessible, conversion-focused design system.

---

## Part B — Proposed Sitemap (Information Architecture)

**Principle:** an audience-first structure with two primary journeys (Candidates and Employers), services surfaced in the top nav, and consolidated, action-oriented contact. Clean, human-readable URLs throughout.

| Level 1 (nav) | Level 2 | Suggested URL | Purpose |
|---|---|---|---|
| Home | — | `/` | Positioning + dual CTA (Find Jobs / Hire Talent) + proof. |
| For Employers | Overview / Hire Talent | `/employers` | Value prop for companies hiring. |
| | Maritime Shore Recruitment | `/employers/maritime-recruitment` | Flagship service. |
| | Executive Search | `/employers/executive-search` | CXO / senior search. |
| | HR Advisory (NECD) | `/employers/hr-advisory` | Advisory, wellness, training, TMSA compliance. |
| For Candidates | Overview | `/candidates` | Value prop for job seekers. |
| | Job Board | `/jobs` | Native, filterable listings (replaces iframe). |
| | Sea2Shore Program | `/candidates/sea2shore` | Seafarer transition program. |
| | Resume Help & Coaching | `/candidates/resume-coaching` | Merge Resume Help + a real Coaching page (fixes 404). |
| About | Company / Our Story | `/about` | Since-2008 story, values, differentiators. |
| | Our Team | `/about/team` | Founder + advisors (fix legacy slugs). |
| | Clients & Testimonials | `/about/clients` | Logos, quotes, award. |
| Insights | Blog | `/insights/blog` | Articles (needs fresh content cadence). |
| | Publications & Press | `/insights/press` | Media features, awards. |
| | Interviews / Events | `/insights/events` | Merge Interviews + Events; hide until populated. |
| Contact | — | `/contact` | Routed form (Candidate vs Employer), 3 offices, map. |

**Utility / global:** sticky header with dual CTA buttons; footer with sitemap + social + newsletter; `/privacy`; `/terms`; 404 page with search; XML sitemap + robots; per-page meta & OpenGraph; favicon; cookie consent.

---

## Part C — Wireframe Blueprint (Section by Section)

Text / low-fidelity wireframes describing the layout of each key page, top to bottom. "→" = call-to-action button.

### Global Header (sticky, all pages)
- **Left:** Logo "Nevoxel — Steering Maritime Talent" + favicon.
- **Center:** Nav — For Employers ▾ | For Candidates ▾ | About ▾ | Insights ▾ | Contact.
- **Right:** Two buttons — → "Find Jobs" (outline) + → "Hire Talent" (solid accent). Search icon. Mobile: hamburger.
- **Behavior:** Condenses on scroll; keyboard-accessible mega-menus; visible focus states.

### Home Page
1. **Hero (static, not carousel):** Single headline — "Steering Maritime Talent — Shore-based recruitment since 2008." Sub-line + two CTAs: → Find Jobs · → Hire Talent. Background: one optimised maritime image/video, dark overlay for contrast.
2. **Dual-path cards:** Two large cards side by side — "I want a job" → `/candidates` · "I want to hire" → `/employers`. Removes audience ambiguity immediately.
3. **Trust bar:** Client logos (Mitsui OSK, TORM, Aditya Birla, Scorpio, Navig8, ATPI, MTM) + "Star Women in Maritime 2022" badge + "Since 2008 · 3 offices in India".
4. **Services snapshot:** 3–4 tiles — Maritime Recruitment · Executive Search · HR Advisory (NECD) · Sea2Shore. Each links to its page.
5. **Why Nevoxel:** 3 differentiators as icon cards — Experienced Team · Cost-Effective · Customized Solutions.
6. **Featured jobs:** 3–6 latest roles pulled from the native job board → "See all jobs".
7. **Testimonial slider:** 2–3 short named quotes with company + role.
8. **Insights teaser:** 3 latest blog/press cards → `/insights`.
9. **CTA band:** "Ready to steer your talent?" → Hire Talent · → Find Jobs.
10. **Footer:** See global footer.

### For Employers (Overview)
- **Hero:** "Hire proven shore-based maritime talent." → Book a discovery call.
- **Problem / solution:** Short scannable value prop (speed, niche network, discretion).
- **Service cards:** Maritime Recruitment · Executive Search · HR Advisory (NECD) — each → detail page.
- **Sectors served:** Chips — Maritime, Logistics, Energy, Manufacturing, BFSI, Pharma, Technology, IT, Finance.
- **Process:** 4-step timeline — Brief → Search → Shortlist → Placement + retention support.
- **Proof:** Logos + testimonials specific to hiring clients.
- **Lead form:** Short "Tell us your hiring need" form (routes to recruitment@).

### For Candidates (Overview)
- **Hero:** "Take your maritime career ashore." → Browse jobs · → Get resume help.
- **Job board preview:** Latest roles + filter by function / sector / location → `/jobs`.
- **Sea2Shore card:** Highlight the transition program → detail page.
- **Resume & coaching:** Benefits + → request help (routes to resume@).
- **FAQ:** Common candidate questions (accordion).

### Native Job Board (`/jobs`) — replaces iframe
- **Top:** Search bar + filters — keyword, sector, function, location, seniority.
- **List:** Cards — title, company (or confidential), location, posted date, → View/Apply.
- **Detail:** Full JD, requirements, apply form or ATS handoff; structured data (JobPosting schema) for Google Jobs.
- **Empty state:** If no roles — "No open roles right now — submit your CV / set a job alert."

### Service Detail (template)
- **Hero:** Service name + one-line promise + relevant CTA.
- **What it is:** 2–3 short paragraphs (no wall of text).
- **What you get:** Bullet outcomes / deliverables.
- **NECD / Sea2Shore specifics:** Program highlights as cards where relevant.
- **Proof:** Testimonial + stat.
- **CTA:** Contextual — Book a call / Enquire.

### About + Team + Clients
- **About hero:** "Steering Maritime Talent since 2008." Mission in one sentence.
- **Story:** Founding + growth from recruitment to advisory; timeline graphic.
- **Values:** 5 values as concise cards.
- **Team grid:** Photo cards — Neetu Jaiswal (Founder & CEO), Rajesh Menon (Advisor & Wellness Coach), Adv. Surangama Sharma (Legal Advisor) → clean profile pages (fix "berry-castle" slug).
- **Clients page:** Logo wall + full testimonials + award + press mentions.

### Contact (`/contact`)
- **Intro:** "Talk to us." Segmented tabs — I'm a Candidate | I'm an Employer — routes the form.
- **Form:** Name, email, message + segment (replaces 7 scattered addresses).
- **Offices:** 3 cards — Mumbai (HQ, Thane 400607), Delhi/Noida, Lucknow + phone(s) + map embed.
- **Social:** LinkedIn, Instagram.

### Global Footer (all pages)
- **Col 1:** Brand + tagline + short blurb + social icons.
- **Col 2 — For Candidates:** Jobs, Sea2Shore, Resume & Coaching, Blog.
- **Col 3 — For Employers:** Maritime Recruitment, Executive Search, HR Advisory.
- **Col 4 — Company:** About, Team, Clients, Contact.
- **Bottom bar:** Newsletter signup + © {current year} + Privacy/Terms + "3 offices across India".

---

## Part D — Design System Starting Points

- **Stack:** Rebuild off the page-builder bloat — a lean stack (e.g. headless WP or a modern static/JS framework). One system, not WPBakery + Elementor together.
- **Brand:** Nautical navy + a bright accent (from the logo), generous whitespace, one strong display typeface + a readable body face, consistent 8px spacing grid.
- **Components:** Button system (primary/outline), card, testimonial, logo bar, stat, job card, accordion, segmented form, mega-menu.
- **Performance / SEO baseline:** Single H1 per page, alt text everywhere, meta + OG per page, favicon, XML sitemap, JobPosting schema, image compression + lazy-load, Core Web Vitals budget.
- **Accessibility:** WCAG 2.1 AA — colour contrast, focus states, keyboard nav, semantic landmarks.
- **Conversion:** Dual persistent CTAs, routed contact forms, job alerts/newsletter, analytics events on key actions.
