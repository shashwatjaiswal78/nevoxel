const { page } = require('../layout');
const C = require('../components');
const { jobs } = require('../content/jobs');
const { testimonials } = require('../content/site');

/* ---------------------------------------------------------------- overview */

const candidateFaq = [
  {
    q: 'Will I have to take a pay cut to come ashore?',
    a: [
      'On the payslip, often yes. In total compensation, frequently not — sea salary is tax-advantaged and comes with no living costs attached, so the comparison is rarely like for like.',
      'We model the real difference with you before you accept anything, including tax, housing and the value of being home. Candidates who skip this step are the ones who start looking again in month six.',
    ],
  },
  {
    q: 'I have never worked ashore. Is that a problem?',
    a: [
      'Not for the roles we work on. Superintendency, vetting, marine assurance, port captain and operations roles specifically want sea time — that is the qualification, not a gap.',
      'What does need work is how you present it. A CV written for a manning agent does not read well to a shore hiring manager, which is what the resume and coaching work is for.',
    ],
  },
  {
    q: 'How long does the transition take?',
    a: [
      'From first conversation to a start date, usually two to four months. The search itself is often quick; notice periods and contract completion are what set the pace.',
      'If you are still sailing, start the conversation a contract early rather than after you sign off.',
    ],
  },
  {
    q: 'Do you charge candidates?',
    a: [
      'No. Our fees are paid by employers. Resume help and coaching are part of working with us, not a paid product.',
    ],
  },
  {
    q: 'What if there is nothing suitable right now?',
    a: [
      'Send your CV anyway. The board shows what is live today, and a meaningful share of our placements come from candidates we already knew when the right mandate arrived.',
    ],
  },
];

const overview = {
  url: '/candidates',
  priority: '0.9',
  render() {
    const hero = C.pageHero({
      title: 'Take your maritime career <em>ashore</em>',
      lede: 'You have the sea time. The hard part is getting a shore-side hiring manager to read it properly. That is the part we do — then we stay with you through the first year, which is where these moves are actually won or lost.',
      actions: [
        C.btn('Browse jobs', '/jobs', { variant: 'solid', icon: true }),
        C.btn('Get resume help', '/candidates/resume-coaching', { variant: 'ghost', icon: true }),
      ],
      image: {
        src: '/assets/img/hero/candidates.webp',
        alt: 'Merchant navy officer holding a document folder outside a port office building',
        width: 1536,
        height: 1024,
      },
    });

    const preview = C.band({
      tone: 'paper',
      coast: true,
      body: `    ${C.sectionHead({
        title: 'What is live right now',
        lede: 'Every role on our board is a real mandate we are working. Filter by function, sector or location.',
      })}
    <div class="job-list" data-motion="stagger">
      ${jobs
        .slice(0, 5)
        .map((job) => C.jobCard(job, { compact: true }))
        .join('\n      ')}
    </div>
    ${C.btnRow([C.btn(`See all ${jobs.length} jobs`, '/jobs', { variant: 'outline', icon: true })])}`,
    });

    const programmes = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Two things we do before you apply',
        lede: 'Both are free to candidates. Our fees are paid by employers.',
      })}
    ${C.cardGrid(
      [
        C.card({
          title: 'Sea2Shore',
          body: 'Our structured transition programme for seafarers coming ashore — market orientation, CV translation, interview preparation and first-year support once you land.',
          href: '/candidates/sea2shore',
          meta: 'Transition programme',
        }),
        C.card({
          title: 'Resume help & coaching',
          body: 'We rewrite your CV so a shore reader understands what you actually did, then run interview practice for the questions that catch seafarers out.',
          href: '/candidates/resume-coaching',
          meta: 'Free to candidates',
        }),
      ],
      { cols: 2 }
    )}`,
    });

    const why = C.band({
      tone: 'shoal',
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          title: 'We argue your case in writing',
          lede: 'Every candidate we put forward goes with a written note explaining how their sea experience maps to the shore role — because the hiring manager reading it has probably never been aboard.',
        })}
      </div>
      <div>
        ${C.statRow([
          { figure: '2008', label: 'Placing seafarers ashore since' },
          { figure: '365', label: 'Days of support after you start' },
          { figure: '₹0', label: 'What candidates pay us' },
        ])}
      </div>
    </div>`,
    });

    const faq = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({
        title: 'What candidates ask us first',
      })}
    ${C.accordion(candidateFaq, { name: 'candidate-faq' })}`,
    });

    const quotes = C.band({
      tone: 'paper-alt',
      size: 'tight',
      body: `    ${C.testimonialSlider(testimonials.filter((t) => t.audience === 'candidate'))}`,
    });

    return page({
      url: '/candidates',
      title: 'For Candidates — Take your maritime career ashore',
      description:
        'Shore-based maritime jobs for seafarers and maritime professionals. Free CV help, interview coaching and the Sea2Shore transition programme.',
      main: [
        hero,
        preview,
        programmes,
        why,
        faq,
        quotes,
        C.ctaBand({
          title: 'Send us your CV',
          body: 'Even if nothing on the board fits today. A good share of our placements start this way.',
          primary: { label: 'Get in touch', href: '/contact?for=candidate' },
          secondary: { label: 'Browse jobs', href: '/jobs' },
        }),
      ].join('\n'),
      jsonld: [C.faqSchema(candidateFaq)],
    });
  },
};

/* -------------------------------------------------------------- Sea2Shore */

const sea2shoreFaq = [
  {
    q: 'Who is Sea2Shore for?',
    a: [
      'Serving and recently sailing officers and engineers who want a shore role — typically Second Engineer and above, or Second Officer and above, though we take people earlier where the target role suits it.',
    ],
  },
  {
    q: 'What does it cost?',
    a: [
      'Nothing. Sea2Shore is part of how we work with candidates, and our fees are paid by employers.',
    ],
  },
  {
    q: 'Do I have to be signed off to start?',
    a: [
      'No, and it is better if you are not. The strongest transitions start a contract before someone comes ashore, because it gives time to fix the CV, understand the market and be ready when the right mandate appears.',
    ],
  },
  {
    q: 'Does it guarantee a job?',
    a: [
      'No, and anyone promising otherwise is selling something. It gets you correctly presented, properly prepared and in front of the mandates that fit. The hiring decision stays with the employer.',
    ],
  },
];

const sea2shore = {
  url: '/candidates/sea2shore',
  priority: '0.8',
  render() {
    const hero = C.pageHero({
      title: 'Sea2Shore',
      lede: 'A structured route from <em>the last contract</em> to the first shore year. Built because we watched too many good officers make the move badly and go back to sea within eighteen months.',
      actions: [
        C.btn('Start the conversation', '/contact?for=candidate', { variant: 'solid', icon: true }),
        C.btn('See open roles', '/jobs', { variant: 'ghost', icon: true }),
      ],
      image: {
        src: '/assets/img/hero/sea2shore.webp',
        alt: 'Merchant navy officer with a kit bag walking down a gangway onto the quayside',
        width: 1536,
        height: 1024,
      },
    });

    const what = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="split">
      <div data-motion="rise">
        <p class="lede-lg">Four stages, running from before you sign off to a year after you start ashore.</p>
      </div>
      <div class="prose" data-motion="rise">
        <p>Coming ashore is not one decision. It is a sequence: working out which shore roles your sea time actually opens, presenting that experience so a shore reader understands it, getting through interviews that ask unfamiliar questions, and then surviving a first year that feels nothing like a rotation.</p>
        <p>Most people attempt all four alone and at speed, usually in the two months after signing off. Sea2Shore spreads it out and puts someone alongside you who has done it several hundred times.</p>
      </div>
    </div>`,
    });

    const stages = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Four stages',
      })}
    ${C.processTimeline([
      {
        step: 'Orient',
        body: 'Which shore roles your rank, vessel type and inspection history actually open — and which ones are a stretch. An honest map before you start applying.',
        duration: 'Before sign-off',
      },
      {
        step: 'Translate',
        body: 'We rewrite the CV for a shore audience: rank to responsibility, tonnage to asset value, SIRE and TMSA history to compliance experience.',
        duration: 'Week 1–2',
      },
      {
        step: 'Prepare',
        body: 'Interview practice for the questions that catch seafarers out — competency framing, salary conversations, and how to answer "have you managed a team ashore?"',
        duration: 'Week 2–4',
      },
      {
        step: 'Land',
        body: 'Offer support, then check-ins at 30, 90 and 365 days. The first shore year has a predictable wobble, and knowing it is coming is most of the fix.',
        duration: 'First year',
      },
    ])}`,
    });

    const truth = C.band({
      tone: 'shoal',
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          title: 'What nobody tells you about the first year',
        })}
      </div>
      <div class="prose" data-motion="rise">
        <p><strong>Rank disappears.</strong> At sea, authority is structural and everyone can see it. Ashore, you build influence with managers who have never sailed. That lands around month three and it feels like failure. It is not.</p>
        <p><strong>Money changes shape.</strong> The shore figure looks smaller because sea earnings are tax-advantaged and carry no living costs. Model the real number before you accept, not after.</p>
        <p><strong>The pace is different.</strong> Decisions take three weeks. Meetings end without resolving anything. After a career where the answer arrived within one watch, that ambiguity is genuinely uncomfortable.</p>
        <p>None of this is a reason to stay at sea. It is a reason to plan the move rather than take the first offer with a shore address.</p>
      </div>
    </div>`,
    });

    const faq = C.band({
      tone: 'paper',
      body: `    ${C.sectionHead({ title: 'About the programme' })}
    ${C.accordion(sea2shoreFaq, { name: 's2s-faq' })}`,
    });

    return page({
      url: '/candidates/sea2shore',
      title: 'Sea2Shore — the seafarer transition programme',
      description:
        'Sea2Shore is Nevoxel’s transition programme for seafarers moving ashore: orientation, CV translation, interview preparation and first-year support. Free to candidates.',
      main: [
        hero,
        what,
        stages,
        truth,
        faq,
        C.ctaBand({
          title: 'Thinking about coming ashore?',
          body: 'Start a contract early. It costs nothing and it changes what is available to you.',
          primary: { label: 'Talk to us', href: '/contact?for=candidate' },
          secondary: { label: 'Browse jobs', href: '/jobs' },
        }),
      ].join('\n'),
      jsonld: [C.faqSchema(sea2shoreFaq)],
    });
  },
};

/* ------------------------------------------------- resume help & coaching */
// Merges the old Resume Help page with a real Coaching page — the brief flags
// the previous Coaching link as a 404.

const resumeCoaching = {
  url: '/candidates/resume-coaching',
  priority: '0.8',
  render() {
    const hero = C.pageHero({
      title: 'Resume help & coaching',
      lede: 'Your CV is not weak. It is written for a manning agent, and it is being read by someone who has never seen an engine room. We fix the translation, then prepare you for the interview.',
      actions: [
        C.btn('Request help', '/contact?for=candidate', { variant: 'solid', icon: true }),
        C.btn('About Sea2Shore', '/candidates/sea2shore', { variant: 'ghost', icon: true }),
      ],
    });

    const problem = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="split">
      <div data-motion="rise">
        <p class="lede-lg">Four things on a sea CV that shore readers get wrong every time.</p>
      </div>
      <div class="prose" data-motion="rise">
        <p><strong>Rotation reads as unemployment.</strong> Four months on, four months off looks like a gap to an ATS and to a recruiter who does not know better. It needs to be stated as a contract pattern, explicitly.</p>
        <p><strong>Rank reads as a grade.</strong> "Chief Engineer" sounds technical. It means running a plant worth tens of millions with a crew of twenty-odd, no relief and nobody to escalate to. That has to be said in words a shore reader recognises.</p>
        <p><strong>Vessel type gets skipped.</strong> Tanker officers arrive fluent in SIRE, CDI and TMSA. That is years of audit and compliance experience, and it belongs near the top of the page.</p>
        <p><strong>Certificates look like tickets.</strong> A Class I CoC is a professional qualification with a brutal examination pass rate. Presented as a list of acronyms, it reads like a training log.</p>
      </div>
    </div>`,
    });

    const whatYouGet = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Three sessions, no charge',
        lede: 'Our fees come from employers. This is part of working with us, not a product we sell.',
      })}
    ${C.cardGrid(
      [
        C.card({
          title: 'CV rewrite',
          body: 'A full rewrite for a shore audience, with your sea experience mapped to the language of the roles you are targeting. You keep the document either way.',
          index: '01',
        }),
        C.card({
          title: 'Interview coaching',
          body: 'Practice for the questions that catch seafarers out: competency framing, "tell me about a conflict", and the salary conversation.',
          index: '02',
        }),
        C.card({
          title: 'Package modelling',
          body: 'An honest comparison between your current sea earnings and a shore offer, including tax and living costs, before you have to decide.',
          index: '03',
        }),
      ],
      { cols: 3 }
    )}`,
    });

    const checklist = C.band({
      tone: 'shoal',
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          title: 'A quick self-check',
          lede: 'If you would rather do this yourself, these are the five things we change most often.',
        })}
        ${C.btnRow([C.btn('Or let us do it', '/contact?for=candidate', { variant: 'ghost', icon: true })])}
      </div>
      <div class="prose" data-motion="rise">
        <ul>
          <li>State your contract pattern explicitly, so rotation is never read as a gap.</li>
          <li>Put vessel type, DWT and trade in the first three lines of each role.</li>
          <li>Name the inspection regimes you have worked under, and your results.</li>
          <li>Give crew size and budget responsibility as numbers, not adjectives.</li>
          <li>Cut the certificate wall down to what the target role actually needs.</li>
        </ul>
      </div>
    </div>`,
    });

    return page({
      url: '/candidates/resume-coaching',
      title: 'Resume Help & Coaching',
      description:
        'Free CV rewriting and interview coaching for seafarers moving ashore. We translate sea experience into language shore-side hiring managers understand.',
      main: [
        hero,
        problem,
        whatYouGet,
        checklist,
        C.ctaBand({
          title: 'Send us the CV you have',
          body: 'However rough. We will tell you what a shore reader is going to see.',
          primary: { label: 'Request help', href: '/contact?for=candidate' },
          secondary: { label: 'Browse jobs', href: '/jobs' },
        }),
      ].join('\n'),
    });
  },
};

module.exports = { overview, sea2shore, resumeCoaching };
