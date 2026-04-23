import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elijah Purcell — Resume & Achievements",
  description:
    "Elijah Purcell | Cornerstone Prep Academy '26 | University of Alabama Honors College | Entrepreneur, Vocalist, Writer. Full activities, awards, and scholarship record.",
};

const SA = {
  bg: "#f5ede0",
  bgAlt: "#ede3d4",
  card: "#fff8f0",
  border: "#d6c4a8",
  accent: "#8b5e3c",
  accentLight: "#b87d52",
  gold: "#9a7a2e",
  goldLight: "#c4a24a",
  text: "#2d1f0e",
  textMuted: "#6b5444",
  textLight: "#9a8270",
  green: "#4a7a4a",
  blue: "#3a5a7a",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: SA.accent,
        borderBottom: `2px solid ${SA.accent}`,
        paddingBottom: "6px",
        marginBottom: "1.25rem",
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: SA.textMuted,
        marginBottom: "0.6rem",
        paddingBottom: "3px",
        borderBottom: `1px solid ${SA.border}`,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Row({ left, right, sub, note }: { left: string; right?: string; sub?: string; note?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem", gap: "12px" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: SA.text, fontSize: "14px", lineHeight: 1.4 }}>{left}</div>
        {sub && <div style={{ color: SA.textMuted, fontSize: "13px", marginTop: "2px", lineHeight: 1.4 }}>{sub}</div>}
        {note && <div style={{ color: SA.textLight, fontSize: "12px", marginTop: "3px", fontStyle: "italic" }}>{note}</div>}
      </div>
      {right && (
        <div style={{ fontSize: "12px", color: SA.textMuted, whiteSpace: "nowrap", paddingTop: "2px" }}>{right}</div>
      )}
    </div>
  );
}

function AwardBadge({ text }: { text: string }) {
  return (
    <span style={{
      display: "inline-block",
      background: SA.bgAlt,
      border: `1px solid ${SA.border}`,
      borderRadius: "4px",
      padding: "3px 8px",
      fontSize: "12px",
      color: SA.text,
      marginRight: "6px",
      marginBottom: "6px",
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
      padding: "8px 12px",
      background: SA.card,
      border: `1px solid ${SA.border}`,
      borderRadius: "6px",
      marginBottom: "6px",
      gap: "8px",
    }}>
      <div>
        <span style={{ fontWeight: 600, fontSize: "13px", color: SA.text }}>{school}</span>
        {note && <span style={{ fontSize: "12px", color: SA.textMuted, marginLeft: "8px" }}>{note}</span>}
      </div>
      <span style={{ fontWeight: 700, fontSize: "13px", color: SA.green, whiteSpace: "nowrap" }}>{amount}</span>
    </div>
  );
}

function ImpactCard({ year, location, org, bullets }: { year: string; location: string; org: string; bullets: string[] }) {
  return (
    <div style={{
      padding: "12px 14px",
      background: SA.card,
      border: `1px solid ${SA.border}`,
      borderRadius: "6px",
      marginBottom: "10px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: "13px", color: SA.text }}>{location}</span>
          <span style={{ fontSize: "12px", color: SA.textMuted, marginLeft: "8px" }}>{org}</span>
        </div>
        <span style={{ fontSize: "12px", color: SA.textMuted, whiteSpace: "nowrap" }}>{year}</span>
      </div>
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ fontSize: "12px", color: SA.textMuted, lineHeight: 1.5, marginBottom: "2px" }}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div style={{ background: SA.bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: SA.text,
        color: SA.bg,
        padding: "48px 40px 36px",
      }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            margin: 0,
            color: "#f5ede0",
          }}>
            Elijah Purcell
          </h1>
          <p style={{ fontSize: "14px", color: "#c4a890", margin: "8px 0 0", letterSpacing: "0.03em" }}>
            Cornerstone Preparatory Academy, Class of 2026 &nbsp;·&nbsp; Acworth, GA
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px", fontSize: "13px" }}>
            {[
              { label: "Email", val: "elijahpurcell@gmail.com", href: "mailto:elijahpurcell@gmail.com" },
              { label: "Business", val: "purcellventures.co", href: "https://purcellventures.co" },
              { label: "Full Resume (PDF)", val: "purcellventures.co/resume/print", href: "/resume/print" },
            ].map(({ label, val, href }) => (
              <span key={label} style={{ color: "#c4a890" }}>
                <span style={{ opacity: 0.6, marginRight: "4px" }}>{label}:</span>
                <a href={href} style={{ color: "#e8c96a", textDecoration: "none" }}>{val}</a>
              </span>
            ))}
          </div>
          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", marginTop: "24px", flexWrap: "wrap" }}>
            {[
              { val: "3.92", label: "GPA (weighted)" },
              { val: "1440", label: "SAT Score" },
              { val: "34", label: "College Acceptances" },
              { val: "$520k+/yr", label: "Merit Scholarships" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "22px", fontWeight: 700, color: "#e8c96a" }}>{val}</div>
                <div style={{ fontSize: "11px", color: "#9a8270", marginTop: "2px", letterSpacing: "0.04em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "36px 24px 60px" }}>

        {/* Education */}
        <Section title="Education">
          <Row
            left="Grove Christian School — Midlothian, VA"
            right="2022 – 2024"
            sub="9th Grade – Mid 10th Grade · Beta Club · Honors courses"
            note="Awards: Behold (9th) · Steadfast (10th) · Christ-like Leadership Award (Sports Banquet) · Lead in Christmas Musical"
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

        {/* Awards & Honors */}
        <Section title="Awards & Honors">
          <Row
            left="Behold Award"
            right="9th Grade · Grove Christian School"
            sub="Character and excellence recognition awarded to select students for demonstrated moral integrity and spiritual maturity."
          />
          <Row
            left="Steadfast Award"
            right="10th Grade · Grove Christian School"
            sub="Recognition for consistent perseverance, faithfulness, and character under pressure."
          />
          <Row
            left="Christian Character Award"
            right="Cornerstone Prep"
            sub="Selected as one of two students school-wide (one male, one female) for moral excellence, integrity, and leadership."
          />
          <Row
            left="Christ-like Leadership Award"
            right="Grove Christian School · Sports Banquet"
            sub="Awarded at the annual athletics banquet for embodying servant leadership and Christian character in competitive sport."
          />
          <Row
            left="Lead Role — Christmas Musical"
            right="Grove Christian School"
            sub="Selected for the lead acting and vocal role in the school's annual Christmas production."
          />
          <Row
            left="Highest Math Grade in Class"
            right="9th Grade"
            sub="Earned 100% both semesters — top math average in the class."
          />
          <Row
            left="Family Foundation & Colson Center — Youth Leadership Summit"
            right="Summer 2023 · Richmond, VA"
            sub="Competitive invitation-only summit. Advanced seminar on worldview, cultural analysis, and Christian civic leadership. College-level critical reading and analytical writing."
          />
          <Row
            left="University of Alabama — Honors College Admission"
            right="2026"
            sub="Selective admission based on academic achievement and demonstrated leadership."
          />
          <Row
            left="Georgia State University — Honors College Admission"
            right="2026"
          />
        </Section>

        {/* Scholarship Record */}
        <Section title="Scholarship Record (College Offers)">
          <p style={{ fontSize: "12px", color: SA.textMuted, marginBottom: "12px" }}>
            Merit scholarship offers from schools that have extended admission — all based on academic achievement.
          </p>
          <ScholarCard school="Kalamazoo College" amount="$48,000/yr" note="Lux Esto Scholarship" />
          <ScholarCard school="Susquehanna University" amount="$48,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Drake University" amount="$31,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Hood College" amount="$31,000/yr" note="Presidential Scholarship" />
          <ScholarCard school="Transylvania University" amount="$30,000/yr" note="Merit Scholarship" />
          <ScholarCard school="The University of Alabama" amount="$28,000/yr" note="Presidential Merit (enrolled)" />
          <ScholarCard school="Bradley University" amount="$28,000/yr" note="Presidential Scholarship (confirmed)" />
          <ScholarCard school="Presbyterian College" amount="$28,000/yr" note="Highlander Scholarship (confirmed)" />
          <ScholarCard school="Cedarville University" amount="$22,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Berry College" amount="$20,000/yr" note="Merit Scholarship, renewable" />
          <ScholarCard school="Oral Roberts University" amount="$24,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Lenoir-Rhyne University" amount="$26,000/yr" note="Niche Direct Merit" />
          <ScholarCard school="Nazareth University" amount="$25,000/yr" note="Presidential Scholarship" />
          <ScholarCard school="Palm Beach Atlantic University" amount="$21,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Charleston Southern University" amount="$17,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Mississippi College" amount="$14,500/yr" note="Academic Merit Scholarship" />
          <ScholarCard school="Hartwick College" amount="$10,000/yr" note="Flight Path Scholarship" />
          <ScholarCard school="Francis Marion University" amount="$10,884/yr" note="Niche Direct Merit" />
          <ScholarCard school="Rider University" amount="$3,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Valparaiso University" amount="$28,000/yr" note="Merit Scholarship" />
          <ScholarCard school="Georgia State University" amount="$1,060/yr" note="Merit + Honors College" />
          <div style={{
            display: "flex", justifyContent: "space-between", padding: "10px 12px",
            background: SA.text, borderRadius: "6px", marginTop: "10px",
          }}>
            <span style={{ fontWeight: 700, fontSize: "13px", color: "#f5ede0" }}>Total (confirmed offers)</span>
            <span style={{ fontWeight: 700, fontSize: "14px", color: "#e8c96a" }}>$520,444 / year</span>
          </div>
          <p style={{ fontSize: "11px", color: SA.textLight, marginTop: "8px" }}>
            34 acceptances. Enrolled at University of Alabama.
          </p>
        </Section>

        {/* Work & Entrepreneurship */}
        <Section title="Work Experience & Entrepreneurship">
          <Row
            left="Founder & CEO — Purcell Ventures LLC"
            right="2023 – Present"
            sub="Software development, AI integration, and digital marketing. Built React Native apps, web platforms, Chrome extensions, and AI pipelines. Leads service business and wholesale real estate divisions."
            note="Client work deployed to production. Generates active revenue."
          />
          <Row
            left="Founder — Autoblade Services"
            right="2023 – Present"
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

        {/* Leadership */}
        <Section title="Leadership & Ministry">
          <SubSection title="School & Organizational Leadership">
            <Row
              left="Founder & Leader — Mighty Men (Men's Bible Study)"
              right="9th – 12th Grade"
              sub="Founded and leads the school's men's discipleship group. Plans and facilitates weekly 2-hour discussions, mentors peers, creates lesson materials, and supports spiritual formation."
            />
            <Row
              left="Head Chaplain"
              right="9th Spring – 10th Fall"
              sub="Organized school chapel services, coordinated worship teams, and led school-wide spiritual programming. Weekly rehearsals and Friday performances."
            />
            <Row
              left="Worship Team — Lead Vocalist"
              right="9th – 12th Grade"
              sub="Lead vocalist at school chapel and church services. Bass-baritone, range C1–F5. Rehearsals 2–3×/week."
            />
            <Row
              left="Youth Group Leader & Summer Camp Counselor"
              right="Ongoing"
              sub="Mentors younger students at church, leads group discussions, and staffs week-long summer camp annually."
            />
            <Row
              left="Peer Tutor (Math & English)"
              right="10th – 12th Grade"
              sub="One-on-one academic support for classmates. Improved peers' grades through structured review sessions."
            />
          </SubSection>

          <SubSection title="IMPACT Mission Trips">
            <ImpactCard
              year="Sophomore Year"
              location="North Carolina"
              org="Praying Pelican Missions"
              bullets={[
                "Organized and participated in a regional food drive serving underserved communities.",
                "Constructed a full floor and ADA-compliant accessibility ramp for an elderly couple's home after the husband became disabled.",
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

        {/* Community Service */}
        <Section title="Community Service & Volunteer Work">
          <Row
            left="MUST Ministries — Food Collection"
            sub="Organized and participated in food drives benefiting MUST Ministries, a nonprofit providing hunger relief, shelter, and support services to families in need across greater Atlanta."
          />
          <Row
            left="Children's Ministry — Church Volunteer"
            sub="Serves regularly in the kids ministry program at Riverstone Church — teaching, mentoring, and leading activities for elementary-age children."
          />
          <Row
            left="Community Cleanup — Environmental Service"
            sub="Volunteer park and neighborhood cleanup efforts. Ongoing participation in local environmental stewardship."
          />
          <p style={{ fontSize: "12px", color: SA.textLight, marginTop: "4px", fontStyle: "italic" }}>
            200+ cumulative volunteer hours across ministry, mission, and community service.
          </p>
        </Section>

        {/* Athletics */}
        <Section title="Athletics">
          <Row
            left="Cheerleader — Back / Base"
            right="9th – 10th Grade"
            sub="Competitive cheer support and stunt base. 6–7 hrs/week during season."
          />
          <Row
            left="Track & Field — Shot Put, Discus, 100m"
            right="9th Grade"
            sub="Competed in field and sprint events during 9th grade spring season."
          />
          <Row
            left="Weightlifting"
            right="Ongoing"
            sub="Scientific hypertrophy-focused training program. Consistent multi-year commitment."
          />
        </Section>

        {/* Clubs */}
        <Section title="Clubs & Organizations">
          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "12px" }}>
            {[
              "Beta Club (Grove & CPA)",
              "Apologetics & Debate Team",
              "Spanish Club (3 yrs)",
              "Club Med",
              "Creative Writing / Writer's Guild",
              "Curious Conversations",
              "Animal Ambassadors",
              "Senior Devotional",
              "Mighty Men (Founder & Leader)",
            ].map(c => <AwardBadge key={c} text={c} />)}
          </div>
          <Row
            left="Apologetics & Debate Team"
            right="9th – 12th Grade"
            sub="Engaged in formal and informal theological debate with teachers and peers. Contributed to school-wide theological discussion. 5–10 hrs/week."
          />
          <Row
            left="Creative Writing / Writer's Guild"
            right="11th Grade"
            sub="Workshop-style group focused on original fiction, poetry, and narrative craft. Produced original poetry, fiction drafts, and personal essays."
          />
          <Row
            left="Beta Club"
            right="Grove & Cornerstone"
            sub="National honor society recognizing academic achievement, character, leadership, and service."
          />
        </Section>

        {/* Arts & Creative */}
        <Section title="Arts, Media & Creative Work">
          <Row
            left="Vocalist — Bass-Baritone"
            right="Ongoing"
            sub="Range C1–F5. Lead worship vocalist at school and church. Active in performance and rehearsal consistently since 9th grade."
          />
          <Row
            left="Lead Actor — Christmas Musical"
            right="Grove Christian School"
            sub="Selected for the lead role in the school's annual Christmas production. Combined vocal performance with acting and stage presence."
          />
          <Row
            left="Poetry & Creative Writing"
            right="Ongoing"
            sub='Original works include "The Husks the Swine Did Eat," "Injustice Scorned," "The Rebuking of Loki," fiction novel drafts, and personal essays. Writes across 8 distinct styles.'
          />
          <Row
            left="Content Creation — YouTube & Social Media"
            right="2023 – Present"
            sub="Scripts, films, and edits commentary content on psychology, faith, and culture. YouTube channel with 2,800+ subscribers transitioning to intellectual commentary."
          />
          <Row
            left="Photography, Videography & Graphic Design"
            right="Ongoing"
            sub="Photoshop experience. Handles brand design, product photography, and video production for Purcell Ventures clients and personal projects."
          />
        </Section>

        {/* Skills */}
        <Section title="Skills & Technical Abilities">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              ["Programming", "Python (CS50P), JavaScript/TypeScript, React Native, Node.js"],
              ["AI & Automation", "OpenAI API, AI pipeline design, data training & evaluation"],
              ["Software", "Expo, Next.js, Express, Git, Photoshop"],
              ["Communication", "Public speaking, theological debate, persuasive writing"],
              ["Business", "Client management, invoicing, scheduling, marketing"],
              ["Music", "Vocal performance (bass-baritone), worship leading, stage presence"],
              ["Languages", "English (native), Spanish (3 yrs)"],
              ["Fitness", "Strength & conditioning, scientific training methodology"],
            ].map(([skill, desc]) => (
              <div key={skill} style={{ padding: "8px 12px", background: SA.card, border: `1px solid ${SA.border}`, borderRadius: "6px" }}>
                <div style={{ fontWeight: 600, fontSize: "12px", color: SA.accent, marginBottom: "2px" }}>{skill}</div>
                <div style={{ fontSize: "12px", color: SA.textMuted, lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Faith & Service */}
        <Section title="Faith & Community Service">
          <Row
            left="Church Involvement — Riverstone Church"
            right="Ongoing"
            sub="Sunday service (11am), youth group (5–7pm), and Wednesday Bible study (7–9pm) every week. Active participant since childhood; baptized at 15."
          />
          <Row
            left="Apologetics & Theology Study"
            right="Ongoing"
            sub="Independently studying William Lane Craig, Sean McDowell, C.S. Lewis, A.W. Tozer, hermeneutics, and philosophy of religion."
          />
        </Section>

        {/* Goals */}
        <Section title="Career Goals & Vision">
          <p style={{ fontSize: "14px", color: SA.text, lineHeight: 1.7, maxWidth: "600px" }}>
            I plan to pursue an MD in Psychiatry, integrating clinical mental health care with AI-driven research and faith-based counseling. My goal is to develop accessible, data-informed interventions for mental health — bridging neuroscience, technology, and human dignity. Alongside medicine, I&apos;m building a multi-stream entrepreneurial portfolio through Purcell Ventures and developing a personal content brand centered on the intersection of psychology, faith, and intellectual discourse.
          </p>
        </Section>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${SA.border}`,
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          <div style={{ fontSize: "12px", color: SA.textLight }}>
            Elijah Purcell · elijahpurcell@gmail.com · Acworth, GA
          </div>
          <div style={{ fontSize: "12px", color: SA.textLight }}>
            <a href="https://purcellventures.co" style={{ color: SA.accentLight, textDecoration: "none" }}>purcellventures.co</a>
            {" "}&nbsp;·&nbsp; Updated April 2026
          </div>
        </div>

      </div>
    </div>
  );
}
