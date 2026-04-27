"use client";
import { useState } from "react";
import Link from "next/link";

// ── Lemon Squeezy URLs — swap these when account is live ──────────────────────
const LS_FULL  = "#waitlist";
const LS_PLAN  = "#waitlist";
const LS_COACH = "#waitlist";
const LS_ONE   = "#waitlist";

// ── Curriculum ────────────────────────────────────────────────────────────────
const MODULES = [
  {
    num: "01", title: "The Truth About Admissions", lessonCount: 2, totalMin: 20,
    lessons: [
      { id: "1-1", title: "How the system actually works", duration: "12 min", format: "Camera" },
      { id: "1-2", title: "The timeline: 9th grade through senior fall", duration: "8 min", format: "Screen share" },
    ],
  },
  {
    num: "02", title: "Building Your School List", lessonCount: 3, totalMin: 35,
    lessons: [
      { id: "2-1", title: "How I found 98 schools — live spreadsheet walkthrough", duration: "14 min", format: "Screen share" },
      { id: "2-2", title: "Reach, match, safety — the real math", duration: "10 min", format: "Camera" },
      { id: "2-3", title: "Scholarship hunting before you apply", duration: "11 min", format: "Camera + Screen" },
    ],
  },
  {
    num: "03", title: "Your Application Foundation", lessonCount: 3, totalMin: 24,
    lessons: [
      { id: "3-1", title: "The activities list — making anything count", duration: "9 min", format: "Camera" },
      { id: "3-2", title: "Honors, awards, and where to find more", duration: "8 min", format: "Camera" },
      { id: "3-3", title: "Letters of rec strategy", duration: "7 min", format: "Camera" },
    ],
  },
  {
    num: "04", title: "The Essays", lessonCount: 4, totalMin: 51,
    lessons: [
      { id: "4-1", title: "What admissions actually wants from your personal statement", duration: "13 min", format: "Camera" },
      { id: "4-2", title: "Writing your essay live", duration: "18 min", format: "Screen share" },
      { id: "4-3", title: "Supplementals — efficiency at scale", duration: "12 min", format: "Camera + Screen" },
      { id: "4-4", title: "Getting feedback and revising", duration: "8 min", format: "Camera" },
    ],
  },
  {
    num: "05", title: "Financial Aid & Scholarships", lessonCount: 3, totalMin: 41,
    lessons: [
      { id: "5-1", title: "FAFSA + CSS Profile explained", duration: "15 min", format: "Screen share" },
      { id: "5-2", title: "My exact scholarship hunting process", duration: "16 min", format: "Screen share" },
      { id: "5-3", title: "Negotiating your award package", duration: "10 min", format: "Camera" },
    ],
  },
  {
    num: "06", title: "The Final Stretch", lessonCount: 2, totalMin: 20,
    lessons: [
      { id: "6-1", title: "EA/ED strategy — when to commit early", duration: "11 min", format: "Camera" },
      { id: "6-2", title: "Comparing offers and making the decision", duration: "9 min", format: "Camera" },
    ],
  },
];

// ── Pricing ───────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Self-Paced",
    price: "$297",
    plan: "or 3 payments of $109",
    highlight: false,
    lsFull: LS_FULL,
    lsPlan: LS_PLAN,
    features: [
      "All 6 modules · 17 lessons",
      "Camera, screen share & written content",
      "My actual school list spreadsheet template",
      "Essay brainstorm worksheet",
      "Scholarship tracker template",
      "Lifetime access + future updates",
    ],
  },
  {
    name: "Coaching Track",
    price: "$997",
    plan: "or 3 payments of $349",
    highlight: true,
    lsFull: LS_COACH,
    lsPlan: LS_COACH,
    features: [
      "Everything in Self-Paced",
      "Monthly group Q&A with Elijah — 3 sessions",
      "Recorded session replays",
      "Priority essay feedback in group calls",
      "Access to cohort community",
    ],
  },
  {
    name: "1:1 Intensive",
    price: "$2,500",
    plan: "payment plans available",
    highlight: false,
    lsFull: LS_ONE,
    lsPlan: LS_ONE,
    features: [
      "Everything in Coaching Track",
      "3 hours direct with Elijah",
      "Personal statement review + feedback",
      "School list strategy session",
      "Financial aid negotiation prep",
      "Direct email access during application season",
    ],
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is this for high schoolers or parents?",
    a: "Both. The content is written so the student can follow it alone, but parents often go through it too and find the financial aid and scholarship modules especially useful. The $505k stat in the headline is for parents — they know what that means.",
  },
  {
    q: "I'm already a junior or senior. Is it too late?",
    a: "No. The essay modules, financial aid sections, and scholarship hunting process are immediately applicable regardless of where you are in the timeline. The earlier modules on building your list are still useful if you haven't finalized schools.",
  },
  {
    q: "You're 18. Why should I take college advice from you?",
    a: "Because I just did it. 34 acceptances. $505,000+ in scholarships per year. I researched 98 schools and applied to dozens. I made real mistakes and real wins and I documented everything. A 50-year-old counselor has experience — I have current, specific, documented results.",
  },
  {
    q: "Does this work for scholarships specifically, or just admissions?",
    a: "Both, but scholarships is where this course is uniquely strong. Module 5 is entirely dedicated to FAFSA, CSS Profile, and the scholarship hunting process I used to identify and apply for the opportunities that added up to $505k+/year.",
  },
  {
    q: "What's an access code and how does it work?",
    a: "After you purchase, Lemon Squeezy sends you a confirmation email with a unique access code. You enter it once on the course page and your browser remembers it — no login or account needed.",
  },
  {
    q: "How long do I have access?",
    a: "Lifetime. The course content lives on this site as long as Purcell Ventures exists. You'll also get any future updates I add — new lessons, updated templates, anything I add based on student feedback.",
  },
  {
    q: "What's the difference between the Coaching Track and 1:1 Intensive?",
    a: "Coaching Track gets you into monthly group calls where you can ask questions directly. It's me, live, answering your specific situation — not just pre-recorded content. The 1:1 Intensive is private hours with me: we review your personal statement, build your school list strategy together, and prep your financial aid negotiation.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. If you start with Self-Paced and want to add coaching, reach out directly — the price difference applies as a credit.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function CollegeAppsPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq,    setOpenFaq]    = useState<number | null>(null);
  const [payMode,    setPayMode]    = useState<"full" | "plan">("full");
  const [email,      setEmail]      = useState("");
  const [waitlisted, setWaitlisted] = useState(false);

  function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem("pv_course_waitlist") || "[]");
      localStorage.setItem("pv_course_waitlist", JSON.stringify([
        ...existing,
        { email: email.trim(), ts: new Date().toISOString(), course: "college-apps" },
      ]));
    } catch {}
    setWaitlisted(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)" }}>
      <style>{`
        .ca-stat-bar { display: flex; gap: 48px; flex-wrap: wrap; }
        .ca-diff-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .ca-who-grid  { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1px; }
        @media (max-width: 767px) {
          .ca-stat-bar { gap: 28px; }
          .ca-diff-grid { grid-template-columns: 1fr; }
          .ca-hero-btns { flex-direction: column; }
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
            College Application Course
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 700, lineHeight: 1.0, marginBottom: "28px", maxWidth: "820px" }}>
            <span style={{ color: "var(--color-warm-accent)" }}>34 acceptances.<br />$505,000+.</span>
            <br />
            <span style={{ color: "var(--color-warm-text)" }}>I'll show you how.</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, maxWidth: "560px", marginBottom: "40px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            I'm Elijah Purcell. I'm 18. I just went through the college application process and came out with more acceptances and scholarship money than I knew what to do with. This course is everything I learned — documented, structured, and taught the way I wish someone had taught it to me.
          </p>
          <div className="ca-hero-btns" style={{ display: "flex", gap: "12px", marginBottom: "56px" }}>
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
          <div className="ca-stat-bar" style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "40px" }}>
            {[
              { num: "34",    label: "college acceptances" },
              { num: "$505k+", label: "in scholarships / year" },
              { num: "98",    label: "schools researched" },
              { num: "17",    label: "lessons in this course" },
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
            If the process feels overwhelming,<br />this course is for you.
          </h2>
          <div className="ca-who-grid" style={{ background: "var(--color-warm-border)", borderRadius: 10, overflow: "hidden" }}>
            {[
              { title: "High schoolers (9th–12th)", body: "You're in the middle of it. Whether you're just starting to think about college or finalizing your list senior year, this course meets you where you are." },
              { title: "Parents of applicants", body: "Especially if you're trying to maximize scholarship money. The financial aid and scholarship modules alone cover strategies most families never hear about." },
              { title: "First-generation students", body: "Nobody in your family has done this before. This course doesn't assume you already know how applications, financial aid, or college selection work — it starts from the beginning." },
              { title: "Students who've been rejected", body: "Waitlisted, deferred, or didn't get into your top choice last cycle. This course covers what actually moves the needle — and it's not what most people focus on." },
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
            6 modules. 17 lessons.<br />The whole process.
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "48px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Camera lessons, screen shares of my actual process, and written notes for every lesson. Total: ~3.5 hours of video.
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
                            <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif", minWidth: 20 }}>
                              {li + 1}.
                            </span>
                            <span style={{ fontSize: "14px", color: "var(--color-warm-text)", fontFamily: "var(--font-dm-sans), sans-serif" }}>{l.title}</span>
                          </div>
                          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                            <span style={{ fontSize: "10px", padding: "2px 8px", border: "1px solid var(--color-warm-border)", borderRadius: 20, color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                              {l.format}
                            </span>
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

      {/* ── What makes this different ─────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontFamily: "var(--font-inter), sans-serif" }}>Why This Course</div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "48px", lineHeight: 1.1 }}>
            What makes it different.
          </h2>
          <div className="ca-diff-grid">
            {[
              {
                title: "Peer Perspective",
                body: "I didn't study college admissions. I went through it. Every lesson is based on what I actually did — not what a textbook says works. The tactics are current, specific, and tested.",
              },
              {
                title: "Real Numbers",
                body: "34 acceptances and $505k+/year in scholarships aren't vague credentials. I'll show you the spreadsheet, the emails, the timelines. The data is the course.",
              },
              {
                title: "Process, Not Theory",
                body: "Other courses tell you what matters. This one shows you exactly how to do it — screen shares of the actual tools, templates I built, and step-by-step walkthroughs of every major task.",
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
                <ul style={{ margin: "0 0 32px", paddingLeft: "0", listStyle: "none", flex: 1 }}>
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
