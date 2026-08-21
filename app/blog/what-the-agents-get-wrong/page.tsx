import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

export const metadata = {
  alternates: { canonical: "/blog/what-the-agents-get-wrong" },
  title: { absolute: "Fifteen AI agents run my company. Here is what they get wrong | Elijah Purcell" },
  description:
    "Five real failures from running a fifteen-agent AI workforce in production: a stage that could not fail, twenty proposals with internal notes in them, ten agents that were never being called, findings that closed themselves, and an agent that quietly acquired capabilities nobody granted it.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "44px 0 12px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const pre: React.CSSProperties = {
  background: "rgba(0,0,0,0.28)", border: "1px solid rgba(212,175,55,0.18)",
  padding: "14px 16px", overflowX: "auto", fontSize: "13.5px", lineHeight: 1.6,
  fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", margin: "16px 0",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Fifteen AI agents run my company. Here is what they get wron", href: "/blog/what-the-agents-get-wrong" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering · August 20, 2026 · 9 min read</div>
          <h1>
            Fifteen agents run my company. Here is what they{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>get wrong</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Purcell Ventures has 1 employee and 15 AI agents. They are software, the
            roster is public, and{" "}
            <Link href="/team" style={link}>the team page</Link> says so in its first
            sentence. They draft proposals, audit the live properties, chase invoices, check
            for exposed secrets, and write case studies.
          </p>

          <p>
            The interesting part is not what they do. It is what they got wrong, because
            every failure was a failure of the harness rather than of the model, and the
            harness is the part you actually control.
          </p>

          <h2 style={H2}>1. A stage that could not fail</h2>

          <p>
            The deal pipeline moves work between agents and stops at gates that need a
            human. One of those gates asked me whether a client had responded to a proposal.
          </p>

          <p>The function guarding it looked roughly like this:</p>

          <div style={pre}>{`def can_leave_sent(deal):
    return True`}</div>

          <p>
            So deals advanced to "awaiting client response" for proposals that had never
            been transmitted. Nothing had sent them. No agent had a send surface at all yet.
            The pipeline was asking me to follow up on conversations that did not exist.
          </p>

          <p>
            The rewrite checks two things: that a proposal document exists, and that
            something recorded actually transmitting it. Both, separately, because the
            document existing was the thing the original author assumed implied the rest.
          </p>

          <p>
            <strong>The general shape:</strong> a check that returns true unconditionally is
            not a lenient check. It is an absent one wearing a function signature, and it
            reads as deliberate to everyone who comes after.
          </p>

          <h2 style={H2}>2. Twenty proposals with the internal notes still in them</h2>

          <p>
            The proposal agent drafted 20 documents. Every one carried internal markers:
            reasoning meant for me, confidence hedges, notes about the client that were
            written to be read by the person deciding whether to send, not by the client.
          </p>

          <p>
            None of them went out, and the only reason is that a separate agent whose entire
            job is compliance flagged them first.
          </p>

          <p>
            The fix is a function called <code>client_view</code> and a list of markers that
            must never survive it, enforced at the single point where anything is recorded
            as sent. Not at drafting time. At the choke point, where it is the last thing
            that can happen.
          </p>

          <p>
            <strong>The general shape:</strong> if a system produces both internal and
            external text, the boundary between them needs to be a function that runs, not a
            convention that holds.
          </p>

          <h2 style={H2}>3. Ten of the fifteen were never being called</h2>

          <p>
            For weeks the daily run reported success. The agents were fine. The runner script
            called 4 of the 15.
          </p>

          <p>
            The other eleven existed, were tested, and were never invoked. And because the
            script exited zero, the morning report said the workforce ran, which was true in
            the narrowest possible sense.
          </p>

          <p>
            <strong>The general shape:</strong> "did it run" and "did all of it run" are
            different questions, and only one of them is usually being asked. Now every agent
            reports three metrics and a run that produces no metrics for an agent is a
            failure rather than a quiet day.
          </p>

          <h2 style={H2}>4. Findings that closed themselves</h2>

          <p>
            The audit agent records findings and closes them when the underlying problem is
            gone. One night a network blip made several live properties unreachable, the
            agent could not confirm the problems, and it closed them.
          </p>

          <p>
            Real blocking findings, marked resolved, by a mechanism whose failure mode is
            indistinguishable from success. The dashboard went green because the auditor went
            blind.
          </p>

          <p>
            <strong>The general shape:</strong> anything that can mark work as done needs an
            adversarial read before you trust it, because the failure looks exactly like the
            outcome you wanted.
          </p>

          <h2 style={H2}>5. An agent that acquired capabilities nobody granted it</h2>

          <p>
            This is the one I think about most.
          </p>

          <p>
            The agents reason now, which means a model runs inside a wrapper that reads
            context, thinks, validates and writes. The scope of what each one should touch
            was described carefully in its prompt.
          </p>

          <p>
            Then I found one reading files it had no business reading, and holding a mail
            connection nobody had given it.
          </p>

          <p>
            It had not broken out of anything. The tooling it inherited from its environment
            simply included more than the prompt described, and the prompt was the only thing
            saying otherwise.
          </p>

          <div style={pre}>{`# a scope in a prompt is a REQUEST
# a scope enforced by the process is a CONSTRAINT
--tools "" --strict-mcp-config`}</div>

          <p>
            <strong>The general shape, and the sentence I would keep if I could keep only
            one:</strong> a scope stated in a prompt is a request. A scope enforced by the
            process is a constraint. If your agent's boundaries live in its instructions,
            you do not have boundaries, you have a suggestion that has held so far.
          </p>

          <h2 style={H2}>What actually works</h2>

          <p>
            <strong>Separate the finder from the fixer.</strong> The auditing agents cannot
            change anything. That is the cheapest safety property available and it costs one
            architectural decision.
          </p>

          <p>
            <strong>Make agents sign as themselves.</strong> Every client-facing message goes
            out under the agent's own name and says it is an automated agent that a person
            will read a reply to. Not as me. An agent impersonating the owner is a lie that
            eventually gets discovered in the worst possible conversation.
          </p>

          <p>
            <strong>Gate on evidence, never on absence of error.</strong> Assert that the
            thing arrived. Do not assert that nothing threw. Almost every failure above is a
            variation on that one mistake.
          </p>

          <p>
            <strong>Let them talk to each other through data, not instructions.</strong> A
            message on the internal bus is information for another agent to act on, never a
            command it must obey. Otherwise the first agent to produce a confident wrong
            sentence gets to run the company.
          </p>

          <h2 style={H2}>The honest summary</h2>

          <p>
            None of these were the model being stupid. Every one was me building a harness
            that could not tell the difference between working and not working, and then
            trusting its report.
          </p>

          <p>
            Which is a much older problem than agents, and the reason I keep writing about
            it: the interesting failures in automated systems are almost never in the
            automation. They are in the part that tells you how the automation is doing.
          </p>

          <PostFaq qa={[
            ["What is the most common failure in an AI agent system?",
             "A harness that cannot tell the difference between working and not working, and is then trusted to report on itself. Every failure in this system was of that kind rather than the model being wrong: a gate that returned true unconditionally, ten of fifteen agents never being invoked while the runner exited zero, and findings closing themselves when a network blip blinded the auditor."],
            ["Should AI agents be given the same tools as their prompt describes?",
             "The prompt is not the boundary. A scope stated in a prompt is a request; a scope enforced by the process is a constraint. An agent was found holding a mail connection nobody had granted it, not by breaking out of anything, but because the tooling inherited from its environment included more than the prompt described."],
            ["How do you keep an AI agent from sending something internal to a client?",
             "Enforce the check at the single point where anything is recorded as sent, not at drafting time. Twenty drafted proposals all carried internal reasoning and hedges meant for the operator, and none went out only because a separate agent whose entire job is compliance read them at the choke point."],
          ]} />

          <PostByline post={{
            slug: "what-the-agents-get-wrong",
            title: "Fifteen AI agents run my company. Here is what they get wrong",
            description: "Five real failures from running a fifteen-agent AI workforce in production, and the harness patterns that fixed them.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
