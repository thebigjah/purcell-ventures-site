"use client";

import { useState } from "react";

// The waitlist form for all three course pages. It posts { email, course } to
// /api/waitlist and shows the confirmation whether or not the request succeeds, which is
// how each course page behaved before the rebuild.

export type CourseSlug = "college-apps" | "business-launch" | "ai-automation";

export default function WaitlistForm({ course, done: doneLine }: { course: CourseSlug; done?: string }) {
  const [email, setEmail] = useState("");
  const [waitlisted, setWaitlisted] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), course }),
      });
    } catch {}
    setWaitlisted(true);
  }

  if (waitlisted) {
    return (
      <div className="ui-note" role="status">
        <p style={{ margin: 0, fontWeight: 700 }}>You are on the list.</p>
        <p className="ui-muted" style={{ margin: "6px 0 0" }}>{doneLine ?? "I will email you when enrollment opens."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleWaitlist} style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-end", maxWidth: 560 }}>
      <div className="ui-field" style={{ flex: "1 1 240px" }}>
        <label htmlFor={`waitlist-${course}`}>Email address</label>
        <input
          id={`waitlist-${course}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ minHeight: 48 }}
        />
      </div>
      <button type="submit" className="ui-btn" style={{ minHeight: 48 }}>
        Join the waitlist
      </button>
    </form>
  );
}
