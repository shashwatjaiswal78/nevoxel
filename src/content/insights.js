/**
 * Insights content — blog, press and events.
 *
 * SAMPLE CONTENT. Article bodies are written as real editorial so the
 * templates can be reviewed, but nothing here has been published by Nevoxel.
 * Replace before launch. The brief flags that Insights needs a genuine content
 * cadence — see README for the recommended publishing rhythm.
 *
 * `events` renders a "nothing scheduled" state when empty, per the brief's
 * instruction to hide the section until it is populated.
 */

const posts = [
  {
    slug: 'reading-a-sea-cv',
    // Files: /assets/img/post/<slug>.webp (3:2 master) and <slug>-card.webp (16:9, 800w).
    cover: { alt: 'A printed CV and a certificate on a desk beside reading glasses and a pen' },
    title: 'How to read a sea CV when you have never been to sea',
    dek: 'Hiring managers reject strong maritime candidates for the wrong reasons. Most of it comes down to four lines on a CV that shore readers misinterpret.',
    date: '2026-07-21',
    readingTime: 6,
    category: 'For Employers',
    author: 'Neetu Jaiswal',
    body: [
      'A Chief Engineer’s CV is a management document written in a language shore recruiters were never taught. It lists tonnage instead of budget, rank instead of headcount, and vessel types instead of business units. Read literally, it looks like a technical record. Read properly, it describes someone who has run a plant worth eighty million dollars with a crew of twenty-two, no relief, and no option to escalate.',
      'Four things get misread most often. Rank is the first: a Master is a general manager with legal accountability, not a senior driver. Sea time is the second — a two-on, two-off rotation is not a career gap, and treating it as one filters out the best operators immediately.',
      'The third is vessel type, which tells you far more than most shore readers extract. Tanker officers arrive fluent in audit and inspection regimes because they have lived inside SIRE and TMSA for years. That is compliance experience, and it is directly transferable.',
      'The fourth is the certificate line. A Class I Certificate of Competency is a professional qualification with an examination failure rate that would impress most postgraduate faculties. It belongs in the same mental column as a chartered qualification, not in a list of tickets.',
      'The practical fix is a translation pass before the CV reaches the hiring manager. We do it on every shortlist: rank mapped to shore equivalent, tonnage mapped to asset value, inspection history mapped to compliance experience. It takes twenty minutes and it changes the interview conversation entirely.',
    ],
  },
  {
    slug: 'first-year-ashore',
    cover: { alt: 'A single person working at a desk in a large, mostly empty open-plan office' },
    title: 'The first year ashore is where placements fail',
    dek: 'Technical skills transfer cleanly. Office politics, salary structure and the loss of rank do not. What actually derails a move ashore.',
    date: '2026-07-07',
    readingTime: 5,
    category: 'For Candidates',
    author: 'Rajesh Menon',
    body: [
      'The hard part of coming ashore is not the work. Someone who has managed an engine room can manage a maintenance budget. The hard part is everything the job description does not mention.',
      'Rank disappears first. At sea, authority is structural and visible — everyone knows what the stripes mean. Ashore, a Superintendent has to build influence with managers who have never sailed and do not automatically defer. That adjustment catches people in month three, and it feels like failure when it is really just a different operating system.',
      'Money changes shape too. Sea salary is tax-advantaged, concentrated and comes with no living costs attached. The shore equivalent looks like a pay cut on the payslip even when total compensation is comparable. Candidates who have not modelled this properly before accepting often start re-reading agency emails by month six.',
      'Then there is the pace. A shore week has meetings that do not resolve anything, decisions that take three weeks, and a hundred small negotiations. After a career where the answer arrived within one watch, that ambiguity is genuinely uncomfortable.',
      'None of this is a reason to stay at sea. It is a reason to plan the transition rather than take the first offer with a shore address. We run structured check-ins through the first twelve months for exactly this reason — the wobble is predictable, and it is survivable when someone tells you it is coming.',
    ],
  },
  {
    slug: 'shore-hiring-market-2026',
    cover: { alt: 'A line of gantry cranes along a container terminal with a vessel alongside' },
    title: 'Shore-side hiring in 2026: three things moving the market',
    dek: 'Decarbonisation roles, the officer shortage pushing shore packages up, and what confidential mandates now cost in time.',
    date: '2026-06-18',
    readingTime: 7,
    category: 'Market',
    author: 'Neetu Jaiswal',
    body: [
      'Three forces are shaping shore-side maritime hiring in India this year, and all three are pushing in the same direction: upward pressure on packages, and longer time to hire for anything senior.',
      'The first is decarbonisation. Every operator now needs someone who can own emissions reporting, alternative fuel readiness and retrofit planning. Very few people have done all three, so the market is paying a premium for partial fits and then training the gap.',
      'The second is the officer shortage at sea, which has a counterintuitive shore effect. When sea salaries rise to retain officers, the gap a shore role must close gets wider. Shore packages that were competitive in 2023 now read as a demotion, and candidates say no later in the process than they used to.',
      'The third is discretion. More senior mandates are confidential than at any point we have tracked, because the pool is small enough that an open advertisement tells your competitors what you are planning. Confidential search takes longer — typically two to three weeks more to first shortlist — and hiring plans should budget for that rather than being surprised by it.',
      'The practical implication for hiring teams is simple: benchmark the package against current sea earnings rather than last year’s shore market, and start senior searches a month earlier than instinct suggests.',
    ],
  },
  {
    slug: 'women-in-maritime-shore-roles',
    cover: { alt: 'A woman in a hard hat and high-visibility vest checking equipment on a tablet at a container terminal' },
    title: 'Where women are actually being hired in maritime — and where they are not',
    dek: 'Shore-side roles have opened faster than seagoing ones. The pipeline data shows exactly where the remaining blockages sit.',
    date: '2026-05-29',
    readingTime: 5,
    category: 'Industry',
    author: 'Neetu Jaiswal',
    body: [
      'Shore-side maritime has moved considerably faster on gender balance than the seagoing side, which is unsurprising given the structural barriers to sea time. Chartering, operations, crewing and legal desks in India now routinely shortlist balanced slates.',
      'The blockage sits in roles that require a Certificate of Competency — superintendency, marine assurance, vetting. Those roles draw from a seagoing population that remains overwhelmingly male, so shore hiring inherits the sea pipeline whether it wants to or not.',
      'That is a real constraint, not an excuse. Two things demonstrably help. The first is separating the roles that genuinely require sea time from the ones that have simply always been filled by ex-seafarers — on inspection, a surprising number of the second category exist. The second is sponsoring cadetships, which is slow but is the only thing that changes the pipeline itself.',
      'We publish this because we are asked about it constantly by clients writing diversity commitments into their hiring briefs. The honest answer is that shore-side is where progress is available now, and that is where effort returns the most.',
    ],
  },
  {
    slug: 'confidential-search-explained',
    title: 'What a confidential search actually involves',
    dek: 'When the vacancy cannot be advertised, the process changes shape. A plain description of how discreet mandates run.',
    date: '2026-05-12',
    readingTime: 4,
    category: 'For Employers',
    author: 'Neetu Jaiswal',
    body: [
      'Some roles cannot be advertised. The incumbent is still in post, or the hire signals a strategy shift, or the market is small enough that naming the company identifies the position within a day.',
      'A confidential search replaces the advertisement with direct approach. We map the target population — the specific owners, managers and operators the right profile comes from — and approach individuals without naming the client until there is mutual interest and an NDA where appropriate.',
      'Two things are worth knowing before commissioning one. It takes longer: expect two to three weeks more to first shortlist, because there is no inbound flow to work with. And it needs a tighter brief, because we are selling the opportunity in a phone call rather than a job description, and vagueness kills those calls.',
      'What you get in exchange is a slate drawn from people who were not looking. In a market this small, that is usually where the right person is.',
    ],
  },
];

/* -------------------------------------------------------------------- press */

const press = [
  {
    title: 'Star Women in Maritime 2022',
    outlet: 'Maritime industry awards',
    date: '2022-11-01',
    kind: 'Award',
    note: 'Founder Neetu Jaiswal recognised for contribution to shore-side maritime hiring in India.',
    isPlaceholder: false,
  },
  {
    title: '[Publication title]',
    outlet: '[Outlet name]',
    date: '2025-01-01',
    kind: 'Feature',
    note: 'Placeholder entry — replace with a real media feature, including the outbound link.',
    isPlaceholder: true,
  },
  {
    title: '[Publication title]',
    outlet: '[Outlet name]',
    date: '2024-06-01',
    kind: 'Byline',
    note: 'Placeholder entry — replace with a real published byline or contributed article.',
    isPlaceholder: true,
  },
];

/* ------------------------------------------------------------------- events */
// Empty renders the "nothing scheduled" state, per the brief.

const events = [];

module.exports = { posts, press, events };
