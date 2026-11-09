import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";
import { CONTACT } from "@/lib/contact";
import { pageDates } from "@/lib/page-dates";
import { TRADES, tradeBySlug } from "./trades";

// Shared parts of the twelve trade pages: metadata, the Article and FAQPage schema, the
// breadcrumb trail, the hero meta line and the closing section. The prose of each page
// lives in its own page.tsx because each trade needs its own answers.

const SITE = "https://purcellventures.co";

export function tradeMetadata(slug: string, description: string, keywords: string[]): Metadata {
  const t = tradeBySlug(slug);
  const title = `AI for ${t.name}`;
  const url = `${SITE}/ai-for/${slug}`;
  return {
    title: { absolute: `${title}, Purcell Ventures` },
    description,
    keywords,
    openGraph: { title, description, url, type: "article", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: url },
  };
}

/** Article and FAQPage nodes. The BreadcrumbList comes from the Breadcrumbs component. */
export function TradeSchema({ slug, qa, about }: { slug: string; qa: [string, string][]; about: string[] }) {
  const t = tradeBySlug(slug);
  const url = `${SITE}/ai-for/${slug}`;
  const d = pageDates(`/ai-for/${slug}`);
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: `AI for ${t.name}`,
        url,
        ...(d ? { datePublished: d.published, dateModified: d.modified } : {}),
        author: { "@id": `${SITE}/#founder` },
        publisher: { "@id": `${SITE}/#organization` },
        about,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: qa.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

export function TradeCrumbs({ slug }: { slug: string }) {
  const t = tradeBySlug(slug);
  return (
    <Breadcrumbs trail={[
      { name: "Home", href: "/" },
      { name: "AI for small business", href: "/ai-for-small-business" },
      { name: `AI for ${t.name}`, href: `/ai-for/${slug}` },
    ]} />
  );
}

export function TradeFaq({ qa }: { qa: [string, string][] }) {
  return (
    <>
      <h2>Common questions</h2>
      {qa.map(([q, a]) => (
        <div key={q}>
          <h3>{q}</h3>
          <p style={{ marginTop: 6 }}>{a}</p>
        </div>
      ))}
    </>
  );
}

/** Contact, related guides, other trades, and the dated schema for the route. */
export function TradeEnd({ slug }: { slug: string }) {
  const path = `/ai-for/${slug}`;
  const others = TRADES.filter((t) => t.slug !== slug);
  return (
    <>
      <h2>How do I get in touch?</h2>
      <p>
        Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> and tell me which tasks take
        your week. The first conversation is free, and I reply within one business day.
      </p>
      <p>
        Related guides: <Link href="/ai-for-small-business">AI for small business</Link>,{" "}
        <Link href="/ai-automation">AI automation for small businesses</Link>, the{" "}
        <Link href="/ai-readiness">AI readiness test</Link> and the{" "}
        <Link href="/ai-cost-calculator">AI cost calculator</Link>.
      </p>
      <p>
        Other trades:{" "}
        {others.map((t, i) => (
          <span key={t.slug}>
            <Link href={`/ai-for/${t.slug}`}>{t.name}</Link>
            {i < others.length - 1 ? ", " : "."}
          </span>
        ))}{" "}
        <Link href="/ai-for">All trades</Link>.
      </p>
      <UpdatedLine path={path} bare />
      <ServiceSchema />
      <PageDates path={path} />
    </>
  );
}
