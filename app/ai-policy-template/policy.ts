// Builds the plain-text AI use policy for /ai-policy-template from the form answers.
// One string feeds the on-page preview, Copy, Download and Print, so the four never
// disagree. Runs in the browser only. Industry clauses stay to general, well-known
// cautions (patient data, privilege, account numbers, fair housing, allergens) and make
// no claim about what a specific law requires.

export type Industry = "general" | "health" | "legal" | "finance" | "realestate" | "trades" | "retail";

export const INDUSTRIES: { id: Industry; label: string }[] = [
  { id: "general", label: "General or other" },
  { id: "health", label: "Health care, dental or therapy" },
  { id: "legal", label: "Legal services" },
  { id: "finance", label: "Finance, insurance, accounting or tax" },
  { id: "realestate", label: "Real estate" },
  { id: "trades", label: "Home services and trades" },
  { id: "retail", label: "Retail, restaurant or food" },
];

/** Extra lines for "What never goes into an AI tool", and extra rules for checking output. */
const INDUSTRY_CLAUSES: Record<Industry, { never: string[]; check: string[] }> = {
  general: { never: [], check: [] },
  health: {
    never: [
      "Patient names, records, appointment details, insurance details or any health information tied to a person. Health privacy law such as HIPAA may apply, and a tool may hold patient data only under a signed agreement with the provider that covers it.",
    ],
    check: ["A licensed clinician reviews anything clinical from an AI tool before a patient sees it, and AI output never reaches a patient as medical advice on its own."],
  },
  legal: {
    never: [
      "Client names, case facts, documents or any information covered by attorney-client privilege or a duty of confidentiality.",
    ],
    check: ["An attorney checks every case, statute and citation from an AI tool in the original source before anyone relies on it."],
  },
  finance: {
    never: [
      "Account numbers, Social Security numbers, tax records, balances or statements tied to a client.",
    ],
    check: ["AI output never reaches a client as financial, tax or investment advice until a qualified person reviews it."],
  },
  realestate: {
    never: [
      "Client financial details, offer amounts before they are public, and lockbox, gate or door codes.",
    ],
    check: ["A person reads every AI-written listing for language about protected groups, because fair housing rules apply to listing text."],
  },
  trades: {
    never: [
      "Customer home addresses together with schedules, gate codes, alarm codes or notes about when a home is empty.",
    ],
    check: ["Prices, measurements and safety steps from an AI tool get checked against our own price list and the manufacturer's instructions."],
  },
  retail: {
    never: [
      "Card numbers, loyalty account details and customer order histories tied to a name.",
    ],
    check: ["Allergen and ingredient statements come from our own recipes and labels. An AI tool never writes them."],
  },
};

export const TOOLS = ["ChatGPT", "Claude", "Gemini", "Microsoft Copilot"] as const;

export interface PolicyInput {
  business: string;
  owner: string;
  industry: Industry;
  tools: string[];
  otherTools: string;
  customerData: "no" | "anonymized";
  reviewer: string;
  /** ISO date (YYYY-MM-DD) the policy takes effect, or "" before the browser fills it. */
  effective: string;
}

function fmtDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function addMonths(iso: string, months: number): string {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function buildPolicy(p: PolicyInput): string {
  // Blank fields fall back to plain words rather than [brackets], so an unfilled policy
  // still reads as finished text.
  const name = p.business.trim();
  const biz = name || "our business";
  const owner = p.owner.trim() || "the business owner";
  const Owner = cap(owner);
  const reviewer = cap(p.reviewer.trim() || "the business owner");
  const other = p.otherTools.split(",").map((s) => s.trim()).filter(Boolean);
  const tools = [...p.tools, ...other];
  const ind = INDUSTRY_CLAUSES[p.industry];
  const L: string[] = [];

  L.push(name ? `AI use policy for ${name}` : "AI use policy");
  L.push("");
  L.push(`Policy owner: ${owner}`);
  if (p.effective) L.push(`Effective date: ${fmtDate(p.effective)}`);
  L.push("");

  L.push("1. Purpose");
  L.push(
    `This policy sets the rules for how everyone at ${biz} uses AI tools for work, including employees, contractors and owners. ` +
      "It protects the information customers trust us with, keeps our work accurate, and tells everyone which tools they may use and how.",
  );
  L.push("");

  L.push("2. Approved tools");
  if (tools.length) {
    L.push(`Staff may use ${listJoin(tools)} for work.`);
  } else {
    L.push(`No AI tools have approval yet. Ask ${owner} before you use any AI tool for work.`);
  }
  L.push(
    "Use the business account for each tool, never a personal account. Where a tool lets the provider train on your chats, turn that setting off. " +
      "A tool missing from this list needs approval first, as section 6 explains.",
  );
  L.push("");

  L.push("3. What never goes into an AI tool");
  L.push("Never type, paste or upload any of the following into an AI tool:");
  L.push("- Passwords, login codes and API keys.");
  if (p.customerData === "no") {
    L.push("- Customer personal data of any kind, such as names, addresses, phone numbers, email addresses and account details.");
  } else {
    L.push(
      "- Customer personal data that identifies a person. You may describe a customer's situation only after you remove the name, address, phone number, email address, account number, photos and any other detail that points to that person. Write \"a customer\" in place of the name.",
    );
  }
  L.push("- Payment data, including card numbers and bank details.");
  L.push("- Confidential client information that a client shared with us in trust or under an agreement.");
  L.push("- Financial results we have not released, such as sales figures, pricing plans and forecasts.");
  L.push("- Private details about staff, such as pay, health and performance reviews.");
  for (const n of ind.never) L.push(`- ${n}`);
  L.push(`If you are unsure whether something belongs on this list, leave it out and ask ${owner}.`);
  L.push("");

  L.push("4. Checking AI output");
  L.push(
    "AI tools can state a wrong fact in the same confident tone as a right one. Before AI-assisted work reaches a customer or the public, the person who used the tool checks four things against a source they trust:",
  );
  L.push("- Names of people, products, businesses and places.");
  L.push("- Numbers, including prices, phone numbers, measurements and totals.");
  L.push("- Quotes, traced to where the person said or wrote them.");
  L.push("- Dates, including deadlines and any date tied to a law or a price.");
  for (const c of ind.check) L.push(c);
  L.push(
    `${reviewer} then reads and approves the work before it goes public. The person who sends it stays responsible for what it says.`,
  );
  L.push("A step-by-step guide to the four checks: purcellventures.co/blog/check-ai-answer-before-using");
  L.push("");

  L.push("5. Telling customers about AI");
  L.push(
    "When AI drafted most of something a customer relies on, such as instructions, a quote, a report or advice, we tell the customer that AI helped write it and that a person checked it. " +
      "A chatbot on our website or in our messages says it is a bot. A message sent under a person's name is one that person read before it went out.",
  );
  L.push("");

  L.push("6. Approving new tools");
  L.push(
    `${Owner} approves every new AI tool before anyone uses it for work, including AI features added to software we already use. ` +
      `To ask for a tool, send ${owner} its name, what you want to use it for and which plan it needs. ` +
      `${Owner} checks how the provider handles our data, and adds each approved tool to section 2.`,
  );
  L.push("");

  L.push("7. Training");
  L.push(
    `Everyone who uses AI tools for work reads this policy and signs it before first use. ${Owner} walks each new hire through it in their first week and tells all staff when the policy changes.`,
  );
  L.push("");

  L.push("8. Review date");
  L.push(
    `${Owner} reviews this policy every six months, and sooner when we add a tool or a law that affects us changes. ` +
      (p.effective ? `Next review: ${fmtDate(addMonths(p.effective, 6))}.` : "The first review falls six months after the effective date."),
  );
  L.push("");

  L.push("Acknowledgment");
  L.push("I have read this policy and I agree to follow it.");
  L.push("");
  L.push("Name: ______________________________");
  L.push("Signature: _________________________");
  L.push("Date: ______________________________");
  L.push("");
  L.push("---");
  L.push(
    "Template from purcellventures.co/ai-policy-template. General information only, and not legal advice. A business in a regulated industry should have an attorney review this policy before use.",
  );

  return L.join("\n");
}
