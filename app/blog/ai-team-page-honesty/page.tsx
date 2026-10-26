import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/ai-team-page-honesty" },
  title: { absolute: "My team page lists fifteen people who do not exist, by Elijah Purcell" },
  description:
    "Why a company running AI agents should name them, say they are software in the first sentence, and never let one sign an email as a human. The disclosure rules I enforce in code.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "My team page lists fifteen people who do not exist", href: "/blog/ai-team-page-honesty" },
      ]} />}
      kicker="Opinion"
      title="My team page lists fifteen people who do not exist"
      meta="20 August 2026, 5 minute read"
    >
      <p>
        <Link href="/team">The team page</Link> has fifteen names on it.
        Audrey, Cecily, Delia, Greta, Henry, Ivor, Margot, Owen, Porter, Quentin, Rhett,
        Sable, Silas, Tobias, Wren. None of them is a person.
      </p>

      <p>
        The first sentence on that page says so. I wrote it that way so I could answer
        the phone without lying.
      </p>

      <h2>Why name them at all</h2>

      <p>
        The alternative is describing them as a system, which tells a client little.
        &quot;Automated proposal generation&quot; says nothing about what happens on a
        Tuesday. &quot;Quentin drafts the proposal, Cecily checks it for anything internal,
        and it does not leave the building until both have passed it&quot; tells you exactly
        what happens, and the names make the sequence legible.
      </p>

      <p>
        Naming them also makes the boundaries obvious. If Quentin drafts and Audrey
        audits and Audrey cannot change anything, that separation is easy to say and
        easy to check. It is a much harder sentence to write about &quot;the system.&quot;
      </p>

      <h2>Why the first sentence has to say what they are</h2>

      <p>
        First, someone will find out. With a roster of invented colleagues and stock
        photographs, a client will eventually ask to speak to Margot, and the lie ends
        there.
      </p>

      <p>
        Second, a one-person company with fifteen agents is unusual. Presenting them as
        staff hides the main fact about the company.
      </p>

      <h2>The rules, and where they live</h2>

      <p>
        There are three, and all three are enforced in code.
      </p>

      <p>
        <strong>Each agent signs with its own name.</strong> Every client-facing
        message goes out under the agent&apos;s own name with a line saying it is an automated
        agent and that a person will read a reply. The check runs at the single point where
        anything is recorded as sent, so there is no path around it.
      </p>

      <pre><code>{`DISCLOSURE = "An automated agent of Purcell Ventures LLC. " \\
             "Reply and a person will read it."`}</code></pre>

      <p>
        <strong>Internal notes never go to clients.</strong> The proposal agent
        once drafted twenty documents that all carried internal notes meant for me. None went out, because a separate agent whose only job
        is compliance reads everything at the choke point.
      </p>

      <p>
        <strong>The auditors cannot fix anything.</strong> The agents that inspect the
        live properties are read-only. Separating the finder from the fixer costs one
        design decision.{" "}
        <Link href="/blog/agents-that-cannot-fix-what-they-find">It also
        lets findings pile up unfixed</Link>.
      </p>

      <h2>What this costs</h2>

      <p>
        I lose some credibility. &quot;One person and fifteen scripts&quot; sounds smaller than
        &quot;our team,&quot; and some prospects would have been more impressed by the
        second sentence.
      </p>

      <p>
        I would rather have the prospects who are impressed by the first sentence. A client who learns
        the truth later will wonder what else I overstated.
      </p>

      <h2>If you are building something similar</h2>

      <p>
        Say what it is on the page where you say what it does. Put the disclosure inside
        the function that sends. If you write a sentence about your company that you would
        be uncomfortable having a client read back to you, that sentence is the problem.
      </p>

      <p>
        I wrote up the agents&apos; failures in{" "}
        <Link href="/blog/what-the-agents-get-wrong">what the agents get wrong</Link>.
      </p>

<PostByline post={{
            slug: "ai-team-page-honesty",
            title: "My team page lists fifteen people who do not exist",
            description: "Why a company running AI agents should name them, say they are software in the first sentence, and never let one sign as a human.",
            published: "2026-08-20",
          }} />


    </PostLayout>
  );
}
