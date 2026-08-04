const { page } = require('../layout');
const C = require('../components');
const { esc, attr, formatDate, salaryLabel } = require('../util');
const { site } = require('../content/site');
const { jobs, filters } = require('../content/jobs');

/* ------------------------------------------------------------ JobPosting */

/**
 * JobPosting structured data, so roles are eligible for the Google Jobs
 * experience. This is the whole reason the iframe board had to go: content
 * inside an iframe cannot carry this markup on your own domain.
 */
function jobPostingSchema(job) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: [
      `<p>${job.summary}</p>`,
      '<p><strong>Responsibilities</strong></p><ul>',
      ...job.responsibilities.map((r) => `<li>${r}</li>`),
      '</ul><p><strong>Requirements</strong></p><ul>',
      ...job.requirements.map((r) => `<li>${r}</li>`),
      '</ul>',
    ].join(''),
    datePosted: job.posted,
    validThrough: job.closes,
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      // Confidential mandates name Nevoxel as the hiring contact, which is
      // what Google expects when the employer is undisclosed.
      name: job.confidential ? 'Nevoxel (confidential client)' : job.company,
      sameAs: site.origin,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.replace(' / Hybrid', ''),
        addressRegion: job.region,
        addressCountry: 'IN',
      },
    },
    industry: job.sector,
    occupationalCategory: job.func,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Nevoxel',
      value: job.slug,
    },
  };

  if (job.salary) {
    data.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: job.salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: job.salary.period,
      },
    };
  }

  return data;
}

/* ----------------------------------------------------------------- board */

function filterSelect(name, label, options) {
  return `<div class="filters__field">
        <label class="filters__label" for="filter-${attr(name)}">${esc(label)}</label>
        <select class="filters__select" id="filter-${attr(name)}" data-filter="${attr(name)}">
          <option value="">All</option>
          ${options.map((o) => `<option value="${attr(o)}">${esc(o)}</option>`).join('\n          ')}
        </select>
      </div>`;
}

const board = {
  url: '/jobs',
  priority: '0.9',
  changefreq: 'daily',
  render() {
    const hero = C.pageHero({
      eyebrow: 'Job board',
      coord: `${jobs.length} live roles`,
      title: 'Shore-based maritime jobs',
      lede: 'Every role here is a live mandate we are working. Native, filterable and indexed — no iframe, no redirect to somebody else’s board.',
    });

    const boardBand = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div data-board>
      <div class="filters">
        <div class="filters__search">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M11 11l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <label class="sr-only" for="filter-search">Search roles</label>
          <input class="filters__input" id="filter-search" type="search"
                 placeholder="Search by title, company or keyword" data-filter-search>
        </div>
        <div class="filters__row">
          ${filterSelect('sector', 'Sector', filters.sector)}
          ${filterSelect('func', 'Function', filters.func)}
          ${filterSelect('location', 'Location', filters.location)}
          ${filterSelect('seniority', 'Seniority', filters.seniority)}
        </div>
        <div class="filters__foot">
          <span data-filter-count>${jobs.length} open roles</span>
          <button class="filters__clear" type="button" data-filter-clear hidden>Clear filters</button>
        </div>
      </div>

      <div class="job-list" data-job-list>
        ${jobs.map((job) => C.jobCard(job)).join('\n        ')}
      </div>

      <div class="empty" data-empty hidden>
        <h2 class="empty__title">No roles match that</h2>
        <p class="empty__body">Try widening the filters — or send us your CV anyway. A good share of our placements come from people we already knew when the right mandate arrived.</p>
        <div class="btn-row btn-row--center">
          ${C.btn('Submit your CV', '/contact?for=candidate', { variant: 'solid', icon: true })}
          ${C.btn('Clear filters', '/jobs', { variant: 'outline' })}
        </div>
      </div>
    </div>`,
    });

    const help = C.band({
      tone: 'paper-alt',
      size: 'tight',
      body: `    ${C.cardGrid(
        [
          C.card({
            title: 'Nothing fitting today?',
            body: 'Send your CV anyway. We will tell you honestly what the market looks like for your rank and vessel type.',
            href: '/contact?for=candidate',
            meta: 'Open application',
          }),
          C.card({
            title: 'CV not landing interviews?',
            body: 'Free rewriting and interview coaching — we translate sea experience for shore-side readers.',
            href: '/candidates/resume-coaching',
            meta: 'Free to candidates',
          }),
          C.card({
            title: 'First move ashore?',
            body: 'Sea2Shore runs from before you sign off to a year after you start. Structured, and free.',
            href: '/candidates/sea2shore',
            meta: 'Transition programme',
          }),
        ],
        { cols: 3 }
      )}`,
    });

    return page({
      url: '/jobs',
      title: 'Job Board — shore-based maritime jobs',
      description: `${jobs.length} live shore-based maritime, logistics and energy roles across India. Filter by sector, function, location and seniority.`,
      main: [hero, boardBand, help].join('\n'),
      scripts: ['/assets/js/jobs.js'],
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Nevoxel job board',
          description: 'Live shore-based maritime vacancies.',
          url: `${site.origin}/jobs/`,
        },
      ],
    });
  },
};

/* ---------------------------------------------------------- detail pages */

function jobDetailPage(job) {
  return {
    url: `/jobs/${job.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
    render() {
      const hero = C.pageHero({
        eyebrow: `${job.sector} · ${job.func}`,
        coord: `Posted ${formatDate(job.posted)}`,
        title: job.title,
        lede: job.summary,
      });

      const detail = C.band({
        tone: 'paper',
        coast: true,
        body: `    <div class="jd">
      <div class="jd__body">
        <h2>About the role</h2>
        <p>${esc(job.summary)}</p>

        <h2>Responsibilities</h2>
        <ul class="jd__list">
          ${job.responsibilities.map((r) => `<li>${esc(r)}</li>`).join('\n          ')}
        </ul>

        <h2>Requirements</h2>
        <ul class="jd__list">
          ${job.requirements.map((r) => `<li>${esc(r)}</li>`).join('\n          ')}
        </ul>

        ${
          job.niceToHave && job.niceToHave.length
            ? `<h2>Also useful</h2>
        <ul class="jd__list">
          ${job.niceToHave.map((r) => `<li>${esc(r)}</li>`).join('\n          ')}
        </ul>`
            : ''
        }

        ${
          job.confidential
            ? `<div class="note" style="margin-top:var(--s5)">
          <strong>Confidential mandate.</strong> The employer is not named publicly. We will
          tell you who it is on our first call, once we have agreed the role is worth your time.
        </div>`
            : ''
        }
      </div>

      <aside class="jd__aside">
        <dl class="jd__facts">
          <div class="jd__fact"><dt>Employer</dt><dd>${esc(job.company)}</dd></div>
          <div class="jd__fact"><dt>Location</dt><dd>${esc(job.location)}</dd></div>
          <div class="jd__fact"><dt>Function</dt><dd>${esc(job.func)}</dd></div>
          <div class="jd__fact"><dt>Seniority</dt><dd>${esc(job.seniority)}</dd></div>
          <div class="jd__fact"><dt>Type</dt><dd>${esc(job.type)}</dd></div>
          ${
            job.salary
              ? `<div class="jd__fact"><dt>Salary</dt><dd>${esc(salaryLabel(job.salary))}</dd></div>`
              : ''
          }
          <div class="jd__fact"><dt>Closes</dt><dd>${esc(formatDate(job.closes))}</dd></div>
        </dl>
        ${C.btn('Apply for this role', `/contact?for=candidate&role=${job.slug}`, {
          variant: 'solid',
          icon: true,
        })}
        <p class="jd__note">Applications go to the maritime desk. We reply to every application, including the ones we cannot take forward.</p>
      </aside>
    </div>`,
      });

      const related = jobs.filter((j) => j.slug !== job.slug && j.func === job.func).slice(0, 3);

      const relatedBand = related.length
        ? C.band({
            tone: 'paper-alt',
            body: `    ${C.sectionHead({ eyebrow: 'Similar roles', title: `More in ${job.func}` })}
    <div class="job-list" data-motion="stagger">
      ${related.map((j) => C.jobCard(j, { compact: true })).join('\n      ')}
    </div>
    ${C.btnRow([C.btn('All open roles', '/jobs', { variant: 'outline', icon: true })])}`,
          })
        : '';

      return page({
        url: `/jobs/${job.slug}`,
        title: `${job.title} — ${job.location}`,
        description: job.summary,
        ogType: 'article',
        main: [hero, detail, relatedBand].filter(Boolean).join('\n'),
        jsonld: [jobPostingSchema(job)],
      });
    },
  };
}

module.exports = {
  board,
  detailPages: jobs.map(jobDetailPage),
  jobPostingSchema,
};
