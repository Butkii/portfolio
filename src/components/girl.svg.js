// The desk scene: a girl at a desk, side view, working on a laptop, with an
// easel, a framed diploma, a plant, a mug and a pendant lamp.
// Pure ink line art. Shapes are paper-filled so front shapes hide back ones;
// fill: 'ink' = solid black, fill: 'none' = open stroke.
// Clickable objects are grouped (`obj obj-*`) so they highlight and pop as one.
// The plant lives in Plant.jsx (it bends as it wilts), drawn behind this layer.

// Drawing coordinates run from MINX to MINX + W horizontally, 0..H vertically.
export const MINX = -130;
export const W = 530;
export const H = 400;
export const MUG = { x: 367, y: 206 };
export const EYE = { x: 190, y: 120 };
export const LAMP = { x: 300, y: 94 };


const S = [
  // easel (Art)
  { obj: 'art', k: 0, children: [
    { t: 'path', a: { d: 'M-62 116 L-58 384' }, fill: 'none' },
    { t: 'path', a: { d: 'M-65 116 L-104 384 M-65 116 L-24 384' }, fill: 'none' },
    { t: 'rect', a: { x: -112, y: 134, width: 94, height: 114 } },
    { t: 'rect', a: { x: -118, y: 248, width: 106, height: 6 } },
    { t: 'path', a: { d: 'M-106 228 L-24 228 M-65 228 L-65 196' }, fill: 'none' },
    { t: 'path', a: { d: 'M-74 176 L-56 176 L-53 196 L-77 196 Z' } },
    { t: 'path', a: { d: 'M-77 176 L-65 166 L-53 176 M-65 166 L-65 161' }, fill: 'none' },
    { t: 'path', a: { d: 'M-46 158 q4 -4 8 0 q4 -4 8 0' }, fill: 'none' },
  ] },

  // framed diploma on the wall (About)
  { obj: 'about', k: 1, children: [
    { t: 'path', a: { d: 'M64 28 L78 14 L92 28' }, fill: 'none' },
    { t: 'rect', a: { x: 50, y: 28, width: 56, height: 64 } },
    { t: 'rect', a: { x: 57, y: 35, width: 42, height: 50 } },
    { t: 'path', a: { d: 'M66 56 L78 50 L90 56 L78 62 Z' } },
    { t: 'path', a: { d: 'M70 59 L70 66 Q78 70 86 66 L86 59 M90 56 L90 66' }, fill: 'none' },
  ] },

  // plant pot (the plant itself is in Plant.jsx)
  { t: 'path', a: { d: 'M42 376 L52 330 L84 330 L94 376 Z' } },

  // chair (back and base; the seat is drawn after her legs so it shows beneath her)
  { t: 'path', a: { d: 'M101 282 L86 160 L98 158 L113 282 Z' } },
  { t: 'path', a: { d: 'M135 344 L102 372 M135 344 L168 372 M135 344 L135 374' }, fill: 'none' },
  { t: 'rect', a: { x: 131, y: 287, width: 8, height: 57 } },

  // trousers + shoe
  { t: 'path', a: { d: 'M212 258 L236 262 L246 352 L226 354 Z' } },
  { t: 'path', a: { d: 'M112 252 Q150 244 228 256 L236 276 Q170 282 118 276 Z' } },
  { t: 'path', a: { d: 'M222 350 L250 348 Q268 352 268 362 L222 364 Z' }, fill: 'ink' },
  // chair seat, under her thighs
  { t: 'rect', a: { x: 90, y: 277, width: 92, height: 10, rx: 4 } },

  // torso (sweater) + ribbing
  { t: 'path', a: { d: 'M120 262 Q108 214 130 182 Q146 166 170 168 Q196 172 200 196 L196 236 Q186 262 150 266 Z' } },
  { t: 'path', a: { d: 'M122 254 Q150 260 190 248' }, fill: 'none' },

  // back arm, front arm, hand
  { t: 'path', a: { d: 'M176 192 Q192 214 202 228 L238 222 L242 224 L240 232 L234 233 L200 240 Q182 222 166 206 Z' } },
  { t: 'path', a: { d: 'M158 186 Q172 212 188 232 L244 226 L246 238 L186 246 Q164 222 146 196 Z' } },
  { t: 'path', a: { d: 'M244 226 Q256 223 261 229 L252 237 L246 238 Z' } },

  // neck
  { t: 'path', a: { d: 'M160 148 L176 148 L178 172 L160 174 Z' } },

  // head, face and hair
  { grp: 'head', children: [
    { t: 'path', a: { d: 'M132 82 L166 108' }, fill: 'none', w: 2.4 },
    { t: 'circle', a: { cx: 148, cy: 96, r: 16 }, fill: 'ink' },
    { t: 'ellipse', a: { cx: 174, cy: 124, rx: 27, ry: 31 } },
    { t: 'path', a: { d: 'M198 116 L206 132 L198 135' } },
    { t: 'ellipse', a: { cx: 190, cy: 120, rx: 2.4, ry: 2.8, class: 'eye' }, fill: 'ink', w: 0.6 },
    { t: 'path', a: { d: 'M185 112 Q190 109 196 112' }, fill: 'none' },
    { t: 'path', a: { d: 'M187 141 Q190.5 142.5 194 140.5' }, fill: 'none' },
    { t: 'path', a: { d: 'M146 132 Q140 96 168 90 Q196 86 202 110 Q192 100 180 104 Q166 108 162 122 Q158 134 160 148 Q150 146 146 132 Z' }, fill: 'ink' },
  ] },

  // desk
  { t: 'rect', a: { x: 198, y: 248, width: 8, height: 128 } },
  { t: 'rect', a: { x: 370, y: 248, width: 8, height: 128 } },
  { t: 'rect', a: { x: 190, y: 240, width: 196, height: 8 } },

  // laptop (Tech)
  { obj: 'tech', k: 2, children: [
    { t: 'path', a: { d: 'M232 232 L330 232 L334 240 L228 240 Z' } },
    { t: 'path', a: { d: 'M322 237 L346 152 L354 154 L330 239 Z' } },
  ] },

  // mug (Contact)
  { obj: 'contact', k: 3, children: [
    { t: 'path', a: { d: 'M378 218 Q390 220 388 228 Q386 236 377 234' }, fill: 'none' },
    { t: 'path', a: { d: 'M356 210 L378 210 L376 240 L358 240 Z' } },
  ] },
];

const attrs = (a) => Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ');

let n = 0;
const shape = (s) => {
  const fill = s.fill === 'none' ? 'none' : s.fill === 'ink' ? 'currentColor' : 'var(--paper)';
  const w = s.w ? ` stroke-width="${s.w}"` : '';
  return `<${s.t} ${attrs(s.a)} fill="${fill}"${w} pathLength="1" style="--d:${Math.round(n++ * 0.7)}"/>`;
};

const child = (c) => (c.raw ? c.raw : shape(c));

export const LINE_MARKUP = S.map((s) => {
  if (s.obj) return `<g class="obj obj-${s.obj}" style="--k:${s.k}">${s.children.map(child).join('')}</g>`;
  if (s.grp) return `<g class="${s.grp}">${s.children.map(child).join('')}</g>`;
  return shape(s);
}).join('');

// Warm light, rendered behind the drawing so paper-filled shapes sit on top.
export const GLOW_MARKUP = `
<defs>
  <radialGradient id="lamp-glow">
    <stop offset="0" style="stop-color: var(--ochre); stop-opacity: 0.55"/>
    <stop offset="0.45" style="stop-color: var(--ochre); stop-opacity: 0.18"/>
    <stop offset="1" style="stop-color: var(--ochre); stop-opacity: 0"/>
  </radialGradient>
  <linearGradient id="lamp-beam" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" style="stop-color: var(--ochre); stop-opacity: 0.16"/>
    <stop offset="1" style="stop-color: var(--ochre); stop-opacity: 0.03"/>
  </linearGradient>
</defs>
<g class="light">
  <path d="M286 98 L314 98 L360 238 L240 238 Z" fill="url(#lamp-beam)"/>
  <ellipse cx="300" cy="104" rx="70" ry="56" fill="url(#lamp-glow)"/>
  <ellipse cx="300" cy="236" rx="90" ry="14" fill="url(#lamp-glow)"/>
</g>`;

// Pendant lamp, rendered separately so it can swing and switch on.
export const LAMP_MARKUP = `
<g class="lamp-swing">
  <path d="M300 0 L300 72" pathLength="1" style="--d:0"/>
  <path d="M278 94 Q278 72 300 72 Q322 72 322 94 Z" fill="currentColor" pathLength="1" style="--d:1"/>
  <ellipse class="bulb" cx="300" cy="96" rx="6" ry="3.5" fill="var(--paper)"/>
</g>`;
