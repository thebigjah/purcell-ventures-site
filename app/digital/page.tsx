import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero, Section, Prose, Button, Rows, Figures, Tiers, Faq } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";
import ROICalculator from "../components/ROICalculator";
import TeamBuilder from "./TeamBuilder";
import ContactForm from "./ContactForm";
import s from "./digital.module.css";

// /digital, rebuilt on the page kit 26 Oct 2026.
//
// Decisions made in the rebuild, so nobody restores them by accident:
// - The page is a server component now. The three interactive parts (the role comparison,
//   the ROI calculator and the contact form) are their own client components.
// - The 26 click-to-open "preview" mockups are gone. They were fake app windows with
//   invented numbers (subscriber counts, open rates, RSVP names, reviews). In their place,
//   every add-on with a working demo on this site links to it.
// - The floating dashboard graphic in the hero went for the same reason.
// - The three plans carry the decided prices: Starter $99, Growth $179, Full Service $279.
//   They used to read "Tier I, II, III" under the websites page's plan names with "pricing
//   on the discovery call". The old names are kept in each plan's description.
// - Metadata, canonical and JSON-LD live in layout.tsx.

type Addon = { name: string; desc: string; demo?: string };

const MODULES: { category: string; items: Addon[] }[] = [
  {
    category: "Website and presence",
    items: [
      { name: "Business Website", desc: "A multi-page site with Home, About, Services and Contact pages, built for phones and set up for search." },
      { name: "Landing Page", desc: "One page with a lead form and one call to action." },
      { name: "Portfolio and Gallery", desc: "An image grid for photographers, artists and food businesses." },
    ],
  },
  {
    category: "Booking and scheduling",
    items: [
      { name: "Appointment Booking", desc: "A calendar with time slots, a service picker and automatic email confirmations." },
      { name: "Event Registration", desc: "RSVPs, an attendee list and automatic reminder emails.", demo: "/digital/event-registration" },
    ],
  },
  {
    category: "Communication and marketing",
    items: [
      { name: "Email Newsletter", desc: "A subscriber list, AI-written campaigns and scheduled sends.", demo: "/digital/tools/email-composer" },
      { name: "SMS Campaigns", desc: "Texts to your customer list for promotions and updates.", demo: "/digital/tools/sms-composer" },
      { name: "Social Media Scheduler", desc: "Write and schedule Facebook and Instagram posts. AI writes the captions." },
      { name: "Review Manager", desc: "Google and Yelp reviews in one dashboard, with AI drafts of your replies.", demo: "/digital/tools/review-response" },
    ],
  },
  {
    category: "Customer management",
    items: [
      { name: "Simple CRM", desc: "Contacts, notes, follow-up reminders and a visual pipeline." },
      { name: "Lead Capture Pipeline", desc: "A lead form for your site connected to a kanban board that tracks each lead from inquiry to closed deal." },
      { name: "Loyalty Program", desc: "A digital punch card with QR code check-ins that rewards repeat customers.", demo: "/digital/loyalty" },
    ],
  },
  {
    category: "AI tools",
    items: [
      { name: "AI Chatbot Widget", desc: "A chatbot on your website, trained on your business, that answers questions 24 hours a day." },
      { name: "AI Content Generator", desc: "Blog posts, product descriptions and bios, written when you ask.", demo: "/digital/tools/content-generator" },
      { name: "AI Caption Generator", desc: "Upload a photo and get five social media captions ready to post.", demo: "/digital/tools/caption-generator" },
      { name: "AI FAQ Builder", desc: "Answer a few questions and get a draft FAQ page.", demo: "/digital/ai-faq-builder" },
    ],
  },
  {
    category: "Branding and identity",
    items: [
      { name: "Logo Designer", desc: "AI-assisted logo drafts from a style, an icon and colors you pick.", demo: "/digital/tools/logo-concepts" },
      { name: "Brand Kit", desc: "A brand guide with primary and accent colors, font pairings, logo variations and usage rules, in one export.", demo: "/digital/tools/brand-kit" },
      { name: "Color Palette Tool", desc: "Describe your business in a sentence and get a color palette with hex codes and usage notes.", demo: "/digital/tools/color-palette" },
      { name: "Business Card Designer", desc: "A front-and-back card design with your branding, as a print-ready PDF and a digital version.", demo: "/digital/tools/business-card-copy" },
      { name: "Social Media Templates", desc: "Post, story and cover templates in your colors with your logo.", demo: "/digital/tools/social-templates" },
    ],
  },
  {
    category: "Operations and finance",
    items: [
      { name: "Online Estimating", desc: "Job quotes with line items, labor and materials, sent as shareable links.", demo: "/digital/estimating" },
      { name: "Online Invoicing", desc: "Invoices with payment links. Clients pay through Stripe." },
      { name: "Expense Tracker", desc: "Expenses logged by category, with monthly summaries and tax-ready reports.", demo: "/digital/expenses" },
      { name: "Inventory Tracker", desc: "A product list with stock levels and low-stock alerts.", demo: "/digital/inventory" },
      { name: "Staff Scheduler", desc: "Shifts, staff availability and a simple rota view." },
    ],
  },
];

const ADDON_COUNT = MODULES.reduce((n, g) => n + g.items.length, 0);
const DEMO_COUNT = MODULES.reduce((n, g) => n + g.items.filter((i) => i.demo).length, 0);

function addonLine(a: Addon): ReactNode {
  return (
    <>
      <span className={s.addon}>{a.name}.</span> {a.desc}
      {a.demo && (
        <>
          {" "}
          <Link className={`ui-link ${s.demo}`} href={a.demo}>Try the free version</Link>
        </>
      )}
    </>
  );
}

const CONTACT_HREF = "#contact";

const PLANS = [
  {
    name: "Starter",
    price: "$99 a month",
    for: "Light tools, open to every client. I set them up in one to two days. On the website plans, this level is called Site Care.",
    items: [
      "Color Palette Tool",
      "Brand Kit Builder",
      "Logo Concept Generator",
      "Business Card Copy",
      "Social Media Templates",
      "Caption Generator",
      "Review Response Generator",
      "Email and SMS composers, from templates",
    ],
  },
  {
    name: "Growth",
    price: "$179 a month",
    for: "Tools that connect to your site or send messages for you. On the website plans, this level is called Site Care plus Lead Ops.",
    items: [
      "Everything in Starter",
      "Review Request Automation",
      "AI FAQ Builder, running on your site",
      "AI Content Generator, trained on your brand",
      "Event Registration system",
      "Inventory Tracker",
      "Online Estimating Form",
      "Staff Scheduler",
      "Loyalty Punch Card with QR check-ins",
    ],
  },
  {
    name: "Full Service",
    price: "$279 a month",
    for: "Marketing add-ons that I adjust every month. On the website plans, this level is called Marketing Partner.",
    items: [
      "Everything in Growth",
      "AI Chatbot trained on your business",
      "Online Booking, branded and connected to your site",
      "AI Estimate Generator, from a photo to a quote",
      "Email and SMS campaign system",
      "Custom integrations, priced per scope",
    ],
  },
].map((p) => ({
  ...p,
  children: (
    <div style={{ marginTop: 18 }}>
      <Button href={CONTACT_HREF} ghost>Ask about this plan</Button>
    </div>
  ),
}));

const FAQ = [
  { q: "How is this different from Wix or Squarespace?", a: "You manage Wix and Squarespace yourself. I build and maintain the site and add AI tools such as a chatbot trained on your business, AI-drafted social posts and automated review responses." },
  { q: "Why does it cost less than a typical agency?", a: "I reuse the same modules across clients instead of building each site from scratch, and I use AI tools to write and test code. Both cut my hours, so I can charge less." },
  { q: "Do I own the website?", a: "Yes. The site, content and domain are yours. If you leave, I hand over the full source code and all assets." },
  { q: "What if I need something that is not on the list?", a: "Ask me. If it is in scope, I add it. If it is a bigger custom build, I quote it separately before any work starts." },
  { q: "What does the setup fee cover?", a: "The first build: your branding, colors, content and settings. After that, the monthly plan covers maintenance, updates and support." },
  { q: "Can I start small and add more later?", a: "Yes. Start with a website and chatbot and add booking or other tools when you want them." },
];

export default function DigitalPage() {
  return (
    <main>
      <PageHero
        planet="digital"
        kicker="Digital add-ons"
        title="Websites and business tools for small businesses"
        lede="I add booking, a CRM, a chatbot and other business tools to your website, and I maintain them for you. Plans start at $99 a month."
        meta="Setup $650 to $1,000. No contract. I reply within one business day."
        actions={<>
          <Button href={CONTACT_HREF}>Book a free demo</Button>
          <Button href="/digital/tools" ghost>Try the tools free</Button>
          <Button href="#pricing" ghost>See pricing</Button>
        </>}
      />

      <Section stack>
        <Figures
          items={[
            ["$99", "a month for the Starter plan"],
            [String(ADDON_COUNT), "add-ons in the catalog"],
            ["You", "own the code, the domain and the content"],
            ["1 day", "for a reply, on business days"],
          ]}
        />
      </Section>

      <Section
        id="services"
        title="The add-on catalog"
        intro={`${ADDON_COUNT} tools in seven groups, and you can pick any combination. ${DEMO_COUNT} of them have a free version you can try now.`}
      >
        <Tiers
          tiers={MODULES.map((g) => ({
            name: g.category,
            price: `${g.items.length} add-ons`,
            items: g.items.map(addonLine),
          }))}
        />
      </Section>

      <Section
        id="build-team"
        title="Tools compared with hiring"
        intro="Pick the jobs you would otherwise hire someone for, and compare their salaries with the cost of my subscription."
      >
        <TeamBuilder />
      </Section>

      <Section
        id="pricing"
        title="Plans and prices"
        intro="Each plan includes the tools in the one before it. Setup is a one-time fee of $650 to $1,000, depending on the add-ons. There is no contract and you can cancel at any time."
      >
        <Tiers tiers={PLANS} />
      </Section>

      <Section
        id="roi"
        title="Estimated return"
        intro="Enter your own numbers. The business-type presets are made-up starting values."
      >
        <ROICalculator />
      </Section>

      <Section title="Custom bundles">
        <Prose>
          <p>Tell me which tools you need, whether that is two or twelve. I build them as one bundle for a flat monthly price, and you own everything I build for you.</p>
        </Prose>
        <div className="ui-hero__actions">
          <Button href={CONTACT_HREF}>Ask for a bundle quote</Button>
        </div>
      </Section>

      <Section title="Working with me">
        <Rows
          items={[
            { name: "Direct contact", line: "You text or call me, the person who built your tools." },
            { name: "AI tools included", line: "A chatbot trained on your business, plus AI drafts of your captions and posts." },
            { name: "Priced below agency rates", line: "Agencies charge $2,000 or more a month. My plans start at $99." },
            { name: "You own everything", line: "You own the code, the domain and the content. I hand it over when you ask." },
          ]}
        />
      </Section>

      <Section title="About me">
        <Prose>
          <p>
            I am Elijah Purcell, Founder/CEO of Purcell Ventures LLC. I am 19 and I study at The University of Alabama.
          </p>
          <p>
            My first business was Mantle Field Services, doing gutters, pressure washing and lawn care, so I have done the scheduling, quoting and invoicing these tools handle.
          </p>
          <p>
            I build with AI coding tools such as Claude Code, which cuts my build time and keeps my prices low.
          </p>
        </Prose>
      </Section>

      <Section title="Common questions">
        <Faq items={FAQ} />
      </Section>

      <Section
        id="contact"
        title="How to reach me"
        intro="Tell me about your business. I reply within one business day with a recommendation and a quote."
      >
        <ContactForm />
        <div className={s.reach}>
          <p><a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p className="ui-muted ui-small">
            Based in Tuscaloosa, Alabama. Purcell Ventures LLC, registered in Georgia in April 2025.
          </p>
        </div>
      </Section>
    </main>
  );
}
