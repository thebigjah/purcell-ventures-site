"use client";
import { useState } from "react";
import Link from "next/link";

// ── Lemon Squeezy URLs — swap when account is live ────────────────────────────
const LS_FULL  = "#waitlist";
const LS_PLAN  = "#waitlist";
const LS_COACH = "#waitlist";
const LS_ONE   = "#waitlist";

// ── Curriculum ────────────────────────────────────────────────────────────────
const MODULES = [
  {
    num: "01", title: "The Automation Mindset", lessonCount: 3, totalMin: 35,
    lessons: [
      { id: "1-1", title: "The 'more than once' rule — how I decide what to automate", duration: "12 min", format: "Camera" },
      { id: "1-2", title: "The stack audit — mapping your daily repetitive tasks", duration: "13 min", format: "Camera + Screen" },
      { id: "1-3", title: "Picking your first build — scope, effort, and impact", duration: "10 min", format: "Camera" },
    ],
  },
  {
    num: "02", title: "Your AI Foundation", lessonCount: 3, totalMin: 37,
    lessons: [
      { id: "2-1", title: "Setting up your environment — Python, APIs, keys, .env files", duration: "13 min", format: "Screen share" },
      { id: "2-2", title: "Your first AI call — prompting basics and output handling", duration: "12 min", format: "Screen share" },
      { id: "2-3", title: "Building reusable AI functions — don't copy-paste, build a module", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    num: "03", title: "Email Automation", lessonCount: 4, totalMin: 50,
    lessons: [
      { id: "3-1", title: "How I built my email bot — architecture walkthrough", duration: "13 min", format: "Camera + Screen" },
      { id: "3-2", title: "Connecting to Gmail — OAuth setup, IMAP, reading emails with Python", duration: "14 min", format: "Screen share" },
      { id: "3-3", title: "AI-powered triage — categorize and prioritize with Claude", duration: "12 min", format: "Screen share" },
      { id: "3-4", title: "Auto-drafting responses — generating replies you actually send", duration: "11 min", format: "Camera + Screen" },
    ],
  },
  {
    num: "04", title: "Content Automation Pipelines", lessonCount: 4, totalMin: 53,
    lessons: [
      { id: "4-1", title: "My YouTube pipeline — how it runs without me", duration: "14 min", format: "Camera + Screen" },
      { id: "4-2", title: "Downloading, transcribing, and clipping — yt-dlp + Whisper", duration: "13 min", format: "Screen share" },
      { id: "4-3", title: "AI commentary and titling — adding your voice at scale", duration: "13 min", format: "Screen share" },
      { id: "4-4", title: "Video assembly, thumbnails, and uploading — MoviePy + YouTube API", duration: "13 min", format: "Screen share" },
    ],
  },
  {
    num: "05", title: "Scraping & Lead Generation", lessonCount: 3, totalMin: 38,
    lessons: [
      { id: "5-1", title: "Web scraping fundamentals — Craigslist, Nextdoor, and public data", duration: "13 min", format: "Screen share" },
      { id: "5-2", title: "The Places API approach — finding businesses that need help", duration: "13 min", format: "Screen share" },
      { id: "5-3", title: "Making scrapers smart — AI filtering and scoring", duration: "12 min", format: "Camera + Screen" },
    ],
  },
  {
    num: "06", title: "Personal AI Assistants", lessonCount: 3, totalMin: 38,
    lessons: [
      { id: "6-1", title: "Building a personal AI assistant — memory, voice, and screen vision", duration: "14 min", format: "Camera + Screen" },
      { id: "6-2", title: "Persistent memory and context — making your AI remember you", duration: "13 min", format: "Screen share" },
      { id: "6-3", title: "Voice input and output — ElevenLabs, Web Speech, and hands-free AI", duration: "11 min", format: "Screen share" },
    ],
  },
  {
    num: "07", title: "Scheduling, Monitoring & Reliability", lessonCount: 3, totalMin: 37,
    lessons: [
      { id: "7-1", title: "Running on schedule — Task Scheduler, cron, and the Python schedule library", duration: "13 min", format: "Screen share" },
      { id: "7-2", title: "Error handling and monitoring — so things don't silently fail", duration: "12 min", format: "Screen share" },
      { id: "7-3", title: "Config-driven systems — tools you can reuse and share", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    num: "08", title: "Stack, Scale & What's Next", lessonCount: 2, totalMin: 25,
    lessons: [
      { id: "8-1", title: "Your complete AI stack — assembling the pieces", duration: "13 min", format: "Camera + Screen" },
      { id: "8-2", title: "Turning tools into products — from personal use to sellable thing", duration: "12 min", format: "Camera" },
    ],
  },
];

// ── Pricing ───────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Self-Paced",
    price: "$397",
    plan: "or 3 × $139",
    features: [
      "All 25 lessons (5.5+ hrs)",
      "7 starter code templates",
      "Full resource pack",
      "Lifetime access",
    ],
    cta: "Enroll Now",
    href: LS_FULL,
    highlight: false,
  },
  {
    name: "Coaching",
    price: "$1,297",
    plan: "or 3 × $449",
    features: [
      "Everything in Self-Paced",
      "3 live group build sessions",
      "Code review on your tools",
      "Private cohort chat",
    ],
    cta: "Join Coaching",
    href: LS_COACH,
    highlight: true,
  },
  {
    name: "1:1 Intensive",
    price: "$2,997",
    plan: "payment plans available",
    features: [
      "Everything in Coaching",
      "3 private hours with Elijah",
      "Custom tool architecture review",
      "90-day email access",
    ],
    cta: "Apply for 1:1",
    href: LS_ONE,
    highlight: false,
  },
];

// ── Resource Pack ─────────────────────────────────────────────────────────────
const RESOURCES = [
  { title: "Automation Audit Worksheet", module: "Module 1", desc: "Scoring framework for ranking tasks by frequency × time cost × annoyance" },
  { title: "Python Environment Setup Guide", module: "Module 2", desc: "Step-by-step for every OS, with every common error and its fix" },
  { title: "Email Bot Starter Template", module: "Module 3", desc: "Stripped version of the real email-bot — add your keys and go" },
  { title: "YouTube Pipeline Starter Template", module: "Module 4", desc: "Stripped pipeline config + entry script with all five steps scaffolded" },
  { title: "Google Places Lead Gen Script", module: "Module 5", desc: "Scoring + export to Sheets, parameterized by city and business type" },
  { title: "Reusable AI Wrapper Module", module: "Modules 2–7", desc: "The ai_engine.py pattern — import it into any project you build going forward" },
  { title: "Project Config Template", module: "Module 7", desc: "YAML config + CLI boilerplate you can fork for any new automation project" },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Do I need to know Python already?",
    a: "No, but you need to be willing to learn. Module 2 walks you through setup from scratch. If you can copy code, read error messages, and search for answers, you can build every tool in this course. I won't hold your hand through basic syntax — there are free resources for that — but I'll teach you the patterns that matter.",
  },
  {
    q: "What if I'm not very technical?",
    a: "The mindset modules (1 and 8) are accessible to anyone. The build modules require real effort. If you've never written code before, this is not the right starting point — take a free Python basics course first, then come back. If you've written any code at all and just haven't done automation, you're ready.",
  },
  {
    q: "How is this different from an n8n course or Zapier tutorial?",
    a: "No-code tool tutorials teach you to click through a platform someone else built. This course teaches you to build your own tools from scratch — which means you can build things no-code platforms can't do, you own the code forever, and you understand what's actually happening. We do use n8n/Zapier as glue when it makes sense, but they're never the main event.",
  },
  {
    q: "Are these tools you actually run?",
    a: "Yes. The email bot processes my inbox every day. The content pipeline runs on a schedule and generates real AdSense revenue. I built a listing monitor to surface job leads automatically, an inbox harvester to process bulk email in minutes instead of days, and a personal AI that sits on my desktop right now. None of this was built for the course — the course was built around tools that already existed and already worked.",
  },
  {
    q: "What do I get in the resource pack?",
    a: "Seven real, stripped versions of the tools I run — not toy demos. API calls removed, config files pre-structured, patterns documented. You plug in your keys and you have a working starting point. The Automation Audit Worksheet, setup guides, and project config template are included too.",
  },
  {
    q: "What's the refund policy?",
    a: "If you go through Module 2 and the technical barrier is genuinely beyond what you can bridge, contact me within 7 days of purchase and I'll refund you. I don't offer refunds after you've accessed the full curriculum — this isn't a library.",
  },
  {
    q: "Will this work on Windows?",
    a: "Yes. All my tools were built on Windows. Every setup walkthrough covers Windows first. You won't need WSL for anything in the course, though I'll show you how to set it up if you want it.",
  },
  {
    q: "I already bought the Business Launch course. Is there a discount?",
    a: "Email me directly at elijah@purcell-ventures.com — I take care of people who've already bought.",
  },
];

export default function ZeroToAutomatedPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalLessons = MODULES.reduce((s, m) => s + m.lessonCount, 0);
  const totalMin = MODULES.reduce((s, m) => s + m.totalMin, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 120px" }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: "72px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>
            Purcell Ventures — Course
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, color: "var(--color-warm-text)", lineHeight: 1.0, marginBottom: "20px" }}>
            Zero to Automated
          </h1>
          <p style={{ fontSize: "19px", fontWeight: 500, color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "-0.01em" }}>
            Build the AI tools you actually need — taught by someone who uses them every day.
          </p>
          <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.8, maxWidth: "600px", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: "32px" }}>
            I automated my email inbox, my YouTube channel, my lead generation, and my scholarship search.
            Here is exactly how I built every one of them — and how you can build yours.
          </p>

          {/* Stats bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", paddingTop: "28px", borderTop: "1px solid var(--color-warm-border)" }}>
            {[
              { label: "Modules", value: "8" },
              { label: "Lessons", value: `${totalLessons}` },
              { label: "Video", value: `${Math.round(totalMin / 60 * 10) / 10} hrs` },
              { label: "Code Templates", value: "7" },
              { label: "Real tools running in production", value: "5+" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "var(--color-warm-text)", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", marginTop: "2px", fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── "Real tools" proof section ── */}
        <div style={{ marginBottom: "80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
            The tools you'll learn to build
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden", marginBottom: "24px" }}>
            {[
              {
                name: "Email Bot",
                desc: "Reads your inbox, categorizes every message by urgency, and drafts replies using Claude. Process 40+ emails in under 2 minutes instead of spending an hour on manual triage.",
                stats: "Runs daily · Gmail IMAP + Claude API · SQLite",
              },
              {
                name: "Content Pipeline",
                desc: "Downloads source footage, generates AI commentary, assembles with captions and a thumbnail, and uploads automatically. A fully hands-off production workflow that runs on a schedule.",
                stats: "Runs on schedule · yt-dlp + MoviePy + YouTube API",
              },
              {
                name: "Listing Monitor",
                desc: "Watches Craigslist, Facebook Marketplace, or any job board for postings that match your criteria. Filters noise, deduplicates against what it's already seen, and exports clean leads to a spreadsheet.",
                stats: "Runs on schedule · Selenium + gspread",
              },
              {
                name: "Opportunity Scorer",
                desc: "Queries any data source for prospects or leads, scores each result against your custom criteria, and outputs a ranked list of who to contact first.",
                stats: "Runs on demand · Places API + scoring algo",
              },
              {
                name: "Inbox Harvester",
                desc: "Processes hundreds of emails or documents at once — extracting deadlines, prices, contacts, or any structured data — and builds a prioritized list in minutes instead of days.",
                stats: "Batch processing · Gmail OAuth + Claude",
              },
              {
                name: "Personal AI Assistant",
                desc: "A desktop overlay built around how you work — voice input, voice output, screen vision, persistent memory, and custom slash commands for your most common tasks.",
                stats: "Always on · Electron + Claude API + ElevenLabs",
              },
            ].map(t => (
              <div key={t.name} style={{ background: "var(--color-warm-bg)", padding: "28px 24px" }}>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "10px" }}>{t.name}</h3>
                <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, marginBottom: "14px", fontFamily: "var(--font-dm-sans), sans-serif" }}>{t.desc}</p>
                <div style={{ fontSize: "11px", color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.04em" }}>{t.stats}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.7 }}>
            Every other AI course teaches you a platform someone else built. This course teaches you to build tools
            you will actually run — with code you own, patterns you can extend, and real problems they solve.
          </p>
        </div>

        {/* ── Who it's for ── */}
        <div style={{ marginBottom: "80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
            Who this is for
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
            {[
              { who: "Solopreneurs and freelancers", desc: "You're spending 5+ hours a week on tasks that follow the same pattern. You know they could be automated — you just don't know where to start." },
              { who: "Students who want to build real things", desc: "You're not interested in tutorial hell or classroom exercises. You want to finish a course and have something running on your machine that actually does something." },
              { who: "Business Launch alumni", desc: "You've built the business. Now automate it. Module 7-1 of the Business Launch course was specifically designed to point here." },
              { who: "Consulting clients", desc: "You saw one of my tools running during a session and thought: I need that. This course is where you learn to build it yourself." },
            ].map(w => (
              <div key={w.who} style={{ background: "var(--color-warm-bg)", padding: "28px 24px" }}>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "10px" }}>{w.who}</h3>
                <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, fontFamily: "var(--font-dm-sans), sans-serif" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Curriculum ── */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ marginBottom: "28px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>
              Curriculum
            </p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "var(--color-warm-text)" }}>
              8 modules. {totalLessons} lessons. All the code included.
            </h2>
          </div>

          <div style={{ border: "1px solid var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
            {MODULES.map((mod, i) => (
              <div key={mod.num} style={{ borderBottom: i < MODULES.length - 1 ? "1px solid var(--color-warm-border)" : "none" }}>
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "20px 24px", background: openModule === i ? "var(--color-warm-card)" : "var(--color-warm-bg)",
                    border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                    <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "11px", color: "var(--color-warm-accent)", letterSpacing: "0.12em" }}>
                      {mod.num}
                    </span>
                    <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, color: "var(--color-warm-text)" }}>
                      {mod.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                    <span style={{ fontSize: "12px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-inter), sans-serif" }}>
                      {mod.lessonCount} lessons · {mod.totalMin} min
                    </span>
                    <span style={{ fontSize: "18px", color: "var(--color-warm-accent)", transform: openModule === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>
                      +
                    </span>
                  </div>
                </button>
                {openModule === i && (
                  <div style={{ background: "var(--color-warm-card)", borderTop: "1px solid var(--color-warm-border)" }}>
                    {mod.lessons.map((lesson, j) => (
                      <div key={lesson.id} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 24px 14px 40px",
                        borderBottom: j < mod.lessons.length - 1 ? "1px solid var(--color-warm-border)" : "none",
                      }}>
                        <div>
                          <span style={{ fontSize: "11px", fontFamily: "var(--font-inter), sans-serif", color: "var(--color-warm-accent)", marginRight: "10px", letterSpacing: "0.06em" }}>
                            {lesson.id}
                          </span>
                          <span style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                            {lesson.title}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "16px", flexShrink: 0, marginLeft: "16px" }}>
                          <span style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-inter), sans-serif" }}>{lesson.format}</span>
                          <span style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-inter), sans-serif" }}>{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Resource Pack ── */}
        <div style={{ marginBottom: "80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>
            Resource Pack
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>
            7 real tools. Not demos.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", marginBottom: "28px", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.7, maxWidth: "560px" }}>
            Every template is a stripped version of something I actually run. API calls removed, config files pre-structured. You add your keys and you have a working starting point.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
            {RESOURCES.map(r => (
              <div key={r.title} style={{ background: "var(--color-warm-bg)", padding: "24px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "8px", fontFamily: "var(--font-inter), sans-serif" }}>
                  {r.module}
                </div>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "8px" }}>{r.title}</div>
                <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, fontFamily: "var(--font-dm-sans), sans-serif" }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pricing ── */}
        <div style={{ marginBottom: "80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>
            Pricing
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "28px" }}>
            Choose your level of access.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
            {TIERS.map(tier => (
              <div key={tier.name} style={{
                background: tier.highlight ? "var(--color-warm-card)" : "var(--color-warm-bg)",
                padding: "36px 28px",
                position: "relative",
              }}>
                {tier.highlight && (
                  <div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-bg)", background: "var(--color-warm-accent)", padding: "3px 10px", borderRadius: 3, fontFamily: "var(--font-inter), sans-serif" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "16px" }}>
                  {tier.name}
                </div>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 800, color: "var(--color-warm-text)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-warm-text-light)", marginBottom: "24px", fontFamily: "var(--font-inter), sans-serif", marginTop: "4px" }}>
                  {tier.plan}
                </div>
                <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderBottom: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-warm-accent)", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={tier.href} style={{
                  display: "block", textAlign: "center", padding: "12px 0",
                  background: tier.highlight ? "var(--color-warm-accent)" : "transparent",
                  border: `1px solid ${tier.highlight ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                  borderRadius: 4,
                  fontSize: "13px", fontWeight: 700,
                  color: tier.highlight ? "var(--color-warm-bg)" : "var(--color-warm-accent)",
                  textDecoration: "none", letterSpacing: "0.06em",
                  fontFamily: "var(--font-inter), sans-serif",
                }}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Waitlist ── */}
        <WaitlistBlock />

        {/* ── FAQ ── */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>
            FAQ
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "24px" }}>
            Common questions.
          </h2>
          <div style={{ border: "1px solid var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid var(--color-warm-border)" : "none" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "18px 24px", background: openFaq === i ? "var(--color-warm-card)" : "var(--color-warm-bg)",
                    border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-warm-text)", fontFamily: "var(--font-dm-sans), sans-serif", paddingRight: "24px" }}>
                    {faq.q}
                  </span>
                  <span style={{ fontSize: "18px", color: "var(--color-warm-accent)", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", display: "inline-block", flexShrink: 0 }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ background: "var(--color-warm-card)", borderTop: "1px solid var(--color-warm-border)", padding: "16px 24px 20px" }}>
                    <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, fontFamily: "var(--font-dm-sans), sans-serif", margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif" }}>
            Ready to build?
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", lineHeight: 1.1, maxWidth: "500px" }}>
            Stop doing it manually. Start building.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", maxWidth: "440px", lineHeight: 1.7, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            The tools in this course will save you hours every week. The patterns you learn will let you build anything else you need.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
            <a href={LS_FULL} style={{
              padding: "13px 32px", background: "var(--color-warm-accent)", borderRadius: 4,
              fontSize: "14px", fontWeight: 700, color: "var(--color-warm-bg)",
              textDecoration: "none", letterSpacing: "0.06em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              Enroll — $397
            </a>
            <Link href="/courses" style={{
              padding: "13px 24px", border: "1px solid var(--color-warm-border)", borderRadius: 4,
              fontSize: "13px", fontWeight: 600, color: "var(--color-warm-text-muted)",
              textDecoration: "none", letterSpacing: "0.04em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              View All Courses
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Waitlist block (client-side form) ─────────────────────────────────────────
function WaitlistBlock() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      const existing = JSON.parse(localStorage.getItem("pv_course_waitlist") || "[]");
      existing.push({ email, course: "ai-automation", ts: Date.now() });
      localStorage.setItem("pv_course_waitlist", JSON.stringify(existing));
    } catch {}
    setDone(true);
  }

  return (
    <div style={{ marginBottom: "80px", background: "var(--color-warm-card)", borderRadius: 8, padding: "40px 32px", border: "1px solid var(--color-warm-border)" }}>
      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>
        Early Access
      </p>
      {done ? (
        <div>
          <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>You're on the list.</p>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            I'll email you when the course opens — and early access gets a discount.
          </p>
        </div>
      ) : (
        <div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>
            Get notified when Zero to Automated opens.
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "20px", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.7 }}>
            Early access list gets a discount. No spam — one email when it's live.
          </p>
          <form onSubmit={submit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: 1, minWidth: "220px", padding: "11px 16px",
                background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)",
                borderRadius: 4, fontSize: "14px", color: "var(--color-warm-text)",
                fontFamily: "var(--font-dm-sans), sans-serif", outline: "none",
              }}
            />
            <button type="submit" style={{
              padding: "11px 24px", background: "var(--color-warm-accent)", borderRadius: 4,
              border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700,
              color: "var(--color-warm-bg)", letterSpacing: "0.06em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              Join Waitlist
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
