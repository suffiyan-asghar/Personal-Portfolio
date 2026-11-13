import { motion } from 'motion/react';

// A night city drawn in three layers (far towers, mid-rise, street level),
// generated once from a fixed seed so it looks the same on every visit.
// Each building gets a real window grid; only some windows are lit.

const W = 1440;
const H = 600; // the ground line
// Every building continues this far below the ground line, so layers that
// drift during scroll never open a gap. The hero's bottom fade covers it.
const EXT = 120;
const VH = H + EXT; // full viewBox height
const BATCHES = 14; // lit windows switch on in this many steps on load

function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const rect = (x, y, w, h) => `M${x.toFixed(1)} ${y.toFixed(1)}h${w.toFixed(1)}v${h.toFixed(1)}h${(-w).toFixed(1)}z`;
const tri = (x1, y1, x2, y2, x3, y3) => `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}L${x3.toFixed(1)} ${y3.toFixed(1)}z`;

function building(r, x, w, h, type) {
  const top = H - h;
  const parts = [rect(x, top, w, h + EXT)];
  let roof = top;

  if (type === 'stepped') {
    // Art-deco setbacks with a mast.
    const w2 = w * 0.72;
    const h2 = h * 0.12;
    const w3 = w * 0.44;
    const h3 = h * 0.1;
    parts.push(rect(x + (w - w2) / 2, top - h2, w2, h2));
    parts.push(rect(x + (w - w3) / 2, top - h2 - h3, w3, h3));
    roof = top - h2 - h3;
    if (r() < 0.7) parts.push(rect(x + w / 2 - 1.5, roof - 38, 3, 38));
  } else if (type === 'spire') {
    // Gothic pointed roof with corner pinnacles.
    const ph = w * 1.15;
    parts.push(tri(x, top, x + w, top, x + w / 2, top - ph));
    if (w > 50) {
      parts.push(tri(x, top, x + 9, top, x + 4.5, top - 24));
      parts.push(tri(x + w - 9, top, x + w, top, x + w - 4.5, top - 24));
    }
    roof = top - ph;
  } else if (type === 'tank') {
    // Rooftop water tank on legs.
    const tw = Math.min(26, w * 0.3);
    const tx = x + w * 0.15 + r() * w * 0.45;
    parts.push(rect(tx + 3, top - 10, 3, 10), rect(tx + tw - 6, top - 10, 3, 10));
    parts.push(rect(tx, top - 28, tw, 18));
    parts.push(tri(tx - 2, top - 28, tx + tw + 2, top - 28, tx + tw / 2, top - 38));
  } else if (type === 'antenna') {
    parts.push(rect(x + w * 0.3, top - 10, w * 0.4, 10));
    parts.push(rect(x + w / 2 - 1, top - 70, 2, 60));
    roof = top - 70;
  } else {
    // Plain block with a parapet.
    parts.push(rect(x + 3, top - 5, w - 6, 5));
  }

  return { x, w, h, top, roof, parts };
}

function windows(r, b, cfg) {
  const lit = [];
  const warm = [];
  const dark = [];
  const { winW, winH, gx, gy, pad, litRate } = cfg;
  const cols = Math.floor((b.w - pad * 2 + gx) / (winW + gx));
  if (cols < 1) return { lit, warm, dark };
  const used = cols * (winW + gx) - gx;
  const x0 = b.x + (b.w - used) / 2;
  // Some buildings are fully dark; the rest light a share of their windows.
  const rate = r() < 0.15 ? 0 : litRate * (0.5 + r());
  for (let y = b.top + pad; y + winH < H - 10; y += winH + gy) {
    for (let c = 0; c < cols; c += 1) {
      const wx = x0 + c * (winW + gx);
      const roll = r();
      if (roll < rate) (r() < 0.65 ? lit : warm).push([wx, y]);
      else dark.push([wx, y]);
    }
  }
  return { lit, warm, dark };
}

function layer(seed, cfg, landmarks = []) {
  const r = seeded(seed);
  const list = [];
  let x = -30;
  while (x < W + 30) {
    const w = cfg.minW + r() * (cfg.maxW - cfg.minW);
    const h = cfg.minH + r() * (cfg.maxH - cfg.minH);
    const type = cfg.types[Math.floor(r() * cfg.types.length)];
    list.push(building(r, x, w, h, type));
    x += w + cfg.gapMin + r() * (cfg.gapMax - cfg.gapMin);
  }
  landmarks.forEach(([lx, lw, lh, lt]) => list.push(building(r, lx, lw, lh, lt)));

  const shape = list.flatMap((b) => b.parts).join('');
  const lit = [];
  const warm = [];
  const dark = [];
  if (cfg.win) {
    list.forEach((b) => {
      const result = windows(r, b, cfg.win);
      lit.push(...result.lit);
      warm.push(...result.warm);
      dark.push(...result.dark);
    });
  }
  const { winW = 0, winH = 0 } = cfg.win || {};
  const toPath = (pts) => pts.map(([px, py]) => rect(px, py, winW, winH)).join('');
  // Spread lit windows over batches with a fixed hash, so the city's layout
  // (drawn from the seeded generator above) stays exactly the same.
  const batched = (pts) => {
    const groups = Array.from({ length: BATCHES }, () => []);
    // Window x can be negative (the first building starts off-screen), so wrap the index.
    pts.forEach((pt, i) => groups[(((i * 7 + Math.floor(pt[0] / 37)) % BATCHES) + BATCHES) % BATCHES].push(pt));
    return groups.map(toPath);
  };
  // A handful of lit windows flicker on their own.
  const flicker = lit.filter((_, i) => i % 23 === 7).slice(0, 10);
  return {
    shape,
    lit: batched(lit),
    warm: batched(warm),
    dark: toPath(dark),
    all: toPath([...lit, ...warm, ...dark]),
    flicker: flicker.map(([px, py]) => ({ x: px, y: py, w: winW, h: winH })),
    list,
  };
}

const FAR = layer(11, {
  minW: 38, maxW: 80, minH: 170, maxH: 320, gapMin: -14, gapMax: 2,
  types: ['spire', 'stepped', 'antenna', 'stepped', 'block'],
  win: { winW: 2.5, winH: 4, gx: 5, gy: 7, pad: 8, litRate: 0.06 },
});

const MID = layer(
  29,
  {
    minW: 52, maxW: 108, minH: 110, maxH: 240, gapMin: -10, gapMax: 4,
    types: ['stepped', 'block', 'spire', 'block', 'antenna'],
    win: { winW: 3, winH: 5, gx: 6, gy: 8, pad: 9, litRate: 0.1 },
  },
  // A tall gothic tower right of centre gives the skyline a focal point.
  [[1010, 78, 330, 'spire'], [318, 70, 280, 'stepped']],
);

const NEAR = layer(
  47,
  {
    minW: 70, maxW: 150, minH: 60, maxH: 150, gapMin: 0, gapMax: 6,
    types: ['block', 'tank', 'block', 'stepped', 'tank'],
    win: { winW: 4, winH: 6, gx: 7, gy: 9, pad: 11, litRate: 0.16 },
  },
  [[150, 120, 175, 'block'], [1210, 110, 165, 'block']],
);

// Searchlights sit on the two street-level landmarks.
const BEAMS = [
  { x: 210, y: H - 175, delay: '0s', dir: 'normal' },
  { x: 1265, y: H - 165, delay: '-7s', dir: 'reverse' },
];

const COLORS = {
  dark: { far: '#12141B', mid: '#0A0B10', near: '#040405', farWin: '#181A22', midWin: '#13141A', nearWin: '#0E0F13' },
  lit: { far: '#2A2D38', mid: '#22242D', near: '#1B1C23', farWin: '#3A3D4A', midWin: '#363844', nearWin: '#33353F' },
};

const winDelay = (i) => 0.5 + i * 0.11;

// One path per batch; each batch fades on a beat after the one before.
function Windows({ paths, fill, fillOpacity }) {
  return paths.map((d, i) =>
    d ? <path key={i} className="win-on" d={d} fill={fill} fillOpacity={fillOpacity} style={{ animationDelay: `${winDelay(i)}s` }} /> : null,
  );
}

export default function Skyline({ lit = false, farY, midY, innerRef }) {
  const c = lit ? COLORS.lit : COLORS.dark;
  return (
    <svg
      ref={innerRef}
      className={`skyline ${lit ? 'skyline-lit' : ''}`}
      aria-hidden="true"
      viewBox={`0 0 ${W} ${VH}`}
      preserveAspectRatio="xMidYMax slice"
    >
      {!lit && (
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.26" />
            <stop offset="0.55" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#1A1C24" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="moon" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F6F0DE" />
            <stop offset="0.8" stopColor="#E6DEC6" />
            <stop offset="1" stopColor="#D9D0B4" />
          </radialGradient>
          <radialGradient id="moon-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F6F0DE" stopOpacity="0.18" />
            <stop offset="1" stopColor="#F6F0DE" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ground-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            {/* Fully dark at the ground line, as before; the part below it stays dark. */}
            <stop offset={70 / (70 + EXT)} stopColor="#000" stopOpacity="1" />
          </linearGradient>
        </defs>
      )}

      {!lit && (
        <g opacity="0.6">
          <circle cx="232" cy="200" r="120" fill="url(#moon-glow)" />
          <circle cx="232" cy="200" r="38" fill="url(#moon)" />
        </g>
      )}

      <motion.g style={{ y: farY }}>
        <path d={FAR.shape} fill={c.far} />
        <path d={lit ? FAR.all : FAR.dark} fill={c.farWin} />
        {!lit && <Windows paths={FAR.lit} fill="var(--accent)" fillOpacity={0.55} />}
        {!lit && <Windows paths={FAR.warm} fill="#FFE9A8" fillOpacity={0.45} />}
      </motion.g>

      {!lit && <rect x="0" y={H - 330} width={W} height={330 + EXT} fill="url(#haze)" />}

      <motion.g style={{ y: midY }}>
        <path d={MID.shape} fill={c.mid} />
        <path d={MID.dark} fill={c.midWin} />
        <Windows paths={MID.lit} fill="var(--accent)" fillOpacity={lit ? 1 : 0.8} />
        <Windows paths={MID.warm} fill="#FFE9A8" fillOpacity={lit ? 1 : 0.7} />
      </motion.g>

      {!lit &&
        BEAMS.map((b) => (
          <g
            key={b.x}
            className="beam"
            style={{ transformOrigin: `${b.x}px ${b.y}px`, animationDelay: b.delay, animationDirection: b.dir }}
          >
            <polygon points={`${b.x - 3},${b.y} ${b.x + 3},${b.y} ${b.x + 80},${b.y - 400} ${b.x - 80},${b.y - 400}`} fill="url(#beam-grad)" />
          </g>
        ))}

      <path d={NEAR.shape} fill={c.near} />
      <path d={NEAR.dark} fill={c.nearWin} />
      <Windows paths={NEAR.lit} fill="var(--accent)" fillOpacity={1} />
      <Windows paths={NEAR.warm} fill="#FFE9A8" fillOpacity={0.9} />
      {!lit && (
        // Flickering starts once the city has finished switching on.
        <g className="win-on" style={{ animationDelay: `${winDelay(BATCHES)}s` }}>
          {NEAR.flicker.map((f, i) => (
            <rect key={i} className="flicker" x={f.x} y={f.y} width={f.w} height={f.h} fill="var(--accent)" style={{ animationDelay: `${-i * 1.7}s`, animationDuration: `${5 + (i % 4) * 1.5}s` }} />
          ))}
        </g>
      )}
      {!lit && <rect x="0" y={H - 70} width={W} height={70 + EXT} fill="url(#ground-fade)" />}
      {!lit && BEAMS.map((b) => <rect key={`lamp-${b.x}`} x={b.x - 7} y={b.y - 7} width="14" height="7" rx="2" fill="#2A2B31" />)}
    </svg>
  );
}
