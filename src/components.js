/**
 * Reusable section + component builders.
 *
 * Layout rule: `.band` owns all vertical section rhythm. Component classes
 * never set their own top/bottom section padding, so no two selectors can
 * fight over the gap between sections.
 */

const { esc, attr, prose, formatDate, relativeDate, salaryLabel } = require('./util');
const { clients, testimonials, sectors, process: hiringProcess } = require('./content/site');

/* ------------------------------------------------------------------- bands */

/**
 * @param {object} o
 * @param {'deep'|'shoal'|'paper'|'paper-alt'} o.tone
 * @param {string} o.body
 * @param {string} [o.id]
 * @param {'tight'|'normal'|'loose'} [o.size]
 * @param {boolean} [o.coast]  section follows a navy one — adds a little
 *                             extra head-room. (Harbour draws no divider:
 *                             the change of surface is the break.)
 * @param {string} [o.tag]     element name, defaults to section
 */
function band({ tone = 'paper', body, id, size = 'normal', coast = false, tag = 'section', className = '' }) {
  const classes = [
    'band',
    `band--${tone}`,
    size !== 'normal' ? `band--${size}` : '',
    coast ? 'band--coast' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return `<${tag} class="${classes}"${id ? ` id="${attr(id)}"` : ''}>
  <div class="wrap">
${body}
  </div>
</${tag}>`;
}

/* ------------------------------------------------------------- typographic */

function sectionHead({ title, lede, align = 'left', level = 2 }) {
  return `<header class="sec-head sec-head--${align}" data-motion="rise">
    <h${level} class="sec-head__title">${prose(title)}</h${level}>
    ${lede ? `<p class="sec-head__lede">${prose(lede)}</p>` : ''}
  </header>`;
}

/* ----------------------------------------------------------------- buttons */

function btn(label, href, { variant = 'solid', size = '', icon = false } = {}) {
  const classes = ['btn', `btn--${variant}`, size ? `btn--${size}` : ''].filter(Boolean).join(' ');
  const arrow = icon
    ? `<svg class="btn__arrow" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    : '';
  return `<a class="${classes}" href="${attr(href)}">${esc(label)}${arrow}</a>`;
}

function btnRow(buttons, { align = 'left' } = {}) {
  return `<div class="btn-row btn-row--${align}" data-motion="rise">${buttons.join('')}</div>`;
}

/* ------------------------------------------------------------------- cards */

/**
 * `image` ({ src, width, height }) puts a 3:2 photo edge to edge across the top
 * of the card. It is decorative (alt=""): the card title carries the meaning,
 * and a screen reader would otherwise hear the same thing twice.
 */
function card({ title, body, href, meta, index, tone = '', image = null }) {
  const inner = `
    ${
      image
        ? `<div class="card__media"><img src="${attr(image.src)}" alt="" width="${image.width || 720}" height="${
            image.height || 480
          }" loading="lazy" decoding="async"></div>`
        : ''
    }    ${index ? `<span class="card__index" aria-hidden="true">${esc(index)}</span>` : ''}
    <h3 class="card__title">${prose(title)}</h3>
    <p class="card__body">${prose(body)}</p>
    ${meta ? `<p class="card__meta">${prose(meta)}</p>` : ''}
    ${
      href
        ? `<span class="card__go" aria-hidden="true"><svg viewBox="0 0 16 12"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`
        : ''
    }`;

  const classes = ['card', tone ? `card--${tone}` : '', image ? 'card--media' : ''].filter(Boolean).join(' ');

  return href
    ? `<a class="${classes} card--link" href="${attr(href)}" data-motion="rise">${inner}</a>`
    : `<div class="${classes}" data-motion="rise">${inner}</div>`;
}

function cardGrid(cards, { cols = 3 } = {}) {
  return `<div class="grid grid--${cols}" data-motion="stagger">${cards.join('\n')}</div>`;
}

/* ------------------------------------------------------------- dual paths */

// The two photos are a matched pair — same light, same distance — so neither
// door reads as the favoured one. Decorative: the card title carries the meaning.
function dualPath() {
  return `<div class="dual" data-motion="stagger">
    <a class="dual__card dual__card--sea" href="/candidates">
      <div class="dual__media"><img src="/assets/img/door/sea.webp" alt="" width="1200" height="675" loading="lazy" decoding="async"></div>
      <span class="dual__coord" aria-hidden="true">Course 1</span>
      <h3 class="dual__title">I want a job <em>ashore</em></h3>
      <p class="dual__body">You have the sea time. We translate it for shore-side employers, then put you in front of them.</p>
      <span class="dual__go">For candidates<svg viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </a>
    <a class="dual__card dual__card--shore" href="/employers">
      <div class="dual__media"><img src="/assets/img/door/shore.webp" alt="" width="1200" height="675" loading="lazy" decoding="async"></div>
      <span class="dual__coord" aria-hidden="true">Course 2</span>
      <h3 class="dual__title">I want to hire</h3>
      <p class="dual__body">Shortlists of three to five, each one defended in writing. Confidential when the market is small.</p>
      <span class="dual__go">For employers<svg viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </a>
  </div>`;
}

/* --------------------------------------------------------------- trust bar */

/**
 * The client logo wall. `--i` drives the staggered entrance in CSS, which
 * runs as an animation rather than motion.js's inline transition-delay — an
 * inline delay would also slow every hover afterwards. Falls back to the
 * typeset wordmark for any client without a logo file.
 */
function logoWall(list = clients, { className = '' } = {}) {
  const items = list
    .map((c, i) => {
      const mark = c.logo
        ? `<img class="logo-wall__logo" src="/assets/img/logos/${attr(c.logo.slug)}.webp" alt="${attr(
            c.name
          )}" width="${c.logo.w}" height="${c.logo.h}" loading="lazy" decoding="async">`
        : `<span class="wordmark">${esc(c.short)}</span>`;
      return `<li class="logo-wall__item" style="--i:${i}">${mark}</li>`;
    })
    .join('\n      ');

  return `<ul class="logo-wall${className ? ` ${className}` : ''}" data-motion="logos">
      ${items}
    </ul>`;
}

/**
 * Infinite logo cloud — a native port of the 21st.dev LogoCloud /
 * InfiniteSlider pair (no React, no framer-motion). The set is rendered twice
 * so the loop is seamless; the copy is aria-hidden so screen readers hear each
 * client once. Without JS (or with reduced motion) the copy stays hidden and
 * the first set simply wraps, centred — logo-cloud.js adds `is-running`.
 *
 * data-speed / data-speed-hover are px per second, matching the component's
 * speed={80} speedOnHover={25}. data-reverse scrolls left-to-right.
 */
function logoCloud(list = clients, { speed = 80, speedHover = 25, reverse = true } = {}) {
  const set = (hidden) =>
    `<ul class="logo-cloud__set"${hidden ? ' aria-hidden="true" data-logo-clone' : ''}>
        ${list
          .map((c) => {
            const mark = c.logo
              ? `<img class="logo-cloud__logo" src="/assets/img/logos/${attr(c.logo.slug)}.webp" alt="${
                  hidden ? '' : attr(c.name)
                }" width="${c.logo.w}" height="${c.logo.h}" loading="lazy" decoding="async" draggable="false">`
              : `<span class="wordmark">${esc(c.short)}</span>`;
            return `<li class="logo-cloud__item">${mark}</li>`;
          })
          .join('\n        ')}
      </ul>`;

  return `<div class="logo-cloud" data-logo-cloud data-speed="${speed}" data-speed-hover="${speedHover}"${
    reverse ? ' data-reverse' : ''
  } data-motion="fade">
    <div class="logo-cloud__track" data-logo-track>
      ${set(false)}
      ${set(true)}
    </div>
  </div>`;
}

function trustBar({ compact = false } = {}) {
  return `<div class="trust${compact ? ' trust--compact' : ''}">
    <h2 class="trust__label" data-motion="rise">Placed talent with</h2>
    <div class="trust__rule trust__rule--short" aria-hidden="true"></div>
    ${logoCloud()}
    <div class="trust__rule" aria-hidden="true"></div>
    <p class="trust__note">
      <span class="badge">Star Women in Maritime 2022</span>
      <span class="trust__since">Since 2008 · 3 offices in India</span>
    </p>
  </div>`;
}

/* ------------------------------------------------------------------ chips */

/**
 * Sector chips. An entry may be a plain string (a market we recruit into) or
 * `{ label, href }` (a practice vertical with its own hub page). Linked chips
 * get a hover affordance; the rest stay inert text, which is the honest signal
 * — only three of these are desks you can actually read about.
 */
function sectorChips(list = sectors) {
  return `<ul class="chips" data-motion="stagger">
    ${list
      .map((s) =>
        typeof s === 'string'
          ? `<li class="chip">${esc(s)}</li>`
          : `<li><a class="chip chip--link" href="${attr(s.href)}">${esc(s.label)}</a></li>`
      )
      .join('\n    ')}
  </ul>`;
}

/* ---------------------------------------------------------------- process */

function processTimeline(steps = hiringProcess) {
  return `<ol class="timeline" data-motion="stagger">
    ${steps
      .map(
        (s, i) => `<li class="timeline__step">
      <span class="timeline__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <div class="timeline__body">
        <h3 class="timeline__title">${esc(s.step)}</h3>
        <p class="timeline__text">${prose(s.body)}</p>
        <p class="timeline__when">${esc(s.duration)}</p>
      </div>
    </li>`
      )
      .join('\n    ')}
  </ol>`;
}

/* ----------------------------------------------------------- testimonials */

function testimonialCard(t) {
  return `<figure class="quote${t.isPlaceholder ? ' quote--placeholder' : ''}">
    ${t.isPlaceholder ? '<p class="quote__flag">Placeholder — awaiting client sign-off</p>' : ''}
    <blockquote class="quote__text">${prose(t.quote)}</blockquote>
    <figcaption class="quote__by">
      <span class="quote__name">${esc(t.name)}</span>
      <span class="quote__role">${esc(t.role)}${t.company ? ` · ${esc(t.company)}` : ''}</span>
    </figcaption>
  </figure>`;
}

function testimonialSlider(list = testimonials) {
  return `<div class="quotes" data-quotes>
    <div class="quotes__track" data-quotes-track>
      ${list.map((t) => `<div class="quotes__slide">${testimonialCard(t)}</div>`).join('\n      ')}
    </div>
    <div class="quotes__controls">
      <button class="quotes__btn" type="button" data-quotes-prev aria-label="Previous testimonial">
        <svg viewBox="0 0 16 12" aria-hidden="true"><path d="M15 6H2M6.5 1.5 2 6l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="quotes__dots" data-quotes-dots role="tablist" aria-label="Choose testimonial"></div>
      <button class="quotes__btn" type="button" data-quotes-next aria-label="Next testimonial">
        <svg viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </div>`;
}

/* -------------------------------------------------------------- job cards */

function jobCard(job, { compact = false } = {}) {
  return `<a class="job${compact ? ' job--compact' : ''}" href="/jobs/${attr(job.slug)}"
     data-motion="rise"
     data-sector="${attr(job.sector)}" data-func="${attr(job.func)}"
     data-location="${attr(job.location)}" data-seniority="${attr(job.seniority)}"
     data-title="${attr(job.title.toLowerCase())}"
     data-keywords="${attr(
       [job.title, job.company, job.summary, job.sector, job.func, job.location]
         .join(' ')
         .toLowerCase()
     )}">
    <div class="job__head">
      <h3 class="job__title">${esc(job.title)}</h3>
      <span class="job__posted">${esc(relativeDate(job.posted))}</span>
    </div>
    <p class="job__org">${esc(job.company)}${
      job.confidential ? ' <span class="job__confidential">Confidential</span>' : ''
    }</p>
    ${compact ? '' : `<p class="job__summary">${prose(job.summary)}</p>`}
    <ul class="job__facts">
      <li class="job__fact job__fact--place">${esc(job.location)}</li>
      <li class="job__fact">${esc(job.func)}</li>
      <li class="job__fact">${esc(job.seniority)}</li>
      ${job.salary ? `<li class="job__fact job__fact--pay">${esc(salaryLabel(job.salary))}</li>` : ''}
    </ul>
  </a>`;
}

/* -------------------------------------------------------------- accordion */

function accordion(items, { name = 'faq' } = {}) {
  return `<div class="accordion" data-motion="stagger">
    ${items
      .map(
        (item, i) => `<details class="accordion__item"${i === 0 ? ' open' : ''} name="${attr(name)}">
      <summary class="accordion__q">
        <span>${prose(item.q)}</span>
        <span class="accordion__icon" aria-hidden="true"></span>
      </summary>
      <div class="accordion__a">${item.a.map((p) => `<p>${prose(p)}</p>`).join('\n        ')}</div>
    </details>`
      )
      .join('\n    ')}
  </div>`;
}

/** FAQPage structured data to match an accordion. */
function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q.replace(/<[^>]+>/g, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.join(' ').replace(/<[^>]+>/g, ''),
      },
    })),
  };
}

/* ------------------------------------------------------------------ stats */

function statRow(stats) {
  return `<ul class="stats" data-motion="stagger">
    ${stats
      .map(
        (s) => `<li class="stat">
      <span class="stat__figure">${prose(s.figure)}</span>
      <span class="stat__label">${prose(s.label)}</span>
    </li>`
      )
      .join('\n    ')}
  </ul>`;
}

/* --------------------------------------------------------------- CTA band */

function ctaBand({
  title = 'Ready to steer your talent?',
  body = 'Two ways in. Both start with a conversation, not a form letter.',
  primary = { label: 'Hire talent', href: '/contact?for=employer' },
  secondary = { label: 'Find jobs', href: '/jobs' },
} = {}) {
  // Harbour's closing CTA is a light panel, and it carries the two doors in
  // the fixed order: the navy alternative first, the orange action last.
  return band({
    tone: 'paper-alt',
    size: 'tight',
    className: 'band--cta',
    body: `    <div class="cta" data-motion="rise">
      <div class="cta__text">
        <h2 class="cta__title">${prose(title)}</h2>
        <p class="cta__body">${prose(body)}</p>
      </div>
      <div class="cta__actions">
        ${btn(secondary.label, secondary.href, { variant: 'navy', icon: true })}
        ${btn(primary.label, primary.href, { variant: 'solid', icon: true })}
      </div>
    </div>`,
  });
}

/* ------------------------------------------------------------- page hero */

/**
 * Standard interior page hero (the home page has its own).
 *
 * Pass `image` ({ src, alt, width, height }) for a full-bleed photograph under
 * the same left-to-right navy scrim as the home hero. It is the LCP element,
 * so it loads eagerly.
 */
function pageHero({ title, lede, actions = [], aside = '', image = null }) {
  const bg = image
    ? `\n  <img class="hero__bg" src="${attr(image.src)}" alt="${attr(image.alt)}" width="${image.width}" height="${image.height}" loading="eager" fetchpriority="high" decoding="async">`
    : '';
  return `<section class="hero hero--page${image ? ' hero--photo' : ''}">${bg}
  <div class="wrap hero__inner">
    <div class="hero__text">
      <h1 class="hero__title" data-motion="rise">${prose(title)}</h1>
      ${lede ? `<p class="hero__lede" data-motion="rise">${prose(lede)}</p>` : ''}
      ${actions.length ? btnRow(actions) : ''}
    </div>
    ${aside ? `<div class="hero__aside" data-motion="rise">${aside}</div>` : ''}
  </div>
</section>`;
}

/* --------------------------------------------------------------- articles */

/** Cover image paths for a post, or null when it has no cover yet. */
function postCover(post) {
  if (!post.cover) return null;
  const base = `/assets/img/post/${post.slug}`;
  return { src: `${base}.webp`, card: `${base}-card.webp`, alt: post.cover.alt, width: 1536, height: 1024 };
}

function articleCard(post, { basePath = '/insights/blog' } = {}) {
  const cover = postCover(post);
  // alt="" — the card title right below says the same thing to a screen reader.
  return `<a class="post${cover ? ' post--cover' : ''}" href="${attr(basePath)}/${attr(post.slug)}" data-motion="rise">
    ${
      cover
        ? `<img class="post__cover" src="${attr(cover.card)}" alt="" width="800" height="450" loading="lazy" decoding="async">`
        : ''
    }
    <p class="post__meta"><span class="post__cat">${esc(post.category)}</span><span class="post__date">${esc(
    formatDate(post.date)
  )}</span></p>
    <h3 class="post__title">${prose(post.title)}</h3>
    <p class="post__dek">${prose(post.dek)}</p>
    <p class="post__read">${esc(post.readingTime)} min read</p>
  </a>`;
}

/* ------------------------------------------------------------------ forms */

/**
 * Routed contact form. `segment` controls which address the submission is
 * addressed to, replacing the seven scattered inboxes.
 *
 * The `desk` select is deliberately NOT part of routing. Routing is the
 * audience axis (candidate vs employer) and stays a two-key map; the desk is
 * information for whoever reads the inbox, and it prefills from a `?desk=`
 * parameter so the vertical hubs can hand off context.
 */
function routedForm({ id = 'enquiry', defaultSegment = 'candidate', compact = false } = {}) {
  return `<form class="form${compact ? ' form--compact' : ''}" id="${attr(id)}" data-routed-form novalidate>
  <fieldset class="seg">
    <legend class="seg__legend">Who are you?</legend>
    <div class="seg__options">
      <label class="seg__opt">
        <input type="radio" name="segment" value="candidate"${
          defaultSegment === 'candidate' ? ' checked' : ''
        }>
        <span>I'm a candidate</span>
      </label>
      <label class="seg__opt">
        <input type="radio" name="segment" value="employer"${
          defaultSegment === 'employer' ? ' checked' : ''
        }>
        <span>I'm an employer</span>
      </label>
    </div>
  </fieldset>

  <div class="form__grid">
    <p class="field">
      <label class="field__label" for="${attr(id)}-name">Name</label>
      <input class="field__input" id="${attr(id)}-name" name="name" type="text" autocomplete="name" required>
    </p>
    <p class="field">
      <label class="field__label" for="${attr(id)}-email">Email</label>
      <input class="field__input" id="${attr(id)}-email" name="email" type="email" autocomplete="email" required>
    </p>
    <p class="field">
      <label class="field__label" for="${attr(id)}-phone">Phone <span class="field__opt">optional</span></label>
      <input class="field__input" id="${attr(id)}-phone" name="phone" type="tel" autocomplete="tel">
    </p>
    <p class="field" data-when="employer">
      <label class="field__label" for="${attr(id)}-company">Company</label>
      <input class="field__input" id="${attr(id)}-company" name="company" type="text" autocomplete="organization">
    </p>
    <p class="field" data-when="candidate">
      <label class="field__label" for="${attr(id)}-rank">Current rank or role</label>
      <input class="field__input" id="${attr(id)}-rank" name="rank" type="text" placeholder="e.g. Chief Engineer">
    </p>
    <p class="field">
      <label class="field__label" for="${attr(id)}-desk">Which desk? <span class="field__opt">optional</span></label>
      <select class="field__input field__input--select" id="${attr(id)}-desk" name="desk" data-desk-select>
        <option value="">Not sure</option>
        <option value="maritime">Maritime</option>
        <option value="logistics">Logistics</option>
        <option value="legal">Legal</option>
      </select>
    </p>
  </div>

  <p class="field">
    <label class="field__label" for="${attr(id)}-message">
      <span data-label-for="candidate">What kind of shore role are you after?</span>
      <span data-label-for="employer">What role are you hiring for?</span>
    </label>
    <textarea class="field__input field__input--area" id="${attr(
      id
    )}-message" name="message" rows="5" required></textarea>
  </p>

  <p class="field field--check">
    <label class="check">
      <input type="checkbox" name="consent" required>
      <span>I agree to Nevoxel storing these details to respond to my enquiry, as described in the <a href="/privacy">privacy notice</a>.</span>
    </label>
  </p>

  <div class="form__foot">
    <button class="btn btn--solid" type="submit">Send enquiry</button>
    <p class="form__routing" data-routing-note>
      Goes to <span class="mono" data-routing-address>resume@nevoxel.com</span>
    </p>
  </div>
  <p class="form__status" data-status role="status"></p>
</form>`;
}

module.exports = {
  band,
  sectionHead,
  btn,
  btnRow,
  card,
  cardGrid,
  dualPath,
  trustBar,
  logoWall,
  logoCloud,
  sectorChips,
  processTimeline,
  testimonialCard,
  testimonialSlider,
  jobCard,
  accordion,
  faqSchema,
  statRow,
  ctaBand,
  pageHero,
  articleCard,
  postCover,
  routedForm,
};
