"use client";

import { useState } from "react";
import Link from "next/link";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  businessType: string;
  createdAt: string;
}

function saveSubscriber(data: Omit<Subscriber, "id" | "createdAt">) {
  const existing: Subscriber[] = JSON.parse(localStorage.getItem("pv_newsletter") || "[]");
  if (existing.some(s => s.email === data.email)) return;
  existing.unshift({ ...data, id: Date.now().toString(), createdAt: new Date().toISOString() });
  localStorage.setItem("pv_newsletter", JSON.stringify(existing));
}

const BUSINESS_TYPES = [
  "Salon or barber shop", "Restaurant or food", "HVAC, plumbing or trades",
  "Retail", "Healthcare or wellness", "Real estate",
  "Professional services", "Other",
];

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveSubscriber({ name, email, businessType });
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    setSubmitted(true);
  };


const CSS = `
.nl { min-height: 100vh; background: var(--bg); color: var(--fg); font-family: var(--font-body); }
.nl__bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px var(--gutter); border-bottom: 1px solid var(--line); }
.nl__brand { display: inline-flex; align-items: center; gap: 10px; color: var(--fg); text-decoration: none; font: 600 17px/1 var(--font-display); min-height: 44px; }
.nl__home { color: var(--muted); font-size: 14px; text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; }
.nl__home:hover { color: var(--gold-text); }
.nl__main { max-width: 640px; margin: 0 auto; padding: 64px var(--gutter) 96px; }
.nl h1 { font: 600 clamp(32px, 6vw, 48px)/1.1 var(--font-display); margin: 0 0 16px; }
.nl__lede { color: var(--fg-2); font-size: 18px; line-height: 1.6; margin: 0 0 40px; max-width: 48ch; }
.nl__list { margin: 0 0 40px; padding: 0; list-style: none; border-top: 1px solid var(--line); }
.nl__list li { padding: 14px 0; border-bottom: 1px solid var(--line); }
.nl__list b { display: block; color: var(--gold-text); margin-bottom: 2px; }
.nl__list span { color: var(--muted); font-size: 15px; }
.nl__form { display: flex; flex-direction: column; gap: 14px; }
.nl__two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.nl__done h2 { font: 600 24px/1.2 var(--font-display); color: var(--gold-text); margin: 0 0 8px; }
.nl__done p { color: var(--fg-2); margin: 0; }
.nl__fine { color: var(--subtle); font-size: 14px; margin: 16px 0 0; }
@media (max-width: 860px) { .nl__two { grid-template-columns: minmax(0, 1fr); } .nl__main { padding-top: 40px; } }
`;

  return (
    <div className="nl">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="nl__bar">
        <Link href="/" className="nl__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-foil.svg" alt="" width={32} height={32} />
          Purcell Ventures
        </Link>
        <Link href="/" className="nl__home">Home</Link>
      </div>

      <main className="nl__main">
        <h1>AI tips for local business owners</h1>
        <p className="nl__lede">A weekly email on how small businesses use AI tools to save time.</p>

        <ul className="nl__list">
          {[
            { title: "Tool of the week", desc: "One AI tool each week, with how to use it and what it costs." },
            { title: "Case studies", desc: "Examples from small businesses that use AI." },
            { title: "Prompts you can use", desc: "Copy-and-paste prompts written for small business owners." },
            { title: "Unsubscribe any time", desc: "Every email has an unsubscribe link." },
          ].map(item => (
            <li key={item.title}><b>{item.title}</b><span>{item.desc}</span></li>
          ))}
        </ul>

        {submitted ? (
          <div className="nl__done">
            <h2>You are subscribed.</h2>
            <p>The first issue arrives next week.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="nl__form">
            <div className="nl__two">
              <div className="ui-field"><label htmlFor="nl-name">Your name</label><input id="nl-name" required placeholder="Your name" value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="ui-field"><label htmlFor="nl-email">Email address</label><input id="nl-email" required type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} /></div>
            </div>
            <div className="ui-field">
              <label htmlFor="nl-type">Type of business (optional)</label>
              <select id="nl-type" value={businessType} onChange={e => setBusinessType(e.target.value)}>
                <option value="">Choose one</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading} className="ui-btn" style={{ justifyContent: "center", minHeight: 48, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Subscribing" : "Subscribe for free"}
            </button>
          </form>
        )}

        <p className="nl__fine">One email per week.</p>
      </main>
    </div>
  );
}
