/**
 * AI Tools Registry — shared config + system prompts for every Anthropic-backed
 * tool on the PV site. Add a new tool by adding an entry here. Frontend + API
 * route both consume this registry, so each new tool is ~5 minutes of work.
 */

export type AIToolField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[]; // for select
  default?: string | number;
};

export type AIToolConfig = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "AI-Powered" | "Branding & Identity" | "Communication & Marketing" | "Operations & Finance";
  fields: AIToolField[];
  systemPrompt: string;
  buildUserMessage: (input: Record<string, string>) => string;
  maxTokens?: number;
  outputFormat: "markdown" | "plain" | "json-palette" | "json-faqs" | "json-list";
};

const TONE_DEFAULT = "warm, professional, never hyped, specific over generic";

export const AI_TOOLS: AIToolConfig[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "faq-builder",
    name: "AI FAQ Builder",
    tagline: "Customer-quality FAQ pairs in 30 seconds.",
    description: "Tell us about your business. Get back 6-10 FAQ pairs phrased the way real customers ask — not how the business would say it.",
    category: "AI-Powered",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true, placeholder: "e.g., Bob's Plumbing" },
      { name: "businessDescription", label: "What does the business do?", type: "textarea", required: true, placeholder: "e.g., Family-owned residential plumbing serving Metro Atlanta since 1995. Service calls, water heater installs, drain cleaning, full re-pipes. Licensed, insured, 24/7 emergency response.", helpText: "2-4 sentences. The more specific the better." },
      { name: "topics", label: "Topic hints (optional, comma-separated)", type: "text", placeholder: "e.g., emergency calls, warranty, after-hours pricing" },
    ],
    systemPrompt: `You write FAQ pages for small businesses. Given a business description and optional topic hints, output 6-10 high-quality FAQ pairs.

Quality bar:
- Questions are phrased the way a REAL customer would ask them (not how the business would phrase them)
- Answers are 1-3 sentences, conversational, specific
- Answers never overpromise or hype
- Cover a mix of: pricing/cost, process/how-it-works, qualifications/trust, what-makes-you-different, edge cases / "what if"
- No generic filler ("we pride ourselves on quality") — every answer says something concrete

Return ONLY valid JSON in this exact shape, no markdown fences:
{
  "faqs": [
    {"question": "...", "answer": "..."}
  ]
}`,
    buildUserMessage: (i) => [
      `Business name: ${i.businessName}`,
      `What they do: ${i.businessDescription}`,
      i.topics ? `Topic hints (cover these in addition to standard FAQs): ${i.topics}` : null,
      ``,
      `Generate 6-10 FAQ pairs. Return ONLY the JSON object as specified.`,
    ].filter(Boolean).join("\n"),
    maxTokens: 2000,
    outputFormat: "json-faqs",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "content-generator",
    name: "AI Content Generator",
    tagline: "Blog posts, descriptions, bios, emails in minutes.",
    description: "Write marketing and business content in your voice. Pick a type, tell it about your business, get back a draft ready to edit and publish.",
    category: "AI-Powered",
    fields: [
      { name: "businessContext", label: "About your business", type: "textarea", required: true, placeholder: "e.g., Family-owned plumbing in Metro Atlanta since 1995. 24/7 emergency service, licensed and insured.", helpText: "2-4 sentences. The more specific the better." },
      { name: "contentType", label: "Content type", type: "select", required: true, options: ["Blog post", "Product / service description", "Bio (third-person)", "Email", "Social caption (3 variants)"], default: "Blog post" },
      { name: "topic", label: "What should it be about?", type: "textarea", required: true, placeholder: "e.g., Why you should flush your water heater annually" },
      { name: "tone", label: "Tone (optional)", type: "text", placeholder: "e.g., friendly but technical, slightly humorous" },
      { name: "length", label: "Target word count", type: "number", default: 400 },
    ],
    systemPrompt: `You write marketing and business content for small businesses. Tone: ${TONE_DEFAULT}, unless the user specifies otherwise.

Quality bar:
- Specific over generic ("our 24/7 emergency line" not "our exceptional service")
- Concrete benefits over abstract claims ("fix it Tuesday" not "fast turnaround")
- No business clichés ("synergy", "best-in-class", "innovative", "passionate about")
- Use simple words. Cut 30% of the first draft.
- Write like a thoughtful business owner, not a marketing agency.

For blog posts: use markdown with H2 subheadings.
For product/service descriptions: plain text, no headings. One-sentence promise → 2-3 paragraphs → 1-line CTA.
For bios: third person, plain prose.
For emails: lead with "Subject: " on first line, then body. Sign off with first-name only.
For social captions: number 3 distinct captions in different voices (story / value / question). Max 3 hashtags per caption.

Output ONLY the content. No preamble like "Here's your post:".`,
    buildUserMessage: (i) => [
      `Business context: ${i.businessContext}`,
      `Content type: ${i.contentType}`,
      `Topic: ${i.topic}`,
      i.tone ? `Tone override: ${i.tone}` : null,
      `Target length: ~${i.length || 400} words`,
    ].filter(Boolean).join("\n"),
    maxTokens: 2500,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "caption-generator",
    name: "AI Caption Generator",
    tagline: "5 captions in different voices, every time.",
    description: "Describe the post (or paste a photo description), get back 5 distinct caption options. Pick one, post.",
    category: "AI-Powered",
    fields: [
      { name: "postContext", label: "Describe the post or photo", type: "textarea", required: true, placeholder: "e.g., Behind-the-scenes shot of me organizing the new tool inventory in the truck before a job tomorrow" },
      { name: "businessName", label: "Business name", type: "text", required: true, placeholder: "e.g., Bob's Plumbing" },
      { name: "platform", label: "Platform", type: "select", options: ["Instagram", "Facebook", "LinkedIn", "X / Twitter", "TikTok"], default: "Instagram" },
      { name: "goal", label: "Goal of the post", type: "select", options: ["Build trust / show personality", "Educate / share tips", "Drive bookings / inquiries", "Make people laugh", "Celebrate a customer / win"], default: "Build trust / show personality" },
    ],
    systemPrompt: `You write social media captions for small businesses. Tone: ${TONE_DEFAULT}.

Quality bar:
- Captions feel HUMAN, not AI-generated
- Specific details from the post context, not generic platitudes
- Lead with the most interesting word, not "Today we..." or "Just wanted to..."
- Hashtags: max 3 per caption. Use ones a real person would.
- No emoji spam. 1-2 emojis max per caption, only if they truly add something.

Output: numbered list of 5 captions, each in a different voice:
1. Personal/story
2. Educational/value
3. Provocative/question
4. Behind-the-scenes/casual
5. Direct/CTA

Format as plain markdown numbered list with caption + (style: X) tag after.`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Platform: ${i.platform}`,
      `Goal: ${i.goal}`,
      `Post context: ${i.postContext}`,
      ``,
      `Generate 5 distinct captions per the system instructions.`,
    ].join("\n"),
    maxTokens: 1500,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "color-palette",
    name: "Color Palette Tool",
    tagline: "Describe your vibe, get a real palette.",
    description: "Tell us what your business should feel like. Get back a 5-color palette with hex codes, names, and how to use each.",
    category: "Branding & Identity",
    fields: [
      { name: "businessDescription", label: "About your business", type: "textarea", required: true, placeholder: "e.g., Cozy coffee shop in a historic downtown — books, mismatched chairs, regulars who know each other" },
      { name: "vibe", label: "Vibe you want", type: "textarea", required: true, placeholder: "e.g., Warm but not cheesy. A little bookish. Should feel like sweater weather and pour-over coffee." },
      { name: "avoid", label: "Things to avoid", type: "text", placeholder: "e.g., neon, anything Starbucks-green" },
    ],
    systemPrompt: `You are a brand color expert. Given a business description and vibe, return a 5-color palette as JSON.

Quality bar:
- Each color has a specific, named purpose (Primary, Accent, Background, Text, Highlight)
- Hex codes are accessible (no neon, no near-black-on-near-black combos)
- Names are evocative ("Steeped Tea", "Foundry Gold") not generic ("Brown 1")
- "Use for" guidance is concrete

Return ONLY this JSON shape, no markdown fences:
{
  "palette": [
    {"name": "...", "hex": "#xxxxxx", "role": "Primary|Accent|Background|Text|Highlight", "useFor": "..."}
  ],
  "voice": "1-2 sentence summary of the brand feeling this palette projects"
}`,
    buildUserMessage: (i) => [
      `Business: ${i.businessDescription}`,
      `Vibe: ${i.vibe}`,
      i.avoid ? `Avoid: ${i.avoid}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 1200,
    outputFormat: "json-palette",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "brand-kit",
    name: "Brand Kit Builder",
    tagline: "Color palette + fonts + voice in one export.",
    description: "Get a complete starter brand guide: 5-color palette, font pairing recommendation, voice characteristics, and a tagline draft. Refine and use.",
    category: "Branding & Identity",
    fields: [
      { name: "businessDescription", label: "About your business", type: "textarea", required: true, placeholder: "e.g., Mobile dog grooming, focused on anxious dogs and senior pets" },
      { name: "audience", label: "Who buys from you?", type: "textarea", required: true, placeholder: "e.g., Dog owners who feel guilty about leaving their dog at a standard groomer" },
      { name: "feeling", label: "How should they feel about you?", type: "text", placeholder: "e.g., Calm, trusted, expert with pets" },
    ],
    systemPrompt: `You are a brand strategist. Build a starter brand kit from the business inputs.

Output JSON, no markdown fences:
{
  "palette": [{"name": "...", "hex": "#xxxxxx", "role": "...", "useFor": "..."}],
  "fonts": {
    "heading": {"name": "...", "characteristic": "...", "use": "..."},
    "body": {"name": "...", "characteristic": "...", "use": "..."}
  },
  "voice": {
    "characteristics": ["...", "...", "..."],
    "do": ["...", "..."],
    "dont": ["...", "..."]
  },
  "tagline_drafts": ["...", "...", "..."]
}

Quality bar:
- 5-color palette, accessible, named evocatively
- Font recommendations are Google Fonts (free, available immediately)
- Voice characteristics are specific (not "professional and friendly")
- Do/Don't lists are concrete and useful for someone writing copy
- 3 tagline drafts in different styles (declarative / question / metaphor)`,
    buildUserMessage: (i) => [
      `Business: ${i.businessDescription}`,
      `Audience: ${i.audience}`,
      `Desired feeling: ${i.feeling}`,
    ].join("\n"),
    maxTokens: 2000,
    outputFormat: "json-list",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "logo-concepts",
    name: "Logo Concept Generator",
    tagline: "5 logo directions, picked apart and explained.",
    description: "Get 5 different logo concept directions for your business — each with an icon idea, type treatment, and rationale. Use to brief a designer or sketch yourself.",
    category: "Branding & Identity",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true, placeholder: "e.g., Bob's Plumbing" },
      { name: "industry", label: "Industry", type: "text", required: true, placeholder: "e.g., Residential plumbing" },
      { name: "personality", label: "Brand personality (3 words)", type: "text", required: true, placeholder: "e.g., Reliable, hometown, no-nonsense" },
      { name: "avoid", label: "Avoid (clichés you hate)", type: "text", placeholder: "e.g., wrench in a circle, plumber crack jokes" },
    ],
    systemPrompt: `You are a brand identity designer. Generate 5 distinct logo concept directions for the business.

For each concept, return:
- Direction name (evocative)
- Icon concept (specific object or geometric idea — describe it visually)
- Type treatment (serif / sans / monospace / hand / mixed)
- Color palette (3 hex codes)
- Rationale (1 sentence)

Make each direction GENUINELY DIFFERENT. Don't give 5 variations of the same idea. Try: literal/iconic, abstract/geometric, type-only/wordmark, mascot/character, monogram.

Output markdown — clear headings per concept.`,
    buildUserMessage: (i) => [
      `Business name: ${i.businessName}`,
      `Industry: ${i.industry}`,
      `Personality: ${i.personality}`,
      i.avoid ? `Avoid: ${i.avoid}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 2000,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "business-card-copy",
    name: "Business Card Copy Generator",
    tagline: "What to put on a card that earns a callback.",
    description: "Generate the front + back copy for a business card. Tagline, what you do, contact format, and an optional QR-side message that gives someone a reason to scan.",
    category: "Branding & Identity",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "ownerName", label: "Owner / contact name", type: "text", required: true },
      { name: "whatYouDo", label: "What you do (one sentence)", type: "text", required: true, placeholder: "e.g., I fix gutters and clean siding for homeowners in North Metro Atlanta" },
      { name: "contact", label: "Contact info (phone, email, site)", type: "text", required: true, placeholder: "(770) 555-1234 · me@example.com · example.com" },
    ],
    systemPrompt: `You write business card copy. Output a complete recommendation in markdown.

Sections:
## Front side
- Headline / wordmark
- Tagline (5-8 words)
- Owner name + title

## Back side
- "What I do" (one sentence, conversational)
- Contact info
- Optional: QR-side hook (one line that gives the recipient a reason to scan)

Quality bar:
- Tagline is memorable, not generic. Avoid "Quality you can trust" type lines.
- "What I do" should sound like a human, not a brochure.
- QR hook should offer something specific (free quote / before-after photos / first-time discount / portfolio).`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Owner: ${i.ownerName}`,
      `What they do: ${i.whatYouDo}`,
      `Contact: ${i.contact}`,
    ].join("\n"),
    maxTokens: 800,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "social-templates",
    name: "Social Media Templates",
    tagline: "Reusable post formats matched to your brand.",
    description: "Get 5 reusable social media post templates designed for your specific business — quote, before/after, weekly-tip, customer-spotlight, behind-the-scenes — each with brand voice notes and a fill-in-the-blank structure.",
    category: "Branding & Identity",
    fields: [
      { name: "businessDescription", label: "About your business", type: "textarea", required: true },
      { name: "platform", label: "Primary platform", type: "select", options: ["Instagram", "Facebook", "LinkedIn", "All of the above"], default: "Instagram" },
    ],
    systemPrompt: `You design reusable social media post templates for small businesses. Output 5 templates as markdown.

For each template:
## Template N: [Name]
- **Use this for:** [scenario]
- **Visual:** [photo description]
- **Caption structure:** [fill-in-the-blank with [BRACKETS]]
- **Example for this business:** [filled-in example]
- **Frequency:** [recommended cadence]

Make templates SPECIFIC to the business. A plumber's "customer spotlight" is different from a salon's.`,
    buildUserMessage: (i) => [
      `Business: ${i.businessDescription}`,
      `Platform: ${i.platform}`,
    ].join("\n"),
    maxTokens: 2500,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "review-response",
    name: "Review Response Generator",
    tagline: "Reply to any review in seconds, well.",
    description: "Paste a customer review. Get back a thoughtful response that protects your reputation, addresses the specific complaint or compliment, and sounds human.",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "review", label: "The review (paste it)", type: "textarea", required: true, placeholder: "Star rating + the actual text" },
      { name: "context", label: "Context (optional)", type: "textarea", placeholder: "e.g., Was a $200 gutter cleaning, did notice the spider webs but they didn't ask us to clean those" },
    ],
    systemPrompt: `You write professional responses to customer reviews. Tone: ${TONE_DEFAULT}.

Quality bar:
- Specific acknowledgment of what they said (not "thank you for your feedback")
- For positive reviews: warmth without sycophancy, brief
- For negative reviews: take responsibility for what you can, no defensiveness, offer to make it right offline (phone or email), 2-4 sentences max
- For neutral reviews: thank them, ask one specific question to learn what would have made it 5-star
- Never beg for a star upgrade
- Always sign with first name (or "[Your Name]")

Output: just the response text, ready to paste.`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Review: """${i.review}"""`,
      i.context ? `Context: ${i.context}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 600,
    outputFormat: "plain",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "email-composer",
    name: "Email Composer",
    tagline: "Professional emails written for your inbox.",
    description: "Write any business email — outreach, follow-up, response, announcement. Tell us the situation, get back a draft ready to edit and send.",
    category: "Communication & Marketing",
    fields: [
      { name: "emailType", label: "Email type", type: "select", required: true, options: ["Cold outreach", "Warm follow-up", "Response to inquiry", "Customer announcement", "Apology / make-good", "Quote / proposal", "Thank you"], default: "Warm follow-up" },
      { name: "context", label: "Context (who, what, why)", type: "textarea", required: true, placeholder: "e.g., Following up with Jane Smith — toured her salon last week, quoted Digital Growth at $179/mo, hasn't responded in 5 days" },
      { name: "yourName", label: "Your name", type: "text", required: true },
      { name: "tone", label: "Tone (optional)", type: "text", placeholder: "e.g., warm but direct, low pressure" },
    ],
    systemPrompt: `You write business emails. Tone: ${TONE_DEFAULT}.

Output format — exactly:
Subject: [subject line]

[email body]

[Sign-off],
[Your Name]

Quality bar:
- Subject is concrete and short (under 8 words)
- Opening line is NOT "I hope this email finds you well"
- Body: 1 specific hook + 1 specific value + 1 clear ask
- No begging, no fake urgency
- 100-180 words max unless complexity requires more`,
    buildUserMessage: (i) => [
      `Email type: ${i.emailType}`,
      `Context: ${i.context}`,
      `From: ${i.yourName}`,
      i.tone ? `Tone: ${i.tone}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 800,
    outputFormat: "plain",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "sms-composer",
    name: "SMS Composer",
    tagline: "Texts that don't read like spam.",
    description: "Write a customer text — booking reminder, promotion, follow-up, status update. SMS-appropriate length and tone.",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "smsType", label: "SMS type", type: "select", required: true, options: ["Booking reminder", "Promotion / offer", "Follow-up after service", "Quote / estimate", "Status update", "Cancellation / reschedule"], default: "Booking reminder" },
      { name: "context", label: "Context", type: "textarea", required: true, placeholder: "e.g., Reminder for tomorrow 10 AM gutter cleaning at 123 Oak St" },
    ],
    systemPrompt: `You write business SMS messages. Hard constraints:
- Under 160 characters (single segment)
- No URLs unless explicitly requested
- Includes business name once
- Includes a clear next step (reply, call, time/place)
- No fake urgency, no emoji-spam (max 1)
- Casual but professional

Output 3 variants, numbered, with character counts in parens.`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Type: ${i.smsType}`,
      `Context: ${i.context}`,
    ].join("\n"),
    maxTokens: 500,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "estimate-generator",
    name: "Estimate Generator",
    tagline: "Detailed estimate copy from rough notes.",
    description: "Tell us what the job is. Get back a clean estimate description with line-item breakdown logic, scope notes, exclusions, and a recommended pricing tier.",
    category: "Operations & Finance",
    fields: [
      { name: "businessType", label: "What type of business", type: "text", required: true, placeholder: "e.g., Residential plumbing" },
      { name: "jobDescription", label: "Job description (rough notes are fine)", type: "textarea", required: true, placeholder: "e.g., Replace water heater in basement, switch from gas to electric, customer also wants the line insulated, old unit is 75 gal" },
      { name: "yourRates", label: "Your typical rates (optional)", type: "textarea", placeholder: "e.g., Labor $95/hr. Water heater units $1200-3000 depending on type." },
    ],
    systemPrompt: `You write contractor and service-business estimates. Output a complete estimate in markdown with sections:

## Job summary
[1 sentence — what we're doing]

## Scope of work
- [item 1]
- [item 2]
...

## Line items
| Item | Notes | Est. cost |
|---|---|---|
| ... | ... | $... |

## Out of scope (not included)
- [what we're NOT doing — important for protecting against scope creep]

## Recommended pricing
[Suggested total range + brief rationale]

## Caveats
[Anything that could change the price after on-site assessment]

Quality bar:
- Specific scope language, no "general plumbing work"
- Out-of-scope section is what separates a good estimate from a regret
- Pricing rationale should let the customer understand why, not just see a number`,
    buildUserMessage: (i) => [
      `Business: ${i.businessType}`,
      `Job: ${i.jobDescription}`,
      i.yourRates ? `Rates: ${i.yourRates}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 2000,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "about-page",
    name: "About Page Writer",
    tagline: "About page that doesn't sound like every other About page.",
    description: "Tell us your founding story, what you actually do, and the values you act on (not the words on the wall). Get back an About page that builds trust without being insufferable.",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "founderName", label: "Founder / owner name", type: "text", required: true },
      { name: "founded", label: "Year founded", type: "text", placeholder: "e.g., 2019" },
      { name: "story", label: "Why does this business exist? (1-3 sentences)", type: "textarea", required: true, placeholder: "The honest reason. Not 'to deliver world-class...' — what frustration or opportunity made you start?" },
      { name: "what", label: "What you do (1 sentence)", type: "text", required: true },
      { name: "differentiator", label: "What's actually different about how you do it?", type: "textarea", required: true, placeholder: "Be specific. 'We're family-owned' doesn't count unless you tie it to what that means in practice." },
      { name: "values", label: "Values you actually act on (1-3)", type: "text", placeholder: "e.g., 'we never upsell unless asked' or 'we return calls same day even on Saturdays'" },
    ],
    systemPrompt: `You write About pages that build trust without corporate bloat. Honest > polished. Specific > generic.

Output in markdown:

# About {Business name}

## What we do
[1-2 sentences — direct. No "leading provider of innovative solutions" garbage.]

## Why we started
[2-4 sentences — the real reason. References founder's actual experience.]

## What's different about how we work
[3-5 bullets — each should be a concrete behavior, not a buzzword. "We text you back within 2 hours" not "we value communication".]

## Who we work with (and who we don't)
[2-3 sentences honest about fit. Specifying who you DON'T serve builds trust with who you do.]

## The owner
[2-4 sentences about founder. Real. References founding year + 1-2 specific things about their approach.]

## Want to start a conversation?
[Specific next step — email / phone / form. Make it easy.]

Quality bar:
- Cuts every word that sounds like marketing
- Specifics over abstractions in every section
- Founder section has at least one humanizing detail (not "passionate about excellence")`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Founder: ${i.founderName}`,
      i.founded ? `Founded: ${i.founded}` : null,
      `Why exists: ${i.story}`,
      `What we do: ${i.what}`,
      `Differentiator: ${i.differentiator}`,
      i.values ? `Values: ${i.values}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 1800,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "tagline",
    name: "Tagline Generator",
    tagline: "10 taglines from different angles — pick the one that fits.",
    description: "Tell us your business + what makes it different. Get 10 taglines across 5 distinct angles (benefit, contrarian, founder-voice, audience-mirror, time-based). Each labeled with its angle so you can pick by fit.",
    category: "Branding & Identity",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "what", label: "What you do (1 sentence)", type: "text", required: true },
      { name: "audience", label: "Who you serve", type: "text", required: true, placeholder: "e.g., Atlanta-area homeowners 35-65" },
      { name: "differentiator", label: "What's truly different about you", type: "text", required: true },
      { name: "avoid", label: "Words / phrases to AVOID (comma-separated)", type: "text", placeholder: "e.g., innovative, premium, solutions, partner" },
    ],
    systemPrompt: `You write taglines. 10 of them across 5 distinct angles. Each labeled so the user can choose by what fits, not by which "sounds best".

Output in markdown:

# 10 taglines for {Business name}

## Angle 1: Benefit-direct
1. [Tagline]
2. [Tagline]

## Angle 2: Contrarian (against industry norm)
3. [Tagline]
4. [Tagline]

## Angle 3: Founder-voice (like the owner would say it)
5. [Tagline]
6. [Tagline]

## Angle 4: Audience-mirror (a sentence the customer would say)
7. [Tagline]
8. [Tagline]

## Angle 5: Time-based (speed or longevity claim)
9. [Tagline]
10. [Tagline]

## Pick guidance
[2-3 sentences on which angle probably fits THIS business best, and why.]

Quality bar:
- < 8 words each, ideally < 5
- Concrete, not abstract
- NO buzzwords from the avoid list
- Each tagline genuinely differs in tone, not just word choice
- The "Founder-voice" ones should sound like a real person talking, not a brand`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `What: ${i.what}`,
      `Audience: ${i.audience}`,
      `Differentiator: ${i.differentiator}`,
      i.avoid ? `Avoid: ${i.avoid}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 1500,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "sop-writer",
    name: "SOP Writer (Standard Operating Procedure)",
    tagline: "Document a process once. Train every new hire in 10 min instead of an hour.",
    description: "Describe a process you do (or someone on your team does). AI structures it into a clean SOP with steps, decision points, gotchas, and a quality check. Print-ready.",
    category: "Operations & Finance",
    fields: [
      { name: "processName", label: "Process name", type: "text", required: true, placeholder: "e.g., 'Opening the salon at 8 AM'" },
      { name: "who", label: "Who does this process", type: "text", required: true, placeholder: "e.g., Receptionist, opening shift" },
      { name: "frequency", label: "How often", type: "text", placeholder: "e.g., Daily, weekly, per-customer" },
      { name: "description", label: "Describe the process in your own words", type: "textarea", required: true, placeholder: "Stream-of-consciousness is fine. Include what could go wrong + what 'done right' looks like." },
    ],
    systemPrompt: `You write Standard Operating Procedures (SOPs) for small businesses. Print-ready, no jargon, written so a new hire can follow on day 1.

Output in markdown:

# SOP: {Process name}

**Owner:** {Who}
**Frequency:** {How often}
**Last updated:** [Today's date placeholder]

## What this is and why we do it
[1-2 sentences — context for someone who's never done this.]

## Before you start
- [ ] [Pre-requisite or tool needed]
- [ ] [Another pre-req]

## Step-by-step
1. **[Step name]** — [What to do, specific. If timing matters, note it.]
2. **[Step name]** — [...]
3. **[Step name]** — [...]
[Continue for all steps]

## Decision points
[For any IF/THEN steps in the process. E.g., "If customer wants product X, see [...]"]

## What 'done right' looks like
[3-5 specific markers of quality — how to know you nailed it]

## Common mistakes / gotchas
- [Specific thing that goes wrong + how to avoid]

## Quality check (do this before considering done)
- [ ] [Specific check 1]
- [ ] [Specific check 2]

## If something goes wrong
[Who to escalate to + what to do as immediate fix]

Quality bar:
- A new hire could execute this without asking questions
- Each step is concrete and verifiable
- "What done right looks like" is binary (did/didn't)
- Gotchas section has real things, not "be careful"`,
    buildUserMessage: (i) => [
      `Process: ${i.processName}`,
      `Who: ${i.who}`,
      i.frequency ? `Frequency: ${i.frequency}` : null,
      ``,
      `Description:`,
      i.description,
    ].filter(Boolean).join("\n"),
    maxTokens: 2200,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "lead-magnet",
    name: "Lead Magnet Idea Generator",
    tagline: "5 lead magnet ideas your audience would actually trade an email for.",
    description: "Tell us your business + audience. Get 5 distinct lead magnet ideas — not generic 'free ebook' garbage. Each idea is specific, valuable, and shippable in 1-2 days.",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "what", label: "What you do (1 sentence)", type: "text", required: true },
      { name: "audience", label: "Who you serve", type: "text", required: true },
      { name: "audienceProblem", label: "What's your audience's #1 problem?", type: "textarea", required: true, placeholder: "Be specific. The problem your lead magnet solves should be the #1 thing they think about." },
      { name: "asset", label: "Anything you already have that could be turned into a lead magnet?", type: "text", placeholder: "e.g., client decision tree, internal checklist, vendor list" },
    ],
    systemPrompt: `You generate lead magnet ideas that are SPECIFIC enough to be valuable. NOT "Ultimate Guide to X" generic crap.

Output in markdown. 5 ideas, each labeled by FORMAT:

## Idea 1: [Format — e.g., Calculator, Checklist, Template, Mini-course, Audit, Database]
**Title:** [Specific, < 60 chars]
**What it is:** [2-3 sentences — concrete value proposition]
**Why this audience would trade their email for it:** [1 sentence]
**Time to build:** [Hours estimate — should be 1-16 hours]
**Distribution angle:** [Where to share + what to say when sharing]

## Idea 2: [Different format]
[Same structure]

[Continue for 5 ideas across 5 different formats]

## Pick guidance
[2-3 sentences — which idea probably wins for THIS specific business + audience, and why.]

Quality bar:
- Each idea uses a DIFFERENT format (don't give 5 PDFs)
- "Why they'd trade email for it" must reference the actual audience problem given
- Time-to-build should be honest — most should be 4-16 hr range, not 100 hr
- No "Ultimate Guide to..." — specific, narrow, useful`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `What: ${i.what}`,
      `Audience: ${i.audience}`,
      `Audience #1 problem: ${i.audienceProblem}`,
      i.asset ? `Existing asset: ${i.asset}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 2200,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "customer-onboarding",
    name: "New Customer Onboarding Sequence",
    tagline: "5-email onboarding sequence ready to schedule.",
    description: "Tell us about your business + what your customer just bought. Get 5 emails sequenced (day 0, 1, 3, 7, 14) that set expectations, deliver value, and turn the buyer into a repeat customer.",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "businessType", label: "What you do (1 sentence)", type: "text", required: true },
      { name: "purchase", label: "What did they buy?", type: "text", required: true, placeholder: "e.g., 1-year gym membership, salon-membership package, $99/mo subscription" },
      { name: "valueGoal", label: "What's the most important early-win for them?", type: "text", placeholder: "e.g., 'completing first 3 workouts within 14 days predicts retention'" },
    ],
    systemPrompt: `You write customer onboarding email sequences. NOT corporate "welcome to the family" energy. Real, useful, sets expectations.

Output in markdown. 5 emails. Each email has:

## Email [N]: [Send timing] — [Subject line]

[Body — 3-6 short paragraphs]

**Why this email exists:** [1-sentence rationale for the rep/business owner]

---

Timing:
- Email 1: Send Day 0 (immediately after purchase)
- Email 2: Send Day 1 (next morning)
- Email 3: Send Day 3
- Email 4: Send Day 7
- Email 5: Send Day 14

Quality bar:
- Subjects < 50 chars
- Bodies short — under 150 words each
- Each email has ONE thing it asks them to do OR shows them
- Honest voice, no "you're awesome, we love you" filler
- Reference the early-win goal in at least 2 of the emails`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName} (${i.businessType})`,
      `What they bought: ${i.purchase}`,
      i.valueGoal ? `Early-win goal: ${i.valueGoal}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 2500,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "win-back",
    name: "Customer Win-Back Email",
    tagline: "Email to bring back a customer who went silent.",
    description: "Customer hasn't booked / ordered / engaged in months. AI writes a win-back email that doesn't grovel, doesn't oversell, and gives them a concrete reason to come back.",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "customerName", label: "Customer first name", type: "text", required: true },
      { name: "lastEngagement", label: "Last time they engaged (and what)", type: "text", required: true, placeholder: "e.g., '5 months ago, last haircut was Nov 2025'" },
      { name: "incentive", label: "Incentive you're willing to offer (optional)", type: "text", placeholder: "e.g., 20% off next visit, free add-on service" },
      { name: "newThing", label: "Anything new since they were last in?", type: "text", placeholder: "e.g., new stylist, new menu, new location" },
    ],
    systemPrompt: `You write win-back emails for customers who've gone silent. Not "we miss you!" energy. Acknowledge the gap honestly, give them ONE specific reason to return, make it easy.

Output:

**Subject:** [Specific subject, < 50 chars, doesn't sound like marketing]

[Email body — 4-7 short paragraphs]

Quality bar:
- Acknowledge the time gap briefly without making it weird
- Reference what they did before specifically (use the data they gave)
- ONE clear ask (book / reply / click)
- If there's an incentive, make it specific not vague
- If there's something new, mention it briefly but don't make it the whole email
- No "we miss you", no "where have you been", no guilt
- Sign with first name only — human, not corporate`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Customer: ${i.customerName}`,
      `Last engagement: ${i.lastEngagement}`,
      i.incentive ? `Incentive: ${i.incentive}` : null,
      i.newThing ? `New since last visit: ${i.newThing}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 1200,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "meeting-agenda",
    name: "Meeting Agenda Generator",
    tagline: "Structured agenda for any meeting in 30 seconds.",
    description: "Tell us the meeting type, who's there, and what you want to accomplish. Get a clean agenda with time allocations + pre-work + outcomes-focused structure.",
    category: "Operations & Finance",
    fields: [
      { name: "meetingType", label: "Meeting type", type: "select", required: true, options: ["Sales discovery call", "Sales close meeting", "Client kickoff", "Internal team standup", "1-on-1", "Quarterly review", "Project status", "Decision-making meeting", "Brainstorm", "Other"] },
      { name: "duration", label: "Duration (minutes)", type: "select", required: true, options: ["15", "30", "45", "60", "90", "120"], default: "30" },
      { name: "attendees", label: "Who's attending (names + roles)", type: "text", required: true, placeholder: "e.g., Me, Sarah Chen (salon owner), Bob (her business partner)" },
      { name: "goals", label: "What you want to accomplish", type: "textarea", required: true, placeholder: "Be specific. Multiple goals OK." },
      { name: "context", label: "Context (optional)", type: "text", placeholder: "e.g., 'first meeting after they signed contract', 'they pushed back on price last call'" },
    ],
    systemPrompt: `You write meeting agendas that actually move things forward. Not "introductions, discussion, wrap-up" template energy.

Output in markdown:

# {Meeting type}: {Brief descriptor}

**Date:** [Today's date placeholder — they'll fill in]
**Duration:** [N] min
**Attendees:** [List]

## Pre-work (do this before the meeting)
- [Specific item attendees should review or come prepared with]

## Desired outcomes (what success looks like)
- [Specific outcome 1]
- [Specific outcome 2]

## Agenda

**[0:00 - 0:XX] — [Topic 1]**
- [Subtopic / question / discussion point]

**[0:XX - 0:YY] — [Topic 2]**
- [Subtopic]

[Continue with time allocations summing to the meeting duration]

**[Last 5 min] — Confirm next actions + owners**

## Next actions (template — fill in during meeting)
- [ ] Action 1 — owner — due date
- [ ] Action 2 — owner — due date

Quality bar:
- Time allocations realistic — don't over-stuff a 30-min meeting
- Pre-work is what makes a meeting efficient — always include unless it's truly walk-up
- Outcomes are SPECIFIC and binary (did we hit them y/n)
- Final 5 min always confirms next actions — non-negotiable`,
    buildUserMessage: (i) => [
      `Type: ${i.meetingType}`,
      `Duration: ${i.duration} min`,
      `Attendees: ${i.attendees}`,
      `Goals: ${i.goals}`,
      i.context ? `Context: ${i.context}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 1800,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "job-posting",
    name: "Hiring Job Posting Generator",
    tagline: "Job description that actually attracts the right person.",
    description: "Tell us what role + business. Get back a job posting written like a human: who you are, what they'll do, who fits, who shouldn't apply, how to apply. Cuts through the corporate template noise.",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true, placeholder: "e.g., Bob's Plumbing" },
      { name: "role", label: "Role you're hiring for", type: "text", required: true, placeholder: "e.g., Service technician, dispatcher, salon receptionist" },
      { name: "experience", label: "Experience level", type: "select", options: ["Entry-level / will train", "1-3 years experience", "3-7 years experience", "Senior / 7+ years"], required: true },
      { name: "what", label: "What will they actually do?", type: "textarea", required: true, placeholder: "Specific responsibilities. The more concrete the better — 'answer phones' vs 'manage scheduling for 12-tech team using ServiceTitan'." },
      { name: "pay", label: "Pay range (optional)", type: "text", placeholder: "e.g., $20-25/hr or $60-75k DOE" },
      { name: "culture", label: "Culture hints (optional)", type: "text", placeholder: "e.g., Family-owned, no toxic positivity, owner is on every job site weekly" },
    ],
    systemPrompt: `You write job postings that filter for fit, not just attract resumes. The business owner is small (2-50 employees), not corporate.

Output in markdown. Sections:

# {Role title} — {Business name}

## What we are
[2-3 sentences. Specific. Honest. Not "leading provider of..." corporate-speak.]

## What you'll actually do
- [Concrete daily/weekly tasks — not abstract responsibilities]

## You'll thrive here if
- [Specific traits/skills/experience that map to this business]

## You'll hate this job if
- [Honest signal — "we don't have a fancy HR department", "the boss texts after hours sometimes", "you'll do some things outside your title"]
- (Be specific. This filters out bad fits before they apply.)

## Pay + benefits
[Include the range. If no range, say "competitive based on experience" only as last resort.]

## How to apply
- [Specific. Resume to email? Walk-in welcome? Call?]

Quality bar:
- Human voice. No "join our dynamic team" energy.
- The "you'll hate this if" section is the most important — it does the filtering.
- Honest pay. If you can't share, say why (e.g., "depends on certifications").`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Role: ${i.role}`,
      `Experience level: ${i.experience}`,
      `What they'll do: ${i.what}`,
      i.pay ? `Pay: ${i.pay}` : null,
      i.culture ? `Culture: ${i.culture}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 1800,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "customer-persona",
    name: "Customer Persona Builder",
    tagline: "Three actual customer personas (not corporate fluff).",
    description: "Tell us your business. Get back 3 distinct customer personas — name, age, life situation, what they actually want, what they secretly worry about, where to find them, what NOT to say.",
    category: "AI-Powered",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true, placeholder: "e.g., Bob's Plumbing" },
      { name: "businessDescription", label: "What does the business do?", type: "textarea", required: true, placeholder: "Be specific. Services, geography, what makes you different." },
      { name: "currentCustomers", label: "Current customers (if any)", type: "text", placeholder: "e.g., Mostly homeowners 45-65 in north Atlanta suburbs" },
    ],
    systemPrompt: `You create realistic customer personas. NOT corporate "Marketing Manager Mary, age 35, drinks lattes" cliché. Real ones, with edges.

Output in markdown. Three personas. Each persona has these sections:

## Persona [1/2/3]: [First name + age]

**Lives:** [City, neighborhood, family situation]
**Work:** [Job title + company size/type]
**Income range:** [Honest estimate]

### What they actually want
[1-2 sentences in their voice. Not "best-in-class service" — "I just want someone who'll show up when they say they will".]

### What they secretly worry about
[The fear under the request. "Will I get ripped off? Will this be more complicated than I thought?"]

### Where to find them
- [Specific. "Facebook group: Atlanta Homeowners Connect" / "Nextdoor in their zipcode" — not "social media".]

### What to say to them
"[One opening line in the voice that lands with this persona]"

### What NOT to say
- [Specific. Words/phrases/tones that turn them off.]

Quality bar:
- Three GENUINELY different personas. Not three variations of the same person.
- Each persona has at least ONE thing that's surprising or uncomfortable.
- The "secretly worry about" section is the most important. The persona is real when this is right.`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      `Description: ${i.businessDescription}`,
      i.currentCustomers ? `Current customers: ${i.currentCustomers}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 2500,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "pricing-audit",
    name: "Pricing Page Audit",
    tagline: "Honest read on your pricing page or pricing-conversation script.",
    description: "Paste your pricing page copy (or the way you talk about price). AI audits: is it confusing? Is anchoring wrong? Are you leaving money on the table? Are you too expensive for your audience?",
    category: "Communication & Marketing",
    fields: [
      { name: "businessName", label: "Business name + what you sell", type: "text", required: true, placeholder: "e.g., Cherry Blossom Salon — haircuts + color + balayage" },
      { name: "pricing", label: "Your current pricing (paste it)", type: "textarea", required: true, placeholder: "Paste your pricing page text, or how you currently explain prices to clients. Include the actual numbers." },
      { name: "audience", label: "Who pays?", type: "text", placeholder: "e.g., 'middle-income women 25-50 in Marietta'" },
      { name: "competition", label: "Competitor pricing (if known)", type: "text", placeholder: "e.g., 'Most local salons charge $40-75 for women's cut'" },
    ],
    systemPrompt: `You audit pricing pages and pricing-conversation scripts honestly. Most small businesses underprice + over-explain.

Output in markdown:

## Quick grade: [A | B | C | D | F]
[1 sentence — what's the headline issue or strength]

## What's working
- [Specific elements that are right]

## What's broken
- [Specific elements that hurt sales OR leave money on the table]

## Anchoring read
[Are you anchoring high or low? Does the page set the right context BEFORE showing the number?]

## Pricing structure feedback
[Tiers? Single price? Custom quotes? What would work better for this business + audience?]

## What to add
- [Specific elements missing — comparison context, guarantee, payment plan mention, etc.]

## What to cut
- [Specific elements that confuse or undermine — too many options, hedging language, "starting at" without ceiling]

## Suggested rewrite (just the price section)
[A specific, ready-to-paste rewrite of the most important pricing copy.]

## Three pricing questions to answer yourself
1. [Question 1]
2. [Question 2]
3. [Question 3]

Quality bar:
- Honest. If they're underpricing badly, say so.
- Specific. Quote their actual text, not generic advice.
- Reference their audience and competition in the analysis.`,
    buildUserMessage: (i) => [
      `Business: ${i.businessName}`,
      ``,
      `Pricing:`,
      i.pricing,
      ``,
      i.audience ? `Target audience: ${i.audience}` : null,
      i.competition ? `Competitor pricing context: ${i.competition}` : null,
    ].filter(Boolean).join("\n"),
    maxTokens: 2200,
    outputFormat: "markdown",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "cold-email-audit",
    name: "Cold Email Audit",
    tagline: "Paste your cold email. Get an honest grade + the rewrite.",
    description: "Send us the cold outreach you've been sending. We grade it on subject line, hook, ask, and ethics — then rewrite it to be sharper and 30% shorter. Built by the same AI we use internally.",
    category: "Communication & Marketing",
    fields: [
      { name: "subject", label: "Subject line", type: "text", required: true, placeholder: "e.g., Quick question about Cherry Blossom Salon" },
      { name: "body", label: "Email body", type: "textarea", required: true, placeholder: "Paste the email you've been sending. Don't sanitize — the more authentic, the better the critique." },
      { name: "targetIndustry", label: "Who you're emailing (industry)", type: "text", placeholder: "e.g., Local salons in Atlanta" },
      { name: "yourBusiness", label: "What you're selling (1 sentence)", type: "text", placeholder: "e.g., Booking software for salons that cuts no-shows" },
    ],
    systemPrompt: `You audit cold sales emails. The sender is a salesperson or business owner. They paste their existing cold outreach and want honest, specific feedback + a rewrite.

PV ethics floor: never recommend pressure tactics, false urgency, fake scarcity, deceptive personalization (fake first-name use that pretends to be a friend). Call these out if present in the original.

Output in markdown:

## Grade: [A | B | C | D | F]
[1-sentence explanation of the grade]

## What's working
- [Specific elements with quoted text from the email]

## What's not working
- [Specific elements with quoted text from the email + why]

## Subject line read
[Honest take on the subject line — would you open this? 1-2 sentences.]

## Suggested subject line alternatives
1. [option 1, <60 chars]
2. [option 2, different angle]
3. [option 3, third angle]

## Rewritten email
[Subject: ...]

[Body — 30% shorter than original, sharper, one clear ask, in their voice if discernible. Sign with [Your name].]

## Why this rewrite works
- [Specific change 1]
- [Specific change 2]
- [Specific change 3]

## Want a custom version that runs on YOUR site?
Purcell Ventures builds AI-powered email tools for businesses — automated outreach scoring, template libraries, follow-up sequences. Starting at $179/mo bundled with our Digital Growth tier. Email elijah@purcell-ventures.com.

Quality bar:
- Be honest with the grade. A "C" is fine. Don't grade-inflate.
- Specific over generic. Quote the actual email when calling out what works/doesn't.
- The rewrite should sound like a sharper version of THEM, not corporate template.`,
    buildUserMessage: (i) => [
      `Subject: ${i.subject}`,
      ``,
      `Body:`,
      i.body,
      ``,
      i.targetIndustry ? `Sending to: ${i.targetIndustry}` : null,
      i.yourBusiness ? `Selling: ${i.yourBusiness}` : null,
      ``,
      `Audit per the system instructions.`,
    ].filter(Boolean).join("\n"),
    maxTokens: 2200,
    outputFormat: "markdown",
  },

  // ===== Tools added 2026-05-25 overnight =====

  {
    slug: "bio-writer",
    name: "AI Bio Writer",
    tagline: "Generate professional bios in your voice. Multiple lengths + multiple platforms.",
    description: "Paste a few facts about yourself or your business. AI returns three bios: short (140 chars for X/Twitter), medium (LinkedIn / About page, ~80 words), long (full About page, ~250 words). Same person, three voices.",
    category: "Communication & Marketing",
    fields: [
      { name: "name", label: "Name (person or business)", type: "text", required: true, placeholder: "e.g., Elijah Purcell" },
      { name: "role", label: "Role / title", type: "text", required: true, placeholder: "e.g., Founder of Purcell Ventures LLC" },
      { name: "facts", label: "Key facts (one per line)", type: "textarea", required: true, placeholder: "3-5 lines: what you do, what you've built, what matters to you. Specifics beat generics." },
      { name: "tone", label: "Voice / tone", type: "select", required: true, options: ["Confident", "Conversational", "Formal", "Witty"] },
      { name: "audience", label: "Who reads it (optional)", type: "text", placeholder: "e.g., Small business owners considering AI consulting" },
    ],
    systemPrompt: `You write professional bios. The user provides facts about themselves or their business + tone preference. You return three bios of different lengths.

Output in markdown:

## Short (X/Twitter — 140 chars max)
[Single sentence. Most important fact + voice signature. Counts include spaces.]

## Medium (LinkedIn / About — 60-90 words)
[2-3 sentence paragraph. Same person as Short but with more texture. Specific accomplishments, not generic phrases.]

## Long (Full About page — 200-280 words)
[3-4 paragraph version. Story arc: who they are → what they've done → what they're working on now → how to reach them. Keeps the voice from Short and Medium but expands authentically.]

Quality bar:
- Specific over generic. "Built 30+ products" beats "passionate about technology."
- Active voice. "Built X" not "X was built by me."
- No filler ("I'm a multi-passionate entrepreneur..." dies on first read).
- The voice should match the requested tone — Confident is direct, Conversational is warm, Formal is precise, Witty has personality.
- Don't repeat the same achievement across all three lengths. Lead with different facts in each.
- End the Long bio with one line on how to reach them or what they're doing next.`,
    buildUserMessage: (i) => [
      `Name: ${i.name}`,
      `Role: ${i.role}`,
      `Tone: ${i.tone}`,
      i.audience ? `Audience: ${i.audience}` : null,
      ``,
      `Facts:`,
      i.facts,
    ].filter(Boolean).join("\n"),
    maxTokens: 1800,
    outputFormat: "markdown",
  },

  {
    slug: "press-release",
    name: "AI Press Release Writer",
    tagline: "Generate a press release in 60 seconds for a launch, hire, or milestone.",
    description: "For when you need to announce something publicly and don't want to write a press release from scratch. AI generates a complete press release with headline, dateline, lead, body, boilerplate, and contact info.",
    category: "Communication & Marketing",
    fields: [
      { name: "announcement", label: "What are you announcing", type: "textarea", required: true, placeholder: "e.g., Launch of new AI consulting service / hiring of a new VP / $50k seed funding / new partnership with Local Bank" },
      { name: "businessName", label: "Business name", type: "text", required: true, placeholder: "e.g., Purcell Ventures LLC" },
      { name: "city", label: "City + state (for dateline)", type: "text", required: true, placeholder: "e.g., Acworth, GA" },
      { name: "founderName", label: "Quotable spokesperson", type: "text", required: true, placeholder: "e.g., Elijah Purcell, Founder" },
      { name: "businessOneLiner", label: "Business one-liner (for boilerplate)", type: "text", required: true, placeholder: "e.g., AI consulting + custom software for small businesses" },
      { name: "contactEmail", label: "Contact email", type: "text", required: true, placeholder: "e.g., elijah@purcell-ventures.com" },
    ],
    systemPrompt: `You write press releases. The user provides facts about an announcement. You return a complete, AP-style press release.

Output in markdown:

# FOR IMMEDIATE RELEASE

## [Compelling headline — single line, under 12 words, no clickbait]

### [Optional subhead — single line, can be longer, adds context]

**[CITY], [State] — [Today's date]** — [Opening paragraph: the 5 W's compressed into 2-3 sentences. The reader should know WHO, WHAT, WHERE, WHEN, WHY from this paragraph alone.]

[Body paragraph 1: Expansion on the most important aspect. Specific details.]

[Body paragraph 2: Quote from the spokesperson — make it sound like something a real human would say, not a marketing template. Attribute as "[Name], [Title], said:" before the quote.]

[Body paragraph 3 (optional): Context, supporting information, what comes next.]

[Body paragraph 4 (optional): Second quote from spokesperson OR data point that strengthens the story.]

### About [Business name]
[2-3 sentence boilerplate about the business — keep this short, factual, evergreen so it can be reused in future releases.]

### Media Contact
[Spokesperson name]
[Email]
[Phone, if available]

###

Quality bar:
- Headlines: specific, factual, no superlatives ("first," "best," "revolutionary")
- Quotes: sound like a human said them, not a press kit. Include specifics.
- Body: factual. Save the editorializing for blog posts.
- Length: 350-500 words total. Press releases are not essays.`,
    buildUserMessage: (i) => [
      `Announcement: ${i.announcement}`,
      `Business: ${i.businessName}`,
      `City: ${i.city}`,
      `Spokesperson: ${i.founderName}`,
      `Business description: ${i.businessOneLiner}`,
      `Contact: ${i.contactEmail}`,
    ].join("\n"),
    maxTokens: 2000,
    outputFormat: "markdown",
  },

  {
    slug: "review-request",
    name: "AI Customer Review Request",
    tagline: "Generate a personalized review-request email or text. Polite, specific, hard to ignore.",
    description: "After a positive customer interaction, send a request for a Google/Yelp/Facebook review. AI personalizes based on what they actually bought + a specific moment from the experience. Reads as written, not templated.",
    category: "Communication & Marketing",
    fields: [
      { name: "customerName", label: "Customer's first name", type: "text", required: true, placeholder: "e.g., Sarah" },
      { name: "service", label: "What they bought", type: "text", required: true, placeholder: "e.g., AI Booking Setup for Cherry Blossom Salon" },
      { name: "specificMoment", label: "A specific moment you remember", type: "textarea", required: true, placeholder: "e.g., When she said the AI texts cut Saturday phone calls by half / when she came in early to learn the system / her referring two stylists to her network" },
      { name: "businessName", label: "Your business name", type: "text", required: true, placeholder: "e.g., Purcell Ventures" },
      { name: "platform", label: "Review platform", type: "select", required: true, options: ["Google", "Yelp", "Facebook", "Trustpilot", "Other"] },
      { name: "channel", label: "Sending via", type: "select", required: true, options: ["Email", "Text message", "Both"] },
    ],
    systemPrompt: `You write personalized review-request messages. The user supplies a customer name, what they bought, a specific moment from the experience, and the review platform.

CRITICAL: review-request messages are dying because they all sound the same. Your job is to write one that sounds like a real human wrote it specifically for THIS customer.

Output format depends on channel:

If Email:
\`\`\`
Subject: [specific, personal, under 50 chars]

Hi [name],

[Open with a callback to the specific moment — proves you remember them as a person, not a transaction. 2-3 sentences.]

[The ask — direct. One sentence. Include the specific platform link.]

[Closing — short. Mention you read every review personally. Sign with first name.]
\`\`\`

If Text message:
\`\`\`
Hi [name] — quick one. [Callback to the specific moment in 1 sentence.] If you'd be willing to leave a quick review on [platform] at [link], it'd mean a lot. No worries if not. — [first name]
\`\`\`

If Both: include both formats with clear "EMAIL VERSION:" and "TEXT VERSION:" headers.

Quality bar:
- The callback to the specific moment should sound like a human remembering, not a database entry.
- Don't oversell the ask. "If you'd be willing" beats "would love it."
- The text version must be under 320 characters (one SMS).
- Never include "Five stars would help us a lot!" or any other pressure phrase. That's manipulation.
- Always include the actual [link] placeholder for the user to fill in.
- For text: avoid emojis (most people hate them in marketing texts).
- Sign with first name only, not full signature.`,
    buildUserMessage: (i) => [
      `Customer: ${i.customerName}`,
      `What they bought: ${i.service}`,
      `Specific moment to reference: ${i.specificMoment}`,
      `Business: ${i.businessName}`,
      `Platform: ${i.platform}`,
      `Channel: ${i.channel}`,
    ].join("\n"),
    maxTokens: 1500,
    outputFormat: "markdown",
  },
];

export function getTool(slug: string): AIToolConfig | undefined {
  return AI_TOOLS.find((t) => t.slug === slug);
}
