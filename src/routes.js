/**
 * Route manifest.
 *
 * Every page in the site, in sitemap order. Adding a page means adding it
 * here — the builder, the XML sitemap and the nav all read from this list.
 */

const { site } = require('./content/site');

const home = require('./pages/home');
const employers = require('./pages/employers');
const candidates = require('./pages/candidates');
const jobs = require('./pages/jobs');
const about = require('./pages/about');
const insights = require('./pages/insights');
const contact = require('./pages/contact');
const legal = require('./pages/legal');

const pages = [
  home,

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
  legal.privacy,
  legal.terms,
  legal.notFound,
];

/* --------------------------------------------------------------- sanity */
// Duplicate URLs would silently overwrite each other in dist/, so fail loudly.
const seen = new Set();
for (const p of pages) {
  if (seen.has(p.url)) throw new Error(`Duplicate route: ${p.url}`);
  seen.add(p.url);
}

module.exports = { pages, origin: site.origin };
