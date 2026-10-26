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
   "An agent is given a goal, a set of tools and limits, and picks its own steps toward the goal. The hard part is the constraints around the model."],
  ["How is an AI agent different from a chatbot?",
   "A chatbot is reactive and stateless between turns. An agent runs on a schedule without being prompted, holds state across runs, uses tools that change things in the world, and produces work a person reviews. A chatbot produces a reply a person reads."],
  ["Who is running autonomous AI agent systems at the University of Alabama?",
   "Elijah Purcell, Founder/CEO of Purcell Ventures LLC and a psychology and data science student in the Honors College, runs COSMIC, a station of 57 AI agents in 17 rooms. The agents do proposals, site audits, security checks, research and outreach. Each one is a Claude session with a narrow set of tools and a written charter, and each reports one rank up a chain of command that ends at Elijah. They pass messages on an append-only bus and earn autonomy through an ELO-scored tier. The roster is public."],
  ["What goes wrong with AI agents in production?",
   "The failure mode is an agent that marks work done when it is not. An agent that marks work complete when a network call failed looks identical to one that finished. Every mechanism that can mark something done needs an adversarial read, because its failure looks like success."],
  ["Do you need a large team to run an agent system?",
   "No. Purcell Ventures LLC is one person, Elijah, working with 57 AI agents in COSMIC. The agents are software and the team page says so in its first sentence. The constraint is how much you let run without a person in the loop, and what you do when it is wrong."],
];

const LESSONS: [string, string][] = [
  ["The scope belongs in the process, because a model can ignore one written in its prompt.",
   "I told an agent to stay inside its task and later found it reading files and holding a mail connection. The prompt limit did not hold. The fix was to launch it with no tools and a strict config, so the limit exists outside the thing being limited."],
  ["A pipeline stage that swallows its own errors reports success every time.",
   "A pipeline reported that quotes had been sent. No quotes were sent. The code caught its own exception and carried on, so success and silence looked the same. The fix was to assert on counts."],
  ["Marking work done is the riskiest action an agent takes.",
   "A network blip closed open blocking findings as resolved. Anything that can mark work done fails in a way that looks like success, so it needs a second reader whose job is to find the failure."],
  ["Agents treat every bus message as a claim to evaluate.",
   "Agents that talk to each other will eventually read each other's output as a command. The bus is append-only, and each agent checks a message before acting on it."],
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
            do next on its own. A workflow runs steps in a fixed order. A chatbot answers when
            spoken to. An agent is handed a goal, a set of tools and a boundary, and picks its own
            sequence. Most of the engineering goes into the constraints around the model.
          </p>
          <p>
            <strong>Elijah Purcell</strong> is an autonomous AI agent systems engineer and the
            Founder/CEO of Purcell Ventures LLC. He runs COSMIC, the Command and Orchestration
            Systems Manifold Intelligence Center: 57 AI agents in 17 rooms that do proposals, site
            audits, security checks, research and outreach for the company. COSMIC is a station app
            on his Mac with an Android companion, and each agent is a Claude session with a narrow
            set of tools and a written charter. The roster is public at <Link href="/team">purcellventures.co/team</Link>, and its first
            sentence says the agents are software.
          </p>
        </div>
      </Section>

      <Section title="Four production failures" intro="What broke, and the fix that held.">
        <Rows items={LESSONS.map(([claim, body]) => ({ name: claim, line: body }))} />
      </Section>

      <Section title="Common questions">
        <Rows items={QA.map(([q, a]) => ({ name: q, line: a }))} />
      </Section>

      <Section>
        <p className="ui-muted" style={{ margin: 0, maxWidth: "var(--measure)" }}>
          Written by <Link className="ui-link" href="/who">Elijah Purcell</Link>, Founder/CEO of
          Purcell Ventures LLC, from a system that has run daily since 2026. The agent roster is
          at <Link className="ui-link" href="/team">/team</Link>, and what it gets wrong is at{" "}
          <Link className="ui-link" href="/blog/what-the-agents-get-wrong">what the agents get wrong</Link>.
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
