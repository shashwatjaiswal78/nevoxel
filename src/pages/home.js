const { page } = require('../layout');
const C = require('../components');
const { site } = require('../content/site');
const { jobs } = require('../content/jobs');
const { posts } = require('../content/insights');

/**
 * The passage plan — the hero's thesis.
 *
 * A plotted course from a sea waypoint to a shore waypoint, drawn in chart
 * magenta over depth contours. This is the brand argument (sea -> shore) as a
 * picture rather than a slogan, and it replaces the stock container-ship photo
 * every competitor uses.
 */
function passagePlan() {
  return `<div class="passage" data-passage>
  <svg class="passage__svg" viewBox="0 0 460 460" role="img"
       aria-label="A nautical passage plan: a plotted course running from a waypoint at sea, through the Sea2Shore transition, to a waypoint ashore on the coast.">
    <!-- land: a headland in the upper right. Fill and coastline are separate
         paths so only the coast itself carries a stroke, never the closing
         edges along the frame. -->
    <path class="passage__land"
          d="M240,0 C268,70 310,120 370,160 C405,183 430,196 460,206 L460,0 Z"/>
    <path class="passage__coast"
          d="M240,0 C268,70 310,120 370,160 C405,183 430,196 460,206"/>

    <!-- depth contours, stepping seaward from the coast -->
    <path class="passage__contour" d="M196,0 C226,78 270,132 334,176 C372,201 424,218 460,228"/>
    <path class="passage__contour" d="M150,0 C182,86 228,144 296,192 C338,220 412,244 460,254"/>
    <path class="passage__contour" d="M100,0 C134,96 184,158 256,210 C302,242 396,272 460,284"/>

    <!-- plotted course: at sea -> transition -> ashore -->
    <path class="passage__course" d="M64,404 C118,368 156,330 208,286 C266,236 330,182 368,140"/>

    <!-- waypoints -->
    <rect class="passage__waypoint" x="57" y="397" width="14" height="14" transform="rotate(45 64 404)"/>
    <circle class="passage__waypoint" cx="208" cy="286" r="6.5"/>
    <circle class="passage__waypoint passage__waypoint--shore" cx="368" cy="140" r="8"/>

    <!-- vessel, under way on the course -->
    <path class="passage__vessel" d="M208,272 L215,288 L201,288 Z" transform="rotate(44 208 282)"/>

    <!-- labels sit clear of the track: the mid-course one is offset to the
         right so the dashed line never runs through it -->
    <text class="passage__label" x="64" y="436" text-anchor="middle">At sea</text>
    <text class="passage__label" x="248" y="312" text-anchor="start">Sea2Shore</text>
    <text class="passage__label passage__label--shore" x="368" y="114" text-anchor="middle">Ashore</text>

    <!-- compass rose, sited in open water clear of the track -->
    <g transform="translate(392, 386)">
      <circle class="passage__rose" r="26"/>
      <circle class="passage__rose" r="16"/>
      <path class="passage__rose-n" d="M0,-30 L4.5,-16 L-4.5,-16 Z"/>
      <path class="passage__rose" d="M0,30 L0,16 M-30,0 L-16,0 M30,0 L16,0"/>
    </g>
  </svg>
</div>`;
}

module.exports = {
  url: '/',
  priority: '1.0',
  changefreq: 'weekly',
  render() {
    const featured = jobs.slice(0, 4);
    const latest = posts.slice(0, 3);

    /* ---------------------------------------------------------------- hero */
    const hero = `<section class="hero hero--home">
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
    <div class="hero__aside">${passagePlan()}</div>
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
