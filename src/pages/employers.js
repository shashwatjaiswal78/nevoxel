const { page } = require('../layout');
const C = require('../components');
const { sectors, testimonials } = require('../content/site');

/* ---------------------------------------------------------------- overview */

const overview = {
  url: '/employers',
  priority: '0.9',
  render() {
    const hero = C.pageHero({
      eyebrow: 'For employers',
      coord: 'Course 2',
      title: 'Hire proven shore-based maritime talent',
      lede: 'Shortlists of three to five, each candidate interviewed by us first and defended in writing. Confidential when the market is small enough that advertising the role would tell your competitors what you are planning.',
      actions: [
        C.btn('Book a discovery call', '/contact?for=employer', { variant: 'solid', icon: true }),
        C.btn('See how we work', '#process', { variant: 'ghost' }),
      ],
    });

    const problem = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="split">
      <div data-motion="rise">
        <p class="lede-lg">Most maritime shortlists fail for one of three reasons. None of them is a shortage of people.</p>
      </div>
      <div class="prose" data-motion="rise">
        <p><strong>Speed.</strong> Good shore candidates are usually employed and rarely looking. By the time a role has been advertised for six weeks, the people you wanted have signed elsewhere. We work from a live network rather than an inbox.</p>
        <p><strong>Translation.</strong> Hiring managers without sea time misread sea CVs — treating rotation as a career gap, or rank as a technical grade rather than command experience. Every shortlist we send includes the translation.</p>
        <p><strong>Discretion.</strong> Indian shore-side maritime is small. An open advertisement for a Fleet Manager is a public signal. Confidential search removes that signal, at the cost of a couple of extra weeks.</p>
      </div>
    </div>`,
    });

    const services = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        eyebrow: 'Services',
        title: 'Three ways we work with you',
      })}
    ${C.cardGrid(
      [
        C.card({
          title: 'Maritime shore recruitment',
          body: 'Technical, marine, operations, chartering, crewing and HSEQ roles across the fleet and the office. Contingent or retained depending on the mandate.',
          href: '/employers/maritime-recruitment',
          meta: 'Flagship',
        }),
        C.card({
          title: 'Executive search',
          body: 'CXO, Fleet Director and Head-of appointments. Retained, mapped, and confidential by default.',
          href: '/employers/executive-search',
          meta: 'Retained',
        }),
        C.card({
          title: 'HR advisory (NECD)',
          body: 'Wellness programmes, training design, TMSA-aligned HR practice and retention work for maritime employers.',
          href: '/employers/hr-advisory',
          meta: 'Advisory',
        }),
      ],
      { cols: 3 }
    )}`,
    });

    const sectorBand = C.band({
      tone: 'paper',
      size: 'tight',
      body: `    ${C.sectionHead({
        eyebrow: 'Sectors served',
        title: 'Maritime first, adjacent where the skills transfer',
        lede: 'Our network is maritime. It reaches into these sectors because that is where maritime people go, and where maritime employers compete for talent.',
      })}
    ${C.sectorChips(sectors)}`,
    });

    const processBand = C.band({
      tone: 'shoal',
      id: 'process',
      body: `    ${C.sectionHead({
        eyebrow: 'Process',
        title: 'Brief to placement, then the first year',
        lede: 'Four steps, and a fifth that most agencies skip: we stay in contact after the start date, because the transition ashore is where placements wobble.',
      })}
    ${C.processTimeline()}
    <div class="note" style="margin-top:var(--s5);max-width:60ch" data-motion="rise">
      <strong>Retention support.</strong> Structured check-ins at 30, 90 and 365 days with both sides.
      If something is going wrong, we would rather hear it at week six than at the exit interview.
    </div>`,
    });

    const proof = C.band({
      tone: 'paper-alt',
      body: `    ${C.trustBar()}
    <div style="margin-top:var(--s6)">
      ${C.testimonialSlider(testimonials.filter((t) => t.audience === 'employer'))}
    </div>`,
    });

    const lead = C.band({
      tone: 'paper',
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          eyebrow: 'Brief us',
          title: 'Tell us your hiring need',
          lede: 'A short note is enough to start. We will come back with a view on the market, a realistic timeline, and what the package needs to look like to win.',
        })}
        <div class="note" data-motion="rise">Goes straight to the recruitment desk — no shared inbox, no routing delay.</div>
      </div>
      <div data-motion="rise">
        ${C.routedForm({ id: 'employer-brief', defaultSegment: 'employer', compact: true })}
      </div>
    </div>`,
    });

    return page({
      url: '/employers',
      title: 'For Employers — Hire shore-based maritime talent',
      description:
        'Shore-based maritime recruitment for employers: maritime recruitment, executive search and HR advisory. Shortlists of three to five, confidential where required.',
      main: [hero, problem, services, sectorBand, processBand, proof, lead].join('\n'),
    });
  },
};

/* -------------------------------------------------- service page template */

/**
 * Shared service-detail template, per the wireframe in Part C:
 * hero -> what it is -> what you get -> programme cards -> proof -> CTA.
 */
function servicePage({
  url,
  title,
  metaTitle,
  description,
  eyebrow,
  lede,
  cta,
  what,
  outcomes,
  highlights,
  highlightsTitle,
  stats,
  faq,
}) {
  return {
    url,
    priority: '0.8',
    render() {
      const hero = C.pageHero({
        eyebrow,
        title,
        lede,
        actions: [
          C.btn(cta.label, cta.href, { variant: 'solid', icon: true }),
          C.btn('All employer services', '/employers', { variant: 'ghost' }),
        ],
      });

      const whatBand = C.band({
        tone: 'paper',
        coast: true,
        body: `    <div class="split">
      <div data-motion="rise">
        ${C.eyebrow('What it is')}
        <p class="lede-lg">${what.summary}</p>
      </div>
      <div class="prose" data-motion="rise">
        ${what.body.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
    </div>`,
      });

      const outcomesBand = C.band({
        tone: 'paper-alt',
        body: `    ${C.sectionHead({
          eyebrow: 'What you get',
          title: 'Deliverables, not promises',
        })}
    ${C.cardGrid(
      outcomes.map((o, i) =>
        C.card({ title: o.title, body: o.body, index: String(i + 1).padStart(2, '0') })
      ),
      { cols: outcomes.length === 4 ? 4 : 3 }
    )}`,
      });

      const highlightBand = highlights
        ? C.band({
            tone: 'shoal',
            body: `    ${C.sectionHead({
              eyebrow: 'Programme',
              title: highlightsTitle || 'Programme highlights',
            })}
    ${C.cardGrid(
      highlights.map((h) => C.card({ title: h.title, body: h.body, meta: h.meta })),
      { cols: 3 }
    )}`,
          })
        : '';

      const statBand = stats
        ? C.band({
            tone: 'paper',
            size: 'tight',
            body: `    ${C.statRow(stats)}`,
          })
        : '';

      const faqBand = faq
        ? C.band({
            tone: 'paper-alt',
            body: `    ${C.sectionHead({ eyebrow: 'Questions', title: 'Before you brief us' })}
    ${C.accordion(faq, { name: 'service-faq' })}`,
          })
        : '';

      const proof = C.band({
        tone: 'paper',
        size: 'tight',
        body: `    ${C.testimonialSlider(testimonials.filter((t) => t.audience === 'employer'))}`,
      });

      return page({
        url,
        title: metaTitle || title,
        description,
        main: [
          hero,
          whatBand,
          outcomesBand,
          highlightBand,
          statBand,
          faqBand,
          proof,
          C.ctaBand({
            title: cta.bandTitle || 'Ready to brief us?',
            body: cta.bandBody || 'Tell us the role. We will tell you what it will take.',
            primary: { label: cta.label, href: cta.href },
            secondary: { label: 'See all services', href: '/employers' },
          }),
        ]
          .filter(Boolean)
          .join('\n'),
        jsonld: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: title,
            description,
            serviceType: title,
            areaServed: { '@type': 'Country', name: 'India' },
            provider: { '@type': 'Organization', name: 'Nevoxel' },
          },
          ...(faq ? [C.faqSchema(faq)] : []),
        ],
      });
    },
  };
}

/* ------------------------------------------------- maritime recruitment */

const maritimeRecruitment = servicePage({
  url: '/employers/maritime-recruitment',
  eyebrow: 'Flagship service',
  title: 'Maritime shore recruitment',
  metaTitle: 'Maritime Shore Recruitment',
  description:
    'Shore-based maritime recruitment for superintendents, operations, chartering, crewing and HSEQ roles. Shortlists of three to five, each candidate interviewed first.',
  lede: 'Superintendents, operations, chartering, crewing, HSEQ. The desk we have run since 2008, and the one most of our placements come from.',
  cta: { label: 'Brief us on a role', href: '/contact?for=employer' },
  what: {
    summary:
      'Filling shore roles with people who understand ships, without spending six months finding them.',
    body: [
      'Most of our mandates are shore positions inside owners, managers, terminals and charterers — the jobs that need someone who has either sailed or spent years working alongside people who have. That population is small, employed, and does not read job boards.',
      'We work it directly. Seventeen years of desk notes means we usually know who is in the role, who is ready to move, and what it would take. When the search needs to be quiet, it is quiet.',
      'The output is a short list with a written case for each person: what they have done, how it maps to your role, and — stated plainly — where they will need support in the first six months.',
    ],
  },
  outcomes: [
    {
      title: 'A shortlist you can act on',
      body: 'Three to five candidates, each interviewed by us before you see them. No CV volume, no filler.',
    },
    {
      title: 'The translation',
      body: 'Sea experience mapped to your shore requirement — rank to responsibility, tonnage to asset value, inspection history to compliance experience.',
    },
    {
      title: 'Market intelligence',
      body: 'What the role is really worth, who else is hiring for it, and why your last search stalled.',
    },
    {
      title: 'First-year support',
      body: 'Check-ins at 30, 90 and 365 days with both sides, so problems surface while they are still fixable.',
    },
  ],
  stats: [
    { figure: '3–5', label: 'Candidates on a typical shortlist' },
    { figure: '2008', label: 'Running this desk since' },
    { figure: '3', label: 'Offices across India' },
  ],
  faq: [
    {
      q: 'Contingent or retained?',
      a: [
        'Both, depending on the mandate. Contingent suits roles with a reasonable candidate pool where speed matters most. Retained suits senior, scarce or confidential roles where the search needs mapping rather than matching.',
        'We will tell you which one the role actually needs, including when that is the cheaper option.',
      ],
    },
    {
      q: 'How long does a search take?',
      a: [
        'First shortlist in two to three weeks for most shore roles. Confidential and executive mandates run two to three weeks longer, because there is no inbound flow to work with and every candidate is a direct approach.',
      ],
    },
    {
      q: 'Do you work outside maritime?',
      a: [
        'We recruit into logistics, energy, manufacturing, BFSI, pharma, technology and finance — but almost always where the role touches maritime, or where the candidate is coming from it. We are not a generalist agency and do not pretend to be.',
      ],
    },
    {
      q: 'What happens if the placement does not work out?',
      a: [
        'We agree a replacement period at the point of engagement, and we run structured check-ins through the first year specifically so that conversation happens early rather than at an exit interview.',
      ],
    },
  ],
});

/* ------------------------------------------------------- executive search */

const executiveSearch = servicePage({
  url: '/employers/executive-search',
  eyebrow: 'Retained · confidential',
  title: 'Executive search',
  metaTitle: 'Executive Search',
  description:
    'Retained executive search for CXO, Fleet Director and Head-of appointments in maritime and logistics. Mapped, confidential and discreet by default.',
  lede: 'CXO, Fleet Director and Head-of appointments. Mapped rather than advertised, because in a market this small the advertisement is the announcement.',
  cta: { label: 'Start a confidential search', href: '/contact?for=employer' },
  what: {
    summary:
      'When the role cannot be advertised, the search has to go and find the person instead.',
    body: [
      'Senior maritime appointments in India happen in a market small enough that naming the company identifies the position within a day. Sometimes the incumbent is still in post. Sometimes the hire signals a strategy shift you are not ready to publish.',
      'A retained search replaces the advertisement with a mapped direct approach. We identify the specific owners, managers and operators the right profile comes from, approach individuals personally, and do not name you until there is mutual interest — under NDA where the situation calls for it.',
      'It is slower and it is more work. What you get back is a slate drawn from people who were not looking, which in a market this size is usually where the right person is.',
    ],
  },
  outcomes: [
    {
      title: 'A mapped market',
      body: 'A written view of who holds the equivalent role across the target set, and which of them are genuinely approachable.',
    },
    {
      title: 'Discreet approach',
      body: 'Candidates contacted personally and confidentially. Your name enters the conversation only when both sides are interested.',
    },
    {
      title: 'Assessed slate',
      body: 'A defended shortlist with structured interview notes, references taken on request, and an honest read on each candidate’s risk.',
    },
    {
      title: 'Offer management',
      body: 'Package benchmarking, notice-period navigation and counter-offer defence — where senior hires are most often lost.',
    },
  ],
  stats: [
    { figure: '4–6', label: 'Weeks to a typical executive slate' },
    { figure: '100%', label: 'Of executive mandates run confidentially' },
  ],
  faq: [
    {
      q: 'How confidential is confidential?',
      a: [
        'Your name is not used in any approach until a candidate has expressed interest in an anonymised description of the role and, where you require it, signed an NDA. No advertisement is placed and the mandate does not appear on our job board.',
      ],
    },
    {
      q: 'Why does it take longer than a normal search?',
      a: [
        'Because there is no inbound flow. Every candidate is a direct approach, and senior people take a week or two to respond to an unsolicited conversation about their career. Budget two to three weeks more than a contingent search.',
      ],
    },
    {
      q: 'Can you search outside India?',
      a: [
        'Our network is strongest across India and the Gulf, and reaches into Singapore and Northern Europe through candidates who have worked there. For mandates centred outside those markets we will say so rather than take the brief.',
      ],
    },
  ],
});

/* ------------------------------------------------------------ HR advisory */

const hrAdvisory = servicePage({
  url: '/employers/hr-advisory',
  eyebrow: 'Advisory · NECD',
  title: 'HR advisory (NECD)',
  metaTitle: 'HR Advisory (NECD)',
  description:
    'HR advisory for maritime employers: wellness programmes, training design, TMSA-aligned HR practice and retention work. Delivered under our NECD advisory practice.',
  lede: 'Wellness, training and TMSA-aligned HR practice for maritime employers whose people systems have not kept pace with the fleet.',
  cta: { label: 'Discuss an advisory brief', href: '/contact?for=employer' },
  what: {
    summary:
      'Recruitment fixes a vacancy. Advisory fixes the reason the vacancy keeps coming back.',
    body: [
      'We started NECD because clients kept asking the same follow-up question. They would fill a role, then lose someone else six months later, and want to know what was actually going on underneath.',
      'The advisory practice covers the people systems around maritime employment: wellness and mental health support for shore and sea staff, training design, appraisal and retention frameworks, and the HR evidence that TMSA element reviews ask for.',
      'It is delivered by people who understand both sides — Rajesh Menon leads the wellness and coaching work, and Adv. Surangama Sharma advises on the employment law and compliance side.',
    ],
  },
  outcomes: [
    {
      title: 'Wellness programmes',
      body: 'Practical mental health and wellbeing support designed for rotation-based work, not lifted from an office template.',
    },
    {
      title: 'Training design',
      body: 'Onboarding and development programmes for shore staff, including the specific gaps ex-seafarers hit in their first year.',
    },
    {
      title: 'TMSA-aligned HR practice',
      body: 'The recruitment, competence and appraisal evidence TMSA element reviews look for, documented so it survives an audit.',
    },
    {
      title: 'Retention diagnosis',
      body: 'Exit-interview analysis and a written view of why people are actually leaving, which is rarely the reason stated.',
    },
  ],
  highlightsTitle: 'How NECD engagements run',
  highlights: [
    {
      title: 'Diagnostic',
      body: 'Two to three weeks of interviews and document review, ending in a written findings note with prioritised recommendations.',
      meta: 'Weeks 1–3',
    },
    {
      title: 'Design',
      body: 'We build the programme, framework or documentation with your HR team rather than handing over a deck.',
      meta: 'Weeks 4–8',
    },
    {
      title: 'Embed',
      body: 'Training delivery, manager coaching, and a review at six months to check the change actually held.',
      meta: 'Ongoing',
    },
  ],
  faq: [
    {
      q: 'What does NECD stand for?',
      a: [
        'It is the name of our advisory practice, covering wellness, training, compliance and development work that sits alongside recruitment. Engagements are scoped individually rather than sold as a fixed package.',
      ],
    },
    {
      q: 'Do we have to be a recruitment client?',
      a: [
        'No. Advisory engagements run independently, and several of our advisory clients have never used us to recruit.',
      ],
    },
    {
      q: 'Can you support a TMSA element review directly?',
      a: [
        'We can prepare the HR-side evidence — recruitment, competence, appraisal and training records — and advise on gaps. We are not a vetting consultancy and do not represent ourselves as one during the review itself.',
      ],
    },
  ],
});

module.exports = { overview, maritimeRecruitment, executiveSearch, hrAdvisory };
