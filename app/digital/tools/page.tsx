"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { AI_TOOLS } from "@/lib/ai-tools";

const STATE_TOOLS = [
  { slug: "loyalty",            name: "Loyalty Punch Card",   tagline: "Digital punch card for repeat customers",     category: "Customer Management" as const },
  { slug: "expenses",           name: "Expense Tracker",      tagline: "Log expenses + monthly summaries",     category: "Operations & Finance" as const },
  { slug: "inventory",          name: "Inventory Tracker",    tagline: "Product list + low-stock alerts",     category: "Operations & Finance" as const },
  { slug: "estimating",         name: "Online Estimating",    tagline: "Job quotes with line items + print/PDF", category: "Operations & Finance" as const },
  { slug: "event-registration", name: "Event Registration",   tagline: "RSVP form + attendee management",     category: "Booking & Scheduling" as const },
];

type ToolCard = { slug: string; name: string; tagline: string; category: string; isAI: boolean };

export default function ToolsIndexPage() {
  const allTools: ToolCard[] = [
    ...AI_TOOLS.map((t) => ({ slug: t.slug, name: t.name, tagline: t.tagline, category: t.category, isAI: true })),
    ...STATE_TOOLS.map((t) => ({ slug: t.slug, name: t.name, tagline: t.tagline, category: t.category, isAI: false })),
  ];

  const grouped = allTools.reduce<Record<string, ToolCard[]>>((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "1080px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <header className="pv-page-head">
          <div className="pv-mono-label">Digital Services · Live Tools</div>
          <h1>
            Try them <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>before you buy them.</em>
          </h1>
          <p className="deck">
            Working versions of every digital tool we sell. Free to use. Plug in your business, see what comes out. If it saves you time, we can integrate the branded version into your own site. <Link href="/digital" style={{ color: "var(--color-warm-accent)" }}>See subscription tiers</Link>.
          </p>
        </header>

        {Object.entries(grouped).map(([category, tools]) => (
          <section key={category} style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.02em", borderBottom: "1px solid var(--color-warm-border)", paddingBottom: "12px" }}>
              {category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
              {tools.map((t) => (
                <Link
                  key={t.slug}
                  href={t.isAI ? `/digital/tools/${t.slug}` : `/digital/${t.slug}`}
                  className="pv-card"
                  style={{ display: "block" }}
                >
                  <span className="b3"></span><span className="b4"></span>
                  {t.isAI && (
                    <div style={{ fontSize: "9px", letterSpacing: "0.24em", color: "var(--color-warm-accent)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      AI-Powered
                    </div>
                  )}
                  <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "18px", color: "var(--color-warm-text)", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 }}>
                    {t.name}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: 0, lineHeight: 1.5 }}>
                    {t.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ marginTop: "48px", textAlign: "center", padding: "32px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-accent)" }}>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text)", margin: "0 0 12px", lineHeight: 1.6 }}>
            All of these are FREE to use here. Want them branded + integrated into your own site, with your business&apos;s data feeding them?
          </p>
          <Link href="/digital" className="pv-btn-primary">See Digital subscription tiers</Link>
        </div>

      </main>
    </div>
  );
}
