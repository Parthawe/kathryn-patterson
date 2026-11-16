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
    alt: 'Saved Searches and the Quick Search fields for pickup and delivery.'
  },
  {
    id: 'filters',
    label: 'Filters',
    heading: 'Search along the route',
    description: 'The Search Along Route toggle includes vehicles along the way. The radius controls expand or narrow the area around each stop.',
    image: 'cd-filters.webp',
    width: 995,
    height: 601,
    alt: 'Search Along Route toggle and pickup and delivery radius controls.'
  },
  {
    id: 'listings',
    label: 'Listings',
    heading: 'Compare available loads',
    description: 'Compare the pickup, delivery, payment, and shipper rating. Add a load to the Worklist from results or from its detail page.',
    image: 'cd-results.webp',
    width: 1024,
    height: 929,
    alt: 'A load card with pickup and delivery details, payment, and shipper rating.'
  }
];

export function dispatchWalkthrough(root) {
  const caption = 'Central Dispatch carrier mobile app guide.';
  return `<div class="dispatch-walkthrough">
      <fieldset class="walkthrough-controls">
        <legend>Explore the load search</legend>
        <div class="walkthrough-options">${steps.map((step, index) => `
          <label>
            <input type="radio" name="dispatch-step" value="${step.id}"${index === 0 ? ' checked' : ''}>
            <span>${step.label}</span>
          </label>`).join('')}
        </div>
      </fieldset>
      <div class="walkthrough-panels">${steps.map(step => {
        const source = `${root}assets/images/${step.image}`;
        return `<section class="walkthrough-panel" data-step="${step.id}">
          <figure class="walkthrough-figure">
            <a class="image-zoom" href="${source}" data-caption="${caption}" aria-label="View full ${step.label.toLowerCase()} image">
              <div class="evidence-crop evidence-${step.id}">
                <img src="${source}" alt="${step.alt}" width="${step.width}" height="${step.height}" loading="lazy" decoding="async">
              </div>
              <span class="zoom-label">View full image <span aria-hidden="true">↗</span></span>
            </a>
          </figure>
          <div class="walkthrough-note"><h3>${step.heading}</h3><p>${step.description}</p></div>
        </section>`;
      }).join('')}
      </div>
      <p class="walkthrough-credit">Screens from the Central Dispatch mobile app guide</p>
    </div>`;
}
