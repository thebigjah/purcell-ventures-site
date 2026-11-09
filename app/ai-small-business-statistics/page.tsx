import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";
import { pageDates } from "@/lib/page-dates";
import { SOURCES, type SourceKey } from "./sources";

// Reference page, written 9 Nov 2026. Every figure was read off the source URL in
// ./sources.ts on that date. A figure that could not be opened at its source stays off the
// page, even when secondary coverage repeats it. Wording is paraphrase, never a quote.

const PATH = "/ai-small-business-statistics";
const URL = `https://purcellventures.co${PATH}`;
const TITLE = "AI in small business: statistics with sources";
const DESCRIPTION =
  "Statistics on AI in U.S. small businesses from the Census Bureau, the Federal Reserve, SBA, Pew and Gallup: adoption, uses, barriers, results and AI search.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "article", images: ["/opengraph-image"] },
};

function S({ k }: { k: SourceKey }) {
  const s = SOURCES[k];
  return <>(<a href={s.url}>{s.name}</a>, {s.short})</>;
}

const QA: [string, string][] = [
  ["What share of small businesses use AI?",
   "It depends on the survey. The Census Bureau put AI use at about 20% of all U.S. businesses in spring 2026, counting use in any business function in the past two weeks. The Federal Reserve's Small Business Credit Survey found 46% of employer firms with 1 to 499 employees using AI in fall 2025. The U.S. Chamber of Commerce found 58% of small businesses using generative AI in 2025."],
  ["What do small businesses use AI for most?",
   "Writing and marketing. In the Federal Reserve's 2025 Small Business Credit Survey, 83% of firms that use AI used it for writing or marketing, 61% for individual productivity and 51% for planning or analysis. Intuit QuickBooks found marketing, customer service and administrative tasks at the top of its 2025 list."],
  ["Why do some small businesses not use AI?",
   "The most common reason is fit. In the Federal Reserve's 2025 Small Business Credit Survey, a third of firms had no plans to use AI, and over half of those said AI does not apply to their business. Among firms already using AI, the top problems were accuracy and adapting tools to their needs."],
  ["Do AI summaries in search reduce clicks to business websites?",
   "Yes, in Pew Research Center's March 2025 browsing data. Google users who saw an AI summary clicked a regular search result in 8% of visits, against 15% for visits without one, and clicked a link inside the summary in 1% of visits."],
];

const KEYS = Object.keys(SOURCES) as SourceKey[];

export default function Page() {
  const d = pageDates(PATH, "2026-11-09")!;
  const LD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${URL}#article`,
        headline: TITLE,
        description: DESCRIPTION,
        url: URL,
        mainEntityOfPage: URL,
        datePublished: d.published,
        dateModified: d.modified,
        inLanguage: "en-US",
        author: { "@id": "https://purcellventures.co/#founder" },
        publisher: { "@id": "https://purcellventures.co/#organization" },
        image: "https://purcellventures.co/opengraph-image",
        citation: KEYS.map((k) => ({
          "@type": "CreativeWork",
          name: SOURCES[k].title,
          publisher: { "@type": "Organization", name: SOURCES[k].name },
          url: SOURCES[k].url,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: QA.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };

  return (
    <>
      <PostLayout
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "AI for small business", href: "/ai-for-small-business" },
          { name: "AI small business statistics", href: PATH },
        ]} />}
        kicker="Reference"
        title="AI in small business: statistics with sources"
        lede="How many U.S. small businesses use AI, what they use it for, what holds them back, what they report getting from it, and how their customers search with AI."
        meta="Compiled by Elijah Purcell, Purcell Ventures, Tuscaloosa. Sources checked 9 November 2026."
      >
        <UpdatedLine path={PATH} bare />

        <p>
          I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I opened every source below
          and read each figure off the source itself. Where a number came only from news
          coverage, I left it out. For the terms these surveys use, see the{" "}
          <Link href="/ai-glossary">AI glossary for small business owners</Link>.
        </p>

        <h2>How should I read these numbers?</h2>

        <p>
          Read each figure against who the survey asked and what it counted as AI use. The
          surveys below disagree by a wide margin because they measure different things.
        </p>

        <ul>
          <li>
            <strong>Who counts as small.</strong> The Census Bureau surveys businesses of every
            size. The Federal Reserve survey covers employer firms with 1 to 499 employees, the
            SBA spotlight uses fewer than 250, Intuit uses up to 100 and Salesforce uses 200 or
            fewer.
          </li>
          <li>
            <strong>What counts as use.</strong> Census asks about AI in any business function
            in the past two weeks. Intuit asks about regular use, the Chamber asks about
            generative AI, and the Federal Reserve counts use by the business or its employees.
          </li>
          <li>
            <strong>Who answered.</strong> Census draws a sample meant to represent U.S. employer
            businesses. The Federal Reserve uses a weighted convenience sample. Goldman Sachs
            surveyed graduates of its own program, and Salesforce surveyed leaders worldwide.
          </li>
          <li>
            <strong>When.</strong> In November 2025 the Census Bureau began asking about AI
            use in any business function, a broader question than before, so its figures from
            before and after that change do not line up.
          </li>
        </ul>

        <h2>How many small businesses use AI?</h2>

        <ul>
          <li>
            About 19.8% of U.S. businesses used AI in some business function in the two-week
            period ending 3 May 2026, and the rate stayed between 17% and 20% from December 2025
            to May 2026. Between 20% and 23% expected to use AI within six months{" "}
            <S k="census" />.
          </li>
          <li>
            Fewer than 20% of firms with four or fewer employees used AI, against 37% of firms
            with 250 or more <S k="census" />.
          </li>
          <li>
            From December 2025 to May 2026, AI use grew among firms with 20 or more employees
            and showed no significant change among firms with fewer than 20{" "}
            <S k="census" />.
          </li>
          <li>
            Census data put AI adoption at about 18% of U.S. firms at the end of 2025{" "}
            <S k="fedNote" />.
          </li>
          <li>
            Under the earlier Census question, the AI use rate among small businesses with fewer
            than 250 employees rose to 8.8% in 2025, from about 6.3% six months before, when
            large businesses stood at 11.1% <S k="sba" />.
          </li>
          <li>
            46% of small employer firms said the business or its employees use AI, 15% more
            planned to start within 12 months, and a third had no plans to use it. The survey
            ran in fall 2025 <S k="sbcs" />.
          </li>
          <li>
            Among those AI users, about half said they were experimenting with it, 44% had
            partly worked it into their business processes, and 7% had fully integrated it{" "}
            <S k="sbcs" />.
          </li>
          <li>
            58% of small businesses said they use generative AI in 2025, up from 40% in 2024 and
            23% in 2023 <S k="chamber" />.
          </li>
          <li>
            68% of U.S. businesses with up to 100 employees said they use AI regularly in April
            2025, up from 48% in July 2024, and 28% used it daily <S k="intuit" />.
          </li>
          <li>
            76% of surveyed small business owners in the Goldman Sachs 10,000 Small Businesses
            program use AI, and 14% say AI has become a full part of their core operations{" "}
            <S k="goldman" />.
          </li>
          <li>
            In 2024, 75% of small and medium businesses worldwide were at least experimenting
            with AI, and 83% of businesses with growing revenue were <S k="salesforce" />.
          </li>
          <li>
            Organizational adoption of AI reached 88% in the 2026 AI Index, a figure that
            reflects organizations of all sizes worldwide <S k="aiIndex" />.
          </li>
        </ul>

        <h2>How many workers use AI on the job?</h2>

        <ul>
          <li>
            As of May 2026, 15% of U.S. employees used AI daily in their role, 30% used it a few
            times a week or more, and 52% used it at least a few times a year{" "}
            <S k="gallup" />.
          </li>
          <li>
            28% of employed U.S. adults said they had used ChatGPT for work in early 2025, up 20
            percentage points in two years <S k="pewChatgpt" />.
          </li>
        </ul>

        <h2>What do small businesses use AI for?</h2>

        <ul>
          <li>
            Of small employer firms that use AI, 83% use it for writing or marketing, 61% for
            individual productivity and 51% for planning or analysis <S k="sbcs" />.
          </li>
          <li>
            The top five uses among U.S. businesses with up to 100 employees were marketing
            (43%), customer service (36%), administrative tasks (33%), data processing (32%)
            and bookkeeping (29%) <S k="intuit" />.
          </li>
          <li>
            AI use stood at 39.7% in the Information sector and 33.9% in Finance and Insurance,
            against the national rate of 19.8%, in the period ending 3 May 2026{" "}
            <S k="census" />.
          </li>
        </ul>

        <h2>What holds small businesses back from AI?</h2>

        <ul>
          <li>
            A third of small employer firms had no plans to use AI. Over half of those said AI
            does not apply to their business, and 30% said they prefer not to use it{" "}
            <S k="sbcs" />.
          </li>
          <li>
            Firms already using AI named accuracy (46%) and adapting tools to their business
            (43%) as their top challenges. Firms planning to start named finding tools that fit
            their needs (54%) <S k="sbcs" />.
          </li>
          <li>
            73% of surveyed owners in the Goldman Sachs program said more training and
            implementation help would benefit their business <S k="goldman" />.
          </li>
          <li>
            65% of small businesses said they worry about a patchwork of different state AI laws{" "}
            <S k="chamber" />.
          </li>
        </ul>

        <h2>What results do small businesses report from AI?</h2>

        <ul>
          <li>
            Of small employer firms using AI, 71% reported higher productivity, 39% better
            quality of goods or services and 31% higher sales. Most saw no change in labor costs{" "}
            <S k="sbcs" />.
          </li>
          <li>
            93% of Goldman Sachs program owners using AI reported a positive effect on their
            business, and 84% named efficiency and productivity as the main gain. 67% expect AI
            to raise revenue <S k="goldman" />.
          </li>
          <li>
            87% of those owners said AI adds to what their employees do instead of replacing
            them <S k="goldman" />.
          </li>
          <li>
            82% of small businesses using AI grew their workforce over the past year{" "}
            <S k="chamber" />.
          </li>
          <li>
            91% of small and medium businesses using AI said it raises their revenue, in a 2024
            global survey <S k="salesforce" />.
          </li>
          <li>
            65% of employees at organizations that have put AI in place said it improved their
            productivity and efficiency, as of May 2026 <S k="gallup" />.
          </li>
        </ul>

        <h2>How do customers use AI to search?</h2>

        <ul>
          <li>
            About half of U.S. adults used AI chatbots in February 2026, up from about a third
            in 2024, and 12% used them several times a day <S k="pewAi2026" />.
          </li>
          <li>
            42% of U.S. adults use AI chatbots to search for information, and 60% say they read
            the AI summaries at the top of search results <S k="pewAi2026" />.
          </li>
          <li>
            44% of U.S. adults use ChatGPT, 24% use Gemini and 17% use Copilot{" "}
            <S k="pewAi2026" />.
          </li>
          <li>
            Google users who saw an AI summary clicked a regular search result in 8% of visits,
            against 15% when no summary appeared. They clicked a link inside the summary in 1%
            of visits. The data covers March 2025 <S k="pewClicks" />.
          </li>
          <li>
            About 18% of Google searches in March 2025 produced an AI summary. The share reached
            53% for searches of ten words or more and 8% for searches of one or two words{" "}
            <S k="pewClicks" />.
          </li>
        </ul>

        <p>
          For what this means for a business website, see{" "}
          <Link href="/ai-websites">AI websites for small businesses</Link>, or run the free{" "}
          <Link href="/ai-visibility-check">AI visibility check</Link> on your own site.
        </p>

        <h2>Common questions</h2>

        {QA.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p style={{ marginTop: 6 }}>{a}</p>
          </div>
        ))}

        <h2 id="sources">Sources</h2>

        <p>All sources accessed 9 November 2026.</p>

        <ol>
          {KEYS.map((k) => {
            const s = SOURCES[k];
            return (
              <li key={k}>
                {s.name}. <a href={s.url}>{s.title}</a>. Published {s.date}. {s.note}
              </li>
            );
          })}
        </ol>

        <p>
          Related guides: <Link href="/ai-for-small-business">AI for small business</Link>,{" "}
          <Link href="/ai-consulting">AI consulting in Alabama</Link>,{" "}
          <Link href="/ai-automation">AI automation for small businesses</Link>,{" "}
          <Link href="/ai-integration">AI integration for small business software</Link>,{" "}
          <Link href="/ai-websites">AI websites for small businesses</Link> and{" "}
          <Link href="/ai-design">AI in design for small businesses</Link>.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <ServiceSchema />
      <PageDates path={PATH} name={TITLE} />
    </>
  );
}
