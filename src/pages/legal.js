/**
 * Privacy, terms and 404.
 *
 * NOT LEGAL ADVICE. These are structurally complete drafts covering what an
 * Indian recruitment site handling candidate data needs to address (including
 * the DPDP Act 2023). Have them reviewed by a qualified advisor — Adv.
 * Surangama Sharma is on the team — and fill the bracketed fields before
 * launch.
 */

const { page } = require('../layout');
const C = require('../components');
const { site } = require('../content/site');

/* ---------------------------------------------------------------- privacy */

const privacy = {
  url: '/privacy',
  priority: '0.3',
  render() {
    const hero = C.pageHero({
      eyebrow: 'Legal',
      title: 'Privacy notice',
      lede: 'What we collect when you contact us or apply for a role, why we hold it, and how to get it removed.',
    });

    const body = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="prose" data-motion="fade">
      <div class="note">
        <strong>Draft for review.</strong> This notice is structurally complete but has not
        been reviewed by a qualified legal advisor, and the bracketed fields below are
        unfilled. Do not publish it as-is.
      </div>

      <h2>Who we are</h2>
      <p>${site.name} is a recruitment firm registered in India, with its head office in Thane, Maharashtra 400607. For any question about this notice, contact <a href="mailto:${site.email}">${site.email}</a>.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Contact details</strong> you give us — name, email, phone, company or current rank.</li>
        <li><strong>Career information</strong> — your CV, certificates of competency, sea service records, employment history and the details you share during interviews.</li>
        <li><strong>Correspondence</strong> — the enquiries and messages you send us.</li>
        <li><strong>Site usage</strong> — anonymous analytics, only if you accept analytics cookies.</li>
      </ul>

      <h2>Why we hold it</h2>
      <ul>
        <li>To respond to your enquiry and, for candidates, to represent you to employers.</li>
        <li>To assess suitability for specific mandates, now and for future roles.</li>
        <li>To meet our legal, contractual and record-keeping obligations.</li>
      </ul>
      <p>For candidates, the lawful basis is your consent together with our legitimate interest in operating a recruitment business. You can withdraw consent at any time.</p>

      <h2>Who we share it with</h2>
      <p>We share candidate details with prospective employers <strong>only after telling you which company and getting your agreement</strong>. We do not sell personal data, and we do not share it with third parties for marketing.</p>
      <p>We use service providers for email, file storage and analytics. [List processors and their locations before publishing.]</p>

      <h2>How long we keep it</h2>
      <p>Candidate records are held for [retention period] from your last contact with us, after which they are deleted. Client and contractual records are held for [retention period] to meet statutory requirements.</p>

      <h2>Your rights</h2>
      <p>Under India’s Digital Personal Data Protection Act 2023 you may ask us to give you a copy of your data, correct it, erase it, or withdraw consent. Write to <a href="mailto:${site.email}">${site.email}</a> and we will respond within [statutory response period].</p>
      <p>Our Data Protection Officer is [name and contact].</p>
      <p>If you are unhappy with our response you may complain to the Data Protection Board of India.</p>

      <h2>Cookies</h2>
      <p>Essential cookies keep the site working and cannot be switched off. Analytics cookies are optional, off by default, and only set if you accept them in the banner. You can change your choice by clearing this site’s data in your browser.</p>

      <h2>Changes</h2>
      <p>If we change this notice we will update the date below and, for material changes, tell candidates on our books directly.</p>
      <p class="mono">Last updated: [date]</p>
    </div>`,
    });

    return page({
      url: '/privacy',
      title: 'Privacy Notice',
      description: 'How Nevoxel collects, uses and protects candidate and client data.',
      main: [hero, body].join('\n'),
    });
  },
};

/* ------------------------------------------------------------------ terms */

const terms = {
  url: '/terms',
  priority: '0.3',
  render() {
    const hero = C.pageHero({
      eyebrow: 'Legal',
      title: 'Terms of use',
      lede: 'The terms covering use of this website. Recruitment engagements are governed by a separate signed agreement.',
    });

    const body = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="prose" data-motion="fade">
      <div class="note">
        <strong>Draft for review.</strong> Structurally complete, not legally reviewed.
        Fill the bracketed fields and have a qualified advisor sign this off before launch.
      </div>

      <h2>Using this site</h2>
      <p>By using ${site.name}.com you accept these terms. If you do not accept them, please do not use the site.</p>

      <h2>Job listings</h2>
      <p>Vacancies are posted in good faith and reflect mandates we are working at the time of posting. Roles may be filled, withdrawn or changed by the employer without notice. A listing is not an offer of employment, and applying does not create any obligation on either side.</p>
      <p>Where a listing shows the employer as confidential, we will identify them to you directly before putting your details forward.</p>

      <h2>Candidate services</h2>
      <p>Our services to candidates — including CV help, coaching and Sea2Shore — are provided free of charge. We never charge candidates a fee for finding work. If anyone claiming to represent ${site.name} asks you for payment, tell us at <a href="mailto:${site.email}">${site.email}</a>.</p>

      <h2>Accuracy</h2>
      <p>We take care to keep the site accurate but make no warranty that it is complete or current. Salary ranges are indicative and set by the employer.</p>

      <h2>Intellectual property</h2>
      <p>The content, design and code of this site belong to ${site.name} unless stated otherwise. Client and third-party names are the property of their respective owners and appear here for identification only.</p>

      <h2>Liability</h2>
      <p>To the extent permitted by law, ${site.name} is not liable for indirect or consequential loss arising from use of this site. Nothing here limits liability that cannot be limited by law.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts of [jurisdiction] have exclusive jurisdiction.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: <a href="mailto:${site.email}">${site.email}</a>.</p>
      <p class="mono">Last updated: [date]</p>
    </div>`,
    });

    return page({
      url: '/terms',
      title: 'Terms of Use',
      description: 'Terms governing use of the Nevoxel website and job listings.',
      main: [hero, body].join('\n'),
    });
  },
};

/* -------------------------------------------------------------------- 404 */

const notFound = {
  url: '/404',
  indexable: false,
  render() {
    const body = `<section class="band band--deep">
  <div class="wrap">
    <div class="notfound">
      <p class="notfound__code">Error 404 · Position not found</p>
      <h1 class="notfound__title">You have run aground</h1>
      <p class="notfound__body">
        This page is not on the chart. It may have moved when we rebuilt the site —
        several old addresses changed. Search the job board, or pick a heading below.
      </p>
      <form class="notfound__search" action="/jobs" method="get">
        <label class="sr-only" for="notfound-q">Search jobs</label>
        <input class="signup__input" id="notfound-q" name="q" type="search"
               placeholder="Search open roles" style="flex:1">
        <button class="btn btn--solid" type="submit">Search</button>
      </form>
      <ul class="notfound__links">
        <li><a href="/">Home</a></li>
        <li><a href="/jobs">Job board</a></li>
        <li><a href="/candidates">For candidates</a></li>
        <li><a href="/employers">For employers</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  </div>
</section>`;

    return page({
      url: '/404',
      title: 'Page not found',
      description: 'The page you were looking for is not on this chart.',
      noindex: true,
      main: body,
    });
  },
};

module.exports = { privacy, terms, notFound };
