export function projectMedia(root, project, eager = false) {
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
  const source = `${root}assets/images/${project.image}`;
  const frames = project.cover === 'dispatch'
    ? `<div class="cover-frame">
        <img src="${source}" alt="${project.alt}" width="418" height="889" ${loading} decoding="async">
        <span>Search</span>
      </div>
      <div class="cover-frame">
        <div class="cover-results"><img src="${root}assets/images/cd-results.webp" alt="Published load results with route, shipper, and payment details." width="1024" height="929" ${loading} decoding="async"></div>
        <span>Listings</span>
      </div>`
    : `<div class="cover-frame">
        <img src="${source}" alt="${project.alt}" width="1248" height="2518" ${loading} decoding="async">
        <span>Original app</span>
      </div>`;
  return `<div class="project-cover ${project.cover}-cover">${frames}</div>`;
}
