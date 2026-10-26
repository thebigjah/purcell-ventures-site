"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";

const compareTh: React.CSSProperties = { padding: "14px 16px", textAlign: "left", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontWeight: 700, borderBottom: "1px solid var(--color-warm-border)" };
const compareTd: React.CSSProperties = { padding: "14px 16px", color: "var(--color-warm-text-muted)", fontSize: "13px", lineHeight: 1.5 };
const compareCheck: React.CSSProperties = { ...compareTd, color: "#7aaa6a", fontWeight: 600, background: "rgba(212, 175, 55, 0.03)" };

const TIERS = [
  {
    name: "One-Off Help",
    price: "$99",
    unit: "flat",
    desc: "One 90-minute session, in-person (Metro Atlanta) or over video. You bring one problem and we solve it in that session.",
    fits: "Best for a single need, such as a new iPhone, a ChatGPT lesson, a smart speaker setup or a password manager move.",
    highlight: false,
  },
  {
    name: "Monthly Care",
    price: "$79",
    unit: "/ month",
    desc: "Unlimited texts during business hours, a 30-minute video check-in every month and 1 in-person visit (Metro Atlanta).",
    fits: "Best for ongoing help, when you have tech questions most weeks and want someone to text.",
    highlight: true,
  },
  {
    name: "Family Care",
    price: "$149",
    unit: "/ month",
    desc: "Everything in Monthly Care, covering up to 4 family members under one plan.",
    fits: "Best for adult children who support their parents' devices. Your mom calls me instead of you.",
    highlight: false,
  },
];

const PACKAGES = [
  { name: "New phone setup", price: "$79", desc: "Out-of-box iPhone or Android: contacts, email, photos, apps, password manager, 2FA, accessibility settings, and unused apps removed." },
  { name: "ChatGPT crash course", price: "$129", desc: "A 90-minute hands-on lesson. By the end you can use ChatGPT or Claude for research, writing, planning and decisions. I build it around the things you want to use it for." },
  { name: "Password manager migration", price: "$99", desc: "I set up 1Password or Bitwarden. I move every saved password out of your browsers and set up family sharing. You stop reusing passwords." },
  { name: "Medication reminder setup", price: "$99", desc: "For an elderly parent or grandparent. Smart speaker reminders, phone reminders and a visual cue system. Includes a 30-minute training session with them." },
  { name: "Smart home starter", price: "$199", desc: "One Echo or Google Home, 4 smart bulbs, 2 plugs and three routines (morning, evening, away) that I set up. Includes a 60-minute walkthrough." },
  { name: "Digital legacy plan", price: "$149", desc: "I document every account, password, subscription and digital asset so your family can access them if something happens to you. I write the plan down, store it securely and test it." },
];

const PROBLEMS = [
  { title: "\"My phone is a mess\"", body: "I sort your apps, notifications and photos in one session." },
  { title: "\"Everyone says use AI\"", body: "I show you which AI tools, such as ChatGPT, Claude or Gemini, save you time on the things you do." },
  { title: "\"My passwords are everywhere\"", body: "If you reuse passwords or keep them on sticky notes, one breach exposes every account. I set up a password manager." },
  { title: "\"My mom can't track her meds\"", body: "I set up phone reminders, a smart speaker and visual cues, then teach her to use them." },
  { title: "\"I bought an Echo and it's still in the box\"", body: "I set up the smart home gear and walk you through it." },
  { title: "\"My digital life is chaos\"", body: "I clean up iCloud, Google Drive and forgotten subscriptions, then set up a system you can keep up with." },
];

const FAQ = [
  {
    q: "How is this different from your AI Consulting?",
    a: "Consulting is for business teams. I train your staff to use AI in their work. Steady is for you, your household and your parents.",
  },
  {
    q: "Are you only available in Atlanta?",
    a: "In-person visits are Metro Atlanta. Remote help (video and screen share) covers anywhere in the US. Most Monthly Care work happens remotely. I use the in-person visit for setup or family training.",
  },
  {
    q: "Can you help my elderly parent who's not tech-savvy?",
    a: "Yes. Family Care is built for that. I repeat things, write down steps, come back if something breaks, and explain things in plain words.",
  },
  {
    q: "Do you fix broken devices?",
    a: "No. I'm not a repair shop. I help you use devices that work. If your laptop is dead, take it to Apple or Best Buy first, and I'll help you set up the new one.",
  },
  {
    q: "What happens after Monthly Care month 1?",
    a: "It renews monthly. You can cancel any time with a text. There is no contract.",
  },
];

export default function SteadyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .st-tiers, .st-packages, .st-problems { grid-template-columns: 1fr !important; }
        }
      ` }} />
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">Personal IT</div>
          <h1>
            Personal IT help <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>for families.</em>
          </h1>
          <p className="deck">
            For your mom, your dad, your grandparents and you. I set up your devices, teach you to use them, and answer when something breaks.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a className="pv-btn-primary" href="#tiers">See plans</a>
            <a className="pv-btn-ghost" href="#packages">One-off packages</a>
            <a className="pv-btn-ghost" href="mailto:elijah@purcell-ventures.com">Email Elijah</a>
          </div>
        </header>

        {/* Who this is for */}
        <p className="pv-italic" style={{ fontSize: "22px", color: "var(--color-warm-text)", opacity: 0.9, lineHeight: 1.5, maxWidth: "780px", marginBottom: "48px" }}>
          Steady is for the family tech person, the one who answers mom&apos;s phone questions, taught dad to use ChatGPT, and still gets texts about grandma&apos;s tablet. <span style={{ color: "var(--color-warm-accent)", fontStyle: "normal", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "16px", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 700, marginLeft: "8px" }}>I can take that job.</span>
        </p>

        {/* Problems we solve */}
        <header className="pv-section-head">
          <span className="roman">I.</span>
          <h2>What I <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>help with</em></h2>
        </header>

        <div className="st-problems" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "56px" }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} className="pv-card">
              <span className="b3"></span><span className="b4"></span>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", fontWeight: 600, color: "var(--color-warm-text)", margin: "0 0 8px", lineHeight: 1.3 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Tiers */}
        <header id="tiers" className="pv-section-head">
          <span className="roman">II.</span>
          <h2>Care <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>plans</em></h2>
        </header>

        <div className="st-tiers" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {TIERS.map((t) => (
            <div key={t.name} style={{
              background: t.highlight ? "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.01))" : "var(--color-warm-bg-alt)",
              border: t.highlight ? "2px solid var(--color-warm-accent)" : "1px solid var(--color-warm-border)",
              padding: "32px 28px",
              position: "relative",
            }}>
              {t.highlight && (
                <div style={{ position: "absolute", top: "-12px", left: "20px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", padding: "4px 10px", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Recommended
                </div>
              )}
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 12px", fontWeight: 600 }}>{t.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "16px" }}>
                <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{t.price}</span>
                <span style={{ fontSize: "13px", color: "var(--color-warm-text-muted)" }}>{t.unit}</span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6, marginBottom: "16px" }}>{t.desc}</p>
              <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic", lineHeight: 1.5, borderTop: "1px solid var(--color-warm-border)", paddingTop: "14px", margin: 0 }}>{t.fits}</p>
            </div>
          ))}
        </div>

        {/* Packages */}
        <header id="packages" className="pv-section-head">
          <span className="roman">III.</span>
          <h2>Done-for-you <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>packages</em></h2>
        </header>

        <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "24px", maxWidth: "680px", lineHeight: 1.6 }}>
          Each package has a flat fee and includes the setup and a short training session, so you or the person you bought it for can use it afterward.
        </p>

        <div className="st-packages" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "56px" }}>
          {PACKAGES.map((p) => (
            <div key={p.name} style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", fontWeight: 600, color: "var(--color-warm-text)", margin: 0 }}>{p.name}</h3>
                <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-accent)", fontWeight: 700 }}>{p.price}</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* vs Alternatives */}
        <header className="pv-section-head">
          <span className="roman">IV.</span>
          <h2>How Steady <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>compares</em></h2>
        </header>

        <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "20px", lineHeight: 1.6, maxWidth: "680px" }}>
          There are other ways to handle the &quot;my mom can&apos;t figure out her phone&quot; problem.
        </p>

        <div style={{ overflowX: "auto", marginBottom: "48px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "720px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={compareTh}></th>
                <th style={{ ...compareTh, background: "rgba(212, 175, 55, 0.08)", color: "var(--color-warm-accent)" }}>Steady</th>
                <th style={compareTh}>Geek Squad / Best Buy</th>
                <th style={compareTh}>Asking your kid</th>
                <th style={compareTh}>Going it alone</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                <td style={compareTd}><strong style={{ color: "var(--color-warm-text)" }}>Patience with non-techies</strong></td>
                <td style={compareCheck}>Built for non-technical people</td>
                <td style={compareTd}>Hit or miss by tech</td>
                <td style={compareTd}>Often frustrated</td>
                <td style={compareTd}>No one to ask</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                <td style={compareTd}><strong style={{ color: "var(--color-warm-text)" }}>Teaches you to do it yourself</strong></td>
                <td style={compareCheck}>Every session</td>
                <td style={compareTd}>Rarely</td>
                <td style={compareTd}>Rarely (they just do it for you)</td>
                <td style={compareTd}>You teach yourself</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                <td style={compareTd}><strong style={{ color: "var(--color-warm-text)" }}>Available between visits</strong></td>
                <td style={compareCheck}>Unlimited texts on Monthly and Family Care</td>
                <td style={compareTd}>Pay per visit</td>
                <td style={compareTd}>Yes but they&apos;re busy</td>
                <td style={compareTd}>No one to ask</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                <td style={compareTd}><strong style={{ color: "var(--color-warm-text)" }}>Cost (typical month)</strong></td>
                <td style={compareCheck}>$79 to $149 a month</td>
                <td style={compareTd}>Per-visit fees</td>
                <td style={compareTd}>$0 (and their patience)</td>
                <td style={compareTd}>$0 (and your time)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                <td style={compareTd}><strong style={{ color: "var(--color-warm-text)" }}>Knows AI tools well</strong></td>
                <td style={compareCheck}>My main focus</td>
                <td style={compareTd}>Generally no</td>
                <td style={compareTd}>Depends on the kid</td>
                <td style={compareTd}>YouTube tutorials</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                <td style={compareTd}><strong style={{ color: "var(--color-warm-text)" }}>Handles family members</strong></td>
                <td style={compareCheck}>Family Care covers up to 4 people</td>
                <td style={compareTd}>Each pays separately</td>
                <td style={compareTd}>You become the support desk</td>
                <td style={compareTd}>Everyone alone</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* What a month looks like */}
        <header className="pv-section-head">
          <span className="roman">V.</span>
          <h2>A sample Monthly Care <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>month</em></h2>
        </header>

        <div style={{ display: "grid", gap: "12px", marginBottom: "48px" }}>
          {[
            { week: "Week 1", events: [{ day: "Mon", text: "Onboarding video call, 30 minutes. We get on Zoom, you tell me what's broken, and I take notes." }, { day: "Wed", text: "You text: 'My mom can't print from her phone.' I send her a 3-step walkthrough with screenshots." }] },
            { week: "Week 2", events: [{ day: "Tue", text: "In-person visit (Metro Atlanta only), 1 hour. We set up her smart speaker and medication reminders and make a 'who to call' card for her fridge." }, { day: "Fri", text: "Quick text: she figured out how to call her sister with a voice command." }] },
            { week: "Week 3", events: [{ day: "Mon", text: "You text me: 'Dad got a new MacBook for Father's Day, totally lost.' I do a 45-min screen share with him that evening." }, { day: "Thu", text: "ChatGPT lesson for your spouse, 30 minutes over video. They wanted to use it but didn't know where to start." }] },
            { week: "Week 4", events: [{ day: "Tue", text: "Monthly check-in: I send a summary of what we covered and 2 things to try this month. You forward to the family group chat." }, { day: "Fri", text: "Quick fix: your mom's iPad updated overnight, app moved, she couldn't find it. 5-min text resolution." }] },
          ].map((week) => (
            <div key={week.week} style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px 24px" }}>
              <h4 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700, marginTop: 0 }}>{week.week}</h4>
              <div>
                {week.events.map((e, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "12px", padding: "8px 0", borderBottom: i < week.events.length - 1 ? "1px solid var(--color-warm-border)" : "none" }}>
                    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontWeight: 700, paddingTop: "2px" }}>{e.day}</div>
                    <div style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{e.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <header className="pv-section-head">
          <span className="roman">VI.</span>
          <h2>Common <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>questions</em></h2>
        </header>

        <div style={{ marginBottom: "56px" }}>
          {FAQ.map((f, i) => (
            <details key={i} style={{ borderBottom: "1px solid var(--color-warm-border)", padding: "16px 0" }}>
              <summary style={{ cursor: "pointer", fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", color: "var(--color-warm-text)", fontWeight: 600, listStyle: "none" }}>
                {f.q}
              </summary>
              <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: "center", padding: "48px 24px", background: "var(--color-warm-bg-alt)", border: "2px solid var(--color-warm-accent)" }}>
          <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px" }}>
            The intake form
          </h3>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", margin: "0 0 24px", lineHeight: 1.6, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            The form takes 5 minutes. I reply within 24 hours with a recommended plan, or I tell you that you don&apos;t need me.
          </p>
          <a className="pv-btn-primary" href="/steady/start">Fill out the intake</a>
        </div>

        <p style={{ marginTop: "32px", fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
          Steady is a service of Purcell Ventures LLC. I run it myself.
        </p>
      </main>
    </div>
  );
}
