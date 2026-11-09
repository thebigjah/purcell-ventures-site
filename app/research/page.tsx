import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Prose, Rows, Section } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import summary from "@/lib/research/alabama-2026-11-summary.json";

// Index of Purcell Ventures research. Each study publishes aggregate figures only.
// The method notes below restate what the study page itself says, so a change to the
// study method has to be mirrored here.

const S = summary.frames.statewide;
const FRAME = summary.frame;
const num = (n: number) => n.toLocaleString("en-US");

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
          </p>
        </Prose>
      </Section>
      <Section title="Studies">
        <Rows
          items={[
            {
              name: "Alabama small business websites, November 2026",
              href: "/research/alabama-small-business-websites-2026",
              line: `Answers how many Alabama small business websites work, carry business structured data, block AI crawlers or publish llms.txt, from ${num(S.domains_checked)} randomly drawn sites plus every listed site in Tuscaloosa, Birmingham, Huntsville, Montgomery and Mobile.`,
              fig: "Nov 2026",
            },
          ]}
        />
      </Section>
      <Section title="How the studies work">
        <Prose>
          <p>
            Every study starts from public data. The Alabama study drew its business listings
            from OpenStreetMap through the public Overpass API, kept {num(FRAME.total)} unique
            business domains after dropping chains, government offices, schools and nonprofits,
            and drew its statewide sample at random with a fixed seed, so anyone can repeat the
            draw.
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
        </Prose>
      </Section>
      <UpdatedLine path="/research" />
      <PageDates path="/research" name="Research" />
    </main>
  );
}
