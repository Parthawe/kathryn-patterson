import { projects } from './content.mjs';

const [dispatch] = projects;
const steps = [
  {
    id: 'search',
    label: 'Search',
    heading: 'Set a pickup and delivery',
    description: 'Carriers can start with a saved search or enter pickup and delivery locations in Quick Search.',
    image: dispatch.image,
    width: 418,
    height: 889,
    alt: 'Published Quick Search screen with saved searches and pickup and delivery fields.'
  },
  {
    id: 'filters',
    label: 'Filters',
    heading: 'Search along the route',
    description: 'The Search Along Route toggle includes vehicles along the way. The radius controls expand or narrow the area around each stop.',
    image: 'cd-filters.webp',
    width: 995,
    height: 601,
    alt: 'Published search settings showing Search Along Route, location radius controls, and sorting.'
  },
  {
    id: 'listings',
    label: 'Listings',
    heading: 'Compare available loads',
    description: 'Each listing shows the pickup and delivery, the vehicle, payment, and the shipper’s rating.',
    image: 'cd-results.webp',
    width: 1024,
    height: 929,
    alt: 'Published load listings with route, vehicle, shipper rating, and payment details.'
  }
];

export function dispatchWalkthrough(root) {
  return `<article class="featured-project" aria-labelledby="dispatch-preview-title">
    <div class="featured-project-intro">
      <p class="project-category">${dispatch.note}</p>
      <h3 id="dispatch-preview-title">Central Dispatch</h3>
      <p>Mobile load search for vehicle carriers. I worked with research, product, and engineering on the search launch.</p>
      <a class="text-link" href="${root}work/${dispatch.slug}/">Read the case study <span aria-hidden="true">→</span></a>
    </div>
    <div class="dispatch-walkthrough">
      <fieldset class="walkthrough-controls">
        <legend>Explore the load search</legend>
        <div class="walkthrough-options">${steps.map((step, index) => `
          <label>
            <input type="radio" name="dispatch-step" value="${step.id}"${index === 0 ? ' checked' : ''}>
            <span>${step.label}</span>
          </label>`).join('')}
        </div>
      </fieldset>
      <div class="walkthrough-panels">${steps.map(step => `
        <section class="walkthrough-panel" data-step="${step.id}">
          <div class="walkthrough-screen">
            <img src="${root}assets/images/${step.image}" alt="${step.alt}" width="${step.width}" height="${step.height}" loading="lazy" decoding="async">
            <span class="walkthrough-highlight" aria-hidden="true"></span>
          </div>
          <div class="walkthrough-note">
            <h4>${step.heading}</h4>
            <p>${step.description}</p>
          </div>
        </section>`).join('')}
      </div>
      <p class="walkthrough-credit">Screens from the Central Dispatch mobile app guide</p>
    </div>
  </article>`;
}
