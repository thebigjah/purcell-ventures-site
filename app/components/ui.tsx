import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT } from "@/lib/contact";
import MapPlanet from "./MapPlanet";

// THE PAGE KIT.
//
// Every public page is built from these few pieces so the site reads as one thing.
// The styling lives in globals.css under .ui-*, not in inline style objects: the old
// site had 130 files each carrying their own copy of the fonts and colours, which is
// how it drifted into five shades of gold and three typefaces.
//
// Rules the kit enforces by having no way to break them: no eyebrow labels in caps,
// no numbered markers, no boxes around content, no shadows, square corners.

/** Planet renders that sit at the top of a page, one per page or division. */
export type Planet =
  | "websites" | "pricing" | "portfolio" | "casestudies" | "digital" | "tools"
  | "consulting" | "book" | "software" | "steady" | "courses" | "company" | "blog";

export function PageHero({
  title,
  lede,
  kicker,
  meta,
  planet,
  actions,
}: {
  title: ReactNode;
  lede?: ReactNode;
  /** A short plain line above the title, sentence case. The division or section name. */
  kicker?: ReactNode;
  /** A quiet line under the lede: a date, a read time, a price. */
  meta?: ReactNode;
  planet?: Planet;
  actions?: ReactNode;
}) {
  const wide = planet === "digital" || planet === "portfolio" || planet === "blog";
  return (
    <header className="ui-hero">
      <div className="ui-hero__sky" aria-hidden="true" />
      <div className="ui-wrap ui-hero__grid">
        <div>
          {kicker && <p className="ui-hero__kicker">{kicker}</p>}
          <h1>{title}</h1>
          {lede && <p className="ui-hero__lede">{lede}</p>}
          {meta && <p className="ui-hero__meta">{meta}</p>}
          {actions && <div className="ui-hero__actions">{actions}</div>}
        </div>
        {planet && <MapPlanet planet={planet} wide={wide} />}
      </div>
    </header>
  );
}

export function Section({
  id,
  title,
  intro,
  stack,
  children,
}: {
  id?: string;
  title?: ReactNode;
  intro?: ReactNode;
  /** Put the heading above the content instead of beside it. */
  stack?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`ui-section${stack ? " ui-section--stack" : ""}`}>
      <div className="ui-wrap ui-section__grid">
        {(title || intro) && (
          <div>
            {title && <h2>{title}</h2>}
            {intro && <p className="ui-section__intro">{intro}</p>}
          </div>
        )}
        <div className="ui-section__body">{children}</div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="ui-prose">{children}</div>;
}

export function Button({
  href,
  children,
  ghost,
  external,
}: {
  href: string;
  children: ReactNode;
  ghost?: boolean;
  external?: boolean;
}) {
  const cls = `ui-btn${ghost ? " ui-btn--ghost" : ""}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={cls} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}

export type RowItem = { name: ReactNode; line?: ReactNode; fig?: ReactNode; href?: string };

export function Rows({ items }: { items: RowItem[] }) {
  return (
    <div className="ui-rows">
      {items.map((it, i) => {
        const inner = (
          <>
            <span>
              <span className="ui-row__name">{it.name}</span>
              {it.line && <span className="ui-row__line">{it.line}</span>}
            </span>
            {it.fig && <span className="ui-row__fig">{it.fig}</span>}
          </>
        );
        if (!it.href) return <div className="ui-row" key={i}>{inner}</div>;
        if (it.href.startsWith("http"))
          return <a className="ui-row" key={i} href={it.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
        return <Link className="ui-row" key={i} href={it.href}>{inner}</Link>;
      })}
    </div>
  );
}

export function Facts({ items }: { items: [ReactNode, ReactNode][] }) {
  return (
    <dl className="ui-facts">
      {items.map(([k, v], i) => (
        <FactPair key={i} k={k} v={v} />
      ))}
    </dl>
  );
}
function FactPair({ k, v }: { k: ReactNode; v: ReactNode }) {
  return (
    <>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </>
  );
}

export function Figures({ items }: { items: [ReactNode, ReactNode][] }) {
  return (
    <div className="ui-figures">
      {items.map(([n, label], i) => (
        <div className="ui-figure" key={i}>
          <b>{n}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export type Tier = { name: ReactNode; price?: ReactNode; for?: ReactNode; items?: ReactNode[]; children?: ReactNode };

export function Tiers({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="ui-tiers">
      {tiers.map((t, i) => (
        <div className="ui-tier" key={i}>
          <div>
            <h3>{t.name}</h3>
            {t.price && <p className="ui-tier__price">{t.price}</p>}
          </div>
          <div className="ui-tier__detail">
            {t.for && <p className="ui-tier__for">{t.for}</p>}
            {t.items && (
              <ul>
                {t.items.map((x, j) => (
                  <li key={j}>{x}</li>
                ))}
              </ul>
            )}
            {t.children}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Faq({ items }: { items: { q: ReactNode; a: ReactNode }[] }) {
  return (
    <div className="ui-faq">
      {items.map((it, i) => (
        <details key={i}>
          <summary>{it.q}</summary>
          <div>{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/** The closing block on most pages: one line, the phone number, one button. */
export function ClosingCall({
  title = "Start a project",
  line = "A discovery call first. If I am the wrong fit for the job, I say so. I reply within one business day.",
  button = "Start a project",
  href = "/about#contact",
}: {
  title?: ReactNode;
  line?: ReactNode;
  button?: ReactNode;
  href?: string;
}) {
  return (
    <section className="ui-cta">
      <div className="ui-wrap">
        <h2>{title}</h2>
        <p>{line}</p>
        <div className="ui-hero__actions">
          <Button href={href}>{button}</Button>
          <a className="ui-phone" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>
        </div>
      </div>
    </section>
  );
}

/** A blog post or long guide: a plain hero, then one readable column. */
export function PostLayout({
  kicker,
  title,
  meta,
  lede,
  crumbs,
  children,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  lede?: ReactNode;
  crumbs?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main>
      <header className="ui-hero ui-hero--post">
        <div className="ui-hero__sky" aria-hidden="true" />
        <div className="ui-narrow">
          {crumbs}
          {kicker && <p className="ui-hero__kicker">{kicker}</p>}
          <h1>{title}</h1>
          {lede && <p className="ui-hero__lede">{lede}</p>}
          {meta && <p className="ui-hero__meta">{meta}</p>}
        </div>
      </header>
      <div className="ui-narrow ui-post">
        <article className="ui-prose">{children}</article>
      </div>
    </main>
  );
}

/** A warning or aside inside running text: a gold rule on the left, no box. */
export function Note({ children, tone }: { children: ReactNode; tone?: "warn" }) {
  return <aside className={`ui-note${tone === "warn" ? " ui-note--warn" : ""}`}>{children}</aside>;
}
