import Image from "next/image";
import { PageHero, Section, Prose, Facts } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/team" },
  title: "The team: Elijah Purcell and the 57 AI agents of COSMIC",
  description:
    "Purcell Ventures is one person, Elijah Purcell, working with COSMIC, a station of 57 AI agents in 17 rooms. Each agent's name, its job, and the actions it is not allowed to take.",
};

// WHY THIS PAGE SAYS "AI AGENT" IN THE FIRST SENTENCE
//
// Dozens of human names and job titles on a company site read as employees. A visitor
// would be right to conclude that, and it would not be true. The first time a client
// discovered otherwise, every other claim on this site would become suspect, which is the
// same reasoning behind the disclosure line every client-facing agent carries in its
// signature (bh6/identity.py DISCLOSURE).
//
// SOURCE AND PRIVACY
//
// The roster comes from the COSMIC registry (~/cosmic/registry/agents/*.yaml, 57 agents,
// 17 rooms, 26 Oct 2026). BH6 crew full names come from bh6/identity.py ROSTER. Public
// pages name only agents that do company work. Seven agents work on Elijah's school and
// personal life (Greta, Scout, Seek, Satchel, Henry, and the Schedule room's Clio and
// Kira), so they are counted below and never named. Descriptions say what each agent
// does, never results: COSMIC has not produced revenue yet.

type Agent = {
  key: string;
  name: string;
  /** Job and rank, as the visitor reads it under the name. */
  role: string;
  does: string;
  wont?: string;
};

type Room = { name: string; about: string; agents: Agent[] };

const ROOMS: Room[] = [
  {
    name: "Command",
    about: "ElijahBot and the chief of staff.",
    agents: [
      { key: "elijahbot", name: "ElijahBot", role: "Commander, reports to Elijah",
        does: "Sends each task Elijah gives him to one agent and runs only the actions Elijah approves. He also fixes what the other agents escalate to him." },
      { key: "margot", name: "Margot Merrick", role: "Chief of staff",
        does: "Reads every agent's findings and sends Elijah one digest a day.",
        wont: "Decide anything. She reports and Elijah decides." },
    ],
  },
  {
    name: "The Loom",
    about: "Website builds, design orders and the first email to local businesses.",
    agents: [
      { key: "dax", name: "Dax Delgado", role: "Room manager",
        does: "Makes sure design orders get taken, made and delivered on time." },
      { key: "felix", name: "Felix Fenwick", role: "Loom build lead",
        does: "Builds each business its site from sourced facts and the owner's answers, shows the owner a preview, then ships the final version." },
      { key: "quentin", name: "Quentin Quill", role: "Proposals",
        does: "Prepares client proposals and rate sheets for Elijah to send. He sends first emails to businesses only inside the outreach lane Elijah approved.",
        wont: "Invent a price. If a scope has no rate on the card, he refuses to quote it." },
      { key: "porter", name: "Porter Prewitt", role: "Services prospector",
        does: "Qualifies local businesses that need a website, checks each one against the do-not-contact list, and logs them.",
        wont: "Contact anyone on the do-not-contact list, or qualify a national chain as a local business." },
      { key: "sift", name: "Sift", role: "Microbot, reports to Porter",
        does: "Picks the three local businesses most worth a first email and hands them to Quentin with the evidence." },
      { key: "trace", name: "Trace", role: "Microbot, reports to Porter",
        does: "Finds each local business's own website, social accounts and public contact details." },
      { key: "nib", name: "Nib", role: "Microbot, reports to Quentin",
        does: "Writes the first email to each business Sift picks, for Quentin to send." },
    ],
  },
  {
    name: "Clients",
    about: "Proposals that turn into signed work, and onboarding.",
    agents: [
      { key: "celia", name: "Celia Cortez", role: "Room manager",
        does: "Owns the path from first email to signed client: outreach going out, replies answered, and new clients onboarded." },
      { key: "owen", name: "Owen Oakes", role: "Client onboarding",
        does: "Builds each new client's onboarding checklist, using only what the client agreed to in the signed scope.",
        wont: "Start onboarding before the invoice goes out." },
    ],
  },
  {
    name: "Comms",
    about: "Every incoming message, routed to the room that owns it.",
    agents: [
      { key: "hana", name: "Hana Hale", role: "Room manager",
        does: "Makes sure every message from Elijah or a client reaches the room that owns it and gets an answer." },
      { key: "lena", name: "Lena Lark", role: "Comms lead",
        does: "Reads Elijah's Slack, Telegram, Instagram and email and routes each message to the room lead who owns it." },
    ],
  },
  {
    name: "Content",
    about: "Company posts and case studies.",
    agents: [
      { key: "paige", name: "Paige Pryor", role: "Room manager",
        does: "Checks company posts for accuracy, keeps them on schedule, and keeps internal details out of them." },
      { key: "wren", name: "Wren Waverly", role: "Purcell Ventures content",
        does: "Drafts posts about what the company did this week, for Elijah to review and publish.",
        wont: "Write about client work that is confidential, or claim a result that has not happened." },
      { key: "sable", name: "Sable Sinclair", role: "Social distribution",
        does: "Queues social posts for each channel and records what went where.",
        wont: "Publish anything without Elijah approving that exact post first." },
      { key: "silas", name: "Silas Sutton", role: "Case studies",
        does: "Drafts case studies in which every number traces to a source.",
        wont: "Fill in a result nobody measured. He leaves those fields blank." },
    ],
  },
  {
    name: "Slop detection",
    about: "The check every caption and email passes before it leaves.",
    agents: [
      { key: "sloane", name: "Sloane Sterling", role: "Room manager",
        does: "Stops anything that breaks Elijah's writing rules from leaving the station, and checks that nothing is held without a reason." },
      { key: "juno", name: "Juno Judd", role: "Slop detection lead",
        does: "Scores every caption and email that has no score yet. Anything under 85 stays held." },
      { key: "ear", name: "Ear", role: "Microbot, reports to Juno",
        does: "Reads queued titles and captions the way a viewer would and flags what the rule checks miss." },
    ],
  },
  {
    name: "Research",
    about: "Sourced answers for every other room.",
    agents: [
      { key: "iris", name: "Iris Ives", role: "Room manager",
        does: "Answers questions from every room with sources, and qualifies prospects and deals on facts." },
      { key: "delia", name: "Delia Dunmore", role: "Real estate prospector",
        does: "Matches property listings to buyers' stated criteria without contacting anyone.",
        wont: "Invent a buyer's criteria. An empty buy box is reported as empty." },
      { key: "rhett", name: "Rhett Ramsey", role: "Deal sourcing",
        does: "Assembles a daily packet of real estate deals from public records, facts only, for review.",
        wont: "Contact a homeowner, or draw a conclusion about anybody's circumstances." },
      { key: "deed", name: "Deed", role: "Microbot, reports to Rhett",
        does: "Finds where county records and cash buyer lists are published." },
      { key: "quarry", name: "Quarry", role: "Microbot, reports to Wren",
        does: "Finds sourced facts behind posts the company can make." },
      { key: "survey", name: "Survey", role: "Microbot, reports to Zane",
        does: "Prices gigs and new business ideas so Zane can rank them." },
    ],
  },
  {
    name: "Security",
    about: "Payment paths on every property, and secrets kept out of code.",
    agents: [
      { key: "sasha", name: "Sasha Stone", role: "Room manager",
        does: "Makes sure every property can take a payment and a message, and that no credential sits where it can leak." },
      { key: "audrey", name: "Audrey Ashford", role: "Activation auditor",
        does: "Visits every live property as a stranger would and reports the ones with no working way to pay or get in touch.",
        wont: "Pass a page because it loads. A price with no way to pay it gets logged as a finding." },
      { key: "cecily", name: "Cecily Cross", role: "Compliance and secrets",
        does: "Scans every repository for leaked keys and secrets. She reports what she finds and never edits a repository.",
        wont: "Close a finding because a scan failed to reach the thing it was checking." },
      { key: "recheck", name: "Recheck", role: "Microbot, reports to Audrey",
        does: "Re-audits the properties that cannot take a payment and tells Audrey when one is fixed or breaks again." },
    ],
  },
  {
    name: "Finance",
    about: "Invoices, collections and the company ledger.",
    agents: [
      { key: "trent", name: "Trent Talbot", role: "Room manager",
        does: "Makes sure every dollar the company earns is invoiced, collected and classified." },
      { key: "ivor", name: "Ivor Ingram", role: "Invoice chaser",
        does: "Reviews unpaid invoices and drafts follow-ups that need a second sign-off before they go out.",
        wont: "Invoice an amount the client did not agree to." },
      { key: "tobias", name: "Tobias Thorne", role: "Tax and ledger",
        does: "Classifies company spending, flags anything that looks commingled, and prepares tax numbers for Elijah to file.",
        wont: "Categorize a transaction he cannot read. He leaves those uncategorized." },
    ],
  },
  {
    name: "YouTube",
    about: "Short clips posted for paid clip campaigns.",
    agents: [
      { key: "yara", name: "Yara Young", role: "Room manager",
        does: "Makes sure clips get posted and submitted to their campaigns on time." },
      { key: "vera", name: "Vera Vale", role: "YouTube lead",
        does: "Turns every clip Clip Machine renders into an upload packet with the campaign's tags, credit line and hashtags, one YouTube channel per clip." },
      { key: "hook", name: "Hook", role: "Microbot, reports to Vera",
        does: "Writes a title for each queued Short that its clip can back up, and sends it through Juno's slop check." },
      { key: "lens", name: "Lens", role: "Microbot, reports to Vera",
        does: "Studies which Shorts get views in the station's niches, and finds new paid clip campaigns." },
      { key: "tally", name: "Tally", role: "Microbot, reports to Vera",
        does: "Reads the numbers on every posted Short each morning and tells Vera what moved and what did not." },
    ],
  },
  {
    name: "Etsy store",
    about: "Digital downloads and print-on-demand products.",
    agents: [
      { key: "etta", name: "Etta Easton", role: "Room manager",
        does: "Owns the store's listings, sales and shipping." },
      { key: "esme", name: "Esme Ellery", role: "Etsy store lead",
        does: "Picks digital downloads and print-on-demand products from what research shows sells, and runs the listings." },
    ],
  },
  {
    name: "Wholesale",
    about: "Real estate wholesale deals, the planned real estate division.",
    agents: [
      { key: "wade", name: "Wade Whitlock", role: "Room manager",
        does: "Sources wholesale deals from public records and matches them to buyers who stated what they buy." },
      { key: "knox", name: "Knox Kendrick", role: "Wholesale lead",
        does: "Finds houses, runs the offer math, and builds a call list with a script and an offer range for each owner. Elijah makes the calls and signs." },
    ],
  },
  {
    name: "Expansionists",
    about: "New businesses and new rooms.",
    agents: [
      { key: "xavier", name: "Xavier Exley", role: "Room manager",
        does: "Keeps a list of the station's next ways to earn, each backed by evidence, and tracks whether each step of the plan gets done." },
      { key: "zane", name: "Zane Zeller", role: "Expansionists lead",
        does: "Proposes new businesses and new rooms, each with the first step, the cost and how it pays back. Elijah decides which get built." },
    ],
  },
  {
    name: "The Brain",
    about: "Everything the station knows.",
    agents: [
      { key: "blair", name: "Blair Bennett", role: "Room manager",
        does: "Makes sure everything the station learns is saved with its source and can be found again." },
      { key: "minerva", name: "Minerva Marsh", role: "Memory lead",
        does: "Keeps everything the station knows findable, so no agent researches the same thing twice." },
    ],
  },
  {
    name: "Refinery",
    about: "Recurring failures, and the fixes for them.",
    agents: [
      { key: "reid", name: "Reid Rourke", role: "Room manager",
        does: "Gives every failure that repeats in any room an owner and a fix." },
      { key: "una", name: "Una Underhill", role: "Refinery lead",
        does: "Reviews one room a day against its contract results and slop scores, and writes the specific change that would improve it." },
    ],
  },
  {
    name: "Clone tanks",
    about: "Where new agents get built.",
    agents: [
      { key: "theo", name: "Theo Tanaka", role: "Room manager",
        does: "Makes sure every new agent has a job, a contract and tests before it goes live." },
      { key: "nell", name: "Nell Novak", role: "Clone tanks lead",
        does: "Builds new agents: drafts the role, the job contract and the tests. ElijahBot approves each one before it goes live." },
    ],
  },
];

const NAMED = ROOMS.reduce((n, r) => n + r.agents.length, 0);

// Which agents have art on disk in public/team. Checked by hand against the folder.
const HAS_PHOTO = new Set([
  "margot", "quentin", "ivor", "owen", "audrey", "cecily", "porter", "delia",
  "rhett", "tobias", "silas", "wren",
]);

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://purcellventures.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "The team",
      "item": "https://purcellventures.co/team"
    }
  ]
};

function AgentEntry({ a }: { a: Agent }) {
  return (
    <article className="ui-entry" style={{ gridTemplateColumns: "64px minmax(0, 1fr)", columnGap: 18 }}>
      {HAS_PHOTO.has(a.key) ? (
        <Image
          src={`/team/${a.key}-square.png`}
          alt=""
          width={64}
          height={64}
          style={{ width: 64, height: 64, objectFit: "cover" }}
        />
      ) : (
        // No headshot on disk for this agent. A monogram is a cosmetic gap, a broken
        // <Image> is a broken page.
        <div
          aria-hidden
          style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-2)", color: "var(--muted)", fontFamily: "var(--font-display)", fontSize: 20 }}
        >
          {a.name.split(" ").map((w) => w[0]).join("")}
        </div>
      )}
      <div>
        <h3>{a.name}</h3>
        <p className="ui-entry__org">{a.role}</p>
        <p style={{ margin: "10px 0 0", color: "var(--fg-2)" }}>{a.does}</p>
        {a.wont && <p className="ui-muted" style={{ margin: "8px 0 0" }}>Will not: {a.wont}</p>}
      </div>
    </article>
  );
}

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <main>
        <PageHero
          planet="consulting"
          kicker="Purcell Ventures LLC"
          title="One person and COSMIC, 57 AI agents in 17 rooms"
          lede={<><strong>Every agent named here is software.</strong> Elijah Purcell is the only person in the company. The agents have names because asking what Quentin is doing is easier than asking what the proposal subsystem is doing, and an agent that signs its name can be held to what it said.</>}
        />

        <Section title="How COSMIC works">
          <Prose>
            <p>
              COSMIC stands for Command and Orchestration Systems Manifold Intelligence Center. It is a station app that runs on Elijah&apos;s Mac, with an Android companion app. Each agent is a Claude session with a narrow set of tools and a written charter, and it cannot use any tool outside that set.
            </p>
            <p>
              The agents work in rooms, one room per part of the business. Elijah gave each agent a list of things it may not do: no agent can invent a price, close its own findings or send mail as a person. Any email an agent sends you says in the signature that an automated agent wrote it, and Elijah reads the replies.
            </p>
          </Prose>
        </Section>

        <Section title="The chain of command" intro="Each agent reports one rank up. Elijah is at the top.">
          <Facts
            items={[
              ["Commander", "ElijahBot, 1 agent. Reports to Elijah."],
              ["Room managers", "16 agents, one for every room except Command. They report to ElijahBot."],
              ["Leads", "11 agents. Each leads the work in one room."],
              ["Crew", "15 agents, each with one narrow job. Leads and crew report to their room manager."],
              ["Microbots", "14 agents. Each works with a slice of one agent's tools and reports to that agent."],
            ]}
          />
        </Section>

        <Section
          title="The roster"
          intro={`${NAMED} agents do company work, listed by room. Seven more agents handle Elijah's school and personal work, and their names are not published.`}
          stack
        >
          {ROOMS.map((room) => (
            <div key={room.name} style={{ marginTop: 36 }}>
              <h3 style={{ margin: 0 }}>{room.name}</h3>
              <p className="ui-muted" style={{ margin: "4px 0 18px" }}>{room.about}</p>
              <div className="ui-entries">
                {room.agents.map((a) => <AgentEntry key={a.key} a={a} />)}
              </div>
            </div>
          ))}
        </Section>

        <Section title="Elijah Purcell">
          <Prose>
            <p>
              <strong>Elijah Purcell</strong> is the Founder/CEO. He builds the software and makes the decisions the agents are not allowed to make: prices, what gets sent to a client, and how money is spent.
            </p>
          </Prose>
        </Section>
      </main>
    </>
  );
}
