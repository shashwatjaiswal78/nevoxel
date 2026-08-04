const { page } = require('../layout');
const C = require('../components');
const { site } = require('../content/site');
const { jobs } = require('../content/jobs');
const { posts } = require('../content/insights');

module.exports = {
  url: '/',
  priority: '1.0',
  changefreq: 'weekly',
  render() {
    const featured = jobs.slice(0, 4);
    const latest = posts.slice(0, 3);

    /* ---------------------------------------------------------------- hero */
    const hero = `<section class="hero hero--home">
  <img class="hero__bg" src="/assets/img/hero/vessel.jpg" alt="A Nevoxel-crewed vessel under way at sea" width="1400" height="788" loading="eager" fetchpriority="high">
  <div class="wrap hero__inner">
    <div class="hero__text">
      <h1 class="hero__title" data-motion="rise">Steering<br>maritime talent<br><em>from sea</em> to shore</h1>
      <p class="hero__lede" data-motion="rise" data-motion-delay="120">
        Shore-based maritime recruitment since 2008. We move proven officers, engineers
        and commercial specialists into shore roles — and stay with them through the
        first year, which is where these moves actually succeed or fail.
      </p>
      ${C.btnRow([
        // The two doors on navy: white inverse for the seafarer, orange for
        // the employer, in the fixed order.
        C.btn('Find jobs', '/jobs', { variant: 'inverse', size: 'lg', icon: true }),
        C.btn('Hire talent', '/contact?for=employer', { variant: 'solid', size: 'lg', icon: true }),
      ])}
      <p class="hero__since">Mumbai · Delhi/Noida · Lucknow</p>
    </div>
  </div>
</section>`;

    /* ----------------------------------------------------------- dual path */
    const dual = C.band({
      tone: 'paper',
      coast: true,
      size: 'tight',
      body: `    ${C.sectionHead({
        eyebrow: 'Two courses',
        title: 'Which way are you heading?',
        lede: 'The old site made visitors guess. This one asks once, then gets out of the way.',
        coord: '19°13′N 72°58′E',
      })}
    ${C.dualPath()}`,
    });

    /* --------------------------------------------------------------- trust */
    const trust = C.band({
      tone: 'paper-alt',
      size: 'tight',
      body: `    ${C.trustBar()}`,
    });

    /* ------------------------------------------------------------ services */
    const services = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        eyebrow: 'What we do',
        title: 'Four desks, one specialism',
        lede: 'Shore-side maritime is a small market. We work all of it rather than spreading thin across industries we do not know.',
      })}
    ${C.cardGrid(
      [
        C.card({
          title: 'Maritime shore recruitment',
          body: 'Superintendents, operations, chartering, crewing and HSEQ. The flagship desk, and the one most of our placements come from.',
          href: '/employers/maritime-recruitment',
          meta: 'Flagship service',
        }),
        C.card({
          title: 'Executive search',
          body: 'CXO and senior appointments, usually confidential. Direct approach into a market where advertising the role tells your competitors your plans.',
          href: '/employers/executive-search',
          meta: 'Retained · discreet',
        }),
        C.card({
          title: 'HR advisory (NECD)',
          body: 'Wellness, training and TMSA-aligned HR practice for maritime employers who need the people systems to match the fleet.',
          href: '/employers/hr-advisory',
          meta: 'Advisory',
        }),
        C.card({
          title: 'Sea2Shore',
          body: 'Our transition programme for seafarers coming ashore — CV translation, interview preparation and the first-year support that makes it stick.',
          href: '/candidates/sea2shore',
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
          eyebrow: 'Why Nevoxel',
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
        eyebrow: 'Open roles',
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
        eyebrow: 'In their words',
        title: 'What clients and candidates say',
        align: 'center',
      })}
    ${C.testimonialSlider()}`,
    });

    /* ------------------------------------------------------------ insights */
    const insights = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        eyebrow: 'Insights',
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
      main: [hero, dual, trust, services, why, featuredJobs, quotes, insights, C.ctaBand()].join(
        '\n'
      ),
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
