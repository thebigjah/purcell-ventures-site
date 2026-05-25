"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import {
  loadContacts, loadTasks, toggleTask, deleteTask,
  isAdmin, filterTasksByOwner,
  type Contact, type Task,
} from "@/lib/crm-storage";

interface DayItem {
  type: "task" | "followup";
  date: string;
  contactId: string;
  contactName: string;
  contactStage: string;
  title: string;       // task title OR "Follow up"
  taskId?: string;     // only for tasks
  done?: boolean;      // only for tasks
}

interface DaySection {
  label: string;
  date: string;
  items: DayItem[];
  color: string;
}

function dateOnly(iso: string): string { return iso.slice(0, 10); }
function todayStr(): string { return new Date().toISOString().slice(0, 10); }
function addDays(date: string, n: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function fmtDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function CalendarPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    setContacts(loadContacts());
    setTasks(loadTasks());
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));
  }, []);

  function refresh() {
    setContacts(loadContacts());
    setTasks(loadTasks());
  }

  const admin = isAdmin(ownerName);
  const myTasks = admin ? tasks : filterTasksByOwner(tasks, contacts, ownerName);
  const myContacts = admin ? contacts : contacts.filter((c) => c.ownerName === ownerName);

  // Build combined items per date
  const itemsByDate = useMemo(() => {
    const map = new Map<string, DayItem[]>();
    // Tasks
    myTasks.forEach((t) => {
      if (t.done) return; // hide completed in calendar
      const key = dateOnly(t.dueDate);
      if (!map.has(key)) map.set(key, []);
      const contact = myContacts.find((c) => c.id === t.contactId);
      map.get(key)!.push({
        type: "task",
        date: key,
        contactId: t.contactId,
        contactName: t.contactName,
        contactStage: contact?.stage || "—",
        title: t.title,
        taskId: t.id,
        done: t.done,
      });
    });
    // Next follow-ups
    myContacts.forEach((c) => {
      if (!c.nextFollowUp) return;
      if (c.stage === "Closed Won" || c.stage === "Closed Lost") return;
      const key = dateOnly(c.nextFollowUp);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({
        type: "followup",
        date: key,
        contactId: c.id,
        contactName: [c.firstName, c.lastName].filter(Boolean).join(" ") + (c.company ? ` (${c.company})` : ""),
        contactStage: c.stage,
        title: "Follow up",
      });
    });
    return map;
  }, [myTasks, myContacts]);

  // Group into sections
  const sections: DaySection[] = useMemo(() => {
    const today = todayStr();
    const tomorrow = addDays(today, 1);
    const weekEnd = addDays(today, 7);
    const monthEnd = addDays(today, 30);

    const overdue: DayItem[] = [];
    const todayItems: DayItem[] = [];
    const tomorrowItems: DayItem[] = [];
    const thisWeek: DayItem[] = [];
    const thisMonth: DayItem[] = [];
    const later: DayItem[] = [];

    itemsByDate.forEach((items, date) => {
      items.forEach((it) => {
        if (date < today) overdue.push(it);
        else if (date === today) todayItems.push(it);
        else if (date === tomorrow) tomorrowItems.push(it);
        else if (date <= weekEnd) thisWeek.push(it);
        else if (date <= monthEnd) thisMonth.push(it);
        else later.push(it);
      });
    });

    // Sort each section by date
    [overdue, todayItems, tomorrowItems, thisWeek, thisMonth, later].forEach((arr) => arr.sort((a, b) => a.date.localeCompare(b.date)));

    return [
      { label: "Overdue", date: "", items: overdue, color: "#e54a28" },
      { label: "Today", date: today, items: todayItems, color: "var(--color-warm-accent)" },
      { label: "Tomorrow", date: tomorrow, items: tomorrowItems, color: "#7aaa6a" },
      { label: "This week", date: "", items: thisWeek, color: "var(--color-warm-text)" },
      { label: "This month", date: "", items: thisMonth, color: "var(--color-warm-text-muted)" },
      { label: "Later", date: "", items: later, color: "var(--color-warm-text-light)" },
    ];
  }, [itemsByDate]);

  function handleTaskToggle(taskId: string) {
    toggleTask(taskId);
    refresh();
  }
  function handleTaskDelete(taskId: string) {
    if (!confirm("Remove this task?")) return;
    deleteTask(taskId);
    refresh();
  }

  const totalItems = sections.reduce((s, sec) => s + sec.items.length, 0);
  const overdueCount = sections[0].items.length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header style={{ marginBottom: "28px" }}>
            <div className="pv-mono-label" style={{ marginBottom: "8px" }}>
              Rep Portal · Calendar
              {ownerName && <span style={{ marginLeft: "12px", color: "var(--color-warm-text-muted)" }}>· {ownerName}{admin && " (admin)"}</span>}
            </div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--color-warm-text)", margin: 0 }}>
              What&apos;s <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>coming up.</em>
            </h1>
            <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "8px 0 0", lineHeight: 1.6 }}>
              {totalItems > 0
                ? `${totalItems} item${totalItems !== 1 ? "s" : ""} across the next 30 days. ${overdueCount > 0 ? `${overdueCount} overdue — handle those first.` : "Nothing overdue. Keep moving."}`
                : "Calendar's empty. Open a contact in the CRM and set a next follow-up date or add a task to populate this view."}
            </p>
          </header>

          {totalItems === 0 ? (
            <div style={{ padding: "60px 40px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", textAlign: "center" }}>
              <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto" }}>
                Set <strong style={{ color: "var(--color-warm-accent)" }}>next follow-up dates</strong> on contacts in the CRM, or add <strong style={{ color: "var(--color-warm-accent)" }}>tasks</strong> linked to contacts. This calendar surfaces both in one place so you always know what&apos;s next.
              </p>
              <Link href="/rep-portal/crm" className="pv-btn-primary" style={{ marginTop: "20px", display: "inline-block" }}>Go to CRM</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {sections.map((sec) => (
                sec.items.length > 0 && (
                  <section key={sec.label}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "10px", borderBottom: `1px solid ${sec.color}33`, paddingBottom: "8px" }}>
                      <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: sec.color, fontWeight: 700, margin: 0 }}>
                        {sec.label} ({sec.items.length})
                      </h3>
                      {sec.date && <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), monospace" }}>{fmtDate(sec.date)}</span>}
                    </div>
                    <div style={{ display: "grid", gap: "6px" }}>
                      {sec.items.map((it, i) => (
                        <div key={`${it.type}-${it.taskId || it.contactId}-${i}`} style={{ display: "grid", gridTemplateColumns: "auto 100px 1fr auto", gap: "12px", alignItems: "center", padding: "10px 14px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                          {it.type === "task" && it.taskId ? (
                            <input type="checkbox" checked={it.done || false} onChange={() => handleTaskToggle(it.taskId!)} style={{ accentColor: sec.color }} />
                          ) : (
                            <div style={{ width: "14px", textAlign: "center", color: sec.color, fontSize: "16px" }}>📅</div>
                          )}
                          <div style={{ fontFamily: "var(--font-dm-sans), monospace", fontSize: "11px", color: sec.color, letterSpacing: "0.05em" }}>
                            {fmtDate(it.date)}
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.4 }}>
                              <strong>{it.title}</strong>
                              <span style={{ color: "var(--color-warm-text-muted)", fontWeight: 400, marginLeft: "8px", fontStyle: "italic" }}>· {it.contactStage}</span>
                            </div>
                            <Link href={`/rep-portal/crm/${it.contactId}`} style={{ fontSize: "11px", color: "var(--color-warm-accent)", textDecoration: "none" }}>
                              → {it.contactName}
                            </Link>
                          </div>
                          {it.type === "task" && it.taskId && (
                            <button onClick={() => handleTaskDelete(it.taskId!)} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", padding: "4px 8px", fontSize: "14px" }}>×</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
