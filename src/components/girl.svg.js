// Hero illustration: a girl at a desk, side view, working on a laptop.
// One shape list drives two renderings:
//   LINE_SVG: crisp ink outlines (paper-filled so front shapes hide back ones)
//   TONE_SVG: greyscale fills, rasterised offscreen to place stipple shading
// tone: grey for stipple shading (null = no shading). line: draw outline.

export const VIEW = 400;
export const MUG = { x: 367, y: 254 };

const S = [
  // lamp light + floor shadow (tone only)
  { t: 'path', a: { d: 'M288 96 L312 96 L388 288 L212 288 Z' }, tone: '#f6f6f6', line: false },
  { t: 'ellipse', a: { cx: 205, cy: 377, rx: 165, ry: 6 }, tone: '#bdbdbd', line: false },

  // pendant lamp
  { t: 'path', a: { d: 'M300 0 L300 72' }, line: true },
  { t: 'path', a: { d: 'M278 94 Q278 72 300 72 Q322 72 322 94 Z' }, tone: '#1a1a1a', line: true },

  // floor plant
  { t: 'path', a: { d: 'M68 330 Q52 286 32 268 M68 330 Q64 280 76 240 M68 330 Q88 292 108 280 M68 330 Q46 306 24 302' }, line: true, fill: 'none' },
  { t: 'ellipse', a: { cx: 34, cy: 268, rx: 14, ry: 6, transform: 'rotate(35 34 268)' }, tone: '#6a6a6a', line: true },
  { t: 'ellipse', a: { cx: 76, cy: 242, rx: 6, ry: 15, transform: 'rotate(10 76 242)' }, tone: '#6a6a6a', line: true },
  { t: 'ellipse', a: { cx: 106, cy: 280, rx: 14, ry: 6, transform: 'rotate(-20 106 280)' }, tone: '#6a6a6a', line: true },
  { t: 'ellipse', a: { cx: 26, cy: 302, rx: 13, ry: 5 }, tone: '#6a6a6a', line: true },
  { t: 'ellipse', a: { cx: 52, cy: 292, rx: 5, ry: 12, transform: 'rotate(-40 52 292)' }, tone: '#6a6a6a', line: true },
  { t: 'path', a: { d: 'M42 376 L52 330 L84 330 L94 376 Z' }, tone: '#a0a0a0', line: true },

  // chair
  { t: 'path', a: { d: 'M100 262 L86 160 L98 158 L112 262 Z' }, tone: '#7a7a7a', line: true },
  { t: 'path', a: { d: 'M135 344 L102 372 M135 344 L168 372 M135 344 L135 374' }, line: true, fill: 'none' },
  { t: 'rect', a: { x: 131, y: 272, width: 8, height: 72 }, tone: '#7a7a7a', line: true },
  { t: 'rect', a: { x: 96, y: 262, width: 78, height: 10, rx: 4 }, tone: '#7a7a7a', line: true },

  // trousers + shoe
  { t: 'path', a: { d: 'M212 258 L236 262 L246 352 L226 354 Z' }, tone: '#3a3a3a', line: true },
  { t: 'path', a: { d: 'M112 252 Q150 244 228 256 L236 276 Q170 282 118 276 Z' }, tone: '#3a3a3a', line: true },
  { t: 'path', a: { d: 'M222 350 L250 348 Q268 352 268 362 L222 364 Z' }, tone: '#111', line: true },

  // torso (sweater) + ribbing
  { t: 'path', a: { d: 'M120 262 Q108 214 130 182 Q146 166 170 168 Q196 172 200 196 L196 236 Q186 262 150 266 Z' }, tone: '#d4d4d4', line: true },
  { t: 'path', a: { d: 'M122 254 Q150 260 190 248' }, line: true, fill: 'none' },

  // back arm, front arm, hand
  { t: 'path', a: { d: 'M176 192 Q200 220 216 244 L236 262 L246 262 L242 272 L226 270 L204 252 Q182 228 166 206 Z' }, tone: '#a6a6a6', line: true },
  { t: 'path', a: { d: 'M158 186 Q176 214 194 240 L230 270 L248 272 L248 282 L224 282 L184 254 Q160 224 146 196 Z' }, tone: '#dedede', line: true },
  { t: 'path', a: { d: 'M246 270 Q258 268 262 276 L252 284 L244 282 Z' }, tone: null, line: true },

  // neck, head, face
  { t: 'path', a: { d: 'M160 148 L176 148 L178 172 L160 174 Z' }, tone: null, line: true },
  { t: 'ellipse', a: { cx: 174, cy: 124, rx: 27, ry: 31 }, tone: null, line: true },
  { t: 'path', a: { d: 'M198 116 L206 132 L198 135' }, tone: null, line: true, nosefill: true },
  { t: 'ellipse', a: { cx: 190, cy: 120, rx: 2.4, ry: 2.8, class: 'eye' }, line: true, fill: 'ink', w: 0.6 },
  { t: 'path', a: { d: 'M185 112 Q190 109 196 112' }, line: true, fill: 'none' },
  { t: 'path', a: { d: 'M194 143 Q197 145 200 143' }, line: true, fill: 'none' },
  { t: 'circle', a: { cx: 165, cy: 141, r: 2.2 }, tone: '#000', line: true },

  // hair, bun, pencil
  { t: 'path', a: { d: 'M132 82 L166 108' }, line: true, fill: 'none', w: 2.4 },
  { t: 'circle', a: { cx: 148, cy: 96, r: 16 }, tone: '#050505', line: true },
  { t: 'path', a: { d: 'M146 132 Q140 96 168 90 Q196 86 202 110 Q192 100 180 104 Q166 108 162 122 Q158 134 160 148 Q150 146 146 132 Z' }, tone: '#050505', line: true },

  // desk
  { t: 'rect', a: { x: 198, y: 298, width: 8, height: 78 }, tone: '#8a8a8a', line: true },
  { t: 'rect', a: { x: 370, y: 298, width: 8, height: 78 }, tone: '#8a8a8a', line: true },
  { t: 'rect', a: { x: 190, y: 288, width: 196, height: 10 }, tone: '#5a5a5a', line: true },

  // laptop
  { t: 'path', a: { d: 'M232 280 L330 280 L334 288 L228 288 Z' }, tone: '#6a6a6a', line: true },
  { t: 'path', a: { d: 'M322 285 L346 200 L354 202 L330 287 Z' }, tone: '#2a2a2a', line: true },

  // mug
  { t: 'path', a: { d: 'M378 266 Q390 268 388 276 Q386 284 377 282' }, line: true, fill: 'none' },
  { t: 'path', a: { d: 'M356 258 L378 258 L376 288 L358 288 Z' }, tone: '#9a9a9a', line: true },
];

const attrs = (a) => Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ');

export const LINE_MARKUP = S.filter((s) => s.line)
  .map((s, i) => {
    const fill = s.fill === 'none' ? 'none' : s.fill === 'ink' ? 'currentColor' : 'var(--paper)';
    const w = s.w ? ` stroke-width="${s.w}"` : '';
    return `<${s.t} ${attrs(s.a)} fill="${fill}"${w} pathLength="1" style="--d:${i}"/>`;
  })
  .join('');

// eye/brow are line-only details
export const TONE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}" width="${VIEW}" height="${VIEW}">
<rect width="${VIEW}" height="${VIEW}" fill="#fff"/>
${S.filter((s) => s.fill !== 'none' && s.fill !== 'ink')
  .map((s) => `<${s.t} ${attrs(s.a)} fill="${s.tone || '#fff'}"/>`)
  .join('')}
</svg>`;
