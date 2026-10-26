import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Prose, Button } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Thanks for buying the Subject Line Library",
};

export default function ThanksPage() {
  return (
    <main>
      <PageHero
        kicker="Purchase complete"
        title="Your download is on its way."
        lede="Stripe will email you the PDF and markdown files within 60 seconds. Check your inbox and your spam folder."
      />
      <Section title="What to do first">
        <Prose>
          <ol>
            <li>Open the PDF. The first section is a cheat sheet of the categories.</li>
            <li>Pick the category that fits your next outreach.</li>
            <li>Replace the {`{{tokens}}`} with the prospect&apos;s details.</li>
            <li>Send, track opens, and keep the one or two lines in each campaign that get the best open rates.</li>
          </ol>
        </Prose>
      </Section>
      <Section title="Cold Email Mastery Pack">
        <Prose>
          <p>
            The <Link href="/shop/cold-email-pack">Cold Email Mastery Pack ($29)</Link> includes more than 100 industry templates, reply scripts and email sequences.
          </p>
        </Prose>
        <div className="ui-hero__actions">
          <Button href="/shop/cold-email-pack">See the full pack</Button>
          <Link className="ui-link" href="/">Back to the homepage</Link>
        </div>
      </Section>
    </main>
  );
}
