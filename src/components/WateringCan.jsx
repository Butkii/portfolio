import { useEffect, useRef, useState } from 'react';
import { MINX, W, H, PLANT_ZONE } from './girl.svg.js';

// A line-art watering can on the floor beside the plant. Drag it over the
// plant to pour; click / tap / Enter waters automatically. Positions are in
// drawing coordinates (the scene's viewBox), so it scales with the scene.

const CAN_W = 62;
const CAN_H = 40;
const REST = { x: -24, y: 337 };          // top-left of the can when parked on the floor
const AUTO = { x: 40, y: 200 };            // where the can goes to water by itself
const TILT = 38;                           // degrees, while pouring
const SPOUT = { x: 57, y: 11 };            // spout tip in the can's own coordinates
const POUR_TO_REVIVE = 1000;               // ms of pouring needed

// Spout tip in drawing coords for a can at (x, y), tilted or not.
function spoutAt(x, y, tilted) {
  const cx = CAN_W / 2, cy = CAN_H / 2;
  const a = ((tilted ? TILT : 0) * Math.PI) / 180;
  const dx = SPOUT.x - cx, dy = SPOUT.y - cy;
  return { x: x + cx + dx * Math.cos(a) - dy * Math.sin(a), y: y + cy + dx * Math.sin(a) + dy * Math.cos(a) };
}
const overPlant = (p) => p.x > PLANT_ZONE.x1 && p.x < PLANT_ZONE.x2 && p.y > PLANT_ZONE.y1 && p.y < PLANT_ZONE.y2;

export default function WateringCan({ sceneRef, thirsty, onWatered }) {
  const [pos, setPos] = useState(REST);
  const [dragging, setDragging] = useState(false);
  const [pouring, setPouring] = useState(false);
  const drag = useRef(null);
  const poured = useRef(0);
  const auto = useRef(false);

  // Accumulate pouring time while the spout is over the plant.
  useEffect(() => {
    if (!pouring) return;
    let last = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      poured.current += now - last;
      last = now;
      if (poured.current >= POUR_TO_REVIVE) {
        poured.current = 0;
        onWatered();
      }
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [pouring, onWatered]);

  const toDrawing = (e) => {
    const r = sceneRef.current.getBoundingClientRect();
    return { x: MINX + ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  const onPointerDown = (e) => {
    if (auto.current) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = toDrawing(e);
    drag.current = { dx: p.x - pos.x, dy: p.y - pos.y, moved: false, sx: e.clientX, sy: e.clientY };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 4) d.moved = true;
    const p = toDrawing(e);
    const next = {
      x: Math.min(MINX + W - CAN_W, Math.max(MINX, p.x - d.dx)),
      y: Math.min(H - CAN_H, Math.max(0, p.y - d.dy)),
    };
    setPos(next);
    setPouring(overPlant(spoutAt(next.x, next.y, true)));
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    setPouring(false);
    if (d && !d.moved) water();
    else setPos(REST);
  };

  // Click, tap or keyboard: fly over, pour, come back.
  const water = () => {
    if (auto.current) return;
    auto.current = true;
    setPos(AUTO);
    setTimeout(() => setPouring(true), 650);
    setTimeout(() => { setPouring(false); setPos(REST); }, 650 + POUR_TO_REVIVE + 500);
    setTimeout(() => { auto.current = false; }, 650 + POUR_TO_REVIVE + 1200);
  };

  const spout = spoutAt(0, 0, true);
  const pct = (v, total) => `${(v / total) * 100}%`;

  return (
    <button
      type="button"
      className={`can ${dragging ? 'is-dragging' : ''} ${pouring ? 'is-pouring' : ''} ${thirsty && !dragging && !pouring ? 'is-nudging' : ''}`}
      style={{ left: pct(pos.x - MINX, W), top: pct(pos.y, H), width: pct(CAN_W, W), height: pct(CAN_H, H) }}
      aria-label={thirsty ? 'Watering can: the plant is thirsty. Press to water it.' : 'Watering can: press to water the plant.'}
      title="Drag me to the plant"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); water(); } }}
    >
      <svg className="can-art" viewBox={`0 0 ${CAN_W} ${CAN_H}`} aria-hidden="true">
        <path d="M14 14 Q22 1 30 14" fill="none" />
        <path d="M10 18 Q2 24 11 32" fill="none" />
        <path d="M33 31 L54 12 L57 15 L34 35" />
        <path d="M51 8 L60 17" strokeWidth="2.6" />
        <path d="M10 14 L34 14 L32 38 L12 38 Z" />
        <path d="M10 14 L34 14" />
      </svg>
      <span className="drops" aria-hidden="true" style={{ left: pct(spout.x, CAN_W), top: pct(spout.y, CAN_H) }}>
        {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }} />)}
      </span>
    </button>
  );
}
