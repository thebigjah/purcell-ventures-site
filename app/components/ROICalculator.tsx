"use client";

import { useState } from "react";

const INDUSTRY_PRESETS = [
  { label: "Hair Salon", bookingValue: 55, extraBookings: 5 },
  { label: "Barber Shop", bookingValue: 30, extraBookings: 8 },
  { label: "HVAC / Contractor", bookingValue: 350, extraBookings: 2 },
  { label: "Restaurant", bookingValue: 45, extraBookings: 20 },
  { label: "Massage / Spa", bookingValue: 90, extraBookings: 4 },
  { label: "Lawn Care", bookingValue: 120, extraBookings: 3 },
];

export default function ROICalculator() {
  const [bookingValue, setBookingValue] = useState(55);
  const [extraPerWeek, setExtraPerWeek] = useState(5);
  const [plan, setPlan] = useState<"starter" | "growth" | "full">("growth");
  const [selectedPreset, setSelectedPreset] = useState("Hair Salon");

  const planCosts = { starter: 75, growth: 125, full: 175 };
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
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl font-bold mb-4">What&apos;s this actually worth to you?</h2>
          <p className="text-[var(--color-warm-text-muted)] leading-relaxed">
            Most clients recoup the monthly cost in the first week. See for yourself.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left: inputs */}
          <div className="bg-[var(--color-warm-card)] rounded-2xl p-8 border border-[var(--color-warm-border)]">

            {/* Presets */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">Business type</label>
              <div className="flex flex-wrap gap-2">
                {INDUSTRY_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      selectedPreset === p.label
                        ? "bg-[var(--color-warm-accent)] text-white border-[var(--color-warm-accent)]"
                        : "border-[var(--color-warm-border)] text-[var(--color-warm-text-muted)] hover:border-[var(--color-warm-accent)] hover:text-[var(--color-warm-accent)]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold">Average booking / job value</label>
                  <span className="text-[var(--color-warm-accent)] font-bold">${bookingValue}</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={500}
                  step={5}
                  value={bookingValue}
                  onChange={(e) => { setBookingValue(+e.target.value); setSelectedPreset("Custom"); }}
                  className="w-full accent-[var(--color-warm-accent)]"
                />
                <div className="flex justify-between text-xs text-[var(--color-warm-text-light)] mt-1">
                  <span>$15</span><span>$500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold">Extra bookings per week the tools would bring in</label>
                  <span className="text-[var(--color-warm-accent)] font-bold">{extraPerWeek}/week</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={extraPerWeek}
                  onChange={(e) => { setExtraPerWeek(+e.target.value); setSelectedPreset("Custom"); }}
                  className="w-full accent-[var(--color-warm-accent)]"
                />
                <div className="flex justify-between text-xs text-[var(--color-warm-text-light)] mt-1">
                  <span>1</span><span>30</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Which plan?</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["starter", "growth", "full"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlan(p)}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors capitalize ${
                        plan === p
                          ? "bg-[var(--color-warm-accent)] text-white border-[var(--color-warm-accent)]"
                          : "border-[var(--color-warm-border)] text-[var(--color-warm-text-muted)] hover:border-[var(--color-warm-accent)]"
                      }`}
                    >
                      {p}<br />
                      <span className="text-xs font-normal opacity-80">
                        ${planCosts[p]}/mo
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: results */}
          <div className="space-y-4">

            {/* Main result */}
            <div className={`rounded-2xl p-8 border ${netGain > 0 ? "bg-[var(--color-warm-accent)] text-white border-[var(--color-warm-accent-dark)]" : "bg-[var(--color-warm-card)] border-[var(--color-warm-border)]"}`}>
              <p className={`text-sm font-semibold mb-2 ${netGain > 0 ? "text-white/70" : "text-[var(--color-warm-text-muted)]"}`}>
                Estimated monthly net gain
              </p>
              <p className="text-5xl font-bold mb-1">
                {netGain >= 0 ? "+" : ""}${Math.abs(netGain).toLocaleString()}
              </p>
              <p className={`text-sm ${netGain > 0 ? "text-white/70" : "text-[var(--color-warm-text-muted)]"}`}>
                every month, after the subscription cost
              </p>
            </div>

            {/* Breakdown */}
            <div className="bg-[var(--color-warm-card)] rounded-2xl p-6 border border-[var(--color-warm-border)] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-warm-text-muted)]">Extra revenue/month</span>
                <span className="font-semibold text-[var(--color-warm-success)]">
                  +${extraMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-warm-text-muted)]">Subscription cost</span>
                <span className="font-semibold text-[var(--color-warm-text-muted)]">
                  −${planCost}/mo
                </span>
              </div>
              <div className="border-t border-[var(--color-warm-border)] pt-4 flex justify-between items-center">
                <span className="text-sm font-semibold">Net gain</span>
                <span className={`font-bold text-lg ${netGain >= 0 ? "text-[var(--color-warm-success)]" : "text-red-500"}`}>
                  ${netGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--color-warm-card)] rounded-xl p-5 border border-[var(--color-warm-border)] text-center">
                <p className="text-3xl font-bold text-[var(--color-warm-accent)]">{roi > 0 ? roi : 0}%</p>
                <p className="text-xs text-[var(--color-warm-text-muted)] mt-1">monthly ROI</p>
              </div>
              <div className="bg-[var(--color-warm-card)] rounded-xl p-5 border border-[var(--color-warm-border)] text-center">
                <p className="text-3xl font-bold text-[var(--color-warm-accent)]">
                  {paybackDays <= 30 ? `${paybackDays}d` : "—"}
                </p>
                <p className="text-xs text-[var(--color-warm-text-muted)] mt-1">payback period</p>
              </div>
            </div>

            <p className="text-xs text-[var(--color-warm-text-light)] leading-relaxed px-1">
              Conservative estimate based on online booking capturing missed calls, chatbot converting
              website visitors, and review manager improving local search ranking. Your actual results will vary.
            </p>

            <a
              href="#contact"
              className="block text-center px-6 py-3.5 bg-[var(--color-warm-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-warm-accent-dark)] transition-colors"
            >
              Let&apos;s talk about your numbers →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
