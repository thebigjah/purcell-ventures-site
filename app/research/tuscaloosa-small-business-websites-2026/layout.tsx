import type { Metadata } from "next";
import type { ReactNode } from "react";
import summary from "@/lib/research/alabama-2026-11-summary.json";
import { pct } from "@/lib/research/alabama-2026.mjs";

// RESEARCH: TUSCALOOSA SMALL BUSINESS WEBSITES, NOVEMBER 2026.
//
// The Tuscaloosa frame of the Alabama study, set beside the Alabama statewide random sample.
// Every figure in the metadata and schema comes from lib/research/alabama-2026-11-summary.json,
// the aggregate summary of one run on 9 Nov 2026. The raw file with domains stays off this
// site. Never add a domain or business name to this route. The BreadcrumbList comes from the
// Breadcrumbs component in page.tsx.

const URL = "https://purcellventures.co/research/tuscaloosa-small-business-websites-2026";
const ALABAMA = "https://purcellventures.co/research/alabama-small-business-websites-2026";
// The Alabama aggregates CSV already holds a tuscaloosa row for every measure.
const CSV = "https://purcellventures.co/research/alabama-small-business-websites-2026-aggregates.csv";
const T = summary.frames.tuscaloosa;
const S = summary.frames.statewide;
// The publication date is the calendar day the checks finished in Tuscaloosa, America/Chicago.
export const RUN_DAY = new Date(summary.checks_finished_utc).toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

const tBlock = pct(T.robots_blocks_any_ai_bot.n, T.own_domain_pages);
const sBlock = pct(S.robots_blocks_any_ai_bot.n, S.own_domain_pages);

export const TITLE = "Tuscaloosa small business websites, November 2026";
export const DESCRIPTION =
  `I checked all ${T.domains_checked} Tuscaloosa small business websites listed in OpenStreetMap. ` +
  `${tBlock.toFixed(1)}% of their own-domain pages block an AI crawler, against ${sBlock.toFixed(1)}% across Alabama.`;

export const QA: [string, string][] = [
  [
    "How do Tuscaloosa small business websites compare with the rest of Alabama?",
    `On most checks they sit close to the Alabama statewide sample. ${pct(T.not_reachable.n, T.domains_checked).toFixed(1)}% of Tuscaloosa sites had no working home page, against ${pct(S.not_reachable.n, S.domains_checked).toFixed(1)}% statewide, and ${pct(T.jsonld_org_or_localbusiness.n, T.own_domain_pages).toFixed(1)}% carried business structured data, against ${pct(S.jsonld_org_or_localbusiness.n, S.own_domain_pages).toFixed(1)}%. The clear gap is AI crawler blocking: ${T.robots_blocks_any_ai_bot.n} of ${T.own_domain_pages} Tuscaloosa pages block at least one AI crawler, against ${S.robots_blocks_any_ai_bot.n} of ${S.own_domain_pages} in the statewide sample.`,
  ],
  [
    "How many sites do the Tuscaloosa figures rest on?",
    `${T.domains_checked} business domains, every one that OpenStreetMap lists inside the Tuscaloosa city limit, and ${T.own_domain_pages} working home pages that stayed on the business's own domain. One site moves a Tuscaloosa page figure by ${pct(1, T.own_domain_pages).toFixed(1)} points, so read small gaps with care.`,
  ],
  [
    "Why would a small business site block AI crawlers?",
    "The check reads the rule in robots.txt and cannot tell who wrote it. Some owners choose to block AI crawlers, and some website platforms, hosts and SEO plugins add the rules for them. A blocked crawler cannot read the page, so an AI assistant describes the business from other sources.",
  ],
  [
    "Can I check my own website the same way?",
    "Yes. The free AI visibility check at purcellventures.co/ai-visibility-check reads your robots.txt, llms.txt and home page, including the title, meta description, structured data and https, and lists what to fix.",
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
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dataset",
      "@id": `${URL}#dataset`,
      name: "Tuscaloosa, Alabama small business websites, November 2026",
      description:
        `Aggregate checks of all ${T.domains_checked} Tuscaloosa, Alabama small business websites listed in OpenStreetMap, beside a random sample of ${S.domains_checked} Alabama sites: working home page, https, viewport, title, meta description, business JSON-LD, AI crawler rules in robots.txt, llms.txt and response time. Counts and percentages only, with no domains or business names.`,
      url: URL,
      creator: { "@id": "https://purcellventures.co/#organization" },
      publisher: { "@id": "https://purcellventures.co/#organization" },
      datePublished: RUN_DAY,
      temporalCoverage: `${summary.overpass_fetched_utc.tuscaloosa.slice(0, 10)}/${RUN_DAY}`,
      spatialCoverage: { "@type": "Place", name: "Tuscaloosa, Alabama" },
      license: "https://creativecommons.org/licenses/by/4.0/",
      isBasedOn: ["https://www.openstreetmap.org/copyright", `${ALABAMA}#dataset`],
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
      datePublished: RUN_DAY,
      dateModified: RUN_DAY,
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
