import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Cold Email Mastery Pack: $29, Purcell Ventures",
  description: "100 cold email templates for 10 industries, reply-handling scripts, an AI scoring rubric and a subject line library. $29 once.",
};

const PAYMENT_LINK = process.env.COLD_EMAIL_PACK_PAYMENT_LINK || "#configure-stripe";

const PACK_CONTENTS = [
  {
    folder: "01-templates-by-industry/",
    title: "100 cold email templates for 10 industries",
    blurb: "Salon/spa, plumbing/HVAC, dental, real estate, law, marketing agency, e-commerce, wellness/fitness, vet, accounting. 10 templates per industry, each labeled by goal: intro, problem call-out, value-first, referral claim, decision-maker bypass and others.",
    count: "100 templates",
  },
  {
    folder: "02-subject-lines/",
    title: "Subject line library: 80 options in 8 styles",
    blurb: "Direct, question, referral, observation, local, value-first, curiosity, time-bound. Each labeled with open-rate context. Includes 20 subject lines to avoid and why.",
    count: "80 subject lines",
  },
  {
    folder: "03-reply-handling/",
    title: "Reply-handling scripts: 30 scenarios",
    blurb: "What to do when they say 'too expensive', 'I'm interested but', 'send me more info', 'we use a competitor', 'we don't need this'. Each scenario has 2 to 3 response strategies and when to use each.",
    count: "30 scenarios",
  },
  {
    folder: "04-ai-scoring-rubric/",
    title: "AI email scoring rubric and Claude/GPT prompt",
    blurb: "A system prompt for Claude or ChatGPT that scores your draft emails on a 0-100 rubric (specificity, ethics, ask-clarity, subject-line strength, anticipation of objections). Includes the rubric criteria as a standalone reference doc.",
    count: "1 system prompt, 1 rubric doc",
  },
  {
    folder: "05-sequencing-cadences/",
    title: "Sequencing cadences: when to send what",
    blurb: "Cold sequence: 5 emails over 21 days. Warm sequence: 5 emails over 21 days. A sequence for leads who got a quote and went silent, and one for re-engaging after 90 days. Each sequence lists the emails, the timing and when to stop if nobody replies.",
    count: "4 sequences",
  },
  {
    folder: "06-list-building/",
    title: "List-building playbook: how to find prospects without buying lists",
    blurb: "10 free and 5 paid sources for prospect lists, how to enrich them, how to comply with CAN-SPAM and how to track them in a CRM. It also includes the Google query templates we use to find small business prospects in a city.",
    count: "1 playbook, Google query library",
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
            One-time download, $29
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
            Cold email templates <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>for 10 industries</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto 32px" }}>
            100 industry-specific templates, 80 subject lines, 30 reply-handling scripts, an AI scoring rubric and 4 email sequences. These are the templates our sales reps work from.
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
            Buy now for $29
          </a>
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", fontStyle: "italic" }}>
            Checkout through Stripe, download by email, 30-day refund
          </p>
        </header>

        {/* Or buy the bundle */}
        <div style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px dashed var(--color-warm-accent)", padding: "24px 28px", marginBottom: "48px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "8px" }}>
            Or save $9 with the bundle
          </div>
          <p style={{ margin: "0 0 12px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
            <Link href="/shop" style={{ color: "var(--color-warm-accent)", textDecoration: "underline" }}>Bundle this with the PV AI Starter Kit ($19)</Link> for <strong>$39 total instead of $48</strong>. The Starter Kit adds AI tool prompts to this pack.
          </p>
        </div>

        {/* What's inside */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", color: "var(--color-warm-text)", margin: "0 0 8px", fontWeight: 600, textAlign: "center" }}>
            What&apos;s <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>inside</em>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", textAlign: "center", marginBottom: "32px", fontStyle: "italic" }}>
            One ZIP with 6 folders of editable markdown files, 200+ pieces of content in all.
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
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "#7aaa6a", fontWeight: 600, margin: "0 0 12px" }}>This pack is for you if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
              <li>You send cold outreach (or want to start)</li>
              <li>You&apos;ve tried writing emails from scratch and they get ignored</li>
              <li>You&apos;re a freelancer or consultant who needs more prospects</li>
              <li>You manage a sales team and want a template library to standardize on</li>
              <li>You pay for a tool like Apollo or Lemlist and want templates to go with it, or instead of it</li>
            </ul>
          </div>
          <div style={{ padding: "24px 28px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid #e54a28" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "#e54a28", fontWeight: 600, margin: "0 0 12px" }}>Skip this if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
              <li>You only do inbound marketing</li>
              <li>You don&apos;t want to email people you don&apos;t know</li>
              <li>You want a done-for-you cold outreach service (we offer that under <Link href="/consulting" style={{ color: "var(--color-warm-accent)" }}>Consulting</Link>)</li>
              <li>You&apos;ve never opened a CRM and don&apos;t want to start (you need somewhere to send these from)</li>
            </ul>
          </div>
        </section>

        {/* Pricing comparison */}
        <section style={{ marginBottom: "56px", padding: "32px 36px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", margin: "0 0 16px", fontWeight: 600 }}>
            How the price <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>compares</em>
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.7, marginBottom: "16px" }}>
            $29 once, compared with the alternatives:
          </p>
          <ul style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.9, paddingLeft: "24px", margin: "0 0 16px" }}>
            <li><strong>Apollo.io / Lemlist:</strong> $99 to $179/month subscription, or $1,200 to $2,100 a year. They sell sending software. This pack is templates.</li>
            <li><strong>Sales copywriter:</strong> $300 to $2,000 to write 10 to 20 emails. This pack has 100 templates plus the scripts, rubric and sequences above.</li>
            <li><strong>Cold outreach course:</strong> $497 to $1,500 for video lessons. This pack has templates you can send.</li>
            <li><strong>Lifetime cost:</strong> You pay $29 once and keep the files. <strong style={{ color: "var(--color-warm-accent)" }}>Refunds within 30 days, processed through Stripe.</strong></li>
          </ul>
        </section>

        {/* CTA repeat */}
        <div style={{ textAlign: "center", padding: "40px 32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>
            Cold Email Mastery Pack, <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>$29</em>
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Stripe emails the download within 60 seconds of checkout. Refunds within 30 days.
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
            Buy the pack for $29
          </a>
        </div>

      </main>
    </div>
  );
}
