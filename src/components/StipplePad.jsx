import { useEffect, useRef, useState } from 'react';

// A small pointillism playground: drag to stipple, pick a pigment, save.

const SWATCHES = [
  { name: 'Ink', v: '--ink' },
  { name: 'Ultramarine', v: '--ultramarine' },
  { name: 'Vermilion', v: '--vermilion' },
  { name: 'Ochre', v: '--ochre' },
  { name: 'Viridian', v: '--viridian' },
  { name: 'Mixed', v: 'mixed' },
];

const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

export default function StipplePad() {
  const ref = useRef(null);
  const state = useRef({ down: false, dots: [], last: null });
  const [swatch, setSwatch] = useState(5);
  const [brush, setBrush] = useState(18);
  const [count, setCount] = useState(0);
  const swatchRef = useRef(swatch);
  const brushRef = useRef(brush);
  swatchRef.current = swatch;
  brushRef.current = brush;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const s = state.current;

    // Dots are stored in normalized coords so the piece survives resizes.
    function redraw() {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const d of s.dots) dot(d, w, h);
    }
    function dot(d, w, h) {
      ctx.fillStyle = d.c;
      ctx.beginPath();
      ctx.arc(d.u * w, d.v * h, d.r * w, 0, Math.PI * 2);
      ctx.fill();
    }
    function stipple(x, y) {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const B = brushRef.current;
      const pigments = ['--ultramarine', '--vermilion', '--ochre', '--viridian'];
      const sw = SWATCHES[swatchRef.current];
      const n = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const rr = Math.sqrt(Math.random()) * B;
        const c = sw.v === 'mixed' ? css(pigments[Math.floor(Math.random() * 4)]) : css(sw.v);
        const d = { u: (x + Math.cos(a) * rr) / w, v: (y + Math.sin(a) * rr) / h, r: (1.5 + Math.random() * B * 0.11) / w, c };
        s.dots.push(d);
        dot(d, w, h);
      }
      setCount(s.dots.length);
    }
    function pos(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    const down = (e) => {
      s.down = true;
      canvas.setPointerCapture(e.pointerId);
      const p = pos(e);
      s.last = p;
      stipple(p.x, p.y);
    };
    const move = (e) => {
      if (!s.down) return;
      const p = pos(e);
      // Fill gaps on fast strokes.
      const dx = p.x - s.last.x, dy = p.y - s.last.y;
      const steps = Math.max(1, Math.floor(Math.hypot(dx, dy) / 8));
      for (let i = 1; i <= steps; i++) stipple(s.last.x + (dx * i) / steps, s.last.y + (dy * i) / steps);
      s.last = p;
    };
    const up = () => (s.down = false);

    redraw();
    const ro = new ResizeObserver(redraw);
    ro.observe(canvas);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    s.clear = () => {
      s.dots = [];
      setCount(0);
      redraw();
    };
    s.save = () => {
      const out = document.createElement('canvas');
      out.width = canvas.width;
      out.height = canvas.height;
      const o = out.getContext('2d');
      o.fillStyle = css('--paper');
      o.fillRect(0, 0, out.width, out.height);
      o.drawImage(canvas, 0, 0);
      const a = document.createElement('a');
      a.download = 'my-pointillism.png';
      a.href = out.toDataURL('image/png');
      a.click();
    };
    return () => {
      ro.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <div className="pad">
      <div className="pad-canvas-wrap">
        <canvas ref={ref} className="pad-canvas" aria-label="Stipple canvas: drag to paint with dots" />
        {count === 0 && <p className="pad-hint">Press and drag to paint, one dot at a time.</p>}
      </div>
      <div className="pad-tools">
        <div className="swatches" role="radiogroup" aria-label="Pigment">
          {SWATCHES.map((sw, i) => (
            <button
              key={sw.name}
              role="radio"
              aria-checked={swatch === i}
              aria-label={sw.name}
              title={sw.name}
              className={`swatch ${sw.v === 'mixed' ? 'swatch-mixed' : ''} ${swatch === i ? 'is-on' : ''}`}
              style={sw.v === 'mixed' ? undefined : { background: `var(${sw.v})` }}
              onClick={() => setSwatch(i)}
            />
          ))}
        </div>
        <label className="brush">
          <span>Brush</span>
          <input type="range" min="6" max="48" value={brush} onChange={(e) => setBrush(+e.target.value)} />
        </label>
        <span className="pad-count">{count.toLocaleString()} dots</span>
        <div className="pad-actions">
          <button className="btn-ghost" onClick={() => state.current.clear()} disabled={!count}>Clear</button>
          <button className="btn-ghost" onClick={() => state.current.save()} disabled={!count}>Save PNG</button>
        </div>
      </div>
    </div>
  );
}
