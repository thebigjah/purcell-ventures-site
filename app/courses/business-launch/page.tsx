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
    num: "01", title: "From Idea to Validated Concept", lessonCount: 4, totalMin: 46,
    lessons: [
      { id: "1-1", title: "Is your idea a business or a hobby?", duration: "11 min", format: "Camera" },
      { id: "1-2", title: "Who your customer is: simple market research", duration: "13 min", format: "Camera + Screen" },
      { id: "1-3", title: "Validating before you spend a dollar", duration: "12 min", format: "Camera + Screen" },
      { id: "1-4", title: "Choosing your model: service, product, digital or hybrid", duration: "10 min", format: "Camera" },
    ],
  },
  {
    num: "02", title: "Legal & Structure", lessonCount: 4, totalMin: 42,
    lessons: [
      { id: "2-1", title: "Sole prop vs LLC: when each makes sense", duration: "9 min", format: "Camera" },
      { id: "2-2", title: "Filing your LLC: live walkthrough", duration: "14 min", format: "Screen share" },
      { id: "2-3", title: "EIN, registered agent, and operating agreement", duration: "8 min", format: "Screen share" },
      { id: "2-4", title: "Contracts that cover scope, payment and disputes", duration: "11 min", format: "Camera" },
    ],
  },
  {
    num: "03", title: "Money, Pricing & Banking", lessonCount: 4, totalMin: 47,
    lessons: [
      { id: "3-1", title: "Opening a business bank account", duration: "10 min", format: "Screen share" },
      { id: "3-2", title: "Pricing your offer: the math and the psychology", duration: "13 min", format: "Camera" },
      { id: "3-3", title: "Invoicing, Stripe and collecting payment", duration: "11 min", format: "Screen share" },
      { id: "3-4", title: "Taxes, bookkeeping and cash flow in year one", duration: "13 min", format: "Screen share" },
    ],
  },
  {
    num: "04", title: "Brand & Presence", lessonCount: 3, totalMin: 37,
    lessons: [
      { id: "4-1", title: "Your brand: name, positioning and what you stand for", duration: "13 min", format: "Camera" },
      { id: "4-2", title: "Your digital presence: website, social or both", duration: "12 min", format: "Camera + Screen" },
      { id: "4-3", title: "Your first piece of content that brings customers in", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    num: "05", title: "Building & Delivering the Offer", lessonCount: 3, totalMin: 31,
    lessons: [
      { id: "5-1", title: "Defining what you sell and how you deliver it", duration: "10 min", format: "Camera" },
      { id: "5-2", title: "Building your first deliverable", duration: "12 min", format: "Screen share" },
      { id: "5-3", title: "Overdelivering early to build a reputation", duration: "9 min", format: "Camera" },
    ],
  },
  {
    num: "06", title: "Getting Your First Customer", lessonCount: 4, totalMin: 48,
    lessons: [
      { id: "6-1", title: "Warm outreach to people you already know", duration: "11 min", format: "Camera" },
      { id: "6-2", title: "Cold outreach scripts and follow-up", duration: "14 min", format: "Camera + Screen" },
      { id: "6-3", title: "The first sales conversation: what to say and when", duration: "12 min", format: "Camera" },
      { id: "6-4", title: "Closing without being pushy", duration: "11 min", format: "Camera" },
    ],
  },
  {
    num: "07", title: "Running It, Growing & The Mental Side", lessonCount: 4, totalMin: 47,
    lessons: [
      { id: "7-1", title: "The tool stack I run Purcell Ventures with", duration: "14 min", format: "Screen share" },
      { id: "7-2", title: "Building a referral system from your first clients", duration: "11 min", format: "Camera" },
      { id: "7-3", title: "Your first hire vs your first automation", duration: "11 min", format: "Camera" },
      { id: "7-4", title: "Fear, imposter syndrome and what keeps you going", duration: "11 min", format: "Camera" },
    ],
  },
];

// ── Pricing ───────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Self-Paced",
    price: "$397",
    plan: "or 3 payments of $139",
    highlight: false,
    lsFull: LS_FULL,
    lsPlan: LS_PLAN,
    features: [
      "All 7 modules, 26 lessons",
      "Camera, screen share and written content",
      "Full resource pack: 6 templates and worksheets",
      "Business model one-pager template",
      "Pricing calculator and cold outreach scripts",
      "Lifetime access and future updates",
    ],
  },
  {
    name: "Coaching Track",
    price: "$1,297",
    plan: "or 3 payments of $449",
    highlight: true,
    lsFull: LS_COACH,
    lsPlan: LS_COACH,
    features: [
      "Everything in Self-Paced",
      "3 monthly group Q&A sessions with Elijah",
      "Recorded session replays",
      "Live feedback on your business, offer, and pitch",
      "Access to cohort community",
    ],
  },
  {
    name: "1:1 Intensive",
    price: "$2,997",
    plan: "payment plans available",
    highlight: false,
    lsFull: LS_ONE,
    lsPlan: LS_ONE,
    features: [
      "Everything in Coaching Track",
      "3 hours direct with Elijah",
      "Business plan and offer review",
      "Sales strategy and pitch prep",
      "Direct email access for 90 days",
    ],
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What kind of business is this for?",
    a: "Any. The course applies to a service business, a physical product, a digital product or a mix. My examples come from Purcell Ventures, which runs consulting, software, digital products and courses. Where the execution differs by type, I call it out.",
  },
  {
    q: "I have no experience. Is this too advanced?",
    a: "No. This course assumes you start with nothing except an idea. The course walks through legal setup, banking, pricing and outreach from scratch. I wrote it for people who have never done this and don't have a mentor who has.",
  },
  {
    q: "You are nineteen. Why should I take business advice from you?",
    a: "I founded Purcell Ventures at 17 and wrote down the tools, decisions and mistakes as I went. The course teaches the process I used, while it is recent. I use the tools I recommend, and I made the mistakes I warn about.",
  },
  {
    q: "What's the resource pack?",
    a: "Six templates and worksheets tied to specific lessons, a business model one-pager, customer profile worksheet, LLC filing checklist, pricing calculator, brand positioning worksheet, and cold outreach script templates. The lessons that use them link to them, and every tier gets them.",
  },
  {
    q: "What if I already have a business started?",
    a: "The financial, legal, branding and sales modules still apply. People who started fast often skip the foundation steps and fix them later. The course helps you check what you set up correctly and what needs work. You can move through earlier modules quickly.",
  },
  {
    q: "What's the difference between Coaching Track and 1:1 Intensive?",
    a: "Coaching Track gets you into live group calls where you can ask questions and get feedback on your specific situation. I answer live on those calls. The 1:1 Intensive is private hours: we review your business plan and offer, work through your pitch and build your sales strategy together.",
  },
  {
    q: "Still in high school and starting something?",
    a: "You might also want the College Application Playbook. A business you started in high school gives you material for applications, essays and scholarship interviews.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. If you start with Self-Paced and want to add coaching, email me and I'll credit what you paid toward the upgrade.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function BusinessLaunchPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq,    setOpenFaq]    = useState<number | null>(null);
  const [payMode,    setPayMode]    = useState<"full" | "plan">("full");
  const [email,      setEmail]      = useState("");
  const [waitlisted, setWaitlisted] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), course: "business-launch" }),
      });
    } catch {}
    setWaitlisted(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />
      <style>{`
        .bl-stat-bar { display: flex; gap: 48px; flex-wrap: wrap; }
        .bl-diff-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .bl-who-grid  { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1px; }
        @media (max-width: 767px) {
          .bl-stat-bar { gap: 28px; }
          .bl-diff-grid { grid-template-columns: 1fr; }
          .bl-hero-btns { flex-direction: column; }
        }
      `}</style>

      <section style={{ position: "relative", zIndex: 5, padding: "72px 36px 60px", maxWidth: "1080px", margin: "0 auto" }}>
        <header className="pv-page-head" style={{ marginBottom: 0 }}>
          <div className="pv-mono-label">Course: Business Launch Playbook</div>
          <h1 style={{ margin: 0 }}>
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>I started a company at 17.</em>
            <br />
            This course covers how.
          </h1>
          <p className="deck">
            I&apos;m Elijah Purcell. I founded Purcell Ventures at 17. It runs consulting, software, digital products and courses. This course walks through starting a business: idea, legal entity and first customer, with the tools and decisions I used.
          </p>
          <div className="bl-hero-btns" style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#curriculum" className="pv-btn-ghost">See what&apos;s inside</a>
            <a href="#waitlist" className="pv-btn-primary">Join the waitlist</a>
          </div>
          <div style={{
            marginTop: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            border: "1px solid var(--color-warm-border)",
            background: "var(--color-warm-bg-alt)",
          }}>
            {[
              { num: "17",  label: "Age when I founded" },
              { num: "7",   label: "Modules" },
              { num: "6",   label: "Templates" },
              { num: "26",  label: "Lessons" },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: "20px 12px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid var(--color-warm-border)" : "none",
              }}>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--color-warm-accent)", letterSpacing: "-0.01em" }}>
                  {s.num}
                </div>
                <div className="pv-mono-label" style={{ marginTop: "6px", color: "var(--color-warm-text-light)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </header>
      </section>

      {/* ── Who this is for ───────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>Who This Is For</div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "48px", lineHeight: 1.1 }}>
            If you have an idea and no roadmap,<br />this course is for you.
          </h2>
          <div className="bl-who-grid" style={{ background: "var(--color-warm-border)", borderRadius: 10, overflow: "hidden" }}>
            {[
              { title: "People with an idea but no roadmap", body: "You know what you want to build but not how to start. The course goes step by step from zero: validation, legal, pricing, first customer and operations. It assumes no prior knowledge." },
              { title: "Side hustlers ready to make it official", body: "You've been doing paid work informally and want to make it official. The course covers LLC formation, banking and contracts." },
              { title: "Students starting something before they graduate", body: "A business you build in school shows on applications and in interviews. The course helps you set it up correctly from the start." },
              { title: "People leaving a job to go independent", body: "You have skills and want to sell them directly. For service businesses, consulting and freelancing, the course covers setup from LLC to first invoice and includes outreach scripts." },
            ].map(w => (
              <div key={w.title} style={{ background: "var(--color-warm-bg)", padding: "32px 28px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-warm-accent)", marginBottom: "16px" }} />
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "10px" }}>{w.title}</div>
                <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-dm-sans), sans-serif" }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ────────────────────────────────────────────────────────── */}
      <section id="curriculum" style={{ padding: "80px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>Curriculum</div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px", lineHeight: 1.1 }}>
            7 modules. 26 lessons.<br />Idea to operating business.
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "48px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Camera lessons, screen shares of my tools and process, and written notes for every lesson. Planned length: 5 hours of video.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {MODULES.map((mod, i) => {
              const open = openModule === i;
              return (
                <div key={mod.num} style={{ border: "1px solid var(--color-warm-border)", borderRadius: 6, overflow: "hidden", background: open ? "var(--color-warm-card)" : "transparent" }}>
                  <button
                    onClick={() => setOpenModule(open ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-warm-accent)", letterSpacing: "0.1em", fontFamily: "var(--font-inter), sans-serif", minWidth: 72 }}>
                        MODULE {mod.num}
                      </span>
                      <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text)" }}>{mod.title}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                      <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>{mod.lessonCount} lessons, {mod.totalMin} min</span>
                      <span style={{ fontSize: "20px", color: "var(--color-warm-accent)", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", lineHeight: 1 }}>+</span>
                    </div>
                  </button>
                  {/* In the DOM whether or not it is open. Conditional rendering meant a closed
    panel was never sent, so a crawler saw the headings and none of the prose. */}
<div hidden={!open} style={{ padding: "0 24px 24px" }}>
                      {mod.lessons.map((l, li) => (
                        <div key={l.id} style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "12px 0",
                          borderTop: li === 0 ? "1px solid var(--color-warm-border)" : "none",
                          borderBottom: "1px solid var(--color-warm-border)",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif", minWidth: 20 }}>{li + 1}.</span>
                            <span style={{ fontSize: "14px", color: "var(--color-warm-text)", fontFamily: "var(--font-dm-sans), sans-serif" }}>{l.title}</span>
                          </div>
                          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                            <span style={{ fontSize: "10px", padding: "2px 8px", border: "1px solid var(--color-warm-border)", borderRadius: 20, color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>{l.format}</span>
                            <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>{l.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Resource Pack ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>Resource Pack</div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "16px", lineHeight: 1.1 }}>
            Six templates and worksheets.
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "48px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Every tier includes the full resource pack. The lessons that use each document link to it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 10, overflow: "hidden" }}>
            {[
              { title: "Business Model One-Pager", desc: "One page to define what you're building, who it's for, how you make money, and what makes you different. Used in Module 1.", tag: "Module 01" },
              { title: "Customer Profile Worksheet", desc: "Structured questions to define your target customer, pain points, triggers, objections, and where to find them. Used in Lesson 1-2.", tag: "Lesson 1-2" },
              { title: "LLC Filing Checklist", desc: "State-agnostic checklist for forming an LLC: articles, EIN, registered agent, operating agreement and bank account. Used in Module 2.", tag: "Module 02" },
              { title: "Pricing Calculator", desc: "A spreadsheet to calculate your cost baseline, set floor pricing, test different rates, and see projected revenue at different volume. Used in Lesson 3-2.", tag: "Lesson 3-2" },
              { title: "Brand Positioning Worksheet", desc: "Questions to settle your name, positioning, tone and what you stand for in one sitting. Used in Lesson 4-1.", tag: "Lesson 4-1" },
              { title: "Cold Outreach Script Templates", desc: "Three outreach scripts (service business, product business and general inquiry) with subject lines and follow-up emails. Used in Lesson 6-2.", tag: "Lesson 6-2" },
            ].map(r => (
              <div key={r.title} style={{ background: "var(--color-warm-bg)", padding: "28px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>{r.tag}</div>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "8px" }}>{r.title}</div>
                <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, margin: 0, fontFamily: "var(--font-dm-sans), sans-serif" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes this different ─────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>Why This Course</div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "48px", lineHeight: 1.1 }}>
            What the course includes.
          </h2>
          <div className="bl-diff-grid">
            {[
              {
                title: "Built From My Business",
                body: "I built a company. Purcell Ventures runs consulting, software, digital products and courses. Every lesson is based on what I did, the tools I use and the mistakes I made.",
              },
              {
                title: "Every Decision Documented",
                body: "This course shows screen shares of the tools I use, the templates I built and the reasoning behind each decision.",
              },
              {
                title: "Resources That Work",
                body: "The resource pack is six working documents: templates, a pricing calculator and outreach scripts. You fill them in instead of building them from scratch.",
              },
            ].map(d => (
              <div key={d.title} style={{ padding: "32px", border: "1px solid var(--color-warm-border)", borderRadius: 8 }}>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "12px" }}>{d.title}</div>
                <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-dm-sans), sans-serif" }}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "80px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>Pricing</div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "16px", lineHeight: 1.1 }}>
            Pricing
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "40px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            The course opens when recording is complete. Waitlist members get the early-access price.
          </p>

          {/* Payment mode toggle */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "32px" }}>
            {(["full", "plan"] as const).map(m => (
              <button key={m} onClick={() => setPayMode(m)} style={{
                padding: "6px 16px", fontSize: "12px", fontWeight: 600,
                background: payMode === m ? "var(--color-warm-accent)" : "none",
                color: payMode === m ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
                border: "1px solid " + (payMode === m ? "var(--color-warm-accent)" : "var(--color-warm-border)"),
                borderRadius: 4, cursor: "pointer", fontFamily: "var(--font-inter), sans-serif",
              }}>
                {m === "full" ? "Pay in Full" : "Payment Plan"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 10, overflow: "hidden" }}>
            {TIERS.map(tier => (
              <div key={tier.name} style={{ background: tier.highlight ? "var(--color-warm-accent)" : "var(--color-warm-bg)", padding: "40px 32px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: tier.highlight ? "rgba(12,10,8,0.6)" : "var(--color-warm-accent)", marginBottom: "8px", fontFamily: "var(--font-inter), sans-serif" }}>
                  {tier.name}
                </div>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 900, letterSpacing: "-0.03em", color: tier.highlight ? "var(--color-warm-bg)" : "var(--color-warm-text)", lineHeight: 1, marginBottom: "4px" }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: "12px", color: tier.highlight ? "rgba(12,10,8,0.55)" : "var(--color-warm-text-muted)", marginBottom: "32px", fontFamily: "var(--font-inter), sans-serif" }}>
                  {payMode === "plan" ? tier.plan : "one-time payment"}
                </div>
                <ul style={{ margin: "0 0 32px", paddingLeft: 0, listStyle: "none", flex: 1 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                      <span style={{ color: tier.highlight ? "var(--color-warm-bg)" : "var(--color-warm-accent)", fontSize: "14px", lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "13px", color: tier.highlight ? "rgba(12,10,8,0.8)" : "var(--color-warm-text-muted)", lineHeight: 1.55, fontFamily: "var(--font-dm-sans), sans-serif" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#waitlist" style={{
                  display: "block", textAlign: "center",
                  padding: "13px 20px", fontSize: "13px", fontWeight: 700,
                  color: tier.highlight ? "var(--color-warm-bg)" : "var(--color-warm-accent)",
                  border: "2px solid " + (tier.highlight ? "var(--color-warm-bg)" : "var(--color-warm-accent)"),
                  borderRadius: 6, textDecoration: "none", letterSpacing: "0.06em",
                  fontFamily: "var(--font-inter), sans-serif",
                }}>
                  Join the waitlist
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "16px", padding: "16px 20px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: 6, fontSize: "12px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
            Prices in USD. Lemon Squeezy processes payments. The access code arrives by email within 5 minutes of purchase.
          </div>
        </div>
      </section>

      {/* ── Consulting upsell ─────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px", borderBottom: "1px solid var(--color-warm-border)", background: "var(--color-warm-card)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>One-on-one help</div>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>Consulting is available for one-on-one help.</h3>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, maxWidth: "460px", fontFamily: "var(--font-dm-sans), sans-serif", margin: 0 }}>
              If you want me to look at your idea, your offer or your pitch, book a consulting session.
            </p>
          </div>
          <Link href="/consulting" style={{
            padding: "13px 28px", fontSize: "13px", fontWeight: 700,
            color: "var(--color-warm-accent)", border: "1px solid var(--color-warm-accent)",
            borderRadius: 6, textDecoration: "none", letterSpacing: "0.06em",
            fontFamily: "var(--font-inter), sans-serif", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            View consulting
          </Link>
        </div>
      </section>

      {/* ── Waitlist ──────────────────────────────────────────────────────────── */}
      <section id="waitlist" style={{ padding: "100px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px", fontFamily: "var(--font-inter), sans-serif" }}>
            Waitlist
          </div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "16px", lineHeight: 1.1 }}>
            Join the waitlist.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "40px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Waitlist members get early access pricing and first notification when the course opens.
          </p>
          {waitlisted ? (
            <div style={{ padding: "24px 32px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-accent)", borderRadius: 8 }}>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-warm-accent)", fontFamily: "'Cinzel', Georgia, serif", marginBottom: "6px" }}>You're on the list.</div>
              <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif" }}>I'll email you when enrollment opens.</div>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, padding: "13px 16px", fontSize: "14px",
                  background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)",
                  borderRadius: 6, color: "var(--color-warm-text)", outline: "none",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              />
              <button type="submit" style={{
                padding: "13px 24px", fontSize: "13px", fontWeight: 700,
                background: "var(--color-warm-accent)", color: "var(--color-warm-bg)",
                border: "none", borderRadius: 6, cursor: "pointer", letterSpacing: "0.06em",
                fontFamily: "var(--font-inter), sans-serif", whiteSpace: "nowrap",
              }}>
                Notify me
              </button>
            </form>
          )}
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "14px", fontFamily: "var(--font-inter), sans-serif" }}>
            No spam. One email when enrollment opens.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>FAQ</div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "40px" }}>
            Common questions.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{ border: "1px solid var(--color-warm-border)", borderRadius: 6, background: open ? "var(--color-warm-card)" : "transparent" }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "16px" }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-warm-text)", fontFamily: "var(--font-dm-sans), sans-serif" }}>{faq.q}</span>
                    <span style={{ fontSize: "20px", color: "var(--color-warm-accent)", flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", lineHeight: 1 }}>+</span>
                  </button>
                  {/* In the DOM whether or not it is open. Conditional rendering meant a closed
    panel was never sent, so a crawler saw the headings and none of the prose. */}
<div hidden={!open} style={{ padding: "0 20px 20px" }}>
                      <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-dm-sans), sans-serif" }}>{faq.a}</p>
                    </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "56px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "20px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Something not answered here?
            </p>
            <a href="mailto:elijah@purcell-ventures.com" style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif" }}>
              elijah@purcell-ventures.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
