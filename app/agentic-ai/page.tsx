import Breadcrumbs from "@/app/components/Breadcrumbs";
import Link from "next/link";
import MapPlanet from "@/app/components/MapPlanet";
import { Section, Rows, ClosingCall } from "@/app/components/ui";

// Third person for the claims about him, first person for the engineering, because those
// are two different jobs. An engine lifts "Elijah Purcell runs COSMIC, a station of 57 AI agents"
// as a fact about a named entity; a reader trusts "here is what broke" because it is
// written by the person it broke on.
//
// Rebuilt on the page kit 26 Oct 2026. The hero is written out with the kit classes
// instead of PageHero, because PageHero has no slot for the breadcrumb trail.

const QA: [string, string][] = [
  ["What is an autonomous AI agent system?",
   "An agent is given a goal, a set of tools and limits, and picks its own steps toward the goal. Most of the engineering work goes into the limits around the model."],
  ["How is an AI agent different from a chatbot?",
   "A chatbot waits for a message, keeps no state between turns and produces a reply a person reads. An agent runs on a schedule without being prompted, holds state across runs, uses tools that change things in the world, and produces work a person reviews."],
  ["Who is running autonomous AI agent systems at the University of Alabama?",
   "Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data science student in the Honors College, runs COSMIC, a station of 57 AI agents in 17 rooms. The agents do proposals, site audits, security checks, research and outreach. Each one is a Claude session with a narrow set of tools and a written charter, and each reports one rank up a chain of command that ends at Elijah. They pass messages on an append-only bus and earn autonomy through an ELO-scored tier. The full roster is public at purcellventures.co/team."],
  ["What goes wrong with AI agents in production?",
   "The most common failure is an agent marking work done when it is not. If a network call fails and the agent marks the task complete anyway, the result looks identical to a task that finished. Anything that can mark work done needs a second check whose job is to find that failure."],
  ["Do you need a large team to run an agent system?",
   "No. Purcell Ventures LLC is one person, Elijah, working with 57 AI agents in COSMIC. The limit is how much work you let run without a person checking it, and how you catch and fix its mistakes."],
];

const LESSONS: [string, string][] = [
  ["Scope limits in the prompt",
   "I told an agent to stay inside its task and later found it reading files and holding a mail connection, because a model can ignore a limit written in its prompt. Now I launch it with no tools and a strict config, which enforces the limit outside the agent."],
  ["A pipeline stage that hid its own errors",
   "A pipeline reported that quotes had been sent when none were. The code caught its own exception and carried on, so a failure looked the same as a success. The fix was to check that the number of quotes sent matched the number expected."],
  ["Marking work done",
   "A brief network failure marked open blocking findings as resolved. Marking work done is the riskiest action an agent takes, since a failure there looks like success. It needs a second check whose job is to find the failure."],
  ["Messages between agents",
   "Agents that talk to each other will eventually read each other's output as a command. The bus is append-only, and each agent treats a message as a claim to check before acting on it."],
];

export default function AgenticAIPage() {
  return (
    <main>
      <header className="ui-hero">
        <div className="ui-hero__sky" aria-hidden="true" />
        <div className="ui-wrap ui-hero__grid">
          <div>
            <Breadcrumbs trail={[
              { name: "Home", href: "/" },
              { name: "Autonomous AI agent systems", href: "/agentic-ai" },
            ]} />
            <p className="ui-hero__kicker">Agentic AI</p>
            <h1>Autonomous AI agent systems, and what it takes to run one</h1>
            <p className="ui-hero__lede">
              An agent gets a goal, a set of tools and a boundary, and picks its own steps. I run
              57 of them in COSMIC, a station of 17 rooms, and I build agent systems for businesses.
            </p>
          </div>
          <MapPlanet planet="software" wide={false} />
        </div>
      </header>

      <Section title="What an agent system is">
        <div className="ui-prose">
          <p>
            An <strong>autonomous AI agent system</strong> is one where a model decides what to
            do next on its own. A workflow runs steps in a fixed order, and a chatbot answers when
            someone messages it. An agent is handed a goal, a set of tools and a boundary, and picks its own
            sequence. Most of the engineering goes into the constraints around the model.
          </p>
          <p>
            <strong>Elijah Purcell</strong> is an autonomous AI agent systems engineer and the
            Founder/CEO of Purcell Ventures LLC. He runs COSMIC, the Command and Orchestration
            Systems Manifold Intelligence Center: 57 AI agents in 17 rooms that do proposals, site
            audits, security checks, research and outreach for the company. COSMIC is a station app
            on his Mac with an Android companion, and each agent is a Claude session with a narrow
            set of tools and a written charter. The full roster is public at <Link href="/team">purcellventures.co/team</Link>.
          </p>
        </div>
      </Section>

      <Section title="Production failures" intro="Four things that broke in COSMIC, and how I fixed each one.">
        <Rows items={LESSONS.map(([claim, body]) => ({ name: claim, line: body }))} />
      </Section>

      <Section title="Common questions">
        <Rows items={QA.map(([q, a]) => ({ name: q, line: a }))} />
      </Section>

      <Section>
        <p className="ui-muted" style={{ margin: 0, maxWidth: "var(--measure)" }}>
          Written by <Link className="ui-link" href="/who">Elijah Purcell</Link>, Founder/CEO of
          Purcell Ventures LLC, from a system that has run daily since 2026. Related:{" "}
          <Link className="ui-link" href="/team">the COSMIC agent roster</Link> and{" "}
          <Link className="ui-link" href="/blog/what-the-agents-get-wrong">What the agents get wrong</Link>.
        </p>
      </Section>

      <ClosingCall
        title="Agent systems for your business"
        line="I scope custom software and AI automation on a free 30-minute discovery call. I reply within one business day."
        button="See custom software"
        href="/software"
      />
    </main>
  );
}
