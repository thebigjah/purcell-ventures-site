"use client";

import { useState } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PanopticonMark } from "@/app/components/PanopticonMark";

const LAMPSTAND_MARK = {
  cellStyle: "outlined" as const,
  pvSize: 70, pvClearR: 58,
  ringStart: 70, ringEnd: 116,
  numRings: 7, ringFadeToCenter: true,
};

const DIVISIONS = [
  {
    roman: "I.",
    label: "Digital Services",
    desc: "Complete digital toolkit for small businesses: website, AI chatbot, booking system, CRM, email marketing, and 20+ tools. Fully managed. One subscription.",
    href: "/digital",
    price: "From $99/mo",
  },
  {
    roman: "II.",
    label: "AI Consulting",
    desc: "Hands-on AI training for business teams. ChatGPT workflows, marketing automation, and custom sessions. I come to your office. Same-day results.",
    href: "/consulting",
    price: "From $125/person",
  },
  {
    roman: "III.",
    label: "Custom Software",
    desc: "Mobile apps, web apps, and AI integrations scoped and built around your exact problem. From idea to launch.",
    href: "/software",
    price: "From $1,500",
  },
  {
    roman: "IV.",
    label: "Mantle Field Services (sister brand)",
    desc: "Owner-operated gutter cleaning, pressure washing, and lawn care in Metro Atlanta, run under its own brand. Same owner, same standards.",
    href: "https://mantle-field-site.vercel.app",
    price: "From $50",
  },
  {
    roman: "V.",
    label: "Steady: Personal IT",
    desc: "Personal tech help for individuals and households. AI coaching, phone setup, password managers, medication reminders, smart home, family care plans. For when you're the family tech person and need to hand the job off.",
    href: "/steady",
    price: "From $79/mo",
  },
];

type Tab = "story" | "company" | "mark" | "contact";

const TABS: { id: Tab; label: string; roman: string }[] = [
  { id: "story",   roman: "I.",   label: "Story"    },
  { id: "company", roman: "II.",  label: "Company"  },
  { id: "mark",    roman: "III.", label: "The Mark" },
  { id: "contact", roman: "IV.",  label: "Contact"  },
];

// About-page-specific mobile rules. Vignette base styles live in globals.css.
const ABOUT_PAGE_CSS = `
  @media (max-width: 900px) {
    .pv-stat-grid { grid-template-columns: 1fr !important; }
    .pv-tabs { flex-wrap: wrap !important; }
    .pv-tab-roman { display: none !important; }
  }
`;

const prose: React.CSSProperties = {
  fontFamily: "Georgia, serif", fontStyle: "italic",
  fontSize: "18px", color: "var(--color-warm-text)",
  opacity: 0.92, lineHeight: 1.55, marginBottom: "20px", maxWidth: "640px",
};

const h2Style: React.CSSProperties = {
  fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
  fontSize: "28px", letterSpacing: "0.04em",
  color: "var(--color-warm-text)", textTransform: "uppercase",
  marginBottom: "24px", lineHeight: 1.1,
};

function SectionHead({ roman, title, em }: { roman: string; title: string; em?: string }) {
  return (
    <header style={{
      padding: "48px 0 24px",
      display: "grid", gridTemplateColumns: "auto 1fr",
      gap: "20px", alignItems: "baseline",
      borderBottom: "1px solid var(--color-warm-border)",
      marginBottom: "32px",
    }}>
      <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 400, fontSize: "40px", lineHeight: 1, color: "var(--color-warm-accent)" }}>
        {roman}
      </span>
      <h2 style={{
        fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
        fontSize: "24px", letterSpacing: "0.04em",
        color: "var(--color-warm-text)", textTransform: "uppercase",
        margin: 0,
      }}>
        {title}{em && (
          <em className="pv-italic" style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--color-warm-accent)", marginLeft: "10px" }}>
            {em}
          </em>
        )}
      </h2>
    </header>
  );
}

function StoryTab() {
  return (
    <div>
      {/* Floated so the opening paragraph wraps around it rather than being shoved down
          the page. Square, hairline border, same editorial language as the rules and
          section heads. Cropped from 20 percent down because his head sits high in the
          frame and a centre crop takes the top of it off. */}
      <img
        src="/brand/elijah.jpg"
        alt="Elijah Purcell, founder of Purcell Ventures LLC and University of Alabama student"
        width={148}
        height={148}
        style={{
          float: "right",
          width: "148px",
          height: "148px",
          objectFit: "cover",
          objectPosition: "50% 20%",
          margin: "4px 0 16px 28px",
          border: "1px solid currentColor",
        }}
      />
      <p className="pv-italic" style={{ ...prose, fontSize: "22px", maxWidth: "640px" }}>
        I&apos;m 19 years old. I have a company with four active divisions, software in production, and a clear sense of what I&apos;m building toward. I&apos;m not in a hurry to seem older than I am. I&apos;m in a hurry because the work matters. <a href="/who" style={{ color: "var(--color-warm-accent)" }}>The short factual version of who Elijah Purcell is</a> lives on its own page.
      </p>
      <p style={prose}>
        I started Purcell Ventures out of a simple observation: the tools that change how businesses operate, meaning AI automation, custom software and real digital infrastructure, were being engineered for enterprises and trickling down to small businesses as afterthoughts, if at all. The HVAC contractor, the barber, the florist: they work harder than most people I&apos;ve ever met and operate with a fraction of the support. That bothered me enough to do something about it.
      </p>

      <SectionHead roman="§" title="Background" em="at a glance" />

      <div className="pv-stat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "48px" }}>
        {[
          { label: "Location",           value: "Tuscaloosa, Alabama" },
          { label: "University",         value: "University of Alabama, Class of 2030" },
          { label: "Program",            value: "Honors College, psychology and data science" },
          { label: "Shipped",            value: "15+ production applications, designed and coded solo" },
          { label: "Company",            value: "Purcell Ventures LLC (founded April 2025)" },
          { label: "Contact",            value: "elijah@purcell-ventures.com" },
        ].map(({ label, value }) => (
          <div key={label} className="pv-card" style={{ padding: "28px 28px 22px" }}>
            <span className="b3"></span><span className="b4"></span>
            <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px" }}>
              {label}
            </div>
            <div className="pv-italic" style={{ fontSize: "17px", color: "var(--color-warm-text)", lineHeight: 1.4 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <SectionHead roman="§" title="Outside the work" />
      <p style={prose}>
        I&apos;m a bass-baritone vocalist, range C1 to F5, and I lead worship at church most Sundays. I write poetry nobody asked for. I&apos;m 6&apos;3&quot; and from Georgia, which means I&apos;ve never met a stranger in my life. I&apos;ve done mission trips to North Carolina, the Bahamas, Hawaii, and Alaska. I was a member of my school&apos;s men&apos;s Bible study, competed in apologetics and debate for four years, and earned a 3.92 GPA without once finding it particularly interesting to coast.
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
      <SectionHead roman="§" title="Where this is going" />
      <p style={prose}>
        I&apos;m at the University of Alabama&apos;s Honors College to study psychology and data science. The endgame is psychiatry, specifically the intersection of AI-driven research and clinical mental health care. I believe the next generation of mental health treatment will be built on behavioral data, and I believe it needs to be built by people who understand both the science and the human being underneath it.
      </p>
      <p style={prose}>
        Purcell Ventures isn&apos;t separate from that goal. It&apos;s the foundation. Every system I build for a local business, every AI workflow I teach a team, every line of code I ship is practice in the same discipline: making technology work for people rather than against them.
      </p>
      <p style={{ ...prose, marginBottom: "48px" }}>
        My faith is the thread through all of it. I&apos;m a Christian, and I believe people are made in the image of God, which means every business I advise, every tool I build, and every patient I eventually treat deserves infrastructure and care that reflects that. That&apos;s not a tagline. It&apos;s the reason I do this at all.
      </p>

      <SectionHead roman="§" title="What we build" em="four divisions, one operator" />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {DIVISIONS.map((d) => (
          <a key={d.label} href={d.href} className="pv-card" style={{ display: "block", paddingTop: "32px" }}>
            <span className="b3"></span><span className="b4"></span>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              gap: "16px", marginBottom: "12px",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
                <span className="pv-italic" style={{ fontSize: "24px", color: "var(--color-warm-accent)", lineHeight: 1 }}>{d.roman}</span>
                <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 600, letterSpacing: "0.02em", color: "var(--color-warm-text)", textTransform: "uppercase", lineHeight: 1.1 }}>
                  {d.label}
                </span>
              </div>
              <span style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--color-warm-accent)", marginLeft: "16px", flexShrink: 0,
                whiteSpace: "nowrap",
              }}>
                {d.price}
              </span>
            </div>
            <p className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.55, margin: 0 }}>
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
      <SectionHead roman="§" title="The Mark" em="an inverse panopticon" />

      {/* The actual mark, rendered large */}
      <div style={{
        display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "32px 0 8px",
        marginBottom: "16px",
      }}>
        <div style={{
          padding: "32px",
          border: "1px solid var(--color-warm-border)",
          background: "rgba(20, 18, 16, 0.4)",
          position: "relative",
        }}>
          <span style={{ position: "absolute", top: 8, left: 8, width: 16, height: 16, borderTop: "1.5px solid var(--color-warm-accent)", borderLeft: "1.5px solid var(--color-warm-accent)", display: "block" }} />
          <span style={{ position: "absolute", top: 8, right: 8, width: 16, height: 16, borderTop: "1.5px solid var(--color-warm-accent)", borderRight: "1.5px solid var(--color-warm-accent)", display: "block" }} />
          <span style={{ position: "absolute", bottom: 8, left: 8, width: 16, height: 16, borderBottom: "1.5px solid var(--color-warm-accent)", borderLeft: "1.5px solid var(--color-warm-accent)", display: "block" }} />
          <span style={{ position: "absolute", bottom: 8, right: 8, width: 16, height: 16, borderBottom: "1.5px solid var(--color-warm-accent)", borderRight: "1.5px solid var(--color-warm-accent)", display: "block" }} />
          <PanopticonMark size={240} color="var(--color-warm-accent)" bg="transparent" cfg={LAMPSTAND_MARK} />
        </div>
      </div>
      <div style={{
        textAlign: "center",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--color-warm-text-light)",
        marginBottom: "40px",
      }}>
        Fig. I · The Purcell mark · Lampstand cfg
      </div>

      <p style={prose}>
        The Purcell Ventures mark is built on a deliberate inversion of Jeremy Bentham&apos;s panopticon, a prison design from 1791 where a single guard in a central tower could surveil every prisoner without them knowing when they were being watched. The uncertainty alone produced compliance. Michel Foucault later argued it wasn&apos;t just a prison design. It was the operating model of modern power: institutions exert control through the possibility of observation. You regulate yourself because you might be watched. The watcher stays hidden. The watched stays exposed.
      </p>
      <p style={prose}>
        The inverse of that isn&apos;t chaos. It&apos;s the principle most free societies claim to believe in and rarely practice: the powerful should be transparent and accountable, and ordinary people should have their privacy and freedom. The asymmetry should run upward, not downward. That&apos;s what the mark means. PV sits at the center: visible, declared, not hidden in a tower. The structure radiates outward as accountability arms, not inward as surveillance. The space beyond the rings belongs to the people we work with. We&apos;re the ones who are observable.
      </p>
      <p style={{ ...prose, marginBottom: "32px" }}>
        In 2026, that position is rarer than it should be. The systems most people depend on, the platforms and the algorithms and the AI models making decisions about their credit and their feed and their hiring, are deliberately opaque. The asymmetry Bentham designed for prisoners is now the default assumption of the economy. The mark is a refusal of that. My name is on the business. You deal with me directly. That&apos;s not a branding choice. It&apos;s a position.
      </p>

      <SectionHead roman="§" title="The Name" />
      <p style={prose}>
        Purcell Ventures is named after my family. Not a founder persona, not a brand construct. My actual last name. That&apos;s a choice that comes with accountability baked in. When something ships under this name, I shipped it. When a client has a problem, I answer for it. There&apos;s no layer of corporate abstraction between my reputation and the work.
      </p>
      <p style={{ ...prose, marginBottom: 0 }}>
        Ventures because that&apos;s what this is. Not a consultancy, not an agency, not a firm. A set of ventures: things being built, tested, and grown. The word carries risk and intention both. That&apos;s accurate.
      </p>
    </div>
  );
}

function ContactTab() {
  return (
    <div>
      <SectionHead roman="§" title="Get in touch" em="email is best" />
      <p style={prose}>
        Same-day response. If you need an answer urgently, call or text.
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "56px", marginTop: "28px" }}>
        {[
          { href: "mailto:elijah@purcell-ventures.com", label: "elijah@purcell-ventures.com", primary: true },
          { href: "tel:+12054627839",                   label: "(205) 462-7839" },
          { href: "https://www.linkedin.com/in/theelijahpurcell", label: "LinkedIn",  ext: true },
          { href: "/resume",                            label: "Resume →" },
        ].map(({ href, label, primary, ext }) => (
          <a key={href} href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "11px 22px",
              border: `1.5px solid ${primary ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
              borderRadius: 0,
              color: primary ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.12s, color 0.12s",
            }}>
            {label}
          </a>
        ))}
      </div>

      <SectionHead roman="§" title="What to expect" />
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {[
          { q: "Who do I actually talk to?", a: "Me. Elijah Purcell. There's no team, no account manager, no handoff. You deal with the owner from first message to final delivery." },
          { q: "How fast do you respond?", a: "Same day on email, usually within a few hours. If you need an answer urgently, call or text." },
          { q: "Do you take on clients outside Atlanta?", a: "For digital services, consulting, and software, yes, anywhere. For field work (gutter cleaning, pressure washing, lawn care), see our sister brand Mantle Field Services, Metro Atlanta only." },
          { q: "What's the best way to start?", a: "Email with a one-sentence description of what you need. I'll tell you honestly if I can help and what it would look like." },
        ].map(({ q, a }) => (
          <div key={q} className="pv-card">
            <span className="b3"></span><span className="b4"></span>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--color-warm-text)", marginBottom: "10px" }}>
              {q}
            </div>
            <div className="pv-italic" style={{ fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85, lineHeight: 1.6 }}>
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
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: ABOUT_PAGE_CSS }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "820px", margin: "0 auto", padding: "72px 24px 120px" }}>

        {/* Page eyebrow + title */}
        <div style={{ borderTop: "3px solid var(--color-warm-text)", borderBottom: "1px solid var(--color-warm-text)", padding: "16px 0 18px", position: "relative", marginBottom: "32px" }}>
          <div style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase",
            color: "var(--color-warm-accent)", marginBottom: "10px",
          }}>
            About · Purcell Ventures
          </div>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
            fontSize: "clamp(40px, 7vw, 72px)",
            lineHeight: 1.02, letterSpacing: "0.005em",
            color: "var(--color-warm-text)", margin: 0,
          }}>
            Elijah Brent <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Purcell</em>
          </h1>
          <p className="pv-italic" style={{ marginTop: "14px", fontSize: "18px", color: "var(--color-warm-text)", opacity: 0.78, maxWidth: "560px" }}>
            Founder · operator · University of Alabama undergraduate in Tuscaloosa.
          </p>
        </div>

        {/* Tabs as a numbered editorial nav */}
        <div className="pv-tabs" style={{
          display: "flex", gap: "0",
          borderBottom: "1px solid var(--color-warm-border)",
          marginBottom: "8px",
        }}>
          {TABS.map(({ id, label, roman }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "16px 22px 14px",
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "13px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: isActive ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)",
                  borderBottom: isActive ? "2px solid var(--color-warm-accent)" : "2px solid transparent",
                  marginBottom: "-1px",
                  transition: "color 0.15s, border-color 0.15s",
                  display: "inline-flex", alignItems: "baseline", gap: "10px",
                }}
              >
                <span className="pv-tab-roman pv-italic" style={{ color: isActive ? "var(--color-warm-accent)" : "var(--color-warm-text-light)", fontSize: "14px" }}>
                  {roman}
                </span>
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div style={{ paddingTop: "32px" }}>
          {activeTab === "story"   && <StoryTab />}
          {activeTab === "company" && <CompanyTab />}
          {activeTab === "mark"    && <MarkTab />}
          {activeTab === "contact" && <ContactTab />}
        </div>

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

      {/* /about is one of only seven pages Google currently has indexed, which makes it one
          of the few doors a crawler actually walks through. Linking the new writing from
          here is the fastest route to getting any of it discovered. */}
      <section style={{ maxWidth: "760px", margin: "56px auto 0", padding: "0 24px" }}>
        <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, marginBottom: "14px" }}>
          Recent writing
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.9 }}>
          <li><a href="/blog/can-ai-find-your-business" style={{ color: "var(--color-warm-accent)" }}>Can an AI find your business?</a></li>
          <li><a href="/blog/what-a-website-actually-costs" style={{ color: "var(--color-warm-accent)" }}>What a small business website actually costs</a></li>
          <li><a href="/blog/121-businesses-near-campus" style={{ color: "var(--color-warm-accent)" }}>121 businesses near campus, and what a phone can find</a></li>
          <li><a href="/blog/what-the-agents-get-wrong" style={{ color: "var(--color-warm-accent)" }}>Fifteen AI agents run my company. Here is what they get wrong</a></li>
          <li><a href="/ai-at-alabama" style={{ color: "var(--color-warm-accent)" }}>Studying AI at the University of Alabama</a></li>
          <li><a href="/blog" style={{ color: "var(--color-warm-accent)" }}>Everything else</a></li>
        </ul>
      </section>
    </div>
  );
}
