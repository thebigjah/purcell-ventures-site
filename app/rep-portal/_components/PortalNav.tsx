"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/crm-storage";
import { CommandPalette } from "./CommandPalette";

const LINKS = [
  { href: "/rep-portal", label: "Dashboard", adminOnly: false },
  { href: "/rep-portal/crm", label: "CRM", adminOnly: false },
  { href: "/rep-portal/calendar", label: "Calendar", adminOnly: false },
  { href: "/rep-portal/operations", label: "Operations", adminOnly: false },
  { href: "/rep-portal/pricing", label: "Pricing", adminOnly: false },
  { href: "/rep-portal/products", label: "Products", adminOnly: false },
  { href: "/rep-portal/playbook", label: "Playbook", adminOnly: false },
  { href: "/rep-portal/scripts", label: "Scripts", adminOnly: false },
  { href: "/rep-portal/handbook", label: "Handbook", adminOnly: false },
  { href: "/rep-portal/templates", label: "Templates", adminOnly: false },
  { href: "/rep-portal/demo-tools", label: "Tools", adminOnly: false },
  { href: "/rep-portal/ask", label: "Ask", adminOnly: false },
  { href: "/rep-portal/objections", label: "Objections", adminOnly: false },
  { href: "/rep-portal/pitch-coach", label: "Pitch Coach", adminOnly: false },
  { href: "/rep-portal/call-recap", label: "Call Recap", adminOnly: false },
  { href: "/rep-portal/email-polish", label: "Email Polish", adminOnly: false },
  { href: "/rep-portal/help", label: "Help", adminOnly: false },
  { href: "/rep-portal/settings", label: "Settings", adminOnly: false },
  { href: "/rep-portal/onboard", label: "Onboard", adminOnly: true },
];

export function PortalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("pv_rep_name="));
    if (cookie) setName(decodeURIComponent(cookie.split("=")[1] || ""));
  }, []);

  async function signOut() {
    await fetch("/api/rep-auth", { method: "DELETE" });
    router.push("/rep-portal/login");
  }

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 10,
      background: "var(--color-warm-bg)",
      borderBottom: "1px solid var(--color-warm-border)",
      padding: "14px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "12px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <Link href="/rep-portal" style={{
          fontFamily: "'Cinzel', Georgia, serif", fontSize: "16px",
          color: "var(--color-warm-accent)", textDecoration: "none",
          fontWeight: 700, letterSpacing: "0.04em",
        }}>
          PV Rep Portal
        </Link>
        <nav style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {LINKS.filter((l) => !l.adminOnly || isAdmin(name)).map((l) => {
            const active = pathname === l.href || (l.href !== "/rep-portal" && pathname.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: active ? "var(--color-warm-accent)" : "var(--color-warm-text-muted)",
                textDecoration: "none",
                borderBottom: active ? "2px solid var(--color-warm-accent)" : "2px solid transparent",
                paddingBottom: "4px",
              }}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {name && (
          <span style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            {name}
          </span>
        )}
        <span style={{ fontSize: "10px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-dm-sans), monospace", padding: "4px 8px", border: "1px solid var(--color-warm-border)" }} title="Open command palette">⌘K</span>
        <button
          onClick={signOut}
          style={{
            background: "transparent",
            border: "1px solid var(--color-warm-border)",
            color: "var(--color-warm-text-muted)",
            padding: "6px 12px",
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Sign out
        </button>
      </div>
      <CommandPalette />
    </header>
  );
}
