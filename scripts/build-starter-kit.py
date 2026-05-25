#!/usr/bin/env python3
"""
build-starter-kit.py — Assembles the PV AI Starter Kit ZIP from the
content already in the codebase (system prompts, scripts, handbook).

Output: dist/pv-starter-kit.zip + dist/pv-starter-kit/ (the staging dir)

Usage:
    python scripts/build-starter-kit.py

What it does:
1. Extracts the 24 AI tool system prompts from lib/ai-tools.ts
2. Extracts the 5 sales scripts from app/rep-portal/scripts/page.tsx
3. Bundles the contractor agreement + handbook from sales-rep-system/
4. Writes an INDEX.md (table of contents)
5. Creates a CRM CSV template with sample rows
6. Zips everything into dist/pv-starter-kit.zip

Once built, Elijah uploads pv-starter-kit.zip to Stripe (Stripe handles
delivery via email automatically when someone buys).
"""

import json
import os
import re
import sys
import zipfile
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
DIST_DIR = PROJECT_ROOT / "dist" / "pv-starter-kit"
ZIP_PATH = PROJECT_ROOT / "dist" / "pv-starter-kit.zip"

def ensure_clean_dist():
    """Wipe and recreate dist staging dir."""
    if DIST_DIR.exists():
        import shutil
        shutil.rmtree(DIST_DIR)
    DIST_DIR.mkdir(parents=True, exist_ok=True)
    for folder in ["01-ai-prompts", "02-sales-scripts", "03-handbook", "04-templates", "05-cold-outreach"]:
        (DIST_DIR / folder).mkdir(exist_ok=True)

def extract_ai_prompts():
    """Parse lib/ai-tools.ts and extract each tool's slug + name + systemPrompt."""
    src = (PROJECT_ROOT / "lib" / "ai-tools.ts").read_text(encoding="utf-8")
    # Match each tool config: { slug: "...", name: "...", ..., systemPrompt: `...`, ... }
    # Tools are separated by ─── lines; each starts with { slug: "..."
    pattern = re.compile(
        r'\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*tagline:\s*"([^"]+)",[^`]*systemPrompt:\s*`([^`]+)`',
        re.DOTALL
    )
    tools = []
    for m in pattern.finditer(src):
        slug, name, tagline, prompt = m.group(1), m.group(2), m.group(3), m.group(4)
        tools.append({"slug": slug, "name": name, "tagline": tagline, "prompt": prompt.strip()})
    print(f"  Extracted {len(tools)} AI tool prompts")
    return tools

def write_ai_prompts(tools):
    folder = DIST_DIR / "01-ai-prompts"
    # Index
    index_lines = ["# AI Tool System Prompts\n", "Drop any of these into Claude or ChatGPT and follow the structure. Edit the placeholder fields to fit your business.\n", "## Contents\n"]
    for i, t in enumerate(tools, 1):
        fname = f"{i:02d}-{t['slug']}.md"
        index_lines.append(f"- [{t['name']}]({fname}) — {t['tagline']}")
        # Individual prompt file
        content = f"# {t['name']}\n\n*{t['tagline']}*\n\n## System Prompt (paste this into Claude or GPT)\n\n```\n{t['prompt']}\n```\n\n## How to use\n\n1. Paste the system prompt above into Claude (Project) or ChatGPT (Custom GPT system instructions).\n2. Send your business details as a user message.\n3. Iterate. The prompt is opinionated — adjust the quality bar section if you want different output style.\n"
        (folder / fname).write_text(content, encoding="utf-8")
    (folder / "00-INDEX.md").write_text("\n".join(index_lines), encoding="utf-8")

def write_sales_scripts():
    """Hand-curated since the source is in JSX. Write the 5 frameworks + 3 cadences directly."""
    folder = DIST_DIR / "02-sales-scripts"
    scripts = [
        ("01-soft-close.md", "Soft-Close Framework", """# The Soft-Close Framework

Use when the prospect is interested but hasn't committed.

## Structure

1. **Acknowledge their interest:** "Sounds like this is a fit for you."
2. **Specify the next step:** "What I'd usually do next is [send proposal / set up the demo / schedule the kickoff]."
3. **Get explicit permission:** "Want me to go ahead and do that?"
4. **Wait silently.** Do not fill the silence.

## When it works
- They've engaged with discovery questions
- They've pushed back on price but didn't kill the deal
- The conversation has natural energy

## When it doesn't
- They're still in "tell me more" mode — too early
- They've raised an unresolved objection — handle that first

## Variation: Two-Path Soft Close
"Two ways to start — [Option A] or [Option B]. Which fits where you are?"

Constraining choice helps decision-paralysis prospects.
"""),
        ("02-demo-close.md", "Demo-Close Framework", """# The Demo-Close Framework

Use during a live demo / tool walkthrough.

## Structure

1. **Demo to ONE specific outcome.** Not "here's everything" — "here's the thing that solves the problem you described."
2. **Pause at the magic moment.** Let them react.
3. **Ask:** "What's stopping us from getting you set up today?"
4. **Listen for the REAL objection** (often price, sometimes authority, sometimes timing).
5. **Address that one specific objection.** Then ask again.

## The magic moment
Always exists. It's the 5-second window where they SEE the value, not just hear it described. Don't move past it.

## Voice tone
Calm. Confident. NEVER rushed. The pitch comes from your competence, not your enthusiasm.
"""),
        ("03-objection-handling.md", "Objection-Handling Framework", """# Objection-Handling Framework

When the prospect raises a concern.

## Structure

1. **Validate first.** "That makes sense" / "I hear you."
2. **Diagnose.** Ask ONE clarifying question to understand if the surface objection is the real one.
3. **Respond with evidence, not argument.**
4. **Re-check.** "Does that address it, or is there something else?"

## The 3 response strategies

### Agree-and-Pivot
Validate the concern, redirect to something stronger.
Example: "You're right that $179/mo is a real number. The math is: if it saves you 3 hours/week, your time is worth what — $50/hr? That's $600/mo in time alone."

### Clarifying-Question
When you're not sure if the surface objection is real.
Example: They say "too expensive" → You ask: "Compared to what?"

### Direct-Pushback
When you have evidence and the prospect is engaged enough to take a counter.
Example: "Most of our clients had a website already too. The difference is what it does — yours is sitting there. Ours runs your business."

## Don't
- Argue them out of a bad fit
- Discount on your own authority (Pilot Partner only)
- Pressure or guilt — both kill trust permanently
"""),
        ("04-pilot-partner-pitch.md", "Pilot Partner Pitch", """# Pilot Partner Pitch (the 30% Discount)

**When to use:** Prospect is fit + willing but price-sensitive. Or you want a specific testimonial / referral chain.

## The pitch

"We have 3 Pilot Partner spots left across [tier]. Here's how it works:

- 30% off setup
- 30% off first 6 months
- Price locked for those 6 months

In exchange:
- 2-3 sentence testimonial at month 2
- Case-study rights (anonymous if you want)
- One referral intro within 6 months

That makes [tier] [pilot price] for the first 6 months instead of [standard]. After 6 months, it goes to [standard] — but you have the data to renew based on actual results.

Want one of those 3 spots?"

## Why it works

- Real scarcity (3 spots, not made-up)
- Real value exchange (you save them money; they help you market)
- Future-paced (locks them in for 6 months at a price that feels fair)
- Tests commitment (people who won't sign a 6-month at 30% off weren't going to convert anyway)

## When NOT to use
- They've already accepted standard pricing — don't undercut yourself
- They're a small one-off who can't refer anyone
- You're past the 3 pilot spots — don't lie about scarcity
"""),
        ("05-final-touch.md", "Final-Touch / Exit-Permission Script", """# The Final-Touch Script

Use after 3+ follow-ups with no response. Don't be the rep who pesters forever.

## The email

**Subject:** Last bump — yes/no/move-on

**Body:**

Hi [first name],

Last touch on this. If now's not the right time for [service], just text NO and I'll stop pestering — totally fine.

If you want to keep talking, give me a window this week or next.

Either is fine.

— [Your name]

## Why it works

- Permission to say no removes the social cost of ghosting
- Gives them an easy out, which often produces a yes by removing the pressure to say yes
- Protects your time — anyone who's not going to convert gets out of your follow-up queue
- Builds reputation: "they don't push" → future referrals

## The follow-up cadence that earned the right to send this

- Day 0: Initial pitch
- Day 3: Specific follow-up referencing the conversation
- Day 7: Send a piece of value (article, template, idea)
- Day 14: Light check-in
- Day 21: This final-touch email

If they don't respond to this, they're done. Mark Closed Lost. Re-pitch in 90 days with a new angle if appropriate.
"""),
        ("06-follow-up-cadence-warm.md", "Warm Follow-Up Cadence (after demo)", """# Warm Follow-Up Cadence

After a demo or interested conversation that didn't close on the call.

## Schedule

**Day 0 (within 1 hour of call):**
Recap email with the specific things they said + the next step you proposed. Don't quote unless quoted.

**Day 1:**
Send 1 piece of value relevant to what they brought up. Could be a screenshot, a case study, a 2-min Loom.

**Day 3:**
Quick check-in: "Wanted to bump this — any reaction?"

**Day 7:**
If still silent, more substantive nudge. Reference time-sensitivity if real (e.g., "the 3 Pilot Partner spots are still open but I have one going to a vet office next week, wanted to give you the option first").

**Day 14:**
Light: "Still on my list. Want me to keep it there?"

**Day 21:**
Final-touch script (see file 05).

**Day 90:**
Re-pitch with a new angle if they didn't explicitly Closed Lost.

## Rules
- Every message has ONE clear ask
- No more than 5 touches in a sequence
- Always reference something specific from the prior conversation
"""),
        ("07-follow-up-cadence-cold.md", "Cold Follow-Up Cadence (after first contact)", """# Cold Follow-Up Cadence

After a cold outreach that got no response.

## Schedule

**Day 0:** First cold outreach (see folder `05-cold-outreach/`).

**Day 4:** "Bumping this in case it got buried" + a one-line reason to care.

**Day 10:** Different angle. If first email was problem-focused, this one is opportunity-focused (or vice versa).

**Day 21:** Final-touch script with an explicit "delete this if not interested."

**Stop after 4 touches** on cold. Anything more is harassment.

**Re-engage after 6 months** if the business looks like it's evolved (new website, new social activity).

## Rules

- No "just following up" with no new info — useless
- Don't apologize for following up
- Don't lead with "Did you see my last email?" — it's whining
"""),
        ("08-follow-up-cadence-quoted.md", "Quoted-but-Silent Follow-Up Cadence", """# Cadence for After You've Sent a Quote and They Went Silent

## Day 1 after quote
"Want to confirm you received the proposal — happy to walk through it on a 10-min call if useful."

## Day 3
"Any reaction yet? Sometimes a small tweak gets it over the line — happy to adjust if there's something specific."

## Day 5
Send relevant social proof (testimonial / case study / similar client's outcome).

## Day 7
"Want me to keep this open or set it aside for now?" — explicit permission script.

## Day 14
Final touch.

## Why this differs from warm cadence
- They've SEEN a number. Their silence means SOMETHING.
- They might be negotiating internally (with a partner, with budget). Reduce friction, don't pressure.
- They might be waiting for a competitor quote. Make staying with you easy.

## Critical rule
**NEVER drop the price unilaterally during silence.** That signals you'd have always discounted. Wait for them to ask. If they don't ask, the deal wasn't real.
"""),
    ]
    index_lines = ["# Sales Scripts\n", "5 close frameworks + 3 follow-up cadences. Battle-tested.\n", "## Contents\n"]
    for fname, title, content in scripts:
        index_lines.append(f"- [{title}]({fname})")
        (folder / fname).write_text(content, encoding="utf-8")
    (folder / "00-INDEX.md").write_text("\n".join(index_lines), encoding="utf-8")
    print(f"  Wrote {len(scripts)} sales script files")

def write_handbook():
    folder = DIST_DIR / "03-handbook"
    content = """# The PV Rep Handbook (Sanitized for Resale)

Original handbook used internally at Purcell Ventures. Sanitized to remove specific names + internal credentials.

## §1. Why this exists

The handbook is the contract. If you (or your reps) violate something written here, you have grounds to terminate. If we (or someone you've trained) violate something, you have grounds to terminate them.

## §2. The Hard Rules (non-negotiable)

1. **No pressure tactics.** Ever. Don't manufacture urgency. Don't say "this offer ends today" unless it actually does.
2. **No false scarcity.** If you have 47 Pilot Partner spots, say so. If you have 3, say 3. Never lie about quantity.
3. **No promising what we don't sell.** If a prospect asks for something outside the catalog, escalate or refer out.
4. **No quoting Custom Software.** Always escalate to ownership for scoping.
5. **No discounting below Pilot Partner rates** without owner approval.
6. **No bad-mouthing competitors.** Reference comparison data; don't sneer.
7. **No working with businesses we don't believe in** (predatory finance, MLM, etc.).
8. **Always set a next follow-up date** on every contact. Empty next-followup field = the contact rots silently.
9. **Always log activities within 5 minutes of the conversation.**
10. **Honesty over closing.** If the prospect isn't a fit, say so. Burn the close, save the relationship.

## §3. Commission tiers

(Edit these to match YOUR business — these are PV's defaults.)

- Per-deal: $40-100 based on tier sold + 10% recurring on monthly
- Consulting: 15% of total
- Custom Software: 10% (owner closes)
- Courses: 20% one-time

## §4. The Pilot Partner program (when + how to offer)

See `02-sales-scripts/04-pilot-partner-pitch.md` for the verbatim pitch.

**Quantity:** 3 spots per tier per quarter, refreshed each quarter.

**In exchange:** testimonial at month 2 + case-study rights + 1 referral within 6 months.

**Don't offer to:** one-off small purchases (no leverage), prospects who can't refer (no compound value), or anyone who's already accepted standard pricing (don't undercut yourself).

## §5. Escalation rules

Escalate to ownership for:
- Custom Software inquiries (ANY size)
- Negotiation below Pilot Partner rates
- Consulting deals over $2,000
- Prospects claiming past customer status
- Anything where you're unsure

How: text the owner. Format: "Got a [SERVICE] prospect, [BUDGET], decision [TIMELINE]. Need 5 min before I quote."

Don't escalate in front of the prospect. Step out, text, step back.

## §6. After every call — checklist

1. Log the call within 5 minutes
2. Update the stage if the deal moved
3. Set the next follow-up date
4. Add any committed-to actions as tasks
5. If clear NO, mark Closed Lost with WHY
6. If clear YES, send next-step email within 60 minutes

## §7. The relationship is the asset

You are not selling a transaction. You are starting a relationship that compounds:
- Today's "no" can be tomorrow's referral
- Today's small client can become a case study
- Today's lost deal can become a referral source

Burn the close, save the relationship.

## §8. When to walk away

Walk away from a deal when:
- The prospect's business model is incompatible with PV ethics
- The prospect treats you poorly (yells, demeans, threatens)
- The prospect wants something we can't deliver well
- The chemistry is so bad both sides will regret it

A walked-away deal is a saved year of pain.
"""
    (folder / "REP-HANDBOOK.md").write_text(content, encoding="utf-8")
    print("  Wrote rep handbook")

def write_templates():
    folder = DIST_DIR / "04-templates"

    contractor = """# 1099 Contractor Agreement Template

**(This is a starting-point template. Have a lawyer review before using.)**

---

## INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is entered into on [DATE] between [YOUR COMPANY LLC] ("Company") and [CONTRACTOR NAME] ("Contractor").

### 1. Engagement
Contractor agrees to perform sales services for Company on a 1099 independent contractor basis. Contractor is not an employee.

### 2. Compensation
Contractor is paid per closed deal per the commission schedule attached as Exhibit A. Compensation is paid within 14 days of successful payment receipt from the customer.

### 3. Term
This agreement begins on [START DATE] and may be terminated by either party with 14 days written notice.

### 4. Scope
Contractor may sell Company products and services as listed on Company's website at the time of sale, at prices established by Company. Contractor may not offer discounts below the Pilot Partner program without written Company approval.

### 5. Ethical Conduct
Contractor agrees to follow the Rep Handbook (attached as Exhibit B) including the Hard Rules in §2. Violation is grounds for immediate termination.

### 6. Non-Disclosure
Contractor agrees not to share Company's proprietary information including pricing strategies, customer lists, and internal procedures with third parties.

### 7. Independent Status
Contractor is an independent contractor responsible for their own taxes, insurance, and business expenses.

### 8. Intellectual Property
All sales materials remain property of Company. Customer contact information collected belongs to Company.

### 9. Termination
Either party may terminate with 14 days notice. On termination, Contractor returns all Company materials and any outstanding commissions are paid within 30 days.

### 10. Governing Law
This Agreement is governed by the laws of [STATE].

---

**Signatures:**

Company: ________________________  Date: __________

Contractor: ______________________  Date: __________

**For contractors under 18, parent/guardian co-signature required:**

Parent/Guardian: __________________  Date: __________

Relationship: __________________

---

## Exhibit A: Commission Schedule

(Edit per your business. PV's defaults shown.)

| Product | Per-Deal | Recurring | Notes |
|---|---|---|---|
| Digital Starter | $40 | 10%/mo | First 12 months only |
| Digital Growth | $70 | 10%/mo | First 12 months only |
| Digital Full | $100 | 10%/mo | First 12 months only |
| Consulting 1-on-1 | 15% of total | — | — |
| Consulting Workshop | $375 | — | — |
| Courses | 20% | — | One-time |

Recurring commission paid monthly while customer remains active.
"""
    (folder / "01-contractor-agreement.md").write_text(contractor, encoding="utf-8")

    crm_csv = """firstName,lastName,email,phone,company,title,stage,estimatedValue,service,source,nextFollowUp,tags,notes
Sarah,Chen,sarah@cherryblossomsalon.com,(770) 555-0142,Cherry Blossom Salon,Owner,Lead,99,Digital Starter,Web form,2026-05-26,salon,Filled out form at 2 AM
Mike,Patterson,mike@pattersonplumb.com,(770) 555-0118,Patterson Plumbing,Owner,Contacted,179,Digital Growth,Referral,2026-05-25,trades,Called Tuesday — left voicemail
Linda,Garcia,linda@lindastax.com,(404) 555-0273,Linda's Tax,Owner,Qualified,2500,Consulting Workshop,LinkedIn,2026-05-27,accounting,12-person team
James,Walker,james@walkergroup.com,(770) 555-0411,Walker RE Group,Broker,Quoted,279,Digital Full,Cold outreach,2026-05-29,real-estate,8 agents — quoted $1k setup + $279/mo
Aisha,Williams,aisha@brightsmile.com,(770) 555-0856,Bright Smile Dental,Owner,Negotiation,125,Digital Growth Pilot,Web form,2026-05-25,dental,Asked for Pilot Partner pricing
"""
    (folder / "02-crm-template.csv").write_text(crm_csv, encoding="utf-8")

    email_templates = """# Email Template Library (4 starters)

Use {{tokens}} as placeholders. Replace before sending.

## Template 1: Day-3 Follow-Up After Quote

**Subject:** Quick follow-up on {{service}}

```
Hi {{firstName}},

Wanted to bump my earlier note about {{service}} for {{company}} — no pressure, just wanted to make sure it didn't get buried.

A few quick things in case useful:
• [Specific point 1 from your conversation]
• [Specific point 2]

Happy to schedule a 15-min call if you want to talk through it, or if you're a 'not right now' that's totally fine — just text NO and I'll move on.

— {{repName}}
```

---

## Template 2: Cold Outreach (Local Business)

**Subject:** Quick question about {{company}}

```
Hi {{firstName}},

I run [your business] — we build digital tools for small businesses in [city]. I noticed {{company}} and had a quick thought.

[Specific observation about their business — website, hours, social presence, something concrete]

We help businesses like yours add [chatbot / booking / CRM / etc.] for $99-279/mo. It's not for everyone but if it's interesting, I'd love to grab 15 minutes.

If not, no worries — just delete this. Take care.

— {{repName}}
```

---

## Template 3: Pilot Partner Pitch

**Subject:** Pilot Partner spot for {{company}}?

```
Hi {{firstName}},

I mentioned the Pilot Partner program on our call — wanted to put the details in writing.

We just launched our [tier] and have 3 Pilot Partner spots left. If you're a fit:
• 30% off setup
• 30% off first 6 months
• Locked-in price for that 6 months
• In exchange: a 2-3 sentence testimonial at month 2, case-study rights (anonymous if you want), one referral intro within 6 months

Standard: {{standardPrice}}
Pilot Partner: {{pilotPrice}}

If you want one of those spots, let me know this week — once they're gone they're gone.

— {{repName}}
```

---

## Template 4: Final Touch — Going Silent

**Subject:** Last bump — yes/no/move-on

```
Hi {{firstName}},

Last touch on this. If now's not the right time for {{service}}, just text NO and I'll stop pestering — totally fine.

If you want to keep talking, give me a window this week or next.

Either is fine.

— {{repName}}
```
"""
    (folder / "03-email-templates.md").write_text(email_templates, encoding="utf-8")

    steady = """# The "Steady" Service Model — Comparison Framework

This is the framework we use to position our Personal IT service ("Steady") against alternatives. Use as a template for ANY service offering when you need to differentiate.

## The 4-Column Comparison Table

| Concern | Our Service | Big Box Alternative | DIY / Free | Asking Friend/Family |
|---|---|---|---|---|
| [Concern 1] | [What we do] | [What they do] | [What it requires] | [Soft cost] |
| [Concern 2] | ... | ... | ... | ... |

## Steady's actual table

| Concern | Steady | Geek Squad / Best Buy | DIY | Asking your kid |
|---|---|---|---|---|
| Patience with non-techies | ✓ Designed for it | Hit or miss | — | Often frustrated |
| Teaches you (vs. fixes) | ✓ Always | Rarely | You teach yourself | Rarely |
| Available between visits | ✓ Unlimited texts (Monthly+) | Pay per visit | — | Yes but busy |
| Cost (typical month) | $79-149/mo | $200+/visit, $300/yr plans | $0 + your time | $0 (and their patience) |
| Knows AI tools | ✓ Specialty | Generally no | YouTube tutorials | Depends on the kid |
| Handles family members | ✓ Family Care plan | Each pays separately | Everyone alone | You become the support desk |
| Will return your call | ✓ Same day | Maybe | — | Eventually |

## Why this format works

1. **Honest acknowledgment of alternatives** — builds trust by showing you've thought about them
2. **Specific row labels** — "patience with non-techies" beats "customer service"
3. **Concrete numbers** — "$200+/visit" beats "more expensive"
4. **The ✓ visual** does heavy lifting

## Adapt for your business

Replace the rows with the dimensions your prospect actually cares about. Use the alternatives THEY would consider, not generic ones.
"""
    (folder / "04-steady-comparison-framework.md").write_text(steady, encoding="utf-8")

    pricing = """# Pricing Reference Template

Build your own version of this. Pin it where reps + you can both reach it.

## Template Structure

For each product/service:

### [Product Name]

**Standard Price:** $X
**Pilot Partner:** $Y (if applicable)
**What's included:**
- Specific deliverable 1
- Specific deliverable 2
- Specific deliverable 3

**What's NOT included** (most important for protecting against scope creep):
- Specific exclusion 1
- Specific exclusion 2

**Commission to rep (per closed deal):** $Z + W% recurring

**Cost basis** (internal — don't share with prospect):
- Your time at $X/hr × Y hr
- Materials/software at $Z/mo
- Margin: ~M%

**Pricing conversation rules:**
- Never quote below Pilot Partner without owner approval
- Setup fees are non-negotiable EXCEPT for Pilot Partners
- Monthly fees can drop ONE tier with owner approval (e.g., Growth $179 → $150 for a great fit with referral potential)

---

## Why explicit cost basis matters

If you don't know your cost-of-delivery, you're guessing on pricing. Calculate it once per product, then trust the math.

## Why explicit exclusions matter

Most contractor regret comes from "scope creep" — the customer assumed something was included that wasn't. The exclusions list is the single most valuable part of any pricing page.
"""
    (folder / "05-pricing-template.md").write_text(pricing, encoding="utf-8")

    print("  Wrote 5 template files")

def write_cold_outreach():
    folder = DIST_DIR / "05-cold-outreach"
    content = """# Cold Outreach Email Template Library

50+ templates. Use {{tokens}} as placeholders. Replace before sending.

## How to actually use this library

1. Pick the template that matches the prospect's industry
2. Replace {{tokens}} with their specifics — NEVER send unedited
3. Add ONE personalized observation (their website, their social, news about them)
4. Send. Track in CRM. Follow up per the cadences in `02-sales-scripts/`.

## Subject Line Library (40 options)

### Direct
1. Quick question about {{company}}
2. {{firstName}} — quick thought on {{businessChallenge}}
3. {{businessTrait}} — saw your work
4. About {{specificThingTheyDo}}
5. Considered {{specificSolution}}?

### Question
6. Are you the right person to ask about {{topic}}?
7. How are you handling {{specificProblem}}?
8. Worth 60 seconds?
9. Familiar with {{competitorOrThing}}?
10. Time for a quick chat?

### Referral
11. {{referrer}} mentioned {{company}}
12. {{referrer}} said to reach out
13. {{referrer}} → {{firstName}}
14. {{referrer}} thought we should connect
15. Forwarded from {{referrer}}

### Observation
16. Noticed {{specificThing}} about {{company}}
17. Saw your {{recentPost / project / news}}
18. Caught {{specificThing}} on your site
19. {{specificObservation}} — quick thought
20. Watching {{thingTheyDo}} closely

### Local
21. Another {{city}} business owner
22. Down the road from you
23. {{city}}-specific question
24. Local to you in {{neighborhood}}
25. Saw you at {{specificLocation/event}}

### Value-First
26. Free {{thingTheyNeed}} for {{company}}?
27. Built this for businesses like yours
28. 5-min thing I made for {{businessType}}
29. Resource for {{specificChallenge}}
30. {{specificThing}} I thought you'd want

### Curiosity
31. {{numberOrFact}} — context inside
32. Probably already know this but
33. One question, then I'll leave you alone
34. Wrong about {{commonAssumption}}?
35. {{contrarianStatement}}

### Time-bound (use SPARINGLY and only when real)
36. Before {{realDeadline}}
37. Last week to mention this
38. Closing this Friday
39. Quick because {{realReason}}
40. Time-sensitive: {{realReason}}

---

## 10 Industry-Specific Cold Opens

### 1. Salon / Spa

**Subject:** Quick question about {{salonName}}

```
Hi {{firstName}},

I run {{yourCompany}} — we build digital tools for salons and spas in {{city}}. I checked out {{salonName}}'s online presence and had a quick thought.

You're doing {{specificThing}} really well, but {{specificGap}} stood out. We've helped salons add {{specificFix}} that {{specificOutcome}}.

If interesting, I have 15 min this week. If not, no problem — just delete this.

— {{yourName}}
```

### 2. Plumbing / HVAC / Trades

**Subject:** Saw a pattern in how {{businessType}}s are using AI

```
Hi {{firstName}},

I help small businesses with AI tools — particularly the trades. Most plumbers / HVACs I work with were skeptical at first.

Three things they had in common before working with me:
- Phone rang less than it used to
- They were losing leads to bigger shops with better websites
- They didn't have time to figure out tech themselves

Sound like {{company}}?

If yes, I have 15 min this week. If not, totally fine.

— {{yourName}}
```

### 3. Dental / Medical Practice

**Subject:** Front-desk question about {{practiceName}}

```
Hi {{firstName}} (or {{officeManager}}),

I noticed {{practiceName}} doesn't have {{specificThing}} on your booking page. Most practices we work with see {{specificOutcome}} after adding it.

We do this for practices for $179/mo, fully managed. No more "log into your software" headaches.

Open to a 10-min walkthrough? If not, here's a free guide on {{relatedTopic}}: [link]

— {{yourName}}
```

### 4. Real Estate Brokerage

**Subject:** Lead-routing question for {{brokerageName}}

```
Hi {{firstName}},

I work with real estate offices on AI-powered lead routing — most brokerages still email leads manually to the next-up agent. We automate the routing AND the first-touch follow-up.

Brokers who use it report {{specificMetric}}.

Worth 15 minutes to compare to what {{brokerageName}} does now?

— {{yourName}}
```

### 5. Law Firm

**Subject:** Intake automation for {{firmName}}

```
Hi {{firstName}},

Most law firms we work with were spending {{specificHours}} on intake — qualifying leads, scheduling consults, gathering docs. We automated that for under $200/mo.

If you're seeing intake as a bottleneck, I have a 15-min walkthrough — not a pitch, just the workflow. If not, no problem.

— {{yourName}}
```

### 6. Marketing Agency

**Subject:** White-label AI for {{agencyName}}?

```
Hi {{firstName}},

I noticed {{agencyName}} {{specificObservation}}. Have you considered white-labeling AI tools for your clients?

We provide the AI infrastructure; you keep the client relationship. Most agencies that add this see {{specificOutcome}}.

Open to a quick chat?

— {{yourName}}
```

### 7. E-Commerce Brand

**Subject:** {{specificProductFeature}} on {{brandName}}'s site

```
Hi {{firstName}},

Quick observation about {{brandName}}'s product page for {{specificProduct}} — {{specificImprovement}}.

We help brands implement {{specificThing}} for ~$179/mo. Most see {{specificOutcome}} within 30 days.

Worth a look?

— {{yourName}}
```

### 8. Wellness / Fitness Studio

**Subject:** Booking gap I noticed at {{studioName}}

```
Hi {{firstName}},

Looked at {{studioName}}'s booking flow — {{specificGap}}. Studios that fix this see ~{{specificMetric}}.

We do this end-to-end for $179/mo (Mindbody integration included). Worth 15 minutes?

— {{yourName}}
```

### 9. Veterinary Practice

**Subject:** Question about new client onboarding at {{practiceName}}

```
Hi Dr. {{lastName}},

I work with veterinary practices on intake + follow-up automation. Most practices we work with cut new-client onboarding from {{specificTime}} to {{betterTime}}.

If that's interesting for {{practiceName}}, I have 15 min this week. If not, no worries.

— {{yourName}}
```

### 10. Accounting / Bookkeeping Firm

**Subject:** Tax-season workflow for {{firmName}}

```
Hi {{firstName}},

Tax-season chaos is mostly a workflow problem, not a tax-knowledge problem. We help accounting practices automate {{specificThing}} so the team can focus on actual work, not chasing docs.

Most see {{specificImprovement}}.

Worth 15 minutes after April closes out?

— {{yourName}}
```

---

## 5 Referral-Based Openers

1. **The Direct Referral**
   ```
   Subject: {{referrer}} → {{firstName}}

   Hi {{firstName}},

   {{referrer}} mentioned you might want to talk about {{topic}}. I help with {{specificThing}}.

   Got 15 min this week?

   — {{yourName}}
   ```

2. **The Indirect Referral**
   ```
   Subject: Following {{referrer}}'s recommendation

   Hi {{firstName}},

   {{referrer}} said {{company}} was the kind of business we should know. I work in {{yourSpace}}.

   Worth a quick chat?

   — {{yourName}}
   ```

3. **The Reverse-Direction Referral**
   ```
   Subject: Going to recommend you to {{otherProspect}}

   Hi {{firstName}},

   I work with {{prospectIndustry}} businesses on {{specificThing}}. {{otherProspect}} asked who I'd recommend for {{theirNeed}}, and {{company}} keeps coming up.

   Want me to make the intro? Also happy to chat about {{relatedThing}} if useful for {{company}} too.

   — {{yourName}}
   ```

4. **The Community Referral**
   ```
   Subject: Saw your post in {{community}}

   Hi {{firstName}},

   Your post in {{community}} about {{specificTopic}} was right on. I work on {{relatedThing}} and thought you might have an interesting take.

   Open to a quick chat?

   — {{yourName}}
   ```

5. **The Mutual-Connection Approach**
   ```
   Subject: Both connected to {{mutual}}

   Hi {{firstName}},

   We're both connected to {{mutual}} — they speak highly of {{company}}. I work in {{yourSpace}} and wondered if {{specificThing}} would be useful.

   Worth a 15-min call?

   — {{yourName}}
   ```

---

## 5 LinkedIn DM Scripts

1. **Engagement-first**
   ```
   Saw your post on {{topic}} — {{specificValueAdd}}. I work in {{yourSpace}}. If you ever want to compare notes on {{relatedThing}}, I'm around. No agenda.
   ```

2. **The genuine question**
   ```
   Hi {{firstName}} — {{specificQuestionAboutTheirWork}}. I'm in {{yourSpace}} so I find this stuff fascinating. Open to a 15-min chat if you're up for one.
   ```

3. **The intro request**
   ```
   Hi {{firstName}} — I work with {{prospectIndustry}} on {{specificThing}}. {{theirCompany}} keeps coming up in conversations as someone doing it right. Would love a brief intro if you have a few minutes.
   ```

4. **The resource share**
   ```
   {{firstName}} — built this for businesses like {{theirCompany}} who are tackling {{specificChallenge}}: {{linkOrResource}}. No agenda, just thought you might find it useful.
   ```

5. **The future-self pitch**
   ```
   {{firstName}} — in 12 months, {{specificPrediction}}. I work in {{relatedSpace}} and the early movers are seeing {{specificOutcome}}. Worth a quick chat about how {{theirCompany}} could position?
   ```

---

## Token Replacement Guide

- `{{firstName}}` — prospect's first name
- `{{company}}` — their company name
- `{{city}}` — their city
- `{{yourName}}` — YOUR name (signature)
- `{{yourCompany}}` — YOUR business name
- `{{referrer}}` — name of person who referred them
- `{{specificThing}}` — must be SPECIFIC, not generic — name a real product/service/observation

**Generic tokens kill emails.** "Hi {{firstName}}, I help {{businessType}} grow with {{generic}}" gets ignored. Specific tokens earn replies.
"""
    (folder / "COLD-OUTREACH-LIBRARY.md").write_text(content, encoding="utf-8")
    print("  Wrote cold outreach library (50+ templates)")

def write_index():
    """Write top-level INDEX.md."""
    content = """# Purcell Ventures Small Business AI Starter Kit

Welcome. This is the full sales + AI infrastructure we use at Purcell Ventures, packaged for you to steal/adapt.

## What's inside

| Folder | What it is |
|---|---|
| `01-ai-prompts/` | 24 production AI tool system prompts — paste into ChatGPT or Claude |
| `02-sales-scripts/` | 5 close frameworks + 3 follow-up cadences |
| `03-handbook/` | Our internal rep handbook (sanitized for resale) |
| `04-templates/` | 1099 contractor agreement + CRM CSV + email templates + Steady comparison framework + pricing template |
| `05-cold-outreach/` | 50+ cold outreach templates across 10 industries |

## How to use this kit

**Day 1:** Open this INDEX.md + `03-handbook/REP-HANDBOOK.md`. Read both. ~30 min.

**Day 2:** Pick ONE folder based on your biggest need:
- Need to start using AI tomorrow? → `01-ai-prompts/`
- Building a sales process? → `02-sales-scripts/`
- Hiring contractors? → `04-templates/01-contractor-agreement.md`
- Doing cold outreach? → `05-cold-outreach/`

**Day 3+:** Copy ONE thing from the kit. Use it for real. See what happens. Iterate.

## What this kit IS

- A starting point you'll adapt
- The actual infrastructure from a real working business
- Editable forever — these are your files now
- Tested in production at Purcell Ventures

## What this kit ISN'T

- A done-for-you service (see purcellventures.co/digital if you want that)
- A guarantee of success (you still have to do the work)
- A legal document (the contractor template needs lawyer review for your jurisdiction)
- Resaleable as-is — see LICENSE.md

## Updates

This kit was assembled 2026-05-24. We may release updated versions. If you bought this kit, email elijah@purcell-ventures.com with "kit update" in the subject for free access to future versions.

## License

You may use this kit for YOUR business + adapt it freely. You may NOT resell the kit as-is. See `LICENSE.md` for details.

## Questions?

Reply to your Stripe receipt email or contact elijah@purcell-ventures.com.

— Elijah Purcell, Purcell Ventures LLC, 2026
"""
    (DIST_DIR / "00-INDEX.md").write_text(content, encoding="utf-8")

    license_content = """# License

The Purcell Ventures Small Business AI Starter Kit
Copyright © 2026 Purcell Ventures LLC

## What you CAN do

- Use any content in this kit for your own business operations
- Modify, adapt, and edit any file to fit your needs
- Share copies of this kit with members of YOUR business team
- Use the AI prompts in your AI tools (Claude, ChatGPT, etc.)
- Use the templates as starting points for your own contracts, emails, scripts

## What you CANNOT do

- Resell this kit as-is or substantially-as-is
- Distribute this kit publicly (e.g., upload to a download site)
- Claim authorship of the prompts, scripts, or templates
- Use the contractor agreement template without lawyer review

## The contractor agreement template specifically

The 1099 Contractor Agreement template is a STARTING POINT. Laws vary by state and country. Have a lawyer review before using with actual contractors.

## Liability

This kit is provided "as-is" without warranty. Purcell Ventures LLC is not liable for outcomes from using this content. Apply business judgment.

## Questions

Email elijah@purcell-ventures.com.
"""
    (DIST_DIR / "LICENSE.md").write_text(license_content, encoding="utf-8")

def make_zip():
    """Zip the dist dir."""
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(DIST_DIR):
            for file in files:
                full = Path(root) / file
                # Path inside zip is relative to dist parent (so root folder is "pv-starter-kit/")
                arcname = full.relative_to(DIST_DIR.parent)
                z.write(full, arcname)
    size = ZIP_PATH.stat().st_size / 1024
    print(f"\n[OK] Built {ZIP_PATH} ({size:.1f} KB)")
    print(f"  Contents: {DIST_DIR}/")
    file_count = sum(1 for _ in DIST_DIR.rglob("*") if _.is_file())
    print(f"  {file_count} files total")

def main():
    print("Building PV AI Starter Kit...")
    print(f"  Staging dir: {DIST_DIR}")
    ensure_clean_dist()
    tools = extract_ai_prompts()
    write_ai_prompts(tools)
    write_sales_scripts()
    write_handbook()
    write_templates()
    write_cold_outreach()
    write_index()
    make_zip()
    print("\nNext step: upload dist/pv-starter-kit.zip to Stripe as a digital product.")
    print("See ~/.claude/elijahbot/drafts/STRIPE-SETUP-STARTER-KIT.md for full setup.")

if __name__ == "__main__":
    main()
