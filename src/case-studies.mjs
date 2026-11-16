import { projects, site } from './content.mjs';
import { dispatchWalkthrough } from './dispatch-walkthrough.mjs';

const arrow = '<span aria-hidden="true">↗</span>';
const external = (href, label) => `<a class="text-link" href="${href}" target="_blank" rel="noopener noreferrer">${label} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;

function caseHeader(root, { project, intro, summary, facts, jump }) {
  return `<header class="case-header">
    <a class="back-link" href="${root}work/">← All work</a>
    <div class="case-hero">
      <div class="case-hero-copy"><h1>${project.name}</h1><p class="case-intro">${intro}</p></div>
      <div class="case-context"><p class="case-standfirst">${summary}</p><a class="text-link" href="#${jump[0]}">${jump[1]} <span aria-hidden="true">↓</span></a></div>
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
    project: projects[0],
    intro: 'Finding and comparing vehicle loads on a phone',
    summary: 'I helped launch mobile load search for vehicle carriers as part of the Shipment Solutions team.',
    facts: [['Contribution','Mobile search launch'],['Team','Shipment Solutions'],['Company','Cox Automotive'],['Scope','Public launch overview']],
    jump: ['collaboration','See my contribution']
  })}
  <div class="case-body">
  ${caseNav([['collaboration','My contribution'],['context','The task'],['experience','Search flow'],['outcome','Launch & scope'],['sources','Sources']])}
  <div class="case-sections">
    <section id="collaboration" class="case-section">
      <h2>My contribution</h2>
      <p>I partnered with UX Research, Product, and Software Engineering on the mobile search launch. The screenshots below come from the public product guide.</p>
      ${external(site.launch,'Read the launch announcement')}
    </section>
    <section id="context" class="case-section">
      <h2>Finding loads away from a desktop</h2>
      <p>Vehicle carriers use the load board to find cars to transport. Bringing search into the mobile app lets them look for loads on a route, compare listings, and save options to a Worklist.</p>
    </section>
    <section id="experience" class="case-section">
      <h2>From a route to a shortlist</h2>
      <p class="section-intro">Follow a load search from pickup and delivery locations to a listing a carrier can save.</p>
      ${dispatchWalkthrough(root)}
    </section>
    <section id="outcome" class="case-section">
      <h2>What shipped</h2>
      <p>Search launched in the carrier app. Carriers can find and review loads on mobile, then pick up where they left off with a Worklist that syncs with the web.</p>
    </section>
    ${references('Product documentation',[[site.guide,'Carrier mobile search guide'],[site.launch,'Launch announcement'],[site.linkedin,'Professional profile']],'Product imagery belongs to Central Dispatch / Cox Automotive. The product guide documents the released screens and workflow.')}
  </div></div>
  ${nextProject(root,'cync','Cync','Community research and an iOS capstone.')}
  </article>`;
}

function researchFinding(id, title, finding, proposal) {
  return `<article class="research-finding" id="${id}">
    <h3>${title}</h3>
    <div><h4>Finding</h4><p>${finding}</p></div>
    <div><h4>Proposed response</h4><p>${proposal}</p></div>
  </article>`;
}

export function cync(root) {
  return `<article class="case-study">
  ${caseHeader(root, {
    project: projects[1],
    intro: 'A local discovery app for Gordon County, Georgia',
    summary: 'In our 10-person study, participants had trouble telling Events and Community Hotspots apart. I worked as a UX designer and developer on the three-person capstone team.',
    facts: [['My role','UX Designer & Developer'],['Team','Kathryn, Natasha & Belle'],['Research','10-person study'],['Context','University of Georgia, 2022']],
    jump: ['findings','Explore the research findings']
  })}
  <div class="case-body">
  ${caseNav([['findings','Research findings'],['problem','The brief'],['contribution','My contribution'],['research','Study approach'],['scope','Outcome & next steps'],['sources','Project archive']])}
  <div class="case-sections">
    <section id="findings" class="case-section">
      <h2>Events and Hotspots were hard to tell apart</h2>
      <article class="research-finding research-lead" id="panel-nav">
        <figure class="research-figure">
          <a class="image-zoom" href="${root}assets/images/cync-app.webp" data-caption="Original Cync About screen from the capstone archive." aria-label="View full Cync screen">
            <div class="evidence-crop evidence-cync">
              <img src="${root}assets/images/cync-app.webp" alt="Cync’s original tab bar, with Events and Hotspots next to each other." width="536" height="1104" loading="lazy" decoding="async">
            </div>
            <span class="zoom-label">View full screen <span aria-hidden="true">↗</span></span>
          </a>
          <figcaption>Original Cync navigation</figcaption>
        </figure>
        <div class="research-finding-copy">
          <h3>Navigation</h3>
          <div><h4>Finding</h4><p>Events and Community Hotspots were hard to tell apart. Some content and labels overlapped.</p></div>
          <div><h4>Proposed response</h4><p>Revisit the categories, combine overlapping content, and reconsider the order of the tabs.</p></div>
        </div>
      </article>
      ${researchFinding('panel-icons', 'Icon visibility', 'Some participants had trouble seeing the calendar, map, and link icons.', 'Increase icon size and strengthen contrast between the menu and surrounding imagery.')}
      ${researchFinding('panel-read', 'Readability', 'Titles and descriptions were hard to scan in parts of the app.', 'Add space between titles and descriptions and clarify their hierarchy.')}
      <p class="fine-print">The research report lists these as proposals. It does not document a follow-up test.</p>
    </section>
    <section id="problem" class="case-section"><h2>Helping residents find what’s nearby.</h2><div class="case-prose"><p>Cync explored a shared source of local information for Gordon County, Georgia. Residents could find events, dining, community hotspots, and resources through an iOS app.</p><p>The project connected three audiences: residents looking for things to do, business owners seeking local visibility, and the Chamber of Commerce sharing community information. The research asked whether the app was useful and whether people could navigate it.</p></div></section>
    <section id="contribution" class="case-section"><h2>My part in the team.</h2><p>I worked with Natasha Busie and Belle Jones. The project archive identifies my role as UX Designer and Developer; our research plan sets out the responsibilities below.</p><dl class="contribution-list"><div><dt>Development & website UX</dt><dd>Advanced development and UX website design were my assigned areas in the project plan.</dd></div><div><dt>Interviews & data collection</dt><dd>I was listed as an interviewer with Natasha, and a data collector with Belle.</dd></div><div><dt>Shared project work</dt><dd>Natasha and Belle contributed research, interface design, branding, and development across the capstone.</dd></div></dl></section>
    <section id="research" class="case-section"><h2>A study around everyday tasks.</h2><p>The published report covers 10 participants across residents, business owners, and Chamber members. The research plan proposed interviews, pre- and post-task surveys, and think-aloud sessions with the app or prototype.</p><div class="study-tasks"><h3>Tasks in the research plan</h3><ul><li>Find an upcoming event and read its details.</li><li>Add an event to a calendar.</li><li>Map a route to a local place.</li><li>Find somewhere to eat.</li></ul></div><p>These tasks gave the team a way to examine how people moved between information, directions, and actions. The report identified issues with categories, icon visibility, and content hierarchy.</p></section>
    <section id="scope" class="case-section"><h2>What the project produced.</h2><p>The capstone archive contains an app concept, a design system, a research plan, and a user-testing report. The study gave the team specific categories and controls to reconsider.</p><div class="outcome-columns"><div><h3>A scope decision</h3><p>Testers wanted to see other people’s ratings and reviews. The team described shared interaction as unlikely within the project timeframe.</p></div><div><h3>A next step</h3><p>A follow-up study could test the revised categories, icon visibility, and content spacing against the same tasks. The archive does not establish a measured improvement after revision.</p></div></div></section>
    ${references('Explore the project archive',[[site.cync,'Original capstone website'],[site.report,'User-testing report (PDF)'],[site.plan,'Research plan (PDF)'],[site.design,'Design system (PDF)']],'Cync team: Kathryn Patterson, Natasha Busie, and Belle Jones. Original app imagery and research belong to the project team.')}
  </div></div>
  ${nextProject(root,'central-dispatch','Central Dispatch','Mobile search for automotive logistics.')}
  </article>`;
}
