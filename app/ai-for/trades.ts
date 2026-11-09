// The "AI for [trade]" set under the AI for small business pillar (9 Nov 2026).
//
// One list feeds the index at /ai-for, the sitemap and the related-trade links at the foot
// of each trade page, so a new trade is added here once. Purcell Ventures has no published
// client in any of these trades, so no page claims one. Prices on every page come from
// /consulting, /software and /digital only.

export type Trade = {
  slug: string;
  /** Plural noun used in "AI for ..." */
  name: string;
  /** One line for the index: the jobs AI handles in that business. */
  line: string;
};

export const TRADES: Trade[] = [
  { slug: "flooring-companies", name: "flooring companies", line: "Estimate write-ups from measurements, quote follow-ups, showroom questions and review replies." },
  { slug: "hvac-companies", name: "HVAC companies", line: "After-hours call capture, maintenance-plan reminders and estimate write-ups from tech notes." },
  { slug: "plumbers", name: "plumbers", line: "Emergency call triage, job summaries from tech notes, quote follow-ups and review replies." },
  { slug: "roofers", name: "roofers", line: "Inspection reports from photos and notes, storm-season lead sorting and insurance paperwork drafts." },
  { slug: "dental-offices", name: "dental offices", line: "Recall reminders, insurance questions and new-patient forms, with HIPAA limits on patient data." },
  { slug: "law-firms", name: "law firms", line: "Intake screening under confidentiality limits and first drafts an attorney reviews. No legal advice from a bot." },
  { slug: "real-estate-agents", name: "real estate agents", line: "Listing descriptions, lead follow-up, showing feedback summaries and fair housing checks." },
  { slug: "restaurants", name: "restaurants", line: "Menu and allergen questions, review replies and catering inquiries." },
  { slug: "salons", name: "salons", line: "Online booking, rebooking reminders, service and price questions and social captions." },
  { slug: "barbershops", name: "barbershops", line: "Booking and no-show reminders, shop questions, posts from cut photos and review replies." },
  { slug: "churches", name: "churches", line: "Sermon clips and summaries, volunteer scheduling and the weekly newsletter." },
  { slug: "auto-repair-shops", name: "auto repair shops", line: "Repair explanations from tech notes, status updates, service reminders and estimate drafts." },
];

export const tradeBySlug = (slug: string) => TRADES.find((t) => t.slug === slug)!;
