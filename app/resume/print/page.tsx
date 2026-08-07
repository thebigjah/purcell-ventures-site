"use client";

// ─── CUSTOMIZATION BLOCK ────────────────────────────────────────────────────
// Before sending to a specific person/org, edit these fields:
const RECIPIENT = {
  targetOrg: "",           // e.g. "Johns Hopkins Pre-Med Program"
  targetRole: "",          // e.g. "Undergraduate Research Position"
  emphasize: [] as string[], // sections to highlight, e.g. ["science", "leadership"]
};
// ────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: "Middleman",
    kind: "Two-sided sales marketplace",
    year: "2026",
    live: "middleman-lime.vercel.app",
    stack: "Next.js 16 · TypeScript · Supabase/PostgreSQL · Stripe",
    bullets: [
      "Shipped a marketplace connecting companies with independent sales reps, where the platform acts as paying agent and escrows commissions through Stripe.",
      "Built the compliance spine: contractor-classification safeguards, per-state geo-gating, e-signed agreements, and commission terms frozen at signature so later edits cannot change what a rep is owed.",
      "14 migrations with row-level security; 92 automated tests including 20 adversarial cases from an independent reviewer.",
    ],
  },
  {
    name: "The Loom",
    kind: "Autonomous lead-generation engine",
    year: "2026",
    live: "the-loom-gold.vercel.app",
    stack: "Python · Google Places API · Supabase · GitHub Actions · Next.js",
    bullets: [
      "Daily crawler that finds local businesses with no real web presence, researches and scores each, and emails a ranked packet at 7:15 AM.",
      "Tracking 97 actionable leads against a $529,675 pipeline, with automatic takedown of expired previews.",
      "Five production website templates, each with its own typographic and color system.",
    ],
  },
  {
    name: "Blast Studio",
    kind: "Game platform and creator tools",
    year: "2026",
    live: "",
    stack: "JavaScript · MediaPipe · Vercel Blob · Capacitor (iOS + Android)",
    bullets: [
      "Turned a single browser game into a platform: self-hosted subject cutout, brush mask editor, content editor, per-version leaderboards, marketplace, and admin review queue.",
      "Delivered the iOS build to App Store Connect with no physical test device, archiving unsigned and signing at export with an Admin-scoped API key.",
    ],
  },
  {
    name: "ElijahBot OS",
    kind: "Personal knowledge and operations command center",
    year: "2026",
    live: "elijahbot-os.vercel.app",
    stack: "Next.js · TypeScript · Node ingest pipeline · Vercel Cron · Claude API",
    bullets: [
      "Command center over a 441-node knowledge graph: eight stations, command palette with voice, PWA install, and a 7:30 AM briefing email.",
      "Nightly job re-ingests the graph, scores its health, and writes a gaps file identifying what the knowledge base is missing.",
      "Paired with a semantic recall layer serving ~200-token chunks so retrieval stays cheap at scale.",
    ],
  },
  {
    name: "Boyfriend Camera",
    kind: "Computer-vision photography application",
    year: "2026",
    live: "boyfriend-camera.vercel.app",
    stack: "WebGL/GLSL · three.js · MediaPipe · IndexedDB · PWA",
    bullets: [
      "Camera app whose live viewfinder runs through a WebGL color-grading shader, so photos are composed with the final look already applied.",
      "On-device scene analysis reads luminance, color cast, and edge orientation to suggest and place a pose; three.js renders lit 3D mannequin guides in-frame.",
      "Non-destructive editor: curves, 8-channel HSL, three-way wheels, radial and linear masks, and video grading.",
    ],
  },
  {
    name: "Wholesale Engine",
    kind: "Real-estate acquisition pipeline",
    year: "2026",
    live: "",
    stack: "Python · SQLite/Supabase · ArcGIS · pytest",
    bullets: [
      "Parses county tax-delinquent PDFs by word coordinates, enriches against a 279,000-record assessor GIS layer, prices by maximum allowable offer, matches a buyer CRM, and emails a daily packet.",
      "Ethical exclusions encoded in the pipeline: sources prohibiting scraping are refused, and estate-owned parcels are held for human review.",
    ],
  },
  {
    name: "Outreach Engine",
    kind: "Compliance-gated outreach automation",
    year: "2026",
    live: "",
    stack: "Python · Gmail API · JSON policy layer · pytest",
    bullets: [
      "Four-tier risk classifier: lowest tiers send automatically, sensitive tiers draft for human review, highest tier is never drafted.",
      "Hard CAN-SPAM gates, append-only suppression list, fail-closed blocklist, and a sticky hard-stop on bounce spikes. 22-check safety suite.",
    ],
  },
  {
    name: "Fellowship of the Round",
    kind: "3D multiplayer arena game",
    year: "2026",
    live: "",
    stack: "Godot 4.7 · GDScript · Steam networking",
    bullets: [
      "Seven playable species with distinct ability kits, a 131-card stacking upgrade pool, PvE encounters, and 12-player online multiplayer across three maps.",
    ],
  },
];

export default function ResumePrint() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #e5e5e5; }

        .print-btn {
          position: fixed;
          top: 16px;
          right: 16px;
          background: #2d1f0e;
          color: #f5ede0;
          border: none;
          padding: 10px 20px;
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 4px;
          z-index: 100;
          letter-spacing: 0.04em;
        }
        .print-btn:hover { background: #4a3020; }

        .page {
          width: 8.5in;
          min-height: 11in;
          background: #ffffff;
          margin: 32px auto;
          padding: 0.55in 0.6in 0.55in;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: #1a1208;
          line-height: 1.45;
        }

        /* HEADER */
        .header { border-bottom: 2.5px solid #2d1f0e; padding-bottom: 9px; margin-bottom: 12px; }
        .header h1 {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #1a1208;
          line-height: 1;
        }
        .header-sub {
          font-size: 10px;
          color: #6b5444;
          margin-top: 4px;
          letter-spacing: 0.02em;
        }
        .header-summary {
          font-size: 9.5px;
          color: #4a3020;
          margin-top: 5px;
          line-height: 1.5;
          max-width: 6.6in;
        }
        .header-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 0 18px;
          margin-top: 6px;
          font-size: 10px;
          color: #4a3020;
        }
        .header-stats {
          display: flex;
          gap: 22px;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .stat-block { text-align: center; }
        .stat-val {
          font-family: 'Crimson Pro', serif;
          font-size: 18px;
          font-weight: 700;
          color: #8b5e3c;
          line-height: 1;
        }
        .stat-label {
          font-size: 8px;
          color: #9a8270;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-top: 1px;
        }

        /* SECTIONS */
        .section { margin-bottom: 12px; }
        .section-title {
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #8b5e3c;
          border-bottom: 1.5px solid #8b5e3c;
          padding-bottom: 3px;
          margin-bottom: 7px;
        }
        .subsection-title {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9a8270;
          border-bottom: 1px solid #d6c4a8;
          padding-bottom: 2px;
          margin-bottom: 5px;
          margin-top: 7px;
        }

        /* ROWS */
        .row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; gap: 8px; }
        .row-left { flex: 1; }
        .row-title { font-weight: 600; font-size: 10px; color: #1a1208; line-height: 1.3; }
        .row-sub { font-size: 9px; color: #5a4030; margin-top: 1px; line-height: 1.4; }
        .row-note { font-size: 8.5px; color: #9a8270; margin-top: 1px; font-style: italic; line-height: 1.3; }
        .row-right { font-size: 9px; color: #9a8270; white-space: nowrap; padding-top: 1px; }

        /* PROJECTS */
        .proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 22px; }
        .proj {
          border-left: 2px solid #d6c4a8;
          padding: 0 0 0 8px;
          margin-bottom: 8px;
          break-inside: avoid;
        }
        .proj-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
        .proj-name { font-weight: 600; font-size: 10.5px; color: #1a1208; }
        .proj-kind { font-size: 8.5px; color: #6b5444; font-style: italic; }
        .proj-year { font-size: 8.5px; color: #9a8270; white-space: nowrap; }
        .proj-live { font-size: 8.5px; color: #8b5e3c; margin-top: 1px; }
        .proj-bullets { padding-left: 11px; margin-top: 2px; }
        .proj-bullets li { font-size: 8.8px; color: #5a4030; line-height: 1.4; margin-bottom: 1.5px; }
        .proj-stack { font-size: 8px; color: #9a8270; margin-top: 3px; letter-spacing: 0.01em; }

        /* IMPACT TRIPS */
        .impact-card {
          border: 1px solid #d6c4a8;
          border-radius: 4px;
          padding: 6px 9px;
          margin-bottom: 5px;
        }
        .impact-header { display: flex; justify-content: space-between; margin-bottom: 3px; }
        .impact-loc { font-weight: 600; font-size: 10px; }
        .impact-org { font-size: 9px; color: #6b5444; margin-left: 6px; }
        .impact-year { font-size: 9px; color: #9a8270; }
        .impact-bullets { padding-left: 12px; }
        .impact-bullets li { font-size: 9px; color: #5a4030; line-height: 1.4; margin-bottom: 1px; }

        /* SCHOLARSHIP TABLE */
        .scholar-grid { display: grid; grid-template-columns: 1fr auto; gap: 2px 12px; }
        .scholar-row { display: contents; }
        .scholar-name { font-size: 9.5px; color: #1a1208; padding: 2px 0; border-bottom: 1px solid #f0e8d8; }
        .scholar-name span { font-size: 8.5px; color: #9a8270; margin-left: 5px; }
        .scholar-amount { font-size: 9.5px; font-weight: 700; color: #4a7a4a; white-space: nowrap; padding: 2px 0; border-bottom: 1px solid #f0e8d8; text-align: right; }
        .scholar-total { display: flex; justify-content: space-between; margin-top: 5px; padding: 4px 8px; background: #2d1f0e; border-radius: 3px; }
        .scholar-total-label { font-size: 9.5px; font-weight: 700; color: #f5ede0; }
        .scholar-total-val { font-size: 10px; font-weight: 700; color: #e8c96a; }

        /* SKILLS GRID */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
        .skill-card { padding: 5px 8px; border: 1px solid #d6c4a8; border-radius: 3px; }
        .skill-label { font-size: 8.5px; font-weight: 700; color: #8b5e3c; margin-bottom: 1px; }
        .skill-val { font-size: 8.5px; color: #5a4030; line-height: 1.3; }

        /* BADGES */
        .badge-wrap { display: flex; flex-wrap: wrap; gap: 3px; margin-bottom: 6px; }
        .badge {
          background: #f5ede0;
          border: 1px solid #d6c4a8;
          border-radius: 3px;
          padding: 2px 6px;
          font-size: 8.5px;
          color: #2d1f0e;
        }

        /* TWO COLUMN LAYOUT — single flow across two balanced columns so pages fill evenly */
        .two-col { column-count: 2; column-gap: 24px; }
        .two-col .section-title { break-after: avoid; break-inside: avoid; }
        .two-col .subsection-title { break-after: avoid; break-inside: avoid; }
        .two-col .row { break-inside: avoid; }
        .two-col .skill-card { break-inside: avoid; }
        .two-col .impact-card { break-inside: avoid; }
        .two-col > .section:first-child { margin-top: 0; }

        /* FOOTER */
        .footer {
          border-top: 1px solid #d6c4a8;
          padding-top: 8px;
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          font-size: 8.5px;
          color: #9a8270;
        }

        @media print {
          body { background: white; }
          .print-btn { display: none; }
          .page { margin: 0; box-shadow: none; width: 100%; min-height: auto; }
          @page { margin: 0; size: letter; }
        }
      `}</style>

      <button className="print-btn" onClick={handlePrint}>
        Print / Save as PDF
      </button>

      <div className="page">

        {/* Header */}
        <div className="header">
          <h1>Elijah Purcell</h1>
          <div className="header-sub">
            Founder, Purcell Ventures LLC · University of Alabama Honors College &apos;30 · Acworth, GA
          </div>
          <div className="header-summary">
            I build and ship software end to end: marketplaces, autonomous data pipelines, AI-integrated
            applications, and the compliance and review systems that keep them honest. Fifteen production
            deployments to date. Studying psychology and data science on a pre-med track toward psychiatry.
          </div>
          <div className="header-contact">
            <span>elijahpurcell@gmail.com</span>
            <span>(770) 280-5319</span>
            <span>purcellventures.co</span>
            <span>github.com/thebigjah</span>
            <span>Acworth, GA 30101</span>
          </div>
          <div className="header-stats">
            {[
              { val: "15+", label: "Products Shipped" },
              { val: "3.92", label: "GPA (Weighted)" },
              { val: "1440", label: "SAT" },
              { val: "34", label: "Acceptances" },
              { val: "$530k/yr", label: "Scholarships" },
            ].map(s => (
              <div className="stat-block" key={s.label}>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Work — full width, leads the page */}
        <div className="section">
          <div className="section-title">Selected Work — Shipped Products</div>
          <div className="proj-grid">
            {PROJECTS.map(p => (
              <div className="proj" key={p.name}>
                <div className="proj-head">
                  <div>
                    <span className="proj-name">{p.name}</span>{" "}
                    <span className="proj-kind">{p.kind}</span>
                  </div>
                  <span className="proj-year">{p.year}</span>
                </div>
                {p.live && <div className="proj-live">{p.live}</div>}
                <ul className="proj-bullets">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <div className="proj-stack">{p.stack}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column body — one flow, balanced across columns */}
        <div className="two-col">

            {/* Experience */}
            <div className="section">
              <div className="section-title">Experience</div>
              {[
                ["Founder & CEO — Purcell Ventures LLC", "Apr 2025–Present",
                  "Georgia LLC across software, AI integration, digital marketing, field services, and wholesale real estate. Owns the full cycle: acquisition, scoping, pricing, build, deployment, support. Active revenue.",
                  "Filed as Zultar LLC 4/8/2025, renamed 1/27/2026. Control #25075361. EIN and business banking. Registered agent of record."],
                ["Founder & Operator — Mantle Field Services", "2024–Present",
                  "Gutter cleaning, pressure washing, and lawn care across metro Atlanta. Client acquisition, quoting, scheduling, equipment maintenance, on-site delivery. Grew out of Autoblade Services.", ""],
                ["AI Data Trainer — Outlier AI", "Oct 2025–May 2026",
                  "Two projects. Aether: evaluated LLM outputs and authored written rationales on accuracy, reasoning quality, and instruction adherence. Straw Tablecloth: wrote spoken-style human-assistant conversations against a fixed tool-call budget, authoring user turns and editing model responses.", ""],
                ["AI Response Evaluator — DataAnnotation", "Spring 2026",
                  "Rated AI responses against a Helpful, Honest, Harmless rubric ranking honesty and harmlessness above helpfulness. Flagged hallucinated facts, fabricated links, false premises accepted without correction, and incorrect reasoning.", ""],
                ["Team Member — Chick-fil-A", "2023",
                  "Front-line customer service in a high-volume operation.", ""],
                ["Peer Tutor — Mathematics & English", "2022–2026",
                  "One-on-one academic support through structured review sessions, with measurable improvement in peers' grades.", ""],
              ].map(([title, right, sub, note]) => (
                <div className="row" key={title}>
                  <div className="row-left">
                    <div className="row-title">{title}</div>
                    <div className="row-sub">{sub}</div>
                    {note && <div className="row-note">{note}</div>}
                  </div>
                  <div className="row-right">{right}</div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="section">
              <div className="section-title">Education</div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">The University of Alabama — Honors College</div>
                  <div className="row-sub">B.S. Psychology / Data Science · New College · Presidential Merit ($28,000/yr)</div>
                  <div className="row-note">Pre-med track toward psychiatry. Entering Fall 2026.</div>
                </div>
                <div className="row-right">2026–2030</div>
              </div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">Cornerstone Preparatory Academy — Acworth, GA</div>
                  <div className="row-sub">GPA 3.92 (wtd) · SAT 1440 · Beta Club</div>
                  <div className="row-note">3 yrs Spanish · AP-level coursework · Worldview &amp; Apologetics seminar</div>
                </div>
                <div className="row-right">Grad. May 2026</div>
              </div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">Lee University — Summer Honors Program</div>
                  <div className="row-sub">Cryptography &amp; Social Media · 6 college credit hours</div>
                </div>
                <div className="row-right">Summer 2025</div>
              </div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">Grove Christian School — Midlothian, VA</div>
                  <div className="row-sub">9th–Mid 10th Grade · Beta Club · Honors coursework</div>
                  <div className="row-note">Awards: Behold (9th) · Steadfast (10th) · Christian Character · Christ-like Leadership · Lead in Christmas Musical</div>
                </div>
                <div className="row-right">2022–2023</div>
              </div>
            </div>

            {/* Engineering practice */}
            <div className="section">
              <div className="section-title">Engineering Practice</div>
              {[
                ["Adversarial review gates", "",
                  "Every significant build passes an independent reviewer whose job is to break it before release. The gate has caught disqualifying defects the builder's own verification missed, including unsaved user data lost to an OS tab kill and tests claimed but never written."],
                ["Security auditing", "",
                  "Read-only audits across seven live applications documenting row-level-security gaps, unauthenticated paid-API routes, stored XSS, vote forgery through exposed identifiers, and SSRF, each with a severity-ranked remediation list."],
              ].map(([title, right, sub]) => (
                <div className="row" key={title}>
                  <div className="row-left">
                    <div className="row-title">{title}</div>
                    <div className="row-sub">{sub}</div>
                  </div>
                  {right && <div className="row-right">{right}</div>}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="section">
              <div className="section-title">Technical Skills</div>
              <div className="skills-grid">
                {[
                  ["Languages", "TypeScript, JavaScript, Python, SQL, GDScript, GLSL, HTML/CSS"],
                  ["Frameworks", "Next.js, React, React Native/Expo, Node, Express, Capacitor, Godot"],
                  ["Data & Infra", "Supabase/PostgreSQL (RLS, migrations), SQLite, Vercel, GitHub Actions, cron"],
                  ["AI & ML", "Claude and OpenAI APIs, tool-use agent loops, semantic retrieval, MediaPipe, output evaluation"],
                  ["Graphics", "WebGL and GLSL shaders, three.js, Canvas, real-time image processing"],
                  ["Engineering", "Automated testing, adversarial code review, security auditing, technical writing"],
                  ["Business", "Client acquisition, pricing, contracts, invoicing, compliance"],
                  ["Communication", "Public speaking, formal debate, persuasive and analytical writing"],
                ].map(([label, val]) => (
                  <div className="skill-card" key={label}>
                    <div className="skill-label">{label}</div>
                    <div className="skill-val">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="section">
              <div className="section-title">Awards &amp; Honors</div>
              {[
                ["UA Honors College Admission", "2026", "Selective admission based on academic achievement and leadership."],
                ["GSU Honors College Admission", "2026", ""],
                ["Behold Award", "9th Grade · Grove", "Character and excellence recognition for moral integrity and spiritual maturity."],
                ["Steadfast Award", "10th Grade · Grove", "Recognition for perseverance, faithfulness, and character under pressure."],
                ["Christian Character Award", "Grove", "One of two students school-wide selected for moral excellence and leadership."],
                ["Christ-like Leadership Award", "End-of-Year Awards · Grove", "Awarded for servant leadership and Christian character throughout the school year."],
                ["Lead Role — Christmas Musical", "Grove", "Lead acting and vocal role in the annual Christmas production."],
                ["Highest Math Grade in Class", "9th Grade", "100% both semesters — top math average in the class."],
                ["Youth Leadership Summit", "Summer 2023", "Family Foundation & Colson Center · Richmond, VA. Invitation-only seminar on worldview, cultural analysis, and Christian civic leadership."],
              ].map(([title, right, sub]) => (
                <div className="row" key={title}>
                  <div className="row-left">
                    <div className="row-title">{title}</div>
                    {sub && <div className="row-sub">{sub}</div>}
                  </div>
                  <div className="row-right">{right}</div>
                </div>
              ))}
            </div>

            {/* Scholarship Record */}
            <div className="section">
              <div className="section-title">Scholarship Record</div>
              <div className="scholar-grid">
                {[
                  ["Kalamazoo College", "$48,000/yr", "Lux Esto"],
                  ["Susquehanna University", "$48,000/yr", "Confirmed"],
                  ["Drake University", "$31,000/yr", "Confirmed"],
                  ["Hood College", "$31,000/yr", "Presidential"],
                  ["Transylvania University", "$30,000/yr", "Confirmed"],
                  ["University of Alabama", "$28,000/yr", "Presidential Merit — Enrolled"],
                  ["Bradley University", "$28,000/yr", "Presidential"],
                  ["Presbyterian College", "$28,000/yr", "Highlander"],
                  ["Valparaiso University", "$28,000/yr", "Confirmed"],
                  ["Lenoir-Rhyne University", "$26,000/yr", "Confirmed"],
                  ["Nazareth University", "$25,000/yr", "Presidential"],
                  ["Oral Roberts University", "$24,000/yr", "Confirmed"],
                  ["Cedarville University", "$22,000/yr", "Confirmed"],
                  ["George Fox University", "$22,000/yr", "Confirmed"],
                  ["Berry College", "$20,000/yr", "Confirmed, renewable"],
                  ["Palm Beach Atlantic University", "$18,000/yr", "Confirmed"],
                  ["Union University", "$17,000/yr", "Confirmed"],
                  ["Charleston Southern University", "$17,000/yr", "Confirmed"],
                  ["Mississippi College", "$14,500/yr", "Confirmed"],
                  ["Francis Marion University", "$10,884/yr", "Confirmed"],
                  ["Hartwick College", "$10,000/yr", "Flight Path"],
                  ["Rider University", "$3,000/yr", "Confirmed"],
                  ["Georgia State University", "$1,000/yr", "Merit + Honors"],
                ].map(([school, amt, note]) => (
                  <div className="scholar-row" key={school}>
                    <div className="scholar-name">{school} <span>{note}</span></div>
                    <div className="scholar-amount">{amt}</div>
                  </div>
                ))}
              </div>
              <div className="scholar-total">
                <span className="scholar-total-label">Total (confirmed offers)</span>
                <span className="scholar-total-val">$530,384 / year</span>
              </div>
              <div style={{ fontSize: "8px", color: "#9a8270", marginTop: "3px", fontStyle: "italic" }}>
                34 acceptances. Enrolled: University of Alabama.
              </div>
            </div>

            {/* Leadership */}
            <div className="section">
              <div className="section-title">Leadership &amp; Ministry</div>

              <div className="subsection-title">School &amp; Church</div>
              {[
                ["Member — Mighty Men (Men's Bible Study, CPA)", "11th–12th", "Active member of the school's men's discipleship group. Weekly 2-hr discussions on faith and spiritual formation."],
                ["Head Chaplain", "9th–10th", "Organized chapel services, coordinated worship teams, led school-wide programming."],
                ["Worship Team — Lead Vocalist", "9th–12th", "Lead bass-baritone vocalist at school and church. Range C1–F5. 2–3 rehearsals/week."],
                ["Youth Group Leader & Camp Counselor", "Ongoing", "Mentors younger students at church, leads group discussions, staffs summer camp."],
              ].map(([title, right, sub]) => (
                <div className="row" key={title}>
                  <div className="row-left">
                    <div className="row-title">{title}</div>
                    <div className="row-sub">{sub}</div>
                  </div>
                  <div className="row-right">{right}</div>
                </div>
              ))}

              <div className="subsection-title">IMPACT Mission Trips</div>
              <div className="impact-card">
                <div className="impact-header">
                  <div><span className="impact-loc">North Carolina</span><span className="impact-org">Praying Pelican Missions</span></div>
                  <span className="impact-year">Sophomore Year</span>
                </div>
                <ul className="impact-bullets">
                  <li>Organized and led a regional food drive serving underserved communities.</li>
                  <li>Built a full floor and ADA accessibility ramp for an elderly couple&apos;s home after the husband became disabled.</li>
                </ul>
              </div>
              <div className="impact-card">
                <div className="impact-header">
                  <div><span className="impact-loc">Bahamas</span><span className="impact-org">Christian Education Relief</span></div>
                  <span className="impact-year">Junior Year</span>
                </div>
                <ul className="impact-bullets">
                  <li>Rebuilt a Christian education camp destroyed and looted during COVID-19.</li>
                  <li>Co-led the full renovation of a decommissioned bus into a mobile walking classroom.</li>
                </ul>
              </div>
              <div className="impact-card">
                <div className="impact-header">
                  <div><span className="impact-loc">Hawaii</span><span className="impact-org">Disaster Relief</span></div>
                  <span className="impact-year">March 2026</span>
                </div>
                <ul className="impact-bullets">
                  <li>Deployed for disaster relief after severe flooding. Construction support, community aid, worship and prayer leadership.</li>
                </ul>
              </div>
            </div>

            {/* Arts */}
            <div className="section">
              <div className="section-title">Arts &amp; Creative</div>
              {[
                ["Vocalist — Bass-Baritone", "Ongoing", "Range C1–F5. Lead worship vocalist at school and church since 9th grade."],
                ["Poetry & Creative Writing", "Ongoing", "Original poetry, fiction drafts, and personal essays across 8 distinct styles."],
                ["Content Creation — YouTube", "2023–Present", "Scripts, films, and edits commentary on psychology, faith, and culture. 2,800+ subscribers."],
                ["Design, Photography & Video", "Ongoing", "Brand identity, product photography, and video production for clients. Built a full color-grading toolchain from scratch."],
              ].map(([title, right, sub]) => (
                <div className="row" key={title}>
                  <div className="row-left">
                    <div className="row-title">{title}</div>
                    <div className="row-sub">{sub}</div>
                  </div>
                  <div className="row-right">{right}</div>
                </div>
              ))}
            </div>

            {/* Clubs */}
            <div className="section">
              <div className="section-title">Clubs &amp; Organizations</div>
              <div className="badge-wrap">
                {["Beta Club (Grove & CPA)", "Apologetics & Debate", "Spanish Club (3 yrs)", "Club Med", "Creative Writing / Writer's Guild", "Curious Conversations", "Animal Ambassadors", "Senior Devotional", "Mighty Men (Member · CPA)"].map(b => (
                  <span className="badge" key={b}>{b}</span>
                ))}
              </div>
            </div>

            {/* Athletics */}
            <div className="section">
              <div className="section-title">Athletics</div>
              {[
                ["Cheerleader — Back / Base", "9th–10th", "Competitive stunt base. 6–7 hrs/week during season."],
                ["Track & Field — Shot Put, Discus, 100m", "9th Grade", "Competed in field and sprint events."],
                ["Weightlifting", "Ongoing", "Scientific hypertrophy-focused training."],
              ].map(([title, right, sub]) => (
                <div className="row" key={title}>
                  <div className="row-left">
                    <div className="row-title">{title}</div>
                    <div className="row-sub">{sub}</div>
                  </div>
                  <div className="row-right">{right}</div>
                </div>
              ))}
            </div>

            {/* Community Service */}
            <div className="section">
              <div className="section-title">Community Service</div>
              {[
                ["MUST Ministries — Food Collection", "", "Organized and participated in food drives serving families in need across greater Atlanta."],
                ["Children's Ministry — Stonebridge Church (Marietta)", "Ongoing", "Teaching, mentoring, and leading activities for elementary-age children."],
                ["Community Cleanup — Environmental Service", "Ongoing", "Park and neighborhood cleanup. Environmental stewardship."],
              ].map(([title, right, sub]) => (
                <div className="row" key={title}>
                  <div className="row-left">
                    <div className="row-title">{title}</div>
                    <div className="row-sub">{sub}</div>
                  </div>
                  {right && <div className="row-right">{right}</div>}
                </div>
              ))}
              <div style={{ fontSize: "8.5px", color: "#9a8270", fontStyle: "italic", marginTop: "2px" }}>
                200+ cumulative volunteer hours across ministry, mission, and community service.
              </div>
            </div>

            {/* Career Goals */}
            <div className="section">
              <div className="section-title">Career Goals</div>
              <p style={{ fontSize: "9.5px", color: "#2d1f0e", lineHeight: 1.6 }}>
                Pursuing an MD in Psychiatry, integrating clinical care with AI-driven research and
                faith-based counseling. Goal: develop accessible, data-informed interventions for mental
                health, bridging neuroscience, technology, and human dignity. Simultaneously building
                Purcell Ventures and a personal content brand at the intersection of psychology, faith,
                and intellectual discourse.
              </p>
            </div>

        </div>

        {/* Footer */}
        <div className="footer">
          <span>Elijah Purcell · elijahpurcell@gmail.com · (770) 280-5319 · Acworth, GA</span>
          <span>purcellventures.co · Updated August 2026</span>
        </div>

      </div>
    </>
  );
}
