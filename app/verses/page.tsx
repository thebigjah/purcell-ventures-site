"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";

const VERSES = [
  {
    roman: "I.",
    ref: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    why: "The verse I come back to when something has gone wrong. Not a denial that things hurt, a refusal to let them be meaningless.",
  },
  {
    roman: "II.",
    ref: "Matthew 5:10",
    text: "Blessed are those who are persecuted because of righteousness, for theirs is the kingdom of heaven.",
    why: "For the moments where doing the right thing costs you something visible, public ridicule, lost friendships, lost ground. The kingdom is on the other side of those losses.",
  },
  {
    roman: "III.",
    ref: "Romans 1:16",
    text: "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.",
    why: "The verse that makes it impossible to be cool. The gospel is either the most embarrassing thing I believe or the most powerful, there is no Christianity that hedges between.",
  },
  {
    roman: "IV.",
    ref: "Proverbs 3:5–6",
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    why: "The operating credo. I lean on my own understanding by default, analytical, planning, strategic. This verse is the daily handoff back to God.",
  },
  {
    roman: "V.",
    ref: "Psalm 139:13",
    text: "For you created my inmost being; you knit me together in my mother's womb.",
    why: "The reason I take psychology and psychiatry seriously. Every patient I'll eventually treat was knit together by God. The work has to honor that, not flatten it.",
  },
];

export default function VersesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "820px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">A Personal Lectionary · Updated May 2026</div>
          <h1>
            Verses I <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>come back to.</em>
          </h1>
          <p className="deck">
            Five scriptures that have shaped me. Not a doctrinal statement, a lived-in set of verses I&apos;ve marked, memorized, and returned to when life pressured a position out of me. If you want the credo behind the work, it&apos;s here.
          </p>
        </header>

        {/* Verse cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {VERSES.map((v) => (
            <article key={v.ref} className="pv-card" style={{ padding: "36px 36px 32px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "28px", alignItems: "start" }}>
                <span className="pv-italic" style={{ fontSize: "52px", color: "var(--color-warm-accent)", lineHeight: 1, fontWeight: 400, paddingTop: "4px" }}>
                  {v.roman}
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                    fontSize: "18px", letterSpacing: "0.04em",
                    color: "var(--color-warm-accent)", textTransform: "uppercase",
                    marginBottom: "16px",
                  }}>
                    {v.ref}
                  </div>
                  <blockquote className="pv-italic" style={{
                    fontSize: "20px", lineHeight: 1.5,
                    color: "var(--color-warm-text)",
                    borderLeft: "3px solid var(--color-warm-accent)",
                    paddingLeft: "20px",
                    margin: "0 0 20px",
                  }}>
                    &ldquo;{v.text}&rdquo;
                  </blockquote>
                  <div className="pv-mono-label" style={{ marginBottom: "10px", color: "var(--color-warm-text-light)" }}>
                    Why this one
                  </div>
                  <p className="pv-italic" style={{
                    fontSize: "16px", lineHeight: 1.6,
                    color: "var(--color-warm-text)", opacity: 0.88,
                    margin: 0,
                  }}>
                    {v.why}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Closing */}
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
          <p className="pv-italic" style={{
            fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.85,
            maxWidth: "560px", margin: "0 auto", lineHeight: 1.55,
          }}>
            If you&apos;re here because you&apos;re wrestling with one of these, message me. I&apos;m not a pastor, but I&apos;ve done a lot of wrestling.
          </p>
          <div className="pv-mono-label" style={{ marginTop: "20px", color: "var(--color-warm-text-light)" }}>
            elijah@purcell-ventures.com
          </div>
        </section>

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
