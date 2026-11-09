import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";
import PageDates, { UpdatedLine } from "@/app/components/PageDates";
import ServiceSchema from "@/app/components/ServiceSchema";
import { CONTACT } from "@/lib/contact";

// Comparison page, written 9 Nov 2026. PV facts come from /sites (build tiers, timelines,
// ownership, care plans) and /digital (monthly plans and setup fee). /sites quotes build
// prices on the discovery call, so this page gives timelines and no build price. Builders
// are described by how they work and charge, with no dollar figures, since plans change.

const PATH = "/compare/ai-website-builder-vs-custom-site";
const URL = `https://purcellventures.co${PATH}`;

export const metadata: Metadata = {
  title: { absolute: "AI website builder vs a custom site for a small business, Purcell Ventures" },
  description:
    "When an AI website builder is enough for a small business and when a custom site is worth the build fee: cost shape, structured data, integrations, AI search and what you own if you leave.",
  alternates: { canonical: URL },
  openGraph: {
    title: "AI website builder vs a custom site",
    description: "When an AI website builder is enough, and when a custom site is worth the build fee.",
    url: URL,
    type: "article",
    images: ["/opengraph-image"],
  },
};

const QA: [string, string][] = [
  ["Are AI website builders good enough for a small business?",
   "For a simple site that the owner will keep up to date, often yes. Check that the builder lets you edit page titles and descriptions, connect your own domain and export your content before you commit."],
  ["Can AI assistants read a site made with a website builder?",
   "It depends on how the builder serves the page. Some send the text in the page itself and some draw it with JavaScript in the browser. Run the free AI visibility check on your builder site to see what a crawler reads."],
  ["How much does a custom website cost at Purcell Ventures?",
   "I quote each build on a free discovery call. A single-page Starter site goes live in 7 to 10 business days and a multi-page Pro site in 14 to 21. You own the site, the content and the domain."],
  ["How much does an AI website builder cost?",
   "Most builders charge a monthly or yearly subscription, with online store and booking features on the higher plans. Prices change, so check current pricing on the builder's site."],
  ["Can I move from a website builder to a custom site later?",
   "Yes. Keep your domain registered in your own name, keep copies of your text and photos, and the move comes down to the rebuild. A builder that holds your domain makes the move slower."],
];

const LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}#faq`,
  mainEntity: QA.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Page() {
  return (
    <>
      <PostLayout
        crumbs={<Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Comparisons", href: "/compare" },
          { name: "AI website builder vs custom site", href: PATH },
        ]} />}
        kicker="Comparisons"
        title="AI website builder vs a custom site"
        lede="When an AI website builder is enough for a small business, when a custom site is worth the build fee, and what you own at the end of each."
        meta="By Elijah Purcell, Purcell Ventures, Tuscaloosa."
      >
        <UpdatedLine path={PATH} bare />

        <table>
          <thead>
            <tr><th></th><th>AI website builder</th><th>Custom site</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Who builds it</strong></td><td>You, from pages the AI drafts</td><td>A developer, from a written plan</td></tr>
            <tr><td><strong>Time to launch</strong></td><td>Hours to days</td><td>One to several weeks</td></tr>
            <tr><td><strong>How it charges</strong></td><td>A monthly or yearly subscription. Check current pricing on their site</td><td>A build fee, then hosting and upkeep</td></tr>
            <tr><td><strong>Structured data</strong></td><td>What the builder supports</td><td>Anything schema.org defines</td></tr>
            <tr><td><strong>Integrations</strong></td><td>The builder&apos;s app store</td><td>Your CRM, booking, payments and other tools</td></tr>
            <tr><td><strong>Who updates it</strong></td><td>You, in the editor</td><td>The developer, or you through an editor they set up</td></tr>
            <tr><td><strong>Leaving</strong></td><td>Content export varies by builder</td><td>You keep the code, content and domain</td></tr>
          </tbody>
        </table>

        <p>
          I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC in Tuscaloosa. I build custom
          sites, and for a simple site a builder often costs less and lets the owner make a change
          the same day.
        </p>

        <h2>What does an AI website builder do?</h2>

        <p>
          Wix, Squarespace and several other companies now ask you a few questions about your
          business and draft a whole site from the answers: pages, text, images and a color
          scheme. You edit the draft in a visual editor and publish it on their hosting. You pay a
          subscription for as long as the site stays up.
        </p>

        <h2>When is a builder the right call?</h2>

        <p>A builder is the better buy in four common cases:</p>

        <ul>
          <li>You are testing a new business and want a page live this week.</li>
          <li>The site is a brochure: what you do, where, your hours and how to reach you.</li>
          <li>You or a staff member will update it often and want to do it without calling anyone.</li>
          <li>The builder&apos;s own booking or store features cover what you sell.</li>
        </ul>

        <p>
          In those cases a custom build spends money on control you will never use. Before you
          commit, confirm that the builder lets you edit page titles and descriptions, connect a
          domain registered in your own name, and export your text and images.
        </p>

        <h2>When is a custom site worth the build fee?</h2>

        <p>
          A custom site pays off when the website has to do work, beyond describing the business.
          Five signs point that way:
        </p>

        <ol>
          <li>Leads from the site have to land in your CRM or reach you by text within a minute.</li>
          <li>Booking, quotes or payments have to connect to the software you already run.</li>
          <li>You have several locations or service areas that each need their own page and data.</li>
          <li>You want full control of the structured data and text that AI assistants read.</li>
          <li>The builder blocks a change you need, and you have hit that wall more than once.</li>
        </ol>

        <h2>Which one do AI assistants read better?</h2>

        <p>
          AI assistants describe a business from the text and structured data they can read. Some
          builders send that text in the page itself, and some draw it with JavaScript after the
          page loads, which leaves a crawler that skips scripts with an almost empty page. A
          custom site lets the developer choose server-rendered pages and write the business
          markup by hand.
        </p>

        <p>
          You can test this yourself. The free{" "}
          <Link href="/ai-visibility-check">AI visibility check</Link> reads any home page the way
          a crawler does and counts the words it finds, along with the title, description,
          structured data, phone, address and hours. Run it on a builder&apos;s sample site
          before you pick that builder. The <Link href="/ai-websites">AI websites guide</Link>{" "}
          explains each check.
        </p>

        <h2>What does each one cost over three years?</h2>

        <p>
          A builder costs a subscription every month for as long as the site exists, and the
          plans with booking or online sales cost more than the basic ones. Prices change, so
          check current pricing on the builder&apos;s site and multiply the monthly figure by 36.
        </p>

        <p>
          A custom site costs a build fee up front, then hosting and upkeep. At Purcell Ventures I
          quote each build on a free discovery call. A single-page Starter site goes live in 7 to
          10 business days and a multi-page Pro site in 14 to 21. After launch, three care plans
          cover hosting, lead handling, monthly reports and updates. The{" "}
          <Link href="/sites">websites page</Link> lists what each tier and plan includes, and{" "}
          <Link href="/blog/what-a-website-actually-costs">what a small business website
          costs</Link> covers price ranges across the market.
        </p>

        <p>
          If you keep a builder site, the <Link href="/digital">Digital plans</Link> add booking, a
          CRM, an AI FAQ or a chatbot to the site you already have, from $99 a month with a
          one-time setup fee of $650 to $1,000.
        </p>

        <h2>What do you own if you leave?</h2>

        <p>
          This question matters more than the price. With a builder, your pages live in the
          builder&apos;s format, and how much you can export depends on the company. Your domain
          is yours only if you registered it in your own name.
        </p>

        <p>
          With a Purcell Ventures site, you own the site, the content and the domain. If you
          leave, I hand over the full source code and every asset, with no penalty. Ask any
          developer you consider for the same terms in writing. The post on{" "}
          <Link href="/blog/what-you-should-own">what you should own</Link> lists the accounts to
          keep in your name.
        </p>

        <h2>Common questions</h2>

        {QA.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p style={{ marginTop: 6 }}>{a}</p>
          </div>
        ))}

        <h2>How do I get in touch?</h2>

        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a> with your current site, or the
          builder you are considering. If the builder fits, I will tell you. I reply within one
          business day.
        </p>
      </PostLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <ServiceSchema />
      <PageDates path={PATH} name="AI website builder vs custom site" />
    </>
  );
}
