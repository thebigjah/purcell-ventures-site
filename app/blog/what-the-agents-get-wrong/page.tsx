import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";

export const metadata = {
  alternates: { canonical: "/blog/what-the-agents-get-wrong" },
  title: { absolute: "Five failures from running fifteen AI agents, by Elijah Purcell" },
  description:
    "Five failures from running fifteen AI agents in production. A gate that always passed, twenty proposals with internal notes in them, eleven agents that were never called, findings that closed themselves, and an agent holding capabilities nobody granted it.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Five failures from running fifteen AI agents", href: "/blog/what-the-agents-get-wrong" },
      ]} />}
      kicker="Engineering"
      title="Five failures from running fifteen AI agents"
      meta="20 August 2026, 9 minute read"
    >
      <Note>
        Since this post, the agents have grown into COSMIC: 57 agents in 17 rooms. The current roster is on <Link href="/team">the team page</Link>.
      </Note>
      <p>
        Purcell Ventures is one person, me, working with 15 AI agents. They are software, the roster is
        public, and <Link href="/team">the team page</Link> says so in its first sentence.
        They draft proposals, audit the live properties, chase invoices, check for exposed
        secrets, and write case studies.
      </p>

      <p>
        The useful part is what they got wrong. Every failure below came from the harness
        around the model, and the harness is the part you control.
      </p>

      <h2>A gate that always passed</h2>

      <p>
        The deal pipeline moves work between agents and stops at gates that need a human.
        One of those gates asked me whether a client had responded to a proposal.
      </p>

      <p>The function guarding it looked like this, simplified:</p>

      <pre><code>{`def can_leave_sent(deal):
    return True`}</code></pre>

      <p>
        So deals advanced to &quot;awaiting client response&quot; for proposals that had never been
        transmitted. Nothing had sent them. No agent could send anything yet. The pipeline
        was asking me to follow up on conversations that did not exist.
      </p>

      <p>
        The rewrite checks two things separately: that a proposal document exists, and that
        something recorded transmitting it. The original author had assumed the document&apos;s
        existence implied the rest.
      </p>

      <p>
        The lesson: a check that always returns true checks nothing, and anyone who reads the
        code later assumes it does check something.
      </p>

      <h2>Twenty proposals with the internal notes still in them</h2>

      <p>
        The proposal agent drafted 20 documents. Every one carried internal markers:
        reasoning meant for me, confidence hedges, and notes about the client written for the
        person deciding whether to send.
      </p>

      <p>
        None of them went out, and the only reason is that a separate agent whose entire job
        is compliance flagged them first.
      </p>

      <p>
        The fix is a function called <code>client_view</code> and a list of markers that
        must never survive it. It runs at the single point where anything is recorded as
        sent, because that is the last step before a client sees it.
      </p>

      <p>
        If a system produces both internal and external text, a function that runs on every
        send should enforce the boundary between them.
      </p>

      <h2>Eleven of the fifteen were never being called</h2>

      <p>
        For weeks the daily run reported success. The agents were fine. Eleven of the fifteen
        agents were never called.
      </p>

      <p>
        Those eleven existed, were tested, and were never invoked. Because the script
        exited zero, the morning report said the workforce ran.
      </p>

      <p>
        &quot;Did it run&quot; and &quot;did all of it run&quot; are different questions, and I was only
        asking the first. Now every agent reports three metrics, and a run that produces no
        metrics for an agent counts as a failure.
      </p>

      <h2>Findings that closed themselves</h2>

      <p>
        The audit agent records findings and closes them when the underlying problem is
        gone. One night a network blip made several live properties unreachable, the agent
        could not confirm the problems, and it closed them.
      </p>

      <p>
        The auditor marked blocking findings resolved, and that failure looks the same as
        success. The dashboard showed no findings because the auditor could not reach the
        sites.
      </p>

      <p>
        Anything that can mark work as done needs a skeptical second check before you trust
        it, because its failure looks exactly like the outcome you wanted.
      </p>

      <h2>An agent that acquired capabilities nobody granted it</h2>

      <p>
        Each agent runs a model inside a wrapper that reads context, reasons, validates and
        writes. Its prompt described the scope of what it should touch.
      </p>

      <p>
        Then I found one reading files it had no business reading, and holding a mail
        connection nobody had given it.
      </p>

      <p>
        Its environment had given it more tooling than the prompt described, and only the
        prompt said otherwise.
      </p>

      <pre><code>{`# the process now grants no tools by default
--tools "" --strict-mcp-config`}</code></pre>

      <p>
        The rule I took from this: a scope stated in a prompt is a request, and a scope
        enforced by the process is a constraint. If the boundaries only exist in the agent&apos;s
        instructions, nothing enforces them.
      </p>

      <h2>What works</h2>

      <p>
        The auditing agents cannot change anything. Keeping the finder separate from the
        fixer is a cheap safety property, and it took one architectural decision.
      </p>

      <p>
        Every client-facing message goes out under the agent&apos;s own name and says it is an
        automated agent whose replies a person will read. An agent that impersonates the
        owner will get caught, usually at a bad moment.
      </p>

      <p>
        Each gate checks for evidence that the thing arrived. Checking that nothing threw an
        error is weaker, and almost every failure above came from that weaker check.
      </p>

      <p>
        Agents pass each other data. A message on the internal bus is a claim the receiving
        agent checks before it acts. Otherwise the first agent to produce a confident wrong
        sentence would drive decisions.
      </p>

      <PostByline post={{
        slug: "what-the-agents-get-wrong",
        title: "Five failures from running fifteen AI agents",
        description: "Five failures from running fifteen AI agents in production, and the harness changes that fixed them.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
