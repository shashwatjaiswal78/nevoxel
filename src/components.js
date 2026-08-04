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
 * @param {boolean} [o.coast]  render the depth-contour coastline on the top edge
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
  ${coast ? coastline() : ''}
  <div class="wrap">
${body}
  </div>
</${tag}>`;
}

/** Depth-contour divider: the sea/land boundary that carries the brand thesis. */
function coastline() {
  return `<div class="coast" aria-hidden="true">
  <svg class="coast__svg" viewBox="0 0 1440 90" preserveAspectRatio="none">
    <path class="coast__deep" d="M0,54 C120,30 260,72 420,58 C580,44 700,10 880,26 C1040,40 1180,74 1440,50 L1440,90 L0,90 Z"/>
    <path class="coast__line" d="M0,54 C120,30 260,72 420,58 C580,44 700,10 880,26 C1040,40 1180,74 1440,50" fill="none"/>
    <path class="coast__sounding" d="M0,66 C130,44 265,84 425,70 C585,56 705,24 885,40 C1045,54 1185,86 1440,62" fill="none"/>
  </svg>
</div>`;
}

/* ------------------------------------------------------------- typographic */

function eyebrow(text, { coord } = {}) {
  return `<p class="eyebrow">
    <span class="eyebrow__tick" aria-hidden="true"></span>
    <span class="eyebrow__text">${esc(text)}</span>
    ${coord ? `<span class="eyebrow__coord" aria-hidden="true">${esc(coord)}</span>` : ''}
  </p>`;
}

function sectionHead({ eyebrow: eb, title, lede, coord, align = 'left', level = 2 }) {
  return `<header class="sec-head sec-head--${align}" data-motion="rise">
    ${eb ? eyebrow(eb, { coord }) : ''}
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

function card({ title, body, href, meta, index, tone = '' }) {
  const inner = `
    ${index ? `<span class="card__index" aria-hidden="true">${esc(index)}</span>` : ''}
    <h3 class="card__title">${prose(title)}</h3>
    <p class="card__body">${prose(body)}</p>
    ${meta ? `<p class="card__meta">${prose(meta)}</p>` : ''}
    ${
      href
        ? `<span class="card__go" aria-hidden="true"><svg viewBox="0 0 16 12"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`
        : ''
    }`;

  const classes = ['card', tone ? `card--${tone}` : ''].filter(Boolean).join(' ');

  return href
    ? `<a class="${classes} card--link" href="${attr(href)}" data-motion="rise">${inner}</a>`
    : `<div class="${classes}" data-motion="rise">${inner}</div>`;
}

function cardGrid(cards, { cols = 3 } = {}) {
  return `<div class="grid grid--${cols}" data-motion="stagger">${cards.join('\n')}</div>`;
}

/* ------------------------------------------------------------- dual paths */

function dualPath() {
  return `<div class="dual" data-motion="stagger">
    <a class="dual__card dual__card--sea" href="/candidates">
      <span class="dual__coord" aria-hidden="true">Course 1</span>
      <h3 class="dual__title">I want a job <em>ashore</em></h3>
      <p class="dual__body">You have the sea time. We translate it for shore-side employers, then put you in front of them.</p>
      <span class="dual__go">For candidates<svg viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </a>
    <a class="dual__card dual__card--shore" href="/employers">
      <span class="dual__coord" aria-hidden="true">Course 2</span>
      <h3 class="dual__title">I want to hire</h3>
      <p class="dual__body">Shortlists of three to five, each one defended in writing. Confidential when the market is small.</p>
      <span class="dual__go">For employers<svg viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </a>
  </div>`;
}

/* --------------------------------------------------------------- trust bar */

function trustBar({ compact = false } = {}) {
  const marks = clients
    .map((c) => `<li class="logo-wall__item"><span class="wordmark">${esc(c.short)}</span></li>`)
    .join('\n      ');

  return `<div class="trust${compact ? ' trust--compact' : ''}" data-motion="rise">
    <p class="trust__label">Placed talent with</p>
    <ul class="logo-wall">
      ${marks}
    </ul>
    <p class="trust__note">
      <span class="badge">Star Women in Maritime 2022</span>
      <span class="trust__since">Since 2008 · 3 offices in India</span>
    </p>
  </div>`;
}

/* ------------------------------------------------------------------ chips */

function sectorChips(list = sectors) {
  return `<ul class="chips" data-motion="stagger">
    ${list.map((s) => `<li class="chip">${esc(s)}</li>`).join('\n    ')}
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
  return band({
    tone: 'deep',
    size: 'tight',
    className: 'band--cta',
    body: `    <div class="cta" data-motion="rise">
      <div class="cta__text">
        <h2 class="cta__title">${prose(title)}</h2>
        <p class="cta__body">${prose(body)}</p>
      </div>
      <div class="cta__actions">
        ${btn(primary.label, primary.href, { variant: 'solid', icon: true })}
        ${btn(secondary.label, secondary.href, { variant: 'ghost', icon: true })}
      </div>
    </div>`,
  });
}

/* ------------------------------------------------------------- page hero */

/** Standard interior page hero (the home page has its own). */
function pageHero({ eyebrow: eb, title, lede, actions = [], coord, aside = '' }) {
  return `<section class="hero hero--page">
  <div class="hero__chart" aria-hidden="true">${soundingField(18)}</div>
  <div class="wrap hero__inner">
    <div class="hero__text">
      ${eb ? eyebrow(eb, { coord }) : ''}
      <h1 class="hero__title" data-motion="rise">${prose(title)}</h1>
      ${lede ? `<p class="hero__lede" data-motion="rise">${prose(lede)}</p>` : ''}
      ${actions.length ? btnRow(actions) : ''}
    </div>
    ${aside ? `<div class="hero__aside" data-motion="rise">${aside}</div>` : ''}
  </div>
</section>`;
}

/**
 * Depth soundings — the scattered small numbers that cover a real chart.
 * Deterministic so builds are reproducible.
 */
function soundingField(count = 24, seed = 7) {
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  const marks = [];
  for (let i = 0; i < count; i++) {
    const x = (rand() * 100).toFixed(2);
    const y = (rand() * 100).toFixed(2);
    const depth = (rand() * 60 + 4).toFixed(rand() > 0.6 ? 1 : 0);
    const dim = (0.18 + rand() * 0.3).toFixed(2);
    marks.push(
      `<span class="sounding" style="left:${x}%;top:${y}%;opacity:${dim}">${depth}</span>`
    );
  }
  return `<div class="soundings">${marks.join('')}</div>`;
}

/* --------------------------------------------------------------- articles */

function articleCard(post, { basePath = '/insights/blog' } = {}) {
  return `<a class="post" href="${attr(basePath)}/${attr(post.slug)}" data-motion="rise">
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
  coastline,
  eyebrow,
  sectionHead,
  btn,
  btnRow,
  card,
  cardGrid,
  dualPath,
  trustBar,
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
  soundingField,
  articleCard,
  routedForm,
};
