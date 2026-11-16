# Design direction

The user requested a new portfolio inspired by designwhich.works, with the GitHub repository and Pages handoff used for Joel and Nishabh.

The opening introduces Kathryn’s work in automotive logistics and links directly to Central Dispatch. A compact roadway sculpture supports the introduction. A crop of the published Quick Search screen appears next, and the work index shows a preview of each project. Kathryn’s portrait appears in the About section and on the About page.

The visual system follows [Apple’s Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) as a website. It uses the operating system’s font, including San Francisco on supported Apple devices, and a light or dark palette that follows the device until the visitor chooses a theme. Blue identifies primary actions and links. The roadway sculpture sits on a solid, softly lit stage. Product screenshots retain their original colors.

Central Dispatch leads with Kathryn’s documented launch contribution and places the published workflow in an interactive walkthrough. Cync leads with the navigation finding and a crop of the original tab bar. Each finding has a heading and a separately labeled proposed response at every width.

The [Work reference (V05)](https://github.com/Parthawe/parth-design-taste/blob/main/skills/parth-design-taste/references/images/work-desktop-light.png) informed a shorter index opening and preview surfaces drawn from each project's imagery. The [Mentra decision reference (V07)](https://github.com/Parthawe/parth-design-taste/blob/main/skills/parth-design-taste/references/images/mentra-decisions-desktop-light.png) informed the reading notes beside product screens. On phones the notes stack below each figure. Readers can open the image at its original size, including when JavaScript is unavailable.

The floating toolbar, mobile menu, and viewer controls follow [Apple’s materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials). The web treatment uses backdrop blur with an opaque fallback when blur is unavailable or the browser reports reduced transparency, increased contrast, or forced colors. The Central Dispatch preview uses an [iOS-style segmented control](https://developer.apple.com/design/human-interface-guidelines/segmented-controls) to switch among three views of the same task. Its radio buttons support native keyboard navigation, and older browsers can read all three views in sequence.

The site toolbar stays visible during scroll. The chapter rail and anchor offsets leave room for it, and the image viewer keeps its toolbar visible when an image scrolls inside the dialog. Focus rings use the accent color with a contrasting outline.

The homepage sculpture and its share preview use AI-generated artwork. Each case study has its own share preview using published product imagery.

Public content sources and copy limits are documented in research/SOURCES.md. Private planning documents stay untracked and out of docs/.
