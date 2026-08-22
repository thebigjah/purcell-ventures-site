"use client";

import { useState } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const SESSIONS = [
  {
    id: "ai-basics",
    roman: "i.",
    title: "AI Basics for Business",
    duration: "2 hrs",
    tag: "Intro",
    desc: "What AI actually is, what it can do right now, and where it fits in your business. No tech background needed. Built for owners and managers who feel behind.",
    outcomes: [
      "Understand what AI tools exist and which ones matter for your type of business",
      "Leave with 3–5 tools you can use tomorrow",
      "Know what to automate and what to keep human",
    ],
    bestFor: "Business owners, managers, non-technical teams",
    groupSize: "2–30 people",
  },
  {
    id: "chatgpt-workflow",
    roman: "ii.",
    title: "ChatGPT in Your Workflow",
    duration: "3 hrs",
    tag: "Hands-on",
    desc: "Practical, hands-on. We work through email drafting, customer responses, research, content creation, and scheduling, live, with your actual scenarios.",
    outcomes: [
      "Write better emails and responses in half the time",
      "Generate content, proposals, and summaries on demand",
      "Build a personal prompt library you'll actually use",
    ],
    bestFor: "Any team that communicates and creates content daily",
    groupSize: "2–20 people",
  },
  {
    id: "ai-marketing",
    roman: "iii.",
    title: "AI for Marketing & Social Media",
    duration: "2.5 hrs",
    tag: "Marketing",
    desc: "Caption generation, ad copy, campaign planning, scheduling tools. Walk away with a repeatable content system that takes hours off your week.",
    outcomes: [
      "Build a month of social content in under an hour",
      "Generate ad copy, captions, and email campaigns with AI",
      "Set up a scheduling and approval workflow",
    ],
    bestFor: "Marketing teams, social media managers, small business owners who post their own content",
    groupSize: "2–25 people",
  },
  {
    id: "automation",
    roman: "iv.",
    title: "Automating Your Business",
    duration: "4 hrs",
    tag: "Half-Day",
    desc: "Connect your apps, eliminate manual work, and build systems that run while you sleep. Covers Zapier, Make, AI assistants, and business-specific automations.",
    outcomes: [
      "Map your top 3 time-wasting manual processes and automate them",
      "Connect your tools (email, CRM, forms, calendar) without code",
      "Walk out with at least one live automation running",
    ],
    bestFor: "Operations managers, founders, teams with repetitive digital workflows",
    groupSize: "2–15 people",
  },
  {
    id: "custom",
    roman: "v.",
    title: "Custom Team Training",
    duration: "You choose",
    tag: "Custom",
    desc: "I come in, learn your software stack and workflows, and build a session from scratch around your actual tools and problems. The most impactful option for established teams.",
    outcomes: [
      "Training built around your exact tools and use cases",
      "Hands-on with your actual software, not generic demos",
      "Takeaway guide specific to your team",
    ],
    bestFor: "Companies with existing software stacks, teams with specific bottlenecks",
    groupSize: "Any size",
  },
];

const PRICING = [
  { label: "1-on-1",            rate: "$175",    unit: "/ hour",   desc: "You and me. We go deep on your specific situation, tools, and problems. Most flexible, agenda is entirely yours.", note: "2-hr minimum recommended",   highlight: false },
  { label: "Small Group",       rate: "$125",    unit: "/ person", desc: "2–8 people. Collaborative, interactive, and tailored to the group. Better for teams that work closely together.",  note: "Per session · 2-hr minimum",  highlight: true  },
  { label: "Workshop",          rate: "$2,500",  unit: "flat",     desc: "Up to 20 people. Structured session with Q&A and hands-on exercises. Great for all-hands training or company events.", note: "Half-day · up to 20 people",  highlight: false },
  { label: "Corporate / Custom", rate: "Custom", unit: "quote",    desc: "Larger teams, multi-session programs, or fully custom curriculum. Includes prep time, materials, and follow-up resources.", note: "Contact for pricing",     highlight: false },
];

const FAQ = [
  // The city question belongs on the page people land on for consulting, and it is the
  // internal link into /ai-consultant-tuscaloosa, which was reachable from /about only.
  { q: "Are you local? Where are you based?",                                        a: "Tuscaloosa, Alabama. The LLC is registered in Acworth, Georgia, where it was formed, and it is operated from Tuscaloosa, where I attend the University of Alabama. Local businesses can meet in person, which is the part that is hard to do remotely. There is a fuller page for local work at purcellventures.co/ai-consultant-tuscaloosa." },
  { q: "Do I need any tech experience to benefit from this?",                       a: "No. Most sessions are designed for people who've never used AI tools before. I meet you where you are and build from there." },
  { q: "What do participants need to bring?",                                       a: "A laptop or tablet and a willingness to try things. I'll handle everything else: setup, demos, exercises, and a takeaway guide." },
  { q: "Can you come to our location?",                                             a: "Yes. I come to you. Your office, your team, your environment. That context makes the session more relevant and the examples more useful." },
  { q: "What's the difference between this and just using ChatGPT on my own?",      a: "Most people use about 10% of what AI tools can do. I show you the other 90%: the prompting techniques, the integrations, the specific workflows that actually save time in your type of business." },
  { q: "Will this lead to a sales pitch for your other services?",                  a: "Only if it makes sense. Consulting is its own thing. If I see something in your business that I could build for you, I'll mention it. No pressure, no upsell baked into the session." },
  { q: "How far in advance do I need to book?",                                     a: "Typically 1–2 weeks for standard sessions. Custom trainings need more prep time. Reach out as early as you can." },
];

export default function ConsultingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSession, setActiveSession] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .pv-cs-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .pv-cs-stats > div:nth-child(1), .pv-cs-stats > div:nth-child(2) { border-bottom: 1px solid var(--color-warm-border); }
          .pv-cs-stats > div:nth-child(2) { border-right: none !important; }
          .pv-cs-who, .pv-cs-pricing, .pv-cs-process, .pv-cs-stats-band { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      ` }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Division II · AI Consulting</div>
          <h1>
            Twice the work <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>in half the time.</em>
          </h1>
          <p className="deck">
            I come to your business and teach your team how to actually use AI. Hands-on, practical, tailored to what you do. Not theory. Real tools, real results, same day.
            Based in Tuscaloosa, Alabama, working nationwide.{" "}
            <a href="/ai-consultant-tuscaloosa" style={{ color: "var(--color-warm-accent)" }}>
              Local work in Tuscaloosa →
            </a>
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a className="pv-btn-primary" href="/consulting/book">Book a session</a>
            <a className="pv-btn-ghost" href="/ai-readiness">Take the 3-min readiness test</a>
            <a className="pv-btn-ghost" href="#sessions">See what I teach</a>
          </div>

          {/* Stats band */}
          <div className="pv-cs-stats" style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            border: "1px solid var(--color-warm-border)",
            background: "var(--color-warm-bg-alt)",
          }}>
            {[
              { n: "5",        label: "core sessions" },
              { n: "1-on-1",   label: "or up to 30+" },
              { n: "$125+",    label: "per person" },
              { n: "Same-day", label: "takeaways" },
            ].map(({ n, label }, i) => (
              <div key={label} style={{
                padding: "20px 16px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid var(--color-warm-border)" : "none",
              }}>
                <div style={{
                  fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700,
                  color: "var(--color-warm-accent)", letterSpacing: "-0.01em",
                }}>
                  {n}
                </div>
                <div style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "var(--color-warm-text-light)", marginTop: "6px",
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Who books this */}
        <header className="pv-section-head">
          <span className="roman">I.</span>
          <h2>Who books <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>this</em></h2>
        </header>
        <p className="pv-italic" style={{ fontSize: "20px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.5, maxWidth: "640px", marginBottom: "32px" }}>
          If AI feels like something you&apos;re supposed to understand but don&apos;t, this is for you.
        </p>
        <div className="pv-cs-who" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "64px" }}>
          {[
            { who: "Small Business Owners",      desc: "You run a tight operation. An hour a day saved on admin, emails, and content is worth thousands of dollars a year." },
            { who: "Office & Operations Teams",  desc: "Your team does repetitive digital work. There are tools that do most of it automatically. You just haven't learned them yet." },
            { who: "Marketing Departments",      desc: "Content takes forever. AI cuts production time by 60–80% without cutting quality. Let me show you how." },
            { who: "Any Team Feeling Behind",    desc: "The businesses that figure out AI now will be ahead for years. The ones that wait will spend years catching up." },
          ].map((item) => (
            <div key={item.who} className="pv-card" style={{ padding: "28px 28px 24px" }}>
              <span className="b3"></span><span className="b4"></span>
              <h3 style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "18px", letterSpacing: "0.02em",
                color: "var(--color-warm-text)", textTransform: "uppercase",
                marginBottom: "10px", lineHeight: 1.15, margin: "0 0 10px",
              }}>
                {item.who}
              </h3>
              <p className="pv-italic" style={{ fontSize: "15px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sessions */}
        <header className="pv-section-head" id="sessions">
          <span className="roman">II.</span>
          <h2>Sessions <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>five core</em></h2>
        </header>
        <p className="pv-italic" style={{ fontSize: "17px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, maxWidth: "640px", marginBottom: "28px" }}>
          Pick a session. I customize it to your industry, your tools, and your team. You&apos;re not getting a generic slideshow.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "64px" }}>
          {SESSIONS.map((s) => {
            const open = activeSession === s.id;
            return (
              <div key={s.id} className="pv-card" style={{ padding: 0, overflow: "hidden" }}>
                <span className="b3"></span><span className="b4"></span>
                <button
                  onClick={() => setActiveSession(open ? null : s.id)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    padding: "24px 32px", display: "flex", alignItems: "center", gap: "20px", textAlign: "left",
                    color: "var(--color-warm-text)",
                  }}
                >
                  <span className="pv-italic" style={{ fontSize: "26px", color: "var(--color-warm-accent)", lineHeight: 1, flexShrink: 0, width: "32px" }}>
                    {s.roman}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                    padding: "4px 10px",
                    border: "1.5px solid var(--color-warm-accent)",
                    color: "var(--color-warm-accent)",
                    flexShrink: 0,
                  }}>
                    {s.tag}
                  </span>
                  <span style={{ flex: 1, fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 600, color: "var(--color-warm-text)", letterSpacing: "0.02em" }}>
                    {s.title}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "var(--color-warm-text-muted)", flexShrink: 0,
                  }}>
                    {s.duration}
                  </span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "24px", color: "var(--color-warm-accent)", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {/* In the DOM whether or not it is open. Conditional rendering meant a closed
    panel was never sent, so a crawler saw the headings and none of the prose. */}
<div hidden={!open} style={{ padding: "0 32px 32px 84px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", borderTop: "1px dashed var(--color-warm-border)", paddingTop: "24px", marginLeft: "20px" }}>
                    <div>
                      <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.88, lineHeight: 1.55, marginBottom: "20px" }}>
                        {s.desc}
                      </p>
                      <div className="pv-mono-label" style={{ marginBottom: "12px" }}>What you walk away with</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {s.outcomes.map((o, i) => (
                          <div key={i} className="pv-italic" style={{ display: "flex", gap: "12px", fontSize: "15px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55 }}>
                            <span style={{ color: "var(--color-warm-accent)", flexShrink: 0 }}>—</span>
                            {o}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div style={{
                        padding: "16px 20px",
                        background: "var(--color-warm-bg)",
                        border: "1px solid var(--color-warm-border)",
                      }}>
                        <div className="pv-mono-label" style={{ marginBottom: "8px" }}>Best for</div>
                        <div className="pv-italic" style={{ fontSize: "15px", color: "var(--color-warm-text)" }}>{s.bestFor}</div>
                      </div>
                      <div style={{
                        padding: "16px 20px",
                        background: "var(--color-warm-bg)",
                        border: "1px solid var(--color-warm-border)",
                      }}>
                        <div className="pv-mono-label" style={{ marginBottom: "8px" }}>Group size</div>
                        <div className="pv-italic" style={{ fontSize: "15px", color: "var(--color-warm-text)" }}>{s.groupSize}</div>
                      </div>
                      <a href="/consulting/book" className="pv-btn-primary" style={{ textAlign: "center" }}>
                        Book this session →
                      </a>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>

        {/* Pricing */}
        <header className="pv-section-head" id="pricing">
          <span className="roman">III.</span>
          <h2>Pricing <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>no surprises</em></h2>
        </header>
        <p className="pv-italic" style={{ fontSize: "17px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, maxWidth: "560px", marginBottom: "28px" }}>
          Rate is based on group size and session length. The more people, the lower the per-person cost. All sessions include a takeaway guide.
        </p>
        <div className="pv-cs-pricing" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
          {PRICING.map((p) => (
            <div key={p.label} className="pv-card" style={{
              padding: "30px 24px 24px",
              borderColor: p.highlight ? "var(--color-warm-accent)" : "var(--color-warm-border)",
              borderWidth: p.highlight ? "2px" : "1px",
            }}>
              <span className="b3"></span><span className="b4"></span>
              <div className="pv-mono-label" style={{ marginBottom: "14px" }}>{p.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "6px" }}>
                <span style={{
                  fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                  fontSize: "36px", letterSpacing: "-0.02em",
                  color: "var(--color-warm-text)", lineHeight: 1,
                }}>
                  {p.rate}
                </span>
                <span style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "12px", color: "var(--color-warm-text-muted)",
                }}>
                  {p.unit}
                </span>
              </div>
              <p style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                color: p.highlight ? "var(--color-warm-accent)" : "var(--color-warm-text-light)",
                marginBottom: "16px",
              }}>
                {p.note}
              </p>
              <p className="pv-italic" style={{ fontSize: "14px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, marginBottom: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="pv-card" style={{ padding: "20px 24px", display: "flex", gap: "16px", alignItems: "center", marginBottom: "64px" }}>
          <span className="b3"></span><span className="b4"></span>
          <span style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)", fontSize: "18px" }}>?</span>
          <p className="pv-italic" style={{ fontSize: "15px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, margin: 0 }}>
            Not sure what you need? <a href="#contact" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", textDecorationStyle: "dotted", fontWeight: 600 }}>Send me a message.</a> I&apos;ll ask a few questions and tell you exactly which session makes sense.
          </p>
        </div>

        {/* How it works */}
        <header className="pv-section-head">
          <span className="roman">IV.</span>
          <h2>How it works <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>simple, no friction</em></h2>
        </header>
        <div className="pv-cs-process" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "64px" }}>
          {[
            { step: "01", title: "Quick Call",         desc: "We talk for 15 minutes. You tell me about your business, your team, and your biggest time-wasters. I tell you which session fits and what I'll customize." },
            { step: "02", title: "I Build Your Session", desc: "I take what I learned and build the presentation around your tools, your workflows, and your industry. You get a tailored session, not a template." },
            { step: "03", title: "We Run It",            desc: "I come to you. Live demos, hands-on exercises, real questions. Every participant gets a takeaway guide they can use immediately after." },
            { step: "04", title: "Follow-Up",            desc: "After the session I send a resource package: key tools, prompts, and next steps specific to what we covered. Plus I'm reachable if questions come up." },
          ].map((item) => (
            <div key={item.step} className="pv-card" style={{ padding: "28px 24px 24px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                fontSize: "40px", color: "var(--color-warm-accent)",
                lineHeight: 1, marginBottom: "14px", letterSpacing: "-0.02em",
              }}>
                {item.step}
              </div>
              <h4 style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "15px", letterSpacing: "0.02em",
                color: "var(--color-warm-text)", textTransform: "uppercase",
                marginBottom: "10px", lineHeight: 1.15, margin: "0 0 10px",
              }}>
                {item.title}
              </h4>
              <p className="pv-italic" style={{ fontSize: "13.5px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Why work with me */}
        <header className="pv-section-head">
          <span className="roman">V.</span>
          <h2>Why work <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>with me</em></h2>
        </header>
        <p className="pv-italic" style={{ fontSize: "20px", color: "var(--color-warm-text)", opacity: 0.92, lineHeight: 1.45, maxWidth: "640px", marginBottom: "20px" }}>
          I&apos;m nineteen. That&apos;s a feature, not a bug.
        </p>
        <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.65, marginBottom: "32px", maxWidth: "720px" }}>
          Most AI consultants are mid-career adults who came to this stack late. I came up inside it. I&apos;ve been building autonomous systems and shipping production tools for a year, full-time, while still in high school. The work I&apos;m offering is the same work I do in my own infrastructure every day.
        </p>
        <div className="pv-cs-stats-band" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { num: "34",          label: "College acceptances",        desc: "Honors programs across the country evaluated my work. They didn't accept the bio, they accepted the portfolio." },
            { num: "7",           label: "Security audits run",         desc: "Read-only audits of live production applications, each finding delivered with severity, a reproduction path, and a fix." },
            { num: "Honors Coll.", label: "UA New College, Fall 2026", desc: "Self-designed Psychology + Data Science hybrid on a pre-med path. The track is the work." },
            { num: "Live infra",  label: "purcellventures.co +",       desc: "Every tool I teach, I've already built into my own stack. I'm not demo-ing — I'm showing you what already works." },
          ].map((item) => (
            <div key={item.label} className="pv-card" style={{ padding: "26px 22px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                fontSize: "22px", letterSpacing: "-0.01em",
                color: "var(--color-warm-accent)", marginBottom: "8px",
              }}>
                {item.num}
              </div>
              <div className="pv-mono-label" style={{ marginBottom: "10px" }}>{item.label}</div>
              <p className="pv-italic" style={{ fontSize: "13.5px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="pv-card" style={{ padding: "28px 32px", marginBottom: "64px" }}>
          <span className="b3"></span><span className="b4"></span>
          <div className="pv-mono-label" style={{ marginBottom: "12px" }}>The honest trade-off</div>
          <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", color: "var(--color-warm-text)", lineHeight: 1.5, marginBottom: "12px", letterSpacing: "0.01em" }}>
            I don&apos;t have a wall of corporate testimonials yet. I&apos;m at the start of my consulting business.
          </p>
          <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
            That means: you get my undivided attention, my hunger to deliver work I can use as my own first proof, and lower rates than I&apos;ll charge in a year. If you&apos;re willing to be an early client, you get more of me than my later clients will.
          </p>
        </div>

        {/* FAQ */}
        <header className="pv-section-head">
          <span className="roman">VI.</span>
          <h2>Common <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>questions</em></h2>
        </header>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "820px", marginBottom: "64px" }}>
          {FAQ.map((item, i) => (
            <div key={i} className="pv-card" style={{ padding: 0, overflow: "hidden" }}>
              <span className="b3"></span><span className="b4"></span>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  textAlign: "left", gap: "16px", color: "var(--color-warm-text)",
                }}>
                <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text)", letterSpacing: "0.01em" }}>
                  {item.q}
                </span>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", color: "var(--color-warm-accent)", flexShrink: 0 }}>
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {/* ALWAYS RENDERED, TOGGLED WITH CSS. It used to be {openFaq === i && (...)},
                  which does not hide the answer, it never creates it. Measured 22 Aug 2026:
                  zero of the six answers appeared in the served HTML. Four survived only
                  because they are duplicated into FAQPage JSON-LD; two existed nowhere a
                  crawler or a language model could reach. Google indexes CSS-hidden
                  accordion content, so display:none costs nothing and the text now ships. */}
              <div
                className="pv-italic"
                style={{
                  display: openFaq === i ? "block" : "none",
                  padding: "0 28px 22px",
                  fontSize: "15px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.6,
                  borderTop: "1px dashed var(--color-warm-border)", paddingTop: "16px", marginTop: "0",
                }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <section id="contact" style={{
          padding: "56px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          textAlign: "center",
          marginTop: "32px",
        }}>
          <div style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
            fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
          }}></div>
          <h2 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "clamp(28px, 4.5vw, 48px)", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            marginBottom: "16px", lineHeight: 1.15, margin: "0 0 16px",
          }}>
            Ready to get your team <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>ahead?</em>
          </h2>
          <p className="pv-italic" style={{
            fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.85,
            maxWidth: "560px", margin: "0 auto 32px", lineHeight: 1.55,
          }}>
            Tell me about your team and I&apos;ll come back with a specific session recommendation and a quote within 24 hours.
          </p>
          <a href="mailto:elijah@purcell-ventures.com?subject=Consulting Session Inquiry" className="pv-btn-primary">
            Email Elijah →
          </a>
          <div style={{
            marginTop: "20px",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
            color: "var(--color-warm-text-light)",
          }}>
            elijah@purcell-ventures.com · (205) 462-7839 · 24-hr response
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
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← All divisions</a>
      </footer>
    </div>
  );
}
