import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Writing by Elijah Purcell",
  description:
    "Essays and operational guides on small business AI tooling. Specific, practical, written by people running real systems, not consultants writing about consulting.",
  keywords: [
    "small business AI blog", "AI for small business",
    "AI tools writing", "purcell ventures blog",
  ],
  openGraph: {
    title: "Writing by Elijah Purcell",
    description: "Essays on small business AI, written by people running real systems.",
    url: "https://purcellventures.co/blog",
    type: "website",
  },
  // NO canonical here. This layout wraps every post as well as the index, and Next
  // inherits it, so a canonical pointing at "/blog" told Google that all nine posts
  // were duplicates of the index page. Each post declares its own below.
};


// A Blog node listing its own members. The index carried the sitewide Person and
// Organization and nothing saying this URL is a collection, so a crawler had to
// follow 30 links to find out what is on it. Generated from the same array the
// page renders, so it cannot describe posts that do not exist.
const BLOG_LD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://purcellventures.co/blog#blog",
  "name": "Writing by Elijah Purcell",
  "url": "https://purcellventures.co/blog",
  "description": "Essays and reporting by Elijah Purcell on building software as a solo operator, autonomous AI agent systems, small businesses around the University of Alabama, and search and answer engines.",
  "inLanguage": "en-US",
  "author": {
    "@id": "https://purcellventures.co/#founder"
  },
  "publisher": {
    "@id": "https://purcellventures.co/#organization"
  },
  "blogPost": [
    {
      "@type": "BlogPosting",
      "headline": "Starting a business as a student at Alabama",
      "url": "https://purcellventures.co/blog/starting-a-business-at-alabama",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "What you should own at the end of a website project",
      "url": "https://purcellventures.co/blog/what-you-should-own",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Six sources, one page: building a campus events site",
      "url": "https://purcellventures.co/blog/six-sources-one-page",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "How to write a page an AI will actually quote",
      "url": "https://purcellventures.co/blog/write-a-page-an-ai-will-quote",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Can an AI find your business? A test you can run in five minutes",
      "url": "https://purcellventures.co/blog/can-ai-find-your-business",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "My team page lists fifteen people who do not exist",
      "url": "https://purcellventures.co/blog/ai-team-page-honesty",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "What psychology has to do with the software I build",
      "url": "https://purcellventures.co/blog/psychology-and-software",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "What a small business website actually costs",
      "url": "https://purcellventures.co/blog/what-a-website-actually-costs",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "What one operator can actually deliver",
      "url": "https://purcellventures.co/blog/what-one-operator-can-deliver",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Audit your own site the way a crawler does, with curl",
      "url": "https://purcellventures.co/blog/audit-your-site-like-a-crawler",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Claim your Google listing yourself, in about twenty minutes",
      "url": "https://purcellventures.co/blog/claim-your-google-listing",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "The cold email that got me a client, and the ones that did not",
      "url": "https://purcellventures.co/blog/cold-outreach-that-worked",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "What registering an LLC at seventeen actually involved",
      "url": "https://purcellventures.co/blog/llc-at-seventeen",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "How to audit every business in your town in an afternoon",
      "url": "https://purcellventures.co/blog/audit-every-business-in-your-town",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "New College at Alabama, explained by someone in it",
      "url": "https://purcellventures.co/blog/new-college-alabama",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Fifteen AI agents run my company. Here is what they get wrong",
      "url": "https://purcellventures.co/blog/what-the-agents-get-wrong",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "What you have already paid for at Alabama",
      "url": "https://purcellventures.co/blog/free-at-alabama",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Is your business invisible online? A ten-minute self-check",
      "url": "https://purcellventures.co/blog/is-your-business-invisible",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Five holes in almost every small production app",
      "url": "https://purcellventures.co/blog/small-app-security-checklist",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Every post on my blog was telling Google not to index it",
      "url": "https://purcellventures.co/blog/canonical-tag-noindex",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Studying AI at the University of Alabama",
      "url": "https://purcellventures.co/ai-at-alabama",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "121 businesses near campus, and what a phone can find",
      "url": "https://purcellventures.co/blog/121-businesses-near-campus",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "The Tuscaloosa Storefront Project",
      "url": "https://purcellventures.co/blog/tuscaloosa-small-business-online",
      "datePublished": "2026-08-20",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "We built agents that cannot fix what they find",
      "url": "https://purcellventures.co/blog/agents-that-cannot-fix-what-they-find",
      "datePublished": "2026-08-17",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Shipping is not the same as being able to take a payment",
      "url": "https://purcellventures.co/blog/shipped-is-not-activated",
      "datePublished": "2026-08-17",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "What a day looks like for an AI-augmented sales rep",
      "url": "https://purcellventures.co/blog/ai-augmented-sales-rep-day",
      "datePublished": "2026-05-25",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Why I built a CRM from scratch instead of paying $1,200/yr for HubSpot",
      "url": "https://purcellventures.co/blog/why-i-built-crm-from-scratch",
      "datePublished": "2026-05-25",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "The case for charging $19 for what others sell at $497",
      "url": "https://purcellventures.co/blog/case-for-charging-19",
      "datePublished": "2026-05-25",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Five workflows you can automate this week without writing code",
      "url": "https://purcellventures.co/blog/five-workflows-no-code",
      "datePublished": "2026-05-24",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    },
    {
      "@type": "BlogPosting",
      "headline": "Why most small business AI tools waste your money",
      "url": "https://purcellventures.co/blog/why-most-ai-tools-waste-money",
      "datePublished": "2026-05-24",
      "author": {
        "@id": "https://purcellventures.co/#founder"
      }
    }
  ]
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_LD) }} />
      {children}
    </>
  );
}
