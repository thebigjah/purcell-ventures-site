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
    context: "Email, proposals, follow-ups, scripts, anything written.",
    options: [
      { label: "From scratch every time", points: 0 },
      { label: "From a small template library we maintain", points: 1 },
      { label: "We use ChatGPT or Claude as a draft starter, then edit", points: 2 },
      { label: "We keep prompt libraries and start from AI drafts by default", points: 3 },
    ],
  },
  {
    text: "When did your team last adopt a new tool that saved 5 or more hours a week?",
    context: "A whole new tool that changed how someone works, rather than a new feature.",
    options: [
      { label: "Can't think of one", points: 0 },
      { label: "A few years ago", points: 1 },
      { label: "In the last 12 months", points: 2 },
      { label: "Multiple in the last 6 months", points: 3 },
    ],
  },
  {
    text: "If a competitor automated 50% of your team's daily admin work tomorrow, how long would it take you to match them?",
    context: "Count the time to integrate it into daily work, beyond signing up.",
    options: [
      { label: "We'd never catch up, we don't know what they'd be doing", points: 0 },
      { label: "6+ months of internal restructure", points: 1 },
      { label: "1 to 3 months with help", points: 2 },
      { label: "Already there or close", points: 3 },
    ],
  },
  {
    text: "Which describes your operations/admin workload best?",
    context: "Count the work your team repeats every week.",
    options: [
      { label: "80% manual, mostly the same tasks every week", points: 0 },
      { label: "50/50, some automation, lots of manual fallback", points: 1 },
      { label: "Mostly tooled, but humans review and approve everything", points: 2 },
      { label: "Highly automated, and humans handle only the edge cases", points: 3 },
    ],
  },
  {
    text: "When you onboard a new team member, how is institutional knowledge transferred?",
    context: "Process docs, recordings, shadowing, or 'figure it out'?",
    options: [
      { label: "Shadow a senior person, ask questions, sink or swim", points: 0 },
      { label: "Written docs that are mostly out of date", points: 1 },
      { label: "Docs we keep current, maybe with a video library", points: 2 },
      { label: "An AI-searchable knowledge base that new hires can ask questions", points: 3 },
    ],
  },
  {
    text: "How does your team make decisions when data is involved?",
    context: "Customer trends, sales numbers, operational metrics.",
    options: [
      { label: "Gut feel. We rarely pull numbers", points: 0 },
      { label: "Someone runs reports manually when asked", points: 1 },
      { label: "We have a dashboard people check weekly", points: 2 },
      { label: "Real-time dashboards with AI summaries of what changed and why", points: 3 },
    ],
  },
  {
    text: "How does your team produce marketing and content?",
    context: "Social posts, blog content, ads, email campaigns.",
    options: [
      { label: "We produce almost no content", points: 1 },
      { label: "Everything written by humans from scratch", points: 0 },
      { label: "AI-assisted drafts, human-edited and scheduled", points: 2 },
      { label: "AI drafts and schedules it, and a person approves it", points: 3 },
    ],
  },
  {
    text: "What's your team's read on the next 18 months of AI?",
    context: "How your team talks about AI.",
    options: [
      { label: "It's overhyped, we're not changing anything", points: 0 },
      { label: "We know we should learn it, haven't gotten to it", points: 1 },
      { label: "We're testing tools, and some are sticking", points: 2 },
      { label: "AI is part of our planning every quarter", points: 3 },
    ],
  },
  {
    text: "If you needed a custom AI-powered tool built for your specific workflow this month, what would happen?",
    context: "Internal capability or vendor reach.",
    options: [
      { label: "Wouldn't know where to start", points: 0 },
      { label: "We'd post on Upwork or hire a generalist", points: 1 },
      { label: "We have a developer or consultant we'd call", points: 2 },
      { label: "Our own team could build a working first version within the week", points: 3 },
    ],
  },
  {
    text: "Last question: if your job were automated tomorrow, how prepared are you personally?",
    context: "Answer for yourself, not the team.",
    options: [
      { label: "Hadn't thought about it", points: 0 },
      { label: "I'd struggle but figure it out", points: 1 },
      { label: "I've been building skills that would carry over", points: 2 },
      { label: "I'd be the one building the tool that did it", points: 3 },
    ],
  },
];

const TIERS: Tier[] = [
  {
    max: 9,
    label: "AT RISK",
    cls: "low",
    verdict: "Your team does most of its work by hand today.",
    detail: "One focused session on one workflow is a reasonable place to start.",
    recs: [
      "Pick one weekly workflow that is all manual work. Spend 2 hours automating only that one.",
      "Subscribe to one AI-for-business newsletter (Lenny's, AI Breakdown) and read it 5 minutes a day for 90 days to learn the vocabulary.",
      "Book a 2-hour 'AI Basics for Business' session, which I built for this tier.",
    ],
    sessionCta: { label: "Book AI Basics for Business", href: "/consulting/book" },
  },
  {
    max: 17,
    label: "WAKING UP",
    cls: "mid",
    verdict: "Your team knows AI matters and has not built it into daily work yet.",
    detail: "The next step is choosing one workflow and building around it.",
    recs: [
      "List your team's 5 most time-consuming workflows. Rank them by hours per week times how often they repeat. The top one is your first automation candidate.",
      "Give one person 4 hours a week, on the schedule, for AI tool research and small pilots.",
      "Pick a 3-hour hands-on session, ChatGPT in Your Workflow or AI for Marketing, and bring the team and your own work examples.",
    ],
    sessionCta: { label: "Book a Hands-On Session", href: "/consulting/book" },
  },
  {
    max: 24,
    label: "MOVING",
    cls: "high",
    verdict: "Your team already builds with AI.",
    detail: "The next step is connecting the separate AI tools you use into one workflow.",
    recs: [
      "Map your AI tools and find where someone retypes an AI output into another system. Automate that step next.",
      "Hold a monthly AI demo day where anyone on the team can show a new tool or workflow.",
      "Consider Custom Team Training. At this tier a general session will repeat what you know, so the session should be built around your own tools.",
    ],
    sessionCta: { label: "Book Custom Team Training", href: "/consulting/book" },
  },
  {
    max: 30,
    label: "BUILDING THE FUTURE",
    cls: "high",
    verdict: "Your team already runs much of its work through AI.",
    detail: "Training will add little at this tier. A strategy conversation about selling or packaging what you have built is more useful.",
    recs: [
      "Write down how your AI setup works as a method someone else could follow. Businesses close to yours may be able to use it.",
      "Decide whether your AI capability is something to sell as a product, sell as a service, or keep as an advantage. Each needs a different plan.",
      "Email me about a strategy consult instead of a training session.",
    ],
    sessionCta: { label: "Email Elijah for a Strategy Consult", href: "mailto:elijah@purcell-ventures.com?subject=Strategic%20Consult%20Inquiry" },
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
          <div className="pv-mono-label">Ten questions, three minutes</div>
          <h1 style={{ margin: 0 }}>
            AI Readiness <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Test.</em>
          </h1>
          <p className="deck">
            How far along is your team with AI? No email required.
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
                Back
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
                Your score, {timestampString()}
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
                Tier: {tier.label}
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
              <div className="pv-mono-label" style={{ marginBottom: "16px" }}>Three next steps</div>
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
              }}></div>
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
                This session matches your tier. If I think you don&apos;t need it, I&apos;ll tell you.
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
                  Estimate the savings with the AI Cost Calculator
                </Link>
              </div>
            </section>

            {/* Restart */}
            <div style={{ textAlign: "center" }}>
              <button onClick={restart} className="pv-btn-ghost">
                Take it again
              </button>
            </div>
          </div>
        )}

        {/* ALWAYS-RENDERED EXPLANATORY COPY.
            The quiz shows one question at a time, so nine of the ten questions never reach
            the served HTML and the page rendered 192 visible words. Restructuring working
            quiz state to fix that is a bigger change than it is worth; this section is
            additive and gives a crawler, and a person deciding whether to start, something
            to read. */}
        <section style={{ maxWidth: "720px", margin: "72px auto 0", padding: "0 8px", fontSize: "16px", lineHeight: 1.75 }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 600, margin: "0 0 14px", color: "var(--color-warm-text)" }}>
            What the test measures
          </h2>
          <p>
            Ten questions about how your team works right now. They ask what you
            currently do when you draft a customer email, when you answer the same question
            for the twentieth time, when someone leaves and takes a process with them.
          </p>
          <p>
            The questions cover drafting and written communication, new tools, repeated
            manual work, how knowledge is stored and found, how data informs decisions,
            marketing content, and how your team and you personally think about AI. Your
            answers show which of those areas are ready for AI and which are not.
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 600, margin: "36px 0 14px", color: "var(--color-warm-text)" }}>
            What you get back
          </h2>
          <p>
            A readiness level and a short list of what to do first, in order. It needs no
            email and sends no follow-up. It runs in your browser and takes three minutes.
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 600, margin: "36px 0 14px", color: "var(--color-warm-text)" }}>
            Who built it
          </h2>
          <p>
            Elijah Purcell, founder and CEO of{" "}
            <Link href="/about" style={{ color: "var(--color-warm-accent)" }}>Purcell Ventures LLC</Link>{" "}
            and an autonomous AI agent systems engineer, working out of Tuscaloosa, Alabama.
            Each answer scores 0 to 3 points, for a total out of 30, and the total places you
            in one of four tiers. I set the point values myself, drawing on
            running a fifteen-agent workforce that handles this company&apos;s proposals,
            audits and compliance on a schedule.
          </p>
          <p>
            If the result raises questions, the{" "}
            <Link href="/consulting" style={{ color: "var(--color-warm-accent)" }}>consulting page</Link>{" "}
            explains how sessions work, and{" "}
            <Link href="/ai-consultant-tuscaloosa" style={{ color: "var(--color-warm-accent)" }}>local work in Tuscaloosa</Link>{" "}
            covers in-person engagements. The first conversation is free.
          </p>
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
        <span>© {new Date().getFullYear()} Purcell Ventures LLC, Acworth, GA</span>
        <Link href="/consulting" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>Consulting</Link>
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
