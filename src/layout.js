/**
 * Page shell: <head> meta, sticky header, global footer.
 *
 * Every page goes through `page()`. Per-page meta, OpenGraph and JSON-LD are
 * passed in rather than hardcoded, so the SEO baseline in the brief holds
 * automatically across all routes.
 */

const { site, nav } = require('./content/site');
const { esc, attr } = require('./util');

/* ------------------------------------------------------------------ favicon */
// Cropped from the real Nevoxel mark (Brand Guidelines/Nevoxel Logo.png) —
// icon only, tight-cropped and padded to a square. See
// src/assets/img/logo/nevoxel-icon.png for the full-resolution master.
const FAVICON_BASE = '/assets/favicon';

/* ------------------------------------------------------------------- header */

function navItem(item, currentPath) {
  const isCurrent =
    currentPath === item.url ||
    (item.children && item.children.some((c) => c.url === currentPath)) ||
    (item.url !== '/' && currentPath.startsWith(item.url + '/'));

  if (!item.children) {
    return `<li class="nav__item">
      <a class="nav__link${isCurrent ? ' is-current' : ''}" href="${attr(item.url)}"${
        isCurrent ? ' aria-current="page"' : ''
      }>${esc(item.label)}</a>
    </li>`;
  }

  const id = 'menu-' + item.label.toLowerCase().replace(/[^a-z]+/g, '-');

  const links = item.children
    .map(
      (child) => `<li>
        <a class="mega__link${child.url === currentPath ? ' is-current' : ''}" href="${attr(
        child.url
      )}">
          <span class="mega__label">${esc(child.label)}</span>
          <span class="mega__note">${esc(child.note || '')}</span>
        </a>
      </li>`
    )
    .join('\n');

  return `<li class="nav__item nav__item--has-menu">
    <button class="nav__link nav__trigger${isCurrent ? ' is-current' : ''}"
            aria-expanded="false" aria-controls="${attr(id)}" type="button">
      ${esc(item.label)}
      <svg class="nav__chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
    </button>
    <div class="mega" id="${attr(id)}" hidden>
      <div class="mega__inner">
        <p class="mega__blurb"><span class="mega__blurb-mark" aria-hidden="true"></span>${esc(
          item.blurb || ''
        )}</p>
        <ul class="mega__list">${links}</ul>
      </div>
    </div>
  </li>`;
}

function header(currentPath) {
  return `<a class="skip" href="#main">Skip to content</a>
<header class="masthead" data-masthead>
  <div class="masthead__inner wrap">
    <a class="brand" href="/" aria-label="Nevoxel — Steering Maritime Talent — home">
      <img class="brand__logo" src="/assets/img/logo/nevoxel-logo.png" alt="Nevoxel — Steering Maritime Talent" width="960" height="230">
    </a>

    <nav class="nav" aria-label="Main">
      <ul class="nav__list">
        ${nav.map((item) => navItem(item, currentPath)).join('\n        ')}
      </ul>
    </nav>

    <div class="masthead__actions">
      <!-- The two doors: navy for the seafarer, orange for the employer,
           always in this order. -->
      <a class="btn btn--navy btn--sm" href="/jobs">Find jobs</a>
      <a class="btn btn--solid btn--sm" href="/contact?for=employer">Hire talent</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
        <span class="burger__bar"></span>
        <span class="burger__bar"></span>
      </button>
    </div>
  </div>

  <div class="mobile-nav" id="mobile-nav" hidden>
    <div class="mobile-nav__inner">
      ${nav
        .map((item) => {
          if (!item.children) {
            return `<a class="mobile-nav__top" href="${attr(item.url)}">${esc(item.label)}</a>`;
          }
          return `<details class="mobile-nav__group">
            <summary class="mobile-nav__top">${esc(item.label)}</summary>
            <div class="mobile-nav__links">
              ${item.children
                .map(
                  (c) =>
                    `<a href="${attr(c.url)}"><span>${esc(c.label)}</span><em>${esc(
                      c.note || ''
                    )}</em></a>`
                )
                .join('\n              ')}
            </div>
          </details>`;
        })
        .join('\n      ')}
      <div class="mobile-nav__cta">
        <a class="btn btn--inverse" href="/jobs">Find jobs</a>
        <a class="btn btn--solid" href="/contact?for=employer">Hire talent</a>
      </div>
    </div>
  </div>
</header>`;
}

/* ------------------------------------------------------------------- footer */

function footer() {
  const year = new Date().getFullYear();
  return `<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <a class="brand brand--footer" href="/">
        <img class="brand__logo" src="/assets/img/logo/nevoxel-logo-white.png" alt="Nevoxel — Steering Maritime Talent" width="960" height="230">
      </a>
      <p class="footer__blurb">Shore-based maritime recruitment since 2008. We move proven maritime, logistics and energy professionals from <em>sea</em> to shore — and stay with them through the first year.</p>
      <ul class="footer__social">
        <li><a href="${attr(site.social.linkedin)}" rel="me noopener">LinkedIn</a></li>
        <li><a href="${attr(site.social.instagram)}" rel="me noopener">Instagram</a></li>
      </ul>
    </div>

    <nav class="footer__col" aria-label="For candidates">
      <h2 class="footer__head">For candidates</h2>
      <ul>
        <li><a href="/jobs">Job board</a></li>
        <li><a href="/candidates/sea2shore">Sea2Shore</a></li>
        <li><a href="/candidates/resume-coaching">Resume &amp; coaching</a></li>
        <li><a href="/insights/blog">Blog</a></li>
      </ul>
    </nav>

    <nav class="footer__col" aria-label="For employers">
      <h2 class="footer__head">For employers</h2>
      <ul>
        <li><a href="/employers/maritime-recruitment">Maritime recruitment</a></li>
        <li><a href="/employers/executive-search">Executive search</a></li>
        <li><a href="/employers/hr-advisory">HR advisory (NECD)</a></li>
        <li><a href="/contact?for=employer">Brief us</a></li>
      </ul>
    </nav>

    <nav class="footer__col" aria-label="Company">
      <h2 class="footer__head">Company</h2>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/about/team">Our team</a></li>
        <li><a href="/about/clients">Clients</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>

    <div class="footer__signup">
      <h2 class="footer__head">Shore roles, monthly</h2>
      <p class="footer__signup-note">New mandates and one market note. No other email.</p>
      <form class="signup" data-newsletter novalidate>
        <label class="sr-only" for="newsletter-email">Email address</label>
        <input class="signup__input" id="newsletter-email" name="email" type="email"
               placeholder="you@example.com" autocomplete="email" required>
        <button class="btn btn--solid btn--sm" type="submit">Subscribe</button>
        <p class="form__status" data-status role="status"></p>
      </form>
    </div>
  </div>

  <div class="footer__bar">
    <div class="wrap footer__bar-inner">
      <p>&copy; ${year} Nevoxel. Three offices across India.</p>
      <ul class="footer__legal">
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/terms">Terms</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
      </ul>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------- organisation schema */

function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.origin,
    logo: `${site.origin}/assets/img/logo/nevoxel-logo.png`,
    slogan: site.tagline,
    description: site.description,
    foundingDate: String(site.since),
    email: site.email,
    telephone: site.phone,
    sameAs: [site.social.linkedin, site.social.instagram],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Thane',
      addressRegion: 'Maharashtra',
      postalCode: '400607',
      addressCountry: 'IN',
    },
  };
}

/* --------------------------------------------------------------------- page */

/**
 * @param {object} o
 * @param {string} o.title      full <title> (page-specific part only)
 * @param {string} o.description meta description
 * @param {string} o.url        route, e.g. "/employers"
 * @param {string} o.main       inner HTML for <main>
 * @param {string} [o.bodyClass]
 * @param {object[]} [o.jsonld] additional structured data blocks
 * @param {string[]} [o.scripts] extra script srcs
 * @param {boolean} [o.noindex]
 */
function page(o) {
  const fullTitle =
    o.url === '/' ? `${site.name} — ${site.tagline}` : `${o.title} — ${site.name}`;
  const canonical = `${site.origin}${o.url === '/' ? '/' : o.url + '/'}`;

  const blocks = [organisationSchema(), ...(o.jsonld || [])];
  const jsonldTags = blocks
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b).replace(
          /</g,
          '\\u003c'
        )}</script>`
    )
    .join('\n  ');

  const extraScripts = (o.scripts || [])
    .map((src) => `<script src="${attr(src)}" defer></script>`)
    .join('\n  ');

  return `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${attr(o.description)}">
  <link rel="canonical" href="${attr(canonical)}">
  ${o.noindex ? '<meta name="robots" content="noindex, follow">' : ''}

  <meta property="og:type" content="${attr(o.ogType || 'website')}">
  <meta property="og:site_name" content="${attr(site.name)}">
  <meta property="og:title" content="${attr(fullTitle)}">
  <meta property="og:description" content="${attr(o.description)}">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:locale" content="${attr(site.locale)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(fullTitle)}">
  <meta name="twitter:description" content="${attr(o.description)}">
  <meta name="theme-color" content="#0B1F3A">

  <link rel="icon" type="image/png" sizes="32x32" href="${FAVICON_BASE}/favicon-32.png">
  <link rel="icon" type="image/png" sizes="48x48" href="${FAVICON_BASE}/favicon-48.png">
  <link rel="apple-touch-icon" sizes="180x180" href="${FAVICON_BASE}/apple-touch-icon.png">
  <!-- Harbour's three families are self-hosted via @font-face in site.css —
       no external font host. Display and body are preloaded; the mono cut is
       only used for eyebrows and can arrive late. -->
  <link rel="preload" href="/assets/fonts/PlusJakartaSans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/Onest-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/css/site.css">

  <!-- The motion layer hides [data-motion] elements until JS reveals them.
       Without this, a no-JS visitor would get a page of invisible content. -->
  <noscript><style>
    [data-motion],[data-motion]>*{opacity:1!important;transform:none!important}
    .quotes__slide{display:none}
    .quotes__slide:first-child{display:block;opacity:1;visibility:visible;transform:none}
    .quotes__controls{display:none!important}
  </style></noscript>

  ${jsonldTags}
</head>
<body class="${attr(o.bodyClass || '')}">
${header(o.url)}
<main id="main">
${o.main}
</main>
${footer()}
<script src="/assets/js/motion.js" defer></script>
<script src="/assets/js/site.js" defer></script>
${extraScripts}
</body>
</html>
`;
}

module.exports = { page };
