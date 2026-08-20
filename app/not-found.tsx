import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-warm-bg)",
      color: "var(--color-warm-text)",
      position: "relative",
      overflowX: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "60px 36px",
    }}>
      <VignetteBackground />

      <div style={{ position: "relative", zIndex: 5, maxWidth: "560px", textAlign: "center" }}>
        {/* Big roman 404 */}
        <div style={{
          fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
          fontSize: "clamp(96px, 18vw, 200px)",
          lineHeight: 0.9, letterSpacing: "0.02em",
          color: "var(--color-warm-accent)", marginBottom: "20px",
        }}>
          CDIV
        </div>

        <div style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.32em", textTransform: "uppercase",
          color: "var(--color-warm-text-light)", marginBottom: "20px",
        }}>
          404, not found
        </div>

        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
          fontSize: "clamp(28px, 5vw, 44px)",
          lineHeight: 1.1, letterSpacing: "0.005em",
          color: "var(--color-warm-text)", margin: "0 0 20px",
          textTransform: "uppercase",
        }}>
          The page <em style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "var(--color-warm-accent)" }}>isn&apos;t here.</em>
        </h1>

        <p style={{
          fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: "18px", lineHeight: 1.55,
          color: "var(--color-warm-text)", opacity: 0.85,
          marginBottom: "40px",
        }}>
          Either it never was, or it moved. Either way, let&apos;s get you back to something useful.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="pv-btn-primary">← Home</Link>
          <Link href="/links" className="pv-btn-ghost">All links</Link>
          <a href="mailto:elijah@purcell-ventures.com" className="pv-btn-ghost">Email Elijah</a>
        </div>

        {/* Footer mono */}
        <div style={{
          marginTop: "56px",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
          color: "var(--color-warm-text-light)",
        }}>
          Purcell · Ventures · purcellventures.co
        </div>
      </div>
    </div>
  );
}
