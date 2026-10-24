import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { RefTracker } from "./RefTracker";
import { BuyButton } from "./BuyButton";

/**
 * /shop/starter-kit, the money-maker.
 *
 * One-time $19 self-serve digital download. Stripe Checkout handles
 * payment + delivery (built-in digital product fulfillment). After
 * Elijah does the one-time Stripe setup, this page sells autonomously.
 *
 * Env var: STARTER_KIT_PAYMENT_LINK = full Stripe Checkout URL
 *
 * Affiliate tracking: ?ref=name in URL captures referrer + appends to Stripe URL.
 */

export const metadata = {
  title: "The PV AI Starter Kit: $19, Purcell Ventures",
  description: "The Purcell Ventures sales and AI files: 24 AI tool prompts, our sales scripts, a contractor template, a CRM CSV and 50+ email templates. $19 one-time.",
};

const PAYMENT_LINK = process.env.STARTER_KIT_PAYMENT_LINK || "#configure-stripe";

const KIT_CONTENTS = [
  {
    folder: "01-ai-prompts/",
    title: "24 production AI tool system prompts",
    items: ["FAQ Builder", "Content Generator", "Caption Generator", "Color Palette", "Brand Kit Builder", "Logo Concepts", "Business Card Copy", "Social Templates", "Review Response", "Email Composer", "SMS Composer", "Estimate Generator", "Cold Email Audit", "Hiring Job Posting", "Customer Persona Builder", "Pricing Page Audit", "Customer Onboarding Sequence", "Win-Back Email", "Meeting Agenda Generator", "About Page Writer", "Tagline Generator", "SOP Writer", "Lead Magnet Idea Generator", "Plus the 8 internal sales-coach prompts"],
    blurb: "The Claude and GPT system prompts behind the Purcell Ventures AI tools. Paste them into the AI you use. Each prompt includes quality bars, an output structure and ethical limits.",
  },
  {
    folder: "02-sales-scripts/",
    title: "5 close frameworks + 3 follow-up cadences",
    items: ["Soft-close framework", "Demo-close framework", "Objection-handling framework", "Pilot Partner pitch script", "Final-touch / exit-permission script", "Day 1/3/7 follow-up cadence", "Day 14/30 follow-up cadence", "Re-pitch (90-day cooling-off) cadence"],
    blurb: "Word-for-word scripts from the rep handbook, with timing, what to listen for and when to escalate.",
  },
  {
    folder: "03-handbook/",
    title: "The full rep handbook (sanitized for resale)",
    items: ["Onboarding flow", "Compensation tiers", "Ethical guardrails (the 'never do this' list)", "Common objection responses", "Escalation rules", "Mid-call backup framework", "After-every-call checklist"],
    blurb: "The handbook our reps use, including the list of things a rep must never do to close a sale.",
  },
  {
    folder: "04-templates/",
    title: "Operational templates",
    items: ["1099 contractor agreement (with under-18 guardian co-sign block)", "CRM CSV template with 12 fields + 10 sample rows", "Email templates: cold outreach, day-3 follow-up, Pilot Partner pitch, final touch", "Steady comparison framework", "Pricing reference card"],
    blurb: "Edit your name and business into each template and it is ready to use.",
  },
  {
    folder: "05-cold-outreach/",
    title: "50+ cold outreach email templates",
    items: ["Industry-specific cold opens (salon, plumbing, dental, real estate, law, marketing, e-commerce, wellness, vet, accounting)", "5 referral-based openers", "5 LinkedIn DM scripts", "Subject line library (~40 tested options)", "Token-replacement guide"],
    blurb: "Cold outreach templates that give the prospect a specific reason for the email.",
  },
];

export default function StarterKitPage() {
  const stripeConfigured = !!process.env.STARTER_KIT_PAYMENT_LINK;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <RefTracker product="starter-kit" />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>


        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "16px" }}>
            One-time download, $19
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
            Our AI prompts, sales scripts and rep handbook
            <br />for <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>$19.</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto 32px" }}>
            The Purcell Ventures AI Starter Kit has 24 AI tool prompts, 5 sales scripts, the rep handbook, 50+ cold outreach templates, a 1099 contractor template and a CRM CSV. Every file is editable and yours to keep.
          </p>
          <BuyButton paymentLink={PAYMENT_LINK} product="starter-kit" price="$19" size="large" />
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", fontStyle: "italic" }}>
            Checkout through Stripe, delivery by email, 30-day refund
          </p>
        </header>

        {/* What's inside */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", color: "var(--color-warm-text)", margin: "0 0 8px", fontWeight: 600, textAlign: "center" }}>
            What&apos;s <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>inside.</em>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", textAlign: "center", marginBottom: "32px", fontStyle: "italic" }}>
            One ZIP with 5 folders of Markdown files and a PDF index.
          </p>
          <div style={{ display: "grid", gap: "16px" }}>
            {KIT_CONTENTS.map((section) => (
              <article key={section.folder} className="pv-card" style={{ padding: 0, overflow: "hidden" }}>
                <span className="b3"></span><span className="b4"></span>
                <div style={{ padding: "20px 28px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "baseline", flexWrap: "wrap" }}>
                    <code style={{ fontFamily: "var(--font-dm-sans), monospace", fontSize: "12px", color: "var(--color-warm-accent)", padding: "3px 8px", background: "var(--color-warm-bg-alt)" }}>{section.folder}</code>
                    <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600 }}>{section.title}</h3>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "8px 0 12px", lineHeight: 1.6 }}>{section.blurb}</p>
                  <details>
                    <summary style={{ cursor: "pointer", fontSize: "11px", color: "var(--color-warm-accent)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>
                      Show {section.items.length} files
                    </summary>
                    <ul style={{ margin: "10px 0 0", paddingLeft: "20px", fontSize: "12px", color: "var(--color-warm-text)", lineHeight: 1.7, columns: 2, columnGap: "24px" }}>
                      {section.items.map((item, i) => <li key={i} style={{ marginBottom: "2px" }}>{item}</li>)}
                    </ul>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ marginBottom: "56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ padding: "24px 28px", background: "rgba(122, 170, 106, 0.08)", border: "1px solid #7aaa6a" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "#7aaa6a", fontWeight: 600, margin: "0 0 12px" }}>This kit is for you if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
              <li>You run a small business and want AI prompts you can paste in today</li>
              <li>You&apos;re building a sales team and need scripts and a handbook</li>
              <li>You&apos;re a freelancer or consultant pitching small businesses</li>
              <li>You&apos;re tired of paying $200/mo for AI tools you don&apos;t use</li>
              <li>You want to see how a working sales operation runs</li>
            </ul>
          </div>
          <div style={{ padding: "24px 28px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid #e54a28" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "#e54a28", fontWeight: 600, margin: "0 0 12px" }}>Skip this if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
              <li>You want managed AI services (see <Link href="/digital" style={{ color: "var(--color-warm-accent)" }}>Digital</Link>)</li>
              <li>You want pre-built software that does the work for you</li>
              <li>You don&apos;t want to copy and paste prompts into ChatGPT or Claude</li>
              <li>You want a strategy book. This kit is scripts, prompts and templates</li>
            </ul>
          </div>
        </section>

        {/* 60-second decision */}
        <section style={{ marginBottom: "56px", padding: "32px 36px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", margin: "0 0 16px", fontWeight: 600 }}>
            Refunds
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "var(--color-warm-accent)" }}>30-day money-back guarantee.</strong> Refunds go through Stripe.
          </p>
        </section>

        {/* CTA repeat */}
        <div style={{ textAlign: "center", padding: "40px 32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>
            One ZIP, bought once
          </h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Stripe emails the download within 60 seconds of purchase. You do not need an account.
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
            Buy the kit for $19
          </a>
        </div>

      </main>
    </div>
  );
}
