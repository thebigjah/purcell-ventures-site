"use client";

// ─── CUSTOMIZATION BLOCK ────────────────────────────────────────────────────
// Before sending to a specific person/org, edit these fields:
const RECIPIENT = {
  targetOrg: "",           // e.g. "Johns Hopkins Pre-Med Program"
  targetRole: "",          // e.g. "Undergraduate Research Position"
  emphasize: [] as string[], // sections to highlight, e.g. ["science", "leadership"]
};
// ────────────────────────────────────────────────────────────────────────────

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
          padding: 0.65in 0.7in 0.65in;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: #1a1208;
          line-height: 1.45;
        }

        /* HEADER */
        .header { border-bottom: 2.5px solid #2d1f0e; padding-bottom: 10px; margin-bottom: 14px; }
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
        .header-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 0 20px;
          margin-top: 6px;
          font-size: 10px;
          color: #4a3020;
        }
        .header-stats {
          display: flex;
          gap: 24px;
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
        .section { margin-bottom: 13px; }
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

        /* TWO COLUMN LAYOUT */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }

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
            Cornerstone Preparatory Academy, Class of 2026 · Acworth, GA
          </div>
          <div className="header-contact">
            <span>elijahpurcell@gmail.com</span>
            <span>purcellventures.co</span>
            <span>Acworth, GA 30101</span>
          </div>
          <div className="header-stats">
            {[
              { val: "3.92", label: "GPA (Weighted)" },
              { val: "1440", label: "SAT" },
              { val: "29", label: "Acceptances" },
              { val: "$441k+/yr", label: "Scholarships" },
            ].map(s => (
              <div className="stat-block" key={s.label}>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column body */}
        <div className="two-col">

          {/* LEFT COLUMN */}
          <div>

            {/* Education */}
            <div className="section">
              <div className="section-title">Education</div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">Grove Christian School — Midlothian, VA</div>
                  <div className="row-sub">9th–Mid 10th Grade · Beta Club · Honors coursework</div>
                  <div className="row-note">Awards: Behold (9th) · Steadfast (10th) · Christ-like Leadership Award · Lead in Christmas Musical</div>
                </div>
                <div className="row-right">2022–2024</div>
              </div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">Cornerstone Preparatory Academy — Acworth, GA</div>
                  <div className="row-sub">Mid 10th–12th · GPA 3.92 (wtd) · SAT 1440 · Beta Club</div>
                  <div className="row-note">3 yrs Spanish · AP-level coursework · Worldview & Apologetics seminar</div>
                </div>
                <div className="row-right">2024–2026</div>
              </div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">Lee University — Summer Honors Program</div>
                  <div className="row-sub">Cryptography & Social Media · 6 College Credit Hours</div>
                </div>
                <div className="row-right">Summer 2025</div>
              </div>

              <div className="row">
                <div className="row-left">
                  <div className="row-title">University of Alabama — Honors College</div>
                  <div className="row-sub">B.S. Psychology / Data Science · Presidential Merit ($28,000/yr)</div>
                  <div className="row-note">Pre-med track; Honors College admission</div>
                </div>
                <div className="row-right">Fall 2026</div>
              </div>
            </div>

            {/* Awards */}
            <div className="section">
              <div className="section-title">Awards & Honors</div>
              {[
                ["Behold Award", "9th Grade · Grove Christian School", "Character and excellence recognition for moral integrity and spiritual maturity."],
                ["Steadfast Award", "10th Grade · Grove Christian School", "Recognition for perseverance, faithfulness, and character under pressure."],
                ["Christian Character Award", "Cornerstone Prep", "One of two students school-wide selected for moral excellence and leadership."],
                ["Christ-like Leadership Award", "Sports Banquet · Grove", "Awarded for servant leadership and Christian character in competitive sport."],
                ["Lead Role — Christmas Musical", "Grove Christian School", "Lead acting and vocal role in the annual Christmas production."],
                ["Highest Math Grade in Class", "9th Grade", "100% both semesters — top math average in the class."],
                ["Youth Leadership Summit", "Family Foundation & Colson Center · Richmond, VA · Summer 2023", "Invitation-only. Advanced worldview, cultural analysis, and Christian civic leadership seminar."],
                ["UA Honors College Admission", "2026", "Selective admission based on academic achievement and leadership."],
                ["GSU Honors College Admission", "2026", ""],
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

            {/* Work */}
            <div className="section">
              <div className="section-title">Work Experience & Entrepreneurship</div>
              <div className="row">
                <div className="row-left">
                  <div className="row-title">Founder & CEO — Purcell Ventures LLC</div>
                  <div className="row-sub">Software development, AI integration, digital marketing. Built React Native apps, web platforms, and AI pipelines. Active revenue.</div>
                </div>
                <div className="row-right">2023–Present</div>
              </div>
              <div className="row">
                <div className="row-left">
                  <div className="row-title">Founder — Autoblade Services</div>
                  <div className="row-sub">Lawn care and property services. Client acquisition, scheduling, and service delivery.</div>
                </div>
                <div className="row-right">2023–Present</div>
              </div>
              <div className="row">
                <div className="row-left">
                  <div className="row-title">AI Data Trainer — Outlier AI (Aether Project)</div>
                  <div className="row-sub">Training and evaluating AI models at $15/hr. LLM quality and alignment work.</div>
                </div>
                <div className="row-right">Feb 2026–Present</div>
              </div>
              <div className="row">
                <div className="row-left">
                  <div className="row-title">Team Member — Chick-fil-A</div>
                  <div className="row-sub">High-volume customer service. Built discipline, teamwork, communication skills.</div>
                </div>
                <div className="row-right">10th Grade</div>
              </div>
            </div>

            {/* Skills */}
            <div className="section">
              <div className="section-title">Skills</div>
              <div className="skills-grid">
                {[
                  ["Programming", "Python, JavaScript/TypeScript, React Native, Node.js"],
                  ["AI & Automation", "OpenAI API, AI pipeline design, data training & eval"],
                  ["Software", "Expo, Next.js, Express, Git, Photoshop"],
                  ["Communication", "Public speaking, theological debate, persuasive writing"],
                  ["Business", "Client management, invoicing, scheduling, marketing"],
                  ["Music", "Vocal performance (bass-baritone), worship leading"],
                  ["Languages", "English (native), Spanish (3 yrs)"],
                  ["Fitness", "Strength & conditioning, hypertrophy methodology"],
                ].map(([label, val]) => (
                  <div className="skill-card" key={label}>
                    <div className="skill-label">{label}</div>
                    <div className="skill-val">{val}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div>

            {/* Scholarship Record */}
            <div className="section">
              <div className="section-title">Scholarship Record</div>
              <div className="scholar-grid">
                {[
                  ["Kalamazoo College", "$48,000/yr", "Lux Esto"],
                  ["Susquehanna University", "$48,000/yr", "Merit"],
                  ["Drake University", "$31,000/yr", "Merit"],
                  ["Hood College", "$31,000/yr", "Presidential"],
                  ["Transylvania University", "$30,000/yr", "Merit"],
                  ["University of Alabama", "$28,000/yr", "Presidential Merit ✓"],
                  ["Bradley University", "$28,000/yr", "Presidential ✓"],
                  ["Presbyterian College", "$28,000/yr", "Highlander ✓"],
                  ["Cedarville University", "$22,000/yr", "Merit"],
                  ["Berry College", "$20,000/yr", "Merit, renewable"],
                  ["Oral Roberts University", "$24,000/yr", "Merit"],
                  ["Lenoir-Rhyne University", "$26,000/yr", "Niche Direct"],
                  ["Palm Beach Atlantic", "$21,000/yr", "Merit"],
                  ["Charleston Southern", "$17,000/yr", "Merit"],
                  ["Mississippi College", "$14,500/yr", "Academic Merit"],
                  ["Hartwick College", "$10,000/yr", "Flight Path"],
                  ["Francis Marion University", "$10,884/yr", "Niche Direct"],
                  ["Rider University", "$3,000/yr", "Merit"],
                  ["Georgia State University", "$1,060/yr", "Merit + Honors"],
                ].map(([school, amt, note]) => (
                  <div className="scholar-row" key={school}>
                    <div className="scholar-name">{school} <span>{note}</span></div>
                    <div className="scholar-amount">{amt}</div>
                  </div>
                ))}
              </div>
              <div className="scholar-total">
                <span className="scholar-total-label">Total (confirmed offers)</span>
                <span className="scholar-total-val">$441,444 / year</span>
              </div>
              <div style={{ fontSize: "8px", color: "#9a8270", marginTop: "3px", fontStyle: "italic" }}>
                29 acceptances as of March 2026. Additional decisions pending.
              </div>
            </div>

            {/* Leadership */}
            <div className="section">
              <div className="section-title">Leadership & Ministry</div>

              <div className="subsection-title">School & Church</div>
              {[
                ["Founder & Leader — Mighty Men (Men's Bible Study)", "9th–12th", "Plans and leads weekly 2-hr discipleship group. Mentors peers, creates curriculum."],
                ["Head Chaplain", "9th–10th", "Organized chapel services, coordinated worship teams, led school-wide programming."],
                ["Worship Team — Lead Vocalist", "9th–12th", "Lead bass-baritone vocalist at school and church. Range C1–F5. 2–3 rehearsals/week."],
                ["Youth Group Leader & Camp Counselor", "Ongoing", "Mentors younger students at church, leads group discussions, staffs summer camp."],
                ["Peer Tutor (Math & English)", "10th–12th", "One-on-one academic support. Improved peers' grades through structured review."],
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
                  <li>Built a full floor and ADA accessibility ramp for an elderly couple's home after the husband became disabled.</li>
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
                  <span className="impact-year">Senior Year · March 2026</span>
                </div>
                <ul className="impact-bullets">
                  <li>Serving in disaster relief following severe flooding. Construction support, community aid, worship and prayer leadership.</li>
                </ul>
              </div>
            </div>

            {/* Clubs & Athletics side by side */}
            <div className="section">
              <div className="section-title">Clubs & Organizations</div>
              <div className="badge-wrap">
                {["Beta Club (Grove & CPA)", "Apologetics & Debate", "Spanish Club (3 yrs)", "Club Med", "Creative Writing / Writer's Guild", "Curious Conversations", "Animal Ambassadors", "Senior Devotional", "Mighty Men (Founder)"].map(b => (
                  <span className="badge" key={b}>{b}</span>
                ))}
              </div>
            </div>

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
                ["Children's Ministry — Riverstone Church", "Ongoing", "Teaching, mentoring, and leading activities for elementary-age children."],
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
                Pursuing an MD in Psychiatry, integrating clinical care with AI-driven research and faith-based counseling. Goal: develop accessible, data-informed interventions for mental health — bridging neuroscience, technology, and human dignity. Simultaneously building Purcell Ventures and a personal content brand at the intersection of psychology, faith, and intellectual discourse.
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <span>Elijah Purcell · elijahpurcell@gmail.com · Acworth, GA</span>
          <span>purcellventures.co · Updated March 2026</span>
        </div>

      </div>
    </>
  );
}
