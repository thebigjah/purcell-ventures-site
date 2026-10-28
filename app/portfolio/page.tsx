import Image from "next/image";
import Link from "next/link";

// THE PORTFOLIO, rebuilt 28 Oct 2026 from a graded inventory, not from memory.
//
// How the contents were chosen, so nobody re-adds things by accident:
// - 187 projects and 28 achievements were found across every source (repos, Vercel, artifacts,
//   Gmail, the Transfer folder), graded twice blind, then argued for and against by six agents
//   each and decided by a judge against his nine gates. Verdicts: ~/pv-brand/inventory.
// - The bar is Rufus: a real client, approved on the App Store, works on a phone, means something.
// - English Pruitt is off: no payment on record and she stopped replying, so "a client" was false.
// - COSMIC, Utter, Ovita, Boyfriend Camera and the Cert Ledger are off until a stranger can open
//   them and someone besides him uses them. Their fix lists are in the verdicts file.
// - Family work (IQ Installs, Gran's), money figures and anything private never appear here.
// - Every index link was checked for a 200 on 28 Oct. Links that need a login or are private are left unlinked.

const APP_STORE = "https://apps.apple.com/us/app/rufus-rideshare/id6813645816";
const CRIMSON_WHITE = "https://thecrimsonwhite.com/130128/news/ua-ai-club-kicks-off-year-with-president-mohler/";

type IndexItem = { name: string; line: string; href?: string };

const INDEX: { group: string; items: IndexItem[] }[] = [
  {
    group: "Tools for small businesses",
    items: [
      { name: "AI Readiness Audit", line: "A short quiz that scores how ready a small business is to use AI", href: "https://pv-ai-readiness-audit.vercel.app" },
      { name: "AI Readiness Test", line: "Ten questions for a business owner, with a scored result", href: "https://thebigjah.github.io/ai-readiness-test/" },
      { name: "AI Cost Calculator", line: "Estimates what an automation saves and how fast it pays back", href: "https://thebigjah.github.io/ai-cost-calculator/" },
      { name: "Local Marketing Scorecard", line: "Scores how easy a local business is to find online", href: "https://local-scorecard.vercel.app" },
      { name: "Invoice Generator", line: "Makes a clean invoice in the browser", href: "https://invoice-generator-xi-liard.vercel.app" },
      { name: "InvoiceNudge", line: "Writes polite reminders for unpaid invoices", href: "https://invoicenudge-nine.vercel.app" },
      { name: "Proposal Generator", line: "Turns a scope into a client proposal", href: "https://proposal-gen-opal.vercel.app" },
      { name: "Email Signature Generator", line: "Builds an email signature to paste into any mail app", href: "https://email-signature-drab-ten.vercel.app" },
      { name: "Meta Tags Generator", line: "Writes the search and sharing tags for a web page", href: "https://meta-tags-zeta.vercel.app" },
      { name: "OG Image Generator", line: "Makes the preview image a link shows when it is shared", href: "https://og-image-blue.vercel.app" },
      { name: "llms.txt Generator", line: "Writes the file that tells AI assistants what a site is about", href: "https://llms-txt-beryl.vercel.app" },
      { name: "Cookie Consent Generator", line: "Builds a cookie banner for a small site", href: "https://cookie-consent-alpha-gold.vercel.app" },
      { name: "PV Labs", line: "One page that links all of the free tools", href: "https://pv-labs-green.vercel.app" },
      { name: "Digital business card", line: "Tap a phone to the card and my contact and a ready text open", href: "/card" },
    ],
  },
  {
    group: "Games",
    items: [
      { name: "An Atlas of Invented Worlds", line: "My games, grouped by the fictional world each one is set in", href: "https://games.purcellventures.co" },
      { name: "Nonetria", line: "A roguelite with nine classes drawn from the Enneagram", href: "https://games.purcellventures.co" },
      { name: "Ninefold", line: "A trading game where prices react to what you buy and sell", href: "https://games.purcellventures.co" },
      { name: "Resonance", line: "A physics puzzler with ten chambers, each one proven solvable by a test", href: "https://games.purcellventures.co" },
      { name: "Outpost", line: "A tower defense game with three maps and forty waves", href: "https://games.purcellventures.co" },
      { name: "Potluck Design Lab", line: "A party game for a classroom: players join from their phones with a QR code", href: "https://potluck-design-lab.potluck-design-lab.workers.dev" },
      { name: "Cipher Lab", line: "A workbench for six classic ciphers and chained puzzle hunts", href: "https://thebigjah.github.io/cipher-lab/" },
    ],
  },
  {
    group: "Faith",
    items: [
      { name: "Examen", line: "The Ignatian end-of-day prayer, in five steps", href: "https://thebigjah.github.io/examen/" },
      { name: "Sermon Notes", line: "Notes from Sunday with one thing to do on Monday", href: "https://thebigjah.github.io/sermon-notes/" },
      { name: "Verse Vault", line: "Scripture memory with spaced review", href: "https://thebigjah.github.io/verse-vault/" },
      { name: "Solomon", line: "One line of wisdom a day", href: "https://thebigjah.github.io/solomon/" },
      { name: "Calvinism Test", line: "Where you land on the five points, question by question", href: "https://thebigjah.github.io/calvinism-test/" },
    ],
  },
  {
    group: "Small apps",
    items: [
      { name: "Echo", line: "A guided interview that turns an older relative's stories into a printable keepsake", href: "https://thebigjah.github.io/echo/" },
      { name: "Era", line: "Step into one of twelve years in history and decide without hindsight", href: "https://thebigjah.github.io/era/" },
      { name: "Rival", line: "Compete against your own last week on anything you track", href: "https://thebigjah.github.io/rival/" },
      { name: "Momentum", line: "One intention a day, checked off in front of a friend", href: "https://thebigjah.github.io/momentum/" },
      { name: "Future Self", line: "Letters that stay locked until a date you choose", href: "https://thebigjah.github.io/future-self/" },
      { name: "Milestone", line: "A countdown grid to the dates that matter", href: "https://thebigjah.github.io/milestone/" },
      { name: "Decision Journal", line: "Write down a decision and what you expect, then check back later", href: "https://thebigjah.github.io/decision-journal/" },
      { name: "Brag Doc", line: "A log of wins that exports to résumé bullets", href: "https://thebigjah.github.io/brag-doc/" },
      { name: "Day Sheet", line: "A one-page daily planner to print", href: "https://thebigjah.github.io/day-sheet/" },
      { name: "Dorm Pack", line: "A packing list for moving into a dorm", href: "https://thebigjah.github.io/dorm-pack/" },
      { name: "Counter", line: "A tally counter that remembers every count", href: "https://thebigjah.github.io/counter/" },
      { name: "The Caring Compass", line: "Guides for family caregivers", href: "https://caregiver-hub-eight.vercel.app" },
    ],
  },
  {
    group: "For friends and the company",
    items: [
      { name: "Kristian's Ramen", line: "A site and stall tracker for a friend's ramen stand: menu, sales and inventory", href: "https://kristian-ramen.vercel.app" },
      { name: "Clip Machine", line: "Turns long videos into captioned vertical clips without editing by hand" },
      { name: "Purcell Ventures brand", line: "The mark, colors and print pieces for the company" },
      { name: "purcellventures.co", line: "This site, with the company's services, courses and free tools", href: "/" },
    ],
  },
];

const INDEX_COUNT = INDEX.reduce((n, g) => n + g.items.length, 0);

export default function PortfolioPage() {
  return (
    <main className="pf">
      <style dangerouslySetInnerHTML={{ __html: PF_CSS }} />

      <header className="pf-hero">
        <div className="ui-wrap pf-hero__grid">
          <div className="pf-hero__text">
            <h1>Elijah Purcell</h1>
            <p className="pf-hero__role">Founder/CEO of Purcell Ventures LLC</p>
            <p className="pf-hero__role">The University of Alabama Honors College, Psychology and Data Science, Class of 2030</p>
            <p className="pf-hero__lede">
              What fills me with purpose is serving others. I feel called to help people through counseling, and I am working toward psychiatry,
              with research into how AI can make mental health care easier to reach. I want to work for myself, so I started Purcell Ventures,
              which builds software and AI systems for clients.
            </p>
            <div className="pf-hero__links">
              <Link className="ui-btn" href="/resume">Résumé</Link>
              <Link className="ui-btn ui-btn--ghost" href="/contact">Contact</Link>
            </div>
          </div>
          <div className="pf-hero__photo">
            <Image src="/portfolio/elijah.jpg" alt="Elijah Purcell in a navy suit, outdoors" width={900} height={933} priority sizes="(max-width: 800px) 70vw, 380px" />
          </div>
        </div>
      </header>

      <section className="pf-lead" aria-labelledby="rufus">
        <div className="ui-wrap pf-lead__grid">
          <div className="pf-lead__text">
            <p className="pf-tag">Client build, on the App Store</p>
            <h2 id="rufus">Rufus Rideshare</h2>
            <p className="pf-big">
              John White, a student at Georgia College & State University, asked me in September 2026 for a way to help students get rides from
              other students they can see and choose. I designed and built Rufus, and Apple approved it for the App Store on 8 October 2026.
            </p>
            <p>I built it so the people I care about get home safe.</p>
            <ul className="pf-points">
              <li>Everyone signs in with a school email, so riders only see other students.</li>
              <li>Before saying yes, a rider sees the driver, the car and the last four digits of the plate.</li>
              <li>One tap shares the ride with a friend or parent, who needs no app or account to follow it.</li>
              <li>Rufus takes no money. Drivers suggest a gas share and riders settle it between themselves.</li>
            </ul>
            <div className="pf-actions">
              <a className="ui-btn" href={APP_STORE} target="_blank" rel="noopener noreferrer">See it on the App Store</a>
            </div>
            <p className="pf-fine">Rufus is an independent app and is not affiliated with or endorsed by Georgia College & State University.</p>
          </div>
          <div className="pf-phones" aria-label="Three screens from the Rufus iPhone app">
            <Image src="/portfolio/rufus-01-home.jpg" alt="Rufus home screen showing a ride request with two offers" width={506} height={1100} sizes="(max-width: 800px) 30vw, 200px" />
            <Image src="/portfolio/rufus-02-map.jpg" alt="Rufus map screen" width={506} height={1100} sizes="(max-width: 800px) 30vw, 200px" />
            <Image src="/portfolio/rufus-03-search.jpg" alt="Rufus address search screen" width={506} height={1100} sizes="(max-width: 800px) 30vw, 200px" />
          </div>
        </div>
      </section>

      <section className="pf-sec" aria-labelledby="honors">
        <div className="ui-wrap">
          <h2 id="honors">Honors and recognition</h2>
          <div className="pf-honors">
            <article>
              <h3>The University of Alabama Honors College</h3>
              <p>Admitted to the Honors College, studying psychology and data science through New College on a Presidential Scholarship.</p>
            </article>
            <article>
              <h3>College Board National Recognition Program Award</h3>
              <p>A national academic honor from College Board, awarded in 2025.</p>
            </article>
            <article className="pf-quote">
              <h3>Quoted in The Crimson White</h3>
              <blockquote>
                &ldquo;We work with small businesses in the area, local people and mom-and-pop shops that don&apos;t have access to the technologies that a lot of bigger corporations use.&rdquo;
              </blockquote>
              <p>
                From <a href={CRIMSON_WHITE} target="_blank" rel="noopener noreferrer">UA AI club kicks off year with President Mohler</a>, by Katelin Flemmons, 9 September 2026.
              </p>
            </article>
          </div>
          <ul className="pf-also">
            <li>Accepted to 34 colleges, including the Georgia State University Honors College.</li>
            <li>Earned 12 college credit hours across two summers of Lee University&apos;s Summer Honors Program, in cryptography, marketing, mechatronics and leadership.</li>
          </ul>
        </div>
      </section>

      <section className="pf-sec" aria-labelledby="work">
        <div className="ui-wrap">
          <h2 id="work">Work</h2>

          <article className="pf-work">
            <div className="pf-work__text">
              <h3>Purcell Ventures LLC</h3>
              <p className="pf-when">Founded April 2025</p>
              <p>
                My company. It builds websites, apps and AI systems for clients, and Rufus is its first App Store release. I find the work, price it,
                build it and support it.
              </p>
              <Link href="/" className="pf-link">purcellventures.co</Link>
            </div>
          </article>

          <article className="pf-work pf-work--shot">
            <div className="pf-work__text">
              <h3>Yellowhammer Society: Innovators in AI</h3>
              <p className="pf-when">Founding now at The University of Alabama, with an Honors College faculty advisor</p>
              <p>
                A student organization I am starting so that students in any major can learn to build with AI. It begins with weekly design sessions
                and game jams, then moves to events built around real problems in Alabama.
              </p>
              <a href="https://yellowhammer-society.vercel.app" className="pf-link" target="_blank" rel="noopener noreferrer">yellowhammer-society.vercel.app</a>
            </div>
            <a className="pf-shot" href="https://yellowhammer-society.vercel.app" target="_blank" rel="noopener noreferrer">
              <Image src="/portfolio/yh.jpg" alt="The Yellowhammer Society home page" width={1440} height={900} sizes="(max-width: 800px) 92vw, 560px" />
            </a>
          </article>

          <article className="pf-work pf-work--shot">
            <div className="pf-work__text">
              <h3>UA Today</h3>
              <p className="pf-when">Built as a first-year student</p>
              <p>
                An unofficial events page for The University of Alabama. It pulls the campus calendars into one list that a student can filter by
                food, faith, sports, career and more, and it works on a phone.
              </p>
              <a href="https://ua-today.vercel.app" className="pf-link" target="_blank" rel="noopener noreferrer">ua-today.vercel.app</a>
            </div>
            <a className="pf-shot" href="https://ua-today.vercel.app" target="_blank" rel="noopener noreferrer">
              <Image src="/portfolio/uatoday.jpg" alt="The UA Today events page" width={1440} height={900} sizes="(max-width: 800px) 92vw, 560px" />
            </a>
          </article>

          <article className="pf-work pf-work--shot">
            <div className="pf-work__text">
              <h3>Returns Void</h3>
              <p className="pf-when">A prayer ledger</p>
              <p>
                Named for Isaiah 55:11. It brings up names from your list a few at a time, so everyone you promised to pray for gets prayed for,
                with no streaks or scores.
              </p>
              <a href="https://returns-void-v2.vercel.app" className="pf-link" target="_blank" rel="noopener noreferrer">returns-void-v2.vercel.app</a>
            </div>
            <a className="pf-shot" href="https://returns-void-v2.vercel.app" target="_blank" rel="noopener noreferrer">
              <Image src="/portfolio/rvoid.jpg" alt="The Returns Void home page" width={1440} height={900} sizes="(max-width: 800px) 92vw, 560px" />
            </a>
          </article>
        </div>
      </section>

      <section className="pf-sec" aria-labelledby="ai">
        <div className="ui-wrap pf-two">
          <div>
            <h2 id="ai">AI training work</h2>
            <dl className="pf-dl">
              <dt>Independent Contractor, Generalist Expert, Mercor Intelligence</dt>
              <dd>August 2026 to present. I provide expertise to improve models for a top AI lab.</dd>
              <dt>AI Data Trainer, Outlier AI</dt>
              <dd>October 2025 to May 2026. I rated model answers for accuracy and reasoning and wrote the case for every rating.</dd>
            </dl>
          </div>
          <div>
            <h2>Certifications</h2>
            <dl className="pf-dl">
              <dt>Anthropic Academy, 12 courses</dt>
              <dd>
                Claude 101, Claude Code 101, Claude Code in Action, Claude Platform 101, Introduction to Claude Cowork, AI Fluency: Framework &amp;
                Foundations, AI Capabilities and Limitations, and AI Fluency for Builders, Creative Work, Educators, Students and Small Business.
              </dd>
              <dt>HubSpot Academy, Social Media Marketing</dt>
              <dd>July 2026.</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="pf-sec" aria-labelledby="faith">
        <div className="ui-wrap">
          <h2 id="faith">Faith and service</h2>
          <blockquote className="pf-verse">
            &ldquo;But you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all
            Judea and Samaria, and even to the remotest part of the earth.&rdquo;
            <cite>Acts 1:8, NASB</cite>
          </blockquote>
          <div className="pf-trips">
            <article>
              <h3>North Carolina</h3>
              <p className="pf-when">Praying Pelican Missions, 10th grade</p>
              <p>Our team built a full floor and a wheelchair ramp for an elderly couple after the husband became disabled, and worked a regional food drive.</p>
            </article>
            <article>
              <h3>The Bahamas</h3>
              <p className="pf-when">Christian Education Relief, 11th grade</p>
              <p>We rebuilt a Christian education camp that had been looted during the pandemic and turned a retired bus into a classroom for it.</p>
            </article>
            <article>
              <h3>Hawaii</h3>
              <p className="pf-when">Praying Pelican Missions, March 2026</p>
              <p>Construction support and community aid, with prayer each day.</p>
            </article>
          </div>
          <p className="pf-also-p">At home I have volunteered with MUST Ministries food drives in Atlanta and helped with children&apos;s ministry at Stonebridge Church.</p>
        </div>
      </section>

      <section className="pf-sec" aria-labelledby="index">
        <div className="ui-wrap">
          <h2 id="index">Everything else I have built</h2>
          <p className="pf-index__intro">{INDEX_COUNT} more projects, from free tools for small businesses to games. Each link opens the working version.</p>
          <div className="pf-index">
            {INDEX.map((g) => (
              <div key={g.group} className="pf-index__group">
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.name}>
                      {it.href ? (
                        it.href.startsWith("/") ? <Link href={it.href}>{it.name}</Link> : <a href={it.href} target="_blank" rel="noopener noreferrer">{it.name}</a>
                      ) : (
                        <span className="pf-index__name">{it.name}</span>
                      )}
                      <span className="pf-index__line">{it.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const PF_CSS = `
.pf h2 { font: 600 clamp(28px, 3.6vw, 44px)/1.05 var(--font-display); margin: 0 0 28px; text-wrap: balance; }
.pf h3 { font: 600 clamp(19px, 1.7vw, 22px)/1.2 var(--font-display); margin: 0; text-wrap: balance; }
.pf p { margin: 0; }
.pf-sec { padding-block: clamp(56px, 8vw, 104px); border-top: 1px solid var(--line-soft); }

.pf-hero { padding-block: clamp(56px, 9vw, 120px) clamp(48px, 7vw, 88px); background: radial-gradient(ellipse at 80% 10%, rgba(184,134,43,.14), rgba(7,6,10,0) 55%); }
.pf-hero__grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 380px); gap: clamp(32px, 5vw, 72px); align-items: center; }
.pf-hero h1 { font: 600 clamp(48px, 8vw, 104px)/0.95 var(--font-display); margin: 0 0 20px; letter-spacing: -0.01em; }
.pf-hero__role { font-size: clamp(16px, 1.4vw, 19px); color: var(--gold-text); margin: 0 0 4px; }
.pf-hero__lede { font-size: clamp(17px, 1.5vw, 20px); line-height: 1.55; color: var(--fg); max-width: 60ch; margin-top: 24px !important; }
.pf-hero__links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.pf-hero__photo img { width: 100%; height: auto; display: block; filter: saturate(0.92); }
.pf-hero__photo { border-top: 2px solid var(--gold); padding-top: 14px; }

.pf-lead { padding-block: clamp(56px, 8vw, 112px); border-top: 1px solid var(--line-soft); background: linear-gradient(180deg, rgba(184,134,43,.07), rgba(7,6,10,0) 70%); }
.pf-lead__grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 72px); align-items: center; }
.pf-tag { color: var(--gold-text); font-size: 15px; margin-bottom: 10px !important; }
.pf-lead h2 { font-size: clamp(36px, 5vw, 64px); margin-bottom: 20px; }
.pf-big { font-size: clamp(18px, 1.6vw, 21px); line-height: 1.55; margin-bottom: 16px !important; }
.pf-lead__text > p { color: var(--muted); line-height: 1.6; max-width: 62ch; }
.pf-lead__text > .pf-big { color: var(--fg); }
.pf-points { margin: 24px 0 0; padding: 0; list-style: none; display: grid; gap: 12px; max-width: 62ch; }
.pf-points li { padding-left: 22px; position: relative; line-height: 1.5; }
.pf-points li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 10px; height: 2px; background: var(--gold); }
.pf-actions { margin-top: 28px; }
.pf-fine { font-size: 13px; color: var(--subtle) !important; margin-top: 16px !important; }
.pf-phones { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(10px, 1.6vw, 20px); align-items: start; }
.pf-phones img { width: 100%; height: auto; display: block; border: 1px solid var(--line); }
.pf-phones img:nth-child(2) { margin-top: 36px; }
.pf-phones img:nth-child(3) { margin-top: 72px; }

.pf-honors { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; border-top: 1px solid var(--line); }
.pf-honors article { padding: 24px 24px 24px 0; display: grid; gap: 10px; align-content: start; }
.pf-honors article + article { border-left: 1px solid var(--line); padding-left: 24px; }
.pf-honors p { color: var(--muted); line-height: 1.55; }
.pf-quote blockquote { margin: 0; font-size: 17px; line-height: 1.5; color: var(--fg); }
.pf-quote a, .pf-link, .pf-index a { color: var(--gold-text); text-underline-offset: 3px; }
.pf-also { margin: 28px 0 0; padding: 20px 0 0; border-top: 1px solid var(--line); list-style: none; display: grid; gap: 8px; color: var(--muted); }

.pf-work { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; padding-block: 32px; border-top: 1px solid var(--line); }
.pf-work:first-of-type { border-top: 0; padding-top: 0; }
.pf-work--shot { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); align-items: center; gap: clamp(24px, 4vw, 56px); }
.pf-work__text { display: grid; gap: 10px; align-content: start; max-width: 60ch; }
.pf-work__text > p:not(.pf-when) { color: var(--muted); line-height: 1.6; }
.pf-when { color: var(--gold-text); font-size: 15px; }
.pf-shot { display: block; border: 1px solid var(--line); }
.pf-shot img { width: 100%; height: auto; display: block; }
.pf-shot:hover { border-color: var(--gold); }

.pf-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(32px, 5vw, 72px); }
.pf-two h2 { font-size: clamp(26px, 2.8vw, 36px); }
.pf-dl { margin: 0; display: grid; gap: 6px; }
.pf-dl dt { font-weight: 600; margin-top: 14px; }
.pf-dl dt:first-child { margin-top: 0; }
.pf-dl dd { margin: 0; color: var(--muted); line-height: 1.55; }

.pf-verse { margin: 0 0 36px; max-width: 58ch; font: 400 clamp(19px, 1.8vw, 24px)/1.5 var(--font-display); color: var(--fg); }
.pf-verse cite { display: block; margin-top: 12px; font: 400 15px var(--font-body); color: var(--gold-text); font-style: normal; }
.pf-trips { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; border-top: 1px solid var(--line); }
.pf-trips article { padding: 24px 24px 0 0; display: grid; gap: 8px; align-content: start; }
.pf-trips article + article { border-left: 1px solid var(--line); padding-left: 24px; }
.pf-trips p:not(.pf-when) { color: var(--muted); line-height: 1.55; }
.pf-also-p { margin-top: 28px !important; color: var(--muted); max-width: 70ch; }

.pf-index__intro { color: var(--muted); margin: -12px 0 32px !important; }
.pf-index { columns: 2; column-gap: clamp(32px, 5vw, 72px); }
.pf-index__group { break-inside: avoid; margin-bottom: 36px; }
.pf-index__group h3 { font-size: 18px; padding-bottom: 10px; border-bottom: 1px solid var(--line); margin-bottom: 4px; }
.pf-index ul { list-style: none; margin: 0; padding: 0; }
.pf-index li { display: grid; gap: 2px; padding: 10px 0; border-bottom: 1px solid var(--line-soft); }
.pf-index__name { font-weight: 600; }
.pf-index a { font-weight: 600; }
.pf-index__line { color: var(--muted); font-size: 15px; line-height: 1.45; }

@media (max-width: 800px) {
  .pf-hero__grid, .pf-lead__grid, .pf-work--shot, .pf-two { grid-template-columns: minmax(0, 1fr); }
  .pf-hero__photo { max-width: 240px; order: -1; }
  .pf-honors, .pf-trips { grid-template-columns: minmax(0, 1fr); }
  .pf-honors article, .pf-trips article { padding: 20px 0; }
  .pf-honors article + article, .pf-trips article + article { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); }
  .pf-index { columns: 1; }
  .pf-phones img:nth-child(2) { margin-top: 18px; }
  .pf-phones img:nth-child(3) { margin-top: 36px; }
}
`;
