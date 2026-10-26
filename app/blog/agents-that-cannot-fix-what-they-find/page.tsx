import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  alternates: { canonical: "/blog/agents-that-cannot-fix-what-they-find" },
  title: { absolute: "I built agents that cannot fix what they find, by Elijah Purcell" },
  description:
    "I split the agent that finds problems from the one that fixes them. The split kept agents out of files they should not read. It also left every finding open forever until I built a way to close them.",
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
      <p>One of my agents can read every repository I own. It cannot change a single line of any of them. The separation is deliberate. One design decision created it and caused a failure I did not expect.</p>

      <h2>Agents get text and no tools</h2>

      <p>The first version of my reasoning layer passed the model a prompt describing exactly what it was allowed to look at. The prompt described the scope accurately, and nothing enforced it.</p>

      <p>I found out when an agent asked to draft a payment-chase email refused to write it. It read the client file, found no matching record, and objected. The objection was correct. It also proved that the scope in the prompt was only a request, because the process could open any file on the machine.</p>

      <p>Closing the filesystem was not enough either. Asked afterwards what it could still reach, the model listed email, calendar and drive, because removing built-in tools leaves externally configured servers inherited from the user&apos;s own config. An agent reasoning about a code repository must not be able to read your inbox.</p>

      <p>The fix was to hand the model nothing but text and no tools at all. The agent&apos;s own code passes in everything the model may see. That code already enforces the scope and is already tested. The model reasons over what it was given and cannot go looking.</p>

      <p><strong>Code enforces a scope. A prompt only asks the model to respect one.</strong></p>

      <h2>The failure this design creates</h2>

      <p>If the finder cannot fix, someone else has to, and that someone is a person. I built the finding half carefully and never built the closing half at all.</p>

      <p>So the ledger only ever grew. The auditor re-checked every property every morning, correctly refused to file duplicates, and had no way to record that anything had been resolved. If I had fixed a broken checkout, the finding describing it would have stayed open forever.</p>

      <p>The reporting agent, meanwhile, told me that zero findings had been resolved. That read as a bad statistic about follow-through. It was a hardcoded zero, because no code path could produce any other number. The report was correct and carried no information.</p>

      <h2>What closing has to mean</h2>

      <p>A finding is now resolved when a later audit looks for it and cannot reproduce it.</p>

      <p>&quot;Not observed&quot; means &quot;fixed&quot; only if the audit checked. A property dropped from the registry, or one whose check errored, is unaudited. Closing those would report a gap as a fix, which is worse than leaving them open, because the resolved count would then overstate the work done.</p>

      <p>So a run can close only findings it checked, and the test that matters most asserts that silence never closes an unaudited property.</p>

      <h2>The pattern underneath</h2>

      <p>Every one of these failures had the same shape: an empty result that reads as good news, with no exception raised. An auditor that finds nothing, a ledger with nothing resolved, a scan that returns zero rows.</p>

      <p><strong>I now write tests that assert on counts and values.</strong> A test that only proves the code did not crash would have passed on all of these.</p>

      <h2>Related reading</h2>

      <ul>
        <li><Link href="/blog/what-the-agents-get-wrong">The other four failures in the same system</Link></li>
        <li><Link href="/blog/ai-team-page-honesty">Why the team page says outright that they are software</Link></li>
      </ul>

<PostByline post={{
            slug: "agents-that-cannot-fix-what-they-find",
            title: "I built agents that cannot fix what they find",
            description: "I split the agent that finds problems from the one that fixes them. The split kept agents out of files they should not read. It also left every finding open forever until I built a way to close them.",
            published: "2026-08-17",
          }} />


    </PostLayout>
  );
}
