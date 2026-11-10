import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Prose, Rows, Section } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import summary from "@/lib/research/alabama-2026-11-summary.json";
import cobb from "@/lib/research/cobb-2026-11-summary.json";
import auburn from "@/lib/research/auburn-2026-11-summary.json";
import chattanooga from "@/lib/research/chattanooga-2026-11-summary.json";

// Index of Purcell Ventures research. Each study publishes aggregate figures only.
// The method notes below restate what the study page itself says, so a change to the
// study method has to be mirrored here.

const S = summary.frames.statewide;
const FRAME = summary.frame;
const COBB = cobb.frames.county;
const TUSC = summary.frames.tuscaloosa;
const num = (n: number) => n.toLocaleString("en-US");

// City pages that carry their own figures from these studies. Counts are listed sites checked.
const CITIES = [
  { name: "Birmingham, Alabama", href: "/ai-consulting/birmingham-al", n: summary.frames.birmingham.domains_checked, base: "Alabama study" },
  { name: "Huntsville, Alabama", href: "/ai-consulting/huntsville-al", n: summary.frames.huntsville.domains_checked, base: "Alabama study" },
  { name: "Mobile, Alabama", href: "/ai-consulting/mobile-al", n: summary.frames.mobile.domains_checked, base: "Alabama study" },
  { name: "Montgomery, Alabama", href: "/ai-consulting/montgomery-al", n: summary.frames.montgomery.domains_checked, base: "Alabama study" },
  { name: "Auburn, Alabama", href: "/ai-consulting/auburn-al", n: auburn.frames.city.domains_checked, base: "a city-limits run of the Alabama method" },
  { name: "Chattanooga, Tennessee", href: "/ai-consulting/chattanooga-tn", n: chattanooga.frames.city.domains_checked, base: "a city-limits run of the Alabama method" },
  { name: "Marietta, Georgia", href: "/ai-consulting/marietta-ga", n: cobb.frame.marietta, base: "Cobb County study" },
  { name: "Kennesaw, Georgia", href: "/ai-consulting/kennesaw-ga", n: cobb.frame.kennesaw, base: "Cobb County study" },
  { name: "Acworth, Georgia", href: "/ai-consulting/acworth-ga", n: cobb.frame.acworth, base: "Cobb County study" },
];

export const metadata: Metadata = {
  title: "Research on small business websites",
  description:
    "Purcell Ventures research on small business websites: measured checks of working pages, structured data, AI crawler rules, llms.txt and speed, with the data.",
  alternates: { canonical: "https://purcellventures.co/research" },
  openGraph: {
    title: "Research on small business websites",
    description:
      "Purcell Ventures research on small business websites: measured checks of working pages, structured data, AI crawler rules, llms.txt and speed, with the data.",
    url: "https://purcellventures.co/research",
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function Research() {
  return (
    <main>
      <PageHero
        crumbs={<Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Research", href: "/research" }]} />}
        kicker="Research"
        title="Research on small business websites"
        lede="Measured checks of small business websites, with the method, the limits and the aggregate data for download."
      />
      <Section stack>
        <Prose>
          <p>
            Purcell Ventures studies how small business websites work in practice: whether the
            home page loads, whether it tells search engines and AI assistants what the business
            is, and whether it lets AI crawlers read it. Each study answers a question an owner
            can act on, and each one publishes its full method, its limits and a data file anyone
            can reuse. The first study covers Alabama, where Purcell Ventures is based, and
            checks several of the signals the free AI visibility check reads for a single site.
            The second sets every listed Tuscaloosa business site beside the statewide sample,
            and the third runs the same checks on every listed small business site in Cobb
            County, Georgia.
          </p>
        </Prose>
      </Section>
      <Section title="Which studies can I read?">
        <Rows
          items={[
            {
              name: "Alabama small business websites, November 2026",
              href: "/research/alabama-small-business-websites-2026",
              line: `Answers how many Alabama small business websites work, carry business structured data, block AI crawlers or publish llms.txt, from ${num(S.domains_checked)} randomly drawn sites plus every listed site in Tuscaloosa, Birmingham, Huntsville, Montgomery and Mobile.`,
              fig: "Nov 2026",
            },
            {
              name: "Tuscaloosa small business websites, November 2026",
              href: "/research/tuscaloosa-small-business-websites-2026",
              line: `Sets all ${num(TUSC.domains_checked)} small business websites OpenStreetMap lists in Tuscaloosa beside the Alabama statewide sample, and finds Tuscaloosa sites block AI crawlers far more often than the state.`,
              fig: "Nov 2026",
            },
            {
              name: "Cobb County, Georgia small business websites, November 2026",
              href: "/research/cobb-county-small-business-websites-2026",
              line: `Runs the same checks on all ${num(COBB.domains_checked)} small business websites OpenStreetMap lists in Cobb County, Georgia, and sets the results beside the Alabama statewide sample.`,
              fig: "Nov 2026",
            },
          ]}
        />
      </Section>
      <Section title="Which cities have their own results?" intro="The Alabama and Tennessee city pages set local figures beside the Alabama statewide sample. The Georgia pages give the city's site count and the Cobb County figures.">
        <Rows
          items={CITIES.map((c) => ({
            name: c.name,
            href: c.href,
            line: c.base === "Cobb County study"
              ? `Counts the ${num(c.n)} business websites OpenStreetMap lists in ${c.name.split(",")[0]} and gives the county figures, from the ${c.base}.`
              : `Sets the ${num(c.n)} business websites OpenStreetMap lists in ${c.name.split(",")[0]} beside the Alabama statewide sample, from the ${c.base}.`,
            fig: "Nov 2026",
          }))}
        />
      </Section>
      <Section title="How do the studies work?">
        <Prose>
          <p>
            Every study starts from public data. The Alabama study drew its business listings
            from OpenStreetMap through the public Overpass API, kept {num(FRAME.total)} unique
            business domains after dropping chains, government offices, schools and nonprofits,
            and drew its statewide sample at random with a fixed seed, so anyone can repeat the
            draw. The Cobb County study used the same query and filters and checked all{" "}
            {num(cobb.frame.total)} business domains in the county, so it needed no draw.
          </p>
          <p>
            The method goes up with the results. The study page prints the Overpass query, the
            exact test behind each check, the time window of the run and a list of limits, such
            as one try per site and the gaps in volunteer map data.
          </p>
          <p>
            The pages report aggregate figures only. No study names a business, lists a domain
            or ranks one company against another. The aggregate figures and the CSV carry a{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution
            4.0</a> license, so you can quote and reuse them with credit to Purcell Ventures and,
            for listing data, OpenStreetMap contributors.
          </p>
          <p>
            To see where your own site stands on the same checks, run the free{" "}
            <Link href="/ai-visibility-check">AI visibility check</Link>. It reads your
            robots.txt, llms.txt and home page and lists what to fix.
          </p>
          <p>
            Reporters quoting a study can find bios, a headshot and the press contact in the{" "}
            <Link href="/press">press kit</Link>.
          </p>
        </Prose>
      </Section>
      <UpdatedLine path="/research" />
      <PageDates path="/research" name="Research" />
    </main>
  );
}
