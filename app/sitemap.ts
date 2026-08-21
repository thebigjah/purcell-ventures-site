import { MetadataRoute } from "next";

const BASE = "https://purcellventures.co";

export default function sitemap(): MetadataRoute.Sitemap {
  // Not new Date(). A sitemap built with the current time claims every page changed at
  // the moment of the crawl, which is a timestamp of the request rather than a fact about
  // the page. Google learns the field is noise and stops using it, and then it cannot tell
  // which pages actually changed. This is a literal, and it is meant to be edited by hand
  // when the site is substantively revised. Everything here genuinely was rewritten on
  // 20 August 2026.
  const now = new Date("2026-08-20T00:00:00Z");
  return [
    // /services is deliberately noindex and canonicalises to the Mantle site, so
    // listing it here asked Google to index a page that tells Google not to index it.
    // Caught by running this site's own published checklist against it.

    // Deliberately absent: /consulting/book, /uses, /verses, /writing and /links.
    // All five are Disallowed in robots.txt, and listing a page in the sitemap while
    // forbidding the crawler to read it is a contradiction Google resolves badly: the
    // URL can surface as a bare link with no description at all. Removed here rather
    // than unblocked there, because unblocking would publish pages he chose to hide.

    // Home, top priority
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // Division pages, high priority, what the business card links to
    { url: `${BASE}/digital`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/consulting`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/software`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Booking and case studies, conversion paths
    { url: `${BASE}/ai-readiness`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ai-cost-calculator`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Every post, not the two that happened to be listed. A post absent from the
    // sitemap is a post an engine finds only by walking the index page, if it does.
    { url: `${BASE}/blog/agents-that-cannot-fix-what-they-find`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/shipped-is-not-activated`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/ai-augmented-sales-rep-day`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/why-i-built-crm-from-scratch`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/case-for-charging-19`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/five-workflows-no-code`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/why-most-ai-tools-waste-money`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    { url: `${BASE}/blog/121-businesses-near-campus`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // The tap card. It carries his name, his photo and his contact details on a page
    // that people reach by tapping a physical object, which is exactly the kind of
    // corroborating page a name query wants.
    { url: `${BASE}/card`, lastModified: now, changeFrequency: "monthly", priority: 0.6, images: [`${BASE}/brand/elijah.jpg`] },

    // The three tap targets under /card. Each is a real landing page with its own

    // title and description, reached by tapping a physical card, and there is no

    // reason somebody searching for what they offer should not find them too.

    { url: `${BASE}/card/hire`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/card/rep`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    { url: `${BASE}/card/campus`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // The AI guide. It targets the questions he wants to own at Alabama by answering
    // them properly rather than by claiming a title, which is the only version of
    // that strategy that survives a reader checking it.
    { url: `${BASE}/ai-at-alabama`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/agentic-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    { url: `${BASE}/blog/canonical-tag-noindex`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/small-app-security-checklist`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/is-your-business-invisible`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/free-at-alabama`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/what-the-agents-get-wrong`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/new-college-alabama`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/audit-every-business-in-your-town`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/llc-at-seventeen`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/cold-outreach-that-worked`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/claim-your-google-listing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/audit-your-site-like-a-crawler`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/what-one-operator-can-deliver`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/what-a-website-actually-costs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/psychology-and-software`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/ai-team-page-honesty`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/can-ai-find-your-business`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    { url: `${BASE}/blog/write-a-page-an-ai-will-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    { url: `${BASE}/blog/six-sources-one-page`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/blog/what-you-should-own`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE}/blog/starting-a-business-at-alabama`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // The reporting series. An author byline on a piece ABOUT other people, in a named
    // place, is an entity signal no amount of self-description produces, and it is the
    // only page here that also generates conversations with prospects.
    { url: `${BASE}/blog/tuscaloosa-small-business-online`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    { url: `${BASE}/what-is-purcell-ventures`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // The name-query pages. /who exists specifically to be the answer to
    // "who is Elijah Purcell", and it is the highest-priority page on the site for
    // that query, so it outranks the division pages here on purpose.
    { url: `${BASE}/who`,  lastModified: now, changeFrequency: "monthly", priority: 0.95, images: [`${BASE}/brand/elijah.jpg`] },
    { url: `${BASE}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // About + personal depth
    { url: `${BASE}/about`,   lastModified: now, changeFrequency: "monthly", priority: 0.9, images: [`${BASE}/brand/elijah.jpg`] },
    { url: `${BASE}/now`,     lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/faq`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resume`,  lastModified: now, changeFrequency: "monthly", priority: 0.7, images: [`${BASE}/brand/elijah.jpg`] },

    // Courses, discoverable
    { url: `${BASE}/courses`,                  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/courses/college-apps`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/courses/business-launch`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/courses/ai-automation`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Field services redirect
  ];
}
