# Editing and publishing Kathryn's portfolio

## Make a content change

1. Open this repository locally or in your coding tool.
2. Edit the project summaries in `src/content.mjs` or page text in `src/render.mjs`.
3. Run `npm run dev` to preview it at http://127.0.0.1:5178/.
4. Review the changed page at desktop and phone widths. Check its links and any controls.
5. Run `npm run prepare:pages`. Fix any reported errors.
6. Commit the source changes and rebuilt `docs/` folder, then push to `main`.
7. Check the Pages deployment in the repository's Actions tab, then open the live page.

Useful instruction for a coding assistant:

> Update the source files for this static portfolio, preserve the existing design, and keep claims supported by research/SOURCES.md. Rebuild docs/, run the checker, and show me the change before publishing. Do not edit generated HTML directly.

## Add an image

Place a web-sized image in `assets/images/` and reference it from `src/render.mjs`. Use a meaningful description for `alt`, set the image's correct dimensions, and credit the source. Keep confidential screens and identifying research-participant data out of public files. Use WebP where practical.

For a full-size project figure, use the existing `imageFigure` helper. It connects the image to the keyboard-accessible enlargement viewer.

## Add more case-study detail

Central Dispatch currently contains a public overview. Expand it when Kathryn provides her specific responsibilities, decisions, constraints, approved artifacts, and supported results. Do not turn a public product description into a claim that she designed every shown screen.

Cync's research findings are documented; the proposed changes do not have a demonstrated retest in the reviewed source. Keep that distinction unless new evidence is supplied.

## Add a résumé or email

Use a current résumé intended for public sharing. Add the file to `assets/downloads/`, link it from the shared navigation or About page, and include the file format in the link label. For email, use the exact address Kathryn chooses to publish and add a `mailto:` link. Remove stale versions when replacing a document.

## Ownership and a custom domain

The initial repository belongs to `Parthawe`. To hand it over, use GitHub's collaborator invitation or repository-transfer flow. Kathryn should accept from her own account. No password sharing is needed.

After an account or repository-name change, update `site.base` in `src/content.mjs`, rebuild, and check the canonical URLs, sitemap, social image URL, and 404 link. Recheck Pages settings after a transfer.

For a custom domain, first confirm ownership and registrar access. Configure the domain in GitHub Pages, follow the DNS records GitHub specifies, add the required CNAME file to the built output through `scripts/build.mjs`, and update `site.base`. Verify the domain and HTTPS before replacing the LinkedIn portfolio link. A custom domain has not been configured as part of this initial build.

## Private planning files

The earlier planning documents and `.cache/` are ignored by Git. They are also excluded from the website build. Keep private correspondence, credentials, draft project accounts, and unapproved assets out of the public repository and `docs/`.

## Restore a previous version

Use Git history to locate the earlier source and `docs/` changes. Make a revert commit and push it. This preserves history and triggers a new Pages deployment. Avoid force-pushing shared history.
