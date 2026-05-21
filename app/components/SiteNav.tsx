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
const HIDE_ON = ["/logos", "/patterns", "/brand", "/resume", "/print", "/qr", "/business-cards", "/crm", "/invoicing", "/newsletter", "/digital/playbook", "/digital/finder", "/courses/college-apps/lessons", "/courses/business-launch/lessons", "/courses/ai-automation/lessons"];

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
  { href: "/about",      label: "About" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (HIDE_ON.some(p => pathname.startsWith(p))) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .pv-nav-links { display: flex; }
        .pv-nav-contact { display: flex; }
        .pv-nav-hamburger { display: none; }
        .pv-nav-link { transition: color 0.15s; }
        .pv-nav-link:hover { color: ${CREAM} !important; }
        @media (max-width: 767px) {
          .pv-nav-links { display: none; }
          .pv-nav-contact { display: none; }
          .pv-nav-hamburger { display: flex; }
        }
      ` }} />

      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(12, 10, 8, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${EMBER}`,
      }}>
        {/* Brass hairline rule */}
        <div style={{ height: "1px", background: GOLD, opacity: 0.35 }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "62px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Wordmark — Cinzel with proper letter-spacing */}
          <Link href="/" onClick={() => setOpen(false)} style={{
            display: "flex", alignItems: "center", gap: "12px",
            textDecoration: "none", flexShrink: 0,
          }}>
            <PanopticonMark size={32} color={GOLD} bg="transparent" cfg={LAMPSTAND} />
            <span style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "13px", fontWeight: 700,
              color: CREAM, letterSpacing: "0.32em",
              paddingLeft: "0.32em",
            }}>
              PURCELL · VENTURES
            </span>
          </Link>

          {/* Desktop links — mono small-caps */}
          <nav className="pv-nav-links" style={{ alignItems: "center", gap: "4px" }}>
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} className="pv-nav-link" style={{
                padding: "7px 14px",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "10.5px",
                fontWeight: isActive(link.href) ? 700 : 500,
                color: isActive(link.href) ? GOLD : ASH,
                textDecoration: "none",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                borderRadius: 0,
                position: "relative",
              }}>
                {link.label}
                {isActive(link.href) && (
                  <span style={{
                    position: "absolute", left: "14px", right: "14px", bottom: "-2px",
                    height: "1px", background: GOLD,
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — pv-btn-ghost style */}
          <div className="pv-nav-contact" style={{ alignItems: "center" }}>
            <Link href="/about#contact" style={{
              padding: "8px 16px",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              fontSize: "10.5px", fontWeight: 700,
              color: GOLD,
              border: `1.5px solid ${GOLD}`,
              borderRadius: 0,
              textDecoration: "none",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              transition: "background 0.12s, color 0.12s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = DARK; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
            >
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
          <div style={{ borderTop: `1px solid ${EMBER}`, background: DARK, padding: "16px 0 24px" }}>
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                display: "block",
                padding: "14px 28px",
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: "14px",
                fontWeight: isActive(link.href) ? 700 : 500,
                color: isActive(link.href) ? GOLD : CREAM,
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderLeft: isActive(link.href) ? `3px solid ${GOLD}` : "3px solid transparent",
              }}>
                {link.label}
              </Link>
            ))}
            <div style={{ padding: "20px 28px 0" }}>
              <Link href="/about#contact" onClick={() => setOpen(false)} style={{
                display: "inline-block",
                padding: "10px 22px",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "10.5px", fontWeight: 700,
                color: GOLD,
                border: `1.5px solid ${GOLD}`,
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
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
