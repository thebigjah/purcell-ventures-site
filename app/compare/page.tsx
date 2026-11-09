import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Rows, Prose } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";

// Index for the /compare pages (9 Nov 2026). Each comparison sits under it in the
// breadcrumb trail, so this page has to exist for that trail to lead somewhere.

export const metadata: Metadata = {
  title: "Comparisons for small business buyers",
  description:
    "Side-by-side comparisons for small business owners about to pay for AI or a website: a custom AI agent vs Zapier, an AI website builder vs a custom site, and ChatGPT vs Claude.",
  alternates: { canonical: "https://purcellventures.co/compare" },
};

const PAGES = [
  {
    name: "Custom AI agent vs Zapier",
    href: "/compare/custom-ai-agent-vs-zapier",
    line: "When a Zapier workflow is enough, when a custom agent pays for itself, and what each costs to run.",
  },
  {
    name: "AI website builder vs a custom site",
    href: "/compare/ai-website-builder-vs-custom-site",
    line: "When a builder is enough, when a custom site is worth the build fee, and what you own if you leave.",
  },
  {
    name: "ChatGPT vs Claude for a small business",
    href: "/compare/chatgpt-vs-claude-for-small-business",
    line: "Plans, team data controls, the features that differ, and a test to run on your own work.",
  },
  {
    name: "My prices next to agencies and freelancers",
    href: "/pricing-comparison",
    line: "Purcell Ventures prices beside typical agency, freelancer and do-it-yourself prices.",
  },
];

export default function ComparePage() {
  return (
    <main>
      <PageHero
        planet="pricing"
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Comparisons", href: "/compare" },
        ]} />}
        kicker="Comparisons"
        title="Comparisons for small business buyers"
        lede="A custom AI agent or Zapier, a website builder or a custom site, ChatGPT or Claude. When the cheaper option is the better buy, and what each one costs."
      />

      <Section stack>
        <Rows items={PAGES} />
      </Section>

      <Section title="Where the prices come from">
        <Prose>
          <p>
            I am Elijah Purcell, Founder/CEO of <Link href="/about">Purcell Ventures LLC</Link>.
            Purcell Ventures prices come from my <Link href="/software">software</Link>,{" "}
            <Link href="/sites">websites</Link>, <Link href="/digital">digital</Link> and{" "}
            <Link href="/consulting">consulting</Link> pages. Other companies change their prices
            often, so for their products I describe how each one charges and leave the dollar
            figures to their own sites.
          </p>
        </Prose>
      </Section>

      <UpdatedLine path="/compare" />
      <PageDates path="/compare" name="Comparisons" />
    </main>
  );
}
