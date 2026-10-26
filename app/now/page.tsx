import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero, Section, Prose } from "@/app/components/ui";

// Rebuilt on the page kit 26 Oct 2026. Removed in the rebuild, because public pages carry
// what he would say introducing himself professionally: his birthday, his training
// programme, and "poetry nobody asked for".

const FOCUS: { label: string; items: ReactNode[] }[] = [
  {
    label: "Building",
    items: [
      "Purcell Ventures. Rebuilding this site with a new mark and a new gold.",
      <>COSMIC, the set of AI agents that runs the company&apos;s outreach: finding local businesses, auditing their sites and emailing the ones that need help. The roster is public on <Link href="/team">the team page</Link>.</>,
      <>Three courses: The College Application Playbook, The Business Launch Playbook and Zero to Automated. None is finished, and the waitlist is open. Ask me and I will send the material I have so far.</>,
      "UA Today. Campus events for the University of Alabama, pulled from six sources into one place, and used by students other than me.",
      "Search and AI visibility work for a flooring installer in Georgia, measured in booked jobs.",
      "The Tuscaloosa Storefront Project. Reporting on independent businesses near campus, one at a time.",
    ],
  },
  {
    label: "Studying",
    items: [
      "My first semester at the University of Alabama Honors College. I moved in on 14 August 2026 and started classes on the 19th.",
      "Psychology and data science, on a pre-med track toward psychiatry.",
      "How AI can take administrative work off mental health clinicians. That question is why I chose this degree combination.",
      "Apologetics and worldview: Lewis, Craig, McDowell and Tozer, read slowly with notes in the margins.",
    ],
  },
  {
    label: "Figuring out",
    items: [
      "Spring classes. Seventeen hours across math, computer science, psychology and sociology.",
      "Whether the businesses I write about want a website, or whether most of them only need to claim their Google listing.",
      "Whether to keep the Storefront series weekly or let it run at the pace the interviews take.",
    ],
  },
  {
    label: "Practicing",
    items: [
      "Singing, bass-baritone, range C1 to F5.",
      "Writing: fiction drafts, this site, and the documentation for my own infrastructure.",
    ],
  },
  {
    label: "Reading",
    items: [
      "The Bible, daily. NASB for devotion, NRSVue for study.",
      "Annie Duke and the decision-making canon. Thinking in Bets is why I keep a calibration journal.",
    ],
  },
  {
    label: "Thinking through",
    items: [
      "Free will and determinism. Non-Calvinist, still exploring.",
      "A schedule where school and business each keep their own hours.",
      "How many of the hard parts belong on the public internet.",
    ],
  },
];

export default function NowPage() {
  return (
    <main>
      <PageHero
        planet="steady"
        kicker="Now"
        title="What I am working on this month"
        lede={<>A /now page answers &ldquo;what are you up to lately?&rdquo; in one place. The idea comes from <a className="ui-link" href="https://nownownow.com" target="_blank" rel="noopener noreferrer">nownownow.com</a>.</>}
        meta="Updated 26 October 2026. I update this page monthly."
      />

      {FOCUS.map((bucket) => (
        <Section key={bucket.label} title={bucket.label}>
          <Prose>
            <ul>
              {bucket.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </Prose>
        </Section>
      ))}

      <Section title="The verse over the work">
        <Prose>
          <blockquote>
            <p>&ldquo;Whatever you do, do your work heartily, as for the Lord rather than for men.&rdquo;</p>
            <p>Colossians 3:23, NASB</p>
          </blockquote>
        </Prose>
      </Section>
    </main>
  );
}
