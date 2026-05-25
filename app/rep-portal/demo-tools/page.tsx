"use client";

import { useState } from "react";
import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

/**
 * Rep Demo Tools — in-pitch quick launcher.
 * Reps open this page during a sales call. Each tool opens in a new tab
 * with the prospect's industry pre-suggested as a quick-start prompt.
 */

interface DemoTool {
  slug: string;
  href: string;
  name: string;
  pitch: string;
  bestFor: string;
  exampleInput: string;
  category: "AI" | "Operations" | "Customer" | "Branding";
}

const TOOLS: DemoTool[] = [
  {
    slug: "faq-builder",
    href: "/digital/tools/faq-builder",
    name: "AI FAQ Builder",
    pitch: "Tell us about your business → 6-10 customer-quality FAQ pairs in 30 seconds.",
    bestFor: "Any service business that gets the same questions over and over.",
    exampleInput: "Family-owned plumbing in Atlanta, 24/7 emergency, gas + electric water heaters, drain cleaning",
    category: "AI",
  },
  {
    slug: "content-generator",
    href: "/digital/tools/content-generator",
    name: "AI Content Generator",
    pitch: "Blog posts, descriptions, bios, emails, captions — pick a type, get a draft.",
    bestFor: "Owners who know they should be publishing content but never have time.",
    exampleInput: "Blog post about: Why you should flush your water heater annually",
    category: "AI",
  },
  {
    slug: "caption-generator",
    href: "/digital/tools/caption-generator",
    name: "AI Caption Generator",
    pitch: "5 social captions in different voices — story / value / question / behind-the-scenes / CTA.",
    bestFor: "Salons, contractors, restaurants — anyone whose social is sporadic.",
    exampleInput: "Behind-the-scenes shot of organizing tools in the truck",
    category: "AI",
  },
  {
    slug: "color-palette",
    href: "/digital/tools/color-palette",
    name: "Color Palette Tool",
    pitch: "Describe your business vibe → 5-color palette with hex codes + usage guidance.",
    bestFor: "Owners refreshing their brand. Pairs well with Brand Kit Builder.",
    exampleInput: "Cozy coffee shop, historic downtown, books, mismatched chairs, warm sweater weather",
    category: "Branding",
  },
  {
    slug: "brand-kit",
    href: "/digital/tools/brand-kit",
    name: "Brand Kit Builder",
    pitch: "Palette + fonts + voice + taglines — complete starter brand guide.",
    bestFor: "New businesses or rebrand prospects. High wow factor in pitches.",
    exampleInput: "Mobile dog grooming, focused on anxious dogs and senior pets",
    category: "Branding",
  },
  {
    slug: "logo-concepts",
    href: "/digital/tools/logo-concepts",
    name: "Logo Concept Generator",
    pitch: "5 distinct logo directions — icon, type, palette, rationale.",
    bestFor: "Anyone considering a rebrand. Use to brief a designer or sketch yourself.",
    exampleInput: "Business: Bob's Plumbing · Industry: Residential plumbing · Personality: Reliable, hometown, no-nonsense",
    category: "Branding",
  },
  {
    slug: "business-card-copy",
    href: "/digital/tools/business-card-copy",
    name: "Business Card Copy",
    pitch: "Front + back card copy with a tagline that earns callbacks.",
    bestFor: "Anyone whose card needs a refresh. Quick close.",
    exampleInput: "Business: Bob's Plumbing · I fix gutters and clean siding for North Metro Atlanta homeowners",
    category: "Branding",
  },
  {
    slug: "social-templates",
    href: "/digital/tools/social-templates",
    name: "Social Media Templates",
    pitch: "5 reusable post formats matched to your specific business.",
    bestFor: "Owners trying to systematize their social.",
    exampleInput: "Family-owned plumbing serving Metro Atlanta since 1995",
    category: "Branding",
  },
  {
    slug: "review-response",
    href: "/digital/tools/review-response",
    name: "Review Response Generator",
    pitch: "Paste any review → get a thoughtful response that protects your reputation.",
    bestFor: "Service businesses with active Google/Yelp presence.",
    exampleInput: "1-star review: 'Tech was 2 hours late and didn't fix the leak. Charged $200.'",
    category: "Customer",
  },
  {
    slug: "email-composer",
    href: "/digital/tools/email-composer",
    name: "Email Composer",
    pitch: "Cold outreach, follow-up, response — get a draft ready to edit and send.",
    bestFor: "Anyone with email outreach in their workflow.",
    exampleInput: "Warm follow-up: toured Jane's salon Tuesday, quoted $179/mo, 5 days no response",
    category: "AI",
  },
  {
    slug: "sms-composer",
    href: "/digital/tools/sms-composer",
    name: "SMS Composer",
    pitch: "Booking reminder, promo, follow-up — 3 variants under 160 chars.",
    bestFor: "Anyone with booking/appointment workflow.",
    exampleInput: "Booking reminder: 10 AM tomorrow gutter cleaning at 123 Oak St",
    category: "Customer",
  },
  {
    slug: "estimate-generator",
    href: "/digital/tools/estimate-generator",
    name: "AI Estimate Generator",
    pitch: "Rough notes → structured estimate with line items + exclusions + caveats.",
    bestFor: "Contractors, service techs, anyone quoting jobs.",
    exampleInput: "Replace water heater in basement, switch gas to electric, 75 gal unit",
    category: "Operations",
  },
  // State tools
  {
    slug: "loyalty",
    href: "/digital/loyalty",
    name: "Loyalty Punch Card",
    pitch: "Digital punch card for repeat customers — add a punch, redeem when full.",
    bestFor: "Coffee shops, salons, restaurants — anything with a 'buy 10 get one free' angle.",
    exampleInput: "Add your first customer, click + Punch on each visit, redeem at cap",
    category: "Customer",
  },
  {
    slug: "expenses",
    href: "/digital/expenses",
    name: "Expense Tracker",
    pitch: "Log expenses by category — monthly summaries + tax-deductible flagging.",
    bestFor: "Self-employed, contractors, anyone managing their own books.",
    exampleInput: "$45 Home Depot — drill bits for Tuesday's job · Materials · Tax-deductible",
    category: "Operations",
  },
  {
    slug: "inventory",
    href: "/digital/inventory",
    name: "Inventory Tracker",
    pitch: "SKU list + stock levels + low-stock alerts — never run out of materials again.",
    bestFor: "Contractors, retail, anyone with physical inventory.",
    exampleInput: "Premium drill bits 1/4in · qty 12 · reorder at 5 · $4.50 each",
    category: "Operations",
  },
  {
    slug: "estimating",
    href: "/digital/estimating",
    name: "Online Estimating",
    pitch: "Build full estimates with line items + tax + print-to-PDF — send via link.",
    bestFor: "Any service business that quotes jobs of varying scope.",
    exampleInput: "Client + job + scope + line items → printable estimate",
    category: "Operations",
  },
  {
    slug: "event-registration",
    href: "/digital/event-registration",
    name: "Event Registration",
    pitch: "Create events, collect RSVPs, check people in at the door.",
    bestFor: "Anyone running workshops, classes, open houses, community events.",
    exampleInput: "AI for Small Business Workshop · Jun 15, 10AM · Capacity 20",
    category: "Customer",
  },
];

const CATS = ["All", "AI", "Branding", "Operations", "Customer"] as const;
type Cat = (typeof CATS)[number];

export default function DemoToolsPage() {
  const [cat, setCat] = useState<Cat>("All");

  const visible = cat === "All" ? TOOLS : TOOLS.filter((t) => t.category === cat);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · Demo Tools</div>
            <h1>
              In-pitch tool <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>launcher.</em>
            </h1>
            <p className="deck">
              17 working tools, ranked for in-call demos. Each card shows the pitch, the ideal prospect, and a sample input — open in a new tab, paste the prospect&apos;s industry, demo the magic.
            </p>
          </header>

          <div style={{ marginBottom: "24px", background: "rgba(212, 175, 55, 0.06)", border: "1px solid var(--color-warm-accent)", padding: "14px 18px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "10px" }}>How to use during a pitch · </strong>
            Pull up the tool that matches what they need. Use their actual business name + 1-sentence description as input. Watch their face when the AI returns something useful in 10 seconds. Then say: &quot;Want a custom version that runs on YOUR site, with YOUR brand?&quot;
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  padding: "6px 14px",
                  background: cat === c ? "var(--color-warm-accent)" : "transparent",
                  color: cat === c ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
                  border: `1px solid ${cat === c ? "var(--color-warm-accent)" : "var(--color-warm-border)"}`,
                  fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer", fontWeight: 700, borderRadius: 0,
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Tools grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "14px" }}>
            {visible.map((t) => (
              <div key={t.slug} style={{ background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px", color: "var(--color-warm-text)", fontWeight: 600, margin: 0 }}>{t.name}</h3>
                  <span style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700 }}>{t.category}</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.5, margin: "0 0 10px" }}>{t.pitch}</p>
                <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", lineHeight: 1.5, margin: "0 0 10px", fontStyle: "italic", paddingTop: "8px", borderTop: "1px solid var(--color-warm-border)" }}>
                  <strong style={{ color: "var(--color-warm-accent)", fontStyle: "normal", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "10px", fontFamily: "var(--font-dm-sans), sans-serif" }}>Best for: </strong>
                  {t.bestFor}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-warm-text-muted)", lineHeight: 1.5, margin: "0 0 14px", fontFamily: "var(--font-inter), sans-serif" }}>
                  <strong style={{ color: "var(--color-warm-accent)", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "10px", fontFamily: "var(--font-dm-sans), sans-serif" }}>Sample input: </strong>
                  &ldquo;{t.exampleInput}&rdquo;
                </div>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="pv-btn-primary"
                  style={{ marginTop: "auto", textAlign: "center", fontSize: "11px", padding: "10px 14px" }}
                >
                  Open in new tab →
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", fontSize: "12px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--color-warm-accent)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "10px" }}>Pro move · </strong>
            Don&apos;t pre-demo. Wait for the prospect to describe their pain, THEN pull up the matching tool and demo with their actual context. The magic moment is when they see the tool work on THEIR business — not on a generic example.
          </div>
          <p style={{ marginTop: "20px", fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
            All of these are also viewable as your prospects would see them at <Link href="/digital/tools" style={{ color: "var(--color-warm-accent)" }}>/digital/tools</Link>.
          </p>

        </main>
      </div>
    </div>
  );
}
