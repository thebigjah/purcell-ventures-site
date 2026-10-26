"use client";

// Rebuilt on the page kit 26 Oct 2026. The questions, point values, tier thresholds and
// scoring are unchanged. Only labels and copy changed: tier names are in sentence case and
// the per-tier colours (red, amber, green) are gone, so every tier reads in the site gold.

import { useState } from "react";
import Link from "next/link";
import { PageHero, Section, Button } from "@/app/components/ui";

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
      { label: "We start drafts in ChatGPT or Claude, then edit", points: 2 },
      { label: "We keep prompt libraries and start from AI drafts by default", points: 3 },
    ],
  },
  {
    text: "When did your team last adopt a new tool that saved 5 or more hours a week?",
    context: "A whole new tool that changed how someone works, rather than a new feature.",
    options: [
      { label: "I cannot think of one", points: 0 },
      { label: "A few years ago", points: 1 },
      { label: "In the last 12 months", points: 2 },
      { label: "Several in the last 6 months", points: 3 },
    ],
  },
  {
    text: "If a competitor automated 50% of your team's daily admin work tomorrow, how long would it take you to match them?",
    context: "Count the time to integrate it into daily work, beyond signing up.",
    options: [
      { label: "We would never catch up. We would not know what they were doing", points: 0 },
      { label: "6 months or more of internal restructuring", points: 1 },
      { label: "1 to 3 months with help", points: 2 },
      { label: "Already there or close", points: 3 },
    ],
  },
  {
    text: "Which describes your operations and admin workload best?",
    context: "Count the work your team repeats every week.",
    options: [
      { label: "80% manual, mostly the same tasks every week", points: 0 },
      { label: "Half and half: some automation, with a lot of manual fallback", points: 1 },
      { label: "Mostly tooled, but humans review and approve everything", points: 2 },
      { label: "Highly automated, and humans handle only the edge cases", points: 3 },
    ],
  },
  {
    text: "When a new team member starts, how do they learn what the team knows?",
    context: "Process documents, recordings, shadowing, or working it out alone.",
    options: [
      { label: "They shadow a senior person, ask questions and learn by trial", points: 0 },
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
      { label: "People write everything from scratch", points: 0 },
      { label: "AI helps with drafts, and people edit and schedule them", points: 2 },
      { label: "AI drafts and schedules it, and a person approves it", points: 3 },
    ],
  },
  {
    text: "How does your team see the next 18 months of AI?",
    context: "How your team talks about AI.",
    options: [
      { label: "It is overhyped and we are not changing anything", points: 0 },
      { label: "We know we should learn it and have not started", points: 1 },
      { label: "We're testing tools, and some are sticking", points: 2 },
      { label: "AI is part of our planning every quarter", points: 3 },
    ],
  },
  {
    text: "If you needed a custom AI-powered tool built for your specific workflow this month, what would happen?",
    context: "Internal capability or vendor reach.",
    options: [
      { label: "We would not know where to start", points: 0 },
      { label: "We would post on Upwork or hire a generalist", points: 1 },
      { label: "We have a developer or consultant we would call", points: 2 },
      { label: "Our own team could build a working first version within the week", points: 3 },
    ],
  },
  {
    text: "Last question: if your job were automated tomorrow, how prepared are you personally?",
    context: "Answer for yourself, not the team.",
    options: [
      { label: "I have not thought about it", points: 0 },
      { label: "I would struggle, then work it out", points: 1 },
      { label: "I have been building skills that would carry over", points: 2 },
      { label: "I would be the one building the tool that did it", points: 3 },
    ],
  },
];

const TIERS: Tier[] = [
  {
    max: 9,
    label: "Mostly manual",
    cls: "low",
    verdict: "Your team does most of its work by hand today.",
    detail: "One focused session on one workflow is a reasonable place to start.",
    recs: [
      "Pick one weekly workflow that is all manual work. Spend 2 hours automating only that one.",
      "Subscribe to one AI-for-business newsletter (Lenny's, AI Breakdown) and read it 5 minutes a day for 90 days to learn the vocabulary.",
      "Book the 2-hour AI basics for business session, which I built for this tier.",
    ],
    sessionCta: { label: "Book AI basics for business", href: "/consulting/book" },
  },
  {
    max: 17,
    label: "Getting started",
    cls: "mid",
    verdict: "Your team knows AI matters and has not built it into daily work yet.",
    detail: "The next step is choosing one workflow and building around it.",
    recs: [
      "List your team's 5 most time-consuming workflows. Rank them by hours per week times how often they repeat. The top one is your first automation candidate.",
      "Give one person 4 hours a week, on the schedule, for AI tool research and small pilots.",
      "Book a hands-on session, ChatGPT in your workflow (3 hours) or AI for marketing, and bring the team and examples of your own work.",
    ],
    sessionCta: { label: "Book a hands-on session", href: "/consulting/book" },
  },
  {
    max: 24,
    label: "Using AI daily",
    cls: "high",
    verdict: "Your team already builds with AI.",
    detail: "The next step is connecting the separate AI tools you use into one workflow.",
    recs: [
      "Map your AI tools and find where someone retypes an AI output into another system. Automate that step next.",
      "Hold a monthly AI demo day where anyone on the team can show a new tool or workflow.",
      "Consider custom team training. At this tier a general session repeats what you know, so I build the session around your own tools.",
    ],
    sessionCta: { label: "Book custom team training", href: "/consulting/book" },
  },
  {
    max: 30,
    label: "Built around AI",
    cls: "high",
    verdict: "Your team already runs much of its work through AI.",
    detail: "Training will add little at this tier. A strategy conversation about selling or packaging what you have built is more useful.",
    recs: [
      "Write down how your AI setup works as a method someone else could follow. Businesses close to yours may be able to use it.",
      "Decide whether your AI capability is something to sell as a product, sell as a service, or keep as an advantage. Each needs a different plan.",
      "Email me about a strategy consult instead of a training session.",
    ],
    sessionCta: { label: "Email Elijah about a strategy consult", href: "mailto:elijah@purcell-ventures.com?subject=Strategic%20Consult%20Inquiry" },
  },
];

function tierFromScore(score: number): Tier {
  for (const t of TIERS) if (score <= t.max) return t;
  return TIERS[TIERS.length - 1];
}

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
    <main>
      <PageHero
        planet="book"
        kicker="Ten questions, three minutes"
        title="AI readiness test"
        lede="How far along your team is with AI, scored out of 30, with three next steps. No email required."
      />

      {!done ? (
        <Section stack>
          <div className="ui-narrow" style={{ padding: 0, margin: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }} className="ui-muted ui-small">
              <span>Question {current + 1} of {QUESTIONS.length}</span>
              <div aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--line)", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "var(--gold)", width: `${progress}%`, transition: "width 0.3s ease-out" }} />
              </div>
              <span>{Math.round(progress)}%</span>
            </div>

            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.2, margin: "0 0 10px" }}>
              {QUESTIONS[current].text}
            </h2>
            <p className="ui-muted" style={{ margin: "0 0 24px" }}>{QUESTIONS[current].context}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUESTIONS[current].options.map((opt, i) => {
                const isSelected = answers[current] === opt.points;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => pick(opt.points)}
                    className={`ui-btn${isSelected ? "" : " ui-btn--ghost"}`}
                    style={{ width: "100%", justifyContent: "flex-start", textAlign: "left", fontWeight: 400, lineHeight: 1.4, minHeight: 52 }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="ui-hero__actions">
              <button
                type="button"
                onClick={back}
                disabled={current === 0}
                className="ui-btn ui-btn--ghost"
                style={current === 0 ? { opacity: 0.35, cursor: "not-allowed" } : undefined}
              >
                Back
              </button>
              <span className="ui-muted ui-small">Pick an answer to continue</span>
            </div>
          </div>
        </Section>
      ) : (
        <>
          <Section title="Your score" intro={timestampString()}>
            <div className="ui-figures">
              <div className="ui-figure"><b>{score}</b><span>out of 30</span></div>
              <div className="ui-figure"><b>{tier.label}</b><span>your tier</span></div>
            </div>
            <div className="ui-prose" style={{ marginTop: 32 }}>
              <p><strong>{tier.verdict}</strong></p>
              <p>{tier.detail}</p>
            </div>
          </Section>

          <Section title="Three next steps">
            <div className="ui-prose">
              <ol>
                {tier.recs.map((rec, i) => <li key={i}>{rec}</li>)}
              </ol>
            </div>
          </Section>

          <Section title="The session for your tier" intro="If I think you do not need it, I will tell you.">
            <div className="ui-hero__actions" style={{ marginTop: 0 }}>
              <Button href={tier.sessionCta.href}>{tier.sessionCta.label}</Button>
              <Button href="/ai-cost-calculator" ghost>Estimate the savings with the AI cost calculator</Button>
              <button type="button" onClick={restart} className="ui-btn ui-btn--ghost">Take it again</button>
            </div>
          </Section>
        </>
      )}

      {/* ALWAYS-RENDERED EXPLANATORY COPY.
          The quiz shows one question at a time, so nine of the ten questions never reach
          the served HTML and the page rendered 192 visible words. Restructuring working
          quiz state to fix that is a bigger change than it is worth; this section is
          additive and gives a crawler, and a person deciding whether to start, something
          to read. */}
      <Section title="What the test measures">
        <div className="ui-prose">
          <p>
            Ten questions about how your team works today: how you write to customers, how
            recently you adopted a tool that saved time, how much admin work repeats every week,
            how new staff learn the job, how you use data, how you produce marketing, and how you
            and your team think about AI.
          </p>
          <p>
            Your answers show which parts of your work are ready for AI and which are not.
          </p>
        </div>
      </Section>

      <Section title="What you get back">
        <div className="ui-prose">
          <p>
            A score out of 30, one of four levels, and three next steps in the order to do them.
            The test runs in your browser, takes three minutes, and asks for no email.
          </p>
        </div>
      </Section>

      <Section title="Who built it">
        <div className="ui-prose">
          <p>
            I am Elijah Purcell, Founder/CEO of <Link href="/about">Purcell Ventures LLC</Link> in
            Tuscaloosa, Alabama, and I wrote this test. Each answer scores 0 to 3 points, for a
            total out of 30, and the total places you in one of four tiers. The point values come
            from running COSMIC, a station of 57 AI agents in 17 rooms that does my company&apos;s
            proposals, site audits and security checks.
          </p>
          <p>
            If the result raises questions, the <Link href="/consulting">consulting page</Link>{" "}
            explains how sessions work, and <Link href="/ai-consultant-tuscaloosa">local work in
            Tuscaloosa</Link> covers in-person engagements. The first conversation is free.
          </p>
        </div>
      </Section>
    </main>
  );
}

function timestampString() {
  return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
