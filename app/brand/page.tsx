"use client";
import { useState } from "react";

const GOLD   = "#d4af37";
const DARK   = "#0c0a08";
const CREAM  = "#f5f0e0";
const EMBER  = "#2e2820";
const ASH    = "#524d45";
const CHAR   = "#3a3530";
const WARM_WHITE = "#faf8f4";
const MID    = "#141210";

// ─── Color System ─────────────────────────────────────────────────────────────

const PALETTE = [
  {
    name: "Purcell Dark",
    hex: "#0c0a08",
    rgb: "12, 10, 8",
    role: "Primary background",
    usage: "Default background for all brand materials. Near-black with a warm brown undertone — not pure black, which reads as cold and digital. Every surface starts here unless a specific rule says otherwise.",
    swatch: DARK,
    textColor: CREAM,
  },
  {
    name: "Purcell Gold",
    hex: "#d4af37",
    rgb: "212, 175, 55",
    role: "Brand accent",
    usage: "CTAs, highlights, the mark, active states, eyebrow labels, price tags. Never use as body text on dark — too vibrant for sustained reading. Never use as a background for text-heavy content. This is the accent, not the base.",
    swatch: GOLD,
    textColor: DARK,
  },
  {
    name: "Purcell Cream",
    hex: "#f5f0e0",
    rgb: "245, 240, 224",
    role: "Primary text on dark",
    usage: "Headings and body text on dark backgrounds. Light backgrounds on cream-stock print. Never use cream text on white — insufficient contrast. On light backgrounds, switch to Purcell Dark for text.",
    swatch: CREAM,
    textColor: DARK,
  },
  {
    name: "Ember",
    hex: "#2e2820",
    rgb: "46, 40, 32",
    role: "Borders · card backgrounds",
    usage: "All borders, dividers, and card backgrounds. One step lighter than Purcell Dark — creates depth without introducing a new color. Never use as text color.",
    swatch: EMBER,
    textColor: CREAM,
  },
  {
    name: "Ash",
    hex: "#524d45",
    rgb: "82, 77, 69",
    role: "Secondary text · muted content",
    usage: "Subheadings, descriptions, secondary body copy — anything that should recede behind primary cream text. The workhorse muted tone for long-form content.",
    swatch: ASH,
    textColor: CREAM,
  },
  {
    name: "Char",
    hex: "#3a3530",
    rgb: "58, 53, 48",
    role: "Tertiary text · labels",
    usage: "Category labels, fine print, metadata, timestamps — the most muted readable text. Below this level, content is invisible.",
    swatch: CHAR,
    textColor: CREAM,
  },
  {
    name: "Warm White",
    hex: "#faf8f4",
    rgb: "250, 248, 244",
    role: "Forced-light background",
    usage: "Use when printing on standard white paper or generating a PDF that will be viewed on a white background. Slightly warm tinted — avoids the clinical feel of pure white while staying light enough for print legibility. Text on this surface: Purcell Dark. Accent: Gold.",
    swatch: WARM_WHITE,
    textColor: DARK,
  },
];

const COMBOS = [
  {
    label: "Default — digital and dark-stock print",
    bg: DARK, text: CREAM, accent: GOLD, border: EMBER,
    rule: "This is the baseline. Every surface defaults here. Gold for accents and marks only.",
    context: "Website · dark business cards · dark stationery · brand presentations",
  },
  {
    label: "Inverted accent — premium moments",
    bg: GOLD, text: DARK, accent: DARK, border: DARK,
    rule: "Gold as a background works only for short-form content — a card back, a section banner, a pull quote. Never for body text paragraphs.",
    context: "Card accent elements · pull quotes · pricing highlights · CTA banners",
  },
  {
    label: "Cream surface — light-stock print",
    bg: CREAM, text: DARK, accent: GOLD, border: ASH,
    rule: "Cream stock with dark text and gold accents. Feels premium on physical materials. Not for digital — Warm White is the forced-light digital equivalent.",
    context: "Cream-stock stationery · letterhead · printed proposals · brand book pages",
  },
  {
    label: "Forced light — white paper and standard PDFs",
    bg: WARM_WHITE, text: DARK, accent: GOLD, border: CHAR,
    rule: "When you have no choice but a light background. Warm White instead of pure white keeps the brand temperature. Dark text, gold accents, Char for borders.",
    context: "Standard PDFs · Google Docs · printed emails · white-stock invoices",
  },
];

const FORBIDDEN = [
  { bg: "#ffffff", text: CREAM, label: "Cream on white — insufficient contrast. Text disappears." },
  { bg: DARK, text: GOLD, label: "Gold as body text on dark — too vibrant. Use Cream for prose." },
  { bg: GOLD, text: CREAM, label: "Cream on gold — washes out. Only Dark on gold." },
  { bg: DARK, text: "#000000", label: "Pure black text on dark — invisible and wrong temperature." },
];

function ColorSection() {
  return (
    <div>
      {/* Named palette */}
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, marginBottom: "8px" }}>Named Palette</h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "32px", maxWidth: "560px", lineHeight: 1.65 }}>
        Seven colors. Three primary, four functional. Every brand decision is made from this set — no ad-hoc additions.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "64px" }}>
        {PALETTE.map(c => (
          <div key={c.name} style={{ border: `1px solid ${EMBER}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: c.swatch, height: 80, display: "flex", alignItems: "flex-end", padding: "10px 16px" }}>
              <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", fontWeight: 700, color: c.textColor, letterSpacing: "0.08em" }}>
                {c.name}
              </span>
            </div>
            <div style={{ padding: "14px 16px", background: MID }}>
              <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.06em" }}>{c.hex.toUpperCase()}</span>
                <span style={{ fontSize: "11px", color: CHAR, letterSpacing: "0.04em" }}>RGB {c.rgb}</span>
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: CHAR, marginBottom: "6px" }}>{c.role}</div>
              <p style={{ fontSize: "12px", color: ASH, lineHeight: 1.6, margin: 0 }}>{c.usage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Approved combinations */}
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, marginBottom: "8px" }}>Approved Combinations</h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "32px", maxWidth: "560px", lineHeight: 1.65 }}>
        Four approved pairings covering every context. Each is shown at scale with sample content so the combination is unambiguous.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "64px" }}>
        {COMBOS.map(combo => (
          <div key={combo.label} style={{ border: `1px solid ${EMBER}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: combo.bg, padding: "28px 32px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: combo.accent, marginBottom: "8px" }}>
                Purcell Ventures
              </div>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: combo.text, marginBottom: "8px", letterSpacing: "-0.01em" }}>
                Sample Heading Text
              </div>
              <p style={{ fontSize: "14px", color: combo.text, opacity: 0.72, lineHeight: 1.7, margin: "0 0 16px", maxWidth: "480px" }}>
                Body copy demonstrating how text reads against this background. This is what a paragraph looks like in this combination — line length, weight, and color relationship.
              </p>
              <div style={{ display: "inline-block", padding: "8px 18px", border: `1px solid ${combo.accent}`, color: combo.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", borderRadius: 4 }}>
                Action →
              </div>
            </div>
            <div style={{ padding: "14px 20px", background: MID, borderTop: `1px solid ${EMBER}` }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: GOLD, letterSpacing: "0.08em", marginBottom: "4px" }}>{combo.label}</div>
              <div style={{ fontSize: "12px", color: ASH, marginBottom: "4px" }}>{combo.rule}</div>
              <div style={{ fontSize: "11px", color: CHAR, letterSpacing: "0.04em" }}>{combo.context}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Forbidden */}
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, marginBottom: "8px" }}>Never Use</h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "24px", maxWidth: "560px", lineHeight: 1.65 }}>
        These combinations exist in the wild. None of them are approved.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
        {FORBIDDEN.map(f => (
          <div key={f.label} style={{ border: `1px solid #4a1a1a`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: f.bg, padding: "20px", position: "relative" }}>
              <span style={{ color: f.text, fontSize: "15px", fontWeight: 600 }}>Sample text</span>
              <span style={{ position: "absolute", top: 8, right: 10, fontSize: "18px", opacity: 0.7 }}>✕</span>
            </div>
            <div style={{ padding: "10px 14px", background: "#1a0808" }}>
              <p style={{ fontSize: "11px", color: "#a06060", lineHeight: 1.55, margin: 0 }}>{f.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Typography System ────────────────────────────────────────────────────────

const TYPE_SCALE = [
  { name: "Hero",      size: "clamp(44px, 7vw, 72px)", weight: 700,  font: "cinzel", ls: "-0.02em", lh: 1.05, use: "Page titles, brand moments" },
  { name: "H1",        size: "clamp(32px, 5vw, 52px)", weight: 700,  font: "cinzel", ls: "-0.02em", lh: 1.1,  use: "Section heroes, major headings" },
  { name: "H2",        size: "22px",                   weight: 600,  font: "cinzel", ls: "-0.01em", lh: 1.2,  use: "Section headings" },
  { name: "H3",        size: "17px",                   weight: 600,  font: "cinzel", ls: "0em",     lh: 1.35, use: "Card titles, sub-sections" },
  { name: "Body Large",size: "18px",                   weight: 400,  font: "dm",     ls: "0em",     lh: 1.75, use: "Lead paragraphs, intros" },
  { name: "Body",      size: "16px",                   weight: 400,  font: "dm",     ls: "0em",     lh: 1.85, use: "Standard prose" },
  { name: "Body Small",size: "14px",                   weight: 400,  font: "dm",     ls: "0em",     lh: 1.7,  use: "Card descriptions, secondary prose" },
  { name: "Label",     size: "11px",                   weight: 700,  font: "inter",  ls: "0.12em",  lh: 1.4,  use: "Eyebrows, category labels, caps" },
  { name: "Caption",   size: "12px",                   weight: 400,  font: "dm",     ls: "0.02em",  lh: 1.6,  use: "Footnotes, timestamps, meta" },
  { name: "UI",        size: "13px",                   weight: 600,  font: "inter",  ls: "0.04em",  lh: 1.4,  use: "Buttons, nav links, form labels" },
];

function TypographySection() {
  return (
    <div>
      {/* Font families */}
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, marginBottom: "8px" }}>Font Families</h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "32px", maxWidth: "560px", lineHeight: 1.65 }}>
        Three fonts, three roles. Each one has a specific job and doesn't cross into the others.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "56px" }}>
        {[
          {
            name: "Cinzel",
            var: "--font-cinzel",
            role: "Display · Headings · Brand",
            weights: ["400 Regular", "600 SemiBold", "700 Bold", "900 Black"],
            note: "Roman letterforms based on classical inscriptions. Use for everything that IS the brand — the mark, headings, section titles, the logo. Never for body copy or UI.",
            sample: "PURCELL VENTURES",
            sampleFont: "'Cinzel', Georgia, serif",
            sampleSize: "28px",
          },
          {
            name: "DM Sans",
            var: "--font-dm-sans",
            role: "Body · Prose · Descriptions",
            weights: ["300 Light", "400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
            note: "Designed specifically for readability in digital prose. Warmer and more distinctive than Inter. Use for all paragraph text, card descriptions, long-form content.",
            sample: "Built for the people who work hardest.",
            sampleFont: "var(--font-dm-sans), sans-serif",
            sampleSize: "18px",
          },
          {
            name: "Inter",
            var: "--font-inter",
            role: "UI · Labels · Micro-copy",
            weights: ["400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
            note: "Purpose-built for screen UI elements. Use for buttons, navigation links, form labels, eyebrow labels in all-caps, and any text that's a functional UI element rather than content.",
            sample: "GET IN TOUCH →",
            sampleFont: "var(--font-inter), sans-serif",
            sampleSize: "13px",
          },
        ].map(f => (
          <div key={f.name} style={{ border: `1px solid ${EMBER}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: MID, padding: "24px", borderBottom: `1px solid ${EMBER}` }}>
              <div style={{ fontSize: f.sampleSize, fontFamily: f.sampleFont, fontWeight: 700, color: CREAM, marginBottom: "16px", lineHeight: 1.2 }}>
                {f.sample}
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {f.weights.map(w => (
                  <span key={w} style={{ fontSize: "10px", padding: "3px 8px", border: `1px solid ${CHAR}`, borderRadius: 3, color: CHAR, letterSpacing: "0.06em" }}>
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Cinzel', Georgia, serif", color: GOLD, marginBottom: "4px" }}>{f.name}</div>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CHAR, marginBottom: "10px" }}>{f.role}</div>
              <p style={{ fontSize: "12px", color: ASH, lineHeight: 1.65, margin: 0 }}>{f.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Type scale */}
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, marginBottom: "8px" }}>Type Scale</h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "32px", maxWidth: "560px", lineHeight: 1.65 }}>
        Ten levels. Every size decision in the system maps to one of these. Don't invent intermediate sizes.
      </p>
      <div style={{ border: `1px solid ${EMBER}`, borderRadius: 8, overflow: "hidden" }}>
        {TYPE_SCALE.map((t, i) => (
          <div key={t.name} style={{
            display: "grid", gridTemplateColumns: "100px 1fr 200px",
            gap: "16px", alignItems: "center",
            padding: "16px 24px",
            borderBottom: i < TYPE_SCALE.length - 1 ? `1px solid ${EMBER}` : "none",
            background: i % 2 === 0 ? DARK : MID,
          }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.08em", marginBottom: "2px" }}>{t.name}</div>
              <div style={{ fontSize: "10px", color: CHAR, letterSpacing: "0.04em" }}>
                {t.font === "cinzel" ? "Cinzel" : t.font === "dm" ? "DM Sans" : "Inter"} · {t.weight}
              </div>
            </div>
            <div style={{
              fontSize: t.size,
              fontFamily: t.font === "cinzel"
                ? "'Cinzel', Georgia, serif"
                : t.font === "dm"
                ? "var(--font-dm-sans), sans-serif"
                : "var(--font-inter), sans-serif",
              fontWeight: t.weight,
              color: CREAM,
              letterSpacing: t.ls,
              lineHeight: t.lh,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}>
              {t.name === "Label" || t.name === "UI" ? t.use.toUpperCase() : t.use}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: ASH, marginBottom: "2px" }}>{t.size}</div>
              <div style={{ fontSize: "10px", color: CHAR }}>ls {t.ls} · lh {t.lh}</div>
            </div>
          </div>
        ))}
      </div>

      {/* In-use example */}
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, margin: "56px 0 8px" }}>In Use</h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "24px", maxWidth: "560px", lineHeight: 1.65 }}>
        The scale applied to a realistic content block — how the fonts actually work together.
      </p>
      <div style={{ border: `1px solid ${EMBER}`, borderRadius: 8, padding: "40px 48px", background: DARK, maxWidth: "680px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontFamily: "var(--font-inter), sans-serif" }}>
          Digital Services
        </p>
        <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: CREAM, marginBottom: "20px", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
          Everything your business needs to operate online.
        </h2>
        <p style={{ fontSize: "18px", fontFamily: "var(--font-dm-sans), sans-serif", color: CREAM, opacity: 0.8, lineHeight: 1.75, marginBottom: "16px" }}>
          A complete digital toolkit — website, AI chatbot, booking system, CRM, and 20+ tools. Fully managed. One subscription.
        </p>
        <p style={{ fontSize: "15px", fontFamily: "var(--font-dm-sans), sans-serif", color: ASH, lineHeight: 1.8, marginBottom: "28px" }}>
          Most small businesses are running on tools designed for enterprises and pricing designed for startups that raised money. Neither fits. This does.
        </p>
        <div style={{ display: "inline-block", padding: "10px 22px", border: `1px solid ${GOLD}`, color: GOLD, fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", borderRadius: 4, fontFamily: "var(--font-inter), sans-serif" }}>
          See Plans →
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = "colors" | "type";

export default function BrandPage() {
  const [tab, setTab] = useState<Tab>("colors");
  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: CREAM, fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>

      {/* Header */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 48px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "10px" }}>
          Purcell Ventures — Brand Identity
        </div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: CREAM, marginBottom: "12px" }}>
          Brand System
        </h1>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${EMBER}`, marginTop: "32px" }}>
          {([["colors", "Color Rules"], ["type", "Typography"]] as [Tab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 22px",
              fontSize: "13px", fontWeight: tab === id ? 700 : 500,
              letterSpacing: "0.04em",
              color: tab === id ? GOLD : ASH,
              borderBottom: tab === id ? `2px solid ${GOLD}` : "2px solid transparent",
              marginBottom: "-1px",
              transition: "color 0.15s",
              fontFamily: "Inter, sans-serif",
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {tab === "colors" && <ColorSection />}
        {tab === "type"   && <TypographySection />}
      </div>

      {/* Footer nav */}
      <div style={{ maxWidth: "1100px", margin: "64px auto 0", display: "flex", gap: "24px" }}>
        <a href="/logos"    style={{ fontSize: "13px", color: CHAR, textDecoration: "none" }}>← Logos</a>
        <a href="/patterns" style={{ fontSize: "13px", color: CHAR, textDecoration: "none" }}>← Patterns</a>
      </div>
    </div>
  );
}
