import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Prose, Button } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Thanks for buying the Cold Email Mastery Pack",
};

export default function ThanksPage() {
  return (
    <main>
      <PageHero
        kicker="Purchase complete"
        title="Your purchase went through."
        lede="Stripe is emailing your download link. It usually arrives within 60 seconds."
      />
      <Section title="How to use the pack">
        <Prose>
          <ol>
            <li>Open <code>00-INDEX.md</code>, the table of contents.</li>
            <li>Pick your target industry from <code>01-templates-by-industry/</code>.</li>
            <li>Take one template and fill in the {`{{tokens}}`} for your business.</li>
            <li>Send 10 emails and track the replies.</li>
            <li>When you get stuck, use <code>04-ai-scoring-rubric/</code> to score and improve your drafts.</li>
          </ol>
        </Prose>
      </Section>
      <Section title="Next: the PV AI Starter Kit">
        <Prose>
          <p>
            The <Link href="/shop/starter-kit">PV AI Starter Kit ($19)</Link> adds 24 AI tool prompts and the full rep handbook, which this pack does not include.
          </p>
        </Prose>
        <div className="ui-hero__actions">
          <Button href="/shop/starter-kit">See the Starter Kit</Button>
          <Link className="ui-link" href="/">Back to the homepage</Link>
        </div>
      </Section>
    </main>
  );
}
