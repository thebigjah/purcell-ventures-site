"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "./_components/PortalNav";
import { loadContacts, loadTasks, isAdmin, filterTasksByOwner, overdueTasks, todayTasks, type Task, type Contact, type Activity, ACTIVITY_ICONS } from "@/lib/crm-storage";

interface PersonalMetrics {
  monthWonValue: number;
  monthWonCount: number;
  allTimeWinRate: number;
  avgDealSize: number;
  bestSource: string | null;
}

interface FeedItem {
  contactId: string;
  contactName: string;
  ownerName: string;
  activity: Activity;
}

const QUICK_LINKS = [
  {
    href: "/rep-portal/crm",
    title: "CRM",
    desc: "Contacts, pipeline, activity timeline, tasks, reports. Where every deal lives. Commission gets paid on what's logged here.",
  },
  {
    href: "/rep-portal/ask",
    title: "Ask the AI assistant",
    desc: "Mid-pitch? Type the question, get a tactical answer in seconds. Knows pricing, scripts, escalation rules.",
  },
  {
    href: "/rep-portal/pricing",
    title: "Pricing reference",
    desc: "Source of truth for every price you quote. Bookmark this.",
  },
  {
    href: "/rep-portal/products",
    title: "Product encyclopedia",
    desc: "Per-product deep dives: what it is, who buys, common objections, what to say.",
  },
  {
    href: "/rep-portal/scripts",
    title: "Pitch scripts",
    desc: "Frameworks for soft close, demo close, objection handling, follow-up.",
  },
  {
    href: "/digital/tools",
    title: "Demo our tools",
    desc: "Live tools you can show prospects. Plug their business in, show the output.",
  },
];

const RECENT = [
  { date: "2026-05-24", note: "Portal launched. Pricing reflects current site ($99/$179/$279 Digital, $175/hr consulting)." },
  { date: "2026-05-24", note: "Mantle Field Services is low-priority for reps — most jobs run direct by family. Focus on Digital, Consulting, Custom, Courses." },
];

export default function RepPortalDashboard() {
  const [overdue, setOverdue] = useState<Task[]>([]);
  const [today, setToday] = useState<Task[]>([]);
  const [ownerName, setOwnerName] = useState("");
  const [contactCount, setContactCount] = useState(0);
  const [openValue, setOpenValue] = useState(0);
  const [personalMetrics, setPersonalMetrics] = useState<PersonalMetrics | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    const name = cookie ? decodeURIComponent(cookie.split("=")[1] || "") : "";
    setOwnerName(name);

    const allContacts: Contact[] = loadContacts();
    const allTasks: Task[] = loadTasks();
    const admin = isAdmin(name);
    const myTasks = admin ? allTasks : filterTasksByOwner(allTasks, allContacts, name);
    const myContacts = admin ? allContacts : allContacts.filter((c) => c.ownerName === name);

    setOverdue(overdueTasks(myTasks));
    setToday(todayTasks(myTasks));
    setContactCount(myContacts.length);
    setOpenValue(myContacts.filter((c) => c.stage !== "Closed Won" && c.stage !== "Closed Lost").reduce((s, c) => s + c.estimatedValue, 0));

    // Personal metrics
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const wonContacts = myContacts.filter((c) => c.stage === "Closed Won");
    const lostContacts = myContacts.filter((c) => c.stage === "Closed Lost");
    const closedTotal = wonContacts.length + lostContacts.length;
    const monthWon = wonContacts.filter((c) => c.closedAt && new Date(c.closedAt) >= monthStart);

    // Best source by closed-won $
    const sourceMap = new Map<string, number>();
    wonContacts.forEach((c) => {
      const src = c.source || "(unknown)";
      sourceMap.set(src, (sourceMap.get(src) || 0) + c.estimatedValue);
    });
    let bestSource: string | null = null;
    let bestSourceValue = 0;
    sourceMap.forEach((v, k) => {
      if (v > bestSourceValue) { bestSourceValue = v; bestSource = k; }
    });

    setPersonalMetrics({
      monthWonValue: monthWon.reduce((s, c) => s + c.estimatedValue, 0),
      monthWonCount: monthWon.length,
      allTimeWinRate: closedTotal > 0 ? (wonContacts.length / closedTotal) * 100 : 0,
      avgDealSize: wonContacts.length > 0 ? wonContacts.reduce((s, c) => s + c.estimatedValue, 0) / wonContacts.length : 0,
      bestSource,
    });

    // Admin activity feed — last 15 activities across ALL contacts
    if (admin) {
      const items: FeedItem[] = [];
      allContacts.forEach((c) => {
        c.activities.forEach((a) => {
          items.push({
            contactId: c.id,
            contactName: [c.firstName, c.lastName].filter(Boolean).join(" ") || c.company || "(unnamed)",
            ownerName: c.ownerName,
            activity: a,
          });
        });
      });
      items.sort((a, b) => b.activity.date.localeCompare(a.activity.date));
      setFeed(items.slice(0, 15));
    }
  }, []);

  const admin = isAdmin(ownerName);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 720px) {
          .dash-action-banner { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-perf-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      ` }} />
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "60px 36px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">
              Rep Portal · Dashboard
              {ownerName && <span style={{ marginLeft: "12px", color: "var(--color-warm-text-muted)" }}>· {ownerName}{admin && " (admin)"}</span>}
            </div>
            <h1>
              {ownerName ? `Welcome back, ` : "You're "}
              <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>
                {ownerName ? ownerName.split(" ")[0] : "in"}.
              </em>
            </h1>
            <p className="deck">
              Everything you need to sell is on this site. Bookmark it. When you have a question mid-pitch, this is where you look first.
            </p>
          </header>

          {/* Action banner — overdue + today + pipeline */}
          {ownerName && (
            <div className="dash-action-banner" style={{ display: "grid", gridTemplateColumns: overdue.length > 0 ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr", gap: "10px", marginBottom: "32px" }}>
              {overdue.length > 0 && (
                <Link href="/rep-portal/crm" style={{ ...statBoxLink, borderColor: "#e54a28", background: "rgba(229, 74, 40, 0.06)" }}>
                  <div style={{ ...statBoxLabel, color: "#e54a28" }}>Overdue tasks</div>
                  <div style={{ ...statBoxValue, color: "#e54a28" }}>{overdue.length}</div>
                  <div style={statBoxSub}>{overdue[0]?.title || ""}</div>
                </Link>
              )}
              <Link href="/rep-portal/crm" style={statBoxLink}>
                <div style={statBoxLabel}>Today&apos;s tasks</div>
                <div style={statBoxValue}>{today.length}</div>
                <div style={statBoxSub}>{today[0]?.title || (today.length === 0 ? "Nothing due today" : "")}</div>
              </Link>
              <Link href="/rep-portal/crm" style={statBoxLink}>
                <div style={statBoxLabel}>{admin ? "All contacts" : "Your contacts"}</div>
                <div style={statBoxValue}>{contactCount}</div>
                <div style={statBoxSub}>in pipeline</div>
              </Link>
              <Link href="/rep-portal/crm" style={statBoxLink}>
                <div style={statBoxLabel}>Open value</div>
                <div style={{ ...statBoxValue, color: "var(--color-warm-accent)" }}>${openValue.toLocaleString()}</div>
                <div style={statBoxSub}>est. across pipeline</div>
              </Link>
            </div>
          )}

          {/* Personal performance metrics — for non-admin reps mostly */}
          {ownerName && personalMetrics && (personalMetrics.monthWonCount > 0 || personalMetrics.avgDealSize > 0) && (
            <section style={{ marginBottom: "32px" }}>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700 }}>
                Your performance {admin && "(just yours — switch to admin view in CRM for all reps)"}
              </h3>
              <div className="dash-perf-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                <div style={perfBox}>
                  <div style={perfLabel}>Month closed-won</div>
                  <div style={{ ...perfValue, color: "#7aaa6a" }}>${personalMetrics.monthWonValue.toLocaleString()}</div>
                  <div style={perfSub}>{personalMetrics.monthWonCount} deal{personalMetrics.monthWonCount !== 1 ? "s" : ""}</div>
                </div>
                <div style={perfBox}>
                  <div style={perfLabel}>All-time win rate</div>
                  <div style={{ ...perfValue, color: personalMetrics.allTimeWinRate >= 50 ? "#7aaa6a" : personalMetrics.allTimeWinRate >= 25 ? "var(--color-warm-accent)" : "#e54a28" }}>{personalMetrics.allTimeWinRate.toFixed(0)}%</div>
                  <div style={perfSub}>closed deals only</div>
                </div>
                <div style={perfBox}>
                  <div style={perfLabel}>Avg deal size</div>
                  <div style={{ ...perfValue, color: "var(--color-warm-accent)" }}>${Math.round(personalMetrics.avgDealSize).toLocaleString()}</div>
                  <div style={perfSub}>across all wins</div>
                </div>
                <div style={perfBox}>
                  <div style={perfLabel}>Best source</div>
                  <div style={{ ...perfValue, fontSize: "16px", lineHeight: 1.2, paddingTop: "4px" }}>{personalMetrics.bestSource || "—"}</div>
                  <div style={perfSub}>by closed-won $</div>
                </div>
              </div>
            </section>
          )}

          {/* Admin activity feed — only for admins */}
          {admin && feed.length > 0 && (
            <section style={{ marginBottom: "40px" }}>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "12px", fontWeight: 700 }}>
                Recent rep activity (admin view)
              </h3>
              <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", maxHeight: "320px", overflowY: "auto" }}>
                {feed.map((f, i) => {
                  const date = new Date(f.activity.date);
                  const hoursAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
                  const ago = hoursAgo < 1 ? "Just now" : hoursAgo < 24 ? `${hoursAgo}h ago` : `${Math.floor(hoursAgo / 24)}d ago`;
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "12px", alignItems: "center", padding: "10px 16px", borderBottom: i < feed.length - 1 ? "1px solid var(--color-warm-border)" : "none", fontSize: "13px" }}>
                      <div style={{ width: "24px", textAlign: "center", fontSize: "16px" }}>{ACTIVITY_ICONS[f.activity.type]}</div>
                      <div>
                        <Link href={`/rep-portal/crm/${f.contactId}`} style={{ color: "var(--color-warm-accent)", textDecoration: "none", fontWeight: 600 }}>
                          {f.contactName}
                        </Link>
                        <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", marginLeft: "8px" }}>· by <strong style={{ color: "var(--color-warm-text)" }}>{f.ownerName || "(unowned)"}</strong></span>
                        <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.4, marginTop: "2px" }}>{f.activity.description}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-dm-sans), monospace", whiteSpace: "nowrap" }}>{ago}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Quick links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "56px" }}>
            {QUICK_LINKS.map((q) => (
              <Link key={q.href} href={q.href} className="pv-card" style={{ display: "block" }}>
                <span className="b3"></span><span className="b4"></span>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 8px", letterSpacing: "0.01em" }}>
                  {q.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {q.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Recent updates */}
          <header className="pv-section-head">
            <span className="roman">I.</span>
            <h2>Recent <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>updates</em></h2>
          </header>
          <div style={{ marginBottom: "56px" }}>
            {RECENT.map((u, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "16px", padding: "14px 0", borderBottom: "1px solid var(--color-warm-border)", fontSize: "14px" }}>
                <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>
                  {u.date}
                </div>
                <div style={{ color: "var(--color-warm-text)", lineHeight: 1.6 }}>{u.note}</div>
              </div>
            ))}
          </div>

          {/* Need help */}
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "24px 28px" }}>
            <h4 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--color-warm-accent)", margin: "0 0 12px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Need backup mid-pitch?
            </h4>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
              Text Elijah at <strong>(205) 462-7839</strong> or email <a href="mailto:elijah@purcell-ventures.com" style={{ color: "var(--color-warm-accent)" }}>elijah@purcell-ventures.com</a>. Format: <em>&quot;Got a [SERVICE] prospect, [BUDGET], decision timeline [X]. Need 5 min before I quote.&quot;</em>
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

const statBoxLink: React.CSSProperties = {
  display: "block",
  padding: "16px 18px",
  background: "var(--color-warm-bg-alt)",
  border: "1px solid var(--color-warm-border)",
  textDecoration: "none",
  borderRadius: 0,
  transition: "border-color 0.15s",
};

const statBoxLabel: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--color-warm-text-muted)",
  fontWeight: 700,
  marginBottom: "6px",
};

const statBoxValue: React.CSSProperties = {
  fontFamily: "'Cinzel', Georgia, serif",
  fontSize: "26px",
  fontWeight: 700,
  color: "var(--color-warm-text)",
  lineHeight: 1,
  marginBottom: "4px",
};

const statBoxSub: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--color-warm-text-light)",
  fontStyle: "italic",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const perfBox: React.CSSProperties = {
  padding: "16px 18px",
  background: "var(--color-warm-bg-alt)",
  border: "1px solid var(--color-warm-border)",
  borderRadius: 0,
};

const perfLabel: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--color-warm-text-muted)",
  fontWeight: 700,
  marginBottom: "6px",
};

const perfValue: React.CSSProperties = {
  fontFamily: "'Cinzel', Georgia, serif",
  fontSize: "22px",
  fontWeight: 700,
  color: "var(--color-warm-text)",
  lineHeight: 1,
  marginBottom: "4px",
};

const perfSub: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--color-warm-text-light)",
  fontStyle: "italic",
};
