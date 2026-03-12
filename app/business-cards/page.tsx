"use client";
// Business card slash variations — purcellventures.co/business-cards
// 6 designs built around the diagonal gold slash + PV luxury logo mark
// Print: 3.5" × 2" at 300 DPI · Preview: 630×360px (1.8× scale)

import React, { useRef } from "react";
import { downloadPrintAsset } from "@/lib/printDownload";

const W = 630;
const H = 360;
const PAD = 40;

const INFO = {
  name: "Elijah Purcell",
  title: "Founder",
  phone: "(770) 280-5319",
  email: "elijah@purcell-ventures.com",
  web: "purcellventures.co",
};

const QR_DARK = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://purcellventures.co&bgcolor=0d0b09&color=d4af37`;
const QR_GOLD = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://purcellventures.co&bgcolor=d4af37&color=0c0a08`;

// ─── Shared ───────────────────────────────────────────────────────────────────

function ContactLines({ color = "#8a8070", size = 11 }: { color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {[INFO.phone, INFO.email, INFO.web].map(line => (
        <div key={line} style={{ fontSize: `${size}px`, color, letterSpacing: "0.02em", fontFamily: "Inter, sans-serif" }}>{line}</div>
      ))}
    </div>
  );
}

function ContactRow({ color = "#4a4540", size = 9.5 }: { color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", justifyContent: "center" }}>
      {[INFO.phone, INFO.email, INFO.web].map(line => (
        <div key={line} style={{ fontSize: `${size}px`, color, letterSpacing: "0.02em", fontFamily: "Inter, sans-serif" }}>{line}</div>
      ))}
    </div>
  );
}

function NameBlock({ nameColor = "#f5f0e0", titleColor = "#8a8070", size = 13 }: { nameColor?: string; titleColor?: string; size?: number }) {
  return (
    <div>
      <div style={{ fontSize: `${size}px`, fontWeight: 700, color: nameColor, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{INFO.name}</div>
      <div style={{ fontSize: `${Math.round(size * 0.8)}px`, color: titleColor, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginTop: "3px" }}>{INFO.title}</div>
    </div>
  );
}

function CardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: W, height: H, position: "relative", overflow: "hidden",
      borderRadius: "8px", flexShrink: 0,
      boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// Standard two-line slash (upper-right sweeping to lower-left)
function Slashes({ color = "#d4af37", o1 = 0.35, o2 = 0.2 }: { color?: string; o1?: number; o2?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <line x1={W * 0.55} y1={0} x2={W * 0.35} y2={H} stroke={color} strokeWidth="1.5" opacity={o1} />
      <line x1={W * 0.58} y1={0} x2={W * 0.38} y2={H} stroke={color} strokeWidth="0.75" opacity={o2} />
    </svg>
  );
}

function QRCenter({ src, color = "#d4af37" }: { src: string; color?: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px" }}>
      <img src={src} width={110} height={110} alt="QR" style={{ display: "block" }} />
      <div style={{ fontSize: "11px", color, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>purcellventures.co</div>
    </div>
  );
}

// ─── V1: The Slash / Classic ──────────────────────────────────────────────────
// Original refined — two faint diagonals, small PV mark above wordmark

function V1Front() {
  return (
    <CardShell style={{ background: "#0f0d0b" }}>
      <Slashes />
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "10px", fontWeight: 700, color: "#d4af37", letterSpacing: "0.4em", marginBottom: "12px", opacity: 0.6 }}>P · V</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.26em", marginTop: "2px", opacity: 0.8 }}>VENTURES</div>
          <div style={{ height: "1px", background: "#d4af3730", margin: "14px 0" }} />
          <NameBlock />
        </div>
        <ContactLines />
      </div>
    </CardShell>
  );
}
function V1Back() {
  return (
    <CardShell style={{ background: "#0f0d0b" }}>
      <Slashes o1={0.2} o2={0.12} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── V2: The Slash / Ghost PV ─────────────────────────────────────────────────
// Massive faded PV watermark fills the card — the slash cuts over it

function GhostPV({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <text
        x={W / 2} y={H / 2}
        textAnchor="middle" dominantBaseline="central"
        fontFamily="'Cinzel', Georgia, serif"
        fontSize="252" fontWeight="700"
        fill="#d4af37" opacity={opacity}
        letterSpacing="10"
      >PV</text>
    </svg>
  );
}

function V2Front() {
  return (
    <CardShell style={{ background: "#0c0a08" }}>
      <GhostPV />
      <Slashes />
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.26em", marginTop: "2px", opacity: 0.8 }}>VENTURES</div>
          <div style={{ height: "1px", background: "#d4af3730", margin: "14px 0" }} />
          <NameBlock />
        </div>
        <ContactLines />
      </div>
    </CardShell>
  );
}
function V2Back() {
  return (
    <CardShell style={{ background: "#0c0a08" }}>
      <GhostPV />
      <Slashes o1={0.2} o2={0.12} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── V3: The Slash / Mark ─────────────────────────────────────────────────────
// The PV IS the logo: large centered monogram, single slash cutting through it
// Most minimal. Most luxury.
//
// Layout (px from top):
//   88  — PV top (86px tall → bottom at 174, center at 131)
//   194 — thin rule
//   208 — name
//   222 — title
//   320 — contact row (bottom: 40)
//
// Slash: forward / through PV center (315, 131)
//   from (195, 201) to (435, 61) — midpoint (315, 131) ✓

function V3Front() { return <PVMark slash={SLASH_RIGHT_FRONT} />; }
function V3Back()  { return <PVMarkBack slash={SLASH_RIGHT_BACK} />; }

// ─── V7: The Slash / Mark (Left Leg) ──────────────────────────────────────────
// Same mark, V's LEFT stroke extended — forward slash / direction
// Front slash: V top-left (315,88) → apex (346,150) → extended (271,0)→(451,360)
// Back slash:  V top-left (315,100) → apex (373,212) → extended (263,0)→(450,360)

function PVMark({ slash }: { slash: React.ReactNode }) {
  return (
    <CardShell style={{ background: "#0d0b09" }}>
      <div style={{
        position: "absolute", top: 88, left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "86px", fontWeight: 700,
        color: "#d4af37", lineHeight: 1, letterSpacing: "0.06em",
        whiteSpace: "nowrap",
      }}>PV</div>
      {slash}
      <div style={{ position: "absolute", top: 194, left: "50%", transform: "translateX(-50%)", width: 52, height: 1, background: "#d4af3750" }} />
      <div style={{ position: "absolute", top: 208, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#d8d0c4", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{INFO.name}</div>
        <div style={{ fontSize: "9px", color: "#6a6458", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginTop: "4px" }}>{INFO.title}</div>
      </div>
      <div style={{ position: "absolute", bottom: PAD, left: 0, right: 0 }}>
        <ContactRow />
      </div>
    </CardShell>
  );
}

function PVMarkBack({ slash }: { slash: React.ReactNode }) {
  return (
    <CardShell style={{ background: "#0d0b09" }}>
      <div style={{
        position: "absolute", top: 100, left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "160px", fontWeight: 700,
        color: "#d4af37", lineHeight: 1, letterSpacing: "0.06em",
        whiteSpace: "nowrap",
      }}>PV</div>
      {slash}
    </CardShell>
  );
}

// Slash SVG helpers for the mark
const SLASH_RIGHT_FRONT = (
  <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    <line x1={427} y1={0} x2={270} y2={360} stroke="#d4af37" strokeWidth="1.5" opacity="0.65" />
  </svg>
);
const SLASH_LEFT_FRONT = (
  <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    <line x1={203} y1={0} x2={360} y2={360} stroke="#d4af37" strokeWidth="1.5" opacity="0.65" />
  </svg>
);
const SLASH_BOTH_FRONT = (
  <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    <line x1={427} y1={0} x2={270} y2={360} stroke="#d4af37" strokeWidth="1.5" opacity="0.55" />
    <line x1={203} y1={0} x2={360} y2={360} stroke="#d4af37" strokeWidth="1.5" opacity="0.55" />
  </svg>
);
const SLASH_RIGHT_BACK = (
  <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    <line x1={455} y1={0} x2={298} y2={360} stroke="#d4af37" strokeWidth="2.5" opacity="0.5" />
  </svg>
);
const SLASH_LEFT_BACK = (
  <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    <line x1={175} y1={0} x2={332} y2={360} stroke="#d4af37" strokeWidth="2.5" opacity="0.5" />
  </svg>
);
const SLASH_BOTH_BACK = (
  <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    <line x1={455} y1={0} x2={298} y2={360} stroke="#d4af37" strokeWidth="2.5" opacity="0.45" />
    <line x1={175} y1={0} x2={332} y2={360} stroke="#d4af37" strokeWidth="2.5" opacity="0.45" />
  </svg>
);

function V7Front() { return <PVMark slash={SLASH_LEFT_FRONT} />; }
function V7Back()  { return <PVMarkBack slash={SLASH_LEFT_BACK} />; }

// ─── V8: The V-Mark ────────────────────────────────────────────────────────────
// Both strokes of the V extended across the full card
// The V's two legs form a massive V shape — converging at the letter's apex

function V8Front() { return <PVMark slash={SLASH_BOTH_FRONT} />; }
function V8Back()  { return <PVMarkBack slash={SLASH_BOTH_BACK} />; }

// ─── V4: The Slash / Cut ──────────────────────────────────────────────────────
// One fully opaque slash divides the card into two structural zones
// Wordmark top-left — contact bottom-right — the card is cut in two

function V4Front() {
  // Slash: (428, 0) → (139, 360). At y=180, x≈284 (left-center area)
  return (
    <CardShell style={{ background: "#0f0d0b" }}>
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line x1={428} y1={0} x2={139} y2={360} stroke="#d4af37" strokeWidth="1.5" opacity="1" />
      </svg>
      {/* Upper-left: wordmark */}
      <div style={{ position: "absolute", top: PAD, left: PAD }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "38px", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>Purcell</div>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.26em", marginTop: "2px", opacity: 0.8 }}>VENTURES</div>
      </div>
      {/* Mid-left: name */}
      <div style={{ position: "absolute", top: "50%", left: PAD, transform: "translateY(-50%)" }}>
        <NameBlock size={12} />
      </div>
      {/* Lower-right: contact */}
      <div style={{ position: "absolute", bottom: PAD, right: PAD, textAlign: "right" }}>
        <ContactLines color="#6a6458" size={10} />
      </div>
    </CardShell>
  );
}
function V4Back() {
  return (
    <CardShell style={{ background: "#0f0d0b" }}>
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line x1={428} y1={0} x2={139} y2={360} stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── V5: The Slash / Rake ─────────────────────────────────────────────────────
// 9 parallel diagonal lines at same angle — luxury fabric texture
// Content sits clean on top

function RakeLines({ opacity = 0.1 }: { opacity?: number }) {
  const lines = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    return { x1: W * (t + 0.2), x2: W * (t - 0.2) };
  });
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={0} x2={l.x2} y2={H} stroke="#d4af37" strokeWidth="1" opacity={opacity} />
      ))}
    </svg>
  );
}

function V5Front() {
  return (
    <CardShell style={{ background: "#0c0a08" }}>
      <RakeLines />
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.26em", marginTop: "2px", opacity: 0.8 }}>VENTURES</div>
          <div style={{ height: "1px", background: "#d4af3730", margin: "14px 0" }} />
          <NameBlock />
        </div>
        <ContactLines />
      </div>
    </CardShell>
  );
}
function V5Back() {
  return (
    <CardShell style={{ background: "#0c0a08" }}>
      <RakeLines opacity={0.08} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── V6: The Slash / Inverted ─────────────────────────────────────────────────
// Gold background. Dark slash lines. All-gold front face — maximum boldness.

function V6Front() {
  return (
    <CardShell style={{ background: "#d4af37" }}>
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line x1={W * 0.55} y1={0} x2={W * 0.35} y2={H} stroke="#0c0a08" strokeWidth="1.5" opacity="0.18" />
        <line x1={W * 0.58} y1={0} x2={W * 0.38} y2={H} stroke="#0c0a08" strokeWidth="0.75" opacity="0.1" />
      </svg>
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "#0c0a08", lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#0c0a08", letterSpacing: "0.26em", marginTop: "2px", opacity: 0.7 }}>VENTURES</div>
          <div style={{ height: "1px", background: "#0c0a0820", margin: "14px 0" }} />
          <NameBlock nameColor="#0c0a08" titleColor="#3a3020" />
        </div>
        <ContactLines color="#3a3020" />
      </div>
    </CardShell>
  );
}
function V6Back() {
  return (
    <CardShell style={{ background: "#0f0d0b" }}>
      <Slashes o1={0.25} o2={0.15} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── Purcell Works Card ───────────────────────────────────────────────────────

const INFO_WORKS = {
  name: "Elijah Purcell",
  title: "Owner",
  phone: "(770) 280-5319",
  email: "elijah@purcell-ventures.com",
  web: "works.purcellventures.co",
};

const QR_WORKS = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://works.purcellventures.co&bgcolor=0c0a08&color=d4af37`;

function GhostPW({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <text
        x={W / 2} y={H / 2}
        textAnchor="middle" dominantBaseline="central"
        fontFamily="'Cinzel', Georgia, serif"
        fontSize="252" fontWeight="700"
        fill="#d4af37" opacity={opacity}
        letterSpacing="10"
      >PW</text>
    </svg>
  );
}

function WorksContactLines({ color = "#8a8070", size = 11 }: { color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {[INFO_WORKS.phone, INFO_WORKS.email, INFO_WORKS.web].map(line => (
        <div key={line} style={{ fontSize: `${size}px`, color, letterSpacing: "0.02em", fontFamily: "Inter, sans-serif" }}>{line}</div>
      ))}
    </div>
  );
}

function WorksNameBlock({ nameColor = "#f5f0e0", titleColor = "#8a8070", size = 13 }: { nameColor?: string; titleColor?: string; size?: number }) {
  return (
    <div>
      <div style={{ fontSize: `${size}px`, fontWeight: 700, color: nameColor, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>{INFO_WORKS.name}</div>
      <div style={{ fontSize: `${Math.round(size * 0.8)}px`, color: titleColor, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginTop: "3px" }}>{INFO_WORKS.title}</div>
    </div>
  );
}

function WorksV2Front() {
  return (
    <CardShell style={{ background: "#0c0a08" }}>
      <GhostPV />
      <Slashes />
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "#d4af37", lineHeight: 1 }}>Purcell</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.26em", marginTop: "2px", opacity: 0.8 }}>WORKS</div>
          <div style={{ height: "1px", background: "#d4af3730", margin: "14px 0" }} />
          <WorksNameBlock />
        </div>
        <WorksContactLines />
      </div>
    </CardShell>
  );
}

function WorksV2Back() {
  return (
    <CardShell style={{ background: "#0c0a08" }}>
      <GhostPV />
      <Slashes o1={0.2} o2={0.12} />
      <QRCenter src={QR_WORKS} />
    </CardShell>
  );
}

// ─── Download wrapper ─────────────────────────────────────────────────────────

function CardSection({ title, subtitle, Front, Back, filenamePrefix }: {
  title: string;
  subtitle: string;
  Front: React.ComponentType;
  Back: React.ComponentType;
  filenamePrefix: string;
}) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const download = (ref: React.RefObject<HTMLDivElement | null>, filename: string) =>
    downloadPrintAsset(ref, filename);

  const btnStyle: React.CSSProperties = {
    marginTop: "10px", padding: "8px 18px", background: "none",
    border: "1px solid #2e2820", color: "#8a8070", fontSize: "11px",
    fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
    cursor: "pointer", borderRadius: "4px", display: "block", width: "100%",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div>
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#f5f0e0", marginBottom: "4px" }}>{title}</div>
      <div style={{ fontSize: "13px", color: "#524d45", marginBottom: "20px" }}>{subtitle}</div>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "8px" }}>Front</div>
          <div ref={frontRef} style={{ display: "inline-block" }}><Front /></div>
          <button style={btnStyle} onClick={() => download(frontRef, `${filenamePrefix}-Front`)}>↓ Download Front</button>
        </div>
        <div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "8px" }}>Back</div>
          <div ref={backRef} style={{ display: "inline-block" }}><Back /></div>
          <button style={btnStyle} onClick={() => download(backRef, `${filenamePrefix}-Back`)}>↓ Download Back</button>
        </div>
      </div>
    </div>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const DESIGNS = [
  {
    name: "The Slash / Classic",
    subtitle: "Refined original — subtle diagonals, small PV mark above wordmark",
    Front: V1Front, Back: V1Back,
  },
  {
    name: "The Slash / Ghost PV",
    subtitle: "Massive faded PV watermark fills the card behind the slashes",
    Front: V2Front, Back: V2Back,
  },
  {
    name: "The Slash / Mark  \\",
    subtitle: "V's right leg extended — slash descends from upper-right",
    Front: V3Front, Back: V3Back,
  },
  {
    name: "The Slash / Mark  /",
    subtitle: "V's left leg extended — slash ascends from lower-left",
    Front: V7Front, Back: V7Back,
  },
  {
    name: "The V-Mark",
    subtitle: "Both legs extended — the full V shape written across the card",
    Front: V8Front, Back: V8Back,
  },
  {
    name: "The Slash / Cut",
    subtitle: "One bold slash divides the card — wordmark top-left, contact bottom-right",
    Front: V4Front, Back: V4Back,
  },
  {
    name: "The Slash / Rake",
    subtitle: "9 parallel lines as a luxury fabric texture — content sits on top",
    Front: V5Front, Back: V5Back,
  },
  {
    name: "The Slash / Inverted",
    subtitle: "Gold background with dark slashes — most striking card in any stack",
    Front: V6Front, Back: V6Back,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessCardsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: "#f5f0e0", fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>

      <div style={{ maxWidth: "1400px", margin: "0 auto 64px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", marginBottom: "10px" }}>
          Purcell Ventures — Private
        </div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "#f5f0e0", marginBottom: "8px" }}>
          The Slash — 8 Variations
        </h1>
        <p style={{ fontSize: "14px", color: "#524d45" }}>
          All built around the diagonal gold slash · PV luxury logo treatment · 3.5" × 2" print format
        </p>
      </div>

      {/* Your Cards — downloadable */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 80px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4af37", marginBottom: "32px", paddingBottom: "16px", borderBottom: "1px solid #2e2820" }}>
          Your Cards
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          <CardSection
            title="Purcell Ventures"
            subtitle="The Slash / Ghost PV — your committed PV card"
            Front={V2Front}
            Back={V2Back}
            filenamePrefix="PV-Ghost-PV"
          />
          <CardSection
            title="Purcell Works"
            subtitle="The Slash / Ghost PW — field services card"
            Front={WorksV2Front}
            Back={WorksV2Back}
            filenamePrefix="PW-Ghost-PW"
          />
        </div>
      </div>

      {/* All variations */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "64px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#524d45", paddingBottom: "16px", borderBottom: "1px solid #1e1c1a" }}>
          All Variations
        </div>
        {DESIGNS.map((d, i) => (
          <div key={d.name}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#d4af37", letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#f5f0e0" }}>{d.name}</span>
              <span style={{ fontSize: "13px", color: "#524d45" }}>{d.subtitle}</span>
            </div>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "8px" }}>Front</div>
                <d.Front />
              </div>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a3530", marginBottom: "8px" }}>Back</div>
                <d.Back />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: "1400px", margin: "64px auto 0", padding: "32px", background: "#141210", border: "1px solid #2e2820", borderRadius: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginBottom: "16px" }}>How to Order</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
          {[
            { step: "1", title: "Pick a design", desc: "Screenshot the front and back of your chosen card at full size on this page." },
            { step: "2", title: "Vistaprint", desc: "vistaprint.com → Business Cards → Upload full design. 100 cards ~$20." },
            { step: "3", title: "Or use Canva", desc: "Recreate in Canva's 3.5×2\" business card template. Export as PDF Print." },
            { step: "4", title: "Finish tip", desc: "Soft-touch matte on dark cards. Standard matte on the gold (Inverted). Never gloss on gold — it washes out." },
          ].map(item => (
            <div key={item.step}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#d4af37", marginBottom: "6px" }}>Step {item.step} — {item.title}</div>
              <div style={{ fontSize: "12px", color: "#8a8070", lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: "64px" }} />
    </div>
  );
}
