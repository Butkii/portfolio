// Build step: render each page to static HTML so crawlers and link previews
// see real content, then write per-page <head> tags, a sitemap and a 404 page.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dist = path.resolve('dist');
const ssr = path.resolve('dist-ssr');
const { render, PAGES, SITE, urlFor } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const setTag = (html, re, value) => {
  if (!re.test(html)) throw new Error(`prerender: tag not found in template: ${re}`);
  return html.replace(re, (_, a, b) => `${a}${esc(value)}${b}`);
};

function page(id, { noindex = false } = {}) {
  const meta = PAGES[id || ''];
  const url = urlFor(id);
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(id)}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setTag(html, /(<meta name="description" content=")[^"]*(")/, meta.description);
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, meta.title);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, meta.description);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title);
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, meta.description);
  if (noindex) html = html.replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex" />');
  return html;
}

const ids = Object.keys(PAGES);
for (const id of ids) {
  const file = id ? path.join(dist, id, 'index.html') : path.join(dist, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(id));
}
await writeFile(path.join(dist, '404.html'), page('', { noindex: true }));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids.map((id) => `  <url><loc>${urlFor(id)}</loc><lastmod>${today}</lastmod><priority>${id ? '0.8' : '1.0'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await rm(ssr, { recursive: true, force: true });
console.log(`prerendered ${ids.length} pages + 404 and sitemap for ${SITE}`);
