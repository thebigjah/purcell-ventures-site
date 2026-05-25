import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Cold Email Mastery Pack — $29 — Purcell Ventures",
  description: "100+ tested cold email templates across 10 industries + reply-handling scripts + AI scoring rubric + subject-line library. $29 one-time.",
};

const PAYMENT_LINK = process.env.COLD_EMAIL_PACK_PAYMENT_LINK || "#configure-stripe";

const PACK_CONTENTS = [
  {
    folder: "01-templates-by-industry/",
    title: "100+ cold email templates across 10 industries",
    blurb: "Salon/spa, plumbing/HVAC, dental, real estate, law, marketing agency, e-commerce, wellness/fitness, vet, accounting. 10 templates per industry, each labeled by goal (intro, problem-call-out, value-first, referral-claim, decision-maker-bypass, etc).",
    count: "100 templates",
  },
  {
    folder: "02-subject-lines/",
    title: "Subject line library — 80 tested options across 8 styles",
    blurb: "Direct, question, referral, observation, local, value-first, curiosity, time-bound. Each labeled with open-rate context. Includes 20 subject lines you should NEVER use + why.",
    count: "80 subject lines",
  },
  {
    folder: "03-reply-handling/",
    title: "Reply-handling scripts — 30 scenarios",
    blurb: "What to do when they say 'too expensive', 'I'm interested but', 'send me more info', 'we use a competitor', 'we don't need this'. Each scenario has 2-3 response strategies + when to use which.",
    count: "30 scenarios",
  },
  {
    folder: "04-ai-scoring-rubric/",
    title: "AI Email Scoring Rubric + Claude/GPT prompt",
    blurb: "The exact system prompt to plug into Claude or ChatGPT to score YOUR draft emails on a 0-100 rubric (specificity, ethics, ask-clarity, subject-line strength, anticipation of objections). Includes the rubric criteria as a standalone reference doc.",
    count: "1 system prompt + 1 rubric doc",
  },
  {
    folder: "05-sequencing-cadences/",
    title: "Sequencing cadences — when to send what",
    blurb: "Cold cadence (5 touches over 21 days). Warm cadence (5 touches over 21 days). Quoted-but-silent cadence. Re-engagement after 90 days. Each cadence has the exact email + timing + 'stop after N if no response' rule.",
    count: "4 cadence playbooks",
  },
  {
    folder: "06-list-building/",
    title: "List-building playbook — how to find prospects without buying lists",
    blurb: "10 free + 5 paid sources for finding prospect lists. How to enrich them. How to comply with CAN-SPAM. How to track in a CRM. Bonus: the exact Google query templates we use to find SMB prospects in any city.",
    count: "1 playbook + Google query library",
  },
];

export default function ColdEmailPackPage() {
  const stripeConfigured = !!process.env.COLD_EMAIL_PACK_PAYMENT_LINK;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {!stripeConfigured && (
          <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "2px solid #e54a28", padding: "16px 20px", marginBottom: "32px", fontSize: "13px", color: "#e54a28" }}>
            <strong>⚠ Admin notice:</strong> Set <code style={{ background: "var(--color-warm-bg-alt)", padding: "2px 6px" }}>COLD_EMAIL_PACK_PAYMENT_LINK</code> env var on Vercel. See <code>~/.claude/elijahbot/drafts/STRIPE-SETUP-COLD-EMAIL-PACK.md</code>
          </div>
        )}

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "16px" }}>
            One-Time Download · $29 · Instant Email Delivery
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
            Stop writing cold emails <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>from scratch.</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto 32px" }}>
            100+ industry-specific templates, 80 tested subject lines, 30 reply-handling scripts, an AI scoring rubric, and 4 complete sequencing cadences. Used by Purcell Ventures sales reps every day.
          </p>
          <a
            href={PAYMENT_LINK}
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "var(--color-warm-accent)",
              color: "var(--color-warm-bg)",
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "18px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            Buy now — $29 →
          </a>
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", fontStyle: "italic" }}>
            Secure checkout via Stripe · Instant email delivery · 30-day refund guarantee
          </p>
        </header>

        {/* Or buy the bundle */}
        <div style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px dashed var(--color-warm-accent)", padding: "24px 28px", marginBottom: "48px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "8px" }}>
            ↓ Or save $9 with the bundle ↓
          </div>
          <p style={{ margin: "0 0 12px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
            <Link href="/shop" style={{ color: "var(--color-warm-accent)", textDecoration: "underline" }}>Bundle this with the PV AI Starter Kit ($19)</Link> for <strong>$39 total instead of $48</strong>. Two complementary kits — AI tool prompts + the deep cold-outreach library.
          </p>
        </div>

        {/* What's inside */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", color: "var(--color-warm-text)", margin: "0 0 8px", fontWeight: 600, textAlign: "center" }}>
            What&apos;s <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>inside.</em>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", textAlign: "center", marginBottom: "32px", fontStyle: "italic" }}>
            One ZIP. 6 folders. Editable markdown. 200+ pieces of content total.
          </p>
          <div style={{ display: "grid", gap: "16px" }}>
            {PACK_CONTENTS.map((s) => (
              <article key={s.folder} className="pv-card" style={{ padding: 0, overflow: "hidden" }}>
                <span className="b3"></span><span className="b4"></span>
                <div style={{ padding: "20px 28px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "baseline", flexWrap: "wrap", marginBottom: "8px" }}>
                    <code style={{ fontFamily: "var(--font-dm-sans), monospace", fontSize: "12px", color: "var(--color-warm-accent)", padding: "3px 8px", background: "var(--color-warm-bg-alt)" }}>{s.folder}</code>
                    <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600 }}>{s.title}</h3>
                    <span style={{ fontSize: "10px", color: "var(--color-warm-text-light)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, marginLeft: "auto" }}>{s.count}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>{s.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ marginBottom: "56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ padding: "24px 28px", background: "rgba(122, 170, 106, 0.08)", border: "1px solid #7aaa6a" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "#7aaa6a", fontWeight: 600, margin: "0 0 12px" }}>You&apos;ll get $29 of value if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
              <li>You send cold outreach (or want to start)</li>
              <li>You&apos;ve tried writing emails from scratch and they get ignored</li>
              <li>You&apos;re a freelancer / consultant who needs to fill a pipeline</li>
              <li>You manage a sales team and want a template library to standardize on</li>
              <li>You&apos;re tired of overpriced cold-outreach services like Apollo or Lemlist</li>
            </ul>
          </div>
          <div style={{ padding: "24px 28px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid #e54a28" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "#e54a28", fontWeight: 600, margin: "0 0 12px" }}>Skip this if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
              <li>You only do inbound marketing</li>
              <li>You hate sending emails to people you don&apos;t know (this is for people willing to do it honestly)</li>
              <li>You want a done-for-you cold outreach service (we offer that — start at <Link href="/consulting" style={{ color: "var(--color-warm-accent)" }}>Consulting</Link>)</li>
              <li>You&apos;ve never opened a CRM and don&apos;t want to start (you&apos;ll need somewhere to send these from)</li>
            </ul>
          </div>
        </section>

        {/* Honest pricing math */}
        <section style={{ marginBottom: "56px", padding: "32px 36px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", margin: "0 0 16px", fontWeight: 600 }}>
            The <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>math.</em>
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.7, marginBottom: "16px" }}>
            $29 is two coffees plus tip. Compared to alternatives:
          </p>
          <ul style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.9, paddingLeft: "24px", margin: "0 0 16px" }}>
            <li><strong>Apollo.io / Lemlist:</strong> $99-$179/month subscription. Yearly cost = $1,200-$2,100. They give you tools, not templates.</li>
            <li><strong>Sales copywriter:</strong> $300-$2,000 to write you 10-20 emails. We give you 100+ templates plus all the surrounding infrastructure.</li>
            <li><strong>Cold outreach course:</strong> $497-$1,500 for video content. We give you the templates the courses are made FROM.</li>
            <li><strong>Lifetime cost:</strong> $29 once. Yours forever. <strong style={{ color: "var(--color-warm-accent)" }}>30-day money-back guarantee — Stripe handles refunds automatically.</strong></li>
          </ul>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: 0, fontStyle: "italic" }}>
            If even ONE template wins you ONE client, you&apos;ve paid for the kit hundreds of times over.
          </p>
        </section>

        {/* CTA repeat */}
        <div style={{ textAlign: "center", padding: "40px 32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>
            200+ pieces of content. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>One zip.</em>
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Stripe delivers the download to your email within 60 seconds. 30-day refund if it&apos;s not worth it.
          </p>
          <a
            href={PAYMENT_LINK}
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "var(--color-warm-accent)",
              color: "var(--color-warm-bg)",
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "18px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            Buy the pack — $29 →
          </a>
        </div>

      </main>
    </div>
  );
}
