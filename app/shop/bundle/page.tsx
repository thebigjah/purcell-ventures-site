import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { RefTracker } from "../starter-kit/RefTracker";
import { BuyButton } from "../starter-kit/BuyButton";

export const metadata = {
  title: "The Complete Pack: All 3 products bundled, $39, Purcell Ventures",
  description: "Get all 3 PV products at once: AI Starter Kit + Cold Email Mastery Pack + Subject Line Library. Save $18 vs buying separately. $39 one-time, instant download.",
};

const PAYMENT_LINK = process.env.BUNDLE_PAYMENT_LINK || "#configure-stripe";

export default function BundlePage() {
  const stripeConfigured = !!process.env.BUNDLE_PAYMENT_LINK;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <RefTracker product="bundle" />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {!stripeConfigured && (
          <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "2px solid #e54a28", padding: "16px 20px", marginBottom: "32px", fontSize: "13px", color: "#e54a28" }}>
            <strong>⚠ Admin notice:</strong> Set <code style={{ background: "var(--color-warm-bg-alt)", padding: "2px 6px" }}>BUNDLE_PAYMENT_LINK</code> env var. Upload <code>dist/pv-complete-bundle.zip</code> (82 KB, 61 files) to Stripe.
          </div>
        )}

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "16px" }}>
            Save $18 · 60+ files · Instant download
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
            The <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Complete Pack.</em>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 8px" }}>
            All 3 PV products in a single ZIP.
          </p>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-light)", margin: "0 0 28px", fontStyle: "italic" }}>
            $57 if bought separately. $39 as the bundle. Math is right there.
          </p>
          <BuyButton paymentLink={PAYMENT_LINK} product="bundle" size="large" />
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", fontStyle: "italic" }}>
            Single Stripe Checkout · Single ZIP download · 30-day refund
          </p>
        </header>

        {/* What's inside */}
        <section style={{ marginBottom: "40px", display: "grid", gap: "20px" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", color: "var(--color-warm-text)", fontWeight: 600, textAlign: "center", margin: 0 }}>
            What&apos;s <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>inside.</em>
          </h2>

          <article className="pv-card" style={{ padding: "28px 32px" }}>
            <span className="b3"></span><span className="b4"></span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600 }}>01. PV AI Starter Kit</h3>
              <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", letterSpacing: "0.18em" }}>$19 standalone</span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: 0 }}>
              24 production AI tool prompts + 5 sales scripts + full rep handbook + 50+ cold outreach templates + 1099 contractor agreement + CRM CSV. 42 files of operational infrastructure used internally at Purcell Ventures.
            </p>
          </article>

          <article className="pv-card" style={{ padding: "28px 32px" }}>
            <span className="b3"></span><span className="b4"></span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600 }}>02. Cold Email Mastery Pack</h3>
              <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", letterSpacing: "0.18em" }}>$29 standalone</span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: 0 }}>
              100+ industry-specific cold email templates across 10 verticals + 80 subject lines + 30 reply-handling scripts + AI scoring rubric + 4 sequencing cadences + complete list-building playbook.
            </p>
          </article>

          <article className="pv-card" style={{ padding: "28px 32px" }}>
            <span className="b3"></span><span className="b4"></span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: 0, fontWeight: 600 }}>03. Subject Line Library</h3>
              <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", letterSpacing: "0.18em" }}>$9 standalone</span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: 0 }}>
              80 tested cold email subject lines across 8 categories + 20 anti-patterns you should never use + A/B testing matrix + mobile preview cheat sheet.
            </p>
          </article>
        </section>

        {/* Math block */}
        <section style={{ marginBottom: "40px", padding: "28px 32px", background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px solid var(--color-warm-accent)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "16px" }}>
            The math
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: "8px", alignItems: "center", fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)" }}>
            <div>$19</div>
            <div style={{ color: "var(--color-warm-text-muted)" }}>+</div>
            <div>$29</div>
            <div style={{ color: "var(--color-warm-text-muted)" }}>+</div>
            <div>$9</div>
            <div style={{ color: "var(--color-warm-text-muted)" }}>=</div>
            <div style={{ color: "var(--color-warm-text-muted)", textDecoration: "line-through" }}>$57</div>
          </div>
          <div style={{ marginTop: "12px", fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", color: "var(--color-warm-accent)", fontWeight: 700 }}>
            $39 bundled.
          </div>
          <p style={{ marginTop: "8px", fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>
            Save $18. Same files. Same instant download. Same 30-day refund.
          </p>
        </section>

        {/* Final CTA */}
        <div style={{ textAlign: "center", padding: "32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>
            All 3 products. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>$39 once.</em>
          </h3>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "0 0 20px" }}>
            61 files total. Stripe delivers a single ZIP via email within 60 seconds.
          </p>
          <BuyButton paymentLink={PAYMENT_LINK} product="bundle" size="small" />
        </div>

        <p style={{ marginTop: "32px", textAlign: "center", fontSize: "12px", color: "var(--color-warm-text-light)" }}>
          Prefer to grab them individually? <Link href="/shop" style={{ color: "var(--color-warm-accent)" }}>See all 3 separately</Link>.
        </p>

      </main>
    </div>
  );
}
