"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";

const STACK = [
  {
    roman: "I.",
    category: "The Editor",
    items: [
      { name: "Claude Code",  desc: "The terminal AI assistant that wrote most of the code on this site. I pay for a subscription and use it every day." },
      { name: "VS Code",      desc: "For type-checking, debugging and design previews after the AI hands off." },
      { name: "Terminal",     desc: "PowerShell on Windows, iTerm2 and zsh on Mac." },
    ],
  },
  {
    roman: "II.",
    category: "Languages",
    items: [
      { name: "TypeScript",   desc: "Default for anything that ships to a browser or a phone." },
      { name: "Python",       desc: "Default for scraping, automation, AI calls and server code." },
      { name: "Bash and PowerShell",    desc: "Bash on Mac, PowerShell on Windows. Every workflow eventually gets a script." },
    ],
  },
  {
    roman: "III.",
    category: "Frameworks",
    items: [
      { name: "Next.js",      desc: "purcellventures.co, elijahbot-refresh and every web tool I ship." },
      { name: "React Native and Expo", desc: "Mobile apps, including Persona AI and a prayer-walk app." },
      { name: "Electron",     desc: "Desktop apps. ElijahBot Overlay is one." },
      { name: "Tailwind CSS", desc: "For styling when I am not writing inline styles." },
    ],
  },
  {
    roman: "IV.",
    category: "AI Stack",
    items: [
      { name: "Claude API",   desc: "Anthropic's API. Default LLM for everything I build." },
      { name: "OpenAI API",   desc: "Backup model and voice transcription with Whisper." },
      { name: "ElevenLabs",   desc: "TTS for the overlay's voice output." },
      { name: "Embedding APIs", desc: "Semantic search across notes, memory and content libraries." },
    ],
  },
  {
    roman: "V.",
    category: "Infrastructure",
    items: [
      { name: "Vercel",       desc: "Hosting for every Next.js site I ship." },
      { name: "Cloudflare Tunnel", desc: "For exposing localhost so the phone can reach the desktop dashboard." },
      { name: "ntfy.sh",      desc: "Push notifications without an app. Powers ElijahBot's phone-tap approvals." },
      { name: "Resend",       desc: "Transactional email, booking confirmations, lead notifications." },
      { name: "Supabase / Firebase", desc: "Whichever fits the app. Supabase for SQL, Firebase for realtime data and auth." },
    ],
  },
  {
    roman: "VI.",
    category: "Automation",
    items: [
      { name: "yt-dlp",       desc: "Source footage for the YouTube pipeline." },
      { name: "MoviePy",      desc: "Assembling generated content into final videos." },
      { name: "Selenium",     desc: "Headless scraping when an API doesn't exist." },
      { name: "Task Scheduler", desc: "Windows-side cron. Every ElijahBot job runs on it." },
    ],
  },
  {
    roman: "VII.",
    category: "Hardware",
    items: [
      { name: "Windows desktop", desc: "Runs the long-running automations." },
      { name: "MacBook",         desc: "For travel. Shares the same memory directory, synced through iCloud." },
      { name: "Android phone",   desc: "ntfy on the home screen for one-tap approvals from anywhere." },
      { name: "Condenser mic",   desc: "For worship, course recording and voiceover." },
    ],
  },
  {
    roman: "VIII.",
    category: "Tools I refuse",
    items: [
      { name: "Subscription bloat", desc: "If I don't open a subscription weekly, I cancel it." },
      { name: "No-code platforms", desc: "I used them and stopped because moving off them is hard. I write custom code instead." },
      { name: "Generic AI 'productivity' tools", desc: "I write my own workflows." },
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
          <div className="pv-mono-label">Updated May 2026</div>
          <h1>
            What I <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>use</em>
          </h1>
          <p className="deck">
            My stack: editor, languages, frameworks, AI, infrastructure, automation and hardware. I use every tool here in production work.
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
          I update this page when the stack changes. Inspired by{" "}
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
        <span>© {new Date().getFullYear()} Purcell Ventures LLC, Acworth, GA</span>
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>Home</a>
      </footer>
    </div>
  );
}
