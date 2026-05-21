"use client";
import { VignetteBackground } from "@/app/components/VignetteBackground";

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
    roman: "i.",
    title: "Mobile Apps",
    desc: "iOS and Android apps built with React Native or Expo. From idea to app store — design, development, and deployment.",
    examples: ["Social apps", "Business tools", "Games", "AI-powered apps"],
  },
  {
    roman: "ii.",
    title: "Web Applications",
    desc: "Full-stack web apps built with Next.js. Fast, modern, and ready to scale. Landing pages to full SaaS platforms.",
    examples: ["Business platforms", "Dashboards", "E-commerce", "APIs"],
  },
  {
    roman: "iii.",
    title: "AI Integration",
    desc: "Bring AI into your product — chatbots, content generation, voice interfaces, recommendation engines, and automation.",
    examples: ["AI chatbots", "Content pipelines", "Voice tools", "Smart automation"],
  },
  {
    roman: "iv.",
    title: "Automation & Tools",
    desc: "Custom tools, scripts, and pipelines that save time and cut manual work. Chrome extensions, schedulers, data processors.",
    examples: ["Chrome extensions", "Batch processors", "Scrapers", "Schedulers"],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery Call",   desc: "30 minutes. You explain the problem. I ask questions and tell you honestly what it takes to build." },
  { step: "02", title: "Scoped Proposal",  desc: "I send a written breakdown — what gets built, what it costs, what the timeline looks like. No surprises." },
  { step: "03", title: "Build",            desc: "You get updates throughout. I use Claude to move fast without cutting corners on quality." },
  { step: "04", title: "Launch + Support", desc: "Deploy, test, ship. I stay available for fixes and follow-on work after launch." },
];

export default function SoftwarePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .pv-sw-services, .pv-sw-process, .pv-sw-pricing { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      ` }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Editorial page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Division III · Custom Software</div>
          <h1>
            Software built for <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>your actual problem.</em>
          </h1>
          <p className="deck">
            Mobile apps, web platforms, and AI-powered tools. Fast turnaround, transparent pricing, and I stay involved after launch.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a className="pv-btn-primary" href="mailto:elijah@purcell-ventures.com?subject=Software Project Inquiry">
              Start a project
            </a>
            <a className="pv-btn-ghost" href="#work">See my work</a>
          </div>
        </header>

        {/* Services */}
        <header className="pv-section-head">
          <span className="roman">I.</span>
          <h2>What I build</h2>
        </header>
        <div className="pv-sw-services" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "64px" }}>
          {SERVICES.map((s) => (
            <div key={s.title} className="pv-card" style={{ padding: "28px 28px 24px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "10px" }}>
                <span className="pv-italic" style={{ fontSize: "22px", color: "var(--color-warm-accent)", lineHeight: 1 }}>{s.roman}</span>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--color-warm-text)", textTransform: "uppercase", lineHeight: 1.1, margin: 0 }}>
                  {s.title}
                </h3>
              </div>
              <p className="pv-italic" style={{ fontSize: "15.5px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, marginBottom: "16px" }}>
                {s.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {s.examples.map((e) => (
                  <span key={e} style={{
                    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                    padding: "4px 10px",
                    border: "1px solid var(--color-warm-border)",
                    color: "var(--color-warm-text-muted)",
                  }}>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio */}
        <header className="pv-section-head" id="work">
          <span className="roman">II.</span>
          <h2>Recent <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>work</em></h2>
        </header>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "64px" }}>
          {PROJECTS.map((p) => (
            <div key={p.name} className="pv-card" style={{
              display: "grid", gridTemplateColumns: "1fr auto",
              gap: "24px", alignItems: "start",
              padding: "32px 32px 26px",
            }}>
              <span className="b3"></span><span className="b4"></span>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "10px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--color-warm-text)" }}>
                    {p.name}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                    padding: "3px 10px", border: "1.5px solid var(--color-warm-border)",
                    color: "var(--color-warm-text-muted)",
                  }}>
                    {p.type}
                  </span>
                </div>
                <p className="pv-italic" style={{ fontSize: "15.5px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, marginBottom: "14px", maxWidth: "640px" }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                      fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase",
                      padding: "3px 8px",
                      border: "1px solid var(--color-warm-accent)",
                      color: "var(--color-warm-accent)",
                      opacity: 0.85,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.24em", textTransform: "uppercase",
                  color: p.status === "live" ? "var(--color-warm-accent)" : "var(--color-warm-text-light)",
                  display: "inline-flex", alignItems: "center", gap: "8px",
                }}>
                  {p.status === "live" && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-warm-accent)", display: "inline-block" }} />}
                  {p.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <header className="pv-section-head">
          <span className="roman">III.</span>
          <h2>How it <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>works</em></h2>
        </header>
        <div className="pv-sw-process" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "64px" }}>
          {PROCESS.map((p) => (
            <div key={p.step} className="pv-card" style={{ padding: "28px 24px 24px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                fontSize: "44px", color: "var(--color-warm-accent)",
                lineHeight: 1, marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}>
                {p.step}
              </div>
              <h4 style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
                fontSize: "16px", letterSpacing: "0.02em",
                color: "var(--color-warm-text)", textTransform: "uppercase",
                marginBottom: "10px", lineHeight: 1.15, margin: "0 0 10px",
              }}>
                {p.title}
              </h4>
              <p className="pv-italic" style={{ fontSize: "14.5px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <header className="pv-section-head">
          <span className="roman">IV.</span>
          <h2>Pricing <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>tiers</em></h2>
        </header>
        <div className="pv-sw-pricing" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {[
            { tier: "Small projects", price: "$1,500 – 3,500", desc: "Landing pages, Chrome extensions, small tools, automation scripts." },
            { tier: "Full apps",      price: "$5,000 – 15,000", desc: "Mobile apps, web platforms, AI-powered tools, full-stack applications." },
            { tier: "Ongoing",        price: "Custom",          desc: "Retainer-based work, long-term projects, feature development over time." },
          ].map(t => (
            <div key={t.tier} className="pv-card" style={{ padding: "32px 28px" }}>
              <span className="b3"></span><span className="b4"></span>
              <div className="pv-mono-label" style={{ marginBottom: "12px" }}>{t.tier}</div>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
                fontSize: "28px", color: "var(--color-warm-text)",
                letterSpacing: "-0.01em", marginBottom: "12px",
              }}>
                {t.price}
              </div>
              <p className="pv-italic" style={{ fontSize: "14.5px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, margin: 0 }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="pv-italic" style={{ fontSize: "14px", color: "var(--color-warm-text-light)", marginTop: "20px", textAlign: "center" }}>
          All projects start with a free 30-minute discovery call. No obligation.
        </p>

        {/* CTA */}
        <section style={{
          marginTop: "80px",
          padding: "56px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
            fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
          }}>
            ✦
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            marginBottom: "16px", lineHeight: 1.15,
          }}>
            Have a project <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>in mind?</em>
          </h2>
          <p className="pv-italic" style={{
            fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.85,
            maxWidth: "560px", margin: "0 auto 32px", lineHeight: 1.55,
          }}>
            Tell me what you&apos;re trying to build. I&apos;ll tell you if I can help and what it takes.
          </p>
          <a className="pv-btn-primary" href="mailto:elijah@purcell-ventures.com?subject=Software Project Inquiry">
            Email Elijah →
          </a>
        </section>

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
        <a href="/" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← All divisions</a>
      </footer>
    </div>
  );
}
