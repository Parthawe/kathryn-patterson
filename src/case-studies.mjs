import { site } from './content.mjs';

const arrow = '<span aria-hidden="true">↗</span>';
const external = (href, label) => `<a class="text-link" href="${href}" target="_blank" rel="noopener noreferrer">${label} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;

function imageFigure(root, file, alt, caption, cls = '') {
  const [width, height] = { 'cd-filters.webp': [995, 601], 'cd-results.webp': [1024, 929], 'cync-app.webp': [536, 1104] }[file];
  return `<figure class="project-figure ${cls}"><button class="image-zoom" type="button" data-image="${root}assets/images/${file}" data-caption="${caption.replaceAll('"','&quot;')}" aria-label="Enlarge image: ${alt.replaceAll('"','&quot;')}"><img src="${root}assets/images/${file}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async"><span class="zoom-label">Enlarge <span aria-hidden="true">+</span></span></button><figcaption>${caption}</figcaption></figure>`;
}

function caseHeader(root, { name, intro, summary, image, alt, credit, kind, facts, jump }) {
  return `<header class="case-header">
    <a class="back-link" href="${root}work/">← All work</a>
    <div class="case-hero">
      <div class="case-hero-copy"><h1>${name}</h1><p class="case-intro">${intro}</p><p class="case-standfirst">${summary}</p><a class="text-link" href="#${jump[0]}">${jump[1]} <span aria-hidden="true">↓</span></a></div>
      <figure class="case-hero-figure"><div class="case-product ${kind}"><img src="${root}assets/images/${image}" alt="${alt}" width="${kind === 'dispatch-product' ? 418 : 1248}" height="${kind === 'dispatch-product' ? 889 : 2518}" fetchpriority="high" decoding="async"></div><figcaption>${credit}</figcaption></figure>
    </div>
    <dl class="case-facts">${facts.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>
  </header>`;
}

function caseNav(items) {
  return `<nav class="case-sidebar" aria-label="Case study sections"><p>In this project</p>${items.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav>`;
}

function references(title, links, note) {
  return `<section id="sources" class="case-references"><h2>${title}</h2><ul>${links.map(([url,label])=>`<li>${external(url,label)}</li>`).join('')}</ul><p class="fine-print">${note}</p></section>`;
}

function nextProject(root, slug, name, description) {
  return `<a class="next-project" href="${root}work/${slug}/"><span>Next project</span><strong>${name}</strong><span class="next-description">${description}</span><span class="next-arrow" aria-hidden="true">↗</span></a>`;
}

export function dispatch(root) {
  return `<article class="case-study">
  ${caseHeader(root, {
    name: 'Central Dispatch',
    intro: 'Find the next load, from a phone.',
    summary: 'Mobile search for carriers in automotive logistics. I collaborated with UX Research, Product, and Software Engineering on the search launch.',
    image: 'cd-search-screen.webp',
    alt: 'Central Dispatch mobile search with saved searches, pickup and delivery locations, filters, and a Search Loads button.',
    credit: 'Published interface · Central Dispatch carrier mobile app guide',
    kind: 'dispatch-product',
    facts: [['Focus','Carrier mobile search'],['Team','Shipment Solutions'],['Company','Cox Automotive'],['Project scope','Public launch overview']],
    jump: ['experience','Explore the search flow']
  })}
  <div class="case-body">
  ${caseNav([['context','The task'],['experience','Search flow'],['collaboration','My contribution'],['outcome','Launch & scope'],['sources','Sources']])}
  <div class="case-sections">
    <section id="context" class="case-section"><h2>A load board for work on the move.</h2><div class="case-prose"><p>Carriers use Central Dispatch to find vehicles to transport. Bringing search into the carrier app gives them access to listings away from a desktop.</p><p>The core task is to find loads for a route, review the details, and keep relevant options in a worklist. The published mobile flow supports that task through saved searches, filters, load details, and a worklist that syncs with the web.</p></div></section>
    <section id="experience" class="case-section"><h2>From a route to a worklist.</h2><p class="section-intro">The public product guide documents four connected parts of the experience.</p>
      <ol class="search-journey"><li><h3>Start a search</h3><p>Enter pickup and delivery locations or choose a saved search.</p></li><li><h3>Narrow the results</h3><p>Apply filters, then adjust or remove them as the search changes.</p></li><li><h3>Review a load</h3><p>Compare route, payment, shipper rating, and vehicles per load.</p></li><li><h3>Keep a shortlist</h3><p>Add loads to the worklist from results or the load detail page.</p></li></ol>
      <div class="case-artifact"><div class="artifact-description"><h3>Refine the search.</h3><p>Filters help carriers narrow the listings. Applied filters can be removed individually or changed through Filter & Sort.</p></div>${imageFigure(root,'cd-filters.webp','Published Central Dispatch filter options across several mobile screens.','Filter controls from the official carrier mobile app guide.')}</div>
      <div class="case-artifact"><div class="artifact-description"><h3>Compare the details that matter.</h3><p>Result cards put route and payment information alongside shipper ratings. Opening a card reveals more detail; the worklist keeps selected loads together.</p></div>${imageFigure(root,'cd-results.webp','Central Dispatch load results showing pickup, delivery, payment, shipper rating, and vehicle information.','Published search results and their field descriptions. Product documentation supplied by Central Dispatch.')}</div>
    </section>
    <section id="collaboration" class="case-section"><h2>My contribution.</h2><div class="case-prose"><p>My work sits within the Central Dispatch Shipment Solutions team. I partnered with UX Research, Product, and Software Engineering on the launch of search in the carrier mobile app.</p><p>My public launch update also recognized a Team Titan Business Award for customer experience, innovation, and service to the team.</p></div>${external(site.launch,'Read the launch update')}</section>
    <section id="outcome" class="case-section"><h2>A launched search experience.</h2><p>The launch announcement and product guide document mobile search in the carrier app. They show a path from finding a load to keeping it in a synchronized worklist.</p><div class="evidence-note"><h3>About this overview</h3><p>This page covers the public launch and product flow. Detailed design decisions, individual screen ownership, and performance results are not included in the public material.</p></div></section>
    ${references('Product documentation',[[site.guide,'Carrier mobile search guide'],[site.launch,'Launch announcement'],[site.linkedin,'Professional profile']],'Product imagery belongs to Central Dispatch / Cox Automotive. Screens document the published experience; they do not establish individual design ownership.')}
  </div></div>
  ${nextProject(root,'cync','Cync','Community research and an iOS capstone.')}
  </article>`;
}

export function cync(root) {
  return `<article class="case-study">
  ${caseHeader(root, {
    name: 'Cync',
    intro: 'Local places and events, in one app.',
    summary: 'A graduate capstone connecting Gordon County residents with their community. My role combined UX design and development in a three-person team.',
    image: 'cync-phone.webp',
    alt: 'The original Cync app shown in its published white phone mockup.',
    credit: 'Original app presentation · University of Georgia capstone archive',
    kind: 'cync-product',
    facts: [['My role','UX Designer & Developer'],['Team','Kathryn, Natasha & Belle'],['Research','10-person study'],['Context','University of Georgia, 2022']],
    jump: ['findings','Explore the research findings']
  })}
  <div class="case-body">
  ${caseNav([['problem','The brief'],['contribution','My contribution'],['research','Study approach'],['findings','Research findings'],['scope','Outcome & next steps'],['sources','Project archive']])}
  <div class="case-sections">
    <section id="problem" class="case-section"><h2>Helping residents find what’s nearby.</h2><div class="case-prose"><p>Cync explored a shared source of local information for Gordon County, Georgia. Residents could find events, dining, community hotspots, and resources through an iOS app.</p><p>The project connected three audiences: residents looking for things to do, business owners seeking local visibility, and the Chamber of Commerce sharing community information. The research asked whether the app was useful and whether people could navigate it.</p></div></section>
    <section id="contribution" class="case-section"><h2>My part in the team.</h2><p>I worked with Natasha Busie and Belle Jones. The project archive identifies my role as UX Designer and Developer; our research plan sets out the responsibilities below.</p><dl class="contribution-list"><div><dt>Development & website UX</dt><dd>Advanced development and UX website design were my assigned areas in the project plan.</dd></div><div><dt>Interviews & data collection</dt><dd>I was listed as an interviewer with Natasha, and a data collector with Belle.</dd></div><div><dt>Shared project work</dt><dd>Natasha and Belle contributed research, interface design, branding, and development across the capstone.</dd></div></dl></section>
    <section id="research" class="case-section"><h2>A study around everyday tasks.</h2><p>The published report covers 10 participants across residents, business owners, and Chamber members. The research plan proposed interviews, pre- and post-task surveys, and think-aloud sessions with the app or prototype.</p><div class="study-tasks"><h3>Tasks in the research plan</h3><ul><li>Find an upcoming event and read its details.</li><li>Add an event to a calendar.</li><li>Map a route to a local place.</li><li>Find somewhere to eat.</li></ul></div><p>These tasks gave the team a way to examine how people moved between information, directions, and actions. The report identified issues with categories, icon visibility, and content hierarchy.</p></section>
    <section id="findings" class="case-section"><h2>What participants found difficult.</h2><p class="section-intro">The research report pairs each issue with a proposed design response. All three are shown here for comparison.</p>
      <table class="research-table"><caption class="sr-only">Cync research findings and proposed responses</caption><thead><tr><th scope="col">Area</th><th scope="col">Finding</th><th scope="col">Proposed response</th></tr></thead><tbody>
      <tr id="panel-nav"><th scope="row">Navigation</th><td data-label="Finding">Events and Community Hotspots were difficult to distinguish. Some content and labels overlapped.</td><td data-label="Proposed response">Revisit the category structure, consolidate overlapping information, and prioritize the tab order.</td></tr>
      <tr id="panel-icons"><th scope="row">Visibility</th><td data-label="Finding">Calendar, map, and link icons were not visible enough to some testers.</td><td data-label="Proposed response">Increase icon size and strengthen contrast between the menu and surrounding imagery.</td></tr>
      <tr id="panel-read"><th scope="row">Readability</th><td data-label="Finding">Titles, descriptions, and their placement made parts of the content harder to scan.</td><td data-label="Proposed response">Add space between titles and descriptions and revise the information hierarchy.</td></tr>
      </tbody></table><p class="fine-print">Source: team user-testing report, page 5. These are proposed revisions; a post-revision retest is not documented.</p>
      <div class="interface-context">${imageFigure(root,'cync-app.webp','Original Cync About screen with community information and bottom navigation.','Original Cync About screen, preserved from the project archive.','cync-original')}<div><h3>The original interface.</h3><p>The archived screen shows the community content and bottom navigation used in the app. It provides context for the study’s focus on finding information and moving between sections.</p><p class="fine-print">This is the original UI. The proposed research responses above have not been applied to this image.</p></div></div>
    </section>
    <section id="scope" class="case-section"><h2>What the project produced.</h2><p>The capstone archive contains an app concept, a design system, a research plan, and a user-testing report. The study gave the team specific categories and controls to reconsider.</p><div class="outcome-columns"><div><h3>A scope decision</h3><p>Testers wanted to see other people’s ratings and reviews. The team described shared interaction as unlikely within the project timeframe.</p></div><div><h3>A next step</h3><p>A follow-up study could test the revised categories, icon visibility, and content spacing against the same tasks. The archive does not establish a measured improvement after revision.</p></div></div></section>
    ${references('Explore the project archive',[[site.cync,'Original capstone website'],[site.report,'User-testing report (PDF)'],[site.plan,'Research plan (PDF)'],[site.design,'Design system (PDF)']],'Cync team: Kathryn Patterson, Natasha Busie, and Belle Jones. Original app imagery and research belong to the project team.')}
  </div></div>
  ${nextProject(root,'central-dispatch','Central Dispatch','Mobile search for automotive logistics.')}
  </article>`;
}
