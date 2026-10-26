"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "Why some small business AI tools waste your money", href: "/blog/why-most-ai-tools-waste-money" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Opinion, May 24, 2026, 5 min read</div>
          <h1>Why some small business AI tools waste your money</h1>
          <p className="deck">
            Many AI tools sold to small businesses fail because the workflow they attach to was already broken. Three questions help you check yours before you buy.
          </p>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--color-warm-text)" }}>
          <p>
            A plumber I know bought an &quot;AI receptionist&quot; for $400/month. It was supposed to answer his after-hours calls and book appointments. Six months in, he canceled it. The AI worked fine. The problem was that his calendar wasn&apos;t connected to anything, his quote process took 20 minutes per call, and he had no way to follow up on the leads the AI captured.
          </p>
          <p>
            This is the AI failure I see most often. In these cases the tool worked and the purchase was the mistake.
          </p>

          <h2 style={h2}>The question to ask before any AI purchase</h2>
          <p>
            Before you buy an AI tool, answer this: <em>if I had a human assistant doing this exact task for free, would my business improve?</em>
          </p>
          <p>
            If the answer is no, labor is not your bottleneck. If the problem is deciding what to do with the output, AI will not fix it.
          </p>

          <h2 style={h2}>What AI does well</h2>
          <p>
            Two things, mostly: <strong>generating drafts</strong> (writing, summaries, structured outputs) and <strong>pattern matching at scale</strong> (categorizing, ranking, surfacing). It produces a first version that a person then finishes.
          </p>
          <p>
            It does not make reliable business decisions. It can give answers that sound sure and are wrong. Be skeptical of anyone selling &quot;AI that makes decisions&quot; to a small business.
          </p>

          <h2 style={h2}>The three questions before you buy anything</h2>
          <p><strong>One: is time the bottleneck?</strong> If you say yes, name the specific hours-per-week the tool saves. If you can&apos;t name the hours, you do not have a bottleneck yet.</p>
          <p><strong>Two: where do the AI&apos;s outputs go?</strong> If the answer is &quot;into another tool I haven&apos;t set up yet,&quot; pause. Fix the downstream tool first, then add AI.</p>
          <p><strong>Three: who reviews the outputs?</strong> AI drafts need a person to check facts, brand voice and edge cases. Without a named reviewer, you risk publishing an error.</p>

          <h2 style={h2}>What I sell, and why</h2>
          <p>
            My <Link href="/digital" style={{ color: "var(--color-warm-accent)" }}>Digital Services subscription</Link> includes AI tools: a chatbot, a content generator and an FAQ builder. When I set them up, I connect each one to where its output goes. The chatbot connects to your booking system, the content generator publishes to your blog, and the FAQ builder writes to your live site.
          </p>
          <p>
            This works because each tool sits inside a workflow I built around it. Without that workflow, you are paying for a text-completion box.
          </p>

          <h2 style={h2}>If you&apos;re shopping AI right now</h2>
          <p>
            Take the free <Link href="/ai-readiness" style={{ color: "var(--color-warm-accent)" }}>AI Readiness Test</Link> first. It&apos;s ten questions and does not ask for your email. It scores how ready your business is for AI.
          </p>
          <p>
            If your workflow is ready, <Link href="/contact" style={{ color: "var(--color-warm-accent)" }}>contact me</Link>.
          </p>
        


          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/what-the-agents-get-wrong" style={{ color: "var(--color-warm-accent)" }}>What fifteen agents in production get wrong</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/can-ai-find-your-business" style={{ color: "var(--color-warm-accent)" }}>Whether an assistant can even find your business</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "why-most-ai-tools-waste-money",
            title: "Why some small business AI tools waste your money, by Elijah Purcell",
            description: "Many AI tools sold to small businesses fail because the workflow they attach to was already broken. Three questions help you check yours before you buy.",
            published: "2026-05-24",
          }} />

        </article>

        <footer style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>
          I drafted this post with <Link href="/digital/tools/content-generator" style={{ color: "var(--color-warm-accent)" }}>AI tools</Link> and edited it before publishing.
        </footer>

      </main>
    </div>
  );
}

const h2: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, color: "var(--color-warm-accent)", marginTop: "36px", marginBottom: "16px", lineHeight: 1.3 };
