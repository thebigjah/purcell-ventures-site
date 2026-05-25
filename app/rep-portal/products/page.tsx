"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

const ENTRIES = [
  {
    slug: "digital-starter",
    name: "Digital Starter",
    division: "Digital Services",
    price: "$99/mo + $400 setup",
    blurb: "Website + AI chatbot + lead form. The entry product. Solo operators with no real online presence.",
    status: "stub",
  },
  {
    slug: "digital-growth",
    name: "Digital Growth",
    division: "Digital Services",
    price: "$179/mo + $700 setup",
    blurb: "Starter + booking + email + social + reviews + leads. SMBs losing money to slow follow-up.",
    status: "stub",
  },
  {
    slug: "digital-full",
    name: "Digital Full",
    division: "Digital Services",
    price: "$279/mo + $1,000 setup",
    blurb: "Everything + CRM + invoicing + AI content + SMS. 10-30 employee pro services.",
    status: "stub",
  },
  {
    slug: "consulting-1on1",
    name: "AI Consulting — 1-on-1",
    division: "AI Consulting",
    price: "$175/hr",
    blurb: "Deep, flexible session. Founder / solo or executive working through specific AI problem.",
    status: "stub",
  },
  {
    slug: "consulting-workshop",
    name: "AI Consulting — Workshop",
    division: "AI Consulting",
    price: "$2,500 flat (up to 20)",
    blurb: "Half-day team training. Entry deal for 10-50 employee professional services teams.",
    status: "stub",
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    division: "Custom Software",
    price: "$1,500–$15,000+",
    blurb: "Apps, automations, scripts. Senior reps only — Elijah scopes.",
    status: "stub",
  },
  {
    slug: "courses",
    name: "Courses",
    division: "Courses",
    price: "$297–$2,997",
    blurb: "Pre-built self-paced video courses. Easy entry-level close.",
    status: "stub",
  },
];

export default function ProductsIndexPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "60px 36px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Product Encyclopedia</div>
            <h1>
              Know <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>what you sell.</em>
            </h1>
            <p className="deck">
              Per-product deep dives. What it is, who buys it, what it does, common objections + scripted responses, what to say, what NOT to say.
            </p>
          </header>

          <div style={{ background: "rgba(229, 74, 40, 0.08)", border: "1px solid #e54a28", padding: "16px 20px", marginBottom: "32px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
            <strong style={{ color: "#e54a28", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Heads up</strong>
            <p style={{ margin: "8px 0 0" }}>
              Encyclopedia content is being built. Right now you see stub pages with the basics. For full content (objections, scripts, gotchas) check the <Link href="/rep-portal/scripts" style={{ color: "var(--color-warm-accent)" }}>scripts page</Link> or ping Elijah.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {ENTRIES.map((e) => (
              <Link key={e.slug} href={`/rep-portal/products/${e.slug}`} className="pv-card" style={{ display: "block" }}>
                <span className="b3"></span><span className="b4"></span>
                <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "8px" }}>
                  {e.division}
                </div>
                <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 8px", letterSpacing: "0.01em" }}>
                  {e.name}
                </h3>
                <div style={{ fontSize: "14px", color: "var(--color-warm-accent)", fontWeight: 600, marginBottom: "8px" }}>
                  {e.price}
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {e.blurb}
                </p>
              </Link>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
