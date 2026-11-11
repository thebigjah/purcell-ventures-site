import { PageHero, Section, ClosingCall } from "@/app/components/ui";
import { UpdatedLine } from "@/app/components/PageDates";
import PageDates from "@/app/components/PageDates";

// PARTNERS. Every business on a Purcell Ventures Partner plan, plus related companies.
// A business goes on this list only after it agrees to the Partner listing term in its
// proposal. To add one, append to PARTNERS. To remove one on request, delete its entry.

interface Partner {
  name: string;
  url: string;
  place: string;
  line: string;
  since: string;
}

const PARTNERS: Partner[] = [
  {
    name: "IQ Installs",
    url: "https://iqinstalls.com",
    place: "Acworth, Georgia",
    line: "Flooring and gutter installers in metro Atlanta: LVP, hardwood and engineered floors, sanding and refinishing, and K-style gutters.",
    since: "2026",
  },
  {
    name: "Mantle Field Services",
    url: "https://mantle-field-site.vercel.app",
    place: "Metro Atlanta and North Georgia",
    line: "Owner-operated gutter cleaning, pressure washing and lawn care. A sister company of Purcell Ventures.",
    since: "2026",
  },
];

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Purcell Ventures Partners",
  itemListElement: PARTNERS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "LocalBusiness", name: p.name, url: p.url, areaServed: p.place },
  })),
};

export default function PartnersPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      <PageHero
        planet="company"
        kicker="Partners"
        title="Purcell Ventures Partners"
        lede="Businesses that work with Purcell Ventures on AI, automation, search and their websites. Each name links to the business itself."
      />

      <Section title="Partners" intro={`${PARTNERS.length} businesses, listed with their permission.`}>
        <div className="ui-rows">
          {PARTNERS.map((p) => (
            <a key={p.name} className="ui-row" href={p.url} target="_blank" rel="noopener">
              <span>
                <span className="ui-row__name">{p.name}</span>
                <span className="ui-row__line">{p.line}</span>
                <span className="ui-row__line">{p.place}</span>
              </span>
              <span className="ui-row__fig">Since {p.since}</span>
            </a>
          ))}
        </div>
      </Section>

      <ClosingCall
        title="Become a Partner"
        line="A Partner plan covers ongoing advice, a looked-after website and the automation a small business has no time to run itself. Pick only the parts you need. I reply within one business day."
        button="Start a conversation"
        href="/about#contact"
      />
      <UpdatedLine path="/partners" />
      <PageDates path="/partners" />
    </main>
  );
}
