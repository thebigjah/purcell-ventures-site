import type { Metadata } from "next";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata: Metadata = {
  title: "Field Services have moved to Mantle",
  description:
    "Our gutter cleaning, pressure washing, and lawn care services are now run under Mantle Field Services. Same owner, same standards, new home.",
};

const MANTLE_URL = "https://mantle-field-site.vercel.app";

export default function ServicesMovedPage() {
  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 32px" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5, maxWidth: "680px", textAlign: "center" }}>
        <div className="pv-mono-label" style={{ marginBottom: "24px", display: "inline-flex", gap: "18px", alignItems: "center" }}>
          <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--color-warm-accent)" }}></span>
          Field Services have moved
          <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--color-warm-accent)" }}></span>
        </div>
        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
          fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 1, letterSpacing: "0.005em",
          color: "var(--color-warm-text)", margin: "0 0 28px",
        }}>
          Now <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Mantle Field Services.</em>
        </h1>
        <p className="pv-italic" style={{ fontSize: "19px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, marginBottom: "36px" }}>
          Our gutter cleaning, pressure washing, and lawn care work has spun off into its own brand. Same owner, same standards. Find us at the new home.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
          <a href={MANTLE_URL} className="pv-btn-primary">
            Visit Mantle Field →
          </a>
          <a href="tel:+12054627839" className="pv-btn-ghost">(205) 462-7839</a>
        </div>
        <p style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
          color: "var(--color-warm-text-light)",
        }}>
          A Purcell Ventures company · Acworth, GA
        </p>
      </div>
    </div>
  );
}
