# Kathryn Patterson

A six-page product-design portfolio inspired by the dark, editorial presentation of designwhich.works. Built as a static site with self-hosted assets and the same GitHub Pages publishing structure as the Joel Bobby and Nishabh Polke portfolios.

- Website: https://parthawe.github.io/kathryn-patterson/
- Repository: https://github.com/Parthawe/kathryn-patterson

## Develop

Requires Node.js 18+ and Python 3. There are no production JavaScript dependencies. Font packages are development dependencies; checked-in font files allow normal builds without installation.

```sh
npm run dev
```

Open http://127.0.0.1:5178/.

```sh
npm run prepare:pages
```

The build writes the deployable site to `docs/`. The checker validates local links and fragments, page metadata, image descriptions, GitHub Pages path handling, and the separation of private notes from published files.

## Pages

- `/`: introduction, connected-routes artwork, selected work, and contact.
- `/work/`: Central Dispatch and Cync.
- `/work/central-dispatch/`: public project overview with official product screenshots and the launch announcement.
- `/work/cync/`: capstone context, team roles, research findings, and original source links.
- `/about/`: professional introduction and portrait.
- `/site-info/`: sources, image credits, privacy, and accessibility information.

The website also includes a custom 404 page, sitemap, social metadata, light and dark themes, reduced-motion support, keyboard-operable research tabs, and an image viewer with focus restoration.

## Edit

- `src/content.mjs`: public profile fields, source links, project previews, and deployment URL.
- `src/render.mjs`: shared layout and page content.
- `styles.css`: layout, themes, responsive behavior, and visual states.
- `app.js`: menu, theme preference, research tabs, image viewer, and modest motion.
- `assets/images/`: optimized published imagery.
- `assets/fonts/`: self-hosted fonts with their licenses.
- `research/SOURCES.md`: public source provenance and content limits.
- `HANDOVER.md`: editing, publishing, account transfer, and domain guidance.

Edit sources, then run the build. Files in `docs/` are generated and should not be edited directly.

## Publish

GitHub Pages serves `/docs` from `main`.

```sh
npm run prepare:pages
git add src styles.css app.js assets scripts docs README.md HANDOVER.md DESIGN.md research package.json package-lock.json .gitignore
git commit -m "Update portfolio"
git push origin main
```

All site-local links are relative, so direct project URLs work under the repository subpath. If moving to a different repository, account, or custom domain, update `site.base` in `src/content.mjs` and rebuild before publishing.

## Content limits

The site uses public professional information and real published product imagery. Central Dispatch is a public overview, with no invented research, screen ownership, or performance numbers. Cync distinguishes planned responsibilities, documented findings, and proposed revisions.

There is no résumé download because no current résumé was supplied. Contact uses Kathryn's LinkedIn profile. Add a public email or résumé only when supplied for that purpose. Do not add internal research or client data to a public repository.

The portfolio has no forms, advertising pixels, analytics scripts, accounts, or third-party embeds. Theme preference is stored locally in the visitor's browser. Images and font files load from the same site.

Third-party images and product materials remain the property of their respective owners. Font licenses are included alongside the font files. The abstract hero sculpture was created using the built-in image-generation tool; the prompt and its role are recorded in `research/SOURCES.md`.
