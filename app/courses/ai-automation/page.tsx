"use client";
import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

// ── Lemon Squeezy URLs, swap when account is live ────────────────────────────
const LS_FULL  = "#waitlist";
const LS_PLAN  = "#waitlist";
const LS_COACH = "#waitlist";
const LS_ONE   = "#waitlist";

// ── Curriculum ────────────────────────────────────────────────────────────────
const MODULES = [
  {
    num: "01", title: "The Automation Mindset", lessonCount: 3, totalMin: 35,
    lessons: [
      { id: "1-1", title: "The 'more than once' rule, how I decide what to automate", duration: "12 min", format: "Camera" },
      { id: "1-2", title: "The stack audit, mapping your daily repetitive tasks", duration: "13 min", format: "Camera + Screen" },
      { id: "1-3", title: "Picking your first build, scope, effort, and impact", duration: "10 min", format: "Camera" },
    ],
  },
  {
    num: "02", title: "Your AI Foundation", lessonCount: 3, totalMin: 37,
    lessons: [
      { id: "2-1", title: "Setting up your environment: Python, APIs, keys, .env files", duration: "13 min", format: "Screen share" },
      { id: "2-2", title: "Your first AI call, prompting basics and output handling", duration: "12 min", format: "Screen share" },
      { id: "2-3", title: "Building reusable AI functions as a module instead of copy-paste", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    num: "03", title: "Email Automation", lessonCount: 4, totalMin: 50,
    lessons: [
      { id: "3-1", title: "How I built my email bot, architecture walkthrough", duration: "13 min", format: "Camera + Screen" },
      { id: "3-2", title: "Connecting to Gmail: OAuth setup, IMAP, reading emails with Python", duration: "14 min", format: "Screen share" },
      { id: "3-3", title: "AI-powered triage, categorize and prioritize with Claude", duration: "12 min", format: "Screen share" },
      { id: "3-4", title: "Auto-drafting responses you can send", duration: "11 min", format: "Camera + Screen" },
    ],
  },
  {
    num: "04", title: "Content Automation Pipelines", lessonCount: 4, totalMin: 53,
    lessons: [
      { id: "4-1", title: "My YouTube pipeline, how it runs without me", duration: "14 min", format: "Camera + Screen" },
      { id: "4-2", title: "Downloading, transcribing and clipping with yt-dlp and Whisper", duration: "13 min", format: "Screen share" },
      { id: "4-3", title: "AI commentary and titling, adding your voice at scale", duration: "13 min", format: "Screen share" },
      { id: "4-4", title: "Video assembly, thumbnails and uploading with MoviePy and the YouTube API", duration: "13 min", format: "Screen share" },
    ],
  },
  {
    num: "05", title: "Scraping & Lead Generation", lessonCount: 3, totalMin: 38,
    lessons: [
      { id: "5-1", title: "Web scraping fundamentals: Craigslist, Nextdoor and public data", duration: "13 min", format: "Screen share" },
      { id: "5-2", title: "The Places API approach, finding businesses that need help", duration: "13 min", format: "Screen share" },
      { id: "5-3", title: "AI filtering and scoring for scrapers", duration: "12 min", format: "Camera + Screen" },
    ],
  },
  {
    num: "06", title: "Personal AI Assistants", lessonCount: 3, totalMin: 38,
    lessons: [
      { id: "6-1", title: "Building a personal AI assistant, memory, voice, and screen vision", duration: "14 min", format: "Camera + Screen" },
      { id: "6-2", title: "Persistent memory and context, making your AI remember you", duration: "13 min", format: "Screen share" },
      { id: "6-3", title: "Voice input and output with ElevenLabs and Web Speech", duration: "11 min", format: "Screen share" },
    ],
  },
  {
    num: "07", title: "Scheduling, Monitoring & Reliability", lessonCount: 3, totalMin: 37,
    lessons: [
      { id: "7-1", title: "Running on schedule: Task Scheduler, cron and the Python schedule library", duration: "13 min", format: "Screen share" },
      { id: "7-2", title: "Error handling and monitoring so failures show up", duration: "12 min", format: "Screen share" },
      { id: "7-3", title: "Config-driven systems, tools you can reuse and share", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    num: "08", title: "Stack, Scale & What's Next", lessonCount: 2, totalMin: 25,
    lessons: [
      { id: "8-1", title: "Your complete AI stack, assembling the pieces", duration: "13 min", format: "Camera + Screen" },
      { id: "8-2", title: "Turning tools into products, from personal use to something you can sell", duration: "12 min", format: "Camera" },
    ],
  },
];

// ── Pricing ───────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Self-Paced",
    price: "$397",
    plan: "or 3 payments of $139",
    features: [
      "All 25 lessons (5.2 hrs)",
      "7 starter code templates",
      "Full resource pack",
      "Lifetime access",
    ],
    cta: "Join the waitlist",
    href: LS_FULL,
    highlight: false,
  },
  {
    name: "Coaching",
    price: "$1,297",
    plan: "or 3 payments of $449",
    features: [
      "Everything in Self-Paced",
      "3 live group build sessions",
      "Code review on your tools",
      "Private cohort chat",
    ],
    cta: "Join the coaching waitlist",
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
    cta: "Join the 1:1 waitlist",
    href: LS_ONE,
    highlight: false,
  },
];

// ── Resource Pack ─────────────────────────────────────────────────────────────
const RESOURCES = [
  { title: "Automation Audit Worksheet", module: "Module 1", desc: "Scoring sheet that ranks tasks by how often they happen, how long they take and how much you dislike them" },
  { title: "Python Environment Setup Guide", module: "Module 2", desc: "Step-by-step for every OS, with every common error and its fix" },
  { title: "Email Bot Starter Template", module: "Module 3", desc: "Stripped version of my email bot. Add your keys to run it" },
  { title: "YouTube Pipeline Starter Template", module: "Module 4", desc: "Stripped pipeline config and entry script with all five steps scaffolded" },
  { title: "Google Places Lead Gen Script", module: "Module 5", desc: "Scoring and export to Sheets, set by city and business type" },
  { title: "Reusable AI Wrapper Module", module: "Modules 2 to 7", desc: "The ai_engine.py pattern. Import it into any later project" },
  { title: "Project Config Template", module: "Module 7", desc: "YAML config and CLI boilerplate you can copy for a new automation project" },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Do I need to know Python already?",
    a: "No, but you need to be willing to learn. Module 2 walks you through setup from scratch. If you can copy code, read error messages, and search for answers, you can build every tool in this course. I don't teach basic syntax, since free resources cover it. I teach the patterns these tools use.",
  },
  {
    q: "What if I'm not very technical?",
    a: "The mindset modules (1 and 8) are accessible to anyone. The build modules take work. If you've never written code, take a free Python basics course first, then come back. If you've written any code at all and just haven't done automation, you're ready.",
  },
  {
    q: "How is this different from an n8n course or Zapier tutorial?",
    a: "No-code tutorials teach a platform someone else built. This course teaches you to write your own tools, so you own the code and can build things those platforms can't. I use n8n or Zapier as glue in a few places.",
  },
  {
    q: "Do you run these tools yourself?",
    a: "Yes. The email bot processes my inbox every day. The content pipeline runs on a schedule and earns AdSense revenue. I built a listing monitor to surface job leads, an inbox harvester to process bulk email, and a personal AI that runs on my desktop. I built the tools first and the course around them.",
  },
  {
    q: "What do I get in the resource pack?",
    a: "Seven stripped versions of the tools I run. API calls removed, config files pre-structured, patterns documented. You plug in your keys and you have a working starting point. The Automation Audit Worksheet, setup guides, and project config template are included too.",
  },
  {
    q: "What's the refund policy?",
    a: "If you finish Module 2 and the technical level is beyond you, contact me within 7 days of purchase and I'll refund you. I don't refund after you've accessed the full curriculum.",
  },
  {
    q: "Will this work on Windows?",
    a: "Yes. All my tools were built on Windows. Every setup walkthrough covers Windows first. You won't need WSL for anything in the course, though I'll show you how to set it up if you want it.",
  },
  {
    q: "I already bought the Business Launch course. Is there a discount?",
    a: "Yes. Email me at elijah@purcell-ventures.com.",
  },
];

export default function ZeroToAutomatedPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalLessons = MODULES.reduce((s, m) => s + m.lessonCount, 0);
  const totalMin = MODULES.reduce((s, m) => s + m.totalMin, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* ── Hero ── */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Course: AI Automation</div>
          <h1 style={{ margin: 0 }}>
            Zero to <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Automated.</em>
          </h1>
          <p className="deck">
            I use these tools every day. I automated my email inbox, my YouTube channel, my lead generation and my scholarship search. The course walks through how I built each one.
          </p>
          {/* Stats band */}
          <div style={{
            marginTop: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 0,
            border: "1px solid var(--color-warm-border)",
            background: "var(--color-warm-bg-alt)",
          }}>
            {[
              { v: "8",                                                label: "Modules" },
              { v: `${totalLessons}`,                                  label: "Lessons" },
              { v: `${Math.round(totalMin / 60 * 10) / 10} hrs`,       label: "Video" },
              { v: "7",                                                label: "Code templates" },
              { v: "5",                                                label: "In production" },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: "18px 10px",
                textAlign: "center",
                borderRight: i < 4 ? "1px solid var(--color-warm-border)" : "none",
              }}>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "var(--color-warm-accent)", letterSpacing: "-0.01em" }}>
                  {s.v}
                </div>
                <div className="pv-mono-label" style={{ marginTop: "6px", color: "var(--color-warm-text-light)", fontSize: "9px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* ── "Real tools" proof section ── */}
        <div style={{ marginBottom: "80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
            The tools you'll learn to build
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden", marginBottom: "24px" }}>
            {[
              {
                name: "Email Bot",
                desc: "Reads your inbox, sorts every message by urgency and drafts replies using Claude.",
                stats: "Runs daily. Gmail IMAP, Claude API, SQLite.",
              },
              {
                name: "Content Pipeline",
                desc: "Downloads source footage, generates AI commentary, assembles with captions and a thumbnail, and uploads it.",
                stats: "Runs on a schedule. yt-dlp, MoviePy, YouTube API.",
              },
              {
                name: "Listing Monitor",
                desc: "Watches Craigslist, Facebook Marketplace, or any job board for postings that match your criteria. Filters noise, deduplicates against what it's already seen, and exports clean leads to a spreadsheet.",
                stats: "Runs on a schedule. Selenium, gspread.",
              },
              {
                name: "Opportunity Scorer",
                desc: "Queries any data source for prospects or leads, scores each result against your custom criteria, and outputs a ranked list of who to contact first.",
                stats: "Runs on demand. Places API and a scoring script.",
              },
              {
                name: "Inbox Harvester",
                desc: "Processes hundreds of emails or documents at once, extracting deadlines, prices, contacts, or any structured data, and builds a prioritized list.",
                stats: "Batch processing. Gmail OAuth, Claude.",
              },
              {
                name: "Personal AI Assistant",
                desc: "A desktop overlay with voice input, voice output, screen vision, persistent memory and custom slash commands for your common tasks.",
                stats: "Always on. Electron, Claude API, ElevenLabs.",
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
            This course teaches you to build tools you run yourself, with code you own.
          </p>
        </div>

        {/* ── Who it's for ── */}
        <div style={{ marginBottom: "80px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
            Who this is for
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
            {[
              { who: "Solopreneurs and freelancers", desc: "You spend hours each week on tasks that follow the same pattern and you don't know where to start automating them." },
              { who: "Students who want to build working tools", desc: "You want to finish a course with a tool running on your machine." },
              { who: "Business Launch alumni", desc: "You've built the business. Module 7-1 of the Business Launch course points here for the automation step." },
              { who: "Consulting clients", desc: "You saw one of my tools running during a session and want to build it yourself." },
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
              Eight modules, {totalLessons} lessons, all code included.
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
                      {mod.lessonCount} lessons, {mod.totalMin} min
                    </span>
                    <span style={{ fontSize: "18px", color: "var(--color-warm-accent)", transform: openModule === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>
                      +
                    </span>
                  </div>
                </button>
                {/* ALWAYS RENDERED, TOGGLED WITH CSS. `{openModule === i && ...}` does not
                    hide the curriculum, it never creates it, so the lesson list this course
                    is sold on never reached a crawler or a language model. */}
                <div style={{ display: openModule === i ? "block" : "none", background: "var(--color-warm-card)", borderTop: "1px solid var(--color-warm-border)" }}>
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
            Seven starter templates.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", marginBottom: "28px", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.7, maxWidth: "560px" }}>
            Every template is a stripped version of something I run. API calls removed, config files pre-structured. You add your keys and you have a working starting point.
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
            Three ways to take the course
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 8, overflow: "hidden" }}>
            {TIERS.map(tier => (
              <div key={tier.name} style={{
                background: tier.highlight ? "var(--color-warm-card)" : "var(--color-warm-bg)",
                padding: "36px 28px",
                position: "relative",
              }}>
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
                {/* Rendered always, toggled with CSS. See the note on the module list above. */}
                <div style={{ display: openFaq === i ? "block" : "none", background: "var(--color-warm-card)", borderTop: "1px solid var(--color-warm-border)", padding: "16px 24px 20px" }}>
                    <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, fontFamily: "var(--font-dm-sans), sans-serif", margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif" }}>
            Waitlist open
          </p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", lineHeight: 1.1, maxWidth: "500px" }}>
            The Zero to Automated waitlist
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", maxWidth: "440px", lineHeight: 1.7, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            The course is $397 at launch. I'll email you when it opens.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
            <a href={LS_FULL} style={{
              padding: "13px 32px", background: "var(--color-warm-accent)", borderRadius: 4,
              fontSize: "14px", fontWeight: 700, color: "var(--color-warm-bg)",
              textDecoration: "none", letterSpacing: "0.06em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              Join the waitlist
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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, course: "ai-automation" }),
      });
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
            I'll email you when the course opens, and early access gets a discount.
          </p>
        </div>
      ) : (
        <div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>
            Early access to Zero to Automated
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "20px", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.7 }}>
            The early access list gets a discount. I send one email when it opens.
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
