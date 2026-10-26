import { PageHero, Section, Rows } from "@/app/components/ui";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
}

const POSTS: Post[] = [
  {
    slug: "keep-out-of-ai-chat-window",
    title: "What to keep out of an AI chat window when you run a business",
    excerpt: "An AI chat tool can draft a customer reply or fix a spreadsheet formula without ever seeing your passwords or your customers' records. What to keep out, and how to use placeholders instead.",
    date: "October 26, 2026",
    readingTime: "3 min read",
    category: "Guide",
  },
  {
    slug: "start-using-ai-this-week-three-safe-first-tasks",
    title: "How to start using AI in your business this week: three safe first tasks",
    excerpt: "You can start using AI in your business this week with one free account and three small writing tasks. How to set it up safely and check every answer before you use it.",
    date: "October 25, 2026",
    readingTime: "5 min read",
    category: "Guide",
  },
  {
    slug: "not-secure-label-website-fix",
    title: "What the \"Not secure\" label next to your website means, and how to fix it",
    excerpt: "That gray \"Not secure\" label in the address bar shows up for your customers too. What it means and how to clear it on most small business hosts.",
    date: "October 24, 2026",
    readingTime: "5 min read",
    category: "Guide",
  },
  {
    slug: "starting-a-business-at-alabama",
    title: "Starting a business as a student at Alabama",
    excerpt: "Most student businesses sell to other students, and few sell to the local businesses around campus. The campus resources that help, and three mistakes that cost time.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Business",
  },
  {
    slug: "what-you-should-own",
    title: "What you should own at the end of a project",
    excerpt: "Who owns the domain and the code when the project ends. Seven assets that should be in your name, why the domain matters most, and what a provider can reasonably keep.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Business",
  },
  {
    slug: "six-sources-one-page",
    title: "Building a campus events site from six sources",
    excerpt: "Parsing six feeds took a day. The hard problem came later, when a source returned an empty list with a 200 status and the site showed fewer events.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Engineering",
  },
  {
    slug: "write-a-page-an-ai-will-quote",
    title: "How to write a page an AI will quote",
    excerpt: "Answer engines quote single sentences where a search engine ranks whole pages. How to write a sentence that still makes sense when it is quoted alone, and why getting indexed comes first.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Engineering",
  },
  {
    slug: "can-ai-find-your-business",
    title: "Can an AI find your business?",
    excerpt: "More people ask an AI assistant instead of searching, and most owners have never seen what it says about their business. A five-minute test, and four fixes.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Guide",
  },
  {
    slug: "ai-team-page-honesty",
    title: "My team page lists fifteen people who do not exist",
    excerpt: "In August the team page had fifteen names, none of them a person, and its first sentence said so. Why I name the agents, and why the disclosure lives in the send function instead of a policy.",
    date: "August 20, 2026",
    readingTime: "5 min read",
    category: "Opinion",
  },
  {
    slug: "psychology-and-software",
    title: "What psychology has to do with the software I build",
    excerpt: "One week of a methods course found a defect in a product I had already shipped. Within-subject design, base rates, and a question to ask before you choose a metric.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Notes",
  },
  {
    slug: "what-a-website-actually-costs",
    title: "What a small business website costs",
    excerpt: "Three providers quote $400, $4,000 and $15,000 for sites a customer could not tell apart. What drives the spread, the ongoing costs a quote often leaves out, and how to tell expensive from overpriced.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Business",
  },
  {
    slug: "what-one-operator-can-deliver",
    title: "What one operator can deliver",
    excerpt: "Solo shops promise personal service, and few say what happens when the owner is busy. The math on one person's hours, and four things an agency does better.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Business",
  },
  {
    slug: "audit-your-site-like-a-crawler",
    title: "Auditing your own site the way a crawler does",
    excerpt: "Nine checks you can run from a terminal with curl and no account. I ran each one against my own site and found six problems. One had kept nine pages out of Google.",
    date: "August 20, 2026",
    readingTime: "9 min read",
    category: "Engineering",
  },
  {
    slug: "claim-your-google-listing",
    title: "Claiming your Google listing yourself",
    excerpt: "You can do this in twenty minutes without hiring anyone, including me. What to put in every field, how to hide a home address, three things that get a listing suspended, and a five-minute monthly check.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Guide",
  },
  {
    slug: "cold-outreach-that-worked",
    title: "The cold email that got me a client, and the ones that did not",
    excerpt: "The email that worked led with something specific and checkable about their business. The ones that failed opened with a sentence that fit any business.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Business",
  },
  {
    slug: "llc-at-seventeen",
    title: "What registering an LLC at seventeen involved",
    excerpt: "The Georgia filing, the EIN, the bank account, whose address the registered agent puts on public record, and renaming the company nine months later.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Business",
  },
  {
    slug: "audit-every-business-in-your-town",
    title: "How to audit every business in your town in an afternoon",
    excerpt: "One free Overpass query against OpenStreetMap, an HTTP request per site, and two mistakes that will make your numbers wrong. One of them reached a published page before I caught it.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Process",
  },
  {
    slug: "new-college-alabama",
    title: "New College at Alabama, explained by someone in it",
    excerpt: "How the self-designed degree works, what a depth study is, the Levitetz seed grants, and the case against it: few people know what it is, and you supply the structure.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Guide",
  },
  {
    slug: "what-the-agents-get-wrong",
    title: "Five failures from running fifteen AI agents",
    excerpt: "A stage that could not fail, twenty proposals with the internal notes still in them, eleven agents that were never called, findings that closed themselves, and an agent that picked up access nobody granted it.",
    date: "August 20, 2026",
    readingTime: "9 min read",
    category: "Engineering",
  },
  {
    slug: "free-at-alabama",
    title: "What you have already paid for at Alabama",
    excerpt: "Twelve services a University of Alabama student has already paid for through tuition and fees, with the office names, and a list of the things I could not confirm.",
    date: "August 20, 2026",
    readingTime: "5 min read",
    category: "Guide",
  },
  {
    slug: "is-your-business-invisible",
    title: "Is your business invisible online?",
    excerpt: "Seven checks you can run on your own business in ten minutes with no tools or account, to see what a customer with a phone sees. Also the two cases where you do not need a website.",
    date: "August 20, 2026",
    readingTime: "7 min read",
    category: "Guide",
  },
  {
    slug: "small-app-security-checklist",
    title: "Five security holes I keep finding in small production apps",
    excerpt: "Row-level security that is enabled but enforcing nothing, paid API routes with no authentication, an auth cookie that is not authentication, and two more. From seven read-only audits of live applications.",
    date: "August 20, 2026",
    readingTime: "8 min read",
    category: "Engineering",
  },
  {
    slug: "canonical-tag-noindex",
    title: "Every post on my blog was telling Google not to index it",
    excerpt: "One line in a Next.js layout gave nine posts a canonical tag pointing at the index page, which tells Google to skip them as duplicates. No error appeared, and nine pages dropped out of Google's index.",
    date: "August 20, 2026",
    readingTime: "6 min read",
    category: "Engineering",
  },
  {
    slug: "/ai-at-alabama",
    title: "Studying AI at the University of Alabama",
    excerpt: "The new AI BS and its exact course requirements, why an AI major cannot also major in Computer Science, and the routes for students who are not in the College of Engineering.",
    date: "August 20, 2026",
    readingTime: "5 min read",
    category: "Guide",
  },
  {
    slug: "121-businesses-near-campus",
    title: "121 businesses near campus, and what a phone can find",
    excerpt: "Every independent business within 2,500 meters of the Quad, and how many list a website a machine can reach. 27 of the 121 did, and 23 list opening hours a machine can read.",
    date: "August 20, 2026",
    readingTime: "4 min read",
    category: "Reporting",
  },
  {
    slug: "tuscaloosa-small-business-online",
    title: "The Tuscaloosa Storefront Project",
    excerpt: "A reporting series on independent businesses around the University of Alabama: who runs them, how students find them, and what happens to a fifteen-year-old shop that has no website.",
    date: "August 20, 2026",
    readingTime: "3 min read",
    category: "Reporting",
  },
  {
    slug: "agents-that-cannot-fix-what-they-find",
    title: "I built agents that cannot fix what they find",
    excerpt: "Keeping the agent that finds a problem separate from the agent that fixes it is a cheap safety measure. It also created a failure mode that I shipped.",
    date: "August 17, 2026",
    readingTime: "4 min read",
    category: "Engineering",
  },
  {
    slug: "shipped-is-not-activated",
    title: "A shipped site can still fail to take a payment",
    excerpt: "A site can be live and pass its deploy checks and still be unable to take a payment. The cause is usually one broken link in the checkout path, and the owner rarely notices.",
    date: "August 17, 2026",
    readingTime: "3 min read",
    category: "Opinion",
  },
  {
    slug: "ai-augmented-sales-rep-day",
    title: "What a day looks like for an AI-augmented sales rep",
    excerpt: "An example Tuesday for a sales rep using AI prospect research, next-step coaching and conversation summaries inside a CRM, hour by hour.",
    date: "May 25, 2026",
    readingTime: "6 min read",
    category: "Process",
  },
  {
    slug: "why-i-built-crm-from-scratch",
    title: "Why I built a CRM from scratch instead of paying for HubSpot",
    excerpt: "HubSpot starts at $50 a month, and the features I needed put it at $200 to $400 a month. I built my own CRM in a week. The costs, what I gave up, and when you should not do this.",
    date: "May 25, 2026",
    readingTime: "5 min read",
    category: "Opinion",
  },
  {
    slug: "case-for-charging-19",
    title: "Why I charge $19 for the AI Starter Kit",
    excerpt: "Why I priced the PV AI Starter Kit at $19, what it does to how people buy, and what 200 sales would add up to.",
    date: "May 25, 2026",
    readingTime: "4 min read",
    category: "Strategy",
  },
  {
    slug: "five-workflows-no-code",
    title: "Five workflows you can automate this week without writing code",
    excerpt: "Five workflows that take small business owners the most time, and how to automate each one with off-the-shelf tools in under two hours.",
    date: "May 24, 2026",
    readingTime: "4 min read",
    category: "Practical",
  },
  {
    slug: "why-most-ai-tools-waste-money",
    title: "Why some small business AI tools waste your money",
    excerpt: "Many AI tools sold to small businesses fail because the workflow they attach to was already broken. Three questions help you check yours before you buy.",
    date: "May 24, 2026",
    readingTime: "5 min read",
    category: "Opinion",
  },
];

export default function BlogPage() {
  return (
    <main>
      <PageHero
        title="Writing"
        lede="Posts about AI, small business and software. I draft some of them with AI tools, and I edit every post before it goes up."
      />
      <Section stack>
        <Rows
          items={POSTS.map((post) => ({
            name: post.title,
            line: post.excerpt,
            // A slug beginning with "/" is a full path. The AI guide lives outside /blog
            // and "/blog/../ai-at-alabama" is a different URL to a crawler even though a
            // browser resolves it.
            href: post.slug.startsWith("/") ? post.slug : `/blog/${post.slug}`,
            fig: (
              <>
                {post.date}
                <br />
                {post.readingTime}
              </>
            ),
          }))}
        />
      </Section>
    </main>
  );
}
