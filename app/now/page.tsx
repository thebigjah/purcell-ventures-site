"use client";

import type { Metadata } from "next";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const FOCUS = [
  {
    roman: "I.",
    label: "Building",
    items: [
      "Purcell Ventures. Rebuilding this site from the ground up, with a new mark and a new gold.",
      "COSMIC, the set of AI agents that runs the company's outreach: finding local businesses, auditing their sites and emailing the ones that need help. The roster is public on the team page.",
      "Three courses: The College Application Playbook, The Business Launch Playbook and Zero to Automated. None is finished. Ask me and I will send the material.",
      "UA Today. Campus events for the University of Alabama, pulled from six sources into one place, and used by students who are not me.",
      "Search and AI visibility work for a flooring installer in Georgia, measured in booked jobs.",
      "The Tuscaloosa Storefront Project. Reporting on independent businesses near campus, one at a time.",
    ],
  },
  {
    roman: "II.",
    label: "Studying",
    items: [
      "First semester at the University of Alabama Honors College. Moved in 14 August 2026, first class on the 19th, which was also my birthday.",
      "Psychology and data science, on a pre-med track toward psychiatry.",
      "How AI can take administrative load off mental health clinicians. That is why I chose this degree combination.",
      "Apologetics and worldview. Lewis, Craig, McDowell, Tozer. Slow reads, marked margins.",
    ],
  },
  {
    roman: "III.",
    label: "Figuring out",
    items: [
      "Spring classes. Seventeen hours across math, computer science, psychology and sociology.",
      "Whether the businesses I write about want a website, or whether most of them only need to claim their Google listing.",
      "Whether to keep the Storefront series weekly or let it run at the pace the interviews take.",
    ],
  },
  {
    roman: "IV.",
    label: "Practicing",
    items: [
      "Bass-baritone vocals, range C1 to F5.",
      "Strength and conditioning, scientific hypertrophy programming, a multi-year commitment rather than a season.",
      "Writing. Poetry nobody asked for, fiction drafts, this site, and my own infrastructure.",
    ],
  },
  {
    roman: "V.",
    label: "Reading",
    items: [
      "The Bible, daily, no streak required. NASB for devotion, NRSVue for study.",
      "Annie Duke and the decision-making canon. Thinking in Bets is why I keep a calibration journal.",
    ],
  },
  {
    roman: "VI.",
    label: "Wrestling with",
    items: [
      "Free will and determinism. Firmly non-Calvinist, still exploring.",
      "The right cadence for school and business without either one taking the other's hours.",
      "How much of the hard parts belongs on the public internet.",
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
          <div className="pv-mono-label">A /now page, updated 26 October 2026</div>
          <h1>
            What I&apos;m <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>focused on</em> now.
          </h1>
          <p className="deck">
            An old-internet tradition (<a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", textDecorationStyle: "dotted" }}>nownownow.com</a>). A single page that answers &ldquo;what are you up to lately?&rdquo;
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
                        <span aria-hidden="true" style={{ width: "8px", height: "1px", marginTop: "12px", background: "var(--color-warm-accent)", flexShrink: 0, opacity: 0.7 }} />
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
            &ldquo;Whatever you do, do your work heartily, as for the Lord rather than for men.&rdquo;
          </blockquote>
          <cite style={{
            display: "block", marginTop: "24px",
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 500,
            fontSize: "12px", letterSpacing: "0.42em", textTransform: "uppercase",
            color: "var(--color-warm-accent)", fontStyle: "normal",
          }}>
            Colossians 3:23, NASB
          </cite>
        </section>

        {/* Closing line */}
        <p className="pv-italic" style={{
          marginTop: "48px",
          fontSize: "14px", color: "var(--color-warm-text-light)",
          textAlign: "center", lineHeight: 1.7,
        }}>
          I update this page about once a month. It lists what I was working on as of the date at the top.
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
        <span>© {new Date().getFullYear()} Purcell Ventures LLC, Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>Home</a>
      </footer>
    </div>
  );
}
