import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Rows, Facts, Prose } from "@/app/components/ui";
import { RefTracker } from "../starter-kit/RefTracker";
import { BuyButton } from "../starter-kit/BuyButton";

export const metadata: Metadata = {
  title: "The Complete Pack, all three products for $39",
  description:
    "All three PV products in one purchase: the AI Starter Kit, the Cold Email Mastery Pack and the Subject Line Library. $39 once, $18 less than buying them separately.",
};

const PAYMENT_LINK = process.env.BUNDLE_PAYMENT_LINK || "#configure-stripe";

export default function BundlePage() {
  return (
    <main>
      <RefTracker product="bundle" />
      <PageHero
        kicker="Shop: the Complete Pack"
        title="All three products in one ZIP for $39."
        lede="The three kits cost $57 separately and $39 together, a saving of $18. One checkout, one ZIP in 3 folders, and a 30-day refund."
        actions={<BuyButton paymentLink={PAYMENT_LINK} product="bundle" price="$39" size="large" />}
      />

      <Section title="What is inside">
        <Rows
          items={[
            {
              name: "PV AI Starter Kit",
              fig: "$19 on its own",
              line: "24 AI tool prompts, 5 sales scripts, the full rep handbook, more than 50 cold outreach templates, a 1099 contractor agreement and a CRM CSV. 49 files of prompts, scripts and templates Purcell Ventures uses.",
            },
            {
              name: "Cold Email Mastery Pack",
              fig: "$29 on its own",
              line: "100 cold email templates for 10 industries, 80 subject lines, 30 reply-handling scripts, an AI scoring rubric, 4 email sequences and a list-building playbook.",
            },
            {
              name: "Subject Line Library",
              fig: "$9 on its own",
              line: "80 cold email subject lines in 8 categories, 20 lines to avoid, an A/B testing matrix and a cheat sheet for how subject lines look on a phone.",
            },
          ]}
        />
      </Section>

      <Section title="Price">
        <Facts
          items={[
            ["Bought separately", "$19 + $29 + $9 = $57"],
            ["The Complete Pack", <strong key="b" className="ui-gold">$39 for all three</strong>],
            ["Difference", "The bundle costs $18 less and holds the same files, with the same 30-day refund."],
          ]}
        />
      </Section>

      <Section title="All three for $39, paid once" intro="All three products in 3 folders. Stripe emails the download link after checkout.">
        <div className="ui-hero__actions" style={{ marginTop: 0 }}>
          <BuyButton paymentLink={PAYMENT_LINK} product="bundle" price="$39" size="small" />
        </div>
        <Prose>
          <p style={{ marginTop: 24 }}>
            To buy them one at a time, <Link href="/shop">see all three separately</Link>.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
