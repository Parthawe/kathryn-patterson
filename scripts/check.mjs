import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import assert from 'node:assert/strict';
const base = resolve('docs');
async function files(dir) { const list=[]; for (const entry of await readdir(dir,{withFileTypes:true})) { const path=resolve(dir,entry.name); list.push(...(entry.isDirectory()?await files(path):[path])); } return list; }
const all = await files(base);
const html = all.filter(file=>extname(file)==='.html'&&!file.endsWith('404.html'));
for (const file of html) {
  const text=await readFile(file,'utf8');
  assert.equal((text.match(/<h1[ >]/g)||[]).length,1,`One h1 required: ${file}`);
  assert.match(text,/<title>[^<]+<\/title>/,`Title required: ${file}`);
  assert.match(text,/<meta name="description" content="[^"]+"/,`Description required: ${file}`);
  assert.match(text,/<link rel="canonical" href="https:\/\/parthawe.github.io\/kathryn-patterson\//,`Canonical path: ${file}`);
  assert(!/[—–]/.test(text),`Unexpected dash in ${file}`);
  assert(!/\b(TODO|Lorem ipsum|Acme|Jane Doe|coming soon)\b/i.test(text),`Unfinished copy: ${file}`);
  for (const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link=match[1];
    if (/^(https?:|mailto:|data:)/.test(link)) continue;
    assert(!link.startsWith('/'),`Root-absolute path breaks GitHub Pages: ${link}`);
    const [path,fragment]=link.split('#');
    let target=path?resolve(dirname(file),path):file;
    if (path.endsWith('/')) target=resolve(target,'index.html');
    assert(target.startsWith(base),`Path escapes build: ${target}`);
    assert((await stat(target).catch(()=>null))?.isFile(),`Missing target ${link} in ${file}`);
    if (fragment && extname(target)==='.html') assert((await readFile(target,'utf8')).includes(`id="${fragment}"`),`Missing anchor ${link}`);
  }
  for(const match of text.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(match[0]),`Missing image alt in ${file}`);
}
for(const file of all) assert((await stat(file)).size<25*1024*1024,`Oversized published file: ${file}`);
for(const name of ['PLAN_FOR_KATHRYN.md','CASE_STUDY_WORKBOOK.md','RESEARCH_AND_BUILD_NOTES.md','.env','package.json']) assert(!all.some(p=>p.endsWith('/'+name)),`Internal file published: ${name}`);
console.log(`Checked ${html.length} pages, local links and fragments, metadata, image descriptions, copy, and ${all.length} published files.`);
