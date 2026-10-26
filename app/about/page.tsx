import Link from "next/link";
import { PageHero, Section, Prose, Facts, Rows, Faq, Button } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// THE ABOUT PAGE, rebuilt on the page kit 26 Oct 2026.
//
// The old page hid three of its four sections behind client-side tabs, so a crawler and
// anyone following a "Start a project" link to /about#contact landed on the Story tab
// with no contact details in sight. Every section now renders, and #contact is a real
// anchor on a real section. /contact redirects here.
//
// Content decisions made in the rebuild:
// - His height and the "never met a stranger" line are gone: public pages carry what he
//   would say introducing himself professionally.
// - "Same-day response" is now "I reply within one business day", the site-wide promise.
// - The divisions list matches the company: five active divisions plus real estate as
//   planned, with Mantle Field Services shown as the sister brand it is.

const DIVISIONS = [
  { name: "Websites", line: "Custom websites for local businesses, with hosting and updates after launch.", fig: "From $400 setup and $99 a month", href: "/sites" },
  { name: "Digital add-ons", line: "AI chatbot, booking, CRM, email marketing and 20 more tools for a small business, managed by me on one subscription.", fig: "From $99 a month", href: "/digital" },
  { name: "AI consulting", line: "Hands-on AI training for business teams at your office: ChatGPT workflows, marketing automation and custom sessions.", fig: "From $125 a person", href: "/consulting" },
  { name: "Custom software", line: "Mobile apps, web apps and AI integrations, scoped and built around your problem from idea to launch.", fig: "From $1,500", href: "/software" },
  { name: "Steady", line: "Personal tech help for individuals and households: AI coaching, phone setup, password managers, medication reminders, smart home and family care plans. For the family tech person who needs to hand the job off.", fig: "From $79 a month", href: "/steady" },
  { name: "Real estate", line: "A planned division. It is not taking clients yet." },
  { name: "Mantle Field Services", line: "The sister brand. Gutter cleaning, pressure washing and lawn care in metro Atlanta, run under its own name by the same owner.", fig: "From $50", href: "https://mantle-field-site.vercel.app" },
];

const WRITING = [
  { name: "Can an AI find your business?", href: "/blog/can-ai-find-your-business" },
  { name: "What a small business website costs", href: "/blog/what-a-website-actually-costs" },
  { name: "121 businesses near campus, and what a phone can find", href: "/blog/121-businesses-near-campus" },
  { name: "Five failures from running fifteen AI agents", href: "/blog/what-the-agents-get-wrong" },
  { name: "Studying AI at the University of Alabama", href: "/ai-at-alabama" },
  { name: "AI consultant in Tuscaloosa, Alabama", href: "/ai-consultant-tuscaloosa" },
  { name: "Everything else I have written", href: "/blog" },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        planet="company"
        kicker="About"
        title="Elijah Brent Purcell"
        lede="Founder/CEO of Purcell Ventures LLC. I build autonomous AI agent systems, websites and software, and I study at the University of Alabama in Tuscaloosa."
        actions={<>
          <Button href="#contact">Start a project</Button>
          <Button href="/resume" ghost>Résumé</Button>
        </>}
      />

      <Section title="Why I started the company">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/elijah.jpg"
          alt="Elijah Purcell, founder of Purcell Ventures LLC and University of Alabama student"
          width={120}
          height={120}
          style={{ float: "right", width: 120, height: 120, objectFit: "cover", objectPosition: "50% 20%", margin: "4px 0 12px 20px" }}
        />
        <Prose>
          <p>
            I am 19. I run a company with five active divisions and software in production. I work fast because small businesses need these tools now. <Link href="/who">The short factual version of who Elijah Purcell is</Link> has its own page.
          </p>
          <p>
            I started Purcell Ventures after noticing that AI automation, custom software and digital infrastructure reach enterprises first and small businesses late, if at all. The HVAC contractor, the barber and the florist work long hours with little technical support. I build tools for them.
          </p>
        </Prose>
      </Section>

      <Section title="Background">
        <Facts
          items={[
            ["Location", "Tuscaloosa, Alabama"],
            ["University", "The University of Alabama, Class of 2030"],
            ["Program", "Honors College, psychology and data science"],
            ["Shipped", <><Link className="ui-link" href="/tools">29 free tools</Link> live, plus client sites and production apps, designed and coded by me</>],
            ["Company", `Purcell Ventures LLC, formed April 2025, Georgia control number ${CONTACT.llcControlNumber}`],
            ["Registered in", "Acworth, Georgia"],
            ["Email", <a key="e" className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>],
          ]}
        />
      </Section>

      <Section title="Outside the work">
        <Prose>
          <p>
            I sing bass-baritone, with a range of C1 to F5. I competed in apologetics and debate for four years, was a member of my school&apos;s men&apos;s Bible study, and went on mission trips to North Carolina, the Bahamas, Hawaii and Alaska. I graduated high school with a 3.92 GPA.
          </p>
        </Prose>
      </Section>

      <Section title="Where this is going">
        <Prose>
          <p>
            I study psychology and data science at the University of Alabama Honors College. I am aiming for psychiatry, at the point where AI-driven research meets clinical mental health care. I expect the next generation of mental health treatment to rest on behavioral data, and I think the people building it need to understand both the science and the person it serves.
          </p>
          <p>
            Purcell Ventures is part of that goal. The systems I build for local businesses and the AI workflows I teach teams are practice in the same work: making technology useful to the people who depend on it.
          </p>
          <p>
            My faith runs through all of it. I am a Christian, and I believe people are made in the image of God. So every business I advise, every tool I build and every patient I eventually treat deserves work that reflects that. It is the reason I do this work.
          </p>
        </Prose>
      </Section>

      <Section title="What I build" intro="Five active divisions, one planned, and a sister brand. One person runs all of them.">
        <Rows items={DIVISIONS} />
      </Section>

      <Section title="The mark" intro="An inverse panopticon.">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mark-foil.svg" alt="The Purcell Ventures mark: PV at the center of rings that radiate outward" width={200} height={200} style={{ display: "block", width: 200, height: 200, marginBottom: 28 }} />
        <Prose>
          <p>
            The Purcell Ventures mark inverts Jeremy Bentham&apos;s panopticon, a prison design from 1791 in which one guard in a central tower could watch every prisoner without the prisoners knowing when. The uncertainty alone produced compliance. Michel Foucault later argued that the same design describes modern power in general: institutions control people through the possibility of observation. You regulate yourself because someone might be watching. The watcher stays hidden and the watched stay exposed.
          </p>
          <p>
            The inverse is a principle most free societies claim and few practice: the powerful should be transparent and accountable, and ordinary people should keep their privacy and freedom. The mark draws that idea. PV sits at the center, in plain view. The rings radiate outward toward the people I work with, and the space beyond them belongs to those people. I am the one who can be observed.
          </p>
          <p>
            In 2026 that position is rarer than it should be. The platforms, algorithms and AI models that decide people&apos;s credit, feeds and hiring are opaque by design. Bentham designed that asymmetry for prisoners, and the economy now assumes it. The mark is my answer. My name is on the business, and you deal with me directly.
          </p>
          <h3>The name</h3>
          <p>
            Purcell Ventures carries my last name. When something ships under this name, I shipped it. When a client has a problem, I answer for it.
          </p>
          <p>
            Ventures, because the company is a set of separate projects that I build, test and grow, and some of them carry risk.
          </p>
        </Prose>
      </Section>

      <Section id="contact" title="Contact" intro="Email works best. I reply within one business day. For something urgent, call or text.">
        <Facts
          items={[
            ["Email", <a key="e" className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>],
            ["Phone or text", <a key="p" className="ui-link" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>],
            ["LinkedIn", <a key="l" className="ui-link" href="https://www.linkedin.com/in/theelijahpurcell" target="_blank" rel="me noopener noreferrer">linkedin.com/in/theelijahpurcell</a>],
            ["GitHub", <a key="g" className="ui-link" href="https://github.com/thebigjah" target="_blank" rel="me noopener noreferrer">github.com/thebigjah</a>],
            ["Résumé", <Link key="r" className="ui-link" href="/resume">purcellventures.co/resume</Link>],
          ]}
        />
        <div className="ui-hero__actions">
          <Button href={`mailto:${CONTACT.email}`}>Email me</Button>
          <Button href={`tel:${CONTACT.phoneE164}`} ghost>Call {CONTACT.phone}</Button>
        </div>
        <h3 style={{ marginTop: 48, marginBottom: 8 }}>What to expect</h3>
        <Faq
          items={[
            { q: "Who will I talk to?", a: "Me, Elijah Purcell. I handle every project myself, from the first message to delivery." },
            { q: "How fast do you respond?", a: "I reply within one business day. If you need an answer sooner, call or text." },
            { q: "Do you take clients outside Atlanta?", a: "For websites, digital services, consulting and software, yes. Gutter cleaning, pressure washing and lawn care go through the sister brand Mantle Field Services, in metro Atlanta only." },
            { q: "What is the best way to start?", a: "An email with one sentence about what you need. I will tell you whether I can help and what the work would involve." },
          ]}
        />
      </Section>

      {/* /about is one of the few pages Google has indexed, so it links the writing to get
          the newer posts discovered. */}
      <Section title="Recent writing">
        <Rows items={WRITING} />
      </Section>
    </main>
  );
}
