// @ts-nocheck
/* The map, ordered the way a visitor asks: what do you do, show me proof, what can I learn, who are you, how do I start.
   Every body is a real route. Planet size comes from the number of child pages. tex names the planet render. */
export const MAP = {
  core: { name: "Purcell Ventures", href: "/" },
  systems: [
    { id: "services", name: "Services", href: "/sites", price: "from $79 a month", line: "Five services, one person answering the phone. Prices are the real ones.",
      planets: [
        { name: "Websites", href: "/sites", children: 0, tex: "websites", price: "$650 setup, $99 a month" },
        { name: "Digital add-ons", href: "/digital", children: 8, tex: "digital", price: "from $99 a month" },
        { name: "AI consulting", href: "/consulting", children: 1, tex: "consulting", price: "from $125 a person" },
        { name: "Custom software", href: "/software", children: 0, tex: "software", price: "scoped on a discovery call" },
        { name: "Steady, personal IT", href: "/steady", children: 1, tex: "steady", price: "from $79 a month" },
      ],
      belt: { name: "Free tools", count: 26, href: "/digital/tools" } },
    { id: "proof", name: "Proof", href: "/portfolio", price: "", line: "Shipped work, written up, with prices next to the alternatives.",
      planets: [
        { name: "Portfolio", href: "/portfolio", children: 17, tex: "portfolio" },
        { name: "Case studies", href: "/case-studies", children: 0, tex: "casestudies" },
        { name: "Autonomous AI agents", href: "/agentic-ai", children: 0, tex: "software" },
        { name: "Pricing, compared", href: "/pricing-comparison", children: 0, tex: "pricing" },
        { name: "AI readiness test", href: "/ai-readiness", children: 0, tex: "book" },
      ] },
    { id: "learn", name: "Learn", href: "/courses", price: "$297 to $397", line: "Three courses, four digital products, and the blog.",
      planets: [
        { name: "The College Application Playbook", href: "/courses/college-apps", children: 1, tex: "courses" },
        { name: "The Business Launch Playbook", href: "/courses/business-launch", children: 1, tex: "pricing" },
        { name: "Zero to Automated", href: "/courses/ai-automation", children: 1, tex: "software" },
        { name: "Shop", href: "/shop", children: 5, tex: "digital" },
      ] },
    { id: "elijah", name: "Elijah", href: "/about", price: "", line: "Who runs it and how the work goes.",
      planets: [
        { name: "About", href: "/about", children: 3, tex: "company" },
        { name: "How we work", href: "/how-we-work", children: 0, tex: "book" },
        { name: "The team", href: "/team", children: 0, tex: "consulting" },
        { name: "Résumé", href: "/resume", children: 1, tex: "portfolio" },
        { name: "Now", href: "/now", children: 0, tex: "steady" },
        { name: "Uses", href: "/uses", children: 0, tex: "tools" },
        { name: "Verses", href: "/verses", children: 0, tex: "websites" },
      ] },
    { id: "contact", name: "Start a project", href: "/about#contact", price: "", line: "A discovery call first. Reply within one business day.", star: true,
      planets: [
        { name: "Book a consulting session", href: "/consulting/book", children: 0, tex: "book" },
        { name: "Start with Steady", href: "/steady/start", children: 0, tex: "steady" },
      ] },
  ],
  moons: {
    "/about": ["/who", "/what-is-purcell-ventures", "/faq", "/links", "/ai-consultant-tuscaloosa"],
    "/digital": ["/digital/ai-faq-builder", "/digital/estimating", "/digital/event-registration", "/digital/expenses", "/digital/finder", "/digital/inventory", "/digital/loyalty", "/digital/playbook"],
  },
  blog: { name: "Blog", href: "/blog", count: 33, through: "learn" },
};
