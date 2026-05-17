"use client";

// Case Studies page — staged 2026-05-17.
// Three placeholder slots ready for real client stories.
// When clients say yes to testimonial (per 30-day check-in in the playbook),
// fill in the data + uncomment the live CTA in metadata + push.

import Link from "next/link";

const CASE_STUDIES: CaseStudy[] = [
  // SLOT 1 — fill when first client completes
  // {
  //   slug: "[client-slug]",
  //   industry: "[Industry]",
  //   companyType: "[e.g. Real estate office, 6 agents]",
  //   sessionType: "[Half-Day Team Training | 90-min ChatGPT in Your Workflow | etc.]",
  //   problem: "[The specific time-suck or workflow they came with — 1-2 sentences]",
  //   solution: "[What you delivered — be specific about the tools/workflows you set up]",
  //   outcome: "[Quantified results — hours saved/month, $ value, qualitative wins]",
  //   quote: "[Direct quote from client — keep it specific, not generic]",
  //   quoteAttribution: "[Name], [Role]",
  //   timeframe: "[Date of session]",
  //   isPublic: true,
  // },
  // SLOT 2 — same template
  // SLOT 3 — same template
];

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

export default function CaseStudiesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)" }}>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(12,10,8,0.94)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-warm-border)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="/" style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>← Home</a>
            <span style={{ color: "var(--color-warm-border-light)" }}>|</span>
            <a href="/consulting" style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-warm-text)", textDecoration: "none", letterSpacing: "0.04em", fontFamily: "'Cinzel', Georgia, serif" }}>
              Purcell <span style={{ color: "var(--color-warm-accent)" }}>Consulting</span>
            </a>
          </div>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <a href="/consulting#sessions" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>Sessions</a>
            <a href="/consulting/book" style={{ padding: "8px 18px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "13px", fontWeight: 600, borderRadius: "6px", textDecoration: "none" }}>
              Book a Session
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "140px 24px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
          Purcell Ventures — Case Studies
        </p>
        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 700, lineHeight: 1.05,
          marginBottom: "24px",
          color: "var(--color-warm-text)",
        }}>
          Real teams. Real workflows. Real hours saved.
        </h1>
        <p style={{
          fontSize: "18px",
          color: "var(--color-warm-text-muted)",
          maxWidth: "640px",
          lineHeight: 1.75,
        }}>
          The work below is from sessions I&apos;ve delivered for small businesses around Metro Atlanta. Each case study is published with the client&apos;s explicit permission.
        </p>
      </section>

      {/* Case studies */}
      <section style={{ padding: "0 24px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        {CASE_STUDIES.filter(cs => cs.isPublic).length === 0 ? (
          <div style={{
            background: "var(--color-warm-card)",
            border: "1px solid var(--color-warm-border)",
            borderRadius: "12px",
            padding: "48px 32px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>
              Coming Soon
            </p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", marginBottom: "16px", color: "var(--color-warm-text)" }}>
              Building the first round.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", maxWidth: "560px", margin: "0 auto 32px", lineHeight: 1.75 }}>
              I&apos;m starting consulting work intentionally — choosing the first clients carefully, doing each session with full attention, then asking permission to publish the result.
              First case studies will land here within ~60 days of starting client work.
            </p>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-light)", lineHeight: 1.6, marginBottom: "24px" }}>
              If you&apos;d like to be the early client whose story anchors this page — there&apos;s a real benefit to going first. Discounted rate, more of my attention, and the case study itself becomes a marketing asset for your business if you want it to.
            </p>
            <Link href="/consulting/book" style={{ display: "inline-block", padding: "14px 32px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "14px", letterSpacing: "0.05em" }}>
              Book the conversation
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "32px" }}>
            {CASE_STUDIES.filter(cs => cs.isPublic).map((cs) => (
              <article key={cs.slug} style={{
                background: "var(--color-warm-card)",
                border: "1px solid var(--color-warm-border)",
                borderRadius: "12px",
                padding: "40px 36px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "6px" }}>
                      {cs.industry} · {cs.timeframe}
                    </p>
                    <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)" }}>
                      {cs.companyType}
                    </h2>
                  </div>
                  <span style={{ padding: "6px 14px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", borderRadius: "999px", fontSize: "12px", fontWeight: 600, color: "var(--color-warm-text-muted)" }}>
                    {cs.sessionType}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginBottom: "28px" }}>
                  <div>
                    <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-text-light)", marginBottom: "10px" }}>The Problem</h3>
                    <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75 }}>{cs.problem}</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-text-light)", marginBottom: "10px" }}>What We Did</h3>
                    <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75 }}>{cs.solution}</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-text-light)", marginBottom: "10px" }}>The Outcome</h3>
                    <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75 }}>{cs.outcome}</p>
                  </div>
                </div>

                <blockquote style={{
                  borderLeft: "3px solid var(--color-warm-accent)",
                  paddingLeft: "20px",
                  marginTop: "24px",
                }}>
                  <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", lineHeight: 1.65, color: "var(--color-warm-text)", fontStyle: "italic", marginBottom: "8px" }}>
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>— {cs.quoteAttribution}</p>
                </blockquote>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid var(--color-warm-border)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(26px, 4vw, 36px)", marginBottom: "16px", color: "var(--color-warm-text)" }}>
            Could your team be the next case study?
          </h2>
          <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "32px" }}>
            Same Elijah, same delivery, your team&apos;s actual workflows. Reach out and we&apos;ll figure out which session fits.
          </p>
          <Link href="/consulting" style={{ display: "inline-block", padding: "16px 40px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "16px", fontWeight: 700, borderRadius: "8px", textDecoration: "none" }}>
            See Consulting Sessions →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>© {new Date().getFullYear()} Purcell Ventures LLC</span>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>Georgia</span>
      </footer>
    </div>
  );
}
