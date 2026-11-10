// Which topic guide each blog post belongs to, from the cluster map built 9 Nov 2026.
// PostByline links every listed post up to its guide, so older posts pass authority to
// the pillar pages and readers find the full guide. New posts from the blog engine link
// their pillar in the body instead.

export const POST_PILLAR: Record<string, { href: string; title: string }> = {
  "/blog/121-businesses-near-campus": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/agents-that-cannot-fix-what-they-find": { href: "/ai-automation", title: "AI automation for small businesses" },
  "/blog/ai-augmented-sales-rep-day": { href: "/ai-consulting", title: "AI consulting in Alabama" },
  "/blog/ai-social-media-posts-what-to-hand-off": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/ai-team-page-honesty": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/audit-every-business-in-your-town": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/audit-your-site-like-a-crawler": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/automation-augmentation-agency-explained": { href: "/ai-automation", title: "AI automation for small businesses" },
  "/blog/business-domain-lapse-renewal": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/can-ai-find-your-business": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/canonical-tag-noindex": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/check-ai-answer-before-using": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/claim-your-google-listing": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/contact-page-that-reaches-you": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/five-workflows-no-code": { href: "/ai-automation", title: "AI automation for small businesses" },
  "/blog/google-business-profile-before-website": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/is-your-business-invisible": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/keep-out-of-ai-chat-window": { href: "/ai-consulting", title: "AI consulting in Alabama" },
  "/blog/not-secure-label-website-fix": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/prompt-usable-answer-first-time": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/quick-phone-test-business-website": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/shipped-is-not-activated": { href: "/ai-automation", title: "AI automation for small businesses" },
  "/blog/six-sources-one-page": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/slow-site-on-phone-causes-free-tests": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/small-app-security-checklist": { href: "/ai-integration", title: "AI integration for small businesses" },
  "/blog/start-using-ai-this-week-three-safe-first-tasks": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/tell-ai-about-your-business": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/tuscaloosa-small-business-online": { href: "/ai-for-small-business", title: "AI for small business" },
  "/blog/what-a-website-actually-costs": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/what-one-operator-can-deliver": { href: "/ai-automation", title: "AI automation for small businesses" },
  "/blog/what-the-agents-get-wrong": { href: "/ai-automation", title: "AI automation for small businesses" },
  "/blog/what-you-should-own": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/who-controls-your-domain-hosting-and-login": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
  "/blog/why-i-built-crm-from-scratch": { href: "/ai-integration", title: "AI integration for small businesses" },
  "/blog/why-most-ai-tools-waste-money": { href: "/ai-consulting", title: "AI consulting in Alabama" },
  "/blog/write-a-page-an-ai-will-quote": { href: "/ai-websites", title: "AI websites and getting found by AI search" },
};

// Post titles for the pillar pages' reading lists, copied from app/blog/page.tsx.
export const POST_TITLE: Record<string, string> = {
  "/blog/121-businesses-near-campus": "121 businesses near campus, and what a phone can find",
  "/blog/agents-that-cannot-fix-what-they-find": "I built agents that cannot fix what they find",
  "/blog/ai-augmented-sales-rep-day": "What a day looks like for an AI-augmented sales rep",
  "/blog/ai-social-media-posts-what-to-hand-off": "Using AI for your social media posts: what to hand off and what to write yourself",
  "/blog/ai-team-page-honesty": "My team page lists fifteen people who do not exist",
  "/blog/audit-every-business-in-your-town": "How to audit every business in your town in an afternoon",
  "/blog/audit-your-site-like-a-crawler": "Auditing your own site the way a crawler does",
  "/blog/automation-augmentation-agency-explained": "Three ways to work with AI: automation, augmentation and agency",
  "/blog/business-domain-lapse-renewal": "What happens when your business domain lapses, and how to keep it renewed",
  "/blog/can-ai-find-your-business": "Can an AI find your business?",
  "/blog/canonical-tag-noindex": "Every post on my blog was telling Google not to index it",
  "/blog/check-ai-answer-before-using": "How to check an AI answer before you use it",
  "/blog/claim-your-google-listing": "Claiming your Google listing yourself",
  "/blog/contact-page-that-reaches-you": "What a contact page needs so customers reach you on the first try",
  "/blog/five-workflows-no-code": "Five workflows you can automate this week without writing code",
  "/blog/google-business-profile-before-website": "Fix your Google Business Profile before you pay for website work",
  "/blog/is-your-business-invisible": "Is your business invisible online?",
  "/blog/keep-out-of-ai-chat-window": "What to keep out of an AI chat window when you run a business",
  "/blog/not-secure-label-website-fix": "What the \\\"Not secure\\\" label next to your website means, and how to fix it",
  "/blog/prompt-usable-answer-first-time": "Four parts of a prompt that gets a usable answer",
  "/blog/quick-phone-test-business-website": "A quick phone test for your business website",
  "/blog/shipped-is-not-activated": "A shipped site can still fail to take a payment",
  "/blog/six-sources-one-page": "Building a campus events site from six sources",
  "/blog/slow-site-on-phone-causes-free-tests": "Why your business site loads slowly on a phone, and how to test it for free",
  "/blog/small-app-security-checklist": "Five security holes I keep finding in small production apps",
  "/blog/start-using-ai-this-week-three-safe-first-tasks": "How to start using AI in your business this week: three safe first tasks",
  "/blog/tell-ai-about-your-business": "Why an AI tool needs your business facts before it writes about you",
  "/blog/tuscaloosa-small-business-online": "The Tuscaloosa Storefront Project",
  "/blog/what-a-website-actually-costs": "What a small business website costs",
  "/blog/what-one-operator-can-deliver": "What one operator can deliver",
  "/blog/what-the-agents-get-wrong": "Five failures from running fifteen AI agents",
  "/blog/what-you-should-own": "What you should own at the end of a project",
  "/blog/who-controls-your-domain-hosting-and-login": "How to find out who controls your domain, hosting and website login",
  "/blog/why-i-built-crm-from-scratch": "Why I built a CRM from scratch instead of paying for HubSpot",
  "/blog/why-most-ai-tools-waste-money": "Why some small business AI tools waste your money",
  "/blog/write-a-page-an-ai-will-quote": "How to write a page an AI will quote",
};

export function postsForPillar(href: string) {
  return Object.entries(POST_PILLAR)
    .filter(([post, p]) => p.href === href && POST_TITLE[post])
    .map(([post]) => ({ href: post, title: POST_TITLE[post] }));
}
