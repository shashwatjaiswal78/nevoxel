/**
 * Job board data — replaces the old iframe board.
 *
 * SAMPLE DATA. These roles are written as realistic seed content so the board,
 * its filters and its JobPosting schema can be reviewed end to end. They are
 * not live vacancies. Replace this array with real mandates before launch, or
 * swap the module for a fetch against an ATS (see README).
 *
 * Deliberately, no sample role is attributed to a named client company — real
 * client names appear only on /about/clients, where they belong. Live
 * confidential mandates should keep `confidential: true`.
 *
 * Field notes
 *   sector / func / seniority / location  -> drive the filter UI
 *   posted / closes                       -> ISO dates, used by JobPosting schema
 *   salary                                -> omit entirely if not advertised
 */

const jobs = [
  {
    slug: 'marine-superintendent-mumbai',
    title: 'Marine Superintendent',
    company: 'Tanker owner-operator',
    confidential: true,
    location: 'Mumbai',
    region: 'Maharashtra',
    sector: 'Maritime',
    func: 'Technical & Marine',
    seniority: 'Mid-senior',
    type: 'Full-time',
    posted: '2026-07-28',
    closes: '2026-09-30',
    salary: { min: 2800000, max: 3600000, currency: 'INR', period: 'YEAR' },
    summary:
      'Own the marine standards for a mixed products fleet from a Mumbai shore office. Suits a Master or Chief Officer making a first move ashore.',
    responsibilities: [
      'Act as marine focal point for an assigned group of vessels, including navigational audits and voyage risk assessments.',
      'Attend vessels for inspection, incident investigation and pre-vetting preparation.',
      'Close SIRE and CDI observations with owners, managers and Masters.',
      'Contribute to TMSA element reviews and drive corrective actions to completion.',
    ],
    requirements: [
      'Class I (Master Mariner) Certificate of Competency.',
      'Command or senior Chief Officer time on tankers.',
      'Working knowledge of TMSA, SIRE 2.0 and ISM/ISPS.',
      'Willingness to travel for vessel attendance, roughly 25 per cent.',
    ],
    niceToHave: [
      'Previous shore rotation or superintendent relief cover.',
      'Incident investigation training (TapRooT or similar).',
    ],
  },
  {
    slug: 'technical-superintendent-mumbai',
    title: 'Technical Superintendent',
    company: 'Third-party ship manager',
    confidential: true,
    location: 'Mumbai',
    region: 'Maharashtra',
    sector: 'Maritime',
    func: 'Technical & Marine',
    seniority: 'Mid-senior',
    type: 'Full-time',
    posted: '2026-07-24',
    closes: '2026-09-24',
    salary: { min: 2600000, max: 3400000, currency: 'INR', period: 'YEAR' },
    summary:
      'Run technical management for four to six vessels — budgets, dry docks and planned maintenance — with a manager who actively supports the move ashore.',
    responsibilities: [
      'Own OPEX budgets and monthly variance reporting for an assigned fleet.',
      'Plan and superintend dry dockings, from specification through yard settlement.',
      'Manage the planned maintenance system and critical spares availability.',
      'Support Class and Flag surveys and close outstanding conditions.',
    ],
    requirements: [
      'Class I Motor (Chief Engineer) Certificate of Competency.',
      'Sailing experience as Chief Engineer or Second Engineer on bulk carriers or tankers.',
      'Comfortable with budgets, procurement and yard negotiation.',
    ],
    niceToHave: ['Dry dock superintendence experience.', 'Familiarity with ShipNet, DANAOS or AMOS.'],
  },
  {
    slug: 'chartering-manager-mumbai',
    title: 'Chartering Manager — Dry Bulk',
    company: 'Commodity owner',
    confidential: true,
    location: 'Mumbai',
    region: 'Maharashtra',
    sector: 'Maritime',
    func: 'Chartering & Commercial',
    seniority: 'Senior',
    type: 'Full-time',
    posted: '2026-07-22',
    closes: '2026-09-15',
    salary: { min: 4500000, max: 6000000, currency: 'INR', period: 'YEAR' },
    summary:
      'Lead Supramax and Panamax chartering for an owner moving more cargo on its own tonnage. Confidential search.',
    responsibilities: [
      'Fix vessels on voyage and period charters against an agreed position list.',
      'Negotiate charter parties and manage laytime and demurrage exposure.',
      'Build and hold broker relationships across the Indian Ocean and Far East.',
      'Report freight market positions and hedging views to the commercial director.',
    ],
    requirements: [
      'Six or more years in dry bulk chartering, owner or operator side.',
      'Demonstrable fixing record on Supramax or Panamax tonnage.',
      'Strong charter party and demurrage knowledge.',
    ],
    niceToHave: ['ICS membership.', 'FFA and freight hedging exposure.'],
  },
  {
    slug: 'hseq-manager-navi-mumbai',
    title: 'Marine HSEQ Manager',
    company: 'LPG and gas carrier operator',
    confidential: true,
    location: 'Navi Mumbai',
    region: 'Maharashtra',
    sector: 'Energy',
    func: 'HSEQ & Compliance',
    seniority: 'Senior',
    type: 'Full-time',
    posted: '2026-07-19',
    closes: '2026-09-19',
    summary:
      'Own the safety management system for a gas fleet and take TMSA scores from adequate to competitive.',
    responsibilities: [
      'Maintain and improve the SMS against ISM, ISO 9001, 14001 and 45001.',
      'Own the TMSA self-assessment and drive element scores upward with evidence.',
      'Lead internal audits, incident investigation and lessons-learned circulation.',
      'Prepare the fleet for vetting inspections and major oil company approvals.',
    ],
    requirements: [
      'Senior seagoing rank on gas or tanker vessels, or equivalent shore HSEQ experience.',
      'Lead Auditor qualification.',
      'Direct experience of a TMSA cycle.',
    ],
    niceToHave: ['Gas carrier endorsement.', 'Behavioural safety programme experience.'],
  },
  {
    slug: 'crewing-manager-mumbai',
    title: 'Crewing Manager',
    company: 'Ship management company',
    confidential: true,
    location: 'Mumbai',
    region: 'Maharashtra',
    sector: 'Maritime',
    func: 'Crewing & HR',
    seniority: 'Mid-senior',
    type: 'Full-time',
    posted: '2026-07-16',
    closes: '2026-09-16',
    salary: { min: 1800000, max: 2600000, currency: 'INR', period: 'YEAR' },
    summary:
      'Run crewing for a twenty-vessel fleet, with real ownership of retention rather than pure rotation admin.',
    responsibilities: [
      'Plan crew changes, budgets and travel across a twenty-vessel fleet.',
      'Own MLC 2006 compliance and seafarer contract administration.',
      'Drive officer retention against an agreed target and report on leavers.',
      'Manage relationships with manning agents and training providers.',
    ],
    requirements: [
      'Five or more years in a crewing department, ashore.',
      'Working knowledge of MLC 2006 and STCW requirements.',
      'Experience managing manning agents across multiple nationalities.',
    ],
    niceToHave: ['Sailing background.', 'Experience with a crewing ERP rollout.'],
  },
  {
    slug: 'port-captain-kandla',
    title: 'Port Captain',
    company: 'Terminal operator',
    confidential: true,
    location: 'Kandla',
    region: 'Gujarat',
    sector: 'Logistics',
    func: 'Operations',
    seniority: 'Mid-senior',
    type: 'Full-time',
    posted: '2026-07-12',
    closes: '2026-09-12',
    summary:
      'Shore-based cargo and berth oversight at a busy west coast terminal. Sea time counts here more than a shore CV does.',
    responsibilities: [
      'Supervise cargo operations, berthing and departure for calling vessels.',
      'Act as the operator’s representative to Masters, agents and surveyors.',
      'Investigate cargo claims and damage, and prepare the operator’s position.',
      'Maintain terminal safety standards during vessel interface.',
    ],
    requirements: [
      'Master Mariner or senior Chief Officer with bulk or break-bulk cargo experience.',
      'Strong cargo handling and stowage knowledge.',
      'Comfortable being the decision maker on the berth.',
    ],
    niceToHave: ['Prior terminal or stevedoring experience.'],
  },
  {
    slug: 'operations-executive-mumbai',
    title: 'Marine Operations Executive',
    company: 'Tanker operator',
    confidential: true,
    location: 'Mumbai',
    region: 'Maharashtra',
    sector: 'Maritime',
    func: 'Operations',
    seniority: 'Junior',
    type: 'Full-time',
    posted: '2026-07-10',
    closes: '2026-09-10',
    salary: { min: 900000, max: 1400000, currency: 'INR', period: 'YEAR' },
    summary:
      'A genuine entry point ashore. Voyage operations for a clean products fleet, with structured training and a route into chartering.',
    responsibilities: [
      'Follow assigned voyages from fixture through discharge and final accounts.',
      'Issue voyage instructions and monitor vessel performance against charter party terms.',
      'Prepare laytime statements and support demurrage claims.',
      'Coordinate agents, bunkers and port calls.',
    ],
    requirements: [
      'Two or more years of sea time, or a maritime degree with an operations internship.',
      'Confident with spreadsheets and written English.',
      'Willing to carry an out-of-hours phone on rotation.',
    ],
    niceToHave: ['Watchkeeping certificate.', 'Exposure to a voyage management system.'],
  },
  {
    slug: 'vetting-superintendent-mumbai',
    title: 'Vetting Superintendent',
    company: 'Oil major approved operator',
    confidential: true,
    location: 'Mumbai',
    region: 'Maharashtra',
    sector: 'Energy',
    func: 'HSEQ & Compliance',
    seniority: 'Mid-senior',
    type: 'Full-time',
    posted: '2026-07-08',
    closes: '2026-09-08',
    summary:
      'Keep a products fleet approved and trading. High-visibility role reporting to the marine director.',
    responsibilities: [
      'Manage the SIRE 2.0 inspection programme and pre-inspection preparation.',
      'Close observations with vessels and track root causes across the fleet.',
      'Maintain oil major approvals and the terminal feedback record.',
      'Coach Masters and Chief Officers ahead of inspections.',
    ],
    requirements: [
      'Senior tanker rank, Class I preferred.',
      'Direct SIRE or CDI inspection exposure, either side.',
      'Precise written English — this role lives in inspection reports.',
    ],
    niceToHave: ['SIRE 2.0 accredited inspector training.'],
  },
  {
    slug: 'supply-chain-manager-navi-mumbai',
    title: 'Supply Chain Manager — Marine Logistics',
    company: 'Industrial group',
    confidential: true,
    location: 'Navi Mumbai',
    region: 'Maharashtra',
    sector: 'Logistics',
    func: 'Supply Chain',
    seniority: 'Senior',
    type: 'Full-time',
    posted: '2026-07-04',
    closes: '2026-09-04',
    salary: { min: 3200000, max: 4200000, currency: 'INR', period: 'YEAR' },
    summary:
      'End-to-end ocean freight and inland movement for a manufacturer shipping across three continents.',
    responsibilities: [
      'Own ocean freight procurement and annual carrier negotiations.',
      'Manage inland movement, customs clearance and warehousing partners.',
      'Reduce landed cost per tonne against an agreed target.',
      'Build the demand and shipment planning cycle with commercial teams.',
    ],
    requirements: [
      'Eight or more years across ocean freight and supply chain.',
      'Carrier negotiation track record at scale.',
      'Strong analytics — this role is measured on landed cost.',
    ],
    niceToHave: ['Bulk or project cargo experience.', 'SAP or Oracle SCM.'],
  },
  {
    slug: 'naval-architect-pune',
    title: 'Naval Architect',
    company: 'Design consultancy',
    confidential: true,
    location: 'Pune',
    region: 'Maharashtra',
    sector: 'Manufacturing',
    func: 'Technical & Marine',
    seniority: 'Mid-senior',
    type: 'Full-time',
    posted: '2026-06-30',
    closes: '2026-08-30',
    summary:
      'Hull and structural design work for newbuild and conversion projects, with hybrid working.',
    responsibilities: [
      'Produce hull form, stability and structural calculations for newbuild projects.',
      'Prepare Class submission drawings and respond to Class comments.',
      'Support conversion and retrofit feasibility studies, including decarbonisation retrofits.',
    ],
    requirements: [
      'Degree in Naval Architecture or Ocean Engineering.',
      'Four or more years in a design office.',
      'AutoCAD plus one of NAPA, Rhino or ShipConstructor.',
    ],
    niceToHave: ['Class society experience.', 'Alternative fuel retrofit exposure.'],
  },
  {
    slug: 'marine-claims-executive-mumbai',
    title: 'Marine Claims Executive',
    company: 'P&I correspondent',
    confidential: true,
    location: 'Mumbai',
    region: 'Maharashtra',
    sector: 'BFSI',
    func: 'Legal & Claims',
    seniority: 'Mid-senior',
    type: 'Full-time',
    posted: '2026-06-26',
    closes: '2026-08-26',
    summary:
      'Handle cargo, collision and personal injury claims for a P&I correspondent. A strong shore route for deck officers with a legal turn of mind.',
    responsibilities: [
      'Handle claims from notification through settlement, instructing surveyors and lawyers.',
      'Attend vessels and terminals for casualty and cargo damage attendance.',
      'Prepare reserve recommendations and reports for members and clubs.',
    ],
    requirements: [
      'Sea time as a deck officer, or a maritime law qualification.',
      'Clear, precise report writing.',
      'Availability for occasional urgent attendance.',
    ],
    niceToHave: ['LLM in Maritime Law.', 'Average adjusting exposure.'],
  },
  {
    slug: 'digital-product-manager-mumbai',
    title: 'Product Manager — Fleet Software',
    company: 'Maritime technology firm',
    confidential: true,
    location: 'Mumbai / Hybrid',
    region: 'Maharashtra',
    sector: 'Technology',
    func: 'Technology',
    seniority: 'Senior',
    type: 'Full-time',
    posted: '2026-06-20',
    closes: '2026-08-20',
    salary: { min: 3500000, max: 5000000, currency: 'INR', period: 'YEAR' },
    summary:
      'Build the tools superintendents actually use. Rare role where sea time is a genuine hiring advantage.',
    responsibilities: [
      'Own the roadmap for a fleet performance and compliance module.',
      'Run discovery with superintendents, Masters and technical managers.',
      'Work with engineering on delivery and with customer success on adoption.',
    ],
    requirements: [
      'Product management experience on a B2B SaaS product.',
      'Maritime domain knowledge, from sea time or shore operations.',
      'Comfortable writing specifications and running discovery interviews.',
    ],
    niceToHave: ['Seagoing background.', 'Experience with noon report or emissions data.'],
  },
];

/* ------------------------------------------------------------------ derived */

const uniq = (arr) => [...new Set(arr)].sort();

const filters = {
  sector: uniq(jobs.map((j) => j.sector)),
  func: uniq(jobs.map((j) => j.func)),
  location: uniq(jobs.map((j) => j.location)),
  seniority: ['Junior', 'Mid-senior', 'Senior', 'Executive'].filter((s) =>
    jobs.some((j) => j.seniority === s)
  ),
};

module.exports = { jobs, filters };
