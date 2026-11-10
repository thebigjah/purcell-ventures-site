import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Rows, Prose } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";

// Index for the /compare pages (9 Nov 2026). Each comparison sits under it in the
// breadcrumb trail, so this page has to exist for that trail to lead somewhere.
// Each row line names the question its page answers.

export const metadata: Metadata = {
  title: "Comparisons for small business buyers",
  description:
    "Small business comparisons before you buy AI or a website: who to hire, chatbot vs receptionist, Zapier vs a custom agent, and ChatGPT vs Claude, side by side.",
  alternates: { canonical: "https://purcellventures.co/compare" },
};

const PAGES = [
  {
    name: "AI consultant vs agency vs freelancer",
    href: "/compare/ai-consultant-vs-agency-vs-freelancer",
    line: "Answers who to hire for AI work: an independent consultant, an agency, a marketplace freelancer or your own team.",
  },
  {
    name: "Hire an AI consultant or do it yourself",
    href: "/compare/hire-ai-consultant-vs-do-it-yourself",
    line: "Answers whether your business should learn AI tools on its own or pay for training, and how to tell which side you are on.",
  },
  {
    name: "AI chatbot vs a human receptionist",
    href: "/compare/ai-chatbot-vs-human-receptionist",
    line: "Answers which customer questions a website chatbot or AI phone answering can take and which ones need a person.",
  },
  {
    name: "Custom AI agent vs Zapier",
    href: "/compare/custom-ai-agent-vs-zapier",
    line: "Answers when a Zapier workflow is enough and when a custom agent pays for itself, with what each costs to run.",
  },
  {
    name: "AI website builder vs a custom site",
    href: "/compare/ai-website-builder-vs-custom-site",
    line: "Answers when a builder is enough, when a custom site is worth the build fee, and what you own if you leave.",
  },
  {
    name: "ChatGPT vs Claude for a small business",
    href: "/compare/chatgpt-vs-claude-for-small-business",
    line: "Answers which chat assistant fits your team, with plans, data controls and a test to run on your own work.",
  },
  {
    name: "How agencies, freelancers and I each charge",
    href: "/pricing-comparison",
    line: "Answers how Purcell Ventures, agencies, freelancers and do-it-yourself tools each set a price, and what each one includes.",
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
        lede="Six side-by-side comparisons for a small business about to spend money on AI or a website. Each one names when the cheaper option or the other company is the better buy."
      />

      <Section stack>
        <Prose>
          <p>
            Before you pay for AI work or a new website, two questions decide most of the
            outcome: who should do the work, and which tool fits the job. Each comparison below
            opens with a table you can read in a minute, then covers when each option fits, what
            goes wrong, how each one charges and what to ask before you sign. Where the answer is
            a free tool, a do-it-yourself plan or another company, the comparison says so.
          </p>
        </Prose>
        <Rows items={PAGES} />
      </Section>

      <Section title="How do these comparisons handle prices?">
        <Prose>
          <p>
            I am Elijah Purcell, Founder/CEO of <Link href="/about">Purcell Ventures LLC</Link>.
            I quote every <Link href="/software">software</Link>,{" "}
            <Link href="/sites">website</Link>, <Link href="/digital">digital</Link> and{" "}
            <Link href="/consulting">consulting</Link> project for the business after a free
            call. Other companies change their
            prices often, so for their products I describe how each one charges and leave the
            dollar figures to their own sites.
          </p>
          <p>
            If a fact about another company has changed, email me and I will correct it.
          </p>
        </Prose>
      </Section>

      <Section title="Where should I start?">
        <Prose>
          <p>
            If you are not sure which question you have, take the{" "}
            <Link href="/ai-readiness">AI readiness test</Link> first. Ten questions score your
            team out of 30 and point to three next steps. The{" "}
            <Link href="/ai-cost-calculator">AI cost calculator</Link> then shows how many hours
            a task costs your team now, which sets a ceiling on what any of these options is
            worth. For terms you meet along the way, the{" "}
            <Link href="/ai-glossary">AI glossary</Link> defines each one in plain words.
          </p>
        </Prose>
      </Section>

      <UpdatedLine path="/compare" />
      <PageDates path="/compare" name="Comparisons" />
    </main>
  );
}
