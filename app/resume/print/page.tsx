import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CONTACT } from "@/lib/contact";
import PrintButton from "./PrintButton";

// The print layout of /resume. Its content is the same as app/resume/page.tsx: same entries,
// same wording, same decisions (business email, no revenue claim, no pipeline dollar figure,
// no scholarship total, worship in past tense, Founder/CEO, no phone number).
// Black on white paper is the one place the site uses a white background.

export const metadata: Metadata = {
  title: "Résumé, print version",
  description: "Print layout of Elijah Purcell's résumé.",
  alternates: { canonical: "/resume/print" },
  robots: { index: false, follow: true },
};

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

const WORK: Entry[] = [
  {
    title: "Middleman", org: "A two-sided sales marketplace", when: "2026", href: "middleman-lime.vercel.app",
    body: <ul>
      <li>Designed and shipped a marketplace that connects companies with independent field and phone sales reps. The platform acts as paying agent and holds commissions in escrow through Stripe.</li>
      <li>Built the compliance layer: safeguards on independent-contractor classification, per-state geo-gating, e-signed platform agreements, and commission terms frozen at signature so a later edit to an offer cannot change what a rep is owed.</li>
      <li>14 database migrations with row-level security. 92 automated tests, including 20 adversarial cases an independent reviewer wrote to break the payment handling.</li>
    </ul>,
    stack: "Next.js 16, TypeScript, Supabase and PostgreSQL, Stripe, Vercel",
  },
  {
    title: "The Loom", org: "A lead-generation engine that runs itself", when: "2026", href: "the-loom-gold.vercel.app",
    body: <ul>
      <li>A daily crawler finds local businesses with little or no web presence, researches and scores each one, and emails a ranked packet at 7:15 every morning.</li>
      <li>Tracks 97 actionable leads and takes down expired previews on its own.</li>
      <li>Five production website templates, each with its own type and colour system, so a prospect sees a site built for their industry.</li>
    </ul>,
    stack: "Python, Google Places API, Supabase, GitHub Actions, Next.js, Resend",
  },
  {
    title: "Blast Studio", org: "A game platform with creator tools", when: "2026",
    body: <ul>
      <li>Turned a single browser game into a platform where anyone builds their own version: self-hosted subject cutout, a brush editor for fixing masks, a content editor, leaderboards for each version, a public marketplace and an admin review queue.</li>
      <li>Delivered the iOS build to App Store Connect without a physical test device, by archiving unsigned and signing at export with an Admin-scoped API key.</li>
      <li>Shipped the full store package: icons, feature graphic, screenshots, listing copy and a likeness release for the featured subject.</li>
    </ul>,
    stack: "JavaScript, MediaPipe, Vercel Blob, Capacitor for iOS and Android",
  },
  {
    title: "ElijahBot OS", org: "A personal knowledge and operations command center", when: "2026", href: "elijahbot-os.vercel.app",
    body: <ul>
      <li>A command center over a 441-node personal knowledge graph: eight stations, a command palette with voice input, installable as a web app, and a briefing emailed every morning at 7:30.</li>
      <li>A nightly job re-reads the graph, scores its health and writes a list of what the knowledge base is missing, so the gaps get filled on purpose.</li>
      <li>A semantic recall layer serves 200-token chunks across memory, notes and graph nodes so retrieval stays cheap as it grows.</li>
    </ul>,
    stack: "Next.js, TypeScript, a Node ingest pipeline, Vercel Cron, Claude API",
  },
  {
    title: "Boyfriend Camera", org: "A computer-vision photography app", when: "2026", href: "boyfriend-camera.vercel.app",
    body: <ul>
      <li>The live viewfinder runs through a WebGL colour-grading shader, so the photographer composes each shot with its final look already applied.</li>
      <li>On-device scene analysis reads luminance, colour cast and edge orientation to suggest a pose, and three.js renders lit 3D mannequins in frame as posing guides.</li>
      <li>A full non-destructive editor: curves, eight-channel HSL, three-way colour wheels, radial and linear masks, video grading with audio re-encode, and a local library.</li>
    </ul>,
    stack: "WebGL and GLSL, three.js, MediaPipe, IndexedDB, installable web app",
  },
  {
    title: "Wholesale Engine", org: "A real-estate acquisition pipeline", when: "2026",
    body: <ul>
      <li>Parses county tax-delinquent PDFs by word coordinates, checks each parcel against a 279,000-record assessor GIS layer, prices deals by maximum allowable offer, matches them to a buyer list and emails a daily packet.</li>
      <li>The ethics are in the code: it refuses sources whose terms prohibit scraping, and estate-owned parcels go to a person for review and are never contacted automatically.</li>
    </ul>,
    stack: "Python, SQLite and Supabase, ArcGIS, pytest, Windows Task Scheduler",
  },
  {
    title: "Outreach Engine", org: "Outreach automation with compliance gates", when: "2026",
    body: <ul>
      <li>A multi-campaign outreach system built around a four-tier risk classifier. Only the lowest tiers send on their own, sensitive tiers become drafts for a person to review, and the highest tier is never drafted.</li>
      <li>Hard gates on CAN-SPAM requirements, an append-only suppression list, a blocklist that fails closed, and an automatic stop when bounce rates spike. A 22-check safety suite runs before every send.</li>
    </ul>,
    stack: "Python, Gmail API, a JSON policy layer, pytest",
  },
  {
    title: "Fellowship of the Round", org: "A 3D multiplayer arena game", when: "2026",
    body: <ul>
      <li>A round-based arena game with seven playable species and their own ability kits, a 131-card stacking upgrade pool, encounters against the game with taming and climbing, and online play for twelve.</li>
      <li>Three maps, movement tuned for each species, and builds for Windows, macOS and Linux.</li>
    </ul>,
    stack: "Godot 4.7, GDScript, Steam networking",
  },
];

const CLIENT: Entry[] = [
  { title: "English Pruitt Photography", org: "Website", when: "2026", body: <p>Found through cold outreach, then scoped and built: a hand-coded editorial portfolio with a true masonry gallery, film-grain texture and scroll-reveal motion, written in the client&apos;s own voice.</p> },
  { title: "Purcell Ventures digital division", org: "Tools for small businesses", when: "2025 to present", body: <p>Twenty reusable modules across websites, chatbots, booking, review capture and lead generation, sold to local service businesses as a setup fee plus a subscription.</p> },
];

const PRACTICE: Entry[] = [
  { title: "Adversarial review before release", body: <p>An independent reviewer tests every significant build for failures before it ships. The review has caught defects the builder&apos;s own checks missed, including user data lost when the phone closed a tab and tests that were claimed but never written.</p> },
  { title: "Security audits", body: <p>Read-only security audits of seven live applications, documenting row-level-security gaps, paid API routes with no authentication, stored cross-site scripting, vote forgery through exposed identifiers and server-side request forgery, each with a remediation list ranked by severity.</p> },
];

const EXPERIENCE: Entry[] = [
  {
    title: "Founder/CEO", org: "Purcell Ventures LLC", when: "April 2025 to present",
    body: <>
      <p>A Georgia LLC that builds software, AI integrations and websites, runs digital marketing, and holds the field-services and real-estate channels. I own the whole cycle: finding clients, scoping, pricing, building, deploying and support.</p>
      <p>Filed as Zultar LLC on 8 April 2025 and renamed Purcell Ventures LLC on 27 January 2026. Control number {CONTACT.llcControlNumber}. EIN and business banking in place. Registered agent of record.</p>
    </>,
  },
  { title: "Founder and operator", org: "Mantle Field Services", when: "2024 to present", body: <p>The sister brand for gutter cleaning, pressure washing and lawn care across metro Atlanta. I find clients, quote, schedule, maintain the equipment and do the work on site.</p> },
  { title: "AI data trainer", org: "Outlier AI", when: "October 2025 to May 2026", body: <p>Two projects. On the first I rated large language model outputs for accuracy, reasoning and instruction-following and wrote the reasoning behind every rating. On the second I wrote spoken-style conversations between a user and an assistant under a fixed budget of tool calls per task, writing the user turns, editing the model&apos;s replies, and rewriting prompts until the model stopped over-calling its tools.</p> },
  { title: "AI response evaluator", org: "DataAnnotation", when: "Spring 2026", body: <p>Rated AI responses against a Helpful, Honest, Harmless rubric that ranks honesty and harmlessness above helpfulness. Flagged invented facts, fabricated links, false premises the model accepted, and faulty reasoning, along with length, repetition and whether the model answered the question the user meant.</p> },
  { title: "Team member", org: "Chick-fil-A", when: "2023", body: <p>Front-line customer service in a high-volume restaurant.</p> },
  { title: "Peer tutor", org: "Mathematics and English", when: "2022 to 2026", body: <p>One-on-one review sessions with classmates.</p> },
];

const EDUCATION: Entry[] = [
  { title: "The University of Alabama, Honors College", org: "B.S. Psychology and Data Science, New College. Presidential Merit Scholarship, $28,000 a year.", when: "2026 to 2030", body: <p>Pre-med track toward psychiatry. Enrolled and attending since August 2026.</p> },
  { title: "Cornerstone Preparatory Academy, Acworth, Georgia", org: "GPA 3.92 weighted, SAT 1440, Beta Club", when: "Graduated May 2026", body: <p>Three years of Spanish, AP-level coursework, and College-Level Worldview and Apologetics.</p> },
  { title: "Lee University, Summer Honors Program", org: "Cryptography and Social Media, 6 college credit hours", when: "Summer 2025" },
  { title: "Grove Christian School, Midlothian, Virginia", org: "9th grade to the middle of 10th, Beta Club, honors courses", when: "2022 to 2023", body: <p>Awards: Behold (9th), Steadfast (10th), the Christian Character Award, the Christ-like Leadership Award, the highest math grade in the class (9th), and the lead in the Christmas musical.</p> },
  { title: "Cornerstone Preparatory Academy, Acworth, Georgia", org: "Kindergarten to 8th grade", when: "Kindergarten to 8th", body: <p>Homeschooled from kindergarten through 3rd grade, then in person from 4th through 8th. I returned to Cornerstone for high school and graduated there.</p> },
];

const SKILLS: [string, string][] = [
  ["Languages", "TypeScript, JavaScript, Python, SQL, GDScript, GLSL, HTML and CSS"],
  ["Frameworks", "Next.js, React, React Native and Expo, Node.js, Express, Capacitor, Godot"],
  ["Data and infrastructure", "Supabase and PostgreSQL with row-level security and migrations, SQLite, Vercel, GitHub Actions, scheduled jobs"],
  ["AI and machine learning", "Claude and OpenAI APIs, tool-using agent loops, semantic retrieval, MediaPipe, model output evaluation"],
  ["Graphics", "WebGL and GLSL shaders, three.js, Canvas, real-time image processing"],
  ["Engineering", "Automated testing, adversarial code review, security auditing, technical writing"],
  ["Business", "Finding clients, pricing, contracts, invoicing, regulatory compliance"],
  ["Communication", "Public speaking, formal debate, persuasive and analytical writing"],
  ["Music", "Vocal performance, bass-baritone, range C1 to F5"],
  ["Spoken languages", "English (native), Spanish (three years)"],
];

const AWARDS: Entry[] = [
  { title: "Honors College admission", org: "The University of Alabama", when: "2026" },
  { title: "Honors College admission", org: "Georgia State University", when: "2026" },
  { title: "Behold Award", org: "Grove Christian School", when: "9th grade", body: <p>Given to selected students for moral integrity and spiritual maturity.</p> },
  { title: "Steadfast Award", org: "Grove Christian School", when: "10th grade", body: <p>For perseverance, faithfulness and character under pressure.</p> },
  { title: "Christian Character Award", org: "Grove Christian School", body: <p>One of two students chosen school-wide, one male and one female, for integrity and leadership.</p> },
  { title: "Christ-like Leadership Award", org: "Grove Christian School, end-of-year ceremony", body: <p>For servant leadership across the school year.</p> },
  { title: "Lead role, Christmas musical", org: "Grove Christian School", body: <p>The lead acting and singing role in the school&apos;s annual Christmas production.</p> },
  { title: "Highest math grade in the class", org: "Grove Christian School", when: "9th grade", body: <p>100% in both semesters.</p> },
  { title: "Youth Leadership Summit", org: "Family Foundation and the Colson Center", when: "Summer 2023, Richmond, Virginia", body: <p>An invitation-only summit with an advanced seminar on worldview, cultural analysis and Christian civic leadership.</p> },
];

const OFFERS: [string, string, string][] = [
  ["Kalamazoo College", "Lux Esto Scholarship", "$48,000 a year"],
  ["Susquehanna University", "Merit Scholarship", "$48,000 a year"],
  ["Drake University", "Merit Scholarship", "$31,000 a year"],
  ["Hood College", "Presidential Scholarship", "$31,000 a year"],
  ["Transylvania University", "Merit Scholarship", "$30,000 a year"],
  ["The University of Alabama", "Presidential Merit, enrolled", "$28,000 a year"],
  ["Bradley University", "Presidential Scholarship", "$28,000 a year"],
  ["Presbyterian College", "Highlander Scholarship", "$28,000 a year"],
  ["Valparaiso University", "Merit Scholarship", "$28,000 a year"],
  ["Lenoir-Rhyne University", "Niche Direct Merit", "$26,000 a year"],
  ["Nazareth University", "Presidential Scholarship", "$25,000 a year"],
  ["Oral Roberts University", "Merit Scholarship", "$24,000 a year"],
  ["Cedarville University", "Merit Scholarship", "$22,000 a year"],
  ["George Fox University", "Merit Scholarship", "$22,000 a year"],
  ["Berry College", "Merit Scholarship, renewable", "$20,000 a year"],
  ["Palm Beach Atlantic University", "Merit Scholarship", "$18,000 a year"],
  ["Union University", "Merit Scholarship", "$17,000 a year"],
  ["Charleston Southern University", "Merit Scholarship", "$17,000 a year"],
  ["Mississippi College", "Academic Merit Scholarship", "$14,500 a year"],
  ["Francis Marion University", "Niche Direct Merit", "$10,884 a year"],
  ["Hartwick College", "Flight Path Scholarship", "$10,000 a year"],
  ["Rider University", "Merit Scholarship", "$3,000 a year"],
  ["Georgia State University", "Merit and Honors College", "$1,000 a year"],
];

const LEADERSHIP: Entry[] = [
  { title: "Member, Mighty Men", org: "The men's Bible study at Cornerstone Prep", when: "11th to 12th grade", body: <p>Weekly two-hour discussions on faith, character and spiritual formation.</p> },
  { title: "Head chaplain", org: "Grove Christian School", when: "Spring of 9th to fall of 10th", body: <p>Organized chapel services, coordinated the worship teams and led school-wide programming, with weekly rehearsals and Friday services.</p> },
  { title: "Worship team, lead vocalist", org: "School chapel and church", when: "9th to 12th grade", body: <p>Bass-baritone, range C1 to F5. Rehearsals two to three times a week.</p> },
  { title: "Youth group leader and summer camp counselor", org: "Church", body: <p>Mentored younger students, led group discussions and staffed a week-long summer camp each year.</p> },
];

const TRIPS: Entry[] = [
  { title: "North Carolina", org: "Praying Pelican Missions", when: "10th grade", body: <ul><li>Organized and worked a regional food drive.</li><li>Built a full floor and an ADA-compliant ramp for an elderly couple&apos;s home after the husband became disabled.</li><li>Led prayer and worship through the week.</li></ul> },
  { title: "The Bahamas", org: "Christian Education Relief", when: "11th grade", body: <ul><li>Helped rebuild a Christian education camp that was looted and destroyed during the COVID-19 pandemic.</li><li>Coordinated moving heavy materials and equipment across the campus.</li><li>Co-led turning a retired bus into a mobile classroom for the camp.</li></ul> },
  { title: "Hawaii", org: "Disaster relief", when: "March 2026", body: <ul><li>Deployed after the severe flooding that hit Hawaii in early 2026.</li><li>Worked in construction support and community aid, and led worship and prayer.</li></ul> },
];

const SERVICE: Entry[] = [
  { title: "MUST Ministries", org: "Food collection", body: <p>Organized and worked food drives for MUST Ministries, a nonprofit that provides hunger relief, shelter and support to families across greater Atlanta.</p> },
  { title: "Children's ministry", org: "Stonebridge Church, Marietta", body: <p>Taught, mentored and led activities for elementary-age children.</p> },
  { title: "Community cleanup", org: "Parks and neighborhoods", body: <p>Volunteer cleanup of local parks and neighborhoods.</p> },
];

const ARTS: Entry[] = [
  { title: "Vocalist, bass-baritone", body: <p>Range C1 to F5. Led worship vocals at school and church through 12th grade.</p> },
  { title: "Lead actor, Christmas musical", org: "Grove Christian School", body: <p>The lead role in the annual Christmas production, singing and acting.</p> },
  { title: "Poetry and creative writing", body: <p>Original work including &ldquo;The Husks the Swine Did Eat,&rdquo; &ldquo;Injustice Scorned&rdquo; and &ldquo;The Rebuking of Loki,&rdquo; drafts of a novel, and personal essays, across eight distinct styles.</p> },
  { title: "Video and social media", when: "2023 to present", body: <p>Writes, films and edits commentary on psychology, faith and culture. A YouTube channel with more than 2,800 subscribers, moving toward intellectual commentary.</p> },
  { title: "Design, photography and video", body: <p>Brand identity, product photography and video for Purcell Ventures clients and my own projects, including a colour-grading and posing toolchain I built from scratch.</p> },
];

const CLUBS = ["Beta Club, at Grove and Cornerstone", "Apologetics and Debate Team", "Spanish Club, three years", "Club Med", "Creative Writing and the Writer's Guild", "Curious Conversations", "Animal Ambassadors", "Senior Devotional", "Mighty Men"];

const CLUB_DETAIL: Entry[] = [
  { title: "Apologetics and Debate Team", when: "9th to 12th grade", body: <p>Formal and informal theological debate with teachers and classmates, five to ten hours a week.</p> },
  { title: "Creative Writing and the Writer's Guild", when: "11th grade", body: <p>A workshop for original fiction, poetry and narrative craft.</p> },
  { title: "Beta Club", org: "Grove and Cornerstone", body: <p>The national honor society for academic achievement, character, leadership and service.</p> },
];

const ATHLETICS: Entry[] = [
  { title: "Cheerleading, back and base", when: "9th to 10th grade", body: <p>Competitive cheer, stunt base. Six to seven hours a week in season.</p> },
  { title: "Track and field", org: "Shot put, discus and the 100 meters", when: "Spring of 9th grade" },
  { title: "Weightlifting", body: <p>A hypertrophy program built on the research, kept up over several years.</p> },
];

const FAITH: Entry[] = [
  { title: "Church", org: "Stonebridge Church, Marietta, and Kennesaw First Baptist", body: <p>Stonebridge for Sunday services, Kennesaw First Baptist for Wednesday youth and retreats.</p> },
  { title: "Apologetics and theology", body: <p>Reading William Lane Craig, Sean McDowell, C.S. Lewis and A.W. Tozer, with hermeneutics and philosophy of religion.</p> },
];


const CSS = `
.rp { background: #fff; color: #111; min-height: 100vh; font-family: var(--font-body); font-size: 10.5pt; line-height: 1.45; }
.rp-bar { max-width: 8.5in; margin: 0 auto; padding: 16px 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.rp-bar a { color: #111; text-underline-offset: 3px; }
.rp-bar button { font: inherit; font-weight: 600; min-height: 44px; padding: 0 20px; background: #111; color: #fff; border: 0; cursor: pointer; }
.rp-bar button:hover { background: #444; }
.rp-page { max-width: 8.5in; margin: 0 auto; padding: 24px 24px 56px; }
.rp h1, .rp h2, .rp h3 { font-family: var(--font-display); color: #111; margin: 0; }
.rp h1 { font-size: 28pt; font-weight: 600; line-height: 1.1; }
.rp-sub { margin: 6px 0 0; font-size: 11pt; }
.rp-lede { margin: 10px 0 0; max-width: 62ch; }
.rp-contact { margin: 10px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 4px 18px; font-size: 10pt; }
.rp-head { border-bottom: 1.5px solid #111; padding-bottom: 14px; }
.rp-figures { margin: 12px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px 22px; font-size: 10pt; }
.rp-figures b { font-family: var(--font-display); font-size: 13pt; margin-right: 5px; }
.rp-section { margin-top: 20px; }
.rp-section h2 { font-size: 13pt; font-weight: 600; border-bottom: 0.75pt solid #111; padding-bottom: 3px; margin-bottom: 8px; break-after: avoid; }
.rp-intro { margin: 0 0 8px; }
.rp-entry { margin-bottom: 9px; break-inside: avoid; }
.rp-entry__head { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
.rp-entry h3 { font-size: 11pt; font-weight: 600; }
.rp-org { font-family: var(--font-body); font-weight: 400; margin-left: 8px; }
.rp-when { white-space: nowrap; font-size: 10pt; }
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

export default function ResumePrintPage() {
  return (
    <main className="rp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="rp-bar">
        <Link href="/resume">Back to the web résumé</Link>
        <PrintButton />
      </div>
      <div className="rp-page">
        <header className="rp-head">
          <h1>Elijah Brent Purcell</h1>
          <p className="rp-sub">Founder/CEO of Purcell Ventures LLC. Tuscaloosa, Alabama.</p>
          <p className="rp-lede">I build and ship software end to end: marketplaces, data pipelines that run on their own, applications with AI built in, and the compliance and review systems around them. I study psychology and data science in the University of Alabama Honors College, class of 2030, on a pre-med track toward psychiatry.</p>
          <ul className="rp-contact">
            <li>{CONTACT.email}</li>
            <li>purcellventures.co</li>
            <li>github.com/thebigjah</li>
          </ul>
          <ul className="rp-figures">
            <li><b>15+</b>products shipped</li>
            <li><b>8</b>live properties</li>
            <li><b>29</b>free tools published</li>
            <li><b>3.92</b>weighted high school GPA</li>
            <li><b>1440</b>SAT</li>
          </ul>
        </header>

        <Block title="Selected work" intro="Everything here is deployed. I built each one alone unless noted."><Entries items={WORK} /></Block>
        <Block title="Client work"><Entries items={CLIENT} /></Block>
        <Block title="How I work"><Entries items={PRACTICE} /></Block>
        <Block title="Experience"><Entries items={EXPERIENCE} /></Block>
        <Block title="Education"><Entries items={EDUCATION} /></Block>
        <Block title="Technical skills">
          <dl className="rp-skills">
            {SKILLS.map(([k, v]) => (<><dt key={k}>{k}</dt><dd key={k + "v"}>{v}</dd></>))}
          </dl>
        </Block>
        <Block title="Awards and honors"><Entries items={AWARDS} /></Block>
        <Block title="Scholarship offers" intro="Merit offers from the schools that admitted me: 34 acceptances. I enrolled at the University of Alabama.">
          <table className="rp-table">
            <thead><tr><th>School</th><th>Award</th><th>Per year</th></tr></thead>
            <tbody>
              {OFFERS.map(([school, award, amt]) => (
                <tr key={school}><td>{school}</td><td>{award}</td><td>{amt.replace(" a year", "")}</td></tr>
              ))}
            </tbody>
          </table>
        </Block>
        <Block title="Leadership and ministry"><Entries items={LEADERSHIP} /></Block>
        <Block title="Mission trips"><Entries items={TRIPS} /></Block>
        <Block title="Community service" intro="More than 200 volunteer hours across ministry, missions and community service."><Entries items={SERVICE} /></Block>
        <Block title="Arts and media"><Entries items={ARTS} /></Block>
        <Block title="Clubs">
          <ul className="rp-tags">{CLUBS.map((c) => <li key={c}>{c}</li>)}</ul>
          <div style={{ marginTop: 10 }}><Entries items={CLUB_DETAIL} /></div>
        </Block>
        <Block title="Athletics"><Entries items={ATHLETICS} /></Block>
        <Block title="Faith"><Entries items={FAITH} /></Block>
        <Block title="Where I am headed">
          <p>I plan to earn an MD and practise psychiatry, combining clinical care with research into how AI can make mental health care easier to reach, and with faith-based counseling. Alongside medicine I am building businesses through Purcell Ventures and writing and making video about psychology, faith and ideas.</p>
        </Block>
      </div>
    </main>
  );
}
