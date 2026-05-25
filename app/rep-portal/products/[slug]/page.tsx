"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../../_components/PortalNav";

type Encyclopedia = {
  [slug: string]: {
    name: string;
    division: string;
    price: string;
    whoBuys: string[];
    whatItDoes: string;
    whyWeSell: string;
    pricing: string;
    customization: string;
    objections: { obj: string; resp: string }[];
    sayThis: string[];
    notThis: string[];
  };
};

/**
 * Product encyclopedia. v0.1 has Digital Starter fleshed out as the pattern.
 * Other entries are stubs — fill in over next workshop.
 */
const DATA: Encyclopedia = {
  "digital-starter": {
    name: "Digital Starter",
    division: "Digital Services",
    price: "$99/mo + $400 setup",
    whoBuys: [
      "Solo operators or 1–3 employee SMBs with no real online presence",
      "Plumbers, electricians, contractors who get leads by phone and lose half of them",
      "Salons / barbers / small service businesses with outdated Squarespace from 2019",
      "Anyone whose current 'website' is a Facebook page",
    ],
    whatItDoes:
      "Builds them a clean, mobile-responsive website + adds an AI chatbot that answers common questions 24/7 + a lead capture form that texts/emails them when someone fills it out. Hosted, maintained, updated for them — they don't touch the code.",
    whyWeSell:
      "Lowest-friction entry product. $99/mo recurring is a real income line once you stack a few. Setup of $400 covers our build time + first month. Most clients stay 12+ months because switching back to nothing is worse than keeping the $99/mo subscription. Easy upsell to Growth when they realize they need booking or email marketing.",
    pricing:
      "Standard: $400 setup + $99/mo. Pilot Partner: $280 setup + $69/mo locked 6 months, then $99/mo standard. Pilot Partner clients give: testimonial at month 2, case study rights, one referral intro within 6mo. Your commission: $100 flat per close (Closer+ only).",
    customization:
      "Domain transfer if they have one. AI chatbot trained on their FAQ + business hours + service list (~30 min config). Color palette matched to their existing brand if any. Lead form fields customized to their intake (gutter cleaning vs salon booking).",
    objections: [
      {
        obj: "I already have a website",
        resp: "Pull it up on your phone. If it's older than 2 years OR not mobile-responsive OR they admit they don't know how to update it — you have the pitch. 'Yours works. Mine works better, costs $99/mo, and you never touch it again.'",
      },
      {
        obj: "Why do I need a chatbot",
        resp: "'How many calls do you get after 6 PM that you don't answer?' Answer is always 'a lot.' Chatbot answers basic questions (hours, services, pricing range) so you don't lose those leads to silence.",
      },
      {
        obj: "$99/mo is steep",
        resp: "'What does losing one lead per month cost you?' For a plumber: $300-800 average job. For a contractor: $1000+. Site pays for itself with 1 saved lead per quarter.",
      },
      {
        obj: "Can I get a one-time build instead of monthly",
        resp: "'No — the value is the maintenance. One-time builds rot in 18 months. You'd hire someone again. $99/mo is the alternative to never thinking about your site.'",
      },
    ],
    sayThis: [
      "'Hosted, maintained, updated — you don't touch it.'",
      "'$99/mo is the price of never thinking about your website again.'",
      "'The chatbot answers calls you'd otherwise miss.'",
    ],
    notThis: [
      "'It'll make you rich' — overpromise. Stay specific.",
      "'It'll rank on Google' — SEO is a separate conversation; don't promise it as part of Starter.",
      "'I'll have it ready tomorrow' — setup is 5-7 business days. Set expectations honestly.",
    ],
  },

  "digital-growth": {
    name: "Digital Growth",
    division: "Digital Services",
    price: "$179/mo + $700 setup",
    whoBuys: [
      "3-10 employee local businesses with some existing lead flow but losing them to slow follow-up",
      "Salons / barbers taking bookings via call or DM (no online booking)",
      "Small contractors with an active customer base but no way to track quotes",
      "Restaurants getting Yelp / Google reviews but not actively managing them",
      "Service businesses (cleaning, landscaping, repair) where reviews + booking actually drive growth",
    ],
    whatItDoes:
      "Everything in Starter (site + chatbot + lead form) PLUS: online appointment booking (calendar with time slots + auto-confirmation emails), email newsletter (subscriber list + AI-written campaigns + scheduling), social media scheduler (write + schedule FB/IG with AI captions), review manager (Google + Yelp reviews in one dashboard with AI-drafted response suggestions), and a full lead capture pipeline that takes the form and feeds into a kanban board from 'New' to 'Closed'.",
    whyWeSell:
      "Growth is the real conversion product. Starter is the foothold; Growth is where clients actually feel the value because it solves the 'leads come in but we forget to follow up' problem. $179/mo recurring stacks fast — 5 Growth clients = $895/mo MRR. Upsell from Starter clients who outgrow it is the natural pipeline.",
    pricing:
      "Standard: $700 setup + $179/mo. Pilot Partner: $490 setup + $125/mo locked 6 months, then $179/mo standard. Your commission: $150 flat per close (Closer+ only).",
    customization:
      "Booking calendar integrated with their existing service menu + availability. Email templates matched to their brand. Social posts pull from their existing brand voice (you read their old posts + give the AI examples). Review responses tuned for their tone (formal vs casual).",
    objections: [
      {
        obj: "We use Calendly / Mailchimp / Buffer already",
        resp: "'How many tools is that? Three? Four? Growth replaces 5-6 tools for $179/mo. Most clients save more than that just consolidating.' Then ask what they currently pay for those tools — usually total $200-400/mo.",
      },
      {
        obj: "Our team isn't going to learn another system",
        resp: "'They don't have to. I manage it for them. The dashboard is for me; the bookings + emails just happen.' Frame yourself as the operator, not them.",
      },
      {
        obj: "Reviews are scary — we don't want them seen",
        resp: "'You don't have a choice — they're already public. The question is whether you respond well. AI-drafted responses mean you respond to every one without it being a 2-hour task.'",
      },
      {
        obj: "We don't post on social",
        resp: "'You should be — your customers do. AI-scheduled posts mean you don't have to think about it. Set up once, posts go out for a month, you tweak before the next month.'",
      },
      {
        obj: "Can I just add booking to my current site?",
        resp: "'You can — but the whole point of Growth is that everything talks to each other. Booking creates a customer record. Customer record triggers an email. Email leads to a review request. Standalone tools don't do that without you stitching them.'",
      },
    ],
    sayThis: [
      "'Growth replaces 5 tools for less than you're paying for 2.'",
      "'Your team doesn't learn new systems — I manage the dashboard.'",
      "'Bookings, emails, reviews, social — it all talks to each other.'",
    ],
    notThis: [
      "'It does email marketing better than ConvertKit' — don't make direct comparisons to specialist tools. The pitch is integration, not best-in-class anything.",
      "'You'll get 10x more leads' — never promise lead volume. The promise is leads STOP FALLING THROUGH.",
      "'I'll write all your posts personally' — AI writes them. You curate. Be honest about that.",
    ],
  },

  "digital-full": {
    name: "Digital Full",
    division: "Digital Services",
    price: "$279/mo + $1,000 setup",
    whoBuys: [
      "10-30 employee professional services firms (law, accounting, real estate teams, medical practices)",
      "Multi-location service businesses (3+ salons, 2+ restaurants, regional cleaning company)",
      "Anyone running their operations on 6 different tools that don't talk to each other",
      "Businesses where the OWNER is doing operations work that should be systematized",
    ],
    whatItDoes:
      "Everything in Growth PLUS: full CRM with estimating (build job quotes with line items, labor, materials, send as shareable links), online invoicing (with Stripe payment links — clients pay you faster), AI content generator (blog posts, product descriptions, bios on demand), SMS campaigns (broadcast texts for promotions), loyalty program (digital punch card with QR check-ins), and priority support (same-day response from me, not next-day).",
    whyWeSell:
      "Full is the high-margin product. $279/mo recurring is real money. These clients stay 18+ months because switching back means rebuilding 6 separate tools. The setup fee covers a real onboarding — usually 2-3 weeks of work configuring everything to their existing workflow. Senior reps closing 2-3 of these per month make this their bread and butter.",
    pricing:
      "Standard: $1,000 setup + $279/mo. Pilot Partner: $700 setup + $195/mo locked 6 months, then $279/mo standard. Your commission: $200 flat per close (Closer+ only).",
    customization:
      "CRM fields mapped to their existing intake forms / customer data. Estimating templates pre-loaded with their service catalog + pricing tiers. Invoice templates branded to match. SMS campaigns segmented by customer type. Loyalty rewards tuned to their business model. Priority support = direct text to Elijah.",
    objections: [
      {
        obj: "We have HubSpot / Salesforce / [other CRM]",
        resp: "'Then you're paying $50-150 per user per month. For a 15-person team that's $750-2250/mo. Full is $279 total — and it does the CRM PLUS everything else.' Math wins this every time.",
      },
      {
        obj: "We need integrations with [their existing tool]",
        resp: "'Tell me which one — most common ones are already supported. If yours isn't, I'll build the integration for you as part of setup, no extra cost.' Then verify with Elijah before promising.",
      },
      {
        obj: "Setup fee is steep at $1,000",
        resp: "'Setup is 2-3 weeks of my time configuring this to YOUR workflow. Custom HubSpot implementation runs $5k-15k. $1,000 is below market because I built reusable templates.'",
      },
      {
        obj: "What if it breaks?",
        resp: "'Priority support — direct text to Elijah, same-day response. Most fixes are under 30 minutes. If something's down longer than 4 hours during business hours, I credit your next month.'",
      },
      {
        obj: "We're already overwhelmed — adding another tool sounds bad",
        resp: "'Full REPLACES tools, doesn't add. We'll do an audit during setup — most clients drop 4-6 paid subscriptions in the first month.'",
      },
    ],
    sayThis: [
      "'$279 replaces $750-2000+ in scattered subscriptions.'",
      "'Priority support means direct text to Elijah, same-day.'",
      "'Setup is 2-3 weeks of configuration to YOUR workflow — not generic.'",
    ],
    notThis: [
      "'It does X better than [enterprise tool]' — don't pick fights with category leaders. Pitch consolidation, not feature competition.",
      "'You'll never need another tool again' — false. You'll always need accounting software, payroll, etc. Promise integration, not replacement of everything.",
      "Custom Software promises — if they want something the platform doesn't do, that's a separate Custom Software quote. Don't bundle it into Full.",
    ],
  },

  "consulting-1on1": {
    name: "AI Consulting — 1-on-1",
    division: "AI Consulting",
    price: "$175/hr (2-hr minimum recommended)",
    whoBuys: [
      "Solo founders working through a specific AI problem",
      "Executives wanting personalized strategic AI guidance",
      "Operators with a particular workflow they want optimized",
      "Anyone wanting depth and personalization that group sessions can't deliver",
    ],
    whatItDoes:
      "Deep, flexible 2-hour minimum session — in-person (Metro Atlanta) or video. Agenda is entirely the client's: bring 1-3 specific problems and walk out with workflows you can run tomorrow. Includes pre-session intake call to learn their context + a follow-up email with action items.",
    whyWeSell:
      "Highest hourly rate in the consulting catalog. Best for clients who learn fastest 1-on-1 and don't want to wait for a group session. Often a gateway to ongoing engagement — 1-on-1 clients sometimes upgrade to monthly retainers (custom corporate). Senior reps make this their bread and butter alongside Workshops.",
    pricing:
      "$175/hr, 2-hour minimum. So $350 minimum session. Custom corporate retainer for ongoing engagement: quoted per scope. Your commission: 20% (Senior tier only).",
    customization:
      "Pre-call to scope the problem. Custom agenda based on what they want to tackle. Tools demoed are matched to their existing stack (Google Workspace user vs Microsoft 365 user vs not-sure-what-they-have). Optional follow-up office hours available at $100/hr.",
    objections: [
      {
        obj: "$175/hr is steep",
        resp: "'Compared to what?' Then list: traditional consultants run $300-500/hr for AI work right now. ChatGPT premium training-by-yourself is hours of self-directed learning at the cost of your time. $175/hr for 2 hours = $350 to solve the problem you've been avoiding for 6 months. 'How much time have you already spent NOT figuring this out?'",
      },
      {
        obj: "Can't you just give me a 30-min session?",
        resp: "'No — 30 min isn't enough to make a real change. We need 30 min to understand your context, 30 min to find the right tool, 30 min to set it up, 30 min to teach you to use it. That's why minimum is 2 hours.'",
      },
      {
        obj: "Why not just take your course?",
        resp: "'Course is great if you're a self-starter who'll actually complete it. Most people don't — completion rates on online courses are 10-15%. 1-on-1 has 100% completion because I'm in the room.'",
      },
      {
        obj: "Can you do it over Zoom?",
        resp: "'Yes — saves you travel time. Screen-share works fine for most AI training. I'll send a calendar link.'",
      },
    ],
    sayThis: [
      "'Two-hour minimum, your agenda, I come to you (or Zoom).'",
      "'$350 to solve the problem you've been avoiding for 6 months.'",
      "'I'll send a pre-call intake form so we don't waste hour one on discovery.'",
    ],
    notThis: [
      "'I'll save you X hours per week' — never promise specific time savings. Promise a workflow they can run, not a number.",
      "'It's like having a CTO' — overpromise. You're a consultant, not embedded staff.",
      "'I'll write your AI strategy' — strategy work is Corporate / Custom, not 1-on-1. Don't bundle.",
    ],
  },

  "custom-software": {
    name: "Custom Software",
    division: "Custom Software",
    price: "$1,500–$15,000+ per project · Senior reps only · ALWAYS escalate to Elijah",
    whoBuys: [
      "Founders who tried no-code (Bubble, Airtable, Zapier) and outgrew the limitations",
      "Operations teams with a critical workflow stuck in Excel that's costing real money in manual time",
      "Businesses with a workflow costing >$1,000/month in human hours that could be automated",
      "Companies needing an internal tool that exists nowhere on the market",
    ],
    whatItDoes:
      "Bespoke software — web apps, mobile apps, automation scripts, AI integrations, internal tools. Scoped per problem. Includes discovery, design, build, testing, and launch. Maintenance optional under retainer.",
    whyWeSell:
      "Highest single-deal value across all of PV. A small custom project covers months of subscription revenue in one deal. Senior reps closing 1-2 of these per quarter make this their highest-leverage activity. CRITICAL: requires Elijah on the call before any commitment because scoping wrong costs us money. Rep brings the prospect to the door, Elijah scopes, rep closes.",
    pricing:
      "Small projects (scripts, simple tools, single-feature apps): $1,500-3,500. Full applications (multi-feature, mobile + web, AI integrations): $5,000-15,000. Custom retainer for ongoing engagement: quoted per scope. Your commission: 15% (Senior tier only). HARD RULE: never quote without Elijah on the call.",
    customization:
      "Every project is custom by definition. Standard process: 30-min discovery (rep + Elijah + prospect), written scope document within 7 days, 50% deposit to start, milestones every 2 weeks, balance on launch. Code + IP transferred to client; PV retains right to reference work as case study (anonymous if requested).",
    objections: [
      {
        obj: "Why not just use [no-code tool]?",
        resp: "'If no-code works for you, use it — I'll tell you that on the call. We come in when you've hit the wall: speed issues, data structure can't represent your workflow, integration that's not supported, custom logic that doesn't fit. That's when custom makes sense.'",
      },
      {
        obj: "How long will it take?",
        resp: "'Don't know yet. That's the discovery call. Small projects ship in 2-4 weeks. Full apps run 6-12 weeks. We give you a written timeline with milestones before any deposit.'",
      },
      {
        obj: "What if I don't like the result?",
        resp: "'Milestones every 2 weeks with sign-off. You can pause or kill the project at any milestone — you only pay for completed work. We don't ghost projects and we don't deliver something you didn't sign off on at each stage.'",
      },
      {
        obj: "Why not hire a freelancer on Upwork for $30/hr?",
        resp: "'You can. The cost there isn't the hourly rate — it's the time you'll spend managing them, fixing what they don't understand, and rebuilding when they disappear. Our $5k full app is the all-in cost. Their $30/hr quotes are the start of the conversation.'",
      },
      {
        obj: "Can I just talk to Elijah directly?",
        resp: "'Yes — that's exactly what happens on the discovery call. You and Elijah scope the work; I'm in the room to make sure the contract terms get signed and we don't lose 3 weeks to email back-and-forth.'",
      },
    ],
    sayThis: [
      "'Let me set up a 30-min discovery call with Elijah this week. No commitment.'",
      "'Sign-off at every milestone. You can pause or stop anytime.'",
      "'Code and IP transfer to you on completion.'",
    ],
    notThis: [
      "'I can quote it' — NEVER. Always escalate.",
      "'It'll be cheaper than [agency]' — don't price-compete; the value is the relationship + reliability.",
      "'I can do it for [number]' — even speculative numbers anchor the negotiation. Defer to Elijah every time.",
    ],
  },

  "courses": {
    name: "Courses",
    division: "Courses",
    price: "$297–$2,997",
    whoBuys: [
      "Self-starters who want to learn AI / business / college applications at their own pace",
      "Parents wanting their high school senior to take the College Apps course",
      "Aspiring small business owners taking Business Launch",
      "Operators wanting the Zero to Automated playbook for AI automation",
      "Anyone who can't justify $175/hr consulting but wants the same knowledge in video form",
    ],
    whatItDoes:
      "Three pre-built on-demand video courses with lessons, worksheets, and templates. Self-paced. Access codes given on purchase. College Apps (17 lessons), Business Launch (26 lessons), Zero to Automated (25 lessons across 8 modules + optional coaching tier).",
    whyWeSell:
      "Lowest-friction entry product across all of PV. $297-397 self-paced courses are easy yeses for parents, aspiring entrepreneurs, students. Apprentice reps cut their teeth on Courses because the close is fast (under 1 conversation typically) and the commission compounds. Easy upsell path: course buyer → consulting client → digital subscription client.",
    pricing:
      "College Apps $297. Business Launch $397. Zero to Automated: $397 self-paced / $1,297 coaching tier (group calls) / $2,997 1-on-1 tier (private calls with Elijah). Your commission: 15% (Apprentice) or 20% (Closer+). Courses DO count toward Apprentice → Closer promotion (unlike Mantle).",
    customization:
      "None for the self-paced versions. Coaching tier adds 4 group calls. 1-on-1 tier adds 4 private calls with Elijah scheduled at the buyer's pace. All courses include lifetime access + future content updates.",
    objections: [
      {
        obj: "Is the content current?",
        resp: "'College Apps was last updated in 2026 for the current admissions cycle. Business Launch and Zero to Automated are continuously updated — lifetime access means you get every update for free. AI moves fast; if a lesson goes stale, it gets re-recorded.'",
      },
      {
        obj: "What if I don't finish it?",
        resp: "'Most people don't — that's the honest truth about self-paced courses. If you want accountability, the coaching tier on Zero to Automated has scheduled calls so you actually finish. $1,297 instead of $397 — but you'll finish.'",
      },
      {
        obj: "Why are these so much cheaper than coaching?",
        resp: "'Because you do the work. Self-paced is a fraction of the cost because you're not paying for my time. Coaching tier is mid-priced — group calls are leverage. 1-on-1 is full price because it's my calendar.'",
      },
      {
        obj: "Can I get a refund?",
        resp: "'14-day refund if you've completed less than 20% of the course. After that, no refunds — courses are like books, not subscriptions.'",
      },
      {
        obj: "Can I share it with my spouse / kid?",
        resp: "'One access code per buyer. If you want it for the whole household, buy a second seat — we'll do 30% off the second one if you tell me at purchase.'",
      },
    ],
    sayThis: [
      "'Self-paced version is $297-397. Lifetime access. You watch on your schedule.'",
      "'Coaching tier on Zero to Automated solves the finishing problem.'",
      "'Try it for 14 days. If you've watched less than 20% and want out, full refund.'",
    ],
    notThis: [
      "'It'll change your life' — set realistic expectations. Courses help committed people; they don't force action.",
      "'You'll finish in a week' — depends on the person. Most take 4-8 weeks of casual pace.",
      "'Coaching tier guarantees results' — coaching helps; it doesn't guarantee. Don't promise outcomes.",
    ],
  },

  "consulting-workshop": {
    name: "AI Consulting — Workshop",
    division: "AI Consulting",
    price: "$2,500 flat (up to 20 people, half-day)",
    whoBuys: [
      "10-50 employee professional services teams (accounting, legal, marketing, real estate, healthcare admin)",
      "Office managers who've been told by leadership 'figure out the AI thing'",
      "Department heads at companies where leadership wants the team trained but doesn't know how",
      "Companies that have done one-off AI lunch-and-learns and want something hands-on",
    ],
    whatItDoes:
      "Half-day (3-4 hour) hands-on training session at THEIR location, for up to 20 people. Five standard session types: AI Basics for Business, ChatGPT in Your Workflow, AI for Marketing & Social Media, Automating Your Business, or Custom Team Training. Includes setup, demos, hands-on exercises, and a takeaway resource guide. Everyone leaves with 2-3 specific workflows they can run on Monday.",
    whyWeSell:
      "Workshop is the high-leverage entry into corporate consulting. $2,500 flat is a no-decision-needed budget for a 30-person company. Once leadership sees workshop quality, custom corporate work follows ($5k-20k engagements). Sells itself when an existing client refers — workshop quality is talked about. Also: it forces Elijah to teach, which makes him sharper at the consulting work.",
    pricing:
      "$2,500 flat for up to 20 attendees, half-day. For teams of 20+ people: Corporate / Custom quote (typically $4,000-8,000 for full-day). Your commission: 20% (Senior tier only).",
    customization:
      "Pre-call to learn their team's current AI exposure + 3-5 specific problems they want addressed. Session content tuned to their industry (accounting examples vs marketing examples vs legal examples). Take-away guide branded to their company. Optional follow-up office hours add-on at $100/hr.",
    objections: [
      {
        obj: "$2,500 is a lot — can you do it cheaper for our small team?",
        resp: "'No — but if you have fewer than 8 people, Small Group at $125/person ($1,000 for 8) gets you the same depth in a smaller format. Workshop is priced for the room, not per-person.'",
      },
      {
        obj: "We've done ChatGPT training before",
        resp: "'How long ago? AI moves in 6-month cycles. The training from a year ago is obsolete. Most teams I work with come in thinking they know ChatGPT and leave realizing they were using 10% of it.'",
      },
      {
        obj: "Can you just send us a recorded course?",
        resp: "'I sell that too — Zero to Automated, $397. But it's self-paced and the completion rate on async courses is ~15%. Workshop has 100% completion because everyone's in the room. If retention matters, do the workshop.'",
      },
      {
        obj: "What if the team doesn't engage?",
        resp: "'Hands-on exercises every 20 minutes — they can't passively check out. Leadership in the room matters too. If the boss is using their laptop for email, the team will too. Set the expectation that this is a working session, not a lecture.'",
      },
      {
        obj: "Can you come back monthly?",
        resp: "'Yes — but that's Corporate / Custom pricing, not Workshop. We'd quote a multi-session program — usually $1,500-2,500 per follow-up session depending on scope.' Escalate to Elijah for the quote.",
      },
    ],
    sayThis: [
      "'Half-day, hands-on, up to 20 people, $2,500 flat. Everyone leaves with 2-3 workflows they can run Monday.'",
      "'I come to you — your office, your team, your context.'",
      "'AI moves in 6-month cycles. If your last training was 12 months ago, your team is behind.'",
    ],
    notThis: [
      "'I can do this remotely for less' — workshop is in-person by design. Remote = Small Group ($125/person) or 1-on-1 ($175/hr).",
      "'You'll save $X per year' — don't promise ROI numbers you can't back. Pitch is 'your team uses AI well,' not 'you save 30%.'",
      "'I'll write your prompts for you' — you TEACH them to write prompts. Don't become their AI dependency.",
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const entry = DATA[slug];

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5 }}>
        <PortalNav />
        <main style={{ maxWidth: "880px", margin: "0 auto", padding: "60px 36px 96px" }}>

          <Link href="/rep-portal/products" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            ← All products
          </Link>

          {!entry && (
            <div style={{ marginTop: "60px", textAlign: "center" }}>
              <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "32px", color: "var(--color-warm-text)" }}>
                Entry not built yet
              </h1>
              <p style={{ color: "var(--color-warm-text-muted)", margin: "16px auto", maxWidth: "560px", lineHeight: 1.6 }}>
                Encyclopedia content for <code style={{ background: "var(--color-warm-bg-alt)", padding: "2px 6px", color: "var(--color-warm-accent)" }}>{slug}</code> is being written. For now check the <Link href="/rep-portal/pricing" style={{ color: "var(--color-warm-accent)" }}>pricing reference</Link> or text Elijah at (770) 280-5319.
              </p>
            </div>
          )}

          {entry && (
            <>
              <header className="pv-page-head" style={{ marginTop: "16px" }}>
                <div className="pv-mono-label">{entry.division}</div>
                <h1>{entry.name}</h1>
                <p className="deck">{entry.price}</p>
              </header>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginBottom: "16px", fontWeight: 600 }}>Who buys it</h2>
                <ul style={{ paddingLeft: "20px", lineHeight: 1.8, color: "var(--color-warm-text)" }}>
                  {entry.whoBuys.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </section>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginBottom: "16px", fontWeight: 600 }}>What it does</h2>
                <p style={{ lineHeight: 1.7, color: "var(--color-warm-text)" }}>{entry.whatItDoes}</p>
              </section>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginBottom: "16px", fontWeight: 600 }}>Why we sell it</h2>
                <p style={{ lineHeight: 1.7, color: "var(--color-warm-text)" }}>{entry.whyWeSell}</p>
              </section>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginBottom: "16px", fontWeight: 600 }}>Pricing + your commission</h2>
                <p style={{ lineHeight: 1.7, color: "var(--color-warm-text)" }}>{entry.pricing}</p>
              </section>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginBottom: "16px", fontWeight: 600 }}>Customization</h2>
                <p style={{ lineHeight: 1.7, color: "var(--color-warm-text)" }}>{entry.customization}</p>
              </section>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-accent)", marginBottom: "16px", fontWeight: 600 }}>Common objections + scripted responses</h2>
                {entry.objections.map((o, i) => (
                  <div key={i} style={{ marginBottom: "20px", padding: "16px 18px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)" }}>
                    <div style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--color-warm-text)", fontWeight: 600, marginBottom: "8px", fontSize: "15px" }}>&ldquo;{o.obj}&rdquo;</div>
                    <p style={{ margin: 0, color: "var(--color-warm-text-muted)", lineHeight: 1.6, fontSize: "14px" }}>{o.resp}</p>
                  </div>
                ))}
              </section>

              <section style={{ marginBottom: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ padding: "20px", background: "rgba(122, 170, 106, 0.08)", border: "1px solid #7aaa6a" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7aaa6a", margin: "0 0 12px" }}>Say this</h3>
                  <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.8, color: "var(--color-warm-text)", fontSize: "14px" }}>
                    {entry.sayThis.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div style={{ padding: "20px", background: "rgba(229, 74, 40, 0.08)", border: "1px solid #e54a28" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e54a28", margin: "0 0 12px" }}>Not this</h3>
                  <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.8, color: "var(--color-warm-text)", fontSize: "14px" }}>
                    {entry.notThis.map((n, i) => <li key={i}>{n}</li>)}
                  </ul>
                </div>
              </section>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
