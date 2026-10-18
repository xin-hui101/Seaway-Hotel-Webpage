// Runs after `vite build`: writes a finished HTML page for each language
// (dist/index.html and dist/zh/index.html) plus sitemap.xml and robots.txt,
// so search engines can read every word without running JavaScript.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

// Bundle the app for Node with its own minimal settings (configFile: false), so plugins that
// hosts such as Cloudflare add to vite.config.js cannot rename or reshape this file.
const ssrDir = 'dist/.ssr';
await build({
  configFile: false,
  plugins: [react()],
  logLevel: 'warn',
  publicDir: false,
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: ssrDir,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.js' } },
  },
});
const { render, SEO, SITE_URL, LANG_PATH, OG_IMAGE, hotelSchema } = await import(
  pathToFileURL(`${ssrDir}/entry-server.js`).href
);
const template = readFileSync('dist/index.html', 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const abs = (lang) => SITE_URL + LANG_PATH[lang];

const headFor = (lang) => {
  const { title, description, locale } = SEO[lang];
  const other = lang === 'en' ? 'zh' : 'en';
  return [
    `<link rel="canonical" href="${abs(lang)}" />`,
    `<link rel="alternate" hreflang="en" href="${abs('en')}" />`,
    `<link rel="alternate" hreflang="zh-Hans" href="${abs('zh')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${abs('en')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Seaway Hotel" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${abs(lang)}" />`,
    `<meta property="og:image" content="${SITE_URL}${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:locale:alternate" content="${SEO[other].locale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(hotelSchema(lang)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
};

for (const lang of ['en', 'zh']) {
  const { title, description } = SEO[lang];
  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang === 'zh' ? 'zh-Hans' : 'en'}" data-lang="${lang}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(description)}"`)
    .replace('<!--seo-->', headFor(lang))
    .replace('<div id="root"></div>', `<div id="root">${render(lang)}</div>`);
  const dir = `dist${LANG_PATH[lang]}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}index.html`, html);
}

const today = new Date().toISOString().slice(0, 10);
const alternates = ['en', 'zh'].map((l) =>
  `    <xhtml:link rel="alternate" hreflang="${l === 'zh' ? 'zh-Hans' : 'en'}" href="${abs(l)}" />`).join('\n');
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${['en', 'zh'].map((l) => `  <url>
    <loc>${abs(l)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`).join('\n')}
</urlset>
`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered / and /zh/ for ${SITE_URL}`);
