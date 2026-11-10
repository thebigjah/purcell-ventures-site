"use client";

import { useState } from "react";
import s from "./ROICalculator.module.css";

// Rebuilt on the page kit 26 Oct 2026. The maths, the inputs, their ranges and the presets'
// numbers are unchanged. Only /digital uses this, and the page supplies the section heading.
// 9 Nov 2026: the plan picker and its monthly prices are gone. Elijah quotes every business
// separately, so the calculator now shows the extra revenue and leaves the visitor to set
// it against the quote they get.

const INDUSTRY_PRESETS = [
  { label: "Hair salon", bookingValue: 55, extraBookings: 5 },
  { label: "Barber shop", bookingValue: 30, extraBookings: 8 },
  { label: "HVAC or contractor", bookingValue: 350, extraBookings: 2 },
  { label: "Restaurant", bookingValue: 45, extraBookings: 20 },
  { label: "Massage or spa", bookingValue: 90, extraBookings: 4 },
  { label: "Lawn care", bookingValue: 120, extraBookings: 3 },
];

export default function ROICalculator() {
  const [bookingValue, setBookingValue] = useState(55);
  const [extraPerWeek, setExtraPerWeek] = useState(5);
  const [selectedPreset, setSelectedPreset] = useState("Hair salon");

  const extraMonthly = extraPerWeek * 4.3 * bookingValue;
  const extraBookingsMonthly = Math.round(extraPerWeek * 4.3);

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

      </div>

      <div aria-live="polite">
        <div className={s.result}>
          <p>Estimated extra revenue each month</p>
          <span className={s.big}>
            +${extraMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>

        <dl className="ui-facts">
          <dt>Extra bookings a month</dt>
          <dd>{extraBookingsMonthly}</dd>
          <dt>Extra revenue a year</dt>
          <dd className="ui-gold">+${(extraMonthly * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</dd>
        </dl>

        <p className={s.fine}>
          This is arithmetic on the numbers above. It assumes online booking, the chatbot and review
          requests bring in the extra bookings you entered. Set the monthly figure against the quote
          you get for your business.
        </p>

        <a className="ui-btn" href="#contact">Talk to me about your numbers</a>
      </div>
    </div>
  );
}
