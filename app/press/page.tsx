import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Prose, Facts, Rows } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import summary from "@/lib/research/alabama-2026-11-summary.json";
import { pct } from "@/lib/research/alabama-2026.mjs";
import CopyText from "./CopyText";

// Press kit. Third person throughout, because a reporter lifts these lines straight into
// copy. Facts only from the pages named in layout.tsx. Study figures come from the summary
// JSON at build time.

const S = summary.frames.statewide;
const DOWN = pct(S.not_reachable.n, S.domains_checked);
const ALL_THREE = pct(S.all_three_ai_signals.n, S.own_domain_pages);

const CRIMSON_WHITE = "https://thecrimsonwhite.com/130128/news/ua-ai-club-kicks-off-year-with-president-mohler/";
const APP_STORE = "https://apps.apple.com/us/app/rufus-rideshare/id6813645816";

const ONE_LINE =
  "Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, which builds AI systems and custom software for small businesses, and a University of Alabama student in the Class of 2030.";

const SHORT_BIO =
  "Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, a software company he registered in Georgia in April 2025, at seventeen. The company builds AI systems, custom software and websites for small businesses, and Elijah handles the client calls, the scoping and the building himself. He built and runs COSMIC, a system of 57 AI agents in 17 rooms that handles proposals, site audits, security checks, research and outreach. In October 2026 Apple approved Rufus Rideshare, an iPhone app he built for a client, for the App Store. He studies psychology and data science at the University of Alabama, in New College and the Honors College, on a pre-med track toward psychiatry.";

const BOILERPLATE =
  "Purcell Ventures LLC is a Tuscaloosa, Alabama AI and software company (a Georgia LLC). It builds AI systems and custom software for small businesses and runs hands-on AI and business consulting. Elijah Purcell founded the company on 8 April 2025. COSMIC, a system of 57 AI agents in 17 rooms, handles its proposals, site audits, research and outreach. More at purcellventures.co.";

const FACTS: [React.ReactNode, React.ReactNode][] = [
  ["Company", "Purcell Ventures LLC"],
  ["Founded", "8 April 2025, as Zultar LLC"],
  ["Renamed", "Purcell Ventures LLC on 27 January 2026, same control number"],
  ["Registration", `Georgia Secretary of State, control number ${CONTACT.llcControlNumber}, filed in Acworth, Georgia`],
  ["Based in", "Tuscaloosa, Alabama"],
  ["Founder", "Elijah Purcell, Founder/CEO and sole member"],
  ["What it builds", "AI systems and custom software for small businesses, plus AI and business consulting and websites"],
  ["AI agents", <>COSMIC, 57 AI agents in 17 rooms, each one software. <Link className="ui-link" href="/team">The roster</Link></>],
  ["App Store", <>Rufus Rideshare, a client iPhone app, approved by Apple on 8 October 2026. <a className="ui-link" href={APP_STORE} target="_blank" rel="noopener noreferrer">App Store listing</a></>],
  ["Education", "University of Alabama, New College and the Honors College, Class of 2030, psychology and data science"],
];

const ANGLES = [
  {
    name: "The state of Alabama small business websites",
    line: `${DOWN}% of ${S.domains_checked} randomly drawn Alabama small business websites had no working home page, and ${ALL_THREE}% carried all three AI search signals the study tested.`,
    href: "/research/alabama-small-business-websites-2026",
  },
  {
    name: "A freshman runs a company with 57 AI agents",
    line: "A University of Alabama freshman runs a registered company with COSMIC, 57 AI agents in 17 rooms, and publishes the roster with each agent's limits.",
    href: "/team",
  },
  {
    name: "A free AI visibility check for any business",
    line: "The check reads a business's robots.txt, llms.txt and home page and lists what to fix for AI search.",
    href: "/ai-visibility-check",
  },
  {
    name: "What AI gets wrong inside a small business",
    line: "Five failures from running AI agents in production, including a gate that always passed and findings that closed themselves.",
    href: "/blog/what-the-agents-get-wrong",
  },
];

export default function PressPage() {
  return (
    <main>
      <PageHero
        kicker="Press"
        title="Press kit"
        lede="Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, a Tuscaloosa, Alabama AI and software company (a Georgia LLC) he formed in April 2025 at seventeen. The company builds AI systems and custom software for small businesses and advises owners on using them. He runs it while studying at the University of Alabama."
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Press kit", href: "/press" },
        ]} />}
      />

      <Section title="Bios">
        <CopyText label="One-line bio" text={ONE_LINE} />
        <CopyText label="Short bio" text={SHORT_BIO} />
      </Section>

      <Section title="Company boilerplate">
        <CopyText label="Boilerplate" text={BOILERPLATE} />
      </Section>

      <Section title="Fast facts">
        <Facts items={FACTS} />
      </Section>

      <Section title="Story angles">
        <Rows items={ANGLES} />
      </Section>

      <Section title="Coverage">
        <Prose>
          <p>
            The Crimson White quoted Elijah on bringing AI tools to local businesses:
          </p>
          <blockquote>
            &ldquo;We work with small businesses in the area, local people and mom-and-pop shops that don&apos;t have access to the technologies that a lot of bigger corporations use.&rdquo;
          </blockquote>
          <p>
            From <a href={CRIMSON_WHITE} target="_blank" rel="noopener noreferrer">UA AI club kicks off year with President Mohler</a>, by Katelin Flemmons, 9 September 2026.
          </p>
        </Prose>
      </Section>

      <Section
        title="Photos and logos"
        aside={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/brand/elijah.jpg" alt="Elijah Purcell, Founder/CEO of Purcell Ventures LLC" width={240} height={240} />
        }
      >
        <Facts
          items={[
            ["Headshot", <>JPG, 560 by 560 pixels. <a className="ui-link" href="/brand/elijah.jpg" download="elijah-purcell-headshot.jpg">Download the headshot</a></>],
            ["Logo mark, gold foil", <>SVG, scales to any size. <a className="ui-link" href="/mark-foil.svg" download="purcell-ventures-mark-foil.svg">Download the foil mark</a></>],
            ["Logo mark, flat ochre", <>SVG, one colour, scales to any size. <a className="ui-link" href="/mark-ochre.svg" download="purcell-ventures-mark-ochre.svg">Download the ochre mark</a></>],
          ]}
        />
      </Section>

      <Section id="contact" title="Press contact" intro="Elijah answers press requests himself and replies within one business day.">
        <Facts
          items={[
            ["Email", <a key="e" className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>],
            ["Phone or text", <a key="p" className="ui-link" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>],
            ["More on Elijah", <Link key="w" className="ui-link" href="/who">Who is Elijah Purcell</Link>],
            ["More on the company", <Link key="c" className="ui-link" href="/what-is-purcell-ventures">What is Purcell Ventures</Link>],
          ]}
        />
      </Section>
    </main>
  );
}
