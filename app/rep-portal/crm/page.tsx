"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";
import {
  loadContacts, loadTasks, saveContacts, saveTasks, deleteContact, upsertContact, changeStage,
  addTask, toggleTask, deleteTask,
  emptyContact, contactDisplayName, statsForContacts, overdueTasks, todayTasks, upcomingTasks,
  exportAll, importAll,
  isAdmin, filterByOwner, filterTasksByOwner, statsByRep,
  forecastForContacts, STAGE_FORECAST_WEIGHTS,
  healthScore,
  STAGES, STAGE_COLORS,
  type Contact, type Stage, type Task,
} from "@/lib/crm-storage";

type View = "list" | "kanban" | "tasks" | "stats" | "reps" | "coach";

/**
 * Minimal RFC-4180-ish CSV parser. Handles quoted fields, commas inside quotes,
 * and escaped double-quotes ("" inside a quoted field becomes "). Returns 2D array.
 */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  // Strip BOM if present
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    } else {
      if (c === '"') { inQuotes = true; i++; continue; }
      if (c === ",") { row.push(field); field = ""; i++; continue; }
      if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
      if (c === "\r") { i++; continue; }
      field += c;
      i++;
    }
  }
  // Last field/row
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 0 && r.some((f) => f.trim() !== ""));
}

interface DealCoaching {
  priorities: Array<{
    contact_id: string;
    contact_name: string;
    rank: number;
    urgency: string;
    why_now: string;
    specific_action: string;
    estimated_impact: string;
  }>;
  dead_or_stalled: Array<{
    contact_id: string;
    contact_name: string;
    diagnosis: string;
    recommend: string;
  }>;
  pipeline_health: string;
}

export default function CRMPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "all">("all");
  const [tagFilter, setTagFilter] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [adminViewAll, setAdminViewAll] = useState(true); // admin toggle: see all vs only mine
  const [savedViews, setSavedViews] = useState<Array<{ name: string; search: string; stage: Stage | "all"; tag: string }>>([]);

  useEffect(() => {
    setContacts(loadContacts());
    setTasks(loadTasks());
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setOwnerName(decodeURIComponent(cookie.split("=")[1] || ""));
    const rawViews = localStorage.getItem("pv_crm_saved_views");
    if (rawViews) {
      try { setSavedViews(JSON.parse(rawViews)); } catch { /* ignore */ }
    }
  }, []);

  function persistViews(views: typeof savedViews) {
    setSavedViews(views);
    localStorage.setItem("pv_crm_saved_views", JSON.stringify(views));
  }

  function saveCurrentView() {
    const name = prompt("Name this view (e.g., 'Hot prospects this week'):");
    if (!name?.trim()) return;
    persistViews([...savedViews.filter((v) => v.name !== name.trim()), { name: name.trim(), search, stage: stageFilter, tag: tagFilter }]);
  }

  function applyView(view: typeof savedViews[number]) {
    setSearch(view.search);
    setStageFilter(view.stage);
    setTagFilter(view.tag);
  }

  function deleteView(name: string) {
    if (!confirm(`Delete saved view "${name}"?`)) return;
    persistViews(savedViews.filter((v) => v.name !== name));
  }

  const admin = isAdmin(ownerName);

  // Access-controlled views: hires only see their own, admin sees all (unless toggled)
  const accessibleContacts = useMemo(() => {
    if (admin && adminViewAll) return contacts;
    return filterByOwner(contacts, ownerName);
  }, [contacts, ownerName, admin, adminViewAll]);

  const accessibleTasks = useMemo(() => {
    if (admin && adminViewAll) return tasks;
    return filterTasksByOwner(tasks, contacts, ownerName);
  }, [tasks, contacts, ownerName, admin, adminViewAll]);

  const filtered = useMemo(() => {
    return accessibleContacts.filter((c) => {
      if (stageFilter !== "all" && c.stage !== stageFilter) return false;
      if (tagFilter && !c.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase()))) return false;
      if (search) {
        const q = search.toLowerCase();
        const inActivities = c.activities.some((a) =>
          a.description.toLowerCase().includes(q) ||
          (a.outcome || "").toLowerCase().includes(q)
        );
        const inTags = c.tags.some((t) => t.toLowerCase().includes(q));
        const hit =
          c.firstName.toLowerCase().includes(q) ||
          c.lastName.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.service.toLowerCase().includes(q) ||
          c.source.toLowerCase().includes(q) ||
          c.notes.toLowerCase().includes(q) ||
          inActivities ||
          inTags;
        if (!hit) return false;
      }
      return true;
    });
  }, [accessibleContacts, search, stageFilter, tagFilter]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    accessibleContacts.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [accessibleContacts]);

  function refresh() {
    setContacts(loadContacts());
    setTasks(loadTasks());
  }

  function startNew() {
    setEditing(emptyContact(ownerName));
  }

  function saveEditing() {
    if (!editing) return;
    if (!editing.firstName.trim() && !editing.lastName.trim() && !editing.company.trim()) {
      alert("Please enter at least a name or company.");
      return;
    }
    upsertContact(editing);
    refresh();
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this contact and all their tasks?")) return;
    deleteContact(id);
    refresh();
  }

  function handleStageChange(id: string, stage: Stage) {
    changeStage(id, stage, ownerName);
    refresh();
  }

  function handleExport() {
    const json = exportAll();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pv-crm-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!confirm("Importing will REPLACE all existing contacts and tasks. Continue?")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importAll(ev.target?.result as string);
      if (result.ok) {
        alert(`Imported ${result.counts?.contacts} contacts and ${result.counts?.tasks} tasks.`);
        refresh();
      } else {
        alert(`Import failed: ${result.error}`);
      }
    };
    reader.readAsText(file);
  }

  /**
   * Import from legacy localStorage CRM (pv_leads, pv_bookings, pv_newsletter,
   * pv_steady_intakes_v1) into CRM v2 contacts. Idempotent-ish: skips if a contact
   * with the same email or id already exists.
   */
  function handleSeedSample() {
    if (contacts.length > 0) {
      if (!confirm("You already have contacts. Add sample data on top? (Sample contacts will be tagged 'sample' so you can bulk-delete them later.)")) return;
    }
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const samples: Array<Partial<Contact> & { firstName: string; stage: Stage }> = [
      { firstName: "Sarah", lastName: "Chen", company: "Cherry Blossom Salon", email: "sarah@cherryblossomsalon.com", phone: "(770) 555-0142", stage: "Lead", estimatedValue: 99, service: "Digital Starter", source: "Web form", tags: ["sample", "salon"], notes: "Filled out the contact form at 2 AM, slept on it. Probably needs a 'how's your week going?' opener.", nextFollowUp: new Date(now + 2 * day).toISOString().slice(0, 10) },
      { firstName: "Mike", lastName: "Patterson", company: "Patterson Plumbing", email: "mike@pattersonplumb.com", phone: "(770) 555-0118", stage: "Contacted", estimatedValue: 179, service: "Digital Growth", source: "Referral — Bob's Plumbing", tags: ["sample", "trades"], notes: "Bob said Mike's been losing leads. Called Tuesday, left voicemail. He texted back asking 'what's this about'.", nextFollowUp: new Date(now + 1 * day).toISOString().slice(0, 10) },
      { firstName: "Linda", lastName: "Garcia", company: "Linda's Tax & Accounting", email: "linda@lindastax.com", phone: "(404) 555-0273", stage: "Qualified", estimatedValue: 2500, service: "AI Consulting Workshop", source: "LinkedIn outreach", tags: ["sample", "accounting", "hot"], notes: "Has 12-person team. Tax season just ended. Said 'we know we need AI but nobody on the team knows where to start.' Workshop $2,500 perfectly priced for them.", nextFollowUp: new Date(now + 3 * day).toISOString().slice(0, 10) },
      { firstName: "James", lastName: "Walker", company: "Walker Real Estate Group", email: "james@walkergroup.com", phone: "(770) 555-0411", stage: "Quoted", estimatedValue: 279, service: "Digital Full", source: "Cold outreach", tags: ["sample", "real-estate"], notes: "Toured their office Thursday. 8 agents, no consistent CRM, scattered tools. Quoted Full tier $279/mo + $1,000 setup. Asked for 'a couple days to think.'", nextFollowUp: new Date(now + 5 * day).toISOString().slice(0, 10) },
      { firstName: "Aisha", lastName: "Williams", company: "Bright Smile Pediatric Dental", email: "aisha@brightsmilepediatric.com", phone: "(770) 555-0856", stage: "Negotiation", estimatedValue: 179, service: "Digital Growth (Pilot Partner)", source: "Web form", tags: ["sample", "dental", "pilot"], notes: "Wants Pilot Partner pricing. Has 6 staff, current website 'from 2018, never updated.' Offered $490 setup + $125/mo locked 6mo. She asked if I could do $80/mo. Said no — Pilot is firm. Awaiting response.", nextFollowUp: new Date(now + 1 * day).toISOString().slice(0, 10) },
      { firstName: "Tom", lastName: "Brewer", company: "Brewer's Auto Detailing", email: "tom@brewersdetail.com", phone: "(770) 555-0289", stage: "Closed Won", estimatedValue: 99, service: "Digital Starter", source: "Word of mouth", tags: ["sample", "auto"], notes: "First close! Standard Starter. Setup starts this week. Promised website live in 5 business days.", closedAt: new Date(now - 4 * day).toISOString() },
      { firstName: "Rachel", lastName: "Foster", company: "Foster Family Law", email: "rachel@fosterlaw.com", phone: "(404) 555-0521", stage: "Closed Lost", estimatedValue: 279, service: "Digital Full", source: "Cold outreach", tags: ["sample", "law"], notes: "Pitched Full tier. They went with a competitor agency at $800/mo. Said 'we needed more white-glove handholding than your model provides.' Fair feedback, file for 90-day re-pitch.", closedAt: new Date(now - 12 * day).toISOString() },
      { firstName: "Marcus", lastName: "Hall", company: "Hall's Custom Carpentry", email: "marcus@hallscustom.com", phone: "(770) 555-0734", stage: "Contacted", estimatedValue: 0, service: "Mantle Field Services", source: "Yard sign", tags: ["sample", "trades", "mantle-only"], notes: "Saw the Mantle yard sign at a neighbor's. Wants gutter cleaning. Mantle-only, defer to David + Dad.", nextFollowUp: new Date(now - 1 * day).toISOString().slice(0, 10) }, // overdue
      { firstName: "Priya", lastName: "Sharma", company: "Sharma Wellness Studio", email: "priya@sharmawellness.com", phone: "(770) 555-0967", stage: "Lead", estimatedValue: 297, service: "College Apps course", source: "Course inquiry, for daughter", tags: ["sample", "course"], notes: "Inquired about College Apps course for her daughter. Probably easier close than the business products. $297, one-time.", nextFollowUp: new Date(now + 4 * day).toISOString().slice(0, 10) },
      { firstName: "Greg", lastName: "Olsen", company: "Olsen Construction Co.", email: "greg@olsenconst.com", phone: "(770) 555-0322", stage: "Quoted", estimatedValue: 7500, service: "Custom Software, project mgmt tool", source: "Referral", tags: ["sample", "construction", "custom-software", "escalate-elijah"], notes: "Wants custom project management tool. Discovery call w/ Elijah was Wed. Quoted $7,500. Awaiting decision. SENIOR REP — Elijah needs to close.", nextFollowUp: new Date(now + 6 * day).toISOString().slice(0, 10) },
    ];

    const newContacts: Contact[] = samples.map((s) => {
      const c = emptyContact(ownerName || "Elijah");
      Object.assign(c, s);
      c.activities = [
        {
          id: crypto.randomUUID(),
          type: "note",
          date: new Date(now - Math.random() * 10 * day).toISOString(),
          description: `Sample contact created for demo purposes`,
          outcome: "Delete the 'sample' tag once you have real contacts",
        },
      ];
      // Add a stage_change activity if not Lead
      if (s.stage !== "Lead") {
        c.activities.unshift({
          id: crypto.randomUUID(),
          type: "stage_change",
          date: new Date(now - Math.random() * 5 * day).toISOString(),
          description: `Moved to ${s.stage}`,
        });
      }
      return c;
    });

    const all = [...newContacts, ...loadContacts()];
    saveContacts(all);
    refresh();
    alert(`Added ${newContacts.length} sample contacts across all stages.\n\nTo remove them later: List view → filter by tag "sample" → select all → bulk Delete.`);
  }

  function handleCSVImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      try {
        const rows = parseCSV(text);
        if (rows.length === 0) {
          alert("CSV appears empty.");
          return;
        }
        const headers = rows[0].map((h) => h.toLowerCase().trim().replace(/[_\s]+/g, ""));
        const dataRows = rows.slice(1);

        // Header detection (forgiving): map common variants to canonical fields
        function findCol(...names: string[]): number {
          for (const n of names) {
            const idx = headers.findIndex((h) => h === n.toLowerCase().replace(/[_\s]+/g, ""));
            if (idx >= 0) return idx;
          }
          return -1;
        }
        const firstNameCol = findCol("firstname", "first", "fname", "givenname");
        const lastNameCol  = findCol("lastname", "last", "lname", "surname", "familyname");
        const nameCol      = findCol("name", "fullname");  // fallback if only "name" provided
        const emailCol     = findCol("email", "e-mail", "emailaddress");
        const phoneCol     = findCol("phone", "phonenumber", "mobile", "cell");
        const companyCol   = findCol("company", "business", "organization", "org");
        const titleCol     = findCol("title", "jobtitle", "role");
        const serviceCol   = findCol("service", "interestedin", "product");
        const sourceCol    = findCol("source", "leadsource", "channel");
        const valueCol     = findCol("value", "estimatedvalue", "estimate", "deal", "amount");
        const tagsCol      = findCol("tags", "tag", "labels");
        const notesCol     = findCol("notes", "note", "comments");

        if (firstNameCol < 0 && lastNameCol < 0 && nameCol < 0 && emailCol < 0 && companyCol < 0) {
          alert("Couldn't detect any usable columns. CSV should have at least: name (or firstName/lastName), email, or company. Header row must include those column names.");
          return;
        }

        if (!confirm(`Parsed ${dataRows.length} rows. Add them as contacts (skipping duplicates by email)?`)) return;

        let added = 0;
        let skipped = 0;
        const existing = loadContacts();
        const existingEmails = new Set(existing.map((c) => c.email.toLowerCase()).filter(Boolean));

        dataRows.forEach((row) => {
          const email = (emailCol >= 0 ? row[emailCol] : "")?.trim() || "";
          if (email && existingEmails.has(email.toLowerCase())) {
            skipped++;
            return;
          }

          let firstName = (firstNameCol >= 0 ? row[firstNameCol] : "") || "";
          let lastName = (lastNameCol >= 0 ? row[lastNameCol] : "") || "";
          if (!firstName && !lastName && nameCol >= 0) {
            const parts = (row[nameCol] || "").trim().split(/\s+/);
            firstName = parts[0] || "";
            lastName = parts.slice(1).join(" ") || "";
          }

          const c = emptyContact(ownerName || "Elijah");
          c.firstName = firstName.trim();
          c.lastName = lastName.trim();
          c.email = email;
          c.phone = (phoneCol >= 0 ? row[phoneCol] : "")?.trim() || "";
          c.company = (companyCol >= 0 ? row[companyCol] : "")?.trim() || "";
          c.title = (titleCol >= 0 ? row[titleCol] : "")?.trim() || "";
          c.service = (serviceCol >= 0 ? row[serviceCol] : "")?.trim() || "";
          c.source = (sourceCol >= 0 ? row[sourceCol] : "CSV import")?.trim() || "CSV import";
          if (valueCol >= 0) {
            const v = parseFloat((row[valueCol] || "0").replace(/[^0-9.-]/g, ""));
            c.estimatedValue = isNaN(v) ? 0 : v;
          }
          if (tagsCol >= 0) {
            c.tags = (row[tagsCol] || "").split(/[,;|]/).map((t) => t.trim()).filter(Boolean);
          }
          c.tags.push("csv-import");
          c.notes = notesCol >= 0 ? (row[notesCol] || "") : "";

          upsertContact(c);
          if (email) existingEmails.add(email.toLowerCase());
          added++;
        });

        refresh();
        alert(`Import complete.\n${added} new contacts added.\n${skipped} skipped (duplicate email).`);
      } catch (err) {
        alert("CSV parse failed: " + (err as Error).message);
      }
    };
    reader.readAsText(file);
    // reset so same file can be picked again
    e.target.value = "";
  }

  function handleLegacyImport() {
    if (typeof window === "undefined") return;
    let added = 0;
    let skipped = 0;
    const existing = loadContacts();
    const existingEmails = new Set(existing.map((c) => c.email.toLowerCase()).filter(Boolean));

    type LegacyLead = { id?: string; name?: string; business?: string; phone?: string; email?: string; service?: string; message?: string; status?: string; notes?: string; createdAt?: string };
    type LegacyBooking = { id?: string; name?: string; business?: string; email?: string; phone?: string; sessionType?: string; format?: string; datePreference?: string; timePreference?: string; groupSize?: string; notes?: string; createdAt?: string };
    type LegacyNewsletter = { id?: string; name?: string; email?: string; businessType?: string; createdAt?: string };
    type LegacySteady = { id?: string; name?: string; email?: string; phone?: string; helpFor?: string; situation?: string; urgency?: string; contactPreference?: string; location?: string; hearAbout?: string; submittedAt?: string };

    const pvLeads: LegacyLead[] = JSON.parse(localStorage.getItem("pv_leads") || "[]");
    const pvBookings: LegacyBooking[] = JSON.parse(localStorage.getItem("pv_bookings") || "[]");
    const pvNewsletter: LegacyNewsletter[] = JSON.parse(localStorage.getItem("pv_newsletter") || "[]");
    const pvSteady: LegacySteady[] = JSON.parse(localStorage.getItem("pv_steady_intakes_v1") || "[]");

    function pushIfNew(input: { firstName?: string; lastName?: string; company?: string; email?: string; phone?: string; service?: string; source: string; notes?: string; tags: string[]; createdAt?: string }) {
      const emailLower = (input.email || "").toLowerCase();
      if (emailLower && existingEmails.has(emailLower)) {
        skipped++;
        return;
      }
      const c = emptyContact("Elijah");
      c.firstName = input.firstName || "";
      c.lastName = input.lastName || "";
      c.company = input.company || "";
      c.email = input.email || "";
      c.phone = input.phone || "";
      c.service = input.service || "";
      c.source = input.source;
      c.notes = input.notes || "";
      c.tags = input.tags;
      if (input.createdAt) c.createdAt = input.createdAt;
      upsertContact(c);
      if (emailLower) existingEmails.add(emailLower);
      added++;
    }

    pvLeads.forEach((lead) => {
      const [first, ...rest] = (lead.name || "").split(" ");
      pushIfNew({
        firstName: first,
        lastName: rest.join(" "),
        company: lead.business || "",
        email: lead.email,
        phone: lead.phone,
        service: lead.service || "",
        source: "Legacy /crm, site lead form",
        notes: [lead.message, lead.notes].filter(Boolean).join("\n\n"),
        tags: ["legacy", "site-lead"],
        createdAt: lead.createdAt,
      });
    });

    pvBookings.forEach((booking) => {
      const [first, ...rest] = (booking.name || "").split(" ");
      pushIfNew({
        firstName: first,
        lastName: rest.join(" "),
        company: booking.business || "",
        email: booking.email,
        phone: booking.phone,
        service: booking.sessionType || "Consulting booking",
        source: "Legacy /crm, consulting booking",
        notes: `Format: ${booking.format || "n/a"}\nPreferred date: ${booking.datePreference || "n/a"} ${booking.timePreference || ""}\nGroup size: ${booking.groupSize || "n/a"}\n\n${booking.notes || ""}`,
        tags: ["legacy", "consulting-booking"],
        createdAt: booking.createdAt,
      });
    });

    pvNewsletter.forEach((sub) => {
      const [first, ...rest] = (sub.name || "").split(" ");
      pushIfNew({
        firstName: first,
        lastName: rest.join(" "),
        email: sub.email,
        source: "Legacy /crm, newsletter signup",
        notes: `Business type: ${sub.businessType || "n/a"}`,
        tags: ["legacy", "newsletter"],
        createdAt: sub.createdAt,
      });
    });

    pvSteady.forEach((s) => {
      const [first, ...rest] = (s.name || "").split(" ");
      pushIfNew({
        firstName: first,
        lastName: rest.join(" "),
        email: s.email,
        phone: s.phone,
        service: `Steady — ${s.helpFor || ""}`,
        source: "Legacy /crm — Steady intake",
        notes: `Help for: ${s.helpFor}\nUrgency: ${s.urgency}\nContact pref: ${s.contactPreference}\nLocation: ${s.location}\n\nSituation:\n${s.situation || ""}`,
        tags: ["legacy", "steady"],
        createdAt: s.submittedAt,
      });
    });

    refresh();
    alert(`Legacy import complete.\n\n${added} new contacts added.\n${skipped} skipped (already in CRM by email match).`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .crm-filters { grid-template-columns: 1fr !important; }
          .crm-form-grid { grid-template-columns: 1fr !important; }
          .crm-form-grid-3 { grid-template-columns: 1fr !important; }
          .crm-form-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .crm-funnel-row { grid-template-columns: 80px 1fr 60px !important; }
        }
      ` }} />
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div className="pv-mono-label" style={{ marginBottom: "8px" }}>
                  Rep Portal · CRM
                  {admin && <span style={{ marginLeft: "12px", padding: "2px 10px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", letterSpacing: "0.2em", fontSize: "9px" }}>ADMIN</span>}
                </div>
                <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--color-warm-text)", margin: 0 }}>
                  {admin && adminViewAll ? "All-rep " : "Your "}
                  <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>pipeline.</em>
                </h1>
                <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "8px 0 0", maxWidth: "640px", lineHeight: 1.6 }}>
                  {admin
                    ? "You're in admin mode. You see every contact, every task, every rep's pipeline."
                    : `Your assigned contacts only. Currently logged in as: ${ownerName || "(unknown)"}.`}
                </p>
              </div>
              {admin && (
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => setAdminViewAll(true)}
                    style={{ ...viewToggleBtn, ...(adminViewAll ? viewToggleBtnActive : {}) }}
                  >All reps</button>
                  <button
                    onClick={() => setAdminViewAll(false)}
                    style={{ ...viewToggleBtn, ...(!adminViewAll ? viewToggleBtnActive : {}) }}
                  >Just mine</button>
                </div>
              )}
            </div>
          </header>

          {/* Action bar */}
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {((["list", "kanban", "tasks", "stats", "coach", ...(admin ? ["reps"] : [])] as View[])).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: "8px 14px",
                    background: view === v ? "var(--color-warm-accent)" : "transparent",
                    color: view === v ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
                    border: `1px solid ${view === v ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    cursor: "pointer",
                    fontWeight: 700,
                    borderRadius: 0,
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={startNew} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>+ Contact</button>
              <button onClick={handleExport} style={ghostBtn}>Export</button>
              <label style={{ ...ghostBtn, display: "inline-flex", alignItems: "center" }}>
                Import
                <input type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} />
              </label>
              {admin && <button onClick={handleLegacyImport} style={ghostBtn} title="Import contacts from the legacy /crm page (site leads, bookings, newsletter, Steady intakes)">Import legacy</button>}
              <label style={{ ...ghostBtn, display: "inline-flex", alignItems: "center" }} title="Upload a CSV of contacts">
                Import CSV
                <input type="file" accept=".csv,text/csv" onChange={handleCSVImport} style={{ display: "none" }} />
              </label>
              {contacts.length === 0 && <button onClick={handleSeedSample} style={{ ...ghostBtn, borderColor: "var(--color-warm-accent)", color: "var(--color-warm-accent)" }} title="Add 10 sample contacts so you can see the CRM with data">Load sample data</button>}
            </div>
          </div>

          {/* Filters (visible only for list + kanban) */}
          {(view === "list" || view === "kanban") && (
            <>
              <div className="crm-filters" style={{ display: "grid", gridTemplateColumns: "1fr 200px 200px", gap: "12px", marginBottom: "10px" }}>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, company, email, notes…" style={fieldStyle} />
                <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value as Stage | "all")} style={fieldStyle}>
                  <option value="all">All stages</option>
                  {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="text" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} placeholder="Filter by tag" list="all-tags" style={fieldStyle} />
                <datalist id="all-tags">{allTags.map((t) => <option key={t} value={t} />)}</datalist>
              </div>
              {/* Saved views */}
              <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px", fontSize: "11px" }}>
                <span style={{ color: "var(--color-warm-text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, marginRight: "4px" }}>Saved views:</span>
                {savedViews.length === 0 ? (
                  <span style={{ color: "var(--color-warm-text-light)", fontStyle: "italic" }}>none yet</span>
                ) : (
                  savedViews.map((v) => (
                    <span key={v.name} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 4px 3px 10px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                      <button onClick={() => applyView(v)} style={{ background: "transparent", border: "none", color: "var(--color-warm-accent)", cursor: "pointer", fontSize: "11px", padding: 0, fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.05em" }}>
                        {v.name}
                      </button>
                      <button onClick={() => deleteView(v.name)} aria-label={`Delete view ${v.name}`} style={{ background: "transparent", border: "none", color: "var(--color-warm-text-light)", cursor: "pointer", fontSize: "12px", padding: "0 4px", lineHeight: 1 }}>×</button>
                    </span>
                  ))
                )}
                {(search || stageFilter !== "all" || tagFilter) && (
                  <button onClick={saveCurrentView} style={{ ...ghostBtn, padding: "4px 10px", fontSize: "10px" }}>+ Save current</button>
                )}
                {(search || stageFilter !== "all" || tagFilter) && (
                  <button onClick={() => { setSearch(""); setStageFilter("all"); setTagFilter(""); }} style={{ ...ghostBtn, padding: "4px 10px", fontSize: "10px" }}>Clear filters</button>
                )}
              </div>
            </>
          )}

          {/* View body */}
          {editing ? (
            <ContactForm contact={editing} onChange={setEditing} onSave={saveEditing} onCancel={() => setEditing(null)} ownerName={ownerName} />
          ) : view === "list" ? (
            <ListView contacts={filtered} onEdit={setEditing} onDelete={handleDelete} onStageChange={handleStageChange} refresh={refresh} />
          ) : view === "kanban" ? (
            <KanbanView contacts={filtered} onEdit={setEditing} onStageChange={handleStageChange} />
          ) : view === "tasks" ? (
            <TasksView tasks={accessibleTasks} contacts={accessibleContacts} refresh={refresh} ownerName={ownerName} />
          ) : view === "reps" && admin ? (
            <RepsView contacts={contacts} />
          ) : view === "coach" ? (
            <CoachView contacts={accessibleContacts} />
          ) : (
            <StatsView contacts={accessibleContacts} tasks={accessibleTasks} />
          )}

        </main>
      </div>
    </div>
  );
}

// ─── List View ─────────────────────────────────────────────────────────────

function ListView({ contacts, onEdit, onDelete, onStageChange, refresh }: { contacts: Contact[]; onEdit: (c: Contact) => void; onDelete: (id: string) => void; onStageChange: (id: string, s: Stage) => void; refresh: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>("");
  const [bulkValue, setBulkValue] = useState<string>("");

  if (contacts.length === 0) {
    return <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "60px", fontStyle: "italic" }}>No contacts match. Click + Contact to add the first.</p>;
  }

  function toggleSelect(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  }

  function selectAll() {
    if (selected.size === contacts.length) setSelected(new Set());
    else setSelected(new Set(contacts.map((c) => c.id)));
  }

  function runBulkAction() {
    if (selected.size === 0 || !bulkAction) return;
    const ids = Array.from(selected);
    const all = loadContacts();

    if (bulkAction === "delete") {
      if (!confirm(`Delete ${ids.length} contact(s)? Their tasks will also be deleted.`)) return;
      ids.forEach((id) => deleteContact(id));
    } else if (bulkAction === "stage" && bulkValue) {
      ids.forEach((id) => {
        const c = all.find((x) => x.id === id);
        if (c) {
          c.stage = bulkValue as Stage;
          c.updatedAt = new Date().toISOString();
          c.activities.unshift({
            id: crypto.randomUUID(),
            type: "stage_change",
            date: new Date().toISOString(),
            description: `Bulk: stage moved to "${bulkValue}"`,
          });
        }
      });
      saveContacts(all);
    } else if (bulkAction === "addTag" && bulkValue.trim()) {
      const tag = bulkValue.trim();
      ids.forEach((id) => {
        const c = all.find((x) => x.id === id);
        if (c && !c.tags.includes(tag)) c.tags.push(tag);
      });
      saveContacts(all);
    } else if (bulkAction === "removeTag" && bulkValue.trim()) {
      const tag = bulkValue.trim();
      ids.forEach((id) => {
        const c = all.find((x) => x.id === id);
        if (c) c.tags = c.tags.filter((t) => t !== tag);
      });
      saveContacts(all);
    } else if (bulkAction === "reassign" && bulkValue.trim()) {
      const newOwner = bulkValue.trim();
      ids.forEach((id) => {
        const c = all.find((x) => x.id === id);
        if (c) {
          const oldOwner = c.ownerName;
          c.ownerName = newOwner;
          c.activities.unshift({
            id: crypto.randomUUID(),
            type: "stage_change",
            date: new Date().toISOString(),
            description: `Bulk: reassigned from "${oldOwner}" to "${newOwner}"`,
          });
        }
      });
      saveContacts(all);
    } else if (bulkAction === "merge") {
      if (ids.length < 2) {
        alert("Select at least 2 contacts to merge.");
        return;
      }
      const merging = ids.map((id) => all.find((c) => c.id === id)).filter((c): c is Contact => !!c);
      // Primary = most-recently-updated; merges all others into it
      merging.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      const primary = merging[0];
      const secondaries = merging.slice(1);

      const primaryDisplay = `${[primary.firstName, primary.lastName].filter(Boolean).join(" ") || "(unnamed)"} (${primary.company || "no company"})`;
      if (!confirm(`Merge ${secondaries.length} contact(s) INTO "${primaryDisplay}"?\n\nThis combines all activities, tasks, notes, and tags. Estimated value uses the highest. Stage uses the most-advanced. The other contacts are deleted afterward.\n\nThis cannot be undone.`)) {
        return;
      }

      // Stage advancement order
      const stageRank: Record<Stage, number> = { "Lead": 1, "Contacted": 2, "Qualified": 3, "Quoted": 4, "Negotiation": 5, "Closed Won": 6, "Closed Lost": 0 };

      secondaries.forEach((sec) => {
        // Combine activities
        primary.activities.unshift({
          id: crypto.randomUUID(),
          type: "stage_change",
          date: new Date().toISOString(),
          description: `Merged in ${[sec.firstName, sec.lastName].filter(Boolean).join(" ") || sec.company || "(unnamed)"} (${sec.activities.length} prior activities)`,
        });
        primary.activities = primary.activities.concat(sec.activities);

        // Combine notes
        if (sec.notes) {
          primary.notes = primary.notes
            ? `${primary.notes}\n\n--- Merged from ${[sec.firstName, sec.lastName].filter(Boolean).join(" ") || sec.company} ---\n${sec.notes}`
            : sec.notes;
        }

        // Combine tags (dedupe)
        sec.tags.forEach((t) => { if (!primary.tags.includes(t)) primary.tags.push(t); });

        // Best estimated value
        if (sec.estimatedValue > primary.estimatedValue) primary.estimatedValue = sec.estimatedValue;

        // Most-advanced stage (but not Closed Lost)
        if (sec.stage !== "Closed Lost" && stageRank[sec.stage] > stageRank[primary.stage]) {
          primary.stage = sec.stage;
        }

        // Fill missing primary fields from secondary
        if (!primary.email && sec.email) primary.email = sec.email;
        if (!primary.phone && sec.phone) primary.phone = sec.phone;
        if (!primary.company && sec.company) primary.company = sec.company;
        if (!primary.title && sec.title) primary.title = sec.title;
        if (!primary.service && sec.service) primary.service = sec.service;
        if (!primary.source && sec.source) primary.source = sec.source;
      });

      primary.updatedAt = new Date().toISOString();

      // Migrate tasks
      const allTasks = loadTasks();
      const updatedTasks = allTasks.map((t) => {
        if (secondaries.some((s) => s.id === t.contactId)) {
          return { ...t, contactId: primary.id, contactName: contactDisplayName(primary) };
        }
        return t;
      });
      saveTasks(updatedTasks);

      // Save primary, delete secondaries
      const remaining = all.filter((c) => c.id === primary.id || !secondaries.some((s) => s.id === c.id));
      const primaryIdx = remaining.findIndex((c) => c.id === primary.id);
      if (primaryIdx >= 0) remaining[primaryIdx] = primary;
      saveContacts(remaining);
    }

    setSelected(new Set());
    setBulkAction("");
    setBulkValue("");
    refresh();
  }

  return (
    <div>
      {/* Bulk action bar, only shows when selections exist */}
      {selected.size > 0 && (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", padding: "12px 16px", background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", marginBottom: "12px", flexWrap: "wrap" }}>
          <strong style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px" }}>{selected.size} selected</strong>
          <select value={bulkAction} onChange={(e) => { setBulkAction(e.target.value); setBulkValue(""); }} style={{ ...fieldStyle, padding: "6px 10px", fontSize: "12px", maxWidth: "180px" }}>
            <option value="">— Bulk action —</option>
            <option value="stage">Move to stage</option>
            <option value="addTag">Add tag</option>
            <option value="removeTag">Remove tag</option>
            <option value="reassign">Reassign owner</option>
            <option value="merge">Merge into one</option>
            <option value="delete">Delete</option>
          </select>
          {bulkAction === "stage" && (
            <select value={bulkValue} onChange={(e) => setBulkValue(e.target.value)} style={{ ...fieldStyle, padding: "6px 10px", fontSize: "12px", maxWidth: "180px" }}>
              <option value="">— Pick stage —</option>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
          {(bulkAction === "addTag" || bulkAction === "removeTag" || bulkAction === "reassign") && (
            <input type="text" value={bulkValue} onChange={(e) => setBulkValue(e.target.value)} placeholder={bulkAction === "reassign" ? "New owner name" : "Tag name"} style={{ ...fieldStyle, padding: "6px 10px", fontSize: "12px", maxWidth: "180px" }} />
          )}
          <button onClick={runBulkAction} disabled={!bulkAction || (bulkAction !== "delete" && !bulkValue)} style={{ padding: "6px 14px", background: "var(--color-warm-bg)", color: "var(--color-warm-accent)", border: "none", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700 }}>Apply</button>
          <button onClick={() => setSelected(new Set())} style={{ padding: "6px 14px", background: "transparent", color: "var(--color-warm-bg)", border: "1px solid var(--color-warm-bg)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700 }}>Clear</button>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "920px" }}>
          <thead>
            <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
              <th style={{ ...th, width: "32px" }}>
                <input type="checkbox" checked={selected.size === contacts.length && contacts.length > 0} onChange={selectAll} />
              </th>
              <th style={{ ...th, width: "70px" }} title="Contact Health Score">Health</th>
              <th style={th}>Name</th>
              <th style={th}>Company</th>
              <th style={th}>Service</th>
              <th style={th}>Stage</th>
              <th style={{ ...th, textAlign: "right" }}>Value</th>
              <th style={th}>Next follow-up</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => {
              const overdue = c.nextFollowUp && c.nextFollowUp < new Date().toISOString().slice(0, 10);
              const isSel = selected.has(c.id);
              const health = healthScore(c);
              return (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--color-warm-border)", background: isSel ? "rgba(212, 175, 55, 0.04)" : undefined }}>
                  <td style={td}>
                    <input type="checkbox" checked={isSel} onChange={() => toggleSelect(c.id)} />
                  </td>
                  <td style={td}>
                    <div title={health.reasoning.join(" · ")} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: health.color, color: "var(--color-warm-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        {health.score}
                      </span>
                      <span style={{ fontSize: "9px", color: health.color, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-dm-sans), sans-serif" }}>{health.label}</span>
                    </div>
                  </td>
                  <td style={td}>
                    <Link href={`/rep-portal/crm/${c.id}`} style={{ color: "var(--color-warm-accent)", textDecoration: "none", fontWeight: 600 }}>
                      {[c.firstName, c.lastName].filter(Boolean).join(" ") || "(unnamed)"}
                    </Link>
                    {c.email && <div style={{ fontSize: "11px", color: "var(--color-warm-text-light)" }}>{c.email}</div>}
                  </td>
                  <td style={td}>{c.company || "—"}</td>
                  <td style={{ ...td, fontSize: "12px", color: "var(--color-warm-text-muted)" }}>{c.service || "—"}</td>
                  <td style={td}>
                    <select value={c.stage} onChange={(e) => onStageChange(c.id, e.target.value as Stage)} style={{ ...fieldStyle, padding: "4px 8px", fontSize: "11px", color: STAGE_COLORS[c.stage], fontWeight: 700 }}>
                      {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ ...td, textAlign: "right", fontWeight: 600 }}>${c.estimatedValue.toLocaleString()}</td>
                  <td style={{ ...td, fontSize: "12px", color: overdue ? "#e54a28" : "var(--color-warm-text-muted)" }}>
                    {c.nextFollowUp || "—"}
                    {overdue && " · overdue"}
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <button onClick={() => onEdit(c)} style={inlineBtn}>Edit</button>
                    <button onClick={() => onDelete(c.id)} style={{ ...inlineBtn, color: "var(--color-warm-text-light)" }}>×</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Kanban View ───────────────────────────────────────────────────────────

function KanbanView({ contacts, onEdit, onStageChange }: { contacts: Contact[]; onEdit: (c: Contact) => void; onStageChange: (id: string, s: Stage) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${STAGES.length}, 240px)`, gap: "12px", overflowX: "auto", paddingBottom: "12px" }}>
      {STAGES.map((stage) => {
        const stageContacts = contacts.filter((c) => c.stage === stage);
        const totalValue = stageContacts.reduce((s, c) => s + c.estimatedValue, 0);
        return (
          <div
            key={stage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("contactId");
              if (id) onStageChange(id, stage);
            }}
            style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "12px", minHeight: "300px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", paddingBottom: "8px", borderBottom: `2px solid ${STAGE_COLORS[stage]}` }}>
              <div>
                <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "12px", color: STAGE_COLORS[stage], fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase" }}>{stage}</div>
                <div style={{ fontSize: "10px", color: "var(--color-warm-text-muted)", letterSpacing: "0.1em", marginTop: "2px" }}>{stageContacts.length} · ${totalValue.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {stageContacts.map((c) => {
                const health = healthScore(c);
                return (
                <div
                  key={c.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("contactId", c.id)}
                  onClick={() => onEdit(c)}
                  style={{ background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border-light)", borderLeft: `3px solid ${health.color}`, padding: "10px 12px", cursor: "grab", borderRadius: 0 }}
                  title={`Health: ${health.label} (${health.score}) — ${health.reasoning.join(" · ")}`}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px" }}>
                    <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", color: "var(--color-warm-text)", fontWeight: 600, flex: 1 }}>
                      {[c.firstName, c.lastName].filter(Boolean).join(" ") || c.company || "(unnamed)"}
                    </div>
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: health.color, color: "var(--color-warm-bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, fontFamily: "var(--font-dm-sans), sans-serif", flexShrink: 0 }}>
                      {health.score}
                    </span>
                  </div>
                  {c.company && [c.firstName, c.lastName].filter(Boolean).length > 0 && (
                    <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", marginTop: "2px" }}>{c.company}</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)" }}>{c.service || "—"}</span>
                    {c.estimatedValue > 0 && <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "12px", color: "var(--color-warm-accent)", fontWeight: 700 }}>${c.estimatedValue.toLocaleString()}</span>}
                  </div>
                  {c.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "6px" }}>
                      {c.tags.slice(0, 3).map((t) => (
                        <span key={t} style={{ fontSize: "9px", padding: "2px 6px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text-muted)", letterSpacing: "0.1em" }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
            {stageContacts.length === 0 && (
              <div style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>Drop here</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Tasks View ────────────────────────────────────────────────────────────

function TasksView({ tasks, contacts, refresh, ownerName }: { tasks: Task[]; contacts: Contact[]; refresh: () => void; ownerName: string }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ contactId: "", title: "", dueDate: new Date().toISOString().slice(0, 10) });

  function save() {
    if (!form.contactId || !form.title.trim()) return;
    const contact = contacts.find((c) => c.id === form.contactId);
    if (!contact) return;
    addTask({
      contactId: form.contactId,
      contactName: contactDisplayName(contact),
      title: form.title.trim(),
      dueDate: form.dueDate,
      done: false,
    });
    refresh();
    setAdding(false);
    setForm({ contactId: "", title: "", dueDate: new Date().toISOString().slice(0, 10) });
  }

  const overdue = overdueTasks(tasks);
  const today = todayTasks(tasks);
  const upcoming = upcomingTasks(tasks);
  const done = tasks.filter((t) => t.done).slice(0, 20);

  return (
    <div>
      {!adding && (
        <button onClick={() => setAdding(true)} className="pv-btn-primary" style={{ border: "none", cursor: "pointer", marginBottom: "20px" }}>+ Task</button>
      )}
      {adding && (
        <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "20px", marginBottom: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: "12px" }}>
            <select value={form.contactId} onChange={(e) => setForm({ ...form, contactId: e.target.value })} style={fieldStyle}>
              <option value="">— Pick contact —</option>
              {contacts.map((c) => <option key={c.id} value={c.id}>{contactDisplayName(c)}</option>)}
            </select>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="What's the task?" style={fieldStyle} />
            <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} style={fieldStyle} />
          </div>
          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <button onClick={save} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Add</button>
            <button onClick={() => setAdding(false)} style={ghostBtn}>Cancel</button>
          </div>
        </div>
      )}

      <TaskSection title="Overdue" tasks={overdue} contacts={contacts} refresh={refresh} accentColor="#e54a28" />
      <TaskSection title="Today" tasks={today} contacts={contacts} refresh={refresh} accentColor="var(--color-warm-accent)" />
      <TaskSection title="This week" tasks={upcoming} contacts={contacts} refresh={refresh} accentColor="#7aaa6a" />
      <TaskSection title="Recently completed" tasks={done} contacts={contacts} refresh={refresh} accentColor="var(--color-warm-text-light)" muted />
    </div>
  );
}

function TaskSection({ title, tasks, contacts, refresh, accentColor, muted = false }: { title: string; tasks: Task[]; contacts: Contact[]; refresh: () => void; accentColor: string; muted?: boolean }) {
  if (tasks.length === 0) return null;
  return (
    <section style={{ marginBottom: "32px" }}>
      <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: accentColor, marginBottom: "12px", fontWeight: 700 }}>
        {title} ({tasks.length})
      </h3>
      <div style={{ display: "grid", gap: "6px" }}>
        {tasks.map((t) => {
          const contact = contacts.find((c) => c.id === t.contactId);
          return (
            <div key={t.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr 120px auto", gap: "12px", padding: "10px 16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", alignItems: "center", opacity: muted ? 0.55 : 1 }}>
              <input type="checkbox" checked={t.done} onChange={() => { toggleTask(t.id); refresh(); }} style={{ accentColor: accentColor as string }} />
              <div>
                <div style={{ fontSize: "14px", color: "var(--color-warm-text)", textDecoration: t.done ? "line-through" : "none" }}>{t.title}</div>
                {contact && (
                  <Link href={`/rep-portal/crm/${contact.id}`} style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", textDecoration: "none" }}>
                    → {t.contactName}
                  </Link>
                )}
              </div>
              <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), monospace" }}>{t.dueDate}</div>
              <button onClick={() => { deleteTask(t.id); refresh(); }} style={inlineBtn}>×</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Stats View ────────────────────────────────────────────────────────────

function StatsView({ contacts, tasks }: { contacts: Contact[]; tasks: Task[] }) {
  const stats = useMemo(() => statsForContacts(contacts), [contacts]);

  // Funnel data, sequential stages, drop-off rate at each step
  const funnelStages: Stage[] = ["Lead", "Contacted", "Qualified", "Quoted", "Negotiation", "Closed Won"];
  const funnelData = useMemo(() => {
    // Cumulative: count of contacts who EVER reached each stage (counts current + later stages)
    const counts = funnelStages.map((s) => {
      const stageIdx = STAGES.indexOf(s);
      // Count contacts currently at this stage OR a later one (excluding Closed Lost which is a side-exit)
      return contacts.filter((c) => {
        const ci = STAGES.indexOf(c.stage);
        if (c.stage === "Closed Lost") return false;
        return ci >= stageIdx;
      }).length;
    });
    const maxCount = counts[0] || 1;
    return funnelStages.map((stage, i) => {
      const count = counts[i];
      const prev = i > 0 ? counts[i - 1] : count;
      const conversion = prev > 0 ? (count / prev) * 100 : 0;
      const widthPct = (count / maxCount) * 100;
      return { stage, count, conversion, widthPct };
    });
  }, [contacts, funnelStages]);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
        <StatCard label="Total contacts" value={stats.totalContacts} />
        <StatCard label="Open pipeline" value={`$${stats.totalOpenValue.toLocaleString()}`} accent />
        <StatCard label="Closed Won total" value={`$${stats.totalClosedWonValue.toLocaleString()}`} color="#7aaa6a" />
        <StatCard label="Win rate" value={`${stats.winRate.toFixed(0)}%`} />
      </div>

      {/* Conversion funnel */}
      <section style={{ marginBottom: "32px" }}>
        <h3 style={statsHeader}>Conversion funnel</h3>
        <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", margin: "-8px 0 16px", fontStyle: "italic" }}>
          Each bar shows how many contacts ever reached that stage. Percentage = step conversion rate from the prior stage. Closed Lost is treated as a side-exit (not counted in funnel progression).
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {funnelData.map((step, i) => (
            <div key={step.stage} style={{ display: "grid", gridTemplateColumns: "120px 1fr 100px", gap: "12px", alignItems: "center" }}>
              <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: STAGE_COLORS[step.stage], fontWeight: 700 }}>{step.stage}</div>
              <div style={{ position: "relative", height: "32px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                <div style={{
                  width: `${Math.max(step.widthPct, 2)}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${STAGE_COLORS[step.stage]}40, ${STAGE_COLORS[step.stage]}20)`,
                  borderRight: `2px solid ${STAGE_COLORS[step.stage]}`,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "12px",
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--color-warm-text)",
                  transition: "width 0.4s ease",
                }}>
                  {step.count}
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: "13px", color: i === 0 ? "var(--color-warm-text-light)" : (step.conversion >= 50 ? "#7aaa6a" : step.conversion >= 25 ? "var(--color-warm-accent)" : "#e54a28"), fontWeight: 600 }}>
                {i === 0 ? "—" : `${step.conversion.toFixed(0)}%`}
              </div>
            </div>
          ))}
        </div>
        {/* Overall funnel rate */}
        {funnelData[0].count > 0 && (
          <div style={{ marginTop: "16px", padding: "12px 16px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "13px", color: "var(--color-warm-text-muted)", textAlign: "center" }}>
            <strong style={{ color: "var(--color-warm-accent)" }}>Lead → Won overall: </strong>
            {funnelData[0].count > 0 ? ((funnelData[funnelData.length - 1].count / funnelData[0].count) * 100).toFixed(1) : 0}% &nbsp;·&nbsp;
            {funnelData[funnelData.length - 1].count} won of {funnelData[0].count} leads
          </div>
        )}
      </section>

      {/* Pipeline forecast */}
      <section style={{ marginBottom: "32px" }}>
        <h3 style={statsHeader}>Probabilistic forecast</h3>
        <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", margin: "-8px 0 16px", fontStyle: "italic" }}>
          Each open stage has a conversion-weight ({Object.entries(STAGE_FORECAST_WEIGHTS).filter(([s]) => s !== "Closed Won" && s !== "Closed Lost").map(([s, w]) => `${s}: ${(w * 100).toFixed(0)}%`).join(" · ")}). Forecast = sum of (stage value × weight). Tune weights in `lib/crm-storage.ts` as actual conversion data accumulates.
        </p>
        {(() => {
          const fc = forecastForContacts(contacts);
          return (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <StatCard label="Already won ($)" value={`$${fc.alreadyWon.toLocaleString()}`} color="#7aaa6a" />
                <StatCard label="Forecast (weighted open)" value={`$${Math.round(fc.remainingExpected).toLocaleString()}`} accent />
                <StatCard label="Open pipeline (raw)" value={`$${fc.openPipelineRaw.toLocaleString()}`} />
              </div>
              <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "16px 20px" }}>
                <div style={{ fontSize: "11px", color: "var(--color-warm-accent)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>Stage breakdown, weighted</div>
                {STAGES.filter((s) => s !== "Closed Lost").map((s) => {
                  const data = fc.byStage[s];
                  if (data.count === 0) return null;
                  const w = STAGE_FORECAST_WEIGHTS[s];
                  return (
                    <div key={s} style={{ display: "grid", gridTemplateColumns: "140px 1fr 100px 100px", gap: "12px", padding: "8px 0", borderBottom: "1px solid var(--color-warm-border)", fontSize: "13px", alignItems: "center" }}>
                      <div style={{ color: STAGE_COLORS[s], fontWeight: 700, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s}</div>
                      <div style={{ color: "var(--color-warm-text-muted)" }}>{data.count} contacts × {(w * 100).toFixed(0)}% weight</div>
                      <div style={{ textAlign: "right", color: "var(--color-warm-text-muted)" }}>${data.raw.toLocaleString()}</div>
                      <div style={{ textAlign: "right", color: "var(--color-warm-accent)", fontWeight: 600 }}>${Math.round(data.weighted).toLocaleString()}</div>
                    </div>
                  );
                })}
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 100px 100px", gap: "12px", padding: "12px 0 4px", borderTop: "2px solid var(--color-warm-accent)", marginTop: "8px", fontSize: "14px", fontWeight: 700 }}>
                  <div style={{ color: "var(--color-warm-text)", fontFamily: "'Cinzel', Georgia, serif" }}>TOTAL</div>
                  <div></div>
                  <div style={{ textAlign: "right", color: "var(--color-warm-text-muted)" }}>${(fc.openPipelineRaw + fc.alreadyWon).toLocaleString()}</div>
                  <div style={{ textAlign: "right", color: "var(--color-warm-accent)" }}>${Math.round(fc.expected).toLocaleString()}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h3 style={statsHeader}>Pipeline by stage (current state)</h3>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${STAGES.length}, 1fr)`, gap: "8px" }}>
          {STAGES.map((s) => (
            <div key={s} style={{ background: "var(--color-warm-bg-alt)", border: `1px solid ${STAGE_COLORS[s]}30`, padding: "14px 16px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: STAGE_COLORS[s], fontWeight: 700 }}>{s}</div>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--color-warm-text)", marginTop: "6px" }}>{stats.byStage[s].count}</div>
              <div style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", marginTop: "2px" }}>${stats.byStage[s].value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h3 style={statsHeader}>By source</h3>
        {stats.bySource.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>No source data yet, fill the &quot;source&quot; field on contacts to populate.</p>
        ) : (
          <div>
            {stats.bySource.map((s) => {
              const pct = stats.totalContacts > 0 ? (s.count / stats.totalContacts) * 100 : 0;
              return (
                <div key={s.source} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span style={{ color: "var(--color-warm-text)" }}>{s.source}</span>
                    <span style={{ color: "var(--color-warm-text-muted)" }}>{s.count} · ${s.value.toLocaleString()}</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", background: "var(--color-warm-bg)", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "var(--color-warm-accent)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h3 style={statsHeader}>Tasks</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          <StatCard label="Overdue" value={overdueTasks(tasks).length} color="#e54a28" />
          <StatCard label="Today" value={todayTasks(tasks).length} accent />
          <StatCard label="Upcoming (7d)" value={upcomingTasks(tasks).length} />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, accent, color }: { label: string; value: string | number; accent?: boolean; color?: string }) {
  const c = color || (accent ? "var(--color-warm-accent)" : "var(--color-warm-text)");
  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "18px 20px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", fontWeight: 700, color: c }}>{value}</div>
      <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────

function ContactForm({ contact, onChange, onSave, onCancel, ownerName }: { contact: Contact; onChange: (c: Contact) => void; onSave: () => void; onCancel: () => void; ownerName: string }) {
  const [tagInput, setTagInput] = useState("");

  function addTag() {
    const t = tagInput.trim();
    if (!t || contact.tags.includes(t)) return;
    onChange({ ...contact, tags: [...contact.tags, t] });
    setTagInput("");
  }

  function removeTag(t: string) {
    onChange({ ...contact, tags: contact.tags.filter((x) => x !== t) });
  }

  return (
    <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)", padding: "24px" }}>
      <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "0 0 20px", fontWeight: 600 }}>{contact.firstName || contact.company ? "Edit contact" : "New contact"}</h2>

      <div className="crm-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <FormInput label="First name" value={contact.firstName} onChange={(v) => onChange({ ...contact, firstName: v })} />
        <FormInput label="Last name" value={contact.lastName} onChange={(v) => onChange({ ...contact, lastName: v })} />
        <FormInput label="Company" value={contact.company} onChange={(v) => onChange({ ...contact, company: v })} />
        <FormInput label="Title" value={contact.title} onChange={(v) => onChange({ ...contact, title: v })} />
        <FormInput label="Email" type="email" value={contact.email} onChange={(v) => onChange({ ...contact, email: v })} />
        <FormInput label="Phone" value={contact.phone} onChange={(v) => onChange({ ...contact, phone: v })} />
      </div>

      <div className="crm-form-grid-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <div>
          <label style={inputLabel}>Stage</label>
          <select value={contact.stage} onChange={(e) => onChange({ ...contact, stage: e.target.value as Stage })} style={fieldStyle}>
            {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <FormInput label="Service quoted" value={contact.service} onChange={(v) => onChange({ ...contact, service: v })} placeholder="e.g., Digital Growth" />
        <FormInput label="Estimated value ($)" type="number" value={String(contact.estimatedValue)} onChange={(v) => onChange({ ...contact, estimatedValue: Number(v) || 0 })} />
        <FormInput label="Source" value={contact.source} onChange={(v) => onChange({ ...contact, source: v })} placeholder="e.g., referral, web form" />
      </div>

      <div className="crm-form-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <FormInput label="Next follow-up date" type="date" value={contact.nextFollowUp || ""} onChange={(v) => onChange({ ...contact, nextFollowUp: v })} />
        <FormInput label="Owner" value={contact.ownerName || ownerName} onChange={(v) => onChange({ ...contact, ownerName: v })} />
        <div>
          <label style={inputLabel}>Tags</label>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "6px" }}>
            {contact.tags.map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", padding: "3px 4px 3px 8px", background: "var(--color-warm-bg)", color: "var(--color-warm-accent)", border: "1px solid var(--color-warm-accent)" }}>
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  aria-label={`Remove tag ${t}`}
                  style={{ background: "transparent", border: "none", color: "var(--color-warm-accent)", cursor: "pointer", padding: "0 4px", fontSize: "13px", lineHeight: 1, fontWeight: 700 }}
                >×</button>
              </span>
            ))}
          </div>
          <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Type tag, press Enter" style={fieldStyle} />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={inputLabel}>Notes</label>
        <textarea value={contact.notes} onChange={(e) => onChange({ ...contact, notes: e.target.value })} placeholder="Free-form notes about this contact" style={{ ...fieldStyle, minHeight: "100px", resize: "vertical" }} />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={onSave} className="pv-btn-primary" style={{ border: "none", cursor: "pointer" }}>Save</button>
        <button onClick={onCancel} style={ghostBtn}>Cancel</button>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label style={inputLabel}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle} />
    </div>
  );
}

// ─── Coach View (AI Deal Coach) ────────────────────────────────────────────

function CoachView({ contacts }: { contacts: Contact[] }) {
  const [coaching, setCoaching] = useState<DealCoaching | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/deal-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contacts }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Deal Coach failed");
        return;
      }
      setCoaching(data.coaching);
      setLastRunAt(new Date().toISOString());
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  const openCount = contacts.filter((c) => c.stage !== "Closed Won" && c.stage !== "Closed Lost").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", fontWeight: 600, margin: 0 }}>AI Deal Coach</h2>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "4px 0 0", maxWidth: "640px", lineHeight: 1.6 }}>
            Looks at your whole pipeline ({openCount} open contacts) and tells you which 3-5 deals need attention now + why + exactly what to do. The opposite of scrolling through contacts hoping to find what&apos;s hot.
          </p>
        </div>
        <button onClick={run} disabled={busy} className="pv-btn-primary" style={{ border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}>
          {busy ? "Coaching…" : coaching ? "↻ Re-run coaching" : "Get coaching"}
        </button>
      </div>

      {lastRunAt && (
        <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontStyle: "italic", marginBottom: "16px" }}>
          Last run: {new Date(lastRunAt).toLocaleTimeString()} — re-run after any major change to your pipeline.
        </p>
      )}

      {error && (
        <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "12px 16px", color: "#e54a28", fontSize: "14px", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {!coaching && !busy && (
        <div style={{ padding: "60px 40px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Click <strong style={{ color: "var(--color-warm-accent)" }}>&quot;Get coaching&quot;</strong> above. AI reviews all your open contacts + activity history + stage data and returns ranked priorities for the week, deals that look dead, and a pipeline health read.
          </p>
        </div>
      )}

      {coaching && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Pipeline health */}
          <div style={{ padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", borderLeft: "3px solid var(--color-warm-accent)" }}>
            <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "10px", marginTop: 0 }}>Pipeline health read</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.7 }}>{coaching.pipeline_health}</p>
          </div>

          {/* Priorities */}
          {coaching.priorities.length > 0 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7aaa6a", fontWeight: 700, marginBottom: "12px" }}>
                Top priorities ({coaching.priorities.length})
              </h3>
              <div style={{ display: "grid", gap: "10px" }}>
                {coaching.priorities.map((p) => (
                  <div key={p.contact_id} style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: "16px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid #7aaa6a" }}>
                    <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", fontWeight: 700, color: "#7aaa6a", lineHeight: 1, textAlign: "center" }}>#{p.rank}</div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                        <Link href={`/rep-portal/crm/${p.contact_id}`} style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "17px", color: "var(--color-warm-accent)", textDecoration: "none", fontWeight: 600 }}>
                          {p.contact_name} →
                        </Link>
                        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: p.urgency === "today" ? "#e54a28" : p.urgency === "this_week" ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)", fontWeight: 700, fontFamily: "var(--font-dm-sans), sans-serif", padding: "3px 10px", border: `1px solid ${p.urgency === "today" ? "#e54a28" : p.urgency === "this_week" ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)"}` }}>
                          {p.urgency.replace("_", " ")}
                        </span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#7aaa6a", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Why now · </strong>
                        <span style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{p.why_now}</span>
                      </div>
                      <div style={{ marginBottom: "10px", padding: "10px 14px", background: "var(--color-warm-bg)", borderLeft: "2px solid var(--color-warm-accent)" }}>
                        <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Specific action · </strong>
                        <span style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>{p.specific_action}</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", fontStyle: "italic" }}>
                        Impact: {p.estimated_impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dead or stalled */}
          {coaching.dead_or_stalled.length > 0 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e54a28", fontWeight: 700, marginBottom: "12px" }}>
                Dead or stalled, kill or revive? ({coaching.dead_or_stalled.length})
              </h3>
              <div style={{ display: "grid", gap: "8px" }}>
                {coaching.dead_or_stalled.map((d) => (
                  <div key={d.contact_id} style={{ padding: "14px 18px", background: "rgba(229, 74, 40, 0.05)", border: "1px solid rgba(229, 74, 40, 0.3)" }}>
                    <Link href={`/rep-portal/crm/${d.contact_id}`} style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "15px", color: "#e54a28", textDecoration: "none", fontWeight: 600 }}>
                      {d.contact_name} →
                    </Link>
                    <div style={{ marginTop: "6px", fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--color-warm-text)" }}>Diagnosis: </strong>{d.diagnosis}
                    </div>
                    <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
                      <strong style={{ color: "#e54a28" }}>Recommend: </strong>{d.recommend}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {coaching.priorities.length === 0 && coaching.dead_or_stalled.length === 0 && (
            <div style={{ padding: "32px", textAlign: "center", background: "var(--color-warm-bg-alt)", border: "1px solid #7aaa6a" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
                ✓ Pipeline looks healthy. Nothing screaming urgent. Keep working what you&apos;ve got.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Reps View (admin only) ────────────────────────────────────────────────

function RepsView({ contacts }: { contacts: Contact[] }) {
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "quarter">("all");

  const filteredContacts = useMemo(() => {
    if (timeFilter === "all") return contacts;
    const now = new Date();
    const cutoff = timeFilter === "month"
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    return contacts.filter((c) => {
      // Count contacts based on close date for closed deals, created date for open
      const refDate = c.closedAt || c.createdAt;
      return new Date(refDate) >= cutoff;
    });
  }, [contacts, timeFilter]);

  const repStats = useMemo(() => statsByRep(filteredContacts), [filteredContacts]);
  const maxClosedWon = Math.max(...repStats.map((r) => r.closedWonValue), 1);
  const totalClosedWon = repStats.reduce((s, r) => s + r.closedWonValue, 0);

  const medalEmoji = (rank: number) => rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : "";
  const periodLabel = timeFilter === "all" ? "All time" : timeFilter === "month" ? "This month" : "This quarter";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-text)", fontWeight: 600, margin: 0 }}>Leaderboard</h2>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "4px 0 0" }}>
            Rep performance ranking — {periodLabel.toLowerCase()}. Ranked by Closed Won dollars.
          </p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {(["all", "month", "quarter"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              style={{
                padding: "6px 12px",
                background: timeFilter === t ? "var(--color-warm-accent)" : "transparent",
                color: timeFilter === t ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
                border: `1px solid ${timeFilter === t ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0,
              }}
            >
              {t === "all" ? "All time" : t === "month" ? "This month" : "This quarter"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        <StatCard label="Total Closed Won" value={`$${totalClosedWon.toLocaleString()}`} color="#7aaa6a" />
        <StatCard label="Reps on the board" value={repStats.length} />
        <StatCard label="Period" value={periodLabel} />
      </div>

      {repStats.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--color-warm-text-muted)", padding: "60px", fontStyle: "italic" }}>No closed deals in this period yet. {timeFilter !== "all" && "Try \"All time\" or wait for the first close."}</p>
      ) : (
        <>
          {/* Visual ranked list */}
          <div style={{ marginBottom: "32px" }}>
            {repStats.map((r, rank) => {
              const widthPct = (r.closedWonValue / maxClosedWon) * 100;
              return (
                <div key={r.rep} style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: "16px",
                  alignItems: "center",
                  padding: "16px 20px",
                  background: rank === 0 ? "linear-gradient(90deg, rgba(212,175,55,0.10), transparent)" : "var(--color-warm-bg-alt)",
                  border: `1px solid ${rank === 0 ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                  marginBottom: "8px",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: rank === 0 ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)", lineHeight: 1 }}>
                      #{rank + 1}
                    </div>
                    {rank < 3 && <div style={{ fontSize: "20px", marginTop: "2px" }}>{medalEmoji(rank)}</div>}
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                      <div>
                        <strong style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)" }}>{r.rep}</strong>
                        <span style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", marginLeft: "10px", letterSpacing: "0.1em", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                          {r.closedWon} won · {r.closedLost} lost · {r.winRate.toFixed(0)}% win rate
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "var(--color-warm-text-muted)" }}>
                        <span>Open: <strong style={{ color: "var(--color-warm-accent)" }}>${r.openValue.toLocaleString()}</strong></span>
                        <span>Won: <strong style={{ color: "#7aaa6a", fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px" }}>${r.closedWonValue.toLocaleString()}</strong></span>
                      </div>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "var(--color-warm-bg)", overflow: "hidden" }}>
                      <div style={{ width: `${widthPct}%`, height: "100%", background: rank === 0 ? "linear-gradient(90deg, var(--color-warm-accent), #e8c96a)" : "var(--color-warm-accent)", transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail table */}
          <h3 style={statsHeader}>Detailed breakdown</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={th}>Rep</th>
                <th style={{ ...th, textAlign: "right" }}>Contacts</th>
                <th style={{ ...th, textAlign: "right" }}>Open pipeline</th>
                <th style={{ ...th, textAlign: "right" }}>Closed Won $</th>
                <th style={{ ...th, textAlign: "right" }}>Wins</th>
                <th style={{ ...th, textAlign: "right" }}>Losses</th>
                <th style={{ ...th, textAlign: "right" }}>Win rate</th>
              </tr>
            </thead>
            <tbody>
              {repStats.map((r) => (
                <tr key={r.rep} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                  <td style={{ ...td, fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600 }}>{r.rep}</td>
                  <td style={{ ...td, textAlign: "right" }}>{r.total}</td>
                  <td style={{ ...td, textAlign: "right", color: "var(--color-warm-accent)" }}>${r.openValue.toLocaleString()}</td>
                  <td style={{ ...td, textAlign: "right", color: "#7aaa6a", fontWeight: 600 }}>${r.closedWonValue.toLocaleString()}</td>
                  <td style={{ ...td, textAlign: "right" }}>{r.closedWon}</td>
                  <td style={{ ...td, textAlign: "right" }}>{r.closedLost}</td>
                  <td style={{ ...td, textAlign: "right" }}>{r.winRate.toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div style={{ marginTop: "24px", padding: "16px 20px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
        <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "10px" }}>Admin tip · </strong>
        Reassign a contact: open the contact detail page and edit the &quot;Owner&quot; field. Activity log captures the reassignment. To move multiple contacts at once, select them in the List view and use the bulk &quot;Reassign owner&quot; action.
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif" };
const inputLabel: React.CSSProperties = { display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" };
const th: React.CSSProperties = { padding: "10px 12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" };
const td: React.CSSProperties = { padding: "10px 12px", color: "var(--color-warm-text)" };
const inlineBtn: React.CSSProperties = { background: "transparent", border: "none", color: "var(--color-warm-text-muted)", cursor: "pointer", padding: "4px 8px", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" };
const ghostBtn: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const statsHeader: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "14px", fontWeight: 700 };
const viewToggleBtn: React.CSSProperties = { padding: "6px 12px", background: "transparent", color: "var(--color-warm-text-muted)", border: "1px solid var(--color-warm-border)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0 };
const viewToggleBtnActive: React.CSSProperties = { background: "var(--color-warm-accent)", color: "var(--color-warm-bg)", borderColor: "var(--color-warm-accent)" };
