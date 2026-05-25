/**
 * Robust CRM storage layer. localStorage-backed for v1; designed to swap to
 * Firestore in v2 by replacing the implementations of the load/save functions.
 * Everything goes through this module — components don't touch localStorage directly.
 */

export const STAGES = ["Lead", "Contacted", "Qualified", "Quoted", "Negotiation", "Closed Won", "Closed Lost"] as const;
export type Stage = (typeof STAGES)[number];

export const STAGE_COLORS: Record<Stage, string> = {
  "Lead":          "#d4af37",
  "Contacted":     "#7aaa6a",
  "Qualified":     "#9b7fd4",
  "Quoted":        "#e8b968",
  "Negotiation":   "#c2754a",
  "Closed Won":    "#4a9a6a",
  "Closed Lost":   "#6a4a4a",
};

export type ActivityType = "call" | "email" | "sms" | "meeting" | "note" | "stage_change" | "task";

export const ACTIVITY_ICONS: Record<ActivityType, string> = {
  call: "📞",
  email: "✉️",
  sms: "💬",
  meeting: "🤝",
  note: "📝",
  stage_change: "🔄",
  task: "✓",
};

export interface Activity {
  id: string;
  type: ActivityType;
  date: string;       // ISO
  description: string;
  outcome?: string;
}

export interface Contact {
  id: string;
  // Identity
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  // Contact
  email: string;
  phone: string;
  // Pipeline
  stage: Stage;
  estimatedValue: number;
  service: string;
  source: string;
  ownerName: string;  // who owns this contact (rep name from cookie)
  // Tags + custom
  tags: string[];
  customFields: Record<string, string>;
  // Dates
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  nextFollowUp?: string;
  // Log
  activities: Activity[];
  notes: string;
}

export interface Task {
  id: string;
  contactId: string;
  contactName: string;  // denormalized for display
  title: string;
  dueDate: string;
  done: boolean;
  createdAt: string;
}

const KEY_CONTACTS = "pv_crm_v2_contacts";
const KEY_TASKS = "pv_crm_v2_tasks";

// ─── Admin detection ───────────────────────────────────────────────────────
// Names recognized as admin (case-insensitive substring match against pv_rep_name cookie).
// Admin sees all contacts/tasks across reps; non-admin sees only their own.
const ADMIN_NAME_PATTERNS = ["elijah", "purcell"];

export function isAdmin(repName: string | null | undefined): boolean {
  if (!repName) return false;
  const lower = repName.toLowerCase();
  return ADMIN_NAME_PATTERNS.some((p) => lower.includes(p));
}

export function filterByOwner(contacts: Contact[], repName: string): Contact[] {
  if (!repName) return contacts;
  if (isAdmin(repName)) return contacts;
  return contacts.filter((c) => c.ownerName === repName);
}

export function filterTasksByOwner(tasks: Task[], contacts: Contact[], repName: string): Task[] {
  if (!repName) return tasks;
  if (isAdmin(repName)) return tasks;
  const ownedIds = new Set(contacts.filter((c) => c.ownerName === repName).map((c) => c.id));
  return tasks.filter((t) => ownedIds.has(t.contactId));
}

export function reassignContact(contactId: string, newOwner: string, byName: string) {
  const all = loadContacts();
  const c = all.find((x) => x.id === contactId);
  if (!c) return;
  const oldOwner = c.ownerName;
  c.ownerName = newOwner;
  c.updatedAt = new Date().toISOString();
  c.activities.unshift({
    id: crypto.randomUUID(),
    type: "stage_change",
    date: new Date().toISOString(),
    description: `${byName || "Admin"} reassigned from ${oldOwner || "(unowned)"} to ${newOwner}`,
  });
  saveContacts(all);
}

export function statsByRep(contacts: Contact[]): Array<{ rep: string; total: number; openValue: number; closedWonValue: number; closedWon: number; closedLost: number; winRate: number }> {
  const byRep = new Map<string, Contact[]>();
  contacts.forEach((c) => {
    const k = c.ownerName || "(unassigned)";
    if (!byRep.has(k)) byRep.set(k, []);
    byRep.get(k)!.push(c);
  });
  return Array.from(byRep.entries()).map(([rep, repContacts]) => {
    const closedWon = repContacts.filter((c) => c.stage === "Closed Won").length;
    const closedLost = repContacts.filter((c) => c.stage === "Closed Lost").length;
    const closedTotal = closedWon + closedLost;
    const openValue = repContacts.filter((c) => c.stage !== "Closed Won" && c.stage !== "Closed Lost").reduce((s, c) => s + c.estimatedValue, 0);
    const closedWonValue = repContacts.filter((c) => c.stage === "Closed Won").reduce((s, c) => s + c.estimatedValue, 0);
    return {
      rep,
      total: repContacts.length,
      openValue,
      closedWonValue,
      closedWon,
      closedLost,
      winRate: closedTotal > 0 ? (closedWon / closedTotal) * 100 : 0,
    };
  }).sort((a, b) => b.closedWonValue - a.closedWonValue);
}

// ─── Contact Health Score (0-100) ─────────────────────────────────────────
// Combines multiple signals into a single health metric so reps can scan
// the list view and spot atrophying deals at a glance.
//
// Components:
//   - Stage advancement (further along = more committed = healthier)
//   - Recency (recent touches good, silence bad)
//   - Overdue follow-up (penalty)
//   - Activity volume (rich timeline = engaged relationship)
//   - Stage-specific decay (a Quoted contact going silent is worse than a Lead)
//
// Returns 0 (cold/dead) to 100 (Closed Won).

export interface HealthScore {
  score: number;       // 0-100
  label: "Won" | "Hot" | "Warm" | "Cooling" | "Cold" | "Lost";
  color: string;       // hex
  reasoning: string[]; // 1-3 short bullets explaining the score
}

const STAGE_HEALTH_BASE: Record<Stage, number> = {
  "Lead": 20,
  "Contacted": 35,
  "Qualified": 50,
  "Quoted": 65,
  "Negotiation": 80,
  "Closed Won": 100,
  "Closed Lost": 0,
};

export function healthScore(contact: Contact): HealthScore {
  if (contact.stage === "Closed Lost") {
    return { score: 0, label: "Lost", color: "#6a4a4a", reasoning: ["Closed Lost"] };
  }
  if (contact.stage === "Closed Won") {
    return { score: 100, label: "Won", color: "#4a9a6a", reasoning: ["Closed Won"] };
  }

  let score = STAGE_HEALTH_BASE[contact.stage];
  const reasoning: string[] = [];

  // Recency: bonus or penalty based on last activity
  const lastActivity = contact.activities[0];
  if (lastActivity) {
    const daysSince = Math.floor((Date.now() - new Date(lastActivity.date).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince <= 3) {
      score += 12;
      reasoning.push(`Touched ${daysSince}d ago — fresh`);
    } else if (daysSince <= 7) {
      score += 4;
      reasoning.push(`${daysSince}d since last touch — recent`);
    } else if (daysSince <= 14) {
      reasoning.push(`${daysSince}d since last touch`);
    } else if (daysSince <= 30) {
      score -= 12;
      reasoning.push(`${daysSince}d since touch — going cold`);
    } else {
      score -= 25;
      reasoning.push(`${daysSince}d silent — likely cold`);
    }
  } else {
    score -= 8;
    reasoning.push("No activity logged yet");
  }

  // Overdue follow-up penalty
  const today = new Date().toISOString().slice(0, 10);
  if (contact.nextFollowUp && contact.nextFollowUp < today) {
    const overdueDays = Math.floor((new Date(today).getTime() - new Date(contact.nextFollowUp).getTime()) / (1000 * 60 * 60 * 24));
    const penalty = Math.min(20, overdueDays * 2);
    score -= penalty;
    reasoning.push(`Follow-up ${overdueDays}d overdue`);
  }

  // Engagement bonus: rich activity log signals real relationship
  if (contact.activities.length >= 5) {
    score += 6;
    reasoning.push(`${contact.activities.length} activities logged — engaged`);
  } else if (contact.activities.length >= 2) {
    score += 2;
  }

  // Notes bonus: rep is taking it seriously
  if (contact.notes && contact.notes.length > 50) {
    score += 3;
  }

  // Clamp
  score = Math.max(1, Math.min(99, Math.round(score)));

  let label: HealthScore["label"];
  let color: string;
  if (score >= 80) { label = "Hot"; color = "#4a9a6a"; }
  else if (score >= 60) { label = "Warm"; color = "#7aaa6a"; }
  else if (score >= 40) { label = "Cooling"; color = "#e8b968"; }
  else { label = "Cold"; color = "#e54a28"; }

  return { score, label, color, reasoning };
}

export function allOwnerNames(contacts: Contact[]): string[] {
  const set = new Set<string>();
  contacts.forEach((c) => { if (c.ownerName) set.add(c.ownerName); });
  return Array.from(set).sort();
}

// ─── Forecasting ───────────────────────────────────────────────────────────
// Industry-standard probabilistic forecast: each open stage has a
// historical-conversion-based weight. Multiply estimated value × weight,
// sum across pipeline → expected Closed Won dollars.
// These weights are starter defaults; tune over time using actual win rate.
export const STAGE_FORECAST_WEIGHTS: Record<Stage, number> = {
  "Lead":         0.05,   // Cold, just entered the funnel
  "Contacted":    0.15,   // At least one touch
  "Qualified":    0.30,   // Confirmed fit and budget
  "Quoted":       0.50,   // Price on the table
  "Negotiation":  0.75,   // Active negotiation, real signal of intent
  "Closed Won":   1.00,   // Already won
  "Closed Lost":  0.00,   // No revenue
};

export function forecastForContacts(contacts: Contact[]) {
  let expected = 0;
  let byStage: Record<Stage, { count: number; raw: number; weighted: number }> = {} as Record<Stage, { count: number; raw: number; weighted: number }>;
  STAGES.forEach((s) => { byStage[s] = { count: 0, raw: 0, weighted: 0 }; });

  contacts.forEach((c) => {
    const w = STAGE_FORECAST_WEIGHTS[c.stage];
    const weighted = c.estimatedValue * w;
    byStage[c.stage].count++;
    byStage[c.stage].raw += c.estimatedValue;
    byStage[c.stage].weighted += weighted;
    expected += weighted;
  });

  const alreadyWon = byStage["Closed Won"].raw;
  const remainingExpected = expected - alreadyWon;
  const openPipelineRaw = contacts
    .filter((c) => c.stage !== "Closed Won" && c.stage !== "Closed Lost")
    .reduce((s, c) => s + c.estimatedValue, 0);

  return {
    expected,             // total expected $ across pipeline (won + weighted-open)
    alreadyWon,            // $ from contacts already at Closed Won
    remainingExpected,     // weighted forecast of open pipeline only
    openPipelineRaw,       // raw open-pipeline $ (unweighted)
    byStage,
  };
}

// ─── Storage primitives ────────────────────────────────────────────────────

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Contacts ──────────────────────────────────────────────────────────────

export function loadContacts(): Contact[] {
  return safeRead<Contact[]>(KEY_CONTACTS, []);
}

export function saveContacts(contacts: Contact[]) {
  safeWrite(KEY_CONTACTS, contacts);
}

export function emptyContact(ownerName: string = ""): Contact {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    firstName: "",
    lastName: "",
    company: "",
    title: "",
    email: "",
    phone: "",
    stage: "Lead",
    estimatedValue: 0,
    service: "",
    source: "",
    ownerName,
    tags: [],
    customFields: {},
    createdAt: now,
    updatedAt: now,
    activities: [],
    notes: "",
  };
}

export function contactDisplayName(c: Contact): string {
  const fullName = [c.firstName, c.lastName].filter(Boolean).join(" ").trim();
  if (fullName && c.company) return `${fullName} (${c.company})`;
  return fullName || c.company || "(unnamed)";
}

export function upsertContact(updated: Contact) {
  const all = loadContacts();
  updated.updatedAt = new Date().toISOString();
  const idx = all.findIndex((c) => c.id === updated.id);
  if (idx >= 0) {
    all[idx] = updated;
  } else {
    all.unshift(updated);
  }
  saveContacts(all);
  return all;
}

export function deleteContact(id: string) {
  const remaining = loadContacts().filter((c) => c.id !== id);
  saveContacts(remaining);
  // Cascade: remove tasks for this contact
  const tasks = loadTasks().filter((t) => t.contactId !== id);
  saveTasks(tasks);
  return remaining;
}

export function changeStage(contactId: string, newStage: Stage, byName: string) {
  const all = loadContacts();
  const contact = all.find((c) => c.id === contactId);
  if (!contact) return;
  const oldStage = contact.stage;
  contact.stage = newStage;
  contact.updatedAt = new Date().toISOString();
  if (newStage === "Closed Won" || newStage === "Closed Lost") {
    contact.closedAt = contact.updatedAt;
  }
  contact.activities.unshift({
    id: crypto.randomUUID(),
    type: "stage_change",
    date: new Date().toISOString(),
    description: `${byName || "Someone"} moved stage from "${oldStage}" to "${newStage}"`,
  });
  saveContacts(all);
  return all;
}

export function addActivity(contactId: string, activity: Omit<Activity, "id">) {
  const all = loadContacts();
  const c = all.find((x) => x.id === contactId);
  if (!c) return;
  c.activities.unshift({ id: crypto.randomUUID(), ...activity });
  c.updatedAt = new Date().toISOString();
  saveContacts(all);
}

// ─── Tasks ─────────────────────────────────────────────────────────────────

export function loadTasks(): Task[] {
  return safeRead<Task[]>(KEY_TASKS, []);
}

export function saveTasks(tasks: Task[]) {
  safeWrite(KEY_TASKS, tasks);
}

export function addTask(task: Omit<Task, "id" | "createdAt">) {
  const all = loadTasks();
  all.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...task,
  });
  saveTasks(all);
  return all;
}

export function toggleTask(id: string) {
  const all = loadTasks();
  const t = all.find((x) => x.id === id);
  if (t) {
    t.done = !t.done;
    saveTasks(all);
  }
  return all;
}

export function deleteTask(id: string) {
  const remaining = loadTasks().filter((t) => t.id !== id);
  saveTasks(remaining);
  return remaining;
}

// ─── Derived data ──────────────────────────────────────────────────────────

export function statsForContacts(contacts: Contact[]) {
  const byStage = STAGES.reduce<Record<Stage, { count: number; value: number }>>((acc, s) => {
    acc[s] = { count: 0, value: 0 };
    return acc;
  }, {} as Record<Stage, { count: number; value: number }>);

  const bySource = new Map<string, { count: number; value: number }>();
  let totalOpenValue = 0;
  let totalClosedWonValue = 0;
  let closedWonCount = 0;
  let closedLostCount = 0;

  contacts.forEach((c) => {
    byStage[c.stage].count++;
    byStage[c.stage].value += c.estimatedValue;

    const src = c.source || "(unknown)";
    if (!bySource.has(src)) bySource.set(src, { count: 0, value: 0 });
    bySource.get(src)!.count++;
    bySource.get(src)!.value += c.estimatedValue;

    if (c.stage === "Closed Won") {
      totalClosedWonValue += c.estimatedValue;
      closedWonCount++;
    } else if (c.stage === "Closed Lost") {
      closedLostCount++;
    } else {
      totalOpenValue += c.estimatedValue;
    }
  });

  const closedTotal = closedWonCount + closedLostCount;
  const winRate = closedTotal > 0 ? (closedWonCount / closedTotal) * 100 : 0;

  return {
    byStage,
    bySource: Array.from(bySource.entries()).map(([source, v]) => ({ source, ...v })).sort((a, b) => b.value - a.value),
    totalOpenValue,
    totalClosedWonValue,
    closedWonCount,
    closedLostCount,
    winRate,
    totalContacts: contacts.length,
  };
}

export function overdueTasks(tasks: Task[]): Task[] {
  const today = new Date().toISOString().slice(0, 10);
  return tasks.filter((t) => !t.done && t.dueDate && t.dueDate < today);
}

export function todayTasks(tasks: Task[]): Task[] {
  const today = new Date().toISOString().slice(0, 10);
  return tasks.filter((t) => !t.done && t.dueDate === today);
}

export function upcomingTasks(tasks: Task[], days: number = 7): Task[] {
  const today = new Date().toISOString().slice(0, 10);
  const future = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return tasks.filter((t) => !t.done && t.dueDate > today && t.dueDate <= future);
}

// ─── Export / Import ───────────────────────────────────────────────────────

export function exportAll(): string {
  return JSON.stringify({
    version: 2,
    exportedAt: new Date().toISOString(),
    contacts: loadContacts(),
    tasks: loadTasks(),
  }, null, 2);
}

export function importAll(json: string): { ok: boolean; error?: string; counts?: { contacts: number; tasks: number } } {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.contacts || !Array.isArray(parsed.contacts)) return { ok: false, error: "Missing contacts array" };
    if (parsed.tasks && !Array.isArray(parsed.tasks)) return { ok: false, error: "tasks must be an array" };
    saveContacts(parsed.contacts);
    saveTasks(parsed.tasks || []);
    return { ok: true, counts: { contacts: parsed.contacts.length, tasks: (parsed.tasks || []).length } };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
