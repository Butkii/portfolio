import { useEffect, useRef } from 'react';
import { LINE_MARKUP, VIEW, MUG, EYE } from './girl.svg.js';

// Ink line-art illustration. It draws itself in on load (CSS), she blinks,
// steam curls up from the mug, and her eye follows the cursor.

const STEAM = [-6, 0, 6].map(
  (dx, i) =>
    `<path class="steam" style="--s:${i}" pathLength="1" fill="none" d="M${MUG.x + dx} ${MUG.y - 4} q-5 -9 0 -18 q5 -9 0 -18"/>`
).join('');

export default function LineHero({ label }) {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    const eye = svg.querySelector('.eye');
    if (!eye || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let target = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };

    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      const k = r.width / VIEW;
      const dx = e.clientX - (r.left + EYE.x * k);
      const dy = e.clientY - (r.top + EYE.y * k);
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(1, d / 300);
      // Pupil can travel a little inside the face; it can't look backwards
      // through her head, so clamp leftward movement.
      target = { x: Math.max(-0.6, (dx / d) * 2.2 * m), y: (dy / d) * 1.6 * m };
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.15;
      cur.y += (target.y - cur.y) * 0.15;
      eye.setAttribute('cx', (EYE.x + cur.x).toFixed(2));
      eye.setAttribute('cy', (EYE.y + cur.y).toFixed(2));
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="illo"
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: LINE_MARKUP + STEAM }}
    />
  );
}
