"use client";

import { useState } from "react";

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

type Tab = "story" | "company" | "mark" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "story",   label: "Story"    },
  { id: "company", label: "Company"  },
  { id: "mark",    label: "The Mark" },
  { id: "contact", label: "Contact"  },
];

const prose: React.CSSProperties = {
  fontSize: "16px", color: "var(--color-warm-text-muted)",
  lineHeight: 1.85, marginBottom: "20px", maxWidth: "640px",
};

const h2Style: React.CSSProperties = {
  fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600,
  color: "var(--color-warm-text)", marginBottom: "32px",
};

const Divider = () => (
  <div style={{ width: "48px", height: "2px", background: "var(--color-warm-accent)", margin: "0 0 48px" }} />
);

function StoryTab() {
  return (
    <div>
      <p style={{ fontSize: "18px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "20px", maxWidth: "640px" }}>
        I&apos;m 18 years old. I have a company with four active divisions, software in production, and a clear sense of what I&apos;m building toward. I&apos;m not in a hurry to seem older than I am — I&apos;m in a hurry because the work matters.
      </p>
      <p style={{ ...prose, marginBottom: "48px" }}>
        I started Purcell Ventures out of a simple observation: the tools that change how businesses operate — AI automation, custom software, real digital infrastructure — were being engineered for enterprises and trickling down to small businesses as afterthoughts, if at all. The HVAC contractor, the barber, the florist: they work harder than most people I&apos;ve ever met and operate with a fraction of the support. That bothered me enough to do something about it.
      </p>

      <Divider />

      <h2 style={h2Style}>Background</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "48px" }}>
        {[
          { label: "Location",           value: "Acworth, Georgia" },
          { label: "Enrolling",          value: "University of Alabama, Fall 2026" },
          { label: "Program",            value: "Honors College — Psychology / Data Science" },
          { label: "Scholarship Record", value: "34 acceptances · $520k+/yr awarded" },
          { label: "Company",            value: "Purcell Ventures LLC (founded 2023)" },
          { label: "Contact",            value: "elijah@purcell-ventures.com" },
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

      <h2 style={h2Style}>Outside the Work</h2>
      <p style={prose}>
        I&apos;m a bass-baritone vocalist — range C1 to F5 — and I lead worship at church most Sundays. I write poetry nobody asked for. I&apos;m 6&apos;3&quot; and from Georgia, which means I&apos;ve never met a stranger in my life. I&apos;ve done mission trips to North Carolina, the Bahamas, and Hawaii. I founded a men&apos;s Bible study at my school, competed in apologetics and debate for four years, and earned a 3.92 GPA without once finding it particularly interesting to coast.
      </p>
      <p style={{ ...prose, marginBottom: 0 }}>
        I care about doing things that last. That&apos;s true of the software, the businesses, the relationships, and the faith. I don&apos;t think those are separate categories.
      </p>
    </div>
  );
}

function CompanyTab() {
  return (
    <div>
      <h2 style={h2Style}>Where This Is Going</h2>
      <p style={prose}>
        This fall I&apos;m going to the University of Alabama&apos;s Honors College to study psychology and data science. The endgame is psychiatry — specifically the intersection of AI-driven research and clinical mental health care. I believe the next generation of mental health treatment will be built on behavioral data, and I believe it needs to be built by people who understand both the science and the human being underneath it.
      </p>
      <p style={prose}>
        Purcell Ventures isn&apos;t separate from that goal — it&apos;s the foundation. Every system I build for a local business, every AI workflow I teach a team, every line of code I ship is practice in the same discipline: making technology work for people rather than against them.
      </p>
      <p style={{ ...prose, marginBottom: "48px" }}>
        My faith is the thread through all of it. I&apos;m a Christian, and I believe people are made in the image of God — which means every business I advise, every tool I build, and every patient I eventually treat deserves infrastructure and care that reflects that. That&apos;s not a tagline. It&apos;s the reason I do this at all.
      </p>

      <Divider />

      <h2 style={h2Style}>What We Build</h2>
      <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "580px" }}>
        Four divisions, one company. All of it owner-operated — when you work with Purcell Ventures, you work with me.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
    </div>
  );
}

function MarkTab() {
  return (
    <div>
      <h2 style={h2Style}>The Mark</h2>
      <p style={prose}>
        The Purcell Ventures mark is built on a deliberate inversion of Jeremy Bentham&apos;s panopticon — a prison design from 1791 where a single guard in a central tower could surveil every prisoner without them knowing when they were being watched. The uncertainty alone produced compliance. Michel Foucault later argued it wasn&apos;t just a prison design. It was the operating model of modern power: institutions exert control through the possibility of observation. You regulate yourself because you might be watched. The watcher stays hidden. The watched stays exposed.
      </p>
      <p style={prose}>
        The inverse of that isn&apos;t chaos. It&apos;s the principle most free societies claim to believe in and rarely practice: the powerful should be transparent and accountable, and ordinary people should have their privacy and freedom. The asymmetry should run upward, not downward. That&apos;s what the mark means. PV sits at the center — visible, declared, not hidden in a tower. The structure radiates outward as accountability arms, not inward as surveillance. The space beyond the rings belongs to the people we work with. We&apos;re the ones who are observable.
      </p>
      <p style={{ ...prose, marginBottom: "48px" }}>
        In 2026, that position is rarer than it should be. The systems most people depend on — the platforms, the algorithms, the AI models making decisions about their credit and their feed and their hiring — are deliberately opaque. The asymmetry Bentham designed for prisoners is now the default assumption of the economy. The mark is a refusal of that. My name is on the business. You deal with me directly. That&apos;s not a branding choice. It&apos;s a position.
      </p>

      <Divider />

      <h2 style={h2Style}>The Name</h2>
      <p style={prose}>
        Purcell Ventures is named after my family. Not a founder persona, not a brand construct — my actual last name. That&apos;s a choice that comes with accountability baked in. When something ships under this name, I shipped it. When a client has a problem, I answer for it. There&apos;s no layer of corporate abstraction between my reputation and the work.
      </p>
      <p style={{ ...prose, marginBottom: 0 }}>
        Ventures because that&apos;s what this is. Not a consultancy, not an agency, not a firm. A set of ventures — things being built, tested, and grown. The word carries risk and intention both. That&apos;s accurate.
      </p>
    </div>
  );
}

function ContactTab() {
  return (
    <div>
      <h2 style={h2Style}>Get in Touch</h2>
      <p style={{ fontSize: "16px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px" }}>
        Email is best. I respond the same day.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "56px" }}>
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

      <Divider />

      <h2 style={h2Style}>What to Expect</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          { q: "Who do I actually talk to?", a: "Me. Elijah Purcell. There's no team, no account manager, no handoff. You deal with the owner from first message to final delivery." },
          { q: "How fast do you respond?", a: "Same day on email, usually within a few hours. If you need an answer urgently, call or text." },
          { q: "Do you take on clients outside Atlanta?", a: "For digital services, consulting, and software — yes, anywhere. For field services (gutter cleaning, pressure washing, lawn care), Metro Atlanta only." },
          { q: "What's the best way to start?", a: "Email with a one-sentence description of what you need. I'll tell you honestly if I can help and what it would look like." },
        ].map(({ q, a }) => (
          <div key={q} style={{
            padding: "24px",
            border: "1px solid var(--color-warm-border)",
            borderRadius: "6px",
            background: "var(--color-warm-card)",
          }}>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text)", marginBottom: "10px" }}>
              {q}
            </div>
            <div style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7 }}>
              {a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>("story");

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

        {/* Page header — always visible */}
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px" }}>
          About
        </p>
        <h1 style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700,
          lineHeight: 1.05, letterSpacing: "-0.02em",
          color: "var(--color-warm-text)", marginBottom: "48px",
        }}>
          Elijah Purcell
        </h1>

        {/* Tab bar */}
        <div style={{
          display: "flex", gap: "0",
          borderBottom: "1px solid var(--color-warm-border)",
          marginBottom: "56px",
        }}>
          {TABS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "12px 24px",
                  fontSize: "13px", fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.04em",
                  color: isActive ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)",
                  borderBottom: isActive ? "2px solid var(--color-warm-accent)" : "2px solid transparent",
                  marginBottom: "-1px",
                  transition: "color 0.15s, border-color 0.15s",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "story"   && <StoryTab />}
        {activeTab === "company" && <CompanyTab />}
        {activeTab === "mark"    && <MarkTab />}
        {activeTab === "contact" && <ContactTab />}

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
