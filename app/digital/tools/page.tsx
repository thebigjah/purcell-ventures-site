import type { Metadata } from "next";
import { PageHero, Section, Rows, Button, ClosingCall } from "@/app/components/ui";
import { AI_TOOLS, type AIToolConfig } from "@/lib/ai-tools";

export const metadata: Metadata = {
  title: "Free AI tools for small businesses",
  description: `${AI_TOOLS.length} free AI tools for small businesses: FAQ pages, review replies, emails, captions, color palettes, job posts and more, plus working demos of the loyalty, expense, inventory, estimating and event add-ons.`,
  alternates: { canonical: "/digital/tools" },
};

// Display names for the registry's category values. The values themselves stay as they are
// in lib/ai-tools.ts because the type union is shared with the API route.
const CATEGORY_LABEL: Record<AIToolConfig["category"], string> = {
  "AI-Powered": "Writing and research",
  "Branding & Identity": "Branding and identity",
  "Communication & Marketing": "Communication and marketing",
  "Operations & Finance": "Operations and finance",
};

const CATEGORY_ORDER: AIToolConfig["category"][] = ["AI-Powered", "Communication & Marketing", "Branding & Identity", "Operations & Finance"];

const DEMOS = [
  { slug: "loyalty", name: "Loyalty punch card", tagline: "A digital punch card for repeat customers.", category: "Customer management" },
  { slug: "expenses", name: "Expense tracker", tagline: "Log expenses and see monthly totals by category.", category: "Operations and finance" },
  { slug: "inventory", name: "Inventory tracker", tagline: "A product list with low-stock alerts.", category: "Operations and finance" },
  { slug: "estimating", name: "Online estimating", tagline: "Job quotes with line items, printable as a PDF.", category: "Operations and finance" },
  { slug: "event-registration", name: "Event registration", tagline: "An RSVP form and attendee list with check-in.", category: "Booking and scheduling" },
];

export default function ToolsIndexPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({ cat, tools: AI_TOOLS.filter((t) => t.category === cat) })).filter((g) => g.tools.length > 0);

  return (
    <main>
      <PageHero
        planet="tools"
        kicker="Digital add-ons"
        title={`${AI_TOOLS.length} free AI tools for small businesses`}
        lede="Each tool is free to use. Enter your business details and the tool writes the result on the page. If one saves you time, I can add a branded version to your own site."
        actions={<>
          <Button href="#tools">See the tools</Button>
          <Button href="/digital" ghost>See the digital plans</Button>
        </>}
      />

      {grouped.map(({ cat, tools }, i) => (
        <Section key={cat} id={i === 0 ? "tools" : undefined} title={CATEGORY_LABEL[cat]} intro={`${tools.length} ${tools.length === 1 ? "tool" : "tools"}`}>
          <Rows items={tools.map((t) => ({ name: t.name, line: t.tagline, href: `/digital/tools/${t.slug}` }))} />
        </Section>
      ))}

      <Section title="Add-on demos" intro="Working versions of add-ons I install on client sites. They run in your browser and save to this device only.">
        <Rows items={DEMOS.map((d) => ({ name: d.name, line: `${d.tagline} ${d.category}.`, href: `/digital/${d.slug}` }))} />
      </Section>

      <ClosingCall
        title="A branded version on your site"
        line="I can brand any of these tools and connect it to your own site and your business data. The digital plans start at $99 a month."
        button="See the digital plans"
        href="/digital"
      />
    </main>
  );
}
