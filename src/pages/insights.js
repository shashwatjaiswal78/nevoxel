const { page } = require('../layout');
const C = require('../components');
const { esc, formatDate } = require('../util');
const { site } = require('../content/site');
const { posts, press, events } = require('../content/insights');

/* --------------------------------------------------------------- blog index */

const blog = {
  url: '/insights/blog',
  priority: '0.7',
  changefreq: 'weekly',
  render() {
    const [lead, ...rest] = posts;

    const hero = C.pageHero({
      eyebrow: 'Insights',
      coord: `${posts.length} articles`,
      title: 'Notes from the shore-side market',
      lede: 'What we are seeing on the desk — written for the people it affects, not for search engines.',
    });

    const leadBand = C.band({
      tone: 'paper',
      coast: true,
      size: 'tight',
      body: `    <a class="post" href="/insights/blog/${esc(lead.slug)}" data-motion="rise" style="border-top:0">
      <p class="post__meta"><span class="post__cat">${esc(lead.category)}</span><span class="post__date">${esc(
        formatDate(lead.date)
      )}</span></p>
      <h2 class="post__title" style="font-size:clamp(1.75rem,4vw,2.75rem);max-width:22ch">${esc(
        lead.title
      )}</h2>
      <p class="post__dek" style="font-size:1.125rem;max-width:62ch">${esc(lead.dek)}</p>
      <p class="post__read">${esc(lead.readingTime)} min read · ${esc(lead.author)}</p>
    </a>`,
    });

    const grid = C.band({
      tone: 'paper',
      size: 'tight',
      body: `    ${C.cardGrid(
        rest.map((post) => C.articleCard(post)),
        { cols: 3 }
      )}`,
    });

    return page({
      url: '/insights/blog',
      title: 'Blog — notes from the shore-side maritime market',
      description:
        'Hiring and career articles on shore-based maritime recruitment in India: reading sea CVs, the first year ashore, market conditions and confidential search.',
      main: [
        hero,
        leadBand,
        grid,
        C.ctaBand({
          title: 'Get these monthly',
          body: 'New mandates and one market note. Nothing else.',
          primary: { label: 'Talk to us', href: '/contact' },
          secondary: { label: 'Browse jobs', href: '/jobs' },
        }),
      ].join('\n'),
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Nevoxel Insights',
          url: `${site.origin}/insights/blog/`,
          publisher: { '@type': 'Organization', name: site.name },
        },
      ],
    });
  },
};

/* ------------------------------------------------------------ article page */

function articlePage(post) {
  return {
    url: `/insights/blog/${post.slug}`,
    priority: '0.6',
    render() {
      const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

      const hero = C.pageHero({
        eyebrow: post.category,
        coord: formatDate(post.date),
        title: post.title,
        lede: post.dek,
      });

      const body = C.band({
        tone: 'paper',
        coast: true,
        body: `    <article class="article">
      <p class="article__meta">
        <span>${esc(post.author)}</span>
        <span>${esc(formatDate(post.date))}</span>
        <span>${esc(post.readingTime)} min read</span>
      </p>
      <div class="article__body" data-motion="fade">
        ${post.body.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
    </article>`,
      });

      const more = C.band({
        tone: 'paper-alt',
        body: `    ${C.sectionHead({ eyebrow: 'Keep reading', title: 'More insights' })}
    ${C.cardGrid(
      related.map((p) => C.articleCard(p)),
      { cols: 3 }
    )}`,
      });

      return page({
        url: `/insights/blog/${post.slug}`,
        title: post.title,
        description: post.dek,
        ogType: 'article',
        main: [hero, body, more, C.ctaBand()].join('\n'),
        jsonld: [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.dek,
            datePublished: post.date,
            dateModified: post.date,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@type': 'Organization', name: site.name },
            mainEntityOfPage: `${site.origin}/insights/blog/${post.slug}/`,
          },
        ],
      });
    },
  };
}

/* ------------------------------------------------------------------ press */

const pressPage = {
  url: '/insights/press',
  priority: '0.6',
  render() {
    const hero = C.pageHero({
      eyebrow: 'Publications & press',
      title: 'Features, bylines and awards',
      lede: 'Where Nevoxel and our team have appeared in the maritime and business press.',
    });

    const list = C.band({
      tone: 'paper',
      coast: true,
      body: `    <div class="press-list" data-motion="stagger">
      ${press
        .map(
          (p) => `<article class="press-item${p.isPlaceholder ? ' press-item--placeholder' : ''}">
        <p class="press-item__kind">${esc(p.kind)}</p>
        <div>
          <h2 class="press-item__title">${esc(p.title)}</h2>
          <p class="press-item__note">${esc(p.note)}</p>
        </div>
        <p class="press-item__date">${esc(formatDate(p.date))}</p>
      </article>`
        )
        .join('\n      ')}
    </div>
    <div class="note" style="margin-top:var(--s5);max-width:64ch">
      <strong>Press enquiries.</strong> For comment on shore-side maritime hiring in India,
      reach us at <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>.
    </div>`,
    });

    return page({
      url: '/insights/press',
      title: 'Publications & Press',
      description:
        'Media features, published bylines and awards including Star Women in Maritime 2022.',
      main: [hero, list, C.ctaBand()].join('\n'),
    });
  },
};

/* ----------------------------------------------------------------- events */
// The brief says to merge Interviews + Events and hide until populated. With
// an empty list this renders an honest empty state rather than a dead page.

const eventsPage = {
  url: '/insights/events',
  priority: '0.4',
  indexable: events.length > 0,
  render() {
    const hero = C.pageHero({
      eyebrow: 'Interviews & events',
      title: 'Where to find us',
      lede: 'Conference appearances, panels and recorded interviews.',
    });

    const body = events.length
      ? C.band({
          tone: 'paper',
          coast: true,
          body: `    <div class="press-list" data-motion="stagger">
      ${events
        .map(
          (e) => `<article class="press-item">
        <p class="press-item__kind">${esc(e.kind)}</p>
        <div>
          <h2 class="press-item__title">${esc(e.title)}</h2>
          <p class="press-item__note">${esc(e.note)}</p>
        </div>
        <p class="press-item__date">${esc(formatDate(e.date))}</p>
      </article>`
        )
        .join('\n      ')}
    </div>`,
        })
      : C.band({
          tone: 'paper',
          coast: true,
          body: `    <div class="empty" data-motion="rise">
      <h2 class="empty__title">Nothing scheduled right now</h2>
      <p class="empty__body">When we are speaking at a conference or publishing an interview, it will appear here. In the meantime, the blog is where we write things down.</p>
      <div class="btn-row btn-row--center">
        ${C.btn('Read the blog', '/insights/blog', { variant: 'solid', icon: true })}
        ${C.btn('Press & publications', '/insights/press', { variant: 'outline' })}
      </div>
    </div>
    <div class="note" style="margin-top:var(--s5);max-width:64ch">
      <strong>Hidden from search while empty.</strong> This page is set to
      <span class="mono">noindex</span> and left out of the XML sitemap until the events
      list has entries — add one to <span class="mono">src/content/insights.js</span> and
      it indexes automatically.
    </div>`,
        });

    return page({
      url: '/insights/events',
      title: 'Interviews & Events',
      description: 'Conference appearances, panels and recorded interviews from the Nevoxel team.',
      noindex: events.length === 0,
      main: [hero, body, C.ctaBand()].join('\n'),
    });
  },
};

module.exports = {
  blog,
  articlePages: posts.map(articlePage),
  pressPage,
  eventsPage,
};
