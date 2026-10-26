"use client";

import { useState } from "react";
import s from "./digital.module.css";
import { CONTACT } from "@/lib/contact";

// The /digital contact form. It posts to /api/contact, which hands the lead to COSMIC
// (lib/cosmic-lead.ts). If that request fails, the form falls back to opening the
// visitor's email app with the message to Elijah written, so a lead is never dropped.

const PLANS: Record<string, string> = {
  "": "Not sure, help me pick",
  starter: "Starter, $99 a month",
  growth: "Growth, $179 a month",
  full: "Full Service, $279 a month",
  custom: "Custom",
};

export default function ContactForm() {
  const [f, setF] = useState({ name: "", business: "", contact: "", need: "", plan: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const mailto = () => {
    const subject = `Digital add-ons: ${f.business || f.name || "a question"}`;
    const body = [
      `Name: ${f.name}`,
      `Business: ${f.business}`,
      `Reach me at: ${f.contact}`,
      `Plan: ${PLANS[f.plan]}`,
      "",
      f.need,
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, plan: PLANS[f.plan], source: "digital" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
    } catch {
      setState("idle");
      mailto();
    }
  };

  if (state === "sent") {
    return (
      <p className="ui-note">
        Thanks. I have your message and I reply within one business day. If it is urgent, call {CONTACT.phone}.
      </p>
    );
  }

  return (
    <form className={s.form} onSubmit={send}>
      <div className={s.formRow}>
        <div className="ui-field">
          <label htmlFor="dg-name">Your name</label>
          <input id="dg-name" name="name" type="text" required placeholder="Jane Smith" value={f.name} onChange={set("name")} />
        </div>
        <div className="ui-field">
          <label htmlFor="dg-business">Business name</label>
          <input id="dg-business" name="business" type="text" placeholder="Smith Salon" value={f.business} onChange={set("business")} />
        </div>
      </div>
      <div className="ui-field">
        <label htmlFor="dg-contact">Email or phone</label>
        <input id="dg-contact" name="contact" type="text" required placeholder="jane@smithsalon.com or (770) 555-0100" value={f.contact} onChange={set("contact")} />
      </div>
      <div className="ui-field">
        <label htmlFor="dg-need">What you need</label>
        <textarea id="dg-need" name="need" rows={4} placeholder="Your business and the problem you want solved" value={f.need} onChange={set("need")} />
      </div>
      <div className="ui-field">
        <label htmlFor="dg-fit">Which plan fits</label>
        <select id="dg-fit" name="plan" value={f.plan} onChange={set("plan")}>
          {Object.entries(PLANS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <button type="submit" className="ui-btn" disabled={state === "sending"}>{state === "sending" ? "Sending" : "Send message"}</button>
      <p className="ui-muted ui-small" style={{ margin: 0 }}>
        You can also write to {CONTACT.email} or call {CONTACT.phone}.
      </p>
    </form>
  );
}
