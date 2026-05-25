"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
}

const POSTS: Post[] = [
  {
    slug: "ai-augmented-sales-rep-day",
    title: "What a day looks like for an AI-augmented sales rep",
    excerpt: "A full Tuesday in the life of a rep using AI prospect research, AI next-step coaching, and conversation summary tools alongside a real CRM. Specific times, specific tasks, specific tools.",
    date: "May 25, 2026",
    readingTime: "6 min read",
    category: "Process",
  },
  {
    slug: "why-i-built-crm-from-scratch",
    title: "Why I built a CRM from scratch instead of paying $1,200/yr for HubSpot",
    excerpt: "HubSpot starts at $50/mo and rapidly hits $200+/mo with features I actually need. So I built ours in a week. Here's the math, the tradeoffs, and when you should NOT do this.",
    date: "May 25, 2026",
    readingTime: "5 min read",
    category: "Opinion",
  },
  {
    slug: "case-for-charging-19",
    title: "The case for charging $19 for what others sell at $497",
    excerpt: "Most agencies bundle a starter playbook into a $497 course. We unbundle it. Here's the strategic argument for selling cheap entry products + how it changes the customer relationship.",
    date: "May 25, 2026",
    readingTime: "4 min read",
    category: "Strategy",
  },
  {
    slug: "five-workflows-no-code",
    title: "Five workflows you can automate this week without writing code",
    excerpt: "The five workflows I see small business owners burn the most time on. Each is automatable with off-the-shelf tools in under two hours. No code required.",
    date: "May 24, 2026",
    readingTime: "4 min read",
    category: "Practical",
  },
  {
    slug: "why-most-ai-tools-waste-money",
    title: "Why most small business AI tools waste your money",
    excerpt: "Most of the AI tools sold to small businesses fail not because the AI is bad — but because the workflow they're attached to was already broken. Here's how to tell the difference.",
    date: "May 24, 2026",
    readingTime: "5 min read",
    category: "Opinion",
  },
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "820px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">The Notebook · Field-tested takes</div>
          <h1>
            Blog <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>and notes.</em>
          </h1>
          <p className="deck">
            Practical writing about AI, small business, software, and the work itself. First drafts written using our own AI Content Generator. Edited and signed off by Elijah. We dogfood our own tools.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="pv-card"
              style={{ display: "block" }}
            >
              <span className="b3"></span><span className="b4"></span>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700 }}>{post.category}</span>
                <span style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.1em" }}>{post.date} · {post.readingTime}</span>
              </div>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "48px", padding: "24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", margin: "0 0 8px" }}>
            Want this for your business?
          </h3>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "0 0 16px", lineHeight: 1.5 }}>
            We use our own AI Content Generator to draft these posts. You can too — free to try, no signup.
          </p>
          <Link href="/digital/tools/content-generator" className="pv-btn-primary">Try the Content Generator</Link>
        </div>

      </main>
    </div>
  );
}
