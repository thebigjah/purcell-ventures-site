import Link from "next/link";
import { QA } from "./layout";
import { CONTACT } from "@/lib/contact";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Prose, Facts, Rows } from "@/app/components/ui";

// The company's answer page, written in the third person to be quoted. /who answers for
// the person. Rebuilt on the page kit 26 Oct 2026.

const FACTS: [string, string][] = [
  ["Legal name", "Purcell Ventures LLC"],
  ["Registered", `Georgia, control number ${CONTACT.llcControlNumber}`],
  ["Formed", "8 April 2025"],
  ["Founder/CEO and sole member", "Elijah Purcell"],
  ["Operated from", "Tuscaloosa, Alabama"],
  ["Registered address", "Acworth, Georgia"],
  ["People", "One, plus 57 AI agents in COSMIC, which are software"],
  ["Sister brand", "Mantle Field Services, metro Atlanta"],
];

const DIVISIONS = [
  { name: "Websites", line: "Custom websites for local businesses, with hosting and updates after launch.", fig: "From $650 setup and $99 a month", href: "/sites" },
  { name: "Digital", line: "Add-ons and ongoing service for local businesses: chatbots, booking, CRM and more.", fig: "From $99 a month", href: "/digital" },
  { name: "Consulting", line: "Hands-on AI work: workshops and implementation.", fig: "From $125 a person", href: "/consulting" },
  { name: "Software", line: "Custom builds: mobile apps, web platforms and internal tools.", href: "/software" },
  { name: "Steady", line: "Personal IT for people who do not have an IT person.", fig: "From $79 a month", href: "/steady" },
  { name: "Real estate", line: "Planned. Not taking clients yet." },
];

export default function CompanyPage() {
  return (
    <main>
      <PageHero
        kicker="The company"
        title="What is Purcell Ventures?"
        lede={<><strong>Purcell Ventures LLC</strong> is a Georgia software company that builds websites, custom software and AI tools for small businesses. <Link className="ui-link" href="/who">Elijah Purcell</Link> founded it on 8 April 2025, and it is registered with the Georgia Secretary of State. It is a one-person company, and Elijah does the client calls and the building himself.</>}
        meta="Last reviewed 20 August 2026"
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
            An older, unrelated <strong>Purcell Ventures LLC is registered in New York</strong>. This one is the Georgia filing, control number {CONTACT.llcControlNumber}, formed 8 April 2025 by Elijah Purcell, and the record is public and searchable.
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
