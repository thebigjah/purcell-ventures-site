"use client";

import { useState, useEffect } from "react";
import { Facts } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import s from "../_demo/demo.module.css";

// Types

type Mode = "walkin" | "wom" | "followup" | "log" | "visits";
type Interest = "hot" | "warm" | "cold" | "pass";
type GoogleProfile = "complete" | "partial" | "none";

type Visit = {
  id: string;
  date: string;
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
  type: string;
  hasWebsite: boolean;
  hasSocial: boolean;
  hasBooking: boolean;
  googleProfile: GoogleProfile;
  interest: Interest;
  servicesNeeded: string[];
  notes: string;
  followUpDate: string;
  followUpDone: boolean;
};

// Static data

const SERVICES = [
  "Website", "AI Chatbot", "Online Booking", "Social Media Scheduler",
  "Email Marketing", "Review Manager", "Simple CRM", "Online Invoicing",
  "Logo / Branding", "Social Media Templates",
];

const SERVICE_PRICES: Record<string, number> = {
  "Website": 50, "AI Chatbot": 25, "Online Booking": 25,
  "Social Media Scheduler": 20, "Email Marketing": 20,
  "Review Manager": 15, "Simple CRM": 25, "Online Invoicing": 15,
  "Logo / Branding": 20, "Social Media Templates": 10,
};

// Interest levels use the palette's status colours: green hot, gold warm, grey cold, red pass.
const INTEREST_CONFIG: Record<Interest, { label: string; cls: string }> = {
  hot:  { label: "Hot",  cls: "hotText" },
  warm: { label: "Warm", cls: "warmText" },
  cold: { label: "Cold", cls: "coldText" },
  pass: { label: "Pass", cls: "dangerText" },
};

const SIGHT_AUDIT = [
  { category: "Google presence", checks: [
    { item: "Search the business name on your phone before walking in", signal: "No Google Business Profile means you can pitch them right away" },
    { item: "Check their review count and rating", signal: "Fewer than 20 reviews means customers rarely find them. Under 4.0 means they need help with reviews" },
    { item: "Do they have a website listed?", signal: "No website gives you a strong opener. A bad website gives you a strong pitch" },
    { item: "Are their hours and photos up to date?", signal: "Outdated or missing means nobody is managing their listing" },
  ]},
  { category: "Physical first impression", checks: [
    { item: "Is their signage professional?", signal: "Rough signage usually means a rough online presence too" },
    { item: "Is there a social media handle posted anywhere?", signal: "No handle means they are not active. An old handle means the account is inactive" },
    { item: "Do they have a QR code, loyalty card or any other tech?", signal: "None means they have little tech in place, so the first step is easy to show" },
    { item: "How busy are they? Is anyone waiting, or is it empty?", signal: "Empty with a good location points to a marketing or booking problem" },
  ]},
  { category: "Quick website check", checks: [
    { item: "Does their site load fast on mobile?", signal: "A slow site hurts their search ranking, and you can show a faster one" },
    { item: "Is there online booking or a contact form?", signal: "No booking means they lose customers who will not call" },
    { item: "When was the last update, blog post or event?", signal: "2019 or older means the site is abandoned, which is a good pitch" },
    { item: "Is it an unedited Wix or Squarespace template?", signal: "A default template means they built it themselves" },
  ]},
];

const COLD_WALKIN = {
  opener: {
    goal: "Reach the decision-maker. Stay friendly and direct.",
    script: [
      { line: "Hey, is [owner's name / the owner] around?", note: "Ask for the owner by name if you saw it on Google. People respond to their name." },
      { line: "My name's Elijah. I run a small tech company out of [city] called Purcell Ventures. I help local businesses like yours set up websites, AI tools and online booking.", note: "Slow down. Give them time to take it in." },
      { line: "I was in the area and looked you up. I noticed [specific thing you saw in your audit]. It took me 30 seconds to spot that.", note: "This line gets their attention because it shows you did homework on them specifically." },
      { line: "I'd like to ask you a couple of questions and see if what I do would be useful to you. I won't try to sell you anything today.", note: "Say it plainly and mean it." },
    ],
  },
  transitions: [
    { trigger: "They say 'I'm busy'", response: "I won't take long. I have one or two questions. If it doesn't click in 2 minutes, I'll leave you to it." },
    { trigger: "They say 'we already have a website'", response: "Nice. Is the site bringing you customers, or does it mostly list your contact details?" },
    { trigger: "They say 'we don't need that'", response: "Fair enough. Can I ask how most new customers find you right now?" },
    { trigger: "They say 'I'm not the right person'", response: "Who would be? I'd love to leave my info with them or come back at a better time." },
    { trigger: "They seem interested immediately", response: "Move straight into discovery questions. Don't over-explain. Listen more than you talk." },
  ],
};

const DISCOVERY = [
  { section: "Their current situation", questions: [
    { q: "How are new customers finding you right now?", listen: "If they say 'word of mouth only', they have no online presence. If they say Google, ask how many reviews they have." },
    { q: "Do you have a website? When did you last update it?", listen: "Most small businesses haven't touched their site in years. 'We have one but...' always ends with a problem you can solve." },
    { q: "Are you on social media? Who runs that?", listen: "If they say 'I try to post but I don't have time', pitch the social media scheduler and AI captions." },
    { q: "How do customers usually book or contact you: phone, walk-in or online?", listen: "If they say phone only, pitch the booking system." },
  ]},
  { section: "Where it hurts", questions: [
    { q: "What takes up the most time in your week without serving customers?", listen: "This shows which ops tool they need: invoicing, scheduling, CRM or follow-ups." },
    { q: "Do you ever lose track of leads or follow-ups?", listen: "If yes, pitch the CRM and lead capture." },
    { q: "Have you ever gotten a bad review online that you didn't get to respond to?", listen: "If yes, pitch the review manager." },
    { q: "How much time does your team spend answering the same questions about hours, prices and location?", listen: "If 'a lot', pitch the AI chatbot for their website." },
  ]},
  { section: "Qualifying the opportunity", questions: [
    { q: "Have you ever looked into getting help with any of this before? What stopped you?", listen: "For a price objection, lead with what they get. For a trust objection, stress that you are local and do the work yourself." },
    { q: "What would it mean for you if twice as many people found you online?", listen: "Let them describe it. Their answer becomes your close." },
    { q: "What are you spending right now on marketing or anything digital?", listen: "If nothing: 'So you're getting $0 in return right now.'" },
    { q: "Is there a budget you work with for this kind of thing?", listen: "Ask this only after they're engaged. The answer shows whether they see the value." },
  ]},
];

const CLOSES = [
  { type: "Soft close (try this one first)", script: "Here's what I'd suggest. Let me put together a quick overview of what I'd build for you, with pricing, and we can look at it together. No commitment. Would that be useful?", note: "This gives them an easy 'yes' and gives you a reason to follow up." },
  { type: "Demo close", script: "Can I show you something quickly? [Pull up purcellventures.co/digital on your phone] This is what a full setup looks like for a business like yours. Starting at $99 a month.", note: "Always have the site up and ready on your phone." },
  { type: "Urgency close (warm prospects only)", script: "I only take on a few new clients at a time so I can give each one attention. I've got a slot opening up this month. Want to get on a call this week?", note: "Use this only with a prospect who has shown clear interest." },
  { type: "Leave-Behind", script: "Here's my card. My site is purcellventures.co, where you can see pricing and the tools. I'll follow up in a day or two if that's okay.", note: "Always get permission to follow up. Always follow up." },
];

const OBJECTIONS = [
  { obj: "\"That's too expensive.\"", response: "What are you spending right now to get new customers? If the answer is nothing, you're already paying in customers you're not getting. One or two new bookings a month usually covers it." },
  { obj: "\"We're doing fine without it.\"", response: "That's fair. Quick question: do you know what your competitors are doing online? You may not need this, but your competition might already be using it." },
  { obj: "\"I need to think about it.\"", response: "Of course. What's the biggest thing you'd want to think through? Can I put together something specific for your business so you have something concrete to look at?" },
  { obj: "\"I tried something like this before and it didn't work.\"", response: "What happened? That's common. A lot of what's out there is generic, or nobody maintains it. I stay involved after the build and keep maintaining it." },
  { obj: "\"I don't have time to deal with this.\"", response: "That's why people hire me. I handle the setup, the updates and the maintenance. You look at it when something needs your approval, and that's it." },
  { obj: "\"I don't know anything about tech.\"", response: "That's fine. Most of my clients don't. I explain everything in plain terms, and once it's set up you don't need to know how it works." },
];

const WORD_OF_MOUTH = [
  { context: "Casual conversation (friends, church, family)", lines: [
    "I run a company called Purcell Ventures. I build websites and AI tools for small businesses: booking, chatbots and social media, all managed for them.",
    "If you know any small business owners, like salons, contractors or restaurants, who are unhappy with their online presence or don't have one, send them my way. It's $99 a month and I run it for them.",
    "I do what a digital agency does at a lower price, and I answer my own phone.",
  ]},
  { context: "Someone asks what you do", lines: [
    "I build and manage the digital side of small businesses: websites, booking systems, AI chatbots and social media tools, all under one subscription.",
    "It covers what a web designer, a marketing person and an AI specialist would do, for $99 a month.",
  ]},
  { context: "They mention a business that's struggling with marketing", lines: [
    "What's their online presence like? That's usually the first thing to fix.",
    "That sounds like a website and Google reviews problem. I fix that. Want me to take a look?",
    "Tell them to go to purcellventures.co/digital. The services and prices are all there.",
  ]},
];

const FOLLOW_UPS = [
  { label: "Day 1: text or email after a walk-in", script: `Hey [Name], it's Elijah. I stopped by [Business] earlier today. Here's what I mentioned: purcellventures.co/digital\n\nBased on what you told me, I think [specific tool] would make the biggest difference for you. I'm happy to put together a short overview with pricing if you want to take a look. No pressure either way.\n\nElijah Purcell, Purcell Ventures`, note: "Keep it short. Mention something specific from the conversation. Link straight to the digital page." },
  { label: "Day 3: if they have not replied", script: `Hey [Name], circling back. I know you're busy. I wanted to leave the door open if you had any questions about what I mentioned.\n\nIf the timing's wrong, I understand. If you want me to put together a custom quote for [Business], I'm happy to do that. It takes me 10 minutes.\n\nElijah`, note: "One more touch. If they don't reply after this, let them go. Don't spam." },
  { label: "Day 7: final follow-up", script: `Hey [Name], last message, I promise. If you ever want to revisit the online presence work for [Business], I'm at ${CONTACT.email}.\n\nI do good work and I'm local. Whenever the time is right.\n\nElijah`, note: "Leave it warm. Saying 'last message' tells them the truth, and it gets replies." },
  { label: "Warm lead: custom proposal email", script: `Hey [Name],\n\nGood talking to you. Based on what you shared, here's what I'd recommend for [Business]:\n\n- [Tool 1]: [one line on why it fits them]\n- [Tool 2]: [one line on why it fits them]\n- [Tool 3]: [one line on why it fits them]\n\nTotal: $[X] setup and $[Y] a month after that.\n\nThat includes me building it, maintaining it, and being reachable when you need something. Full pricing is at purcellventures.co/digital.\n\nWant to hop on a 15-minute call to go over it?\n\nElijah Purcell, Purcell Ventures LLC\n${CONTACT.email}`, note: "Send a written proposal to every warm lead. It looks professional and gives them something to share with a spouse or partner." },
];

// Helpers

// The add-on prices below are rep estimates per service. The published prices win: a digital
// plan starts at $99 a month and setup runs $400 to $1,000, so the estimate is held inside those.
function monthlyFor(services: string[]): number {
  const sum = services.reduce((total, svc) => total + (SERVICE_PRICES[svc] ?? 20), 0);
  return Math.max(99, sum);
}
function setupFor(monthly: number): number {
  return Math.min(1000, Math.max(400, Math.round(monthly * 4)));
}

function generateProposal(v: Visit): string {
  const monthly = monthlyFor(v.servicesNeeded);
  const setup = setupFor(monthly);
  const serviceLines = v.servicesNeeded.map(svc => `- ${svc}`).join("\n");

  return `Hey ${v.ownerName || "[Name]"},

Good talking to you. Based on what you shared, here's what I'd put together for ${v.businessName || "[Business]"}:

${serviceLines || "- [Services to be decided]"}

Setup fee: $${setup}
Monthly: $${monthly} a month

That includes me building everything, maintaining it, and being reachable when you need something. You need no tech knowledge on your end.

See the full breakdown at purcellventures.co/digital

Want to hop on a 15-minute call to go over it?

Elijah Purcell, Purcell Ventures LLC
${CONTACT.email}`;
}

function generateSummary(v: Visit): string {
  const gaps = [
    !v.hasWebsite && "No website",
    !v.hasSocial && "No social",
    !v.hasBooking && "No booking",
    v.googleProfile !== "complete" && `Google profile: ${v.googleProfile}`,
  ].filter(Boolean).join(", ");

  return `Visit log: ${new Date(v.date).toLocaleDateString()}
Business: ${v.businessName}
Owner: ${v.ownerName || "None"}
Phone: ${v.phone || "None"}
Type: ${v.type || "None"}
Address: ${v.address || "None"}
Interest: ${INTEREST_CONFIG[v.interest].label}
Gaps: ${gaps || "None noted"}
Services needed: ${v.servicesNeeded.join(", ") || "None selected"}
Follow-up: ${v.followUpDate || "Not set"}
Notes: ${v.notes || "None"}`;
}

function emptyVisit(): Omit<Visit, "id" | "date"> {
  return {
    businessName: "", ownerName: "", phone: "", address: "", type: "",
    hasWebsite: false, hasSocial: false, hasBooking: false,
    googleProfile: "none", interest: "warm",
    servicesNeeded: [], notes: "", followUpDate: "", followUpDone: false,
  };
}

const MODES: [Mode, string][] = [
  ["walkin", "Walk-in"], ["wom", "Word of mouth"], ["followup", "Follow-up"], ["log", "Log visit"], ["visits", "My visits"],
];

// Component

export default function PlaybookPage() {
  const [mode, setMode] = useState<Mode>("walkin");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["sight", "opener"]));
  const [visits, setVisits] = useState<Visit[]>([]);
  const [form, setForm] = useState(emptyVisit());
  const [saved, setSaved] = useState(false);
  const [expandedVisit, setExpandedVisit] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pv_visits");
      if (stored) setVisits(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  function saveVisits(updated: Visit[]) {
    setVisits(updated);
    localStorage.setItem("pv_visits", JSON.stringify(updated));
  }

  function submitVisit() {
    const visit: Visit = { ...form, id: Date.now().toString(), date: new Date().toISOString() };
    saveVisits([visit, ...visits]);
    setForm(emptyVisit());
    setSaved(true);
    setTimeout(() => { setSaved(false); setMode("visits"); }, 1200);
  }

  function deleteVisit(id: string) {
    saveVisits(visits.filter(v => v.id !== id));
  }

  function toggleFollowUp(id: string) {
    saveVisits(visits.map(v => v.id === id ? { ...v, followUpDone: !v.followUpDone } : v));
  }

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  function toggleService(svc: string) {
    setForm(f => ({
      ...f,
      servicesNeeded: f.servicesNeeded.includes(svc)
        ? f.servicesNeeded.filter(x => x !== svc)
        : [...f.servicesNeeded, svc],
    }));
  }

  function toggle(key: string) {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const block = (key: string, title: string, body: React.ReactNode) => (
    <section className={s.block}>
      <button onClick={() => toggle(key)} className={s.blockHead} aria-expanded={openSections.has(key)}>
        <span>{title}</span>
        <span className={s.blockSign} aria-hidden="true">{openSections.has(key) ? "−" : "+"}</span>
      </button>
      {openSections.has(key) && <div className={s.blockBody}>{body}</div>}
    </section>
  );

  const field = (label: string, value: string, onChange: (v: string) => void, placeholder = "", type = "text") => (
    <label className="ui-field">
      <span className="ui-small ui-muted">{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );

  const upcomingFollowUps = visits.filter(v => v.followUpDate && !v.followUpDone && new Date(v.followUpDate) >= new Date()).sort((a, b) => new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime());
  const hotLeads = visits.filter(v => v.interest === "hot" && !v.followUpDone);
  const attention = hotLeads.length + upcomingFollowUps.length;

  return (
    <div>
      <header className={s.repHead}>
        <div className={`ui-wrap ${s.repHeadIn}`}>
          <div className={s.repLinks}>
            <p className={s.repTitle}>Sales playbook</p>
            <span className="ui-gold">For reps</span>
            <a href="/digital">Digital services</a>
            <a href="/digital/finder">Business finder</a>
          </div>
          <nav className={s.tabs} aria-label="Playbook sections">
            {MODES.map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)} className={`${s.btn} ${mode === m ? s.btnOn : ""}`} aria-current={mode === m ? "page" : undefined}>
                {label}
                {m === "visits" && attention > 0 && <span className="ui-gold">({attention})</span>}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className={`ui-narrow ${s.repMain}`}>

        {mode === "walkin" && (
          <div>
            {block("sight", "Step 1: The sight audit, before you walk in", (
              <>
                {SIGHT_AUDIT.map((cat) => (
                  <div key={cat.category}>
                    <h3 className={s.groupName}>{cat.category}</h3>
                    {cat.checks.map((c, i) => (
                      <div key={i} className={s.pair}>
                        <p className={s.say}>{c.item}</p>
                        <p className="ui-gold" style={{ margin: 0, fontSize: "15px" }}>{c.signal}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ))}

            {block("opener", "Step 2: The opener, in the first 30 seconds", (
              <>
                <p className="ui-muted" style={{ marginTop: 0 }}>Goal: {COLD_WALKIN.opener.goal}</p>
                {COLD_WALKIN.opener.script.map((item, i) => (
                  <div key={i} className={s.pair} style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
                    <p className={s.say}>&ldquo;{item.line}&rdquo;</p>
                    <p className={s.why}>{item.note}</p>
                  </div>
                ))}
                <h3 className={s.groupName}>If they push back</h3>
                {COLD_WALKIN.transitions.map((t, i) => (
                  <div key={i} className={s.pair}>
                    <p className={s.dangerText} style={{ margin: 0, fontSize: "15px" }}>{t.trigger}</p>
                    <p className={s.say}>{t.response}</p>
                  </div>
                ))}
              </>
            ))}

            {block("discovery", "Step 3: Discovery questions", (
              <>
                <p className="ui-muted" style={{ marginTop: 0 }}>Ask these in order. Listen more than you talk.</p>
                {DISCOVERY.map((section) => (
                  <div key={section.section}>
                    <h3 className={s.groupName}>{section.section}</h3>
                    {section.questions.map((q, i) => (
                      <div key={i} className={s.pair} style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
                        <p className={s.say}>{q.q}</p>
                        <p className={s.why}><b className={s.okText}>Listen for:</b> {q.listen}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ))}

            {block("objections", "Step 4: Handling objections", (
              <>
                {OBJECTIONS.map((o, i) => (
                  <div key={i} className={s.pair} style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
                    <p className={s.dangerText} style={{ margin: 0, fontWeight: 600 }}>{o.obj}</p>
                    <p className={s.say}>{o.response}</p>
                  </div>
                ))}
              </>
            ))}

            {block("close", "Step 5: The close", (
              <>
                {CLOSES.map((c, i) => (
                  <div key={i} className={s.pair} style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
                    <h3 className={s.groupName} style={{ margin: 0 }}>{c.type}</h3>
                    <p className={s.say}>&ldquo;{c.script}&rdquo;</p>
                    <p className={s.why}>{c.note}</p>
                  </div>
                ))}
              </>
            ))}
          </div>
        )}

        {mode === "wom" && (
          <div>
            <h1 className={s.repTitle} style={{ fontSize: "30px" }}>Word of mouth lines</h1>
            <p className="ui-muted">Lines for casual conversations. Learn the idea and say it in your own words.</p>
            {WORD_OF_MOUTH.map((section, i) => (
              <div key={i}>
                <h2 className={s.groupName} style={{ marginTop: "28px" }}>{section.context}</h2>
                {section.lines.map((line, j) => (
                  <div key={j} className={s.pair} style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
                    <p className={s.say}>&ldquo;{line}&rdquo;</p>
                  </div>
                ))}
              </div>
            ))}
            <h2 className={s.groupName} style={{ marginTop: "36px" }}>The one line to remember</h2>
            <aside className="ui-note">
              &ldquo;I build and manage the online presence for small businesses: website, booking, AI chatbot and social media. Starting at $99 a month.&rdquo;
            </aside>
          </div>
        )}

        {mode === "followup" && (
          <div>
            <h1 className={s.repTitle} style={{ fontSize: "30px" }}>Follow-up scripts</h1>
            <p className="ui-muted">Most of my deals close on a follow-up, so send every one.</p>
            {FOLLOW_UPS.map((item, i) => (
              <section key={i} style={{ marginTop: "32px" }}>
                <h2 className={s.groupName}>{item.label}</h2>
                <pre className={s.script}>{item.script}</pre>
                <p className={s.why}>{item.note}</p>
              </section>
            ))}
          </div>
        )}

        {mode === "log" && (
          <div>
            <h1 className={s.repTitle} style={{ fontSize: "30px" }}>Log a visit</h1>
            <p className="ui-muted">Fill this out during or right after a visit. It saves to this browser only.</p>

            <section className={s.form} style={{ marginTop: "28px" }}>
              <h2 className={s.sub}>Business</h2>
              <div className={s.grid2}>
                {field("Business name (required)", form.businessName, v => setForm(f => ({ ...f, businessName: v })))}
                {field("Type", form.type, v => setForm(f => ({ ...f, type: v })), "Salon, contractor")}
                {field("Owner name", form.ownerName, v => setForm(f => ({ ...f, ownerName: v })))}
                {field("Phone number", form.phone, v => setForm(f => ({ ...f, phone: v })), "", "tel")}
                <div className={s.full}>{field("Address", form.address, v => setForm(f => ({ ...f, address: v })))}</div>
              </div>
            </section>

            <section className={s.form}>
              <h2 className={s.sub}>What they have</h2>
              <div className={s.toggles}>
                {([["hasWebsite", "Website"], ["hasSocial", "Social media"], ["hasBooking", "Online booking"]] as ["hasWebsite" | "hasSocial" | "hasBooking", string][]).map(([key, label]) => (
                  <button key={key} onClick={() => setForm(f => ({ ...f, [key]: !f[key] }))} className={`${s.btn} ${form[key] ? s.btnOk : s.btnDanger}`} aria-pressed={form[key]}>
                    {label}: {form[key] ? "yes" : "no"}
                  </button>
                ))}
              </div>
              <p className="ui-small ui-muted" style={{ margin: "18px 0 8px" }}>Google profile quality</p>
              <div className={s.choice3}>
                {(["none", "partial", "complete"] as GoogleProfile[]).map(p => (
                  <button key={p} onClick={() => setForm(f => ({ ...f, googleProfile: p }))} className={`${s.btn} ${form.googleProfile === p ? s.btnOn : ""}`} aria-pressed={form.googleProfile === p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </section>

            <section className={s.form}>
              <h2 className={s.sub}>Interest level</h2>
              <div className={s.choice4}>
                {(["hot", "warm", "cold", "pass"] as Interest[]).map(level => (
                  <button key={level} onClick={() => setForm(f => ({ ...f, interest: level }))} className={`${s.btn} ${form.interest === level ? s.btnOn : ""}`} aria-pressed={form.interest === level}>
                    {INTEREST_CONFIG[level].label}
                  </button>
                ))}
              </div>
            </section>

            <section className={s.form}>
              <h2 className={s.sub}>Services they need</h2>
              <div className={s.toggles}>
                {SERVICES.map(svc => {
                  const on = form.servicesNeeded.includes(svc);
                  return (
                    <button key={svc} onClick={() => toggleService(svc)} className={`${s.btn} ${on ? s.btnOn : ""}`} aria-pressed={on}>
                      {svc}
                    </button>
                  );
                })}
              </div>
              {form.servicesNeeded.length > 0 && (
                <p className="ui-muted" style={{ marginBottom: 0 }}>
                  Estimated monthly: <b className="ui-gold">${monthlyFor(form.servicesNeeded)} a month</b>
                </p>
              )}
            </section>

            <section className={s.form}>
              <h2 className={s.sub}>Notes and follow-up</h2>
              <div className={s.grid}>
                <label className="ui-field">
                  <span className="ui-small ui-muted">Notes</span>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="What did they say? What matters to them?" rows={4} style={{ resize: "vertical" }} />
                </label>
                <label className="ui-field" style={{ maxWidth: "260px" }}>
                  <span className="ui-small ui-muted">Follow-up date</span>
                  <input type="date" value={form.followUpDate} onChange={e => setForm(f => ({ ...f, followUpDate: e.target.value }))} />
                </label>
              </div>
            </section>

            <button onClick={submitVisit} disabled={!form.businessName} className={`ui-btn ${s.primary}`} style={{ minHeight: "48px" }}>
              {saved ? "Saved. Opening your visits" : "Save visit"}
            </button>
          </div>
        )}

        {mode === "visits" && (
          <div>
            <div className={s.spread}>
              <div>
                <h1 className={s.repTitle} style={{ fontSize: "30px" }}>My visits</h1>
                <p className="ui-muted" style={{ margin: "6px 0 0" }}>{visits.length} logged, {hotLeads.length} hot, {upcomingFollowUps.length} follow-ups due</p>
              </div>
              <button onClick={() => setMode("log")} className="ui-btn">Log a visit</button>
            </div>

            {upcomingFollowUps.length > 0 && (
              <section style={{ marginTop: "28px" }}>
                <h2 className={s.groupName}>Follow-ups due</h2>
                <div className={s.list}>
                  {upcomingFollowUps.map(v => (
                    <div key={v.id} className={`${s.item} ${s.spread}`} style={{ alignItems: "center", padding: "12px 0" }}>
                      <span>{v.businessName}, {v.ownerName || "owner"}, <span className="ui-gold">{new Date(v.followUpDate).toLocaleDateString()}</span></span>
                      <button onClick={() => toggleFollowUp(v.id)} className={s.btn}>Done</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div style={{ marginTop: "32px" }}>
              {visits.length === 0 ? (
                <div>
                  <p className={s.empty}>No visits logged yet.</p>
                  <button onClick={() => setMode("log")} className="ui-btn">Log your first visit</button>
                </div>
              ) : (
                <div className={s.list}>
                  {visits.map(v => {
                    const cfg = INTEREST_CONFIG[v.interest];
                    const isExp = expandedVisit === v.id;
                    return (
                      <article key={v.id} className={s.item}>
                        <div className={s.rowHead}>
                          <div>
                            <h2 className={s.itemName}>{v.businessName}</h2>
                            <p className={s.itemMeta}>
                              <b className={s[cfg.cls]}>{cfg.label}</b>
                              {", "}{v.ownerName && `${v.ownerName}, `}{v.type && `${v.type}, `}{new Date(v.date).toLocaleDateString()}
                              {v.followUpDate && !v.followUpDone && `, follow-up ${new Date(v.followUpDate).toLocaleDateString()}`}
                            </p>
                            {(!v.hasWebsite || !v.hasBooking) && (
                              <p className={s.gaps}>
                                {!v.hasWebsite && <span className={s.dangerText}>No site</span>}
                                {!v.hasBooking && <span className="ui-gold">No booking</span>}
                              </p>
                            )}
                          </div>
                          <button onClick={() => setExpandedVisit(isExp ? null : v.id)} className={s.btn} aria-expanded={isExp}>
                            {isExp ? "Less" : "More"}
                          </button>
                        </div>

                        {isExp && (
                          <div style={{ marginTop: "18px" }}>
                            <Facts items={[["Phone", v.phone || "None"], ["Address", v.address || "None"], ["Services", v.servicesNeeded.join(", ") || "None"]]} />
                            {v.notes && <aside className="ui-note" style={{ marginTop: "16px" }}>{v.notes}</aside>}
                            <div className={s.actions}>
                              <button onClick={() => copyText(generateSummary(v), `summary-${v.id}`)} className={`${s.btn} ${copiedId === `summary-${v.id}` ? s.btnOk : ""}`}>
                                {copiedId === `summary-${v.id}` ? "Summary copied" : "Copy summary"}
                              </button>
                              <button onClick={() => copyText(generateProposal(v), `proposal-${v.id}`)} className={`${s.btn} ${copiedId === `proposal-${v.id}` ? s.btnOk : s.btnOn}`}>
                                {copiedId === `proposal-${v.id}` ? "Proposal copied" : "Generate proposal"}
                              </button>
                              <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Visit log: ${v.businessName}`)}&body=${encodeURIComponent(generateSummary(v))}`} className={s.btn}>
                                Email to self
                              </a>
                              {!v.followUpDone && v.followUpDate && (
                                <button onClick={() => toggleFollowUp(v.id)} className={`${s.btn} ${s.btnOk}`}>
                                  Mark follow-up done
                                </button>
                              )}
                              <button onClick={() => { if (confirm(`Delete ${v.businessName}?`)) deleteVisit(v.id); }} className={`${s.btn} ${s.btnDanger}`}>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
