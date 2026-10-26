import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Tiers, Prose, Note } from "@/app/components/ui";
import { RefTracker } from "../starter-kit/RefTracker";
import { BuyButton } from "../starter-kit/BuyButton";

export const metadata: Metadata = {
  // Internal and unfinished (Elijah, 26 Oct 2026): kept for anyone with the link, never listed or indexed.
  robots: { index: false, follow: false },
  title: "Whale Alerts Premium, $9 a month",
  description:
    "Telegram alerts when tracked wallets trade on 6 chains, with a risk score and position sizing for each token. $9 a month. Runs on the Purcell Ventures wallet tracker.",
};

const PAYMENT_LINK = process.env.WALLET_TRACKER_PREMIUM_PAYMENT_LINK || "#configure-stripe";

export default function WalletTrackerPremiumPage() {
  return (
    <main>
      <RefTracker product="wallet-tracker-premium" />
      <PageHero
        kicker="Shop: Whale Alerts Premium"
        title="Telegram alerts within a minute of a tracked wallet trading."
        lede="Alerts cover 6 chains, and each one carries a risk score and a position size. $9 a month."
        meta="Cancel anytime. 30-day refund. The Telegram invite goes to your email."
        actions={<BuyButton paymentLink={PAYMENT_LINK} product="wallet-tracker-premium" price="$9 a month" size="large" />}
      />

      <Section title="Free and premium">
        <Tiers
          tiers={[
            {
              name: "Free channel",
              price: "Free",
              items: ["A 15-minute alert delay", "The ETH chain only", "Weekly results posts", "No position sizing", "Risk filtering left to you"],
              children: (
                <p style={{ marginTop: 16 }}>
                  <a className="ui-link" href="https://t.me/WhaleAlertsPV" target="_blank" rel="noopener noreferrer">Join the free channel</a>
                </p>
              ),
            },
            {
              name: "Premium",
              price: "$9 a month",
              items: [
                "Alerts within a minute",
                "All 6 chains: ETH, Base, ARB, OP, MATIC and SOL",
                "An automatic risk score that filters out rug pulls",
                "Position sizing recommendations",
                "A weekly analysis in depth",
              ],
            },
          ]}
        />
      </Section>

      <Section title="How the service works">
        <Prose>
          <ul>
            <li><strong>Public paper-trading results.</strong> I post paper-trading wins and losses every Sunday.</li>
            <li><strong>The backtest engine runs the live alerts.</strong> The engine that ran the 90-day historical backtest now sends the alerts.</li>
            <li><strong>Risk scoring built in.</strong> The score uses CoinGecko market cap, liquidity and history. Tokens scoring under 4 get no alert.</li>
            <li><strong>One paid tier.</strong> Premium is the only thing I sell in the channel.</li>
            <li><strong>Built by Elijah Purcell</strong> in Tuscaloosa, Alabama. See the <Link href="/about">about page</Link>.</li>
          </ul>
        </Prose>
        <div style={{ marginTop: 28 }}>
          <Note tone="warn">
            <strong>This is not financial advice.</strong> Alerts report what known wallets did and say nothing about future prices. Past paper-trading results (a 60% win rate and a 14% average gain on winning trades) do not predict future returns. Trade only what you can afford to lose.
          </Note>
        </div>
      </Section>

      <Section title="$9 a month, cancel anytime" intro="Your invite link arrives by email within 60 seconds. It works once and expires after 24 hours.">
        <BuyButton paymentLink={PAYMENT_LINK} product="wallet-tracker-premium" price="$9 a month" size="small" />
      </Section>
    </main>
  );
}
