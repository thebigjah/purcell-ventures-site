import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { PostLayout } from "@/app/components/ui";
import { TRADES } from "./trades";

// Index of the "AI for [trade]" set, one level under the AI for small business pillar.

const URL = "https://purcellventures.co/ai-for";

export const metadata: Metadata = {
  title: { absolute: "AI for small business by trade, Purcell Ventures" },
  description:
    "AI for small business by trade: twenty guides, from HVAC and dental offices to gyms, med spas and photographers, on what AI handles and what stays with people.",
  openGraph: {
    title: "AI for small business by trade",
    description: "AI for small business by trade: twenty guides, from HVAC and dental offices to gyms, med spas and photographers, on what AI handles and what stays with people.",
    url: URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for small business by trade",
    description: "AI for small business by trade: twenty guides, from HVAC and dental offices to gyms, med spas and photographers, on what AI handles and what stays with people.",
  },
  alternates: { canonical: URL },
};

const LIST = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${URL}#list`,
  name: "AI for small business by trade",
  itemListElement: TRADES.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `AI for ${t.name}`,
    url: `${URL}/${t.slug}`,
  })),
};

export default function AiForIndex() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "AI for small business", href: "/ai-for-small-business" },
        { name: "AI for small business by trade", href: "/ai-for" },
      ]} />}
      kicker="AI for small business"
      title="AI for small business by trade"
      lede="Twenty trade guides: the jobs AI handles in each business, the work that stays with a person, the privacy cautions, and what Purcell Ventures sets up."
      meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LIST) }} />

      <h2>Which jobs does AI handle in each trade?</h2>

      <ul>
        {TRADES.map((t) => (
          <li key={t.slug}>
            <Link href={`/ai-for/${t.slug}`}><strong>AI for {t.name}.</strong></Link> {t.line}
          </li>
        ))}
      </ul>

      <h2>What does AI do the same way in every trade?</h2>

      <p>
        In every trade the same split holds: AI drafts and sorts, and a person decides. AI
        writes first drafts of estimates, replies, reminders and posts, and it collects
        details from customers at any hour. Prices, diagnoses, legal and medical answers, and
        anything that touches safety stay with the people trained to handle them.
      </p>

      <p>
        Purcell Ventures quotes <Link href="/consulting">training</Link>,{" "}
        <Link href="/digital">website tools</Link> and <Link href="/software">custom
        software</Link> for each business after a free call. For any business, <Link href="/ai-for-small-business">AI for small
        business</Link> covers safe first tasks and a staff AI policy, and{" "}
        <Link href="/ai-automation">AI automation for small businesses</Link> covers booking,
        follow-ups and review requests.
      </p>

      <h2>How do I know where my business should start?</h2>

      <p>
        Start with the task your team repeats most each week that a person can check in a
        minute. The <Link href="/ai-readiness">AI readiness test</Link> scores your team out
        of 30 in ten questions, and the <Link href="/ai-cost-calculator">AI cost
        calculator</Link> shows whether the hours a tool saves cover what it costs.
      </p>

      <UpdatedLine path="/ai-for" bare />
      <PageDates path="/ai-for" />
    </PostLayout>
  );
}
