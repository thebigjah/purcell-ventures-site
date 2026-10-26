"use client";
// Business card designs, purcellventures.co/business-cards
// Eight designs built around the diagonal gold slash and the Purcell Ventures mark.
// Print: 3.5 by 2 inches at 300 DPI. Preview: 630 by 360 px (1.8 times scale).

import React, { useRef } from "react";
import { downloadPrintAsset, downloadPrintAssetPDF } from "@/lib/printDownload";
import { CONTACT } from "@/lib/contact";

const W = 630;
const H = 360;
const PAD = 40;

// The card artwork is captured to PNG and PDF. Inline SVG is rasterised on its own,
// where CSS variables do not resolve, so SVG strokes use the token values directly:
// SVG_GOLD is --gold and SVG_INK is --bg.
const SVG_GOLD = "#b8862b";
const SVG_INK = "#07060a";

const INFO = {
  name: "Elijah Purcell",
  title: "Founder/CEO",
  phone: CONTACT.phone,
  email: CONTACT.email,
  web: "purcellventures.co",
};

// The QR service takes bare hex: gold-text on bg, and bg on gold.
const QR_DARK = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://purcellventures.co&bgcolor=07060a&color=e3bd6a`;

const DISPLAY = "var(--font-display)";
const BODY = "var(--font-body)";

// ─── Shared ───────────────────────────────────────────────────────────────────

type Info = { name: string; title: string; phone: string; email: string; web: string };

function ContactLines({ info = INFO, color = "var(--muted)", size = 12 }: { info?: Info; color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {[info.phone, info.email, info.web].map(line => (
        <div key={line} style={{ fontSize: `${size}px`, color, fontFamily: BODY }}>{line}</div>
      ))}
    </div>
  );
}

function ContactRow({ color = "var(--subtle)", size = 11 }: { color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", justifyContent: "center" }}>
      {[INFO.phone, INFO.email, INFO.web].map(line => (
        <div key={line} style={{ fontSize: `${size}px`, color, fontFamily: BODY }}>{line}</div>
      ))}
    </div>
  );
}

function NameBlock({ info = INFO, nameColor = "var(--fg)", titleColor = "var(--muted)", size = 16 }: { info?: Info; nameColor?: string; titleColor?: string; size?: number }) {
  return (
    <div>
      <div style={{ fontSize: `${size}px`, fontWeight: 700, color: nameColor, fontFamily: BODY }}>{info.name}</div>
      <div style={{ fontSize: `${Math.round(size * 0.8)}px`, color: titleColor, fontFamily: BODY, marginTop: "3px" }}>{info.title}</div>
    </div>
  );
}

function CardShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: W, height: H, position: "relative", overflow: "hidden",
      flexShrink: 0,
      ...style,
    }}>
      {children}
    </div>
  );
}

// The final mark, foil on dark cards and ochre on the gold card.
function Mark({ size, style, ochre = false }: { size: number; style?: React.CSSProperties; ochre?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={ochre ? "/mark-ochre.svg" : "/mark-foil.svg"} width={size} height={size} alt="" style={{ display: "block", ...style }} />
  );
}

function Wordmark({ color = "var(--gold)", sub = "Ventures", ink = false }: { color?: string; sub?: string; ink?: boolean }) {
  return (
    <div>
      <div style={{ fontFamily: DISPLAY, fontSize: "40px", fontWeight: 600, color, lineHeight: 1 }}>Purcell</div>
      <div style={{ fontFamily: DISPLAY, fontSize: "20px", fontWeight: 400, color, letterSpacing: "0.12em", marginTop: "4px", opacity: ink ? 0.75 : 0.85 }}>{sub}</div>
    </div>
  );
}

function Rule({ color = "var(--gold)", style }: { color?: string; style?: React.CSSProperties }) {
  return <div style={{ height: "1px", background: color, opacity: 0.3, margin: "14px 0", ...style }} />;
}

// Standard two-line slash (upper-right sweeping to lower-left)
function Slashes({ color = SVG_GOLD, o1 = 0.35, o2 = 0.2 }: { color?: string; o1?: number; o2?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <line x1={W * 0.55} y1={0} x2={W * 0.35} y2={H} stroke={color} strokeWidth="1.5" opacity={o1} />
      <line x1={W * 0.58} y1={0} x2={W * 0.38} y2={H} stroke={color} strokeWidth="0.75" opacity={o2} />
    </svg>
  );
}

function QRCenter({ src }: { src: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={110} height={110} alt="QR code for purcellventures.co" style={{ display: "block" }} />
      <div style={{ fontSize: "12px", color: "var(--gold-text)", fontFamily: BODY }}>purcellventures.co</div>
    </div>
  );
}

function FrontLayout({ sub = "Ventures", info = INFO }: { sub?: string; info?: Info }) {
  return (
    <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <Wordmark sub={sub} />
        <Rule />
        <NameBlock info={info} />
      </div>
      <ContactLines info={info} />
    </div>
  );
}

// Large faded mark behind the slashes.
function GhostMark({ opacity = 0.1 }: { opacity?: number }) {
  return <Mark size={300} style={{ position: "absolute", left: (W - 300) / 2, top: (H - 300) / 2, opacity, pointerEvents: "none" }} />;
}

// ─── Design 1: Classic ────────────────────────────────────────────────────────
// Two faint diagonals, small mark above the wordmark

function V1Front() {
  return (
    <CardShell style={{ background: "var(--surface)" }}>
      <Slashes />
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <Mark size={36} style={{ marginBottom: "10px" }} />
          <Wordmark />
          <Rule />
          <NameBlock />
        </div>
        <ContactLines />
      </div>
    </CardShell>
  );
}
function V1Back() {
  return (
    <CardShell style={{ background: "var(--surface)" }}>
      <Slashes o1={0.2} o2={0.12} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── Design 2: Ghost mark ─────────────────────────────────────────────────────
// Large faded mark fills the card, the slash cuts over it

function V2Front() {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <GhostMark />
      <Slashes />
      <FrontLayout />
    </CardShell>
  );
}
function V2Back() {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <GhostMark />
      <Slashes o1={0.2} o2={0.12} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── Designs 3, 4, 5: centered mark with slashes ──────────────────────────────

function SlashSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {children}
    </svg>
  );
}

const SLASH_RIGHT_FRONT = <SlashSvg><line x1={427} y1={0} x2={270} y2={360} stroke={SVG_GOLD} strokeWidth="1.5" opacity="0.65" /></SlashSvg>;
const SLASH_LEFT_FRONT = <SlashSvg><line x1={203} y1={0} x2={360} y2={360} stroke={SVG_GOLD} strokeWidth="1.5" opacity="0.65" /></SlashSvg>;
const SLASH_BOTH_FRONT = (
  <SlashSvg>
    <line x1={427} y1={0} x2={270} y2={360} stroke={SVG_GOLD} strokeWidth="1.5" opacity="0.55" />
    <line x1={203} y1={0} x2={360} y2={360} stroke={SVG_GOLD} strokeWidth="1.5" opacity="0.55" />
  </SlashSvg>
);
const SLASH_RIGHT_BACK = <SlashSvg><line x1={455} y1={0} x2={298} y2={360} stroke={SVG_GOLD} strokeWidth="2.5" opacity="0.5" /></SlashSvg>;
const SLASH_LEFT_BACK = <SlashSvg><line x1={175} y1={0} x2={332} y2={360} stroke={SVG_GOLD} strokeWidth="2.5" opacity="0.5" /></SlashSvg>;
const SLASH_BOTH_BACK = (
  <SlashSvg>
    <line x1={455} y1={0} x2={298} y2={360} stroke={SVG_GOLD} strokeWidth="2.5" opacity="0.45" />
    <line x1={175} y1={0} x2={332} y2={360} stroke={SVG_GOLD} strokeWidth="2.5" opacity="0.45" />
  </SlashSvg>
);

function MarkFront({ slash }: { slash: React.ReactNode }) {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <Mark size={110} style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)" }} />
      {slash}
      <div style={{ position: "absolute", top: 194, left: "50%", transform: "translateX(-50%)", width: 52, height: 1, background: "var(--gold)", opacity: 0.4 }} />
      <div style={{ position: "absolute", top: 208, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--fg-2)", fontFamily: BODY }}>{INFO.name}</div>
        <div style={{ fontSize: "12px", color: "var(--muted)", fontFamily: BODY, marginTop: "4px" }}>{INFO.title}</div>
      </div>
      <div style={{ position: "absolute", bottom: PAD, left: 0, right: 0 }}>
        <ContactRow />
      </div>
    </CardShell>
  );
}

function MarkBack({ slash }: { slash: React.ReactNode }) {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <Mark size={190} style={{ position: "absolute", top: 85, left: "50%", transform: "translateX(-50%)" }} />
      {slash}
    </CardShell>
  );
}

function V3Front() { return <MarkFront slash={SLASH_RIGHT_FRONT} />; }
function V3Back()  { return <MarkBack slash={SLASH_RIGHT_BACK} />; }
function V7Front() { return <MarkFront slash={SLASH_LEFT_FRONT} />; }
function V7Back()  { return <MarkBack slash={SLASH_LEFT_BACK} />; }
function V8Front() { return <MarkFront slash={SLASH_BOTH_FRONT} />; }
function V8Back()  { return <MarkBack slash={SLASH_BOTH_BACK} />; }

// ─── Design 6: Cut ────────────────────────────────────────────────────────────
// One opaque slash divides the card into two zones

function V4Front() {
  return (
    <CardShell style={{ background: "var(--surface)" }}>
      <SlashSvg><line x1={428} y1={0} x2={139} y2={360} stroke={SVG_GOLD} strokeWidth="1.5" /></SlashSvg>
      <div style={{ position: "absolute", top: PAD, left: PAD }}>
        <Wordmark />
      </div>
      <div style={{ position: "absolute", top: "50%", left: PAD, transform: "translateY(-50%)" }}>
        <NameBlock size={14} />
      </div>
      <div style={{ position: "absolute", bottom: PAD, right: PAD, textAlign: "right" }}>
        <ContactLines color="var(--muted)" size={12} />
      </div>
    </CardShell>
  );
}
function V4Back() {
  return (
    <CardShell style={{ background: "var(--surface)" }}>
      <SlashSvg><line x1={428} y1={0} x2={139} y2={360} stroke={SVG_GOLD} strokeWidth="1.5" opacity="0.7" /></SlashSvg>
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── Design 7: Rake ───────────────────────────────────────────────────────────
// Nine parallel diagonal lines as texture, content clean on top

function RakeLines({ opacity = 0.1 }: { opacity?: number }) {
  const lines = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    return { x1: W * (t + 0.2), x2: W * (t - 0.2) };
  });
  return (
    <SlashSvg>
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={0} x2={l.x2} y2={H} stroke={SVG_GOLD} strokeWidth="1" opacity={opacity} />
      ))}
    </SlashSvg>
  );
}

function V5Front() {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <RakeLines />
      <FrontLayout />
    </CardShell>
  );
}
function V5Back() {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <RakeLines opacity={0.08} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── Design 8: Inverted ───────────────────────────────────────────────────────
// Gold background, dark slash lines

function V6Front() {
  return (
    <CardShell style={{ background: "var(--gold)" }}>
      <SlashSvg>
        <line x1={W * 0.55} y1={0} x2={W * 0.35} y2={H} stroke={SVG_INK} strokeWidth="1.5" opacity="0.18" />
        <line x1={W * 0.58} y1={0} x2={W * 0.38} y2={H} stroke={SVG_INK} strokeWidth="0.75" opacity="0.1" />
      </SlashSvg>
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <Wordmark color="var(--bg)" ink />
          <Rule color="var(--bg)" />
          <NameBlock nameColor="var(--bg)" titleColor="var(--bg)" />
        </div>
        <ContactLines color="var(--bg)" />
      </div>
    </CardShell>
  );
}
function V6Back() {
  return (
    <CardShell style={{ background: "var(--surface)" }}>
      <Slashes o1={0.25} o2={0.15} />
      <QRCenter src={QR_DARK} />
    </CardShell>
  );
}

// ─── Mantle Field Services card ───────────────────────────────────────────────

const INFO_MANTLE: Info = {
  name: "Elijah Purcell",
  title: "Owner",
  phone: CONTACT.phone,
  email: CONTACT.email,
  web: "mantle-field-site.vercel.app",
};

const QR_MANTLE = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://mantle-field-site.vercel.app&bgcolor=07060a&color=e3bd6a`;

function MantleFront() {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <Slashes />
      <div style={{ position: "absolute", inset: PAD, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: DISPLAY, fontSize: "40px", fontWeight: 600, color: "var(--gold)", lineHeight: 1 }}>Mantle</div>
          <div style={{ fontFamily: DISPLAY, fontSize: "20px", fontWeight: 400, color: "var(--gold)", letterSpacing: "0.12em", marginTop: "4px", opacity: 0.85 }}>Field Services</div>
          <Rule />
          <NameBlock info={INFO_MANTLE} />
        </div>
        <ContactLines info={INFO_MANTLE} />
      </div>
    </CardShell>
  );
}

function MantleBack() {
  return (
    <CardShell style={{ background: "var(--bg)" }}>
      <Slashes o1={0.2} o2={0.12} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={QR_MANTLE} width={110} height={110} alt="QR code for mantle-field-site.vercel.app" style={{ display: "block" }} />
        <div style={{ fontSize: "12px", color: "var(--gold-text)", fontFamily: BODY }}>{INFO_MANTLE.web}</div>
      </div>
    </CardShell>
  );
}

// ─── Download wrapper ─────────────────────────────────────────────────────────

const smallHead: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: "var(--muted)", marginBottom: 8 };

function CardSection({ title, subtitle, Front, Back, filenamePrefix }: {
  title: string;
  subtitle: string;
  Front: React.ComponentType;
  Back: React.ComponentType;
  filenamePrefix: string;
}) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const btnStyle: React.CSSProperties = {
    marginTop: "8px", minHeight: 44, padding: "0 14px", background: "none",
    border: "1px solid var(--line)", color: "var(--fg-2)", fontSize: 14,
    fontWeight: 500, cursor: "pointer", borderRadius: 0, display: "block", width: "100%",
    fontFamily: "var(--font-body)",
  };
  const btnPdfStyle: React.CSSProperties = {
    ...btnStyle,
    border: "1px solid var(--gold)", color: "var(--gold-text)",
  };

  return (
    <div>
      <h3 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 600, color: "var(--fg)", margin: "0 0 4px" }}>{title}</h3>
      <p style={{ fontSize: 15, color: "var(--muted)", margin: "0 0 20px" }}>{subtitle}</p>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div className="bc-card">
          <div style={smallHead}>Front</div>
          <div ref={frontRef} style={{ display: "inline-block" }}><Front /></div>
          <button style={btnPdfStyle} onClick={() => downloadPrintAssetPDF(frontRef, `${filenamePrefix}-Front`)}>Download front PDF</button>
          <button style={btnStyle} onClick={() => downloadPrintAsset(frontRef, `${filenamePrefix}-Front`)}>Download front PNG</button>
        </div>
        <div className="bc-card">
          <div style={smallHead}>Back</div>
          <div ref={backRef} style={{ display: "inline-block" }}><Back /></div>
          <button style={btnPdfStyle} onClick={() => downloadPrintAssetPDF(backRef, `${filenamePrefix}-Back`)}>Download back PDF</button>
          <button style={btnStyle} onClick={() => downloadPrintAsset(backRef, `${filenamePrefix}-Back`)}>Download back PNG</button>
        </div>
      </div>
    </div>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const DESIGNS = [
  { name: "Classic", subtitle: "Thin diagonals and a small mark above the wordmark", Front: V1Front, Back: V1Back },
  { name: "Ghost mark", subtitle: "Large faded mark behind the slashes", Front: V2Front, Back: V2Back },
  { name: "Mark with right slash", subtitle: "Slash descends from the upper right through the mark", Front: V3Front, Back: V3Back },
  { name: "Mark with left slash", subtitle: "Slash ascends from the lower left through the mark", Front: V7Front, Back: V7Back },
  { name: "Mark with both slashes", subtitle: "Both slashes cross the card and form a V", Front: V8Front, Back: V8Back },
  { name: "Cut", subtitle: "One slash divides the card, wordmark top left, contact bottom right", Front: V4Front, Back: V4Back },
  { name: "Rake", subtitle: "Nine parallel lines as a texture behind the text", Front: V5Front, Back: V5Back },
  { name: "Inverted", subtitle: "Gold background with dark slashes", Front: V6Front, Back: V6Back },
];

const ORDER_STEPS = [
  { title: "Pick a design", desc: "Screenshot the front and back of your chosen card at full size on this page." },
  { title: "Vistaprint", desc: "On vistaprint.com choose Business Cards, then upload the full design. 100 cards cost about $20." },
  { title: "Or use Canva", desc: "Recreate it in Canva's 3.5 by 2 inch business card template. Export as PDF Print." },
  { title: "Finish", desc: "Soft-touch matte on dark cards. Standard matte on the gold one (Inverted). Gloss washes out the gold, so skip it." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessCardsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", fontFamily: BODY, padding: "48px var(--gutter)", overflowX: "hidden" }}>
      <style>{`.bc-card { max-width: 100%; } .bc-card > div:nth-child(2) { max-width: 100%; overflow-x: auto; }`}</style>

      <header style={{ maxWidth: 1400, margin: "0 auto 64px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mark-foil.svg" alt="" width={44} height={44} style={{ display: "block", marginBottom: 16 }} />
        <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 600, margin: "0 0 8px" }}>
          Business cards
        </h1>
        <p style={{ fontSize: 16, color: "var(--fg-2)", margin: 0 }}>
          Eight cards built around the diagonal gold slash. 3.5 by 2 inches.
        </p>
      </header>

      <section style={{ maxWidth: 1400, margin: "0 auto 80px" }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 600, margin: "0 0 32px", paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
          Cards in use
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          <CardSection
            title="Purcell Ventures"
            subtitle="Ghost mark, the chosen Purcell Ventures card"
            Front={V2Front}
            Back={V2Back}
            filenamePrefix="PV-Ghost-Mark"
          />
          <CardSection
            title="Mantle Field Services"
            subtitle="The field services card"
            Front={MantleFront}
            Back={MantleBack}
            filenamePrefix="Mantle-Field-Services"
          />
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: "64px" }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 600, margin: 0, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
          All designs
        </h2>
        {DESIGNS.map((d) => (
          <div key={d.name}>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>{d.name}</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", margin: "0 0 20px" }}>{d.subtitle}</p>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div className="bc-card">
                <div style={smallHead}>Front</div>
                <div><d.Front /></div>
              </div>
              <div className="bc-card">
                <div style={smallHead}>Back</div>
                <div><d.Back /></div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section style={{ maxWidth: 1400, margin: "64px auto 0" }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 28, fontWeight: 600, margin: "0 0 20px" }}>How to order</h2>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 24 }}>
          {ORDER_STEPS.map(item => (
            <li key={item.title}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--gold-text)", marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.65 }}>{item.desc}</div>
            </li>
          ))}
        </ol>
      </section>

      <div style={{ height: "64px" }} />
    </div>
  );
}
