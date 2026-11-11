# Design direction

The user requested a new portfolio inspired by designwhich.works, with the GitHub repository and Pages handoff used for Joel and Nishabh.

The portfolio opens with Kathryn's name, portrait, and work in automotive logistics. The project list uses wide spreads that put a short summary next to the original screens. On phones, the summary, screenshots, and supporting details appear in that order.

DESIGN_VARIANCE: 7. Asymmetric composition, with content in a predictable reading order.
MOTION_INTENSITY: 2. Navigation and link feedback support the reading path. Smooth scrolling respects reduced motion.
VISUAL_DENSITY: 3. Two substantive projects and concise introductions.

This uses native HTML, CSS, and JavaScript, rather than claiming to implement a commercial design system. Cormorant Garamond is an explicit response to the reference's editorial display typography. Manrope handles reading and controls. Both fonts are self-hosted with their licenses.

The default theme uses warm ivory and dark green. A visible theme control switches to charcoal and saves the preference. Central Dispatch uses a navy frame drawn from the published interface. Cync uses a sage frame.

Case studies put the task, contribution, and project context above a wide image. The reading column uses smaller editorial headings and pairs product figures with notes. Cync research findings stay visible together in a comparison table, with labeled blocks on phones. The table identifies proposed responses.

The [Work reference (V05)](https://github.com/Parthawe/parth-design-taste/blob/main/skills/parth-design-taste/references/images/work-desktop-light.png) informed a shorter index opening and preview surfaces drawn from each project's imagery. The [Mentra decision reference (V07)](https://github.com/Parthawe/parth-design-taste/blob/main/skills/parth-design-taste/references/images/mentra-decisions-desktop-light.png) informed the reading notes beside product screens. On phones the notes stack below each figure. Readers can open the image at its original size, including when JavaScript is unavailable.

Page structure stays sharp, with 8px controls and 12px image wells. The floating toolbar, mobile menu, and viewer controls have softer corners and a tinted glass finish. The effect follows [Apple's guidance for Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials): controls float above the content, while screenshots and reading surfaces stay solid. The web version uses backdrop blur and a lit edge, with solid surfaces when blur is unavailable or the browser reports reduced transparency, increased contrast, or forced colors.

The site toolbar stays visible during scroll. The chapter rail and anchor offsets leave room for it, and the image viewer keeps its toolbar visible when an image scrolls inside the dialog. Focus rings use the accent color with a contrasting outline.

The social preview uses the original abstract artwork. Project spreads and case studies use published product imagery.

Public content sources and copy limits are documented in research/SOURCES.md. Private planning documents stay untracked and out of docs/.
