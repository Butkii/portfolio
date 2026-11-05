import { useEffect, useRef } from 'react';

// Generated pointillist study, used as a stand-in until a photo of the
// real work is added. Stipples itself in when scrolled into view.

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

const fields = {
  // Lantern + crow on the Corniche at dusk.
  lantern(u, v, r) {
    const gx = u - 0.5, gy = v - 0.46;
    const g = Math.sqrt(gx * gx * 1.6 + gy * gy);
    if (Math.abs(u - 0.5) < 0.012 && v > 0.56 && v < 0.86) return 4;
    if (((u - 0.62) / 0.05) ** 2 + ((v - 0.33) / 0.03) ** 2 < 1) return 4;
    if (u > 0.6 && u < 0.7 && Math.abs(v - 0.335 + (u - 0.6) * 0.3) < 0.008) return 4;
    if (g < 0.07) return r() < 0.75 ? 3 : 2;
    if (g < 0.2 && r() < 1 - g / 0.2) return r() < 0.6 ? 2 : 5;
    if (v > 0.7) {
      if (Math.abs(u - 0.5) < 0.06 && r() < 0.35) return 2;
      return r() < 0.7 ? 0 : 4;
    }
    return r() < v * 1.2 ? 1 : 0;
  },
  // Phoenix: a rising flame with embers.
  flame(u, v, r) {
    const t = (v - 0.1) / 0.8;
    if (t > 0 && t < 1) {
      const half = 0.3 * Math.pow(Math.sin(Math.PI * t), 0.9) * Math.pow(t, 0.6);
      const wing = 0.18 * Math.max(0, Math.sin(Math.PI * (t - 0.35) * 2.2)) * (t > 0.35 && t < 0.8 ? 1 : 0);
      if (Math.abs(u - 0.5) < half + wing) {
        const k = t + (r() - 0.5) * 0.25;
        return k < 0.35 ? 3 : k < 0.55 ? 2 : k < 0.8 ? 1 : 0;
      }
    }
    if (r() < 0.06) return r() < 0.5 ? 3 : 2;
    return r() < 0.35 ? 4 : 5;
  },
  // Tbilisi: stacked facades, balconies and a strip of sky.
  street(u, v, r, s) {
    const col = Math.floor(u * 6);
    const top = 0.18 + s[col] * 0.25;
    if (v < top) return r() < 0.75 ? 3 : 5;
    if (v > 0.86) return r() < 0.6 ? 4 : 0;
    const lu = (u * 6) % 1;
    const lv = ((v - top) * 9) % 1;
    if (lu > 0.3 && lu < 0.7 && lv > 0.35 && lv < 0.8) return r() < 0.8 ? 2 : 4;
    if (lv > 0.9 && r() < 0.7) return 4;
    return col % 2 ? (r() < 0.7 ? 0 : 1) : r() < 0.7 ? 1 : 3;
  },
};

export default function DotStudy({ seed = 1, motif = 'lantern', palette, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let dots = [];

    function build() {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = rng(seed * 9973);
      const cols = Array.from({ length: 6 }, () => r());
      const n = Math.round((w * h) / 14);
      const base = Math.max(1.1, w / 150);
      dots = [];
      for (let i = 0; i < n; i++) {
        const u = r(), v = r();
        const c = fields[motif](u, v, r, cols);
        dots.push({ x: u * w, y: v * h, r: base * (0.6 + r() * 0.7), c: palette[c % palette.length] });
      }
      return { w, h };
    }

    function drawAll(upto) {
      for (let i = 0; i < upto; i++) {
        const d = dots[i];
        ctx.fillStyle = d.c;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function render(animate) {
      cancelAnimationFrame(raf);
      const { w, h } = build();
      ctx.clearRect(0, 0, w, h);
      if (!animate) return drawAll(dots.length);
      let i = 0;
      const per = Math.ceil(dots.length / 70);
      const step = () => {
        const end = Math.min(dots.length, i + per);
        for (; i < end; i++) {
          const d = dots[i];
          ctx.fillStyle = d.c;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (i < dots.length) raf = requestAnimationFrame(step);
      };
      step();
    }

    let seen = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !seen) {
          seen = true;
          render(!reduce);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(canvas);
    const ro = new ResizeObserver(() => seen && render(false));
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [seed, motif, palette]);

  return <canvas ref={ref} className="dot-study" role="img" aria-label={label} />;
}
