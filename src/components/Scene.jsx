import { useEffect, useRef, useState } from 'react';
import { LINE_MARKUP, LAMP_MARKUP, GLOW_MARKUP, LAMP, MINX, W, H, MUG, EYE } from './girl.svg.js';

// The desk scene is the site's navigation. Objects open panels:
// laptop -> Tech, easel -> Art, frame -> About, mug -> Contact.
// The lamp switches on/off, her eye follows the cursor, steam rises from the mug.

export const HOTSPOTS = [
  { id: 'tech', label: 'Tech', x1: 224, y1: 146, x2: 358, y2: 244, lx: '86%' },
  { id: 'art', label: 'Art', x1: -120, y1: 112, x2: -10, y2: 258 },
  { id: 'about', label: 'About', x1: 46, y1: 10, x2: 110, y2: 96, below: true },
  { id: 'contact', label: 'Contact', x1: 350, y1: 188, x2: 396, y2: 246 },
];

const pct = (v, total) => `${(v / total) * 100}%`;
const box = ({ x1, y1, x2, y2 }) => ({
  left: pct(x1 - MINX, W),
  top: pct(y1, H),
  width: pct(x2 - x1, W),
  height: pct(y2 - y1, H),
});

const STEAM = [-6, 0, 6]
  .map((dx, i) => `<path class="steam" style="--s:${i}" pathLength="1" fill="none" d="M${MUG.x + dx} ${MUG.y - 4} q-5 -9 0 -18 q5 -9 0 -18"/>`)
  .join('');

const VIEWBOX = `${MINX} 0 ${W} ${H}`;

export default function Scene({ active, onOpen }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(null);
  const [lampOn, setLampOn] = useState(false);
  const [swing, setSwing] = useState(0);
  const [touring, setTouring] = useState(false);

  // Brief label tour once the drawing has finished.
  useEffect(() => {
    const a = setTimeout(() => setTouring(true), 1900);
    const b = setTimeout(() => setTouring(false), 5600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  // Eye follows the cursor.
  useEffect(() => {
    const svg = ref.current;
    const eye = svg.querySelector('.eye');
    if (!eye || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.15;
      cur.y += (target.y - cur.y) * 0.15;
      eye.setAttribute('cx', (EYE.x + cur.x).toFixed(2));
      eye.setAttribute('cy', (EYE.y + cur.y).toFixed(2));
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      const k = r.width / W;
      const dx = e.clientX - (r.left + (EYE.x - MINX) * k);
      const dy = e.clientY - (r.top + EYE.y * k);
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(1, d / 300);
      target = { x: Math.max(-0.6, (dx / d) * 2.2 * m), y: (dy / d) * 1.6 * m };
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lit = hover || active;

  return (
    <div className={`scene ${lampOn ? 'lamp-on' : ''} ${touring ? 'touring' : ''}`} data-hover={lit || undefined}>
      <svg className="illo illo-glow" viewBox={VIEWBOX} aria-hidden="true" dangerouslySetInnerHTML={{ __html: GLOW_MARKUP }} />
      <svg
        ref={ref}
        className="illo illo-main"
        viewBox={VIEWBOX}
        role="img"
        aria-label="Line drawing of a girl working on a laptop at a desk, with an easel, a framed diploma, a plant, a mug and a pendant lamp"
        dangerouslySetInnerHTML={{ __html: LINE_MARKUP + STEAM }}
      />
      <svg
        key={swing}
        className={`illo illo-lamp ${swing ? 'swing' : ''}`}
        viewBox={VIEWBOX}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: LAMP_MARKUP }}
      />

      {HOTSPOTS.map((h) => (
        <button
          key={h.id}
          type="button"
          className={`hotspot ${h.below ? 'label-below' : ''} ${active === h.id ? 'is-active' : ''}`}
          style={{ ...box(h), ...(h.lx ? { '--lx': h.lx } : {}) }}
          aria-label={`Open ${h.label}`}
          onPointerEnter={() => setHover(h.id)}
          onPointerLeave={() => setHover(null)}
          onFocus={() => setHover(h.id)}
          onBlur={() => setHover(null)}
          onClick={(e) => onOpen(h.id, e.currentTarget)}
        >
          <span className="hotspot-label">{h.label}</span>
        </button>
      ))}

      <button
        type="button"
        className="lamp-hit"
        style={{ left: pct(LAMP.x - MINX, W), top: pct(LAMP.y - 14, H) }}
        aria-pressed={lampOn}
        aria-label={lampOn ? 'Switch the lamp off' : 'Switch the lamp on'}
        title={lampOn ? 'Lights off' : 'Lights on'}
        onClick={() => { setLampOn((v) => !v); setSwing((n) => n + 1); }}
      />
    </div>
  );
}
