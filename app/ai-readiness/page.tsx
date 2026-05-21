"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Question {
  text: string;
  context: string;
  options: { label: string; points: number }[];
}

interface Tier {
  max: number;
  label: string;
  cls: "low" | "mid" | "high";
  verdict: string;
  detail: string;
  recs: string[];
  sessionCta: { label: string; href: string };
}

const QUESTIONS: Question[] = [
  {
    text: "How does your team currently draft customer communications?",
    context: "Email, proposals, follow-ups, scripts — anything written.",
    options: [
      { label: "From scratch every time", points: 0 },
      { label: "From a small template library we maintain", points: 1 },
      { label: "We use ChatGPT or Claude as a draft starter, then edit", points: 2 },
      { label: "We have prompt libraries + AI-edited outputs as default", points: 3 },
    ],
  },
  {
    text: "When was the last time your team adopted a new tool that genuinely saved you 5+ hours a week?",
    context: "Not a new feature — a whole new tool that changed how someone works.",
    options: [
      { label: "Can't think of one", points: 0 },
      { label: "A few years ago", points: 1 },
      { label: "In the last 12 months", points: 2 },
      { label: "Multiple in the last 6 months", points: 3 },
    ],
  },
  {
    text: "If a competitor automated 50% of your team's daily admin work tomorrow, how long would it take you to match them?",
    context: "Not 'adopt a tool' — actually integrate it and run with it.",
    options: [
      { label: "We'd never catch up — we don't know what they'd be doing", points: 0 },
      { label: "6+ months of internal restructure", points: 1 },
      { label: "1–3 months with help", points: 2 },
      { label: "Already there or close", points: 3 },
    ],
  },
  {
    text: "Which describes your operations/admin workload best?",
    context: "Be honest about repeat work.",
    options: [
      { label: "80% manual, mostly the same tasks every week", points: 0 },
      { label: "50/50 — some automation, lots of manual fallback", points: 1 },
      { label: "Mostly tooled, but humans review and approve everything", points: 2 },
      { label: "Highly automated; humans handle the edge cases only", points: 3 },
    ],
  },
  {
    text: "When you onboard a new team member, how is institutional knowledge transferred?",
    context: "Process docs, recordings, shadowing, or 'figure it out'?",
    options: [
      { label: "Shadow a senior person, ask questions, sink or swim", points: 0 },
      { label: "Written docs that are mostly out of date", points: 1 },
      { label: "Living docs + maybe a video library", points: 2 },
      { label: "AI-searchable knowledge base; new hires query like a coworker", points: 3 },
    ],
  },
  {
    text: "How does your team make decisions when data is involved?",
    context: "Customer trends, sales numbers, operational metrics.",
    options: [
      { label: "Gut feel; we don't really pull numbers", points: 0 },
      { label: "Someone runs reports manually when asked", points: 1 },
      { label: "We have a dashboard people check weekly", points: 2 },
      { label: "Real-time dashboards + AI summaries of what changed and why", points: 3 },
    ],
  },
  {
    text: "Marketing & content output: how is it produced?",
    context: "Social posts, blog content, ads, email campaigns.",
    options: [
      { label: "We don't really produce content", points: 1 },
      { label: "Everything written by humans from scratch", points: 0 },
      { label: "AI-assisted drafts, human-edited and scheduled", points: 2 },
      { label: "AI-generated + AI-scheduled + human-approved pipeline", points: 3 },
    ],
  },
  {
    text: "What's your team's read on the next 18 months of AI?",
    context: "Cultural temperature check.",
    options: [
      { label: "It's overhyped — we're not changing anything", points: 0 },
      { label: "We know we should learn it, haven't gotten to it", points: 1 },
      { label: "We're actively testing tools; some are sticking", points: 2 },
      { label: "AI is core to our planning; we map every quarter against it", points: 3 },
    ],
  },
  {
    text: "If you needed a custom AI-powered tool built for your specific workflow this month, what would happen?",
    context: "Internal capability or vendor reach.",
    options: [
      { label: "Wouldn't know where to start", points: 0 },
      { label: "We'd post on Upwork or hire a generalist", points: 1 },
      { label: "We have a developer/consultant we'd call", points: 2 },
      { label: "Internal team can build a working v0 within the week", points: 3 },
    ],
  },
  {
    text: "Final honesty check: if your job were automated tomorrow, how prepared are you personally?",
    context: "No wrong answer here. Just the read.",
    options: [
      { label: "Hadn't thought about it", points: 0 },
      { label: "I'd struggle but figure it out", points: 1 },
      { label: "I've been building skills that would carry over", points: 2 },
      { label: "I'd see it as an opportunity — I'd be building the tool that did it", points: 3 },
    ],
  },
];

const TIERS: Tier[] = [
  {
    max: 9,
    label: "AT RISK",
    cls: "low",
    verdict: "You're behind the curve — and the curve is moving faster every quarter.",
    detail: "This isn't a judgment, it's a heads-up. Most people in this tier don't realize how much room there is to close the gap with one focused session.",
    recs: [
      "Pick ONE workflow your team does weekly that's pure manual work. Automate JUST that one in 2 hours.",
      "Subscribe to one well-curated AI-for-business newsletter (Lenny's, AI Breakdown). 5 min/day, 90 days. Don't take action yet — just absorb vocabulary.",
      "Book a 2-hour 'AI Basics for Business' session — designed for exactly this tier.",
    ],
    sessionCta: { label: "Book AI Basics for Business →", href: "/consulting/book" },
  },
  {
    max: 17,
    label: "WAKING UP",
    cls: "mid",
    verdict: "You see the shift coming. You haven't built around it yet.",
    detail: "You're not behind — you're at a decision point. The next 6 months are when the gap between 'aware' and 'actively building' becomes hard to close.",
    recs: [
      "Audit your team's top 5 time-wasting workflows. Rank by hours/week × repeatability. Highest-scoring is your first automation candidate.",
      "Allocate 1 person 4 hours/week explicitly for 'AI tooling research and small pilots.' Make it official, not extra duty.",
      "Pick a 3-hour hands-on session: ChatGPT in Your Workflow or AI for Marketing. Bring the team. Real scenarios.",
    ],
    sessionCta: { label: "Book a Hands-On Session →", href: "/consulting/book" },
  },
  {
    max: 24,
    label: "MOVING",
    cls: "high",
    verdict: "You're actively building. The question is how much faster you could compound.",
    detail: "You're past the 'should we' phase and into the 'how do we scale this' phase. The biggest unlock now is connecting individual AI wins into integrated workflows.",
    recs: [
      "Map your existing AI tools and look for the seams — where does an AI-generated output get manually re-entered into another system? That's your next automation.",
      "Establish an internal monthly 'AI demo day' where anyone on the team shows a new tool or workflow. Cultural compounding.",
      "Consider Custom Team Training — at this tier, generic sessions are below your level. You need a session built around your actual stack.",
    ],
    sessionCta: { label: "Book Custom Team Training →", href: "/consulting/book" },
  },
  {
    max: 30,
    label: "BUILDING THE FUTURE",
    cls: "high",
    verdict: "You're not asking the AI-readiness question — you're answering it for other people.",
    detail: "At this tier, the value isn't training; it's strategic sounding-boarding. The right next conversation is about positioning your AI capability as a market advantage or even a new revenue line.",
    recs: [
      "Document your AI infrastructure as a sellable methodology — even internally. The patterns that work for you will work for adjacent businesses.",
      "Consider whether your AI capability is a product line, a service offering, or a competitive moat. The three have very different strategies.",
      "Talk to me about a strategic consult, not a training session. Different conversation, different cadence.",
    ],
    sessionCta: { label: "Email Elijah for a Strategic Consult →", href: "mailto:elijah@purcell-ventures.com?subject=Strategic%20Consult%20Inquiry" },
  },
];

function tierFromScore(score: number): Tier {
  for (const t of TIERS) if (score <= t.max) return t;
  return TIERS[TIERS.length - 1];
}

const TIER_COLOR: Record<Tier["cls"], string> = {
  low:  "#b04030",
  mid:  "#c89018",
  high: "#7aaa6a",
};

export default function AIReadinessPage() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const score = answers.reduce((a, b) => a + b, 0);
  const tier = tierFromScore(score);
  const progress = done ? 100 : (current / QUESTIONS.length) * 100;

  function pick(points: number) {
    const next = [...answers];
    next[current] = points;
    setAnswers(next);
    if (current + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
    }
  }
  function back() {
    if (current > 0) setCurrent(current - 1);
  }
  function restart() {
    setAnswers([]);
    setCurrent(0);
    setDone(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "780px", margin: "0 auto", padding: "56px 28px 80px" }}>

        {/* Page head */}
        <header className="pv-page-head" style={{ marginBottom: "32px" }}>
          <div className="pv-mono-label">A Diagnostic Instrument · 10 questions · 3 minutes</div>
          <h1 style={{ margin: 0 }}>
            AI Readiness <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Test.</em>
          </h1>
          <p className="deck">
            Where does your role and your company actually stand in the AI-disruption window? No email capture. Honest answer.
          </p>
        </header>

        {/* Progress bar */}
        {!done && (
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--color-warm-text-light)", marginBottom: "20px",
          }}>
            <span>Q{current + 1} / {QUESTIONS.length}</span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-warm-border)", position: "relative" }}>
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                background: "var(--color-warm-accent)",
                width: `${progress}%`,
                transition: "width 0.3s ease-out",
              }} />
            </div>
            <span>{Math.round(progress)}%</span>
          </div>
        )}

        {!done ? (
          // Question card
          <div className="pv-card" style={{ padding: "36px 36px 28px" }}>
            <span className="b3"></span><span className="b4"></span>
            <div className="pv-mono-label" style={{ marginBottom: "16px", color: "var(--color-warm-text-light)" }}>
              Question {current + 1} of {QUESTIONS.length}
            </div>
            <h2 style={{
              fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
              fontSize: "22px", letterSpacing: "0.01em",
              color: "var(--color-warm-text)", lineHeight: 1.3,
              margin: "0 0 12px",
            }}>
              {QUESTIONS[current].text}
            </h2>
            <p className="pv-italic" style={{
              fontSize: "15px", color: "var(--color-warm-text)", opacity: 0.7,
              lineHeight: 1.5, marginBottom: "24px",
            }}>
              {QUESTIONS[current].context}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {QUESTIONS[current].options.map((opt, i) => {
                const isSelected = answers[current] === opt.points;
                return (
                  <button key={i} onClick={() => pick(opt.points)} style={{
                    padding: "16px 22px",
                    background: isSelected ? "#1e1a14" : "var(--color-warm-bg)",
                    border: `1.5px solid ${isSelected ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                    borderRadius: 0, cursor: "pointer", textAlign: "left",
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    fontSize: "15.5px", color: "var(--color-warm-text)",
                    opacity: isSelected ? 1 : 0.88,
                    transition: "background 0.12s, border-color 0.12s, opacity 0.12s",
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = "var(--color-warm-accent)"; e.currentTarget.style.opacity = "1"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "var(--color-warm-border)"; e.currentTarget.style.opacity = "0.88"; } }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
              <button onClick={back} disabled={current === 0} className={current === 0 ? "" : "pv-btn-ghost"}
                style={current === 0 ? { opacity: 0.3, padding: "11px 22px", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-text-light)", background: "none", border: "1.5px solid var(--color-warm-border)", borderRadius: 0, cursor: "not-allowed" } : {}}
              >
                ← Back
              </button>
              <span className="pv-mono-label" style={{ color: "var(--color-warm-text-light)" }}>
                Tap to continue
              </span>
            </div>
          </div>
        ) : (
          // Report
          <div>
            {/* Score band */}
            <div className="pv-card" style={{ padding: "40px 40px 32px", textAlign: "center", marginBottom: "24px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div className="pv-mono-label" style={{ marginBottom: "12px", color: "var(--color-warm-text-light)" }}>
                Your Score · {timestampString()}
              </div>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                fontSize: "84px", letterSpacing: "-0.02em",
                color: TIER_COLOR[tier.cls], lineHeight: 1, marginBottom: "8px",
              }}>
                {score}
              </div>
              <div className="pv-mono-label" style={{ marginBottom: "20px", color: "var(--color-warm-text-light)" }}>
                out of 30
              </div>
              <div style={{
                display: "inline-block",
                padding: "8px 24px",
                border: `2px solid ${TIER_COLOR[tier.cls]}`,
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.42em", textTransform: "uppercase",
                color: TIER_COLOR[tier.cls],
              }}>
                Tier · {tier.label}
              </div>
            </div>

            {/* Verdict + detail */}
            <div className="pv-card" style={{ padding: "32px 36px 28px", marginBottom: "20px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div className="pv-mono-label" style={{ marginBottom: "14px" }}>Verdict</div>
              <p style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "22px", letterSpacing: "0.005em",
                color: "var(--color-warm-text)", lineHeight: 1.3,
                margin: "0 0 16px",
              }}>
                {tier.verdict}
              </p>
              <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
                {tier.detail}
              </p>
            </div>

            {/* Recommendations */}
            <div className="pv-card" style={{ padding: "32px 36px 28px", marginBottom: "20px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div className="pv-mono-label" style={{ marginBottom: "16px" }}>Three calibrated next steps</div>
              <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "16px", counterReset: "rec-counter" }}>
                {tier.recs.map((rec, i) => (
                  <li key={i} style={{
                    display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px",
                    paddingTop: "16px",
                    borderTop: i === 0 ? "none" : "1px dashed var(--color-warm-border)",
                  }}>
                    <span className="pv-italic" style={{
                      fontSize: "28px", color: "var(--color-warm-accent)",
                      lineHeight: 1, fontWeight: 400, paddingTop: "2px",
                    }}>
                      {romanNumeral(i + 1)}
                    </span>
                    <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.92, lineHeight: 1.6, margin: 0 }}>
                      {rec}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA */}
            <section style={{
              padding: "40px 36px 36px",
              borderTop: "1px solid var(--color-warm-border)",
              borderBottom: "1px solid var(--color-warm-border)",
              textAlign: "center",
              marginBottom: "32px",
            }}>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
                fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
              }}>
                ✦
              </div>
              <h2 style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "clamp(22px, 4vw, 32px)", letterSpacing: "0.02em",
                color: "var(--color-warm-text)", textTransform: "uppercase",
                marginBottom: "16px", lineHeight: 1.15, margin: "0 0 16px",
              }}>
                Where to <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>go next.</em>
              </h2>
              <p className="pv-italic" style={{
                fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85,
                maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.55,
              }}>
                Based on your tier, this session is the right fit. No upsell — if I think you don&apos;t need it, I&apos;ll tell you straight up.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                {tier.sessionCta.href.startsWith("mailto:") ? (
                  <a href={tier.sessionCta.href} className="pv-btn-primary">
                    {tier.sessionCta.label}
                  </a>
                ) : (
                  <Link href={tier.sessionCta.href} className="pv-btn-primary">
                    {tier.sessionCta.label}
                  </Link>
                )}
                <Link href="/ai-cost-calculator" className="pv-btn-ghost">
                  Quantify it: AI Cost Calculator →
                </Link>
              </div>
            </section>

            {/* Restart */}
            <div style={{ textAlign: "center" }}>
              <button onClick={restart} className="pv-btn-ghost">
                Take it again ↺
              </button>
            </div>
          </div>
        )}

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
        <Link href="/consulting" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← Consulting</Link>
      </footer>
    </div>
  );
}

function timestampString() {
  return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function romanNumeral(n: number) {
  return ["i.", "ii.", "iii."][n - 1] ?? `${n}.`;
}
