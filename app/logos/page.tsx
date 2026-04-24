"use client";
// Brand identity options — purcellventures.co/logos
// SVG-backed, resolution-independent previews

import React, { useRef } from "react";
import { PanopConfig, PanopticonMark, PanopticonSplit } from "@/app/components/PanopticonMark";
import { downloadPrintAsset, downloadSvgElement, downloadSvgAsPng } from "@/lib/printDownload";

const GOLD  = "#d4af37";
const DARK  = "#0c0a08";
const CREAM = "#f5f0e0";
const MID   = "#141210";

function Box({
  w, h, bg = DARK, children, style,
}: { w: number; h: number; bg?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: w, height: h, position: "relative", background: bg,
      borderRadius: 8, overflow: "hidden",
      boxShadow: "0 6px 32px rgba(0,0,0,0.5)", flexShrink: 0,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

// ─── 1. The Wordmark ──────────────────────────────────────────────────────────

function Wordmark({ color = GOLD, size = 30 }: { color?: string; size?: number }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: `${size}px`, fontWeight: 700,
        color, letterSpacing: "0.42em", lineHeight: 1,
      }}>PURCELL</div>
      <div style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: `${Math.round(size * 0.44)}px`, fontWeight: 400,
        color, letterSpacing: "0.58em", lineHeight: 1,
        marginTop: `${Math.round(size * 0.2)}px`, opacity: 0.8,
      }}>VENTURES</div>
    </div>
  );
}

// ─── 2. The Stacked ───────────────────────────────────────────────────────────

function Stacked({
  top = GOLD, btm = GOLD, rule = GOLD, fs1 = 44, fs2 = 13,
}: { top?: string; btm?: string; rule?: string; fs1?: number; fs2?: number }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: `${fs1}px`, fontWeight: 700,
        color: top, letterSpacing: "0.18em", lineHeight: 1,
      }}>PURCELL</div>
      <div style={{ height: "1px", background: rule, opacity: 0.45, margin: `${Math.round(fs1 * 0.3)}px auto`, width: `${Math.round(fs1 * 1.4)}px` }} />
      <div style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: `${fs2}px`, fontWeight: 400,
        color: btm, letterSpacing: "0.58em", lineHeight: 1, opacity: 0.85,
      }}>VENTURES</div>
    </div>
  );
}

// ─── 3. The Monogram ──────────────────────────────────────────────────────────

function Mono({ color = GOLD, size = 100 }: { color?: string; size?: number }) {
  return (
    <div style={{
      fontFamily: "'Cinzel', Georgia, serif",
      fontSize: `${size}px`, fontWeight: 700,
      color, lineHeight: 1, letterSpacing: "0.06em",
      whiteSpace: "nowrap",
    }}>PV</div>
  );
}

// ─── 4. The Slash Mark ────────────────────────────────────────────────────────

function SlashMark({
  color = GOLD, bg = DARK, size = 220,
  direction = "right",
}: { color?: string; bg?: string; size?: number; direction?: "right" | "left" | "both" }) {
  const scale = size / 220;
  const pv    = Math.round(88 * scale);
  const sw    = Math.max(1, 1.5 * scale);
  const mt    = Math.round(-8 * scale);
  const [rx1, rx2] = [Math.round(192 * scale), Math.round(96  * scale)];
  const [lx1, lx2] = [Math.round(28  * scale), Math.round(124 * scale)];
  return (
    <Box w={size} h={size} bg={bg}>
      <Center>
        <div style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: `${pv}px`, fontWeight: 700,
          color, lineHeight: 1, letterSpacing: "0.06em",
          whiteSpace: "nowrap", marginTop: `${mt}px`,
        }}>PV</div>
      </Center>
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {(direction === "right" || direction === "both") && (
          <line x1={rx1} y1={0} x2={rx2} y2={size} stroke={color} strokeWidth={sw} opacity={direction === "both" ? "0.55" : "0.65"} />
        )}
        {(direction === "left" || direction === "both") && (
          <line x1={lx1} y1={0} x2={lx2} y2={size} stroke={color} strokeWidth={sw} opacity={direction === "both" ? "0.55" : "0.65"} />
        )}
      </svg>
    </Box>
  );
}

// ─── 5. The Full Lockup ───────────────────────────────────────────────────────

function Lockup({ color = GOLD, bg = DARK }: { color?: string; bg?: string }) {
  return (
    <Box w={500} h={140} bg={bg}>
      <div style={{
        position: "absolute", top: "50%", left: 65,
        transform: "translate(-50%, -50%)",
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "58px", fontWeight: 700,
        color, lineHeight: 1, letterSpacing: "0.06em",
        whiteSpace: "nowrap", marginTop: "-4px",
      }}>PV</div>
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={500} height={140} viewBox="0 0 500 140">
        <line x1={118} y1={0} x2={57} y2={140} stroke={color} strokeWidth="1.5" opacity="0.6" />
      </svg>
      <div style={{
        position: "absolute", left: 148, top: 24, bottom: 24,
        width: "1px", background: color, opacity: 0.22,
      }} />
      <div style={{ position: "absolute", left: 168, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "26px", fontWeight: 700,
          color, letterSpacing: "0.38em", lineHeight: 1,
        }}>PURCELL</div>
        <div style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "10px", fontWeight: 400,
          color, letterSpacing: "0.55em", lineHeight: 1, opacity: 0.8,
          marginTop: "9px", width: "100%", textAlign: "center",
        }}>VENTURES</div>
      </div>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type LogoEntry = {
  name: string;
  subtitle: string;
  main: React.ReactNode;
  variants: { label: string; node: React.ReactNode }[];
  isSvg?: boolean;
};

function PanopticonVariant({ size, color = GOLD, bg = DARK, cfg }: {
  size: number; color?: string; bg?: string; cfg?: PanopConfig;
}) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.45)", display: "inline-block" }}>
      <PanopticonMark size={size} color={color} bg={bg} cfg={cfg} />
    </div>
  );
}

const btnBase: React.CSSProperties = {
  display: "inline-block", padding: "8px 16px", background: "none",
  border: "1px solid #2e2820", color: "#6a6458", fontSize: "11px",
  fontWeight: 600, letterSpacing: "0.08em", cursor: "pointer",
  borderRadius: "4px", fontFamily: "Inter, sans-serif",
};
const btnGoldStyle: React.CSSProperties = { ...btnBase, borderColor: GOLD, color: GOLD };
const btnSmallStyle: React.CSSProperties = {
  ...btnBase, display: "block", width: "100%", marginTop: "6px",
  padding: "5px 0", fontSize: "10px", letterSpacing: "0.06em", textAlign: "center",
};

function LogoSection({ logo, idx }: { logo: LogoEntry; idx: number }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const varRefs = useRef<(HTMLDivElement | null)[]>([]);

  async function dlMain() {
    if (logo.isSvg) {
      const svg = mainRef.current?.querySelector("svg");
      if (svg) { await downloadSvgAsPng(svg as SVGSVGElement, logo.name, 1200); return; }
    }
    await downloadPrintAsset(mainRef, logo.name);
  }

  function dlMainSvg() {
    const svg = mainRef.current?.querySelector("svg");
    if (svg) downloadSvgElement(svg as SVGSVGElement, logo.name);
  }

  async function dlVariant(vi: number, label: string) {
    const el = varRefs.current[vi];
    if (!el) return;
    if (logo.isSvg) {
      const svg = el.querySelector("svg");
      if (svg) { await downloadSvgAsPng(svg as SVGSVGElement, label, 600); return; }
    }
    await downloadPrintAsset({ current: el }, label);
  }

  const num = String(idx + 1).padStart(2, "0");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "24px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.1em" }}>{num}</span>
        <span style={{ fontSize: "20px", fontWeight: 700, color: CREAM }}>{logo.name}</span>
        <span style={{ fontSize: "13px", color: "#524d45" }}>{logo.subtitle}</span>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "10px" }}>Primary</div>
        <div ref={mainRef} style={{ display: "inline-block" }}>{logo.main}</div>
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button style={btnBase} onClick={dlMain}>↓ Download PNG</button>
          {logo.isSvg && <button style={btnGoldStyle} onClick={dlMainSvg}>↓ Download SVG</button>}
        </div>
      </div>

      <div>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "10px" }}>Variants</div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {logo.variants.map((v, vi) => (
            <div key={v.label}>
              <div ref={el => { varRefs.current[vi] = el; }}>{v.node}</div>
              <button style={btnSmallStyle} onClick={() => dlVariant(vi, `${logo.name} ${v.label}`)}>↓ PNG</button>
              <div style={{ fontSize: "10px", color: "#3a3530", marginTop: "4px", letterSpacing: "0.04em", maxWidth: "140px" }}>{v.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const LOGOS: LogoEntry[] = [
  {
    name: "The Panopticon Mark",
    subtitle: "Reverse panopticon ring · inward cell groups · concentric field · PV center",
    isSvg: true,
    main: (
      <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 32px rgba(0,0,0,0.55)", display: "inline-block" }}>
        <PanopticonMark size={280} cfg={{
          cellStyle: "outlined",
          pvSize: 70, pvClearR: 58,
          ringStart: 70, ringEnd: 116,
          numRings: 7,
          ringFadeToCenter: true,
        }} />
      </div>
    ),
    variants: [
      {
        label: "Standard — gold on dark",
        node: <PanopticonVariant size={140} />,
      },
      {
        label: "Minimal — 4 groups, no rings",
        node: <PanopticonVariant size={140} cfg={{ numGroups: 4, includeFlankers: false, numRings: 0, tallH: 44 }} />,
      },
      {
        label: "Dense — 12 groups, 14 rings",
        node: <PanopticonVariant size={140} cfg={{ numGroups: 12, numRings: 14, tallH: 26, shortH: 12 }} />,
      },
      {
        label: "Outlined / Wireframe",
        node: <PanopticonVariant size={140} cfg={{ cellStyle: "outlined" }} />,
      },
      {
        label: "Light — dark on cream",
        node: <PanopticonVariant size={140} color={DARK} bg={CREAM} />,
      },
      {
        label: "Split — half gold / half inverted",
        node: <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.45)", display: "inline-block" }}><PanopticonSplit size={140} /></div>,
      },
      {
        label: "Lampstand — wireframe + fading rings, sovereign center",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          pvSize: 70, pvClearR: 58,
          ringStart: 70, ringEnd: 116,
          numRings: 7,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Lampstand — 5 rings, more open field",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          pvSize: 70, pvClearR: 58,
          ringStart: 72, ringEnd: 116,
          numRings: 5,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Lampstand — 12 groups, dense arms",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          numGroups: 12, tallH: 26, shortH: 12,
          pvSize: 70, pvClearR: 58,
          ringStart: 70, ringEnd: 116,
          numRings: 7,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Lampstand — 6 spokes, no flankers",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          numGroups: 6, includeFlankers: false, tallH: 38,
          pvSize: 70, pvClearR: 58,
          ringStart: 70, ringEnd: 116,
          numRings: 7,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Lampstand — light, dark on cream",
        node: <PanopticonVariant size={140} color={DARK} bg={CREAM} cfg={{
          cellStyle: "outlined",
          pvSize: 70, pvClearR: 58,
          ringStart: 70, ringEnd: 116,
          numRings: 7,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Ripple — wide band, heavy fade, PV dominant",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          pvSize: 50, pvClearR: 56,
          ringStart: 60, ringEnd: 118,
          numRings: 10,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Signal — 6 spokes, sparse outer field",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          numGroups: 6, includeFlankers: false,
          tallH: 40,
          pvSize: 52, pvClearR: 58,
          ringStart: 72, ringEnd: 114,
          numRings: 4,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Cardinal — 4 directions, open and bold",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          numGroups: 4, includeFlankers: true, flankerDeg: 8,
          tallH: 40, shortH: 20,
          pvSize: 54, pvClearR: 60,
          ringStart: 74, ringEnd: 114,
          numRings: 5,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Filled Broadcast — large PV, rings pushed out",
        node: <PanopticonVariant size={140} cfg={{
          pvSize: 48, pvClearR: 54,
          ringStart: 62, ringEnd: 88,
          numRings: 6,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Filled Cardinal — 4 groups, bold center",
        node: <PanopticonVariant size={140} cfg={{
          numGroups: 4, includeFlankers: true, flankerDeg: 8,
          tallH: 40, shortH: 20,
          pvSize: 50, pvClearR: 56,
          ringStart: 64, ringEnd: 88,
          numRings: 5,
          ringFadeToCenter: true,
        }} />,
      },
      {
        label: "Declaration — accountability at the perimeter, free field within",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          pvSize: 56, pvClearR: 62,
          ringStart: 96, ringEnd: 114,
          numRings: 3,
          ringFadeToCenter: false,
        }} />,
      },
      {
        label: "Free Field — maximum open space, 6 spokes, 2 outer rings",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          numGroups: 6, includeFlankers: false,
          tallH: 42,
          pvSize: 58, pvClearR: 64,
          ringStart: 106, ringEnd: 118,
          numRings: 2,
          ringFadeToCenter: false,
        }} />,
      },
      {
        label: "Sousveillance — bold boundary, declared center, open interior",
        node: <PanopticonVariant size={140} cfg={{
          numGroups: 8, includeFlankers: true,
          pvSize: 52, pvClearR: 58,
          ringStart: 94, ringEnd: 114,
          numRings: 4,
          ringFadeToCenter: false,
        }} />,
      },
      {
        label: "Perimeter — 4 cardinal spokes, rings at boundary only",
        node: <PanopticonVariant size={140} cfg={{
          cellStyle: "outlined",
          numGroups: 4, includeFlankers: true, flankerDeg: 9,
          tallH: 42, shortH: 22,
          pvSize: 56, pvClearR: 62,
          ringStart: 92, ringEnd: 114,
          numRings: 4,
          ringFadeToCenter: false,
        }} />,
      },
    ],
  },
  {
    name: "The Wordmark",
    subtitle: "Single stacked horizontal — headers, footers, signage, email signatures",
    main: (
      <Box w={520} h={140} bg={DARK}>
        <Center><Wordmark /></Center>
      </Box>
    ),
    variants: [
      { label: "Gold on dark",  node: <Box w={200} h={80} bg={DARK}><Center><Wordmark size={16} /></Center></Box> },
      { label: "Cream on dark", node: <Box w={200} h={80} bg={DARK}><Center><Wordmark size={16} color={CREAM} /></Center></Box> },
      { label: "Dark on gold",  node: <Box w={200} h={80} bg={GOLD}><Center><Wordmark size={16} color={DARK} /></Center></Box> },
    ],
  },
  {
    name: "The Stacked",
    subtitle: "Two-line lockup — print, packaging, social profiles, formal documents",
    main: (
      <Box w={400} h={200} bg={DARK}>
        <Center><Stacked /></Center>
      </Box>
    ),
    variants: [
      { label: "Gold on dark",  node: <Box w={160} h={100} bg={DARK}><Center><Stacked fs1={22} fs2={7} /></Center></Box> },
      { label: "Dark on cream", node: <Box w={160} h={100} bg={CREAM}><Center><Stacked top={DARK} btm={DARK} rule={DARK} fs1={22} fs2={7} /></Center></Box> },
      { label: "Dark on gold",  node: <Box w={160} h={100} bg={GOLD}><Center><Stacked top={DARK} btm={DARK} rule={DARK} fs1={22} fs2={7} /></Center></Box> },
    ],
  },
  {
    name: "The Monogram",
    subtitle: "Clean PV — embossing, stamps, card backs, watermarks, app icon base",
    main: (
      <Box w={220} h={220} bg={DARK}>
        <Center><Mono /></Center>
      </Box>
    ),
    variants: [
      { label: "Gold on dark",  node: <Box w={88} h={88} bg={DARK}><Center><Mono size={44} /></Center></Box> },
      { label: "Dark on cream", node: <Box w={88} h={88} bg={CREAM}><Center><Mono size={44} color={DARK} /></Center></Box> },
      { label: "Dark on gold",  node: <Box w={88} h={88} bg={GOLD}><Center><Mono size={44} color={DARK} /></Center></Box> },
    ],
  },
  {
    name: "The Slash Mark",
    subtitle: "PV + V-stroke extended — the signature mark · business cards · brand icon",
    main: <SlashMark />,
    variants: [
      { label: "Right leg  \\  (V's right stroke)", node: <SlashMark size={120} direction="right" /> },
      { label: "Left leg  /  (V's left stroke)",   node: <SlashMark size={120} direction="left" /> },
      { label: "Both legs — the full V",            node: <SlashMark size={120} direction="both" /> },
    ],
  },
  {
    name: "The Full Lockup",
    subtitle: "Primary logo — the mark + wordmark together · websites, proposals, decks",
    main: <Lockup />,
    variants: [
      { label: "Gold on dark",  node: <Lockup color={GOLD} bg={DARK} /> },
      { label: "Cream on dark", node: <Lockup color={CREAM} bg={DARK} /> },
      { label: "Dark on gold",  node: <Lockup color={DARK} bg={GOLD} /> },
    ],
  },
];

export default function LogosPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: CREAM, fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>

      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto 56px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "10px" }}>
          Purcell Ventures — Brand Identity
        </div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: CREAM, marginBottom: "8px" }}>
          Logo Options
        </h1>
        <p style={{ fontSize: "14px", color: "#524d45", maxWidth: "480px", lineHeight: 1.7 }}>
          6 treatments. Download PNG or SVG directly from each logo. Panopticon Mark is fully vector — SVG download scales to any size.
        </p>
      </div>

      {/* Logos */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "72px" }}>
        {LOGOS.map((logo, i) => (
          <LogoSection key={logo.name} logo={logo} idx={i} />
        ))}
      </div>

      {/* Notes */}
      <div style={{ maxWidth: "1200px", margin: "72px auto 0", padding: "28px 32px", background: MID, border: "1px solid #2e2820", borderRadius: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: GOLD, marginBottom: "14px" }}>Usage Notes</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", fontSize: "12px", color: "#6a6458", lineHeight: 1.7 }}>
          <div><strong style={{ color: "#8a8070" }}>Font:</strong> Cinzel (Google Fonts, free). Bold 700 for PV and PURCELL. Regular 400 for VENTURES.</div>
          <div><strong style={{ color: "#8a8070" }}>Colors:</strong> Gold: #d4af37 · Near-black: #0c0a08 · Cream: #f5f0e0</div>
          <div><strong style={{ color: "#8a8070" }}>Panopticon SVG:</strong> Download SVG for fully scalable vector — use for print, embroidery, large format, and app icons.</div>
          <div><strong style={{ color: "#8a8070" }}>The Slash:</strong> The slash in the mark follows the exact angle of the V's right stroke — they are one element extended.</div>
        </div>
      </div>

      <div style={{ height: "64px" }} />
    </div>
  );
}
