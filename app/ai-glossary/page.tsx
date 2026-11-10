import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import { CONTACT } from "@/lib/contact";
import { TERMS } from "./terms";

// Reference page, written 9 Nov 2026. Each term has an id anchor so an answer engine can
// cite the one definition it needs, and the DefinedTermSet below gives every term a URL
// with that anchor. The definitions live in ./terms.ts.

const PATH = "/ai-glossary";
const URL = `https://purcellventures.co${PATH}`;
const DESCRIPTION =
  "Plain definitions of AI terms a small business owner meets, from AI agent and token to AEO, llms.txt and GPTBot, each with an example from a real business.";

export const metadata: Metadata = {
  title: { absolute: "AI glossary for small business owners, Purcell Ventures" },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: "AI glossary for small business owners",
    description: DESCRIPTION,
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const first = (name: string) => name[0].toUpperCase();
const GROUPS = LETTERS
  .map((l) => ({ letter: l, terms: TERMS.filter((t) => first(t.name) === l) }))
  .filter((g) => g.terms.length > 0);
const HAS = new Set(GROUPS.map((g) => g.letter));

const LD = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${URL}#glossary`,
  name: "AI glossary for small business owners",
  description: DESCRIPTION,
  url: URL,
  inLanguage: "en-US",
  publisher: { "@id": "https://purcellventures.co/#organization" },
  author: { "@id": "https://elijahpurcell.com/#person" },
  hasDefinedTerm: TERMS.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${URL}#${t.id}`,
    name: t.name,
    description: t.def,
    url: `${URL}#${t.id}`,
    inDefinedTermSet: `${URL}#glossary`,
  })),
};

export default function Page() {
  return (
    <>
      <PostLayout
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "AI for small business", href: "/ai-for-small-business" },
          { name: "AI glossary", href: PATH },
        ]} />}
        kicker="Reference"
        title="AI glossary for small business owners"
        lede={`${TERMS.length} AI terms in plain words, each with an example from a small business and a link to the guide that covers it in depth.`}
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <nav aria-label="Terms by letter" style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", fontSize: 18, fontWeight: 700 }}>
          {LETTERS.map((l) => HAS.has(l)
            ? <a key={l} href={`#letter-${l.toLowerCase()}`} style={{ padding: "6px 2px" }}>{l}</a>
            : <span key={l} aria-hidden="true" style={{ padding: "6px 2px", color: "var(--subtle)", fontWeight: 400 }}>{l}</span>)}
        </nav>

        <p>
          I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I train small business teams
          on AI tools and build AI systems for them, and these are the words that come up in
          those conversations. For the numbers on how small businesses use AI, see{" "}
          <Link href="/ai-small-business-statistics">AI in small business statistics</Link>.
        </p>

        {GROUPS.map((g) => (
          <section key={g.letter} aria-labelledby={`letter-${g.letter.toLowerCase()}`}>
            <h2 id={`letter-${g.letter.toLowerCase()}`}>{g.letter}</h2>
            {g.terms.map((t) => (
              <div key={t.id}>
                <h3 id={t.id}>{t.name}</h3>
                <p style={{ marginTop: 6 }}>{t.def}</p>
                <p style={{ marginTop: 6 }}>
                  <strong>In a small business:</strong> {t.biz}
                  {t.link && <> More in <Link href={t.link.href}>{t.link.label}</Link>.</>}
                </p>
              </div>
            ))}
          </section>
        ))}

        <h2>How do I get in touch?</h2>

        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with the term or the tool you
          want explained for your own business. I reply within one business day.
        </p>

        <p>
          Related guides: <Link href="/ai-for-small-business">AI for small business</Link>,{" "}
          <Link href="/ai-consulting">AI consulting in Alabama</Link>,{" "}
          <Link href="/ai-automation">AI automation for small businesses</Link>,{" "}
          <Link href="/ai-integration">AI integration for small business software</Link>,{" "}
          <Link href="/ai-websites">AI websites for small businesses</Link> and{" "}
          <Link href="/ai-design">AI in design for small businesses</Link>.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <PageDates path={PATH} name="AI glossary for small business owners" />
    </>
  );
}
