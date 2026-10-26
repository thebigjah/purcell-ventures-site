# Page build brief

You are rebuilding pages of purcellventures.co, a Next.js 16 site, in the git worktree `/Users/elijahpurcell/.pv-cleanup-wt`. Run every command from that directory. Do not `cd` to another repo. Do not run git. Do not run `next build`, `next start` or `next dev`: other agents share this folder and the build cache. Type-check with `./node_modules/.bin/tsc --noEmit -p .` only.

Elijah Purcell owns the site. He is the Founder/CEO of Purcell Ventures LLC, a one-person company that builds websites, AI tools and custom software for small businesses, run from Tuscaloosa, Alabama. His standing instruction for this job: "improve all writing, remove all visual and written AI-isms", "make sure we're making mobile view look good, a lot of people see it there first", and nothing he has on the site may be lost.

## What "rebuilt" means

1. The page is built from the page kit in `app/components/ui.tsx` and the `.ui-*` classes in `app/globals.css`. Read both files first. Pieces: `PageHero`, `Section`, `Prose`, `Button`, `Rows`, `Facts`, `Figures`, `Tiers`, `Faq`, `ClosingCall`, `PostLayout`, `Note`, and the classes `ui-entries`/`ui-entry` (see `app/resume/page.tsx`), `ui-field`, `ui-input`, `ui-link`, `ui-muted`, `ui-small`, `ui-gold`, `ui-tags`, `ui-wrap`, `ui-narrow`.
2. Copy the patterns in the three exemplars, which Elijah's rules shaped:
   - a service page: `app/sites/page.tsx`
   - a long record page: `app/resume/page.tsx`
   - a blog post: `app/blog/claim-your-google-listing/page.tsx`
   - the homepage `app/page.tsx` shows Rows, Figures, Facts and the closing call.
3. Inline `style={{...}}` objects for fonts, colours, spacing, borders and layout go. Use the kit. A few inline styles for one-off layout (a `marginTop`) are fine. No literal hex colours: use the CSS variables (`var(--gold)`, `var(--gold-text)`, `var(--fg)`, `var(--fg-2)`, `var(--muted)`, `var(--subtle)`, `var(--line)`, `var(--surface)`, `var(--surface-2)`, `var(--bg)`). No `'Cinzel'`, no `Georgia`, no `Inter`, no `DM Sans`: use `var(--font-display)` and `var(--font-body)` only where the kit does not already set the font.
4. Remove these imports and their markup: `VignetteBackground`, `PanopticonMark` (the mark is now `/mark-foil.svg`), `.pv-*` classes, corner-bracket spans (`b3`, `b4`), roman numerals, mono uppercase labels.
5. If the page is a client component only because of trivial hover state, make it a server component and export `metadata`. Keep `"use client"` where the page has real interactivity (forms, calculators, state). Interactive logic (state, handlers, fetch calls, form submission to `/api/*`, Stripe links, localStorage) must keep working exactly as before. Restyle it, do not rewrite its behaviour.
6. Planet: pages on the homepage map pass `planet` to `PageHero`. The planet only appears when the visitor flew in from the map, so it is safe on every map page. Use this table, and no planet for pages not in it:
   - `/sites` websites, `/digital` digital, `/digital/tools` tools, `/consulting` consulting, `/software` software, `/steady` steady, `/steady/start` book, `/consulting/book` book
   - `/portfolio` portfolio, `/case-studies` casestudies, `/agentic-ai` software, `/pricing-comparison` pricing, `/ai-readiness` book
   - `/courses/college-apps` courses, `/courses/business-launch` pricing, `/courses/ai-automation` software, `/shop` digital, `/courses` courses
   - `/about` company, `/how-we-work` book, `/team` consulting, `/resume` portfolio, `/now` steady, `/uses` tools, `/verses` websites, `/writing` courses
7. Metadata: keep every page's `metadata` export, canonical, JSON-LD schema and breadcrumbs. If a title or description breaks a writing rule, fix the words, keep the field. Titles render with the template "%s, Purcell Ventures", so do not repeat the brand inside the title.

## Visual AI-isms to remove (his list)

Harsh gradients, line icon sets, pure white backgrounds, rainbow colour, drop shadows, three feature cards in a row, emojis, glassmorphism, Inter/Geist/Space Grotesk/DM Sans, a coloured stripe on the left of cards, fake testimonials, bento grids, terminal-window mockups, checkmark bullets, three pricing tiers shown as cards (use `Tiers`, which renders rows), soft rounded corners, purple and black, radial orbs and glows, dot grids, sparkle icons, animated arrows, hover-lift animations, neon, pastels. Also: mono or uppercase tracked "eyebrow" labels, dot-separated meta lines, numbered 01/02/03 or roman-numeral markers on things that are not a real sequence, a bordered box around every block, everything centered, giant heroes that say little. Hover changes colour only.

## Writing rules (hard rules, his taxonomy)

Every sentence on the page, including buttons, labels, alt text, placeholders, metadata titles and descriptions, and error messages:

- No em dashes, en dashes used as dashes, semicolons, middle dots, vertical bars, or arrows (→ ← ↗ ») in visible text. Number ranges are written "10 to 20". Code samples and math formulas are left exactly as they are. Scripture quotes are left exactly as quoted, with the version cited (NASB).
- No "it's not X, it's Y" in any form: "X, not Y" tails, "not just X but Y", "Not X. Not Y." fragments.
- Active voice. Name who does the thing. The company is one person: write "I", not "we", unless the page is clearly about a team (the AI agents on /team).
- No imperative headings or titles ("Claim your listing"). Write a statement or a topic.
- No slogans, figurative lines or taglines in place of a specific claim.
- No hedging before numbers we own ("about", "roughly", "~", "nearly", "around").
- No filler: honestly, actually, real, simply, just, no fluff, no BS, here's the thing, the bottom line, in short.
- No reflex words: delve, leverage, utilize, seamless, robust, crucial, pivotal, comprehensive, landscape, journey, game-changing, cutting-edge, unlock, empower, elevate, streamline, transform, supercharge, harness, navigate (as a metaphor), tapestry, realm, testament.
- No rhetorical question followed by its own answer. No rule-of-three padding.
- No ALL CAPS text. Sentence case for headings, buttons and labels.
- Five questions for every sentence: would you say it out loud, can it be simpler, is the meaning specific, can it be cut without losing meaning, does it make sense.

## Facts

Keep every fact, price, number, name, link, form field and button on the page. You may reword, regroup and restyle, but a reader must be able to find everything that was there. These are decided and override what a page says:

- Prices: websites from $650 setup and $99 a month. Digital tiers Starter $99, Growth $179, Full Service $279 a month, setup $650 to $1,000. Consulting from $125 a person, 1-on-1 $175 an hour, workshop $2,500 flat up to 20 people. Steady from $79 a month, one-off session $99.
- Response time: "I reply within one business day" everywhere.
- Divisions: five active (websites, digital add-ons, AI consulting, custom software, Steady) and real estate shown as planned, with no date.
- Field services brand: Mantle Field Services (never "Purcell Works").
- His title: Founder/CEO.
- The public email is elijah@purcell-ventures.com. His personal Gmail and personal phone details do not appear on public pages. Use `CONTACT` from `@/lib/contact` for the phone and email.
- Public pages carry only what he would say introducing himself professionally: the business, the industry, college. Never his money, his family or his private life. If a page carries something private, remove it and list it in your report.
- The scholarship dollar total ($530,384) appears only on the college-application course page.
- He is not currently leading worship. Past tense only.
- Courses: three courses, waitlist open, none finished. "Ask me and I will send the material I have so far."
- Free AI tools on /digital/tools: 26. The /tools page lists its own set: count what it renders.
- Portfolio: 17 projects.

If a fact on your page conflicts with another page and is not in the list above, keep your page's version and list the conflict in your report.

## Mobile

Most visitors see the site on a phone first. Every page must work at 390px wide with no sideways scroll. The kit handles most of it. When you add any grid or table, check it collapses to one column under 860px (the kit's breakpoint) or sits in an `overflow-x:auto` wrapper. Tap targets at least 44px tall.

## When you finish

1. `./node_modules/.bin/tsc --noEmit -p .` passes with no errors you introduced.
2. Search your files for leftovers and fix them: `grep -nE "—|–|;|·|→|←|Cinzel|Georgia|VignetteBackground|pv-mono-label|pv-card|roman|textTransform: \"uppercase\"|#d4af37" <your files>` (semicolons inside code are fine, only visible text matters).
3. Write a JSON report to the path your prompt gives: `{ "pages": [ { "route", "file", "planet", "notes" } ], "removed_private": [...], "conflicts": [...], "kit_requests": [...], "unsure": [...] }`. `kit_requests` lists anything the shared kit was missing that you worked around. Do not edit `app/components/ui.tsx`, `app/globals.css`, `app/layout.tsx`, `SiteNav`, `SiteFooter`, `ChatWidget`, `Breadcrumbs` or anything under `app/components/galaxy`. Page-local components inside your own page folders are fine.
4. Reply with a short summary: pages done, anything you could not do, tsc result.
