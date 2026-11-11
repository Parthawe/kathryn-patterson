# Design direction

The user requested a new portfolio inspired by designwhich.works, with the GitHub repository and Pages handoff used for Joel and Nishabh.

Reading: a product-design portfolio for hiring managers, with expressive editorial type, dark surfaces, tactile sculpture, and direct access to work.

DESIGN_VARIANCE: 7. Asymmetric composition, with content in a predictable reading order.
MOTION_INTENSITY: 4. Short entrances and restrained pointer response clarify hierarchy. All motion has a reduced-motion fallback.
VISUAL_DENSITY: 3. Two substantive projects and concise introductions.

This uses native HTML, CSS, and JavaScript, rather than claiming to implement a commercial design system. Cormorant Garamond is an explicit response to the reference's editorial display typography. Manrope handles reading and controls. Both fonts are self-hosted with their licenses.

The default theme is warm ivory with dark green text and sage surfaces; the charcoal theme remains available. A visible label names the theme-switch action, and every page follows the saved preference. Warm metal in the abstract artwork is an image material, not a second UI accent.

Case studies pair the introduction with original product imagery, followed by a compact role and context summary. The reading column uses smaller editorial headings, concise paragraphs, and larger product figures. Cync research findings stay visible together in a comparison table, with labeled blocks on phones. Proposed responses and documented outcomes remain distinct.

The [Work reference (V05)](https://github.com/Parthawe/parth-design-taste/blob/main/skills/parth-design-taste/references/images/work-desktop-light.png) informed a shorter index opening and preview surfaces drawn from each project's imagery. The [Mentra decision reference (V07)](https://github.com/Parthawe/parth-design-taste/blob/main/skills/parth-design-taste/references/images/mentra-decisions-desktop-light.png) informed the reading notes beside product screens. On phones the notes stack below each figure. Readers can open the image at its original size, including when JavaScript is unavailable.

Page structure stays sharp, with 8px controls and 12px image wells. The floating toolbar, mobile menu, and viewer controls have softer corners and a tinted glass finish. The effect follows [Apple's guidance for Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials): controls float above the content, while screenshots and reading surfaces stay solid. The web version uses backdrop blur and a lit edge, with solid surfaces when blur is unavailable or the browser reports reduced transparency, increased contrast, or forced colors.

The site toolbar stays visible during scroll. The chapter rail and anchor offsets leave room for it, and the image viewer keeps its toolbar visible when an image scrolls inside the dialog. Focus rings use the accent color with a contrasting outline.

The abstract connected-routes sculpture is illustrative artwork. It does not depict a shipped interface. Cync uses the original published app imagery. No reconstructed product UI, invented metrics, testimonials, or fabricated recent case-study process is included.

Public content sources and copy limits are documented in research/SOURCES.md. Private planning documents stay untracked and out of docs/.
