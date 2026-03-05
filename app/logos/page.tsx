// Brand identity options — purcellventures.co/logos
// 5 logo treatments × 3 color variants each
// SVG-backed, resolution-independent previews

import React from "react";

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

// ─── 1. The Wordmark — single horizontal line ──────────────────────────────────
// PURCELL  ·  VENTURES with generous tracking

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

// ─── 2. The Stacked — PURCELL / rule / VENTURES ───────────────────────────────

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

// ─── 3. The Monogram — clean PV ───────────────────────────────────────────────

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

// ─── 4. The Slash Mark — PV + V-stroke extended ───────────────────────────────
// 220×220 canvas. PV at 88px centered at (110, 100).
// V top-right ≈ (174, 56), top-left ≈ (110, 56), apex ≈ (142, 118).
// Right leg (\): (203, 0) → (89, 220)
// Left  leg (/): (81,  0) → (195, 220)

function SlashMark({
  color = GOLD, bg = DARK, size = 220,
  direction = "right",
}: { color?: string; bg?: string; size?: number; direction?: "right" | "left" | "both" }) {
  const scale = size / 220;
  const pv    = Math.round(88 * scale);
  const sw    = Math.max(1, 1.5 * scale);
  const mt    = Math.round(-8 * scale);

  // Right leg \ : bisects V's right stroke — (192,0)→(96,220) at scale=1
  const [rx1, rx2] = [Math.round(192 * scale), Math.round(96  * scale)];
  // Left  leg / : bisects V's left stroke — (28,0)→(124,220) at scale=1
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

// ─── 5. The Full Lockup — Slash Mark left + stacked wordmark right ─────────────
// 500×140 canvas. PV zone: left 130px. Divider at x=148. Text from x=166.
// PV at 58px centered at (65, 70). V-aligned slash: (127, 0) → (56, 140).

function Lockup({ color = GOLD, bg = DARK }: { color?: string; bg?: string }) {
  return (
    <Box w={500} h={140} bg={bg}>
      {/* PV mark */}
      <div style={{
        position: "absolute", top: "50%", left: 65,
        transform: "translate(-50%, -50%)",
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "58px", fontWeight: 700,
        color, lineHeight: 1, letterSpacing: "0.06em",
        whiteSpace: "nowrap",
        marginTop: "-4px",
      }}>PV</div>
      {/* V-aligned slash — corrected to match V's actual right leg position */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={500} height={140} viewBox="0 0 500 140">
        <line x1={118} y1={0} x2={57} y2={140} stroke={color} strokeWidth="1.5" opacity="0.6" />
      </svg>
      {/* Vertical rule */}
      <div style={{
        position: "absolute", left: 148, top: 24, bottom: 24,
        width: "1px", background: color, opacity: 0.22,
      }} />
      {/* Wordmark — style 1: size contrast only, no rule */}
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
};

const LOGOS: LogoEntry[] = [
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
          5 treatments × 3 color variants. Right-click any logo to save as image. For vector files, recreate in Canva or Figma using Cinzel font.
        </p>
      </div>

      {/* Logos */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "72px" }}>
        {LOGOS.map((logo, i) => (
          <div key={logo.name}>

            {/* Label */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "24px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.1em" }}>0{i + 1}</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: CREAM }}>{logo.name}</span>
              <span style={{ fontSize: "13px", color: "#524d45" }}>{logo.subtitle}</span>
            </div>

            {/* Main */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "10px" }}>Primary</div>
              {logo.main}
            </div>

            {/* Variants */}
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "10px" }}>Color Variants</div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}>
                {logo.variants.map((v) => (
                  <div key={v.label}>
                    {v.node}
                    <div style={{ fontSize: "10px", color: "#3a3530", marginTop: "6px", letterSpacing: "0.04em" }}>{v.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Notes */}
      <div style={{ maxWidth: "1200px", margin: "72px auto 0", padding: "28px 32px", background: MID, border: "1px solid #2e2820", borderRadius: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: GOLD, marginBottom: "14px" }}>Usage Notes</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", fontSize: "12px", color: "#6a6458", lineHeight: 1.7 }}>
          <div><strong style={{ color: "#8a8070" }}>Font:</strong> Cinzel (Google Fonts, free). Use Bold 700 for PV and PURCELL. Regular 400 for VENTURES.</div>
          <div><strong style={{ color: "#8a8070" }}>Colors:</strong> Gold: #d4af37 · Near-black: #0c0a08 · Cream: #f5f0e0</div>
          <div><strong style={{ color: "#8a8070" }}>Vector:</strong> Recreate in Canva or Figma for scalable SVG/PDF files. Use for print, large format, or embroidery.</div>
          <div><strong style={{ color: "#8a8070" }}>The Slash:</strong> The slash in the mark follows the exact angle of the V's right stroke — they are one element extended.</div>
        </div>
      </div>

      <div style={{ height: "64px" }} />
    </div>
  );
}
