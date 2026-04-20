"use client";

import LeadCaptureForm from "../components/LeadCaptureForm";

const SERVICES = [
  {
    name: "Gutter Cleaning & Inspection",
    icon: "🏠",
    desc: "Full debris removal from gutters and downspouts. We flush everything out, check for damage, and make sure water is flowing where it should.",
    details: [
      "Single-story and two-story homes",
      "Debris removal + downspout flush",
      "Visual damage inspection",
      "Before & after photos",
    ],
    price: "Starting at $100",
  },
  {
    name: "Pressure Washing",
    icon: "💧",
    desc: "Driveways, sidewalks, decks, patios, fences, siding — we bring the equipment and leave it looking like new.",
    details: [
      "Driveways & sidewalks",
      "Decks & patios",
      "House siding & fences",
      "Commercial surfaces",
    ],
    price: "Starting at $75",
  },
  {
    name: "Lawn Care",
    icon: "🌿",
    desc: "Mowing, edging, trimming, and cleanup. Weekly or bi-weekly service available. We show up on time and leave the yard clean.",
    details: [
      "Mowing & edging",
      "Weed eating & trimming",
      "Clipping cleanup",
      "Weekly or bi-weekly schedules",
    ],
    price: "Starting at $50",
  },
];

export default function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", fontFamily: "Inter, sans-serif" }}>

      {/* Nav */}
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--color-warm-border)" }}>
        <a href="/" style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-warm-text)", letterSpacing: "-0.01em", textDecoration: "none" }}>
          Purcell <span style={{ color: "var(--color-warm-accent)" }}>Ventures</span>
        </a>
        <a href="tel:+17702805319" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>
          (770) 280-5319
        </a>
      </nav>

      {/* Hero */}
      <section style={{ padding: "96px 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
          Field Services
        </p>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--color-warm-text)", marginBottom: "28px" }}>
          Professional.<br />
          <span style={{ color: "var(--color-warm-accent)" }}>Reliable. Local.</span>
        </h1>
        <p style={{ fontSize: "18px", color: "var(--color-warm-text-muted)", maxWidth: "500px", lineHeight: 1.75, marginBottom: "40px" }}>
          Gutters, pressure washing, and lawn care — owner-operated. You deal directly with Elijah, not a dispatcher or a crew you've never met.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="mailto:elijah@purcellventures.co?subject=Field Services Quote" style={{ padding: "14px 28px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "6px", textDecoration: "none" }}>
            Get a Free Quote
          </a>
          <a href="#services" style={{ padding: "14px 28px", background: "none", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", fontSize: "14px", fontWeight: 600, borderRadius: "6px", textDecoration: "none" }}>
            See Services
          </a>
        </div>
      </section>

      {/* Photo grid — replace src values with real photos */}
      <section style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "220px 220px", gap: "4px", borderRadius: "8px", overflow: "hidden" }}>
          {/* Main photo */}
          <div style={{ gridRow: "1 / 3", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "32px" }}>📸</span>
            <span style={{ fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center" }}>Replace with truck / team photo</span>
          </div>
          {[
            { label: "Gutter cleaning photo", emoji: "🏠" },
            { label: "Pressure washing photo", emoji: "💧" },
            { label: "Lawn care photo", emoji: "🌿" },
            { label: "Before & after", emoji: "✨" },
          ].map((p) => (
            <div key={p.label} style={{ background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "24px" }}>{p.emoji}</span>
              <span style={{ fontSize: "10px", color: "var(--color-warm-text-light)", textAlign: "center", padding: "0 8px" }}>{p.label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", textAlign: "center" }}>
          Add your own photos by replacing the placeholder divs in services/page.tsx with &lt;img&gt; tags
        </p>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "32px" }}>
          Services & Pricing
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-warm-border)" }}>
          {SERVICES.map((s) => (
            <div key={s.name} style={{ background: "var(--color-warm-bg)", padding: "32px 28px" }}>
              <div style={{ fontSize: "28px", marginBottom: "14px" }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "12px" }}>{s.name}</h3>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, marginBottom: "18px" }}>{s.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
                {s.details.map(d => (
                  <li key={d} style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "6px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--color-warm-accent)", flexShrink: 0 }}>—</span>
                    {d}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{s.price}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "var(--color-warm-text-light)", marginTop: "16px", textAlign: "center" }}>
          Prices vary by job size. All quotes are free and come with no obligation.
        </p>
      </section>

      {/* Why us */}
      <section style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "var(--color-warm-border)" }}>
          {[
            { label: "Owner-Operated", desc: "You deal with Elijah directly — not a call center, not a subcontractor." },
            { label: "Local", desc: "Owner-operated and community-focused. We're not a franchise passing through." },
            { label: "Reliable", desc: "We show up when we say we will. If something changes, you hear from us." },
            { label: "Clean Work", desc: "We clean up after ourselves. Every job ends with the property looking better than we found it." },
          ].map((item) => (
            <div key={item.label} style={{ background: "var(--color-warm-bg)", padding: "28px 24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-warm-accent)", marginBottom: "10px", letterSpacing: "0.04em" }}>{item.label}</div>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service area */}
      <section style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: "10px", padding: "36px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px" }}>Service Area</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>Metro Atlanta & Surrounding Areas</div>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)" }}>Kennesaw, Marietta, Acworth, Canton, Woodstock, and surrounding areas.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: "var(--color-warm-text-light)", marginBottom: "4px" }}>Not sure if we cover your area?</div>
            <a href="mailto:elijah@purcellventures.co" style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-warm-accent)", textDecoration: "none" }}>Just ask →</a>
          </div>
        </div>
      </section>

      {/* CTA + Lead Form */}
      <section style={{ padding: "0 32px 96px", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "16px" }}>
              Ready to get it done?
            </h2>
            <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", marginBottom: "28px", lineHeight: 1.75 }}>
              Free estimates. No pressure. Honest pricing and solid work — directly from Elijah, not a crew you've never met.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="tel:+17702805319" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--color-warm-accent)", textDecoration: "none", fontWeight: 600 }}>
                📞 (770) 280-5319
              </a>
              <a href="sms:+17702805319" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>
                💬 Text us
              </a>
            </div>
          </div>
          <LeadCaptureForm
            title="Get a Free Quote"
            subtitle="We'll respond within 24 hours. No obligation."
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>© {new Date().getFullYear()} Purcell Ventures LLC</span>
        <a href="/" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", textDecoration: "none" }}>← All Divisions</a>
      </footer>
    </div>
  );
}
