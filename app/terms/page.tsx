import type { Metadata } from "next";
import { PageHero, Section, Prose } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// From the 17 Aug 2026 draft (bh6/legal-drafts), corrected 1 Nov 2026: the LLC is registered in Georgia,
// not Alabama, and the contact is the business address, never a personal one.
export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for buying from or working with Purcell Ventures LLC.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero kicker="Purcell Ventures LLC" title="Terms" lede="Last updated 1 November 2026." />
      <Section title="Who we are">
        <Prose><p>Purcell Ventures LLC, a Georgia limited liability company, run from Tuscaloosa, Alabama.</p></Prose>
      </Section>
      <Section title="What you buy">
        <Prose><p>Digital products arrive as files or as access. We license them to you for your own use and your own business. You may not resell them or pass them off as your own.</p></Prose>
      </Section>
      <Section title="Refunds">
        <Prose><p>Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. A download cannot be taken back, so refunds run on good faith. If the product was not what you expected, tell us.</p></Prose>
      </Section>
      <Section title="Services">
        <Prose><p>The written scope for each project governs client work. If the scope and this page disagree, the scope wins.</p></Prose>
      </Section>
      <Section title="What we promise">
        <Prose><p>We do the work carefully. Nothing here guarantees a business result. To the extent the law allows, Purcell Ventures LLC is not liable for indirect or consequential loss.</p></Prose>
      </Section>
      <Section title="Governing law">
        <Prose><p>The laws of Georgia, United States, govern these terms.</p></Prose>
      </Section>
    </>
  );
}
