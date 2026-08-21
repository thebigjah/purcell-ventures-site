"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/contact";

// WHY A FOOTER EXISTS NOW.
//
// The site had seventy-three pages and four of them named him. That is the whole
// internal-linking problem in one sentence: a search engine crawling this domain saw a
// company, and had almost nothing tying the company to a person. The three pages that do
// answer for the person, /who, /team and /resume, were reachable from nearly nowhere.
//
// One footer on every page fixes it, and it costs a reader nothing because it is at the
// bottom, which is where somebody who has finished reading goes looking for exactly these
// things: who is this, how do I reach them.

// Mirror SiteNav exactly. Every path on that list is a standalone surface with its
// own design, a print target, or a logged-in tool, and a marketing footer under any
// of them is a mistake in the same way a nav bar there would be.
const HIDE_ON = ["/logos", "/patterns", "/brand", "/resume", "/print", "/qr", "/business-cards", "/crm", "/invoicing", "/newsletter", "/links", "/digital/playbook", "/digital/finder", "/sales-rep", "/rep-portal", "/courses/college-apps/lessons", "/courses/business-launch/lessons", "/courses/ai-automation/lessons", "/shop", "/free"];

export default function SiteFooter() {
  const pathname = usePathname() || "/";
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  const year = 2026;

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(212,175,55,0.18)",
        background: "#0f0e0c",
        color: "#8b8578",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        fontSize: "13px",
        lineHeight: 1.7,
        padding: "48px 24px 40px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gap: "32px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>

        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d4af37", fontWeight: 700, marginBottom: "12px" }}>
            Purcell Ventures LLC
          </div>
          <p style={{ margin: 0, maxWidth: "34ch" }}>
            Websites, software and AI tooling for small businesses. Founded 2025 in
            Georgia. Operated from Tuscaloosa, Alabama.
          </p>
        </div>

        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d4af37", fontWeight: 700, marginBottom: "12px" }}>
            The company
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li><Link href="/who" style={{ color: "#c9c3b4", textDecoration: "none" }}>Who is Elijah Purcell</Link></li>
            <li><Link href="/what-is-purcell-ventures" style={{ color: "#8b8578", textDecoration: "none" }}>What is Purcell Ventures</Link></li>
            <li><Link href="/team" style={{ color: "#8b8578", textDecoration: "none" }}>The team</Link></li>
            <li><Link href="/resume" style={{ color: "#8b8578", textDecoration: "none" }}>Founder resume</Link></li>
            <li><Link href="/portfolio" style={{ color: "#8b8578", textDecoration: "none" }}>Portfolio</Link></li>
            <li><Link href="/tools" style={{ color: "#8b8578", textDecoration: "none" }}>Free tools</Link></li>
            <li><Link href="/blog" style={{ color: "#8b8578", textDecoration: "none" }}>Writing</Link></li>
            <li><Link href="/ai-at-alabama" style={{ color: "#8b8578", textDecoration: "none" }}>AI at Alabama</Link></li>
          </ul>
        </div>

        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d4af37", fontWeight: 700, marginBottom: "12px" }}>
            Reach us
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li><a href={`tel:${CONTACT.phoneE164}`} style={{ color: "#8b8578", textDecoration: "none" }}>{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} style={{ color: "#8b8578", textDecoration: "none" }}>{CONTACT.email}</a></li>
            <li><Link href="/about#contact" style={{ color: "#8b8578", textDecoration: "none" }}>Start a project</Link></li>
          </ul>
        </div>

        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d4af37", fontWeight: 700, marginBottom: "12px" }}>
            Elsewhere
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li><a href="https://www.linkedin.com/in/theelijahpurcell" rel="me" style={{ color: "#8b8578", textDecoration: "none" }}>LinkedIn</a></li>
            <li><a href="https://github.com/thebigjah" rel="me" style={{ color: "#8b8578", textDecoration: "none" }}>GitHub</a></li>
            <li><a href="https://www.instagram.com/elijah_the_tall/" rel="me" style={{ color: "#8b8578", textDecoration: "none" }}>Instagram</a></li>
            <li><a href="https://ua-today.vercel.app" style={{ color: "#8b8578", textDecoration: "none" }}>UA Today</a></li>
          </ul>
        </div>

      </div>

      {/* rel="me" above is not decoration. It is the machine-readable half of the same
          claim the sameAs array makes in JSON-LD, and having both agree is what turns
          four separate profiles into one entity rather than four people with a name in
          common. */}
      <div style={{ maxWidth: "1100px", margin: "36px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(212,175,55,0.10)", fontSize: "11.5px", color: "#6d6759" }}>
        &copy; {year} Purcell Ventures LLC. Founded and operated by Elijah Purcell.
      </div>
    </footer>
  );
}
