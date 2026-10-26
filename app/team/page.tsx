import Image from "next/image";
import { PageHero, Section, Prose } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/team" },
  title: "The team: Elijah Purcell and fifteen AI agents",
  description:
    "Purcell Ventures runs on one person and fifteen AI agents. This page lists every agent, what it does, and what it is not allowed to do.",
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
    does: "Collects what every other agent found and ranks it by urgency.",
    wont: "Decide anything. She reports and Elijah decides." },
  { key: "quentin", name: "Quentin Quill", role: "Proposals", facing: true,
    does: "Writes the proposal, prices every line off the rate card, and states the assumptions out loud so scope cannot creep quietly.",
    wont: "Invent a price. If a scope has no rate on the card, it refuses to quote it." },
  { key: "ivor", name: "Ivor Ingram", role: "Invoice Chaser", facing: true,
    does: "Finds delivered work that was never billed and drafts the invoice.",
    wont: "Invoice an amount the client did not agree to." },
  { key: "owen", name: "Owen Oakes", role: "Client Onboarding", facing: true,
    does: "Turns a signed scope into a checklist, built only from what the client agreed to.",
    wont: "Start onboarding before the invoice goes out." },
  { key: "audrey", name: "Audrey Ashford", role: "Activation Auditor",
    does: "Visits every live property as a stranger would and reports whether a visitor can buy or get in touch.",
    wont: "Pass a page because it loads. A price with no way to pay it gets logged as a finding." },
  { key: "cecily", name: "Cecily Cross", role: "Compliance and Secrets",
    does: "Scans every repository for credentials that should not be in it, and re-checks the ones already flagged.",
    wont: "Close a finding because a scan failed to reach the thing it was checking." },
  { key: "porter", name: "Porter Prewitt", role: "Prospector, Services",
    does: "Qualifies local businesses that need a website and hands them to the pipeline.",
    wont: "Contact anyone on the do-not-contact list, or qualify a national chain as a local business." },
  { key: "delia", name: "Delia Dunmore", role: "Prospector, Real Estate",
    does: "Matches property inventory against buyers' stated criteria.",
    wont: "Invent a buyer's criteria. An empty buy-box is reported as empty." },
  { key: "rhett", name: "Rhett Ramsey", role: "Deal Sourcing",
    does: "Assembles deal packets from public records, facts only.",
    wont: "Contact a homeowner, or draw a conclusion about anybody's circumstances." },
  { key: "greta", name: "Greta Glennon", role: "Grants and Scholarships",
    does: "Tracks which awards the company is eligible for and when each one closes.",
    wont: "Count an award from a school Elijah does not attend." },
  { key: "tobias", name: "Tobias Thorne", role: "Tax and Ledger",
    does: "Keeps the books and flags anything that looks commingled.",
    wont: "Categorise a transaction it cannot read. It leaves those uncategorised." },
  { key: "silas", name: "Silas Sutton", role: "Case Studies",
    does: "Writes up finished work, using only claims backed by evidence.",
    wont: "Fill in a result nobody measured. It leaves those fields blank." },
  { key: "wren", name: "Wren Waverly", role: "Content, Purcell Ventures",
    does: "Drafts posts about what the company did this week.",
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
      <main>
        <PageHero
          planet="consulting"
          kicker="Purcell Ventures LLC"
          title="One person and fifteen AI agents"
          lede={<><strong>Everyone below is an AI agent.</strong> They have names and faces because it is easier to ask what Quentin is doing than what the proposal subsystem is doing, and because an agent that signs its own name can be held to what it said.</>}
        />

        <Section title="How the agents work">
          <Prose>
            <p>
              Each one runs on a schedule, does a narrow job, and writes down what it found. Each agent also has a list of things it may not do. Elijah set those limits so no agent can invent a price, close its own findings, or send mail as a person.
            </p>
            <p>
              Anything one of them sends you says so in the signature, and a person reads the replies.
            </p>
          </Prose>
        </Section>

        <Section title="The roster" intro="Four of them talk to clients. The rest work inside the company.">
          <div className="ui-entries">
            {TEAM.map((a) => (
              <article className="ui-entry" key={a.key} style={{ gridTemplateColumns: "64px minmax(0, 1fr)", columnGap: 18 }}>
                {HAS_PHOTO.has(a.key) ? (
                  <Image
                    src={`/team/${a.key}-square.png`}
                    alt=""
                    width={64}
                    height={64}
                    style={{ width: 64, height: 64, objectFit: "cover" }}
                  />
                ) : (
                  // Sable and Henry have no headshot yet. A monogram is a cosmetic gap; a
                  // broken <Image> is a broken page.
                  <div
                    aria-hidden
                    style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-2)", color: "var(--muted)", fontFamily: "var(--font-display)", fontSize: 20 }}
                  >
                    {a.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                )}
                <div>
                  <h3>{a.name}</h3>
                  <p className="ui-entry__org">{a.role}{a.facing ? ", talks to clients" : ""}</p>
                  <p style={{ margin: "10px 0 0", color: "var(--fg-2)" }}>{a.does}</p>
                  <p className="ui-muted" style={{ margin: "8px 0 0" }}>Will not: {a.wont}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section title="The one human">
          <Prose>
            <p>
              <strong>Elijah Purcell</strong>, Founder/CEO, founded the company, does the building, and makes every decision the agents are not allowed to make: prices, what gets sent to a client, and what happens to money.
            </p>
          </Prose>
        </Section>
      </main>
    </>
  );
}
