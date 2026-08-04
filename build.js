/**
 * Nevoxel static site builder.
 *
 * Zero dependencies. Composes pages from src/pages/*.js through src/layout.js
 * and writes clean-URL directories into dist/.
 *
 *   node build.js            build once
 *   node build.js --watch    rebuild on change
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const routes = require('./src/routes');

/* ---------------------------------------------------------------- helpers */

function rm(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function write(outPath, contents) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, contents);
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

/** "/employers/executive-search" -> "dist/employers/executive-search/index.html" */
function outputPathFor(url) {
  if (url === '/404') return path.join(DIST, '404.html');
  const clean = url.replace(/^\/+|\/+$/g, '');
  return clean
    ? path.join(DIST, clean, 'index.html')
    : path.join(DIST, 'index.html');
}

/* ------------------------------------------------------------ sitemap/robots */

function buildSitemap(pages, origin) {
  const urls = pages
    .filter((p) => p.indexable !== false)
    .map((p) => {
      const loc = `${origin}${p.url === '/' ? '/' : p.url + '/'}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <changefreq>${p.changefreq || 'monthly'}</changefreq>`,
        `    <priority>${p.priority ?? '0.6'}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots(origin) {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
}

/* ------------------------------------------------------------------ build */

function build() {
  const started = Date.now();

  // Drop cached modules so --watch picks up edits.
  for (const key of Object.keys(require.cache)) {
    if (key.startsWith(SRC)) delete require.cache[key];
  }

  const { pages, origin } = require('./src/routes');

  rm(DIST);
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

  let count = 0;
  for (const page of pages) {
    write(outputPathFor(page.url), page.render());
    count++;
  }

  write(path.join(DIST, 'sitemap.xml'), buildSitemap(pages, origin));
  write(path.join(DIST, 'robots.txt'), buildRobots(origin));

  const ms = Date.now() - started;
  console.log(`Built ${count} pages + sitemap.xml + robots.txt in ${ms}ms -> dist/`);
}

/* ------------------------------------------------------------------ watch */

function watch() {
  build();
  let queued = null;
  fs.watch(SRC, { recursive: true }, (_event, file) => {
    clearTimeout(queued);
    queued = setTimeout(() => {
      try {
        build();
        console.log(`  (changed: ${file})`);
      } catch (err) {
        console.error('Build failed:', err.message);
      }
    }, 60);
  });
  console.log('Watching src/ for changes. Ctrl-C to stop.');
}

if (process.argv.includes('--watch')) watch();
else build();

module.exports = { build, routes };
