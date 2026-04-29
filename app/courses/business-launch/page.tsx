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
    num: "01", title: "From Idea to Validated Concept", lessonCount: 4, totalMin: 46,
    lessons: [
      { id: "1-1", title: "Is your idea a business or a hobby?", duration: "11 min", format: "Camera" },
      { id: "1-2", title: "Who exactly is your customer — market research done simply", duration: "13 min", format: "Camera + Screen" },
      { id: "1-3", title: "Validating before you spend a dollar", duration: "12 min", format: "Camera + Screen" },
      { id: "1-4", title: "Choosing your model — service, product, digital, or hybrid", duration: "10 min", format: "Camera" },
    ],
  },
  {
    num: "02", title: "Legal & Structure", lessonCount: 4, totalMin: 42,
    lessons: [
      { id: "2-1", title: "Sole prop vs LLC — when each makes sense", duration: "9 min", format: "Camera" },
      { id: "2-2", title: "Filing your LLC — live walkthrough", duration: "14 min", format: "Screen share" },
      { id: "2-3", title: "EIN, registered agent, and operating agreement", duration: "8 min", format: "Screen share" },
      { id: "2-4", title: "Contracts and protecting yourself — scope, payment, disputes", duration: "11 min", format: "Camera" },
    ],
  },
  {
    num: "03", title: "Money, Pricing & Banking", lessonCount: 4, totalMin: 47,
    lessons: [
      { id: "3-1", title: "Opening a business bank account — why and how", duration: "10 min", format: "Screen share" },
      { id: "3-2", title: "Pricing your offer — the math and the psychology", duration: "13 min", format: "Camera" },
      { id: "3-3", title: "Invoicing, Stripe, and collecting actual money", duration: "11 min", format: "Screen share" },
      { id: "3-4", title: "Taxes, bookkeeping, and cash flow — year one survival guide", duration: "13 min", format: "Screen share" },
    ],
  },
  {
    num: "04", title: "Brand & Presence", lessonCount: 3, totalMin: 37,
    lessons: [
      { id: "4-1", title: "Your brand — name, positioning, and what you actually stand for", duration: "13 min", format: "Camera" },
      { id: "4-2", title: "Your digital presence — website vs social vs both", duration: "12 min", format: "Camera + Screen" },
      { id: "4-3", title: "Your first piece of content that brings customers in", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    num: "05", title: "Building & Delivering the Offer", lessonCount: 3, totalMin: 31,
    lessons: [
      { id: "5-1", title: "Defining exactly what you sell and how you deliver it", duration: "10 min", format: "Camera" },
      { id: "5-2", title: "Your first deliverable — building it regardless of type", duration: "12 min", format: "Screen share" },
      { id: "5-3", title: "Overdelivering early — reputation as a growth engine", duration: "9 min", format: "Camera" },
    ],
  },
  {
    num: "06", title: "Getting Your First Customer", lessonCount: 4, totalMin: 48,
    lessons: [
      { id: "6-1", title: "Warm outreach — using who you already know", duration: "11 min", format: "Camera" },
      { id: "6-2", title: "Cold outreach that actually works", duration: "14 min", format: "Camera + Screen" },
      { id: "6-3", title: "The first sales conversation — what to say and when", duration: "12 min", format: "Camera" },
      { id: "6-4", title: "Closing without being pushy", duration: "11 min", format: "Camera" },
    ],
  },
  {
    num: "07", title: "Running It, Growing & The Mental Side", lessonCount: 4, totalMin: 47,
    lessons: [
      { id: "7-1", title: "The exact tool stack I run Purcell Ventures with", duration: "14 min", format: "Screen share" },
      { id: "7-2", title: "Building a referral system from your first clients", duration: "11 min", format: "Camera" },
      { id: "7-3", title: "Your first hire vs your first automation", duration: "11 min", format: "Camera" },
      { id: "7-4", title: "The founder mindset — fear, imposter syndrome, and what keeps you going", duration: "11 min", format: "Camera" },
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
      "All 7 modules · 26 lessons",
      "Camera, screen share & written content",
      "Full resource pack — 6 templates & worksheets",
      "Business model one-pager template",
      "Pricing calculator + cold outreach scripts",
      "Lifetime access + future updates",
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
      "Business plan + offer review",
      "Sales strategy and pitch prep",
      "Direct email access for 90 days",
    ],
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What kind of business is this for?",
    a: "Any. The course is built around principles that apply whether you're starting a service business, selling a physical product, building a digital product, or some hybrid. The examples I use come from my experience with Purcell Ventures, which runs multiple different business models. Where the execution differs by type, I call it out.",
  },
  {
    q: "I have no experience. Is this too advanced?",
    a: "No. This course assumes you start with nothing except an idea. The legal setup, banking, pricing, outreach — everything is walked through from scratch. If anything, this course was designed specifically for people who've never done this before and don't have a mentor who has.",
  },
  {
    q: "You're 18. Why should I take business advice from you?",
    a: "Because I actually did it. I founded Purcell Ventures at 18, built multiple revenue streams, and documented every tool, decision, and mistake along the way. I'm not teaching theory — I'm teaching the exact process I used, while it's still fresh. The tools I recommend are the ones I actively use. The mistakes I warn about are ones I made.",
  },
  {
    q: "What's the resource pack?",
    a: "Six templates and worksheets tied to specific lessons — a business model one-pager, customer profile worksheet, LLC filing checklist, pricing calculator, brand positioning worksheet, and cold outreach script templates. These are working documents, not filler. They're mentioned inline in the relevant lessons and available to all tiers.",
  },
  {
    q: "What if I already have a business started?",
    a: "You'll still get value — especially from the financial, legal, branding, and sales modules. Most people who've already started skip the foundation steps and end up fixing them later. This course will help you identify what you've built correctly and what needs shoring up. You can move through earlier modules quickly.",
  },
  {
    q: "What's the difference between Coaching Track and 1:1 Intensive?",
    a: "Coaching Track gets you into live group calls where you can ask questions and get feedback on your specific situation. It's me, not pre-recorded content, responding to what you're working on. The 1:1 Intensive is private hours — we review your business plan and offer directly, work through your pitch, and build your sales strategy together.",
  },
  {
    q: "Still in high school and starting something?",
    a: "You might also want the College Application Playbook — building a business while in high school is exceptional material for applications, essays, and scholarship interviews. Both courses are designed to work together.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. If you start with Self-Paced and want to add coaching, reach out directly — the price difference applies as a credit.",
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
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)" }}>
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

      {/* ── In-page nav ──────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 58, zIndex: 50,
        background: "rgba(12,10,8,0.94)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-warm-border)",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/courses" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none", fontFamily: "var(--font-inter), sans-serif" }}>
            ← Courses
          </Link>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <a href="#curriculum" style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textDecoration: "none", fontFamily: "var(--font-inter), sans-serif" }}>Curriculum</a>
            <a href="#pricing"    style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textDecoration: "none", fontFamily: "var(--font-inter), sans-serif" }}>Pricing</a>
            <a href="#waitlist" style={{
              padding: "6px 16px", fontSize: "12px", fontWeight: 700,
              color: "var(--color-warm-bg)", background: "var(--color-warm-accent)",
              borderRadius: 4, textDecoration: "none", letterSpacing: "0.06em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px 80px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
            Business Launch Course
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 700, lineHeight: 1.0, marginBottom: "28px", maxWidth: "820px" }}>
            <span style={{ color: "var(--color-warm-accent)" }}>I started a company at 18.</span>
            <br />
            <span style={{ color: "var(--color-warm-text)" }}>Here's everything I wish I knew first.</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, maxWidth: "560px", marginBottom: "40px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            I'm Elijah Purcell. I founded Purcell Ventures at 18 — consulting, software, digital products, courses. This course is the complete playbook: idea to legal entity to first dollar to operating business, with every tool, decision, and shortcut I actually used.
          </p>
          <div className="bl-hero-btns" style={{ display: "flex", gap: "12px", marginBottom: "56px" }}>
            <a href="#curriculum" style={{
              padding: "14px 28px", fontSize: "14px", fontWeight: 600,
              color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)",
              borderRadius: 7, textDecoration: "none", letterSpacing: "0.04em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              See What's Inside ↓
            </a>
            <a href="#waitlist" style={{
              padding: "14px 28px", fontSize: "14px", fontWeight: 700,
              color: "var(--color-warm-bg)", background: "var(--color-warm-accent)",
              borderRadius: 7, textDecoration: "none", letterSpacing: "0.04em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              Join the Waitlist →
            </a>
          </div>

          {/* Stats bar */}
          <div className="bl-stat-bar" style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "40px" }}>
            {[
              { num: "18",   label: "age when I founded it" },
              { num: "5+",   label: "active revenue streams" },
              { num: "50+",  label: "tools tested & documented" },
              { num: "26",   label: "lessons in this course" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 800, color: "var(--color-warm-text)", letterSpacing: "-0.02em" }}>{s.num}</div>
                <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "3px", fontFamily: "var(--font-inter), sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
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
              { title: "People with an idea but no roadmap", body: "You know what you want to build but not how to actually start. This course gives you the step-by-step process from zero — validation, legal, pricing, first customer, operations. No assumed knowledge." },
              { title: "Side hustlers ready to make it official", body: "You've been doing something informally and want to turn it into a real business — legal structure, proper banking, contracts, systems. This course closes the gap between 'I do this for money' and 'I run a business.'" },
              { title: "Students starting something before they graduate", body: "Building something in high school or college is real experience — and it shows up in applications, interviews, and your bank account. This course helps you build it right from the start." },
              { title: "People leaving a job to go independent", body: "You have skills and want to sell them directly. Service businesses, consulting, freelancing — this course covers the entire setup, from LLC to first invoice, and gives you the outreach system to land clients from day one." },
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
            Camera lessons, screen shares of my actual tools and process, and written notes for every lesson. Total: ~4.5 hours of video.
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
                      <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>{mod.lessonCount} lessons · {mod.totalMin} min</span>
                      <span style={{ fontSize: "20px", color: "var(--color-warm-accent)", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", lineHeight: 1 }}>+</span>
                    </div>
                  </button>
                  {open && (
                    <div style={{ padding: "0 24px 24px" }}>
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
                  )}
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
            Templates and tools, not filler.
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "48px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Every tier includes the full resource pack — six working documents referenced inline throughout the course.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "var(--color-warm-border)", borderRadius: 10, overflow: "hidden" }}>
            {[
              { title: "Business Model One-Pager", desc: "One page to define what you're building, who it's for, how you make money, and what makes you different. Used in Module 1.", tag: "Module 01" },
              { title: "Customer Profile Worksheet", desc: "Structured questions to define your target customer — pain points, triggers, objections, and where to find them. Used in Lesson 1-2.", tag: "Lesson 1-2" },
              { title: "LLC Filing Checklist", desc: "State-agnostic step-by-step checklist for forming your LLC — articles, EIN, registered agent, operating agreement, and bank account. Used in Module 2.", tag: "Module 02" },
              { title: "Pricing Calculator", desc: "A spreadsheet to calculate your cost baseline, set floor pricing, test different rates, and see projected revenue at different volume. Used in Lesson 3-2.", tag: "Lesson 3-2" },
              { title: "Brand Positioning Worksheet", desc: "Questions that force you to articulate your name, positioning, tone, and what you stand for in one sitting. Used in Lesson 4-1.", tag: "Lesson 4-1" },
              { title: "Cold Outreach Script Templates", desc: "Three tested outreach scripts — service business, product business, and general inquiry — with subject lines and follow-up sequences. Used in Lesson 6-2.", tag: "Lesson 6-2" },
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
            What makes it different.
          </h2>
          <div className="bl-diff-grid">
            {[
              {
                title: "Built from a Real Business",
                body: "I didn't study entrepreneurship. I built a company. Purcell Ventures runs consulting, software, digital products, and courses simultaneously. Every lesson is based on what I actually did — the tools I actually use, the mistakes I actually made.",
              },
              {
                title: "Every Decision Documented",
                body: "Most business courses tell you what to do. This one shows you exactly how — screen shares of the actual tools, templates I built and use, and the reasoning behind every decision. The data is the course.",
              },
              {
                title: "Resources That Work",
                body: "The resource pack isn't an afterthought. It's six working documents — templates, calculators, scripts — that do the heavy lifting so you spend less time building infrastructure and more time building the actual business.",
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
            Pick your level of support.
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "40px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Course opens when recording is complete. Join the waitlist to be first in and get the early-access price.
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
                  Join Waitlist →
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "16px", padding: "16px 20px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: 6, fontSize: "12px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
            Prices in USD · Payments processed securely via Lemon Squeezy · Access code delivered by email within 5 minutes of purchase
          </div>
        </div>
      </section>

      {/* ── Consulting upsell ─────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px", borderBottom: "1px solid var(--color-warm-border)", background: "var(--color-warm-card)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>Need More Hands-On Help?</div>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "8px" }}>Work with Elijah directly.</h3>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, maxWidth: "460px", fontFamily: "var(--font-dm-sans), sans-serif", margin: 0 }}>
              If you want someone to look at your specific situation — your idea, your offer, your pitch — Purcell Ventures consulting is available for one-on-one sessions.
            </p>
          </div>
          <Link href="/consulting" style={{
            padding: "13px 28px", fontSize: "13px", fontWeight: 700,
            color: "var(--color-warm-accent)", border: "1px solid var(--color-warm-accent)",
            borderRadius: 6, textDecoration: "none", letterSpacing: "0.06em",
            fontFamily: "var(--font-inter), sans-serif", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            View Consulting →
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
            Be first in when it drops.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "40px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Waitlist members get early access pricing and first notification when the course opens.
          </p>
          {waitlisted ? (
            <div style={{ padding: "24px 32px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-accent)", borderRadius: 8 }}>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-warm-accent)", fontFamily: "'Cinzel', Georgia, serif", marginBottom: "6px" }}>You're on the list.</div>
              <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif" }}>You'll hear from me before anyone else.</div>
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
                Notify Me →
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
                  {open && (
                    <div style={{ padding: "0 20px 20px" }}>
                      <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-dm-sans), sans-serif" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "56px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "20px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Something not answered here?
            </p>
            <a href="mailto:elijah@purcell-ventures.com" style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif" }}>
              elijah@purcell-ventures.com →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
