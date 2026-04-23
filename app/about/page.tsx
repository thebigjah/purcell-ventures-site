const DIVISIONS = [
  {
    label: "Digital Services",
    desc: "Complete digital toolkit for small businesses — website, AI chatbot, booking system, CRM, email marketing, and 20+ tools. Fully managed. One subscription.",
    href: "/digital",
    price: "From $75/mo",
  },
  {
    label: "AI Consulting",
    desc: "Hands-on AI training for business teams. ChatGPT workflows, marketing automation, and custom sessions. I come to your office. Same-day results.",
    href: "/consulting",
    price: "From $40/person",
  },
  {
    label: "Custom Software",
    desc: "Mobile apps, web apps, and AI integrations scoped and built around your exact problem. From idea to launch.",
    href: "/software",
    price: "From $500",
  },
  {
    label: "Purcell Works — Field Services",
    desc: "Owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta. You deal directly with the owner.",
    href: "/services",
    price: "From $50",
  },
];

const Divider = () => (
  <div style={{ width: "48px", height: "2px", background: "var(--color-warm-accent)", marginBottom: "64px" }} />
);

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)" }}>

      {/* Nav */}
      <nav style={{
        padding: "0 24px", height: "60px", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid var(--color-warm-border)",
      }}>
        <a href="/" style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-warm-text)", letterSpacing: "-0.01em", textDecoration: "none" }}>
          Purcell <span style={{ color: "var(--color-warm-accent)" }}>Ventures</span>
        </a>
        <a href="mailto:elijah@purcell-ventures.com" style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>
          elijah@purcell-ventures.com
        </a>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px 120px" }}>

        {/* Eyebrow */}
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px" }}>
          About
        </p>

        {/* Hero */}
        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700,
          lineHeight: 1.05, letterSpacing: "-0.02em",
          color: "var(--color-warm-text)", marginBottom: "32px",
        }}>
          Elijah Purcell
        </h1>

        <p style={{ fontSize: "18px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "20px", maxWidth: "640px" }}>
          I&apos;m 18 years old. I have a company with four active divisions, software in production, and a clear sense of what I&apos;m building toward. I&apos;m not in a hurry to seem older than I am — I&apos;m in a hurry because the work matters.
        </p>

        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "64px", maxWidth: "640px" }}>
          I started Purcell Ventures out of a simple observation: the tools that change how businesses operate — AI automation, custom software, real digital infrastructure — were being engineered for enterprises and trickling down to small businesses as afterthoughts, if at all. The HVAC contractor, the barber, the florist: they work harder than most people I&apos;ve ever met and operate with a fraction of the support. That bothered me enough to do something about it.
        </p>

        <Divider />

        {/* Fast facts */}
        <h2 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600,
          color: "var(--color-warm-text)", marginBottom: "32px",
        }}>
          Background
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "64px" }}>
          {[
            { label: "Location", value: "Acworth, Georgia" },
            { label: "Enrolling", value: "University of Alabama, Fall 2026" },
            { label: "Program", value: "Honors College — Psychology / Data Science" },
            { label: "Scholarship Record", value: "34 acceptances · $520k+/yr awarded" },
            { label: "Company", value: "Purcell Ventures LLC (founded 2023)" },
            { label: "Contact", value: "elijah@purcell-ventures.com" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: "20px 24px",
              border: "1px solid var(--color-warm-border)",
              borderRadius: "6px",
              background: "var(--color-warm-card)",
            }}>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "8px" }}>
                {label}
              </div>
              <div style={{ fontSize: "15px", color: "var(--color-warm-text)", lineHeight: 1.5 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Mission */}
        <h2 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600,
          color: "var(--color-warm-text)", marginBottom: "32px",
        }}>
          Where This Is Going
        </h2>

        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "20px", maxWidth: "640px" }}>
          This fall I&apos;m going to the University of Alabama&apos;s Honors College to study psychology and data science. The endgame is psychiatry — specifically the intersection of AI-driven research and clinical mental health care. I believe the next generation of mental health treatment will be built on behavioral data, and I believe it needs to be built by people who understand both the science and the human being underneath it.
        </p>

        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "20px", maxWidth: "640px" }}>
          Purcell Ventures isn&apos;t separate from that goal — it&apos;s the foundation. Every system I build for a local business, every AI workflow I teach a team, every line of code I ship is practice in the same discipline: making technology work for people rather than against them.
        </p>

        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "64px", maxWidth: "640px" }}>
          My faith is the thread through all of it. I&apos;m a Christian, and I believe people are made in the image of God — which means every business I advise, every tool I build, and every patient I eventually treat deserves infrastructure and care that reflects that. That&apos;s not a tagline. It&apos;s the reason I do this at all.
        </p>

        <Divider />

        {/* Divisions */}
        <h2 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600,
          color: "var(--color-warm-text)", marginBottom: "16px",
        }}>
          What We Build
        </h2>

        <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "580px" }}>
          Four divisions, one company. All of it owner-operated — when you work with Purcell Ventures, you work with me.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "64px" }}>
          {DIVISIONS.map((d) => (
            <a key={d.label} href={d.href} style={{
              display: "block", padding: "24px",
              border: "1px solid var(--color-warm-border)",
              borderRadius: "6px", background: "var(--color-warm-card)",
              textDecoration: "none",
              transition: "border-color 0.15s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, color: "var(--color-warm-text)" }}>
                  {d.label}
                </span>
                <span style={{ fontSize: "13px", color: "var(--color-warm-accent)", fontWeight: 600, marginLeft: "16px", flexShrink: 0 }}>
                  {d.price}
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.65, margin: 0 }}>
                {d.desc}
              </p>
            </a>
          ))}
        </div>

        <Divider />

        {/* The person */}
        <h2 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600,
          color: "var(--color-warm-text)", marginBottom: "32px",
        }}>
          Outside the Work
        </h2>

        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "20px", maxWidth: "640px" }}>
          I&apos;m a bass-baritone vocalist — range C1 to F5 — and I lead worship at church most Sundays. I write poetry nobody asked for. I&apos;m 6&apos;3&quot; and from Georgia, which means I&apos;ve never met a stranger in my life. I&apos;ve done mission trips to North Carolina, the Bahamas, and Hawaii. I founded a men&apos;s Bible study at my school, competed in apologetics and debate for four years, and earned a 3.92 GPA without once finding it particularly interesting to coast.
        </p>

        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "64px", maxWidth: "640px" }}>
          I care about doing things that last. That&apos;s true of the software, the businesses, the relationships, and the faith. I don&apos;t think those are separate categories.
        </p>

        <Divider />

        {/* Contact */}
        <h2 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600,
          color: "var(--color-warm-text)", marginBottom: "24px",
        }}>
          Get in Touch
        </h2>
        <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px" }}>
          Email is best. I respond the same day.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="mailto:elijah@purcell-ventures.com" style={{
            display: "inline-flex", alignItems: "center",
            padding: "12px 24px", border: "1px solid var(--color-warm-accent)",
            borderRadius: "4px", color: "var(--color-warm-accent)",
            fontSize: "14px", fontWeight: 600, textDecoration: "none",
          }}>
            elijah@purcell-ventures.com
          </a>
          <a href="tel:+17702805319" style={{
            display: "inline-flex", alignItems: "center",
            padding: "12px 24px", border: "1px solid var(--color-warm-border)",
            borderRadius: "4px", color: "var(--color-warm-text-muted)",
            fontSize: "14px", fontWeight: 600, textDecoration: "none",
          }}>
            (770) 280-5319
          </a>
          <a href="https://www.linkedin.com/in/elijah-purcell-5128a9256" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center",
            padding: "12px 24px", border: "1px solid var(--color-warm-border)",
            borderRadius: "4px", color: "var(--color-warm-text-muted)",
            fontSize: "14px", fontWeight: 600, textDecoration: "none",
          }}>
            LinkedIn
          </a>
          <a href="/resume" style={{
            display: "inline-flex", alignItems: "center",
            padding: "12px 24px", border: "1px solid var(--color-warm-border)",
            borderRadius: "4px", color: "var(--color-warm-text-muted)",
            fontSize: "14px", fontWeight: 600, textDecoration: "none",
          }}>
            Resume →
          </a>
        </div>
      </main>

      <footer style={{ padding: "24px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "13px", color: "var(--color-warm-text-light)" }}>
          © {new Date().getFullYear()} Purcell Ventures LLC
        </span>
        <a href="/" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", textDecoration: "none" }}>← Back to home</a>
      </footer>
    </div>
  );
}
