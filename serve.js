/**
 * Minimal static server for local preview. Zero dependencies.
 *
 *   node serve.js            serve dist/ on :4173
 *   PORT=8080 node serve.js
 *
 * Resolves clean URLs to their index.html and serves 404.html for misses, so
 * local preview matches how a static host will behave in production.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
};

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  // Block traversal outside dist/.
  const target = path.normalize(path.join(ROOT, clean));
  if (!target.startsWith(ROOT)) return null;

  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;

  const asIndex = path.join(target, 'index.html');
  if (fs.existsSync(asIndex)) return asIndex;

  const asHtml = target + '.html';
  if (fs.existsSync(asHtml)) return asHtml;

  return null;
}

http
  .createServer((req, res) => {
    const file = resolve(req.url);

    if (!file) {
      const notFound = path.join(ROOT, '404.html');
      const body = fs.existsSync(notFound)
        ? fs.readFileSync(notFound)
        : 'Not found';
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
      return;
    }

    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(fs.readFileSync(file));
  })
  .listen(PORT, () => {
    console.log(`Nevoxel preview -> http://localhost:${PORT}`);
  });
