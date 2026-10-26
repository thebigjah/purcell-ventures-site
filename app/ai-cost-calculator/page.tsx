"use client";

// Rebuilt on the page kit 26 Oct 2026. The presets, the inputs, their limits and the
// maths in `computed` are unchanged. The payback lines lost their traffic-light colours
// and read in the site gold when the payback is fast.

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHero, Section, Button, ClosingCall } from "@/app/components/ui";

interface Preset {
  team: number;
  rate: number;
  manual: number;
  auto: number;
  cost: number;
  desc: string;
}

const PRESETS: Record<string, Preset> = {
  realestate: { team: 6, rate: 55, manual: 12, auto: 65, cost: 1500,
    desc: "Real estate office, agents and admin. Listing descriptions, market reports, follow-ups, contract drafts." },
  dental:     { team: 8, rate: 45, manual: 10, auto: 55, cost: 1500,
    desc: "Dental practice, front desk and clinical admin. Insurance pre-authorization, scheduling reminders, treatment-plan summaries, patient messages." },
  law:        { team: 5, rate: 95, manual: 14, auto: 60, cost: 2500,
    desc: "Law firm, partners and paralegals. Document review, brief drafting, intake forms, case summaries." },
  marketing:  { team: 4, rate: 75, manual: 18, auto: 70, cost: 1500,
    desc: "Marketing agency, content and ops. Caption writing, ad copy, scheduling, reporting, client deliverables." },
  ecommerce:  { team: 3, rate: 60, manual: 15, auto: 70, cost: 1500,
    desc: "Ecommerce brand, operator and customer service. Product descriptions, support emails, social posts, returns workflows." },
  solo:       { team: 1, rate: 100, manual: 20, auto: 65, cost: 500,
    desc: "Solo founder doing every job. Outbound sales, content, admin, follow-ups. The lower session cost uses 1-on-1 pricing." },
};

const PRESET_LABELS: Record<string, string> = {
  realestate: "Real estate office",
  dental:     "Dental practice",
  law:        "Law firm",
  marketing:  "Marketing agency",
  ecommerce:  "Ecommerce brand",
  solo:       "Solo founder",
};

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const fmtMoney = (n: number) => "$" + fmt(n);

export default function AICostCalculatorPage() {
  const [team, setTeam] = useState(5);
  const [rate, setRate] = useState(65);
  const [manual, setManual] = useState(8);
  const [auto, setAuto] = useState(60);
  const [cost, setCost] = useState(700);
  const [presetNote, setPresetNote] = useState<string | null>(null);

  const computed = useMemo(() => {
    const autoFrac = auto / 100;
    const hoursWeekly = Math.max(0, team) * Math.max(0, manual) * autoFrac;
    const hoursMonthly = hoursWeekly * 4.33;
    const dollarsMonthly = hoursMonthly * Math.max(0, rate);
    const annualSaved = dollarsMonthly * 12;

    let payback: { text: string; tier: "compounding" | "fast" | "slow" | "too-slow" | "none" } = { text: "", tier: "none" };
    if (dollarsMonthly <= 0) {
      payback = { text: "Enter values to see the payback period.", tier: "none" };
    } else {
      const months = Math.max(0, cost) / dollarsMonthly;
      if (months < 1) {
        const days = Math.round(months * 30);
        payback = { text: `At those inputs, the session pays back in ${days} days. After that, the savings continue each month.`, tier: "compounding" };
      } else if (months < 6) {
        payback = { text: `At those inputs, the session pays back in ${months.toFixed(1)} months. After that, the savings continue each month.`, tier: "fast" };
      } else if (months < 24) {
        payback = { text: `At those inputs, the session pays back in ${months.toFixed(1)} months. That is slow, because the team is small or the manual hours are low. It can still be worth doing if the work wears your team down.`, tier: "slow" };
      } else {
        payback = { text: `At those inputs, the payback takes ${months.toFixed(1)} months, too slow to justify on time savings alone. A smaller 1-on-1 session at $175 an hour may fit better.`, tier: "too-slow" };
      }
    }

    return { hoursWeekly, hoursMonthly, dollarsMonthly, annualSaved, payback };
  }, [team, rate, manual, auto, cost]);

  function loadPreset(key: string) {
    const p = PRESETS[key];
    if (!p) return;
    setTeam(p.team);
    setRate(p.rate);
    setManual(p.manual);
    setAuto(p.auto);
    setCost(p.cost);
    setPresetNote(p.desc);
  }

  return (
    <main>
      <PageHero
        kicker="No login and no tracking"
        title="AI cost calculator"
        lede="Enter your team size, hourly cost and manual workload. The calculator shows how fast an AI consulting session pays back, in dollars and hours. The assumptions sit below the results."
        meta="Sessions from $125 a person. 1-on-1 at $175 an hour. Half-day workshop at $2,500."
      />

      <Section title="Start from a preset" intro="Each preset fills in the inputs for a typical business of that kind.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.keys(PRESETS).map((key) => (
            <button key={key} type="button" onClick={() => loadPreset(key)} className="ui-btn ui-btn--ghost">
              {PRESET_LABELS[key]}
            </button>
          ))}
        </div>
        {presetNote && <p className="ui-note" style={{ marginTop: 20 }}>{presetNote}</p>}
      </Section>

      <Section title="Your inputs">
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 640 }}>
          <NumberField
            id="calc-team"
            label="Team size"
            context="The number of people whose work you want to speed up."
            value={team} onChange={setTeam} min={1} max={500} suffix="people"
          />

          <NumberField
            id="calc-rate"
            label="Average hourly cost per person"
            context="Fully loaded: salary, benefits and overhead. Typical ranges are $40 to $85 for support, $60 to $110 for operations, and $80 to $150 for managers."
            value={rate} onChange={setRate} min={15} max={500} prefix="$" suffix="an hour"
          />

          <NumberField
            id="calc-manual"
            label="Repeatable manual work per person, per week"
            context="Email drafting, content writing, data entry, scheduling, basic research and formatting. Work that needs no human judgment."
            value={manual} onChange={setManual} min={0} max={40} suffix="hours a week"
          />

          <div className="ui-field">
            <label htmlFor="calc-auto">Share of that work AI could automate</label>
            <p className="ui-muted ui-small" style={{ margin: 0 }}>
              Choose the share of this work you expect AI to handle for your team. The slider starts at 60%.
            </p>
            <input id="calc-auto" type="range" min={20} max={80} value={auto} step={5} onChange={(e) => setAuto(parseInt(e.target.value))} style={{ width: "100%", accentColor: "var(--gold)", padding: 0, border: 0, background: "transparent", minHeight: 44 }} />
            <div className="ui-muted ui-small" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>20%</span>
              <span className="ui-gold" style={{ fontWeight: 700 }}>{auto}%</span>
              <span>80%</span>
            </div>
          </div>

          <NumberField
            id="calc-cost"
            label="Consulting session cost, the investment"
            context="My sessions: $175 an hour for 1-on-1, $125 a person for a small group, or a flat $2,500 for a half-day team training. The default is $700 for a 4-hour 1-on-1 session at $175 an hour."
            value={cost} onChange={setCost} min={100} max={20000} prefix="$"
          />
        </div>
      </Section>

      <Section title="Your estimated savings">
        <div className="ui-figures">
          <div className="ui-figure"><b>{fmt(computed.hoursMonthly)}</b><span>hours saved a month</span></div>
          <div className="ui-figure"><b>{fmtMoney(computed.dollarsMonthly)}</b><span>saved a month</span></div>
          <div className="ui-figure"><b>{fmtMoney(computed.annualSaved)}</b><span>saved a year</span></div>
        </div>
        <p
          className={computed.payback.tier === "compounding" || computed.payback.tier === "fast" ? "ui-gold" : computed.payback.tier === "none" ? "ui-muted" : undefined}
          style={{ fontSize: 18, lineHeight: 1.55, margin: "32px 0 0", maxWidth: "var(--measure)" }}
          aria-live="polite"
        >
          {computed.payback.text}
        </p>
        <p className="ui-muted ui-small" style={{ marginTop: 20, maxWidth: "var(--measure)" }}>
          <strong>How the calculator works:</strong> manual hrs/wk × team size × automation % × 4.33 wks/mo = hours saved monthly. Multiply by hourly rate for dollar value. Payback = session cost ÷ monthly $ saved. The estimate leaves out quality improvements, fewer errors and staff retention.
        </p>
      </Section>

      {/* Additive explanatory copy. The calculator is interactive, so most of what it
          says only exists after input and the page rendered 407 visible words. Same
          treatment as /ai-readiness: leave the tool alone, give a crawler and an
          undecided reader the reasoning. */}
      <Section title="How the math works">
        <div className="ui-prose">
          <p>
            You enter team size, a loaded hourly rate, and how many hours a week go into
            repetitive written work: drafting, replying, summarising and formatting. The
            calculator multiplies those hours by the automation share you pick, compares the
            savings with the cost of a session, and gives you the payback period.
          </p>
          <p>
            Lower the automation share to allow for interruptions, revisions, and tasks where a
            model produces something you have to rewrite.
          </p>
        </div>
      </Section>

      <Section title="When to skip the session">
        <div className="ui-prose">
          <p>
            If your team is small and the repetitive writing takes a couple of hours a week, the
            payback period will be long and you should skip the session. The calculator shows
            that result too.
          </p>
          <p>
            Built by Elijah Purcell, Founder/CEO of <Link href="/about">Purcell Ventures LLC</Link>{" "}
            and an autonomous AI agent systems engineer in Tuscaloosa, Alabama. If the payback
            looks worth it, the <Link href="/consulting">consulting page</Link> explains what a
            session covers, and <Link href="/ai-consultant-tuscaloosa">local work in
            Tuscaloosa</Link> covers in-person engagements. No email is required to use this page.
          </p>
          <p>
            <Button href="/ai-readiness" ghost>Take the 3-minute readiness test</Button>
          </p>
        </div>
      </Section>

      <ClosingCall
        title="A session built on your own workflows"
        line="I come to your office, work from your own workflows, and build at least one automation with you during the session. I reply within one business day."
        button="Book a session"
        href="/consulting/book"
      />
    </main>
  );
}

function NumberField({ id, label, context, value, onChange, min, max, prefix, suffix }: { id: string; label: string; context: string; value: number; onChange: (n: number) => void; min: number; max: number; prefix?: string; suffix?: string }) {
  return (
    <div className="ui-field">
      <label htmlFor={id}>{label}</label>
      <p className="ui-muted ui-small" style={{ margin: 0 }}>{context}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {prefix && <span className="ui-gold" style={{ fontWeight: 700 }}>{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min} max={max} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          style={{ flex: "1 1 auto", minWidth: 0, maxWidth: 220 }}
        />
        {suffix && <span className="ui-muted">{suffix}</span>}
      </div>
    </div>
  );
}
