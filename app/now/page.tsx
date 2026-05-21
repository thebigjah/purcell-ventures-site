"use client";

import type { Metadata } from "next";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const FOCUS = [
  {
    roman: "I.",
    label: "Building",
    items: [
      "Purcell Ventures — four divisions live, two sales partners coming on, three courses recorded next.",
      "Mantle Field Services — sister brand, Metro Atlanta only, gutters / pressure washing / lawn through summer.",
      "Personal AI infrastructure — desktop overlay, automation pipelines, the kind of stack I'm betting on for the next decade.",
    ],
  },
  {
    roman: "II.",
    label: "Studying",
    items: [
      "Psychology + Data Science prereqs — first year at the University of Alabama starts August 2026.",
      "Apologetics + worldview — Lewis, Craig, McDowell, Tozer. Slow reads, marked margins.",
      "How AI changes mental health care — psychiatry is the long arc.",
    ],
  },
  {
    roman: "III.",
    label: "Going",
    items: [
      "Alaska mission trip — disaster relief, July 17–23, 2026.",
      "Lee University Summer Honors — June 14–20, cryptography + social media + 6 college credits.",
      "Bama Bound — July 9–11, Tuscaloosa, orientation + first advisor meeting.",
      "Hawaii mission trip — March 2026, flood recovery (completed).",
    ],
  },
  {
    roman: "IV.",
    label: "Practicing",
    items: [
      "Bass-baritone vocals — range C1 to F5, worship-leading at Stonebridge most Sundays.",
      "Bible study with Mighty Men — Cornerstone Prep weekly, last semester before graduation.",
      "Strength + conditioning — scientific hypertrophy programming, multi-year commitment.",
      "Writing — original poetry, fiction drafts, this site, my own infrastructure.",
    ],
  },
  {
    roman: "V.",
    label: "Reading",
    items: [
      "Mere Christianity — C.S. Lewis. Annual re-read.",
      "Tactics — Greg Koukl. Worldview discussions on campus and at home.",
      "The Bible — daily, no streak required.",
      "Anything Annie Duke writes — Thinking in Bets is the operating posture.",
    ],
  },
  {
    roman: "VI.",
    label: "Wrestling with",
    items: [
      "Free will vs. determinism (firmly non-Calvinist, still exploring).",
      "The right cadence for school + business + faith + family without dropping a ball.",
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
          <div className="pv-mono-label">A /now Page · Updated May 2026</div>
          <h1>
            What I&apos;m <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>focused on</em> right now.
          </h1>
          <p className="deck">
            An old-internet tradition (<a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", textDecorationStyle: "dotted" }}>nownownow.com</a>) — a single page that tells you what someone is actually doing right now. No marketing, no positioning, just the actual answer to &ldquo;what are you up to lately?&rdquo;
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
                        <span style={{ color: "var(--color-warm-accent)", flexShrink: 0, opacity: 0.7 }}>—</span>
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
          This page updates roughly monthly. If we&apos;re going to meet — this is the truest snapshot I can give you of where my head is right now.
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
