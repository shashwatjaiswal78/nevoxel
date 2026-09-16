const { page } = require('../layout');
const C = require('../components');
const { hubs, upcoming } = require('../content/expertise');
const { jobs } = require('../content/jobs');

/* ----------------------------------------------------------------- helpers */

/**
 * The two doors, scoped to one desk. Same fixed pair and same fixed order as
 * everywhere else in the site — the candidate route first, the employer route
 * last in signal orange. On the navy hero the candidate button is `inverse`
 * rather than `navy`, exactly as the home hero does it.
 */
function deskDoors(hub) {
  const noun = hub.eyebrow.replace(/^Nevoxel\s+/, '').toLowerCase();
  return [
    C.btn(`Find ${noun} roles`, `/jobs?sector=${encodeURIComponent(hub.jobsSector)}`, {
      variant: 'inverse',
      icon: true,
    }),
    C.btn(`Hire ${noun} talent`, `/contact?for=employer&desk=${attrSlug(hub)}`, {
      variant: 'solid',
      icon: true,
    }),
  ];
}

/** The desk key used in ?desk= — the hub URL without its slash. */
function attrSlug(hub) {
  return hub.url.replace(/^\//, '');
}

/* ------------------------------------------------------- hub page template */

/**
 * Shared practice-vertical template:
 * hero -> the market -> what we cover -> live roles -> the desk -> stats ->
 * questions -> CTA.
 *
 * Deliberately NOT here: process, timelines, fee structure or "how we work".
 * That is service-page territory (/employers/*), and duplicating it is what
 * would make these two page families compete with each other.
 */
function hubPage(hub) {
  return {
    url: hub.url,
    priority: '0.9',
    render() {
      const hero = C.pageHero({
        title: hub.title,
        lede: hub.lede,
        image: hub.image,
        actions: deskDoors(hub),
      });

      const marketBand = C.band({
        tone: 'paper',
        coast: true,
        body: `    <div class="split">
      <div data-motion="rise">
        <p class="lede-lg">${hub.market.summary}</p>
      </div>
      <div class="prose" data-motion="rise">
        ${hub.market.body.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
    </div>`,
      });

      const coversBand = C.band({
        tone: 'paper-alt',
        body: `    ${C.sectionHead({
          title: 'The roles on this desk',
        })}
    ${C.cardGrid(
      hub.covers.map((c) => C.card({ title: c.title, body: c.body })),
      { cols: 3 }
    )}`,
      });

      /* Live roles. The board is the single source of truth — this band is a
         filtered view of it, and the "see all" link reproduces the same filter
         in the URL so the two can never disagree. */
      const open = jobs.filter((j) => j.sector === hub.jobsSector);
      const boardUrl = `/jobs?sector=${encodeURIComponent(hub.jobsSector)}`;

      const rolesBand = C.band({
        tone: 'paper',
        body: `    ${C.sectionHead({
          title: open.length
            ? `Live roles on this desk`
            : 'No open roles on this desk right now',
          lede: open.length
            ? 'Every mandate below is live. Confidential searches are not listed here.'
            : 'Mandates move quickly and confidential searches are never listed. Send us your CV and we will come to you when something fits.',
        })}
    ${
      open.length
        ? `<div class="job-list">
      ${open.map((job) => C.jobCard(job, { compact: true })).join('\n      ')}
    </div>
    ${C.btnRow([C.btn('See all open roles', boardUrl, { variant: 'navy', icon: true })])}`
        : C.btnRow([
            C.btn('Send us your CV', '/contact?for=candidate', { variant: 'navy', icon: true }),
            C.btn('Browse the full board', '/jobs', { variant: 'outline' }),
          ])
    }`,
      });

      const deskBand = hub.desk
        ? C.band({
            tone: 'shoal',
            body: `    ${
              hub.desk.isPlaceholder
                ? `<p class="quote__flag">${hub.desk.placeholderNote || 'Placeholder'}</p>`
                : ''
            }
    ${C.sectionHead({
      title: hub.desk.title,
      lede: hub.desk.lede,
    })}
    ${C.cardGrid(
      hub.desk.members.map((m) => C.card({ title: m.title, body: m.body, meta: m.meta })),
      { cols: hub.desk.members.length === 1 ? 1 : hub.desk.members.length }
    )}`,
          })
        : '';

      const statBand = hub.stats
        ? C.band({ tone: 'paper', size: 'tight', body: `    ${C.statRow(hub.stats)}` })
        : '';

      const faqBand = hub.faq
        ? C.band({
            tone: 'paper-alt',
            body: `    ${C.sectionHead({ title: 'Before you get in touch' })}
    ${C.accordion(hub.faq, { name: 'hub-faq' })}`,
          })
        : '';

      return page({
        url: hub.url,
        title: hub.metaTitle || hub.title,
        description: hub.description,
        main: [
          hero,
          marketBand,
          coversBand,
          rolesBand,
          deskBand,
          statBand,
          faqBand,
          C.ctaBand({
            title: `Talk to the ${hub.eyebrow.replace(/^Nevoxel\s+/, '').toLowerCase()} desk`,
            body: 'Whichever side you are on, it starts with a conversation rather than a form letter.',
            primary: {
              label: 'Hire talent',
              href: `/contact?for=employer&desk=${attrSlug(hub)}`,
            },
            secondary: { label: 'Find jobs', href: boardUrl },
          }),
        ]
          .filter(Boolean)
          .join('\n'),
        jsonld: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: hub.metaTitle || hub.title,
            description: hub.description,
            serviceType: `${hub.jobsSector} recruitment`,
            areaServed: { '@type': 'Country', name: 'India' },
            provider: { '@type': 'Organization', name: 'Nevoxel' },
          },
          ...(hub.faq ? [C.faqSchema(hub.faq)] : []),
        ],
      });
    },
  };
}

/* ---------------------------------------------------------------- overview */

const overview = {
  url: '/expertise',
  priority: '0.8',
  render() {
    const hero = C.pageHero({
      title: 'Specialist desks, not a general agency',
      lede: 'Nevoxel is organised around markets we can evidence rather than every market we could bill. Three desks run today. Two more follow when there is something real behind them.',
      actions: [
        C.btn('Find jobs', '/jobs', { variant: 'inverse', icon: true }),
        C.btn('Hire talent', '/contact?for=employer', { variant: 'solid', icon: true }),
      ],
      image: {
        src: '/assets/img/hero/expertise.webp',
        alt: 'Container terminal with a berthed vessel, yard cranes and a road and rail corridor running inland',
        width: 1672,
        height: 941,
      },
    });

    const intro = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="split">
      <div data-motion="rise">
        <p class="lede-lg">A desk is a market someone here actually knows. That is the whole test.</p>
      </div>
      <div class="prose" data-motion="rise">
        <p>Recruitment firms tend to grow by adding sectors to a list. The list gets longer, the expertise gets thinner, and eventually the firm is a generalist agency with a specialist’s website.</p>
        <p>We would rather run three desks properly. Maritime is the anchor and always will be — it is where Nevoxel started in 2008 and where the network is deepest. Logistics grew directly out of it, because that is where the cargo and the people go next. Legal is a standalone desk, started where our clients already needed it.</p>
        <p>Everything else is a market we recruit into when a mandate touches one of those three, and we will say so rather than claim a desk we do not have.</p>
      </div>
    </div>`,
    });

    const deskCards = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Where we work',
      })}
    ${C.cardGrid(
      hubs.map((h) =>
        C.card({
          title: h.eyebrow,
          body: h.lede,
          href: h.url,
          meta: `${jobs.filter((j) => j.sector === h.jobsSector).length} open ${
            jobs.filter((j) => j.sector === h.jobsSector).length === 1 ? 'role' : 'roles'
          }`,
        })
      ),
      { cols: 3 }
    )}`,
    });

    const cross = C.band({
      tone: 'shoal',
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          title: 'Executive search is a service, not a sector',
          lede: 'CXO, COO, CFO, CHRO, director and head-of appointments run the same way whichever desk they sit on — retained, mapped and confidential.',
        })}
      </div>
      <div data-motion="rise">
        <div class="note">Senior appointments in a market this small cannot be advertised without announcing them. <a href="/employers/executive-search">How a confidential search runs →</a></div>
      </div>
    </div>`,
    });

    const next = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        title: 'Desks in planning',
        lede: 'Named here so the direction is visible. Neither has a page yet, because neither has a track record to put on one.',
      })}
    ${C.cardGrid(
      upcoming.map((u) => C.card({ title: u.title, body: u.body, meta: u.meta })),
      { cols: 2 }
    )}`,
    });

    return page({
      url: '/expertise',
      title: 'Expertise — our specialist desks',
      description:
        'Nevoxel runs three specialist recruitment desks: maritime, logistics and legal. Executive search runs across all of them. Energy and engineering follow in 2027.',
      main: [hero, intro, deskCards, cross, next, C.ctaBand()].join('\n'),
    });
  },
};

/* -------------------------------------------------------------------- hubs */

const [maritime, logistics, legal] = hubs.map(hubPage);

module.exports = { overview, maritime, logistics, legal };
