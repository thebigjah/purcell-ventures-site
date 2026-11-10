import Link from "next/link";
import { QA } from "./layout";
import { CONTACT } from "@/lib/contact";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Prose, Facts, Rows } from "@/app/components/ui";
import { GUIDES } from "@/lib/guides";
import { pageDates, formatDate } from "@/lib/page-dates";

// The company's answer page, written in the third person to be quoted. /who answers for
// the person. Rebuilt on the page kit 26 Oct 2026.

const FACTS: [string, string][] = [
  ["Legal name", "Purcell Ventures LLC"],
  ["Registered", `Georgia, control number ${CONTACT.llcControlNumber}`],
  ["Formed", "8 April 2025, as Zultar LLC"],
  ["Renamed", "Purcell Ventures LLC, 27 January 2026"],
  ["Founder/CEO and sole member", "Elijah Purcell"],
  ["Operated from", "Tuscaloosa, Alabama"],
  ["Registered address", "Acworth, Georgia"],
  ["People", "One, plus 57 AI agents in COSMIC, which are software"],
  ["Sister brand", "Mantle Field Services, metro Atlanta"],
];

const DIVISIONS = [
  { name: "Consulting", line: "Hands-on AI work: workshops and implementation.", href: "/consulting" },
  { name: "Software", line: "Custom builds: mobile apps, web platforms and internal tools.", href: "/software" },
  { name: "Digital", line: "Add-ons and ongoing service for local businesses: chatbots, booking, CRM and more.", href: "/digital" },
  { name: "Steady", line: "Personal IT for people who do not have an IT person.", href: "/steady" },
  { name: "Websites", line: "Custom websites for local businesses, with hosting and updates after launch.", href: "/sites" },
  { name: "Real estate", line: "Planned. Not taking clients yet." },
];

export default function CompanyPage() {
  // The same value the AboutPage dateModified uses in layout.tsx.
  const reviewed = pageDates("/what-is-purcell-ventures")?.modified;
  return (
    <main>
      <PageHero
        kicker="The company"
        title="What is Purcell Ventures?"
        lede={<>Purcell Ventures LLC is a Tuscaloosa, Alabama AI and software company that builds AI systems and custom software for small businesses and advises owners on using them. <Link className="ui-link" href="/who">Elijah Purcell</Link> filed it in Georgia as Zultar LLC on 8 April 2025 and renamed it on 27 January 2026. He takes the client calls and does the building himself.</>}
        meta={reviewed && <>Last reviewed <time dateTime={reviewed}>{formatDate(reviewed)}</time></>}
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "What is Purcell Ventures", href: "/what-is-purcell-ventures" },
        ]} />}
      />

      <Section title="At a glance">
        <Facts items={FACTS} />
      </Section>

      <Section title="Which Purcell Ventures this is">
        <Prose>
          <p>
            An older, unrelated Purcell Ventures LLC holds a New York registration. This one is the Georgia filing, control number {CONTACT.llcControlNumber}, and the record is public and searchable.
          </p>
        </Prose>
      </Section>

      <Section title="What it does" intro="Five active divisions and one planned.">
        <Rows items={DIVISIONS} />
        <Prose>
          <p style={{ marginTop: 24 }}>
            COSMIC, a station of 57 AI agents in 17 rooms, does proposals, site audits, security checks, research and outreach for the company. Each agent is a Claude session with a narrow set of tools and a written charter. The <Link href="/team">team roster</Link> names every agent and states that each one is software.
          </p>
        </Prose>
      </Section>

      <Section title="Research and guides">
        <Rows items={GUIDES} />
      </Section>

      <Section title="Common questions">
        <div className="ui-entries">
          {QA.map(([q, a]) => (
            <article className="ui-entry" key={q}>
              <div><h3>{q}</h3></div>
              <div className="ui-entry__body"><p>{a}</p></div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Contact">
        <Prose>
          <p>
            Phone or text <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>, or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Elijah replies within one business day. More about the founder: <Link href="/who">Who is Elijah Purcell</Link>.
          </p>
        </Prose>
      </Section>

    </main>
  );
}
