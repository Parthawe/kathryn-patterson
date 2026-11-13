import { mkdir, rm, cp, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { renderPages, pages } from '../src/render.mjs';
import { site } from '../src/content.mjs';

const output = resolve('docs');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const versions = {};
for (const [key, file] of [['css', 'styles.css'], ['js', 'app.js']]) {
  versions[key] = createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 12);
}
for (const page of renderPages(versions)) {
  const target = resolve(output, page.path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, page.html);
}
await cp('assets', resolve(output, 'assets'), { recursive: true });
for (const file of ['styles.css', 'app.js']) await cp(file, resolve(output, file));
await writeFile(resolve(output,'.nojekyll'),'');
await writeFile(resolve(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page=>`<url><loc>${site.base}${page.route}</loc></url>`).join('')}</urlset>`);
await writeFile(resolve(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site.base}sitemap.xml\n`);
await writeFile(resolve(output,'404.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Kathryn Patterson</title><style>:root{color-scheme:light dark}body{background:light-dark(#f5f5f7,#151517);color:light-dark(#1d1d1f,#f5f5f7);font:18px/1.55 system-ui;margin:0;padding:10vw;max-width:650px}h1{font-size:clamp(40px,8vw,80px);line-height:1.06;font-weight:650;letter-spacing:-.045em}a{color:light-dark(#005cbd,#8bc1ff);display:inline-flex;align-items:center;min-height:44px}</style></head><body><p>Kathryn Patterson</p><h1>This page isn't here.</h1><p>The address may have changed. You can find the project from the work page.</p><a href="${site.base}work/">Explore work ↗</a></body></html>`);
console.log(`Built ${pages.length} pages in docs/.`);
