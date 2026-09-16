/**
 * Route manifest.
 *
 * Every page in the site, in sitemap order. Adding a page means adding it
 * here — the builder and the XML sitemap read from this list.
 *
 * The nav is a separate list (`nav` in content/site.js) and is NOT derived
 * from this one, so a new page needs registering in both places.
 */

const { site } = require('./content/site');

const home = require('./pages/home');
const expertise = require('./pages/expertise');
const employers = require('./pages/employers');
const candidates = require('./pages/candidates');
const jobs = require('./pages/jobs');
const about = require('./pages/about');
const insights = require('./pages/insights');
const contact = require('./pages/contact');
// Privacy / terms / 404. Named `policies` rather than `legal` so it is not
// confused with the Nevoxel Legal vertical at /legal.
const policies = require('./pages/policies');

const pages = [
  home,

  // Expertise — the practice verticals
  expertise.overview,
  expertise.maritime,
  expertise.logistics,
  expertise.legal,

  // For Employers
  employers.overview,
  employers.maritimeRecruitment,
  employers.executiveSearch,
  employers.hrAdvisory,

  // For Candidates
  candidates.overview,
  jobs.board,
  ...jobs.detailPages,
  candidates.sea2shore,
  candidates.resumeCoaching,

  // About
  about.story,
  about.teamPage,
  about.clientsPage,

  // Insights
  insights.blog,
  ...insights.articlePages,
  insights.pressPage,
  insights.eventsPage,

  // Contact + utility
  contact,
  policies.privacy,
  policies.terms,
  policies.notFound,
];

/* --------------------------------------------------------------- sanity */
// Duplicate URLs would silently overwrite each other in dist/, so fail loudly.
const seen = new Set();
for (const p of pages) {
  if (seen.has(p.url)) throw new Error(`Duplicate route: ${p.url}`);
  seen.add(p.url);
}

module.exports = { pages, origin: site.origin };
