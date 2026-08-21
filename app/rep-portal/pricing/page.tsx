"use client";

import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

/**
 * Source of truth for rep-facing pricing.
 * When site prices change, update here too, this is what reps quote from.
 *
 * Pilot Partner is a 30%-off offer Elijah controls. Track remaining spots
 * here so reps know what's still available.
 */
const PILOT_REMAINING = { starter: 3, growth: 3, full: 3 }; // TODO: wire to a real source

const DIGITAL = [
  {
    name: "Starter",
    standard: { setup: 400, monthly: 99 },
    pilot:    { setup: 280, monthly: 69 },
    includes: "Site + AI chatbot + lead form",
    commission: "$100 flat (Closer+)",
  },
  {
    name: "Growth",
    standard: { setup: 700, monthly: 179 },
    pilot:    { setup: 490, monthly: 125 },
    includes: "+ Booking, email, social, reviews, leads",
    commission: "$150 flat (Closer+)",
  },
  {
    name: "Full",
    standard: { setup: 1000, monthly: 279 },
    pilot:    { setup: 700, monthly: 195 },
    includes: "Everything + CRM, invoicing, AI content",
    commission: "$200 flat (Closer+)",
  },
];

const CONSULTING = [
  { name: "1-on-1",       price: "$175/hr",          note: "2-hr minimum recommended",     commission: "20% (Senior only)" },
  { name: "Small Group",  price: "$125/person",       note: "2–8 people, 2-hr minimum",     commission: "20% (Senior only)" },
  { name: "Workshop",     price: "$2,500 flat",       note: "Up to 20 people, half-day",    commission: "20% (Senior only)" },
  { name: "Corporate / Custom", price: "Custom quote", note: "Larger teams, multi-session", commission: "20% (Senior only)" },
];

const CUSTOM = [
  { name: "Small project", price: "$1,500–3,500",  note: "Scripts, simple tools",   commission: "15% (Senior, co-pitch req)" },
  { name: "Full app",      price: "$5,000–15,000", note: "Mobile/web applications", commission: "15% (Senior, co-pitch req)" },
  { name: "Retainer",      price: "Custom",         note: "Ongoing engagement",     commission: "15% (Senior, co-pitch req)" },
];

const COURSES = [
  { name: "College Apps",      price: "$297",                                   commission: "15% Apprentice, 20% Closer+" },
  { name: "Business Launch",   price: "$397",                                   commission: "15% Apprentice, 20% Closer+" },
  { name: "Zero to Automated", price: "$397 self / $1,297 coaching / $2,997 1:1", commission: "15% Apprentice, 20% Closer+" },
];

const MANTLE = [
  { name: "Gutter Cleaning",   price: "$100+", note: "Varies by home size" },
  { name: "Pressure Washing",  price: "$75+",  note: "" },
  { name: "Lawn Care",         price: "$50+",  note: "Per cut" },
];

export default function PricingReferencePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "60px 36px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Pricing · Source of Truth</div>
            <h1>
              Pricing <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>reference</em>
            </h1>
            <p className="deck">
              These prices are what you quote. They match the live site. If a prospect sees a different number anywhere, flag it to Elijah, don&apos;t negotiate to it.
            </p>
          </header>

          {/* Pilot Partner banner */}
          <div style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))", border: "2px solid var(--color-warm-accent)", padding: "24px 28px", marginBottom: "48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
              <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--color-warm-accent)", margin: 0 }}>
                Pilot Partner offer
              </h3>
              <div style={{ display: "flex", gap: "16px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-warm-text-muted)" }}>
                <span>Starter: <strong style={{ color: "var(--color-warm-accent)" }}>{PILOT_REMAINING.starter} left</strong></span>
                <span>Growth: <strong style={{ color: "var(--color-warm-accent)" }}>{PILOT_REMAINING.growth} left</strong></span>
                <span>Full: <strong style={{ color: "var(--color-warm-accent)" }}>{PILOT_REMAINING.full} left</strong></span>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--color-warm-text)" }}>
              <strong>30% off setup, 30% off first 6 months.</strong> Lock period: 6 months at Pilot pricing, then standard pricing after. In return, client gives: written testimonial at month 2, case-study rights (anonymous if requested), one referral intro within 6 months. <strong>3 spots left across all tiers.</strong> Don&apos;t mass-advertise, deploy verbally per the handbook&apos;s pitch script.
            </p>
          </div>

          {/* Digital Services */}
          <header className="pv-section-head">
            <span className="roman">I.</span>
            <h2>Digital <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Services</em></h2>
          </header>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "48px", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Tier</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Standard</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Pilot Partner</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Includes</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Your cut</th>
              </tr>
            </thead>
            <tbody>
              {DIGITAL.map((d) => (
                <tr key={d.name} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                  <td style={{ padding: "14px 12px", fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)", fontWeight: 600 }}>{d.name}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <strong style={{ color: "var(--color-warm-text)" }}>${d.standard.setup} setup</strong>
                    <br />
                    <span style={{ color: "var(--color-warm-text-muted)", fontSize: "13px" }}>${d.standard.monthly}/mo</span>
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    <strong style={{ color: "var(--color-warm-accent)" }}>${d.pilot.setup} setup</strong>
                    <br />
                    <span style={{ color: "var(--color-warm-text-muted)", fontSize: "13px" }}>${d.pilot.monthly}/mo · locked 6mo</span>
                  </td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>{d.includes}</td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text)" }}>{d.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Consulting */}
          <header className="pv-section-head">
            <span className="roman">II.</span>
            <h2>AI <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Consulting</em></h2>
          </header>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "48px", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Tier</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Price</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Note</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Your cut</th>
              </tr>
            </thead>
            <tbody>
              {CONSULTING.map((c) => (
                <tr key={c.name} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                  <td style={{ padding: "14px 12px", fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)", fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: "14px 12px", color: "var(--color-warm-text)", fontWeight: 600 }}>{c.price}</td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>{c.note}</td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text)" }}>{c.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Custom Software */}
          <header className="pv-section-head">
            <span className="roman">III.</span>
            <h2>Custom <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Software</em></h2>
          </header>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "48px", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Tier</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Price</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Note</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Your cut</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOM.map((c) => (
                <tr key={c.name} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                  <td style={{ padding: "14px 12px", fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)", fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: "14px 12px", color: "var(--color-warm-text)", fontWeight: 600 }}>{c.price}</td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>{c.note}</td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text)" }}>{c.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "14px 18px", marginBottom: "48px", marginTop: "-32px", fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--color-warm-text)" }}>Hard rule:</strong> all Custom Software deals require Elijah on the call before any commitment. Senior reps only. You scope the conversation, Elijah scopes the work.
          </div>

          {/* Courses */}
          <header className="pv-section-head">
            <span className="roman">IV.</span>
            <h2>Courses <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>(on-demand)</em></h2>
          </header>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "48px", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Course</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Price</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Your cut</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((c) => (
                <tr key={c.name} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                  <td style={{ padding: "14px 12px", fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)", fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: "14px 12px", color: "var(--color-warm-text)" }}>{c.price}</td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text)" }}>{c.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mantle */}
          <header className="pv-section-head">
            <span className="roman">V.</span>
            <h2>Mantle <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>(low priority)</em></h2>
          </header>
          <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", marginBottom: "16px", fontStyle: "italic" }}>
            Most Mantle jobs run direct through the family (David + Dad). Reps occasionally close these but the focus is Digital + Consulting + Custom + Courses. Mantle closes pay commission but don&apos;t count toward Apprentice → Closer promotion.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "48px", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--color-warm-bg-alt)", borderBottom: "2px solid var(--color-warm-border)" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Service</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Price</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)" }}>Your cut</th>
              </tr>
            </thead>
            <tbody>
              {MANTLE.map((m) => (
                <tr key={m.name} style={{ borderBottom: "1px solid var(--color-warm-border)" }}>
                  <td style={{ padding: "14px 12px", fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)", fontWeight: 600 }}>{m.name}</td>
                  <td style={{ padding: "14px 12px", color: "var(--color-warm-text)" }}>
                    {m.price}
                    {m.note && <small style={{ display: "block", color: "var(--color-warm-text-muted)" }}>{m.note}</small>}
                  </td>
                  <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--color-warm-text-muted)" }}>15% Apprentice, 20% Closer+</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer note */}
          <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic", marginTop: "40px" }}>
            Prices last reconciled across the rep system + live site on 2026-05-24.
            When anything changes, this page changes first.
          </p>

        </main>
      </div>
    </div>
  );
}
