"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

const SCRIPTS = [
  {
    name: "Soft Close (preferred first)",
    script: "Here's what I'd suggest — let me put together a quick overview of exactly what I'd build for you, with pricing, and we can look at it together. No commitment. Would that be useful?",
    note: "This gives them an easy 'yes' and you a reason to follow up. Default opening close.",
  },
  {
    name: "Demo Close",
    script: "Can I show you something real quick? [Pull up purcellventures.co/digital on your phone] This is what a full setup looks like for a business like yours. Starting at $99 a month.",
    note: "Always have the site loaded on your phone before any pitch.",
  },
  {
    name: "Pilot Partner Pitch (Digital tiers only)",
    script: "Here's the deal. We just launched these tiers, and right now I have 3 Pilot Partner spots left across all of them. I want to fill them with the right businesses, not just the first three to say yes. If you're a fit, here's what that means for you: 30% off the setup, 30% off your first 6 months. After that you transition to standard pricing — but you'll be paying what's still well under most agencies. What I need from you: at the 60-day mark, a short testimonial — 2 to 3 sentences. Right to use your business as a case study, anonymous if you prefer. And one introduction within 6 months to another business owner you respect. Doesn't have to result in a sale. Just an intro. That's the trade.",
    note: "Memorize the rhythm. Don't manufacture urgency past 'spots are limited' — they actually are.",
  },
  {
    name: "Urgency Close (only when they're warm)",
    script: "I only take on a few new clients at a time so I can actually give each one attention. I've got a slot opening up this month — want to get on a call this week?",
    note: "Only use this if they're genuinely interested. Never fabricate scarcity.",
  },
  {
    name: "Leave-Behind",
    script: "Here's my card. My site is purcellventures.co — you can see pricing, tools, the whole thing. I'll follow up in a day or two if that's okay.",
    note: "Always get permission to follow up. Always actually follow up.",
  },
];

const FOLLOW_UPS = [
  { trigger: "Quoted but no answer", days: "Day 3", script: "Hey [name] — just bumping this up. Want to get on the calendar this week or should I follow up next week?" },
  { trigger: "Ghosted after follow-up #1", days: "Day 8", script: "Hey [name] — last bump on this one. Let me know if it's a 'not now' so I can stop pestering. Either way, no hard feelings." },
  { trigger: "Said 'not now'", days: "+90 days", script: "Hey [name] — about 90 days ago we talked about [service]. Anything changed on your end? No pressure either way." },
];

export default function ScriptsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "60px 36px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Pitch Scripts</div>
            <h1>
              What to <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>say.</em>
            </h1>
            <p className="deck">
              Frameworks for opens, closes, and follow-ups. Memorize the rhythm — don&apos;t read them off a card mid-pitch.
            </p>
          </header>

          <header className="pv-section-head">
            <span className="roman">I.</span>
            <h2>Close <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>frameworks</em></h2>
          </header>

          {SCRIPTS.map((s, i) => (
            <div key={i} style={{ marginBottom: "24px", padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 600 }}>
                {s.name}
              </h3>
              <p style={{ margin: "0 0 12px", fontStyle: "italic", color: "var(--color-warm-text)", lineHeight: 1.7, borderLeft: "3px solid var(--color-warm-accent)", paddingLeft: "16px" }}>
                &ldquo;{s.script}&rdquo;
              </p>
              <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.02em" }}>
                <strong style={{ color: "var(--color-warm-accent)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "10px" }}>Note · </strong>
                {s.note}
              </div>
            </div>
          ))}

          <header className="pv-section-head">
            <span className="roman">II.</span>
            <h2>Follow-up <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>cadence</em></h2>
          </header>

          {FOLLOW_UPS.map((f, i) => (
            <div key={i} style={{ marginBottom: "16px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px" }}>
              <div>
                <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px" }}>
                  {f.days}
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)" }}>{f.trigger}</div>
              </div>
              <p style={{ margin: 0, fontStyle: "italic", fontSize: "14px", lineHeight: 1.6, color: "var(--color-warm-text)" }}>
                &ldquo;{f.script}&rdquo;
              </p>
            </div>
          ))}

          <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic", marginTop: "40px" }}>
            More scripts (objection handlers, escalation language, demo walkthroughs) get added as we hit them in real deals.
          </p>

        </main>
      </div>
    </div>
  );
}
