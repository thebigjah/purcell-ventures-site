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
    slug: "write-a-page-an-ai-will-quote",
    title: "How to write a page an AI will actually quote",
    excerpt: "A search engine ranks pages; an answer engine extracts sentences. Those are different jobs. The sentence shape that survives being removed from its paragraph, and the thing that matters more than any of it.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Engineering",
  },
  {
    slug: "can-ai-find-your-business",
    title: "Can an AI find your business? A test you can run in five minutes",
    excerpt: "People are starting to ask an assistant instead of searching, which means there is a version of your business that exists only inside an answer and most owners have never seen it. Here is how to look, and the four fixes that change it.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Guide",
  },
  {
    slug: "ai-team-page-honesty",
    title: "My team page lists fifteen people who do not exist",
    excerpt: "Fifteen names, none of them a person, and the first sentence of the page says so. Why naming them is more useful than describing a system, and why the disclosure lives in the send function rather than in a policy.",
    date: "August 20, 2026",
    readingTime: "5 min read",
    category: "Opinion",
  },
  {
    slug: "psychology-and-software",
    title: "What psychology has to do with the software I build",
    excerpt: "One week of a methods course found a real defect in a product I had already shipped. Within-subject design, base rates, and the metric question worth asking before you choose the metric.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Notes",
  },
  {
    slug: "what-a-website-actually-costs",
    title: "What a small business website actually costs",
    excerpt: "Ask three providers and you get $400, $4,000 and $15,000 for something a customer could not tell apart. What drives the spread, the ongoing costs nobody puts in the quote, and how to tell expensive from overpriced.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Business",
  },
  {
    slug: "what-one-operator-can-deliver",
    title: "What one operator can actually deliver",
    excerpt: "Every solo shop's site says personal service and direct access. All true, and all carefully silent about what happens when that one person is already busy. Here is the arithmetic, plus four things an agency genuinely does better.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Business",
  },
  {
    slug: "audit-your-site-like-a-crawler",
    title: "Audit your own site the way a crawler does, with curl",
    excerpt: "Nine checks from a terminal, no tools and no account. I ran every one against my own site today and found six real problems, one of which had been quietly suppressing nine pages.",
    date: "August 20, 2026",
    readingTime: "9 min read",
    category: "Engineering",
  },
  {
    slug: "claim-your-google-listing",
    title: "Claim your Google listing yourself, in about twenty minutes",
    excerpt: "Written so you do not need to hire anybody, including me. What to put in every field, how to hide a home address, the three things that get a listing suspended, and the five-minute monthly check almost nobody does.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Guide",
  },
  {
    slug: "cold-outreach-that-worked",
    title: "The cold email that got me a client, and the ones that did not",
    excerpt: "The difference was not writing quality. It was leading with something specific and checkable about their business instead of a sentence that would be true of every business on earth.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Business",
  },
  {
    slug: "llc-at-seventeen",
    title: "What registering an LLC at seventeen actually involved",
    excerpt: "The filing is the easy part. The bank account is the step that stops people, the registered agent has an address consequence nobody mentions, and yes, you can rename the company later, because I did.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Business",
  },
  {
    slug: "audit-every-business-in-your-town",
    title: "How to audit every business in your town in an afternoon",
    excerpt: "One free Overpass query against OpenStreetMap, a real HTTP request per site, and the two mistakes that will make your numbers wrong. Including the one that reached a published page before I caught it.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Process",
  },
  {
    slug: "new-college-alabama",
    title: "New College at Alabama, explained by someone in it",
    excerpt: "How the self-designed degree actually works, what a depth study is, the Levitetz seed grants, and the honest case against it: nobody knows what it is, and the structure is yours to supply.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Guide",
  },
  {
    slug: "what-the-agents-get-wrong",
    title: "Fifteen AI agents run my company. Here is what they get wrong",
    excerpt: "A stage that could not fail, twenty proposals with the internal notes still in them, ten agents that were never being called, findings that closed themselves, and an agent that quietly acquired capabilities nobody granted it.",
    date: "August 20, 2026",
    readingTime: "9 min read",
    category: "Engineering",
  },
  {
    slug: "free-at-alabama",
    title: "What you have already paid for at Alabama",
    excerpt: "Twelve services a University of Alabama student has already bought through tuition and fees, with the exact office names, and an honest list of the things I could not confirm and am therefore not claiming.",
    date: "August 20, 2026",
    readingTime: "5 min read",
    category: "Guide",
  },
  {
    slug: "is-your-business-invisible",
    title: "Is your business invisible online? A ten-minute self-check",
    excerpt: "Seven checks you can run on your own business in ten minutes with no tools and no account, to find out what a customer with a phone actually sees. Including the two cases where you do not need a website at all.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Guide",
  },
  {
    slug: "small-app-security-checklist",
    title: "Five holes in almost every small production app",
    excerpt: "Row-level security that is enabled but enforcing nothing, paid API routes with no authentication, an auth cookie that is not authentication, and two more. From seven read-only audits of live applications.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Engineering",
  },
  {
    slug: "canonical-tag-noindex",
    title: "Every post on my blog was telling Google not to index it",
    excerpt: "One line in a Next.js layout gave nine posts a canonical tag pointing at the index page, which is the standard way of saying 'I am a duplicate, skip me.' Nothing failed, nothing errored, and the only symptom was absence.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Engineering",
  },
  {
    slug: "/ai-at-alabama",
    title: "Studying AI at the University of Alabama",
    excerpt: "The new AI BS and its exact course requirements, why an AI major cannot also major in Computer Science, and the routes for students who are not in the College of Engineering.",
    date: "August 20, 2026",
    readingTime: "5 min read",
    category: "Guide",
  },
  {
    slug: "121-businesses-near-campus",
    title: "121 businesses near campus, and what a phone can find",
    excerpt: "Every independent business within 2500 metres of the Quad, and how many list a website a machine can actually reach. Twenty-seven of 121. The number that surprised me was the opening hours.",
    date: "August 20, 2026",
    readingTime: "4 min read",
    category: "Reporting",
  },
  {
    slug: "tuscaloosa-small-business-online",
    title: "The Tuscaloosa Storefront Project",
    excerpt: "A reporting series on independent businesses around the University of Alabama: who runs them, how students actually find them, and what happens to a fifteen-year-old shop that has no website.",
    date: "August 20, 2026",
    readingTime: "3 min read",
    category: "Reporting",
  },
  {
    slug: "agents-that-cannot-fix-what-they-find",
    title: "We built agents that cannot fix what they find",
    excerpt: "Separating the finder from the fixer is the cheapest safety property you can buy in an agent system. It also creates a failure mode nobody warns you about, and we shipped it.",
    date: "August 17, 2026",
    readingTime: "4 min read",
    category: "Engineering",
  },
  {
    slug: "shipped-is-not-activated",
    title: "Shipping is not the same as being able to take a payment",
    excerpt: "A site can be live, green in the deploy log, and still unable to accept a dollar. The gap between a finished site and a working business is usually one broken path, and it is invisible from the inside.",
    date: "August 17, 2026",
    readingTime: "3 min read",
    category: "Opinion",
  },
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
              // A slug beginning with "/" is a full path. The AI guide lives outside /blog
              // and "/blog/../ai-at-alabama" is a different URL to a crawler even though a
              // browser resolves it.
              href={post.slug.startsWith("/") ? post.slug : `/blog/${post.slug}`}
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
