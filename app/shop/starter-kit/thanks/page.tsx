import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Prose, Button } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Thanks for buying the PV AI Starter Kit",
  description: "Your download link is in your email. Check spam if it has not arrived within 2 minutes.",
};

export default function ThanksPage() {
  return (
    <main>
      <PageHero
        kicker="Purchase complete"
        title="Your purchase went through."
        lede="Stripe is emailing your download link. It usually arrives within 60 seconds."
        meta={<>Look for a message from <code>noreply@stripe.com</code> or <code>receipts@stripe.com</code>. If it has not arrived in 2 minutes, check spam.</>}
      />
      <Section title="First steps with the kit">
        <Prose>
          <ol>
            <li>Open <code>00-INDEX.pdf</code>, the table of contents.</li>
            <li>Pick one folder to start with, based on what you need most. For most people that is <code>01-ai-prompts/</code> or <code>02-sales-scripts/</code>.</li>
            <li>Paste one prompt into ChatGPT or Claude and run it on your business.</li>
          </ol>
        </Prose>
      </Section>
      <Section title="Custom AI tools">
        <Prose>
          <p>
            I also build, deploy and maintain custom AI tools for businesses, starting at $99 a month. I work from the same files as the kit and do the setup for you.
          </p>
        </Prose>
        <div className="ui-hero__actions">
          <Button href="/digital">See digital services</Button>
          <Link className="ui-link" href="/">Back to the homepage</Link>
        </div>
      </Section>
    </main>
  );
}
