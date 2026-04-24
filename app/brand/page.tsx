"use client";
import { useState } from "react";

const GOLD       = "#d4af37";
const DARK       = "#0c0a08";
const CREAM      = "#f5f0e0";
const EMBER      = "#2e2820";
const ASH        = "#524d45";
const CHAR       = "#3a3530";
const WARM_WHITE = "#faf8f4";
const MID        = "#141210";

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
  { name: "Hero",       size: "clamp(44px, 7vw, 72px)", weight: 700, font: "cinzel", ls: "-0.02em", lh: 1.05, use: "Page titles, brand moments" },
  { name: "H1",         size: "clamp(32px, 5vw, 52px)", weight: 700, font: "cinzel", ls: "-0.02em", lh: 1.1,  use: "Section heroes, major headings" },
  { name: "H2",         size: "22px",                   weight: 600, font: "cinzel", ls: "-0.01em", lh: 1.2,  use: "Section headings" },
  { name: "H3",         size: "17px",                   weight: 600, font: "cinzel", ls: "0em",     lh: 1.35, use: "Card titles, sub-sections" },
  { name: "Body Large", size: "18px",                   weight: 400, font: "dm",     ls: "0em",     lh: 1.75, use: "Lead paragraphs, intros" },
  { name: "Body",       size: "16px",                   weight: 400, font: "dm",     ls: "0em",     lh: 1.85, use: "Standard prose" },
  { name: "Body Small", size: "14px",                   weight: 400, font: "dm",     ls: "0em",     lh: 1.7,  use: "Card descriptions, secondary prose" },
  { name: "Label",      size: "11px",                   weight: 700, font: "inter",  ls: "0.12em",  lh: 1.4,  use: "Eyebrows, category labels, caps" },
  { name: "Caption",    size: "12px",                   weight: 400, font: "dm",     ls: "0.02em",  lh: 1.6,  use: "Footnotes, timestamps, meta" },
  { name: "UI",         size: "13px",                   weight: 600, font: "inter",  ls: "0.04em",  lh: 1.4,  use: "Buttons, nav links, form labels" },
];

function TypographySection() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, marginBottom: "8px" }}>Font Families</h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "32px", maxWidth: "560px", lineHeight: 1.65 }}>
        Three fonts, three roles. Each one has a specific job and doesn't cross into the others.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "56px" }}>
        {[
          {
            name: "Cinzel",
            role: "Display · Headings · Brand",
            weights: ["400 Regular", "600 SemiBold", "700 Bold", "900 Black"],
            note: "Roman letterforms based on classical inscriptions. Use for everything that IS the brand — the mark, headings, section titles, the logo. Never for body copy or UI.",
            sample: "PURCELL VENTURES",
            sampleFont: "'Cinzel', Georgia, serif",
            sampleSize: "28px",
          },
          {
            name: "DM Sans",
            role: "Body · Prose · Descriptions",
            weights: ["300 Light", "400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
            note: "Designed specifically for readability in digital prose. Warmer and more distinctive than Inter. Use for all paragraph text, card descriptions, long-form content.",
            sample: "Built for the people who work hardest.",
            sampleFont: "var(--font-dm-sans), sans-serif",
            sampleSize: "18px",
          },
          {
            name: "Inter",
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

// ─── Icon System ──────────────────────────────────────────────────────────────

type IconDef = {
  key: string;
  name: string;
  category: "brand" | "ui";
  description: string;
  svgContent: string;
};

const ICONS: IconDef[] = [
  // ── Brand icons ──────────────────────────────────────────────────────────
  {
    key: "globe",
    name: "Globe",
    category: "brand",
    description: "Digital & web services — the connected world as a managed presence.",
    svgContent: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2c-3 4-4.5 7-4.5 10s1.5 6 4.5 10"/><path d="M12 2c3 4 4.5 7 4.5 10s-1.5 6-4.5 10"/>`,
  },
  {
    key: "neural",
    name: "Neural",
    category: "brand",
    description: "AI consulting — intelligence as a network, not a black box.",
    svgContent: `<line x1="12" y1="12" x2="12" y2="5"/><line x1="12" y1="12" x2="18.7" y2="9.8"/><line x1="12" y1="12" x2="16.1" y2="17.7"/><line x1="12" y1="12" x2="7.9" y2="17.7"/><line x1="12" y1="12" x2="5.3" y2="9.8"/><polyline points="12,5 18.7,9.8 16.1,17.7 7.9,17.7 5.3,9.8 12,5"/><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="18.7" cy="9.8" r="1.5" fill="currentColor" stroke="none"/><circle cx="16.1" cy="17.7" r="1.5" fill="currentColor" stroke="none"/><circle cx="7.9" cy="17.7" r="1.5" fill="currentColor" stroke="none"/><circle cx="5.3" cy="9.8" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>`,
  },
  {
    key: "terminal",
    name: "Terminal",
    category: "brand",
    description: "Custom software — built from source, not assembled from templates.",
    svgContent: `<polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/><line x1="14.5" y1="5" x2="9.5" y2="19"/>`,
  },
  {
    key: "droplet",
    name: "Droplet",
    category: "brand",
    description: "Field services — pressure washing, gutters, and exterior care.",
    svgContent: `<path d="M12 3 C8 7 6 10 6 13 a6 6 0 0 1 12 0 C18 10 16 7 12 3"/>`,
  },
  {
    key: "eye",
    name: "Eye",
    category: "brand",
    description: "The Mark — transparency and accountability at the center of the work.",
    svgContent: `<path d="M1 12s4.5-8 11-8 11 8 11 8-4.5 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>`,
  },
  {
    key: "layers",
    name: "Layers",
    category: "brand",
    description: "Multi-division structure — distinct services, unified under one mark.",
    svgContent: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
  },

  // ── UI icons ─────────────────────────────────────────────────────────────
  {
    key: "arrow-right",
    name: "Arrow Right",
    category: "ui",
    description: "Forward navigation, CTAs.",
    svgContent: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  },
  {
    key: "arrow-left",
    name: "Arrow Left",
    category: "ui",
    description: "Back navigation.",
    svgContent: `<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>`,
  },
  {
    key: "arrow-up",
    name: "Arrow Up",
    category: "ui",
    description: "Back to top, upload.",
    svgContent: `<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>`,
  },
  {
    key: "external",
    name: "External Link",
    category: "ui",
    description: "Opens in new tab.",
    svgContent: `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`,
  },
  {
    key: "menu",
    name: "Menu",
    category: "ui",
    description: "Hamburger / nav open.",
    svgContent: `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`,
  },
  {
    key: "close",
    name: "Close",
    category: "ui",
    description: "Dismiss, clear, cancel.",
    svgContent: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
  },
  {
    key: "check",
    name: "Check",
    category: "ui",
    description: "Confirm, success, complete.",
    svgContent: `<polyline points="20 6 9 17 4 12"/>`,
  },
  {
    key: "mail",
    name: "Mail",
    category: "ui",
    description: "Email, contact, message.",
    svgContent: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>`,
  },
  {
    key: "phone",
    name: "Phone",
    category: "ui",
    description: "Call, contact by phone.",
    svgContent: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>`,
  },
  {
    key: "pin",
    name: "Pin",
    category: "ui",
    description: "Location, service area.",
    svgContent: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`,
  },
  {
    key: "download",
    name: "Download",
    category: "ui",
    description: "Save file, export.",
    svgContent: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
  },
  {
    key: "copy",
    name: "Copy",
    category: "ui",
    description: "Duplicate, clipboard.",
    svgContent: `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`,
  },
  {
    key: "info",
    name: "Info",
    category: "ui",
    description: "Help, tooltip, detail.",
    svgContent: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`,
  },
];

const ICON_SIZES = [16, 20, 24, 32, 48];

function IconsSection() {
  const [size, setSize]   = useState(24);
  const [mode, setMode]   = useState<"dark" | "gold" | "light">("dark");
  const [copied, setCopied] = useState<string | null>(null);

  const iconColor = mode === "dark" ? CREAM : mode === "gold" ? GOLD : DARK;
  const previewBg = mode === "light" ? WARM_WHITE : DARK;

  function copyIcon(icon: IconDef) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon.svgContent}</svg>`;
    navigator.clipboard.writeText(svg);
    setCopied(icon.key);
    setTimeout(() => setCopied(null), 1500);
  }

  const brandIcons = ICONS.filter(i => i.category === "brand");
  const uiIcons    = ICONS.filter(i => i.category === "ui");

  const iconCardStyle = (key: string): React.CSSProperties => ({
    border: `1px solid ${copied === key ? GOLD : EMBER}`,
    borderRadius: 8,
    overflow: "hidden",
    transition: "border-color 0.2s",
  });

  function renderGrid(icons: IconDef[], columns: string) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: columns, gap: "12px" }}>
        {icons.map(icon => (
          <div key={icon.key} style={iconCardStyle(icon.key)}>
            <div style={{
              background: previewBg,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: `1px solid ${EMBER}`,
            }}>
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={iconColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: icon.svgContent }}
              />
            </div>
            <div style={{ padding: "10px 12px", background: MID }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: icon.category === "brand" ? "5px" : "0" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: CREAM, fontFamily: "'Cinzel', Georgia, serif", whiteSpace: "nowrap" }}>
                  {icon.name}
                </span>
                <button
                  onClick={() => copyIcon(icon)}
                  style={{
                    background: "none",
                    border: `1px solid ${copied === icon.key ? GOLD : CHAR}`,
                    borderRadius: 3,
                    padding: "2px 8px",
                    fontSize: "10px",
                    color: copied === icon.key ? GOLD : CHAR,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    transition: "color 0.15s, border-color 0.15s",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {copied === icon.key ? "Copied" : "Copy SVG"}
                </button>
              </div>
              {icon.category === "brand" && (
                <p style={{ fontSize: "11px", color: ASH, margin: 0, lineHeight: 1.5 }}>{icon.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Intro + controls */}
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: CREAM, marginBottom: "8px" }}>
        Custom Icon Set
      </h2>
      <p style={{ fontSize: "13px", color: ASH, marginBottom: "28px", maxWidth: "600px", lineHeight: 1.65 }}>
        19 icons drawn on a 24×24 grid. All stroke-based, 1.5px weight, round joins and caps. Six brand icons tied to the company's divisions and philosophy; 13 UI icons for navigation and interface. Consistent geometric language with the Lampstand mark.
      </p>

      {/* Controls bar */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap", marginBottom: "40px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: CHAR, letterSpacing: "0.08em", alignSelf: "center", marginRight: "4px", fontFamily: "Inter, sans-serif" }}>SIZE</span>
          {ICON_SIZES.map(s => (
            <button key={s} onClick={() => setSize(s)} style={{
              background: size === s ? EMBER : "none",
              border: `1px solid ${size === s ? GOLD : CHAR}`,
              borderRadius: 3,
              padding: "3px 9px",
              fontSize: "11px",
              color: size === s ? GOLD : CHAR,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.12s",
            }}>
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: CHAR, letterSpacing: "0.08em", alignSelf: "center", marginRight: "4px", fontFamily: "Inter, sans-serif" }}>MODE</span>
          {(["dark", "gold", "light"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              background: mode === m ? EMBER : "none",
              border: `1px solid ${mode === m ? GOLD : CHAR}`,
              borderRadius: 3,
              padding: "3px 9px",
              fontSize: "11px",
              color: mode === m ? GOLD : CHAR,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.12s",
              textTransform: "capitalize",
            }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Brand icons */}
      <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, color: CREAM, marginBottom: "6px" }}>
        Brand Icons
      </h3>
      <p style={{ fontSize: "12px", color: ASH, marginBottom: "20px", lineHeight: 1.6 }}>
        Division marks and conceptual icons. Use on service cards, section headers, and identity materials.
      </p>
      <div style={{ marginBottom: "48px" }}>
        {renderGrid(brandIcons, "repeat(auto-fill, minmax(190px, 1fr))")}
      </div>

      {/* UI icons */}
      <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, color: CREAM, marginBottom: "6px" }}>
        UI Icons
      </h3>
      <p style={{ fontSize: "12px", color: ASH, marginBottom: "20px", lineHeight: 1.6 }}>
        Navigation and interface icons. Consistent with brand stroke weight — don't mix with unrelated icon families.
      </p>
      {renderGrid(uiIcons, "repeat(auto-fill, minmax(150px, 1fr))")}

      {/* Usage notes */}
      <div style={{ marginTop: "56px", border: `1px solid ${EMBER}`, borderRadius: 8, padding: "28px 32px", background: MID }}>
        <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", fontWeight: 600, color: CREAM, marginBottom: "16px" }}>Usage Rules</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {[
            ["Stroke only", "Never fill icons. The 1.5px stroke is the identity. Filled versions look wrong against the mark."],
            ["Color discipline", "Default is Cream on Dark. Gold stroke only for highlighted/active states — not decoration. Never render icons in Ash or Char."],
            ["Minimum size", "16px minimum on screen. Below that, simplify the icon or replace it with a label. The neural and eye icons are especially sensitive to size."],
            ["Spacing", "Icons need at least 4px breathing room from adjacent text. At 24px, pair with 14px+ type. Don't crowd them."],
          ].map(([title, body]) => (
            <div key={title}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "Inter, sans-serif" }}>{title}</div>
              <p style={{ fontSize: "12px", color: ASH, lineHeight: 1.65, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = "colors" | "type" | "icons";
const TABS: { id: Tab; label: string }[] = [
  { id: "colors", label: "Color Rules" },
  { id: "type",   label: "Typography" },
  { id: "icons",  label: "Icons" },
];

export default function BrandPage() {
  const [tab, setTab] = useState<Tab>("colors");
  return (
    <div style={{ minHeight: "100vh", background: "#080706", color: CREAM, fontFamily: "Inter, sans-serif", padding: "48px 32px" }}>

      <div style={{ maxWidth: "1100px", margin: "0 auto 48px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: "10px" }}>
          Purcell Ventures — Brand Identity
        </div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: CREAM, marginBottom: "12px" }}>
          Brand System
        </h1>

        <div style={{ display: "flex", borderBottom: `1px solid ${EMBER}`, marginTop: "32px" }}>
          {TABS.map(({ id, label }) => (
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

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {tab === "colors" && <ColorSection />}
        {tab === "type"   && <TypographySection />}
        {tab === "icons"  && <IconsSection />}
      </div>

      <div style={{ maxWidth: "1100px", margin: "64px auto 0", display: "flex", gap: "24px" }}>
        <a href="/logos"    style={{ fontSize: "13px", color: CHAR, textDecoration: "none" }}>← Logos</a>
        <a href="/patterns" style={{ fontSize: "13px", color: CHAR, textDecoration: "none" }}>← Patterns</a>
      </div>
    </div>
  );
}
