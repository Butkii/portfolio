import { useEffect, useRef, useState } from 'react';
import { LINE_MARKUP, LAMP_MARKUP, GLOW_MARKUP, LAMP, VIEW, MUG, EYE } from './girl.svg.js';

// Ink line-art illustration. It draws itself in on load (CSS), she blinks,
// steam curls up from the mug, her eye follows the cursor, and the lamp
// swings and switches on/off when clicked.

const STEAM = [-6, 0, 6].map(
  (dx, i) =>
    `<path class="steam" style="--s:${i}" pathLength="1" fill="none" d="M${MUG.x + dx} ${MUG.y - 4} q-5 -9 0 -18 q5 -9 0 -18"/>`
).join('');

export default function LineHero({ label }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [swing, setSwing] = useState(0);
  const toggle = () => {
    setOn((v) => !v);
    setSwing((n) => n + 1);
  };

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
    <div className={`illo-wrap ${on ? 'lamp-on' : ''}`}>
      <svg
        className="illo illo-glow"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: GLOW_MARKUP }}
      />
      <svg
        ref={ref}
        className="illo"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        role="img"
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: LINE_MARKUP + STEAM }}
      />
      <svg
        key={swing}
        className={`illo illo-lamp ${swing ? 'swing' : ''}`}
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: LAMP_MARKUP }}
      />
      <button
        type="button"
        className="lamp-hit"
        style={{ left: `${(LAMP.x / VIEW) * 100}%`, top: `${((LAMP.y - 14) / VIEW) * 100}%` }}
        aria-pressed={on}
        aria-label={on ? 'Switch the lamp off' : 'Switch the lamp on'}
        title={on ? 'Lights off' : 'Lights on'}
        onClick={toggle}
      />
    </div>
  );
}
