"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PanopticonMark } from "./PanopticonMark";

const DARK  = "#0c0a08";
const GOLD  = "#d4af37";
const CREAM = "#f5f0e0";
const EMBER = "#2e2820";
const ASH   = "#524d45";
const CHAR  = "#3a3530";

// Pages that are internal tools — no public nav needed
const HIDE_ON = ["/logos", "/patterns", "/brand", "/resume", "/print", "/qr", "/business-cards", "/crm", "/invoicing", "/newsletter", "/digital/playbook", "/digital/finder", "/courses/college-apps/lessons"];

const LAMPSTAND = {
  cellStyle: "outlined" as const,
  pvSize: 70, pvClearR: 58,
  ringStart: 70, ringEnd: 116,
  numRings: 7, ringFadeToCenter: true,
};

const LINKS = [
  { href: "/digital",    label: "Digital" },
  { href: "/consulting", label: "Consulting" },
  { href: "/software",   label: "Software" },
  { href: "/courses",    label: "Courses" },
  { href: "/services",   label: "Services" },
  { href: "/about",      label: "About" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (HIDE_ON.some(p => pathname.startsWith(p))) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <style>{`
        .pv-nav-links { display: flex; }
        .pv-nav-contact { display: flex; }
        .pv-nav-hamburger { display: none; }
        @media (max-width: 767px) {
          .pv-nav-links { display: none; }
          .pv-nav-contact { display: none; }
          .pv-nav-hamburger { display: flex; }
        }
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 100, background: DARK, borderBottom: `1px solid ${EMBER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Wordmark */}
          <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <PanopticonMark size={34} color={GOLD} bg={DARK} cfg={LAMPSTAND} />
            <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", fontWeight: 700, color: CREAM, letterSpacing: "0.12em" }}>
              PURCELL VENTURES
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="pv-nav-links" style={{ alignItems: "center", gap: "2px" }}>
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} style={{
                padding: "7px 14px",
                fontSize: "13px",
                fontWeight: isActive(link.href) ? 600 : 400,
                color: isActive(link.href) ? GOLD : ASH,
                textDecoration: "none",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-inter), sans-serif",
                borderRadius: 4,
                transition: "color 0.15s",
              }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="pv-nav-contact" style={{ alignItems: "center" }}>
            <Link href="/about#contact" style={{
              padding: "7px 18px",
              fontSize: "12px",
              fontWeight: 700,
              color: GOLD,
              border: `1px solid ${GOLD}`,
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.07em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="pv-nav-hamburger"
            onClick={() => setOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: CREAM, alignItems: "center", justifyContent: "center" }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ borderTop: `1px solid ${EMBER}`, background: DARK, padding: "12px 0 20px" }}>
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                display: "block",
                padding: "12px 28px",
                fontSize: "15px",
                fontWeight: isActive(link.href) ? 600 : 400,
                color: isActive(link.href) ? GOLD : CREAM,
                textDecoration: "none",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-inter), sans-serif",
                borderLeft: isActive(link.href) ? `2px solid ${GOLD}` : "2px solid transparent",
              }}>
                {link.label}
              </Link>
            ))}
            <div style={{ padding: "16px 28px 0" }}>
              <Link href="/about#contact" onClick={() => setOpen(false)} style={{
                display: "inline-block",
                padding: "9px 22px",
                fontSize: "13px",
                fontWeight: 700,
                color: GOLD,
                border: `1px solid ${GOLD}`,
                borderRadius: 4,
                textDecoration: "none",
                letterSpacing: "0.07em",
                fontFamily: "var(--font-inter), sans-serif",
              }}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
