"use client";

import { useState, useEffect } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";

// ─── TYPES ────────────────────────────────────────────────────────────────────

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

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

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

const INTEREST_CONFIG: Record<Interest, { label: string; color: string; bg: string }> = {
  hot:  { label: "Hot",  color: "#7aaa6a", bg: "#7aaa6a18" },
  warm: { label: "Warm", color: "#d4af37", bg: "#d4af3718" },
  cold: { label: "Cold", color: "#8a8070", bg: "#8a807018" },
  pass: { label: "Pass", color: "#e05c5c", bg: "#e05c5c18" },
};

const SIGHT_AUDIT = [
  { category: "Google Presence", checks: [
    { item: "Search the business name on your phone before walking in", signal: "No Google Business Profile means you can pitch them right away" },
    { item: "Check their review count and rating", signal: "Fewer than 20 reviews means customers rarely find them. Under 4.0 means they need help with reviews" },
    { item: "Do they have a website listed?", signal: "No website gives you a strong opener. A bad website gives you a strong pitch" },
    { item: "Are their hours and photos up to date?", signal: "Outdated or missing means nobody is managing their listing" },
  ]},
  { category: "Physical First Impression", checks: [
    { item: "Is their signage professional?", signal: "Rough signage usually means a rough online presence too" },
    { item: "Is there a social media handle posted anywhere?", signal: "No handle means they are not active. An old handle means the account is inactive" },
    { item: "Do they have a QR code, loyalty card or any other tech?", signal: "None means they have little tech in place, so the first step is easy to show" },
    { item: "How busy are they? Is anyone waiting, or is it empty?", signal: "Empty with a good location points to a marketing or booking problem" },
  ]},
  { category: "Quick Website Check", checks: [
    { item: "Does their site load fast on mobile?", signal: "A slow site hurts their search ranking and gives you a contrast" },
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
      { line: "My name's Elijah. I run a small tech company out of [city] called Purcell Ventures. We help local businesses like yours set up websites, AI tools and online booking.", note: "Slow down. Give them time to take it in." },
      { line: "I was in the area and looked you up. I noticed [specific thing you saw in your audit]. It took me about 30 seconds to spot that.", note: "This line gets their attention because it shows you did homework on them specifically." },
      { line: "I'm not here to sell you anything today. I want to ask a couple of questions and see if what I do would be useful to you.", note: "Say it plainly and mean it." },
    ],
  },
  transitions: [
    { trigger: "They say 'I'm busy'", response: "Totally, I won't take long. I have one or two questions. If it doesn't click in 2 minutes, I'll leave you to it." },
    { trigger: "They say 'we already have a website'", response: "Nice. Is the site bringing you customers, or does it mostly list your contact details?" },
    { trigger: "They say 'we don't need that'", response: "Fair enough. Can I ask how most new customers find you right now?" },
    { trigger: "They say 'I'm not the right person'", response: "Who would be? I'd love to leave my info with them or come back at a better time." },
    { trigger: "They seem interested immediately", response: "Move straight into discovery questions. Don't over-explain. Listen more than you talk." },
  ],
};

const DISCOVERY = [
  { section: "Understand Their Current Situation", color: "#d4af37", questions: [
    { q: "How are new customers finding you right now?", listen: "If they say 'word of mouth only', they have no online presence. If they say Google, ask how many reviews they have." },
    { q: "Do you have a website? When did you last update it?", listen: "Most small businesses haven't touched their site in years. 'We have one but...' always ends with a problem you can solve." },
    { q: "Are you on social media? Who runs that?", listen: "If they say 'I try to post but I don't have time', pitch the social media scheduler and AI captions." },
    { q: "How do customers usually book or contact you: phone, walk-in or online?", listen: "If they say phone only, pitch the booking system." },
  ]},
  { section: "Find the Pain", color: "#e8a030", questions: [
    { q: "What takes up the most time in your week without serving customers?", listen: "This shows which ops tool they need: invoicing, scheduling, CRM or follow-ups." },
    { q: "Do you ever lose track of leads or follow-ups?", listen: "If yes, pitch the CRM and lead capture." },
    { q: "Have you ever gotten a bad review online that you didn't get to respond to?", listen: "If yes, pitch the review manager." },
    { q: "How much time does your team spend answering the same questions about hours, prices and location?", listen: "If 'a lot', pitch the AI chatbot for their website." },
  ]},
  { section: "Qualify the Opportunity", color: "#7aaa6a", questions: [
    { q: "Have you ever looked into getting help with any of this before? What stopped you?", listen: "For a price objection, lead with what they get. For a trust objection, stress that you are local and do the work yourself." },
    { q: "What would it mean for you if twice as many people found you online?", listen: "Let them describe it. Their answer becomes your close." },
    { q: "What are you spending right now on marketing or anything digital?", listen: "If nothing: 'So you're getting $0 in return right now.'" },
    { q: "Is there a budget you work with for this kind of thing?", listen: "Only ask after they're engaged. The question is whether they see the value." },
  ]},
];

const CLOSES = [
  { type: "Soft Close (preferred first)", script: "Here's what I'd suggest. Let me put together a quick overview of what I'd build for you, with pricing, and we can look at it together. No commitment. Would that be useful?", note: "This gives them an easy 'yes' and gives you a reason to follow up." },
  { type: "Demo Close", script: "Can I show you something quickly? [Pull up purcellventures.co/digital on your phone] This is what a full setup looks like for a business like yours. Starting at $99 a month.", note: "Always have the site up and ready on your phone." },
  { type: "Urgency Close (only when they're warm)", script: "I only take on a few new clients at a time so I can give each one attention. I've got a slot opening up this month. Want to get on a call this week?", note: "Only use this if they're clearly interested." },
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
    "If you know any small business owners, like salons, contractors or restaurants, who are unhappy with their online presence or don't have one, send them my way. It's $75 a month and I run it for them.",
    "I do what a digital agency does at a lower price, and I answer my own phone.",
  ]},
  { context: "Someone asks what you do", lines: [
    "I build and manage the digital side of small businesses: websites, booking systems, AI chatbots and social media tools, all under one subscription.",
    "It covers what a web designer, a marketing person and an AI specialist would do, for $75 a month.",
  ]},
  { context: "They mention a business that's struggling with marketing", lines: [
    "What's their online presence like? That's usually the first thing to fix.",
    "That sounds like a website and Google reviews problem. I fix that. Want me to take a look?",
    "Tell them to go to purcellventures.co/digital. The services and prices are all there.",
  ]},
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function generateProposal(v: Visit): string {
  const monthly = v.servicesNeeded.reduce((sum, s) => sum + (SERVICE_PRICES[s] ?? 20), 0);
  const setup = Math.round(monthly * 4);
  const serviceLines = v.servicesNeeded.map(s => `• ${s}`).join("\n");

  return `Hey ${v.ownerName || "[Name]"},

Good talking to you. Based on what you shared, here's what I'd put together for ${v.businessName || "[Business]"}:

${serviceLines || "• [Services TBD]"}

Setup fee: $${setup}
Monthly: $${monthly}/mo

That includes me building everything, maintaining it, and being reachable when you need something. No tech knowledge required on your end.

See the full breakdown at purcellventures.co/digital

Want to hop on a 15-minute call to go over it?

Elijah Purcell, Purcell Ventures LLC
elijah@purcell-ventures.com`;
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
Owner: ${v.ownerName || "—"} | Phone: ${v.phone || "—"}
Type: ${v.type || "—"} | Address: ${v.address || "—"}
Interest: ${v.interest.toUpperCase()}
Gaps: ${gaps || "None noted"}
Services Needed: ${v.servicesNeeded.join(", ") || "None selected"}
Follow-Up: ${v.followUpDate || "Not set"}
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

// ─── COMPONENT ────────────────────────────────────────────────────────────────

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

  function toggleService(s: string) {
    setForm(f => ({
      ...f,
      servicesNeeded: f.servicesNeeded.includes(s)
        ? f.servicesNeeded.filter(x => x !== s)
        : [...f.servicesNeeded, s],
    }));
  }

  function toggle(key: string) {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const s: React.CSSProperties = { background: "#0c0a08", borderRadius: "8px", padding: "16px 20px", marginBottom: "12px", border: "1px solid #2e2820" };

  const sectionHeader = (key: string, label: string, accent?: string) => (
    <button onClick={() => toggle(key)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", textAlign: "left" }}>
      <span style={{ fontSize: "14px", fontWeight: 700, color: accent ?? "#f5f0e0", letterSpacing: "0.02em" }}>{label}</span>
      <span style={{ fontSize: "18px", color: "#d4af37" }}>{openSections.has(key) ? "−" : "+"}</span>
    </button>
  );

  const input = (value: string, onChange: (v: string) => void, placeholder: string, type = "text") => (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", padding: "10px 14px", background: "#0c0a08", border: "1px solid #2e2820", borderRadius: "6px", color: "#f5f0e0", fontSize: "14px", boxSizing: "border-box" }} />
  );

  const upcomingFollowUps = visits.filter(v => v.followUpDate && !v.followUpDone && new Date(v.followUpDate) >= new Date()).sort((a, b) => new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime());
  const hotLeads = visits.filter(v => v.interest === "hot" && !v.followUpDone);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "#f5f0e0", fontFamily: "Inter, sans-serif", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>

      {/* Header */}
      <div style={{ background: "#141210", borderBottom: "1px solid #2e2820", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50, gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="/digital" style={{ fontSize: "12px", color: "#524d45", textDecoration: "none" }}>Back to Digital</a>
          <span style={{ color: "#2e2820" }}>|</span>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#d4af37", fontFamily: "'Cinzel', Georgia, serif" }}>Sales Playbook</span>
          <span style={{ fontSize: "10px", padding: "2px 7px", background: "#d4af3715", border: "1px solid #d4af3730", borderRadius: "3px", color: "#d4af37" }}>Private</span>
          <a href="/digital/finder" style={{ fontSize: "12px", color: "#8a8070", textDecoration: "none", marginLeft: "4px" }}>Finder</a>
        </div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {([["walkin","Walk-In"],["wom","Word of Mouth"],["followup","Follow-Up"],["log","Log Visit"],["visits","My Visits"]] as [Mode, string][]).map(([m, label]) => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: "7px 13px", borderRadius: "5px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              border: m === "log" && mode !== "log" ? "1px solid #d4af3750" : "none",
              background: mode === m ? "#d4af37" : m === "log" ? "#d4af3710" : "#1a1714",
              color: mode === m ? "#0c0a08" : m === "log" ? "#d4af37" : "#8a8070",
              position: "relative",
            }}>
              {label}
              {m === "visits" && (hotLeads.length > 0 || upcomingFollowUps.length > 0) && (
                <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "8px", height: "8px", borderRadius: "50%", background: "#e05c5c" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        {/* ── WALK-IN MODE ── */}
        {mode === "walkin" && (
          <div>
            <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", marginBottom: "16px", overflow: "hidden" }}>
              {sectionHeader("sight", "Step 1: Sight audit. Do this before you walk in.", "#d4af37")}
              {openSections.has("sight") && (
                <div style={{ padding: "0 20px 20px" }}>
                  {SIGHT_AUDIT.map((cat) => (
                    <div key={cat.category} style={{ marginBottom: "20px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "10px" }}>{cat.category}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {cat.checks.map((c, i) => (
                          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "10px 14px", background: "#0c0a08", borderRadius: "6px", border: "1px solid #1e1c18" }}>
                            <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                              <div style={{ width: "16px", height: "16px", borderRadius: "3px", border: "1.5px solid #3d3628", flexShrink: 0, marginTop: "1px" }} />
                              <span style={{ fontSize: "13px", color: "#c8c0b0", lineHeight: 1.5 }}>{c.item}</span>
                            </div>
                            <div style={{ fontSize: "12px", color: "#d4af37", lineHeight: 1.5, borderLeft: "2px solid #d4af3730", paddingLeft: "12px" }}>{c.signal}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", marginBottom: "16px", overflow: "hidden" }}>
              {sectionHeader("opener", "Step 2: The opener (first 30 seconds)")}
              {openSections.has("opener") && (
                <div style={{ padding: "0 20px 20px" }}>
                  <div style={{ fontSize: "13px", color: "#8a8070", marginBottom: "16px" }}>Goal: {COLD_WALKIN.opener.goal}</div>
                  {COLD_WALKIN.opener.script.map((item, i) => (
                    <div key={i} style={{ marginBottom: "12px", padding: "14px 16px", background: "#0c0a08", borderRadius: "8px", border: "1px solid #1e1c18" }}>
                      <div style={{ fontSize: "15px", color: "#f5f0e0", fontWeight: 600, marginBottom: "8px", lineHeight: 1.5 }}>
                        <span style={{ color: "#d4af37" }}>&#34;</span>{item.line}<span style={{ color: "#d4af37" }}>&#34;</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#7aaa6a", fontStyle: "italic" }}>{item.note}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: "16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "10px" }}>If They Push Back</div>
                    {COLD_WALKIN.transitions.map((t, i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "12px", marginBottom: "8px", padding: "10px 14px", background: "#0c0a08", borderRadius: "6px", border: "1px solid #1e1c18" }}>
                        <span style={{ fontSize: "12px", color: "#e05c5c" }}>{t.trigger}</span>
                        <span style={{ fontSize: "13px", color: "#c8c0b0" }}>{t.response}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", marginBottom: "16px", overflow: "hidden" }}>
              {sectionHeader("discovery", "Step 3: Discovery questions")}
              {openSections.has("discovery") && (
                <div style={{ padding: "0 20px 20px" }}>
                  <div style={{ fontSize: "13px", color: "#8a8070", marginBottom: "20px" }}>Ask these in order. Listen more than you talk.</div>
                  {DISCOVERY.map((section) => (
                    <div key={section.section} style={{ marginBottom: "24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: section.color }} />
                        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: section.color }}>{section.section}</span>
                      </div>
                      {section.questions.map((q, i) => (
                        <div key={i} style={{ marginBottom: "10px", padding: "14px 16px", background: "#0c0a08", borderRadius: "8px", border: `1px solid ${section.color}25` }}>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#f5f0e0", marginBottom: "8px" }}>
                            <span style={{ color: section.color }}>Q: </span>{q.q}
                          </div>
                          <div style={{ fontSize: "12px", color: "#8a8070", lineHeight: 1.6 }}>
                            <span style={{ color: "#7aaa6a", fontWeight: 600 }}>Listen for: </span>{q.listen}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", marginBottom: "16px", overflow: "hidden" }}>
              {sectionHeader("objections", "Step 4: Handling objections")}
              {openSections.has("objections") && (
                <div style={{ padding: "0 20px 20px" }}>
                  {OBJECTIONS.map((o, i) => (
                    <div key={i} style={{ marginBottom: "10px", padding: "14px 16px", background: "#0c0a08", borderRadius: "8px", border: "1px solid #1e1c18" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#e05c5c", marginBottom: "8px" }}>{o.obj}</div>
                      <div style={{ fontSize: "14px", color: "#c8c0b0", lineHeight: 1.65 }}>{o.response}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", overflow: "hidden" }}>
              {sectionHeader("close", "Step 5: The close")}
              {openSections.has("close") && (
                <div style={{ padding: "0 20px 20px" }}>
                  {CLOSES.map((c, i) => (
                    <div key={i} style={{ marginBottom: "12px", padding: "14px 16px", background: "#0c0a08", borderRadius: "8px", border: "1px solid #1e1c18" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d4af37", marginBottom: "8px" }}>{c.type}</div>
                      <div style={{ fontSize: "15px", color: "#f5f0e0", fontWeight: 600, marginBottom: "8px", lineHeight: 1.55 }}>
                        <span style={{ color: "#d4af37" }}>&#34;</span>{c.script}<span style={{ color: "#d4af37" }}>&#34;</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#7aaa6a", fontStyle: "italic" }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── WORD OF MOUTH MODE ── */}
        {mode === "wom" && (
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#f5f0e0", marginBottom: "8px" }}>Word of Mouth Lines</div>
              <div style={{ fontSize: "14px", color: "#8a8070" }}>Lines for casual conversations. Learn the idea, not the exact words.</div>
            </div>
            {WORD_OF_MOUTH.map((section, i) => (
              <div key={i} style={{ ...s, marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4af37", marginBottom: "14px" }}>{section.context}</div>
                {section.lines.map((line, j) => (
                  <div key={j} style={{ padding: "12px 16px", background: "#141210", borderRadius: "6px", marginBottom: "8px", border: "1px solid #2e2820" }}>
                    <span style={{ fontSize: "15px", color: "#f5f0e0", lineHeight: 1.6 }}>&#34;{line}&#34;</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ ...s, borderColor: "#d4af3740" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d4af37", marginBottom: "12px" }}>The One Thing to Get Across</div>
              <div style={{ fontSize: "15px", color: "#f5f0e0", lineHeight: 1.75 }}>
                &ldquo;I build and manage the online presence for small businesses: website, booking, AI chatbot and social media. Starting at $75 a month.&rdquo;
              </div>
            </div>
          </div>
        )}

        {/* ── FOLLOW-UP MODE ── */}
        {mode === "followup" && (
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#f5f0e0", marginBottom: "8px" }}>Follow-Up Scripts</div>
              <div style={{ fontSize: "14px", color: "#8a8070" }}>Most of my deals close on a follow-up, so send every one.</div>
            </div>
            {[
              { label: "Day 1: Text or email after a walk-in", color: "#7aaa6a", script: `Hey [Name], it's Elijah. I stopped by [Business] earlier today. Wanted to send over what I mentioned: purcellventures.co/digital\n\nBased on what you told me, I think [specific tool] would make the biggest difference for you. Happy to put together a quick overview with pricing if you want to take a look. No pressure either way.\n\nElijah Purcell, Purcell Ventures`, note: "Keep it short. Reference something specific from the conversation. Link directly to the digital page." },
              { label: "Day 3: If no response", color: "#d4af37", script: `Hey [Name], just circling back. I know you're busy, wanted to leave the door open if you had any questions about what I mentioned.\n\nIf the timing's not right, totally understand. But if you want me to put together a custom quote for [Business], I'm happy to do that. Takes me about 10 minutes.\n\nElijah`, note: "One more touch. If they don't reply after this, let them go. Don't spam." },
              { label: "Day 7: Final follow-up", color: "#e8a030", script: `Hey [Name], last message, I promise. If you ever want to revisit the online presence stuff for [Business], I'm at elijah@purcell-ventures.com.\n\nI do good work and I'm local. Whenever the time is right.\n\nElijah`, note: "Leave it warm. Saying 'last message' tells them the truth, and it gets replies." },
              { label: "Warm lead: custom proposal email", color: "#9b7fd4", script: `Hey [Name],\n\nGood talking to you. Based on what you shared, here's what I'd recommend for [Business]:\n\n• [Tool 1]: [one line on why it fits them]\n• [Tool 2]: [one line on why it fits them]\n• [Tool 3]: [one line on why it fits them]\n\nTotal: $[X] setup + $[Y]/month after that.\n\nThat includes me building it, maintaining it, and being reachable when you need something. Full pricing at purcellventures.co/digital.\n\nWant to hop on a 15-minute call to go over it?\n\nElijah Purcell, Purcell Ventures LLC\nelijah@purcell-ventures.com`, note: "Always send a written proposal to warm leads. It makes you look professional and gives them something to share with a spouse/partner." },
            ].map((item, i) => (
              <div key={i} style={{ ...s, borderColor: item.color + "40", marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: item.color, marginBottom: "12px" }}>{item.label}</div>
                <pre style={{ fontSize: "13px", color: "#c8c0b0", lineHeight: 1.75, whiteSpace: "pre-wrap", fontFamily: "Inter, sans-serif", marginBottom: "12px", background: "#141210", padding: "14px", borderRadius: "6px", border: "1px solid #2e2820" }}>{item.script}</pre>
                <div style={{ fontSize: "12px", color: "#7aaa6a", fontStyle: "italic" }}>{item.note}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── LOG VISIT MODE ── */}
        {mode === "log" && (
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#f5f0e0", marginBottom: "8px" }}>Log a Visit</div>
              <div style={{ fontSize: "14px", color: "#8a8070" }}>Fill this out during or right after a visit. Saves locally to your browser.</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Business Info */}
              <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "14px" }}>Business Info</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {input(form.businessName, v => setForm(f => ({ ...f, businessName: v })), "Business name *")}
                  {input(form.type, v => setForm(f => ({ ...f, type: v })), "Type (salon, contractor…)")}
                  {input(form.ownerName, v => setForm(f => ({ ...f, ownerName: v })), "Owner name")}
                  {input(form.phone, v => setForm(f => ({ ...f, phone: v })), "Phone number", "tel")}
                </div>
                <div style={{ marginTop: "10px" }}>
                  {input(form.address, v => setForm(f => ({ ...f, address: v })), "Address")}
                </div>
              </div>

              {/* Gaps Observed */}
              <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "14px" }}>Gaps Observed</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                  {([["hasWebsite","Has a website"],["hasSocial","Has social media"],["hasBooking","Has online booking"]] as [keyof Visit, string][]).map(([key, label]) => (
                    <button key={key} onClick={() => setForm(f => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                      style={{ padding: "10px 14px", borderRadius: "6px", cursor: "pointer", border: "1px solid", fontSize: "13px", fontWeight: 600, textAlign: "left",
                        borderColor: form[key as keyof typeof form] ? "#7aaa6a60" : "#e05c5c40",
                        background: form[key as keyof typeof form] ? "#7aaa6a15" : "#e05c5c10",
                        color: form[key as keyof typeof form] ? "#7aaa6a" : "#e05c5c",
                      }}>
                      {form[key as keyof typeof form] ? "✓" : "✗"} {label}
                    </button>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#524d45", marginBottom: "8px" }}>Google Profile Quality</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {(["none","partial","complete"] as GoogleProfile[]).map(p => (
                      <button key={p} onClick={() => setForm(f => ({ ...f, googleProfile: p }))}
                        style={{ flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", border: `1px solid ${form.googleProfile === p ? "#d4af37" : "#2e2820"}`, background: form.googleProfile === p ? "#d4af3718" : "none", color: form.googleProfile === p ? "#d4af37" : "#524d45", fontSize: "12px", fontWeight: 600, textTransform: "capitalize" }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interest Level */}
              <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "14px" }}>Interest Level</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {(["hot","warm","cold","pass"] as Interest[]).map(level => {
                    const cfg = INTEREST_CONFIG[level];
                    return (
                      <button key={level} onClick={() => setForm(f => ({ ...f, interest: level }))}
                        style={{ padding: "12px", borderRadius: "8px", cursor: "pointer", border: `2px solid ${form.interest === level ? cfg.color : "#2e2820"}`, background: form.interest === level ? cfg.bg : "none", color: form.interest === level ? cfg.color : "#524d45", fontSize: "13px", fontWeight: 700, textTransform: "capitalize" }}>
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Services Needed */}
              <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "14px" }}>Services They Need</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {SERVICES.map(s => {
                    const on = form.servicesNeeded.includes(s);
                    return (
                      <button key={s} onClick={() => toggleService(s)}
                        style={{ padding: "9px 12px", borderRadius: "6px", cursor: "pointer", border: `1px solid ${on ? "#d4af3760" : "#2e2820"}`, background: on ? "#d4af3712" : "none", color: on ? "#d4af37" : "#524d45", fontSize: "12px", fontWeight: on ? 600 : 400, textAlign: "left" }}>
                        {on ? "✓ " : ""}{s}
                      </button>
                    );
                  })}
                </div>
                {form.servicesNeeded.length > 0 && (
                  <div style={{ marginTop: "12px", fontSize: "12px", color: "#8a8070" }}>
                    Est. monthly: <span style={{ color: "#d4af37", fontWeight: 700 }}>${form.servicesNeeded.reduce((sum, s) => sum + (SERVICE_PRICES[s] ?? 20), 0)}/mo</span>
                  </div>
                )}
              </div>

              {/* Notes + Follow-Up */}
              <div style={{ background: "#141210", border: "1px solid #2e2820", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "14px" }}>Notes & Follow-Up</div>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="What did they say? What's the situation? What matters to them?"
                  rows={4} style={{ width: "100%", padding: "10px 14px", background: "#0c0a08", border: "1px solid #2e2820", borderRadius: "6px", color: "#f5f0e0", fontSize: "14px", resize: "vertical", fontFamily: "Inter, sans-serif", boxSizing: "border-box" }} />
                <div style={{ marginTop: "10px" }}>
                  <div style={{ fontSize: "12px", color: "#524d45", marginBottom: "6px" }}>Follow-up date</div>
                  <input type="date" value={form.followUpDate} onChange={e => setForm(f => ({ ...f, followUpDate: e.target.value }))}
                    style={{ padding: "10px 14px", background: "#0c0a08", border: "1px solid #2e2820", borderRadius: "6px", color: "#f5f0e0", fontSize: "14px", colorScheme: "dark" }} />
                </div>
              </div>

              {/* Save */}
              <button onClick={submitVisit} disabled={!form.businessName}
                style={{ padding: "14px", background: saved ? "#7aaa6a" : form.businessName ? "#d4af37" : "#1a1714", border: "none", borderRadius: "8px", color: saved ? "#fff" : form.businessName ? "#0c0a08" : "#524d45", fontSize: "15px", fontWeight: 700, cursor: form.businessName ? "pointer" : "default", transition: "background 0.2s" }}>
                {saved ? "✓ Saved! Opening visits…" : "Save Visit"}
              </button>
            </div>
          </div>
        )}

        {/* ── MY VISITS MODE ── */}
        {mode === "visits" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#f5f0e0", marginBottom: "4px" }}>My Visits</div>
                <div style={{ fontSize: "13px", color: "#8a8070" }}>{visits.length} logged, {hotLeads.length} hot, {upcomingFollowUps.length} follow-ups due</div>
              </div>
              <button onClick={() => setMode("log")}
                style={{ padding: "9px 18px", background: "#d4af37", border: "none", borderRadius: "6px", color: "#0c0a08", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                + Log Visit
              </button>
            </div>

            {/* Follow-up alerts */}
            {upcomingFollowUps.length > 0 && (
              <div style={{ background: "#d4af3710", border: "1px solid #d4af3740", borderRadius: "8px", padding: "14px 18px", marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#d4af37", marginBottom: "8px" }}>Follow-Ups Due</div>
                {upcomingFollowUps.map(v => (
                  <div key={v.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#c8c0b0", marginBottom: "4px" }}>
                    <span>{v.businessName}, {v.ownerName || "owner"}</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ color: "#d4af37" }}>{new Date(v.followUpDate).toLocaleDateString()}</span>
                      <button onClick={() => toggleFollowUp(v.id)} style={{ padding: "3px 8px", background: "#d4af37", border: "none", borderRadius: "4px", color: "#0c0a08", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Done</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {visits.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#524d45" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>📋</div>
                <div style={{ fontSize: "14px" }}>No visits logged yet.</div>
                <button onClick={() => setMode("log")} style={{ marginTop: "16px", padding: "10px 20px", background: "#d4af37", border: "none", borderRadius: "6px", color: "#0c0a08", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>Log Your First Visit</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {visits.map(v => {
                  const cfg = INTEREST_CONFIG[v.interest];
                  const isExp = expandedVisit === v.id;
                  return (
                    <div key={v.id} style={{ background: "#141210", border: `1px solid ${v.interest === "hot" ? "#7aaa6a30" : "#2e2820"}`, borderRadius: "10px", overflow: "hidden" }}>
                      {/* Visit row */}
                      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: "14px", alignItems: "center", padding: "14px 18px" }}>
                        <div style={{ padding: "4px 10px", borderRadius: "12px", background: cfg.bg, color: cfg.color, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", border: `1px solid ${cfg.color}40` }}>
                          {cfg.label}
                        </div>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#f5f0e0" }}>{v.businessName}</div>
                          <div style={{ fontSize: "11px", color: "#524d45", marginTop: "2px" }}>
                            {v.ownerName && `${v.ownerName}, `}{v.type && `${v.type}, `}{new Date(v.date).toLocaleDateString()}
                            {v.followUpDate && !v.followUpDone && `, follow-up: ${new Date(v.followUpDate).toLocaleDateString()}`}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "6px", fontSize: "11px" }}>
                          {!v.hasWebsite && <span style={{ color: "#e05c5c" }}>no site</span>}
                          {!v.hasBooking && <span style={{ color: "#e8a030" }}>no booking</span>}
                        </div>
                        <button onClick={() => setExpandedVisit(isExp ? null : v.id)}
                          style={{ padding: "6px 12px", background: "none", border: "1px solid #2e2820", borderRadius: "5px", color: "#8a8070", fontSize: "11px", cursor: "pointer" }}>
                          {isExp ? "Less" : "More"}
                        </button>
                      </div>

                      {/* Expanded detail */}
                      {isExp && (
                        <div style={{ borderTop: "1px solid #1e1c18", padding: "16px 18px" }}>
                          {/* Info grid */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                            {[["Phone", v.phone],["Address", v.address],["Services", v.servicesNeeded.join(", ") || "—"]].map(([label, val]) => (
                              <div key={label}>
                                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#524d45", marginBottom: "3px" }}>{label}</div>
                                <div style={{ fontSize: "12px", color: "#c8c0b0" }}>{val || "—"}</div>
                              </div>
                            ))}
                          </div>

                          {v.notes && (
                            <div style={{ background: "#0c0a08", borderRadius: "6px", padding: "12px 14px", marginBottom: "14px", border: "1px solid #1e1c18" }}>
                              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#524d45", marginBottom: "6px" }}>Notes</div>
                              <div style={{ fontSize: "13px", color: "#c8c0b0", lineHeight: 1.65 }}>{v.notes}</div>
                            </div>
                          )}

                          {/* Actions */}
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            <button onClick={() => copyText(generateSummary(v), `summary-${v.id}`)}
                              style={{ padding: "8px 14px", background: "#1a1714", border: "1px solid #2e2820", borderRadius: "6px", color: copiedId === `summary-${v.id}` ? "#7aaa6a" : "#8a8070", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                              {copiedId === `summary-${v.id}` ? "✓ Copied" : "Copy Summary"}
                            </button>
                            <button onClick={() => copyText(generateProposal(v), `proposal-${v.id}`)}
                              style={{ padding: "8px 14px", background: "#d4af3712", border: "1px solid #d4af3740", borderRadius: "6px", color: copiedId === `proposal-${v.id}` ? "#7aaa6a" : "#d4af37", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                              {copiedId === `proposal-${v.id}` ? "✓ Copied" : "Generate Proposal"}
                            </button>
                            <a href={`mailto:elijah@purcell-ventures.com?subject=Visit log: ${v.businessName}&body=${encodeURIComponent(generateSummary(v))}`}
                              style={{ padding: "8px 14px", background: "#1a1714", border: "1px solid #2e2820", borderRadius: "6px", color: "#8a8070", fontSize: "12px", textDecoration: "none", fontWeight: 600 }}>
                              Email to Self
                            </a>
                            {!v.followUpDone && v.followUpDate && (
                              <button onClick={() => toggleFollowUp(v.id)}
                                style={{ padding: "8px 14px", background: "#7aaa6a12", border: "1px solid #7aaa6a40", borderRadius: "6px", color: "#7aaa6a", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                                Mark Follow-Up Done
                              </button>
                            )}
                            <button onClick={() => { if (confirm(`Delete ${v.businessName}?`)) deleteVisit(v.id); }}
                              style={{ padding: "8px 14px", background: "none", border: "1px solid #e05c5c30", borderRadius: "6px", color: "#e05c5c60", fontSize: "12px", cursor: "pointer", marginLeft: "auto" }}>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
