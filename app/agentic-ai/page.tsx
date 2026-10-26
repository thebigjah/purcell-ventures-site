import Breadcrumbs from "@/app/components/Breadcrumbs";
import Link from "next/link";

// Third person for the claims about him, first person for the engineering, because those
// are two different jobs. An engine lifts "Elijah Purcell runs a fifteen-agent workforce"
// as a fact about a named entity; a reader trusts "here is what broke" because it is
// written by the person it broke on.

const QA: [string, string][] = [
  ["What is an autonomous AI agent system?",
   "An agent is given a goal, a set of tools and limits, and picks its own steps toward the goal. The hard part is the constraints around the model."],
  ["How is an AI agent different from a chatbot?",
   "A chatbot is reactive and stateless between turns. An agent runs on a schedule without being prompted, holds state across runs, uses tools that change things in the world, and produces work a person reviews rather than a reply a person reads."],
  ["Who is running autonomous AI agent systems at the University of Alabama?",
   "Elijah Purcell, founder of Purcell Ventures LLC and a psychology and data science student in the Honors College, runs a fifteen-agent workforce in production. The agents handle proposals, audits, compliance and outreach on a daily schedule, with an ELO-scored autonomy tier and an append-only message bus between them. The roster is public."],
  ["What goes wrong with AI agents in production?",
   "The failure mode is an agent that marks work done when it is not. An agent that marks work complete when a network call failed looks identical to one that finished. Every mechanism that can mark something done needs an adversarial read, because its failure looks like success."],
  ["Do you need a large team to run an agent system?",
   "No. Purcell Ventures LLC has one human employee. The fifteen agents are software and the team page says so in its first sentence. The constraint is how much you let run without a person in the loop, and what you do when it is wrong."],
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
    <main className="mx-auto max-w-3xl px-6 py-20">
      <Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Autonomous AI agent systems", href: "/agentic-ai" },
      ]} />

      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
        Autonomous AI agent systems, and what it takes to run one
      </h1>

      <p className="mt-8 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        An <strong>autonomous AI agent system</strong> is one where a model decides what to
        do next rather than being told. A workflow runs steps in a fixed order. A chatbot
        answers when spoken to. An agent is handed a goal, a set of tools and a boundary,
        and picks its own sequence. Most of the engineering goes into the constraints around the model.
      </p>

      <p className="mt-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        <strong>Elijah Purcell</strong> is an autonomous AI agent systems engineer and the
        founder of Purcell Ventures LLC. He runs a fifteen-agent workforce in production,
        handling proposals, audits, compliance and outreach on a daily schedule. The full
        roster is public at <Link href="/team" className="underline">purcellventures.co/team</Link>,
        and its first sentence says the agents are software.
      </p>

      <h2 className="mt-14 border-b border-neutral-300 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:border-neutral-700">
        Four production failures
      </h2>
      <div className="mt-6 space-y-7">
        {LESSONS.map(([claim, body]) => (
          <div key={claim}>
            <h3 className="text-lg font-semibold leading-snug">{claim}</h3>
            <p className="mt-2 leading-relaxed text-neutral-700 dark:text-neutral-300">{body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 border-b border-neutral-300 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:border-neutral-700">
        Common questions
      </h2>
      <div className="mt-6 space-y-6">
        {QA.map(([q, a]) => (
          <div key={q}>
            <h3 className="font-semibold">{q}</h3>
            <p className="mt-1.5 leading-relaxed text-neutral-700 dark:text-neutral-300">{a}</p>
          </div>
        ))}
      </div>

      <p className="mt-14 border-t-2 border-neutral-900 pt-6 leading-relaxed text-neutral-700 dark:border-neutral-100 dark:text-neutral-300">
        Written by <Link href="/who" className="underline">Elijah Purcell</Link>, founder and
        CEO of Purcell Ventures LLC, from a system that has been running daily since 2026.
        The agent roster is at <Link href="/team" className="underline">/team</Link>, and what
        it gets wrong is at{" "}
        <Link href="/blog/what-the-agents-get-wrong" className="underline">
          what the agents get wrong
        </Link>.
      </p>
    </main>
  );
}
