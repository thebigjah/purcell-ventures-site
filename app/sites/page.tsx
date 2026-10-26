import type { Metadata } from "next";
import { PageHero, Section, Tiers, Rows, Button, ClosingCall, Prose } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Custom websites for local businesses",
  description:
    "Custom websites for local businesses in Tuscaloosa, metro Atlanta and remote: three build tiers, three maintenance plans, and the person who built your site answering the phone.",
  alternates: { canonical: "/sites" },
};

const CALL = `mailto:${CONTACT.email}?subject=Website%20discovery%20call`;

const BUILD = [
  {
    name: "Starter",
    price: "A single-page site. Live in 7 to 10 business days.",
    for: "Solo service providers: caregivers, doctors in solo practice, one-truck trades. Businesses where your own time limits growth more than the number of leads.",
    items: [
      "A one-page custom site with your branding",
      "Built for phones first",
      "Your Google Business profile claimed and managed",
      "SSL that renews on its own",
      "A contact form that goes to your email",
    ],
  },
  {
    name: "Pro",
    price: "A multi-page business site. Live in 14 to 21 business days.",
    for: "Crews and shops with several employees: trades, restaurants and professional services with room to grow.",
    items: [
      "Home, Services, Past Projects and Contact pages",
      "A lead form that reaches you by text and email",
      "A project gallery you update from your phone",
      "Your Google Business profile claimed and managed",
      "SSL that renews on its own",
      "A connection to the CRM you already use, where there is one",
    ],
  },
  {
    name: "Custom",
    price: "Built to a written spec. Scoped for each project.",
    for: "Online stores, booking, several locations, deep integrations, or anything that needs discovery first.",
    items: [
      "A discovery call before any scope",
      "The full scope and timeline written down before any code",
      "Quoted for the project and paid in phases",
      "Everything in Pro, plus what your spec calls for",
    ],
  },
];

const CARE = [
  {
    name: "Site Care",
    price: "I host the site and watch for downtime.",
    for: "For owners who mostly need hosting and someone watching the site. Open to every Starter and Pro client.",
    items: ["Hosting and SSL, renewed automatically", "Uptime monitoring", "One small content update each quarter"],
  },
  {
    name: "Site Care plus Lead Ops",
    price: "I maintain the site and route your leads to you.",
    for: "Trades and service businesses that want a monthly report and updates without daily contact.",
    items: [
      "Everything in Site Care",
      "Leads from your form reach you by text and email within 60 seconds",
      "A Google Business profile post written and published each month",
      "A monthly email with traffic, fixes and what is working",
      "One small content update each month",
      "Selected add-ons from the Digital catalog",
    ],
  },
  {
    name: "Marketing Partner",
    price: "Part-time marketing on top of site care.",
    for: "Businesses with high-value leads and an owner with no time for marketing.",
    items: [
      "Everything in Site Care plus Lead Ops",
      "Four Instagram posts a month, scheduled through PV Social",
      "Review requests sent to your customers after each job",
      "One AI-drafted blog post a month for search",
      "One or two marketing images a month",
      "A fifteen-minute business health call each quarter",
      "Small content updates, up to an hour a month",
      "The full Digital catalog of add-ons",
    ],
  },
];

export default function SitesPage() {
  return (
    <main>
      <PageHero
        planet="websites"
        kicker="Websites"
        title="Custom websites for local businesses, and the person who built yours on the phone."
        lede="I build the site, write the plan for it, and keep working on it after launch. Maintenance covers hosting, lead handling, monthly reports and updates."
        actions={<>
          <Button href={CALL}>Book a 15-minute call</Button>
          <Button href="#build" ghost>See the tiers</Button>
        </>}
      />

      <Section id="build" title="Three ways to build" intro="Each tier ends with a published website. I quote the price on the discovery call, because the right tier depends on what your business needs.">
        <Tiers tiers={BUILD} />
      </Section>

      <Section title="After launch" intro="Hosting and updates continue after launch on one of three plans. You can move between them as the business grows.">
        <Tiers tiers={CARE} />
      </Section>

      <Section title="The Loom" intro="How some businesses first hear from me.">
        <Prose>
          <p>
            The Loom is the system I use to find small businesses whose web presence could be doing more, research them, build a preview site, and reach out. If you came to this page from a preview of your own business that I built before we spoke, The Loom built it.
          </p>
        </Prose>
        <div className="ui-hero__actions"><Button href="https://the-loom-gold.vercel.app" ghost>See The Loom</Button></div>
      </Section>

      <Section title="What you can count on">
        <Rows
          items={[
            { name: "One person to call", line: "When something breaks at nine on a Tuesday, you call me, the person who built your site." },
            { name: "You own it", line: "You own the site, the content and the domain. If you leave, I hand over the full source code and every asset, with no penalty." },
            { name: "SSL that renews itself", line: "A site with an expired SSL certificate shows visitors a browser security warning. Every maintenance plan renews the certificate automatically." },
            { name: "A registered business", line: "Purcell Ventures LLC is registered in Acworth, Georgia. I work with businesses in metro Atlanta and Tuscaloosa, and remotely across the country." },
          ]}
        />
      </Section>

      <ClosingCall
        title="A fifteen-minute call"
        line="You tell me what your business does and what you wish your website did. I tell you which tier fits, what it costs and how long it takes."
        button="Book a 15-minute call"
        href={CALL}
      />
    </main>
  );
}
