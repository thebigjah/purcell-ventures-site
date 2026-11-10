/**
 * Written guides for the free tool pages with the most search demand. A tool with a guide
 * gets its own title and description, a server-rendered how-to, an example, editing tips and
 * FAQs with matching FAQPage schema. A tool without a guide stays usable and linked from
 * /digital/tools but carries robots noindex,follow, because a bare form page with a hundred
 * words of text reads as thin content to search engines.
 *
 * Every string here renders on the page as written. No prices: services are quoted per
 * business, and only courses and the shop show prices.
 */
import type { QA } from "@/app/components/FaqBlock";

export type ToolGuide = {
  /** Page title before the root template adds ", Purcell Ventures". 40 characters or fewer. */
  title: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  /** The answer-first lede: what the tool makes and for whom, 35 to 55 words. */
  intro: string;
  steps: string[];
  examples: { label: string; input: string; output: string }[];
  tips: string[];
  avoid: string[];
  faqs: QA[];
};

export const TOOL_GUIDES: Record<string, ToolGuide> = {
  "review-response": {
    title: "Free AI review response generator",
    description:
      "Paste a Google, Yelp or Facebook review and get a calm reply that answers what the customer said. Free and no signup, with steps, an example and editing tips.",
    intro:
      "The review response generator writes a reply to any customer review you paste in. It suits owners of local businesses who answer their own Google, Yelp and Facebook reviews. It handles praise, mixed reviews and complaints, and it keeps replies to bad reviews short and calm.",
    steps: [
      "Type your business name the way customers know it.",
      "Paste the review with its star rating. The rating tells the tool which tone to use.",
      "Add the context the reviewer left out, such as the date of the job or what went wrong on your side. The field is optional, and it makes the reply far more specific.",
      "Run the tool, read the draft and change any line that does not sound like you.",
      "Post the reply from your own review account.",
    ],
    examples: [
      {
        label: "Example: a two-star review about a late arrival",
        input:
          "Review: \"2 stars. The tech showed up an hour late and nobody called. The repair itself was fine.\" Context: our tech got stuck at the job before, and the office forgot to call ahead.",
        output:
          "A reply of three or four sentences that thanks the customer by name, admits the missed call without excuses, names the change you made so it does not happen again, and gives a phone number to talk it through. It does not argue about the hour or ask for a better rating.",
      },
      {
        label: "Example: a five-star review",
        input:
          "Review: \"5 stars. Luis was on time, explained the whole repair and left the kitchen cleaner than he found it.\" Context: none.",
        output:
          "Two sentences that thank the reviewer, mention Luis and the clean kitchen by name and invite them back. Short replies suit good reviews, so the tool keeps this one brief.",
      },
    ],
    tips: [
      "Check the customer's name and the job details against your own records. The tool knows only what you paste.",
      "Cut any promise you cannot keep, such as a refund, a free visit or a callback time.",
      "Remove private details like a street address, an invoice total or anything about health.",
      "Read the reply out loud. If a sentence sounds stiff, delete it.",
    ],
    avoid: [
      "The review mentions an injury, a threat or a legal dispute. Talk to your lawyer or insurer before you post anything.",
      "The review looks fake or comes from someone who was never a customer. Report it to the platform instead.",
      "You are still angry about it. Wait a day, then run the tool.",
    ],
    faqs: [
      ["Should a small business reply to every review?",
       "Reply to every negative review and to as many positive ones as you can. A short reply shows future customers that a real person reads the reviews and fixes problems."],
      ["How long should a reply to a bad review be?",
       "Two to four sentences. Thank the person, own what went wrong and give a phone number or email to settle it offline. A long reply reads like an argument."],
      ["Is the review response generator free?",
       "Yes. The tool is free and needs no account or email address. Paste a review, run it and copy the reply."],
    ],
  },

  "estimate-generator": {
    title: "Free AI estimate generator",
    description:
      "Turn rough job notes into estimate text with scope, line items, exclusions and caveats. A free tool for contractors and service businesses, with examples.",
    intro:
      "The estimate generator turns rough job notes into the written part of an estimate: a job summary, scope of work, line items, what the job leaves out and the caveats that could change the total. It suits contractors and service businesses that quote jobs by hand after a site visit.",
    steps: [
      "Type your trade, such as residential plumbing or lawn care.",
      "Paste your notes from the site visit. Shorthand works. List every task the customer asked for.",
      "Add your usual rates if you want the line items filled in. Leave the field blank and the tool suggests a range you can replace.",
      "Run the tool and read the out of scope section first. That section prevents most arguments after the job.",
      "Copy the text into your own estimate form or invoicing app and set the final numbers yourself.",
    ],
    examples: [
      {
        label: "Example: a water heater swap",
        input:
          "Trade: residential plumbing. Notes: replace the 50 gallon gas water heater in the garage with a new gas unit, haul away the old one, customer asked about a drain pan, the shutoff valve shows corrosion.",
        output:
          "An estimate with a one-line job summary, a scope list (remove the old unit, install the new one, add a drain pan, replace the shutoff valve, test for leaks), a line item table, an out of scope list that names drywall repair and permit fees, and a caveat that the price may change if the gas line needs work.",
      },
      {
        label: "Example: a lawn care quote",
        input:
          "Trade: lawn care. Notes: corner lot, front and back, weekly mowing April through October, edge the sidewalk and driveway, customer wants the leaves cleared once in November.",
        output:
          "A scope list that splits the weekly mowing from the one-time leaf cleanup, a line item for each, and an out of scope list that names shrub trimming and storm debris.",
      },
    ],
    tips: [
      "Set every number yourself. The tool can suggest a range, and only you know your costs and your market.",
      "Check that every task from your notes made it into the scope list, and that nothing new appeared.",
      "Confirm brand names, model sizes and quantities against what you saw on site.",
      "Add your license number, payment terms and how long the estimate stays valid.",
    ],
    avoid: [
      "The job needs a stamped engineering plan, a permit drawing or a bid on a public contract.",
      "You have not seen the site yet. Notes from a phone call miss too much for a written estimate.",
      "The customer wants a signed contract. An estimate describes the job, and a contract needs its own terms.",
    ],
    faqs: [
      ["What should a contractor estimate include?",
       "A short job summary, the scope of work, line items, what the job does not include, payment terms and any conditions that could change the price. The out of scope list protects you most."],
      ["Does the estimate generator know local prices?",
       "No. It has no access to your supplier costs or local labor rates. Enter your own rates, or treat any number it suggests as a placeholder to replace."],
      ["Is the estimate generator free?",
       "Yes. The tool is free and needs no account or email address. Paste your notes, run it and copy the text."],
    ],
  },

  "caption-generator": {
    title: "Free AI social media caption generator",
    description:
      "Describe a post or photo and get five social media captions in five voices for Instagram, Facebook, LinkedIn or TikTok. Free, with an example and editing tips.",
    intro:
      "The caption generator writes five social media captions for one post, each in a different voice: a short story, a tip, a question, a casual look at your day and a direct call to book. It suits small business owners who post their own photos to Instagram, Facebook, LinkedIn or TikTok.",
    steps: [
      "Describe the photo or video in a sentence or two. Name what is in the shot and why you took it.",
      "Type your business name.",
      "Pick the platform. Captions for LinkedIn run longer and plainer than captions for Instagram.",
      "Pick the goal, such as building trust or bringing in bookings.",
      "Run the tool, choose the caption closest to how you talk and edit it from there.",
    ],
    examples: [
      {
        label: "Example: a bakery's morning photo",
        input:
          "Post: a tray of cinnamon rolls coming out of the oven at 5 a.m., flour on the counter. Business: Corner Oven Bakery. Platform: Instagram. Goal: drive bookings and orders.",
        output:
          "Five captions of one to three sentences. One tells the 5 a.m. start, one shares a baking tip, one asks followers a question, one reads like a quick note from the kitchen and one tells people how to place a weekend order. Each has up to three hashtags.",
      },
      {
        label: "Example: a roofer's finished job",
        input:
          "Post: before and after photos of a storm-damaged roof we replaced in two days. Business: Ridgeline Roofing. Platform: Facebook. Goal: build trust.",
        output:
          "Five captions that describe the damage, the two-day turnaround and the crew, with one that asks neighbors to check their own roof after the storm.",
      },
    ],
    tips: [
      "Check every fact in the caption. The tool may add a detail you never mentioned, like a flavor or a price.",
      "Use your own hours, links and phone number, and test the link before you post.",
      "Tag a customer only after they say yes.",
      "Cut hashtags that no real customer would search.",
    ],
    avoid: [
      "The post makes a health, legal or financial claim. Write that one yourself and check the rules for your trade.",
      "The post responds to a complaint or a tragedy in your town. Those need your own words.",
      "You post the same caption on every platform every day. Followers notice a pattern fast.",
    ],
    faqs: [
      ["How long should a social media caption be for a small business?",
       "One to three sentences works on Instagram and Facebook. LinkedIn readers accept a short paragraph. Put the most useful line first, because most apps cut the caption after the first line or two."],
      ["How many hashtags should I use?",
       "Three or fewer. Pick tags a local customer would search, such as your town plus your trade. The tool keeps each caption to three hashtags at most."],
      ["Is the caption generator free?",
       "Yes. The tool is free and needs no account or email address. Describe the post, run it and copy the caption you like."],
    ],
  },

  "faq-builder": {
    title: "Free AI FAQ generator for small business",
    description:
      "Describe your business and get 6 to 10 FAQ questions and answers, phrased the way customers ask. Free, with steps, an example and tips for a website FAQ page.",
    intro:
      "The FAQ builder writes 6 to 10 questions and answers for your business, phrased the way customers ask them. It suits small business owners who need an FAQ page for a website or a Google Business Profile and do not know where to start.",
    steps: [
      "Type your business name.",
      "Describe what you do in two to four sentences. Include your service area, your main services and how long you have been open.",
      "Add topic hints if customers keep asking the same thing, such as emergency calls or warranties.",
      "Run the tool and read each answer against how you run the business.",
      "Keep the questions you hear in real life and delete the rest.",
    ],
    examples: [
      {
        label: "Example: a mobile dog groomer",
        input:
          "Business: Suds and Paws. Description: mobile dog grooming van serving Tuscaloosa and Northport, baths, haircuts and nail trims, open since 2021. Topic hints: anxious dogs, cancellations.",
        output:
          "Eight questions such as how the van works, what areas it covers, how long a groom takes, what happens with a nervous dog and what the cancellation policy is. Each answer runs one to three sentences.",
      },
      {
        label: "Example: a home inspector",
        input:
          "Business: Keystone Home Inspections. Description: home inspections for buyers in Huntsville and Madison, reports within 24 hours. Topic hints: radon, attending the inspection.",
        output:
          "Questions on how long an inspection takes, whether the buyer can come along, when the report arrives and how radon testing works, each with a short plain answer.",
      },
    ],
    tips: [
      "Check every policy the answers describe, such as cancellation windows and warranty terms. The tool guesses where you left gaps.",
      "Replace any vague answer about cost with how you actually quote, such as after a visit or by the size of the job.",
      "Make sure each answer names your real service area and hours.",
      "Show every question and answer on the page itself if you add FAQ schema to your site.",
    ],
    avoid: [
      "The answers cover medical, legal or tax advice. A licensed professional should write those.",
      "You have not decided your policies yet. Decide first, then let the tool phrase them.",
      "You want answers for a product with safety rules. Use the maker's own wording.",
    ],
    faqs: [
      ["How many questions should a small business FAQ page have?",
       "Six to ten covers what most customers ask before they call. Start with cost, service area, timing and what happens when something goes wrong, then add questions as customers ask them."],
      ["Does an FAQ page help with Google search?",
       "It can. Clear answers to real questions give search engines and AI answer tools plain text to quote. Show the answers on the page, because Google ignores FAQ schema that the page does not show."],
      ["Is the FAQ builder free?",
       "Yes. The tool is free and needs no account or email address. Describe your business, run it and copy the answers."],
    ],
  },

  "about-page": {
    title: "Free AI About page writer",
    description:
      "Enter why you started, what you do and how you work, and get an About Us page draft for a small business website. Free, with an example and tips for editing it.",
    intro:
      "The About page writer drafts an About Us page from a few facts: why you started, what you do, how you work and who runs the business. It suits small business owners who need a website About page that sounds like a person wrote it.",
    steps: [
      "Type the business name, your name and the year you opened.",
      "Write the real reason you started in one to three sentences. A frustration or a moment works better than a mission statement.",
      "Describe what you do in one sentence.",
      "Name one practice that sets you apart, such as answering the phone on Saturdays.",
      "Run the tool and edit the draft until every sentence is something you would say to a customer.",
    ],
    examples: [
      {
        label: "Example: a two-person cleaning company",
        input:
          "Business: Brightside Cleaning. Founder: Maria Lopez. Founded: 2020. Why: Maria cleaned for a big franchise and saw crews rushed through homes to hit a quota. What: house cleaning in Birmingham. Different: the same two-person crew every visit.",
        output:
          "A page with short sections on what the business does, why Maria started it, how the work runs, who the business suits and who it does not, a few lines about Maria and a closing line that tells the reader how to book.",
      },
      {
        label: "Example: a one-person bookkeeping practice",
        input:
          "Business: Ledger and Line. Founder: Tom Reed. Founded: 2018. Why: Tom watched his father's shop nearly close over messy books. What: monthly bookkeeping for trades businesses. Different: a call on the first Monday of every month.",
        output:
          "A shorter page that leads with the monthly bookkeeping service, tells the story of the family shop in two or three sentences and explains the first Monday call.",
      },
    ],
    tips: [
      "Check every date, name, place and number. The tool may round a year or invent a detail.",
      "Delete any claim you cannot back up, such as a top ranking in town or a count of happy customers.",
      "Add a real photo of you or your crew next to the text.",
      "Keep your phone number and booking link the same as on the rest of your site.",
    ],
    avoid: [
      "Your business has several owners with different stories. Interview each one and write the page together.",
      "You need a legal company profile for a bid, a loan or a license. Those have set formats.",
      "You do not want your own story on the page. A plain services page fits better.",
    ],
    faqs: [
      ["What should a small business About page include?",
       "What you do, where you work, why you started, how you work day to day and how to reach you. A photo of the owner or the crew helps people trust the page."],
      ["How long should an About page be?",
       "Most small business About pages run 250 to 500 words. Long enough to tell why you started and how you work, short enough to read on a phone."],
      ["Is the About page writer free?",
       "Yes. The tool is free and needs no account or email address. Enter your details, run it and copy the draft."],
    ],
  },

  "email-composer": {
    title: "Free AI business email writer",
    description:
      "Describe the situation and get a draft business email: a follow-up, a reply to an inquiry, an apology or an announcement. Free, with examples and tips.",
    intro:
      "The email composer drafts a business email from a short description: a follow-up, a reply to an inquiry, a customer announcement, an apology, a quote email or a thank-you note. It suits small business owners who write their own email and want a first draft in under a minute.",
    steps: [
      "Pick the email type, such as warm follow-up or response to inquiry.",
      "Describe who the email goes to, what happened and what you want them to do next.",
      "Type your name so the tool can sign the email.",
      "Add a tone if it matters, such as warm but direct.",
      "Run the tool, edit the draft and send it from your own email account.",
    ],
    examples: [
      {
        label: "Example: a follow-up after a quote",
        input:
          "Type: warm follow-up. Context: I sent Jane at Main Street Salon a quote for online booking last Tuesday and have not heard back. She mentioned her front desk misses calls on Saturdays. Name: Chris.",
        output:
          "A subject line and a short email that mentions the Saturday calls, asks one easy question about whether the quote still fits her plans and signs off with Chris's name. It stays under 120 words and does not pressure her.",
      },
      {
        label: "Example: an apology for a missed appointment",
        input:
          "Type: apology. Context: we double-booked Mr. Grant's Thursday install and did not show. He called the office upset. We can come Saturday morning. Name: Dana.",
        output:
          "A short email that apologizes without excuses, says what went wrong, offers the Saturday morning slot and gives a direct number to reach Dana.",
      },
    ],
    tips: [
      "Check the recipient's name, company and any date or number in the draft.",
      "Delete anything the tool added that you never told it, such as a discount or a deadline.",
      "Keep one clear ask per email.",
      "Read the subject line by itself. If it would not make you open the email, rewrite it.",
    ],
    avoid: [
      "The email carries legal weight, such as a contract change, a termination or a reply to a lawyer.",
      "You are writing to someone grieving or in a crisis. Write that one yourself.",
      "You plan to send the same draft to a long list of strangers. That needs a real mailing tool and an opt-out link.",
    ],
    faqs: [
      ["How long should a business follow-up email be?",
       "Under 120 words. Remind the reader who you are, mention one detail from your last talk and ask one easy question."],
      ["When should I follow up after sending a quote?",
       "Three to five business days after you send it is a common window. If there is still no reply, send one more short note a week later and then stop."],
      ["Is the email composer free?",
       "Yes. The tool is free and needs no account or email address. Describe the situation, run it and copy the draft."],
    ],
  },
};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return TOOL_GUIDES[slug];
}
