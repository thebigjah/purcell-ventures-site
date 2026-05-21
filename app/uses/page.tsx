"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";

const STACK = [
  {
    roman: "I.",
    category: "The Editor",
    items: [
      { name: "Claude Code",  desc: "The terminal-resident AI partner that wrote 80% of the code on this site. Subscription, daily driver." },
      { name: "VS Code",      desc: "When the AI hands off — type-checking, debugging, design previews." },
      { name: "iTerm2 / WT",  desc: "Terminal of choice depending on whether I'm on the Mac or the Windows desktop." },
    ],
  },
  {
    roman: "II.",
    category: "Languages",
    items: [
      { name: "TypeScript",   desc: "Default for anything that ships to a browser or a phone." },
      { name: "Python",       desc: "Default for anything that scrapes, automates, calls an AI, or talks to a server." },
      { name: "Bash + PS",    desc: "Bash on Mac, PowerShell on Windows. Every workflow eventually gets a script." },
    ],
  },
  {
    roman: "III.",
    category: "Frameworks",
    items: [
      { name: "Next.js",      desc: "purcellventures.co, elijahbot-refresh, every web tool I ship." },
      { name: "React Native + Expo", desc: "Mobile apps. Persona AI, prayer-walk app, anything that needs to be on a phone." },
      { name: "Electron",     desc: "Desktop apps — ElijahBot Overlay runs as one." },
      { name: "Tailwind CSS", desc: "When I'm not writing custom inline styles, this." },
    ],
  },
  {
    roman: "IV.",
    category: "AI Stack",
    items: [
      { name: "Claude API",   desc: "Anthropic's API. Default LLM for everything I build." },
      { name: "OpenAI API",   desc: "Backup + voice transcription. Whisper still hard to beat." },
      { name: "ElevenLabs",   desc: "TTS for the overlay's voice output." },
      { name: "Embedding APIs", desc: "Semantic search across notes, memory, and content libraries." },
    ],
  },
  {
    roman: "V.",
    category: "Infrastructure",
    items: [
      { name: "Vercel",       desc: "Hosting for every Next.js site I ship." },
      { name: "Cloudflare Tunnel", desc: "For exposing localhost so the phone can reach the desktop dashboard." },
      { name: "ntfy.sh",      desc: "Push notifications without an app. Powers ElijahBot's phone-tap approvals." },
      { name: "Resend",       desc: "Transactional email — booking confirmations, lead notifications." },
      { name: "Supabase / Firebase", desc: "Whichever fits the app. Supabase for SQL, Firebase for realtime + auth." },
    ],
  },
  {
    roman: "VI.",
    category: "Automation",
    items: [
      { name: "yt-dlp",       desc: "Source footage for the YouTube pipeline." },
      { name: "MoviePy",      desc: "Assembling generated content into final videos." },
      { name: "Selenium",     desc: "Headless scraping when an API doesn't exist." },
      { name: "Task Scheduler", desc: "Windows-side cron — every ElijahBot job runs on this." },
    ],
  },
  {
    roman: "VII.",
    category: "Hardware",
    items: [
      { name: "Windows desktop", desc: "Where the long-running automations live. The workshop." },
      { name: "MacBook",         desc: "Travel + on-the-go. Same memory directory, synced via iCloud." },
      { name: "Android phone",   desc: "ntfy on the home screen for one-tap approvals from anywhere." },
      { name: "Shure mic",       desc: "Worship, course recording, anything voiced. Already paid for." },
    ],
  },
  {
    roman: "VIII.",
    category: "Tools I refuse",
    items: [
      { name: "Subscription bloat", desc: "If I don't open it weekly, I cancel it. Stripe Bill Pay is my friend." },
      { name: "No-code platforms", desc: "Used them. The exit cost is too high. Custom code lasts longer." },
      { name: "Generic AI 'productivity' tools", desc: "I'd rather write the workflow than rent it from someone else." },
    ],
  },
];

export default function UsesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "920px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">/uses · Updated May 2026</div>
          <h1>
            What I <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>actually use.</em>
          </h1>
          <p className="deck">
            The full stack — editor, languages, frameworks, AI, infrastructure, automation, hardware. Every tool here is in active production use, not on a shelf. If I&apos;ve dropped something I once used, it&apos;s because something earned its place better.
          </p>
        </header>

        {/* Stack list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {STACK.map((bucket) => (
            <div key={bucket.category} className="pv-card" style={{ padding: "32px 36px 28px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "28px", alignItems: "start" }}>
                <div style={{ borderRight: "1px solid var(--color-warm-border)", paddingRight: "24px", minWidth: "150px" }}>
                  <div className="pv-italic" style={{ fontSize: "32px", color: "var(--color-warm-accent)", lineHeight: 1, marginBottom: "8px" }}>
                    {bucket.roman}
                  </div>
                  <h2 style={{
                    fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                    fontSize: "16px", letterSpacing: "0.04em",
                    color: "var(--color-warm-text)", textTransform: "uppercase",
                    margin: 0, lineHeight: 1.2,
                  }}>
                    {bucket.category}
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {bucket.items.map((item) => (
                    <div key={item.name}>
                      <div style={{
                        fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                        fontSize: "15px", letterSpacing: "0.02em",
                        color: "var(--color-warm-text)",
                        marginBottom: "4px",
                      }}>
                        {item.name}
                      </div>
                      <div className="pv-italic" style={{
                        fontSize: "14.5px", lineHeight: 1.55,
                        color: "var(--color-warm-text)", opacity: 0.85,
                      }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <p className="pv-italic" style={{
          marginTop: "48px",
          fontSize: "14px", color: "var(--color-warm-text-light)",
          textAlign: "center", lineHeight: 1.7,
        }}>
          This page updates when the stack actually changes. Inspired by{" "}
          <a href="https://uses.tech" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-warm-accent)", textDecoration: "underline", textDecorationStyle: "dotted" }}>uses.tech</a>.
        </p>

      </main>

      <footer style={{
        position: "relative", zIndex: 5,
        padding: "24px 36px",
        borderTop: "1px solid var(--color-warm-border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--color-warm-text-light)",
      }}>
        <span>© {new Date().getFullYear()} Purcell Ventures LLC · Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← Home</a>
      </footer>
    </div>
  );
}
