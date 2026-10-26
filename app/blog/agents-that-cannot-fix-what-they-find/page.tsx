import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/agents-that-cannot-fix-what-they-find" },
  title: { absolute: "I built agents that cannot fix what they find, by Elijah Purcell" },
  description:
    "I split the agent that finds problems from the one that fixes them. That kept agents out of files they should not read, and it left every finding open until I built a way to close them.",
};


export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "I built agents that cannot fix what they find", href: "/blog/agents-that-cannot-fix-what-they-find" },
      ]} />}
      kicker="Engineering"
      title="I built agents that cannot fix what they find"
      meta="17 August 2026, 4 minute read"
    >
      <Note>
        Since this post, the agents have grown into COSMIC: 57 agents in 17 rooms. The current roster is on <Link href="/team">the team page</Link>.
      </Note>
      <p>One of my agents can read every repository I own and cannot change a line in any of them. I set it up that way on purpose, and that decision caused a failure I did not expect.</p>

      <h2>Agents get text and no tools</h2>

      <p>The first version of my reasoning layer passed the model a prompt describing exactly what it was allowed to look at. The prompt described the scope accurately, and nothing enforced it.</p>

      <p>I found out when an agent asked to draft a payment-chase email refused to write it. It read the client file, found no matching record, and objected. The objection was correct, but it also showed that the scope in the prompt was only a request, because the process could open any file on the machine.</p>

      <p>Closing the filesystem was not enough either. Asked afterwards what it could still reach, the model listed email, calendar and drive, because removing built-in tools leaves externally configured servers inherited from the user&apos;s own config. An agent working on a code repository could still read my inbox.</p>

      <p>The fix was to hand the model nothing but text and no tools at all. The agent&apos;s own code passes in everything the model may see. That code already enforces the scope and is already tested. The model reasons over what it was given and cannot go looking.</p>

      <h2>The failure this design caused</h2>

      <p>If the agent that finds a problem cannot fix it, a person has to, and the system needs a way to record the fix. I built the finding half carefully and never built the closing half.</p>

      <p>So the ledger only ever grew. The auditor re-checked every property every morning, correctly refused to file duplicates, and had no way to record that anything had been resolved. If I had fixed a broken checkout, the finding describing it would have stayed open forever.</p>

      <p>The reporting agent, meanwhile, told me that zero findings had been resolved. I took that as a sign I was not following through. It was a hardcoded zero, because no code path could produce any other number, so the report was accurate and told me nothing.</p>

      <h2>When a finding counts as resolved</h2>

      <p>A finding is now resolved when a later audit looks for it and cannot reproduce it.</p>

      <p>&quot;Not observed&quot; means &quot;fixed&quot; only if the audit checked. A property dropped from the registry, or one whose check errored, is unaudited. Closing those would report a gap as a fix, which is worse than leaving them open, because the resolved count would then overstate the work done.</p>

      <p>So a run can close only findings it checked, and the test that matters most asserts that silence never closes an unaudited property.</p>

      <h2>What these failures had in common</h2>

      <p>Each of these failures returned an empty result without raising an error, and each empty result looked like good news. A ledger with nothing resolved looks like a quiet week, and a scan that returns zero rows looks like a clean one.</p>

      <p><strong>I now write tests that assert on counts and values.</strong> A test that only proves the code did not crash would have passed on all of these.</p>

      <h2>Related reading</h2>

      <ul>
        <li><Link href="/blog/what-the-agents-get-wrong">The other four failures in the same system</Link></li>
        <li><Link href="/blog/ai-team-page-honesty">Why the team page says outright that they are software</Link></li>
      </ul>

<PostByline post={{
            slug: "agents-that-cannot-fix-what-they-find",
            title: "I built agents that cannot fix what they find",
            description: "I split the agent that finds problems from the one that fixes them. That kept agents out of files they should not read, and it left every finding open until I built a way to close them.",
            published: "2026-08-17",
          }} />


    </PostLayout>
  );
}
