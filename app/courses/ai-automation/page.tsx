import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero, Section, Figures, Rows, Tiers, Faq, Button, Prose, Facts } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import WaitlistForm from "../WaitlistForm";

// ZERO TO AUTOMATED, rebuilt on the page kit 26 Oct 2026.
//
// - The page linked to #waitlist from every button but had no element with that id, so
//   the links went nowhere. The waitlist section now carries id="waitlist".
// - Every enroll button points at #waitlist while the Lemon Squeezy account is not live.

type Lesson = { id: string; title: string; duration: string; format: string };
type Module = { title: string; totalMin: number; lessons: Lesson[] };

const MODULES: Module[] = [
  {
    title: "Deciding what to automate", totalMin: 35,
    lessons: [
      { id: "1.1", title: "The more-than-once rule: how I decide what to automate", duration: "12 min", format: "Camera" },
      { id: "1.2", title: "The stack audit: mapping the tasks you repeat every day", duration: "13 min", format: "Camera and screen" },
      { id: "1.3", title: "Picking your first build by scope, effort and impact", duration: "10 min", format: "Camera" },
    ],
  },
  {
    title: "Your AI foundation", totalMin: 37,
    lessons: [
      { id: "2.1", title: "Setting up your environment: Python, APIs, keys and .env files", duration: "13 min", format: "Screen share" },
      { id: "2.2", title: "Your first AI call: prompting basics and handling the output", duration: "12 min", format: "Screen share" },
      { id: "2.3", title: "Building reusable AI functions as a module you import", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    title: "Email automation", totalMin: 50,
    lessons: [
      { id: "3.1", title: "How I built my email bot: the architecture", duration: "13 min", format: "Camera and screen" },
      { id: "3.2", title: "Connecting to Gmail: OAuth setup, IMAP and reading email with Python", duration: "14 min", format: "Screen share" },
      { id: "3.3", title: "Sorting and ranking email by priority with Claude", duration: "12 min", format: "Screen share" },
      { id: "3.4", title: "Drafting replies you can send", duration: "11 min", format: "Camera and screen" },
    ],
  },
  {
    title: "Content pipelines", totalMin: 53,
    lessons: [
      { id: "4.1", title: "My YouTube pipeline and how it runs without me", duration: "14 min", format: "Camera and screen" },
      { id: "4.2", title: "Downloading, transcribing and clipping with yt-dlp and Whisper", duration: "13 min", format: "Screen share" },
      { id: "4.3", title: "AI commentary and titles in your own voice, at volume", duration: "13 min", format: "Screen share" },
      { id: "4.4", title: "Video assembly, thumbnails and uploading with MoviePy and the YouTube API", duration: "13 min", format: "Screen share" },
    ],
  },
  {
    title: "Scraping and lead generation", totalMin: 38,
    lessons: [
      { id: "5.1", title: "Web scraping basics: Craigslist, Nextdoor and public data", duration: "13 min", format: "Screen share" },
      { id: "5.2", title: "Using the Places API to find businesses that need help", duration: "13 min", format: "Screen share" },
      { id: "5.3", title: "AI filtering and scoring for scrapers", duration: "12 min", format: "Camera and screen" },
    ],
  },
  {
    title: "Personal AI assistants", totalMin: 38,
    lessons: [
      { id: "6.1", title: "Building a personal AI assistant with memory, voice and screen vision", duration: "14 min", format: "Camera and screen" },
      { id: "6.2", title: "Persistent memory and context, so the assistant remembers you", duration: "13 min", format: "Screen share" },
      { id: "6.3", title: "Voice input and output with ElevenLabs and Web Speech", duration: "11 min", format: "Screen share" },
    ],
  },
  {
    title: "Scheduling, monitoring and reliability", totalMin: 37,
    lessons: [
      { id: "7.1", title: "Running on a schedule: Task Scheduler, cron and the Python schedule library", duration: "13 min", format: "Screen share" },
      { id: "7.2", title: "Error handling and monitoring so failures show up", duration: "12 min", format: "Screen share" },
      { id: "7.3", title: "Config-driven systems: tools you can reuse and share", duration: "12 min", format: "Screen share" },
    ],
  },
  {
    title: "Your stack, scaling and what comes next", totalMin: 25,
    lessons: [
      { id: "8.1", title: "Your complete AI stack: assembling the pieces", duration: "13 min", format: "Camera and screen" },
      { id: "8.2", title: "Turning a personal tool into something you can sell", duration: "12 min", format: "Camera" },
    ],
  },
];

const TOTAL_LESSONS = MODULES.reduce((s, m) => s + m.lessons.length, 0);
const TOTAL_HOURS = Math.round((MODULES.reduce((s, m) => s + m.totalMin, 0) / 60) * 10) / 10;

const TOOLS = [
  { name: "Email bot", line: "Reads your inbox, sorts every message by urgency and drafts replies with Claude.", fig: "Runs daily. Gmail IMAP, Claude API, SQLite." },
  { name: "Content pipeline", line: "Downloads source footage, writes AI commentary, assembles the video with captions and a thumbnail, and uploads it.", fig: "Runs on a schedule. yt-dlp, MoviePy, YouTube API." },
  { name: "Listing monitor", line: "Watches Craigslist, Facebook Marketplace or any job board for postings that match your criteria. It filters out the irrelevant ones, skips what it has already seen and exports the leads to a spreadsheet.", fig: "Runs on a schedule. Selenium, gspread." },
  { name: "Opportunity scorer", line: "Queries a data source for prospects or leads, scores each result against your criteria and outputs a ranked list of who to contact first.", fig: "Runs on demand. Places API and a scoring script." },
  { name: "Inbox harvester", line: "Processes hundreds of emails or documents at once, pulls out deadlines, prices, contacts or any structured data, and builds a prioritized list.", fig: "Batch processing. Gmail OAuth, Claude." },
  { name: "Personal AI assistant", line: "A desktop overlay with voice input, voice output, screen vision, persistent memory and custom slash commands for your common tasks.", fig: "Always on. Electron, Claude API, ElevenLabs." },
];

const RESOURCES: [ReactNode, ReactNode][] = [
  ["Automation audit worksheet", "A scoring sheet that ranks tasks by how often they happen, how long they take and how much you dislike them. Module 1."],
  ["Python environment setup guide", "Step-by-step setup for every operating system, with every common error and its fix. Module 2."],
  ["Email bot starter template", "A stripped version of my email bot. Add your keys to run it. Module 3."],
  ["YouTube pipeline starter template", "A stripped pipeline config and entry script with all five steps laid out. Module 4."],
  ["Google Places lead script", "Scoring and export to Google Sheets, set by city and business type. Module 5."],
  ["Reusable AI wrapper module", "The ai_engine.py pattern. Import it into any later project. Modules 2 to 7."],
  ["Project config template", "A YAML config and command-line boilerplate to copy for a new automation project. Module 7."],
];

const TIERS = [
  {
    name: "Self-paced",
    price: "$397, or 3 payments of $139",
    items: ["All 25 lessons as they are released", "7 starter code templates", "The full resource pack", "Access for life"],
    children: <p style={{ marginTop: 18 }}><Button href="#waitlist" ghost>Join the waitlist</Button></p>,
  },
  {
    name: "Coaching",
    price: "$1,297, or 3 payments of $449",
    items: ["Everything in Self-paced", "Three live group build sessions", "Code review on your tools", "A private cohort chat"],
    children: <p style={{ marginTop: 18 }}><Button href="#waitlist" ghost>Join the coaching waitlist</Button></p>,
  },
  {
    name: "One-on-one intensive",
    price: "$2,997, with payment plans available",
    items: ["Everything in Coaching", "Three private hours with me", "A review of your custom tool architecture", "Email access for 90 days"],
    children: <p style={{ marginTop: 18 }}><Button href="#waitlist" ghost>Join the one-on-one waitlist</Button></p>,
  },
];

const FAQS: { q: ReactNode; a: ReactNode }[] = [
  {
    q: "Do I need to know Python already?",
    a: "No, but you need to be willing to learn. Module 2 walks through setup from the beginning. If you can copy code, read error messages and search for answers, you can build every tool in the course. I skip basic syntax, which free resources cover, and teach the patterns these tools use.",
  },
  {
    q: "What if I am not very technical?",
    a: "Anyone can follow modules 1 and 8, which cover deciding what to automate and what comes next. The build modules take work. If you have never written code, take a free Python basics course first and come back. If you have written any code and have not done automation, you are ready.",
  },
  {
    q: "How does this compare with an n8n course or a Zapier tutorial?",
    a: "An n8n or Zapier course teaches one platform. This course teaches you to write your own tools in Python, so you keep the code and can build things those platforms do not support. I still use n8n or Zapier in a few places to connect pieces.",
  },
  {
    q: "Do you run these tools yourself?",
    a: "Yes. The email bot processes my inbox every day. The content pipeline runs on a schedule and earns AdSense revenue. I built a listing monitor to find job leads, an inbox harvester to process bulk email and a personal AI that runs on my desktop, all before I wrote the course.",
  },
  {
    q: "What is in the resource pack?",
    a: "Seven stripped versions of the tools I run, with API calls removed, config files laid out and the patterns documented. You add your keys and you have a working starting point. The automation audit worksheet, the setup guides and the project config template come with it.",
  },
  {
    q: "What is the refund policy?",
    a: "If you finish Module 2 and the technical level is beyond you, contact me within 7 days of purchase and I will refund you. I do not refund after you have opened the full curriculum.",
  },
  {
    q: "Will this work on Windows?",
    a: "Yes. I built all my tools on Windows, and every setup walkthrough covers Windows first. Nothing in the course needs WSL, and I show how to set it up if you want it.",
  },
  {
    q: "I already bought the Business Launch course. Is there a discount?",
    a: <>Yes. Email me at <a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</>,
  },
];

export default function ZeroToAutomatedPage() {
  return (
    <main>
      <PageHero
        planet="software"
        kicker="Course: Zero to Automated"
        title="Zero to Automated: the AI tools I built and run every day"
        lede="I automated my email inbox, my YouTube channel, my lead generation and my scholarship search. The course walks through how I built each one."
        meta="Waitlist open. The course is $397 at launch, and I am still recording it."
        actions={<>
          <Button href="#waitlist">Join the waitlist</Button>
          <Button href="#curriculum" ghost>See the curriculum</Button>
        </>}
      />

      <Section title="Course facts">
        <Figures
          items={[
            ["8", "Modules"],
            [`${TOTAL_LESSONS}`, "Lessons"],
            [`${TOTAL_HOURS} hours`, "Of video"],
            ["7", "Code templates"],
            ["6", "Tools in production"],
          ]}
        />
      </Section>

      <Section title="The tools you build" intro="You write each tool yourself, run it on your own machine and keep the code.">
        <Rows items={TOOLS.map((t) => ({ name: t.name, line: <>{t.line} <span className="ui-gold">{t.fig}</span></> }))} />
      </Section>

      <Section title="Who it is for">
        <Rows
          items={[
            { name: "Solo founders and freelancers", line: "You spend hours each week on tasks that follow the same pattern, and you do not know where to start automating them." },
            { name: "Students who want to build working tools", line: "You want to finish a course with a tool running on your machine." },
            { name: "Business Launch students", line: "You have built the business. Lesson 7.1 of the Business Launch course points here for the automation step." },
            { name: "Consulting clients", line: "You saw one of my tools running during a session and want to build it yourself." },
          ]}
        />
      </Section>

      <Section id="curriculum" title={`Eight modules, ${TOTAL_LESSONS} lessons`} intro="All the code is included.">
        <Faq
          items={MODULES.map((m, i) => ({
            q: `Module ${i + 1}: ${m.title}, ${m.lessons.length} lessons, ${m.totalMin} min`,
            a: (
              <Prose>
                <ul>
                  {m.lessons.map((l) => (
                    <li key={l.id}>
                      {l.id} {l.title} <span className="ui-muted ui-small">({l.format}, {l.duration})</span>
                    </li>
                  ))}
                </ul>
              </Prose>
            ),
          }))}
        />
      </Section>

      <Section
        title="Seven starter templates"
        intro="Every template is a stripped version of something I run, with API calls removed and config files laid out. You add your keys and you have a working starting point."
      >
        <Facts items={RESOURCES} />
      </Section>

      <Section id="pricing" title="Prices">
        <Tiers tiers={TIERS} />
      </Section>

      <Section
        id="waitlist"
        title="Waitlist"
        intro="People on the waitlist get a discount. I send one email when the course opens."
      >
        <WaitlistForm course="ai-automation" done="I will email you when the course opens, with your early-access discount." />
        <p className="ui-muted" style={{ marginTop: 20 }}>
          The course is not finished. Ask me and I will send the material I have so far:{" "}
          <a className="ui-link" href={`mailto:${CONTACT.email}?subject=Zero%20to%20Automated`}>{CONTACT.email}</a>.
        </p>
      </Section>

      <Section title="Questions">
        <Faq items={FAQS} />
        <p className="ui-muted" style={{ marginTop: 28 }}>
          I also teach <Link className="ui-link" href="/courses">two other courses</Link>. I reply to email within one business day.
        </p>
      </Section>
    </main>
  );
}
