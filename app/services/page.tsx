import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Services have moved to Mantle",
  description:
    "Our gutter cleaning, pressure washing, and lawn care services are now run under Mantle Field Services. Same owner, same standards, new home.",
};

// TODO: swap to https://mantlefield.com once domain is purchased
const MANTLE_URL = "https://mantle-field-site.vercel.app";

export default function ServicesMovedPage() {
  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 32px" }}>
      <div style={{ maxWidth: "640px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
          Field Services have moved
        </p>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--color-warm-text)", marginBottom: "28px" }}>
          Now <span style={{ color: "var(--color-warm-accent)" }}>Mantle Field Services</span>.
        </h1>
        <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "40px" }}>
          Our gutter cleaning, pressure washing, and lawn care work has spun off into its own brand: <strong style={{ color: "var(--color-warm-text)" }}>Mantle Field Services</strong>. Same owner, same standards. Find us at the new home.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
          <a href={MANTLE_URL} style={{ padding: "14px 28px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "6px", textDecoration: "none" }}>
            Visit Mantle Field Services →
          </a>
          <a href="tel:+17702805319" style={{ padding: "14px 28px", background: "none", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text)", fontSize: "14px", fontWeight: 600, borderRadius: "6px", textDecoration: "none" }}>
            (770) 280-5319
          </a>
        </div>
        <p style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>
          A Purcell Ventures company &middot; Acworth, GA
        </p>
      </div>
    </div>
  );
}
