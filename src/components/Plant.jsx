import { MINX, W, H } from './girl.svg.js';

// The floor plant, drawn behind the main drawing so the pot and chair sit in
// front of it. It turns green on hover.

const BASE = [68, 330];
// c = bend (control point), t = tip; each leaf sits at its stem tip, following the stem.
const STEMS = [
  { c: [52, 286], t: [32, 266], leaf: 14 },
  { c: [64, 280], t: [74, 236], leaf: 15 },
  { c: [88, 292], t: [106, 276], leaf: 14 },
  { c: [46, 306], t: [26, 300], leaf: 12 },
  { c: [60, 312], t: [52, 290], leaf: 10 },
];

const stems = STEMS.map(({ c, t }) => `M${BASE[0]} ${BASE[1]} Q${c[0]} ${c[1]} ${t[0]} ${t[1]}`).join(' ');
const leaves = STEMS.map(({ c, t, leaf }) => {
  const ang = Math.atan2(t[1] - c[1], t[0] - c[0]);
  const cx = (t[0] + Math.cos(ang) * leaf * 0.85).toFixed(1);
  const cy = (t[1] + Math.sin(ang) * leaf * 0.85).toFixed(1);
  return { cx, cy, rx: leaf, ry: leaf * 0.4, deg: ((ang * 180) / Math.PI).toFixed(1) };
});

export default function Plant() {
  return (
    <svg className="illo illo-plant" viewBox={`${MINX} 0 ${W} ${H}`} aria-hidden="true">
      <g className="plant">
        <rect x="8" y="216" width="122" height="116" fill="transparent" stroke="none" />
        <path d={stems} fill="none" pathLength="1" style={{ '--d': 8 }} />
        {leaves.map((l, i) => (
          <ellipse
            key={i}
            cx={l.cx}
            cy={l.cy}
            rx={l.rx}
            ry={l.ry}
            transform={`rotate(${l.deg} ${l.cx} ${l.cy})`}
            fill="var(--paper)"
            pathLength="1"
            style={{ '--d': 9 + i }}
          />
        ))}
      </g>
    </svg>
  );
}
