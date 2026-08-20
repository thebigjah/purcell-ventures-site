"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

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
    desc: "Real estate office — agents + admin. Listing descriptions, market reports, follow-ups, contract drafts." },
  dental:     { team: 8, rate: 45, manual: 10, auto: 55, cost: 1500,
    desc: "Dental practice — front desk + clinical admin. Insurance pre-auth, scheduling reminders, treatment-plan summaries, patient comms." },
  law:        { team: 5, rate: 95, manual: 14, auto: 60, cost: 2500,
    desc: "Law firm — partners + paralegals. Document review, brief drafting, intake forms, case summaries." },
  marketing:  { team: 4, rate: 75, manual: 18, auto: 70, cost: 1500,
    desc: "Marketing agency — content + ops. Caption writing, ad copy, scheduling, reporting, client deliverables." },
  ecommerce:  { team: 3, rate: 60, manual: 15, auto: 70, cost: 1500,
    desc: "Ecommerce brand — operator + customer service. Product descriptions, support emails, social posts, returns workflows." },
  solo:       { team: 1, rate: 100, manual: 20, auto: 65, cost: 500,
    desc: "Solo founder — you wear every hat. Outbound, content, admin, follow-ups. Lower session cost reflects 1-on-1 pricing." },
};

const PRESET_LABELS: Record<string, string> = {
  realestate: "Real Estate Office",
  dental:     "Dental Practice",
  law:        "Law Firm",
  marketing:  "Marketing Agency",
  ecommerce:  "Ecommerce Brand",
  solo:       "Solo Founder",
};

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const fmtMoney = (n: number) => "$" + fmt(n);

export default function AICostCalculatorPage() {
  const [team, setTeam] = useState(5);
  const [rate, setRate] = useState(65);
  const [manual, setManual] = useState(8);
  const [auto, setAuto] = useState(60);
  const [cost, setCost] = useState(1500);
  const [presetNote, setPresetNote] = useState<string | null>(null);

  const computed = useMemo(() => {
    const autoFrac = auto / 100;
    const hoursWeekly = Math.max(0, team) * Math.max(0, manual) * autoFrac;
    const hoursMonthly = hoursWeekly * 4.33;
    const dollarsMonthly = hoursMonthly * Math.max(0, rate);
    const annualSaved = dollarsMonthly * 12;

    let payback: { text: string; tier: "compounding" | "fast" | "slow" | "too-slow" | "none" } = { text: "", tier: "none" };
    if (dollarsMonthly <= 0) {
      payback = { text: "Enter values to see payback timeline.", tier: "none" };
    } else {
      const months = Math.max(0, cost) / dollarsMonthly;
      if (months < 1) {
        const days = Math.round(months * 30);
        payback = { text: `At those inputs, the session pays back in ~${days} days. After that, the savings compound monthly.`, tier: "compounding" };
      } else if (months < 6) {
        payback = { text: `At those inputs, the session pays back in ~${months.toFixed(1)} months. After that, the savings compound monthly.`, tier: "fast" };
      } else if (months < 24) {
        payback = { text: `At those inputs, the session pays back in ~${months.toFixed(1)} months — slower than typical because either the team is small or manual hours are low. Worth doing if the work itself drains morale.`, tier: "slow" };
      } else {
        payback = { text: `At those inputs, the payback is ~${months.toFixed(1)} months — too slow to justify on time-savings alone. Consider a smaller-scope $175/hr 1-on-1 instead.`, tier: "too-slow" };
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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", background: "#161412",
    border: "1px solid var(--color-warm-border)", borderRadius: 0,
    color: "var(--color-warm-text)", fontSize: "16px",
    fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />

      <main style={{ position: "relative", zIndex: 5, maxWidth: "820px", margin: "0 auto", padding: "56px 28px 80px" }}>

        {/* Page head */}
        <header className="pv-page-head">
          <div className="pv-mono-label">A Live Estimator · No login · No tracking</div>
          <h1 style={{ margin: 0 }}>
            AI Cost <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Calculator.</em>
          </h1>
          <p className="deck">
            Enter your team size, hourly cost, and manual workload. See how fast a focused AI consulting session pays back in dollars and hours. Conservative numbers, no smoke.
          </p>
        </header>

        {/* Presets */}
        <div style={{ marginBottom: "28px" }}>
          <div className="pv-mono-label" style={{ marginBottom: "12px", color: "var(--color-warm-text-light)" }}>
            Start from a preset
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {Object.keys(PRESETS).map(key => (
              <button key={key} onClick={() => loadPreset(key)} className="pv-btn-ghost" style={{ padding: "9px 16px", fontSize: "10px", letterSpacing: "0.22em" }}>
                {PRESET_LABELS[key]}
              </button>
            ))}
          </div>
          {presetNote && (
            <p className="pv-italic" style={{
              marginTop: "14px",
              padding: "12px 18px",
              background: "var(--color-warm-bg-alt)",
              border: "1px solid var(--color-warm-border)",
              fontSize: "14.5px", lineHeight: 1.55,
              color: "var(--color-warm-text)", opacity: 0.85,
            }}>
              {presetNote}
            </p>
          )}
        </div>

        {/* Inputs card */}
        <div className="pv-card" style={{ padding: "32px 36px 28px", marginBottom: "24px" }}>
          <span className="b3"></span><span className="b4"></span>
          <div className="pv-mono-label" style={{ marginBottom: "20px" }}>Your inputs</div>

          <NumberField
            label="Team size"
            context="Number of people whose workflows you'd want to optimize."
            value={team} onChange={setTeam} min={1} max={500} suffix="people"
            inputStyle={inputStyle}
          />

          <NumberField
            label="Average hourly cost per person"
            context="Fully-loaded — salary + benefits + overhead. $40–85 for support, $60–110 for ops, $80–150 for managers."
            value={rate} onChange={setRate} min={15} max={500} prefix="$" suffix="/ hr"
            inputStyle={inputStyle}
          />

          <NumberField
            label="Repeatable manual work per person, per week"
            context="Email drafting, content writing, data entry, scheduling, basic research, formatting. The work that does NOT require human judgment."
            value={manual} onChange={setManual} min={0} max={40} suffix="hrs / wk"
            inputStyle={inputStyle}
          />

          {/* Slider */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", fontWeight: 600, color: "var(--color-warm-text)", letterSpacing: "0.02em", marginBottom: "4px" }}>
              Realistic % AI could automate
            </label>
            <p className="pv-italic" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", lineHeight: 1.5, marginBottom: "12px" }}>
              Most teams see 50–70% reduction on the manual chunk after one focused session. Default to 60%.
            </p>
            <input type="range" min={20} max={80} value={auto} step={5} onChange={e => setAuto(parseInt(e.target.value))} style={{ width: "100%", accentColor: "var(--color-warm-accent)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-text-light)" }}>
              <span>20%</span>
              <span style={{ color: "var(--color-warm-accent)", fontWeight: 700 }}>{auto}%</span>
              <span>80%</span>
            </div>
          </div>

          <NumberField
            label="Consulting session cost (the investment)"
            context="PV sessions: $175/hr 1-on-1, $125/person small group, or flat $2,500 for a half-day team training. Default: $1,500 for a 4-hr team session."
            value={cost} onChange={setCost} min={100} max={20000} prefix="$"
            inputStyle={inputStyle}
          />
        </div>

        {/* Live result card */}
        <div className="pv-card" style={{ padding: "36px 36px 32px", marginBottom: "24px", textAlign: "center" }}>
          <span className="b3"></span><span className="b4"></span>
          <div className="pv-mono-label" style={{ marginBottom: "20px" }}>
            Your estimated savings
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", border: "1px solid var(--color-warm-border)", background: "var(--color-warm-bg-alt)", marginBottom: "24px" }}>
            <Stat label="hours / mo saved"  value={fmt(computed.hoursMonthly)} />
            <Stat label="$ / mo saved"      value={fmtMoney(computed.dollarsMonthly)} divider />
            <Stat label="$ / yr saved"      value={fmtMoney(computed.annualSaved)} divider />
          </div>
          <p className="pv-italic" style={{
            fontSize: "16.5px", lineHeight: 1.55,
            color: paybackColor(computed.payback.tier),
            margin: 0,
          }}>
            {computed.payback.text}
          </p>
          <p style={{
            marginTop: "20px", paddingTop: "16px",
            borderTop: "1px dashed var(--color-warm-border)",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "11px", color: "var(--color-warm-text-light)",
            letterSpacing: "0.04em", lineHeight: 1.7, textAlign: "left",
          }}>
            <strong style={{ color: "var(--color-warm-text)" }}>How this is calculated:</strong> manual hrs/wk × team size × automation % × 4.33 wks/mo = hours saved monthly. Multiply by hourly rate for dollar value. Payback = session cost ÷ monthly $ saved. Conservative — doesn&apos;t count quality improvements, error reduction, retention gains from less tedious work, or compounding from automations that build on each other.
          </p>
        </div>

        {/* CTA */}
        <section style={{
          padding: "40px 36px 36px",
          borderTop: "1px solid var(--color-warm-border)",
          borderBottom: "1px solid var(--color-warm-border)",
          textAlign: "center",
          marginBottom: "32px",
        }}>
          <div style={{
            fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-accent)",
            fontSize: "14px", letterSpacing: "0.6em", marginBottom: "20px", opacity: 0.7,
          }}></div>
          <h2 style={{
            fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600,
            fontSize: "clamp(22px, 4vw, 32px)", letterSpacing: "0.02em",
            color: "var(--color-warm-text)", textTransform: "uppercase",
            marginBottom: "16px", lineHeight: 1.15, margin: "0 0 16px",
          }}>
            Numbers add <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>up?</em>
          </h2>
          <p className="pv-italic" style={{
            fontSize: "16px", color: "var(--color-warm-text)", opacity: 0.85,
            maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.55,
          }}>
            Book a session. I&apos;ll come to your office, work with your actual workflows, and walk you out with at least one automation already running.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <Link href="/consulting/book" className="pv-btn-primary">
              Book a session →
            </Link>
            <Link href="/ai-readiness" className="pv-btn-ghost">
              Pair with the 3-min readiness test →
            </Link>
          </div>
        </section>

      </main>

      <footer style={{
        position: "relative", zIndex: 5,
        padding: "24px 36px",
        borderTop: "1px solid var(--color-warm-border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "9.5px", letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--color-warm-text-light)",
      }}>
        <span>© {new Date().getFullYear()} Purcell Ventures LLC · Acworth, GA</span>
        <Link href="/consulting" style={{ color: "var(--color-warm-text-light)", textDecoration: "none", letterSpacing: "0.32em" }}>← Consulting</Link>
      </footer>
    </div>
  );
}

function NumberField({ label, context, value, onChange, min, max, prefix, suffix, inputStyle }: { label: string; context: string; value: number; onChange: (n: number) => void; min: number; max: number; prefix?: string; suffix?: string; inputStyle: React.CSSProperties }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <label style={{ display: "block", fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", fontWeight: 600, color: "var(--color-warm-text)", letterSpacing: "0.02em", marginBottom: "4px" }}>
        {label}
      </label>
      <p className="pv-italic" style={{ fontSize: "13px", color: "var(--color-warm-text-light)", lineHeight: 1.5, marginBottom: "10px" }}>
        {context}
      </p>
      <div style={{ display: "flex", alignItems: "stretch", gap: 0, border: "1px solid var(--color-warm-border)", background: "#161412" }}>
        {prefix && (
          <span style={{ padding: "12px 14px", color: "var(--color-warm-accent)", borderRight: "1px solid var(--color-warm-border)", fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", fontWeight: 600 }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min} max={max} value={value}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          style={{ ...inputStyle, border: "none", flex: 1 }}
        />
        {suffix && (
          <span style={{ padding: "12px 14px", color: "var(--color-warm-text-light)", borderLeft: "1px solid var(--color-warm-border)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", display: "flex", alignItems: "center" }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, divider }: { label: string; value: string; divider?: boolean }) {
  return (
    <div style={{ padding: "20px 12px", textAlign: "center", borderLeft: divider ? "1px solid var(--color-warm-border)" : "none" }}>
      <div style={{
        fontFamily: "'Cinzel', Georgia, serif", fontWeight: 700,
        fontSize: "24px", color: "var(--color-warm-accent)",
        letterSpacing: "-0.01em", lineHeight: 1,
      }}>
        {value}
      </div>
      <div className="pv-mono-label" style={{ marginTop: "8px", color: "var(--color-warm-text-light)", fontSize: "9px" }}>
        {label}
      </div>
    </div>
  );
}

function paybackColor(tier: string): string {
  switch (tier) {
    case "compounding": return "#7aaa6a";
    case "fast":        return "#c89018";
    case "slow":        return "var(--color-warm-text)";
    case "too-slow":    return "#b04030";
    default:            return "var(--color-warm-text-light)";
  }
}
