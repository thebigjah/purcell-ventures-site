"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

const STAGES = [
  {
    roman: "I.",
    title: "First conversation (free, 30 min)",
    body: "You email me with a one-sentence description of the problem. I respond within 24 hours, usually same day. We set up a 30-minute call by phone or Zoom, or in person if you're in Metro Atlanta. On the call I scope the work and tell you which of our services fits, which doesn't, and whether you would do better with someone else.",
    bullets: [
      "30 minutes, free, no slides",
      "You get a written recommendation by email the same day",
    ],
    color: "var(--color-warm-accent)",
  },
  {
    roman: "II.",
    title: "Written proposal (24-48 hours after the call)",
    body: "If we're a fit, you get a written proposal within 2 business days. It lists what we will build, what we will not build (the out-of-scope section), a price breakdown, a timeline with milestones and what we need from you to start. The proposal lists every price.",
    bullets: [
      "Specific scope and a bulleted list of deliverables",
      "Both parties sign the out-of-scope section, which keeps the project from growing past what you agreed to pay for",
      "Milestones every 2 weeks for Custom Software, or every week for Digital Services setup",
      "Total cost up front, with setup and monthly fees listed",
    ],
    color: "#7aaa6a",
  },
  {
    roman: "III.",
    title: "Build (per scope)",
    body: "Once you sign and pay the deposit (50% for Custom Software, full setup fee for Digital Services), we start. You see milestones every 2 weeks for Custom Software. For Digital Services, your site is live in 5-7 business days. We send updates without you asking. If something is going to be late, we tell you before the deadline.",
    bullets: [
      "Digital Services setup: 5-7 business days to live site",
      "Custom Software: milestone reviews every 2 weeks and your sign-off before the next phase",
      "We send updates on a schedule, so you don't have to ask",
      "We use the channel you prefer: Slack, text or email",
    ],
    color: "#9b7fd4",
  },
  {
    roman: "IV.",
    title: "Launch + handoff",
    body: "For Digital Services, the site goes live and you get a walkthrough video and a written handoff document. For Custom Software, we transfer the code and IP to you and document the deployment steps. You own everything. If you leave, we hand it all over. The monthly retainer pays for maintenance.",
    bullets: [
      "Full code and IP transfer to you on completion",
      "Plain-language documentation",
      "30-day post-launch warranty: we fix anything that breaks at no charge",
      "Off-ramp clause: end the retainer with 14 days notice and we hand over everything",
    ],
    color: "#e8b968",
  },
  {
    roman: "V.",
    title: "Ongoing relationship",
    body: "Digital Services clients get monthly updates and a quarterly review of what's working. Custom Software clients can opt into a maintenance retainer or pay-per-fix. We respond to client emails within 24 hours during business hours, same-day for Full Service ($279/mo) subscribers. When something urgent comes up, you can text my personal cell.",
    bullets: [
      "Monthly check-in for Digital Services clients",
      "Quarterly review of metrics, with your input on what comes next",
      "Text me directly about urgent problems",
      "A monthly update on what we are working on and why",
    ],
    color: "#c2754a",
  },
];

const COMMITMENTS = [
  { title: "No surprise invoices", body: "Every dollar we charge is in the written proposal. If something changes scope, you sign off before any work happens." },
  { title: "No vendor lock-in", body: "You own your code, IP, domain and data. If you leave, you take all of it with no exit fee." },
  { title: "We say when a product does not fit", body: "If our product doesn't fit, we tell you, and we have turned down deals for that reason." },
  { title: "Response times", body: "Same day on most emails. 4 hours on Full Service subscriptions during business hours. 24-hour max anywhere else. If we're going to miss, we tell you first." },
  { title: "Code you can read", body: "Every Custom Software project ships with plain-language documentation. A developer who has never worked with us can maintain it later." },
  { title: "Christian-rooted ethics", body: "We don't evangelize, but our work is shaped by it. Honesty over closing, respect over urgency, the work is the witness. If you don't share the faith, that's fine, but the ethical floor is the ethical floor." },
];

export default function HowWeWorkPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">How clients work with us</div>
          <h1>
            How we <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>work.</em>
          </h1>
          <p className="deck">
            Here is what happens, in order, from the first email to year three of being a client.
          </p>
        </header>

        {/* Process stages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "64px" }}>
          {STAGES.map((stage) => (
            <article key={stage.roman} className="pv-card" style={{ padding: 0, overflow: "hidden" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ borderLeft: `4px solid ${stage.color}`, padding: "28px 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "20px", alignItems: "baseline", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: stage.color, lineHeight: 1 }}>{stage.roman}</span>
                  <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600, lineHeight: 1.3 }}>{stage.title}</h2>
                </div>
                <p style={{ fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.8, marginBottom: "16px" }}>{stage.body}</p>
                <ul style={{ paddingLeft: "24px", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.8, margin: 0 }}>
                  {stage.bullets.map((b, i) => <li key={i} style={{ marginBottom: "4px" }}>{b}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* The commitments, what's actually in writing */}
        <header className="pv-section-head">
          <span className="roman"></span>
          <h2>Our <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>commitments.</em></h2>
        </header>

        <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.6, marginBottom: "24px", maxWidth: "680px" }}>
          These commitments appear in every contract. If we break one, you can end the contract and we refund you.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "48px" }}>
          {COMMITMENTS.map((c, i) => (
            <div key={i} style={{ padding: "20px 22px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", color: "var(--color-warm-accent)", fontWeight: 600, margin: "0 0 8px" }}>{c.title}</h3>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>

        {/* The reverse, when we say no */}
        <header className="pv-section-head">
          <span className="roman"></span>
          <h2>When we say <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>no.</em></h2>
        </header>

        <p style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7, marginBottom: "16px" }}>
          We turn down work. Specifically:
        </p>
        <ul style={{ paddingLeft: "24px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8, marginBottom: "48px" }}>
          <li>If your business model relies on practices we won&apos;t support: adult content, gambling, predatory finance or MLM.</li>
          <li>If you&apos;re asking us to build something that misleads your customers (fake reviews, deceptive countdown timers, dark patterns).</li>
          <li>If the timeline you need is faster than we can deliver well. We&apos;d rather refer you elsewhere than ship something we&apos;d be embarrassed by.</li>
          <li>If either of us finds on the first call that we don&apos;t work well together.</li>
          <li>If an off-the-shelf tool solves your problem better. We&apos;ll tell you which one to use.</li>
        </ul>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "40px 32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>Start the first conversation</h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Email me a one-sentence description of what you&apos;re trying to do. I&apos;ll respond same day with whether we&apos;re a fit.
          </p>
          <a className="pv-btn-primary" href="mailto:elijah@purcell-ventures.com?subject=Considering%20working%20together">Start the conversation</a>
        </div>

      </main>
    </div>
  );
}
