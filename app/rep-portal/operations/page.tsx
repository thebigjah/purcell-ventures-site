"use client";

import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

/**
 * /rep-portal/operations — PV's own internal tools.
 *
 * Distinct from /digital/* which are customer-facing demos. These are
 * for tracking PV's actual loyalty customers, expenses, inventory,
 * estimates, and events.
 *
 * Storage: separate `pv_ops_*` localStorage keys so they don't
 * conflict with the demo versions.
 *
 * Multi-device sync: requires Firestore migration (next session).
 * For now: per-browser. Use ONE browser as the source of truth.
 */

const TOOLS = [
  {
    href: "/rep-portal/operations/loyalty",
    title: "PV Loyalty Card Customers",
    blurb: "Track your repeat customers and punch counts. When they hit 10 punches, redeem.",
    storageKey: "pv_ops_loyalty_v1",
  },
  {
    href: "/rep-portal/operations/expenses",
    title: "PV Business Expenses",
    blurb: "Log PV business expenses by category. Auto-totals monthly + flags tax-deductible.",
    storageKey: "pv_ops_expenses_v1",
  },
  {
    href: "/rep-portal/operations/inventory",
    title: "PV Inventory + Supplies",
    blurb: "Track PV's actual inventory: materials, equipment, supplies. Low-stock alerts.",
    storageKey: "pv_ops_inventory_v1",
  },
  {
    href: "/rep-portal/operations/estimating",
    title: "PV Estimates + Quotes",
    blurb: "Build proposals for PV clients. Print-to-PDF. Generate sequential estimate numbers.",
    storageKey: "pv_ops_estimates_v1",
  },
  {
    href: "/rep-portal/operations/events",
    title: "PV Events + Workshops",
    blurb: "Manage PV-hosted events, workshop signups, RSVP tracking, check-in at the door.",
    storageKey: "pv_ops_events_v1",
  },
];

export default function OperationsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 96px" }}>

          <header className="pv-page-head">
            <div className="pv-mono-label">Rep Portal · PV Operations</div>
            <h1>
              PV&apos;s own <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>tools.</em>
            </h1>
            <p className="deck">
              Internal versions of our customer-facing tools, same UI, but loaded with PV&apos;s actual data instead of empty demos. Password-gated. Storage isolated from the public demos.
            </p>
          </header>

          {/* Warning banner about per-browser storage */}
          <div style={{ marginBottom: "32px", padding: "16px 20px", background: "rgba(232, 185, 104, 0.08)", border: "1px solid #e8b968", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.6 }}>
            <strong style={{ color: "#e8b968", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "10px" }}>Heads up · </strong>
            These tools store data locally on whatever browser you&apos;re using right now. To use them across devices, we need to migrate to Firestore (planned next session). For now: <strong style={{ color: "var(--color-warm-accent)" }}>pick ONE browser as your &quot;PV operations machine&quot;</strong> (probably your work laptop) and use it consistently. Use Export → JSON for backup before switching machines.
          </div>

          {/* Tools grid */}
          <div style={{ display: "grid", gap: "16px" }}>
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="pv-card" style={{ padding: 0, overflow: "hidden", textDecoration: "none", display: "block" }}>
                <span className="b3"></span><span className="b4"></span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "center", padding: "24px 28px" }}>
                  <div>
                    <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", fontWeight: 600, margin: "0 0 8px" }}>
                      {t.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: "13px", color: "var(--color-warm-text-muted)", lineHeight: 1.6 }}>{t.blurb}</p>
                    <p style={{ margin: "8px 0 0", fontSize: "11px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-dm-sans), monospace" }}>storage: <code>{t.storageKey}</code></p>
                  </div>
                  <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", color: "var(--color-warm-accent)" }}>→</span>
                </div>
              </Link>
            ))}
          </div>

          <p style={{ marginTop: "32px", fontSize: "12px", color: "var(--color-warm-text-light)", textAlign: "center", fontStyle: "italic" }}>
            Want to show prospects the same tools? Use the customer-facing demos at <Link href="/digital/tools" style={{ color: "var(--color-warm-accent)" }}>/digital/tools</Link> and the individual links (<code>/digital/loyalty</code>, <code>/digital/expenses</code>, etc.).
          </p>

        </main>
      </div>
    </div>
  );
}
