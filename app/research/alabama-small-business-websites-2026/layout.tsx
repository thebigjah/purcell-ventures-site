import type { Metadata } from "next";
import type { ReactNode } from "react";
import summary from "@/lib/research/alabama-2026-11-summary.json";
import { pct } from "@/lib/research/alabama-2026.mjs";

// RESEARCH: ALABAMA SMALL BUSINESS WEBSITES, NOVEMBER 2026.
//
// Every figure in the metadata and schema comes from lib/research/alabama-2026-11-summary.json,
// the aggregate summary of one run on 9 Nov 2026. The raw file with domains stays off this
// site. Never add a domain or business name to this route. The BreadcrumbList comes from
// the Breadcrumbs component in page.tsx.

const URL = "https://purcellventures.co/research/alabama-small-business-websites-2026";
const CSV = "https://purcellventures.co/research/alabama-small-business-websites-2026-aggregates.csv";
const S = summary.frames.statewide;

export const TITLE = `Alabama small business websites in 2026, ${S.domains_checked} sites checked`;
export const DESCRIPTION =
  `I checked ${S.domains_checked} Alabama small business websites in November 2026. ` +
  `${pct(S.not_reachable.n, S.domains_checked)}% had no working home page and ` +
  `${pct(S.all_three_ai_signals.n, S.own_domain_pages)}% had all three AI search signals I tested.`;

export const QA: [string, string][] = [
  [
    "What did the Alabama small business website study measure?",
    `It checked the home page of each business website for a working response, https, a viewport tag, a title, a meta description and Organization or LocalBusiness JSON-LD. It also read robots.txt for five AI crawlers, looked for an llms.txt file and timed the first byte and the HTML download from one computer in Tuscaloosa.`,
  ],
  [
    "How was the sample drawn?",
    `Business listings with a website came from OpenStreetMap through the Overpass API on 9 November 2026. After removing chains, government and nonprofit offices and social media pages, ${summary.frame.total.toLocaleString("en-US")} business domains remained in Alabama. The statewide figures come from a simple random draw of ${S.domains_checked} of them. The Tuscaloosa, Birmingham, Huntsville, Montgomery and Mobile figures cover every domain inside each city limit.`,
  ],
  [
    "Can I check my own website the same way?",
    "Yes. The free AI visibility check at purcellventures.co/ai-visibility-check reads your robots.txt, llms.txt and home page, including the title, meta description, structured data and https, and lists what to fix.",
  ],
  [
    "Can I use the data?",
    "Yes. The aggregate figures and the CSV carry a Creative Commons Attribution 4.0 license. Credit Purcell Ventures and OpenStreetMap contributors, whose listings under the Open Database License formed the sample frame. The file holds counts and percentages only, with no domains or business names.",
  ],
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const MEASURED = [
  "HTTP status of the home page",
  "https on the final address",
  "viewport meta tag",
  "page title",
  "meta description",
  "Organization or LocalBusiness JSON-LD",
  "robots.txt rules for GPTBot, ClaudeBot, PerplexityBot, Google-Extended and CCBot under RFC 9309",
  "llms.txt file",
  "time to first byte",
  "HTML download time and size",
  "kind of business from OpenStreetMap tags",
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dataset",
      "@id": `${URL}#dataset`,
      name: "Alabama small business websites, November 2026",
      description:
        `Aggregate checks of ${S.domains_checked} randomly drawn Alabama small business websites and every listed business website in Tuscaloosa, Birmingham, Huntsville, Montgomery and Mobile: working home page, https, viewport, title, meta description, business JSON-LD, AI crawler rules in robots.txt, llms.txt and response time, with the main checks also broken down by kind of business. Sample frame from OpenStreetMap. Counts and percentages only, with no domains or business names.`,
      url: URL,
      creator: { "@id": "https://purcellventures.co/#organization" },
      publisher: { "@id": "https://purcellventures.co/#organization" },
      datePublished: "2026-11-09",
      temporalCoverage: "2026-11-09",
      spatialCoverage: { "@type": "Place", name: "Alabama, United States" },
      license: "https://creativecommons.org/licenses/by/4.0/",
      isBasedOn: "https://www.openstreetmap.org/copyright",
      measurementTechnique: MEASURED,
      variableMeasured: MEASURED,
      distribution: {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: CSV,
      },
      isAccessibleForFree: true,
    },
    {
      "@type": "Article",
      "@id": `${URL}#article`,
      headline: TITLE,
      description: DESCRIPTION,
      url: URL,
      datePublished: "2026-11-09",
      dateModified: "2026-11-09",
      author: { "@id": "https://elijahpurcell.com/#person" },
      publisher: { "@id": "https://purcellventures.co/#organization" },
      about: { "@id": `${URL}#dataset` },
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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
