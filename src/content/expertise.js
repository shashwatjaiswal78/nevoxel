/**
 * Practice verticals — the "Expertise" axis.
 *
 * A vertical hub answers one question: *do you actually know my market?* It
 * does NOT explain how a mandate runs — that is what the service pages under
 * /employers are for. Keeping that line clean is what stops /maritime and
 * /employers/maritime-recruitment competing for the same search terms.
 *
 * Each hub lists the live roles whose `sector` matches its `jobsSector`, so the
 * sector values here must match the ones used in content/jobs.js exactly.
 *
 * PLACEHOLDER POLICY (same as content/site.js)
 * --------------------------------------------
 * Anything not yet evidenced is flagged with `isPlaceholder` and renders with a
 * visible marker. The legal desk in particular is new — its roster and its
 * proof are still with Nevoxel. Delete the flag once the real content lands.
 */

/* ------------------------------------------------------------- hero images */
/**
 * Full-bleed hero photographs, one per desk, shot as a set — same light, same
 * distance — because anyone browsing the desks sees them side by side. They sit
 * under the navy scrim, so keep the subject right of centre. Alt text is
 * literal, per Harbour §14.
 */

const heroImages = {
  maritime: {
    src: '/assets/img/hero/maritime-desk.webp',
    alt: 'Marine superintendent inspecting deck equipment during a port call',
    width: 1672,
    height: 941,
  },
  logistics: {
    src: '/assets/img/hero/logistics-desk.webp',
    alt: 'Freight forwarding warehouse with racking and a forklift in motion',
    width: 1448,
    height: 1086,
  },
  legal: {
    src: '/assets/img/hero/legal-desk.webp',
    alt: 'Charterparty documents being annotated at a desk',
    width: 1536,
    height: 1024,
  },
};

/* ---------------------------------------------------------------- maritime */

const maritime = {
  url: '/maritime',
  jobsSector: 'Maritime',
  eyebrow: 'Nevoxel Maritime',
  title: 'The maritime desk',
  metaTitle: 'Nevoxel Maritime — shore-based maritime recruitment',
  description:
    'The Nevoxel maritime desk: shore-based, ship management, technical and marine, commercial shipping, QHSE, port and terminal roles across India. Running since 2008.',
  lede: 'Shore-based, ship management, technical and marine, commercial, QHSE, port and terminal. The desk Nevoxel was founded on in 2008, and where most of our placements still come from.',
  image: heroImages.maritime,
  market: {
    summary:
      'The people who can do these jobs are a small, employed population who do not read job boards.',
    body: [
      'Indian shore-side maritime is a market of a few thousand people who matter, spread across owners, managers, terminals, charterers and class. Most of them are in post, most are not looking, and the ones worth hiring are known to their peers rather than to a database.',
      'We have worked that population from the same three offices since 2008. Seventeen years of desk notes means we usually know who holds the role, who is genuinely movable, and what the package would have to look like.',
      'The other half of the job is translation. A Second Engineer’s watch record is a management CV if you know how to read it, and most shore-side hiring managers have never been given the key. Every shortlist we send includes it.',
    ],
  },
  covers: [
    {
      title: 'Shore-based maritime',
      body: 'Fleet, operations, chartering and crewing roles inside owners, managers and operators — the core of the desk.',
    },
    {
      title: 'Ship management',
      body: 'Technical and marine superintendents, fleet managers, and the shore teams that run third-party managed tonnage.',
    },
    {
      title: 'Technical & marine',
      body: 'Naval architects, marine engineers, newbuild and drydock supervision, and vetting and inspection specialists.',
    },
    {
      title: 'Commercial shipping',
      body: 'Chartering, post-fixture, demurrage, bunkering and freight trading roles across dry bulk, tanker and gas.',
    },
    {
      title: 'QHSE',
      body: 'HSEQ managers, marine assurance, TMSA and SIRE preparation, incident investigation and compliance leads.',
    },
    {
      title: 'Port & terminal',
      body: 'Port captains, terminal operations, marine services and the shore interface roles at berth and gate.',
    },
  ],
  stats: [
    { figure: '2008', label: 'Running this desk since' },
    { figure: '3', label: 'Offices across India' },
    { figure: '3–5', label: 'Candidates on a typical shortlist' },
  ],
  desk: {
    title: 'Who runs this desk',
    lede: 'The maritime desk is led from Mumbai by the founder, which is unusual at this size and deliberate.',
    members: [
      {
        title: 'Neetu Jaiswal',
        meta: 'Founder & Chief Executive',
        body: 'Founded Nevoxel in 2008 and has run the maritime desk since. Star Women in Maritime 2022 awardee for contribution to shore-side maritime hiring.',
      },
    ],
  },
  faq: [
    {
      q: 'Is this the same as the maritime recruitment service page?',
      a: [
        'No. This page is about the market — the roles we fill and the people we know. <a href="/employers/maritime-recruitment">Maritime shore recruitment</a> is about method: how a mandate actually runs, what you get, and how long it takes.',
      ],
    },
    {
      q: 'Do you place seagoing crew?',
      a: [
        'No. Nevoxel is shore-based only. We place people who have been to sea into jobs ashore, and we place shore professionals into maritime companies — but we are not a crewing agency and do not man vessels.',
      ],
    },
    {
      q: 'I am still sailing. Is it too early to talk?',
      a: [
        'No, and earlier is usually better. The <a href="/candidates/sea2shore">Sea2Shore programme</a> exists specifically for officers planning the move a contract or two ahead of making it.',
      ],
    },
  ],
};

/* --------------------------------------------------------------- logistics */

const logistics = {
  url: '/logistics',
  jobsSector: 'Logistics',
  eyebrow: 'Nevoxel Logistics',
  title: 'The logistics desk',
  metaTitle: 'Nevoxel Logistics — freight, supply chain and trade recruitment',
  description:
    'The Nevoxel logistics desk: freight forwarding, 3PL and 4PL, supply chain, warehousing, transportation, customs and trade, and procurement roles across India.',
  lede: 'Freight forwarding, 3PL and 4PL, supply chain, warehousing, transportation, customs and trade, procurement. The desk that grew out of maritime, because that is where the cargo goes next.',
  image: heroImages.logistics,
  market: {
    summary:
      'Ports and inland logistics are being built as one network, and the hiring has not caught up with that yet.',
    body: [
      'This desk exists because our maritime clients kept asking for it. A terminal operator hiring a port captain also needs a yard manager; a shipowner moving into freight forwarding needs people who understand both ends. The two markets were already one conversation.',
      'India’s port, shipping and inland logistics policy is explicitly being written as an integrated network, which means the roles are increasingly integrated too — and the candidates who can work across the seam are the scarce ones.',
      'We recruit into that seam. Freight and supply chain roles where maritime knowledge is an advantage, and shore-side maritime roles where inland logistics experience is.',
    ],
  },
  covers: [
    {
      title: 'Freight forwarding',
      body: 'Ocean and air freight operations, pricing, key account management and branch leadership.',
    },
    {
      title: '3PL & 4PL',
      body: 'Contract logistics, solution design, implementation and account leadership for outsourced operations.',
    },
    {
      title: 'Supply chain',
      body: 'Planning, demand and supply, S&OP, network design and end-to-end supply chain leadership.',
    },
    {
      title: 'Warehousing',
      body: 'Site and regional warehouse management, automation projects, and distribution centre start-ups.',
    },
    {
      title: 'Transportation',
      body: 'Road, rail and multimodal operations, fleet management and last-mile network roles.',
    },
    {
      title: 'Customs & trade',
      body: 'Customs brokerage, trade compliance, classification and documentation leadership.',
    },
    {
      title: 'Procurement',
      body: 'Strategic sourcing, category management, vendor development and procurement leadership.',
    },
  ],
  desk: {
    title: 'Who runs this desk',
    lede: 'Logistics runs alongside maritime rather than separately from it — the same consultants, because the mandates overlap.',
    isPlaceholder: true,
    placeholderNote: 'Placeholder — desk lead to be named',
    members: [
      {
        title: '[Desk lead]',
        meta: '[Job title]',
        body: 'Replace with the consultant who owns logistics mandates, and delete the isPlaceholder flag in src/content/expertise.js.',
      },
    ],
  },
  faq: [
    {
      q: 'Do I need maritime experience for these roles?',
      a: [
        'For most of them, no. Freight, warehousing and supply chain mandates are judged on logistics experience. Maritime background is an advantage on port, terminal and ocean freight roles, and neutral elsewhere.',
      ],
    },
    {
      q: 'Which cities do you cover?',
      a: [
        'We recruit nationally from three offices — Mumbai, Delhi/Noida and Lucknow — with the heaviest flow on the western and northern corridors.',
      ],
    },
    {
      q: 'Do you handle high-volume warehouse hiring?',
      a: [
        'No. We work on individual specialist and leadership mandates. Volume and blue-collar staffing is a different business and we would point you elsewhere rather than take the brief.',
      ],
    },
  ],
};

/* ------------------------------------------------------------------- legal */

const legal = {
  url: '/legal',
  jobsSector: 'Legal',
  eyebrow: 'Nevoxel Legal',
  title: 'The legal desk',
  metaTitle: 'Nevoxel Legal — in-house legal and compliance recruitment',
  description:
    'The Nevoxel legal desk: General Counsel, in-house legal, contracts, compliance, corporate, litigation and legal operations roles across India.',
  lede: 'General Counsel and in-house legal, contracts, compliance, corporate, litigation and legal operations. A standalone desk, started where our clients already needed it and widening from there.',
  image: heroImages.legal,
  market: {
    summary:
      'In-house legal hiring turns on judgement and fit, and a CV shows neither. That is the whole difficulty.',
    body: [
      'In-house legal is not the litigation market. The work is commercial — contracting, regulatory exposure, risk the board can act on — and the people who are good at it are usually judged by how few problems reach the executive, which is precisely the thing that does not appear on a résumé.',
      'Our route in was shipping and trade: charterparty and cargo disputes, P&I, marine insurance, sanctions and customs exposure. That is legal work our maritime desk has been adjacent to since 2008, and it is where we can point at something rather than assert it.',
      'The desk now runs broader — General Counsel appointments, contracting and compliance teams, corporate and litigation roles, and the legal operations function that larger teams build once the inbox stops scaling. Where a mandate sits outside what we know, we say so instead of taking it.',
    ],
  },
  covers: [
    {
      title: 'General Counsel',
      body: 'First legal hires and established GC appointments, including the board-facing part of the role that most searches underweight.',
    },
    {
      title: 'In-house legal',
      body: 'Legal counsel and senior counsel roles inside commercial teams, from single-lawyer functions to regional benches.',
    },
    {
      title: 'Contracts',
      body: 'Contract managers and commercial counsel — drafting and negotiating rather than reviewing what someone else drafted.',
    },
    {
      title: 'Compliance',
      body: 'Regulatory, trade, sanctions and financial-crime compliance, including the anti-bribery programmes auditors ask to see.',
    },
    {
      title: 'Corporate law',
      body: 'Corporate and commercial counsel covering governance, transactions, joint ventures and group structuring.',
    },
    {
      title: 'Litigation',
      body: 'In-house disputes counsel managing external panels, arbitration and the commercial exposure behind a case.',
    },
    {
      title: 'Legal operations',
      body: 'CLM implementation, matter and panel management, legal spend and the reporting that makes a legal team legible to the executive.',
    },
  ],
  desk: {
    title: 'Who runs this desk',
    lede: 'Legal mandates are briefed and shortlisted with practising lawyers involved, not by recruiters working from a job description.',
    isPlaceholder: true,
    placeholderNote: 'Placeholder — additional legal advisors to be added',
    members: [
      {
        title: 'Adv. Surangama Sharma',
        meta: 'Legal Advisor',
        body: 'Advises Nevoxel and its clients on employment contracts, compliance and the documentation shore-side hiring runs on, including TMSA-aligned HR practice.',
      },
      {
        title: '[Desk lead]',
        meta: '[Job title]',
        body: 'Replace with the advisors now working with the legal desk, and delete the isPlaceholder flag in src/content/expertise.js.',
      },
    ],
  },
  faq: [
    {
      q: 'Is this only maritime legal work?',
      a: [
        'No. The desk covers in-house legal across industries — General Counsel, contracts, compliance, corporate, litigation and legal operations.',
        'Shipping, trade and insurance law is where we started and where our network is deepest, so it is the work we can evidence most directly. We would rather say that plainly than imply an equal track record everywhere.',
      ],
    },
    {
      q: 'Do you place into law firms?',
      a: [
        'Our focus is in-house. We take partner and senior associate mandates only where the firm’s practice sits in a market we already know — shipping, trade, insurance or logistics — and we will tell you when it does not.',
      ],
    },
    {
      q: 'Can you run a legal search confidentially?',
      a: [
        'Yes, and most senior legal mandates should be. An incumbent GC is often still in post, and the in-house legal community in any Indian city is small enough that an open advertisement is an announcement. See <a href="/employers/executive-search">executive search</a> for how a confidential mandate runs.',
      ],
    },
    {
      q: 'I am a lawyer with no maritime background. Is this desk for me?',
      a: [
        'Yes. Most roles on this desk are judged on legal and commercial experience, not sector history. Maritime and trade exposure is an advantage on a minority of them and irrelevant on the rest.',
      ],
    },
  ],
};

/* ---------------------------------------------------------------- phase 2 */
/**
 * Named on /expertise so the roadmap is visible and the verticals that follow
 * do not read as an afterthought. No hub pages until there is real content —
 * a page promising a desk that does not exist yet is the exact claim Harbour's
 * "evidence, not adjectives" rule is there to prevent.
 */

/* ------------------------------------------------------------ hero slides */
/**
 * The home hero rotates through the three desks.
 *
 * Note this reverses the original brief, which specified a static hero and
 * listed the old site's carousel as a problem being fixed. That call was made
 * when Nevoxel was a single vertical; three desks is the new reason. The
 * accessibility cost is paid in full in assets/js/hero.js — visible pause
 * control, pause on hover and focus, and no motion at all under
 * prefers-reduced-motion.
 *
 * The two doors are NOT part of a slide. They sit below the rotating text and
 * never relabel, because a primary button that renames itself under the
 * pointer of someone reaching for it is a real usability failure. Each slide
 * gets a quieter link to its own desk instead.
 *
 * `media: 'mark'` renders an SVG line drawing (passed as `mark`) on navy
 * instead of a photograph, for any future desk that has no photography yet —
 * Harbour bans renders and CGI, so a drawing is the honest placeholder.
 */

const heroSlides = [
  {
    key: 'maritime',
    eyebrow: 'Nevoxel Maritime',
    // Slide 1 carries the page's single <h1>: maritime is the anchor vertical
    // and this is the headline the home page ranks on.
    heading: 'Steering<br>maritime talent<br><em>from sea</em> to shore',
    lede: 'Shore-based maritime recruitment since 2008. Proven officers, engineers and commercial specialists moved into shore roles — and supported through the first year, which is where these moves succeed or fail.',
    link: { label: 'The maritime desk', href: '/maritime' },
    media: 'image',
    image: {
      src: '/assets/img/hero/maritime.jpg',
      alt: 'Container vessel alongside under gantry cranes at a working container terminal',
      width: 2560,
      height: 1440,
    },
  },
  {
    key: 'logistics',
    eyebrow: 'Nevoxel Logistics',
    heading: 'Freight, warehousing<br>and the <em>seam</em><br>between them',
    lede: 'Ports and inland logistics are being built as one network. We recruit the people who can work across the join — freight forwarding, 3PL, supply chain, customs and trade.',
    link: { label: 'The logistics desk', href: '/logistics' },
    media: 'image',
    image: {
      src: '/assets/img/hero/logistics.webp',
      alt: 'Container yard with stacked boxes and gantry cranes working vessels alongside, seen from above',
      width: 2560,
      height: 1319,
    },
  },
  {
    key: 'legal',
    eyebrow: 'Nevoxel Legal',
    heading: 'Counsel who read<br>the <em>commercial</em> risk,<br>not just the clause',
    lede: 'General Counsel, contracts, compliance, corporate, litigation and legal operations. A standalone desk, started where our clients already needed it and widening from there.',
    link: { label: 'The legal desk', href: '/legal' },
    media: 'image',
    image: {
      src: '/assets/img/hero/legal.webp',
      alt: 'Meeting room overlooking a container terminal at dusk',
      width: 1672,
      height: 940,
    },
  },
];

const upcoming = [
  {
    title: 'Energy & Chemicals',
    body: 'Oil and gas, LNG and LPG, petrochemicals, chemicals and offshore renewables — leveraging the tanker, gas and chemical-vessel network the maritime desk already works.',
    meta: 'Planned 2027',
  },
  {
    title: 'Engineering & Infrastructure',
    body: 'Ports, terminals and the shore-side engineering and project delivery roles that sit alongside them.',
    meta: 'Planned 2027',
  },
];

const hubs = [maritime, logistics, legal];

module.exports = { maritime, logistics, legal, hubs, upcoming, heroSlides };
