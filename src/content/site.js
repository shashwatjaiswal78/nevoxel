/**
 * Site-wide content.
 *
 * Everything in this file is editable copy — no markup lives here beyond
 * inline <em>/<strong> in prose fields.
 *
 * PLACEHOLDER POLICY
 * ------------------
 * Facts sourced from the project brief (clients, team, offices, award, dates)
 * are real. Anything invented for layout purposes is collected under
 * `placeholders` below and rendered with a visible "Placeholder" marker so it
 * can never be mistaken for approved client copy. Replace and then delete the
 * `isPlaceholder` flag to remove the marker.
 */

const site = {
  name: 'Nevoxel',
  tagline: 'Steering Maritime Talent',
  since: 2008,
  description:
    'Shore-based maritime recruitment since 2008. Nevoxel places proven maritime, logistics and energy professionals into shore roles across India.',
  origin: 'https://www.nevoxel.com',
  locale: 'en_IN',
  social: {
    linkedin: 'https://www.linkedin.com/company/nevoxel',
    instagram: 'https://www.instagram.com/nevoxel',
  },
  // Consolidates the seven scattered addresses the audit found.
  email: 'hello@nevoxel.com',
  routing: {
    candidate: 'resume@nevoxel.com',
    employer: 'recruitment@nevoxel.com',
  },
  phone: '+91 22 4000 0000',
};

/* --------------------------------------------------------------- navigation */

const nav = [
  // Expertise leads: it answers "do you know my market?" before the two doors
  // ask "which one are you?". The doors stay permanently visible as the two
  // CTA buttons in the masthead, so nothing is lost by putting them second.
  {
    label: 'Expertise',
    url: '/expertise',
    blurb: 'Specialist desks, not a general agency.',
    children: [
      { label: 'Overview', url: '/expertise', note: 'How our desks are organised' },
      {
        label: 'Nevoxel Maritime',
        url: '/maritime',
        note: 'Shore, technical, commercial, QHSE',
      },
      {
        label: 'Nevoxel Logistics',
        url: '/logistics',
        note: 'Freight, 3PL, supply chain, trade',
      },
      {
        label: 'Nevoxel Legal',
        url: '/legal',
        note: 'In-house counsel, compliance, contracts',
      },
    ],
  },
  {
    label: 'For Employers',
    url: '/employers',
    blurb: 'Hire proven shore-based maritime talent.',
    children: [
      { label: 'Overview', url: '/employers', note: 'How we work with hiring teams' },
      {
        label: 'Maritime Shore Recruitment',
        url: '/employers/maritime-recruitment',
        note: 'Our flagship desk',
      },
      {
        label: 'Executive Search',
        url: '/employers/executive-search',
        note: 'CXO and senior appointments',
      },
      {
        label: 'HR Advisory (NECD)',
        url: '/employers/hr-advisory',
        note: 'Wellness, training, TMSA support',
      },
    ],
  },
  {
    label: 'For Candidates',
    url: '/candidates',
    blurb: 'Take your maritime career ashore.',
    children: [
      { label: 'Overview', url: '/candidates', note: 'Start here' },
      { label: 'Job Board', url: '/jobs', note: 'Every open shore role' },
      {
        label: 'Sea2Shore Programme',
        url: '/candidates/sea2shore',
        note: 'For seafarers coming ashore',
      },
      {
        label: 'Resume Help & Coaching',
        url: '/candidates/resume-coaching',
        note: 'Translate sea time for shore readers',
      },
    ],
  },
  {
    label: 'About',
    url: '/about',
    blurb: 'Steering maritime talent since 2008.',
    children: [
      { label: 'Our Story', url: '/about', note: 'Where Nevoxel came from' },
      { label: 'Our Team', url: '/about/team', note: 'Who you will work with' },
      { label: 'Clients & Testimonials', url: '/about/clients', note: 'Who we hire for' },
    ],
  },
  {
    label: 'Insights',
    url: '/insights/blog',
    blurb: 'Notes from the shore-side market.',
    children: [
      { label: 'Blog', url: '/insights/blog', note: 'Hiring and career notes' },
      { label: 'Publications & Press', url: '/insights/press', note: 'Features and awards' },
      { label: 'Interviews & Events', url: '/insights/events', note: 'Where to find us' },
    ],
  },
  { label: 'Contact', url: '/contact' },
];

/* ------------------------------------------------------------------ offices */

const offices = [
  {
    city: 'Mumbai',
    role: 'Head office',
    lines: ['Thane, Maharashtra 400607', 'India'],
    phone: '+91 22 4000 0000',
    // Chart-margin coordinate treatment; approximate city positions.
    coords: { lat: '19°13′N', lon: '72°58′E' },
    isHq: true,
  },
  {
    city: 'Delhi / Noida',
    role: 'North India desk',
    lines: ['Noida, Uttar Pradesh', 'India'],
    phone: '+91 120 400 0000',
    coords: { lat: '28°32′N', lon: '77°23′E' },
  },
  {
    city: 'Lucknow',
    role: 'Sourcing centre',
    lines: ['Lucknow, Uttar Pradesh', 'India'],
    phone: '+91 522 400 0000',
    coords: { lat: '26°51′N', lon: '80°57′E' },
  },
];

/* ------------------------------------------------------------------ clients */
// Named in the brief. Rendered as typographic wordmarks, not imitation logos.

/**
 * `logo` is the rendered size in CSS px, set by eye rather than by one fixed
 * height: a solid block (MOL) looks far heavier than a thin ring (ATPI) at the
 * same height, so each mark is sized to carry the same visual weight. Files
 * live at /assets/img/logos/<slug>.webp — trimmed, transparent, 2–3x these sizes.
 */
const clients = [
  { name: 'Mitsui O.S.K. Lines', short: 'Mitsui O.S.K.', logo: { slug: 'mitsui-osk', w: 95, h: 36 } },
  { name: 'TORM', short: 'TORM', logo: { slug: 'torm', w: 136, h: 21 } },
  { name: 'Aditya Birla Group', short: 'Aditya Birla', logo: { slug: 'aditya-birla', w: 78, h: 43 } },
  { name: 'Scorpio Marine', short: 'Scorpio', logo: { slug: 'scorpio', w: 132, h: 36 } },
  { name: 'Navig8 Group', short: 'Navig8', logo: { slug: 'navig8', w: 103, h: 38 } },
  { name: 'ATPI', short: 'ATPI', logo: { slug: 'atpi', w: 58, h: 52 } },
  { name: 'MTM Ship Management', short: 'MTM', logo: { slug: 'mtm', w: 79, h: 43 } },
];

const award = {
  title: 'Star Women in Maritime',
  year: 2022,
  note: 'Awarded to founder Neetu Jaiswal for contribution to shore-side maritime hiring.',
};

/* --------------------------------------------------------------------- team */

/**
 * `photo: true` renders /assets/img/team/<slug>.webp (4:3, 720×540, face
 * centred) in the portrait slot; without it the card shows the initials.
 */
const team = [
  {
    name: 'Neetu Jaiswal',
    slug: 'neetu-jaiswal',
    role: 'Founder & Chief Executive',
    initials: 'NJ',
    photo: true,
    bio: 'Neetu founded Nevoxel in 2008 to fix a gap she kept running into: maritime professionals with deep operational experience, and shore-side employers who could not read a sea CV. She leads the maritime and executive search desks and is a Star Women in Maritime 2022 awardee.',
    focus: ['Executive search', 'Maritime shore recruitment', 'Client strategy'],
  },
  {
    name: 'Rajesh Menon',
    slug: 'rajesh-menon',
    role: 'Advisor & Wellness Coach',
    initials: 'RM',
    bio: 'Rajesh advises on the human side of the transition ashore — the part that derails placements more often than skills do. He runs the wellness and coaching components of our NECD advisory work and mentors Sea2Shore candidates through their first shore year.',
    focus: ['Wellness advisory', 'Transition coaching', 'Retention'],
  },
  {
    name: 'Adv. Surangama Sharma',
    slug: 'surangama-sharma',
    role: 'Legal Advisor',
    initials: 'SS',
    photo: true,
    bio: 'Surangama advises Nevoxel and its clients on employment contracts, compliance and the documentation that shore-side maritime hiring runs on, including TMSA-aligned HR practice.',
    focus: ['Employment law', 'Compliance', 'Contracts'],
  },
  {
    name: 'Shashwat Jaiswal',
    slug: 'shashwat-jaiswal',
    role: 'Marketing Advisor',
    initials: 'SJ',
    photo: true,
    bio: 'Shashwat advises on how Nevoxel presents itself to the market — the brand, the website and the employer-facing and candidate-facing communication that brings the right briefs and the right people to the desk.',
    focus: ['Brand', 'Digital marketing', 'Communications'],
  },
];

/* ------------------------------------------------------------------- values */

const values = [
  {
    name: 'Read the sea time',
    body: 'A Second Engineer’s watch record is a management CV if you know how to read it. We do the translation so employers see the operator, not the jargon.',
  },
  {
    name: 'Shortlists, not stacks',
    body: 'We send few candidates and defend every one. A shortlist you can interview in a week is worth more than fifty CVs you will never open.',
  },
  {
    name: 'Discretion by default',
    body: 'Senior maritime hiring happens in a small market. Confidential mandates stay confidential — including from the rest of your industry.',
  },
  {
    name: 'Stay past the start date',
    body: 'Placement is the middle of the job, not the end. We check in through the first year because the transition ashore is where people wobble.',
  },
  {
    name: 'Know the whole coast',
    body: 'Three offices across India and seventeen years of desk notes. We know which packages move people, and which ones stall.',
  },
];

/* ---------------------------------------------------------- differentiators */

const differentiators = [
  {
    name: 'Experienced team',
    body: 'Seventeen years on the same desk, and advisors who have worked both sides of the gangway. You are not briefing a generalist.',
    metric: 'Since 2008',
  },
  {
    name: 'Cost-effective',
    body: 'Sized for the mandate rather than a fixed percentage habit. Retained where discretion demands it, contingent where speed does.',
    metric: 'Scoped per role',
  },
  {
    name: 'Customised solutions',
    body: 'A single Chartering Manager and a thirty-person shore build are not the same problem. The process bends to the brief.',
    metric: 'Built per brief',
  },
];

/* ------------------------------------------------------------------ sectors */

/**
 * The entries carrying an `href` are live practice verticals with their own hub
 * page; the plain strings are adjacent markets we recruit into but do not run a
 * dedicated desk for. `sectorChips` renders the first kind as links and the
 * second as plain text, so the distinction is visible without a second component.
 *
 * This list is editorial. The job board's Sector filter is a separate, derived
 * list (`filters.sector` in content/jobs.js) built from the jobs that actually
 * exist — the two are allowed to differ, and do.
 */
const sectors = [
  { label: 'Maritime', href: '/maritime' },
  { label: 'Logistics', href: '/logistics' },
  { label: 'Legal', href: '/legal' },
  'Energy',
  'Manufacturing',
  'BFSI',
  'Pharma',
  'Technology',
  'Finance',
];

/* ------------------------------------------------------------------ process */
// A genuine ordered sequence, so numbered markers carry information here.

const process = [
  {
    step: 'Brief',
    body: 'A working session with the hiring manager, not a form. We leave with the scope, the package, the reporting line and the reason the last person left.',
    duration: 'Day 1',
  },
  {
    step: 'Search',
    body: 'Mapped against our shore-side network and the vessels, owners and managers your target profile actually comes from. Confidential where required.',
    duration: 'Week 1–2',
  },
  {
    step: 'Shortlist',
    body: 'Three to five candidates, interviewed by us first, each with a written case for why they fit and where they will need support.',
    duration: 'Week 2–3',
  },
  {
    step: 'Placement',
    body: 'Offer support, notice-period management and counter-offer defence — then structured check-ins through the first year ashore.',
    duration: 'Week 4+',
  },
];

/* ------------------------------------------------------------- placeholders */
/**
 * REPLACE BEFORE LAUNCH.
 *
 * The brief supplied no approved testimonial quotes. These are written as
 * obvious placeholders and render with a visible marker. Do not attribute
 * them to real client companies until Nevoxel has sign-off.
 */

const testimonials = [
  {
    quote:
      'Placeholder testimonial — replace with an approved client quote about shortlist quality and time to hire.',
    name: '[Client name]',
    role: '[Job title]',
    company: '[Company]',
    audience: 'employer',
    isPlaceholder: true,
  },
  {
    quote:
      'Placeholder testimonial — replace with an approved quote from a placed candidate about the move ashore.',
    name: '[Candidate name]',
    role: '[Shore role placed into]',
    company: '[Employer]',
    audience: 'candidate',
    isPlaceholder: true,
  },
  {
    quote:
      'Placeholder testimonial — replace with an approved quote about the NECD advisory or Sea2Shore programme.',
    name: '[Client name]',
    role: '[Job title]',
    company: '[Company]',
    audience: 'employer',
    isPlaceholder: true,
  },
];

module.exports = {
  site,
  nav,
  offices,
  clients,
  award,
  team,
  values,
  differentiators,
  sectors,
  process,
  testimonials,
};
