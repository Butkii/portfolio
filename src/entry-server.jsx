import { renderToString } from 'react-dom/server';
import App from './App';

// Used only at build time by scripts/prerender.mjs.
export function render(panel) {
  return renderToString(<App initialPanel={panel || null} />);
}

export { PAGES, SITE, urlFor } from './seo';
