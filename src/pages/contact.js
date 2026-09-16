const { page } = require('../layout');
const C = require('../components');
const { esc, attr } = require('../util');
const { site, offices } = require('../content/site');

function officeCard(office) {
  return `<article class="office${office.isHq ? ' office--hq' : ''}" data-motion="rise">
    ${office.isHq ? '<p class="office__hq-flag">Head office</p>' : ''}
    <h3 class="office__city">${esc(office.city)}</h3>
    <p class="office__role">${esc(office.role)}</p>
    <p class="office__lines">${office.lines.map(esc).join('<br>')}</p>
    <a class="office__phone" href="tel:${attr(office.phone.replace(/\s/g, ''))}">${esc(
    office.phone
  )}</a>
    <p class="office__coord">${esc(office.coords.lat)} · ${esc(office.coords.lon)}</p>
  </article>`;
}

module.exports = {
  url: '/contact',
  priority: '0.8',
  render() {
    const hero = C.pageHero({
      title: 'Talk to us',
      lede: 'One form, routed to the right desk. It replaces the seven separate addresses the old site scattered across its pages.',
      image: {
        src: '/assets/img/hero/contact.webp',
        alt: 'Desk phone in use beside a notepad and pen in a small office',
        width: 1536,
        height: 1024,
      },
    });

    const formBand = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="split">
      <div>
        ${C.sectionHead({
          title: 'Tell us which one you are',
          lede: 'The answer changes who reads this and what we ask you next. Nothing else about the form changes.',
        })}
        <div class="prose" data-motion="rise">
          <p><strong>Candidates</strong> reach the resume desk — CV help, coaching and open applications.</p>
          <p><strong>Employers</strong> reach the recruitment desk — mandates, search briefs and advisory enquiries.</p>
          <p>We reply to everything, including the enquiries we cannot help with.</p>
        </div>
      </div>
      <div data-motion="rise">
        ${C.routedForm({ id: 'contact', defaultSegment: 'candidate', compact: true })}
      </div>
    </div>`,
    });

    const officesBand = C.band({
      tone: 'paper-alt',
      body: `    ${C.sectionHead({
        title: 'Three offices across India',
      })}
    <div class="offices" data-motion="stagger">
      ${offices.map(officeCard).join('\n      ')}
    </div>

    <div class="map" data-motion="rise">
      <iframe
        title="Map showing the Nevoxel head office in Thane, Mumbai"
        src="https://www.openstreetmap.org/export/embed.html?bbox=72.92%2C19.16%2C73.03%2C19.27&amp;layer=mapnik&amp;marker=19.2183%2C72.9781"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <p class="jd__note" style="margin-top:var(--s2)">
      Map data © OpenStreetMap contributors. Swap for a Google Maps embed if you prefer —
      see <span class="mono">src/pages/contact.js</span>.
    </p>`,
    });

    const direct = C.band({
      tone: 'shoal',
      size: 'tight',
      body: `    ${C.sectionHead({
        title: 'Prefer email?',
        lede: 'These are the only two addresses. Everything else routes into them.',
      })}
    ${C.cardGrid(
      [
        C.card({
          title: 'For candidates',
          body: `CV help, coaching, open applications and anything Sea2Shore. <br><a href="mailto:${esc(
            site.routing.candidate
          )}" class="mono">${esc(site.routing.candidate)}</a>`,
        }),
        C.card({
          title: 'For employers',
          body: `Search briefs, mandates, advisory and press. <br><a href="mailto:${esc(
            site.routing.employer
          )}" class="mono">${esc(site.routing.employer)}</a>`,
        }),
      ],
      { cols: 2 }
    )}
    <div class="btn-row">
      <a class="btn btn--ghost" href="${attr(site.social.linkedin)}" rel="noopener">LinkedIn</a>
      <a class="btn btn--ghost" href="${attr(site.social.instagram)}" rel="noopener">Instagram</a>
    </div>`,
    });

    return page({
      url: '/contact',
      title: 'Contact',
      description:
        'Contact Nevoxel. One routed form for candidates and employers, plus our Mumbai, Delhi/Noida and Lucknow offices.',
      main: [hero, formBand, officesBand, direct].join('\n'),
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Nevoxel',
          url: `${site.origin}/contact/`,
        },
        ...offices.map((o) => ({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: `${site.name} — ${o.city}`,
          telephone: o.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: o.city,
            addressCountry: 'IN',
          },
          parentOrganization: { '@type': 'Organization', name: site.name },
        })),
      ],
    });
  },
};
