import type { Metadata } from "next";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata: Metadata = {
  title: "Elijah Purcell — Resume & Achievements",
  description:
    "Elijah Purcell | Cornerstone Prep Academy '26 | University of Alabama Honors College | Entrepreneur, Vocalist, Writer. Full activities, awards, and scholarship record.",
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

export default function ResumePage() {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      {/* Mini nav — SiteNav is hidden on /resume per HIDE_ON list */}
      <nav style={{
        position: "relative", zIndex: 5,
        padding: "16px 36px",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
      }}>
        <a href="/" style={{ color: C.textMuted, textDecoration: "none" }}>← Purcell · Ventures</a>
        <a href="/resume/print" style={{ color: C.accent, textDecoration: "none" }}>Print version →</a>
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
            Résumé · Field Record · Class of 2026
          </div>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
            fontSize: "clamp(40px, 7vw, 84px)",
            lineHeight: 0.98, letterSpacing: "0.005em",
            color: C.text, margin: 0,
          }}>
            Elijah Brent <em className="pv-italic" style={{ fontWeight: 400, color: C.accent }}>Purcell</em>
          </h1>
          <p className="pv-italic" style={{ marginTop: "16px", fontSize: "18px", color: C.text, opacity: 0.78, maxWidth: "640px", lineHeight: 1.5 }}>
            Cornerstone Preparatory Academy, Class of 2026 · Acworth, Georgia
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
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            border: `1px solid ${C.border}`,
            background: C.bgAlt,
          }}>
            {[
              { val: "3.92",       label: "GPA (weighted)" },
              { val: "1440",       label: "SAT score" },
              { val: "34",         label: "Acceptances" },
              { val: "$520k+/yr",  label: "Scholarships" },
            ].map(({ val, label }, i) => (
              <div key={label} style={{
                padding: "20px 16px",
                textAlign: "center",
                borderRight: i < 3 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: "24px", fontWeight: 700,
                  color: C.accent, letterSpacing: "-0.01em",
                }}>
                  {val}
                </div>
                <div style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
                  color: C.textLight, marginTop: "6px",
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* ─── Education ─── */}
        <Section roman="I." title="Education">
          <Row
            left="Cornerstone Preparatory Academy — Acworth, GA"
            right="K – 8th Grade"
            sub="Elementary and middle school (4th – 8th in person; K–3rd homeschooled). The same school he returned to for high school."
          />
          <Row
            left="Grove Christian School — Midlothian, VA"
            right="2022 – 2023"
            sub="9th Grade – Mid 10th Grade · Beta Club · Honors courses"
            note="Awards: Behold (9th) · Steadfast (10th) · Christian Character Award · Christ-like Leadership Award · Highest Math Grade in Class (9th) · Lead in Christmas Musical"
          />
          <Row
            left="Cornerstone Preparatory Academy — Acworth, GA"
            right="2024 – 2026"
            sub="Mid 10th Grade – 12th Grade · GPA: 3.92 (weighted) · SAT: 1440 · Beta Club"
            note="Course highlights: 3 years Spanish · AP-level coursework · College-Level Worldview & Apologetics"
          />
          <Row
            left="Lee University — Summer Honors Program"
            right="Summer 2025"
            sub="Cryptography & Social Media · 6 College Credit Hours earned"
          />
          <Row
            left="The University of Alabama — Honors College"
            right="Enrolling Fall 2026"
            sub="B.S. Psychology / Data Science · Presidential Merit Scholarship ($28,000/yr)"
            note="Accepted to the Honors College; intent to pursue pre-med track toward psychiatry"
          />
        </Section>

        {/* ─── Awards & Honors ─── */}
        <Section roman="II." title="Awards" em="and honors">
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
          <Row left="University of Alabama — Honors College Admission" right="2026" sub="Selective admission based on academic achievement and demonstrated leadership." />
          <Row left="Georgia State University — Honors College Admission" right="2026" />
        </Section>

        {/* ─── Scholarship Record ─── */}
        <Section roman="III." title="Scholarship record" em="college offers">
          <p className="pv-italic" style={{ fontSize: "15px", color: C.text, opacity: 0.78, marginBottom: "20px", lineHeight: 1.5 }}>
            Merit scholarship offers from schools that have extended admission — all based on academic achievement.
          </p>
          {[
            { school: "Kalamazoo College",            amount: "$48,000/yr", note: "Lux Esto Scholarship" },
            { school: "Susquehanna University",       amount: "$48,000/yr", note: "Merit Scholarship" },
            { school: "Drake University",             amount: "$31,000/yr", note: "Merit Scholarship" },
            { school: "Hood College",                 amount: "$31,000/yr", note: "Presidential Scholarship" },
            { school: "Transylvania University",      amount: "$30,000/yr", note: "Merit Scholarship" },
            { school: "The University of Alabama",    amount: "$28,000/yr", note: "Presidential Merit (enrolled)" },
            { school: "Bradley University",           amount: "$28,000/yr", note: "Presidential Scholarship (confirmed)" },
            { school: "Presbyterian College",         amount: "$28,000/yr", note: "Highlander Scholarship (confirmed)" },
            { school: "Cedarville University",        amount: "$22,000/yr", note: "Merit Scholarship" },
            { school: "Berry College",                amount: "$20,000/yr", note: "Merit Scholarship, renewable" },
            { school: "Oral Roberts University",      amount: "$24,000/yr", note: "Merit Scholarship" },
            { school: "Lenoir-Rhyne University",      amount: "$26,000/yr", note: "Niche Direct Merit" },
            { school: "Nazareth University",          amount: "$25,000/yr", note: "Presidential Scholarship" },
            { school: "Palm Beach Atlantic University", amount: "$21,000/yr", note: "Merit Scholarship" },
            { school: "Charleston Southern University", amount: "$17,000/yr", note: "Merit Scholarship" },
            { school: "Mississippi College",          amount: "$14,500/yr", note: "Academic Merit Scholarship" },
            { school: "Hartwick College",             amount: "$10,000/yr", note: "Flight Path Scholarship" },
            { school: "Francis Marion University",    amount: "$10,884/yr", note: "Niche Direct Merit" },
            { school: "Rider University",             amount: "$3,000/yr",  note: "Merit Scholarship" },
            { school: "Valparaiso University",        amount: "$28,000/yr", note: "Merit Scholarship" },
            { school: "Georgia State University",     amount: "$1,060/yr",  note: "Merit + Honors College" },
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
              $520,444 / yr
            </span>
          </div>
          <p className="pv-italic" style={{ fontSize: "13px", color: C.textLight, marginTop: "10px" }}>
            34 acceptances. Enrolled at University of Alabama.
          </p>
        </Section>

        {/* ─── Work & Entrepreneurship ─── */}
        <Section roman="IV." title="Work" em="and entrepreneurship">
          <Row
            left="Founder & CEO — Purcell Ventures LLC"
            right="April 2025 – Present"
            sub="Software development, AI integration, and digital marketing. Built React Native apps, web platforms, Chrome extensions, and AI pipelines. Leads service business and wholesale real estate divisions."
            note="Filed as Zultar LLC 4/8/2025, rebranded Purcell Ventures LLC 1/27/2026. Client work deployed to production. Generates active revenue."
          />
          <Row
            left="Founder — Autoblade Services"
            right="2024 – Present"
            sub="Launched and operate a lawn care and property services business. Handle client acquisition, scheduling, equipment maintenance, and service delivery."
          />
          <Row
            left="AI Data Trainer — Outlier AI (Aether Project)"
            right="Feb 2026 – Present"
            sub="Training and evaluating AI models at $15/hr. Contributes to large language model quality and alignment work."
          />
          <Row
            left="Team Member — Chick-fil-A"
            right="10th Grade (6 months)"
            sub="Front-line customer service in a high-volume environment. Built discipline, teamwork, and communication skills."
          />
        </Section>

        {/* ─── Leadership ─── */}
        <Section roman="V." title="Leadership" em="and ministry">
          <SubSection title="School + Organizational Leadership">
            <Row left="Member — Mighty Men (Men's Bible Study, Cornerstone Prep)" right="11th – 12th Grade" sub="Active member of the school&apos;s men&apos;s discipleship group. Weekly 2-hour discussions on faith, character, and spiritual formation." />
            <Row left="Head Chaplain" right="9th Spring – 10th Fall" sub="Organized school chapel services, coordinated worship teams, and led school-wide spiritual programming. Weekly rehearsals and Friday performances." />
            <Row left="Worship Team — Lead Vocalist" right="9th – 12th Grade" sub="Lead vocalist at school chapel and church services. Bass-baritone, range C1–F5. Rehearsals 2–3×/week." />
            <Row left="Youth Group Leader & Summer Camp Counselor" right="Ongoing" sub="Mentors younger students at church, leads group discussions, and staffs week-long summer camp annually." />
            <Row left="Peer Tutor (Math & English)" right="10th – 12th Grade" sub="One-on-one academic support for classmates. Improved peers&apos; grades through structured review sessions." />
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
              year="Senior Year"
              location="Hawaii"
              org="Disaster Relief · March 2026"
              bullets={[
                "Deploying to provide disaster relief following the severe flooding that impacted Hawaii in early 2026.",
                "Serving in construction support, community aid, and worship/prayer leadership.",
              ]}
            />
          </SubSection>
        </Section>

        {/* ─── Community Service ─── */}
        <Section roman="VI." title="Community service" em="and volunteer work">
          <Row left="MUST Ministries — Food Collection" sub="Organized and participated in food drives benefiting MUST Ministries, a nonprofit providing hunger relief, shelter, and support services to families in need across greater Atlanta." />
          <Row left="Children&apos;s Ministry — Church Volunteer" sub="Serves regularly in the kids ministry program at Stonebridge Church (Marietta) — teaching, mentoring, and leading activities for elementary-age children." />
          <Row left="Community Cleanup — Environmental Service" sub="Volunteer park and neighborhood cleanup efforts. Ongoing participation in local environmental stewardship." />
          <p className="pv-italic" style={{ fontSize: "13px", color: C.textLight, marginTop: "8px" }}>
            200+ cumulative volunteer hours across ministry, mission, and community service.
          </p>
        </Section>

        {/* ─── Athletics ─── */}
        <Section roman="VII." title="Athletics">
          <Row left="Cheerleader — Back / Base" right="9th – 10th Grade" sub="Competitive cheer support and stunt base. 6–7 hrs/week during season." />
          <Row left="Track & Field — Shot Put, Discus, 100m" right="9th Grade" sub="Competed in field and sprint events during 9th grade spring season." />
          <Row left="Weightlifting" right="Ongoing" sub="Scientific hypertrophy-focused training program. Consistent multi-year commitment." />
        </Section>

        {/* ─── Clubs ─── */}
        <Section roman="VIII." title="Clubs" em="and organizations">
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

        {/* ─── Arts & Creative ─── */}
        <Section roman="IX." title="Arts" em="media, creative work">
          <Row left="Vocalist — Bass-Baritone" right="Ongoing" sub="Range C1–F5. Lead worship vocalist at school and church. Active in performance and rehearsal consistently since 9th grade." />
          <Row left="Lead Actor — Christmas Musical" right="Grove" sub="Selected for the lead role in the school&apos;s annual Christmas production. Combined vocal performance with acting and stage presence." />
          <Row left="Poetry & Creative Writing" right="Ongoing" sub='Original works include "The Husks the Swine Did Eat," "Injustice Scorned," "The Rebuking of Loki," fiction novel drafts, and personal essays. Writes across 8 distinct styles.' />
          <Row left="Content Creation — YouTube & Social Media" right="2023 – Present" sub="Scripts, films, and edits commentary content on psychology, faith, and culture. YouTube channel with 2,800+ subscribers transitioning to intellectual commentary." />
          <Row left="Photography, Videography & Graphic Design" right="Ongoing" sub="Photoshop experience. Handles brand design, product photography, and video production for Purcell Ventures clients and personal projects." />
        </Section>

        {/* ─── Skills ─── */}
        <Section roman="X." title="Skills" em="and technical abilities">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              ["Programming",   "Python (CS50P), JavaScript/TypeScript, React Native, Node.js"],
              ["AI & Automation", "OpenAI API, AI pipeline design, data training & evaluation"],
              ["Software",      "Expo, Next.js, Express, Git, Photoshop"],
              ["Communication", "Public speaking, theological debate, persuasive writing"],
              ["Business",      "Client management, invoicing, scheduling, marketing"],
              ["Music",         "Vocal performance (bass-baritone), worship leading, stage presence"],
              ["Languages",     "English (native), Spanish (3 yrs)"],
              ["Fitness",       "Strength & conditioning, scientific training methodology"],
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

        {/* ─── Faith & Service ─── */}
        <Section roman="XI." title="Faith" em="and community life">
          <Row left="Church Involvement — Stonebridge (Marietta) + Kennesaw First Baptist" right="Ongoing" sub="Stonebridge Church (Marietta) — Sunday service, longstanding home church, baptized here at 15. Kennesaw First Baptist — Wednesday youth and retreats (~1.5 years)." />
          <Row left="Apologetics & Theology Study" right="Ongoing" sub="Independently studying William Lane Craig, Sean McDowell, C.S. Lewis, A.W. Tozer, hermeneutics, and philosophy of religion." />
        </Section>

        {/* ─── Goals ─── */}
        <Section roman="XII." title="Career goals" em="and vision">
          <p className="pv-italic" style={{ fontSize: "18px", color: C.text, opacity: 0.92, lineHeight: 1.55, maxWidth: "640px" }}>
            I plan to pursue an MD in Psychiatry, integrating clinical mental health care with AI-driven research and faith-based counseling. My goal is to develop accessible, data-informed interventions for mental health — bridging neuroscience, technology, and human dignity. Alongside medicine, I&apos;m building a multi-stream entrepreneurial portfolio through Purcell Ventures and developing a personal content brand centered on the intersection of psychology, faith, and intellectual discourse.
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
            <span style={{ color: C.textLight }}>Updated May 2026</span>
          </div>
        </div>

      </main>
    </div>
  );
}
