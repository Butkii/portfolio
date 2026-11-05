# bhaktighaghda.com

Personal site for Bhakti Ghaghda: product lead, frontend engineer, designer and painter (Pellucidworks).

Vite + React, no CSS framework. The dot effects are hand-written canvas code, with no libraries.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## How it works

The site is one screen: a line drawing of a desk that doubles as the navigation.

| Object | Opens |
|---|---|
| Laptop | Work |
| Framed diploma | About (bio, what I do, education) |
| Easel | Art (live Instagram profile embed for @pellucidworks) |
| Mug | Contact |
| Lamp | Switches the light on and off |

Panels slide in from the right (a bottom sheet on phones). Each panel has its own URL (`/#work`, `/#about`, `/#art`, `/#contact`). Esc, the close button or Back closes it. The top menu reaches the same panels without the drawing.

- `src/components/girl.svg.js`: the drawing, as a list of shapes. `obj-*` classes mark the clickable objects.
- `src/components/Scene.jsx`: hotspots, hover highlights, the intro label tour, eye tracking and the lamp.
- `src/components/Panel.jsx`: the slide-in panel.
- `src/components/InstagramProfile.jsx`: Instagram's own profile embed, which updates automatically.

## Editing content

All copy lives in [`src/content.js`](src/content.js): bio, the work rows (with links to the live products), skills, education and the art intro.

Outstanding content gaps are listed in [CONTENT-TODO.md](CONTENT-TODO.md).
