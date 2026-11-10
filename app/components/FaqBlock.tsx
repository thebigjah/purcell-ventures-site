import type { ReactNode } from "react";
import { Section, Faq } from "./ui";

// FAQPage SCHEMA AND THE VISIBLE ANSWERS, FROM ONE LIST.
//
// Schema that promises an answer the page does not show is misleading structured data. An
// audit on 9 Nov 2026 found 60 schema-only entries, most of them one block a layout copied
// onto every child route. Everything that emits FAQPage on these pages now goes through
// here, so the question and answer a crawler reads are the strings a visitor reads.
// `node scripts/check-faq-visible.mjs` checks the built HTML after `npm run build`.

/** [question, answer]. Plain strings, because the same text goes into the schema. */
export type QA = [string, string];

export function faqSchema(qa: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** The schema only, for a page that already renders the same strings itself. */
export function FaqSchema({ qa }: { qa: QA[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(qa)) }} />;
}

/** A "Common questions" section with the matching FAQPage schema. */
export default function FaqBlock({ qa, title = "Common questions", intro }: { qa: QA[]; title?: ReactNode; intro?: ReactNode }) {
  return (
    <>
      <FaqSchema qa={qa} />
      <Section title={title} intro={intro}>
        <Faq items={qa.map(([q, a]) => ({ q, a }))} />
      </Section>
    </>
  );
}
