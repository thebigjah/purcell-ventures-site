import { PageHero, Section, Rows, Facts } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026 as a server component.
// - The college course line no longer prints the scholarship dollar total. His rule keeps
//   that number on the college-application course page only.
// - Courses are not finished, so each line says the waitlist is open.
// - The profiles carry rel="me", matching the footer, so the accounts read as one person.

type Item = { href: string; name: string; line?: string; fig?: string; me?: boolean };

const SECTIONS: { label: string; items: Item[] }[] = [
  {
    label: "Work with me",
    items: [
      { href: "/sites", name: "Websites", line: "Custom websites for local businesses.", fig: "From $650 setup and $99 a month" },
      { href: "/digital", name: "Digital services", line: "Websites, AI chatbots, booking and marketing.", fig: "From $99 a month" },
      { href: "/consulting", name: "AI consulting", line: "Hands-on training for your team.", fig: "From $125 a person" },
      { href: "/software", name: "Custom software", line: "Apps, platforms and AI tools.", fig: "From $1,500" },
      { href: "/consulting/book", name: "Book a session", line: "Direct booking for a consulting session." },
    ],
  },
  {
    label: "Free tools",
    items: [
      { href: "/ai-readiness", name: "AI readiness test", line: "10 questions in 3 minutes. It scores how your team uses AI and suggests next steps. No email required." },
      { href: "/ai-cost-calculator", name: "AI cost calculator", line: "Enter your team size and workload to see how fast an AI session pays for itself. The page lists its assumptions." },
    ],
  },
  {
    label: "Courses",
    items: [
      { href: "/courses/college-apps", name: "The College Application Playbook", line: "Built from 34 acceptances. Waitlist open.", fig: "$297" },
      { href: "/courses/business-launch", name: "The Business Launch Playbook", line: "From idea to LLC to first dollar. Waitlist open.", fig: "$397" },
      { href: "/courses/ai-automation", name: "Zero to Automated", line: "Build your own AI tools. Waitlist open.", fig: "$397" },
    ],
  },
  {
    label: "Personal pages",
    items: [
      { href: "/about", name: "About", line: "About me and the Purcell Ventures mark." },
      { href: "/now", name: "Now", line: "What I am working on this month." },
      { href: "/uses", name: "Uses", line: "The tools I use for my work." },
      { href: "/verses", name: "Verses", line: "Five scriptures I come back to." },
      { href: "/writing", name: "Writing", line: "Prose I have written." },
      { href: "/resume", name: "Résumé", line: "Education, work, awards and scholarships." },
    ],
  },
  {
    label: "Built by me",
    items: [
      { href: "https://ua-today.vercel.app", name: "UA Today", line: "Campus events for the University of Alabama, six sources in one place. Free, no account, not affiliated with the university." },
      { href: "/tools", name: "26 free single-file tools", line: "Small programs that each solve one problem, all live on the open web." },
      { href: "/portfolio", name: "Portfolio", line: "Client work and shipped products." },
      { href: "https://mantle-field-site.vercel.app", name: "Mantle Field Services", line: "The sister brand for gutter cleaning, pressure washing and lawn care. Metro Atlanta only." },
    ],
  },
  // These profiles are the whole independent set that exists (measured 22 Aug 2026).
  // ADD HERE AS THEY GO LIVE: Google Business Profile, Crunchbase, Wikidata.
  {
    label: "Elsewhere",
    items: [
      { href: "https://github.com/thebigjah", name: "GitHub", line: "Code for the 26 single-file tools and other projects.", me: true },
      { href: "https://www.linkedin.com/in/theelijahpurcell", name: "LinkedIn", line: "My professional record.", me: true },
      { href: "https://www.linkedin.com/company/138853899/", name: "Purcell Ventures on LinkedIn", line: "The company page." },
      { href: "https://www.instagram.com/theelijahpurcell/", name: "Instagram", me: true },
    ],
  },
];

export default function LinksPage() {
  return (
    <main>
      <PageHero
        kicker="Purcell Ventures"
        title="Elijah Brent Purcell"
        lede="Founder/CEO of Purcell Ventures LLC. I build software and AI agent systems, and I am a University of Alabama Honors College student in Tuscaloosa, Alabama."
      />

      {SECTIONS.map((section) => (
        <Section key={section.label} title={section.label}>
          {section.label === "Elsewhere" ? (
            // Rows has no rel option, so the profiles render as kit rows by hand to carry rel="me".
            <div className="ui-rows">
              {section.items.map((it) => (
                <a key={it.href} className="ui-row" href={it.href} target="_blank" rel={it.me ? "me noopener noreferrer" : "noopener noreferrer"}>
                  <span>
                    <span className="ui-row__name">{it.name}</span>
                    {it.line && <span className="ui-row__line">{it.line}</span>}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <Rows items={section.items} />
          )}
        </Section>
      ))}

      <Section title="Reach me" intro="Email works best. I reply within one business day.">
        <Facts
          items={[
            ["Email", <a key="e" className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>],
            ["Phone or text", <a key="p" className="ui-link" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>],
            ["Company", `Purcell Ventures LLC, a domestic LLC formed April 2025 in Acworth, Georgia, control number ${CONTACT.llcControlNumber}`],
          ]}
        />
      </Section>
    </main>
  );
}
