import { site, projects } from './content.mjs';
import { dispatch, cync } from './case-studies.mjs';

const arrow = '<span aria-hidden="true">↗</span>';
const external = (href, text, cls = 'text-link') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${text} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;

function nav(root, current) {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="nav-glass glass-surface"><a class="wordmark" href="${root}" aria-label="Kathryn Patterson, home">kathryn<span>.</span></a>
  <nav class="desktop-nav" aria-label="Main navigation"><a href="${root}work/" ${current === 'work' ? 'aria-current="page"' : ''}>Work</a><a href="${root}about/" ${current === 'about' ? 'aria-current="page"' : ''}>About</a><a href="#contact">Get in touch ${arrow}</a></nav>
  <div class="nav-controls"><button class="theme-toggle" type="button" aria-label="Switch to dark mode"><svg class="theme-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path class="moon-icon" d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5a8.8 8.8 0 1 0 10.7 10.7Z"/><g class="sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></g></svg><span class="theme-label">Dark mode</span></button><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button></div>
  <noscript><style>.nav-controls{display:none}.nav-glass>noscript{display:contents}</style><nav class="no-script-nav" aria-label="Mobile navigation"><a href="${root}work/">Work</a><a href="${root}about/">About</a><a href="#contact">Contact</a></nav></noscript></div>
  <nav id="mobile-nav" class="mobile-nav glass-surface" aria-label="Mobile navigation" hidden><a href="${root}work/" ${current === 'work' ? 'aria-current="page"' : ''}>Work</a><a href="${root}about/" ${current === 'about' ? 'aria-current="page"' : ''}>About</a><a href="#contact">Get in touch ${arrow}</a></nav></header>`;
}

function footer(root) {
  return `<footer id="contact" class="site-footer" tabindex="-1"><div class="contact-block"><h2>Let's talk<br>about the work.</h2>${external(site.linkedin, 'Connect on LinkedIn', 'button button-primary')}</div>
  <div class="footer-bottom"><a class="footer-name" href="${root}">Kathryn Patterson</a><div class="footer-links"><a href="${root}work/">Work</a><a href="${root}about/">About</a><a href="${root}site-info/">Site info</a></div><p>© ${new Date().getUTCFullYear()} Kathryn Patterson</p><a class="site-credit" href="https://designvich.org" target="_blank" rel="noopener noreferrer">Site by Designvich<span class="sr-only"> (opens in a new tab)</span></a></div></footer>`;
}

function card(project, root, heading = 'h3') {
  const preview = project.cover === 'dispatch'
    ? `<div class="cover-frame"><img src="${root}assets/images/${project.image}" alt="${project.alt}" width="418" height="889" loading="lazy" decoding="async"><span>Search</span></div>
       <div class="cover-frame"><div class="cover-results"><img src="${root}assets/images/cd-results.webp" alt="Published load results with route, shipper, and payment details." width="1024" height="929" loading="lazy" decoding="async"></div><span>Listings</span></div>`
    : `<div class="cover-frame"><img src="${root}assets/images/${project.image}" alt="${project.alt}" width="1248" height="2518" loading="lazy" decoding="async"><span>Original app</span></div>`;
  return `<article class="project-card ${project.cover}"><a class="project-card-link" href="${root}work/${project.slug}/" aria-labelledby="title-${project.slug}" aria-describedby="description-${project.slug} evidence-${project.slug}"><div class="project-cover ${project.cover}-cover">
  ${preview}</div>
  <div class="project-description"><p class="project-category">${project.note}</p><div class="project-title"><${heading} id="title-${project.slug}">${project.name}</${heading}>${arrow}</div><p id="description-${project.slug}">${project.description}</p><dl id="evidence-${project.slug}" class="project-summary"><div><dt>Contribution</dt><dd>${project.contribution}</dd></div><div><dt>Evidence</dt><dd>${project.evidence}</dd></div></dl><span class="card-open">Read the project</span></div></a></article>`;
}

function layout({ title, description, route = '', current = '', content, image = 'social-card.webp', versions = {} }) {
  const depth = route.split('/').filter(Boolean).length;
  const root = depth ? '../'.repeat(depth) : './';
  const canonical = site.base + route;
  return `<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark light"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${site.base}assets/images/${image}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#f7f6f0"><link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml"><link rel="preload" href="${root}assets/fonts/cormorant-garamond-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${root}styles.css?v=${versions.css || '1'}"><script>try{const t=localStorage.getItem('kp-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;document.querySelector('meta[name=theme-color]').content=document.documentElement.dataset.theme==='light'?'#f7f6f0':'#11130f'}catch{}</script><script type="module" src="${root}app.js?v=${versions.js || '1'}"></script></head><body>${nav(root, current)}<main id="main">${content(root)}</main>${footer(root)}<dialog class="image-dialog" aria-labelledby="image-dialog-title"><div class="dialog-heading glass-surface"><h2 id="image-dialog-title">Project image</h2><div class="dialog-controls"><a class="viewer-original text-link" target="_blank" rel="noopener noreferrer">Original size ${arrow}<span class="sr-only"> (opens in a new tab)</span></a><button type="button" class="dialog-close" autofocus>Close</button></div></div><p class="viewer-status" role="status" aria-live="polite" hidden></p><div class="viewer-recovery" hidden><button class="viewer-retry button" type="button">Try again</button></div><div class="dialog-image-wrap"></div><p class="image-dialog-caption"></p></dialog></body></html>`;
}

function home(root) {
  return `<section class="home-hero"><div class="hero-copy"><p class="hero-role">Kathryn Patterson / Senior Product Designer</p><h1>Making complex<br>work feel simple<span>.</span></h1><p class="hero-intro">I design digital experiences in supply chain logistics at CAI Logistics, part of Cox Automotive.</p><a class="button button-primary" href="#selected-work">Explore work ${arrow}</a></div><div class="hero-art" aria-hidden="true"><img src="${root}assets/images/connected-routes.webp" alt="" width="1448" height="1086" fetchpriority="high" decoding="async"></div></section>
  <section id="selected-work" class="work-section section-space"><h2 class="section-title">Selected work</h2><div class="projects-grid">${projects.map(p=>card(p,root)).join('')}</div></section>
  <section class="intro-section section-space reveal"><p class="section-label">A little about me</p><div class="intro-copy"><h2>From the details<br>to the bigger picture.</h2><p>I'm a senior product designer at CAI Logistics, part of Cox Automotive. My work connects user experience, design sprints, and digital product development.</p><a class="text-link" href="${root}about/">More about me ${arrow}</a></div><div class="portrait-small"><img src="${root}assets/images/kathryn-current.webp" alt="Kathryn Patterson smiling outdoors." width="800" height="800" loading="lazy"></div></section>`;
}

function work(root) {
  return `<header class="work-heading"><h1>Selected work</h1><p>Mobile product design for vehicle carriers and community research for a local iOS app.</p></header><section class="work-section work-index" aria-label="Projects"><div class="projects-grid">${projects.map(p=>card(p,root,'h2')).join('')}</div></section>`;
}

function about(root) {
  return `<section class="about-heading"><div><p class="eyebrow">Hello, I'm Kathryn.</p><h1>Design starts<br>with people.</h1><p>I'm a senior product designer working in supply chain logistics at CAI Logistics, part of Cox Automotive.</p></div><figure class="about-portrait"><div class="portrait-crop"><img src="${root}assets/images/kathryn-current.webp" alt="Kathryn Patterson smiling outdoors." width="800" height="800" fetchpriority="high"></div></figure></section>
  <section class="about-body section-space"><h2>At the intersection<br>of people and products.</h2><div><p>My work brings together user experience, design sprints, and digital product development. I use Figma and Adobe Analytics as part of that practice.</p><p>At Central Dispatch, I work alongside research, product, and software engineering partners. My graduate work at the University of Georgia included Cync, a community-focused iOS capstone.</p><p>This portfolio brings those two settings together: professional work in automotive logistics and the research and development work behind Cync.</p>${external(site.linkedin,'View my professional profile')}</div></section>
  <section class="practice-section section-space"><h2 class="section-title">How the work connects.</h2><div class="practice-grid"><details open><summary>User experience</summary><p>Understanding the task and the information people need to move through it.</p></details><details><summary>Product design</summary><p>Bringing interface design, design sprints, and product development into the same conversation.</p></details><details><summary>Collaboration</summary><p>Working with research, product, and engineering across the path to delivery.</p></details></div></section>`;
}

function info() {
  return `<header class="page-heading"><h1>Site information.</h1><p>A few details about this portfolio.</p></header><div class="info-body"><section><h2>Content and images</h2><p>Professional information is drawn from Kathryn's public LinkedIn profile. Central Dispatch imagery comes from its public product guide. Cync material comes from the University of Georgia capstone archive. Project pages link to those sources.</p><p>The connected-routes hero sculpture is AI-generated abstract artwork. It does not represent a product interface or research artifact.</p></section><section><h2>Privacy</h2><p>This site has no contact form, advertising pixels, or analytics scripts. Your theme choice is stored in your browser. Visiting external links is subject to those services' policies. Hosting is provided by GitHub Pages.</p></section><section><h2>Accessibility</h2><p>The site includes keyboard navigation, visible focus states, image descriptions, reduced-motion support, and light and dark themes. Images can be enlarged with a keyboard-accessible viewer.</p><p>Contact Kathryn through LinkedIn if you need another way to access the material.</p></section></div>`;
}

export const pages = [
  { path: 'index.html', route: '', title: 'Kathryn Patterson | Product Designer', description: 'Senior product designer in supply chain logistics. Explore Kathryn Patterson’s work in automotive logistics, user experience, and community-focused design.', content: home },
  { path: 'work/index.html', route: 'work/', current: 'work', title: 'Selected Work | Kathryn Patterson', description: 'Explore Central Dispatch mobile search and Cync, a community-focused iOS capstone.', content: work },
  { path: 'work/central-dispatch/index.html', route: 'work/central-dispatch/', current: 'work', title: 'Central Dispatch | Kathryn Patterson', description: 'A public overview of Central Dispatch carrier mobile search, with published product documentation and Kathryn’s launch announcement.', content: dispatch },
  { path: 'work/cync/index.html', route: 'work/cync/', current: 'work', title: 'Cync | Kathryn Patterson', description: 'A community-focused iOS capstone with documented research findings from a 10-person study.', content: cync },
  { path: 'about/index.html', route: 'about/', current: 'about', title: 'About | Kathryn Patterson', description: 'Meet Kathryn Patterson, a senior product designer working in automotive logistics and user experience.', content: about },
  { path: 'site-info/index.html', route: 'site-info/', title: 'Site Information | Kathryn Patterson', description: 'Content sources, image credits, privacy, and accessibility information for Kathryn Patterson’s portfolio.', content: info }
];

export function renderPages(versions) { return pages.map(page => ({ ...page, html: layout({ ...page, versions }) })); }
