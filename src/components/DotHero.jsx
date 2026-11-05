import { useEffect, useRef } from 'react';

// Pointillist name: text is sampled into dots that drift home,
// scatter away from the pointer, and burst on click/tap.

const PIGMENTS = ['--ultramarine', '--vermilion', '--ochre', '--viridian'];

function readVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function DotHero({ lines }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dots = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: -9999, y: -9999, active: false };
    let colors = { ink: '#1c1b19', pigments: [] };

    function readColors() {
      colors = { ink: readVar('--ink'), pigments: PIGMENTS.map(readVar) };
    }

    function build() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Render text offscreen, then sample on a jittered grid.
      const off = document.createElement('canvas');
      off.width = Math.round(w);
      off.height = Math.round(h);
      const o = off.getContext('2d');
      const family = '"Fraunces", Georgia, serif';
      let size = Math.min(w / 5.2, 200);
      const stacked = w < 760;
      const text = stacked ? lines : [lines.join(' ')];
      if (!stacked) size = Math.min(w / (text[0].length * 0.5), 220);
      o.font = `800 ${size}px ${family}`;
      // Shrink until the widest line fits.
      const widest = () => Math.max(...text.map((t) => o.measureText(t).width));
      while (widest() > w * 0.94 && size > 20) {
        size -= 2;
        o.font = `800 ${size}px ${family}`;
      }
      o.fillStyle = '#000';
      o.textBaseline = 'middle';
      const lh = size * 1.02;
      const top = h / 2 - ((text.length - 1) * lh) / 2;
      text.forEach((t, i) => {
        const tw = o.measureText(t).width;
        o.fillText(t, (w - tw) / 2, top + i * lh);
      });

      const data = o.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(3, Math.round(size / 34));
      const next = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const jx = x + (Math.random() - 0.5) * step * 0.45;
          const jy = y + (Math.random() - 0.5) * step * 0.45;
          const px = Math.min(off.width - 1, Math.max(0, Math.round(jx)));
          const py = Math.min(off.height - 1, Math.max(0, Math.round(jy)));
          if (data[(py * off.width + px) * 4 + 3] > 128) {
            const r = Math.random();
            next.push({
              hx: jx,
              hy: jy,
              x: reduce ? jx : Math.random() * w,
              y: reduce ? jy : Math.random() * h,
              vx: 0,
              vy: 0,
              r: step * (0.32 + Math.random() * 0.2),
              // Mostly ink, with a scatter of pigment.
              c: r < 0.8 ? -1 : Math.floor(Math.random() * 4),
            });
          }
        }
      }
      // A few loose dots drifting around the canvas.
      for (let i = 0; i < 70; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        next.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, r: 1 + Math.random() * 2.2, c: Math.floor(Math.random() * 4), loose: true });
      }
      dots = next;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        ctx.fillStyle = d.c < 0 ? colors.ink : colors.pigments[d.c];
        ctx.globalAlpha = d.loose ? 0.55 : 1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      const R = Math.min(110, w / 7);
      for (const d of dots) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (pointer.active && dist2 < R * R) {
          const dist = Math.sqrt(dist2) || 1;
          const f = (1 - dist / R) * 2.4;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        d.vx += (d.hx - d.x) * 0.045;
        d.vy += (d.hy - d.y) * 0.045;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;
      }
      draw();
      raf = requestAnimationFrame(tick);
    }

    function local(e) {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    const onMove = (e) => {
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };
    const onDown = (e) => {
      const p = local(e);
      for (const d of dots) {
        const dx = d.x - p.x;
        const dy = d.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = Math.max(0, 260 - dist) / 260;
        d.vx += (dx / dist) * f * 38;
        d.vy += (dy / dist) * f * 38;
      }
      if (reduce) {
        // No animation loop; just re-tint a few dots on click.
        for (const d of dots) if (Math.random() < 0.05) d.c = Math.floor(Math.random() * 4);
        draw();
      }
    };

    let started = false;
    const start = () => {
      readColors();
      build();
      if (reduce) draw();
      else if (!started) {
        started = true;
        tick();
      }
    };

    (document.fonts?.ready || Promise.resolve()).then(start);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduce) draw();
      }, 150);
    };
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduce) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => setTimeout(() => { readColors(); if (reduce) draw(); }, 0);
    mq.addEventListener('change', onScheme);

    window.addEventListener('resize', onResize);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onDown);
    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      mq.removeEventListener('change', onScheme);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, [lines]);

  return <canvas ref={canvasRef} className="dot-hero" role="img" aria-label={lines.join(' ')} />;
}
