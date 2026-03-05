"use client";

const DIVISIONS = [
  {
    slug: "digital",
    label: "Digital Services",
    tagline: "Websites, AI, booking, CRM — fully managed for local businesses.",
    status: "live" as const,
    href: "/digital",
  },
  {
    slug: "consulting",
    label: "AI Consulting",
    tagline: "Workshops and 1-on-1 sessions teaching businesses to work smarter with AI.",
    status: "live" as const,
    href: "/consulting",
  },
  {
    slug: "software",
    label: "Custom Software",
    tagline: "Mobile apps, web platforms, and AI tools built for your actual problem.",
    status: "live" as const,
    href: "/software",
  },
  {
    slug: "services",
    label: "Field Services",
    tagline: "Gutters, pressure washing, lawn care. Professional, reliable, local.",
    status: "live" as const,
    href: "/services",
  },
  {
    slug: "realestate",
    label: "Real Estate",
    tagline: "Wholesale real estate — finding off-market deals for investors.",
    status: "coming" as const,
    href: null,
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", display: "flex", flexDirection: "column" }}>

      {/* Nav */}
      <nav style={{
        padding: "0 32px", height: "60px", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid var(--color-warm-border)",
      }}>
        <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-warm-text)", letterSpacing: "-0.01em" }}>
          Purcell <span style={{ color: "var(--color-warm-accent)" }}>Ventures</span>
        </span>
        <a href="mailto:elijah@purcellventures.co" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>
          elijah@purcellventures.co
        </a>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 32px", maxWidth: "960px", margin: "0 auto", width: "100%" }}>

        {/* Eyebrow */}
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
          Purcell Ventures LLC — Georgia
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700,
          lineHeight: 1.02, letterSpacing: "-0.02em",
          color: "var(--color-warm-text)", marginBottom: "24px",
        }}>
          Built to last.<br />
          <span style={{ color: "var(--color-warm-accent)" }}>Built to grow.</span>
        </h1>

        <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", maxWidth: "480px", lineHeight: 1.75, marginBottom: "72px" }}>
          Purcell Ventures is a multi-division company founded by Elijah Purcell.
          We build software, serve local communities, and invest in real estate.
        </p>

        {/* Divisions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--color-warm-border)" }}>
          {DIVISIONS.map((div) => (
            <div key={div.slug} style={{
              background: "var(--color-warm-bg)",
              padding: "32px 28px",
              position: "relative",
              transition: "background 0.15s",
            }}
              onMouseEnter={(e) => {
                if (div.status === "live") e.currentTarget.style.background = "var(--color-warm-card)";
              }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-warm-bg)"; }}
            >
              {/* Status badge */}
              <div style={{ marginBottom: "16px" }}>
                {div.status === "live" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-warm-accent)", display: "inline-block" }} />
                    Live
                  </span>
                ) : (
                  <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-warm-text-light)" }}>
                    Coming Soon
                  </span>
                )}
              </div>

              <h2 style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: "26px", fontWeight: 600, marginBottom: "10px",
                color: div.status === "live" ? "var(--color-warm-text)" : "var(--color-warm-text-muted)",
              }}>
                {div.label}
              </h2>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, marginBottom: "24px" }}>
                {div.tagline}
              </p>

              {div.status === "live" && div.href ? (
                <a href={div.href} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: 600, color: "var(--color-warm-accent)",
                  textDecoration: "none",
                }}>
                  View Services <span style={{ fontSize: "16px" }}>→</span>
                </a>
              ) : (
                <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>In development</span>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>
          © {new Date().getFullYear()} Purcell Ventures LLC
        </span>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>Georgia</span>
      </footer>
    </div>
  );
}
