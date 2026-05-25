"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import { isAdmin, upsertContact, emptyContact } from "@/lib/crm-storage";

interface Lead {
  email: string;
  firstName?: string;
  source: string;
  capturedAt: string;
  intent?: string;
}

const KEY = "pv_leads_captured";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ownerName, setOwnerName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));
    loadLeads();
  }, []);

  function loadLeads() {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const parsed: Lead[] = JSON.parse(raw);
        parsed.sort((a, b) => b.capturedAt.localeCompare(a.capturedAt));
        setLeads(parsed);
      } catch { /* ignore */ }
    }
  }

  function deleteLead(idx: number) {
    if (!confirm("Remove this lead from the list?")) return;
    const next = leads.filter((_, i) => i !== idx);
    setLeads(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function pushToCRM(lead: Lead) {
    const c = emptyContact(ownerName || "Elijah");
    if (lead.firstName) c.firstName = lead.firstName;
    c.email = lead.email;
    c.source = `Lead capture · ${lead.source}`;
    c.tags = ["lead-magnet", lead.source];
    c.notes = `Captured ${new Date(lead.capturedAt).toLocaleString()} via ${lead.source}.\nIntent: ${lead.intent || "(unknown)"}`;
    c.nextFollowUp = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    upsertContact(c);
    alert(`Added ${lead.email} to CRM as a Lead. Find them in /rep-portal/crm.`);
  }

  function pushAllToCRM() {
    if (leads.length === 0) return;
    if (!confirm(`Push all ${leads.length} leads to CRM as new contacts?`)) return;
    leads.forEach((lead) => {
      const c = emptyContact(ownerName || "Elijah");
      if (lead.firstName) c.firstName = lead.firstName;
      c.email = lead.email;
      c.source = `Lead capture · ${lead.source}`;
      c.tags = ["lead-magnet", lead.source];
      c.notes = `Captured ${new Date(lead.capturedAt).toLocaleString()} via ${lead.source}.`;
      c.nextFollowUp = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      upsertContact(c);
    });
    alert(`Pushed ${leads.length} leads to CRM.`);
  }

  function exportCSV() {
    const headers = ["email", "firstName", "source", "intent", "capturedAt"];
    const rows = leads.map((l) => [l.email, l.firstName || "", l.source, l.intent || "", l.capturedAt].map((f) => `"${String(f).replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pv-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const admin = isAdmin(ownerName);
  if (!admin) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
        <VignetteBackground />
        <div style={{ position: "relative", zIndex: 5 }}>
          <PortalNav />
          <main style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif" }}>Admin only</h1>
            <Link href="/rep-portal" style={{ color: "var(--color-warm-accent)" }}>← Back</Link>
          </main>
        </div>
      </div>
    );
  }

  const filtered = leads.filter((l) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return l.email.toLowerCase().includes(q) || (l.firstName || "").toLowerCase().includes(q) || l.source.toLowerCase().includes(q);
  });

  const bySource = leads.reduce((m, l) => { m.set(l.source, (m.get(l.source) || 0) + 1); return m; }, new Map<string, number>());

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Admin · Captured Leads</div>
            <h1>
              People who gave us <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>their email.</em>
            </h1>
            <p className="deck">
              Leads from <Link href="/free" style={{ color: "var(--color-warm-accent)" }}>/free lead magnet</Link> + any other email capture. Currently per-browser (this list is whatever was captured by visitors on YOUR browser only, which is none in production). When Resend lands, this syncs to the real audience.
            </p>
          </header>

          <div style={{ marginBottom: "24px", padding: "14px 18px", background: "rgba(232, 185, 104, 0.08)", border: "1px solid #e8b968", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
            <strong style={{ color: "#e8b968" }}>Important caveat:</strong> Email capture currently logs to Vercel server logs + saves to the BUYER&apos;s browser only. To see actual captured leads you&apos;ll need to either: (a) check Vercel function logs (search &quot;LEAD CAPTURE&quot;), or (b) wait for Resend integration (next session) to centralize. This view shows leads captured on YOUR browser only.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            <Stat n={leads.length} label="Leads (this browser)" />
            <Stat n={bySource.size} label="Unique sources" />
            <Stat n={leads.filter((l) => new Date(l.capturedAt) > new Date(Date.now() - 7 * 86400000)).length} label="Last 7 days" />
          </div>

          {bySource.size > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", fontWeight: 700 }}>By source</h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {Array.from(bySource.entries()).map(([src, count]) => (
                  <div key={src} style={{ padding: "6px 12px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text)" }}>
                    <strong style={{ color: "var(--color-warm-accent)" }}>{count}</strong> · {src}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search email / name / source…" style={{ flex: 1, padding: "8px 12px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontFamily: "var(--font-inter), sans-serif" }} />
            <button onClick={exportCSV} style={ghostBtn} disabled={leads.length === 0}>Export CSV</button>
            <button onClick={pushAllToCRM} className="pv-btn-primary" style={{ border: "none", cursor: leads.length === 0 ? "not-allowed" : "pointer", opacity: leads.length === 0 ? 0.5 : 1 }} disabled={leads.length === 0}>Push all → CRM</button>
          </div>

          {leads.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "60px", fontStyle: "italic" }}>
              No leads captured on this browser yet. When someone signs up via <Link href="/free" style={{ color: "var(--color-warm-accent)" }}>/free</Link>, their email appears here. Or check Vercel logs for &quot;LEAD CAPTURE&quot; entries.
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)" }}>
                  <th style={th}>Captured</th>
                  <th style={th}>Email</th>
                  <th style={th}>Name</th>
                  <th style={th}>Source</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={`${lead.email}-${lead.capturedAt}`} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                    <td style={{ ...td, fontFamily: "var(--font-dm-sans), monospace", fontSize: "11px", color: "var(--color-warm-text-muted)" }}>{new Date(lead.capturedAt).toLocaleString()}</td>
                    <td style={{ ...td, fontWeight: 600, color: "var(--color-warm-accent)" }}>{lead.email}</td>
                    <td style={td}>{lead.firstName || "—"}</td>
                    <td style={{ ...td, fontSize: "12px", color: "var(--color-warm-text-muted)" }}>{lead.source}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <button onClick={() => pushToCRM(lead)} style={smallBtn}>→ CRM</button>
                      <button onClick={() => deleteLead(leads.indexOf(lead))} style={{ ...smallBtn, color: "var(--color-warm-text-light)" }}>×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </main>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{n}</div>
      <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 };
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-warm-text)", verticalAlign: "middle" };
const smallBtn: React.CSSProperties = { padding: "4px 10px", background: "transparent", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", cursor: "pointer", fontSize: "11px", marginLeft: "4px", borderRadius: 0 };
