"use client";

import { useState } from "react";
import ROICalculator from "../components/ROICalculator";

const MODULES = [
  {
    category: "Website & Presence",
    items: [
      { name: "Business Website", desc: "Multi-page site — Home, About, Services, Contact. Mobile-friendly and SEO-ready." },
      { name: "Landing Page", desc: "Single-page, conversion-focused with a lead capture form and strong call-to-action." },
      { name: "Portfolio / Gallery", desc: "Image grid showcase for photographers, artists, and food businesses." },
    ],
  },
  {
    category: "Booking & Scheduling",
    items: [
      { name: "Appointment Booking", desc: "Calendar with time slots, service selection, and automatic email confirmations." },
      { name: "Event Registration", desc: "RSVP system with attendee management and automated reminder emails." },
    ],
  },
  {
    category: "Communication & Marketing",
    items: [
      { name: "Email Newsletter", desc: "Subscriber list, AI-written campaigns, and scheduled sends." },
      { name: "SMS Campaigns", desc: "Broadcast texts to your customer list for promotions and updates." },
      { name: "Social Media Scheduler", desc: "Write and schedule posts for Facebook and Instagram. AI generates the captions." },
      { name: "Review Manager", desc: "Google and Yelp reviews in one dashboard. AI drafts your responses." },
    ],
  },
  {
    category: "Customer Management",
    items: [
      { name: "Simple CRM", desc: "Contact list, notes, follow-up reminders, and a visual pipeline." },
      { name: "Lead Capture Pipeline", desc: "Embeddable lead form connected to a kanban board — from inquiry to closed deal." },
      { name: "Loyalty Program", desc: "Digital punch card with QR code check-ins. Reward your repeat customers." },
    ],
  },
  {
    category: "AI-Powered Tools",
    items: [
      { name: "AI Chatbot Widget", desc: "A chatbot on your website, trained on your business — answers questions 24/7." },
      { name: "AI Content Generator", desc: "Blog posts, product descriptions, and bios written on demand." },
      { name: "AI Caption Generator", desc: "Upload a photo, get five ready-to-post social media captions." },
      { name: "AI FAQ Builder", desc: "Answer a few questions — get a complete FAQ page built automatically." },
    ],
  },
  {
    category: "Branding & Identity",
    items: [
      { name: "Logo Designer", desc: "AI-assisted logo creation — pick your style, icon, and colors. Get a professional mark in minutes." },
      { name: "Brand Kit", desc: "Complete brand guide: primary and accent colors, font pairings, logo variations, and usage rules — all in one export." },
      { name: "Color Palette Tool", desc: "Describe your business vibe in plain English. Get a curated color palette with hex codes and usage guidance." },
      { name: "Business Card Designer", desc: "Front-and-back business card design with your branding. Print-ready PDF and digital version included." },
      { name: "Social Media Templates", desc: "A set of branded post, story, and cover templates built around your colors and logo. Consistent and professional." },
    ],
  },
  {
    category: "Operations & Finance",
    items: [
      { name: "Online Estimating", desc: "Build job quotes with line items, labor, materials, and send them as shareable links." },
      { name: "Online Invoicing", desc: "Create invoices and send payment links. Get paid faster via Stripe." },
      { name: "Expense Tracker", desc: "Log expenses by category with monthly summaries and tax-ready reports." },
      { name: "Inventory Tracker", desc: "Product list, stock levels, and low-stock alerts." },
      { name: "Staff Scheduler", desc: "Shift management, availability tracking, and a simple rota view." },
    ],
  },
];

const PRICING = [
  {
    name: "Starter",
    price: 75,
    setup: 300,
    tagline: "Get online and start getting found.",
    features: ["Business Website", "AI Chatbot Widget", "Contact / Lead Form", "Google Analytics setup", "Monthly content update"],
    cta: "Start with Starter",
    highlight: false,
  },
  {
    name: "Growth",
    price: 125,
    setup: 400,
    tagline: "Everything in Starter, plus bookings and marketing.",
    features: ["Everything in Starter", "Appointment Booking", "Email Newsletter", "Social Media Scheduler", "Review Manager", "Lead Capture Pipeline"],
    cta: "Get Growth",
    highlight: true,
  },
  {
    name: "Full Service",
    price: 175,
    setup: 500,
    tagline: "Your complete digital operation — fully managed.",
    features: ["Everything in Growth", "CRM & Estimating", "Online Invoicing", "AI Content Generator", "SMS Campaigns", "Loyalty Program", "Priority support"],
    cta: "Go Full Service",
    highlight: false,
  },
];

const FAQ = [
  { q: "How is this different from Wix or Squarespace?", a: "Those are tools you manage yourself. I build it, maintain it, update it, and add AI capabilities those platforms don't offer — like a chatbot trained on your business, AI-generated social posts, and automated review responses. You focus on your business, I handle the tech." },
  { q: "Why is it cheaper than a typical agency?", a: "Because I build modular, reusable systems — not one-off custom builds from scratch. I use AI tools throughout my workflow, which cuts hours without cutting quality. You get professional-grade work at a fraction of typical agency rates." },
  { q: "Do I own the website?", a: "Yes. The site, content, and domain are yours. If you ever want to leave, I hand over everything — full source code, all assets. No hostage-taking." },
  { q: "What if I need something that's not on the list?", a: "Ask. If it's in scope, I'll add it. If it's a bigger custom build, I'll quote it separately. Either way, you'll have a clear answer before any work starts." },
  { q: "What does the setup fee cover?", a: "The initial build — getting your branding, colors, content, and settings configured. After that, the monthly retainer covers maintenance, updates, and support." },
  { q: "Can I start small and add more later?", a: "Absolutely. Start with a website and chatbot. Add booking when you're ready. Scale at your own pace." },
];

// ── TEAM BUILDER DATA ──────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    id: "web",
    title: "Web Designer",
    salary: 5000,
    tagline: "Builds and maintains your online presence.",
    tools: ["Business Website", "Landing Page", "Portfolio / Gallery", "AI Content Generator"],
    color: "#d4af37",
  },
  {
    id: "marketing",
    title: "Marketing Manager",
    salary: 4500,
    tagline: "Gets your brand seen by the right people, consistently.",
    tools: ["Social Media Scheduler", "Email Newsletter", "AI Caption Generator", "Review Manager"],
    color: "#c9a87c",
  },
  {
    id: "booking",
    title: "Booking Coordinator",
    salary: 3500,
    tagline: "Fills your calendar and keeps customers coming back.",
    tools: ["Appointment Booking", "Event Registration", "Loyalty Program", "SMS Campaigns"],
    color: "#b8956a",
  },
  {
    id: "crm",
    title: "Customer Success Rep",
    salary: 4000,
    tagline: "Captures leads and keeps customers happy 24/7.",
    tools: ["AI Chatbot Widget", "Simple CRM", "Lead Capture Pipeline", "AI FAQ Builder"],
    color: "#a07850",
  },
  {
    id: "finance",
    title: "Finance & Ops",
    salary: 4500,
    tagline: "Keeps your finances clear and your operations on track.",
    tools: ["Online Invoicing", "Online Estimating", "Expense Tracker", "Inventory Tracker"],
    color: "#8a6040",
  },
  {
    id: "brand",
    title: "Brand Designer",
    salary: 4500,
    tagline: "Makes your business look like it belongs at the top.",
    tools: ["Logo Designer", "Brand Kit", "Color Palette Tool", "Business Card Designer", "Social Media Templates"],
    color: "#9b7fd4",
  },
  {
    id: "staff",
    title: "Office Manager",
    salary: 3500,
    tagline: "Keeps your team organized and on schedule.",
    tools: ["Staff Scheduler"],
    color: "#705030",
  },
];

// V-formation depth config per index (7 members — center is index 3)
const V_OFFSETS  = [-60, -35, -15, 0, -15, -35, -60];
const V_SCALES   = [0.80, 0.88, 0.95, 1.0, 0.95, 0.88, 0.80];
const V_OPACITIES= [0.55, 0.70, 0.85, 1.0, 0.85, 0.70, 0.55];
const V_Z        = [1, 2, 3, 4, 3, 2, 1];

function FullSilhouette({ fillColor, strokeColor, glowColor }: { fillColor: string; strokeColor: string; glowColor?: string }) {
  return (
    <svg width="72" height="148" viewBox="0 0 72 148" fill="none"
      style={{ filter: glowColor ? `drop-shadow(0 0 16px ${glowColor}80)` : undefined, transition: "filter 0.3s" }}>
      {/* Head */}
      <circle cx="36" cy="26" r="19" fill={fillColor} stroke={strokeColor} strokeWidth="1.5"/>
      {/* Body — shoulder-to-hip blob, no visible limbs */}
      <path d="M6 72 C6 57 19 50 36 50 C53 50 66 57 66 72 L62 136 Q62 142 36 142 Q10 142 10 136 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5"/>
    </svg>
  );
}

function TeamBuilder() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [hiredTeam, setHiredTeam] = useState<string[]>([]);

  function toggleHire(id: string) {
    setHiredTeam((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  const totalSalary = TEAM_MEMBERS.filter((m) => hiredTeam.includes(m.id)).reduce((sum, m) => sum + m.salary, 0);
  const hovered = TEAM_MEMBERS.find(m => m.id === hoveredMember) ?? null;

  return (
    <section id="build-team" style={{ padding: "100px 24px", borderTop: "1px solid var(--color-warm-border)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>
          Build Your Team
        </p>
        <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.03em", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, marginBottom: "16px", lineHeight: 1.1 }}>
          One subscription.<br />Your whole team.
        </h2>
        <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", marginBottom: "52px", maxWidth: "600px", lineHeight: 1.75 }}>
          Each role below is a real job you&#39;d have to hire for. Hover to see what they handle — and what that would cost you to hire. Then see what it costs with me instead.
        </p>

        {/* V-Formation figure row */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "10px", paddingBottom: "8px" }}>
          {TEAM_MEMBERS.map((member, i) => {
            const isHov = hoveredMember === member.id;
            const hired = hiredTeam.includes(member.id);
            const yOffset = isHov ? V_OFFSETS[i] - 30 : V_OFFSETS[i];
            const scale   = isHov ? 1.1 : V_SCALES[i];
            const opacity = hoveredMember && !isHov ? 0.25 : V_OPACITIES[i];
            const fill    = (hired || isHov) ? `${member.color}28` : "#28231e";
            const stroke  = (hired || isHov) ? member.color : "#3d3530";
            return (
              <div key={member.id} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => toggleHire(member.id)}
              >
                <div style={{
                  transform: `translateY(${yOffset}px) scale(${scale})`,
                  opacity,
                  transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  cursor: "pointer",
                  zIndex: isHov ? 10 : V_Z[i],
                  position: "relative",
                }}>
                  <FullSilhouette fillColor={fill} strokeColor={stroke} glowColor={isHov ? member.color : undefined} />
                  {hired && (
                    <div style={{ position: "absolute", top: "-4px", right: "-4px", width: "20px", height: "20px", borderRadius: "50%", background: member.color, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 11 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c0a08" strokeWidth="3.5" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", color: (hired || isHov) ? member.color : "#524d45", marginTop: "10px", whiteSpace: "nowrap", transition: "color 0.2s", textAlign: "center" }}>
                  {member.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info panel */}
        <div style={{ marginTop: "32px", minHeight: "200px" }}>
          {hovered ? (
            <div style={{
              background: "var(--color-warm-card)",
              border: `1px solid ${hovered.color}50`,
              borderRadius: "12px",
              padding: "32px 36px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto",
              gap: "40px",
              alignItems: "start",
              animation: "fadeSlideUp 0.2s ease",
            }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: hovered.color, marginBottom: "10px" }}>{hovered.title}</div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "8px" }}>Cost to hire this person</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "40px", fontWeight: 700, color: "var(--color-warm-text)", letterSpacing: "-0.01em", lineHeight: 1 }}>${hovered.salary.toLocaleString()}</span>
                  <span style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", paddingBottom: "6px" }}>/mo</span>
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginBottom: "16px" }}>Average salary ÷ 12 — before benefits or taxes</div>
                <div style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7 }}>{hovered.tagline}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "14px" }}>What they handle for you</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "16px" }}>
                  {hovered.tools.map(tool => (
                    <div key={tool} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13px", color: "var(--color-warm-text)" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: hovered.color, flexShrink: 0 }} />
                      {tool}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", padding: "8px 12px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", borderRadius: "6px", lineHeight: 1.6 }}>
                  Don&#39;t need everything they do? Just pick the tools you actually want.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "4px" }}>
                <button onClick={() => toggleHire(hovered.id)} style={{
                  padding: "12px 24px",
                  background: hiredTeam.includes(hovered.id) ? "transparent" : hovered.color,
                  color: hiredTeam.includes(hovered.id) ? hovered.color : "#0c0a08",
                  border: `1.5px solid ${hovered.color}`,
                  borderRadius: "7px", fontSize: "14px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                }}>
                  {hiredTeam.includes(hovered.id) ? "On Team ✓" : "Add to Team →"}
                </button>
                {hiredTeam.includes(hovered.id) && (
                  <button onClick={() => toggleHire(hovered.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "var(--color-warm-text-muted)", padding: 0, textDecoration: "underline" }}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "var(--color-warm-text-light)", fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
              Hover to meet each role
            </div>
          )}
        </div>

        {/* Summary bar */}
        {hiredTeam.length > 0 && (
          <div style={{ marginTop: "24px", background: "var(--color-warm-card)", border: "2px solid var(--color-warm-accent)", borderRadius: "12px", padding: "28px 32px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "4px" }}>Selected roles</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-warm-text)" }}>{hiredTeam.length} of 6</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "4px" }}>Hiring would cost you</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-warm-text)" }}>${totalSalary.toLocaleString()}/mo</div>
              <div style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "2px" }}>avg salary · before benefits</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginBottom: "4px" }}>My subscription instead</div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text-muted)", marginBottom: "4px" }}>from $75/mo</div>
              <div style={{ fontSize: "26px", fontWeight: 800, color: "var(--color-warm-accent)", letterSpacing: "-0.02em" }}>Save ${(totalSalary - 75).toLocaleString()}+</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
              <a href="#contact" style={{ padding: "13px 28px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
                Get These Tools →
              </a>
              <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", width: "100%", textAlign: "center" }}>You guide it · You approve it · You own it</span>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}

// ── TOOL PREVIEWS ─────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = { fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "6px" };
const rowStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #2e2820", fontSize: "13px", color: "#c8c0b0" };
const mockInput: React.CSSProperties = { width: "100%", padding: "8px 12px", background: "#0c0a08", border: "1px solid #2e2820", borderRadius: "6px", color: "#c8c0b0", fontSize: "13px" };
const mockBtn: React.CSSProperties = { padding: "8px 16px", background: "#d4af37", color: "#0c0a08", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer" };
const chip = (text: string, color: string = "#d4af3720"): React.CSSProperties => ({ display: "inline-block", padding: "2px 8px", background: color, border: `1px solid ${color.replace("20", "50")}`, borderRadius: "4px", fontSize: "11px", color: "#d4af37" });

const pill = (text: string, color: "#7aaa6a" | "#e8a030" | "#e05c5c" | "#d4af37" | "#9b7fd4" = "#d4af37") => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 9px", background: `${color}18`, border: `1px solid ${color}40`, borderRadius: "20px", fontSize: "11px", fontWeight: 600, color, letterSpacing: "0.03em" }}>{text}</span>
);
const appChrome = (title: string, actions?: React.ReactNode) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#0c0a08", borderBottom: "1px solid #2e2820", borderRadius: "8px 8px 0 0" }}>
    <span style={{ fontSize: "13px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.02em" }}>{title}</span>
    {actions ?? <div style={{ display: "flex", gap: "6px" }}>{["#e05c5c","#e8a030","#7aaa6a"].map(c => <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.6 }} />)}</div>}
  </div>
);
const tableRow = (cells: string[], colors?: string[]) => (
  <div style={{ display: "grid", gridTemplateColumns: cells.map(() => "1fr").join(" "), padding: "9px 12px", borderBottom: "1px solid #1e1c18", alignItems: "center" }}>
    {cells.map((c, i) => <span key={i} style={{ fontSize: "12px", color: colors?.[i] ?? "#c8c0b0" }}>{c}</span>)}
  </div>
);

const TOOL_PREVIEWS: Record<string, React.ReactNode> = {
  "Business Website": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {/* Browser nav */}
      <div style={{ background: "#141210", padding: "8px 14px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #2e2820" }}>
        <div style={{ display: "flex", gap: "5px" }}>{["#e05c5c","#e8a030","#7aaa6a"].map(c => <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.7 }} />)}</div>
        <div style={{ flex: 1, background: "#0c0a08", borderRadius: "4px", padding: "4px 10px", fontSize: "11px", color: "#524d45" }}>smithsalon.purcellventures.co</div>
      </div>
      {/* Site nav */}
      <div style={{ background: "#0c0a08", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #2e2820", height: "44px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#d4af37", fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.04em" }}>Smith Salon</span>
        <div style={{ display: "flex", gap: "18px" }}>{["Home","Services","Gallery","Book"].map(p => <span key={p} style={{ fontSize: "11px", color: p === "Book" ? "#d4af37" : "#8a8070" }}>{p}</span>)}</div>
      </div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #141210 0%, #1e1a16 100%)", padding: "32px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4af37", marginBottom: "10px" }}>Kennesaw, Georgia</div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#f5f0e0", lineHeight: 1.2, marginBottom: "16px", fontFamily: "'Cinzel', Georgia, serif" }}>The Salon<br/>That Knows You</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ padding: "8px 16px", background: "#d4af37", borderRadius: "5px", fontSize: "12px", fontWeight: 700, color: "#0c0a08" }}>Book Now</div>
            <div style={{ padding: "8px 14px", border: "1px solid #3d3628", borderRadius: "5px", fontSize: "12px", color: "#8a8070" }}>Our Services</div>
          </div>
        </div>
        <div style={{ width: "120px", height: "100px", background: "linear-gradient(135deg, #2e2820, #3d3628)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "28px" }}>✂</span>
        </div>
      </div>
      {/* Service cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "#2e2820" }}>
        {[["Highlights","$120","90 min"],["Color Retouch","$85","60 min"],["Blowout","$55","45 min"]].map(([s,p,t]) => (
          <div key={s} style={{ background: "#0c0a08", padding: "14px 16px" }}>
            <div style={{ width: "24px", height: "3px", background: "#d4af3750", borderRadius: "2px", marginBottom: "10px" }} />
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#f5f0e0", marginBottom: "4px" }}>{s}</div>
            <div style={{ fontSize: "11px", color: "#8a8070" }}>{t}</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginTop: "8px" }}>{p}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#0c0a08", padding: "10px 16px", display: "flex", gap: "8px" }}>
        {["SEO Ready","Mobile Friendly","Live in 5 Days"].map(t => <span key={t} style={{ fontSize: "10px", padding: "3px 8px", background: "#d4af3715", border: "1px solid #d4af3730", borderRadius: "4px", color: "#d4af37" }}>{t}</span>)}
      </div>
    </div>
  ),
  "Landing Page": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Landing Page · Smith Salon")}
      <div style={{ background: "linear-gradient(160deg, #0c0a08 60%, #1e1814 100%)", padding: "32px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37" }}>Limited Time Offer</div>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", fontWeight: 700, color: "#f5f0e0", lineHeight: 1.2 }}>Get 20% Off Your<br/>First Appointment</div>
        <div style={{ fontSize: "13px", color: "#8a8070", maxWidth: "320px", lineHeight: 1.65 }}>Join 214 local clients already booking online. Reserve your spot — takes 30 seconds.</div>
        <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "360px" }}>
          <input readOnly placeholder="Your name" style={{ ...mockInput, flex: 1 }} />
          <input readOnly placeholder="Email address" style={{ ...mockInput, flex: 2 }} />
        </div>
        <button style={{ ...mockBtn, width: "100%", maxWidth: "360px", padding: "11px", fontSize: "13px" }}>Claim My 20% Off →</button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#524d45" }}>
          <div style={{ display: "flex" }}>{["#d4af37","#c9a87c","#b8956a"].map((c,i) => <div key={i} style={{ width: "20px", height: "20px", borderRadius: "50%", background: c, border: "1.5px solid #0c0a08", marginLeft: i > 0 ? "-6px" : 0 }} />)}</div>
          127 clients claimed this week</div>
        <div style={{ fontSize: "10px", color: "#3d3628" }}>No spam. Unsubscribe anytime.</div>
      </div>
    </div>
  ),
  "Portfolio / Gallery": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Gallery · Smith Salon Photography", <div style={{ display: "flex", gap: "8px" }}><span style={{ fontSize: "11px", color: "#d4af37", fontWeight: 600 }}>All</span>{["Portraits","Events","Products"].map(c => <span key={c} style={{ fontSize: "11px", color: "#524d45" }}>{c}</span>)}</div>)}
      <div style={{ background: "#0c0a08", padding: "16px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "120px 80px", gap: "6px" }}>
        <div style={{ gridRow: "span 2", background: "linear-gradient(135deg, #3a2e1e, #2a1e0e)", borderRadius: "6px", display: "flex", alignItems: "flex-end", padding: "10px" }}>
          <span style={{ fontSize: "10px", color: "#d4af37", fontWeight: 600 }}>Featured ★</span>
        </div>
        {["#2e1e3a","#1e3a2e","#3a1e2e","#2e3a1e"].map((c,i) => (
          <div key={i} style={{ background: `linear-gradient(135deg, ${c}, ${c}bb)`, borderRadius: "6px" }} />
        ))}
      </div>
      <div style={{ fontSize: "12px", color: "#8a8070" }}>6 categories · 48 images · Lightbox enabled</div>
    </div>
  ),
  "Appointment Booking": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Book an Appointment · Smith Salon")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#0c0a08" }}>
        {/* Calendar */}
        <div style={{ padding: "16px", borderRight: "1px solid #2e2820" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#f5f0e0" }}>March 2026</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {["‹","›"].map(a => <div key={a} style={{ width: "20px", height: "20px", background: "#1a1714", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#8a8070" }}>{a}</div>)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3px" }}>
            {["M","T","W","T","F","S","S"].map((d,i) => <div key={i} style={{ textAlign: "center", fontSize: "9px", color: "#524d45", padding: "2px 0", fontWeight: 700 }}>{d}</div>)}
            {Array.from({ length: 31 }, (_,i) => i+1).map(d => {
              const avail = [5,6,8,10,11,12,14,17,19].includes(d);
              const sel = d === 12;
              return <div key={d} style={{ textAlign: "center", fontSize: "10px", borderRadius: "4px", padding: "3px 0", background: sel ? "#d4af37" : avail ? "#d4af3718" : "transparent", color: sel ? "#0c0a08" : avail ? "#d4af37" : "#3a3530", fontWeight: sel ? 700 : 400 }}>{d}</div>;
            })}
          </div>
          <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
            {[["avail","#d4af37"],["booked","#3d3530"]].map(([l,c]) => <div key={l} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", color: "#524d45" }}><div style={{ width: "8px", height: "8px", borderRadius: "2px", background: c + "40", border: `1px solid ${c}60` }} />{l}</div>)}
          </div>
        </div>
        {/* Time slots */}
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#d4af37", marginBottom: "10px" }}>March 12 · Available</div>
          {[["9:00 AM","Cut & Style","booked"],["10:30 AM","Highlights","open"],["12:00 PM","Color","open"],["2:00 PM","Blowout","booked"],["3:30 PM","Cut","open"]].map(([t,s,st]) => (
            <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 8px", marginBottom: "4px", background: st === "open" ? "#d4af3710" : "#0c0a08", border: `1px solid ${st === "open" ? "#d4af3740" : "#1e1c18"}`, borderRadius: "6px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: st === "open" ? "#f5f0e0" : "#524d45" }}>{t}</div>
                <div style={{ fontSize: "10px", color: "#524d45" }}>{s}</div>
              </div>
              <div>{st === "open" ? pill("Open","#7aaa6a") : <span style={{ fontSize: "10px", color: "#3d3530" }}>Booked</span>}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Service selector */}
      <div style={{ background: "#0c0a08", borderTop: "1px solid #2e2820", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "2px" }}>SELECTED SERVICE</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#f5f0e0" }}>Highlights · 90 min · <span style={{ color: "#d4af37" }}>$120</span></div>
        </div>
        <div style={{ padding: "8px 18px", background: "#d4af37", borderRadius: "6px", fontSize: "12px", fontWeight: 700, color: "#0c0a08" }}>Confirm Booking</div>
      </div>
    </div>
  ),
  "Event Registration": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Event Registration")}
      <div style={{ background: "linear-gradient(135deg, #1e1814, #2a2018)", padding: "20px 20px 16px", borderBottom: "1px solid #2e2820" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4af37", marginBottom: "8px" }}>Upcoming Event</div>
        <div style={{ fontSize: "20px", fontWeight: 700, color: "#f5f0e0", marginBottom: "4px", fontFamily: "'Cinzel', Georgia, serif" }}>Spring Color Workshop</div>
        <div style={{ fontSize: "12px", color: "#8a8070", marginBottom: "16px" }}>April 12, 2026 · 1:00 PM – 5:00 PM · Smith Salon</div>
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: "6px", padding: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#d4af37" }}>34</div>
            <div style={{ fontSize: "10px", color: "#524d45" }}>RSVPs</div>
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: "6px", padding: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#f5f0e0" }}>16</div>
            <div style={{ fontSize: "10px", color: "#524d45" }}>Spots Left</div>
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: "6px", padding: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#7aaa6a" }}>68%</div>
            <div style={{ fontSize: "10px", color: "#524d45" }}>Filled</div>
          </div>
        </div>
        <div style={{ height: "4px", background: "#2e2820", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ width: "68%", height: "100%", background: "linear-gradient(to right, #d4af37, #7aaa6a)", borderRadius: "2px" }} />
        </div>
      </div>
      <div style={{ background: "#0c0a08", padding: "16px 20px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", marginBottom: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Recent RSVPs</div>
        {[["A.T.","Ashley Thompson","Confirmed","#d4af37"],["M.R.","Mark Rivera","Confirmed","#d4af37"],["D.L.","Dana Lee","Pending","#e8a030"]].map(([init,name,st,c]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderBottom: "1px solid #1a1714" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: c + "25", border: `1px solid ${c}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: c, flexShrink: 0 }}>{init}</div>
            <span style={{ fontSize: "12px", color: "#c8c0b0", flex: 1 }}>{name}</span>
            {pill(st, st === "Confirmed" ? "#7aaa6a" : "#e8a030")}
          </div>
        ))}
        <div style={{ marginTop: "14px", display: "flex", gap: "8px" }}>
          <input readOnly placeholder="Your name" style={{ ...mockInput, flex: 1 }} />
          <div style={{ ...mockBtn, cursor: "default", padding: "8px 14px" }}>RSVP Now</div>
        </div>
      </div>
    </div>
  ),
  "Email Newsletter": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Email Campaigns", <div style={{ display: "flex", gap: "8px" }}>{["Campaigns","Subscribers","Analytics"].map((t,i) => <span key={t} style={{ fontSize: "11px", color: i === 0 ? "#d4af37" : "#524d45", fontWeight: i === 0 ? 700 : 400 }}>{t}</span>)}</div>)}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "14px 16px", gap: "8px", background: "#0c0a08", borderBottom: "1px solid #2e2820" }}>
        {[["214","Subscribers"],["68%","Avg Open Rate"],["34%","Click Rate"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#d4af37" }}>{v}</div>
            <div style={{ fontSize: "10px", color: "#524d45" }}>{l}</div>
          </div>
        ))}
      </div>
      {[{name:"Spring Deals ✦",date:"Thu Mar 12 · 9:00 AM",status:"Scheduled",open:"—",badge:"#e8a030"},{name:"February Love Special",date:"Feb 14",status:"Sent",open:"71%",badge:"#7aaa6a"},{name:"New Year Refresh",date:"Jan 2",status:"Sent",open:"64%",badge:"#7aaa6a"}].map((c,i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", background: "#0c0a08", borderBottom: "1px solid #1a1714" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#f5f0e0" }}>{c.name}</div>
            <div style={{ fontSize: "11px", color: "#524d45", marginTop: "2px" }}>AI-drafted · {c.date}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div>{pill(c.status, c.status === "Scheduled" ? "#e8a030" : "#7aaa6a")}</div>
            {c.open !== "—" && <div style={{ fontSize: "11px", color: "#8a8070", marginTop: "4px" }}>{c.open} open</div>}
          </div>
        </div>
      ))}
      <div style={{ background: "#0c0a08", padding: "10px 16px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ ...mockBtn, cursor: "default" }}>+ New Campaign</div>
      </div>
    </div>
  ),
  "SMS Campaigns": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("SMS Campaigns")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "12px 16px", gap: "8px", background: "#0c0a08", borderBottom: "1px solid #2e2820" }}>
        {[["214","Contacts"],["34%","Reply Rate"],["127","Replies (YES)"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}><div style={{ fontSize: "20px", fontWeight: 800, color: "#d4af37" }}>{v}</div><div style={{ fontSize: "10px", color: "#524d45" }}>{l}</div></div>
        ))}
      </div>
      <div style={{ background: "#0c0a08", padding: "14px 16px", borderBottom: "1px solid #2e2820" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a8070", marginBottom: "8px" }}>New Broadcast</div>
        <textarea readOnly rows={3} defaultValue={"Hey {name}! We have a cancellation open tomorrow at 10:30 AM. Reply YES to grab it — first come first served! 🙌"} style={{ ...mockInput, resize: "none", fontFamily: "inherit", lineHeight: 1.6 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
          <div>
            <span style={{ fontSize: "11px", color: "#524d45" }}>To: </span>
            <span style={{ fontSize: "11px", color: "#d4af37", fontWeight: 600 }}>214 contacts</span>
            <span style={{ fontSize: "11px", color: "#3d3530", marginLeft: "8px" }}>142/160 chars</span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ padding: "6px 12px", border: "1px solid #2e2820", borderRadius: "5px", fontSize: "11px", color: "#8a8070", cursor: "default" }}>Schedule</div>
            <div style={mockBtn}>Send Now</div>
          </div>
        </div>
      </div>
      <div style={{ background: "#0c0a08", padding: "10px 16px" }}>{pill("Reply rate 34% · Last campaign: 3d ago","#7aaa6a")}</div>
    </div>
  ),
  "Social Media Scheduler": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Social Media Scheduler")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#0c0a08" }}>
        {/* Composer */}
        <div style={{ padding: "16px", borderRight: "1px solid #2e2820" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Compose Post</div>
          <textarea readOnly rows={4} defaultValue={"Walk-ins welcome today! Stop in and treat yourself — link in bio for booking 🌿 #smithsalon #kennesaw"} style={{ ...mockInput, resize: "none", fontFamily: "inherit", lineHeight: 1.65 }} />
          <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
            {[["IG","#d4af37"],["FB","#3d3530"]].map(([p,c]) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", background: c + "20", border: `1px solid ${c}50`, borderRadius: "4px", fontSize: "11px", color: c, fontWeight: 700 }}>{p}</div>
            ))}
          </div>
          <div style={{ marginTop: "8px", display: "flex", gap: "6px", alignItems: "center" }}>
            <input readOnly placeholder="Thu Mar 13 · 9:00 AM" style={{ ...mockInput, flex: 1, fontSize: "11px" }} />
            <div style={{ ...mockBtn, padding: "7px 12px", fontSize: "11px", cursor: "default", flexShrink: 0 }}>Schedule</div>
          </div>
          <div style={{ marginTop: "6px" }}>
            <div style={{ fontSize: "10px", color: "#d4af37", fontWeight: 600, cursor: "default" }}>✦ AI Rewrite Suggestion</div>
          </div>
        </div>
        {/* Preview + queue */}
        <div style={{ padding: "16px" }}>
          <div style={{ background: "#141210", borderRadius: "8px", padding: "10px", marginBottom: "10px", border: "1px solid #2e2820" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#d4af3730", border: "1px solid #d4af3760" }} />
              <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#f5f0e0" }}>smithsalon</div><div style={{ fontSize: "9px", color: "#524d45" }}>Kennesaw, GA</div></div>
            </div>
            <div style={{ height: "50px", background: "linear-gradient(135deg, #2e2820, #3d3020)", borderRadius: "4px", marginBottom: "6px" }} />
            <div style={{ fontSize: "11px", color: "#c8c0b0", lineHeight: 1.5 }}>Walk-ins welcome today! Stop in...</div>
            <div style={{ fontSize: "10px", color: "#524d45", marginTop: "4px" }}>#smithsalon #kennesaw</div>
          </div>
          {[["Mon 9am","IG","Walk-ins welcome..."],["Wed 11am","FB","Spring color trends..."],["Fri 4pm","IG","Client transformation..."]].map(([t,pl,tx]) => (
            <div key={t} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #1a1714" }}>
              <span style={{ fontSize: "10px", color: "#d4af37", fontWeight: 700, minWidth: "52px" }}>{t}</span>
              <span style={{ fontSize: "10px", background: "#2e2820", padding: "1px 5px", borderRadius: "3px", color: "#8a8070" }}>{pl}</span>
              <span style={{ fontSize: "11px", color: "#8a8070", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  "Review Manager": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Review Manager")}
      {/* Score summary */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", padding: "16px 20px", background: "#0c0a08", borderBottom: "1px solid #2e2820", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "44px", fontWeight: 900, color: "#d4af37", lineHeight: 1 }}>4.8</div>
          <div style={{ display: "flex", gap: "2px", justifyContent: "center", marginTop: "4px" }}>
            {[1,2,3,4,5].map(i => <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= 4 ? "#d4af37" : "#2e2820"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
          </div>
          <div style={{ fontSize: "10px", color: "#524d45", marginTop: "4px" }}>47 reviews</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[[5,"80%"],[4,"15%"],[3,"5%"]].map(([s,p]) => (
            <div key={s} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ fontSize: "10px", color: "#524d45", minWidth: "8px" }}>{s}★</span>
              <div style={{ flex: 1, height: "4px", background: "#1a1714", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: p as string, height: "100%", background: "#d4af37", borderRadius: "2px" }} />
              </div>
              <span style={{ fontSize: "10px", color: "#524d45", minWidth: "24px" }}>{p}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>{["Google 4.8 ★","Yelp 4.6 ★"].map(s => <div key={s} style={{ fontSize: "10px", padding: "2px 8px", background: "#1a1714", border: "1px solid #2e2820", borderRadius: "4px", color: "#8a8070" }}>{s}</div>)}</div>
        </div>
      </div>
      {/* Reviews */}
      {[{name:"Ashley T.",stars:5,text:"Best salon in town. My highlights turned out perfect — Sarah really listened.",platform:"Google",ai:true},{name:"Mark R.",stars:4,text:"Great experience overall. Parking was tight but absolutely coming back.",platform:"Yelp",ai:true}].map((r,i) => (
        <div key={i} style={{ padding: "12px 16px", background: "#0c0a08", borderBottom: "1px solid #1a1714" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
            <div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#f5f0e0" }}>{r.name}</span>
              <div style={{ display: "flex", gap: "2px", marginTop: "3px" }}>{Array.from({length:5},(_,j) => <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill={j<r.stars?"#d4af37":"#2e2820"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
            </div>
            <span style={{ fontSize: "10px", color: "#524d45" }}>{r.platform}</span>
          </div>
          <div style={{ fontSize: "12px", color: "#8a8070", fontStyle: "italic", lineHeight: 1.6, marginBottom: "8px" }}>"{r.text}"</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {pill("AI Response Ready","#d4af37")}
            <span style={{ fontSize: "11px", color: "#524d45", cursor: "default", textDecoration: "underline" }}>Approve & Post</span>
          </div>
        </div>
      ))}
    </div>
  ),
  "Simple CRM": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("CRM · Contacts", <div style={{ display: "flex", gap: "8px", alignItems: "center" }}><input readOnly placeholder="Search contacts..." style={{ ...mockInput, width: "140px", padding: "4px 10px", fontSize: "11px" }} /><div style={mockBtn}>+ Add</div></div>)}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#141210", padding: "7px 14px", borderBottom: "1px solid #2e2820" }}>
        {["Name","Last Service","Total Spent","Status"].map(h => <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#524d45", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>)}
      </div>
      {[
        {n:"Sarah Mitchell",init:"SM",service:"Highlights",spent:"$840",status:"Active",c:"#7aaa6a"},
        {n:"James Cooper",init:"JC",service:"Color · Due today",spent:"$320",status:"Follow-up",c:"#d4af37"},
        {n:"Lynn Park",init:"LP",service:"Chatbot inquiry",spent:"—",status:"New Lead",c:"#8a8070"},
        {n:"Tom Rivera",init:"TR",service:"Blowout",spent:"$210",status:"Active",c:"#7aaa6a"},
      ].map(row => (
        <div key={row.n} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "9px 14px", background: "#0c0a08", borderBottom: "1px solid #141210", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: row.c + "25", border: `1px solid ${row.c}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: row.c, flexShrink: 0 }}>{row.init}</div>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#f5f0e0" }}>{row.n}</span>
          </div>
          <span style={{ fontSize: "11px", color: "#8a8070" }}>{row.service}</span>
          <span style={{ fontSize: "12px", color: "#d4af37", fontWeight: 600 }}>{row.spent}</span>
          <div>{pill(row.status, row.c as "#7aaa6a"|"#d4af37"|"#e8a030"|"#e05c5c")}</div>
        </div>
      ))}
    </div>
  ),
  "Lead Capture Pipeline": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Lead Pipeline", <div style={{ display: "flex", gap: "6px" }}>{[["Inquired",2],["Contacted",1],["Quoted",1],["Closed",2]].map(([l,n]) => <div key={l as string} style={{ fontSize: "10px", padding: "2px 8px", background: "#1a1714", borderRadius: "4px", color: "#8a8070" }}>{l as string} <span style={{ color: "#d4af37" }}>{n as number}</span></div>)}</div>)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#2e2820" }}>
        {[
          {stage:"Inquired",color:"#8a8070",leads:[{n:"Alex Turner",s:"Pressure Wash",v:"$150"},{n:"Jamie Ross",s:"Gutters",v:"$280"}]},
          {stage:"Contacted",color:"#e8a030",leads:[{n:"Dana Moss",s:"Full Clean",v:"$380"}]},
          {stage:"Quoted",color:"#d4af37",leads:[{n:"Sara Johnson",s:"Gutter + Wash",v:"$450"}]},
          {stage:"Closed",color:"#7aaa6a",leads:[{n:"Mark Rivera",s:"Gutters",v:"$380",won:true},{n:"Kim Lee",s:"Wash",v:"$220",won:true}]},
        ].map(col => (
          <div key={col.stage} style={{ background: "#0c0a08", padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: col.color }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: col.color, letterSpacing: "0.06em" }}>{col.stage}</span>
            </div>
            {col.leads.map((l: {n:string;s:string;v:string;won?:boolean}) => (
              <div key={l.n} style={{ background: "#141210", border: `1px solid ${col.color}30`, borderRadius: "6px", padding: "7px 8px", marginBottom: "5px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#f5f0e0" }}>{l.n}</div>
                <div style={{ fontSize: "10px", color: "#524d45", marginTop: "2px" }}>{l.s}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  <span style={{ fontSize: "11px", color: col.color, fontWeight: 600 }}>{l.v}</span>
                  {l.won && <span style={{ fontSize: "10px", color: "#7aaa6a" }}>Won ✓</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
  "Loyalty Program": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Loyalty Dashboard · Smith Salon", <div style={{ display: "flex", gap: "6px" }}>{pill("248 members","#7aaa6a")}<div style={{ padding: "4px 10px", background: "#d4af3718", border: "1px solid #d4af3740", borderRadius: "4px", fontSize: "11px", color: "#d4af37", cursor: "default" }}>Export</div></div>)}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", background: "#0c0a08" }}>
        <div style={{ padding: "16px", borderRight: "1px solid #2e2820" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#d4af3725", border: "2px solid #d4af3760", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#d4af37" }}>S</div>
            <div><div style={{ fontSize: "13px", fontWeight: 700, color: "#f5f0e0" }}>Sarah Mitchell</div><div style={{ marginTop: "3px" }}>{pill("Gold ★","#d4af37")}</div></div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8a8070", marginBottom: "6px" }}>
              <span>Progress to free reward</span><span style={{ color: "#d4af37", fontWeight: 700 }}>7 / 10</span>
            </div>
            <div style={{ height: "6px", background: "#1a1714", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ width: "70%", height: "100%", background: "linear-gradient(90deg, #b8941e, #d4af37)", borderRadius: "3px" }} />
            </div>
            <div style={{ fontSize: "10px", color: "#524d45", marginTop: "4px" }}>3 more visits = free blowout</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", marginBottom: "14px" }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: i < 7 ? "#d4af37" : "#1a1714", border: `1px solid ${i < 7 ? "#d4af37" : "#2e2820"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i < 7 && <svg width="9" height="9" viewBox="0 0 24 24" fill="#0c0a08"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
              </div>
            ))}
          </div>
          <div style={{ padding: "10px", background: "#141210", borderRadius: "6px", textAlign: "center" }}>
            <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "6px" }}>Your QR Code — Scan at Checkout</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", width: "56px", margin: "0 auto" }}>
              {[1,0,1,1,0,1,0, 0,1,0,0,1,0,1, 1,1,0,1,0,0,1, 0,0,1,0,1,1,0, 1,0,0,1,0,1,1, 0,1,1,0,0,0,1, 1,0,1,0,1,0,0].map((v,i) => (
                <div key={i} style={{ aspectRatio: "1", background: v ? "#d4af37" : "transparent", borderRadius: "1px" }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Recent Check-Ins</div>
          {[
            { name: "Sarah Mitchell", date: "Mar 2", service: "Highlights", tier: "#d4af37" },
            { name: "David Torres",   date: "Mar 1", service: "Color + Cut", tier: "#c9a87c" },
            { name: "Lisa Park",      date: "Feb 28", service: "Blowout",    tier: "#b8956a" },
            { name: "Mike Johnson",   date: "Feb 27", service: "Haircut",    tier: "#b8956a" },
          ].map((v, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #141210" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: `${v.tier}20`, border: `1.5px solid ${v.tier}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: v.tier }}>{v.name[0]}</div>
                <div><div style={{ fontSize: "12px", color: "#f5f0e0", fontWeight: 600 }}>{v.name}</div><div style={{ fontSize: "10px", color: "#524d45" }}>{v.service} · {v.date}</div></div>
              </div>
              <span style={{ fontSize: "12px", color: "#7aaa6a", fontWeight: 700 }}>+1</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: "#141210", borderRadius: "6px" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#d4af37" }}>248</div>
              <div style={{ fontSize: "10px", color: "#524d45" }}>Members</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: "#141210", borderRadius: "6px" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#7aaa6a" }}>34</div>
              <div style={{ fontSize: "10px", color: "#524d45" }}>Rewards Redeemed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  "AI Chatbot Widget": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      <div style={{ background: "#141210", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #2e2820" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#d4af3725", border: "1px solid #d4af3750", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#f5f0e0" }}>Smith Salon Assistant</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#7aaa6a" }}><div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#7aaa6a" }} />Online 24/7</div>
          </div>
        </div>
        <div style={{ fontSize: "10px", color: "#524d45" }}>Powered by AI</div>
      </div>
      <div style={{ background: "#0c0a08", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {([
          {side:"bot",text:"Hi! I'm here 24/7. Ask me anything about Smith Salon — services, hours, pricing, or booking."},
          {side:"user",text:"Do you have any Saturday openings this week?"},
          {side:"bot",text:"Yes! We have 10:00 AM and 2:30 PM open this Saturday. Both include a free consultation. Which works?"},
          {side:"user",text:"2:30 — can I book highlights?"},
          {side:"bot",text:"Done! Booked for Saturday 2:30 PM — Highlights with Sarah · $120. Confirmation sent ✓"},
        ] as {side:string;text:string}[]).map((msg,i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.side === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "80%", background: msg.side === "user" ? "#d4af37" : "#1a1714", color: msg.side === "user" ? "#0c0a08" : "#c8c0b0", borderRadius: msg.side === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "8px 11px", fontSize: "11px", lineHeight: 1.6 }}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#0c0a08", borderTop: "1px solid #2e2820", padding: "8px 12px", display: "flex", gap: "8px" }}>
        <input readOnly placeholder="Ask a question..." style={{ ...mockInput, flex: 1, padding: "7px 10px", fontSize: "11px" }} />
        <div style={{ ...mockBtn, padding: "7px 12px", fontSize: "11px", cursor: "default" }}>Send</div>
      </div>
    </div>
  ),
  "AI Content Generator": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("AI Content Generator")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", background: "#0c0a08" }}>
        <div style={{ padding: "16px", borderRight: "1px solid #2e2820", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "5px" }}>Content Type</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {["Blog Post","Email","Caption","Bio","FAQ"].map((t,i) => (
                <div key={t} style={{ padding: "4px 9px", background: i === 0 ? "#d4af3720" : "#141210", border: `1px solid ${i === 0 ? "#d4af3750" : "#2e2820"}`, borderRadius: "4px", fontSize: "10px", color: i === 0 ? "#d4af37" : "#524d45", fontWeight: i === 0 ? 700 : 400 }}>{t}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "5px" }}>Topic</div>
            <input readOnly defaultValue="Spring hair color trends 2026" style={{ ...mockInput, fontSize: "11px" }} />
          </div>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "5px" }}>Tone</div>
            <div style={{ display: "flex", gap: "5px" }}>
              {["Professional","Friendly","Bold"].map((t,i) => (
                <div key={t} style={{ flex: 1, padding: "5px 0", textAlign: "center", background: i === 1 ? "#d4af3720" : "#141210", border: `1px solid ${i === 1 ? "#d4af3750" : "#2e2820"}`, borderRadius: "4px", fontSize: "10px", color: i === 1 ? "#d4af37" : "#524d45" }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ ...mockBtn, textAlign: "center", cursor: "default" }}>Generate →</div>
        </div>
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#7aaa6a", letterSpacing: "0.08em", textTransform: "uppercase" }}>Generated</div>
            {pill("847 words · SEO ready","#7aaa6a")}
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#f5f0e0", marginBottom: "8px", lineHeight: 1.3 }}>Spring Into Color: 2026&#39;s Hottest Hair Trends</div>
          <div style={{ fontSize: "11px", color: "#8a8070", lineHeight: 1.75 }}>As the weather warms, clients are swapping winter&#39;s muted tones for something bolder. This spring, we&#39;re seeing a surge in warm copper balayage, lived-in highlights, and rich auburn hues that complement every skin tone...</div>
          <div style={{ marginTop: "12px", display: "flex", gap: "6px" }}>
            {["Copy","Edit","Schedule"].map(a => <div key={a} style={{ padding: "5px 11px", border: "1px solid #2e2820", borderRadius: "4px", fontSize: "11px", color: "#8a8070", cursor: "default" }}>{a}</div>)}
          </div>
        </div>
      </div>
    </div>
  ),
  "AI Caption Generator": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("AI Caption Generator")}
      <div style={{ background: "#0c0a08", padding: "12px 16px", borderBottom: "1px solid #2e2820" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ width: "80px", height: "80px", background: "linear-gradient(135deg, #3a2e1e, #2a1e0e)", borderRadius: "6px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "20px" }}>📸</span>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#f5f0e0", marginBottom: "4px" }}>color-transformation.jpg</div>
            <div style={{ fontSize: "11px", color: "#524d45" }}>Before & after highlights · Uploaded</div>
            <div style={{ marginTop: "8px" }}>{pill("5 captions ready","#7aaa6a")}</div>
          </div>
        </div>
      </div>
      <div style={{ background: "#0c0a08", padding: "8px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {[
          {text:"Walk-ins welcome today — stop in and treat yourself ✨",sel:true},
          {text:"From dull to radiant in one appointment. Book the link in bio.",sel:false},
          {text:"She said 'surprise me' and we delivered. 🌿 #colortransformation",sel:false},
          {text:"Your hair, your story. Let us help you write the next chapter.",sel:false},
          {text:"Highlights that hit different. Book now before the week fills up 🔥",sel:false},
        ].map((c,i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "8px 10px", background: c.sel ? "#d4af3715" : "#141210", border: `1px solid ${c.sel ? "#d4af3740" : "#2e2820"}`, borderRadius: "6px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: c.sel ? "#d4af37" : "#2e2820", border: `1px solid ${c.sel ? "#d4af37" : "#3d3628"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {c.sel && <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0c0a08" strokeWidth="2" strokeLinecap="round"/></svg>}
            </div>
            <span style={{ fontSize: "11px", color: c.sel ? "#f5f0e0" : "#8a8070", flex: 1, lineHeight: 1.5 }}>&#34;{c.text}&#34;</span>
            <div style={{ padding: "3px 8px", border: "1px solid #2e2820", borderRadius: "4px", fontSize: "10px", color: "#524d45", cursor: "default", flexShrink: 0 }}>Copy</div>
          </div>
        ))}
        <div style={{ marginTop: "4px", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ ...mockBtn, cursor: "default", fontSize: "11px", padding: "7px 14px" }}>Schedule to Instagram →</div>
        </div>
      </div>
    </div>
  ),
  "AI FAQ Builder": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("AI FAQ Builder")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", background: "#0c0a08" }}>
        <div style={{ padding: "14px 16px", borderRight: "1px solid #2e2820" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Business Info</div>
          {[["Services offered","Hair coloring, highlights, cuts, blowouts"],["Hours","Mon–Sat 9am–7pm, Sun 10am–4pm"],["Walk-ins","Yes, based on availability"]].map(([q,a]) => (
            <div key={q as string} style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "3px" }}>{q as string}</div>
              <div style={{ ...mockInput, fontSize: "11px", padding: "6px 10px", color: "#c8c0b0" }}>{a as string}</div>
            </div>
          ))}
          <div style={{ ...mockBtn, textAlign: "center", cursor: "default", marginTop: "4px" }}>Generate FAQs →</div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase" }}>Generated FAQs</div>
            {pill("12 questions","#7aaa6a")}
          </div>
          {[{q:"Do you accept walk-ins?",a:"Yes! Walk-ins are welcome based on stylist availability. Booking ahead is recommended — you can book online 24/7.",open:true},{q:"How long does a color service take?",open:false},{q:"What's your cancellation policy?",open:false},{q:"Do you offer gift cards?",open:false}].map((faq,i) => (
            <div key={i} style={{ borderTop: i > 0 ? "1px solid #1a1714" : undefined, padding: "7px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: faq.open ? "#f5f0e0" : "#8a8070" }}>{faq.q}</div>
                <div style={{ fontSize: "14px", color: "#d4af37", flexShrink: 0 }}>{faq.open ? "−" : "+"}</div>
              </div>
              {faq.open && <div style={{ fontSize: "11px", color: "#8a8070", marginTop: "5px", lineHeight: 1.6 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  "Logo Designer": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Logo Designer", <div style={{ display: "flex", gap: "6px" }}>{pill("AI-Assisted","#9b7fd4")}<div style={{ ...mockBtn, fontSize: "10px", padding: "4px 12px", cursor: "default" }}>Export SVG / PNG</div></div>)}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", background: "#0c0a08" }}>
        <div style={{ padding: "14px 16px", borderRight: "1px solid #2e2820" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Style</div>
          {[["Minimalist","Clean lines, open space"],["Bold","Strong marks, high contrast"],["Elegant","Serif-forward, refined"],["Playful","Rounded, friendly, bright"]].map(([s,d],i) => (
            <div key={s} style={{ padding: "8px 10px", marginBottom: "6px", borderRadius: "6px", background: i === 2 ? "#9b7fd420" : "#141210", border: `1px solid ${i === 2 ? "#9b7fd460" : "#2e2820"}`, cursor: "default" }}>
              <div style={{ fontSize: "12px", fontWeight: i === 2 ? 700 : 400, color: i === 2 ? "#f5f0e0" : "#8a8070" }}>{s}</div>
              <div style={{ fontSize: "10px", color: "#524d45", marginTop: "2px" }}>{d}</div>
            </div>
          ))}
          <div style={{ marginTop: "10px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Business Name</div>
            <div style={{ ...mockInput, fontSize: "12px" }}>Smith Salon</div>
          </div>
          <div style={{ marginTop: "8px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Tagline (optional)</div>
            <div style={{ ...mockInput, fontSize: "12px", color: "#524d45" }}>Where style meets you</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase" }}>Preview</div>
          <div style={{ background: "#141210", borderRadius: "8px", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", border: "1px solid #2e2820" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #9b7fd4, #d4af37)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c0a08" strokeWidth="2" strokeLinecap="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.06em" }}>Smith Salon</div>
            <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9b7fd4" }}>Where style meets you</div>
          </div>
          <div style={{ background: "#0c0a08", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", border: "1px solid #2e2820" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #1a1714, #2e2820)", border: "2px solid #9b7fd4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 900, color: "#9b7fd4" }}>S</div>
            </div>
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.08em" }}>SMITH SALON</div>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {["Light BG","Dark BG","Icon only"].map((v,i) => (
              <div key={v} style={{ flex: 1, padding: "5px", textAlign: "center", fontSize: "10px", borderRadius: "4px", background: i === 0 ? "#9b7fd420" : "#141210", border: `1px solid ${i === 0 ? "#9b7fd450" : "#2e2820"}`, color: i === 0 ? "#9b7fd4" : "#524d45" }}>{v}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "Brand Kit": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Brand Kit · Smith Salon", <div style={{ display: "flex", gap: "6px" }}>{pill("Complete","#7aaa6a")}<div style={{ ...mockBtn, fontSize: "10px", padding: "4px 12px", cursor: "default" }}>Download PDF</div></div>)}
      <div style={{ background: "#0c0a08", padding: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <div style={{ background: "#141210", borderRadius: "8px", padding: "14px", border: "1px solid #2e2820" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Brand Colors</div>
            {[["Primary","#9b7fd4","Lavender Purple"],["Accent","#d4af37","Warm Gold"],["Dark","#1a1714","Near Black"],["Light","#f5f0e0","Warm White"]].map(([name,hex,label]) => (
              <div key={name as string} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "5px", background: hex as string, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "#f5f0e0" }}>{name as string}</div>
                  <div style={{ fontSize: "10px", color: "#524d45", fontFamily: "monospace" }}>{hex as string} · {label as string}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#141210", borderRadius: "8px", padding: "14px", border: "1px solid #2e2820" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Typography</div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "4px" }}>HEADINGS</div>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "#f5f0e0", fontWeight: 700 }}>Cinzel</div>
              <div style={{ fontSize: "10px", color: "#524d45" }}>Aa Bb Cc — 400 600 700</div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "4px" }}>BODY</div>
              <div style={{ fontSize: "15px", color: "#c8c0b0" }}>Inter</div>
              <div style={{ fontSize: "10px", color: "#524d45" }}>Aa Bb Cc — Regular / Medium</div>
            </div>
            <div style={{ padding: "8px 10px", background: "#0c0a08", borderRadius: "5px", border: "1px solid #2e2820" }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", color: "#f5f0e0", marginBottom: "2px" }}>Smith Salon</div>
              <div style={{ fontSize: "11px", color: "#8a8070", lineHeight: 1.5 }}>Where style meets you — premium hair care in Kennesaw.</div>
            </div>
          </div>
        </div>
        <div style={{ background: "#141210", borderRadius: "8px", padding: "14px", border: "1px solid #2e2820" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Logo Variations</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
            {[["Full Logo","#f5f0e0","#1a1714"],["Reverse","#1a1714","#9b7fd4"],["Icon Only","#9b7fd4","#1a1714"],["Monochrome","#f5f0e0","#3a3530"]].map(([label,fg,bg]) => (
              <div key={label as string} style={{ background: bg as string, borderRadius: "6px", padding: "12px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", border: "1px solid #3a3530" }}>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "10px", fontWeight: 700, color: fg as string }}>SS</div>
                <div style={{ fontSize: "9px", color: "#524d45" }}>{label as string}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "Color Palette Tool": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Color Palette Tool")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", background: "#0c0a08" }}>
        <div style={{ padding: "14px 16px", borderRight: "1px solid #2e2820" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Describe Your Brand</div>
          <div style={{ ...mockInput, fontSize: "12px", color: "#c8c0b0", marginBottom: "8px", height: "60px", display: "flex", alignItems: "flex-start", paddingTop: "10px" }}>Luxury salon — warm, welcoming, professional. Upscale but not cold.</div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", marginTop: "10px" }}>Industry</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
            {["Beauty","Health","Food","Retail","Services","Legal","Tech"].map((ind,i) => (
              <div key={ind} style={{ padding: "4px 9px", borderRadius: "4px", fontSize: "11px", background: i === 0 ? "#9b7fd420" : "#141210", border: `1px solid ${i === 0 ? "#9b7fd460" : "#2e2820"}`, color: i === 0 ? "#9b7fd4" : "#524d45" }}>{ind}</div>
            ))}
          </div>
          <div style={{ ...mockBtn, textAlign: "center", cursor: "default", fontSize: "12px" }}>Generate Palette →</div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase" }}>Your Palette</div>
            {pill("AI Generated","#9b7fd4")}
          </div>
          {[
            { name: "Deep Plum", hex: "#4a2c6e", role: "Primary", usage: "Headers, CTAs, key UI" },
            { name: "Warm Gold", hex: "#c9a84c", role: "Accent", usage: "Highlights, buttons" },
            { name: "Blush Rose", hex: "#d4a5a5", role: "Secondary", usage: "Backgrounds, cards" },
            { name: "Cream White", hex: "#f7f2ec", role: "Light", usage: "Page backgrounds" },
            { name: "Charcoal", hex: "#2c2c2c", role: "Dark", usage: "Body text, borders" },
          ].map((c) => (
            <div key={c.hex} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: c.hex, flexShrink: 0, border: "1px solid #2e2820" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#f5f0e0" }}>{c.name}</span>
                  <span style={{ fontSize: "10px", padding: "2px 6px", background: "#9b7fd415", border: "1px solid #9b7fd430", borderRadius: "3px", color: "#9b7fd4" }}>{c.role}</span>
                </div>
                <div style={{ fontSize: "10px", color: "#524d45", fontFamily: "monospace" }}>{c.hex} · {c.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  "Business Card Designer": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Business Card Designer", <div style={{ display: "flex", gap: "6px" }}><div style={{ padding: "4px 10px", border: "1px solid #2e2820", borderRadius: "4px", fontSize: "11px", color: "#8a8070", cursor: "default" }}>Front</div><div style={{ padding: "4px 10px", background: "#d4af3718", border: "1px solid #d4af3740", borderRadius: "4px", fontSize: "11px", color: "#d4af37", cursor: "default" }}>Back</div><div style={{ ...mockBtn, fontSize: "10px", padding: "4px 12px", cursor: "default" }}>Print-Ready PDF</div></div>)}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "16px", background: "#0c0a08" }}>
        {/* Front */}
        <div>
          <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "8px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Front</div>
          <div style={{ background: "linear-gradient(135deg, #1a1714 0%, #2a1e28 100%)", borderRadius: "8px", padding: "20px 16px", aspectRatio: "1.75", display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid #3a2a38" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #9b7fd4, #d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#0c0a08" }}>S</div>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.04em" }}>Smith Salon</div>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#f5f0e0", marginBottom: "2px" }}>Jessica Smith</div>
              <div style={{ fontSize: "10px", color: "#9b7fd4", letterSpacing: "0.08em", textTransform: "uppercase" }}>Lead Stylist & Owner</div>
            </div>
          </div>
        </div>
        {/* Back */}
        <div>
          <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "8px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Back</div>
          <div style={{ background: "#9b7fd4", borderRadius: "8px", padding: "16px", aspectRatio: "1.75", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[["📞","(470) 555-0192"],["✉","jessica@smithsalon.com"],["🌐","smithsalon.purcellventures.co"]].map(([icon,val]) => (
                <div key={val as string} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "9px", color: "#1a0c2e" }}>
                  <span style={{ fontSize: "10px" }}>{icon as string}</span>{val as string}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ fontSize: "9px", color: "#2c1654", letterSpacing: "0.1em", textTransform: "uppercase" }}>Kennesaw, GA</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1px", width: "32px" }}>
                {[1,0,1,0,1, 0,1,0,1,0, 1,0,1,0,1, 0,1,0,1,0, 1,0,1,0,1].map((v,i) => <div key={i} style={{ aspectRatio: "1", background: v ? "#1a0c2e" : "transparent", borderRadius: "1px" }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 16px", background: "#141210", borderTop: "1px solid #2e2820", display: "flex", gap: "16px" }}>
        {[["Standard 3.5×2\"","#7aaa6a"],["Square 2.5×2.5\"","#524d45"],["Mini 3.5×1.5\"","#524d45"]].map(([s,c]) => (
          <div key={s as string} style={{ fontSize: "11px", color: c as string, fontWeight: c === "#7aaa6a" ? 700 : 400 }}>{s as string}</div>
        ))}
      </div>
    </div>
  ),
  "Social Media Templates": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Social Media Templates · Smith Salon", <div style={{ display: "flex", gap: "6px" }}>{pill("12 templates","#7aaa6a")}<div style={{ ...mockBtn, fontSize: "10px", padding: "4px 12px", cursor: "default" }}>Export All</div></div>)}
      <div style={{ background: "#0c0a08", padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {["All","Posts","Stories","Covers","Promos"].map((t,i) => (
            <div key={t} style={{ padding: "4px 10px", borderRadius: "4px", fontSize: "11px", background: i === 0 ? "#9b7fd420" : "#141210", border: `1px solid ${i === 0 ? "#9b7fd460" : "#2e2820"}`, color: i === 0 ? "#9b7fd4" : "#524d45" }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {[
            { label: "Promo Post", bg: "linear-gradient(135deg, #4a2c6e, #9b7fd4)", aspect: "1", icon: "⭐", text: "20% Off Today" },
            { label: "Before/After", bg: "linear-gradient(135deg, #1a1714, #2a1e28)", aspect: "1", icon: "✂", text: "Transformation" },
            { label: "Story CTA", bg: "linear-gradient(160deg, #9b7fd4, #d4af37)", aspect: "0.56", icon: "📲", text: "Book Now" },
            { label: "Cover Photo", bg: "linear-gradient(90deg, #1a1714, #4a2c6e)", aspect: "2.6", icon: "💫", text: "Smith Salon" },
            { label: "Quote Post", bg: "linear-gradient(135deg, #c9a84c, #d4af37)", aspect: "1", icon: "❝", text: "Client Love" },
            { label: "New Service", bg: "linear-gradient(135deg, #2a1e28, #4a2c6e)", aspect: "1", icon: "✨", text: "Now Offering" },
            { label: "Holiday", bg: "linear-gradient(135deg, #1a3a2a, #2a5a3a)", aspect: "1", icon: "🎄", text: "Happy Holidays" },
            { label: "Team Intro", bg: "linear-gradient(135deg, #3a2a1e, #6a4a2e)", aspect: "1", icon: "👤", text: "Meet the Team" },
          ].map((t) => (
            <div key={t.label} style={{ background: t.bg, borderRadius: "6px", aspectRatio: t.aspect, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", border: "1px solid #2e2820", overflow: "hidden", position: "relative" }}>
              <span style={{ fontSize: t.aspect === "2.6" ? "12px" : "16px" }}>{t.icon}</span>
              <div style={{ fontSize: "8px", fontWeight: 700, color: "#f5f0e0", textAlign: "center", letterSpacing: "0.04em", lineHeight: 1.3 }}>{t.text}</div>
              <div style={{ position: "absolute", bottom: "4px", right: "4px", fontSize: "7px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>{t.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "10px", padding: "8px 12px", background: "#141210", borderRadius: "6px", fontSize: "11px", color: "#8a8070", display: "flex", justifyContent: "space-between" }}>
          <span>All templates use your brand colors & logo</span>
          <span style={{ color: "#9b7fd4", fontWeight: 600 }}>Edit in Canva or Figma →</span>
        </div>
      </div>
    </div>
  ),
  "Online Estimating": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Estimate #042", <div style={{ display: "flex", gap: "6px" }}>{pill("Draft","#e8a030")}<div style={{ padding: "4px 10px", border: "1px solid #2e2820", borderRadius: "4px", fontSize: "11px", color: "#8a8070", cursor: "default" }}>Send</div><div style={mockBtn}>Convert to Invoice</div></div>)}
      <div style={{ background: "#0c0a08", padding: "12px 16px", borderBottom: "1px solid #2e2820", display: "flex", gap: "24px" }}>
        <div><div style={{ fontSize: "10px", color: "#524d45", marginBottom: "2px" }}>CLIENT</div><div style={{ fontSize: "12px", fontWeight: 600, color: "#f5f0e0" }}>Robert Johnson</div><div style={{ fontSize: "11px", color: "#524d45" }}>4281 Oak Street, Kennesaw</div></div>
        <div><div style={{ fontSize: "10px", color: "#524d45", marginBottom: "2px" }}>VALID UNTIL</div><div style={{ fontSize: "12px", color: "#c8c0b0" }}>March 30, 2026</div></div>
      </div>
      <div style={{ background: "#0c0a08" }}>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr", padding: "7px 14px", background: "#141210", borderBottom: "1px solid #2e2820" }}>
          {["Description","Qty","Unit Price","Total"].map(h => <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#524d45", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>)}
        </div>
        {[["Gutter Cleaning — 200 lin ft","200","$1.40","$280.00"],["Downspout Flush","4","$20.00","$80.00"],["Travel Fee","1","$25.00","$25.00"]].map((row,i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr", padding: "9px 14px", borderBottom: "1px solid #141210" }}>
            <span style={{ fontSize: "12px", color: "#c8c0b0" }}>{row[0]}</span>
            <span style={{ fontSize: "12px", color: "#8a8070" }}>{row[1]}</span>
            <span style={{ fontSize: "12px", color: "#8a8070" }}>{row[2]}</span>
            <span style={{ fontSize: "12px", color: "#d4af37", fontWeight: 600 }}>{row[3]}</span>
          </div>
        ))}
        <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", borderTop: "1px solid #2e2820" }}>
          <div style={{ display: "flex", gap: "24px" }}><span style={{ fontSize: "12px", color: "#524d45" }}>Subtotal</span><span style={{ fontSize: "12px", color: "#c8c0b0" }}>$385.00</span></div>
          <div style={{ display: "flex", gap: "24px" }}><span style={{ fontSize: "12px", color: "#524d45" }}>Tax (8%)</span><span style={{ fontSize: "12px", color: "#c8c0b0" }}>$30.80</span></div>
          <div style={{ display: "flex", gap: "24px", marginTop: "4px" }}><span style={{ fontSize: "14px", fontWeight: 700, color: "#f5f0e0" }}>Total</span><span style={{ fontSize: "20px", fontWeight: 800, color: "#d4af37" }}>$415.80</span></div>
        </div>
      </div>
    </div>
  ),
  "Online Invoicing": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Invoice #018", <div style={{ display: "flex", gap: "6px" }}>{pill("Unpaid","#e8a030")}<div style={{ padding: "4px 10px", border: "1px solid #2e2820", borderRadius: "4px", fontSize: "11px", color: "#8a8070" }}>Send Reminder</div></div>)}
      <div style={{ background: "#0c0a08", padding: "16px", borderBottom: "1px solid #2e2820", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#524d45", marginBottom: "6px" }}>Bill To</div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#f5f0e0" }}>Mark Rivera</div>
          <div style={{ fontSize: "11px", color: "#524d45" }}>Rivera Properties · mark@riveraprops.com</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "4px" }}>Issued Mar 3 · Due Mar 17</div>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 900, color: "#d4af37", lineHeight: 1 }}>$450</div>
          <div style={{ fontSize: "11px", color: "#8a8070" }}>due in 14 days</div>
        </div>
      </div>
      <div style={{ background: "#0c0a08" }}>
        {[["Gutter Cleaning (200 lin ft)","$280.00"],["Downspout Flush (4)","$80.00"],["Same-day surcharge","$90.00"]].map(([d,p]) => (
          <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "8px 16px", borderBottom: "1px solid #141210", fontSize: "12px" }}>
            <span style={{ color: "#c8c0b0" }}>{d}</span>
            <span style={{ color: "#d4af37", fontWeight: 600 }}>{p}</span>
          </div>
        ))}
        <div style={{ padding: "12px 16px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#f5f0e0" }}>Total Due</span>
          <span style={{ fontSize: "24px", fontWeight: 800, color: "#d4af37" }}>$450.00</span>
        </div>
      </div>
      <div style={{ background: "#0c0a08", padding: "12px 16px", borderTop: "1px solid #2e2820", display: "flex", justifyContent: "center" }}>
        <div style={{ ...mockBtn, padding: "10px 32px", fontSize: "13px", cursor: "default" }}>Pay with Stripe →</div>
      </div>
    </div>
  ),
  "Expense Tracker": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Expense Tracker · March 2026", <div style={{ display: "flex", gap: "6px" }}>{pill("$1,847 this month","#e8a030")}<div style={{ padding: "4px 10px", background: "#7aaa6a18", border: "1px solid #7aaa6a40", borderRadius: "4px", fontSize: "11px", color: "#7aaa6a", cursor: "default" }}>Export CSV</div></div>)}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", background: "#0c0a08" }}>
        <div style={{ borderRight: "1px solid #2e2820" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr", padding: "7px 14px", background: "#141210", borderBottom: "1px solid #2e2820" }}>
            {["Date","Description","Category","Amount"].map(h => <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#524d45", letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</span>)}
          </div>
          {[
            ["Mar 3","Gutter Supplies","Supplies","$342","#e8a030"],
            ["Mar 2","Fuel — BP Station","Fuel","$87","#8a8070"],
            ["Mar 1","Claude AI Sub","Software","$20","#8a8070"],
            ["Feb 28","Pressure Washer Parts","Equipment","$215","#e8a030"],
            ["Feb 27","Fuel — Shell","Fuel","$64","#8a8070"],
            ["Feb 26","Business Cards","Marketing","$38","#8a8070"],
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr", padding: "8px 14px", borderBottom: "1px solid #141210", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "#524d45" }}>{row[0]}</span>
              <span style={{ fontSize: "11px", color: "#c8c0b0" }}>{row[1]}</span>
              <span style={{ fontSize: "10px", padding: "2px 6px", background: "#d4af3712", borderRadius: "3px", color: "#d4af37", display: "inline-block" }}>{row[2]}</span>
              <span style={{ fontSize: "12px", color: row[4], fontWeight: 600 }}>{row[3]}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#8a8070", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Monthly Breakdown</div>
          {[
            { cat: "Supplies", amt: 682, budget: 800, pct: 85 },
            { cat: "Equipment", amt: 540, budget: 600, pct: 90 },
            { cat: "Fuel", amt: 310, budget: 350, pct: 89 },
            { cat: "Marketing", amt: 253, budget: 300, pct: 84 },
            { cat: "Software", amt: 62, budget: 100, pct: 62 },
          ].map((e) => (
            <div key={e.cat} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                <span style={{ color: "#c8c0b0" }}>{e.cat}</span>
                <span style={{ color: e.pct > 88 ? "#e8a030" : "#7aaa6a", fontWeight: 600 }}>${e.amt}</span>
              </div>
              <div style={{ height: "4px", background: "#1a1714", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: `${e.pct}%`, height: "100%", background: e.pct > 88 ? "#e8a030" : "#7aaa6a", borderRadius: "2px" }} />
              </div>
              <div style={{ fontSize: "9px", color: "#3a3530", marginTop: "2px" }}>Budget ${e.budget}</div>
            </div>
          ))}
          <div style={{ marginTop: "10px", padding: "10px 12px", background: "#141210", borderRadius: "6px", borderTop: "2px solid #d4af3740" }}>
            <div style={{ fontSize: "10px", color: "#524d45", marginBottom: "2px", letterSpacing: "0.06em" }}>TOTAL THIS MONTH</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#d4af37" }}>$1,847</div>
            <div style={{ fontSize: "10px", color: "#7aaa6a", marginTop: "4px" }}>↓ 12% vs last month · Tax-ready export</div>
          </div>
        </div>
      </div>
    </div>
  ),
  "Inventory Tracker": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Inventory Tracker · Smith Salon", <div style={{ display: "flex", gap: "6px" }}>{pill("2 low stock","#e05c5c")}<div style={{ padding: "4px 10px", background: "#d4af3718", border: "1px solid #d4af3740", borderRadius: "4px", fontSize: "11px", color: "#d4af37", cursor: "default" }}>+ Add Item</div></div>)}
      <div style={{ background: "#0c0a08" }}>
        <div style={{ margin: "12px 14px", padding: "10px 14px", background: "#e05c5c12", border: "1px solid #e05c5c40", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span style={{ fontSize: "12px", color: "#e05c5c", fontWeight: 600 }}>2 items below reorder threshold — order soon</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px", padding: "7px 14px", background: "#141210", borderBottom: "1px solid #2e2820" }}>
          {["Product","SKU","In Stock","Reorder At","Status"].map(h => <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#524d45", letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</span>)}
        </div>
        {[
          { name: "Shampoo (Pro Grade)", sku: "SH-001", stock: 14, reorder: 10, low: false },
          { name: "Bleach Powder 500g",  sku: "BP-003", stock: 3,  reorder: 8,  low: true  },
          { name: "Developer 20vol",     sku: "DV-020", stock: 22, reorder: 10, low: false },
          { name: "Foils (500ct Box)",   sku: "FO-500", stock: 2,  reorder: 5,  low: true  },
          { name: "Color — Ash Blonde",  sku: "HC-AB7", stock: 18, reorder: 10, low: false },
          { name: "Gloves (100ct Box)",  sku: "GL-100", stock: 47, reorder: 20, low: false },
        ].map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px", padding: "9px 14px", borderBottom: "1px solid #141210", alignItems: "center", background: item.low ? "#e05c5c08" : "transparent" }}>
            <span style={{ fontSize: "12px", color: item.low ? "#f5f0e0" : "#c8c0b0", fontWeight: item.low ? 600 : 400 }}>{item.name}</span>
            <span style={{ fontSize: "11px", color: "#524d45", fontFamily: "monospace" }}>{item.sku}</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: item.low ? "#e05c5c" : item.stock > item.reorder * 1.5 ? "#7aaa6a" : "#c8c0b0" }}>{item.stock}</span>
            <span style={{ fontSize: "11px", color: "#524d45" }}>{item.reorder}</span>
            {item.low
              ? <span style={{ fontSize: "10px", padding: "3px 7px", background: "#e05c5c18", border: "1px solid #e05c5c40", borderRadius: "4px", color: "#e05c5c", fontWeight: 600 }}>Reorder</span>
              : <span style={{ fontSize: "10px", padding: "3px 7px", background: "#7aaa6a18", border: "1px solid #7aaa6a40", borderRadius: "4px", color: "#7aaa6a" }}>In Stock</span>
            }
          </div>
        ))}
        <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#141210" }}>
          <span style={{ fontSize: "11px", color: "#524d45" }}>6 products · Last updated 2 min ago</span>
          <div style={{ padding: "5px 12px", border: "1px solid #2e2820", borderRadius: "4px", fontSize: "11px", color: "#8a8070", cursor: "default" }}>Export CSV</div>
        </div>
      </div>
    </div>
  ),
  "Staff Scheduler": (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2e2820" }}>
      {appChrome("Staff Scheduler · Week of Mar 10–14", <div style={{ display: "flex", gap: "6px" }}><div style={{ padding: "4px 10px", background: "#1a1714", border: "1px solid #2e2820", borderRadius: "4px", fontSize: "11px", color: "#8a8070", cursor: "default" }}>‹ Prev</div><div style={{ padding: "4px 10px", background: "#d4af37", borderRadius: "4px", fontSize: "11px", fontWeight: 700, color: "#0c0a08", cursor: "default" }}>Publish</div></div>)}
      <div style={{ background: "#0c0a08" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px repeat(5, 1fr) 52px", background: "#141210", borderBottom: "1px solid #2e2820" }}>
          <div style={{ padding: "8px 10px" }} />
          {[["Mon","10"],["Tue","11"],["Wed","12"],["Thu","13"],["Fri","14"]].map(([d,n]) => (
            <div key={d} style={{ padding: "8px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#8a8070" }}>{d}</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#d4af37" }}>{n}</div>
            </div>
          ))}
          <div style={{ padding: "8px 6px", textAlign: "center", fontSize: "10px", fontWeight: 700, color: "#524d45", letterSpacing: "0.05em", display: "flex", alignItems: "center", justifyContent: "center" }}>HRS</div>
        </div>
        {[
          { name: "Jessica", avatar: "J", color: "#d4af37", hrs: 32, shifts: [["9–5","m"],["9–5","m"],["OFF","o"],["10–6","e"],["9–3","m"]] },
          { name: "Maria",   avatar: "M", color: "#c9a87c", hrs: 32, shifts: [["10–6","e"],["OFF","o"],["9–5","m"],["9–5","m"],["10–6","e"]] },
          { name: "Tyler",   avatar: "T", color: "#b8956a", hrs: 24, shifts: [["OFF","o"],["10–7","e"],["10–7","e"],["OFF","o"],["9–5","m"]] },
          { name: "Priya",   avatar: "P", color: "#7aaa6a", hrs: 16, shifts: [["9–1","m"],["9–1","m"],["9–1","m"],["9–1","m"],["OFF","o"]] },
        ].map((staff) => (
          <div key={staff.name} style={{ display: "grid", gridTemplateColumns: "90px repeat(5, 1fr) 52px", borderBottom: "1px solid #141210" }}>
            <div style={{ padding: "10px", display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: `${staff.color}20`, border: `1.5px solid ${staff.color}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: staff.color, flexShrink: 0 }}>{staff.avatar}</div>
              <span style={{ fontSize: "12px", color: "#c8c0b0", fontWeight: 600 }}>{staff.name}</span>
            </div>
            {staff.shifts.map(([label, type], j) => (
              <div key={j} style={{ padding: "8px 5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ padding: "4px 4px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, textAlign: "center", width: "100%",
                  background: type === "o" ? "#141210" : type === "m" ? "#d4af3715" : "#7aaa6a12",
                  border: `1px solid ${type === "o" ? "#1e1c18" : type === "m" ? "#d4af3730" : "#7aaa6a30"}`,
                  color: type === "o" ? "#2e2820" : type === "m" ? "#d4af37" : "#7aaa6a",
                }}>{type === "o" ? "OFF" : label}</div>
              </div>
            ))}
            <div style={{ padding: "10px 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: staff.hrs >= 32 ? "#d4af37" : "#8a8070" }}>{staff.hrs}h</span>
            </div>
          </div>
        ))}
        <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#141210" }}>
          <span style={{ fontSize: "11px", color: "#524d45" }}>4 staff · 17 shifts scheduled</span>
          <div style={{ display: "flex", gap: "10px" }}>
            {[["morning","#d4af37"],["evening","#7aaa6a"]].map(([l,c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#524d45" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: (c as string) + "40", border: `1px solid ${c}60` }} />{l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// ── TOOL PREVIEW MODAL ────────────────────────────────────────────────────────

function ToolPreviewModal({ tool, onClose }: { tool: string | null; onClose: () => void }) {
  if (!tool) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-warm-card)",
          border: "1px solid var(--color-warm-border)",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "920px",
          maxHeight: "85vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Modal header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--color-warm-border)" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px" }}>Preview</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-warm-text)" }}>{tool}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "1px solid var(--color-warm-border)", borderRadius: "6px", color: "var(--color-warm-text-muted)", fontSize: "18px", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            ×
          </button>
        </div>
        {/* Modal body */}
        <div style={{ padding: "24px" }}>
          {TOOL_PREVIEWS[tool] ?? (
            <div style={{ fontSize: "14px", color: "var(--color-warm-text-muted)" }}>Preview coming soon.</div>
          )}
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)" }}>This is a simplified mockup of the real tool.</span>
          <a href="#contact" onClick={onClose} style={{ padding: "9px 20px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "13px", fontWeight: 700, borderRadius: "6px", textDecoration: "none" }}>
            Get This Tool →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── MISC HELPERS ──────────────────────────────────────────────────────────────

const borderCell: React.CSSProperties = {
  boxShadow: "inset -1px -1px 0 var(--color-warm-border)",
  padding: "24px 28px",
  background: "var(--color-warm-bg)",
  transition: "background 0.15s",
  cursor: "pointer",
  position: "relative",
};

// Floating dashboard cards — inline graphic, no external assets needed
function DashboardGraphic() {
  const card: React.CSSProperties = {
    background: "#1a1714",
    border: "1px solid #2e2820",
    borderRadius: "10px",
    padding: "14px 18px",
    position: "absolute",
    minWidth: "210px",
  };
  const label: React.CSSProperties = { fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8070", marginBottom: "6px" };
  const value: React.CSSProperties = { fontSize: "16px", fontWeight: 700, color: "#f5f0e0" };
  const sub: React.CSSProperties = { fontSize: "12px", color: "#8a8070", marginTop: "2px" };
  const dot = (color: string) => ({ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: color, marginRight: "6px" } as React.CSSProperties);

  return (
    <div style={{ position: "relative", width: "100%", height: "420px", minWidth: "320px" }}>

      {/* Booking card — top left */}
      <div style={{ ...card, top: "30px", left: "0px", transform: "rotate(-2deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={label}>New Booking</div>
        <div style={value}>Sarah M. — Highlights</div>
        <div style={sub}>Tomorrow at 10:30am · $120</div>
        <div style={{ marginTop: "10px", padding: "6px 10px", background: "#d4af3720", border: "1px solid #d4af3740", borderRadius: "5px", fontSize: "12px", color: "#d4af37", display: "inline-block" }}>
          Confirmed ✓
        </div>
      </div>

      {/* Invoice card — right */}
      <div style={{ ...card, top: "110px", right: "0px", transform: "rotate(1.5deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={label}>Payment Received</div>
        <div style={{ fontSize: "28px", fontWeight: 800, color: "#d4af37", letterSpacing: "-0.02em" }}>$450.00</div>
        <div style={sub}>Mark Rivera · Gutter cleaning</div>
        <div style={{ marginTop: "8px", display: "flex", gap: "6px", alignItems: "center" }}>
          <span style={dot("#7aaa6a")} />
          <span style={{ fontSize: "12px", color: "#7aaa6a" }}>Paid via Stripe</span>
        </div>
      </div>

      {/* Review card — bottom left */}
      <div style={{ ...card, bottom: "40px", left: "20px", transform: "rotate(-1.25deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={label}>New Google Review</div>
        <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#d4af37"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ))}
        </div>
        <div style={{ fontSize: "13px", color: "#f5f0e0", fontStyle: "italic", lineHeight: 1.5 }}>"Best salon I've been to. Absolutely love my highlights."</div>
        <div style={{ fontSize: "11px", color: "#8a8070", marginTop: "6px" }}>— Ashley T.</div>
      </div>

      {/* AI caption card — floats above container top-right */}
      <div style={{ ...card, top: "-70px", right: "0px", transform: "rotate(2deg)", padding: "12px 16px", minWidth: "180px", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
        <div style={label}>AI Caption Ready</div>
        <div style={{ fontSize: "12px", color: "#f5f0e0", lineHeight: 1.5 }}>"Walk-ins welcome today — stop in and treat yourself ✨"</div>
        <div style={{ fontSize: "11px", color: "#d4af37", marginTop: "6px", fontWeight: 600 }}>5 options generated</div>
      </div>

      {/* Subtle glow behind cards */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #d4af3708 0%, transparent 70%)", pointerEvents: "none" }} />
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function DigitalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [previewTool, setPreviewTool] = useState<string | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-warm-bg)" }}>

      {/* Navigation */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(12,10,8,0.94)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-warm-border)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="/" style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>← Home</a>
            <span style={{ color: "var(--color-warm-border-light)" }}>|</span>
            <a href="/digital" style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-warm-text)", textDecoration: "none", letterSpacing: "0.04em", fontFamily: "'Cinzel', Georgia, serif" }}>
              Purcell <span style={{ color: "var(--color-warm-accent)" }}>Digital</span>
            </a>
          </div>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "24px" }} className="hidden-mobile">
              {[["Services", "services"], ["Pricing", "pricing"], ["Contact", "contact"]].map(([label, id]) => (
                <a key={id} href={`#${id}`} style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-warm-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-warm-text-muted)")}
                >{label}</a>
              ))}
            </div>
            <a href="#contact" style={{ padding: "8px 18px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "13px", fontWeight: 600, borderRadius: "6px", textDecoration: "none" }}>
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="grid-responsive">
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>
              Purcell Ventures — Digital Services
            </p>
            <h1 style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 700,
              lineHeight: 1.08, letterSpacing: "0.03em",
              color: "var(--color-warm-text)", marginBottom: "24px",
            }}>
              Your entire<br />online presence.<br />
              <span style={{ color: "var(--color-warm-accent)" }}>Built with you.</span>
            </h1>
            <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", maxWidth: "460px", lineHeight: 1.75, marginBottom: "36px" }}>
              Websites, booking, CRM, chatbots, and more — built around your business, your input, your approval. Starting at $75/month.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#contact" style={{ padding: "13px 28px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "7px", textDecoration: "none" }}>
                Book a Free Demo
              </a>
              <a href="#pricing" style={{ padding: "13px 24px", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", fontSize: "14px", fontWeight: 500, borderRadius: "7px", textDecoration: "none" }}>
                See Pricing
              </a>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", gap: "36px", marginTop: "52px", flexWrap: "wrap", borderTop: "1px solid var(--color-warm-border)", paddingTop: "32px" }}>
              {[{ n: "$75", label: "starting/mo" }, { n: "25+", label: "tools" }, { n: "AI", label: "in every tool" }, { n: "24hr", label: "response" }].map(({ n, label }) => (
                <div key={label}>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--color-warm-text)", letterSpacing: "-0.02em", fontFamily: "'Cinzel', Georgia, serif" }}>{n}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "2px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Graphic */}
          <div className="hidden-mobile" style={{ position: "relative" }}>
            <DashboardGraphic />
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section id="services" style={{ padding: "100px 24px", borderTop: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Tools</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.03em", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, marginBottom: "64px", lineHeight: 1.1 }}>
            25 tools. One partner.<br />Mix and match what you need.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
            {MODULES.map((group) => (
              <div key={group.category}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", opacity: 0.85 }}>
                  {group.category}
                </p>
                {/* Box-shadow border approach: no grey orphan cells */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  border: "1px solid var(--color-warm-border)",
                }}>
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        ...borderCell,
                        background: hoveredTool === item.name ? "var(--color-warm-card)" : "var(--color-warm-bg)",
                      }}
                      onMouseEnter={() => setHoveredTool(item.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                      onClick={() => setPreviewTool(item.name)}
                    >
                      <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "7px", color: "var(--color-warm-text)", letterSpacing: "0.02em" }}>{item.name}</h4>
                      <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.65 }}>{item.desc}</p>
                      {hoveredTool === item.name && (
                        <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-warm-accent)", marginTop: "10px", letterSpacing: "0.04em" }}>
                          Preview →
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM BUILDER ──────────────────────────────────────────── */}
      <TeamBuilder />

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "100px 24px", borderTop: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Pricing</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.03em", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, marginBottom: "12px", lineHeight: 1.1 }}>
            Flat monthly rate.<br />No surprises.
          </h2>
          <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", marginBottom: "52px" }}>
            One-time setup fee, then a flat monthly rate. No contracts. Cancel anytime.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", border: "1px solid var(--color-warm-border)" }}>
            {PRICING.map((plan) => (
              <div key={plan.name} style={{
                background: plan.highlight ? "var(--color-warm-accent)" : "var(--color-warm-card)",
                padding: "40px 36px",
                boxShadow: "inset -1px -1px 0 rgba(0,0,0,0.15)",
                display: "flex", flexDirection: "column",
              }}>
                {plan.highlight && (
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-warm-bg)", background: "rgba(0,0,0,0.15)", display: "inline-block", padding: "3px 10px", borderRadius: "4px", marginBottom: "20px", alignSelf: "flex-start" }}>
                    Most Popular
                  </div>
                )}
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: plan.highlight ? "rgba(12,10,8,0.6)" : "var(--color-warm-accent)", marginBottom: "12px" }}>
                  {plan.name}
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "52px", fontWeight: 900, letterSpacing: "-0.03em", color: plan.highlight ? "#0c0a08" : "var(--color-warm-text)", lineHeight: 1 }}>${plan.price}</span>
                  <span style={{ fontSize: "14px", color: plan.highlight ? "rgba(12,10,8,0.6)" : "var(--color-warm-text-muted)", paddingBottom: "10px" }}>/mo</span>
                </div>
                <p style={{ fontSize: "12px", color: plan.highlight ? "rgba(12,10,8,0.55)" : "var(--color-warm-text-muted)", marginBottom: "20px" }}>+ ${plan.setup} one-time setup</p>
                <p style={{ fontSize: "14px", color: plan.highlight ? "rgba(12,10,8,0.7)" : "var(--color-warm-text-muted)", marginBottom: "24px", lineHeight: 1.6 }}>{plan.tagline}</p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "32px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: plan.highlight ? "rgba(12,10,8,0.85)" : "var(--color-warm-text-muted)" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}>
                        <path d="M3 8l3.5 3.5L13 5" stroke={plan.highlight ? "#0c0a08" : "var(--color-warm-accent)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" style={{ display: "block", textAlign: "center", padding: "13px 24px", background: plan.highlight ? "#0c0a08" : "var(--color-warm-accent)", color: plan.highlight ? "var(--color-warm-accent)" : "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "6px", textDecoration: "none" }}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ────────────────────────────────────────── */}
      <ROICalculator />

      {/* ── CUSTOM BUNDLE ─────────────────────────────────────────── */}
      <section style={{ padding: "0 24px", borderTop: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: "48px", alignItems: "center",
            padding: "64px 56px",
            background: "var(--color-warm-card)",
            border: "1px solid var(--color-warm-border)",
            borderTop: "none",
          }} className="grid-responsive">
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>
                Custom Bundle
              </p>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.03em", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                Don't fit in a box?<br />Good. Neither do most businesses.
              </h2>
              <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.75, maxWidth: "520px" }}>
                Pick exactly what you need — two tools or twelve. I'll build the bundle, quote you a flat monthly price, and we'll get started. No upsells, no surprises.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
              <a href="#contact" style={{ padding: "14px 32px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
                Build My Bundle →
              </a>
              <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textAlign: "center", width: "100%" }}>You guide it · You approve it · You own it</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ME / ABOUT ────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", borderTop: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="grid-responsive">
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Why Me</p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.03em", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, marginBottom: "44px", lineHeight: 1.15 }}>
              A local partner beats a national agency every time.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {[
                { title: "You talk to the person who built it", desc: "No support tickets, no account managers, no runaround. You text or call me directly." },
                { title: "AI built in from day one", desc: "A chatbot that knows your business, captions that sound like you, content that doesn't take hours to write." },
                { title: "Cheaper than any agency. Better than DIY.", desc: "Agencies charge $2,000+/month. Wix can't do half of what I offer. You get professional tools at a price that makes sense." },
                { title: "Everything is yours", desc: "The code, the domain, the content — all of it. You're not locked in. I hand it over the moment you ask." },
              ].map((point) => (
                <div key={point.title} style={{ paddingLeft: "20px", borderLeft: "2px solid var(--color-warm-border-light)" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "5px" }}>{point.title}</h4>
                  <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7 }}>{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: "10px", padding: "40px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "24px" }}>About Me</p>
            <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "20px" }}>
              I'm Elijah Purcell — 18 years old, founded Purcell Ventures LLC, and heading to the University of Alabama in fall 2026.
            </p>
            <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "20px" }}>
              I started this business running gutters, pressure washing, and lawn care — so I understand what small businesses actually need. Not buzzwords. Real tools that save time, bring in customers, and make the operation run smoother.
            </p>
            <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.85 }}>
              I use the same AI development tools that engineers at top tech companies use — which means you get professional-grade work, fast, at a price that makes sense for a small business.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", borderTop: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>FAQ</p>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.03em", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, marginBottom: "52px", lineHeight: 1.1 }}>
            Common questions.
          </h2>
          <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column" }}>
            {FAQ.map((item, i) => (
              <div key={item.q} style={{ borderTop: "1px solid var(--color-warm-border)", padding: "20px 0" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "16px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-warm-text)", lineHeight: 1.5 }}>{item.q}</span>
                  <span style={{ fontSize: "22px", color: "var(--color-warm-accent)", flexShrink: 0, display: "block", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.8, marginTop: "12px", paddingRight: "32px" }}>{item.a}</p>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--color-warm-border)" }} />
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "100px 24px", borderTop: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }} className="grid-responsive">
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px" }}>Contact</p>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.03em", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginBottom: "20px", lineHeight: 1.08 }}>
              Ready to talk?
            </h2>
            <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.8, marginBottom: "40px" }}>
              Tell me about your business. I'll get back to you within 24 hours with a recommendation and a quote. No pressure, no pitch deck.
            </p>
            <a href="mailto:elijah@purcell-ventures.com" style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-warm-text-muted)", textDecoration: "none", fontSize: "14px", marginBottom: "12px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-warm-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              elijah@purcell-ventures.com
            </a>
            <span style={{ fontSize: "13px", color: "var(--color-warm-text-muted)" }}>Based in Georgia · responds within 24 hours</span>
          </div>
          <div style={{ background: "var(--color-warm-card)", border: "1px solid var(--color-warm-border)", borderRadius: "10px", padding: "40px" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "18px" }} onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {[{ label: "Your name", placeholder: "Jane Smith" }, { label: "Business name", placeholder: "Smith Salon" }].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--color-warm-text-muted)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                    <input type="text" placeholder={placeholder} style={{ width: "100%", padding: "10px 13px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", borderRadius: "6px", color: "var(--color-warm-text)", fontSize: "14px", outline: "none" }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--color-warm-text-muted)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Email or phone</label>
                <input type="text" placeholder="jane@smithsalon.com or (770) 555-0100" style={{ width: "100%", padding: "10px 13px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", borderRadius: "6px", color: "var(--color-warm-text)", fontSize: "14px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--color-warm-text-muted)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>What do you need?</label>
                <textarea rows={4} placeholder="Tell me about your business and what you're trying to solve..." style={{ width: "100%", padding: "10px 13px", resize: "none", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", borderRadius: "6px", color: "var(--color-warm-text)", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "var(--color-warm-text-muted)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Best fit?</label>
                <select style={{ width: "100%", padding: "10px 13px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", borderRadius: "6px", color: "var(--color-warm-text-muted)", fontSize: "14px", outline: "none" }}>
                  <option value="">Not sure — help me pick</option>
                  <option value="starter">Starter ($75/mo) — Website + Chatbot</option>
                  <option value="growth">Growth ($125/mo) — + Booking + Marketing</option>
                  <option value="full">Full Service ($175/mo) — Everything</option>
                  <option value="custom">Custom — I'll tell you what I need</option>
                </select>
              </div>
              <button type="submit" style={{ padding: "13px 28px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", fontSize: "14px", fontWeight: 700, border: "none", borderRadius: "6px", cursor: "pointer", alignSelf: "flex-start" }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px", borderTop: "1px solid var(--color-warm-border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "var(--color-warm-text-muted)" }}><strong style={{ color: "var(--color-warm-text)" }}>Purcell Ventures LLC</strong> · Georgia · {new Date().getFullYear()}</span>
          <span style={{ fontSize: "12px", color: "var(--color-warm-text-light)" }}>purcellventures.co/digital</span>
        </div>
      </footer>

      {/* Tool Preview Modal */}
      <ToolPreviewModal tool={previewTool} onClose={() => setPreviewTool(null)} />

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .grid-responsive { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
