import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout, Note } from "@/app/components/ui";

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Why some small business AI tools waste your money", href: "/blog/why-most-ai-tools-waste-money" },
      ]} />}
      kicker="Opinion"
      title="Why some small business AI tools waste your money"
      lede="Many AI tools sold to small businesses fail because the workflow they attach to was already broken. Three questions help you check yours before you buy."
      meta="24 May 2026, 5 minute read"
    >
      <p>
        Picture a plumber paying $400 a month for an &quot;AI receptionist&quot; that answers
        after-hours calls and books appointments. The AI can do its job and still fail him if
        his calendar is not connected to anything, his quotes take 20 minutes a call, and
        nobody follows up on the leads it captures.
      </p>
      <p>
        This is the AI failure I see most often: the tool works, and the business has no
        process ready to use what it produces.
      </p>

      <h2>The question to ask before any AI purchase</h2>
      <p>
        Before you buy an AI tool, answer this: <em>if I had a human assistant doing this
        exact task for free, would my business improve?</em>
      </p>
      <p>
        If the answer is no, labor is not your bottleneck. If the problem is deciding what
        to do with the output, AI will not fix it.
      </p>

      <h2>What AI does well</h2>
      <p>
        AI mostly does two things well: <strong>generating drafts</strong> (writing,
        summaries, structured outputs) and <strong>pattern matching at scale</strong>
        (categorizing, ranking, surfacing). In both cases it produces a first version that a
        person then finishes.
      </p>
      <p>
        It does not make reliable business decisions. It can give answers that sound sure
        and are wrong. Be skeptical of anyone selling &quot;AI that makes decisions&quot; to a small
        business.
      </p>

      <h2>Three questions to ask before you buy</h2>
      <ol>
        <li><strong>Is time the bottleneck?</strong> If you say yes, name the specific hours per week the tool saves. If you can&apos;t name the hours, you do not have a bottleneck yet.</li>
        <li><strong>Where do the AI&apos;s outputs go?</strong> If the answer is &quot;into another tool I haven&apos;t set up yet,&quot; pause. Fix the downstream tool first, then add AI.</li>
        <li><strong>Who reviews the outputs?</strong> AI drafts need a person to check facts, brand voice and edge cases. Without a named reviewer, you risk publishing an error.</li>
      </ol>

      <h2>How I set up the AI tools I sell</h2>
      <p>
        My <Link href="/digital">Digital Services subscription</Link> includes AI tools: a
        chatbot, a content generator and an FAQ builder. When I set them up, I connect each
        one to where its output goes. The chatbot connects to your booking system, the
        content generator publishes to your blog, and the FAQ builder writes to your live
        site.
      </p>
      <p>
        Each tool is useful because of those connections. Without them, it would produce
        drafts that nobody uses.
      </p>

      <h2>If you are shopping for AI right now</h2>
      <p>
        Take the free <Link href="/ai-readiness">AI Readiness Test</Link> first. It has ten
        questions and does not ask for your email. It scores how ready your business is for
        AI.
      </p>
      <p>
        If your workflow is ready, <Link href="/contact">contact me</Link>.
      </p>

      <h2>Related reading</h2>
      <ul>
        <li><Link href="/blog/what-the-agents-get-wrong">What fifteen agents in production get wrong</Link></li>
        <li><Link href="/blog/can-ai-find-your-business">Whether an AI assistant can find your business</Link></li>
      </ul>

      <Note>
        I drafted this post with <Link href="/digital/tools/content-generator">AI tools</Link> and
        edited it before publishing.
      </Note>

      <PostByline post={{
        slug: "why-most-ai-tools-waste-money",
        title: "Why some small business AI tools waste your money, by Elijah Purcell",
        description: "Many AI tools sold to small businesses fail because the workflow they attach to was already broken. Three questions help you check yours before you buy.",
        published: "2026-05-24",
      }} />
    </PostLayout>
  );
}
