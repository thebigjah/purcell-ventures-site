"use client";

import { useState } from "react";
import s from "./ROICalculator.module.css";

// Rebuilt on the page kit 26 Oct 2026. The maths, the inputs, their ranges and the presets'
// numbers are unchanged. Only /digital uses this, and the page supplies the section heading.

const INDUSTRY_PRESETS = [
  { label: "Hair salon", bookingValue: 55, extraBookings: 5 },
  { label: "Barber shop", bookingValue: 30, extraBookings: 8 },
  { label: "HVAC or contractor", bookingValue: 350, extraBookings: 2 },
  { label: "Restaurant", bookingValue: 45, extraBookings: 20 },
  { label: "Massage or spa", bookingValue: 90, extraBookings: 4 },
  { label: "Lawn care", bookingValue: 120, extraBookings: 3 },
];

const PLAN_NAMES = { starter: "Starter", growth: "Growth", full: "Full Service" } as const;

export default function ROICalculator() {
  const [bookingValue, setBookingValue] = useState(55);
  const [extraPerWeek, setExtraPerWeek] = useState(5);
  const [plan, setPlan] = useState<"starter" | "growth" | "full">("growth");
  const [selectedPreset, setSelectedPreset] = useState("Hair salon");

  const planCosts = { starter: 99, growth: 179, full: 279 };
  const planCost = planCosts[plan];

  const extraMonthly = extraPerWeek * 4.3 * bookingValue;
  const netGain = extraMonthly - planCost;
  const roi = Math.round((netGain / planCost) * 100);
  const paybackDays = Math.round((planCost / extraMonthly) * 30);

  function applyPreset(preset: typeof INDUSTRY_PRESETS[0]) {
    setBookingValue(preset.bookingValue);
    setExtraPerWeek(preset.extraBookings);
    setSelectedPreset(preset.label);
  }

  return (
    <div className={s.calc}>
      <div>
        <div className={s.group}>
          <p className={s.label} id="roi-type">Business type</p>
          <div className={s.choices} role="group" aria-labelledby="roi-type">
            {INDUSTRY_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className={s.choice}
                aria-pressed={selectedPreset === p.label}
                onClick={() => applyPreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className={s.group}>
          <div className={s.labelRow}>
            <label className={s.label} htmlFor="roi-value">Average booking or job value</label>
            <span className={s.value}>${bookingValue}</span>
          </div>
          <input
            id="roi-value"
            className={s.range}
            type="range"
            min={15}
            max={500}
            step={5}
            value={bookingValue}
            onChange={(e) => { setBookingValue(+e.target.value); setSelectedPreset("Custom"); }}
          />
          <div className={s.ends}><span>$15</span><span>$500</span></div>
        </div>

        <div className={s.group}>
          <div className={s.labelRow}>
            <label className={s.label} htmlFor="roi-extra">Extra bookings a week from the tools</label>
            <span className={s.value}>{extraPerWeek} a week</span>
          </div>
          <input
            id="roi-extra"
            className={s.range}
            type="range"
            min={1}
            max={30}
            step={1}
            value={extraPerWeek}
            onChange={(e) => { setExtraPerWeek(+e.target.value); setSelectedPreset("Custom"); }}
          />
          <div className={s.ends}><span>1</span><span>30</span></div>
        </div>

        <div className={s.group}>
          <p className={s.label} id="roi-plan">Plan</p>
          <div className={s.plans} role="group" aria-labelledby="roi-plan">
            {(["starter", "growth", "full"] as const).map((p) => (
              <button
                key={p}
                type="button"
                className={s.choice}
                aria-pressed={plan === p}
                onClick={() => setPlan(p)}
              >
                {PLAN_NAMES[p]}
                <small>${planCosts[p]} a month</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite">
        <div className={s.result}>
          <p>Estimated net gain each month, after the plan cost</p>
          <span className={`${s.big}${netGain < 0 ? ` ${s.loss}` : ""}`}>
            {netGain >= 0 ? "+" : "−"}${Math.abs(netGain).toLocaleString()}
          </span>
        </div>

        <dl className="ui-facts">
          <dt>Extra revenue a month</dt>
          <dd>+${extraMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</dd>
          <dt>Plan cost</dt>
          <dd>{"−"}${planCost} a month</dd>
          <dt>Net gain</dt>
          <dd className={netGain >= 0 ? "ui-gold" : undefined}>
            {netGain < 0 ? "−" : ""}${Math.abs(netGain).toLocaleString(undefined, { maximumFractionDigits: 0 })} a month
          </dd>
        </dl>

        <div className={`ui-figures ${s.figs}`}>
          <div className="ui-figure">
            <b>{roi > 0 ? roi : 0}%</b>
            <span>Monthly return on the plan</span>
          </div>
          <div className="ui-figure">
            <b>{paybackDays <= 30 ? `${paybackDays} days` : "Over 30 days"}</b>
            <span>Time to pay back the plan</span>
          </div>
        </div>

        <p className={s.fine}>
          This is arithmetic on the numbers above. It assumes online booking, the chatbot and review
          requests bring in the extra bookings you entered.
        </p>

        <a className="ui-btn" href="#contact">Talk to me about your numbers</a>
      </div>
    </div>
  );
}
