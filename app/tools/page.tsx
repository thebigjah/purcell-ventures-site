import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import Breadcrumbs from "@/app/components/Breadcrumbs";

// TWENTY-NINE LIVE TOOLS THAT NOTHING LINKED TO.
//
// They have been serving on GitHub Pages the whole time and were reachable only through
// his GitHub profile, which meant almost nobody could find them and a crawler had one
// narrow path in. Every name and description below was read off the tool's own live page
// rather than written here, so this index cannot describe a tool differently from how the
// tool describes itself.
//
// Free, no account, nothing collected. That is stated plainly because it is the first
// question anybody sensible asks about a page full of links.

const TOOLS: [string, string, string][] = [
  ["ai-cost-calculator", "AI Cost Calculator", "Estimate the hours and dollars a focused AI consulting session would save your team \u2014 and how fast it pays back."],
  ["ai-readiness-test", "AI Readiness Test", "A 10-question diagnostic for small business owners and team leaders. Discover where your role + company stand in the AI-disruption window."],
  ["ai-will", "AI Will", "A 30-minute interview that generates an operational continuity document for a small business \u2014 so the work keeps running if the owner can't. Free for over-60 SMB owners."],
  ["brag-doc", "Brag Doc", "Log accomplishments, kind things people said, projects shipped, awards. The doc you reach for at r\u00e9sum\u00e9 time, on hard days, or before a scholarship application."],
  ["calvinism-test", "TULIP", "Personal self-assessment of the five points of Calvinism. Calculate your honest agreement across T-U-L-I-P. For Christians who actually want to do the math."],
  ["cipher-lab", "Cipher Lab", "Interactive workbench for 6 classic ciphers \u2014 Caesar, Atbash, Vigen\u00e8re, Bacon, ROT13, Rail Fence. Plus puzzle generator. Built for cryptography class + hunt design."],
  ["counter", "Counter", "For each common objection to Christian faith, see the strongest version, write your response, then compare to how Lewis, Craig, McDowell, and others answered."],
  ["day-sheet", "Day Sheet", "A single-page daily planner you can print and carry. Top 3 priorities, 3 gratitudes, hour blocks 6am to 11pm. Saved per date."],
  ["decision-journal", "Decision Journal", "Log non-trivial decisions with predictions, alternatives, and review dates. Compare prediction vs outcome over time to calibrate your judgment."],
  ["dorm-pack", "Dorm Pack", "Pre-loaded packing checklist for UA freshman move-in. 130+ items across 11 categories. Check off as you pack. Add custom items."],
  ["echo", "Echo", "A guided interview tool for capturing the life story of an elderly or dying loved one. 60 curated questions across 9 chapters. Output is a printable Wikipedia-style life document."],
  ["era", "Era", "Pick or roll a year. See it as the people who lived it did \u2014 top headlines, music, film, tech, cultural moment. No 'looking back from now.'"],
  ["examen", "Examen", "The Ignatian Examen \u2014 five movements at the end of each day: gratitude, ask for light, review, ask forgiveness, look toward tomorrow. A 500-year tradition, in ten minutes a night."],
  ["friendship-map", "Friendship Map", "A tiny CRM for the 20-30 people you actually care about. Track last contact, surface who's gone too long without hearing from you. Tier by closeness. No notifications, no judgment."],
  ["future-self", "Future Self", "Write a letter to your future self. The app holds it sealed until the release date you set. Open Future Self on or after that date to read."],
  ["hangout", "Steal My Hangout", "A list of actually-good hangout ideas other people have done. Browse, pick one, do it. Submit your own. No accounts, no algorithm."],
  ["milestone", "Milestone", "Visual countdown to your real upcoming milestones. Pre-loaded with Elijah's summer + freshman year dates. Add your own. Reorder by date."],
  ["momentum", "Momentum", "One intention per day. Friends witness it. End of day: done or not. No streak shaming, no leaderboards. Just witness."],
  ["prayer-journal", "Prayer Journal", "Daily prayer journal with rotating scripture, ACTS-framework prompts, and an answered-prayer log. No streaks, no social, no algorithm. Just a place to write."],
  ["project-prowess", "project prowess", "If you found this, you found a door."],
  ["reading-log", "Reading Log", "A personal reading log with stats. No social feed, no algorithmic shoves. Books in, books out, ratings, notes, and a year-end picture of what you read."],
  ["rival", "Rival", "Track any metric. The only comparison is to your own historical data. No social, no leaderboards, no streaks designed to manipulate you."],
  ["sermon-notes", "Sermon Notes", "Sunday sermon note-taking. Date, preacher, passage, key points, application, follow-up questions. History across years, search across notes, top-referenced book stats."],
  ["solomon", "Solomon", "A curated quote each day from Proverbs, the Christian tradition, classical philosophy, and modern voices. Save favorites. Write a reflection. The opposite of doom-scrolling."],
  ["tools", "Tools", "Single-purpose tools I've shipped. Each one is one HTML file, runs in your browser, stores data locally. No accounts, no ads, no algorithm."],
  ["verse-vault", "Verse Vault", "A spaced-recall tool for scripture memorization. Add verses you want to know cold. The tool progressively hides words across review sessions until you're saying the whole thing from memory."],
  ["weekly-skill", "Weekly Skill", "A new fun skill every week. Card flourishes, knots, juggling, spinning, beatbox, magic. One per week, your choice or random. Track what you've mastered."],
  ["wisdom-prep", "Wisdom Conversation Prep", "A 5-minute prep tool for a conversation with someone wiser than you. Pick the mentor + topic, get customized questions + pre-call thinking + post-call reflection template."],
  ["worship-set", "Worship Set", "Plan worship sets: song, key, BPM, transition notes, scripture segue, leader notes. Save sets and re-run. For worship leaders who actually think about flow."]
];

export default function ToolsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "820px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Free tools", href: "/tools" },
        ]} />

        <header className="pv-page-head">
          <div className="pv-mono-label">Free · No account · Nothing collected</div>
          <h1>
            Twenty-nine free{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>tools</em>
          </h1>
        </header>

        <p style={{ fontSize: "17px", lineHeight: 1.75, marginBottom: "8px" }}>
          Single-page tools built by Elijah Purcell. Each one is a single file that runs in
          the browser, stores what you enter on your own device, and asks for nothing.
        </p>
        <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--color-warm-text-muted)", marginBottom: "34px" }}>
          They have been live for months and were reachable only through a GitHub profile,
          which is a poor place to keep something you want people to use.
        </p>

        <div style={{ display: "grid", gap: "0" }}>
          {TOOLS.map(([slug, name, desc]) => (
            <a
              key={slug}
              href={`https://thebigjah.github.io/${slug}/`}
              style={{
                display: "block", padding: "18px 0",
                borderBottom: "1px solid rgba(212,175,55,0.14)",
                textDecoration: "none", color: "inherit",
              }}
            >
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{name}</div>
              <div style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--color-warm-text-muted)", marginTop: "3px" }}>{desc}</div>
            </a>
          ))}
        </div>

        <p style={{ marginTop: "40px", fontSize: "15px", color: "var(--color-warm-text-muted)" }}>
          More about who made them: <Link href="/who" style={{ color: "var(--color-warm-accent)" }}>Who is Elijah Purcell</Link>.
          The paid, managed tooling for businesses is on{" "}
          <Link href="/digital" style={{ color: "var(--color-warm-accent)" }}>the digital services page</Link>,
          which is a different thing entirely.
        </p>

      </main>
    </div>
  );
}
