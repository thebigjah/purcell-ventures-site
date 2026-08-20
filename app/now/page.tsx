"use client";

import type { Metadata } from "next";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const FOCUS = [
  {
    roman: "I.",
    label: "Building",
    items: [
      "Purcell Ventures. Four divisions live, and the current problem is not building things, it is that several of them still cannot take a payment.",
      "A fifteen-agent AI workforce that runs proposals, audits, compliance and outreach on a schedule. The roster is public on the team page.",
      "UA Today. Campus events for the University of Alabama, pulled from six sources into one place, and used by students who are not me.",
      "The Tuscaloosa Storefront Project. Reporting on independent businesses near campus, one at a time.",
    ],
  },
  {
    roman: "II.",
    label: "Studying",
    items: [
      "First semester at the University of Alabama Honors College. Moved in 14 August 2026, first class on the 19th, which was also my birthday.",
      "Psychology and data science, on a pre-med track toward psychiatry.",
      "How AI can take administrative load off mental health clinicians. That is the long arc and the reason for the degree combination.",
      "Apologetics and worldview. Lewis, Craig, McDowell, Tozer. Slow reads, marked margins.",
    ],
  },
  {
    roman: "III.",
    label: "Figuring out",
    items: [
      "Which three clubs to join. One for the major, one for fun, one that makes me uncomfortable.",
      "Whether the businesses I write about actually want a website, or whether the honest answer for most of them is to claim their Google listing and go back to work.",
      "Whether to keep the Storefront series weekly or let it run at the pace the interviews actually take.",
    ],
  },
  {
    roman: "IV.",
    label: "Practicing",
    items: [
      "Bass-baritone vocals, range C1 to F5. Worship-leading whenever there is a room that needs it.",
      "Strength and conditioning, scientific hypertrophy programming, a multi-year commitment rather than a season.",
      "Writing. Poetry nobody asked for, fiction drafts, this site, and my own infrastructure.",
    ],
  },
  {
    roman: "V.",
    label: "Reading",
    items: [
      "Lewis, Craig, McDowell, Tozer. Slow reads, marked margins.",
      "The Bible, daily, no streak required.",
      "Annie Duke and the decision-making canon. Thinking in Bets is why I keep a calibration journal.",
    ],
  },
  {
    roman: "VI.",
    label: "Wrestling with",
    items: [
      "Free will and determinism. Firmly non-Calvinist, still exploring.",
      "The right cadence for school and business without either one taking the other's hours.",
      "How honest to be on the public internet about the hard parts.",
    ],
  },
];

export default function NowPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">A /now Page · Updated 20 August 2026</div>
          <h1>
            What I&apos;m <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>focused on</em> right now.
          </h1>
          <p className="deck">
            An old-internet tradition (<a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", textDecorationStyle: "dotted" }}>nownownow.com</a>). A single page that tells you what someone is actually doing right now. No marketing, no positioning, just the actual answer to &ldquo;what are you up to lately?&rdquo;
          </p>
        </header>

        {/* Focus list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {FOCUS.map((bucket) => (
            <div key={bucket.label} className="pv-card" style={{ padding: "32px 36px 28px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "baseline" }}>
                <span className="pv-italic" style={{ fontSize: "44px", color: "var(--color-warm-accent)", lineHeight: 1, fontWeight: 400 }}>
                  {bucket.roman}
                </span>
                <div>
                  <h2 style={{
                    fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                    fontSize: "22px", letterSpacing: "0.04em",
                    color: "var(--color-warm-text)", textTransform: "uppercase",
                    margin: "0 0 18px", lineHeight: 1.1,
                  }}>
                    {bucket.label}
                  </h2>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {bucket.items.map((item, i) => (
                      <li key={i} className="pv-italic" style={{
                        fontSize: "16px", lineHeight: 1.55,
                        color: "var(--color-warm-text)", opacity: 0.88,
                        display: "flex", gap: "14px",
                      }}>
                        <span style={{ color: "var(--color-warm-accent)", flexShrink: 0, opacity: 0.7 }}>&middot;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verse close */}
        <section style={{
          marginTop: "64px",
          padding: "48px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
            fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
          }}>
            ☩
          </div>
          <blockquote className="pv-italic" style={{
            fontSize: "22px", lineHeight: 1.45,
            color: "var(--color-warm-text)", opacity: 0.92,
            maxWidth: "560px", margin: "0 auto",
          }}>
            &ldquo;Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.&rdquo;
          </blockquote>
          <cite style={{
            display: "block", marginTop: "24px",
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 500,
            fontSize: "12px", letterSpacing: "0.42em", textTransform: "uppercase",
            color: "var(--color-warm-accent)", fontStyle: "normal",
          }}>
            — Colossians 3:23
          </cite>
        </section>

        {/* Closing line */}
        <p className="pv-italic" style={{
          marginTop: "48px",
          fontSize: "14px", color: "var(--color-warm-text-light)",
          textAlign: "center", lineHeight: 1.7,
        }}>
          This page updates roughly monthly. If we&apos;re going to meet, this is the truest snapshot I can give you of where my head is right now.
        </p>

      </main>

      <footer style={{
        position: "relative", zIndex: 5,
        padding: "24px 36px",
        borderTop: "1px solid var(--color-warm-border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--color-warm-text-light)",
      }}>
        <span>© {new Date().getFullYear()} Purcell Ventures LLC · Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← Home</a>
      </footer>
    </div>
  );
}
