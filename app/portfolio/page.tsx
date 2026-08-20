"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

type Category = "All" | "Web" | "AI Tools" | "Mobile" | "Internal" | "Open Source";

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: Category | Category[];
  techStack: string[];
  liveUrl?: string;
  status: "Live" | "In Development" | "Published" | "Internal";
  highlight?: boolean;
  visualSymbol: string; // emoji or symbol representing the project
  visualColor: string;  // accent color for the card
  detailLines: string[]; // bulleted detail points
}

const PROJECTS: Project[] = [
  {
    slug: "pv-site",
    title: "Purcell Ventures",
    subtitle: "The site you're on right now.",
    description: "Full-stack Next.js 16 site with 4 service divisions, 17 customer-facing tools, a rep portal with CRM, AI-powered features end-to-end, and a Soft Autumn editorial design language.",
    category: ["Web", "AI Tools"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Anthropic Claude", "Vercel"],
    liveUrl: "https://purcellventures.co",
    status: "Live",
    highlight: true,
    visualSymbol: "PV",
    visualColor: "#d4af37",
    detailLines: [
      "12 AI tools (FAQ, content gen, palette, brand kit, logo concepts, etc.)",
      "5 stateful tools (CRM, loyalty, inventory, estimating, events)",
      "Rep portal with password auth, kanban CRM, AI prospect research, leaderboard",
      "Pricing reconciled across 30+ touchpoints",
    ],
  },
  {
    slug: "elijahbot",
    title: "ElijahBot",
    subtitle: "Personal AI infrastructure.",
    description: "Autonomous task system + dashboard server + global kill-switch. Runs background work, posts updates via mobile push, manages the user's life ops layer.",
    category: ["AI Tools", "Internal"],
    techStack: ["Python", "FastAPI", "ntfy", "Anthropic Claude"],
    status: "Internal",
    visualSymbol: "EB",
    visualColor: "#9b7fd4",
    detailLines: [
      "Hooks for session tracking + auto memory",
      "Phone command vocab + dispatcher",
      "Wisdom log + decision journal",
      "Status dashboard accessible from phone",
    ],
  },
  {
    slug: "elijahbot-refresh",
    title: "ElijahBot Refresh",
    subtitle: "Habit-tracker + accountability chatbot.",
    description: "Multi-tenant Next.js app, habit tracking, daily journal, week heatmap, Claude-powered conversation that pushes back when you flake. Friends sign up under their own Google account.",
    category: ["Web", "AI Tools"],
    techStack: ["Next.js 16", "Auth.js v5", "Firestore", "Claude Haiku", "Vercel"],
    liveUrl: "https://elijahbot-refresh.vercel.app",
    status: "Live",
    visualSymbol: "↻",
    visualColor: "#7aaa6a",
    detailLines: [
      "13-habit default template",
      "Daily AM briefing via Vercel Cron",
      "Conversation summarization at 15 turns",
      "Recharts visualizations + achievements",
    ],
  },
  {
    slug: "tools-hub",
    title: "ElijahBot Tools Hub",
    subtitle: "Editorial-design personal tool collection.",
    description: "Static hub with 22+ standalone tools, PWA-installable, affiliate redirect tracking, password-gated. Built for the user's own daily-driver needs.",
    category: ["Web", "AI Tools"],
    techStack: ["Vanilla JS", "Fraunces + JetBrains Mono", "Vercel", "PWA"],
    liveUrl: "https://elijahbot-tools-hub.vercel.app",
    status: "Live",
    visualSymbol: "⚙",
    visualColor: "#e8b968",
    detailLines: [
      "Stage Fright voice analyzer",
      "Longitude sealed-letter tool",
      "Park Waits queue tracker",
      "Personal OS state router",
      "Magic Closet outfit picker",
    ],
  },
  {
    slug: "prayer-walk",
    title: "Prayer Walk Mobile",
    subtitle: "GPS-tracked prayer walking app.",
    description: "Expo mobile app that tracks walking routes, attaches prayers to locations on the map, and builds 'coverage' over time. Production AAB built, Play Store launch pending.",
    category: ["Mobile"],
    techStack: ["Expo", "React Native", "Supabase", "MapLibre"],
    status: "In Development",
    visualSymbol: "🚶",
    visualColor: "#7aaa6a",
    detailLines: [
      "GPS-tracked walking routes",
      "Pinned prayers per location",
      "Coverage heatmap over time",
      "Privacy policy + production build ready",
    ],
  },
  {
    slug: "pickit",
    title: "PickIt",
    subtitle: "Group voting + decision app.",
    description: "When a group of friends can't decide where to eat. Swipe to vote, spin to break ties, group consensus settled in 60 seconds.",
    category: ["Mobile"],
    techStack: ["Expo", "React Native", "Supabase"],
    status: "In Development",
    visualSymbol: "✓",
    visualColor: "#c2754a",
    detailLines: [
      "Swipe-to-vote on options",
      "Tiebreaker wheel-spin",
      "Real-time group sync",
      "Privacy policy hosted, Play Store pending",
    ],
  },
  {
    slug: "wallet-tracker",
    title: "Wallet Tracker",
    subtitle: "On-chain smart-money signal alerter.",
    description: "Watches Ethereum + Solana wallets, scores tokens by risk, alerts via ntfy/Discord/Telegram when whale movement matches alpha-signal criteria. Backtested + parameter-swept.",
    category: ["AI Tools", "Internal"],
    techStack: ["Python", "Etherscan API", "Helius API", "ntfy"],
    status: "Internal",
    visualSymbol: "📈",
    visualColor: "#4a9a6a",
    detailLines: [
      "Backtest framework (90d replay)",
      "Parameter sweep for optimal M+window",
      "Risk scoring per token (0-10)",
      "Multi-channel alert fanout",
    ],
  },
  {
    slug: "yt-pipeline",
    title: "YouTube Pipeline",
    subtitle: "Faceless-channel content factory.",
    description: "End-to-end script → voice → video → schedule pipeline. Hook quality grader + auto-regen, scheduler resilience, per-channel dashboard.",
    category: ["AI Tools", "Internal"],
    techStack: ["Python", "OpenAI", "FFmpeg", "YouTube API"],
    status: "Internal",
    visualSymbol: "▶",
    visualColor: "#e54a28",
    detailLines: [
      "Hook grader (auto-regen if score < threshold)",
      "Scheduler resilience + health monitoring",
      "Calendar preview + per-channel dashboard",
      "Amazon Associates affiliate hooks",
    ],
  },
  {
    slug: "scholarship-sniper",
    title: "Scholarship Sniper",
    subtitle: "Automated college acceptance + scholarship intelligence.",
    description: "Tracked 98 schools through college application cycle, automated decline emails + appeal letters, surfaced $505k+/yr in scholarships across 34 acceptances.",
    category: ["AI Tools", "Internal"],
    techStack: ["Python", "Gmail API", "Anthropic Claude"],
    status: "Internal",
    visualSymbol: "🎓",
    visualColor: "#9b7fd4",
    detailLines: [
      "34 college acceptances tracked",
      "$505,000+/yr in scholarships surfaced",
      "31 decline emails drafted automatically",
      "Alabama appeal letter framework",
    ],
  },
  {
    slug: "hesed",
    title: "Hesed",
    subtitle: "Free supplement tracker for family caregivers.",
    description: "Multi-tenant daily ledger for the people who run a parent's or grandparent's supplement regimen. Three-source affiliate price comparison (iHerb · Amazon · Vitacost) ranked by delivered cost per serving. AI chat for caregiving questions. Push + email reorder alerts. Generalized SaaS evolution of the Kiki/Robert pilot.",
    category: ["Web", "AI Tools"],
    techStack: ["Next.js 16", "Supabase", "Tailwind 4", "Anthropic Claude", "Resend", "Web Push API"],
    liveUrl: "https://hesed-zeta.vercel.app",
    status: "Live",
    highlight: true,
    visualSymbol: "ח",
    visualColor: "#A8804B",
    detailLines: [
      "Multi-channel affiliate stack with best-price-per-serving ranking",
      "Active delivery: 3 AM ET price refresh cron + 9 AM ET reorder alerts",
      "Web push + email reorder reminders (caregiver-configurable frequency)",
      "FTC-disclosed, no ads, no data sold, free forever",
    ],
  },
  {
    slug: "returns-void",
    title: "Returns Void",
    subtitle: "Daily prayer ledger.",
    description: "Hand-bound prayer journal as software. Rotation queue surfaces 2 people per notification (longest-since-prayed-for first), records voice prayers cloud-synced via Supabase, Isaiah 55:11 framing. Built for actual daily use, not as a productivity app.",
    category: ["Web"],
    techStack: ["Next.js 14", "Supabase Storage", "Tailwind"],
    liveUrl: "https://returns-void.vercel.app",
    status: "Live",
    visualSymbol: "55",
    visualColor: "#1A2332",
    detailLines: [
      "Rotation queue with longest-since-prayed-for prioritization",
      "Voice prayer recording with cloud-synced .mp3 storage",
      "Estate-ledger editorial aesthetic (Fraunces + cream paper)",
      "Push notifications via service worker",
    ],
  },
  {
    slug: "folio",
    title: "Folio",
    subtitle: "Goodreads if it shipped in 2026.",
    description: "Reader's social app where the unit is the curated list, not the rating. Phase A: profiles, list CRUD, share cards. Phase B: follows, trending, comments, realtime status, sessions, Bookshop affiliate links to support indie bookstores.",
    category: ["Web"],
    techStack: ["Next.js 16", "Supabase", "Tailwind 4", "Open Library API"],
    liveUrl: "https://folio-now.vercel.app",
    status: "Live",
    visualSymbol: "📚",
    visualColor: "#7B2D26",
    detailLines: [
      "Bookshop.org affiliate (supports indie bookstores, not Amazon)",
      "OG share cards generated server-side via @vercel/og",
      "Realtime reading-status presence",
      "Trending lists refreshed daily via cron",
    ],
  },
  {
    slug: "grans-supplements",
    title: "Gran's Supplements",
    subtitle: "Pilot version for grandma + grandpa.",
    description: "Single-family supplement tracker built before Hesed generalized the model. 25 numbered bottles, dose checklists, reorder alerts, AI chat. Kept untouched as the proof-of-concept that validated the multi-tenant SaaS pivot.",
    category: ["Web"],
    techStack: ["Next.js", "Supabase"],
    liveUrl: "https://grans-supplements.vercel.app",
    status: "Live",
    visualSymbol: "💊",
    visualColor: "#56627A",
    detailLines: [
      "25 numbered bottles with dose schedules",
      "Reorder alerts based on remaining doses",
      "Supabase sync across devices",
      "Direct lineage to Hesed (caregivers everywhere)",
    ],
  },
  {
    slug: "pv-social",
    title: "PV Social",
    subtitle: "Internal Instagram ops console.",
    description: "Scheduler + AI composer + reply review + audit + kill switch + sentinel filter + privacy blocklist for the @purcellventures and @elijahbot Instagram accounts. Meta Graph API stubbed pending FB Dev setup.",
    category: ["AI Tools", "Internal"],
    techStack: ["Next.js 16", "Supabase", "Anthropic Claude", "Meta Graph API"],
    liveUrl: "https://pv-social.vercel.app",
    status: "Internal",
    visualSymbol: "📱",
    visualColor: "#9b7fd4",
    detailLines: [
      "AI composer with brand-voice grounding",
      "Reply queue with manual approval gate",
      "Sentinel filter blocks personal-info leaks",
      "Daily briefing email with verse + app health",
    ],
  },
];

const CATEGORIES: Category[] = ["All", "Web", "AI Tools", "Mobile", "Internal"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openProject, setOpenProject] = useState<string | null>(null);

  const visible = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => {
        const cats = Array.isArray(p.category) ? p.category : [p.category];
        return cats.includes(activeCategory);
      });

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid .portfolio-card.highlight { grid-column: span 1 !important; }
        }
      ` }} />
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1200px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">Portfolio · Shipped Work</div>
          <h1>
            What we&apos;ve <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>built.</em>
          </h1>
          <p className="deck">
            Live products, internal systems, and tools-as-art. Each one shipped, used, maintained — not slide-deck portfolio fluff. Click any tile to see the build details.
          </p>
        </header>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 16px",
                background: activeCategory === cat ? "var(--color-warm-accent)" : "transparent",
                color: activeCategory === cat ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
                border: `1px solid ${activeCategory === cat ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {visible.map((p) => {
            const isOpen = openProject === p.slug;
            return (
              <article
                key={p.slug}
                className={`portfolio-card ${p.highlight ? "highlight" : ""}`}
                style={{
                  gridColumn: p.highlight ? "span 2" : undefined,
                  background: "var(--color-warm-bg-alt)",
                  border: `1px solid ${isOpen ? p.visualColor : "var(--color-warm-border)"}`,
                  padding: 0,
                  cursor: "pointer",
                  transition: "border-color 0.2s, transform 0.15s",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => setOpenProject(isOpen ? null : p.slug)}
              >
                {/* Visual hero block */}
                <div style={{
                  height: "140px",
                  background: `linear-gradient(135deg, ${p.visualColor}25, ${p.visualColor}05)`,
                  borderBottom: `2px solid ${p.visualColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}>
                  <div style={{
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: p.visualSymbol.length <= 2 ? "64px" : "48px",
                    fontWeight: 700,
                    color: p.visualColor,
                    lineHeight: 1,
                    letterSpacing: "0.04em",
                  }}>
                    {p.visualSymbol}
                  </div>
                  {/* Status badge */}
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    padding: "3px 8px",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 700,
                    background: p.status === "Live" ? "#7aaa6a" : p.status === "In Development" ? "#e8b968" : p.status === "Published" ? "#9b7fd4" : "var(--color-warm-text-light)",
                    color: "var(--color-warm-bg)",
                  }}>
                    {p.status}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 4px", lineHeight: 1.2 }}>{p.title}</h2>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-accent)", margin: "0 0 12px", fontStyle: "italic" }}>{p.subtitle}</p>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 12px" }}>{p.description}</p>

                  {isOpen && (
                    <>
                      <div style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "12px", marginTop: "8px" }}>
                        <h4 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", margin: "0 0 8px", fontWeight: 700 }}>What&apos;s built</h4>
                        <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>
                          {p.detailLines.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>
                      <div style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "12px", marginTop: "12px" }}>
                        <h4 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", margin: "0 0 8px", fontWeight: 700 }}>Tech</h4>
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          {p.techStack.map((t) => (
                            <span key={t} style={{ fontSize: "10px", padding: "3px 8px", background: "var(--color-warm-bg)", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", letterSpacing: "0.05em" }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{ marginTop: "auto", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-text-light)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      {isOpen ? "Click to collapse" : "Click for details"}
                    </span>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: "11px", color: p.visualColor, textDecoration: "none", letterSpacing: "0.1em", fontWeight: 700 }}
                      >
                        Visit →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "64px", padding: "40px 32px", textAlign: "center", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 700 }}>Want something like this?</h3>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Custom software from $1,500 — apps, web platforms, internal tools, AI integrations. Owner-built, owner-maintained.
          </p>
          <Link href="/software" className="pv-btn-primary">See custom software pricing</Link>
        </div>

      </main>
    </div>
  );
}
