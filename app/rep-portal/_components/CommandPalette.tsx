"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { loadContacts, type Contact } from "@/lib/crm-storage";

/**
 * Command Palette — Cmd+K / Ctrl+K opens.
 *
 * Searchable across:
 *   - Every rep portal page
 *   - Every contact in the CRM (jumps to detail page)
 *   - Every AI tool (jumps to standalone tool page)
 *   - Common commands (Add contact, Toggle admin view, Logout)
 *
 * Keyboard-driven: arrow keys + enter + escape.
 */

interface Item {
  kind: "page" | "contact" | "tool" | "command";
  label: string;
  sub?: string;
  href?: string;
  action?: () => void;
  emoji: string;
}

const PAGES: Item[] = [
  { kind: "page", label: "Dashboard", sub: "Overdue, today, contacts, value", href: "/rep-portal", emoji: "◐" },
  { kind: "page", label: "CRM", sub: "Contacts, kanban, tasks, stats, leaderboard, coach", href: "/rep-portal/crm", emoji: "◇" },
  { kind: "page", label: "Calendar", sub: "Tasks + follow-ups by date", href: "/rep-portal/calendar", emoji: "▦" },
  { kind: "page", label: "Pricing reference", sub: "Source of truth for every quote", href: "/rep-portal/pricing", emoji: "$" },
  { kind: "page", label: "Products", sub: "Encyclopedia of what we sell", href: "/rep-portal/products", emoji: "▤" },
  { kind: "page", label: "Scripts", sub: "5 close frameworks + follow-up cadences", href: "/rep-portal/scripts", emoji: "✎" },
  { kind: "page", label: "Handbook", sub: "Full rep handbook (8 sections)", href: "/rep-portal/handbook", emoji: "▥" },
  { kind: "page", label: "Playbook", sub: "Mid-call quick reference", href: "/rep-portal/playbook", emoji: "▤" },
  { kind: "page", label: "Templates", sub: "Saved email templates with tokens", href: "/rep-portal/templates", emoji: "✉" },
  { kind: "page", label: "Demo Tools", sub: "In-pitch tool launcher", href: "/rep-portal/demo-tools", emoji: "▣" },
  { kind: "page", label: "Help", sub: "How to use everything", href: "/rep-portal/help", emoji: "?" },
  { kind: "page", label: "Settings", sub: "Your preferences", href: "/rep-portal/settings", emoji: "⚙" },
  // AI tools
  { kind: "tool", label: "AI Ask", sub: "Mid-pitch chatbot", href: "/rep-portal/ask", emoji: "✦" },
  { kind: "tool", label: "AI Objection Handler", sub: "3 response strategies", href: "/rep-portal/objections", emoji: "✦" },
  { kind: "tool", label: "AI Pitch Coach", sub: "Critique + rewrite", href: "/rep-portal/pitch-coach", emoji: "✦" },
  { kind: "tool", label: "AI Call Recap", sub: "Structure messy post-call notes", href: "/rep-portal/call-recap", emoji: "✦" },
  { kind: "tool", label: "AI Email Polish", sub: "Sharpen rough drafts", href: "/rep-portal/email-polish", emoji: "✦" },
  // Customer-facing tools (open in new tab)
  { kind: "tool", label: "Tool: AI FAQ Builder", sub: "Customer-side", href: "/digital/tools/faq-builder", emoji: "✦" },
  { kind: "tool", label: "Tool: Content Generator", sub: "Customer-side", href: "/digital/tools/content-generator", emoji: "✦" },
  { kind: "tool", label: "Tool: Brand Kit Builder", sub: "Customer-side", href: "/digital/tools/brand-kit", emoji: "✦" },
  { kind: "tool", label: "Tool: Email Composer", sub: "Customer-side", href: "/digital/tools/email-composer", emoji: "✦" },
];

const COMMANDS: Item[] = [
  { kind: "command", label: "Add new contact", sub: "Opens CRM with form", href: "/rep-portal/crm", emoji: "+" },
  { kind: "command", label: "Open admin onboard helper", sub: "For new reps (admin only)", href: "/rep-portal/onboard", emoji: "⚙" },
  { kind: "command", label: "Log out", sub: "End session", emoji: "→", action: () => {
    fetch("/api/rep-auth", { method: "DELETE" }).then(() => {
      window.location.href = "/rep-portal/login";
    });
  }},
];

function fuzzyMatch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 100 - t.indexOf(q);
  // Fuzzy: each char of query must appear in order in text
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length ? 30 : 0;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      setContacts(loadContacts());
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const contactItems: Item[] = useMemo(() => contacts.map((c) => ({
    kind: "contact" as const,
    label: [c.firstName, c.lastName].filter(Boolean).join(" ") || "(unnamed)",
    sub: `${c.company || "—"} · ${c.stage}${c.estimatedValue ? ` · $${c.estimatedValue.toLocaleString()}` : ""}`,
    href: `/rep-portal/crm/${c.id}`,
    emoji: "◯",
  })), [contacts]);

  const allItems = useMemo(() => [...PAGES, ...COMMANDS, ...contactItems], [contactItems]);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12);
    const scored = allItems
      .map((it) => ({
        item: it,
        score: Math.max(
          fuzzyMatch(query, it.label),
          it.sub ? fuzzyMatch(query, it.sub) * 0.5 : 0
        ),
      }))
      .filter((x) => x.score > 0);
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 20).map((x) => x.item);
  }, [query, allItems]);

  useEffect(() => { setSelected(0); }, [query]);

  function pick(it: Item) {
    setOpen(false);
    if (it.action) {
      it.action();
    } else if (it.href) {
      router.push(it.href);
    }
  }

  function handleListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(filtered.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selected]) pick(filtered[selected]);
    }
  }

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "92vw",
          maxWidth: "640px",
          background: "var(--color-warm-bg)",
          border: "1px solid var(--color-warm-accent)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-warm-border)" }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleListKey}
            placeholder="Search pages, contacts, AI tools, commands…"
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "var(--color-warm-bg-alt)",
              color: "var(--color-warm-text)",
              border: "1px solid var(--color-warm-border)",
              borderRadius: 0,
              fontSize: "15px",
              outline: "none",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          />
        </div>

        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {filtered.length === 0 && (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--color-warm-text-muted)", fontStyle: "italic", fontSize: "14px" }}>
              No matches for &ldquo;{query}&rdquo;
            </div>
          )}
          {filtered.map((it, i) => (
            <button
              key={`${it.kind}-${it.label}-${i}`}
              onClick={() => pick(it)}
              onMouseEnter={() => setSelected(i)}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "28px 1fr 80px",
                gap: "12px",
                alignItems: "center",
                padding: "10px 16px",
                background: i === selected ? "var(--color-warm-bg-alt)" : "transparent",
                border: "none",
                borderLeft: i === selected ? "3px solid var(--color-warm-accent)" : "3px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: "14px", color: i === selected ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)", textAlign: "center" }}>{it.emoji}</span>
              <span>
                <span style={{ display: "block", color: "var(--color-warm-text)", fontWeight: 600, fontSize: "14px" }}>{it.label}</span>
                {it.sub && <span style={{ display: "block", color: "var(--color-warm-text-muted)", fontSize: "11px", marginTop: "2px" }}>{it.sub}</span>}
              </span>
              <span style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-text-light)", textAlign: "right", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>{it.kind}</span>
            </button>
          ))}
        </div>

        <div style={{ padding: "8px 16px", borderTop: "1px solid var(--color-warm-border)", fontSize: "11px", color: "var(--color-warm-text-light)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-dm-sans), monospace" }}>
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span>⌘K opens this</span>
        </div>
      </div>
    </div>
  );
}
