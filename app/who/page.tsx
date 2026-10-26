import Link from "next/link";
import { QA } from "./layout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PageHero, Section, Prose, Facts, Rows } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Written in the THIRD PERSON on purpose. A search engine can lift "Elijah Purcell is the
// Founder/CEO of Purcell Ventures LLC" out of a page and present it as a fact about a named
// entity. It cannot do that with "I'm 19 years old."
//
// Every claim here is checkable: the LLC control number is a Georgia state filing, the
// university and class year are enrolment facts, the Mercor sentence is the exact wording
// their agreement permits. Nothing on this page is a superlative.
//
// Rebuilt on the page kit 26 Oct 2026. The questions render open, not in an accordion,
// because this page exists to be quoted.

const FACTS: [string, string][] = [
  ["Full name", "Elijah Brent Purcell"],
  ["Born", "August 2007"],
  ["Role", "Founder/CEO, Purcell Ventures LLC"],
  ["Company", `Purcell Ventures LLC, Georgia, control number ${CONTACT.llcControlNumber}, formed 8 April 2025`],
  ["University", "University of Alabama Honors College, Tuscaloosa, Class of 2030"],
  ["Studying", "Psychology and data science, pre-med track toward psychiatry"],
  ["Also", "Independent contractor with Mercor Intelligence"],
  ["Based", "Tuscaloosa, Alabama"],
];

// Every entry carries its year in the visible text. An undated 2023 award reads as a
// present-tense fact to a person skimming and to an AI summarising.
const DATED: [string, string][] = [
  ["2026", "Founded and operates a fifteen-agent AI workforce that runs proposals, audits, compliance and outreach for Purcell Ventures."],
  ["2026", "Built UA Today, a campus events page for the University of Alabama that pulls from six sources."],
  ["2026", "Enrolled at the University of Alabama Honors College to study psychology and data science."],
  ["2025", "Founded Purcell Ventures LLC in Georgia at seventeen."],
  ["2024", "Christian Character Award, Grove Christian School."],
  ["2023", "Steadfast Award, Grove Christian School."],
];

// Everything he has written, listed on the page that answers for him.
const WRITING: [string, string, string][] = [
  ["claim-your-google-listing", "Claiming your own Google listing: a twenty-minute job", "20 August 2026"],
  ["cold-outreach-that-worked", "The cold email that got me a client, and the ones that did not", "20 August 2026"],
  ["llc-at-seventeen", "What registering an LLC at seventeen involved", "20 August 2026"],
  ["audit-every-business-in-your-town", "How to audit every business in your town in an afternoon", "20 August 2026"],
  ["new-college-alabama", "New College at Alabama, explained by someone in it", "20 August 2026"],
  ["what-the-agents-get-wrong", "Five failures from running fifteen AI agents", "20 August 2026"],
  ["free-at-alabama", "What you have already paid for at Alabama", "20 August 2026"],
  ["is-your-business-invisible", "Is your business invisible online? A ten-minute self-check", "20 August 2026"],
  ["small-app-security-checklist", "Five holes in almost every small production app", "20 August 2026"],
  ["canonical-tag-noindex", "Every post on my blog was telling Google not to index it", "20 August 2026"],
  ["/ai-at-alabama", "Studying AI at the University of Alabama", "20 August 2026"],
  ["121-businesses-near-campus", "121 businesses near campus, and what a phone can find", "20 August 2026"],
  ["tuscaloosa-small-business-online", "The Tuscaloosa Storefront Project", "20 August 2026"],
  ["agents-that-cannot-fix-what-they-find", "We built agents that cannot fix what they find", "17 August 2026"],
  ["shipped-is-not-activated", "Shipping is not the same as being able to take a payment", "17 August 2026"],
  ["ai-augmented-sales-rep-day", "What a day looks like for an AI-augmented sales rep", "25 May 2026"],
  ["why-i-built-crm-from-scratch", "Why I built a CRM from scratch instead of paying $1,200 a year for HubSpot", "25 May 2026"],
  ["case-for-charging-19", "The case for charging $19 for what others sell at $497", "25 May 2026"],
  ["five-workflows-no-code", "Five workflows you can automate this week without writing code", "24 May 2026"],
  ["why-most-ai-tools-waste-money", "Why most small business AI tools waste your money", "24 May 2026"],
];

export default function WhoPage() {
  return (
    <main>
      <PageHero
        kicker="Elijah Purcell"
        title="Who is Elijah Purcell?"
        lede="Elijah Purcell is the Founder/CEO of Purcell Ventures LLC, a Georgia software company that builds websites and software for local businesses. He is also a psychology and data science student at the University of Alabama Honors College, Class of 2030, on a pre-med track toward psychiatry. He founded the company at seventeen and runs it from Tuscaloosa, Alabama."
        meta="Last reviewed 20 August 2026"
      />

      <Section title="At a glance">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/elijah.jpg"
          alt="Elijah Purcell, founder of Purcell Ventures LLC and University of Alabama student"
          width={128}
          height={128}
          style={{ display: "block", width: 128, height: 128, objectFit: "cover", objectPosition: "50% 20%", marginBottom: 28 }}
        />
        <Facts items={FACTS} />
      </Section>

      <Section title="Dated record">
        <Facts items={DATED} />
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

      <Section title="Everything he has written">
        <Rows items={WRITING.map(([slug, title, date]) => ({
          name: title,
          line: date,
          href: slug.startsWith("/") ? slug : `/blog/${slug}`,
        }))} />
      </Section>

      <Section title="Contact and profiles">
        <Prose>
          <p>
            Phone or text <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>, or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. He replies within one business day. More about the company is on <Link href="/what-is-purcell-ventures">What is Purcell Ventures</Link>.
          </p>
          <p>
            Elsewhere:{" "}
            <a href="https://www.linkedin.com/in/theelijahpurcell" rel="me noopener noreferrer" target="_blank">LinkedIn</a>,{" "}
            <a href="https://github.com/thebigjah" rel="me noopener noreferrer" target="_blank">GitHub</a> and{" "}
            <a href="https://www.instagram.com/theelijahpurcell/" rel="me noopener noreferrer" target="_blank">Instagram</a>.
          </p>
        </Prose>
      </Section>

      {/* PageHero has no breadcrumb slot and must stay the first child of <main> for the
          hero padding rule, so the trail and its BreadcrumbList schema sit at the end. */}
      <div className="ui-wrap" style={{ paddingBottom: 40 }}>
        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Who is Elijah Purcell", href: "/who" },
        ]} />
      </div>
    </main>
  );
}
