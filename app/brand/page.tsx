"use client";
import { useState } from "react";
import type { CSSProperties } from "react";

// Internal brand reference. Reads from the site's CSS variables so it cannot drift from the live palette.
// PAPER is the one literal colour: warm white for printed pages, which has no site token.
const PAPER = "#faf8f4";

const CSS = `
.br { min-height: 100vh; background: var(--bg); color: var(--fg); font-family: var(--font-body); padding: 40px 0 72px; }
.br h1, .br h2, .br h3 { font-family: var(--font-display); font-weight: 600; color: var(--fg); margin: 0; }
.br h1 { font-size: clamp(32px, 6vw, 44px); line-height: 1.1; letter-spacing: -0.01em; }
.br h2 { font-size: 22px; line-height: 1.2; margin-bottom: 8px; }
.br h3 { font-size: 17px; line-height: 1.3; margin-bottom: 6px; }
.br p { margin: 0; }
.br-head { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.br-head img { width: 56px; height: 56px; flex-shrink: 0; }
.br-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--line); margin: 28px 0 40px; overflow-x: auto; }
.br-tab { background: none; border: 0; border-bottom: 2px solid transparent; margin-bottom: -1px; color: var(--muted); font: 500 15px var(--font-body); padding: 0 18px; min-height: 44px; cursor: pointer; white-space: nowrap; }
.br-tab:hover { color: var(--fg); }
.br-tab[aria-selected="true"] { color: var(--gold-text); border-bottom-color: var(--gold-text); font-weight: 700; }
.br-lede { font-size: 15px; color: var(--muted); line-height: 1.65; max-width: 60ch; margin-bottom: 28px !important; }
.br-block { margin-bottom: 64px; }
.br-grid { display: grid; gap: 16px; }
.br-g-swatch { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
.br-g-fonts { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.br-g-subj { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.br-g-bad { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.br-g-rules { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.br-g-usage { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.br-card { border: 1px solid var(--line); overflow: hidden; background: var(--surface); }
.br-card__body { padding: 14px 16px; }
.br-card__foot { padding: 14px 20px; border-top: 1px solid var(--line); background: var(--surface); }
.br-small { font-size: 13px; line-height: 1.6; color: var(--muted); }
.br-tiny { font-size: 12px; line-height: 1.55; color: var(--subtle); }
.br-gold { color: var(--gold-text); font-weight: 600; font-size: 13px; }
.br-chip { display: inline-block; font-size: 12px; padding: 3px 8px; border: 1px solid var(--line); color: var(--subtle); }
.br-demo { padding: 28px 24px; }
.br-btn { display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px; border: 1px solid; font: 600 14px var(--font-body); }
.br-ctl { background: none; border: 1px solid var(--line); color: var(--muted); font: 500 13px var(--font-body); min-height: 44px; min-width: 44px; padding: 0 12px; cursor: pointer; }
.br-ctl:hover { color: var(--fg); border-color: var(--subtle); }
.br-ctl[aria-pressed="true"] { border-color: var(--gold-text); color: var(--gold-text); background: var(--surface-2); }
.br-type { border: 1px solid var(--line); }
.br-type__row { display: grid; grid-template-columns: 120px minmax(0, 1fr) 190px; gap: 16px; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--line); }
.br-type__row:nth-child(odd) { background: var(--surface); }
.br-type__row:last-child { border-bottom: 0; }
.br-type__sample { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.br-type__spec { text-align: right; }
.br-grade { display: grid; grid-template-columns: 150px 70px 1fr; gap: 16px; align-items: center; padding: 13px 24px; border-bottom: 1px solid var(--line); }
.br-grade:last-child { border-bottom: 0; }
.br-grade:nth-child(odd) { background: var(--surface); }
.br-bad { border: 1px solid color-mix(in srgb, var(--danger) 45%, var(--bg)); background: color-mix(in srgb, var(--danger) 8%, var(--bg)); }
.br-bad p { color: var(--danger); font-size: 14px; line-height: 1.6; padding: 14px 16px; }
.br-list { margin: 0 0 18px; padding-left: 18px; }
.br-list li { font-size: 14px; line-height: 1.65; margin-bottom: 4px; color: var(--fg-2); }
.br-list--avoid li { color: var(--muted); }
.br-ratios { display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-end; }
.br-foot { display: flex; gap: 8px; margin-top: 64px; }
.br-foot a { color: var(--gold-text); text-decoration: underline; text-underline-offset: 3px; min-height: 44px; display: inline-flex; align-items: center; padding-right: 16px; font-size: 15px; }
.br-icon-card { border: 1px solid var(--line); overflow: hidden; }
.br-icon-card[data-copied="true"] { border-color: var(--gold-text); }
.br-icon-stage { height: 100px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--line); }
.br-icon-meta { padding: 10px 12px; background: var(--surface); }
@media (max-width: 860px) {
  .br-type__row { grid-template-columns: 1fr; gap: 6px; padding: 14px 16px; }
  .br-type__spec { text-align: left; }
  .br-grade { grid-template-columns: 1fr auto; padding: 12px 16px; }
  .br-grade > :last-child { grid-column: 1 / -1; }
}
`;

function Intro({ children }: { children: React.ReactNode }) {
  return <p className="br-lede">{children}</p>;
}

// ─── Colour system ────────────────────────────────────────────────────────────

const PALETTE = [
  { name: "Night", hex: "#07060a", rgb: "7, 6, 10", role: "Primary background", token: "--bg", swatch: "var(--bg)", on: "var(--fg)", usage: "The default background for every brand surface. Near-black with a faint violet-brown cast, so it reads warmer than pure black." },
  { name: "Surface", hex: "#100e0c", rgb: "16, 14, 12", role: "Panels and cards", token: "--surface", swatch: "var(--surface)", on: "var(--fg)", usage: "One step above Night. Panels, tables and form fields sit here. Surface 2 (#171411) is the step above that, for hover and selected states." },
  { name: "Line", hex: "#2a251e", rgb: "42, 37, 30", role: "Borders and dividers", token: "--line", swatch: "var(--line)", on: "var(--fg)", usage: "Every border and divider. Never used as a text colour." },
  { name: "Cream", hex: "#efe8d8", rgb: "239, 232, 216", role: "Primary text on dark", token: "--fg", swatch: "var(--fg)", on: "var(--bg)", usage: "Headings and body text on dark. Cream text never goes on white. On light paper, use Night for text." },
  { name: "Muted", hex: "#a69d8b", rgb: "166, 157, 139", role: "Secondary text", token: "--muted", swatch: "var(--muted)", on: "var(--bg)", usage: "Descriptions and supporting copy that sits behind the cream text. Subtle (#8a8270) is the quietest readable level, for fine print and metadata." },
  { name: "Gold", hex: "#b8862b", rgb: "184, 134, 43", role: "Brand accent, fills", token: "--gold", swatch: "var(--gold)", on: "var(--bg)", usage: "Buttons, rules, the mark and other filled shapes. Night text goes on gold fills. Gold deep (#6b4e1a) is the shadow end of the foil." },
  { name: "Gold text", hex: "#e3bd6a", rgb: "227, 189, 106", role: "Accent text on dark", token: "--gold-text", swatch: "var(--gold-text)", on: "var(--bg)", usage: "Links, prices and highlights set as text on dark. It is a lighter gold than the fill so it passes contrast. Use it for short phrases, never for paragraphs." },
];

const COMBOS = [
  { label: "Default, for screens and dark stock", bg: "var(--bg)", text: "var(--fg)", accent: "var(--gold-text)", rule: "The baseline for every surface. Gold is for accents and the mark only.", context: "Website, dark business cards, dark stationery, presentations" },
  { label: "Gold background", bg: "var(--gold)", text: "var(--bg)", accent: "var(--bg)", rule: "Gold as a background works for short content: a card back, a banner or a pull quote. Never for paragraphs.", context: "Card accents, pull quotes, pricing highlights, call-to-action banners" },
  { label: "Cream stock, printed", bg: "var(--fg)", text: "var(--bg)", accent: "var(--gold-deep)", rule: "Night text with deep-gold accents on cream stock.", context: "Letterhead, printed proposals, brand book pages" },
  { label: "White paper and standard PDFs", bg: PAPER, text: "var(--bg)", accent: "var(--gold-deep)", rule: "When the page has to be light, use warm white instead of pure white. Night text, deep-gold accents, Line for borders.", context: "Standard PDFs, printed emails, white-stock invoices, the printed résumé" },
];

const FORBIDDEN = [
  { bg: PAPER, text: "var(--fg)", label: "Cream on white. The text disappears." },
  { bg: "var(--bg)", text: "var(--gold)", label: "Fill gold as body text on dark. It is too dim. Use Cream for prose, and Gold text only for short phrases." },
  { bg: "var(--gold)", text: "var(--fg)", label: "Cream on gold. It washes out. Only Night goes on gold." },
  { bg: "var(--surface)", text: "var(--line)", label: "Line colour as text. It is invisible, and it is for borders." },
];

function ColorSection() {
  return (
    <div>
      <div className="br-block">
        <h2>Named palette</h2>
        <Intro>Seven colours. Each is a CSS variable in globals.css, and every brand decision draws from this set.</Intro>
        <div className="br-grid br-g-swatch">
          {PALETTE.map(c => (
            <div key={c.name} className="br-card">
              <div style={{ background: c.swatch, height: 80, display: "flex", alignItems: "flex-end", padding: "10px 16px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: c.on }}>{c.name}</span>
              </div>
              <div className="br-card__body">
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
                  <span className="br-gold">{c.hex}</span>
                  <span className="br-tiny">RGB {c.rgb}</span>
                  <span className="br-tiny">var({c.token})</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-2)", marginBottom: 6 }}>{c.role}</p>
                <p className="br-small">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="br-block">
        <h2>Approved combinations</h2>
        <Intro>Four approved pairings, each at scale with sample content.</Intro>
        <div className="br-grid">
          {COMBOS.map(combo => (
            <div key={combo.label} className="br-card">
              <div className="br-demo" style={{ background: combo.bg }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: combo.accent, marginBottom: 8 }}>Purcell Ventures</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: combo.text, marginBottom: 8, lineHeight: 1.2 }}>Sample heading</p>
                <p style={{ fontSize: 15, color: combo.text, opacity: 0.8, lineHeight: 1.7, marginBottom: 16, maxWidth: "46ch" }}>
                  Body copy showing how text reads on this background. It shows line length, weight and colour in this pairing.
                </p>
                <span className="br-btn" style={{ borderColor: combo.accent, color: combo.accent }}>Action</span>
              </div>
              <div className="br-card__foot">
                <p className="br-gold" style={{ marginBottom: 4 }}>{combo.label}</p>
                <p className="br-small" style={{ marginBottom: 4 }}>{combo.rule}</p>
                <p className="br-tiny">{combo.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Combinations not approved</h2>
        <Intro>None of these is allowed anywhere.</Intro>
        <div className="br-grid br-g-bad">
          {FORBIDDEN.map(f => (
            <div key={f.label} className="br-bad">
              <div style={{ background: f.bg, padding: 20 }}>
                <span style={{ color: f.text, fontSize: 16, fontWeight: 600 }}>Sample text</span>
              </div>
              <p>{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

const TYPE_SCALE = [
  { name: "Hero", size: "clamp(44px, 7vw, 72px)", weight: 600, font: "display", ls: "-0.02em", lh: 1.05, use: "Page titles and brand moments" },
  { name: "H1", size: "clamp(32px, 5vw, 52px)", weight: 600, font: "display", ls: "-0.02em", lh: 1.1, use: "Section heroes and major headings" },
  { name: "H2", size: "22px", weight: 600, font: "display", ls: "-0.01em", lh: 1.2, use: "Section headings" },
  { name: "H3", size: "17px", weight: 600, font: "display", ls: "0em", lh: 1.35, use: "Card titles and subsections" },
  { name: "Body large", size: "18px", weight: 400, font: "body", ls: "0em", lh: 1.75, use: "Lead paragraphs and intros" },
  { name: "Body", size: "16px", weight: 400, font: "body", ls: "0em", lh: 1.85, use: "Standard prose" },
  { name: "Body small", size: "14px", weight: 400, font: "body", ls: "0em", lh: 1.7, use: "Card descriptions and secondary prose" },
  { name: "Label", size: "13px", weight: 700, font: "body", ls: "0em", lh: 1.4, use: "Category labels and field labels, in sentence case" },
  { name: "Caption", size: "12px", weight: 400, font: "body", ls: "0.01em", lh: 1.6, use: "Footnotes, timestamps and metadata" },
  { name: "UI", size: "14px", weight: 600, font: "body", ls: "0em", lh: 1.4, use: "Buttons, navigation links and form labels" },
];

function TypographySection() {
  return (
    <div>
      <div className="br-block">
        <h2>Font families</h2>
        <Intro>Two fonts with two jobs. Neither does the other&apos;s work.</Intro>
        <div className="br-grid br-g-fonts">
          {[
            {
              name: "Clash Display", role: "Display, headings and the wordmark",
              weights: ["500 Medium", "600 Semibold", "700 Bold"],
              note: "A sharp, high-contrast display face. It sets the mark, the wordmark, page titles and section headings. It does not set body copy or interface text.",
              sample: "Purcell Ventures", sampleFont: "var(--font-display)", sampleSize: "30px",
            },
            {
              name: "Satoshi", role: "Body, interface and small text",
              weights: ["400 Regular", "500 Medium", "700 Bold"],
              note: "A clean geometric sans that stays readable at small sizes. It sets paragraphs, buttons, navigation, form labels and every functional piece of text.",
              sample: "Built for the people who work hardest.", sampleFont: "var(--font-body)", sampleSize: "20px",
            },
          ].map(f => (
            <div key={f.name} className="br-card">
              <div style={{ padding: 24, borderBottom: "1px solid var(--line)" }}>
                <div style={{ fontSize: f.sampleSize, fontFamily: f.sampleFont, fontWeight: 600, color: "var(--fg)", marginBottom: 16, lineHeight: 1.2 }}>{f.sample}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {f.weights.map(w => <span key={w} className="br-chip">{w}</span>)}
                </div>
              </div>
              <div className="br-card__body">
                <div style={{ fontSize: 17, fontWeight: 600, fontFamily: "var(--font-display)", color: "var(--gold-text)", marginBottom: 4 }}>{f.name}</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-2)", marginBottom: 8 }}>{f.role}</p>
                <p className="br-small">{f.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="br-block">
        <h2>Type scale</h2>
        <Intro>Ten levels. Every size on the site maps to one of these, so intermediate sizes are not invented.</Intro>
        <div className="br-type">
          {TYPE_SCALE.map(t => (
            <div key={t.name} className="br-type__row">
              <div>
                <div className="br-gold">{t.name}</div>
                <div className="br-tiny">{t.font === "display" ? "Clash Display" : "Satoshi"}, {t.weight}</div>
              </div>
              <div className="br-type__sample" style={{
                fontSize: t.size,
                fontFamily: t.font === "display" ? "var(--font-display)" : "var(--font-body)",
                fontWeight: t.weight, color: "var(--fg)", letterSpacing: t.ls, lineHeight: t.lh,
              }}>
                {t.use}
              </div>
              <div className="br-type__spec">
                <div className="br-small">{t.size}</div>
                <div className="br-tiny">tracking {t.ls}, leading {t.lh}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Applied to a sample</h2>
        <Intro>The scale on a content block, showing how the two fonts work together.</Intro>
        <div className="br-card" style={{ padding: "36px 28px", maxWidth: 680, background: "var(--bg)" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--gold-text)", marginBottom: 14 }}>Digital services</p>
          <h2 style={{ fontSize: "clamp(26px, 5vw, 36px)", marginBottom: 20, lineHeight: 1.15 }}>Everything your business needs to operate online.</h2>
          <p style={{ fontSize: 18, color: "var(--fg)", opacity: 0.85, lineHeight: 1.75, marginBottom: 16 }}>
            A website, an AI chatbot, a booking system, a CRM and more, on one managed subscription.
          </p>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 28 }}>
            Most small business software is priced for larger companies. These tools are priced for a small business.
          </p>
          <span className="br-btn" style={{ borderColor: "var(--gold-text)", color: "var(--gold-text)" }}>See plans</span>
        </div>
      </div>
    </div>
  );
}

// ─── Icon system ──────────────────────────────────────────────────────────────

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
    description: "Websites and digital add-ons.",
    svgContent: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2c-3 4-4.5 7-4.5 10s1.5 6 4.5 10"/><path d="M12 2c3 4 4.5 7 4.5 10s-1.5 6-4.5 10"/>`,
  },
  {
    key: "neural",
    name: "Neural",
    category: "brand",
    description: "AI consulting, drawn as a network of connected nodes.",
    svgContent: `<line x1="12" y1="12" x2="12" y2="5"/><line x1="12" y1="12" x2="18.7" y2="9.8"/><line x1="12" y1="12" x2="16.1" y2="17.7"/><line x1="12" y1="12" x2="7.9" y2="17.7"/><line x1="12" y1="12" x2="5.3" y2="9.8"/><polyline points="12,5 18.7,9.8 16.1,17.7 7.9,17.7 5.3,9.8 12,5"/><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="18.7" cy="9.8" r="1.5" fill="currentColor" stroke="none"/><circle cx="16.1" cy="17.7" r="1.5" fill="currentColor" stroke="none"/><circle cx="7.9" cy="17.7" r="1.5" fill="currentColor" stroke="none"/><circle cx="5.3" cy="9.8" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>`,
  },
  {
    key: "terminal",
    name: "Terminal",
    category: "brand",
    description: "Custom software.",
    svgContent: `<polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/><line x1="14.5" y1="5" x2="9.5" y2="19"/>`,
  },
  {
    key: "droplet",
    name: "Droplet",
    category: "brand",
    description: "Mantle Field Services: pressure washing, gutters and exterior care.",
    svgContent: `<path d="M12 3 C8 7 6 10 6 13 a6 6 0 0 1 12 0 C18 10 16 7 12 3"/>`,
  },
  {
    key: "eye",
    name: "Eye",
    category: "brand",
    description: "Transparency and accountability in the work.",
    svgContent: `<path d="M1 12s4.5-8 11-8 11 8 11 8-4.5 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>`,
  },
  {
    key: "layers",
    name: "Layers",
    category: "brand",
    description: "The divisions under one mark.",
    svgContent: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
  },

  // ── UI icons ─────────────────────────────────────────────────────────────
  {
    key: "arrow-right",
    name: "Arrow right",
    category: "ui",
    description: "Forward navigation and calls to action.",
    svgContent: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  },
  {
    key: "arrow-left",
    name: "Arrow left",
    category: "ui",
    description: "Back navigation.",
    svgContent: `<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>`,
  },
  {
    key: "arrow-up",
    name: "Arrow up",
    category: "ui",
    description: "Back to top and upload.",
    svgContent: `<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>`,
  },
  {
    key: "external",
    name: "External link",
    category: "ui",
    description: "Opens in new tab.",
    svgContent: `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`,
  },
  {
    key: "menu",
    name: "Menu",
    category: "ui",
    description: "Opens the navigation.",
    svgContent: `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`,
  },
  {
    key: "close",
    name: "Close",
    category: "ui",
    description: "Dismiss, clear and cancel.",
    svgContent: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
  },
  {
    key: "check",
    name: "Check",
    category: "ui",
    description: "Confirm, success and done.",
    svgContent: `<polyline points="20 6 9 17 4 12"/>`,
  },
  {
    key: "mail",
    name: "Mail",
    category: "ui",
    description: "Email, contact and message.",
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
    description: "Location and service area.",
    svgContent: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`,
  },
  {
    key: "download",
    name: "Download",
    category: "ui",
    description: "Save a file and export.",
    svgContent: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
  },
  {
    key: "copy",
    name: "Copy",
    category: "ui",
    description: "Duplicate and clipboard.",
    svgContent: `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`,
  },
  {
    key: "info",
    name: "Info",
    category: "ui",
    description: "Help, tooltip and detail.",
    svgContent: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`,
  },
];

const ICON_SIZES = [16, 20, 24, 32, 48];

function IconsSection() {
  const [size, setSize] = useState(24);
  const [mode, setMode] = useState<"dark" | "gold" | "light">("dark");
  const [copied, setCopied] = useState<string | null>(null);

  const iconColor = mode === "dark" ? "var(--fg)" : mode === "gold" ? "var(--gold-text)" : "var(--bg)";
  const previewBg = mode === "light" ? PAPER : "var(--bg)";

  function copyIcon(icon: IconDef) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon.svgContent}</svg>`;
    navigator.clipboard.writeText(svg);
    setCopied(icon.key);
    setTimeout(() => setCopied(null), 1500);
  }

  const brandIcons = ICONS.filter(i => i.category === "brand");
  const uiIcons = ICONS.filter(i => i.category === "ui");

  function renderGrid(icons: IconDef[], min: number) {
    const style: CSSProperties = { gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: 12 };
    return (
      <div className="br-grid" style={style}>
        {icons.map(icon => (
          <div key={icon.key} className="br-icon-card" data-copied={copied === icon.key}>
            <div className="br-icon-stage" style={{ background: previewBg }}>
              <svg
                width={size} height={size} viewBox="0 0 24 24" fill="none"
                stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: icon.svgContent }}
              />
            </div>
            <div className="br-icon-meta">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: icon.category === "brand" ? 5 : 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg)" }}>{icon.name}</span>
                <button className="br-ctl" aria-pressed={copied === icon.key} onClick={() => copyIcon(icon)}>
                  {copied === icon.key ? "Copied" : "Copy SVG"}
                </button>
              </div>
              {icon.category === "brand" && <p className="br-tiny">{icon.description}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Custom icon set</h2>
      <Intro>
        19 icons drawn on a 24 by 24 grid. All are stroke-based at 1.5px with round joins and caps. Six brand icons tie to the company&apos;s divisions and 13 interface icons cover navigation and forms.
      </Intro>

      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginBottom: 40 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span className="br-small" style={{ marginRight: 4 }}>Size</span>
          {ICON_SIZES.map(s => (
            <button key={s} className="br-ctl" aria-pressed={size === s} onClick={() => setSize(s)}>{s}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span className="br-small" style={{ marginRight: 4 }}>Mode</span>
          {(["dark", "gold", "light"] as const).map(m => (
            <button key={m} className="br-ctl" aria-pressed={mode === m} onClick={() => setMode(m)} style={{ textTransform: "capitalize" }}>{m}</button>
          ))}
        </div>
      </div>

      <h3>Brand icons</h3>
      <p className="br-small" style={{ marginBottom: 20 }}>Division marks and concept icons, for service rows, section headers and identity materials.</p>
      <div style={{ marginBottom: 48 }}>{renderGrid(brandIcons, 190)}</div>

      <h3>Interface icons</h3>
      <p className="br-small" style={{ marginBottom: 20 }}>Navigation and form icons at the same stroke weight. Do not mix them with another icon family.</p>
      {renderGrid(uiIcons, 150)}

      <div className="br-card" style={{ marginTop: 56, padding: "28px 24px" }}>
        <h3 style={{ marginBottom: 16 }}>Usage rules</h3>
        <div className="br-grid br-g-usage">
          {[
            ["Stroke only", "Icons are never filled. The 1.5px stroke is the identity, and filled versions look wrong beside the mark."],
            ["Colour", "Cream on Night by default. Gold text colour only for highlighted or active states. Icons are never Muted or Subtle."],
            ["Minimum size", "16px on screen. Below that, simplify the icon or use a label. The neural and eye icons lose detail first."],
            ["Spacing", "Leave at least 4px between an icon and adjacent text. At 24px, pair it with type of 14px or larger."],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="br-gold" style={{ marginBottom: 6 }}>{title}</p>
              <p className="br-small">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Photo style ──────────────────────────────────────────────────────────────

const GRADING = [
  { param: "Temperature", value: "+15", note: "Push toward amber. Never neutral or cool." },
  { param: "Tint", value: "+5", note: "A slight magenta warmth. Avoid a green cast." },
  { param: "Exposure", value: "−0.3", note: "Slightly underexposed for richness. Do not clip highlights." },
  { param: "Highlights", value: "−30", note: "Protect against blow-out. Keep sky and skin detail." },
  { param: "Shadows", value: "+10", note: "Lift slightly. Shadows read as warm brown, not black." },
  { param: "Whites", value: "−20", note: "Pull back, so clinical white stays out of the frame." },
  { param: "Blacks", value: "+5", note: "Never crush to pure black. Match Night (#07060a)." },
  { param: "Clarity", value: "+10", note: "Subtle micro-contrast. More on tools and texture, less on faces." },
  { param: "Vibrance", value: "−15", note: "Mute colours without removing them. Earthy tones stay present." },
  { param: "Saturation", value: "−10", note: "A second pass of muting, so no colour dominates." },
];

const SUBJECTS = [
  {
    category: "People and portraits",
    do: [
      "Direct eye contact or a purposeful gaze",
      "Natural or soft window light, with hard shadows on one side if needed",
      "Candid over posed: mid-movement, mid-conversation, working",
      "Working environments: a desk, a truck cab, a job site",
    ],
    avoid: [
      "Stock-photo smiles, teeth, staged handshakes and team-building body language",
      "Pure white or seamless studio backgrounds",
      "Over-retouched skin",
      "Formal attire unless the context calls for it",
    ],
  },
  {
    category: "Field work",
    do: [
      "The work itself: spray hitting a surface, gutters mid-clean, equipment in motion",
      "Before and after pairs, since the change is the story",
      "Close-up texture: grime, water beads, clean concrete",
      "Golden hour light where possible",
    ],
    avoid: [
      "Cluttered staging, or safety gear added for the photo",
      "Flat overcast light with no direction",
      "Posed look-at-the-camera shots mid-job",
      "Editing that makes the job site look glamorous. Authenticity matters more.",
    ],
  },
  {
    category: "Technology and workspace",
    do: [
      "Screens showing interfaces, data and work in progress",
      "Shallow depth of field, used on purpose",
      "Warm ambient light: a desk lamp, window light at dusk",
      "Context over equipment. What is being built matters more than the gear.",
    ],
    avoid: [
      "Generic laptop-on-a-table stock photos",
      "Glowing blue screens in dark rooms, which read as cold",
      "Cables everywhere for atmosphere",
      "Staged thinking poses, such as a hand on the chin",
    ],
  },
  {
    category: "Environment and context",
    do: [
      "Georgia landscape: red clay, green hills, suburban neighborhoods",
      "Architecture in warm light: brick, wood, weathered surfaces",
      "Empty spaces that feel lived in: a workshop, a driveway, a kitchen",
      "Wide establishing shots for location-specific work",
    ],
    avoid: [
      "Skylines that read as any large city",
      "Nature photography with no human element, since this is not a travel brand",
      "Cold industrial spaces with no warmth",
      "Anything aspirational for its own sake",
    ],
  },
];

const warm = (pct: number, base: string) => `color-mix(in srgb, var(--gold) ${pct}%, ${base})`;

const OVERLAYS = [
  {
    label: "Standard dark overlay",
    rule: "The default for hero and card images with text. Night at 72% opacity.",
    bg: `linear-gradient(135deg, ${warm(30, "var(--bg)")} 0%, ${warm(8, "var(--bg)")} 100%)`,
    overlay: "color-mix(in srgb, var(--bg) 72%, transparent)",
    heading: "Gutters cleaned right",
    sub: "Metro Atlanta service area",
  },
  {
    label: "Heavy overlay for body copy",
    rule: "For body copy over an image, which needs more coverage to stay readable. Night at 85%.",
    bg: `linear-gradient(135deg, ${warm(36, "var(--bg)")} 0%, var(--bg) 100%)`,
    overlay: "color-mix(in srgb, var(--bg) 85%, transparent)",
    heading: "Custom software",
    sub: "Built around your workflow.",
  },
  {
    label: "Bottom-anchored gradient",
    rule: "For text at the bottom of an image. A gradient from transparent to Night.",
    bg: `linear-gradient(160deg, ${warm(40, "var(--bg)")} 0%, ${warm(14, "var(--bg)")} 100%)`,
    overlay: "linear-gradient(to top, color-mix(in srgb, var(--bg) 95%, transparent) 0%, color-mix(in srgb, var(--bg) 40%, transparent) 50%, transparent 100%)",
    heading: "Mantle Field Services",
    sub: "Owner-operated.",
  },
];

const TONES = [
  { label: "Shadow floor", pct: 10, note: "Darkest allowed" },
  { label: "Deep warm", pct: 18, note: "Card backgrounds" },
  { label: "Midtone amber", pct: 40, note: "Ideal shadow range" },
  { label: "Warm highlight", pct: 70, note: "Highlight ceiling" },
  { label: "Hot limit", pct: 95, note: "Never exceed this" },
];

const RATIOS = [
  { name: "Hero", ratio: "16:9", w: 320, h: 180, use: "Page banners and section headers with full-bleed images" },
  { name: "Wide hero", ratio: "21:9", w: 320, h: 137, use: "Landing page heroes. Crop tightly." },
  { name: "Card", ratio: "4:3", w: 240, h: 180, use: "Service rows, blog thumbnails and case study covers" },
  { name: "Portrait", ratio: "4:5", w: 192, h: 240, use: "Team photos and person-centered social content" },
  { name: "Square", ratio: "1:1", w: 200, h: 200, use: "Profile photos, social avatars and icon-scale thumbnails" },
];

function PhotoSection() {
  return (
    <div>
      <div className="br-block">
        <h2>Tone reference</h2>
        <Intro>
          All brand photography sits in the warm-dark range. These swatches show the acceptable tonal spectrum, from rich shadow to warm highlight. Nothing cooler than the middle swatch and nothing brighter than the fourth.
        </Intro>
        <div className="br-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
          {TONES.map(s => (
            <div key={s.label} className="br-card">
              <div style={{ background: `linear-gradient(160deg, ${warm(s.pct, "var(--bg)")} 0%, ${warm(Math.round(s.pct * 0.6), "var(--bg)")} 100%)`, height: 80 }} />
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", marginBottom: 2 }}>{s.label}</div>
                <div className="br-tiny">{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="br-block">
        <h2>Colour grading</h2>
        <Intro>The starting point for any photo entering brand materials, in Lightroom, Capture One or similar. These are relative adjustments from the photo&apos;s neutral edit.</Intro>
        <div className="br-type">
          {GRADING.map(g => (
            <div key={g.param} className="br-grade">
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>{g.param}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--gold-text)" }}>{g.value}</div>
              <div className="br-small">{g.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="br-block">
        <h2>Subject guidelines</h2>
        <Intro>Four categories cover every context where the brand uses photography. Each has a do list and an avoid list. The avoid list matters more.</Intro>
        <div className="br-grid br-g-subj">
          {SUBJECTS.map(s => (
            <div key={s.category} className="br-card">
              <div className="br-card__body" style={{ borderBottom: "1px solid var(--line)" }}>
                <h3 style={{ marginBottom: 0 }}>{s.category}</h3>
              </div>
              <div style={{ padding: "16px 20px", background: "var(--bg)" }}>
                <p className="br-gold" style={{ marginBottom: 10 }}>Do</p>
                <ul className="br-list">{s.do.map(d => <li key={d}>{d}</li>)}</ul>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--danger)", marginBottom: 10 }}>Avoid</p>
                <ul className="br-list br-list--avoid" style={{ marginBottom: 0 }}>{s.avoid.map(a => <li key={a}>{a}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="br-block">
        <h2>Overlay system</h2>
        <Intro>Three approved overlays for text over an image. The gradients below stand in for the photo, so the overlay treatment is what to read. Text never goes on an unprocessed photo without one of these.</Intro>
        <div className="br-grid">
          {OVERLAYS.map(ov => (
            <div key={ov.label} className="br-card">
              <div style={{ position: "relative", background: ov.bg, minHeight: 140 }}>
                <div style={{ position: "absolute", inset: 0, background: ov.overlay }} />
                <div style={{ position: "relative", padding: "24px 20px", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--fg)", marginBottom: 6 }}>{ov.heading}</div>
                  <div style={{ fontSize: 15, color: "var(--muted)" }}>{ov.sub}</div>
                </div>
              </div>
              <div className="br-card__foot">
                <p className="br-gold" style={{ marginBottom: 3 }}>{ov.label}</p>
                <p className="br-small">{ov.rule}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="br-block">
        <h2>Aspect ratios</h2>
        <Intro>Five ratios cover every use. When cropping, favor the subject over extra context, since a tight crop reads more confidently than a loose one.</Intro>
        <div className="br-ratios">
          {RATIOS.map(r => (
            <div key={r.name} style={{ maxWidth: "100%" }}>
              <div style={{
                width: r.w / 2, height: r.h / 2, maxWidth: "100%",
                background: "linear-gradient(135deg, var(--line) 0%, var(--surface) 100%)",
                border: "1px solid var(--subtle)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gold-text)" }}>{r.ratio}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg)", marginBottom: 3 }}>{r.name}</div>
              <div className="br-tiny" style={{ maxWidth: Math.max(r.w / 2, 150) }}>{r.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Hard rules</h2>
        <Intro>These are not negotiable.</Intro>
        <div className="br-grid br-g-rules">
          {[
            "No pure white or cool-gray backgrounds anywhere in brand photography.",
            "No photos with blue-tinted shadows. Shadows read warm.",
            "No stock-photo people. Every face in brand materials is real and known.",
            "No named filters such as Instagram presets, VSCO packs or influencer Lightroom presets. Derive the look from the grading table.",
            "No photography that would look at home on a Fortune 500 corporate site.",
            "No mixing photo styles in one layout. Match the grading before publishing.",
          ].map(rule => (
            <div key={rule} className="br-bad"><p>{rule}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = "colors" | "type" | "icons" | "photo";
const TABS: { id: Tab; label: string }[] = [
  { id: "colors", label: "Colour rules" },
  { id: "type", label: "Typography" },
  { id: "icons", label: "Icons" },
  { id: "photo", label: "Photo style" },
];

export default function BrandPage() {
  const [tab, setTab] = useState<Tab>("colors");
  return (
    <main className="br">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ui-wrap">
        <div className="br-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-foil.svg" alt="Purcell Ventures mark" width={56} height={56} />
          <div>
            <p className="br-small">Purcell Ventures brand identity</p>
            <h1>Brand system</h1>
          </div>
        </div>

        <div className="br-tabs" role="tablist">
          {TABS.map(({ id, label }) => (
            <button key={id} role="tab" aria-selected={tab === id} className="br-tab" onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        {tab === "colors" && <ColorSection />}
        {tab === "type" && <TypographySection />}
        {tab === "icons" && <IconsSection />}
        {tab === "photo" && <PhotoSection />}

        <div className="br-foot">
          <a href="/logos">Logos</a>
          <a href="/patterns">Patterns</a>
        </div>
      </div>
    </main>
  );
}
