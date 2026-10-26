"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Pages that are internal tools, print targets or standalone storefronts. They carry
// their own chrome, so the site nav stays off them. Mirrors SiteFooter.
export const HIDE_CHROME_ON = ["/logos", "/patterns", "/brand", "/print", "/qr", "/business-cards", "/crm", "/invoicing", "/newsletter", "/digital/playbook", "/digital/finder", "/sales-rep", "/rep-portal", "/courses/college-apps/lessons", "/courses/business-launch/lessons", "/courses/ai-automation/lessons", "/resume/print"];

// Grouped the way the homepage map is: what I do, the proof, what you can learn, who I
// am. Each group opens a menu on hover. Blog is one destination, so it stays a link.
type Item = { href: string; label: string };
const MENUS: { label: string; items: Item[] }[] = [
  { label: "Services", items: [
    { href: "/sites", label: "Websites" },
    { href: "/digital", label: "Digital add-ons" },
    { href: "/consulting", label: "AI consulting" },
    { href: "/software", label: "Custom software" },
    { href: "/steady", label: "Steady, personal IT" },
    { href: "/pricing-comparison", label: "Prices compared" },
  ] },
  { label: "Proof", items: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/case-studies", label: "Case studies" },
    { href: "/team", label: "The AI team" },
    { href: "/resume", label: "Résumé" },
  ] },
  { label: "Learn", items: [
    { href: "/courses", label: "Courses" },
    { href: "/digital/tools", label: "Free AI tools" },
    { href: "/shop", label: "Shop" },
  ] },
  { label: "About", items: [
    { href: "/about", label: "About" },
    { href: "/how-we-work", label: "How I work" },
    { href: "/now", label: "Now" },
    { href: "/faq", label: "Questions" },
    { href: "/contact", label: "Contact card" },
  ] },
];
const BLOG: Item = { href: "/blog", label: "Blog" };

export default function SiteNav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      setSolid(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 600 ? Math.min(1, window.scrollY / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); setMenu(null); }, [pathname]);
  const hidden = HIDE_CHROME_ON.some((p) => pathname.startsWith(p));
  useEffect(() => { document.body.dataset.chrome = hidden ? "off" : "on"; }, [hidden]);

  if (hidden) return null;
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const inMenu = (m: (typeof MENUS)[number]) => m.items.some((i) => active(i.href));

  return (
    <header className={`nav${solid || open ? " nav--solid" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: NAV_CSS }} />
      <div className="nav__in">
        <Link href="/" className="nav__lock" aria-label="Purcell Ventures, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark-foil.svg" alt="" width={44} height={44} />
          <b>Purcell Ventures</b>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {MENUS.map((m) => (
            <div key={m.label} style={{ order: m.label === "About" ? 2 : 0 }} className="nav__menu" onMouseEnter={() => setMenu(m.label)} onMouseLeave={() => setMenu(null)}>
              <button type="button" aria-expanded={menu === m.label} onClick={() => setMenu((o) => (o === m.label ? null : m.label))} className={inMenu(m) ? "is-on" : ""}>
                {m.label}
              </button>
              {menu === m.label && (
                <ul className="nav__drop">
                  {m.items.map((i) => (
                    <li key={i.href}><Link href={i.href} className={active(i.href) ? "is-on" : ""}>{i.label}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link href={BLOG.href} style={{ order: 1 }} className={active(BLOG.href) ? "is-on" : ""}>{BLOG.label}</Link>
        </nav>

        <Link href="/about#contact" className="ui-btn nav__cta">Start a project</Link>
        <button type="button" className="nav__burger" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>

      <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      {open && (
        <div className="nav__sheet">
          {MENUS.map((m) => (
            <div key={m.label} className="nav__sgroup">
              <p className="nav__group">{m.label}</p>
              {m.items.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
            </div>
          ))}
          <p className="nav__group">Writing</p>
          <Link href={BLOG.href}>{BLOG.label}</Link>
          <Link href="/about#contact" className="ui-btn" style={{ marginTop: 20, alignSelf: "flex-start" }}>Start a project</Link>
        </div>
      )}
    </header>
  );
}

const NAV_CSS = `
.nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:background .3s,border-color .3s;border-bottom:1px solid transparent;background:linear-gradient(rgba(7,6,10,.7),rgba(7,6,10,0))}
.nav--solid{background:rgba(7,6,10,.94);border-bottom-color:var(--line);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.nav__progress{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--gold);transform-origin:0 50%;transform:scaleX(0);pointer-events:none}
.nav__in{max-width:var(--wrap);margin:0 auto;padding:14px var(--gutter-r) 14px var(--gutter);display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px 28px}
.nav__lock{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--fg)}
.nav__lock img{width:44px;height:44px}
.nav__lock b{font:600 21px/1 var(--font-display);letter-spacing:.04em;white-space:nowrap}
.nav__links{display:flex;gap:28px;justify-self:end;align-items:center}
.nav__links a,.nav__menu>button{color:var(--fg-2);text-decoration:none;font:500 16px/1 var(--font-body);background:none;border:0;padding:8px 0;cursor:pointer}
.nav__links a:hover,.nav__menu>button:hover,.nav__links .is-on{color:#f0d79a}
.nav__menu{position:relative}
.nav__drop{position:absolute;top:100%;left:-18px;list-style:none;margin:0;padding:10px 18px;min-width:220px;background:rgba(7,6,10,.97);border:1px solid var(--line)}
.nav__drop li a{display:block;padding:9px 0;font-size:15px}
.nav__cta{padding:12px 16px;font-size:14px}
.nav__burger{display:none;width:44px;height:44px;background:none;border:0;cursor:pointer;flex-direction:column;justify-content:center;gap:7px;align-items:flex-end}
.nav__burger span{display:block;width:24px;height:2px;background:var(--fg)}
.nav__sheet{display:flex;flex-direction:column;padding:8px var(--gutter-r) 28px var(--gutter);max-height:calc(100dvh - 72px);overflow:auto}
.nav__sheet a{color:var(--fg);text-decoration:none;font:600 22px/1.2 var(--font-display);padding:9px 0}
.nav__group{color:var(--muted);font-size:14px;margin:18px 0 4px}
.nav__sgroup{display:flex;flex-direction:column}
@media (max-width:900px){
  .nav__links,.nav__cta{display:none}
  .nav__burger{display:flex}
  .nav__progress{position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--gold);transform-origin:0 50%;transform:scaleX(0);pointer-events:none}
.nav__in{grid-template-columns:auto auto;justify-content:space-between}
  .nav__lock img{width:36px;height:36px}
  .nav__lock b{font-size:18px}
}`;
