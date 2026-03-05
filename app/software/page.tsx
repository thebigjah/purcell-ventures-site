const PROJECTS = [
  {
    name: "Pulse",
    type: "Android App",
    desc: "Rhythm game with Spotify integration. Players tap to their own music as rings expand to the beat. Live on the Google Play Store.",
    tags: ["React Native", "Phaser.js", "Firebase", "Spotify API", "Capacitor"],
    status: "live" as const,
    label: "Play Store",
  },
  {
    name: "Purcell Ventures",
    type: "Web Platform",
    desc: "This site — a full multi-division business platform with AI tools, a business finder powered by the Google Places API, and a private sales system.",
    tags: ["Next.js", "TypeScript", "Vercel", "Google Places API"],
    status: "live" as const,
    label: "Live Site",
  },
  {
    name: "ColdMaid",
    type: "Chrome Extension",
    desc: "Multiplayer card game as a Chrome extension. Neural network bots trained via genetic algorithm compete against human players.",
    tags: ["Chrome Extension", "Firebase", "Neural Networks", "OAuth"],
    status: "live" as const,
    label: "Extension",
  },
  {
    name: "ElijahBot Overlay",
    type: "Desktop App",
    desc: "AI-powered desktop overlay with voice input, screen vision, TTS output, and a custom neural net visualizer. Built with Electron + Claude API.",
    tags: ["Electron", "Claude API", "ElevenLabs", "Web Speech API"],
    status: "live" as const,
    label: "Desktop",
  },
  {
    name: "Persona AI",
    type: "Mobile App",
    desc: "Hyper-personalized AI companion — an AI that actually knows you. Tracks your goals, habits, fitness, and adapts to how you think.",
    tags: ["Expo", "React Native", "Claude API", "Express"],
    status: "building" as const,
    label: "In Development",
  },
];

const SERVICES = [
  {
    icon: "📱",
    title: "Mobile Apps",
    desc: "iOS and Android apps built with React Native or Expo. From idea to app store — design, development, and deployment.",
    examples: ["Social apps", "Business tools", "Games", "AI-powered apps"],
  },
  {
    icon: "🌐",
    title: "Web Applications",
    desc: "Full-stack web apps built with Next.js. Fast, modern, and ready to scale. Landing pages to full SaaS platforms.",
    examples: ["Business platforms", "Dashboards", "E-commerce", "APIs"],
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "Bring AI into your product — chatbots, content generation, voice interfaces, recommendation engines, and automation.",
    examples: ["AI chatbots", "Content pipelines", "Voice tools", "Smart automation"],
  },
  {
    icon: "⚙️",
    title: "Automation & Tools",
    desc: "Custom tools, scripts, and pipelines that save time and cut manual work. Chrome extensions, schedulers, data processors.",
    examples: ["Chrome extensions", "Batch processors", "Scrapers", "Schedulers"],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery Call", desc: "30 minutes. You explain the problem. I ask questions and tell you honestly what it takes to build." },
  { step: "02", title: "Scoped Proposal", desc: "I send a written breakdown — what gets built, what it costs, what the timeline looks like. No surprises." },
  { step: "03", title: "Build", desc: "You get updates throughout. I use Claude to move fast without cutting corners on quality." },
  { step: "04", title: "Launch + Support", desc: "Deploy, test, ship. I stay available for fixes and follow-on work after launch." },
];

export default function SoftwarePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", fontFamily: "Inter, sans-serif" }}>

      {/* Nav */}
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--color-warm-border)" }}>
        <a href="/" style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-warm-text)", letterSpacing: "-0.01em", textDecoration: "none" }}>
          Purcell <span style={{ color: "var(--color-warm-accent)" }}>Ventures</span>
        </a>
        <a href="tel:+17702805319" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>
          (770) 280-5319
        </a>
      </nav>

      {/* Hero */}
      <section style={{ padding: "96px 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
          Custom Software Development
        </p>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--color-warm-text)", marginBottom: "28px" }}>
          Software built for<br />
          <span style={{ color: "var(--color-warm-accent)" }}>your actual problem.</span>
        </h1>
        <p style={{ fontSize: "18px", color: "var(--color-warm-text-muted)", maxWidth: "520px", lineHeight: 1.75, marginBottom: "40px" }}>
          I build mobile apps, web platforms, and AI-powered tools. Fast turnaround, transparent pricing, and I stay involved after launch.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="mailto:elijah@purcellventures.co?subject=Software Project Inquiry" style={{ padding: "14px 28px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "6px", textDecoration: "none" }}>
            Start a Project
          </a>
          <a href="#work" style={{ padding: "14px 28px", background: "none", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", fontSize: "14px", fontWeight: 600, borderRadius: "6px", textDecoration: "none" }}>
            See My Work
          </a>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "32px" }}>
          What I Build
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "var(--color-warm-border)" }}>
          {SERVICES.map((s) => (
            <div key={s.title} style={{ background: "var(--color-warm-bg)", padding: "28px 24px" }}>
              <div style={{ fontSize: "28px", marginBottom: "14px" }}>{s.icon}</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "10px" }}>{s.title}</div>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, marginBottom: "16px" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {s.examples.map(e => (
                  <span key={e} style={{ fontSize: "11px", padding: "3px 8px", background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: "3px", color: "var(--color-warm-text-muted)" }}>{e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="work" style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "32px" }}>
          Recent Work
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--color-warm-border)" }}>
          {PROJECTS.map((p) => (
            <div key={p.name} style={{ background: "var(--color-warm-bg)", padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, color: "var(--color-warm-text)" }}>{p.name}</span>
                  <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", background: "var(--color-warm-card)", padding: "2px 8px", borderRadius: "3px", border: "1px solid var(--color-warm-border)" }}>{p.type}</span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, marginBottom: "14px", maxWidth: "560px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: "11px", padding: "3px 8px", background: `var(--color-warm-accent)12`, border: "1px solid var(--color-warm-accent)30", borderRadius: "3px", color: "var(--color-warm-accent)" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: p.status === "live" ? "var(--color-warm-accent)" : "var(--color-warm-text-light)", display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                  {p.status === "live" && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-warm-accent)", display: "inline-block" }} />}
                  {p.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "32px" }}>
          How It Works
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "var(--color-warm-border)" }}>
          {PROCESS.map((p) => (
            <div key={p.step} style={{ background: "var(--color-warm-bg)", padding: "28px 24px" }}>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--color-warm-border)", fontFamily: "'Cinzel', Georgia, serif", marginBottom: "14px", lineHeight: 1 }}>{p.step}</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "10px" }}>{p.title}</div>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "0 32px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: "12px", padding: "40px 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px" }}>Small Projects</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-warm-text)", marginBottom: "8px" }}>$500–1,500</div>
            <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>Landing pages, Chrome extensions, small tools, automation scripts.</p>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px" }}>Full Apps</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-warm-text)", marginBottom: "8px" }}>$1,500–5,000</div>
            <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>Mobile apps, web platforms, AI-powered tools, full-stack applications.</p>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px" }}>Ongoing</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--color-warm-text)", marginBottom: "8px" }}>Custom</div>
            <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>Retainer-based work, long-term projects, feature development over time.</p>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "var(--color-warm-text-light)", marginTop: "16px", textAlign: "center" }}>
          All projects start with a free 30-minute discovery call. No obligation.
        </p>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 32px 96px", maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "20px" }}>
          Have a project in mind?
        </h2>
        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", marginBottom: "32px" }}>
          Tell me what you're trying to build. I'll tell you if I can help and what it takes.
        </p>
        <a href="mailto:elijah@purcellventures.co?subject=Software Project Inquiry" style={{ padding: "16px 36px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "15px", fontWeight: 700, borderRadius: "6px", textDecoration: "none" }}>
          Email Elijah →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>© {new Date().getFullYear()} Purcell Ventures LLC</span>
        <a href="/" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", textDecoration: "none" }}>← All Divisions</a>
      </footer>
    </div>
  );
}
