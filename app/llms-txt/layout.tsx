import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageDates } from "@/lib/page-dates";

// ANSWER PAGE FOR "WHAT IS LLMS.TXT" (9 Nov 2026).
//
// Every outside claim on this page was opened at its source on 9 Nov 2026: llmstxt.org
// (v2 of the spec, first published 3 Sep 2024), the Answer.AI proposal post, Mintlify's
// llms-full.txt announcement, Google's Search Central guide on generative AI features and
// John Mueller's Bluesky post. Quotes are exact. The Alabama figure is read from
// lib/research, never typed. The BreadcrumbList comes from the Breadcrumbs component.

export const PATH = "/llms-txt";
const URL = `https://purcellventures.co${PATH}`;
const TITLE = "What is llms.txt? The file, the spec and what Google says";
const DESCRIPTION =
  "llms.txt is a Markdown file that points AI tools to a site's key pages. Who proposed it, llms.txt vs llms-full.txt, what Google says and how to write one.";

/** The publish date this page states, so a missing git date can never blank it. */
export const PUBLISHED = "2026-11-09";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["llms.txt", "what is llms.txt", "llms-full.txt", "llms.txt Google", "how to write llms.txt", "llms.txt example"],
  alternates: { canonical: URL },
  openGraph: { title: "What is llms.txt?", description: DESCRIPTION, url: URL, type: "article", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "What is llms.txt?", description: DESCRIPTION },
};

export const QA: [string, string][] = [
  ["Does Google use llms.txt?",
   "Google Search does not. Google's Search Central guide on generative AI features says Google Search ignores llms.txt files, and that making one will neither harm nor help a site's visibility or rankings in Google Search."],
  ["Is llms.txt the same as robots.txt?",
   "No. robots.txt tells crawlers which paths they may fetch. llms.txt describes the site and points AI tools to the pages worth reading, and it blocks nothing."],
  ["Where does the llms.txt file go?",
   "At the root of the domain, so it loads as plain text at yourdomain.com/llms.txt. Version 2 of the spec also allows a file in a subfolder, such as a documentation section."],
  ["Should a small business website have an llms.txt file?",
   "One takes about twenty minutes to write and does nothing for Google rankings. Add one if AI tools that read the file matter to your customers, after the pages themselves say plainly what the business does."],
];

export default function Layout({ children }: { children: ReactNode }) {
  const dates = pageDates(PATH, PUBLISHED)!;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${URL}#article`,
        headline: "What is llms.txt?",
        description: DESCRIPTION,
        url: URL,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { "@id": "https://elijahpurcell.com/#person" },
        publisher: { "@id": "https://purcellventures.co/#organization" },
        about: ["llms.txt", "llms-full.txt", "Generative engine optimization", "AI search"],
        citation: [
          "https://llmstxt.org/",
          "https://www.answer.ai/posts/2024-09-03-llmstxt.html",
          "https://www.mintlify.com/blog/simplifying-docs-with-llms-txt",
          "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: QA.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
