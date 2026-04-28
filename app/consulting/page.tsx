"use client";

import { useState } from "react";
import type { Metadata } from "next";

const SESSIONS = [
  {
    id: "ai-basics",
    title: "AI Basics for Business",
    duration: "2 hrs",
    tag: "Intro",
    tagColor: "#7aaa6a",
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
    title: "ChatGPT in Your Workflow",
    duration: "3 hrs",
    tag: "Hands-On",
    tagColor: "#d4af37",
    desc: "Practical, hands-on. We work through email drafting, customer responses, research, content creation, and scheduling — live, with your actual scenarios.",
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
    title: "AI for Marketing & Social Media",
    duration: "2.5 hrs",
    tag: "Marketing",
    tagColor: "#9b7fd4",
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
    title: "Automating Your Business",
    duration: "4 hrs",
    tag: "Half-Day",
    tagColor: "#e8a030",
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
    title: "Custom Team Training",
    duration: "You choose",
    tag: "Custom",
    tagColor: "#c8c0b0",
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
  {
    label: "1-on-1",
    rate: "$175",
    unit: "/ hour",
    desc: "You and me. We go deep on your specific situation, tools, and problems. Most flexible — agenda is entirely yours.",
    note: "2-hr minimum recommended",
    highlight: false,
  },
  {
    label: "Small Group",
    rate: "$125",
    unit: "/ person",
    desc: "2–8 people. Collaborative, interactive, and tailored to the group. Better for teams that work closely together.",
    note: "Per session · 2-hr minimum",
    highlight: true,
  },
  {
    label: "Workshop",
    rate: "$2,500",
    unit: "flat rate",
    desc: "Up to 20 people. Structured session with Q&A and hands-on exercises. Great for all-hands training or company events.",
    note: "Half-day · up to 20 people",
    highlight: false,
  },
  {
    label: "Corporate / Custom",
    rate: "Custom",
    unit: "quote",
    desc: "Larger teams, multi-session programs, or fully custom curriculum. Includes prep time, materials, and follow-up resources.",
    note: "Contact for pricing",
    highlight: false,
  },
];

const FAQ = [
  { q: "Do I need any tech experience to benefit from this?", a: "No. Most sessions are designed for people who've never used AI tools before. I meet you where you are and build from there." },
  { q: "What do participants need to bring?", a: "A laptop or tablet and a willingness to try things. I'll handle everything else: setup, demos, exercises, and a takeaway guide." },
  { q: "Can you come to our location?", a: "Yes. I come to you. Your office, your team, your environment. That context makes the session more relevant and the examples more useful." },
  { q: "What's the difference between this and just using ChatGPT on my own?", a: "Most people use about 10% of what AI tools can do. I show you the other 90%: the prompting techniques, the integrations, the specific workflows that actually save time in your type of business." },
  { q: "Will this lead to a sales pitch for your other services?", a: "Only if it makes sense. Consulting is its own thing. If I see something in your business that I could build for you, I'll mention it. No pressure, no upsell baked into the session." },
  { q: "How far in advance do I need to book?", a: "Typically 1–2 weeks for standard sessions. Custom trainings need more prep time. Reach out as early as you can." },
];

export default function ConsultingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSession, setActiveSession] = useState<string | null>(null);

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
            <a href="#sessions" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>Sessions</a>
            <a href="#pricing" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>Pricing</a>
            <a href="/consulting/book" style={{ padding: "8px 18px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "13px", fontWeight: 600, borderRadius: "6px", textDecoration: "none" }}>
              Book a Session
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "140px 24px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
          Purcell Ventures — AI Consulting
        </p>
        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 700,
          lineHeight: 1.08, letterSpacing: "0.02em",
          color: "var(--color-warm-text)", marginBottom: "28px",
          maxWidth: "820px",
        }}>
          Your team could be doing<br />
          <span style={{ color: "var(--color-warm-accent)" }}>twice the work in half the time.</span>
        </h1>
        <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", maxWidth: "580px", lineHeight: 1.8, marginBottom: "40px" }}>
          I come to your business and teach your team how to actually use AI. Hands-on, practical, and tailored to what you do. Not theory. Real tools, real results, same day.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "72px" }}>
          <a href="/consulting/book" style={{ padding: "14px 32px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "7px", textDecoration: "none" }}>
            Book a Session
          </a>
          <a href="#sessions" style={{ padding: "14px 24px", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", fontSize: "14px", fontWeight: 500, borderRadius: "7px", textDecoration: "none" }}>
            See What I Teach
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", borderTop: "1px solid var(--color-warm-border)", paddingTop: "40px" }}>
          {[
            { n: "5", label: "core sessions" },
            { n: "1-on-1", label: "or up to 30+" },
            { n: "$40", label: "per person/session" },
            { n: "Same day", label: "takeaways" },
          ].map(({ n, label }) => (
            <div key={label}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--color-warm-text)", letterSpacing: "-0.02em", fontFamily: "'Cinzel', Georgia, serif" }}>{n}</div>
              <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ borderTop: "1px solid var(--color-warm-border)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Who Books This</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, marginBottom: "48px", lineHeight: 1.1 }}>
            If AI feels like something you're<br />supposed to understand but don't. This is for you.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--color-warm-border)" }}>
            {[
              { who: "Small Business Owners", desc: "You run a tight operation. An hour a day saved on admin, emails, and content is worth thousands of dollars a year." },
              { who: "Office & Operations Teams", desc: "Your team does repetitive digital work. There are tools that do most of it automatically. You just haven't learned them yet." },
              { who: "Marketing Departments", desc: "Content takes forever. AI cuts production time by 60–80% without cutting quality. Let me show you how." },
              { who: "Any Team Feeling Behind", desc: "The businesses that figure out AI now will be ahead for years. The ones that wait will spend years catching up." },
            ].map((item) => (
              <div key={item.who} style={{ background: "var(--color-warm-bg)", padding: "32px 28px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-warm-accent)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px", color: "var(--color-warm-text)" }}>{item.who}</h3>
                <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section id="sessions" style={{ borderTop: "1px solid var(--color-warm-border)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Sessions</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, marginBottom: "12px", lineHeight: 1.1 }}>
            Pick a session. I customize it to your business.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", marginBottom: "52px", maxWidth: "560px", lineHeight: 1.75 }}>
            Every session is adapted to your industry, your tools, and your team. You're not getting a generic slideshow.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {SESSIONS.map((s) => {
              const open = activeSession === s.id;
              return (
                <div key={s.id} style={{
                  background: open ? "var(--color-warm-card)" : "var(--color-warm-bg)",
                  border: `1px solid ${open ? "var(--color-warm-border-light)" : "var(--color-warm-border)"}`,
                  borderRadius: "8px", overflow: "hidden", transition: "background 0.15s",
                }}>
                  <button
                    onClick={() => setActiveSession(open ? null : s.id)}
                    style={{ width: "100%", background: "none", border: "none", padding: "24px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", textAlign: "left" }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", background: `${s.tagColor}18`, border: `1px solid ${s.tagColor}40`, borderRadius: "20px", fontSize: "11px", fontWeight: 600, color: s.tagColor, flexShrink: 0 }}>{s.tag}</span>
                    <span style={{ flex: 1, fontSize: "16px", fontWeight: 700, color: "var(--color-warm-text)" }}>{s.title}</span>
                    <span style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", flexShrink: 0 }}>{s.duration}</span>
                    <span style={{ fontSize: "20px", color: "var(--color-warm-accent)", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {open && (
                    <div style={{ padding: "0 28px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                      <div>
                        <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "20px" }}>{s.desc}</p>
                        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "10px" }}>What you walk away with</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {s.outcomes.map((o, i) => (
                            <div key={i} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "var(--color-warm-text-muted)" }}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}><path d="M3 8l3.5 3.5L13 5" stroke="var(--color-warm-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              {o}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        <div style={{ padding: "16px 20px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", borderRadius: "8px" }}>
                          <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Best for</div>
                          <div style={{ fontSize: "14px", color: "var(--color-warm-text)" }}>{s.bestFor}</div>
                        </div>
                        <div style={{ padding: "16px 20px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", borderRadius: "8px" }}>
                          <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Group size</div>
                          <div style={{ fontSize: "14px", color: "var(--color-warm-text)" }}>{s.groupSize}</div>
                        </div>
                        <a href="/consulting/book" style={{ padding: "12px 20px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "7px", textDecoration: "none", textAlign: "center" }}>
                          Book This Session →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ borderTop: "1px solid var(--color-warm-border)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Pricing</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, marginBottom: "12px", lineHeight: 1.1 }}>
            Pay per person. Pay by time.<br />No surprises.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", marginBottom: "52px", maxWidth: "520px", lineHeight: 1.75 }}>
            Rate is based on group size and session length. The more people, the lower the per-person cost. All sessions include a takeaway guide.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--color-warm-border)" }}>
            {PRICING.map((p) => (
              <div key={p.label} style={{
                background: p.highlight ? "var(--color-warm-accent)" : "var(--color-warm-card)",
                padding: "36px 28px",
                boxShadow: "inset -1px -1px 0 rgba(0,0,0,0.1)",
              }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: p.highlight ? "rgba(12,10,8,0.6)" : "var(--color-warm-accent)", marginBottom: "16px" }}>{p.label}</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "44px", fontWeight: 900, letterSpacing: "-0.03em", color: p.highlight ? "#0c0a08" : "var(--color-warm-text)", lineHeight: 1 }}>{p.rate}</span>
                  <span style={{ fontSize: "14px", color: p.highlight ? "rgba(12,10,8,0.6)" : "var(--color-warm-text-muted)", paddingBottom: "8px" }}>{p.unit}</span>
                </div>
                <p style={{ fontSize: "12px", color: p.highlight ? "rgba(12,10,8,0.55)" : "var(--color-warm-text-muted)", marginBottom: "16px" }}>{p.note}</p>
                <p style={{ fontSize: "14px", color: p.highlight ? "rgba(12,10,8,0.75)" : "var(--color-warm-text-muted)", lineHeight: 1.7, marginBottom: "24px" }}>{p.desc}</p>
                <a href="#contact" style={{ display: "block", textAlign: "center", padding: "12px 20px", background: p.highlight ? "#0c0a08" : "var(--color-warm-accent)", color: p.highlight ? "var(--color-warm-accent)" : "var(--color-warm-bg)", fontSize: "13px", fontWeight: 700, borderRadius: "6px", textDecoration: "none" }}>
                  Book Now →
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px", padding: "20px 24px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: "8px", display: "flex", gap: "16px", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-warm-accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
              Not sure what you need? <a href="#contact" style={{ color: "var(--color-warm-accent)", textDecoration: "none", fontWeight: 600 }}>Send me a message.</a> I'll ask a few questions and tell you exactly which session makes sense.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderTop: "1px solid var(--color-warm-border)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>How It Works</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, marginBottom: "52px", lineHeight: 1.1 }}>
            Simple. No friction.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
            {[
              { step: "01", title: "Quick Call", desc: "We talk for 15 minutes. You tell me about your business, your team, and your biggest time-wasters. I tell you which session fits and what I'll customize." },
              { step: "02", title: "I Build Your Session", desc: "I take what I learned and build the presentation around your tools, your workflows, and your industry. You get a tailored session, not a template." },
              { step: "03", title: "We Run It", desc: "I come to you. Live demos, hands-on exercises, real questions. Every participant gets a takeaway guide they can use immediately after." },
              { step: "04", title: "Follow-Up", desc: "After the session I send a resource package: key tools, prompts, and next steps specific to what we covered. Plus I'm reachable if questions come up." },
            ].map((item) => (
              <div key={item.step} style={{ paddingLeft: "20px", borderLeft: "2px solid var(--color-warm-border-light)" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--color-warm-accent)", marginBottom: "10px" }}>{item.step}</div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{item.title}</h4>
                <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ borderTop: "1px solid var(--color-warm-border)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>FAQ</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, marginBottom: "52px" }}>Common questions.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", maxWidth: "780px" }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{ border: "1px solid var(--color-warm-border)", borderRadius: "6px", overflow: "hidden", background: openFaq === i ? "var(--color-warm-card)" : "transparent" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "18px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", gap: "16px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text)" }}>{item.q}</span>
                  <span style={{ fontSize: "20px", color: "var(--color-warm-accent)", flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div style={{ padding: "0 20px 18px", fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.75 }}>{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ borderTop: "1px solid var(--color-warm-border)", padding: "100px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Book a Session</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "20px" }}>
            Ready to get your team ahead?
          </h2>
          <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.8, marginBottom: "40px" }}>
            Tell me about your team and I'll come back with a specific session recommendation and a quote within 24 hours.
          </p>
          <a href="mailto:elijah@purcell-ventures.com?subject=Consulting Session Inquiry" style={{ display: "inline-block", padding: "16px 40px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "16px", fontWeight: 700, borderRadius: "8px", textDecoration: "none", marginBottom: "16px" }}>
            Email Elijah Directly →
          </a>
          <div style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>elijah@purcell-ventures.com · (770) 280-5319 · Response within 24 hours</div>
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
