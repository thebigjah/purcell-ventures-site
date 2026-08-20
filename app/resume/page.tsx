import type { Metadata } from "next";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata: Metadata = {
  title: "Elijah Purcell — Resume & Achievements",
  description:
    "Elijah Purcell | Founder, Purcell Ventures LLC | University of Alabama Honors College '30 | Software, AI systems, and shipped products. Full work, activities, awards, and scholarship record.",
};

// Dark Vignette palette — same as the rest of the site
const C = {
  bg: "#0c0a08",
  bgAlt: "#141210",
  card: "#1a1714",
  border: "#2e2820",
  accent: "#d4af37",
  accentLight: "#e8c96a",
  text: "#f5f0e0",
  textMuted: "#a89c87",
  textLight: "#7a6a52",
  green: "#7aaa6a",
};

function Section({ roman, title, em, children }: { roman: string; title: string; em?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "56px" }}>
      <header style={{
        padding: "32px 0 18px",
        display: "grid", gridTemplateColumns: "auto 1fr",
        gap: "20px", alignItems: "baseline",
        borderBottom: `1px solid ${C.border}`,
        marginBottom: "28px",
      }}>
        <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 400, fontSize: "36px", lineHeight: 1, color: C.accent }}>
          {roman}
        </span>
        <h2 style={{
          fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
          fontSize: "22px", letterSpacing: "0.04em",
          color: C.text, textTransform: "uppercase",
          margin: 0,
        }}>
          {title}
          {em && (
            <em className="pv-italic" style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: C.accent, marginLeft: "10px" }}>
              {em}
            </em>
          )}
        </h2>
      </header>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "10px", fontWeight: 700,
        letterSpacing: "0.28em", textTransform: "uppercase",
        color: C.accent,
        marginBottom: "16px", paddingBottom: "6px",
        borderBottom: `1px solid ${C.border}`,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Row({ left, right, sub, note }: { left: string; right?: string; sub?: string; note?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px", gap: "16px" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600, color: C.text, fontSize: "15px", lineHeight: 1.3, letterSpacing: "0.01em" }}>
          {left}
        </div>
        {sub && (
          <div className="pv-italic" style={{ color: C.text, opacity: 0.85, fontSize: "15px", marginTop: "6px", lineHeight: 1.5 }}>
            {sub}
          </div>
        )}
        {note && (
          <div style={{ color: C.textLight, fontSize: "12.5px", marginTop: "6px", fontStyle: "italic", lineHeight: 1.5 }}>
            {note}
          </div>
        )}
      </div>
      {right && (
        <div style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: C.accent, whiteSpace: "nowrap", paddingTop: "4px",
          textAlign: "right", maxWidth: "180px",
        }}>
          {right}
        </div>
      )}
    </div>
  );
}

function AwardBadge({ text }: { text: string }) {
  return (
    <span style={{
      display: "inline-block",
      border: `1.5px solid ${C.border}`,
      padding: "5px 12px",
      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      fontSize: "10px", fontWeight: 600,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: C.textMuted,
      marginRight: "8px",
      marginBottom: "8px",
    }}>
      {text}
    </span>
  );
}

function ScholarCard({ school, amount, note }: { school: string; amount: string; note?: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 18px",
      background: C.bgAlt,
      border: `1px solid ${C.border}`,
      marginBottom: "8px",
      gap: "12px",
    }}>
      <div>
        <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600, fontSize: "14px", color: C.text }}>
          {school}
        </span>
        {note && (
          <span className="pv-italic" style={{ fontSize: "13px", color: C.textMuted, marginLeft: "12px" }}>
            {note}
          </span>
        )}
      </div>
      <span style={{
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em",
        color: C.accent, whiteSpace: "nowrap",
      }}>
        {amount}
      </span>
    </div>
  );
}

function ImpactCard({ year, location, org, bullets }: { year: string; location: string; org: string; bullets: string[] }) {
  return (
    <div className="pv-card" style={{ padding: "24px 28px 20px", marginBottom: "12px" }}>
      <span className="b3"></span><span className="b4"></span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "12px" }}>
        <div>
          <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600, fontSize: "15px", color: C.text, letterSpacing: "0.02em" }}>
            {location}
          </span>
          <span className="pv-italic" style={{ fontSize: "13px", color: C.textMuted, marginLeft: "10px" }}>
            {org}
          </span>
        </div>
        <span style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.24em", textTransform: "uppercase",
          color: C.accent, whiteSpace: "nowrap",
        }}>
          {year}
        </span>
      </div>
      <ul style={{ margin: 0, paddingLeft: "18px" }}>
        {bullets.map((b, i) => (
          <li key={i} className="pv-italic" style={{ fontSize: "14px", color: C.text, opacity: 0.85, lineHeight: 1.55, marginBottom: "4px" }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ name, kind, year, live, stack, bullets }: {
  name: string; kind: string; year: string; live?: string; stack: string; bullets: string[];
}) {
  return (
    <div className="pv-card" style={{ padding: "24px 28px 20px", marginBottom: "14px" }}>
      <span className="b3"></span><span className="b4"></span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600, fontSize: "16px", color: C.text, letterSpacing: "0.02em" }}>
            {name}
          </span>
          <span className="pv-italic" style={{ fontSize: "13.5px", color: C.textMuted, marginLeft: "10px" }}>
            {kind}
          </span>
        </div>
        <span style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.24em", textTransform: "uppercase",
          color: C.accent, whiteSpace: "nowrap",
        }}>
          {year}
        </span>
      </div>

      {live && (
        <div style={{ marginBottom: "10px" }}>
          <a
            href={`https://${live}`}
            style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "11px", letterSpacing: "0.08em",
              color: C.accentLight, textDecoration: "none",
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            {live}
          </a>
        </div>
      )}

      <ul style={{ margin: "0 0 12px", paddingLeft: "18px" }}>
        {bullets.map((b, i) => (
          <li key={i} className="pv-italic" style={{ fontSize: "14px", color: C.text, opacity: 0.85, lineHeight: 1.55, marginBottom: "5px" }}>
            {b}
          </li>
        ))}
      </ul>

      <div style={{
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase",
        color: C.textLight, borderTop: `1px solid ${C.border}`, paddingTop: "10px",
      }}>
        {stack}
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      {/* Mini nav. SiteNav and SiteFooter are both hidden on /resume per HIDE_ON, so
          the link to /who has to be placed by hand here. It matters more on this page
          than on any other: a name search on 20 Aug 2026 returned exactly one result
          that was him, and it was this one. */}
      <nav style={{
        position: "relative", zIndex: 5,
        padding: "16px 36px",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
      }}>
        <a href="/" style={{ color: C.textMuted, textDecoration: "none" }}>← Purcell · Ventures</a>
        <span style={{ display: "flex", gap: "22px" }}>
          <a href="/who" style={{ color: C.textMuted, textDecoration: "none" }}>Who is Elijah Purcell</a>
          <a href="/resume/print" style={{ color: C.accent, textDecoration: "none" }}>Print version →</a>
        </span>
      </nav>

      <main style={{ position: "relative", zIndex: 5, maxWidth: "880px", margin: "0 auto", padding: "56px 36px 80px" }}>

        {/* Editorial page header with stats band */}
        <header style={{
          borderTop: `3px solid ${C.text}`,
          borderBottom: `1px solid ${C.text}`,
          padding: "18px 0 32px",
          position: "relative",
          marginBottom: "40px",
        }}>
          <div style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.32em", textTransform: "uppercase",
            color: C.accent, marginBottom: "12px",
          }}>
            Résumé · Field Record · August 2026
          </div>
          {/* A page about a person with no picture of the person. Fifty-odd pages on this
              site name him and not one showed his face, which is a gap for a founder whose
              own name is what people search. Floated so the text wraps rather than being
              pushed down, and squared off to match the editorial rules above and below. */}
          <img
            src="/brand/elijah.jpg"
            alt="Elijah Purcell"
            width={132}
            height={132}
            style={{
              float: "right",
              width: "132px",
              height: "132px",
              objectFit: "cover",
              objectPosition: "50% 20%",
              marginLeft: "28px",
              marginBottom: "12px",
              border: `1px solid ${C.text}`,
            }}
          />
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
            fontSize: "clamp(40px, 7vw, 84px)",
            lineHeight: 0.98, letterSpacing: "0.005em",
            color: C.text, margin: 0,
          }}>
            Elijah Brent <em className="pv-italic" style={{ fontWeight: 400, color: C.accent }}>Purcell</em>
          </h1>
          <p className="pv-italic" style={{ marginTop: "16px", fontSize: "18px", color: C.text, opacity: 0.78, maxWidth: "660px", lineHeight: 1.5 }}>
            Founder, Purcell Ventures LLC · University of Alabama Honors College, Class of 2030 · Acworth, Georgia
          </p>
          <p className="pv-italic" style={{ marginTop: "10px", fontSize: "15.5px", color: C.text, opacity: 0.62, maxWidth: "660px", lineHeight: 1.55 }}>
            I build and ship software end to end: marketplaces, autonomous data pipelines, AI-integrated
            applications, and the compliance and review systems that keep them honest. Fifteen production
            deployments to date. Studying psychology and data science on a pre-med track toward psychiatry.
          </p>

          {/* Contact line */}
          <div style={{
            marginTop: "24px",
            display: "flex", flexWrap: "wrap", gap: "24px",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "12px", letterSpacing: "0.04em",
            color: C.textMuted,
          }}>
            {[
              { label: "Email",       val: "elijahpurcell@gmail.com",        href: "mailto:elijahpurcell@gmail.com" },
              { label: "Business",    val: "purcellventures.co",             href: "https://purcellventures.co" },
              { label: "GitHub",      val: "github.com/thebigjah",           href: "https://github.com/thebigjah" },
              { label: "Print PDF",   val: "purcellventures.co/resume/print", href: "/resume/print" },
            ].map(({ label, val, href }) => (
              <span key={label}>
                <span style={{ color: C.textLight, marginRight: "6px", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "10px" }}>
                  {label}
                </span>
                <a href={href} style={{ color: C.accent, textDecoration: "none" }}>{val}</a>
              </span>
            ))}
          </div>

          {/* Stats band */}
          <div style={{
            marginTop: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "0",
            border: `1px solid ${C.border}`,
            background: C.bgAlt,
          }}>
            {[
              { val: "15+",        label: "Products shipped" },
              { val: "3.92",       label: "GPA (weighted)" },
              { val: "1440",       label: "SAT score" },
              { val: "34",         label: "Acceptances" },
              { val: "$530k/yr",   label: "Scholarships" },
            ].map(({ val, label }, i, arr) => (
              <div key={label} style={{
                padding: "20px 12px",
                textAlign: "center",
                borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: "24px", fontWeight: 700,
                  color: C.accent, letterSpacing: "-0.01em",
                }}>
                  {val}
                </div>
                <div style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase",
                  color: C.textLight, marginTop: "6px",
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* ─── Selected Work ─── */}
        <Section roman="I." title="Selected work" em="shipped products">
          <p className="pv-italic" style={{ fontSize: "15px", color: C.text, opacity: 0.78, marginBottom: "24px", lineHeight: 1.55 }}>
            Everything below is built, deployed, and running. Designed, coded, tested, and shipped solo
            unless noted.
          </p>

          <ProjectCard
            name="Middleman"
            kind="Two-sided sales marketplace"
            year="2026"
            live="middleman-lime.vercel.app"
            stack="Next.js 16 · TypeScript · Supabase / PostgreSQL · Stripe · Vercel"
            bullets={[
              "Architected and shipped a marketplace connecting companies with independent field and phone sales reps, where the platform acts as paying agent and escrows commissions through Stripe.",
              "Built the compliance spine the business depends on: independent-contractor classification safeguards, per-state geo-gating, e-signed platform agreements, and commission terms frozen at signature so a later offer edit cannot change what a rep is owed.",
              "14 database migrations with row-level security; 92 automated tests, including 20 adversarial cases written by an independent reviewer to try to break the money path.",
            ]}
          />

          <ProjectCard
            name="The Loom"
            kind="Autonomous lead-generation engine"
            year="2026"
            live="the-loom-gold.vercel.app"
            stack="Python · Google Places API · Supabase · GitHub Actions · Next.js · Resend"
            bullets={[
              "Daily crawler that finds local businesses with no real web presence, researches each one, scores it, and delivers a ranked packet by email at 7:15 AM.",
              "Currently tracking 97 actionable leads against a $529,675 pipeline, with automatic takedown of expired previews.",
              "Five production website templates, each with its own typographic and color system, so a prospect sees a real site built for their industry rather than a generic demo.",
            ]}
          />

          <ProjectCard
            name="Blast Studio"
            kind="Game platform and creator tools"
            year="2026"
            stack="JavaScript · MediaPipe · Vercel Blob · Capacitor (iOS + Android)"
            bullets={[
              "Turned a single browser game into a platform where anyone builds their own version: self-hosted subject cutout, a manual brush editor for fixing masks, a content editor, per-version leaderboards, a public marketplace, and an admin review queue.",
              "Delivered the iOS build to App Store Connect with no physical test device, which required archiving unsigned and signing at export with an Admin-scoped API key.",
              "Shipped the full store package: icons, feature graphic, screenshots, listing copy, and a likeness release for the featured subject.",
            ]}
          />

          <ProjectCard
            name="ElijahBot OS"
            kind="Personal knowledge and operations command center"
            year="2026"
            live="elijahbot-os.vercel.app"
            stack="Next.js · TypeScript · Node ingest pipeline · Vercel Cron · Claude API"
            bullets={[
              "Command center over a 441-node personal knowledge graph: eight stations, command palette with voice input, installable as a PWA, and a briefing emailed every morning at 7:30.",
              "Nightly job re-ingests the graph, computes a health score, and writes a gaps file identifying what the knowledge base is missing so it can be filled deliberately.",
              "Paired with a semantic recall layer that serves roughly 200-token chunks across memory, notes, and graph nodes so retrieval stays cheap at scale.",
            ]}
          />

          <ProjectCard
            name="Boyfriend Camera"
            kind="Computer-vision photography application"
            year="2026"
            live="boyfriend-camera.vercel.app"
            stack="WebGL / GLSL · three.js · MediaPipe · IndexedDB · PWA"
            bullets={[
              "Camera app whose live viewfinder runs through a WebGL color-grading shader, so a photo is composed with its final look already applied rather than graded afterward.",
              "On-device scene analysis reads luminance, color cast, and edge orientation to suggest and place a pose; three.js renders lit 3D mannequin figures in-frame as posing guides.",
              "Full non-destructive editor: curves, eight-channel HSL, three-way color wheels, radial and linear masks, video grading with audio re-encode, and a local library.",
            ]}
          />

          <ProjectCard
            name="Wholesale Engine"
            kind="Real-estate acquisition pipeline"
            year="2026"
            stack="Python · SQLite / Supabase · ArcGIS · pytest · Windows Task Scheduler"
            bullets={[
              "Parses county tax-delinquent PDFs by word coordinates, enriches each parcel against a 279,000-record assessor GIS layer, prices deals by maximum allowable offer, matches against a buyer CRM, and emails a daily packet.",
              "Encoded ethical exclusions directly into the pipeline: sources whose terms prohibit scraping are refused, and estate-owned parcels are held for human review instead of auto-contacted.",
            ]}
          />

          <ProjectCard
            name="Outreach Engine"
            kind="Compliance-gated outreach automation"
            year="2026"
            stack="Python · Gmail API · JSON policy layer · pytest"
            bullets={[
              "Multi-campaign outreach system built around a four-tier risk classifier: only the lowest tiers send automatically, sensitive tiers draft for human review, and the highest tier is never drafted at all.",
              "Hard gates on CAN-SPAM requirements, an append-only suppression list, a fail-closed blocklist, and an automatic sticky hard-stop when bounce rates spike. 22-check safety suite.",
            ]}
          />

          <ProjectCard
            name="Fellowship of the Round"
            kind="3D multiplayer arena game"
            year="2026"
            stack="Godot 4.7 · GDScript · Steam networking"
            bullets={[
              "Round-based arena game with seven playable species carrying distinct ability kits, a 131-card stacking upgrade pool, PvE encounters with taming and climbing, and twelve-player online multiplayer.",
              "Three maps, movement archetypes tuned per species, and cross-platform builds for Windows, macOS, and Linux.",
            ]}
          />

          <SubSection title="Client work">
            <Row
              left="English Pruitt Photography — Website"
              right="2026"
              sub="Sourced through cold outreach, scoped, and built: a hand-coded editorial portfolio site with a true masonry gallery, film-grain texture, and scroll-reveal motion, with copy written to match the client's own voice rather than generic template language."
            />
            <Row
              left="Purcell Ventures Digital Division — Small-business tooling"
              right="2025 – Present"
              sub="Twenty reusable modules across websites, chatbots, booking, review capture, and lead generation, delivered on a setup-plus-subscription model to local service businesses."
            />
          </SubSection>

          <SubSection title="Engineering practice">
            <Row
              left="Adversarial review gates"
              sub="Every significant build passes through an independent reviewer whose job is to try to break it before release. This gate has caught disqualifying defects that the builder's own verification missed, including unsaved user data lost to an OS tab kill and tests that were claimed but never actually written."
            />
            <Row
              left="Security auditing"
              sub="Ran read-only security audits across seven live applications, documenting row-level-security gaps, unauthenticated paid-API routes, stored cross-site scripting, vote forgery through exposed identifiers, and server-side request forgery, each with a severity-ranked remediation list."
            />
          </SubSection>
        </Section>

        {/* ─── Experience ─── */}
        <Section roman="II." title="Experience">
          <Row
            left="Founder & CEO — Purcell Ventures LLC"
            right="April 2025 – Present"
            sub="Georgia LLC operating across software development, AI integration, digital marketing, field services, and wholesale real estate. Owns the full cycle: client acquisition, scoping, pricing, build, deployment, and support. Generates active revenue."
            note="Filed as Zultar LLC 4/8/2025, renamed Purcell Ventures LLC 1/27/2026. Control #25075361. EIN and business banking established. Registered agent of record."
          />
          <Row
            left="Founder & Operator — Mantle Field Services"
            right="2024 – Present"
            sub="Sister brand handling gutter cleaning, pressure washing, and lawn care across metro Atlanta. Runs client acquisition, quoting, scheduling, equipment maintenance, and on-site delivery. Grew out of the earlier Autoblade Services operation."
          />
          <Row
            left="AI Data Trainer — Outlier AI"
            right="Oct 2025 – May 2026"
            sub="Two projects. Aether: evaluated large language model outputs and authored written rationales assessing accuracy, reasoning quality, and instruction adherence. Straw Tablecloth: wrote realistic spoken-style human-assistant conversations against a fixed tool-call budget, authoring the user turns and editing model responses, iterating prompts until the model stopped over-calling its tools."
          />
          <Row
            left="AI Response Evaluator — DataAnnotation"
            right="Spring 2026"
            sub="Rated AI responses against a Helpful, Honest, Harmless rubric that ranks honesty and harmlessness above helpfulness. Flagged hallucinated facts, fabricated links, false premises accepted without correction, and incorrect reasoning, alongside assessment of length, repetition, and whether the model answered the question the user actually meant."
          />
          <Row
            left="Team Member — Chick-fil-A"
            right="2023"
            sub="Front-line customer service in a high-volume operation. Built the working discipline and communication habits that carried into running client relationships."
          />
          <Row
            left="Peer Tutor — Mathematics & English"
            right="2022 – 2026"
            sub="One-on-one academic support for classmates through structured review sessions, with measurable improvement in their grades."
          />
        </Section>

        {/* ─── Education ─── */}
        <Section roman="III." title="Education">
          <Row
            left="The University of Alabama — Honors College"
            right="2026 – 2030"
            sub="B.S. Psychology / Data Science · New College · Presidential Merit Scholarship ($28,000/yr)"
            note="Pre-med track toward psychiatry. Entering Fall 2026."
          />
          <Row
            left="Cornerstone Preparatory Academy — Acworth, GA"
            right="Graduated May 2026"
            sub="GPA 3.92 (weighted) · SAT 1440 · Beta Club"
            note="Course highlights: 3 years Spanish · AP-level coursework · College-Level Worldview & Apologetics"
          />
          <Row
            left="Lee University — Summer Honors Program"
            right="Summer 2025"
            sub="Cryptography & Social Media · 6 college credit hours earned"
          />
          <Row
            left="Grove Christian School — Midlothian, VA"
            right="2022 – 2023"
            sub="9th Grade – Mid 10th Grade · Beta Club · Honors courses"
            note="Awards: Behold (9th) · Steadfast (10th) · Christian Character Award · Christ-like Leadership Award · Highest Math Grade in Class (9th) · Lead in Christmas Musical"
          />
          <Row
            left="Cornerstone Preparatory Academy — Acworth, GA"
            right="K – 8th Grade"
            sub="Elementary and middle school (4th through 8th in person; K through 3rd homeschooled). The same school he returned to and graduated from."
          />
        </Section>

        {/* ─── Skills ─── */}
        <Section roman="IV." title="Technical skills">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              ["Languages",       "TypeScript, JavaScript, Python, SQL, GDScript, GLSL, HTML/CSS"],
              ["Frameworks",      "Next.js, React, React Native / Expo, Node.js, Express, Capacitor, Godot"],
              ["Data & Infra",    "Supabase / PostgreSQL (RLS, migrations), SQLite, Vercel, GitHub Actions, cron scheduling"],
              ["AI & ML",         "Claude and OpenAI APIs, tool-use agent loops, semantic retrieval, MediaPipe, model output evaluation"],
              ["Graphics",        "WebGL and GLSL shaders, three.js, Canvas, real-time image processing"],
              ["Engineering",     "Automated testing, adversarial code review, security auditing, technical writing"],
              ["Business",        "Client acquisition, pricing, contracts, invoicing, regulatory compliance"],
              ["Communication",   "Public speaking, formal debate, persuasive and analytical writing"],
              ["Music",           "Vocal performance (bass-baritone, C1–F5), worship leading, stage presence"],
              ["Languages (human)", "English (native), Spanish (3 yrs)"],
            ].map(([skill, desc]) => (
              <div key={skill} style={{
                padding: "14px 18px",
                background: C.bgAlt,
                border: `1px solid ${C.border}`,
              }}>
                <div style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.28em", textTransform: "uppercase",
                  color: C.accent, marginBottom: "6px",
                }}>
                  {skill}
                </div>
                <div className="pv-italic" style={{ fontSize: "14px", color: C.text, opacity: 0.85, lineHeight: 1.5 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Awards & Honors ─── */}
        <Section roman="V." title="Awards" em="and honors">
          <Row left="University of Alabama — Honors College Admission" right="2026" sub="Selective admission based on academic achievement and demonstrated leadership." />
          <Row left="Georgia State University — Honors College Admission" right="2026" />
          <Row left="Behold Award" right="9th Grade · Grove" sub="Character and excellence recognition awarded to select students for demonstrated moral integrity and spiritual maturity." />
          <Row left="Steadfast Award" right="10th Grade · Grove" sub="Recognition for consistent perseverance, faithfulness, and character under pressure." />
          <Row left="Christian Character Award" right="Grove" sub="Selected as one of two students school-wide (one male, one female) for moral excellence, integrity, and leadership." />
          <Row left="Christ-like Leadership Award" right="Grove · End-of-Year Awards" sub="Awarded at the end-of-year awards ceremony for embodying servant leadership and Christian character throughout the school year." />
          <Row left="Lead Role — Christmas Musical" right="Grove" sub="Selected for the lead acting and vocal role in the school&apos;s annual Christmas production." />
          <Row left="Highest Math Grade in Class" right="9th Grade" sub="Earned 100% both semesters — top math average in the class." />
          <Row
            left="Family Foundation & Colson Center — Youth Leadership Summit"
            right="Summer 2023 · Richmond, VA"
            sub="Competitive invitation-only summit. Advanced seminar on worldview, cultural analysis, and Christian civic leadership."
          />
        </Section>

        {/* ─── Scholarship Record ─── */}
        <Section roman="VI." title="Scholarship record" em="college offers">
          <p className="pv-italic" style={{ fontSize: "15px", color: C.text, opacity: 0.78, marginBottom: "20px", lineHeight: 1.5 }}>
            Merit scholarship offers from schools that extended admission, all based on academic achievement.
          </p>
          {[
            { school: "Kalamazoo College",              amount: "$48,000/yr", note: "Lux Esto Scholarship" },
            { school: "Susquehanna University",         amount: "$48,000/yr", note: "Merit Scholarship" },
            { school: "Drake University",               amount: "$31,000/yr", note: "Merit Scholarship" },
            { school: "Hood College",                   amount: "$31,000/yr", note: "Presidential Scholarship" },
            { school: "Transylvania University",        amount: "$30,000/yr", note: "Merit Scholarship" },
            { school: "The University of Alabama",      amount: "$28,000/yr", note: "Presidential Merit (enrolled)" },
            { school: "Bradley University",             amount: "$28,000/yr", note: "Presidential Scholarship" },
            { school: "Presbyterian College",           amount: "$28,000/yr", note: "Highlander Scholarship" },
            { school: "Valparaiso University",          amount: "$28,000/yr", note: "Merit Scholarship" },
            { school: "Lenoir-Rhyne University",        amount: "$26,000/yr", note: "Niche Direct Merit" },
            { school: "Nazareth University",            amount: "$25,000/yr", note: "Presidential Scholarship" },
            { school: "Oral Roberts University",        amount: "$24,000/yr", note: "Merit Scholarship" },
            { school: "Cedarville University",          amount: "$22,000/yr", note: "Merit Scholarship" },
            { school: "George Fox University",          amount: "$22,000/yr", note: "Merit Scholarship" },
            { school: "Berry College",                  amount: "$20,000/yr", note: "Merit Scholarship, renewable" },
            { school: "Palm Beach Atlantic University", amount: "$18,000/yr", note: "Merit Scholarship" },
            { school: "Union University",               amount: "$17,000/yr", note: "Merit Scholarship" },
            { school: "Charleston Southern University", amount: "$17,000/yr", note: "Merit Scholarship" },
            { school: "Mississippi College",            amount: "$14,500/yr", note: "Academic Merit Scholarship" },
            { school: "Francis Marion University",      amount: "$10,884/yr", note: "Niche Direct Merit" },
            { school: "Hartwick College",               amount: "$10,000/yr", note: "Flight Path Scholarship" },
            { school: "Rider University",               amount: "$3,000/yr",  note: "Merit Scholarship" },
            { school: "Georgia State University",       amount: "$1,000/yr",  note: "Merit + Honors College" },
          ].map(s => <ScholarCard key={s.school} {...s} />)}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 22px", marginTop: "12px",
            background: C.text, color: C.bg,
          }}>
            <span style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontWeight: 700, fontSize: "11px",
              letterSpacing: "0.32em", textTransform: "uppercase",
            }}>
              Total · confirmed offers
            </span>
            <span style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontWeight: 700, fontSize: "20px",
              color: C.accent, letterSpacing: "-0.01em",
            }}>
              $530,384 / yr
            </span>
          </div>
          <p className="pv-italic" style={{ fontSize: "13px", color: C.textLight, marginTop: "10px" }}>
            34 acceptances. Enrolled at the University of Alabama.
          </p>
        </Section>

        {/* ─── Leadership ─── */}
        <Section roman="VII." title="Leadership" em="and ministry">
          <SubSection title="School + Organizational Leadership">
            <Row left="Member — Mighty Men (Men&apos;s Bible Study, Cornerstone Prep)" right="11th – 12th Grade" sub="Active member of the school&apos;s men&apos;s discipleship group. Weekly 2-hour discussions on faith, character, and spiritual formation." />
            <Row left="Head Chaplain" right="9th Spring – 10th Fall" sub="Organized school chapel services, coordinated worship teams, and led school-wide spiritual programming. Weekly rehearsals and Friday performances." />
            <Row left="Worship Team — Lead Vocalist" right="9th – 12th Grade" sub="Lead vocalist at school chapel and church services. Bass-baritone, range C1–F5. Rehearsals 2–3 times per week." />
            <Row left="Youth Group Leader & Summer Camp Counselor" right="Ongoing" sub="Mentors younger students at church, leads group discussions, and staffs week-long summer camp annually." />
          </SubSection>

          <SubSection title="IMPACT Mission Trips">
            <ImpactCard
              year="Sophomore Year"
              location="North Carolina"
              org="Praying Pelican Missions"
              bullets={[
                "Organized and participated in a regional food drive serving underserved communities.",
                "Constructed a full floor and ADA-compliant accessibility ramp for an elderly couple&apos;s home after the husband became disabled.",
                "Led prayer and worship sessions throughout the week-long trip.",
              ]}
            />
            <ImpactCard
              year="Junior Year"
              location="Bahamas"
              org="Christian Education Relief"
              bullets={[
                "Helped rebuild a Christian education camp looted and destroyed during the COVID-19 pandemic.",
                "Coordinated the movement and organization of heavy materials and equipment across the campus.",
                "Co-led the renovation of a decommissioned bus into a mobile walking classroom for the camp.",
              ]}
            />
            <ImpactCard
              year="Senior Year · March 2026"
              location="Hawaii"
              org="Disaster Relief"
              bullets={[
                "Deployed for disaster relief following the severe flooding that struck Hawaii in early 2026.",
                "Served in construction support, community aid, and worship and prayer leadership.",
              ]}
            />
          </SubSection>
        </Section>

        {/* ─── Community Service ─── */}
        <Section roman="VIII." title="Community service" em="and volunteer work">
          <Row left="MUST Ministries — Food Collection" sub="Organized and participated in food drives benefiting MUST Ministries, a nonprofit providing hunger relief, shelter, and support services to families in need across greater Atlanta." />
          <Row left="Children&apos;s Ministry — Church Volunteer" sub="Serves regularly in the kids ministry program at Stonebridge Church (Marietta), teaching, mentoring, and leading activities for elementary-age children." />
          <Row left="Community Cleanup — Environmental Service" sub="Volunteer park and neighborhood cleanup efforts. Ongoing participation in local environmental stewardship." />
          <p className="pv-italic" style={{ fontSize: "13px", color: C.textLight, marginTop: "8px" }}>
            200+ cumulative volunteer hours across ministry, mission, and community service.
          </p>
        </Section>

        {/* ─── Arts & Creative ─── */}
        <Section roman="IX." title="Arts" em="media, creative work">
          <Row left="Vocalist — Bass-Baritone" right="Ongoing" sub="Range C1–F5. Lead worship vocalist at school and church. Active in performance and rehearsal consistently since 9th grade." />
          <Row left="Lead Actor — Christmas Musical" right="Grove" sub="Selected for the lead role in the school&apos;s annual Christmas production. Combined vocal performance with acting and stage presence." />
          <Row left="Poetry & Creative Writing" right="Ongoing" sub='Original works include "The Husks the Swine Did Eat," "Injustice Scorned," "The Rebuking of Loki," fiction novel drafts, and personal essays. Writes across 8 distinct styles.' />
          <Row left="Content Creation — YouTube & Social Media" right="2023 – Present" sub="Scripts, films, and edits commentary content on psychology, faith, and culture. YouTube channel with 2,800+ subscribers transitioning to intellectual commentary." />
          <Row left="Design, Photography & Videography" right="Ongoing" sub="Brand identity, product photography, and video production for Purcell Ventures clients and personal projects. Built a full color-grading and posing toolchain from scratch." />
        </Section>

        {/* ─── Clubs ─── */}
        <Section roman="X." title="Clubs" em="and organizations">
          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
            {[
              "Beta Club (Grove & CPA)",
              "Apologetics & Debate Team",
              "Spanish Club (3 yrs)",
              "Club Med",
              "Creative Writing / Writer&apos;s Guild",
              "Curious Conversations",
              "Animal Ambassadors",
              "Senior Devotional",
              "Mighty Men (Member · CPA)",
            ].map(c => <AwardBadge key={c} text={c} />)}
          </div>
          <Row left="Apologetics & Debate Team" right="9th – 12th Grade" sub="Engaged in formal and informal theological debate with teachers and peers. Contributed to school-wide theological discussion. 5–10 hrs/week." />
          <Row left="Creative Writing / Writer&apos;s Guild" right="11th Grade" sub="Workshop-style group focused on original fiction, poetry, and narrative craft. Produced original poetry, fiction drafts, and personal essays." />
          <Row left="Beta Club" right="Grove & Cornerstone" sub="National honor society recognizing academic achievement, character, leadership, and service." />
        </Section>

        {/* ─── Athletics ─── */}
        <Section roman="XI." title="Athletics">
          <Row left="Cheerleader — Back / Base" right="9th – 10th Grade" sub="Competitive cheer support and stunt base. 6–7 hrs/week during season." />
          <Row left="Track & Field — Shot Put, Discus, 100m" right="9th Grade" sub="Competed in field and sprint events during 9th grade spring season." />
          <Row left="Weightlifting" right="Ongoing" sub="Scientific hypertrophy-focused training program. Consistent multi-year commitment." />
        </Section>

        {/* ─── Faith & Service ─── */}
        <Section roman="XII." title="Faith" em="and community life">
          <Row left="Church Involvement — Stonebridge (Marietta) + Kennesaw First Baptist" right="Ongoing" sub="Stonebridge Church (Marietta) — Sunday service, longstanding home church, baptized here at 15. Kennesaw First Baptist — Wednesday youth and retreats." />
          <Row left="Apologetics & Theology Study" right="Ongoing" sub="Independently studying William Lane Craig, Sean McDowell, C.S. Lewis, A.W. Tozer, hermeneutics, and philosophy of religion." />
        </Section>

        {/* ─── Goals ─── */}
        <Section roman="XIII." title="Career goals" em="and vision">
          <p className="pv-italic" style={{ fontSize: "18px", color: C.text, opacity: 0.92, lineHeight: 1.55, maxWidth: "640px" }}>
            I plan to pursue an MD in Psychiatry, integrating clinical mental health care with AI-driven
            research and faith-based counseling. My goal is to develop accessible, data-informed
            interventions for mental health, bridging neuroscience, technology, and human dignity.
            Alongside medicine, I&apos;m building a multi-stream entrepreneurial portfolio through Purcell
            Ventures and a personal content brand centered on the intersection of psychology, faith, and
            intellectual discourse.
          </p>
        </Section>

        {/* Bottom strip */}
        <div style={{
          borderTop: `1px solid ${C.border}`, paddingTop: "24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "12px",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
          color: C.textLight,
        }}>
          <div>Elijah Purcell · elijahpurcell@gmail.com · Acworth, GA</div>
          <div>
            <a href="https://purcellventures.co" style={{ color: C.accent, textDecoration: "none", letterSpacing: "0.32em" }}>purcellventures.co</a>
            <span style={{ margin: "0 8px" }}>·</span>
            <span style={{ color: C.textLight }}>Updated August 2026</span>
          </div>
        </div>

      </main>
    </div>
  );
}
