"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Opinion · May 24, 2026 · 5 min read</div>
          <h1>Why most small business AI tools waste your money</h1>
          <p className="deck">
            Most of the AI tools sold to small businesses fail not because the AI is bad — but because the workflow they&apos;re attached to was already broken. Here&apos;s how to tell the difference.
          </p>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--color-warm-text)" }}>
          <p>
            A plumber I know bought an &quot;AI receptionist&quot; for $400/month. It was supposed to answer his after-hours calls and book appointments. Six months in, he canceled it. The AI worked fine. The problem was that his calendar wasn&apos;t actually connected to anything, his quote process took 20 minutes per call, and he had no way to follow up on the leads the AI captured. The AI did exactly what it promised — book the calls — but the workflow it dropped the calls into was broken.
          </p>
          <p>
            This is the most common AI failure I see. The tool works. The tool was the wrong question.
          </p>

          <h2 style={h2}>The real question to ask before any AI purchase</h2>
          <p>
            Before you buy an AI tool, answer this honestly: <em>if I had a human assistant doing this exact task for free, would my business actually improve?</em>
          </p>
          <p>
            If the answer is no — if the bottleneck isn&apos;t labor, it&apos;s that you don&apos;t know what to do with the output — then AI won&apos;t fix it. Buying AI to solve a workflow problem is like buying a faster car when your steering is broken. You&apos;ll just hit the wall harder.
          </p>

          <h2 style={h2}>What AI is actually good at right now</h2>
          <p>
            Two things, mostly: <strong>generating drafts</strong> (writing, summaries, structured outputs) and <strong>pattern matching at scale</strong> (categorizing, ranking, surfacing). It&apos;s good at &quot;here&apos;s 80% of a thing, you finish it.&quot;
          </p>
          <p>
            It&apos;s NOT good at making real decisions for your business. It will give you confident-sounding answers that are confidently wrong. Anyone selling you &quot;AI that makes decisions&quot; for under five figures is selling you confidence theater.
          </p>

          <h2 style={h2}>The three questions before you buy anything</h2>
          <p><strong>One: is the bottleneck actually time?</strong> If you say yes, name the specific hours-per-week the tool saves. If you can&apos;t name it, you don&apos;t have a bottleneck — you have an excuse to spend money.</p>
          <p><strong>Two: where do the AI&apos;s outputs go?</strong> If the answer is &quot;into another tool I haven&apos;t set up yet,&quot; pause. Fix the downstream tool first, then add AI.</p>
          <p><strong>Three: who reviews the outputs?</strong> AI&apos;s drafts are 80% there. The remaining 20% — fact-checks, brand voice, edge cases — needs a human. If you don&apos;t have a plan for who reviews, you have a plan for embarrassing your business in public.</p>

          <h2 style={h2}>What we sell, and why</h2>
          <p>
            I&apos;ll be honest about our own product. Our <Link href="/digital" style={{ color: "var(--color-warm-accent)" }}>Digital Services subscription</Link> includes AI tools — chatbot, content generator, FAQ builder. But we always pair them with the workflow they sit in. The chatbot is wired to your booking system. The content generator publishes to your blog with one click. The FAQ builder writes to your live site.
          </p>
          <p>
            The reason this works is not because our AI is better. It&apos;s because the AI lives inside a workflow we built around it. Without that, you&apos;ve just got an expensive text-completion box.
          </p>

          <h2 style={h2}>If you&apos;re shopping AI right now</h2>
          <p>
            Take our free <Link href="/ai-readiness" style={{ color: "var(--color-warm-accent)" }}>AI Readiness Test</Link> first. It&apos;s ten questions, no email capture. It&apos;ll tell you honestly whether your business is ready for AI or whether you&apos;d be wasting money. We&apos;d rather you score low and skip the purchase than score middle and buy our tools without being ready.
          </p>
          <p>
            That&apos;s the whole pitch. Don&apos;t buy AI until your workflow is ready for it. When it is — call us.
          </p>
        

          <PostByline post={{
            slug: "why-most-ai-tools-waste-money",
            title: "Why most small business AI tools waste your money | Elijah Purcell",
            description: "Most of the AI tools sold to small businesses fail not because the AI is bad, but because the workflow they're attached to was already broken. Here's how to tell the difference.",
            published: "2026-05-24",
          }} />

        </article>

        <footer style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text-light)", fontStyle: "italic" }}>
          First draft written by our <Link href="/digital/tools/content-generator" style={{ color: "var(--color-warm-accent)" }}>AI Content Generator</Link>. Edited and signed off by Elijah Purcell. — Purcell Ventures
        </footer>

      </main>
    </div>
  );
}

const h2: React.CSSProperties = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, color: "var(--color-warm-accent)", marginTop: "36px", marginBottom: "16px", lineHeight: 1.3 };
