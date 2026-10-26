"use client";
// Brand identity options, purcellventures.co/logos
// SVG-backed, resolution-independent previews

import React, { useEffect, useRef, useState } from "react";
import { downloadPrintAsset, downloadSvgElement, downloadSvgAsPng } from "@/lib/printDownload";

const GOLD = "var(--gold)";
const GOLD_TEXT = "var(--gold-text)";
const DARK = "var(--bg)";
const CREAM = "var(--fg)";
// Warm white for printed pages. It has no site token.
const PAPER = "#faf8f4";

const CSS = `
.lg { min-height: 100vh; background: var(--bg); color: var(--fg); font-family: var(--font-body); padding: 40px 0 72px; }
.lg h1, .lg h2 { font-family: var(--font-display); font-weight: 600; margin: 0; color: var(--fg); }
.lg h1 { font-size: clamp(30px, 6vw, 40px); line-height: 1.1; margin-bottom: 8px; }
.lg h2 { font-size: 22px; line-height: 1.2; }
.lg p { margin: 0; }
.lg-intro { font-size: 15px; color: var(--muted); line-height: 1.7; max-width: 56ch; }
.lg-list { display: flex; flex-direction: column; gap: 64px; margin-top: 48px; }
.lg-title { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 20px; }
.lg-sub { font-size: 14px; color: var(--muted); }
.lg-label { font-size: 13px; font-weight: 600; color: var(--subtle); margin-bottom: 10px; }
.lg-scroll { max-width: 100%; overflow-x: auto; padding-bottom: 4px; }
.lg-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 16px; background: none; border: 1px solid var(--line); color: var(--muted); font: 600 13px var(--font-body); cursor: pointer; }
.lg-btn:hover { color: var(--fg); border-color: var(--subtle); }
.lg-btn--gold { border-color: var(--gold-text); color: var(--gold-text); }
.lg-btn--gold:hover { color: var(--fg); border-color: var(--gold-text); }
.lg-btn--small { display: flex; width: 100%; margin-top: 6px; min-height: 44px; }
.lg-variants { display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start; }
.lg-variant-label { font-size: 13px; color: var(--subtle); margin-top: 4px; max-width: 160px; line-height: 1.4; }
.lg-notes { margin-top: 72px; padding: 28px 24px; background: var(--surface); border: 1px solid var(--line); }
.lg-notes h2 { font-size: 17px; color: var(--gold-text); margin-bottom: 14px; }
.lg-notes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; font-size: 14px; color: var(--muted); line-height: 1.7; }
.lg-notes-grid strong { color: var(--fg-2); }
.lg-mark svg { display: block; width: 100%; height: 100%; }
`;

function Box({
  w, h, bg = DARK, children, style,
}: { w: number; h: number; bg?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: w, height: h, position: "relative", background: bg,
      outline: "1px solid var(--line)", flexShrink: 0,
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

// The final mark, inlined from /mark-foil.svg or /mark-ochre.svg so it can be exported as SVG or PNG.
const markCache: Record<string, string> = {};

function Mark({ kind = "foil", size = 100, bg }: { kind?: "foil" | "ochre"; size?: number; bg?: string }) {
  const [svg, setSvg] = useState<string>(markCache[kind] ?? "");
  useEffect(() => {
    if (markCache[kind]) return;
    let live = true;
    fetch(`/mark-${kind}.svg`).then(r => r.text()).then(t => {
      t = t.replace("<svg ", '<svg width="800" height="800" ');
      markCache[kind] = t;
      if (live) setSvg(t);
    }).catch(() => {});
    return () => { live = false; };
  }, [kind]);
  return (
    <div
      className="lg-mark"
      role="img"
      aria-label="Purcell Ventures mark"
      style={{ width: size, height: size, background: bg, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// ─── The wordmark ─────────────────────────────────────────────────────────────

function Wordmark({ color = GOLD_TEXT, size = 34 }: { color?: string; size?: number }) {
  return (
    <div style={{
      fontFamily: "var(--font-display)", fontSize: `${size}px`, fontWeight: 600,
      color, letterSpacing: "-0.01em", lineHeight: 1, whiteSpace: "nowrap",
    }}>Purcell Ventures</div>
  );
}

// ─── The stacked lockup ───────────────────────────────────────────────────────

function Stacked({
  top = GOLD_TEXT, btm = GOLD_TEXT, rule = GOLD_TEXT, fs1 = 44, fs2 = 20,
}: { top?: string; btm?: string; rule?: string; fs1?: number; fs2?: number }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: `${fs1}px`, fontWeight: 600, color: top, letterSpacing: "-0.01em", lineHeight: 1 }}>Purcell</div>
      <div style={{ height: "1px", background: rule, opacity: 0.45, margin: `${Math.round(fs1 * 0.28)}px auto`, width: `${Math.round(fs1 * 1.9)}px` }} />
      <div style={{ fontFamily: "var(--font-display)", fontSize: `${fs2}px`, fontWeight: 500, color: btm, letterSpacing: "0.04em", lineHeight: 1, opacity: 0.85 }}>Ventures</div>
    </div>
  );
}

// ─── The monogram ─────────────────────────────────────────────────────────────

function Mono({ color = GOLD_TEXT, size = 100 }: { color?: string; size?: number }) {
  return (
    <div style={{
      fontFamily: "var(--font-display)", fontSize: `${size}px`, fontWeight: 600,
      color, lineHeight: 1, letterSpacing: "0.02em", whiteSpace: "nowrap",
    }}>PV</div>
  );
}

// ─── The slash mark ───────────────────────────────────────────────────────────

function SlashMark({
  color = GOLD_TEXT, bg = DARK, size = 220,
  direction = "right",
}: { color?: string; bg?: string; size?: number; direction?: "right" | "left" | "both" }) {
  const scale = size / 220;
  const pv = Math.round(88 * scale);
  const sw = Math.max(1, 1.5 * scale);
  const mt = Math.round(-8 * scale);
  const [rx1, rx2] = [Math.round(192 * scale), Math.round(96 * scale)];
  const [lx1, lx2] = [Math.round(28 * scale), Math.round(124 * scale)];
  return (
    <Box w={size} h={size} bg={bg}>
      <Center>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: `${pv}px`, fontWeight: 600,
          color, lineHeight: 1, letterSpacing: "0.02em", whiteSpace: "nowrap", marginTop: `${mt}px`,
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

// ─── The full lockup ──────────────────────────────────────────────────────────

function Lockup({ kind = "foil", color = GOLD_TEXT, bg = DARK }: { kind?: "foil" | "ochre"; color?: string; bg?: string }) {
  return (
    <Box w={500} h={140} bg={bg}>
      <div style={{ position: "absolute", left: 28, top: 20 }}>
        <Mark kind={kind} size={100} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 24, bottom: 24, width: "1px", background: color, opacity: 0.22 }} />
      <div style={{ position: "absolute", left: 172, top: "50%", transform: "translateY(-50%)" }}>
        <Wordmark color={color} size={34} />
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

function LogoSection({ logo }: { logo: LogoEntry }) {
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

  return (
    <section>
      <div className="lg-title">
        <h2>{logo.name}</h2>
        <span className="lg-sub">{logo.subtitle}</span>
      </div>

      <div style={{ marginBottom: 24 }}>
        <p className="lg-label">Primary</p>
        <div className="lg-scroll">
          <div ref={mainRef} style={{ display: "inline-block" }}>{logo.main}</div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <button className="lg-btn" onClick={dlMain}>Download PNG</button>
          {logo.isSvg && <button className="lg-btn lg-btn--gold" onClick={dlMainSvg}>Download SVG</button>}
        </div>
      </div>

      <div>
        <p className="lg-label">Variants</p>
        <div className="lg-variants">
          {logo.variants.map((v, vi) => (
            <div key={v.label}>
              <div ref={el => { varRefs.current[vi] = el; }}>{v.node}</div>
              <button className="lg-btn lg-btn--small" onClick={() => dlVariant(vi, `${logo.name} ${v.label}`)}>PNG</button>
              <p className="lg-variant-label">{v.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LOGOS: LogoEntry[] = [
  {
    name: "The mark",
    subtitle: "The hexagon with the ring and the PV cut out of it. The primary identity.",
    isSvg: true,
    main: <Mark kind="foil" size={280} />,
    variants: [
      { label: "Foil, from /mark-foil.svg", node: <Mark kind="foil" size={140} /> },
      { label: "Ochre, from /mark-ochre.svg", node: <Mark kind="ochre" size={140} /> },
      { label: "Ochre on cream", node: <Mark kind="ochre" size={140} bg={CREAM} /> },
      { label: "Ochre on warm white", node: <Mark kind="ochre" size={140} bg={PAPER} /> },
    ],
  },
  {
    name: "The wordmark",
    subtitle: "A single line for headers, footers, signage and email signatures",
    main: (
      <Box w={520} h={140} bg={DARK}>
        <Center><Wordmark size={44} /></Center>
      </Box>
    ),
    variants: [
      { label: "Gold on Night", node: <Box w={220} h={80} bg={DARK}><Center><Wordmark size={22} /></Center></Box> },
      { label: "Cream on Night", node: <Box w={220} h={80} bg={DARK}><Center><Wordmark size={22} color={CREAM} /></Center></Box> },
      { label: "Night on gold", node: <Box w={220} h={80} bg={GOLD}><Center><Wordmark size={22} color={DARK} /></Center></Box> },
    ],
  },
  {
    name: "The stacked lockup",
    subtitle: "Two lines for print, packaging, social profiles and formal documents",
    main: (
      <Box w={400} h={200} bg={DARK}>
        <Center><Stacked /></Center>
      </Box>
    ),
    variants: [
      { label: "Gold on Night", node: <Box w={170} h={100} bg={DARK}><Center><Stacked fs1={26} fs2={12} /></Center></Box> },
      { label: "Night on cream", node: <Box w={170} h={100} bg={CREAM}><Center><Stacked top={DARK} btm={DARK} rule={DARK} fs1={26} fs2={12} /></Center></Box> },
      { label: "Night on gold", node: <Box w={170} h={100} bg={GOLD}><Center><Stacked top={DARK} btm={DARK} rule={DARK} fs1={26} fs2={12} /></Center></Box> },
    ],
  },
  {
    name: "The monogram",
    subtitle: "Plain PV for embossing, stamps, card backs, watermarks and app icons",
    main: (
      <Box w={220} h={220} bg={DARK}>
        <Center><Mono /></Center>
      </Box>
    ),
    variants: [
      { label: "Gold on Night", node: <Box w={88} h={88} bg={DARK}><Center><Mono size={44} /></Center></Box> },
      { label: "Night on cream", node: <Box w={88} h={88} bg={CREAM}><Center><Mono size={44} color={DARK} /></Center></Box> },
      { label: "Night on gold", node: <Box w={88} h={88} bg={GOLD}><Center><Mono size={44} color={DARK} /></Center></Box> },
    ],
  },
  {
    name: "The slash mark",
    subtitle: "PV with the V stroke extended, for business cards and the brand icon",
    main: <SlashMark />,
    variants: [
      { label: "Right leg, the V's right stroke", node: <SlashMark size={120} direction="right" /> },
      { label: "Left leg, the V's left stroke", node: <SlashMark size={120} direction="left" /> },
      { label: "Both legs, the full V", node: <SlashMark size={120} direction="both" /> },
    ],
  },
  {
    name: "The full lockup",
    subtitle: "The mark and wordmark together, for websites, proposals and decks",
    main: <Lockup />,
    variants: [
      { label: "Foil mark, gold on Night", node: <Lockup kind="foil" color={GOLD_TEXT} bg={DARK} /> },
      { label: "Foil mark, cream on Night", node: <Lockup kind="foil" color={CREAM} bg={DARK} /> },
      { label: "Ochre mark, Night on cream", node: <Lockup kind="ochre" color={DARK} bg={CREAM} /> },
    ],
  },
];

export default function LogosPage() {
  return (
    <main className="lg">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ui-wrap">
        <header>
          <h1>Logo options</h1>
          <p className="lg-intro">
            Six treatments. Download a PNG from any logo, or an SVG from the mark. The mark is fully vector, so the SVG scales to any size.
          </p>
        </header>

        <div className="lg-list">
          {LOGOS.map(logo => <LogoSection key={logo.name} logo={logo} />)}
        </div>

        <aside className="lg-notes">
          <h2>Usage notes</h2>
          <div className="lg-notes-grid">
            <div><strong>Fonts:</strong> Clash Display for PV and the wordmark, at weight 600. Satoshi for everything else.</div>
            <div><strong>Colors:</strong> gold #b8862b, text gold #e3bd6a, Night #07060a, cream #efe8d8.</div>
            <div><strong>The mark SVG:</strong> use it for print, embroidery, large formats and app icons. It scales to any size.</div>
            <div><strong>The slash:</strong> it follows the exact angle of the V&apos;s right stroke, so the two read as one extended element.</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
