import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { RefTracker } from "../starter-kit/RefTracker";
import { BuyButton } from "../starter-kit/BuyButton";

export const metadata = {
  title: "Whale Alerts Premium: $9/mo, Purcell Ventures",
  description: "Telegram alerts when tracked wallets trade on 6 chains, with a risk score and position sizing for each token. $9/mo. Runs on the Purcell Ventures wallet tracker.",
};

const PAYMENT_LINK = process.env.WALLET_TRACKER_PREMIUM_PAYMENT_LINK || "#configure-stripe";

export default function WalletTrackerPremiumPage() {
  const stripeConfigured = !!process.env.WALLET_TRACKER_PREMIUM_PAYMENT_LINK;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <RefTracker product="wallet-tracker-premium" />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {!stripeConfigured && (
          <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "2px solid #e54a28", padding: "16px 20px", marginBottom: "32px", fontSize: "13px", color: "#e54a28" }}>
            <strong>⚠ Admin notice:</strong> This product launches month 2-3 of the Telegram channel build-up. Set <code style={{ background: "var(--color-warm-bg-alt)", padding: "2px 6px" }}>WALLET_TRACKER_PREMIUM_PAYMENT_LINK</code> when ready. Also configure Stripe webhook + Telegram bot per <code>STRIPE-WEBHOOK-SETUP.md</code>.
          </div>
        )}

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "16px" }}>
            $9/mo, delivered on Telegram, 30-day refund
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "42px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
            Whale Alerts <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Premium.</em>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 28px" }}>
            Telegram alerts within a minute of a tracked wallet trading on any of 6 chains. Each alert carries a risk score and a position size. $9/mo.
          </p>
          <BuyButton paymentLink={PAYMENT_LINK} product="wallet-tracker-premium" price="$9 a month" size="large" />
          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "10px", fontStyle: "italic" }}>
            Cancel anytime, 30-day refund, Telegram invite sent to your email
          </p>
        </header>

        {/* Free vs Premium */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", color: "var(--color-warm-text)", fontWeight: 600, marginBottom: "20px", textAlign: "center" }}>
            Free vs <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Premium</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ padding: "28px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text-muted)", fontWeight: 600, margin: "0 0 16px" }}>Free channel</h3>
              <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
                <li>15-minute alert delay</li>
                <li>ETH chain only</li>
                <li>Weekly results posts</li>
                <li>No position sizing</li>
                <li>Manual risk filtering</li>
              </ul>
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--color-warm-border)" }}>
                <Link href="https://t.me/WhaleAlertsPV" target="_blank" rel="noreferrer" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", fontSize: "13px" }}>Join the free channel</Link>
              </div>
            </div>
            <div style={{ padding: "28px", background: "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(212,175,55,0.02))", border: "2px solid var(--color-warm-accent)" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-accent)", fontWeight: 600, margin: "0 0 16px" }}>Premium ($9/mo)</h3>
              <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
                <li><strong>Alerts within a minute</strong></li>
                <li><strong>All 6 chains</strong> (ETH, Base, ARB, OP, MATIC, SOL)</li>
                <li><strong>Auto risk-scored</strong> (rugs filtered out)</li>
                <li><strong>Position sizing</strong> recommendations</li>
                <li>Weekly deep-dive analysis</li>
              </ul>
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--color-warm-accent)" }}>
                <span style={{ fontSize: "11px", color: "var(--color-warm-accent)", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700 }}>$9/month</span>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency block */}
        <section style={{ marginBottom: "40px", padding: "28px 32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", fontWeight: 600, margin: "0 0 16px" }}>
            How the service works
          </h3>
          <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8 }}>
            <li><strong>Public paper-trading PnL.</strong> We post paper-trading wins and losses every Sunday.</li>
            <li><strong>Live backtest framework.</strong> The engine that ran our 90-day historical backtest now runs the live alerts.</li>
            <li><strong>Risk scoring built in.</strong> The score uses CoinGecko market cap, liquidity and history. Tokens scoring under 4 get no alert.</li>
            <li><strong>One paid tier.</strong> Premium is the only thing we sell in the channel.</li>
            <li><strong>Built by Elijah Purcell</strong> in Tuscaloosa, AL. <Link href="/about" style={{ color: "var(--color-warm-accent)" }}>About page</Link></li>
          </ul>
        </section>

        {/* Disclaimers */}
        <section style={{ marginBottom: "40px", padding: "20px 24px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid #e54a28", fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.7 }}>
          <strong style={{ color: "#e54a28" }}>Not financial advice.</strong> Alerts report what known wallets did. They say nothing about future price. Past paper-trading results (60% win rate, +14% avg winner) do not predict future returns.
          Trade only what you can afford to lose.
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "32px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", fontWeight: 700, margin: "0 0 12px" }}>
            $9/mo, <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>cancel anytime</em>
          </h3>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "0 0 20px" }}>
            Your invite link arrives by email within 60 seconds. It works once and expires after 24 hours.
          </p>
          <BuyButton paymentLink={PAYMENT_LINK} product="wallet-tracker-premium" price="$9 a month" size="small" />
        </div>

      </main>
    </div>
  );
}
