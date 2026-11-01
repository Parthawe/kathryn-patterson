# Verification record

November 1, 2026

## Build checks

`npm run prepare:pages` builds all six pages and checks local links, target fragments, page titles, descriptions, canonical URLs, image descriptions, unfinished copy markers, file sizes, and exclusion of internal planning files from `docs/`.

`node --check app.js` and `node --check src/render.mjs` pass.

## Browser checks

All six routes were opened at widths of 390px and 1440px. Titles and primary headings were present, and no broken completed images were reported. The initial desktop hero overflow was fixed by containing the artwork within the hero; a subsequent 1440px check confirmed document width matched viewport width. The 390px homepage also had no horizontal overflow.

Visual review covered the dark desktop homepage, light mobile homepage, desktop work index, mobile project geometry, and the About composition. The initial mobile project previews placed their images too close to the titles; their image placement was adjusted. The current LinkedIn portrait replaced the lower-resolution capstone portrait.

The following interactions were exercised in the browser:

- Mobile menu opens and closes; Escape closes it.
- Theme switch changes the whole page, and the preference persists between routes.
- Cync research tabs switch their visible panel.
- ArrowRight moves selection from Visibility to Readability.
- Project image viewer opens and closes, with focus returning to the image button.
- Emulated reduced-motion preference disables the hero animation.
- No JavaScript errors were reported in the browser error log during the final local check.

The transparent hero derivative was checked in light mode so that the original dark background would not appear as an image block. The social card retains the charcoal-background original. The public artwork source and both built-in image-generation prompts are in SOURCES.md.

## Scope

These are targeted browser and build checks, not an accessibility certification or a complete device matrix. No Lighthouse score is claimed. Public copy intentionally omits unsupported performance claims, a résumé file that was not supplied, and unpublished project details.

The publishing handoff requires a successful GitHub Pages build and a check of the actual live URLs. Record the initial release commit and verify the published homepage and direct project routes after pushing.

## Initial live release

The repository was created at https://github.com/Parthawe/kathryn-patterson with Pages configured for `main:/docs`. Initial release commit: `6cd7f29f337089553c91ff5285abbf56abd0f72d`. GitHub's pages-build-deployment run `41327346769` completed successfully.

The six live page routes returned HTTP 200, as did the hero image, body font, stylesheet, and JavaScript file. Browser verification of the live homepage confirmed its title, loaded images, and absence of horizontal overflow. Final artwork sizing was reduced within its grid cell to preserve the complete sculpture rather than relying on clipping. The custom domain remains unconfigured.
