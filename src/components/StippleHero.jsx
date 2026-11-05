import { useEffect, useRef } from 'react';
import { LINE_MARKUP, TONE_SVG, VIEW, MUG } from './girl.svg.js';

// Ink line art that draws itself in, then stippled shading laid over it.
// Each shading dot is accepted with probability = darkness of the tone layer.
// Dots ease away from the cursor and drift back; steam rises from the mug.

const LINE_DRAW_MS = 1500;

function loadTones() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(TONE_SVG);
  });
}

export default function StippleHero({ label }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let img = null;
    let dots = [];
    let steam = [];
    let raf = 0;
    let size = 0;
    let dpr = 1;
    let ink = '#1c1b19';
    let revealed = 0;
    let moving = false;
    let cache = null;
    let alive = true;
    let startAt = 0;
    const pointer = { x: -1e4, y: -1e4, active: false };

    const readInk = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || ink;
    };

    function build() {
      size = canvas.getBoundingClientRect().width;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement('canvas');
      off.width = off.height = Math.round(size);
      const o = off.getContext('2d', { willReadFrequently: true });
      o.drawImage(img, 0, 0, off.width, off.height);
      const data = o.getImageData(0, 0, off.width, off.height).data;

      const step = Math.max(1.5, size / 230);
      const next = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const jx = x + (Math.random() - 0.5) * step * 0.9;
          const jy = y + (Math.random() - 0.5) * step * 0.9;
          const px = Math.min(off.width - 1, Math.max(0, jx | 0));
          const py = Math.min(off.height - 1, Math.max(0, jy | 0));
          const dark = 1 - data[(py * off.width + px) * 4] / 255;
          if (dark > 0.03 && Math.random() < Math.pow(dark, 0.85)) {
            next.push({ hx: jx, hy: jy, x: jx, y: jy, vx: 0, vy: 0, r: step * (0.3 + Math.random() * 0.18) });
          }
        }
      }
      for (let i = next.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [next[i], next[j]] = [next[j], next[i]];
      }
      dots = next;
      cache = null;
    }

    function paintDots(target, n) {
      target.fillStyle = ink;
      target.beginPath();
      for (let i = 0; i < n; i++) {
        const d = dots[i];
        target.moveTo(d.x + d.r, d.y);
        target.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      }
      target.fill();
    }

    function makeCache() {
      cache = document.createElement('canvas');
      cache.width = canvas.width;
      cache.height = canvas.height;
      const c = cache.getContext('2d');
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintDots(c, dots.length);
    }

    function stepSteam() {
      const k = size / VIEW;
      if (Math.random() < 0.3) {
        steam.push({ x: (MUG.x + (Math.random() - 0.5) * 12) * k, y: MUG.y * k, t: Math.random() * 6, r: (0.5 + Math.random() * 0.7) * k, life: 1 });
      }
      for (const p of steam) {
        p.t += 0.05;
        p.y -= 0.32 * k;
        p.x += Math.sin(p.t) * 0.22 * k;
        p.life -= 0.009;
      }
      steam = steam.filter((p) => p.life > 0);
      ctx.fillStyle = ink;
      for (const p of steam) {
        ctx.globalAlpha = p.life * 0.75;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function simulate() {
      const R = size * 0.1;
      let energy = 0;
      for (const d of dots) {
        if (pointer.active) {
          const dx = d.x - pointer.x, dy = d.y - pointer.y;
          const q = dx * dx + dy * dy;
          if (q < R * R) {
            const dist = Math.sqrt(q) || 1;
            const f = (1 - dist / R) * 1.2;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
        d.vx = (d.vx + (d.hx - d.x) * 0.06) * 0.8;
        d.vy = (d.vy + (d.hy - d.y) * 0.06) * 0.8;
        d.x += d.vx;
        d.y += d.vy;
        energy += Math.abs(d.vx) + Math.abs(d.vy) + Math.abs(d.hx - d.x) + Math.abs(d.hy - d.y);
      }
      return energy / (dots.length || 1);
    }

    function frame(now) {
      if (!alive) return;
      ctx.clearRect(0, 0, size, size);
      if (now - startAt < LINE_DRAW_MS) {
        // wait for the line art to draw in
      } else if (revealed < dots.length) {
        revealed = Math.min(dots.length, revealed + Math.ceil(dots.length / 60));
        paintDots(ctx, revealed);
      } else if (pointer.active || moving) {
        const e = simulate();
        moving = pointer.active || e > 0.02;
        if (!moving) {
          for (const d of dots) { d.x = d.hx; d.y = d.hy; d.vx = d.vy = 0; }
          cache = null;
        }
        paintDots(ctx, dots.length);
      } else {
        if (!cache) makeCache();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(cache, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      stepSteam();
      raf = requestAnimationFrame(frame);
    }

    const staticDraw = () => {
      ctx.clearRect(0, 0, size, size);
      paintDots(ctx, dots.length);
    };

    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      Object.assign(pointer, local(e), { active: true });
      moving = true;
    };
    const onLeave = () => Object.assign(pointer, { x: -1e4, y: -1e4, active: false });
    const onDown = (e) => {
      const p = local(e);
      const R = size * 0.3;
      for (const d of dots) {
        const dx = d.x - p.x, dy = d.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = Math.max(0, R - dist) / R;
        d.vx += (dx / dist) * f * 9;
        d.vy += (dy / dist) * f * 9;
      }
      moving = true;
    };

    loadTones().then((loaded) => {
      if (!alive) return;
      img = loaded;
      readInk();
      build();
      if (reduce) {
        revealed = dots.length;
        staticDraw();
      } else {
        startAt = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });

    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (!img) return;
        build();
        revealed = dots.length;
        if (reduce) staticDraw();
      }, 150);
    };
    const onTheme = () => {
      readInk();
      cache = null;
      if (reduce && img) staticDraw();
    };
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => setTimeout(onTheme, 0);
    mq.addEventListener('change', onScheme);
    window.addEventListener('resize', onResize);
    if (!reduce) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('pointerdown', onDown);
    }
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      mo.disconnect();
      mq.removeEventListener('change', onScheme);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <div className="illo" role="img" aria-label={label}>
      <svg
        className="illo-lines"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: LINE_MARKUP }}
      />
      <canvas ref={ref} className="illo-dots" aria-hidden="true" />
    </div>
  );
}
