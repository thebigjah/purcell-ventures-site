"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../../_components/PortalNav";
import {
  loadContacts, loadTasks, upsertContact, deleteContact, changeStage, addActivity,
  addTask, toggleTask, deleteTask,
  contactDisplayName, healthScore,
  STAGES, STAGE_COLORS, ACTIVITY_ICONS,
  type Contact, type Stage, type ActivityType, type Task,
} from "@/lib/crm-storage";

interface ResearchResult {
  company_snapshot: string;
  likely_pain_points: string[];
  service_fit: {
    primary_recommendation: string;
    secondary_recommendation: string;
    do_not_recommend: string;
  };
  opening_line: string;
  questions_to_ask: string[];
  red_flags: string[];
  confidence_caveat: string;
}

interface NextStepResult {
  primary_next_step: {
    action: string;
    when: string;
    why: string;
    exact_message: string | null;
  };
  alternative_next_step: {
    action: string;
    when: string;
    why: string;
  };
  things_to_avoid: string[];
  stage_reality_check: string;
}

interface ConversationSummary {
  where_we_are: string;
  last_meaningful_action: string;
  what_we_owe_them: string | null;
  what_they_owe_us: string | null;
  vibe_read: string;
}

export default function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [contact, setContact] = useState<Contact | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [activityType, setActivityType] = useState<ActivityType>("call");
  const [activityDesc, setActivityDesc] = useState("");
  const [activityOutcome, setActivityOutcome] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDue, setNewTaskDue] = useState(new Date().toISOString().slice(0, 10));
  const [ownerName, setOwnerName] = useState("");
  const [research, setResearch] = useState<ResearchResult | null>(null);
  const [researchBusy, setResearchBusy] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);
  const [nextStep, setNextStep] = useState<NextStepResult | null>(null);
  const [nextStepBusy, setNextStepBusy] = useState(false);
  const [nextStepError, setNextStepError] = useState<string | null>(null);
  const [summary, setSummary] = useState<ConversationSummary | null>(null);
  const [summaryBusy, setSummaryBusy] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [summaryDate, setSummaryDate] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Array<{ id: string; name: string; subject: string; body: string }>>([]);

  useEffect(() => {
    const all = loadContacts();
    const c = all.find((x) => x.id === id) || null;
    setContact(c);
    if (c) {
      setNotesDraft(c.notes);
      // Restore cached summary if present
      if (c.customFields?.lastSummary) {
        try {
          setSummary(JSON.parse(c.customFields.lastSummary));
          setSummaryDate(c.customFields.lastSummaryDate || null);
        } catch { /* ignore parse fail */ }
      }
    }
    setTasks(loadTasks().filter((t) => t.contactId === id));
    const cookie = document.cookie.split("; ").find((cc) => cc.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));
    const rawTemplates = localStorage.getItem("pv_email_templates_v1");
    if (rawTemplates) {
      try { setTemplates(JSON.parse(rawTemplates)); } catch { /* ignore */ }
    }
  }, [id]);

  function useTemplate(templateId: string) {
    if (!contact) return;
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;
    // Fill tokens
    const tokens: Record<string, string> = {
      firstName: contact.firstName || "",
      lastName: contact.lastName || "",
      company: contact.company || "",
      service: contact.service || "your project",
      repName: ownerName || "Elijah",
      // Stub pricing — rep fills in manually
      tier: contact.service?.includes("Starter") ? "Starter" : contact.service?.includes("Growth") ? "Growth" : contact.service?.includes("Full") ? "Full" : "[tier]",
      standardPrice: contact.service?.includes("Starter") ? "$400 setup + $99/mo" : contact.service?.includes("Growth") ? "$700 setup + $179/mo" : contact.service?.includes("Full") ? "$1,000 setup + $279/mo" : "[standard]",
      pilotPrice: contact.service?.includes("Starter") ? "$280 setup + $69/mo locked 6mo" : contact.service?.includes("Growth") ? "$490 setup + $125/mo locked 6mo" : contact.service?.includes("Full") ? "$700 setup + $195/mo locked 6mo" : "[pilot]",
    };
    let subject = template.subject;
    let body = template.body;
    Object.entries(tokens).forEach(([k, v]) => {
      subject = subject.replace(new RegExp(`{{${k}}}`, "g"), v);
      body = body.replace(new RegExp(`{{${k}}}`, "g"), v);
    });
    const mailto = `mailto:${contact.email || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    // Log activity
    addActivity(contact.id, {
      type: "email",
      date: new Date().toISOString(),
      description: `Used template "${template.name}"`,
      outcome: `Subject: ${subject}`,
    });
    refresh();
  }

  function refresh() {
    const all = loadContacts();
    setContact(all.find((x) => x.id === id) || null);
    setTasks(loadTasks().filter((t) => t.contactId === id));
  }

  if (!contact) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
        <VignetteBackground />
        <div style={{ position: "relative", zIndex: 5 }}>
          <PortalNav />
          <main style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)" }}>Contact not found</h1>
            <p style={{ color: "var(--color-warm-text-muted)" }}>This contact may have been deleted or was never created on this device.</p>
            <Link href="/rep-portal/crm" style={{ color: "var(--color-warm-accent)" }}>← Back to CRM</Link>
          </main>
        </div>
      </div>
    );
  }

  function handleStageChange(newStage: Stage) {
    if (!contact) return;
    changeStage(contact.id, newStage, ownerName);
    refresh();
  }

  function saveNotes() {
    if (!contact) return;
    upsertContact({ ...contact, notes: notesDraft });
    refresh();
    setEditingNotes(false);
  }

  function logActivity() {
    if (!contact || !activityDesc.trim()) return;
    addActivity(contact.id, {
      type: activityType,
      date: new Date().toISOString(),
      description: activityDesc.trim(),
      outcome: activityOutcome.trim() || undefined,
    });
    setActivityDesc("");
    setActivityOutcome("");
    refresh();
  }

  function createTask() {
    if (!contact || !newTaskTitle.trim()) return;
    addTask({
      contactId: contact.id,
      contactName: contactDisplayName(contact),
      title: newTaskTitle.trim(),
      dueDate: newTaskDue,
      done: false,
    });
    setNewTaskTitle("");
    setNewTaskDue(new Date().toISOString().slice(0, 10));
    refresh();
  }

  function handleDelete() {
    if (!contact) return;
    if (!confirm("Delete this contact and all their tasks?")) return;
    deleteContact(contact.id);
    window.location.href = "/rep-portal/crm";
  }

  async function runResearch() {
    if (!contact) return;
    setResearchBusy(true);
    setResearchError(null);
    try {
      const res = await fetch("/api/prospect-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName,
          company: contact.company,
          title: contact.title,
          service: contact.service,
          source: contact.source,
          notes: contact.notes,
          tags: contact.tags,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResearchError(data.error || "Research failed");
        return;
      }
      setResearch(data.research);

      // Log to contact activity + save summary to notes
      const summary = `AI Prospect Research run. Snapshot: ${data.research.company_snapshot} Recommended: ${data.research.service_fit?.primary_recommendation || "n/a"}`;
      addActivity(contact.id, {
        type: "note",
        date: new Date().toISOString(),
        description: "AI Prospect Research generated (see panel)",
        outcome: summary.substring(0, 200),
      });
      refresh();
    } catch {
      setResearchError("Network error");
    } finally {
      setResearchBusy(false);
    }
  }

  async function runSummary() {
    if (!contact) return;
    setSummaryBusy(true);
    setSummaryError(null);
    try {
      const res = await fetch("/api/conversation-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSummaryError(data.error || "Summary failed");
        return;
      }
      setSummary(data.summary);
      const now = new Date().toISOString();
      setSummaryDate(now);
      // Cache in customFields for persistence across reloads
      upsertContact({
        ...contact,
        customFields: { ...(contact.customFields || {}), lastSummary: JSON.stringify(data.summary), lastSummaryDate: now },
      });
      refresh();
    } catch {
      setSummaryError("Network error");
    } finally {
      setSummaryBusy(false);
    }
  }

  async function runNextStep() {
    if (!contact) return;
    setNextStepBusy(true);
    setNextStepError(null);
    try {
      const res = await fetch("/api/next-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNextStepError(data.error || "Suggestion failed");
        return;
      }
      setNextStep(data.suggestion);
    } catch {
      setNextStepError("Network error");
    } finally {
      setNextStepBusy(false);
    }
  }

  function appendResearchToNotes() {
    if (!contact || !research) return;
    const formatted = [
      "──── AI Prospect Research ────",
      `Snapshot: ${research.company_snapshot}`,
      ``,
      `Likely pain points:`,
      ...research.likely_pain_points.map((p) => `  • ${p}`),
      ``,
      `Service fit:`,
      `  Primary: ${research.service_fit.primary_recommendation}`,
      `  Secondary: ${research.service_fit.secondary_recommendation}`,
      `  Don't lead with: ${research.service_fit.do_not_recommend}`,
      ``,
      `Opening line: ${research.opening_line}`,
      ``,
      `Discovery questions:`,
      ...research.questions_to_ask.map((q) => `  • ${q}`),
      ``,
      `Red flags: ${research.red_flags.join("; ")}`,
      ``,
      `Caveat: ${research.confidence_caveat}`,
      `────────────────────────────────`,
    ].join("\n");

    const newNotes = contact.notes ? `${contact.notes}\n\n${formatted}` : formatted;
    upsertContact({ ...contact, notes: newNotes });
    setNotesDraft(newNotes);
    refresh();
    alert("Research saved to notes.");
  }

  const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "(unnamed)";
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return a.dueDate.localeCompare(b.dueDate);
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .crm-detail-layout { grid-template-columns: 1fr !important; }
          .crm-research-2col { grid-template-columns: 1fr !important; }
          .crm-says-grid { grid-template-columns: 1fr !important; }
          .crm-stat-strip { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media print {
          body { background: white !important; color: black !important; }
          .pv-phi-field, header.sticky, .no-print { display: none !important; }
          [class*="pv-page-head"] { border-color: black !important; }
          h1, h2, h3, h4 { color: black !important; }
          a { color: black !important; text-decoration: underline !important; }
          .crm-detail-layout { grid-template-columns: 1fr !important; }
        }
      ` }} />
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <Link href="/rep-portal/crm" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All contacts</Link>

          {/* Header */}
          <header style={{ marginTop: "16px", marginBottom: "32px", paddingBottom: "20px", borderBottom: `2px solid ${STAGE_COLORS[contact.stage]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--color-warm-text)", margin: 0 }}>{fullName}</h1>
                  {contact.company && <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-accent)", fontStyle: "italic" }}>{contact.company}</span>}
                </div>
                {contact.title && <div style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "4px" }}>{contact.title}</div>}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>
                  {contact.email && <a href={`mailto:${contact.email}`} style={{ color: "var(--color-warm-accent)" }}>✉ {contact.email}</a>}
                  {contact.phone && <a href={`tel:${contact.phone}`} style={{ color: "var(--color-warm-accent)" }}>📞 {contact.phone}</a>}
                </div>
                {contact.tags.length > 0 && (
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "10px" }}>
                    {contact.tags.map((t) => (
                      <span key={t} style={{ fontSize: "10px", padding: "3px 8px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", letterSpacing: "0.1em" }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {templates.length > 0 && contact.email && (
                  <select onChange={(e) => { if (e.target.value) { useTemplate(e.target.value); e.target.value = ""; } }} defaultValue="" style={{ ...fieldStyle, fontSize: "12px", maxWidth: "180px" }}>
                    <option value="">📧 Use email template…</option>
                    {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                )}
                <select value={contact.stage} onChange={(e) => handleStageChange(e.target.value as Stage)} style={{ ...fieldStyle, color: STAGE_COLORS[contact.stage], fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => window.print()} style={ghostBtn} title="Print contact profile">Print</button>
                <button onClick={handleDelete} style={{ ...ghostBtn, color: "#e54a28", borderColor: "#e54a28" }}>Delete</button>
              </div>
            </div>
          </header>

          {/* Stats strip + Health Score */}
          {(() => {
            const health = healthScore(contact);
            return (
              <div className="crm-stat-strip" style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "32px" }}>
                <div style={{ padding: "16px 18px", background: "var(--color-warm-bg-alt)", border: `2px solid ${health.color}`, textAlign: "center", minWidth: "120px" }} title={health.reasoning.join(" · ")}>
                  <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: health.color, lineHeight: 1 }}>{health.score}</div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: health.color, marginTop: "4px", fontWeight: 700, fontFamily: "var(--font-dm-sans), sans-serif" }}>{health.label}</div>
                </div>
                <StatTile label="Value" value={`$${contact.estimatedValue.toLocaleString()}`} />
                <StatTile label="Service" value={contact.service || "—"} small />
                <StatTile label="Source" value={contact.source || "—"} small />
                <StatTile label="Owner" value={contact.ownerName || "—"} small />
              </div>
            );
          })()}

          {/* Conversation Summary */}
          <section style={{ marginBottom: "16px", border: "1px solid var(--color-warm-border-light)", background: "var(--color-warm-bg-alt)", padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 4px", fontWeight: 600 }}>Where are we with this contact?</h3>
                <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {summaryDate
                    ? `Last summarized ${new Date(summaryDate).toLocaleDateString()} at ${new Date(summaryDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. Re-run if there&apos;s been activity since.`
                    : "Returning to this contact after a break? Get a 5-line catch-up summary so you don&apos;t have to scroll the timeline."}
                </p>
              </div>
              <button onClick={runSummary} disabled={summaryBusy} style={{ ...ghostBtn, opacity: summaryBusy ? 0.6 : 1 }}>
                {summaryBusy ? "Summarizing…" : summary ? "↻ Re-summarize" : "Summarize"}
              </button>
            </div>

            {summaryError && (
              <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>
                {summaryError}
              </div>
            )}

            {summary && (
              <div style={{ display: "grid", gap: "10px" }}>
                <SummaryRow label="Where we are" body={summary.where_we_are} highlight />
                <SummaryRow label="Last meaningful action" body={summary.last_meaningful_action} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <SummaryRow label="What WE owe them" body={summary.what_we_owe_them || "(ball in their court)"} color="#7aaa6a" />
                  <SummaryRow label="What THEY owe us" body={summary.what_they_owe_us || "(ball in our court)"} color="var(--color-warm-accent)" />
                </div>
                <SummaryRow label="Vibe read" body={summary.vibe_read} color={
                  /hot|warm/i.test(summary.vibe_read) ? "#7aaa6a" :
                  /cool|cold|dead/i.test(summary.vibe_read) ? "#e54a28" :
                  "var(--color-warm-text)"
                } />
              </div>
            )}
          </section>

          {/* AI Next Step */}
          <section style={{ marginBottom: "16px", border: "1px solid var(--color-warm-border-light)", background: "var(--color-warm-bg-alt)", padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", margin: "0 0 4px", fontWeight: 600 }}>What should I do next?</h3>
                <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  AI looks at this contact&apos;s stage + activity history + notes → suggests 2 concrete next moves with timing + scripted language.
                </p>
              </div>
              <button onClick={runNextStep} disabled={nextStepBusy} style={{ ...ghostBtn, opacity: nextStepBusy ? 0.6 : 1 }}>
                {nextStepBusy ? "Thinking…" : nextStep ? "↻ Rerun" : "Suggest next step"}
              </button>
            </div>

            {nextStepError && (
              <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>
                {nextStepError}
              </div>
            )}

            {nextStep && (
              <div style={{ display: "grid", gap: "12px" }}>
                {/* Reality check */}
                <div style={{ padding: "10px 14px", background: "var(--color-warm-bg)", borderLeft: "3px solid var(--color-warm-text-muted)", fontSize: "13px", color: "var(--color-warm-text)", fontStyle: "italic", lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Reality check · </strong>
                  {nextStep.stage_reality_check}
                </div>

                {/* Primary */}
                <div style={{ padding: "14px 18px", background: "var(--color-warm-bg)", borderLeft: "3px solid #7aaa6a" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap" }}>
                    <strong style={{ color: "#7aaa6a", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Primary · {nextStep.primary_next_step.when}</strong>
                  </div>
                  <p style={{ margin: "0 0 6px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{nextStep.primary_next_step.action}</p>
                  <p style={{ margin: "0 0 8px", fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>{nextStep.primary_next_step.why}</p>
                  {nextStep.primary_next_step.exact_message && (
                    <div style={{ marginTop: "10px", padding: "10px 14px", background: "var(--color-warm-bg-alt)", border: "1px dashed var(--color-warm-border-light)", fontSize: "13px", lineHeight: 1.6, color: "var(--color-warm-text)", fontFamily: "var(--font-inter), sans-serif" }}>
                      &ldquo;{nextStep.primary_next_step.exact_message}&rdquo;
                    </div>
                  )}
                </div>

                {/* Alternative */}
                <div style={{ padding: "14px 18px", background: "var(--color-warm-bg)", borderLeft: "3px solid var(--color-warm-accent)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Alternative · {nextStep.alternative_next_step.when}</strong>
                  </div>
                  <p style={{ margin: "0 0 6px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{nextStep.alternative_next_step.action}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>{nextStep.alternative_next_step.why}</p>
                </div>

                {/* Things to avoid */}
                {nextStep.things_to_avoid.length > 0 && (
                  <div style={{ padding: "12px 16px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid rgba(229, 74, 40, 0.3)" }}>
                    <strong style={{ color: "#e54a28", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Don&apos;t do these</strong>
                    <ul style={{ margin: "8px 0 0", paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
                      {nextStep.things_to_avoid.map((t, i) => <li key={i} style={{ marginBottom: "4px" }}>{t}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* AI Prospect Research */}
          <section style={{ marginBottom: "32px", border: "1px solid var(--color-warm-accent)", background: "linear-gradient(135deg, rgba(212,175,55,0.04), rgba(212,175,55,0))", padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-accent)", margin: "0 0 4px", fontWeight: 600 }}>AI Prospect Research</h3>
                <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  Pre-call brief generated from this contact&apos;s data. Does NOT browse the web — reasons from the inputs + industry knowledge + PV&apos;s product catalog.
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {research && <button onClick={appendResearchToNotes} style={ghostBtn}>Save to notes</button>}
                <button onClick={runResearch} disabled={researchBusy} className="pv-btn-primary" style={{ border: "none", cursor: researchBusy ? "wait" : "pointer", opacity: researchBusy ? 0.6 : 1, fontSize: "11px", padding: "8px 16px" }}>
                  {researchBusy ? "Researching…" : research ? "↻ Rerun" : "Research with AI"}
                </button>
              </div>
            </div>

            {researchError && (
              <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px", marginBottom: "12px" }}>
                {researchError}
              </div>
            )}

            {!research && !researchBusy && (
              <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, fontStyle: "italic", textAlign: "center", padding: "20px" }}>
                Click &quot;Research with AI&quot; for a structured pre-call brief — likely pain points, service fit, opening line, discovery questions, red flags.
              </p>
            )}

            {research && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Snapshot */}
                <div>
                  <h4 style={researchHead}>Company snapshot</h4>
                  <p style={researchBody}>{research.company_snapshot}</p>
                </div>

                {/* Pain points + Service fit side-by-side */}
                <div className="crm-research-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <h4 style={researchHead}>Likely pain points</h4>
                    <ul style={{ ...researchBody, paddingLeft: "18px", margin: 0 }}>
                      {research.likely_pain_points.map((p, i) => <li key={i} style={{ marginBottom: "6px" }}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 style={researchHead}>Service fit</h4>
                    <div style={{ ...researchBody, display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div>
                        <strong style={{ color: "#7aaa6a", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Primary · </strong>
                        {research.service_fit.primary_recommendation}
                      </div>
                      <div>
                        <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Secondary · </strong>
                        {research.service_fit.secondary_recommendation}
                      </div>
                      <div>
                        <strong style={{ color: "#e54a28", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Don&apos;t lead with · </strong>
                        {research.service_fit.do_not_recommend}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opening line — highlight box */}
                <div style={{ padding: "16px 20px", background: "var(--color-warm-bg)", borderLeft: "3px solid var(--color-warm-accent)" }}>
                  <h4 style={researchHead}>Opening line</h4>
                  <p style={{ ...researchBody, margin: 0, fontStyle: "italic" }}>&ldquo;{research.opening_line}&rdquo;</p>
                </div>

                {/* Discovery questions */}
                <div>
                  <h4 style={researchHead}>Discovery questions to ask</h4>
                  <ol style={{ ...researchBody, paddingLeft: "20px", margin: 0 }}>
                    {research.questions_to_ask.map((q, i) => <li key={i} style={{ marginBottom: "6px" }}>{q}</li>)}
                  </ol>
                </div>

                {/* Red flags */}
                {research.red_flags.length > 0 && (
                  <div style={{ padding: "12px 16px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid rgba(229, 74, 40, 0.3)" }}>
                    <h4 style={{ ...researchHead, color: "#e54a28" }}>Red flags</h4>
                    <ul style={{ ...researchBody, paddingLeft: "18px", margin: 0 }}>
                      {research.red_flags.map((r, i) => <li key={i} style={{ marginBottom: "4px" }}>{r}</li>)}
                    </ul>
                  </div>
                )}

                {/* Caveat */}
                <div style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic", borderTop: "1px solid var(--color-warm-border)", paddingTop: "10px" }}>
                  Caveat: {research.confidence_caveat}
                </div>
              </div>
            )}
          </section>

          {/* Two-column layout */}
          <div className="crm-detail-layout" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>

            {/* LEFT — Activity + Notes */}
            <div>
              {/* Log activity */}
              <section style={{ marginBottom: "32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px" }}>
                <h3 style={sectionHead}>Log activity</h3>
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "12px", marginBottom: "10px" }}>
                  <select value={activityType} onChange={(e) => setActivityType(e.target.value as ActivityType)} style={fieldStyle}>
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="meeting">Meeting</option>
                    <option value="note">Note</option>
                  </select>
                  <input type="text" value={activityDesc} onChange={(e) => setActivityDesc(e.target.value)} placeholder="What happened?" style={fieldStyle} />
                </div>
                <input type="text" value={activityOutcome} onChange={(e) => setActivityOutcome(e.target.value)} placeholder="Outcome (optional) — e.g., scheduled callback Tuesday" style={{ ...fieldStyle, marginBottom: "10px" }} />
                <button onClick={logActivity} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Log</button>
              </section>

              {/* Activity timeline */}
              <ActivityTimeline contact={contact} />

              {/* Notes */}
              <section style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                  <h3 style={sectionHead}>Notes</h3>
                  {!editingNotes && <button onClick={() => setEditingNotes(true)} style={inlineBtn}>Edit</button>}
                </div>
                {editingNotes ? (
                  <div>
                    <textarea value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} style={{ ...fieldStyle, minHeight: "160px", resize: "vertical" }} />
                    <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                      <button onClick={saveNotes} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Save</button>
                      <button onClick={() => { setNotesDraft(contact.notes); setEditingNotes(false); }} style={ghostBtn}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: 1.7, color: "var(--color-warm-text)", minHeight: "60px" }}>
                    {contact.notes || <span style={{ color: "var(--color-warm-text-light)", fontStyle: "italic" }}>No notes. Click Edit to add some.</span>}
                  </div>
                )}
              </section>
            </div>

            {/* RIGHT — Tasks + Meta */}
            <div>
              {/* Tasks */}
              <section style={{ marginBottom: "32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px" }}>
                <h3 style={sectionHead}>Tasks ({sortedTasks.filter(t => !t.done).length})</h3>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                  <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") createTask(); }} placeholder="New task…" style={{ ...fieldStyle, fontSize: "13px" }} />
                  <input type="date" value={newTaskDue} onChange={(e) => setNewTaskDue(e.target.value)} style={{ ...fieldStyle, width: "140px", fontSize: "12px" }} />
                </div>
                <button onClick={createTask} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", marginBottom: "16px", fontSize: "10px", padding: "8px 14px" }}>+ Add task</button>

                {sortedTasks.length === 0 ? (
                  <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>No tasks for this contact yet.</p>
                ) : (
                  <div style={{ display: "grid", gap: "6px" }}>
                    {sortedTasks.map((t) => {
                      const today = new Date().toISOString().slice(0, 10);
                      const overdue = !t.done && t.dueDate < today;
                      return (
                        <div key={t.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "8px", alignItems: "center", padding: "8px 10px", background: "var(--color-warm-bg)", border: `1px solid ${overdue ? "#e54a28" : "var(--color-warm-border)"}`, opacity: t.done ? 0.5 : 1 }}>
                          <input type="checkbox" checked={t.done} onChange={() => { toggleTask(t.id); refresh(); }} />
                          <div>
                            <div style={{ fontSize: "12px", color: "var(--color-warm-text)", textDecoration: t.done ? "line-through" : "none" }}>{t.title}</div>
                            <div style={{ fontSize: "10px", color: overdue ? "#e54a28" : "var(--color-warm-text-muted)", marginTop: "2px" }}>{t.dueDate}{overdue && " · overdue"}</div>
                          </div>
                          <button onClick={() => { deleteTask(t.id); refresh(); }} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", fontSize: "14px" }}>×</button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Meta info */}
              <section style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "16px 20px", fontSize: "12px" }}>
                <h3 style={sectionHead}>Details</h3>
                <MetaRow label="Next follow-up" value={contact.nextFollowUp || "—"} />
                <MetaRow label="Created" value={new Date(contact.createdAt).toLocaleDateString()} />
                <MetaRow label="Updated" value={new Date(contact.updatedAt).toLocaleDateString()} />
                {contact.closedAt && <MetaRow label="Closed" value={new Date(contact.closedAt).toLocaleDateString()} />}
              </section>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

function ActivityTimeline({ contact }: { contact: Contact }) {
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  const filtered = filter === "all"
    ? contact.activities
    : contact.activities.filter((a) => a.type === filter);

  const TYPES: Array<{ value: ActivityType | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "call", label: "📞 Calls" },
    { value: "email", label: "✉️ Emails" },
    { value: "sms", label: "💬 SMS" },
    { value: "meeting", label: "🤝 Meetings" },
    { value: "note", label: "📝 Notes" },
    { value: "stage_change", label: "🔄 Stage" },
  ];

  // Count per type for chip badges
  const counts: Record<string, number> = {};
  contact.activities.forEach((a) => { counts[a.type] = (counts[a.type] || 0) + 1; });
  counts["all"] = contact.activities.length;

  return (
    <section style={{ marginBottom: "32px" }}>
      <h3 style={sectionHead}>Activity timeline ({contact.activities.length})</h3>

      {contact.activities.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {TYPES.map((t) => {
            const count = counts[t.value] || 0;
            if (t.value !== "all" && count === 0) return null;
            const active = filter === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setFilter(t.value)}
                style={{
                  padding: "5px 10px",
                  background: active ? "var(--color-warm-accent)" : "transparent",
                  color: active ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
                  border: `1px solid ${active ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                  fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
                  fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0,
                }}
              >
                {t.label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {contact.activities.length === 0 ? (
        <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic", textAlign: "center", padding: "20px" }}>No activity yet. Log a call, email, or meeting to start the timeline.</p>
      ) : filtered.length === 0 ? (
        <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic", textAlign: "center", padding: "20px" }}>No activity matches that filter.</p>
      ) : (
        <div>
          {filtered.map((a) => (
            <div key={a.id} style={{ display: "grid", gridTemplateColumns: "40px 1fr 100px", gap: "12px", padding: "12px 0", borderBottom: "1px solid var(--color-warm-border)" }}>
              <div style={{ fontSize: "20px", textAlign: "center" }}>{ACTIVITY_ICONS[a.type]}</div>
              <div>
                <div style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.5 }}>{a.description}</div>
                {a.outcome && <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontStyle: "italic", marginTop: "4px" }}>→ {a.outcome}</div>}
                <div style={{ fontSize: "10px", color: "var(--color-warm-text-light)", letterSpacing: "0.1em", marginTop: "4px", textTransform: "uppercase" }}>{a.type.replace("_", " ")}</div>
              </div>
              <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), monospace", textAlign: "right" }}>
                {new Date(a.date).toLocaleDateString()}
                <br />
                {new Date(a.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function SummaryRow({ label, body, color, highlight }: { label: string; body: string; color?: string; highlight?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "12px", padding: "8px 12px", background: highlight ? "var(--color-warm-bg)" : "transparent", borderLeft: highlight ? "3px solid var(--color-warm-accent)" : "none", paddingLeft: highlight ? "12px" : "0" }}>
      <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: color || "var(--color-warm-accent)", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function StatTile({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "16px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: small ? "16px" : "22px", fontWeight: 700, color: "var(--color-warm-accent)" }}>{value}</div>
      <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--color-warm-border)", fontSize: "12px" }}>
      <span style={{ color: "var(--color-warm-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
      <span style={{ color: "var(--color-warm-text)" }}>{value}</span>
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const sectionHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "14px", fontWeight: 700 };
const inlineBtn: React.CSSProperties = { background: "transparent", border: "none", color: "var(--color-warm-text-muted)", cursor: "pointer", padding: "4px 8px", fontSize: "10px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const researchHead: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "8px", fontWeight: 700, marginTop: 0 };
const researchBody: React.CSSProperties = { fontSize: "14px", lineHeight: 1.6, color: "var(--color-warm-text)", margin: 0 };
