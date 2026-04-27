"use client";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>
            Purcell Ventures — Courses
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "var(--color-warm-text)", lineHeight: 1.05, marginBottom: "16px" }}>
            Learn from someone<br />who just did it.
          </h1>
          <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, maxWidth: "520px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            No theory. No credentials theater. Just the actual process — documented, structured, and taught by someone who's been through it recently enough to remember every step.
          </p>
        </div>

        {/* Course grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 10, overflow: "hidden" }}>

          {/* College Apps — live */}
          <Link href="/courses/college-apps" style={{ textDecoration: "none", display: "block", background: "var(--color-warm-bg)", padding: "40px", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--color-warm-card)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--color-warm-bg)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-warm-accent)", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif" }}>
                Available Now
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "12px", lineHeight: 1.15 }}>
              The College Application Playbook
            </h2>
            <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, marginBottom: "32px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              34 acceptances. $505,000+ in scholarships. 98 schools researched. This is the exact process — building your list, writing essays, chasing scholarships, and maximizing your offer.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", marginBottom: "2px", fontFamily: "var(--font-inter), sans-serif" }}>from</div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "var(--color-warm-text)", fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "-0.02em" }}>$297</div>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-warm-accent)", letterSpacing: "0.06em", fontFamily: "var(--font-inter), sans-serif" }}>
                View Course →
              </div>
            </div>
          </Link>

          {/* Business Launch — coming soon */}
          <div style={{ background: "var(--color-warm-bg)", padding: "40px", opacity: 0.45 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-warm-text-muted)", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                Coming Soon
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "12px", lineHeight: 1.15 }}>
              Business Launch
            </h2>
            <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, marginBottom: "32px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Everything I wish I knew before starting my first business. From idea to legal entity to first dollar — with every tool, decision, and shortcut I actually used.
            </p>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-warm-text-muted)", letterSpacing: "0.06em", fontFamily: "var(--font-inter), sans-serif" }}>
              Notify Me →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
