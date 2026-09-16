const { page } = require('../layout');
const C = require('../components');
const { site } = require('../content/site');
const { jobs } = require('../content/jobs');
const { posts } = require('../content/insights');
const { hubs, heroSlides } = require('../content/expertise');
const { esc, attr } = require('../util');

module.exports = {
  url: '/',
  priority: '1.0',
  changefreq: 'weekly',
  render() {
    const featured = jobs.slice(0, 4);
    const latest = posts.slice(0, 3);

    /* ---------------------------------------------------------------- hero */
    /**
     * Rotating hero — one slide per desk. Only the eyebrow, headline, lede and
     * desk link rotate; the two doors below them never move or relabel.
     *
     * Everything renders in the markup, so the whole thing works with no JS at
     * all: without hero.js the slides simply stack and the first one shows
     * (CSS keeps slide 1 visible by default and hero.js takes over from there).
     */
    const total = heroSlides.length;

    const heroMedia = heroSlides
      .map((s, i) => {
        const first = i === 0;
        const layer =
          s.media === 'mark'
            ? `<div class="hero__mark" aria-hidden="true">${s.mark}</div>`
            : `<img class="hero__bg" src="${s.image.src}" alt="${attr(s.image.alt)}"
             width="${s.image.width}" height="${s.image.height}"
             ${first ? 'loading="eager" fetchpriority="high"' : 'loading="eager" fetchpriority="low" decoding="async"'}>`;
        // Slide 1 is the LCP element, so only it gets high priority. The rest
        // load eagerly at low priority: lazy-loading them meant a slide could
        // fade in as bare navy before its photo had arrived.
        return `    <div class="hero__layer${first ? ' is-active' : ''}" data-hero-layer="${i}">${layer}</div>`;
      })
      .join('\n');

    const heroDeck = heroSlides
      .map((s, i) => {
        const first = i === 0;
        // The page's one <h1> is slide 1. The rest are <h2> — a rotating <h1>
        // would break the single-h1 rule the whole site holds to.
        const tag = first ? 'h1' : 'h2';
        return `      <div class="hero__slide${first ? ' is-active' : ''}" data-hero-slide="${i}"
           role="group" aria-roledescription="slide" aria-label="${i + 1} of ${total}: ${attr(
          s.eyebrow
        )}">
        <${tag} class="hero__title">${s.heading}</${tag}>
        <p class="hero__lede">${esc(s.lede)}</p>
        <a class="hero__deskline" href="${attr(s.link.href)}">${esc(s.link.label)}
          <svg viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>`;
      })
      .join('\n');

    const heroDots = heroSlides
      .map(
        (s, i) =>
          `<button class="hero__dot${i === 0 ? ' is-current' : ''}" type="button"
              data-hero-dot="${i}" aria-label="Show ${attr(s.eyebrow)}"${
            i === 0 ? ' aria-current="true"' : ''
          }></button>`
      )
      .join('\n          ');

    const hero = `<section class="hero hero--home" data-hero
  role="region" aria-roledescription="carousel" aria-label="Nevoxel practice desks">
  <div class="hero__media">
${heroMedia}
  </div>
  <div class="wrap hero__inner">
    <div class="hero__text">
      <div class="hero__deck" data-hero-deck>
${heroDeck}
      </div>

      ${C.btnRow([
        // The two doors on navy: white inverse for the seafarer, orange for
        // the employer, in the fixed order. Static across every slide.
        C.btn('Find jobs', '/jobs', { variant: 'inverse', size: 'lg', icon: true }),
        C.btn('Hire talent', '/contact?for=employer', { variant: 'solid', size: 'lg', icon: true }),
      ])}

      <div class="hero__controls" data-hero-controls hidden>
        <div class="hero__dots" role="group" aria-label="Choose a desk">
          ${heroDots}
        </div>
        <!-- WCAG 2.2.2: auto-advancing content needs a way to stop it. Invisible
             to pointer users; appears only when a keyboard user tabs to it. -->
        <button class="hero__pause" type="button" data-hero-pause aria-label="Pause the slideshow">
          <span data-hero-pause-label>Pause slideshow</span>
        </button>
      </div>

      <p class="hero__since">Mumbai · Delhi/Noida · Lucknow</p>
    </div>
  </div>
  <button class="hero__arrow hero__arrow--prev" type="button" data-hero-prev aria-label="Previous desk" hidden>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <button class="hero__arrow hero__arrow--next" type="button" data-hero-next aria-label="Next desk" hidden>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
</section>`;

    /* ----------------------------------------------------------- dual path */
    const dual = C.band({
      tone: 'paper',
      coast: true,
      size: 'tight',
      body: `    ${C.sectionHead({
        title: 'Which way are you heading?',
        lede: 'The old site made visitors guess. This one asks once, then gets out of the way.',
      })}
    ${C.dualPath()}`,
    });

    /* ------------------------------------------------------------- desks */
    // The vertical axis, introduced after the audience fork rather than before
    // it: the visitor picks a door first, then finds their market.
    const desks = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Three desks, not a sector list',
        lede: 'We run the markets we can evidence. Maritime is the anchor and always will be; logistics and legal grew out of it because that is what our clients kept asking for.',
      })}
    ${C.cardGrid(
      hubs.map((h) =>
        C.card({
          title: h.eyebrow,
          body: h.lede,
          href: h.url,
          // Same photo as the desk's own hero, cropped to 3:2 at 840×560.
          image: { src: `/assets/img/desk${h.url}.webp`, width: 840, height: 560 },
          meta: `${jobs.filter((j) => j.sector === h.jobsSector).length} open ${
            jobs.filter((j) => j.sector === h.jobsSector).length === 1 ? 'role' : 'roles'
          }`,
        })
      ),
      { cols: 3 }
    )}`,
    });

    /* --------------------------------------------------------------- trust */
    const trust = C.band({
      tone: 'paper',
      size: 'tight',
      body: `    ${C.trustBar()}`,
    });

    /* ------------------------------------------------------------ services */
    const services = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Four ways we work',
        lede: 'The desks above are the markets. These are the services that run across them — plus the programme that gets seafarers ashore in the first place.',
      })}
    ${C.cardGrid(
      [
        C.card({
          title: 'Maritime shore recruitment',
          body: 'Superintendents, operations, chartering, crewing and HSEQ. The flagship desk, and the one most of our placements come from.',
          href: '/employers/maritime-recruitment',
          image: { src: '/assets/img/service/maritime-recruitment.webp' },
          meta: 'Flagship service',
        }),
        C.card({
          title: 'Executive search',
          body: 'CXO and senior appointments, usually confidential. Direct approach into a market where advertising the role tells your competitors your plans.',
          href: '/employers/executive-search',
          image: { src: '/assets/img/service/executive-search.webp' },
          meta: 'Retained · discreet',
        }),
        C.card({
          title: 'HR advisory (NECD)',
          body: 'Wellness, training and TMSA-aligned HR practice for maritime employers who need the people systems to match the fleet.',
          href: '/employers/hr-advisory',
          image: { src: '/assets/img/service/hr-advisory.webp' },
          meta: 'Advisory',
        }),
        C.card({
          title: 'Sea2Shore',
          body: 'Our transition programme for seafarers coming ashore — CV translation, interview preparation and the first-year support that makes it stick.',
          href: '/candidates/sea2shore',
          image: { src: '/assets/img/service/sea2shore.webp' },
          meta: 'For candidates',
        }),
      ],
      { cols: 4 }
    )}`,
    });

    /* ------------------------------------------------------------ why band */
    const why = C.band({
      tone: 'shoal',
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          title: 'Seventeen years on one desk',
          lede: 'Long enough to know which packages move people, which counter-offers work, and which "urgent" briefs are actually urgent.',
        })}
        ${C.btnRow([C.btn('Read our story', '/about', { variant: 'ghost', icon: true })])}
      </div>
      <div>
        ${C.cardGrid(
          require('../content/site').differentiators.map((d) =>
            C.card({ title: d.name, body: d.body, meta: d.metric })
          ),
          { cols: 1 }
        )}
      </div>
    </div>`,
    });

    /* ---------------------------------------------------------- featured jobs */
    const featuredJobs = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        title: 'Latest shore-based vacancies',
        lede: 'Filterable, native, and indexed for Google Jobs. No iframe.',
      })}
    <div class="job-list" data-motion="stagger">
      ${featured.map((job) => C.jobCard(job, { compact: true })).join('\n      ')}
    </div>
    ${C.btnRow([C.btn(`See all ${jobs.length} jobs`, '/jobs', { variant: 'outline', icon: true })])}`,
    });

    /* -------------------------------------------------------- testimonials */
    const quotes = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'What clients and candidates say',
        align: 'center',
      })}
    ${C.testimonialSlider()}`,
    });

    /* ------------------------------------------------------------ insights */
    const insights = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        title: 'Notes from the shore-side market',
        lede: 'What we are seeing on the desk, written for the people it affects.',
      })}
    ${C.cardGrid(
      latest.map((post) => C.articleCard(post)),
      { cols: 3 }
    )}
    ${C.btnRow([C.btn('All insights', '/insights/blog', { variant: 'outline', icon: true })])}`,
    });

    return page({
      url: '/',
      title: site.tagline,
      description: site.description,
      bodyClass: 'page-home',
      main: [hero, dual, desks, trust, services, why, featuredJobs, quotes, insights, C.ctaBand()].join(
        '\n'
      ),
      scripts: ['/assets/js/hero.js'],
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: site.name,
          url: site.origin,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${site.origin}/jobs?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
      ],
    });
  },
};
