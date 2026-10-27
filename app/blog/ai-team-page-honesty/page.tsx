import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/ai-team-page-honesty" },
  title: { absolute: "My team page lists fifteen people who do not exist" },
  description:
    "Why a company running AI agents should name them, say they are software in the first sentence, and never let one sign an email as a human, with the disclosure rules I enforce in code.",
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
      <Note>
        Since this post, the agents have grown into COSMIC: 57 agents in 17 rooms. The current roster is on <Link href="/team">the team page</Link>.
      </Note>
      <p>
        <Link href="/team">The team page</Link> lists fifteen names (Audrey, Cecily,
        Delia, Greta, Henry, Ivor, Margot, Owen, Porter, Quentin, Rhett, Sable, Silas,
        Tobias and Wren), and all fifteen are AI agents.
      </p>

      <p>
        The first sentence on that page says they are software, so when a client calls
        and asks who Margot is, I can tell the truth.
      </p>

      <h2>Why the agents have names</h2>

      <p>
        The alternative is describing them as a system, which tells a client little.
        &quot;Automated proposal generation&quot; says nothing about what happens on a
        Tuesday. &quot;Quentin drafts the proposal, Cecily checks it for anything internal,
        and it does not leave the building until both have passed it&quot; tells you exactly
        what happens, and the names make the order easy to follow.
      </p>

      <p>
        Naming them also makes the boundaries obvious. If Quentin drafts and Audrey
        audits and Audrey cannot change anything, that separation is easy to say and
        easy to check. Both are harder when everything is called &quot;the system.&quot;
      </p>

      <h2>Why the first sentence has to say what they are</h2>

      <p>
        First, clients find out. If the page showed invented colleagues with stock
        photographs, a client would eventually ask to speak to Margot, and I would have
        to admit she does not exist.
      </p>

      <p>
        Second, a one-person company with fifteen agents is unusual, and presenting them
        as staff would hide the most unusual fact about how the company works.
      </p>

      <h2>The three disclosure rules</h2>

      <p>
        All three are enforced in code.
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
        live properties are read-only. Keeping the agents that find problems apart from
        the ones that fix them took one design decision, and{" "}
        <Link href="/blog/agents-that-cannot-fix-what-they-find">it also
        let findings pile up unfixed</Link>.
      </p>

      <h2>What this costs</h2>

      <p>
        It costs me some credibility. &quot;One person and fifteen scripts&quot; sounds
        smaller than &quot;our team,&quot; and some prospects would have been more
        impressed by the second phrase.
      </p>

      <p>
        I would rather work with the prospects who are fine with the first one, because a
        client who learns the truth later will wonder what else I overstated.
      </p>

      <h2>If you are building something similar</h2>

      <p>
        Say what it is on the page where you say what it does. Put the disclosure inside
        the function that sends. If you would be uncomfortable having a client read a
        sentence about your company back to you, rewrite it.
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
