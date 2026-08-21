import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/ai-team-page-honesty" },
  title: { absolute: "My team page lists fifteen people who do not exist | Elijah Purcell" },
  description:
    "Why a company running AI agents should name them, say they are software in the first sentence, and never let one sign an email as a human. The disclosure rules I enforce in code rather than in policy.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
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
          { name: "My team page lists fifteen people who do not exist", href: "/blog/ai-team-page-honesty" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Opinion · August 20, 2026 · 5 min read</div>
          <h1>
            My team page lists fifteen people who{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>do not exist</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            <Link href="/team" style={link}>The team page</Link> has fifteen names on it.
            Audrey, Cecily, Delia, Greta, Henry, Ivor, Margot, Owen, Porter, Quentin, Rhett,
            Sable, Silas, Tobias, Wren. None of them is a person.
          </p>

          <p>
            The first sentence on that page says so. That was not a legal decision, it was
            the only version I could publish and still be able to answer the phone honestly.
          </p>

          <h2 style={H2}>Why name them at all</h2>

          <p>
            The alternative is describing them as a system, which is accurate and useless.
            "Automated proposal generation" tells you nothing about what happens on a
            Tuesday. "Quentin drafts the proposal, Cecily checks it for anything internal,
            and it does not leave the building until both have passed it" tells you exactly
            what happens, and the names are what make the sequence legible.
          </p>

          <p>
            Naming them also makes the boundaries obvious. If Quentin drafts and Audrey
            audits and Audrey cannot change anything, that separation is easy to say and
            easy to check. It is a much harder sentence to write about "the system."
          </p>

          <h2 style={H2}>Why the first sentence has to say what they are</h2>

          <p>
            Because somebody will find out. A roster of invented colleagues with stock
            photographs is a lie with a discovery date, and the discovery happens in the
            worst available conversation: a client asking to speak to Margot.
          </p>

          <p>
            There is a second reason that matters more. A one-person company with fifteen
            agents is genuinely unusual and genuinely interesting. Presenting them as staff
            converts the most distinctive true thing about the business into an ordinary lie.
            It is a bad trade even for someone with no scruples about it.
          </p>

          <h2 style={H2}>The rules, and where they live</h2>

          <p>
            Three of them, and all three are enforced in code rather than written in a policy
            document, because a policy is a request and a function is a constraint.
          </p>

          <p>
            <strong>An agent signs as itself, never as me.</strong> Every client-facing
            message goes out under the agent's own name with a line saying it is an automated
            agent and that a person will read a reply. Enforced at the single point where
            anything is recorded as sent, so there is no path around it.
          </p>

          <div style={pre}>{`DISCLOSURE = "An automated agent of Purcell Ventures LLC. " \\
             "Reply and a person will read it."`}</div>

          <p>
            <strong>Internal reasoning never leaves the building.</strong> The proposal agent
            once drafted twenty documents that all carried internal notes, hedges and
            commentary meant for me. None went out, because a separate agent whose only job
            is compliance reads everything at the choke point.
          </p>

          <p>
            <strong>The auditors cannot fix anything.</strong> The agents that inspect the
            live properties are read-only. Separating the finder from the fixer is the
            cheapest safety property available and it costs one architectural decision.{" "}
            <Link href="/blog/agents-that-cannot-fix-what-they-find" style={link}>It also
            creates a failure mode nobody warns you about</Link>.
          </p>

          <h2 style={H2}>What this costs</h2>

          <p>
            Honestly, some credibility. "One person and fifteen scripts" sounds smaller than
            "our team," and there are prospects who would have been more impressed by the
            second sentence.
          </p>

          <p>
            I would rather have the ones who are impressed by the first. A client who
            discovers the truth later becomes a client who wonders what else was presented
            optimistically, and there is no version of that conversation that ends well.
          </p>

          <h2 style={H2}>If you are building something similar</h2>

          <p>
            Say what it is on the page where you say what it does. Put the disclosure inside
            the function that sends, not inside a document that describes what should happen.
            And if you find yourself writing a sentence about your company that you would be
            uncomfortable having a client read back to you, that sentence is the problem, not
            their reaction to it.
          </p>

          <p>
            What the agents actually get wrong, at length, is{" "}
            <Link href="/blog/what-the-agents-get-wrong" style={link}>here</Link>.
          </p>

          <PostFaq qa={[
            ["Should a company disclose that its team members are AI agents?",
             "Yes, and on the page where they are named rather than in a footnote. A roster of invented colleagues is a lie with a discovery date, and the discovery arrives in the worst available conversation, which is a client asking to speak to one of them. There is also a commercial argument: a one-person company running fifteen agents is genuinely unusual, and presenting them as staff converts the most distinctive true thing about the business into an ordinary lie."],
            ["Should AI agents sign emails with a human name?",
             "No. An agent should sign as itself and state that it is automated, with a line telling the recipient that a person will read a reply. Enforcing that at the single point where a message is recorded as sent, rather than in a policy document, is the difference between a rule and a request."],
            ["Why separate the AI agents that find problems from the ones that fix them?",
             "Because it is the cheapest safety property available and it costs one architectural decision. An agent that can only report cannot cause the failure it was inspecting for. It does introduce its own failure mode, which is findings that pile up unfixed, and that is worth knowing before adopting the pattern."],
          ]} />

          <PostByline post={{
            slug: "ai-team-page-honesty",
            title: "My team page lists fifteen people who do not exist",
            description: "Why a company running AI agents should name them, say they are software in the first sentence, and never let one sign as a human.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
