import type { Metadata } from "next";
import { CONTACT } from "@/lib/contact";
import PageDates from "@/app/components/PageDates";

// The contact card. It looks like the preview a phone shows after scanning a vCard: the
// photo, the name, four actions, then the details. "Save to contacts" downloads
// /contact/vcard. Until 26 Oct 2026 this route only redirected to /about#contact.

export const metadata: Metadata = {
  title: "Contact Elijah Purcell",
  description: "Phone, email and a contact card to save for Elijah Purcell, Founder/CEO of Purcell Ventures LLC in Tuscaloosa, Alabama.",
  alternates: { canonical: "/contact" },
};

const ACTIONS = [
  { label: "Call", href: `tel:${CONTACT.phoneE164}`, icon: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" },
  { label: "Text", href: `sms:${CONTACT.phoneE164}`, icon: "M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" },
  { label: "Email", href: `mailto:${CONTACT.email}`, icon: "M3 6h18v12H3zM3 6l9 7 9-7" },
  { label: "Website", href: "https://purcellventures.co", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.4 3.8 5.4 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3z" },
];

const DETAILS = [
  { label: "Work phone", value: CONTACT.phone, href: `tel:${CONTACT.phoneE164}` },
  { label: "Work email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Website", value: "purcellventures.co", href: "https://purcellventures.co" },
  { label: "LinkedIn", value: "theelijahpurcell", href: "https://www.linkedin.com/in/theelijahpurcell" },
  { label: "GitHub", value: "thebigjah", href: "https://github.com/thebigjah" },
  { label: "Based in", value: `${CONTACT.personCity}, Alabama` },
];

const SITE = "https://purcellventures.co";
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE}/contact#contactpage`,
      url: `${SITE}/contact`,
      name: "Contact Elijah Purcell",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE}/contact` },
      ],
    },
  ],
};

export default function ContactCard() {
  return (
    <main className="cc">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <PageDates path="/contact" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cc__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cc__photo" src="/brand/elijah.jpg" alt="Elijah Purcell" width={132} height={132} />
        <h1 className="cc__name">Elijah Purcell</h1>
        <p className="cc__role">Founder/CEO, Purcell Ventures LLC</p>

        <ul className="cc__actions">
          {ACTIONS.map((a) => (
            <li key={a.label}>
              <a href={a.href}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={a.icon} /></svg>
                <span>{a.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a className="ui-btn cc__save" href="/contact/vcard">Save to contacts</a>
        {CONTACT.depositLink.startsWith("https://buy.stripe.com/") && (
          <a className="ui-btn ui-btn--ghost cc__save" href={CONTACT.depositLink}>Pay your website deposit</a>
        )}

        <dl className="cc__details">
          {DETAILS.map((d) => (
            <div key={d.label}>
              <dt>{d.label}</dt>
              <dd>{d.href ? <a href={d.href}>{d.value}</a> : d.value}</dd>
            </div>
          ))}
        </dl>

        <section className="cc__body" aria-labelledby="cc-how">
          <h2 id="cc-how">How to reach me</h2>
          <p>Email {CONTACT.email} or call or text {CONTACT.phone}. Either one reaches me directly, and I reply within one business day.</p>

          <h2>What to put in a first message</h2>
          <p>Three things get us moving. Tell me which business you run, what you want done, and when you need it finished. If you already have a website, send the link. A few plain sentences work better than a long brief, and I will ask follow-up questions if I need more.</p>

          <h2>Where the work happens</h2>
          <p>I am based in {CONTACT.personCity}, Alabama. I meet businesses in person in {CONTACT.personCity} and metro Atlanta. Everything else runs remotely, so a business anywhere in the US can hire me for AI, software or website work.</p>

          <h2>What happens next</h2>
          <p>We set up a free call. I ask how your business runs today and what is slowing it down. You do not need a plan or a budget figure to start. Describing the problem is enough. I quote every project after that free call, so you hear the price before you commit to anything.</p>
          {CONTACT.depositLink.startsWith("https://buy.stripe.com/") && (
            <p>If we already agreed on a website project, the deposit button above takes you straight to payment.</p>
          )}
        </section>
      </div>
    </main>
  );
}

const CSS = `
.cc{min-height:100dvh;display:flex;justify-content:center;padding-block:124px 72px;padding-left:var(--gutter);padding-right:var(--gutter-r);background:radial-gradient(ellipse at 50% 0%,rgba(184,134,43,.10),rgba(7,6,10,0) 60%),var(--bg)}
.cc__card{width:min(440px,100%);display:flex;flex-direction:column;align-items:center;text-align:center}
.cc__photo{width:132px;height:132px;border-radius:50%;object-fit:cover;object-position:50% 20%;border:1px solid var(--line)}
.cc__name{font:600 clamp(32px,6vw,40px)/1.05 var(--font-display);margin:22px 0 0}
.cc__role{color:var(--muted);margin:8px 0 0;font-size:16px}
.cc__actions{list-style:none;margin:28px 0 0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;width:100%}
.cc__actions a{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 0 12px;border:1px solid var(--line);color:var(--fg);text-decoration:none;font-size:13px;transition:color .2s,border-color .2s}
.cc__actions a:hover{color:var(--gold-text);border-color:var(--gold)}
.cc__actions svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round}
.cc__save{margin-top:14px;width:100%;justify-content:center;min-height:48px}
.cc__details{margin:32px 0 0;width:100%;text-align:left}
.cc__details>div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:12px;padding:14px 0;border-top:1px solid var(--line)}
.cc__details dt{color:var(--muted);font-size:14px}
.cc__details dd{margin:0;overflow-wrap:anywhere}
.cc__details a{color:var(--fg);text-decoration:none}
.cc__details a:hover{color:var(--gold-text)}
.cc__body{margin:36px 0 0;width:100%;text-align:left;border-top:1px solid var(--line);padding-top:8px}
.cc__body h2{font:600 20px/1.2 var(--font-display);margin:28px 0 8px}
.cc__body p{color:var(--muted);font-size:16px;line-height:1.6;margin:0 0 12px}`;
