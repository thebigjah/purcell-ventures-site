import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Rows, Prose, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// THE COURSES INDEX, rebuilt on the page kit 26 Oct 2026.
//
// - The scholarship total is gone from this page. His rule keeps it on the
//   college-application course page only.
// - The canonical moved here from app/courses/layout.tsx, where every child route
//   inherited it and declared itself a copy of /courses.

export const metadata: Metadata = {
  alternates: { canonical: "/courses" },
};

const COURSES = [
  {
    href: "/courses/college-apps",
    name: "The College Application Playbook",
    fig: "From $297",
    line: "I researched 98 schools and got 34 acceptances. The course covers building a list, writing essays and applying for scholarships. 6 modules and 17 lessons.",
  },
  {
    href: "/courses/business-launch",
    name: "The Business Launch Playbook",
    fig: "From $397",
    line: "From the idea to the LLC to the first customer, with the tools and decisions from starting Purcell Ventures at seventeen. 7 modules, 26 lessons and 6 templates.",
  },
  {
    href: "/courses/ai-automation",
    name: "Zero to Automated",
    fig: "From $397",
    line: "Build email bots, content pipelines, lead scrapers and a personal AI assistant. I run every tool the course teaches. 8 modules, 25 lessons and 7 code templates.",
  },
];

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://purcellventures.co" },
    { "@type": "ListItem", position: 2, name: "Courses", item: "https://purcellventures.co/courses" },
  ],
};

export default function CoursesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <PageHero
        planet="courses"
        kicker="Courses"
        title="Three courses on things I did in the last two years."
        lede="Each course documents a process I went through, in the order I did it. The waitlist is open for all three, and none is finished yet."
        meta={<>Ask me and I will send the material I have so far: <a className="ui-link" href={`mailto:${CONTACT.email}?subject=Course%20material`}>{CONTACT.email}</a></>}
      />

      <Section title="Waitlist open" intro="All three are self-paced. You can see the full curriculum and prices for each before you join a waitlist.">
        <Rows items={COURSES} />
      </Section>

      <Section title="What I teach">
        <Prose>
          <p>
            I teach only what I finished recently enough to remember the parts that went wrong. Right now that means applying to college, starting a business and automating work with AI.
          </p>
          <p>
            I do not have twenty years of experience in any of them. The courses cover how each process works today, including steps that only exist because of how things work now.
          </p>
        </Prose>
      </Section>

      <Section title="What each course includes">
        <Prose>
          <p>
            Each course is self-paced, with exercises in every lesson and access for life. I add each lesson as I finish it. The templates and documents I used come with every course, so if a lesson tells you to send an email, the email is included.
          </p>
          <p>
            Each course has its own refund terms. If the material does not match its description, ask and I will refund you.
          </p>
        </Prose>
      </Section>

      <Section title="Who teaches them">
        <Prose>
          <p>
            I am Elijah Purcell, Founder/CEO of <Link href="/about">Purcell Ventures LLC</Link>. I build AI agent systems and study psychology and data science in the University of Alabama Honors College in Tuscaloosa. More background: <Link href="/who">Who is Elijah Purcell</Link>. If you need direct help more than a course, I also do <Link href="/consulting">consulting</Link>.
          </p>
        </Prose>
      </Section>

      <ClosingCall
        title="One-on-one help"
        line="If you would rather have me look at your situation directly, consulting starts at $125 a person. I reply within one business day."
        button="See consulting"
        href="/consulting"
      />
    </main>
  );
}
