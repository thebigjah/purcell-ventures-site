import { Fragment, type ReactNode } from "react";
import { CONTACT } from "@/lib/contact";

// The résumé, in the print layout he likes. /resume shows it as a paper sheet inside the
// site, and /resume/print shows it alone for printing. One source, so the two never drift.
// Decisions carried from the rebuild: business email, no phone, no revenue claim, no
// pipeline dollar figure, no scholarship total, Founder/CEO. 26 Oct, second pass: singing
// and worship-leading entries removed at his request, poem titles removed with /writing.

type Entry = { title: ReactNode; org?: ReactNode; when?: ReactNode; body?: ReactNode; stack?: string; href?: string };

function Entries({ items }: { items: Entry[] }) {
  return (
    <div>
      {items.map((e, i) => (
        <article className="rp-entry" key={i}>
          <div className="rp-entry__head">
            <h3>{e.title}{e.org && <span className="rp-org">{e.org}</span>}</h3>
            {e.when && <span className="rp-when">{e.when}</span>}
          </div>
          {e.body && <div className="rp-body">{e.body}</div>}
          {(e.href || e.stack) && <p className="rp-stack">{e.href}{e.href && e.stack ? ", " : ""}{e.stack}</p>}
        </article>
      ))}
    </div>
  );
}

function Block({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <section className="rp-section">
      <h2>{title}</h2>
      {intro && <p className="rp-intro">{intro}</p>}
      {children}
    </section>
  );
}

// 28 Oct 2026 rebuild: contents come from the graded inventory and the include/exclude
// debate (~/pv-brand/inventory/verdicts-*.json). Off by verdict, so nobody restores them:
// Middleman, Blast Studio, ElijahBot OS, Wholesale Engine, Outreach Engine, Fellowship,
// English Pruitt (no payment, stopped replying), DataAnnotation (never worked there), the
// headline figures, "How I work", the scholarship table, athletics, church, poetry, the
// YouTube channel (old gaming and singing), 200+ hours, Mantle (until he confirms paid jobs).

const EDUCATION: Entry[] = [
  { title: "The University of Alabama, Honors College", org: "B.S. Psychology and Data Science, New College", when: "2026 to 2030", body: <ul><li>Presidential Scholarship. Pre-med, working toward psychiatry and research on AI in mental health care.</li><li>Admitted to 34 colleges, including the Georgia State University Honors College.</li></ul> },
  { title: "Lee University, Summer Honors Program", org: "Cleveland, Tennessee", when: "Summers 2025 and 2026", body: <p>12 college credit hours across four courses: Cryptography, Marketing, Mechatronics, and Igniting the World for Change.</p> },
  { title: "Cornerstone Preparatory Academy", org: "Acworth, Georgia", when: "Graduated May 2026", body: <p>GPA 3.92 weighted, SAT 1440, Beta Club, three years of Spanish. Grove Christian School, Midlothian, Virginia, December 2021 to December 2023.</p> },
];

const EXPERIENCE: Entry[] = [
  {
    title: "Founder/CEO", org: "Purcell Ventures LLC", when: "April 2025 to present",
    body: <ul>
      <li>Founded a Georgia LLC that builds websites, apps and AI systems for clients. I find the work, price it, build it and support it.</li>
      <li>Shipped the company&apos;s first App Store release, Rufus Rideshare, for a commissioning client in October 2026.</li>
      <li>Quoted in The Crimson White on bringing AI software to local small businesses, September 2026.</li>
    </ul>,
  },
  {
    title: "AI model training and evaluation", org: "Independent contractor", when: "October 2025 to present",
    body: <ul>
      <li>Mercor Intelligence, Generalist Expert, August 2026 to present: provide expertise to improve models for a top AI lab.</li>
      <li>Outlier AI, October 2025 to May 2026: rated model answers for accuracy, reasoning and instruction-following and wrote the rationale for every rating.</li>
    </ul>,
  },
  { title: "Team Member", org: "Chick-fil-A", when: "2023", body: <p>Front-line service in a high-volume restaurant.</p> },
];

const CLIENT: Entry[] = [
  {
    title: "Rufus Rideshare", org: "iPhone app, App Store", when: "September to October 2026", href: "apps.apple.com/us/app/rufus-rideshare",
    body: <ul>
      <li>Designed and built a student ride board commissioned by John White, a student at Georgia College &amp; State University. Apple approved it for the App Store on 8 October 2026.</li>
      <li>School-email sign-in, driver and plate details before a rider accepts, one-tap ride sharing with family, live GPS and address search. It handles no money by design.</li>
    </ul>,
    stack: "Expo and React Native, TypeScript, Supabase, Mapbox",
  },
];

const WORK: Entry[] = [
  {
    title: "COSMIC", org: "A multi-agent system that runs company operations", when: "2026",
    body: <ul>
      <li>Built a native macOS control app that coordinates an in-house team of AI agents for Purcell Ventures, with scheduled jobs, rule-based guardrails and more than 1,100 automated tests.</li>
    </ul>,
    stack: "Python, FastAPI, Tauri, Claude",
  },
  {
    title: "UA Today", org: "Unofficial events page for The University of Alabama", when: "2026", href: "ua-today.vercel.app",
    body: <ul><li>Pulls campus calendars into one filterable list that works on a phone, built as a first-year student.</li></ul>,
    stack: "Node.js, Vercel",
  },
  {
    title: "Potluck Design Lab", org: "Classroom game for an Honors design course", when: "2026",
    body: <ul><li>Students join the projector from their phones by QR code, design answers to each other&apos;s problem briefs and vote in real time.</li></ul>,
    stack: "TypeScript, Cloudflare Workers, Durable Objects",
  },
];

const LEADERSHIP: Entry[] = [
  { title: "Founder, Yellowhammer Society: Innovators in AI", org: "The University of Alabama, in formation", when: "October 2026 to present", body: <p>Starting a student organization where any major learns to build with AI, through design sessions and game jams that lead to events on real problems in Alabama. Secured an Honors College faculty advisor.</p> },
  { title: "Mission trips", org: "Praying Pelican Missions and Christian Education Relief", when: "2023 to 2026", body: <ul><li>North Carolina: built a floor and a wheelchair ramp for an elderly couple after the husband became disabled.</li><li>The Bahamas: rebuilt a looted Christian education camp and turned a retired bus into a classroom.</li><li>Hawaii, March 2026: construction support and community aid.</li></ul> },
  { title: "Head Chaplain", org: "Grove Christian School", when: "2022 to 2023", body: <p>Planned and ran weekly chapel services for the school.</p> },
  { title: "Service", body: <p>Volunteered with MUST Ministries food drives in Atlanta and with children&apos;s ministry at Stonebridge Church. Member of Mighty Men, a men&apos;s discipleship group at Cornerstone Prep, 11th and 12th grade. Peer tutor in math and English, 2022 to 2026.</p> },
];

const AWARDS: Entry[] = [
  { title: "College Board National Recognition Program Award", when: "2025" },
  { title: "Grove Christian School awards", when: "2021 to 2023", body: <p>Behold Award, Steadfast Award, Christian Character Award, Christ-like Leadership Award, and the highest math grade in the class.</p> },
];

const CERTS: Entry[] = [
  { title: "Anthropic Academy, 12 courses", when: "2026", body: <p>Claude 101, Claude Code 101, Claude Code in Action, Claude Platform 101, Introduction to Claude Cowork, AI Fluency: Framework &amp; Foundations, AI Capabilities and Limitations, and AI Fluency for Builders, Creative Work, Educators, Students and Small Business.</p> },
  { title: "HubSpot Academy, Social Media Marketing", when: "July 2026" },
];

const SKILLS: [string, string][] = [
  ["Languages", "TypeScript, JavaScript, Python, SQL, HTML and CSS"],
  ["Frameworks", "Next.js, React, React Native and Expo, Node.js, FastAPI"],
  ["Data and infrastructure", "Supabase and PostgreSQL, SQLite, Vercel, Cloudflare Workers, GitHub Actions"],
  ["AI", "Claude and OpenAI APIs, agent systems with tool use, model output evaluation"],
];

export const RESUME_CSS = `
.rp { background: #fff; color: #111; min-height: 100vh; font-family: "Times New Roman", Times, "Liberation Serif", serif; font-size: 11pt; line-height: 1.35; }
.rp-bar { max-width: 8.5in; margin: 0 auto; padding: 16px 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.rp-bar a { color: #111; text-underline-offset: 3px; }
.rp-bar button { font: inherit; font-weight: 600; min-height: 44px; padding: 0 20px; background: #111; color: #fff; border: 0; cursor: pointer; }
.rp-bar button:hover { background: #444; }
.rp-page { max-width: 8.5in; margin: 0 auto; padding: 24px 24px 56px; }
.rp h1, .rp h2, .rp h3 { font-family: inherit; color: #111; margin: 0; }
.rp h1 { font-size: 22pt; font-weight: 700; line-height: 1.1; text-align: center; letter-spacing: 0.02em; }
.rp-sub { margin: 4px 0 0; font-size: 11pt; text-align: center; }
.rp-lede { margin: 10px 0 0; max-width: 62ch; }
.rp-contact { margin: 6px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 2px 18px; font-size: 10.5pt; }
.rp-head { border-bottom: 1.5px solid #111; padding-bottom: 14px; }
.rp-figures { margin: 12px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px 22px; font-size: 10pt; }
.rp-figures b { font-size: 11pt; margin-right: 4px; }
.rp-section { margin-top: 20px; }
.rp-section h2 { font-size: 12pt; font-weight: 700; font-variant: small-caps; letter-spacing: 0.04em; border-bottom: 0.75pt solid #111; padding-bottom: 2px; margin-bottom: 6px; break-after: avoid; }
.rp-intro { margin: 0 0 8px; }
.rp-entry { margin-bottom: 9px; break-inside: avoid; }
.rp-entry__head { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
.rp-entry h3 { font-size: 11pt; font-weight: 700; }
.rp-org { font-weight: 400; font-style: italic; margin-left: 8px; }
.rp-when { white-space: nowrap; font-size: 10.5pt; }
.rp-body p, .rp-body ul { margin: 2px 0 0; }
.rp-body ul { padding-left: 1.2em; }
.rp-body li { margin-bottom: 2px; }
.rp-stack { margin: 2px 0 0; font-size: 9.5pt; font-style: italic; }
.rp-skills { margin: 0; display: grid; grid-template-columns: 11em 1fr; gap: 3px 16px; }
.rp-skills dt { font-weight: 700; }
.rp-skills dd { margin: 0; }
.rp-table { width: 100%; border-collapse: collapse; font-size: 10pt; }
.rp-table th { text-align: left; border-bottom: 0.75pt solid #111; padding: 3px 8px 3px 0; }
.rp-table td { padding: 2px 8px 2px 0; border-bottom: 0.25pt solid #bbb; }
.rp-table td:last-child, .rp-table th:last-child { text-align: right; white-space: nowrap; padding-right: 0; }
.rp-tags { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 3px 16px; }
@media (max-width: 640px) {
  .rp-entry__head { flex-direction: column; gap: 0; }
  .rp-skills { grid-template-columns: 1fr; }
  .rp-skills dd { margin-bottom: 6px; }
  .rp-table { display: block; overflow-x: auto; }
}
@media print {
  @page { size: letter; margin: 0.6in; }
  .rp-bar { display: none; }
  .rp { font-size: 9.5pt; min-height: 0; }
  .rp-page { max-width: none; padding: 0; }
  .rp h1 { font-size: 24pt; }
  .rp-section { margin-top: 14px; }
  .rp-section h2 { font-size: 12pt; }
  .rp-table, .rp-skills { break-inside: auto; }
  .rp-table tr { break-inside: avoid; }
}
`;


export function ResumeDocument() {
  return (
    <div className="rp-page">
        <header className="rp-head">
          <h1>Elijah Purcell</h1>
          <p className="rp-sub">Founder/CEO, Purcell Ventures LLC. Honors College, The University of Alabama.</p>
          <ul className="rp-contact">
            <li>Tuscaloosa, Alabama</li>
            <li>{CONTACT.email}</li>
            <li>purcellventures.co</li>
            <li>github.com/thebigjah</li>
          </ul>
        </header>

        <Block title="Education"><Entries items={EDUCATION} /></Block>
        <Block title="Experience"><Entries items={EXPERIENCE} /></Block>
        <Block title="Client work"><Entries items={CLIENT} /></Block>
        <Block title="Selected projects"><Entries items={WORK} /></Block>
        <Block title="Leadership and service"><Entries items={LEADERSHIP} /></Block>
        <Block title="Awards and honors"><Entries items={AWARDS} /></Block>
        <Block title="Certifications"><Entries items={CERTS} /></Block>
        <Block title="Skills">
          <dl className="rp-skills">
            {SKILLS.map(([k, v]) => (<Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>))}
          </dl>
        </Block>
      </div>
  );
}
