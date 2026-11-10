"use client";
import { useState } from "react";

// One copy-ready block on the press kit: the text as a paragraph a reporter can select,
// plus a button that puts the exact same string on the clipboard.

const CSS = `
.pk-copy { margin: 0 0 28px; }
.pk-copy h3 { font-size: 15px; font-weight: 600; margin: 0 0 8px; color: var(--fg); }
.pk-copy p { margin: 0 0 10px; line-height: 1.7; color: var(--fg-2); }
.pk-copy button { background: none; border: 1px solid var(--line); color: var(--muted); font: 600 13px var(--font-body); min-height: 44px; padding: 0 16px; cursor: pointer; }
.pk-copy button:hover { color: var(--fg); border-color: var(--subtle); }
`;

export default function CopyText({ label, text }: { label: string; text: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      setDone(false);
    }
  }
  return (
    <div className="pk-copy">
      <style>{CSS}</style>
      <h3>{label}</h3>
      <p>{text}</p>
      <button type="button" onClick={copy} aria-live="polite">
        {done ? "Copied" : `Copy the ${label.toLowerCase()}`}
      </button>
    </div>
  );
}
