"use client";

import { useState } from "react";
import s from "./digital.module.css";

// The "seven roles" comparison. Rebuilt 26 Oct 2026: the hover-only V-formation of
// silhouettes is gone (hover does nothing on a phone), and every role now shows its tools
// and salary up front. Adding and removing roles and the running total work as before.
// The saving now subtracts the $99 Starter price the line beside it quotes. It used to
// subtract 75, a number from an older price list.

const TEAM_MEMBERS = [
  {
    id: "web",
    title: "Web designer",
    salary: 5000,
    tagline: "Builds and maintains your online presence.",
    tools: ["Business Website", "Landing Page", "Portfolio and Gallery", "AI Content Generator"],
  },
  {
    id: "marketing",
    title: "Marketing manager",
    salary: 4500,
    tagline: "Runs your social posts, email newsletter and reviews.",
    tools: ["Social Media Scheduler", "Email Newsletter", "AI Caption Generator", "Review Manager"],
  },
  {
    id: "booking",
    title: "Booking coordinator",
    salary: 3500,
    tagline: "Handles bookings, events and repeat-customer rewards.",
    tools: ["Appointment Booking", "Event Registration", "Loyalty Program", "SMS Campaigns"],
  },
  {
    id: "crm",
    title: "Customer success rep",
    salary: 4000,
    tagline: "Answers customer questions and tracks leads.",
    tools: ["AI Chatbot Widget", "Simple CRM", "Lead Capture Pipeline", "AI FAQ Builder"],
  },
  {
    id: "finance",
    title: "Finance and operations",
    salary: 4500,
    tagline: "Handles estimates, invoices, expenses and inventory.",
    tools: ["Online Invoicing", "Online Estimating", "Expense Tracker", "Inventory Tracker"],
  },
  {
    id: "brand",
    title: "Brand designer",
    salary: 4500,
    tagline: "Designs your logo, colors and printed materials.",
    tools: ["Logo Designer", "Brand Kit", "Color Palette Tool", "Business Card Designer", "Social Media Templates"],
  },
  {
    id: "staff",
    title: "Office manager",
    salary: 3500,
    tagline: "Keeps your team organized and on schedule.",
    tools: ["Staff Scheduler"],
  },
];

const SUBSCRIPTION_FROM = 99;

export default function TeamBuilder() {
  const [hiredTeam, setHiredTeam] = useState<string[]>([]);

  function toggleHire(id: string) {
    setHiredTeam((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const totalSalary = TEAM_MEMBERS.filter((m) => hiredTeam.includes(m.id)).reduce((sum, m) => sum + m.salary, 0);

  return (
    <>
      <div className="ui-entries">
        {TEAM_MEMBERS.map((m) => {
          const hired = hiredTeam.includes(m.id);
          return (
            <article className="ui-entry" key={m.id}>
              <div>
                <h3>{m.title}</h3>
                <p className="ui-muted" style={{ margin: "4px 0 0" }}>{m.tagline}</p>
              </div>
              <span className={`ui-entry__when ${s.salary}`}>${m.salary.toLocaleString()} a month</span>
              <div className="ui-entry__body">
                <ul className="ui-tags ui-small" aria-label={`Tools that cover the ${m.title.toLowerCase()} role`}>
                  {m.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <button type="button" className={s.toggle} aria-pressed={hired} onClick={() => toggleHire(m.id)}>
                  {hired ? "Remove from the comparison" : "Add to the comparison"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="ui-muted ui-small" style={{ marginTop: 20 }}>
        Salaries are the average for each job divided by 12, before benefits or taxes. You can pick single tools instead of a whole role.
      </p>

      {hiredTeam.length > 0 && (
        <div className={s.summary} aria-live="polite">
          <h3>Your comparison</h3>
          <dl className="ui-facts">
            <dt>Roles selected</dt>
            <dd>{hiredTeam.length} of {TEAM_MEMBERS.length}</dd>
            <dt>Hiring would cost</dt>
            <dd>${totalSalary.toLocaleString()} a month in average salary, before benefits</dd>
            <dt>My subscription</dt>
            <dd>From ${SUBSCRIPTION_FROM} a month</dd>
            <dt>Difference</dt>
            <dd className="ui-gold">${(totalSalary - SUBSCRIPTION_FROM).toLocaleString()} a month or more</dd>
          </dl>
          <div className="ui-hero__actions">
            <a className="ui-btn" href="#contact">Ask about these tools</a>
            <span className="ui-muted ui-small">You own everything I build for you.</span>
          </div>
        </div>
      )}
    </>
  );
}
