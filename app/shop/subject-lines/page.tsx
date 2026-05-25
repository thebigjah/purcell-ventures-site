import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { RefTracker } from "../starter-kit/RefTracker";
import { BuyButton } from "../starter-kit/BuyButton";

export const metadata = {
  title: "The Cold Email Subject Line Library — $9 — Purcell Ventures",
  description: "80 tested cold email subject lines across 8 categories. PDF + markdown. Instant download. $9 one-time.",
};

const PAYMENT_LINK = process.env.SUBJECT_LINES_PAYMENT_LINK || "#configure-stripe";

const CATEGORIES = [
  { name: "Direct", count: 10, sample: "Quick question about {{company}}" },
  { name: "Question", count: 10, sample: "How are you handling {{specificProblem}}?" },
  { name: "Referral", count: 10, sample: "{{referrer}} → {{firstName}}" },
  { name: "Observation", count: 10, sample: "Noticed {{specificThing}} about {{company}}" },
  { name: "Local", count: 10, sample: "Another {{city}} business owner" },
  { name: "Value-first", count: 10, sample: "Free {{thingTheyNeed}} for {{company}}?" },
  { name: "Curiosity", count: 10, sample: "{{numberOrFact}} — context inside" },
  { name: "Time-bound", count: 10, sample: "Before {{realDeadline}}" },
];

export default function SubjectLinesPage() {
  const stripeConfigured = !!process.env.SUBJECT_LINES_PAYMENT_LINK;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <RefTracker product="subject-lines" />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {!stripeConfigured && (
          <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "2px solid #e54a28", padding: "16px 20px", marginBottom: "32px", fontSize: "13px", color: "#e54a28" }}>
            <strong>⚠ Admin notice:</strong> Set <code style={{ background: "var(--color-warm-bg-alt)", padding: "2px 6px" }}>SUBJECT_LINES_PAYMENT_LINK</code> env var on Vercel.
          </div>
        )}

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "16px" }}>
            $9 · Instant Download · Editable PDF + Markdown
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
            80 cold email subject lines. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Tested. Categorized. Yours.</em>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 28px" }}>
            10 subject lines per category × 8 categories. Every one has been sent in a real cold outreach campaign. Open-rate context included.
          </p>
          <BuyButton paymentLink={PAYMENT_LINK} product="subject-lines" size="large" />
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", fontStyle: "italic" }}>
            Stripe checkout · Instant email delivery · 30-day refund
          </p>
        </header>

        {/* Categories preview */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", color: "var(--color-warm-text)", fontWeight: 600, marginBottom: "12px" }}>
            The <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>8 categories.</em>
          </h2>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "24px", fontStyle: "italic" }}>
            One sample shown from each. The full pack has 10 per category.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {CATEGORIES.map((c) => (
              <div key={c.name} style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600 }}>{c.name}</h3>
                  <span style={{ fontSize: "11px", color: "var(--color-warm-accent)", letterSpacing: "0.18em", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>{c.count} lines</span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>&ldquo;{c.sample}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's also included */}
        <section style={{ marginBottom: "40px", padding: "24px 28px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", fontWeight: 600, margin: "0 0 12px" }}>
            Also in the pack
          </h3>
          <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
            <li><strong>20 subject lines you should NEVER use</strong> — and why each fails</li>
            <li><strong>Token replacement guide</strong> — how to fill in {`{{firstName}}, {{company}}, {{specificThing}}`} correctly</li>
            <li><strong>A/B testing matrix</strong> — which subject lines to test against each other for different niches</li>
            <li><strong>Mobile preview cheat sheet</strong> — how subject lines render on iPhone Mail, Gmail mobile, Outlook</li>
          </ul>
        </section>

        {/* Upsell */}
        <div style={{ marginBottom: "40px", padding: "24px 28px", background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px dashed var(--color-warm-accent)" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "8px" }}>
            ↓ Need the whole playbook? ↓
          </div>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
            Subject lines are part of our larger <Link href="/shop/cold-email-pack" style={{ color: "var(--color-warm-accent)", textDecoration: "underline" }}>Cold Email Mastery Pack ($29)</Link> — which adds 100+ industry templates + reply-handling scripts + AI scoring rubric + sequencing cadences. If you want everything, get the Pack instead and skip this one.
          </p>
        </div>

        {/* Who it's for */}
        <section style={{ marginBottom: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ padding: "20px 24px", background: "rgba(122, 170, 106, 0.08)", border: "1px solid #7aaa6a" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "#7aaa6a", fontWeight: 600, margin: "0 0 8px" }}>Get this if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
              <li>You write cold emails and your subject lines are getting ignored</li>
              <li>You don&apos;t need a full template pack — just better hooks</li>
              <li>You want a quick win, not a deep playbook</li>
              <li>$9 is impulse-pricing for you</li>
            </ul>
          </div>
          <div style={{ padding: "20px 24px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid #e54a28" }}>
            <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "#e54a28", fontWeight: 600, margin: "0 0 8px" }}>Skip this if</h3>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
              <li>You want the full Cold Email Pack ($29) — it includes this</li>
              <li>You don&apos;t send cold emails</li>
              <li>You want a done-for-you outreach service</li>
            </ul>
          </div>
        </section>

        {/* CTA repeat */}
        <div style={{ textAlign: "center", padding: "32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>
            80 subject lines. One PDF. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>$9.</em>
          </h3>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "0 0 20px" }}>
            Stripe sends the PDF to your email within 60 seconds.
          </p>
          <BuyButton paymentLink={PAYMENT_LINK} product="subject-lines" size="small" />
        </div>

      </main>
    </div>
  );
}
