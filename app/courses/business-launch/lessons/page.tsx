"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import VideoEmbed from "@/app/components/VideoEmbed";
import { PanopticonMark } from "@/app/components/PanopticonMark";

const VALID_CODE = process.env.NEXT_PUBLIC_BUSINESS_ACCESS_CODE ?? "BUSINESS2025";
type GateState = "loading" | "locked" | "unlocked";

// ── localStorage helpers ──────────────────────────────────────────────────────
function getProgress(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("pv_business_progress") || "[]"); } catch { return []; }
}
function markDone(id: string): void {
  const p = getProgress();
  if (!p.includes(id)) localStorage.setItem("pv_business_progress", JSON.stringify([...p, id]));
}
function saveCurrent(id: string): void {
  localStorage.setItem("pv_business_current", id);
}

// ── Course data ───────────────────────────────────────────────────────────────
interface Lesson { id: string; moduleId: string; title: string; duration: string; format: string; videoUrl: string | null; notes: { intro: string[]; takeaways: string[] }; }
interface Module  { id: string; num: string; title: string; lessons: Lesson[]; }

const MODULES: Module[] = [
  {
    id: "module-1", num: "01", title: "From Idea to Validated Concept",
    lessons: [
      {
        id: "1-1", moduleId: "module-1", title: "Is your idea a business or a hobby?", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Most people who want to start a business already have an idea. The problem isn't the idea — it's that they can't tell whether it's a real business or a thing they like doing. These are not the same thing, and confusing them is the most common reason people spend months building something nobody pays for.",
            "A business solves a problem someone else has and is willing to pay to fix. A hobby solves a problem you have and enjoy working on. The test is simple: would someone hand you money for this without you being their friend, their family member, or someone they feel obligated to support? If you have to imagine a sympathetic buyer, you have a hobby.",
            "There's also the lifestyle trap — people build a 'business' around something they love without ever asking whether the market values it. A passion for something is not evidence of demand. It's evidence that you would enjoy doing the work. Enjoyment and market demand occasionally overlap, but they're independent variables. Build around demand first, and find ways to enjoy the work second.",
            "The good news: this distinction is testable before you spend a dime. In the next lesson, we'll build your customer profile. In Lesson 1-3, you'll validate whether people will actually pay. But you have to start by being honest with yourself here — if this is a hobby, that's fine. The course will still help you build systems around it. But don't call it a business until the market confirms it.",
          ],
          takeaways: [
            "A business solves someone else's problem at a price they'll pay — not just something you enjoy doing",
            "Demand and passion are independent variables — don't assume your enthusiasm signals a market",
            "The real test: would a stranger, without obligation, hand you money for this?",
            "Being honest at this stage saves months of building the wrong thing",
            "If it's a hobby right now, that's fine — validation can turn it into a business if the market is there",
          ],
        },
      },
      {
        id: "1-2", moduleId: "module-1", title: "Who exactly is your customer — market research done simply", duration: "13 min", format: "Camera + Screen", videoUrl: null,
        notes: {
          intro: [
            "Most founders can describe their product in detail and their customer in vague generalities. 'Anyone who wants X' is not a customer profile — it's an avoidance of the question. The sharper your customer definition, the more effective every subsequent decision is: your messaging, your pricing, your outreach, your offer structure.",
            "A real customer profile has three layers. First: demographics and situation — who they are, what they do, what stage of life or business they're in. Second: the problem they have — specifically, not abstractly. Not 'they want to grow their business' but 'they're spending 15 hours a week on a task they hate and know they should delegate but don't know how.' Third: their trigger — what's happening in their life right now that makes them willing to buy a solution today. People don't buy when they have a problem; they buy when the problem becomes urgent.",
            "The best market research is primary: actual conversations with people who fit your target profile. Five conversations will tell you more than 50 hours of reading industry reports. Ask them to describe the problem in their own words. Where do they look for solutions? What have they tried? What did it cost? What didn't work about it? You're not pitching yet — you're listening. The words they use to describe their problem become your marketing copy.",
            "The Customer Profile worksheet in your resource pack structures these conversations and organizes your findings into a single document you'll reference throughout the course. Fill it in after your first five conversations. It will be wrong in some ways — that's expected. You'll update it as you learn more.",
          ],
          takeaways: [
            "'Anyone who wants X' is not a customer profile — specificity is what makes everything else work",
            "Three layers: who they are, what problem they have (specifically), and what triggers them to buy today",
            "Five real conversations beat 50 hours of desk research — go talk to people",
            "The words your customers use to describe their problem are your marketing copy",
            "Use the Customer Profile worksheet to capture findings and update it as you learn",
            "People buy when the problem becomes urgent, not just when it exists",
          ],
        },
      },
      {
        id: "1-3", moduleId: "module-1", title: "Validating before you spend a dollar", duration: "12 min", format: "Camera + Screen", videoUrl: null,
        notes: {
          intro: [
            "Validation means getting evidence that people will pay for your thing before you build it. Not evidence that they think it's a good idea — anyone will say that. Evidence that they'll hand over money. These are very different signals, and confusing them is how people spend six months building something they end up selling to nobody.",
            "The minimum viable validation is a pre-sale. You describe what you're building, at what price, and ask someone to pay for it now to receive it later. If they pay, you've validated demand. If they say 'sounds interesting, let me know when it's ready,' that's not validation — that's polite non-commitment. You need a yes that costs them something.",
            "If a pre-sale feels too forward for your business type, the next best thing is a landing page test: build a simple page that describes your offer and its price, drive traffic to it, and track how many people click the 'buy' or 'contact me' button. The click is a softer signal than a payment, but it's real data. No clicks after real traffic means the offer or the framing isn't landing.",
            "For service businesses, the fastest validation is often just making an offer in a conversation. You've done your customer profile work. You've talked to five people. Now tell one of them what you'd charge to solve the problem you discussed. Their reaction — not what they say, but whether they take the next step — is your validation. One paying client validates the model. Ten validates the market.",
          ],
          takeaways: [
            "Validation is money collected, not opinions gathered — people say yes to ideas for free",
            "A pre-sale before you build is the clearest validation signal available",
            "Landing page click-through is a softer but real signal for offers that are harder to pre-sell",
            "For services: make the offer in a real conversation and watch what they do next",
            "One paying client validates the model; ten validates that there's a real market",
            "If nobody will commit money before you build, take that seriously before investing more time",
          ],
        },
      },
      {
        id: "1-4", moduleId: "module-1", title: "Choosing your model — service, product, digital, or hybrid", duration: "10 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Your business model determines how you make money, how much time you trade per dollar, and what your ceiling looks like. Choosing the wrong model for your situation — even with a great idea — creates structural problems you'll spend years trying to fix. Get this decision right early.",
            "Service businesses trade time for money. You do something for a client and they pay you for it. The upside: fast to start, low overhead, high margins on your time, direct customer feedback. The downside: limited by hours in the day, hard to scale without hiring, and client-dependent income. If you need revenue quickly and have a marketable skill, start here.",
            "Product businesses build something once and sell it many times. Physical products have manufacturing, inventory, and shipping complexity. Digital products — courses, templates, software tools, ebooks — have near-zero marginal cost and can scale indefinitely. The tradeoff is upfront investment: you build before you sell, which requires more certainty about demand. This is why Module 1 spends time on validation before you get here.",
            "Hybrid models combine both. Purcell Ventures runs consulting (service), courses (digital product), and software (product). The services fund the early stage while the products scale. If you have the capacity, a hybrid gives you both the cash flow of services and the leverage of products. Build the service business first, let it validate your expertise and your market, then productize what you've learned.",
          ],
          takeaways: [
            "Services: fast to start, high margin per hour, limited by time — best if you need revenue now",
            "Digital products: build once, sell many, near-zero marginal cost — best for scalable income",
            "Physical products: high complexity, inventory risk — only pursue if the market clearly demands it",
            "Hybrid: services fund early stage while products scale — the most sustainable long-term structure",
            "Match your model to your current situation, not your end-state vision",
            "Use the Business Model One-Pager template in your resource pack to finalize your choice",
          ],
        },
      },
    ],
  },
  {
    id: "module-2", num: "02", title: "Legal & Structure",
    lessons: [
      {
        id: "2-1", moduleId: "module-2", title: "Sole prop vs LLC — when each makes sense", duration: "9 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "A sole proprietorship is the default — if you make money from anything, you're already operating as one. There's no registration, no paperwork, no cost. Your business income is your personal income. The problem: your business liability is also your personal liability. If something goes wrong — a client sues, a vendor dispute escalates, a contract is breached — your personal assets are on the table.",
            "An LLC (Limited Liability Company) creates a legal separation between you and your business. The business can own assets, enter contracts, and incur debts independently. If the LLC gets sued, your personal bank account, car, and home are generally protected — as long as you maintain the separation properly (separate bank account, proper documentation, not mixing personal and business funds).",
            "When to form an LLC: as soon as your business involves client agreements, significant revenue, or any situation where a dispute could expose you to liability. For most service businesses, that means before or immediately after your first real client contract. For low-stakes side hustles with minimal client interaction, sole prop is fine while you're testing the concept.",
            "The LLC filing costs between $50 and $500 depending on your state, takes about an hour to complete online, and in most states is effective immediately. It's not a major undertaking. If you're serious about the business, there's no reason to stay a sole prop past your first few hundred dollars in revenue. The protection it provides is worth far more than the filing fee.",
          ],
          takeaways: [
            "Sole prop is the default — no setup, but no liability protection",
            "An LLC separates your business and personal liability — your personal assets are protected if properly maintained",
            "Form an LLC before signing real client contracts or taking on significant revenue",
            "Maintaining the separation (separate bank account, no personal/business mixing) is what makes the protection hold",
            "Filing cost: $50–$500 depending on state, usually done online in an hour",
          ],
        },
      },
      {
        id: "2-2", moduleId: "module-2", title: "Filing your LLC — live walkthrough", duration: "14 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "This lesson is a screen share of the actual LLC filing process. I walk through each step using a real state filing portal. The steps vary slightly by state, but the structure is the same everywhere: choose a name, file articles of organization, designate a registered agent, and pay the filing fee.",
            "Your LLC name must be unique in your state and must include 'LLC' or 'Limited Liability Company' in the name. Check your state's business name search tool before committing — most states have this as a free online lookup. The name you file doesn't have to be your public-facing brand name; you can operate under a DBA (doing business as) once you're formed.",
            "The registered agent is the official address that receives legal documents on behalf of your LLC. This needs to be a physical address in your state — not a PO box. You can be your own registered agent if you have a physical address in the state. If you're not in the state or don't want your home address on public record, registered agent services typically cost $50–$150/year.",
            "The LLC Filing Checklist in your resource pack walks through every step with state-specific notes so you don't miss anything. Filing typically takes 1–7 business days for standard processing, or same-day for expedited (usually $25–$75 extra). Once filed, you'll move immediately to getting your EIN in the next lesson.",
          ],
          takeaways: [
            "File online through your state's Secretary of State website — it's the same process everywhere",
            "Check name availability before filing — use your state's free business name search tool",
            "You need a registered agent with a physical address in your state — you can serve as your own",
            "Use the LLC Filing Checklist from your resource pack to avoid missing steps",
            "Expedited processing ($25–$75 extra) is worth it — standard processing can take days",
            "Your LLC name on file doesn't have to match your brand name — you can use a DBA",
          ],
        },
      },
      {
        id: "2-3", moduleId: "module-2", title: "EIN, registered agent, and operating agreement", duration: "8 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "An EIN (Employer Identification Number) is your business's tax ID — the equivalent of a Social Security number for your LLC. You need it to open a business bank account, file taxes, hire employees, and in some states to obtain business licenses. Getting one is free and instant through the IRS website at irs.gov. Single-member LLCs can apply online and receive their EIN immediately.",
            "The operating agreement is a document that defines how your LLC operates: who owns what percentage, how decisions are made, what happens if a member wants to leave, and how the business is dissolved. Even if you're the only member, most states recommend having one. Some banks require it to open a business account. Draft a simple one — templates are widely available and you don't need a lawyer for a single-member LLC with no outside investors.",
            "Ongoing compliance after formation: most states require an annual report (usually $25–$100) and some require a franchise tax. Set a calendar reminder for your formation anniversary to check whether your state has an annual filing requirement. Missing it can result in penalties or administrative dissolution of your LLC.",
            "One thing most people miss: after forming your LLC, you need to actually use it properly. Every contract you sign should be signed as 'Your Name, Member, [LLC Name]' — not your personal name alone. Every invoice should come from the LLC. Every payment should go into the LLC's bank account. The legal separation only holds if you behave like they're actually separate entities.",
          ],
          takeaways: [
            "Get your EIN immediately after filing — it's free and instant at irs.gov",
            "An operating agreement is required in some states and recommended everywhere — even for single-member LLCs",
            "Check your state's annual report requirement and put it on your calendar",
            "Sign contracts as 'Name, Member, LLC Name' — not your personal name",
            "The liability protection only holds if you treat the business and personal finances as genuinely separate",
          ],
        },
      },
      {
        id: "2-4", moduleId: "module-2", title: "Contracts and protecting yourself — scope, payment, disputes", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Most early-stage business problems — scope creep, unpaid invoices, dispute escalations — could have been prevented with a clear contract signed before the work started. Contracts aren't about distrust. They're about alignment. A good contract forces both parties to think through the details before they become problems.",
            "Every client engagement needs at minimum: a description of exactly what you're delivering (scope), the price and payment terms (when and how you get paid), what happens if they want changes (revision policy), who owns the work product (IP assignment), and how disputes are handled (jurisdiction and process). These don't have to be long. A one-page document that covers all five points is better than a 10-page template nobody reads.",
            "Payment terms matter more than most people realize. Net-30 (pay within 30 days) is standard in some industries and a trap in others — especially for new businesses with thin cash flow. For services, consider requiring a deposit (25–50%) upfront before work begins, with the remainder due on delivery. This filters out non-serious clients and protects you if they disappear.",
            "When a client doesn't pay, you have options: a formal demand letter, collections, or small claims court (typically handles disputes up to $10,000–$15,000 without requiring an attorney). The most important thing is having a signed contract — without it, you're in 'he said, she said' territory. With it, you have documented evidence of what was agreed. I've been in this situation. The contract is what protects you.",
          ],
          takeaways: [
            "Use a written contract for every client engagement — even friends, even small projects",
            "A good contract covers: scope, payment terms, revision policy, IP ownership, and dispute process",
            "Require a deposit (25–50%) before starting work — it filters bad clients and protects your cash flow",
            "Net-30 is a trap for small businesses — negotiate payment terms that match your cash flow needs",
            "Without a signed contract, disputes become your word against theirs; with one, you have documentation",
            "Small claims court handles most common freelance/service disputes without a lawyer",
          ],
        },
      },
    ],
  },
  {
    id: "module-3", num: "03", title: "Money, Pricing & Banking",
    lessons: [
      {
        id: "3-1", moduleId: "module-3", title: "Opening a business bank account — why and how", duration: "10 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "A separate business bank account is not optional if you have an LLC. Mixing personal and business finances — paying business expenses from your personal account, depositing client payments into your personal account — is called 'piercing the corporate veil.' It undermines the legal separation your LLC is supposed to provide. If you're ever sued, a court can look at your finances and decide the LLC and you were never really separate, removing your liability protection.",
            "The practical case for separation: it makes bookkeeping infinitely easier, makes tax season less painful, and makes you look more professional to clients. When a client pays 'Purcell Ventures LLC' instead of 'Elijah Purcell,' it signals that you take the business seriously. Small things like this build trust.",
            "Opening a business account typically requires: your LLC formation documents (articles of organization), your EIN, and a deposit (usually $25–$100 minimum). Most major banks offer business checking accounts. Online banks like Mercury, Relay, and Bluevine are popular for small businesses because they have low or no fees, good interfaces, and easy integrations with accounting software.",
            "For most new businesses, Mercury is where I'd start — no minimum balance, no monthly fees, excellent API/integration support, and built specifically for startups and small businesses. Whatever you choose, set it up the same week you form your LLC. Every dollar earned by the business should flow through this account from day one.",
          ],
          takeaways: [
            "A separate business account is required to maintain LLC liability protection — non-negotiable",
            "Mixing personal and business funds can pierce the corporate veil and void your legal protection",
            "Bring: articles of organization, EIN, and a small opening deposit",
            "Mercury, Relay, or Bluevine are better than traditional banks for small businesses — lower fees, better tools",
            "Set up the business account the same week you form your LLC",
          ],
        },
      },
      {
        id: "3-2", moduleId: "module-3", title: "Pricing your offer — the math and the psychology", duration: "13 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Most people price by asking 'what would I be comfortable charging?' That's the wrong question. It produces prices based on your insecurity, not on the value you deliver. The right questions are: what is this worth to the buyer? What does the alternative cost them? What are comparable solutions priced at? Your price is a claim about value — make sure the claim is honest and defensible.",
            "For service businesses: start with cost-plus pricing to establish a floor (your cost of time × your minimum acceptable hourly rate), then check that floor against market rates. If the market pays more than your floor, move toward market rate. If the market pays significantly more than that, you have room to price on value — charge based on outcomes delivered, not hours spent. A contract lawyer doesn't charge you by how long it takes to draft a document; they charge by the value of the legal protection.",
            "The Pricing Calculator in your resource pack handles the floor calculation and projects revenue at different rates and volumes. Use it before setting your first price. The psychological reality: most new founders underprice by 30–50% because they're afraid of rejection. A higher price reduces the number of clients you need, attracts more serious buyers, and gives you margin to over-deliver. Cheap pricing signals low confidence and attracts the clients most likely to cause problems.",
            "Test your price by making an offer. If everyone says yes immediately, you're probably underpriced. If nobody engages at all, you may have a messaging problem or a real price mismatch. If some people say yes and some say no, you're in the right range. The goal isn't to be the cheapest option — it's to be the right option for the right client at a price that reflects what you actually deliver.",
          ],
          takeaways: [
            "Price based on value delivered to the buyer, not on what you're comfortable charging",
            "Establish a floor with cost-plus, then calibrate against market rates",
            "Underpricing is a confidence problem disguised as a competitive strategy — it backfires",
            "Use the Pricing Calculator from your resource pack to run the numbers before you commit",
            "A higher price signals confidence and filters for better clients",
            "Test your price — universal yes means you're underpriced; no engagement means messaging or mismatch",
          ],
        },
      },
      {
        id: "3-3", moduleId: "module-3", title: "Invoicing, Stripe, and collecting actual money", duration: "11 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "Getting paid is the part most people don't think through until they have their first client ready to pay and no way to collect. Don't improvise this. Set up your payment infrastructure before you have your first sale.",
            "For digital payments, Stripe is the standard for good reason: it handles credit cards, bank transfers, and international payments, integrates with almost everything, and charges 2.9% + $0.30 per transaction — no monthly fees. You can create a Stripe account, connect your business bank account, and generate a payment link in under 30 minutes. That payment link is all you need to accept credit card payments from anyone.",
            "Invoicing is the paper trail. Every client transaction should have an invoice — a document that describes what was delivered, the amount owed, the due date, and your payment information. HoneyBook, Wave, and FreshBooks all have free or low-cost invoice tools. Stripe also generates invoices natively. Whatever tool you choose, use it consistently. Your invoices are financial records for tax purposes — keep them organized.",
            "For ongoing service relationships, consider Stripe's subscription billing or HoneyBook's recurring payment tools. Monthly retainers are significantly easier to manage when payment is automatic rather than manually invoiced each cycle. Set it up once, and the money arrives on schedule without requiring either party to remember to do anything.",
          ],
          takeaways: [
            "Set up payment infrastructure before your first sale — don't improvise it on the call",
            "Stripe is the default for good reason: low fees, wide integration, works for everything",
            "Every transaction needs an invoice — it's your financial record and protects you in disputes",
            "For recurring clients, set up automatic billing — it eliminates the monthly friction of chasing invoices",
            "Keep all invoices organized from day one — they're required for taxes",
          ],
        },
      },
      {
        id: "3-4", moduleId: "module-3", title: "Taxes, bookkeeping, and cash flow — year one survival guide", duration: "13 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "Most first-time business owners get blindsided by taxes. As a sole proprietor or single-member LLC, your business income flows through to your personal taxes — but unlike a W-2 employee, nobody is withholding anything. You're responsible for setting aside money for taxes yourself, including self-employment tax (15.3% on net income), on top of income tax. The common mistake is spending all your revenue assuming it's profit. It isn't.",
            "The rule of thumb for year one: set aside 25–30% of every dollar of profit for taxes. This isn't precise — it depends on your income level, deductions, and state tax rate — but it prevents the scenario where you owe $8,000 in April and have $400 in the account. Open a dedicated savings account for tax reserves and move that percentage every time you get paid.",
            "Quarterly estimated taxes: if you expect to owe more than $1,000 in taxes for the year, the IRS requires you to pay in quarterly installments (April 15, June 15, September 15, January 15). Missing these payments results in underpayment penalties. Your first year, an accountant or CPA is worth the cost — typically $200–$500 for a simple business return — to make sure you set this up correctly.",
            "Basic bookkeeping is just tracking money in and money out. You need to know: total revenue, total expenses by category, net profit, and outstanding receivables. Wave is free and handles this well for small businesses. QuickBooks is more powerful but costs $30+/month. Connect your business bank account so transactions import automatically, categorize them consistently, and reconcile monthly. Doing this in real time throughout the year makes tax season a non-event instead of a crisis.",
          ],
          takeaways: [
            "Set aside 25–30% of profit for taxes from every payment — don't spend it",
            "Self-employment tax (15.3%) is in addition to income tax — budget for both",
            "Pay quarterly estimated taxes if you expect to owe more than $1,000 — missing these triggers penalties",
            "Hire a CPA for your first business tax return — $200–$500 is cheap insurance against expensive mistakes",
            "Use Wave (free) or QuickBooks for bookkeeping — connect your bank account and categorize in real time",
            "Reconcile your books monthly — doing it continuously prevents a year-end nightmare",
          ],
        },
      },
    ],
  },
  {
    id: "module-4", num: "04", title: "Brand & Presence",
    lessons: [
      {
        id: "4-1", moduleId: "module-4", title: "Your brand — name, positioning, and what you actually stand for", duration: "13 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Brand is not your logo. Your logo is a small, visual part of your brand. Your brand is what people think and feel when they encounter your business — your reputation made visible. A business with a mediocre logo and a clear, consistently delivered promise is a strong brand. A business with a beautiful logo and inconsistent positioning is not.",
            "Naming: your business name should be easy to say, easy to spell, and available as a domain name and across social handles. It can be your own name (which builds personal authority and is easy), a descriptive name (which signals what you do but is harder to differentiate), or a coined/abstract name (which is brandable but requires more effort to establish meaning). Check domain availability before you fall in love with a name.",
            "Positioning answers: who are you for, what do you do, and why should they choose you over the alternative? Most businesses skip this step and end up trying to be everything to everyone, which means they're the obvious choice for nobody. A clear positioning statement — even if it's just for internal clarity — makes every marketing decision easier. 'We help [specific person] achieve [specific outcome] through [specific approach].' Fill in those three blanks and you have a positioning statement.",
            "The Brand Positioning worksheet in your resource pack walks through naming criteria, positioning statement development, and the tone/voice questions that determine how your brand communicates. Do this once, document it, and use it as the reference point for every piece of content, every sales conversation, and every client interaction. Consistency is what turns a business into a brand.",
          ],
          takeaways: [
            "Brand is your reputation made visible — not just a logo",
            "Check domain and social handle availability before committing to a name",
            "Positioning: who you're for, what you do, why they should choose you — answer all three",
            "Use the Brand Positioning worksheet to develop and document your positioning statement",
            "Consistency is what builds brand recognition — your positioning statement is the reference point",
            "Clear positioning makes you the obvious choice for the right client and invisible to the wrong one",
          ],
        },
      },
      {
        id: "4-2", moduleId: "module-4", title: "Your digital presence — website vs social vs both", duration: "12 min", format: "Camera + Screen", videoUrl: null,
        notes: {
          intro: [
            "You don't need a website to start a business. You need clients. The mistake most new founders make is spending the first two weeks building a website instead of the first two weeks building pipeline. A website is a long-term asset; a client is immediate validation and revenue. Do the outreach first.",
            "That said, a basic web presence is necessary within your first month for credibility. When you reach out to potential clients, they will search for you. What they find — or don't find — affects whether they respond. A simple one-page site with your value proposition, what you do, who you've helped (even informally), and a contact method is better than nothing. It doesn't need to be beautiful. It needs to be real.",
            "Social media: the platform that matters depends entirely on where your target customers spend time. LinkedIn is the default for B2B service businesses. Instagram works for visual products and consumer-facing brands. TikTok works if your content format fits short video and your audience is there. Pick one and be consistent on it before adding more. One well-maintained platform is better than five neglected ones.",
            "The question isn't website or social — it's what combination builds the most trust with your specific customer the fastest. For most service businesses starting out: send an outreach message that links to a simple website and an active LinkedIn profile. That combination is enough to establish credibility and get first meetings. Build from there.",
          ],
          takeaways: [
            "Do outreach before building a website — clients come first, infrastructure second",
            "A one-page site with your value prop and contact info is enough for early credibility",
            "Choose your social platform based on where your customers actually are, not where you like to be",
            "One consistent platform beats five neglected ones",
            "LinkedIn for B2B services, Instagram for visual/consumer brands — pick based on your customer profile",
            "Website + one active social platform is the minimum credible digital presence for most businesses",
          ],
        },
      },
      {
        id: "4-3", moduleId: "module-4", title: "Your first piece of content that brings customers in", duration: "12 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "Content marketing is a long game that pays compounding returns. One piece of genuinely useful content — a video, an article, a guide — can bring inbound leads for months or years. But 'content' is a broad word that gets used to justify a lot of activity that produces no results. The question is not 'should I make content?' The question is 'what piece of content would make my target customer trust me enough to reach out?'",
            "The highest-value content answers a question your customer is already asking. Not a question you want to answer, but a question they're actively searching for, talking about, or struggling with. Your customer profile work from Lesson 1-2 tells you what those questions are. A single detailed, honest answer to one of those questions — published where your customers will find it — is more valuable than fifty generic posts.",
            "For service businesses: a case study or before/after story about a problem you solved (even informally, before you had formal clients) is your most powerful first piece of content. It demonstrates competence, shows a real outcome, and is specific enough to attract the right audience. 'I helped my neighbor's restaurant reduce food waste by 30% with a simple inventory system' — if that's your niche, that story is your content.",
            "Format and platform: video performs well because it builds trust faster than text. Written content ranks in search if it's detailed and specific. Short-form social content builds awareness but rarely drives direct action. For a new business, I'd focus first on one piece of longer-form content (a detailed post, a case study, a short video explaining something specific) that demonstrates expertise rather than broadcasting. Show, don't just tell.",
          ],
          takeaways: [
            "Content that answers a question your customer is already asking is worth 10x generic content",
            "Your customer profile work tells you what those questions are — start there",
            "A case study or before/after story is the most credibility-building first piece of content for services",
            "Video builds trust faster than text; long-form content ranks better in search than short posts",
            "One excellent, specific piece of content beats ten vague ones",
            "The goal of early content is to make the right person trust you enough to reach out — not to go viral",
          ],
        },
      },
    ],
  },
  {
    id: "module-5", num: "05", title: "Building & Delivering the Offer",
    lessons: [
      {
        id: "5-1", moduleId: "module-5", title: "Defining exactly what you sell and how you deliver it", duration: "10 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "An offer is not 'I do marketing' or 'I build websites.' An offer is a specific promise to a specific person with a specific outcome and a specific price. Vague offers don't close. People can't buy something they can't picture receiving.",
            "The anatomy of a clear offer: who it's for (your specific customer), what problem it solves (specifically, in their language), what they get (the deliverable or outcome, not the process), how long it takes, and what it costs. You should be able to state your offer in two sentences. If you can't, it isn't clear enough to sell.",
            "How you deliver matters as much as what you deliver. A client who feels informed, respected, and updated throughout the process will refer you. A client who gets a great outcome but felt ignored during the process won't. Design your delivery process: when do you communicate, how, how often? What does the client need from you to feel confident the work is on track? Your delivery process is part of your offer, even if clients don't see it explicitly.",
            "Package your offer deliberately. 'I charge $150/hour' is not an offer — it's a rate. An offer is 'I'll audit your email list and give you a 10-point prioritized action plan for $500, delivered in five business days.' Same underlying service, but the second version creates a clear picture of what the client receives and when. Packaging produces higher close rates and easier pricing conversations.",
          ],
          takeaways: [
            "An offer is a specific promise with a specific outcome, not a general description of skills",
            "Anatomy: who it's for, what problem it solves, what they get, how long it takes, what it costs",
            "State your offer in two sentences — if you can't, it isn't clear enough",
            "Package your offer as a named deliverable with a fixed scope and price, not an hourly rate",
            "Your delivery process is part of your offer — communication frequency affects client satisfaction as much as outcomes",
          ],
        },
      },
      {
        id: "5-2", moduleId: "module-5", title: "Your first deliverable — building it regardless of type", duration: "12 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "This lesson walks through how to actually build your first deliverable — whatever type of business you're running. The principles apply whether you're delivering a consulting report, a website, a physical product prototype, or a digital download.",
            "Start with the minimum version that delivers the core value. Not the minimum you can get away with — the minimum that genuinely solves the customer's problem. Everything beyond that is a future version. The temptation to over-build before the first delivery is how projects take six months when they should take two weeks.",
            "For service deliverables: document your process as you work. Not for the client necessarily — for you. The notes you take on project one become the process documentation that makes project two twice as fast. By project five, you have a repeatable system. This is how a service business begins to scale without working more hours.",
            "For digital products: build the real first draft and get one person to consume it and give you feedback before you finalize anything. One person who goes through your course, uses your template, or reads your guide and tells you honestly what was confusing or missing is worth more than any amount of internal review. Build fast, get feedback, revise, ship.",
          ],
          takeaways: [
            "Build the minimum version that genuinely solves the problem — not the minimum you can get away with",
            "Resist over-building before delivery; everything beyond the core value is a future version",
            "Document your service process as you go — your notes become your repeatable system",
            "For digital products: get one real person to consume the draft and give honest feedback before finalizing",
            "Speed of first delivery matters — shipping and learning beats perfecting in isolation",
          ],
        },
      },
      {
        id: "5-3", moduleId: "module-5", title: "Overdelivering early — reputation as a growth engine", duration: "9 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Your first five clients are the most important people in your business. Not because of what they pay you, but because of what they tell other people. Word-of-mouth is the highest-converting, lowest-cost customer acquisition channel that exists. It's also the one you build in Lessons 1–3 with great work and then activate in Lesson 7-2 with a deliberate referral system.",
            "Overdelivering doesn't mean giving away more than you promised. It means doing a few specific things that create a memorable experience: responding faster than expected, including one element of value they didn't expect, being proactive about communicating status, and following up after delivery to check that the outcome landed. None of these cost significant time. All of them create clients who become advocates.",
            "The trap to avoid: over-delivering on scope instead of on experience. Scope creep — doing more than you agreed to because it felt like the right thing — devalues your work, trains clients to expect extras, and is unsustainable. Over-deliver on the experience of working with you, not on the quantity of what you deliver.",
            "Ask for reviews and referrals. Not awkwardly or with a template — directly and specifically. 'If you found this useful, I'd really appreciate a short review on [platform]' or 'Is there anyone you know who might benefit from this kind of help?' Most happy clients don't volunteer this without being asked. The ask is the difference between a satisfied client and a referral source.",
          ],
          takeaways: [
            "Your first five clients determine your word-of-mouth reputation — treat them accordingly",
            "Over-deliver on experience (communication, follow-up, unexpected value), not on scope",
            "Scope creep devalues your work and creates unsustainable expectations — hold your boundaries",
            "Always follow up after delivery to confirm the outcome landed as expected",
            "Ask directly for reviews and referrals — most happy clients won't volunteer without being asked",
          ],
        },
      },
    ],
  },
  {
    id: "module-6", num: "06", title: "Getting Your First Customer",
    lessons: [
      {
        id: "6-1", moduleId: "module-6", title: "Warm outreach — using who you already know", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Your first client is almost certainly someone you already know, or someone a degree of separation away. Not because warm outreach is a compromise — because it's the highest-probability path to a first engagement. Trust is the bottleneck in every sales process. Warm relationships already have trust. Cold outreach has to build it from scratch.",
            "The warm outreach framework: make a list of 20–30 people in your existing network who could either use your service directly or know someone who does. These are former colleagues, classmates, mentors, community connections, family contacts, and former clients if you have them. Don't pre-filter heavily — the goal is a long list you then work through systematically.",
            "The message: short, direct, and personal. Not a pitch — an opening. Tell them what you're building, ask if they know anyone who might benefit, and make it easy to say yes without obligation. 'I just launched [business name] and I'm specifically helping [customer type] with [problem]. Do you know anyone who might be dealing with this? Happy to have a quick call to see if I can help them.' This approach respects their time and gives them a low-friction way to help.",
            "Don't skip this step because you want to build something that 'doesn't depend on who you know.' That's a long-term goal, not a first-client strategy. Use your network to get momentum, then build the systems in Module 6 and Module 7 that generate inbound leads independently.",
          ],
          takeaways: [
            "Your first client is likely in your existing network — start there, not with strangers",
            "Make a list of 20–30 contacts who could benefit or refer; don't pre-filter heavily",
            "Your message should open a conversation, not close a sale — short, direct, and personal",
            "Ask if they know someone, not if they want to buy — reduces pressure, increases response rate",
            "Warm outreach gets your first momentum; the systems in later modules make you independent of it",
          ],
        },
      },
      {
        id: "6-2", moduleId: "module-6", title: "Cold outreach that actually works", duration: "14 min", format: "Camera + Screen", videoUrl: null,
        notes: {
          intro: [
            "Cold outreach — reaching out to people who don't know you — is one of the most underused tools in early-stage businesses because people associate it with spam and rejection. Done badly, it is both. Done well, it's the fastest way to put your offer in front of exactly the right people without waiting for inbound leads to develop.",
            "The reason most cold outreach fails: it's about the sender, not the recipient. 'I offer X, here's my pricing, let me know if you're interested' is a message about you. A message that leads with their problem, demonstrates that you've done research, and proposes a specific and relevant next step is a message about them. The first one gets ignored. The second one gets replies.",
            "The Cold Outreach script templates in your resource pack include three versions: one for service businesses, one for product businesses, and one for general inquiry when you're not sure of the right angle. Each follows the same structure: observation about them specifically, problem they likely have, what you offer, and a low-commitment next step (a short call, not an immediate purchase commitment). Personalization — even one or two specific details about the recipient's situation — dramatically increases reply rates.",
            "Volume and follow-up: most replies come from the second or third message, not the first. A sequence of three messages over two weeks (initial outreach, one follow-up acknowledging no response and restating the value, a brief closing note) outperforms a single message by a significant margin. Use the templates as a starting point and test your own language. Track what gets replies and adjust.",
          ],
          takeaways: [
            "Good cold outreach is about the recipient — their problem, their situation — not your offer",
            "Research one or two specific details about each person before writing — personalization drives replies",
            "Use the Cold Outreach scripts from your resource pack as a starting framework, then adapt",
            "Three-message sequences (initial + two follow-ups over 2 weeks) significantly outperform one-shot messages",
            "A low-commitment call-to-action (short call, not immediate purchase) gets more responses",
            "Track what gets replies and adjust your messaging based on actual data, not assumptions",
          ],
        },
      },
      {
        id: "6-3", moduleId: "module-6", title: "The first sales conversation — what to say and when", duration: "12 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "The goal of a sales conversation is not to pitch. It's to listen. The more you understand about the prospect's specific situation — what they're struggling with, what they've tried, what success looks like to them — the more precisely you can position what you offer as the solution to their specific problem. Listening is the first and most important sales skill.",
            "Structure of an effective sales call: spend the first 10–15 minutes asking questions and genuinely understanding their situation. Then briefly present how you've helped similar people with the same problem. Then present your offer with pricing. Then stop talking and let them respond. Most salespeople who fail do so because they talk too much — especially after presenting price — and talk prospects out of deals they would have closed with silence.",
            "The questions that matter most: What are you currently doing about this problem? What's working and what isn't? What would a successful outcome look like in 6 months? What's the cost of not solving this? The last question is the most important. If the problem costs them $10,000/month in wasted time, your $2,000 service isn't expensive — it's a 5x ROI in the first month. Help them see that math.",
            "When they raise objections — price, timing, needing to think about it — treat them as questions, not rejections. 'The price feels high' often means 'I don't yet see the full value.' 'I need to think about it' often means 'I have a concern I haven't said yet.' Ask: 'What specifically would need to be true for this to feel like the right decision?' That question surfaces the real objection.",
          ],
          takeaways: [
            "The goal of the sales call is to listen and understand, not to pitch",
            "Ask: what are you currently doing, what's working, what would success look like, what does not solving this cost?",
            "Present your offer after understanding their situation — not as an opening",
            "After presenting price, stop talking and let them respond — silence is powerful",
            "Objections are usually unresolved questions; ask 'what would need to be true for this to feel right?'",
            "Help prospects see the ROI math — if the problem costs more than your solution, price is not the barrier",
          ],
        },
      },
      {
        id: "6-4", moduleId: "module-6", title: "Closing without being pushy", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Closing is the natural end of a good sales process, not a separate technique you apply at the end. If you've listened well, understood the problem, and presented an offer that genuinely fits their situation, the close is almost a formality. If you feel like you're having to 'close hard,' something earlier in the conversation went wrong.",
            "The simplest close: 'Does this feel like a good fit for what you're trying to accomplish?' Let them answer. If yes, 'Great — I can send over a contract and invoice today. Do you want to use card or bank transfer?' If they hesitate, 'What concerns do you have?' — then address those directly. There's no script that substitutes for genuine understanding of their situation.",
            "Follow-up for uncommitted prospects: if someone says they'll think about it, set a specific follow-up time in the conversation. 'I'll check back in on Thursday — does that work?' A vague 'I'll follow up' turns into waiting. A committed follow-up time keeps the conversation alive. Send a brief follow-up email the same day summarizing what you discussed and what the next step is.",
            "Not every prospect is the right client. Trying to close someone who isn't a fit — wrong budget, wrong problem, wrong timeline — creates bad client relationships and takes time away from finding the right ones. Know when to disqualify and do it graciously. 'Based on what you've described, I don't think I'm the right fit right now — here's who I'd suggest instead.' That kind of honesty is memorable and often comes back as a referral.",
          ],
          takeaways: [
            "Closing is the natural result of a good sales process — not a technique applied at the end",
            "The simplest close: 'Does this feel like a good fit?' then handle whatever comes next",
            "Always set a specific follow-up time before ending a call with an uncommitted prospect",
            "Send a same-day follow-up email summarizing the conversation and the next step",
            "Know when to disqualify — a bad fit client costs more than no client",
            "Honest referrals when you're not the right fit build long-term goodwill and future referrals back to you",
          ],
        },
      },
    ],
  },
  {
    id: "module-7", num: "07", title: "Running It, Growing & The Mental Side",
    lessons: [
      {
        id: "7-1", moduleId: "module-7", title: "The exact tool stack I run Purcell Ventures with", duration: "14 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "This lesson is a screen share of the actual tools I use to run Purcell Ventures — not a list of 50 options to consider, but the specific tools I've settled on and why. You don't need most tools people recommend. You need a small number of well-integrated tools that handle communication, project tracking, finance, and client management without requiring you to spend more time managing systems than running the business.",
            "Communication: email (Gmail with custom domain) for client communication, Notion for internal documentation and knowledge base, Slack if you have a team. For a solo operation, Gmail + Notion handles 90% of communication and documentation needs. Keep it simple.",
            "Finance: Mercury for business banking, Stripe for payments, Wave for bookkeeping and invoicing. These three tools handle all money movement and financial tracking at near-zero cost. Connect them so transactions flow automatically into Wave — reconcile monthly and you're done.",
            "Client management: HoneyBook for proposals, contracts, and invoicing for service businesses. Notion can handle a simple CRM for a small client list. Calendly for scheduling discovery calls. The goal is to remove all friction from the client experience — they should be able to book a call, receive a proposal, sign a contract, and pay in a single continuous flow without you having to coordinate each step manually.",
          ],
          takeaways: [
            "A small set of well-integrated tools beats a large set of underused ones",
            "Core stack: Gmail (custom domain) + Notion + Mercury + Stripe + Wave + HoneyBook + Calendly",
            "Connect your financial tools so transactions flow automatically — minimize manual data entry",
            "Your client experience should be frictionless from first contact to signed contract to payment",
            "Add tools only when a specific problem requires them, not in anticipation of problems",
            "Review your tool stack every 6 months — consolidate anything you're paying for but not using",
          ],
        },
      },
      {
        id: "7-2", moduleId: "module-7", title: "Building a referral system from your first clients", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Word-of-mouth is the highest-converting customer acquisition channel you have. A referred prospect already has trust in you from the person who referred them — you're not starting from zero. But most businesses leave referrals to chance. A systematic approach to generating referrals turns your existing clients into an active source of new business instead of a passive one.",
            "The foundation is simple: deliver good work, then ask. Most clients who had a positive experience are willing to refer but don't think to do it unprompted. The ask should be specific and low-friction: 'Is there anyone in your network who's dealing with a similar challenge? I'd love an introduction.' Specific and personal outperforms 'if you know anyone...' which is easy to mentally file away and forget.",
            "Timing the ask: the best moment to ask for a referral is at the peak of client satisfaction — usually at or immediately after successful delivery, not weeks later. Set a reminder for yourself to make the referral ask at project completion. Include it in your delivery process as a standard step, not an afterthought.",
            "For ongoing client relationships, consider a simple referral program: a discount on a future service, a small gift, or a contribution to a cause they care about in exchange for a successful referral introduction. This doesn't need to be elaborate. Even acknowledging and thanking someone who sends a referral — sincerely and promptly — increases the likelihood they'll do it again.",
          ],
          takeaways: [
            "Referred prospects already have trust — referrals convert at higher rates than any other channel",
            "Ask specifically: 'Is there anyone in your network dealing with this?' not 'if you know anyone'",
            "Time the ask at peak satisfaction — immediately after successful delivery",
            "Build the referral ask into your delivery process as a standard step",
            "Acknowledge and thank referral sources promptly — it reinforces the behavior",
            "A simple referral incentive (discount, small gift) can meaningfully increase referral frequency",
          ],
        },
      },
      {
        id: "7-3", moduleId: "module-7", title: "Your first hire vs your first automation", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "At some point, the business produces more work than you can do alone. The question is: do you hire a person, or do you automate? The answer depends on what kind of work is piling up. Repetitive, rules-based tasks should be automated. Tasks requiring judgment, creativity, or relationship management usually require a person.",
            "Before hiring anyone, document the role you're trying to fill. What exactly would this person do, for how many hours per week, and what outcomes would define success? Hiring without clarity produces bad hires that cost more to fix than they would have cost to prevent. The documentation process often reveals that the work can be automated or systematized rather than hired for.",
            "Your first hire is usually a contractor, not an employee. Contractors are faster to hire, easier to adjust or part ways with, and don't require payroll infrastructure. Use platforms like Contra, Toptal, or Upwork to find specialized help for specific projects. Convert to a full-time role only when the work is consistent, the person is excellent, and the business can sustain the predictable overhead.",
            "Automation options for common tasks: Zapier connects apps and automates workflows (client intake form → contract → calendar invite — all automatic). Make (formerly Integromat) handles more complex workflows. AI tools are increasingly capable of first drafts, data processing, and routine communication. Audit your week every quarter and identify the tasks you did most often that required the least judgment — those are automation candidates.",
          ],
          takeaways: [
            "Automate repetitive, rules-based tasks; hire people for judgment, creativity, and relationships",
            "Document the role before hiring — the process often reveals alternatives to hiring",
            "Start with contractors, not employees — faster to engage, easier to adjust",
            "Zapier and Make can automate multi-step workflows without code — review your intake and follow-up processes first",
            "Audit your weekly tasks quarterly and identify what you did most that required the least judgment",
            "Convert a contractor to full-time only when the work is consistent, the person is proven, and the business can sustain it",
          ],
        },
      },
      {
        id: "7-4", moduleId: "module-7", title: "The founder mindset — fear, imposter syndrome, and what keeps you going", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Everything in this course has been practical and tactical. This lesson is different. I want to talk about what it actually feels like to build something — because nobody tells you in advance, and it matters as much as anything else we've covered.",
            "Starting a business feels like confidence from the outside and mostly fear from the inside. Fear of being wrong about the idea. Fear of looking foolish in front of people who said it wouldn't work. Fear of the first conversation, the first contract, the first time something goes badly. This is normal. Everyone who has ever built anything felt this. The difference between people who start and people who don't isn't the absence of fear — it's the decision to move anyway.",
            "Imposter syndrome — the feeling that you're not qualified to do this, that you're pretending, that someone will eventually discover you don't actually know what you're doing — is nearly universal among founders, especially young ones. The antidote isn't more credentials or more experience. It's action. You start to feel legitimate when you have legitimate clients, legitimate results, and a legitimate track record. That track record only comes from doing the work before you feel ready.",
            "The things that keep founders going through the hard periods: a clear sense of why they're doing it that's bigger than money, a community of people who understand what this is like, and a realistic assessment of what's actually happening versus what they fear is happening. I am a Christian, and my faith is a genuine anchor for me in this — the conviction that what I'm building has a purpose beyond profit, and that the work itself is worth doing regardless of the outcome. Whatever your foundation, know what it is. You'll need it.",
          ],
          takeaways: [
            "Fear is normal — the difference is moving anyway, not feeling differently",
            "Imposter syndrome is cured by action, not by accumulating more credentials",
            "You start to feel legitimate when you have a legitimate track record — and that only comes from doing the work before you feel ready",
            "Know why you're doing this beyond money — that clarity is what sustains you when the money is slow",
            "Find people who understand what building something is like — the isolation of early-stage business is real and underestimated",
            "Assess what's actually happening, not just what you fear is happening — they're usually very different",
          ],
        },
      },
    ],
  },
];

const ALL_LESSONS = MODULES.flatMap(m => m.lessons);

const LAMPSTAND = { cellStyle: "outlined" as const, pvSize: 70, pvClearR: 58, ringStart: 70, ringEnd: 116, numRings: 7, ringFadeToCenter: true };

// ─────────────────────────────────────────────────────────────────────────────

export default function BusinessLessonsPage() {
  const [gate, setGate]               = useState<GateState>("loading");
  const [codeInput, setCodeInput]     = useState("");
  const [codeError, setCodeError]     = useState(false);
  const [activeId, setActiveId]       = useState<string>("1-1");
  const [progress, setProgress]       = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pv_business_access");
    setGate(stored === VALID_CODE ? "unlocked" : "locked");
    setProgress(getProgress());
    const last = localStorage.getItem("pv_business_current");
    if (last && ALL_LESSONS.find(l => l.id === last)) setActiveId(last);
  }, []);

  function handleCode(e: React.FormEvent) {
    e.preventDefault();
    const val = codeInput.trim().toUpperCase();
    if (val === VALID_CODE) {
      localStorage.setItem("pv_business_access", val);
      setGate("unlocked");
    } else {
      setCodeError(true);
    }
  }

  function selectLesson(id: string) {
    setActiveId(id);
    saveCurrent(id);
    setSidebarOpen(false);
  }

  function handleComplete() {
    markDone(activeId);
    setProgress(getProgress());
  }

  const lesson     = ALL_LESSONS.find(l => l.id === activeId) ?? ALL_LESSONS[0];
  const lessonIdx  = ALL_LESSONS.indexOf(lesson);
  const mod        = MODULES.find(m => m.id === lesson.moduleId)!;
  const prevLesson = ALL_LESSONS[lessonIdx - 1] ?? null;
  const nextLesson = ALL_LESSONS[lessonIdx + 1] ?? null;
  const pct        = Math.round((progress.length / ALL_LESSONS.length) * 100);
  const done       = progress.includes(activeId);

  if (gate === "loading") return <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)" }} />;

  if (gate === "locked") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <PanopticonMark size={52} color="#d4af37" bg="var(--color-warm-bg)" cfg={LAMPSTAND} />
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "10px" }}>
            Access the Course
          </h1>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "32px", lineHeight: 1.65, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Enter the access code from your purchase confirmation email.
          </p>
          <form onSubmit={handleCode} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="ACCESS CODE"
              value={codeInput}
              onChange={e => { setCodeInput(e.target.value); setCodeError(false); }}
              style={{
                padding: "13px 16px", fontSize: "14px", letterSpacing: "0.12em", textAlign: "center", textTransform: "uppercase",
                background: "var(--color-warm-card)", border: `1px solid ${codeError ? "#e05c5c" : "var(--color-warm-border)"}`,
                borderRadius: 6, color: "var(--color-warm-text)", outline: "none",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            />
            {codeError && (
              <p style={{ fontSize: "12px", color: "#e05c5c", margin: 0, fontFamily: "var(--font-inter), sans-serif" }}>
                That code isn't right — check your confirmation email.
              </p>
            )}
            <button type="submit" style={{
              padding: "13px", fontSize: "14px", fontWeight: 700,
              background: "var(--color-warm-accent)", color: "var(--color-warm-bg)",
              border: "none", borderRadius: 6, cursor: "pointer",
              fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.06em",
            }}>
              Enter →
            </button>
          </form>
          <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", marginTop: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
            No code? <a href="mailto:elijah@purcell-ventures.com" style={{ color: "var(--color-warm-accent)" }}>elijah@purcell-ventures.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--color-warm-bg)", overflow: "hidden" }}>
      <style>{`
        .bl-lesson-sidebar { display: flex; }
        .bl-lesson-hamburger { display: none; }
        @media (max-width: 767px) {
          .bl-lesson-sidebar { display: ${sidebarOpen ? "flex" : "none"}; position: fixed; inset: 0; z-index: 200; width: 100%; }
          .bl-lesson-hamburger { display: flex; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid var(--color-warm-border)", flexShrink: 0, background: "var(--color-warm-bg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button className="bl-lesson-hamburger" onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-warm-text)", padding: "4px", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <Link href="/courses" style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textDecoration: "none", fontFamily: "var(--font-inter), sans-serif" }}>
            ← Courses
          </Link>
          <span style={{ fontSize: "12px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-inter), sans-serif" }}>Business Launch Playbook</span>
        </div>
        <div style={{ fontSize: "12px", color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 600 }}>
          {pct}% complete
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar */}
        <aside className="bl-lesson-sidebar" style={{ width: 260, flexDirection: "column", borderRight: "1px solid var(--color-warm-border)", overflowY: "auto", flexShrink: 0, background: "var(--color-warm-bg)" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>COURSE MENU</span>
            <button className="bl-lesson-hamburger" onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-warm-text-muted)", alignItems: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-warm-border)" }}>
            <div style={{ height: 3, background: "var(--color-warm-border)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "var(--color-warm-accent)", transition: "width 0.3s" }} />
            </div>
          </div>

          {MODULES.map(m => (
            <div key={m.id}>
              <div style={{ padding: "12px 16px 6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-warm-text-light)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                MODULE {m.num} · {m.title}
              </div>
              {m.lessons.map(l => {
                const isActive = l.id === activeId;
                const isDone   = progress.includes(l.id);
                return (
                  <button key={l.id} onClick={() => selectLesson(l.id)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                    padding: "9px 16px", background: isActive ? "var(--color-warm-card)" : "none",
                    borderLeft: `2px solid ${isActive ? "var(--color-warm-accent)" : "transparent"}`,
                    border: "none", borderRight: "none", borderTop: "none", borderBottom: "none",
                    cursor: "pointer", textAlign: "left",
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: isDone ? "var(--color-warm-accent)" : isActive ? "transparent" : "var(--color-warm-border)",
                      border: isActive && !isDone ? `1.5px solid var(--color-warm-accent)` : "none",
                    }} />
                    <span style={{ fontSize: "12px", color: isActive ? "var(--color-warm-text)" : "var(--color-warm-text-muted)", lineHeight: 1.4, flex: 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      {l.title}
                    </span>
                    <span style={{ fontSize: "10px", color: "var(--color-warm-text-light)", flexShrink: 0, fontFamily: "var(--font-inter), sans-serif" }}>
                      {l.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
          <div style={{ maxWidth: "760px" }}>

            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "24px", fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
              <span>MODULE {mod.num}</span>
              <span>·</span>
              <span style={{ color: "var(--color-warm-text)" }}>{lesson.title}</span>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 20, color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {mod.title}
                </span>
                <span style={{ fontSize: "10px", padding: "3px 10px", border: "1px solid var(--color-warm-border)", borderRadius: 20, color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {lesson.format}
                </span>
                <span style={{ fontSize: "10px", padding: "3px 10px", border: "1px solid var(--color-warm-border)", borderRadius: 20, color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {lesson.duration}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--color-warm-text)", lineHeight: 1.2 }}>
                {lesson.title}
              </h1>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <VideoEmbed url={lesson.videoUrl} title={lesson.title} />
            </div>

            <div style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "36px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
                Lesson Notes
              </div>
              <div style={{ marginBottom: "32px" }}>
                {lesson.notes.intro.map((p, i) => (
                  <p key={i} style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "16px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {p}
                  </p>
                ))}
              </div>

              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px", fontFamily: "var(--font-inter), sans-serif" }}>
                Key Takeaways
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                {lesson.notes.takeaways.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-warm-accent)", flexShrink: 0, marginTop: 8 }} />
                    <span style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.65, fontFamily: "var(--font-dm-sans), sans-serif" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => prevLesson && selectLesson(prevLesson.id)}
                disabled={!prevLesson}
                style={{ padding: "9px 18px", fontSize: "13px", fontWeight: 600, background: "none", border: "1px solid var(--color-warm-border)", borderRadius: 5, color: prevLesson ? "var(--color-warm-text-muted)" : "var(--color-warm-text-light)", cursor: prevLesson ? "pointer" : "not-allowed", fontFamily: "var(--font-inter), sans-serif" }}
              >
                ← Previous
              </button>

              <button
                onClick={handleComplete}
                disabled={done}
                style={{
                  padding: "9px 22px", fontSize: "13px", fontWeight: 700,
                  background: done ? "none" : "var(--color-warm-accent)",
                  color: done ? "var(--color-warm-accent)" : "var(--color-warm-bg)",
                  border: `1px solid var(--color-warm-accent)`,
                  borderRadius: 5, cursor: done ? "default" : "pointer",
                  fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.04em",
                }}
              >
                {done ? "✓ Completed" : "Mark Complete"}
              </button>

              <button
                onClick={() => nextLesson && selectLesson(nextLesson.id)}
                disabled={!nextLesson}
                style={{ padding: "9px 18px", fontSize: "13px", fontWeight: 600, background: "none", border: "1px solid var(--color-warm-border)", borderRadius: 5, color: nextLesson ? "var(--color-warm-text-muted)" : "var(--color-warm-text-light)", cursor: nextLesson ? "pointer" : "not-allowed", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Next Lesson →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
