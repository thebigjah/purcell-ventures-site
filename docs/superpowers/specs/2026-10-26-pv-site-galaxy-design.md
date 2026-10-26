# Purcell Ventures site redesign: the galaxy

Written 26 Oct 2026. Branch `site-cleanup` in `~/.pv-cleanup-wt`, based on `origin/master`.

## Intent

A Tuscaloosa or metro Atlanta business owner lands on purcellventures.co. In the first five seconds they feel impressed, the sense that Elijah knows far more about web design and code than anyone they have hired before. In the next thirty seconds they find what he sells, what it costs and how to reach him, and they contact him.

The site is its own proof. A business owner cannot judge code, but they can judge a homepage that moves like nothing else they have seen, loads fast on their phone and still answers every question plainly. The galaxy does the first job. The plain site beneath it does the second.

Then, once that has landed, the site turns toward them. The message changes from what Elijah can do to what he will do with them: a partnership, where he takes them into this world and shows them what it can do for their business. The visitor should leave feeling invited in.

The homepage runs in three beats:

1. **Impress (first 5 seconds).** The galaxy, the mark at its core, one confident line and nothing else competing.
2. **Invite (after about 8 seconds, or on the first scroll).** A short, personal offer of partnership in plain words, with a "Take the tour" button.
3. **Show (the tour).** The camera flies system by system. At each stop one plain caption says what that division would do for their business, with a real example and a price. The tour ends on "Start a project" and his phone number. Anyone can skip it and use the plain site below.

The one thing the site is about: getting a small business to start a project. "Start a project" is the primary button on every page.

## Goals

1. A homepage galaxy that a visitor remembers: a slowly turning spiral of gold stars with the bent 6° mark at the core, solar systems for the divisions, planets for their pages, moons and asteroids for tools and posts.
2. Everything moves very slowly. Targets hold still enough to click, and the change is visible over a minute.
3. Every visual is interactive and optional. A complete, conventional site of cards, prices, buttons and forms sits beneath it.
4. Every piece of information on the current site survives: every route, fact, price, link, form and tool.
5. Every word passes the writing rules. Every page scores 4 or 5 on all nine rubric criteria at 1280 and 390 px.
6. Sharp at any resolution. All visuals are drawn in code at the screen's full pixel density, so nothing blurs on a 5K monitor or a zoomed phone.

## Non-goals

- New services, prices or claims. Content changes only where a fact is wrong or a rule is broken.
- A content management system. Pages stay as code in the repo.
- Changes to /rep-portal, /api or payments, beyond copy that visitors see.

## Anti-goals: it fails even if it works when

- The galaxy hides the phone number, the prices or the "Start a project" button on a phone.
- It reads as a space template: purple nebulae, neon, lens flares, radial orbs, a dot-grid starfield.
- A planet, label or number states something untrue. Planet size, orbit and label must each mean something real.
- It loads slowly, drains a phone battery, or makes someone motion sick.
- "Out of their league" turns into "too expensive for me" or "not for someone like me." The invitation beat and the plain layer must make him approachable: real prices, a phone number, a person who offers to take them along.
- The invitation reads as a slogan or a line from a film. It stays plain and specific, in his voice.

## Rules this plan answers to

| Rule | Source | How the plan meets it |
|---|---|---|
| No em dashes, semicolons, dots, bars or arrows. No "not X, Y", passive voice, imperative titles, slogans, hedging | his taxonomy, 26 Oct | Copy sweep to zero on the rendered site, gated by `scan.py`. Applies to UI labels and alt text too |
| AI design tells (harsh gradients, lucide icons, pure white, drop shadows, three cards in a row, Inter, coloured left stripe, bento, checkmark bullets, three pricing tiers shown as cards, soft corner radius, purple and black, radial orbs, dot grids, sparkle icons, animated arrows, hover animations, neon) | design-framework Part 2 | Galaxy stays gold, cream and warm white on black, with no purple or blue nebula. Remove Inter, VignetteBackground dot grid, roman numerals, corner brackets. No card rows of three. Square corners. Hover changes colour only |
| Type from the reel roster. House default Clash Display + Satoshi | design-framework Part 2 | Clash Display headings, Satoshi body, both self-hosted. Cinzel stays only inside the logo lockup |
| No cream default | feedback-no-cream-default | Dark site. Cream appears only as text colour and in print assets |
| Previews keep all content | design-framework Part 2 | A content ledger, below, diffed before any preview goes to him |
| Mobile is designed | feedback-mobile-intentionality | A separate phone galaxy built for touch, checked on a 390 px render and on his phone |
| Structure encodes truth | design-framework Part 2 | Numbered markers only for real sequences. Planet size encodes the number of child pages. Labels are page names |
| UI copy means something | feedback-ui-copy-must-mean-something | No invented metrics. Remove "05 ACTIVE 01 PENDING", "FILED GEORGIA SOS" style chrome unless it states a checkable fact |
| Design from niche references | feedback-design-from-niche-references | Phase 0 measures real references before any page design |
| Grading rubric, nine criteria at 1280 and 390 | design-framework Part 5 | Scored with evidence for every page template before he sees it |
| Design gate | MEMORY | `design_score.py --strict` on every template |
| Enumerate before claiming coverage | feedback-enumerate-before-claiming-coverage | Route and content ledger generated from the crawl |
| Act then iterate, zero hands | feedback-review-style, feedback-plan-for-zero-hands | One question to him up front with my default for each item, then build without waiting |
| Complete over MVP | feedback-prefer-complete-over-mvp | The whole site, every route, in one redesign |
| First render must look finished | feedback-first-canvas-render-must-look-like-the-figure | No placeholder screenshots go to him |
| Founder/CEO | canonical-facts | Title everywhere a title appears |
| Bible quotes NASB, version cited | identity/bible-translations | /verses and the homepage verse use NASB with "NASB" cited |
| His Chrome is his | ops/feedback-never-restart-chrome | All testing in headless Playwright |
| Never construct a Vercel hostname | MEMORY | Preview URL comes from the Vercel CLI output |
| Deploy only on his word | ship words | Preview first. Production only when he says "ship the site" |

## The galaxy map

Every body is a real route. Sizes and positions encode real things.

| Body | Is | Routes |
|---|---|---|
| Core | The bent 6° mark, turning once a minute with tips on the edges (motion 7) | / |
| System: Sites | Websites division | /sites, /pricing-comparison, /portfolio, /case-studies |
| System: Digital | Add-ons and tools | /digital, 8 demo pages, /digital/tools with 26 tool pages as an asteroid belt |
| System: Consulting | AI consulting | /consulting, /consulting/book, /ai-consultant-tuscaloosa, /ai-readiness, /ai-cost-calculator, /agentic-ai |
| System: Software | Custom software | /software, /portfolio entries |
| System: Steady | Personal IT | /steady, /steady/start |
| System: Courses and shop | Courses and products | 3 courses with lesson moons, /shop with 5 products |
| System: Company | Who he is | /about, /how-we-work, /team, /who, /what-is-purcell-ventures, /resume, /now, /uses, /verses, /writing, /faq, /links |
| Comet stream | The blog | /blog and 33 posts, newest brightest |
| Off map, in footer and sitemap | Utility pages | /brand, /business-cards, /logos, /newsletter, /invoicing, /crm, /print, /patterns, /qr, /free, /tools, /tutorials, /services, /sales-rep, /ai-at-alabama |

- **Planet radius:** proportional to the square root of its number of child pages. A page with no children gets the minimum size.
- **Orbit order:** the buying path, from inside to out. The sales page sits closest, then pricing, then proof.
- **Labels:** the page's own name in plain words, shown on hover or focus on desktop and always on phones once a system is open.

## How it behaves

- **Desktop:** the galaxy fills the first screen behind the hero text. The headline, one sentence, the phone number and "Start a project" sit on the left over a darkened band, so they are readable on any star.
- **The tour:** about 60 seconds across the six systems, with Next, Back and Skip controls, keyboard and swipe support, and captions as real HTML so screen readers and search engines read them. Captions come from existing page copy and pass the writing rules.
- **Opening a system:** click a system and the camera eases to it over 1.2 seconds. Its planets show, and a plain panel lists its pages as links with one line each. Escape or "Back to the galaxy" returns.
- **Speed:** systems orbit the core once every 20 minutes and planets turn once every 2 minutes. A target moves under 2 px per second at 1280 px, so it never slips from under a cursor.
- **Phone:** a phone-specific galaxy with fewer stars and systems laid on one spiral arm, with large tap targets of at least 44 px. Tap a system to open its panel as a bottom sheet. The hero text and buttons sit above the galaxy.
- **Other pages:** each division and planet page opens with its own body drawn in a band at the top, slowly turning, with the regular page below. Blog posts get a small comet mark. Tool pages get their asteroid.
- **Reduced motion:** a still frame of the same scene, with every link still working.
- **Below the galaxy on the homepage:** the plain site, with what he sells, prices, proof, the courses, the blog and contact. These are full-width rows and lists with rules between columns.
- **Without WebGL or JavaScript:** a still image of the galaxy and the full HTML site.

## Technology

- Next.js 16 app as is. The galaxy is one client component, loaded after the hero text paints, so the text is the Largest Contentful Paint.
- three.js with custom shaders for stars, dust lanes and planets, imported as a module and code-split. Budget: under 200 KB gzipped for the galaxy chunk.
- Planets are procedural spheres from noise shaders in the foil, ochre and cream palette, with no image textures, so they stay sharp at any size.
- Render at the device pixel ratio, capped at 2 on phones and 3 on desktop. Drop the frame rate to 30 when idle. Pause when the tab is hidden or the galaxy is off screen.
- The motion page's live star code (tips on the edges) drives the core.
- Styling: replace the inline style objects in about 130 files with tokens and a small component set (Nav, Footer, PageHead, Section, Button, PriceRow, LinkList, Form fields, Callout). A codemod moves the literal fonts and colours first, then each page is rebuilt on the components.

## Design system

- **Colour:** ground #0c0a08. Foil gradient (#7a5a22 to #c0913a to #8c6a27) for the mark and display headings only. Ochre #b8862b for buttons and links. Text cream #efe8d8. Secondary text at least 4.5 to 1 against the ground. No pure white.
- **Type:** Clash Display for display and headings. Satoshi for body and UI. Cinzel only in the logo lockup. Scale 14, 16, 18, 22, 28, 40, 64, 120 px.
- **Shape:** square corners, hairline rules between columns, no boxes around content, no shadows.
- **Motion:** only the galaxy, the planet bands and the mark move. UI hover changes colour only.

## Content and writing

1. Commit the current writing fixes (titles without bars, imperative titles renamed, chat assistant prompt and greeting, CRM labels, OG image text, consulting bullets, customer email).
2. Rebuild, recrawl all 134 routes, and run `scan.py` until every rule count is zero, except number ranges in code samples.
3. A full read of every page against the taxonomy for what a scanner cannot catch: passive voice, vague lines, slogans.
4. Founder/CEO everywhere a title appears.
5. A fact-check page: every factual claim on the site, one at a time, for him to confirm or correct. His answers go into the copy.
6. A content ledger generated from the crawl: every heading, price, link, button and form per route. After the redesign the ledger must diff to zero lost items.

## Phases

| Phase | Work | Done when |
|---|---|---|
| 0 | Writing commit, scan to zero, fact-check page, content ledger, measure 6 references at 1280 and 390 px | Scan at zero, ledger saved, reference table written |
| 1 | Tokens, fonts, components, codemod off inline styles | Every page builds on the components, ledger unchanged |
| 2 | Galaxy prototype as a standalone page, desktop and phone | It passes the rubric and he has seen it |
| 3 | Homepage: galaxy, invitation beat, tour and the plain layer | Rubric 4 or 5 on all nine, gate passes |
| 4 | Division and planet pages with their turning bodies | Same |
| 5 | Blog, tools, shop, courses, company and utility pages | Same, and the ledger diffs to zero lost |
| 6 | QA: Core Web Vitals on a throttled phone profile, WCAG 2.2 AA, reduced motion, Safari and iOS, no console errors | All green |
| 7 | Vercel preview link and before and after screenshots to him | He says "ship the site" |

## Decisions that are his, with my default for each

He can answer "defaults" to take all of them.

| Decision | Criterion | My default |
|---|---|---|
| /digital prices and the tier names that conflict across pages | one truth per price | Use the /pricing page numbers everywhere |
| Personal phone and Gmail on /card | public is professional only | Business phone and elijah@purcell-ventures.com only |
| Division count, 4 or 5 or 6 | match what he sells today | 5 active, with real estate shown as planned |
| Private-leaning pages /writing, /team, /who, /steady, /uses | public is professional only | Keep, after removing anything about money, family or private life |
| Worship line on the résumé | currently true | Remove "lead worship vocalist" and keep bass-baritone, since he is not leading worship now |
| /now page | dated facts go stale | Rewrite to October 2026 from session notes |
| Résumé revenue claims | provable | Keep only figures with a source |
| "Purcell Works" vs "Mantle Field Services" | one name | Mantle Field Services |
| Response time stated in different places | one promise | "Reply within one business day" |
| Consulting "full-time while still in high school" | currently true | Rewrite to the present tense, a UA student |
| Real estate "opens 2026" | currently true | "Planned" with no date |
| Phone galaxy | phones are most of local traffic | A simplified live galaxy |
