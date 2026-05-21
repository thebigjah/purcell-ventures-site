"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface CaseStudy {
  slug: string;
  industry: string;
  companyType: string;
  sessionType: string;
  problem: string;
  solution: string;
  outcome: string;
  quote: string;
  quoteAttribution: string;
  timeframe: string;
  isPublic: boolean;
}

const CASE_STUDIES: CaseStudy[] = [
  // When clients say yes to testimonial, fill in the data + push.
];

// Case-studies-specific mobile rules. Base Vignette styles live in globals.css.
const CASE_PAGE_CSS = `
  @media (max-width: 900px) {
    .pv-cs-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function CaseStudiesPage() {
  const liveStudies = CASE_STUDIES.filter(cs => cs.isPublic);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: CASE_PAGE_CSS }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 100px" }}>

        {/* Editorial page header */}
        <div style={{ borderTop: "3px solid var(--color-warm-text)", borderBottom: "1px solid var(--color-warm-text)", padding: "16px 0 24px", marginBottom: "48px" }}>
          <div style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase",
            color: "var(--color-warm-accent)", marginBottom: "12px",
          }}>
            Field Reports · Volume I
          </div>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
            fontSize: "clamp(40px, 7vw, 88px)",
            lineHeight: 0.98, letterSpacing: "0.005em",
            color: "var(--color-warm-text)", margin: 0,
          }}>
            Case <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Studies</em>
          </h1>
          <p className="pv-italic" style={{ marginTop: "18px", fontSize: "20px", color: "var(--color-warm-text)", opacity: 0.85, maxWidth: "640px", lineHeight: 1.5 }}>
            Real teams, real workflows, real hours saved. Each case study below is published with the client&apos;s explicit permission.
          </p>
        </div>

        {/* Body */}
        {liveStudies.length === 0 ? (
          <div className="pv-card" style={{ padding: "64px 56px", textAlign: "center" }}>
            <span className="b3"></span><span className="b4"></span>
            <div style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase",
              color: "var(--color-warm-accent)", marginBottom: "16px",
            }}>
              ✦ &nbsp; Coming soon &nbsp; ✦
            </div>
            <h2 style={{
              fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "0.02em",
              color: "var(--color-warm-text)", textTransform: "uppercase",
              marginBottom: "20px", lineHeight: 1.1,
            }}>
              Building the <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>first round.</em>
            </h2>
            <p className="pv-italic" style={{
              fontSize: "19px", color: "var(--color-warm-text)", opacity: 0.85,
              maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.55,
            }}>
              Consulting work is starting intentionally — choosing the first clients carefully, doing each session with full attention, then asking permission to publish the result. First case studies land within ~60 days of starting client work.
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "14px", color: "var(--color-warm-text-muted)",
              maxWidth: "560px", margin: "0 auto 36px", lineHeight: 1.65,
            }}>
              If you&apos;d like to be the early client whose story anchors this page — discounted rate, more of my attention, and the case study itself becomes a marketing asset for your business if you want it to.
            </p>
            <Link href="/consulting/book" style={{
              display: "inline-block",
              padding: "13px 32px",
              background: "var(--color-warm-text)", color: "var(--color-warm-bg)",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase",
              textDecoration: "none",
            }}>
              Book the conversation
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {liveStudies.map((cs, i) => (
              <article key={cs.slug} className="pv-card" style={{ paddingTop: "44px" }}>
                <span className="b3"></span><span className="b4"></span>

                {/* Header */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  marginBottom: "24px", flexWrap: "wrap", gap: "16px",
                }}>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase",
                      color: "var(--color-warm-accent)", marginBottom: "10px",
                    }}>
                      № {String(i + 1).padStart(2, "0")} · {cs.industry} · {cs.timeframe}
                    </div>
                    <h2 style={{
                      fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                      fontSize: "26px", letterSpacing: "0.02em",
                      color: "var(--color-warm-text)", textTransform: "uppercase",
                      lineHeight: 1.1, margin: 0,
                    }}>
                      {cs.companyType}
                    </h2>
                  </div>
                  <span style={{
                    padding: "6px 14px",
                    border: "1.5px solid var(--color-warm-border)",
                    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "var(--color-warm-text-muted)",
                  }}>
                    {cs.sessionType}
                  </span>
                </div>

                {/* Three-column body */}
                <div className="pv-cs-grid" style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "32px", marginBottom: "32px",
                  paddingTop: "16px", borderTop: "1px dashed var(--color-warm-border)",
                }}>
                  {[
                    { h: "The Problem", body: cs.problem },
                    { h: "What we did", body: cs.solution },
                    { h: "The Outcome", body: cs.outcome },
                  ].map(({ h, body }) => (
                    <div key={h}>
                      <h3 style={{
                        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                        fontSize: "10px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase",
                        color: "var(--color-warm-accent)", marginBottom: "12px",
                        borderTop: "1px solid var(--color-warm-accent)", paddingTop: "10px",
                      }}>
                        {h}
                      </h3>
                      <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.88, lineHeight: 1.55, margin: 0 }}>
                        {body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pull quote */}
                <blockquote style={{
                  borderLeft: "3px solid var(--color-warm-accent)",
                  paddingLeft: "24px",
                  marginTop: "24px",
                }}>
                  <p className="pv-italic" style={{
                    fontSize: "22px", lineHeight: 1.45, color: "var(--color-warm-text)",
                    marginBottom: "10px",
                  }}>
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <p style={{
                    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
                    color: "var(--color-warm-text-light)",
                  }}>
                    — {cs.quoteAttribution}
                  </p>
                </blockquote>
              </article>
            ))}
          </div>
        )}

        {/* CTA strip */}
        <section style={{
          marginTop: "80px",
          padding: "56px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
            fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
          }}>
            ✦
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "clamp(26px, 3.5vw, 36px)", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            marginBottom: "16px", lineHeight: 1.15,
          }}>
            Could your team be the <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>next?</em>
          </h2>
          <p className="pv-italic" style={{
            fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.85,
            maxWidth: "560px", margin: "0 auto 32px", lineHeight: 1.55,
          }}>
            Same Elijah, same delivery, your team&apos;s actual workflows. Reach out and we&apos;ll figure out which session fits.
          </p>
          <Link href="/consulting" style={{
            display: "inline-block",
            padding: "13px 32px",
            background: "var(--color-warm-text)", color: "var(--color-warm-bg)",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase",
            textDecoration: "none",
          }}>
            See consulting sessions →
          </Link>
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
