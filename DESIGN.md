# Design direction

The user requested a new portfolio inspired by designwhich.works, with the GitHub repository and Pages handoff used for Joel and Nishabh.

Reading: a product-design portfolio for hiring managers, with expressive editorial type, dark surfaces, tactile sculpture, and direct access to work.

DESIGN_VARIANCE: 7. Asymmetric composition, with content in a predictable reading order.
MOTION_INTENSITY: 4. Short entrances and restrained pointer response clarify hierarchy. All motion has a reduced-motion fallback.
VISUAL_DENSITY: 3. Two substantive projects and concise introductions.

This uses native HTML, CSS, and JavaScript, rather than claiming to implement a commercial design system. Cormorant Garamond is an explicit response to the reference's editorial display typography. Manrope handles reading and controls. Both fonts are self-hosted with their licenses.

The default theme is charcoal with sage emphasis; a full light theme is available. Every page follows the selected theme. Warm metal in the abstract artwork is an image material, not a second UI accent.

Corners are sharp for page structure, 8px for controls, and 12px for image wells. The only larger radius belongs to the original phone imagery. Focus rings use the accent color with a contrasting outline. Layers: page 0, navigation 10, menu 20, image dialog 30.

The abstract connected-routes sculpture is illustrative artwork. It does not depict a shipped interface. Cync uses the original published app imagery. No reconstructed product UI, invented metrics, testimonials, or fabricated recent case-study process is included.

Public content sources and copy limits are documented in research/SOURCES.md. Private planning documents stay untracked and out of docs/.
