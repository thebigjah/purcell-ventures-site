import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero, Section, Prose } from "@/app/components/ui";

// Rebuilt on the page kit 26 Oct 2026. Removed in the rebuild, because public pages carry
// what he would say introducing himself professionally: his birthday, his training
// programme, and "poetry nobody asked for". Removed in the copy pass: singing, fiction,
// apologetics reading, the Bible-reading and Annie Duke lines, and the theology and
// private-life items under "Thinking through".

const FOCUS: { label: string; items: ReactNode[] }[] = [
  {
    label: "Building",
    items: [
      "Purcell Ventures. I am rebuilding this site, including a new logo and colors.",
      <>COSMIC, a station of 57 AI agents in 17 rooms that runs on my Mac with an Android companion. The agents find local businesses, audit their sites, draft proposals and email the ones that need help, and a separate room scores every email against my writing rules first. The roster is public on <Link href="/team">the team page</Link>.</>,
      <>Three courses: The College Application Playbook, The Business Launch Playbook and Zero to Automated. None is finished, and the waitlist is open. Ask me and I will send the material I have so far.</>,
      "UA Today. Campus events for the University of Alabama, pulled from six sources into one place. Other students use it too.",
      "Search and AI visibility work for a flooring installer in Georgia, measured in booked jobs.",
      "The Tuscaloosa Storefront Project. Reporting on independent businesses near campus, one at a time.",
    ],
  },
  {
    label: "Studying",
    items: [
      "My first semester at the University of Alabama Honors College. I moved in on 14 August 2026 and started classes on the 19th.",
      "Psychology and data science, on a pre-med track toward psychiatry.",
      "How AI can take administrative work off mental health clinicians, which is why I chose this degree combination.",
    ],
  },
  {
    label: "Figuring out",
    items: [
      "Spring classes. Seventeen hours across math, computer science, psychology and sociology.",
      "Whether the businesses I write about want a website, or whether most of them only need to claim their Google listing.",
      "Whether to keep the Storefront series weekly or let it run at the pace the interviews take.",
      "A weekly schedule that gives school and the business separate hours.",
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
        lede={<>What I am building and studying right now. I got the idea for a /now page from <a className="ui-link" href="https://nownownow.com" target="_blank" rel="noopener noreferrer">nownownow.com</a>.</>}
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

      <Section title="Colossians 3:23">
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
