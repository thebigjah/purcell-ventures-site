import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Prose } from "@/app/components/ui";

export const metadata: Metadata = {
  // Internal and unfinished (Elijah, 26 Oct 2026): kept for anyone with the link, never listed or indexed.
  robots: { index: false, follow: false },
  title: "Thanks for subscribing to Whale Alerts Premium",
};

export default function ThanksPage() {
  return (
    <main>
      <PageHero
        kicker="Subscription active"
        title="Your subscription is active."
        lede="Within 60 seconds you will get an email with your one-time Telegram invite link. Open it to join the premium channel."
      />
      <Section title="Things to know">
        <Prose>
          <ul>
            <li>The invite link works once and expires in 24 hours.</li>
            <li>Alerts start as soon as you join. Expect 2 to 5 a day.</li>
            <li>To cancel, reply to the welcome email, or open your Stripe receipt and choose Manage subscription.</li>
            <li>If you miss the invite, reply to the welcome email and I will send a new one within 24 hours.</li>
          </ul>
          <p><Link href="/">Back to the homepage</Link></p>
        </Prose>
      </Section>
    </main>
  );
}
