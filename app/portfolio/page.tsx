import { PageHero, Section, ClosingCall } from "@/app/components/ui";
import ProjectList, { type Project } from "./ProjectList";

// THE PORTFOLIO, rebuilt on the page kit 26 Oct 2026. 17 projects.
//
// Content decisions made in the rebuild, so nobody restores them by accident:
// - The scholarship dollar total is gone from Scholarship Sniper. His rule keeps that
//   number on the college-application course page only.
// - Gran's Supplements no longer names his grandparents. Public pages carry the business,
//   not his family.

const PROJECTS: Project[] = [
  {
    slug: "ua-today",
    title: "UA Today",
    subtitle: "University of Alabama events from six sources in one feed.",
    description:
      "Pulls University of Alabama events from six sources into one feed, with a moderation console, a board for student pickup games and profiles for student organizations. The masthead says it is unofficial.",
    category: ["Web", "AI tools"],
    techStack: ["Node.js", "Vercel", "Six upstream sources", "Automated health checks"],
    liveUrl: "https://ua-today.vercel.app",
    status: "Live",
    detailLines: [
      "Six sources reconciled into one feed and checked automatically every morning",
      "A moderation queue: a person reviews each submitted event before it appears",
      "Other University of Alabama students use it",
    ],
  },
  {
    slug: "english-pruitt",
    title: "English Pruitt Photography",
    subtitle: "A client I found through cold outreach.",
    description:
      "A full photography site for a North Georgia photographer, with portfolio galleries, service and pricing pages, and an enquiry form. I scoped, built and delivered it.",
    category: ["Web"],
    techStack: ["Next.js", "TypeScript", "Vercel"],
    liveUrl: "https://english-pruitt.vercel.app",
    status: "Live",
    detailLines: [
      "Found through cold outreach, quoted and built to the client's brief",
      "Galleries, services, pricing and an enquiry form",
    ],
  },
  {
    slug: "the-loom",
    title: "The Loom",
    subtitle: "A lead-generation engine that runs itself.",
    description:
      "A daily crawler finds local businesses with little or no web presence, researches and scores each one, and emails a ranked packet at 7:15 every morning. Five production website templates let a prospect see a site built for their industry.",
    category: ["AI tools", "Internal"],
    techStack: ["Python", "Google Places API", "Supabase", "GitHub Actions", "Resend"],
    liveUrl: "https://the-loom-gold.vercel.app",
    status: "Live",
    detailLines: [
      "Runs on a schedule with no one watching and emails the result",
      "Takes down expired previews on its own",
    ],
  },
  {
    slug: "boyfriend-camera",
    title: "Boyfriend Camera",
    subtitle: "On-device scene analysis in the browser.",
    description:
      "A WebGL camera app that reads the scene on the phone and coaches the shot. I built it for the person who keeps getting handed a phone and asked to take the picture.",
    category: ["Web", "AI tools"],
    techStack: ["JavaScript", "WebGL", "MediaPipe", "Vercel"],
    liveUrl: "https://boyfriend-camera.vercel.app",
    status: "Live",
    detailLines: [
      "Scene analysis runs on the phone",
      "It needs no account, and photos never leave the phone",
    ],
  },
  {
    slug: "pv-site",
    title: "Purcell Ventures",
    subtitle: "This website.",
    description: "A Next.js 16 site with 26 free AI tools, a portal for sales reps and a CRM.",
    category: ["Web", "AI tools"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Anthropic Claude", "Vercel"],
    liveUrl: "https://purcellventures.co",
    status: "Live",
    detailLines: [
      "26 AI tools, including an FAQ builder, a content generator, a palette tool, a brand kit and logo concepts",
      "5 tools that save data: loyalty, expenses, inventory, estimating and event registration",
      "A rep portal with password login, a kanban CRM, AI prospect research and a leaderboard",
      "Each price matches on every page that lists it",
    ],
  },
  {
    slug: "elijahbot",
    title: "ElijahBot",
    subtitle: "My personal AI infrastructure.",
    description:
      "A task system with a dashboard server and a global kill switch. It runs background work, sends updates to my phone and manages my daily tasks.",
    category: ["AI tools", "Internal"],
    techStack: ["Python", "FastAPI", "ntfy", "Anthropic Claude"],
    status: "Internal",
    detailLines: [
      "Hooks that track sessions and save memory automatically",
      "Commands sent from my phone, and a dispatcher that routes them",
      "A wisdom log and a decision journal",
      "A status dashboard I check from my phone",
    ],
  },
  {
    slug: "elijahbot-refresh",
    title: "ElijahBot Refresh",
    subtitle: "A habit tracker with an accountability chatbot.",
    description:
      "A multi-tenant Next.js app with habit tracking, a daily journal, a week heatmap and a Claude chatbot that follows up when you miss a habit. Friends sign up with their own Google accounts.",
    category: ["Web", "AI tools"],
    techStack: ["Next.js 16", "Auth.js v5", "Firestore", "Claude Haiku", "Vercel"],
    liveUrl: "https://elijahbot-refresh.vercel.app",
    status: "Live",
    detailLines: [
      "A default template of 13 habits",
      "A morning briefing each day through Vercel Cron",
      "Conversations summarized every 15 turns",
      "Charts in Recharts, and achievements",
    ],
  },
  {
    slug: "tools-hub",
    title: "ElijahBot Tools Hub",
    subtitle: "My own collection of personal tools.",
    description:
      "A static, password-protected hub of 22 standalone tools. It installs as a web app and tracks affiliate redirects. I built it for my own daily use.",
    category: ["Web", "AI tools"],
    techStack: ["Vanilla JavaScript", "Fraunces and JetBrains Mono", "Vercel", "Installable web app"],
    liveUrl: "https://elijahbot-tools-hub.vercel.app",
    status: "Live",
    detailLines: [
      "Stage Fright, a voice analyzer",
      "Longitude, a sealed-letter tool",
      "Park Waits, a queue tracker",
      "Personal OS, a state router",
      "Magic Closet, an outfit picker",
    ],
  },
  {
    slug: "prayer-walk",
    title: "Prayer Walk Mobile",
    subtitle: "A map of which parts of a city have been prayed over.",
    description:
      "An Expo mobile app that tracks walking routes, pins prayers to places on the map and builds a coverage map over time. The production Android build is done and the Play Store launch is pending.",
    category: ["Mobile"],
    techStack: ["Expo", "React Native", "Supabase", "MapLibre"],
    liveUrl: "https://coverage-bice.vercel.app",
    status: "Live",
    detailLines: [
      "Walking routes tracked by GPS",
      "Prayers pinned to each location",
      "A coverage heatmap that fills in over time",
      "Privacy policy and production build ready",
    ],
  },
  {
    slug: "wallet-tracker",
    title: "Wallet Tracker",
    subtitle: "Alerts on crypto wallet activity.",
    description:
      "Watches Ethereum and Solana wallets, scores tokens by risk and sends an alert through ntfy, Discord or Telegram when a watched wallet makes a large move. I backtested it and swept its parameters.",
    category: ["AI tools", "Internal"],
    techStack: ["Python", "Etherscan API", "Helius API", "ntfy"],
    status: "Internal",
    detailLines: [
      "A backtest framework that replays 90 days",
      "A parameter sweep for the alert threshold and time window",
      "A risk score from 0 to 10 for each token",
      "Each alert goes to several channels at once",
    ],
  },
  {
    slug: "yt-pipeline",
    title: "YouTube Pipeline",
    subtitle: "An automated video pipeline for faceless channels.",
    description:
      "The pipeline writes the script, records the voice, builds the video and schedules it. It grades each opening hook and rewrites the weak ones, and each channel has its own dashboard.",
    category: ["AI tools", "Internal"],
    techStack: ["Python", "OpenAI", "FFmpeg", "YouTube API"],
    status: "Internal",
    detailLines: [
      "A hook grader that regenerates any hook scoring under the threshold",
      "Scheduler retries and health monitoring",
      "A calendar preview and a dashboard for each channel",
      "Amazon Associates affiliate links built in",
    ],
  },
  {
    slug: "scholarship-sniper",
    title: "Scholarship Sniper",
    subtitle: "A college application and scholarship tracker.",
    description:
      "Tracked 98 schools through one application cycle, logged 34 acceptances and the scholarship offers that came with them, and drafted decline emails and appeal letters.",
    category: ["AI tools", "Internal"],
    techStack: ["Python", "Gmail API", "Anthropic Claude"],
    status: "Internal",
    detailLines: [
      "34 college acceptances tracked",
      "Scholarship offers logged with each acceptance",
      "31 decline emails drafted automatically",
      "A framework for appeal letters to Alabama",
    ],
  },
  {
    slug: "hesed",
    title: "Hesed",
    subtitle: "A free supplement tracker for family caregivers.",
    description:
      "A multi-tenant daily ledger for people who manage a parent's or grandparent's supplements. It compares affiliate prices from iHerb, Amazon and Vitacost and ranks them by delivered cost per serving. It has an AI chat for caregiving questions and sends reorder alerts by push and email. I generalized it from a private pilot built for one family.",
    category: ["Web", "AI tools"],
    techStack: ["Next.js 16", "Supabase", "Tailwind 4", "Anthropic Claude", "Resend", "Web Push API"],
    liveUrl: "https://hesed-zeta.vercel.app",
    status: "Live",
    detailLines: [
      "Affiliate prices from several stores, ranked by best price per serving",
      "Prices refresh at 3 a.m. Eastern and reorder alerts go out at 9 a.m. Eastern",
      "Reorder reminders by web push and email, at a frequency the caregiver sets",
      "Affiliate links carry the FTC disclosure. The app is free, shows no ads and sells no data",
    ],
  },
  {
    slug: "returns-void",
    title: "Returns Void",
    subtitle: "A daily prayer ledger.",
    description:
      "A daily prayer journal. Each notification names two people, starting with whoever has gone longest without prayer. It records voice prayers and syncs them through Supabase, and its framing comes from Isaiah 55:11.",
    category: ["Web"],
    techStack: ["Next.js 14", "Supabase Storage", "Tailwind"],
    liveUrl: "https://returns-void.vercel.app",
    status: "Live",
    detailLines: [
      "A rotation queue that puts the longest-since-prayed-for first",
      "Voice prayers recorded and stored as .mp3 files in the cloud",
      "A ledger-style design set in Fraunces on a cream background",
      "Push notifications through a service worker",
    ],
  },
  {
    slug: "folio",
    title: "Folio",
    subtitle: "Social reading built on curated book lists.",
    description:
      "A social reading app built around lists in place of star ratings. Phase A added profiles, list editing and share cards. Phase B added follows, trending lists, comments, live reading status, reading sessions and Bookshop.org affiliate links that support independent bookstores.",
    category: ["Web"],
    techStack: ["Next.js 16", "Supabase", "Tailwind 4", "Open Library API"],
    liveUrl: "https://folio-now.vercel.app",
    status: "Live",
    detailLines: [
      "Bookshop.org affiliate links, which support independent bookstores",
      "Share cards generated on the server with @vercel/og",
      "Live reading status for each reader",
      "Trending lists refreshed daily by a scheduled job",
    ],
  },
  {
    slug: "grans-supplements",
    title: "Gran's Supplements",
    subtitle: "The single-family pilot that led to Hesed.",
    description:
      "A supplement tracker for one household, built before Hesed generalized the model: 25 numbered bottles, dose checklists, reorder alerts and an AI chat. I kept this first version as it was.",
    category: ["Web"],
    techStack: ["Next.js", "Supabase"],
    liveUrl: "https://grans-supplements.vercel.app",
    status: "Live",
    detailLines: [
      "25 numbered bottles with dose schedules",
      "Reorder alerts based on the doses left",
      "Supabase sync across devices",
      "The model Hesed grew from",
    ],
  },
  {
    slug: "pv-social",
    title: "PV Social",
    subtitle: "An internal console for Instagram.",
    description:
      "A scheduler, AI composer, reply review queue, audit log, kill switch, personal-information filter and privacy blocklist for the @purcellventures and @elijahbot Instagram accounts. Posting to Instagram is not connected yet.",
    category: ["AI tools", "Internal"],
    techStack: ["Next.js 16", "Supabase", "Anthropic Claude", "Meta Graph API"],
    liveUrl: "https://pv-social.vercel.app",
    status: "Internal",
    detailLines: [
      "An AI composer grounded in the brand voice",
      "A reply queue that waits for my approval",
      "A filter that blocks personal information from going out",
      "A daily briefing email with a Bible verse and app health",
    ],
  },
];

export default function PortfolioPage() {
  return (
    <main>
      <PageHero
        planet="portfolio"
        kicker="Portfolio"
        title="Seventeen projects I built and still maintain."
        lede="Live products, client sites and internal systems. Open any entry for the build details and the stack."
      />

      <Section stack>
        <ProjectList projects={PROJECTS} />
      </Section>

      <ClosingCall
        title="Custom software from $1,500"
        line="Apps, web platforms, internal tools and AI integrations. I build and maintain them myself."
        button="See custom software pricing"
        href="/software"
      />
    </main>
  );
}
