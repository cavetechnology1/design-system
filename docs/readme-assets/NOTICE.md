# README artwork

`components.png` is a documentation composition of the canonical Web TextField, Checkbox, Button and StatusBadge examples in `source/catalog.mjs`, rendered in Chromium from the built Web package (`packages/core/dist/styles.css` and `tokens.css`) with the real component markup. An earlier version of this image showed desaturated colours that did not match the tokens (Light primary button `#4a6d80` instead of lagoon `#047283`); it was re-rendered and the button colours checked against `source/tokens.json`.

The English Light and Arabic Dark specimens use the approved IBM Plex Sans and IBM Plex Sans Arabic fonts, which retain their included SIL OFL notices in `source/fonts/`. This is a Web component specimen, not a product screenshot or a Flutter rendering. Package code and generated tokens retain the existing MIT terms in `packages/LICENSE`.

The README's original Cave symbol is referenced directly from `source/logos/`. It retains the separate proprietary brand terms at https://brand.cave.technology/#licence. No additional rights to Cave marks are granted. Regenerate the 1200 × 650 image with `npm run preview:readme` after building the site. `scripts/readme-preview.mjs` renders canonical markup and the local font/CSS assets in Chromium. The image is a documentation specimen, not an application screenshot.
