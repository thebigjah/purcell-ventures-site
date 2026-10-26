import Link from "next/link";
import { PageHero, Section, Rows, Prose } from "@/app/components/ui";
import Breadcrumbs from "@/app/components/Breadcrumbs";

// Rebuilt on the page kit 26 Oct 2026. The count in the heading is computed from TOOLS.
// Fact pass 26 Oct 2026: three entries came off the list, the "Tools" index (not a tool),
// "project prowess" (a puzzle door) and Milestone (preloaded with his personal dates).
// The site states 26 single-file tools here.
//
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
  ["ai-cost-calculator", "AI Cost Calculator", "Estimate the hours and dollars a focused AI consulting session would save your team, and how fast it pays back."],
  ["ai-readiness-test", "AI Readiness Test", "A 10-question diagnostic for small business owners and team leaders. See how exposed your role and your company are to AI."],
  ["ai-will", "AI Will", "A 30-minute interview that produces a continuity document for a small business, so the work keeps running if the owner cannot. Free for small business owners over 60."],
  ["brag-doc", "Brag Doc", "Log accomplishments, kind things people said, projects shipped and awards. Open it when you write a r\u00e9sum\u00e9 or a scholarship application."],
  ["calvinism-test", "TULIP", "A self-assessment of the five points of Calvinism. Score how much you agree with each of the five points of TULIP."],
  ["cipher-lab", "Cipher Lab", "An interactive workbench for 6 classic ciphers: Caesar, Atbash, Vigen\u00e8re, Bacon, ROT13 and Rail Fence, with a puzzle generator. I built it for a cryptography class and for designing scavenger hunts."],
  ["counter", "Counter", "For each common objection to the Christian faith, read the strongest version, write your response, then compare it with how Lewis, Craig, McDowell and others answered."],
  ["day-sheet", "Day Sheet", "A one-page daily planner you can print and carry: the top 3 priorities, 3 things you are grateful for and hour blocks from 6 a.m. to 11 p.m., saved for each date."],
  ["decision-journal", "Decision Journal", "Log important decisions with predictions, alternatives and review dates. Compare each prediction with the outcome over time to calibrate your judgment."],
  ["dorm-pack", "Dorm Pack", "A packing checklist for freshman move-in at the University of Alabama: more than 130 items in 11 categories. Check them off as you pack and add your own."],
  ["echo", "Echo", "A guided interview for recording the life story of an elderly or dying loved one: 60 questions in 9 chapters. The result is a printable life document laid out like an encyclopedia entry."],
  ["era", "Era", "Pick or roll a year. See the top headlines, music, film and tech from that year as people saw them at the time."],
  ["examen", "Examen", "The Ignatian Examen in five movements at the end of each day: gratitude, asking for light, review, asking forgiveness and looking toward tomorrow. A 500-year-old practice, in ten minutes a night."],
  ["friendship-map", "Friendship Map", "A small CRM for the 20 to 30 people closest to you. Track last contact, see who has gone too long without hearing from you, and tier people by closeness."],
  ["future-self", "Future Self", "Write a letter to your future self. The app keeps it sealed until the release date you set, and you can read it on or after that date."],
  ["hangout", "Steal My Hangout", "A list of hangout ideas other people have tried. Browse them and submit your own."],
  ["momentum", "Momentum", "One intention a day that your friends can see. At the end of the day, mark it done or not done."],
  ["prayer-journal", "Prayer Journal", "A daily prayer journal with rotating scripture, prompts in the ACTS framework and a log of answered prayers."],
  ["reading-log", "Reading Log", "A personal reading log with stats. Log books, ratings and notes, and get a year-end summary of what you read."],
  ["rival", "Rival", "Track any metric. It compares you only to your own past data."],
  ["sermon-notes", "Sermon Notes", "Sermon notes for Sunday: date, preacher, passage, key points, application and follow-up questions. It keeps the history across years, searches your notes and shows which books of the Bible come up most."],
  ["solomon", "Solomon", "A chosen quote each day from Proverbs, the Christian tradition, classical philosophy and modern writers. Save favorites and write a reflection."],
  ["verse-vault", "Verse Vault", "A spaced-recall tool for memorizing scripture. Add the verses you want to know by heart, and the tool hides more words at each review until you can say the whole verse from memory."],
  ["weekly-skill", "Weekly Skill", "A new skill each week, chosen by you or at random: card flourishes, knots, juggling, spinning, beatbox and magic. Track what you have mastered."],
  ["wisdom-prep", "Wisdom Conversation Prep", "Five minutes of preparation for a conversation with someone wiser than you. Pick the mentor and the topic to get custom questions, notes for before the call and a reflection template for after it."],
  ["worship-set", "Worship Set", "Plan worship sets with the song, key, BPM, transition notes, a scripture reading between songs and notes for the leader. Save sets and reuse them."]
];

export default function ToolsPage() {
  const count = TOOLS.length;
  return (
    <main>
      <PageHero
        kicker="Free, no account, nothing collected"
        title={`${count} free single-page tools.`}
        lede="I built these single-purpose tools. Each one is one file that runs in the browser, keeps what you enter on your own device and needs no account."
        meta="Until now the only links to them were on my GitHub profile."
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Free tools", href: "/tools" },
        ]} />}
      />

      <Section stack>
        <Rows
          items={TOOLS.map(([slug, name, desc]) => ({
            name,
            line: desc,
            href: `https://thebigjah.github.io/${slug}/`,
          }))}
        />
      </Section>

      <Section title="More">
        <Prose>
          <p>
            More about who made them: <Link href="/who">who Elijah Purcell is</Link>. Paid tools for businesses are on <Link href="/digital">the digital services page</Link>.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
