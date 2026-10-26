"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/contact";
import { HIDE_CHROME_ON } from "./SiteNav";

// The footer is where most internal links to the person live: /who, /team and /resume
// were reachable from almost nowhere before it existed. rel="me" on the profiles is the
// machine-readable half of the sameAs claim in the root layout's JSON-LD.

const COLS: { title: string; links: { href: string; label: string; rel?: string }[] }[] = [
  {
    title: "Services",
    links: [
      { href: "/sites", label: "Websites" },
      { href: "/digital", label: "Digital add-ons" },
      { href: "/consulting", label: "AI consulting" },
      { href: "/software", label: "Custom software" },
      { href: "/steady", label: "Steady, personal IT" },
      { href: "/pricing-comparison", label: "Price comparison" },
    ],
  },
  {
    title: "Work and resources",
    links: [
      { href: "/portfolio", label: "Portfolio" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/agentic-ai", label: "Autonomous AI agents" },
      { href: "/courses", label: "Courses" },
      { href: "/shop", label: "Shop" },
      { href: "/tools", label: "Free tools" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "The company",
    links: [
      { href: "/who", label: "Who is Elijah Purcell" },
      { href: "/what-is-purcell-ventures", label: "What is Purcell Ventures" },
      { href: "/about", label: "About" },
      { href: "/how-we-work", label: "How I work" },
      { href: "/team", label: "The team" },
      { href: "/resume", label: "Founder résumé" },
      { href: "/faq", label: "Questions" },
      { href: "/ai-at-alabama", label: "AI at Alabama" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { href: "https://www.linkedin.com/in/theelijahpurcell", label: "LinkedIn", rel: "me" },
      { href: "https://github.com/thebigjah", label: "GitHub", rel: "me" },
      { href: "https://www.instagram.com/theelijahpurcell/", label: "Instagram", rel: "me" },
      { href: "https://ua-today.vercel.app", label: "UA Today" },
    ],
  },
];

export default function SiteFooter() {
  const pathname = usePathname() || "/";
  if (HIDE_CHROME_ON.some((p) => pathname.startsWith(p))) return null;
  return (
    <footer className="foot">
      <style dangerouslySetInnerHTML={{ __html: FOOT_CSS }} />
      <div className="ui-wrap foot__top">
        <div className="foot__brand">
          <Link href="/" className="foot__lock" aria-label="Purcell Ventures, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark-foil.svg" alt="" width={40} height={40} />
            <b>Purcell Ventures</b>
          </Link>
          <p>Websites, software and AI training for small businesses. Founded in Georgia in 2025 and run by Elijah Purcell from Tuscaloosa, Alabama.</p>
          <p className="foot__reach">
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <Link href="/about#contact" className="ui-btn">Start a project</Link>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="foot__h">{c.title}</p>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} rel={l.rel}>{l.label}</a>
                  ) : (
                    <Link href={l.href}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="ui-wrap foot__base">
        <span>&copy; 2026 Purcell Ventures LLC, Georgia control number {CONTACT.llcControlNumber}.</span>
        <span>Elijah Purcell, Founder/CEO</span>
      </div>
    </footer>
  );
}

const FOOT_CSS = `
.foot{border-top:1px solid var(--line);background:var(--bg);color:var(--muted);font-size:15px;padding-block:56px 32px}
.foot__top{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(4,minmax(0,1fr));gap:32px}
.foot__lock{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--fg);margin-bottom:14px}
.foot__lock b{font:600 20px/1 var(--font-display);letter-spacing:.04em}
.foot__brand p{margin:0 0 14px;max-width:36ch}
.foot__reach{display:flex;flex-direction:column;gap:2px}
.foot__reach a{color:var(--fg);text-decoration:none}
.foot__h{color:var(--fg);font-weight:700;margin:0 0 10px}
.foot ul{list-style:none;margin:0;padding:0}
.foot li a{display:inline-block;padding:4px 0;color:var(--muted);text-decoration:none}
.foot li a:hover,.foot__reach a:hover{color:#f0d79a}
.foot__base{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:40px;padding-top:20px;border-top:1px solid var(--line);font-size:14px;color:var(--subtle)}
@media (max-width:980px){.foot__top{grid-template-columns:repeat(2,minmax(0,1fr))}.foot__brand{grid-column:1/-1}}
@media (max-width:520px){.foot__top{grid-template-columns:minmax(0,1fr)}}`;
