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

## Portfolio improvements

The homepage introduction and artwork take less vertical space, bringing selected work closer to the first viewport. Whole project cards now link to their case studies and summarize contribution and available evidence. Case-study headers state role, context, and scope earlier. Section links show the current section.

Targeted browser checks covered all six pages at 320px, 768px, and 1440px. The review found phone-width cover overlaps, tablet Cync cover overlap, and a narrow Site Information heading overflow. After fixes, all six pages at 320px had matching document and viewport widths; the Cync cover also had clear separation at 768px.

Interaction checks confirmed that mobile contact closes the menu and focuses the footer, case navigation updates its current-section state, and the End key selects the last research tab. The image viewer loaded a real image, displayed recovery controls for a deliberately missing test URL, recovered on retry after restoring the valid source, and restored focus on close. Test-only DOM changes were removed by navigation.

With JavaScript disabled at 390px, mobile navigation was visible, all three research panels were displayed, tab controls were hidden, and the page had no horizontal overflow. JavaScript was reenabled after the test.

The one automated design scan flagged six empty viewer image elements, one per generated page. The viewer now creates its image only when opened. The scan was not rerun. The build checker and JavaScript syntax check passed after these changes.

## November 7 case-study and light-mode revision

Both case studies now pair the introduction with product imagery, followed by a four-part role and context summary. Central Dispatch presents the documented search flow with larger filter and results figures. Cync adds planned study methods and tasks, visible finding/response comparisons, team responsibilities, and the documented scope constraint around shared ratings and reviews. Proposed revisions are not described as measured improvements.

Light mode is the default for a visitor without a saved preference. The visible theme control names the alternative mode. A browser check confirmed the default, switching to dark mode, persistence between project routes, and switching back to light mode.

Desktop review at 1440px covered both project introductions and the Cync research comparison. Phone review at 390px covered both introductions and the reflowed findings. All six routes were checked at 320px and 768px: document width matched viewport width, and no broken completed images were reported. The 320px navigation controls remained within the viewport.

The image viewer opened a Cync screen in its ready state and restored focus when closed. Mobile contact closed the menu and focused the footer. With JavaScript disabled at 320px, fallback navigation and all three research findings remained visible without horizontal overflow. Script execution was restored afterward.

The single design scan for this revision returned no findings. The final build, local-link checker, and syntax checks passed. The prior tab-specific checks above describe the earlier release; this revision replaces tabs with a static comparison table.
