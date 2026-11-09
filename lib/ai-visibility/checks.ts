// The checks the AI visibility tool runs, with the plain sentence each one shows.
//
// Shared by the API route, which attaches the sentence to each result, and the page, which
// prints every check in full so a reader (and a crawler) sees what the tool looks at
// before running it. Edit the wording here and both places change.

export type Status = "pass" | "warn" | "fail" | "info";

export type CheckId =
  | "https" | "crawlers" | "llms" | "title" | "description"
  | "schema" | "phone" | "address" | "hours" | "words";

export type CheckInfo = {
  id: CheckId;
  label: string;
  /** One sentence: why the check matters and how to fix a miss. */
  advice: string;
  link: { href: string; text: string };
};

export const CHECKS: CheckInfo[] = [
  {
    id: "https",
    label: "Secure connection",
    advice:
      "Browsers mark a site without https as not secure and many visitors leave, so ask your host to switch on a free certificate and send every http address to the https version.",
    link: { href: "/blog/not-secure-label-website-fix", text: "Fixing the not secure label" },
  },
  {
    id: "crawlers",
    label: "AI crawlers in robots.txt",
    advice:
      "An assistant that cannot read your site describes you from directories and reviews instead, so remove the robots.txt lines that block the search crawlers unless you sell the writing on your site.",
    link: { href: "/ai-websites", text: "Should I block AI crawlers" },
  },
  {
    id: "llms",
    label: "llms.txt file",
    advice:
      "An llms.txt file lists your main pages for AI systems in plain text, and AI companies do not all read it yet, so treat it as a twenty-minute extra after the other checks pass.",
    link: { href: "/ai-websites", text: "What an llms.txt file is" },
  },
  {
    id: "title",
    label: "Page title",
    advice:
      "Search results and AI answers often show the title as the name of your page, so give the home page a title with the business name, what it does and the town.",
    link: { href: "/blog/write-a-page-an-ai-will-quote", text: "How to write a page an AI will quote" },
  },
  {
    id: "description",
    label: "Meta description",
    advice:
      "The description is the summary a search engine shows under your link, so write one or two sentences that say who you serve, what you do and where.",
    link: { href: "/blog/write-a-page-an-ai-will-quote", text: "How to write a page an AI will quote" },
  },
  {
    id: "schema",
    label: "Business structured data",
    advice:
      "LocalBusiness or Organization markup labels your name, address, phone and hours for machines, so add a JSON-LD block with the same facts the page shows.",
    link: { href: "/ai-websites", text: "Does schema markup help AI find my business" },
  },
  {
    id: "phone",
    label: "Phone number in the page text",
    advice:
      "Assistants repeat the phone number they can read, so print it as text on the home page and keep it identical to your Google listing.",
    link: { href: "/blog/claim-your-google-listing", text: "Claiming your own Google listing" },
  },
  {
    id: "address",
    label: "Address in the page text",
    advice:
      "A street address or a city, state and ZIP in the page text tells an assistant where you work, so print it as text and match your Google listing, or name your service area if you work from home.",
    link: { href: "/blog/claim-your-google-listing", text: "Claiming your own Google listing" },
  },
  {
    id: "hours",
    label: "Opening hours",
    advice:
      "People ask assistants whether a business is open now, so print your hours as text on the home page and keep them the same as your Google listing.",
    link: { href: "/blog/claim-your-google-listing", text: "Claiming your own Google listing" },
  },
  {
    id: "words",
    label: "Readable text without JavaScript",
    advice:
      "Many AI crawlers read the raw page without running scripts, so a site that draws its text with JavaScript looks empty to them, and the fix is server-rendered or static pages.",
    link: { href: "/blog/can-ai-find-your-business", text: "Can an AI find your business" },
  },
];

export const CHECK_BY_ID = Object.fromEntries(CHECKS.map((c) => [c.id, c])) as Record<CheckId, CheckInfo>;

/** The crawlers the robots.txt check names, with what each one does. */
export const BOTS: { token: string; owner: string; role: string; live: boolean }[] = [
  { token: "GPTBot", owner: "OpenAI", role: "collects pages OpenAI may use to train its models", live: false },
  { token: "OAI-SearchBot", owner: "OpenAI", role: "finds pages to show in ChatGPT search answers", live: true },
  { token: "ClaudeBot", owner: "Anthropic", role: "collects pages Anthropic may use to train Claude", live: false },
  { token: "PerplexityBot", owner: "Perplexity", role: "finds pages to show in Perplexity answers", live: true },
  { token: "Google-Extended", owner: "Google", role: "controls whether Google may use pages for its Gemini models, and has no effect on Google Search", live: false },
];

export type Item = { name: string; status: Status; note: string };

export type Finding = {
  id: CheckId;
  label: string;
  status: Status;
  found: string;
  advice: string;
  link: { href: string; text: string };
  items?: Item[];
};

export type Report = {
  url: string;
  finalUrl: string;
  checkedAt: string;
  findings: Finding[];
  counts: Record<Status, number>;
};
