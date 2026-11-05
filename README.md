# bhaktighaghda.com

Personal site for Bhakti Ghaghda: product lead, frontend engineer, designer and painter (Pellucidworks).

Vite + React, no CSS framework. The dot effects are hand-written canvas code, with no libraries.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Editing content

All copy lives in [`src/content.js`](src/content.js): bio, experience, projects, skills, education, artworks, series and exhibitions. The components only render it.

- **Artwork photos:** put files in `public/art/` and set `image: '/art/your-file.jpg'` on the work. Until a work has an image, a generated pointillist "dot study" in that work's `palette` stands in.
- **Series progress:** set `done: true` on a piece in `series.pieces`.
- **Tags:** experience bullets are grouped by `PM` / `Frontend` / `Design`, and the filter on the Work section uses those groups.

## Interactive pieces

- `DotHero`: the name rendered as a few thousand dots. They scatter from the cursor and burst on click or tap.
- `DotStudy`: seeded generative pointillism used as placeholders for artworks. It stipples itself in when scrolled into view.
- `StipplePad`: a small canvas where visitors can paint with dots and save the result as a PNG.

All three respect `prefers-reduced-motion` and follow the light/dark theme.

Outstanding content gaps are listed in [CONTENT-TODO.md](CONTENT-TODO.md).
