import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Prose } from "@/app/components/ui";

export const metadata: Metadata = { title: "Thanks for buying the Complete Pack" };

export default function ThanksPage() {
  return (
    <main>
      <PageHero
        kicker="Purchase complete"
        title="Your download link is on its way."
        lede="Stripe will email you one ZIP with all three products in three folders."
      />
      <Section title="First steps">
        <Prose>
          <ol>
            <li>Extract the ZIP. It holds 3 folders.</li>
            <li>Open <code>00-BUNDLE-README.md</code> for the overview.</li>
            <li>Start with the Starter Kit.</li>
            <li>Add the Cold Email Pack templates to your CRM.</li>
            <li>Use the Subject Line Library each time you write a cold email.</li>
          </ol>
          <p><Link href="/">Back to the homepage</Link></p>
        </Prose>
      </Section>
    </main>
  );
}
