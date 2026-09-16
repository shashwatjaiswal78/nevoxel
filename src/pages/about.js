const { page } = require('../layout');
const C = require('../components');
const { esc, formatDate } = require('../util');
const { team, values, clients, award, testimonials, site } = require('../content/site');
const { press } = require('../content/insights');

/* -------------------------------------------------------------- our story */

const story = {
  url: '/about',
  priority: '0.8',
  render() {
    const hero = C.pageHero({
      title: 'Steering maritime talent since 2008',
      lede: 'We exist because maritime professionals and shore-side employers were failing to understand each other, and somebody had to sit in the middle and do the translation.',
      actions: [
        C.btn('Meet the team', '/about/team', { variant: 'solid', icon: true }),
        C.btn('See our clients', '/about/clients', { variant: 'ghost', icon: true }),
      ],
      image: {
        src: '/assets/img/hero/about.webp',
        alt: 'Working harbour waterfront in an Indian port city at sunrise, with tugs, cranes and a berthed vessel',
        width: 1672,
        height: 941,
      },
    });

    const storyBand = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="split">
      <div data-motion="rise">
        <p class="lede-lg">One recruiter, one desk, and a problem nobody was solving properly.</p>
      </div>
      <div class="prose" data-motion="rise">
        <p>Neetu Jaiswal started Nevoxel in Mumbai in 2008 after watching the same failure repeat itself. Excellent officers and engineers would come ashore and struggle to get interviews. Meanwhile shore-side employers complained they could not find people who understood ships. Both were true at once, and the gap between them was a translation problem, not a supply problem.</p>
        <p>The first years were pure maritime recruitment — superintendents, operations, chartering. As clients kept us on, the questions changed. They stopped asking only for candidates and started asking why people were leaving, how to structure training, what wellness support rotation-based staff actually need. That became the advisory practice we now run as NECD.</p>
        <p>Sea2Shore came from the other direction. Too many of the officers we placed were back at sea within eighteen months, not because the work was wrong but because nobody had prepared them for what the first shore year feels like. So we built the programme, and made it free.</p>
        <p>Seventeen years on we run three offices across India and the same specialism. Shore-based maritime is a small market, and we would rather know all of it than a little of everything.</p>
      </div>
    </div>`,
    });

    const timeline = C.band({
      tone: 'shoal',
      body: `    ${C.sectionHead({
        title: 'How the desk grew',
      })}
    ${C.processTimeline([
      {
        step: 'Founded',
        body: 'Neetu Jaiswal starts Nevoxel in Mumbai, focused entirely on shore-based maritime recruitment.',
        duration: '2008',
      },
      {
        step: 'North India',
        body: 'The Delhi/Noida desk opens to serve logistics and energy clients outside the western coastal corridor.',
        duration: 'Growth years',
      },
      {
        step: 'Advisory',
        body: 'NECD launches, extending the work from filling roles to the wellness, training and TMSA-aligned HR practice around them.',
        duration: 'Expansion',
      },
      {
        step: 'Recognised',
        body: 'Star Women in Maritime 2022. Three offices, and Sea2Shore running as a free structured programme for seafarers coming ashore.',
        duration: '2022 →',
      },
    ])}`,
    });

    const valuesBand = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        title: 'Five things we hold to',
        lede: 'Not a poster in the office. These are the decisions we actually make when a brief pushes against them.',
      })}
    ${C.cardGrid(
      values.map((v, i) =>
        C.card({ title: v.name, body: v.body, index: String(i + 1).padStart(2, '0') })
      ),
      { cols: 3 }
    )}`,
    });

    const proof = C.band({
      tone: 'paper-alt',
      size: 'tight',
      body: `    ${C.trustBar()}`,
    });

    return page({
      url: '/about',
      title: 'About — Steering maritime talent since 2008',
      description:
        'Nevoxel is a Mumbai-based shore-based maritime recruitment firm founded in 2008. Three offices across India, specialising in maritime, logistics and energy.',
      main: [
        hero,
        storyBand,
        timeline,
        valuesBand,
        proof,
        C.ctaBand({
          title: 'Work with us',
          body: 'Whether you are hiring or moving ashore, it starts the same way.',
        }),
      ].join('\n'),
    });
  },
};

/* ------------------------------------------------------------------- team */

function memberCard(member) {
  return `<article class="member" data-motion="rise">
    <div class="member__portrait${member.photo ? ' member__portrait--photo' : ''}">
      ${
        member.photo
          ? `<img class="member__photo" src="/assets/img/team/${esc(member.slug)}.webp" alt="Portrait of ${esc(
              member.name
            )}" width="720" height="540" loading="lazy" decoding="async">`
          : `<span class="member__initials" aria-hidden="true">${esc(member.initials)}</span>`
      }
    </div>
    <h2 class="member__name">${esc(member.name)}</h2>
    <p class="member__role">${esc(member.role)}</p>
    ${member.isPlaceholder ? '<p class="quote__flag">Placeholder — bio awaiting sign-off</p>' : ''}
    <p class="member__bio">${esc(member.bio)}</p>
    <ul class="member__focus">
      ${member.focus.map((f) => `<li>${esc(f)}</li>`).join('\n      ')}
    </ul>
  </article>`;
}

const teamPage = {
  url: '/about/team',
  priority: '0.7',
  render() {
    const hero = C.pageHero({
      title: 'Who you will actually work with',
      lede: 'A small team by design. The person you brief is the person who runs your search.',
    });

    const grid = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="team" data-motion="stagger">
      ${team.map(memberCard).join('\n      ')}
    </div>
`,
    });

    return page({
      url: '/about/team',
      title: 'Our Team',
      description:
        'Meet the Nevoxel team: founder Neetu Jaiswal, advisor Rajesh Menon, legal advisor Adv. Surangama Sharma and marketing advisor Shashwat Jaiswal.',
      main: [
        hero,
        grid,
        C.ctaBand({
          title: 'Talk to us directly',
          body: 'No call centre, no account manager layer. You reach the desk.',
        }),
      ].join('\n'),
      jsonld: team.map((m) => ({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: m.name,
        jobTitle: m.role,
        worksFor: { '@type': 'Organization', name: site.name },
        // A placeholder bio must never be indexed as a real person's description.
        ...(m.isPlaceholder ? {} : { description: m.bio }),
      })),
    });
  },
};

/* ---------------------------------------------------------------- clients */

const clientsPage = {
  url: '/about/clients',
  priority: '0.7',
  render() {
    const hero = C.pageHero({
      title: 'Who we hire for',
      lede: 'Owners, managers, terminals, charterers and the industrial groups that move cargo. A selection of the companies our placements have gone into.',
    });

    const wall = C.band({
      tone: 'paper',
      coast: true,
      body: `    ${C.sectionHead({
        title: 'Placed talent with',
      })}
    ${C.logoWall(clients, { className: 'logo-wall--large' })}`,
    });

    const awardBand = C.band({
      tone: 'shoal',
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          title: award.title + ' ' + award.year,
          lede: award.note,
        })}
      </div>
      <div data-motion="rise">
        ${C.statRow([
          { figure: '2022', label: 'Star Women in Maritime' },
          { figure: '2008', label: 'Placing talent since' },
          { figure: '3', label: 'Offices across India' },
        ])}
      </div>
    </div>`,
    });

    const quotes = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        title: 'In their words',
        align: 'center',
      })}
    ${C.testimonialSlider(testimonials)}`,
    });

    const pressBand = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Mentions and features',
      })}
    <div class="press-list" data-motion="stagger">
      ${press
        .map(
          (p) => `<article class="press-item${p.isPlaceholder ? ' press-item--placeholder' : ''}">
        <p class="press-item__kind">${esc(p.kind)}</p>
        <div>
          <h3 class="press-item__title">${esc(p.title)}</h3>
          <p class="press-item__note">${esc(p.note)}</p>
        </div>
        <p class="press-item__date">${esc(formatDate(p.date))}</p>
      </article>`
        )
        .join('\n      ')}
    </div>
    ${C.btnRow([C.btn('All press & publications', '/insights/press', { variant: 'outline', icon: true })])}`,
    });

    return page({
      url: '/about/clients',
      title: 'Clients & Testimonials',
      description:
        'Nevoxel has placed shore-based maritime talent with owners, managers and industrial groups including Mitsui O.S.K. Lines, TORM, Aditya Birla, Scorpio, Navig8, ATPI and MTM.',
      main: [
        hero,
        wall,
        awardBand,
        quotes,
        pressBand,
        C.ctaBand({
          title: 'Join the roster',
          body: 'Tell us what you are hiring for and we will tell you what it will take.',
        }),
      ].join('\n'),
    });
  },
};

module.exports = { story, teamPage, clientsPage };
