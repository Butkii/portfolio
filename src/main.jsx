import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { panelFromPath } from './App';
import './styles.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App initialPanel={panelFromPath(window.location.pathname)} />
  </React.StrictMode>
);

// Pages are prerendered at build time; hydrate them. In dev the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
