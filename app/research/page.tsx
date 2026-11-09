import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Rows, Section } from "@/app/components/ui";
import PageDates from "@/app/components/PageDates";
import summary from "@/lib/research/alabama-2026-11-summary.json";

// Index of Purcell Ventures research. Each study publishes aggregate figures only.

const S = summary.frames.statewide;

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
      <Section title="Studies">
        <Rows
          items={[
            {
              name: "Alabama small business websites, November 2026",
              href: "/research/alabama-small-business-websites-2026",
              line: `${S.domains_checked} randomly drawn Alabama business sites plus every listed site in Tuscaloosa, Birmingham, Huntsville, Montgomery and Mobile: working home page, structured data, AI crawler rules, llms.txt and speed.`,
              fig: "Nov 2026",
            },
          ]}
        />
      </Section>
      <PageDates path="/research" name="Research" />
    </main>
  );
}
