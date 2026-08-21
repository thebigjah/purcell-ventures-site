import Image from "next/image";

export const metadata = {
  alternates: { canonical: "/team" },
  title: "The Purcell Ventures Team: Elijah Purcell and Fifteen AI Agents",
  description:
    "Purcell Ventures runs on one person and fifteen AI agents. Here is every one of them, what it does, and what it is not allowed to do.",
};

// WHY THIS PAGE SAYS "AI AGENT" IN THE FIRST SENTENCE
//
// Fifteen headshots with human names and job titles, on a company site, reads as fifteen
// employees. A visitor would be right to conclude that, and it would not be true. The
// first time a client discovered otherwise, every other claim on this site would become
// suspect, which is the same reasoning behind the disclosure line every client-facing
// agent already carries in its signature.
//
// It is also the better story. "A one-person company that runs like a fifteen-person one,
// and here is exactly how" is more interesting than a staff page, and it is the evidence
// for the thing Elijah actually wants to be known for.

type Agent = {
  key: string;
  name: string;
  role: string;
  does: string;
  wont: string;
  facing?: boolean;
};

const TEAM: Agent[] = [
  { key: "margot", name: "Margot Merrick", role: "Chief of Staff",
    does: "Collects what every other agent found and ranks it, so the most urgent thing is first rather than whichever finished last.",
    wont: "Decide anything. She reports; Elijah decides." },
  { key: "quentin", name: "Quentin Quill", role: "Proposals", facing: true,
    does: "Writes the proposal, prices every line off the rate card, and states the assumptions out loud so scope cannot creep quietly.",
    wont: "Invent a price. A quote is a commitment, and a scope with no rate on the card is refused rather than estimated." },
  { key: "ivor", name: "Ivor Ingram", role: "Invoice Chaser", facing: true,
    does: "Finds delivered work that was never billed and drafts the invoice.",
    wont: "Invoice an amount nobody agreed to. A guessed figure on an invoice is a claim about what someone owes." },
  { key: "owen", name: "Owen Oakes", role: "Client Onboarding", facing: true,
    does: "Turns a signed scope into a checklist, built only from what was actually agreed.",
    wont: "Start onboarding before the invoice goes out." },
  { key: "audrey", name: "Audrey Ashford", role: "Activation Auditor",
    does: "Visits every live property as a stranger would and reports whether a visitor could actually buy or get in touch.",
    wont: "Trust a page that merely loads. A price with no way to pay it is a finding, not a feature." },
  { key: "cecily", name: "Cecily Cross", role: "Compliance and Secrets",
    does: "Scans every repository for credentials that should not be in it, and re-checks the ones already flagged.",
    wont: "Close a finding because a scan failed to reach the thing it was checking." },
  { key: "porter", name: "Porter Prewitt", role: "Prospector, Services",
    does: "Qualifies local businesses that need a website and hands them to the pipeline.",
    wont: "Contact anyone on the do-not-contact list, or qualify a national chain as a local business." },
  { key: "delia", name: "Delia Dunmore", role: "Prospector, Real Estate",
    does: "Matches property inventory against real buyer criteria.",
    wont: "Invent a buyer's criteria. An empty buy-box is reported as empty." },
  { key: "rhett", name: "Rhett Ramsey", role: "Deal Sourcing",
    does: "Assembles deal packets from public records, facts only.",
    wont: "Contact a homeowner, or draw a conclusion about anybody's circumstances." },
  { key: "greta", name: "Greta Glennon", role: "Grants and Scholarships",
    does: "Tracks what is actually winnable and when it closes.",
    wont: "Count an award from a school Elijah does not attend. That is a compliment, not money." },
  { key: "tobias", name: "Tobias Thorne", role: "Tax and Ledger",
    does: "Keeps the books and flags anything that looks commingled.",
    wont: "Categorise a transaction it cannot read. Unclear stays unclear." },
  { key: "silas", name: "Silas Sutton", role: "Case Studies",
    does: "Writes up finished work, using only claims that can be evidenced.",
    wont: "Fill in a result nobody measured. Blank stays blank." },
  { key: "wren", name: "Wren Waverly", role: "Content, Purcell Ventures",
    does: "Drafts what the company can honestly say this week.",
    wont: "Write about client work that is confidential, or claim a result that has not happened." },
  { key: "henry", name: "Henry Haroldson", role: "Content, personal channel",
    does: "Keeps the personal channel separate from the company one.",
    wont: "Blend the two, or touch a topic on the blocklist." },
  { key: "sable", name: "Sable Sinclair", role: "Social Distribution", facing: true,
    does: "Queues posts across channels and records what went where.",
    wont: "Publish anything without Elijah approving that exact post first." },
];

// Which agents actually have art on disk. Checked at build time rather than assumed.
const HAS_PHOTO = new Set([
  "margot", "quentin", "ivor", "owen", "audrey", "cecily", "porter", "delia",
  "rhett", "greta", "tobias", "silas", "wren",
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

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        Purcell Ventures LLC
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
        One person. Fifteen agents.
      </h1>

      <div className="mt-6 max-w-2xl space-y-4 text-neutral-600 dark:text-neutral-300">
        <p>
          <strong>Everyone below is an AI agent, not an employee.</strong> They have names
          and faces because it is easier to ask what Quentin is doing than to ask what the
          proposal subsystem is doing, and because an agent that signs its own name can be
          held to what it said.
        </p>
        <p>
          Each one runs on a schedule, does a narrow job, and writes down what it found.
          The interesting column is the second one. Every agent here is defined as much by
          what it is forbidden to do as by what it does, because an agent that can invent a
          price, close its own findings, or send mail as a person is not a colleague, it is
          a liability.
        </p>
        <p className="text-sm">
          Anything one of them sends you says so in the signature, and a person reads the
          replies.
        </p>
      </div>

      <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {TEAM.map((a) => (
          <li key={a.key} className="flex gap-4">
            {HAS_PHOTO.has(a.key) ? (
              <Image
                src={`/team/${a.key}-square.png`}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 object-cover"
              />
            ) : (
              // Sable and Henry have no headshot yet. A monogram is a cosmetic gap; a
              // broken <Image> is a broken page.
              <div
                aria-hidden
                className="flex h-16 w-16 shrink-0 items-center justify-center bg-neutral-200 text-lg font-semibold text-neutral-500 dark:bg-neutral-800"
              >
                {a.name.split(" ").map((w) => w[0]).join("")}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-semibold leading-tight">{a.name}</p>
              <p className="text-sm text-neutral-500">
                {a.role}
                {a.facing ? " · talks to clients" : ""}
              </p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {a.does}
              </p>
              <p className="mt-2 border-l-2 border-neutral-300 pl-3 text-sm text-neutral-500 dark:border-neutral-700">
                <span className="font-medium">Will not: </span>
                {a.wont}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-16 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-800">
        <p>
          The one human is <strong>Elijah Purcell</strong>, who founded the company, does
          the building, and makes every decision the agents are not allowed to make:
          prices, what gets sent to a client, and what happens to money.
        </p>
      </div>
    </main>
    </>
  );
}
