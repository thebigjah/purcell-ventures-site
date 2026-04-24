"use client";
import React, { useRef } from "react";
import { downloadSvgElement } from "@/lib/printDownload";

const GOLD  = "#d4af37";
const DARK  = "#0c0a08";
const CREAM = "#f5f0e0";
const MID   = "#141210";

// ─── Pattern Engines ──────────────────────────────────────────────────────────

// 1. BROADCAST FIELD
// Derived from the panopticon mark — ring clusters repeating across a grid.
// Each node is a small accountability center; together they form a distributed field.
function BroadcastField({
  width = 600, height = 280, color = GOLD, bg = DARK,
  spacing = 82, rings = 5, maxOpacity = 0.26,
}: {
  width?: number; height?: number; color?: string; bg?: string;
  spacing?: number; rings?: number; maxOpacity?: number;
}) {
  const elements: React.ReactNode[] = [];
  const cols = Math.ceil(width  / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;
  const maxR = spacing * 0.5;
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * spacing;
      const cy = row * spacing;
      for (let ri = 0; ri < rings; ri++) {
        const r = maxR * (ri + 1) / rings;
        const t = rings > 1 ? ri / (rings - 1) : 1;
        elements.push(
          <circle key={`${row}-${col}-${ri}`} cx={cx} cy={cy} r={r}
            stroke={color} strokeWidth="0.55" fill="none"
            opacity={maxOpacity * (0.12 + 0.88 * t)} />
        );
      }
    }
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <rect width={width} height={height} fill={bg} />
      {elements}
    </svg>
  );
}

// 2. PHI ARRAY
// Fibonacci/golden angle phyllotaxis — the arrangement of seeds in a sunflower,
// scales on a pinecone, petals on a flower. Nature's most efficient packing.
// Golden angle ≈ 137.508° = 2π/φ² — the angle at which successive elements
// are placed so they never perfectly repeat and never leave gaps.
function PhiArray({
  width = 600, height = 280, color = GOLD, bg = DARK,
  n = 700, dotSize = 1.4, spread = 0.44,
}: {
  width?: number; height?: number; color?: string; bg?: string;
  n?: number; dotSize?: number; spread?: number;
}) {
  const cx = width / 2, cy = height / 2;
  const goldenAngle = 2.399963229728653; // 2π/φ² radians
  const maxR = Math.min(width, height) * spread;
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const r = maxR * Math.sqrt((i + 0.5) / n);
    const angle = i * goldenAngle;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (x < -dotSize || x > width + dotSize || y < -dotSize || y > height + dotSize) continue;
    const t = i / n;
    dots.push(
      <circle key={i} cx={+x.toFixed(2)} cy={+y.toFixed(2)} r={dotSize}
        fill={color} opacity={+(0.10 + 0.58 * t).toFixed(3)} />
    );
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <rect width={width} height={height} fill={bg} />
      {dots}
    </svg>
  );
}

// 3. BLUEPRINT GRID
// 45°-rotated square lattice — the foundation grid underneath everything.
// Used in architecture, engineering, drafting. Suggests structural rigor and
// that the surface you're seeing is built on something precise beneath it.
function Blueprint({
  width = 600, height = 280, color = GOLD, bg = DARK,
  spacing = 28, opacity = 0.18, sw = 0.5,
}: {
  width?: number; height?: number; color?: string; bg?: string;
  spacing?: number; opacity?: number; sw?: number;
}) {
  const lines: React.ReactNode[] = [];
  const diag = width + height;
  for (let d = -height; d <= diag; d += spacing) {
    lines.push(
      <line key={`p${d}`} x1={d} y1={0} x2={d + height} y2={height}
        stroke={color} strokeWidth={sw} opacity={opacity} />,
      <line key={`n${d}`} x1={d} y1={0} x2={d - height} y2={height}
        stroke={color} strokeWidth={sw} opacity={opacity} />
    );
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <rect width={width} height={height} fill={bg} />
      {lines}
    </svg>
  );
}

// 4. INTERFERENCE
// Wave interference from two or three point sources — constructive and
// destructive overlap. Each source radiates outward; where waves meet,
// they either reinforce or cancel. A visual model for how forces interact:
// technology and humanity, power and accountability, faith and reason.
function Interference({
  width = 600, height = 280, color = GOLD, bg = DARK,
  wavelength = 42, rings = 20, sources = 2, opacity = 0.22,
}: {
  width?: number; height?: number; color?: string; bg?: string;
  wavelength?: number; rings?: number; sources?: number; opacity?: number;
}) {
  const srcPoints =
    sources === 3
      ? [{ cx: width * 0.25, cy: height * 0.52 }, { cx: width * 0.75, cy: height * 0.52 }, { cx: width * 0.5, cy: height * 0.14 }]
      : [{ cx: width * 0.33, cy: height * 0.5 }, { cx: width * 0.67, cy: height * 0.5 }];
  const elements: React.ReactNode[] = [];
  srcPoints.forEach((src, si) => {
    for (let i = 1; i <= rings; i++) {
      const fade = 1 - (i / rings) * 0.58;
      elements.push(
        <circle key={`${si}-${i}`} cx={src.cx} cy={src.cy} r={i * wavelength}
          stroke={color} strokeWidth="0.55" fill="none" opacity={+(opacity * fade).toFixed(3)} />
      );
    }
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <rect width={width} height={height} fill={bg} />
      {elements}
    </svg>
  );
}

// 5. HONEYCOMB
// Regular hexagonal tessellation — the most efficient partition of the plane
// (honeycomb conjecture, proved by Thomas Hales 1999). Bees solved this with
// no math degree. Each cell independent, bounded, sovereign; the whole stronger
// than the sum of its parts. Connects to the privacy/freedom concept: each
// person in their own cell, whole field held together by shared structure.
function Honeycomb({
  width = 600, height = 280, color = GOLD, bg = DARK,
  size = 22, opacity = 0.20, sw = 0.55,
}: {
  width?: number; height?: number; color?: string; bg?: string;
  size?: number; opacity?: number; sw?: number;
}) {
  const colSpacing = size * 1.5;
  const rowSpacing = size * Math.sqrt(3);
  const cols = Math.ceil(width  / colSpacing) + 3;
  const rows = Math.ceil(height / rowSpacing) + 3;
  const hexes: React.ReactNode[] = [];
  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const cx = col * colSpacing;
      const cy = row * rowSpacing + (col % 2 !== 0 ? rowSpacing / 2 : 0);
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60) * Math.PI / 180; // flat-top: 0° = right vertex
        return `${(cx + size * Math.cos(a)).toFixed(1)},${(cy + size * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
      hexes.push(
        <polygon key={`${col}-${row}`} points={pts}
          stroke={color} strokeWidth={sw} fill="none" opacity={opacity} />
      );
    }
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <rect width={width} height={height} fill={bg} />
      {hexes}
    </svg>
  );
}

// ─── Card Preview ─────────────────────────────────────────────────────────────
// Shows the pattern as a business card back — the primary application context.
function CardBack({
  pattern, color = GOLD, bg = DARK, patternOpacity = 0.18,
}: {
  pattern: "broadcast" | "phi" | "blueprint" | "interference" | "honeycomb";
  color?: string; bg?: string; patternOpacity?: number;
}) {
  const W = 350, H = 200;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", borderRadius: 6 }}>
      <rect width={W} height={H} fill={bg} rx="4" />
      {pattern === "broadcast"    && <BroadcastField  width={W} height={H} color={color} bg="transparent" spacing={48} rings={4} maxOpacity={patternOpacity} />}
      {pattern === "phi"          && <PhiArray         width={W} height={H} color={color} bg="transparent" n={400} dotSize={1.1} spread={0.42} />}
      {pattern === "blueprint"    && <Blueprint        width={W} height={H} color={color} bg="transparent" spacing={18} opacity={patternOpacity} />}
      {pattern === "interference" && <Interference     width={W} height={H} color={color} bg="transparent" wavelength={28} rings={14} opacity={patternOpacity} />}
      {pattern === "honeycomb"    && <Honeycomb        width={W} height={H} color={color} bg="transparent" size={16} opacity={patternOpacity} />}
      {/* PV centered */}
      <text x={W / 2} y={H / 2} textAnchor="middle" dominantBaseline="central"
        fontFamily="'Cinzel', Georgia, serif" fontSize="28" fontWeight="700"
        fill={color} opacity="0.18" style={{ letterSpacing: "3px" }}>PV</text>
    </svg>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
const btnBase: React.CSSProperties = {
  display: "inline-block", padding: "8px 16px", background: "none",
  border: "1px solid #2e2820", color: "#6a6458", fontSize: "11px",
  fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer",
  borderRadius: "4px", fontFamily: "Inter, sans-serif",
};
const btnGold: React.CSSProperties = { ...btnBase, borderColor: GOLD, color: GOLD };
const btnSmall: React.CSSProperties = {
  ...btnBase, display: "block", width: "100%", marginTop: "6px",
  padding: "5px 0", fontSize: "10px", letterSpacing: "0.06em", textAlign: "center",
};

type PatternEntry = {
  name: string;
  subtitle: string;
  concept: string;
  application: string;
  primary: React.ReactNode;
  variants: { label: string; node: React.ReactNode }[];
};

function PatternSection({ p, idx }: { p: PatternEntry; idx: number }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const varRefs = useRef<(HTMLDivElement | null)[]>([]);
  const num = String(idx + 1).padStart(2, "0");

  function dlSvg(ref: React.RefObject<HTMLDivElement | null>, filename: string) {
    const svg = ref.current?.querySelector("svg");
    if (svg) downloadSvgElement(svg as SVGSVGElement, filename);
  }

  async function dlPng(ref: React.RefObject<HTMLDivElement | null>, filename: string) {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; img.src = url; });
    URL.revokeObjectURL(url);
    const vb = svg.getAttribute("viewBox")?.split(" ").map(Number) ?? [0, 0, 600, 280];
    const scale = 4;
    const canvas = document.createElement("canvas");
    canvas.width = vb[2] * scale; canvas.height = vb[3] * scale;
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    const a = document.createElement("a");
    a.download = `${filename}.png`;
    canvas.toBlob(b => { a.href = URL.createObjectURL(b!); a.click(); }, "image/png");
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "10px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.1em" }}>{num}</span>
        <span style={{ fontSize: "20px", fontWeight: 700, color: CREAM }}>{p.name}</span>
        <span style={{ fontSize: "13px", color: "#524d45" }}>{p.subtitle}</span>
      </div>

      <p style={{ fontSize: "13px", color: "#524d45", lineHeight: 1.65, marginBottom: "4px", maxWidth: "600px" }}>
        {p.concept}
      </p>
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#3a3530", textTransform: "uppercase", marginBottom: "20px" }}>
        Use on: {p.application}
      </p>

      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "10px" }}>Primary</div>
        <div ref={mainRef} style={{ display: "inline-block", borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 32px rgba(0,0,0,0.5)" }}>
          {p.primary}
        </div>
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button style={btnBase} onClick={() => dlPng(mainRef, p.name)}>↓ PNG</button>
          <button style={btnGold} onClick={() => dlSvg(mainRef, p.name)}>↓ SVG</button>
        </div>
      </div>

      <div style={{ marginBottom: "0" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "10px" }}>Variants</div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {p.variants.map((v, vi) => (
            <div key={v.label}>
              <div ref={el => { varRefs.current[vi] = el; }}
                style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.4)", display: "inline-block" }}>
                {v.node}
              </div>
              <button style={btnSmall} onClick={() => dlPng({ current: varRefs.current[vi] }, `${p.name} ${v.label}`)}>↓ PNG</button>
              <div style={{ fontSize: "10px", color: "#3a3530", marginTop: "4px", letterSpacing: "0.04em", maxWidth: "180px" }}>{v.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Pattern Library ──────────────────────────────────────────────────────────
const PATTERNS: PatternEntry[] = [
  {
    name: "Broadcast Field",
    subtitle: "Radial ring clusters · derived from the panopticon mark",
    concept: "The mark tiled across a surface. Each node is a small center of accountability radiating outward. Together they form a distributed field — not a single surveillance point but a network of declared, visible actors.",
    application: "Business card back · website section backgrounds · document headers · envelope interior",
    primary: <BroadcastField />,
    variants: [
      { label: "Dense",                node: <BroadcastField width={220} height={140} spacing={54} rings={4} maxOpacity={0.28} /> },
      { label: "Sparse",               node: <BroadcastField width={220} height={140} spacing={112} rings={6} maxOpacity={0.22} /> },
      { label: "Cream on dark",        node: <BroadcastField width={220} height={140} color={CREAM} /> },
      { label: "Dark on cream",        node: <BroadcastField width={220} height={140} color={DARK} bg={CREAM} /> },
      { label: "Card back preview",    node: <CardBack pattern="broadcast" /> },
      { label: "Card — cream variant", node: <CardBack pattern="broadcast" color={CREAM} /> },
    ],
  },
  {
    name: "Phi Array",
    subtitle: "Golden angle phyllotaxis · 137.508° · Fibonacci sequence",
    concept: "The arrangement of seeds in a sunflower. Each element placed at 2π/φ² from the last — the golden angle — so nothing ever perfectly repeats and no space is wasted. Nature found this solution without mathematics. It's the geometry of growth, of things built to endure, of divine proportion encoded in biology. Kepler called it one of the two great treasures of geometry.",
    application: "Featured section backgrounds · large-format print · stationery · brand book cover",
    primary: <PhiArray />,
    variants: [
      { label: "Tight — high density",  node: <PhiArray width={220} height={140} n={500} dotSize={1.0} spread={0.42} /> },
      { label: "Open — larger dots",    node: <PhiArray width={220} height={140} n={300} dotSize={2.0} spread={0.44} /> },
      { label: "Cream on dark",         node: <PhiArray width={220} height={140} color={CREAM} /> },
      { label: "Dark on cream",         node: <PhiArray width={220} height={140} color={DARK} bg={CREAM} /> },
      { label: "Card back preview",     node: <CardBack pattern="phi" /> },
      { label: "Card — cream variant",  node: <CardBack pattern="phi" color={CREAM} /> },
    ],
  },
  {
    name: "Blueprint Grid",
    subtitle: "45°-rotated square lattice · engineering drafting grid",
    concept: "The structural substrate underneath everything. Architects and engineers use this grid before any design decisions are made — it's the foundation, not the surface. At low opacity it communicates precision, intentionality, and the existence of a rigorous system beneath the visible layer.",
    application: "Slide deck backgrounds · document templates · envelope interior · dense cover texture",
    primary: <Blueprint />,
    variants: [
      { label: "Fine — tight grid",    node: <Blueprint width={220} height={140} spacing={18} opacity={0.16} /> },
      { label: "Coarse — open grid",   node: <Blueprint width={220} height={140} spacing={44} opacity={0.20} /> },
      { label: "Cream on dark",        node: <Blueprint width={220} height={140} color={CREAM} /> },
      { label: "Dark on cream",        node: <Blueprint width={220} height={140} color={DARK} bg={CREAM} /> },
      { label: "Card back preview",    node: <CardBack pattern="blueprint" /> },
      { label: "Card — dark on gold",  node: <CardBack pattern="blueprint" color={DARK} bg={GOLD} patternOpacity={0.12} /> },
    ],
  },
  {
    name: "Interference",
    subtitle: "Wave superposition · constructive and destructive overlap",
    concept: "Two or more point sources radiating outward. Where their waves meet, they either reinforce (constructive) or cancel (destructive). It's a physical model for how distinct forces interact: technology and humanity, power and accountability, faith and reason. The pattern is most beautiful at the collision points. This one has the most direct connection to the sousveillance concept — multiple independent centers, each visible, each radiating.",
    application: "Hero section backgrounds · presentation title slides · large-format prints",
    primary: <Interference />,
    variants: [
      { label: "Tight wavelength",       node: <Interference width={220} height={140} wavelength={26} rings={18} opacity={0.20} /> },
      { label: "Wide wavelength",        node: <Interference width={220} height={140} wavelength={60} rings={10} opacity={0.24} /> },
      { label: "Three sources",          node: <Interference width={220} height={140} sources={3} wavelength={38} rings={16} opacity={0.20} /> },
      { label: "Cream on dark",          node: <Interference width={220} height={140} color={CREAM} /> },
      { label: "Card back preview",      node: <CardBack pattern="interference" /> },
      { label: "Card — three sources",   node: <CardBack pattern="interference" /> },
    ],
  },
  {
    name: "Honeycomb",
    subtitle: "Regular hexagonal tessellation · honeycomb conjecture · Hales 1999",
    concept: "The most efficient partition of the plane — mathematically proved by Thomas Hales in 1999. Bees discovered it without calculus. Each cell is independent, bounded, sovereign; the structure emerges from adjacency alone. This maps directly to the privacy/freedom principle: each person or business in their own domain, the whole held together by shared structure rather than surveillance.",
    application: "Business card back · dense surface texture · physical materials (embossing, debossing) · merchandise",
    primary: <Honeycomb />,
    variants: [
      { label: "Small cells",           node: <Honeycomb width={220} height={140} size={14} opacity={0.22} /> },
      { label: "Large cells",           node: <Honeycomb width={220} height={140} size={34} opacity={0.18} /> },
      { label: "Cream on dark",         node: <Honeycomb width={220} height={140} color={CREAM} /> },
      { label: "Dark on cream",         node: <Honeycomb width={220} height={140} color={DARK} bg={CREAM} /> },
      { label: "Card back preview",     node: <CardBack pattern="honeycomb" /> },
      { label: "Card — dark on gold",   node: <CardBack pattern="honeycomb" color={DARK} bg={GOLD} patternOpacity={0.14} /> },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PatternsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: CREAM, fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>

      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto 56px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "10px" }}>
          Purcell Ventures — Brand Identity
        </div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: CREAM, marginBottom: "12px" }}>
          Pattern Library
        </h1>
        <p style={{ fontSize: "14px", color: "#524d45", maxWidth: "560px", lineHeight: 1.75, marginBottom: "8px" }}>
          Five patterns derived from mathematical and philosophical principles aligned with the brand. Each is fully vectorized and downloadable. All are designed to work at low opacity as surface texture — never as primary visual elements.
        </p>
        <p style={{ fontSize: "12px", color: "#3a3530", maxWidth: "560px", lineHeight: 1.7 }}>
          Source mathematics: polar coordinates · Fibonacci sequence · golden ratio · wave superposition · hexagonal close-packing. Each chosen because it has an intellectual basis that maps to something the brand actually means.
        </p>
      </div>

      {/* Patterns */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "80px" }}>
        {PATTERNS.map((p, i) => (
          <PatternSection key={p.name} p={p} idx={i} />
        ))}
      </div>

      {/* Usage Notes */}
      <div style={{ maxWidth: "1200px", margin: "72px auto 0", padding: "28px 32px", background: MID, border: "1px solid #2e2820", borderRadius: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: GOLD, marginBottom: "14px" }}>Usage Rules</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", fontSize: "12px", color: "#6a6458", lineHeight: 1.7 }}>
          <div><strong style={{ color: "#8a8070" }}>Opacity:</strong> Patterns are always secondary. 10–20% on dark backgrounds. 6–12% on light backgrounds. Never compete with text.</div>
          <div><strong style={{ color: "#8a8070" }}>Single pattern per surface:</strong> Don't layer two patterns on the same material. Pick one and let it breathe.</div>
          <div><strong style={{ color: "#8a8070" }}>Card back:</strong> Broadcast Field and Honeycomb are most legible at card scale. Phi Array and Interference read better large-format.</div>
          <div><strong style={{ color: "#8a8070" }}>Color:</strong> Gold on dark for print and premium materials. Cream on dark for digital. Dark on cream/gold only when inverting for specific applications.</div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "24px auto 0", padding: "0 0 64px" }}>
        <a href="/logos" style={{ fontSize: "13px", color: "#3a3530", textDecoration: "none" }}>← Logo Options</a>
      </div>
    </div>
  );
}
