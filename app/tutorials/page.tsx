import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Rows, ClosingCall } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Tutorials for the Purcell Ventures tools",
  description: "Short how-to guides for each Purcell Ventures AI tool, with example output. Reading them needs no login.",
};

interface Tutorial {
  slug: string;
  category: "AI" | "Sales" | "Operations";
  title: string;
  blurb: string;
  toolLink: string;
  readTime: string;
}

const TUTORIALS: Tutorial[] = [
  {
    slug: "ai-faq-builder",
    category: "AI",
    title: "How to generate an FAQ page with the AI FAQ Builder",
    blurb: "A walkthrough of the AI FAQ Builder, with example output for a salon, a plumbing company and a dental practice.",
    toolLink: "/digital/tools/faq-builder",
    readTime: "3 min read",
  },
  {
    slug: "ai-content-generator",
    category: "AI",
    title: "How to edit AI blog drafts",
    blurb: "How to use the AI Content Generator to get usable first drafts, and three rules for editing them.",
    toolLink: "/digital/tools/ai-content-generator",
    readTime: "5 min read",
  },
  {
    slug: "ai-cold-email-audit",
    category: "AI",
    title: "How to audit your cold email before sending",
    blurb: "Paste your draft into the AI Cold Email Audit tool. It returns a 0 to 100 score, the top 3 improvements and a rewritten version.",
    toolLink: "/digital/tools/cold-email-audit",
    readTime: "4 min read",
  },
  {
    slug: "ai-brand-kit-builder",
    category: "AI",
    title: "How to build a brand kit with the Brand Kit Builder",
    blurb: "How to use the Brand Kit Builder to get a color palette, typography pairs and logo concepts for a new business.",
    toolLink: "/digital/tools/brand-kit-builder",
    readTime: "5 min read",
  },
  {
    slug: "ai-customer-persona",
    category: "AI",
    title: "How to build a customer persona with the Customer Persona Builder",
    blurb: "How to use the Customer Persona Builder to write a persona document for your sales and marketing team.",
    toolLink: "/digital/tools/customer-persona-builder",
    readTime: "4 min read",
  },
  {
    slug: "ai-pricing-audit",
    category: "Sales",
    title: "How to audit your pricing page with the Pricing Audit tool",
    blurb: "Paste your URL and the tool reviews your pricing structure, social proof and calls to action. Includes common findings and how to fix them.",
    toolLink: "/digital/tools/pricing-page-audit",
    readTime: "3 min read",
  },
  {
    slug: "ai-objection-handler",
    category: "Sales",
    title: "Three response options for handling sales objections",
    blurb: "Paste an objection to get 3 response strategies: agree and pivot, ask a clarifying question, or push back directly.",
    toolLink: "/rep-portal",
    readTime: "4 min read",
  },
  {
    slug: "ai-pitch-coach",
    category: "Sales",
    title: "How to critique your own sales pitch",
    blurb: "Paste your pitch script. The tool returns feedback on 8 dimensions, a rewrite and 3 alternative angles.",
    toolLink: "/rep-portal",
    readTime: "5 min read",
  },
  {
    slug: "ai-call-recap",
    category: "Sales",
    title: "Turning 90 seconds of notes into a structured call recap",
    blurb: "Paste your post-call notes. The tool sorts them into outcome, key points, what they committed to, what you committed to, next action and a tone read.",
    toolLink: "/rep-portal",
    readTime: "3 min read",
  },
  {
    slug: "ai-email-polish",
    category: "Sales",
    title: "Polishing an email draft in 30 seconds",
    blurb: "Paste a rough email. The tool returns an edited version, alternative subject lines and notes on what changed and why.",
    toolLink: "/rep-portal",
    readTime: "3 min read",
  },
  {
    slug: "operations-loyalty",
    category: "Operations",
    title: "How to set up a simple customer loyalty system",
    blurb: "How to use the loyalty tool to track punch cards and repeat customers. It needs no barcode scanner.",
    toolLink: "/digital/loyalty",
    readTime: "4 min read",
  },
  {
    slug: "operations-estimating",
    category: "Operations",
    title: "How to create line-item estimates with tax and terms",
    blurb: "Build line-item estimates with tax, exclusions and terms, and print them as a PDF.",
    toolLink: "/digital/estimating",
    readTime: "5 min read",
  },
];

export default function TutorialsPage() {
  const byCategory = TUTORIALS.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {} as Record<string, Tutorial[]>);

  return (
    <main>
      <PageHero
        kicker="How-to guides"
        title="Tutorials for the free tools."
        lede="Short how-to guides for my tools, with setup, the steps, an example output and common variations. You do not need to log in to read them."
      />

      {Object.entries(byCategory).map(([category, items]) => (
        <Section key={category} title={category}>
          <Rows
            items={items.map((t) => ({
              name: t.title,
              line: t.blurb,
              fig: t.readTime,
              href: t.toolLink,
            }))}
          />
        </Section>
      ))}

      <ClosingCall
        title="AI workflows I run for you"
        line={<>On the digital services tiers I set up and run AI workflows for your business. I also sell templates and scripts in the <Link className="ui-link" href="/shop">shop</Link>. I reply within one business day.</>}
        button="See digital services"
        href="/digital"
      />
    </main>
  );
}
