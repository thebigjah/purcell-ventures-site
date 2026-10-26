import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Rows, Prose, ClosingCall, Button } from "@/app/components/ui";

// THE SHOP INDEX, rebuilt on the page kit 26 Oct 2026. The site nav now shows on /shop,
// so the shop pages carry no header of their own. The layout keeps /shop out of search.

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Digital products from Purcell Ventures: the PV AI Starter Kit, the Cold Email Mastery Pack and the Subject Line Library, or all three in one bundle. Stripe emails the download after checkout.",
};

const PRODUCTS = [
  {
    href: "/shop/bundle",
    name: "The Complete Pack, all three bundled",
    fig: "$39",
    line: "The Starter Kit, the Cold Email Mastery Pack and the Subject Line Library: 61 files in one ZIP, in 3 folders, with one Stripe checkout. It costs $18 less than buying the three separately. For buyers who want all three.",
  },
  {
    href: "/shop/subject-lines",
    name: "Cold Email Subject Line Library",
    fig: "$9",
    line: "80 subject lines in 8 categories, 10 in each: direct, question, referral, observation, local, value-first, curiosity and time-bound. The library also lists 20 lines to avoid. PDF and markdown. For anyone who wants better subject lines for cold email.",
  },
  {
    href: "/shop/starter-kit",
    name: "PV AI Starter Kit",
    fig: "$19",
    line: "The 24 AI prompts I use in production, 5 sales scripts, the full rep handbook, more than 50 cold outreach templates, a contractor agreement and a CRM CSV. 42 files in a ZIP, in markdown and PDF. For small business owners, freelancers and consultants who want AI tools without paying agency prices.",
  },
  {
    href: "/shop/cold-email-pack",
    name: "Cold Email Mastery Pack",
    fig: "$29",
    line: "100 cold email templates for 10 industries, 80 subject lines, 30 reply-handling scripts, an AI scoring rubric, 4 email sequences and a list-building playbook. More than 200 files and templates in 6 folders. For reps, freelancers and founders sending cold email to local businesses.",
  },
];

export default function ShopPage() {
  return (
    <main>
      <PageHero
        planet="digital"
        kicker="Shop"
        title="Templates, scripts and prompts I use at Purcell Ventures, sold as kits."
        lede="You can edit the files and keep them after you buy. Stripe emails the download after checkout, and every product has a 30-day refund."
        actions={<Button href="/shop/bundle">All three for $39</Button>}
      />

      <Section title="Four products" intro="The Starter Kit ($19), the Cold Email Mastery Pack ($29) and the Subject Line Library ($9) cost $57 separately. The bundle has all three for $39, a saving of $18.">
        <Rows items={PRODUCTS} />
      </Section>

      <Section title="Why the kits cost $9 to $29">
        <Prose>
          <p>I price the kits at $9 to $29 so small teams can try them before they hire me to set them up.</p>
          <p>If you want me to build and maintain a custom version, contact me. If you do not, the kit keeps working on its own.</p>
        </Prose>
      </Section>

      <ClosingCall
        title="Custom versions"
        line={<>I build, deploy and maintain custom AI tools and sales systems for businesses. Digital subscriptions start at $99 a month. I reply within one business day. <Link className="ui-link" href="/how-we-work">How I work</Link>.</>}
        button="See digital services"
        href="/digital"
      />
    </main>
  );
}
