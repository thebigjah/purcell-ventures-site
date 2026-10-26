import Link from "next/link";
import { PageHero, Section, Prose, Facts, Rows, Faq, Button } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// THE ABOUT PAGE, rebuilt on the page kit 26 Oct 2026.
//
// The old page hid three of its four sections behind client-side tabs, so a crawler and
// anyone following a "Start a project" link to /about#contact landed on the Story tab
// with no contact details in sight. Every section now renders, and #contact is a real
// anchor on a real section.
//
// Content decisions made in the rebuild:
// - 26 Oct, second pass: singing, debate and the "Outside the work" section are gone at
//   his request, replaced by Missions. "The mark" section (the old PV rings mark) is gone.
// - His height and the "never met a stranger" line are gone: public pages carry what he
//   would say introducing himself professionally.
// - "Same-day response" is now "I reply within one business day", the site-wide promise.
// - The divisions list matches the company: five active divisions plus real estate as
//   planned, with Mantle Field Services shown as the sister brand it is.

const DIVISIONS = [
  { name: "Websites", line: "Custom websites for local businesses, with hosting and updates after launch.", fig: "From $650 setup and $99 a month", href: "/sites" },
  { name: "Digital add-ons", line: "26 add-ons for a small business, including an AI chatbot, booking, a CRM and email marketing, managed by me on one subscription.", fig: "From $99 a month", href: "/digital" },
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
        lede="Founder/CEO of Purcell Ventures LLC. I build websites, software and AI agent systems for small businesses, and I study at the University of Alabama."
        actions={<>
          <Button href="#contact">Start a project</Button>
          <Button href="/resume" ghost>Résumé</Button>
        </>}
      />

      <Section
        title="Why I started the company"
        aside={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/brand/elijah.jpg" alt="Elijah Purcell, founder of Purcell Ventures LLC and University of Alabama student" width={240} height={240} />
        }
      >
        <Prose>
          <p>
            I started Purcell Ventures in April 2025, when I was 17. Most of my clients are local service businesses, like contractors, salons and clinics, with nobody on staff to run their website or set up AI tools. Large companies have had that help for years. I build it for the small ones, and I keep supporting it after launch.
          </p>
          <p>
            Today the company has five active divisions and software running in production. I write the code, answer the phone and sign the contracts myself, and the company carries my last name, so the work I ship is work I answer for.
          </p>
          <p>
            <Link className="ui-link" href="/who">Who is Elijah Purcell</Link>
          </p>
        </Prose>
      </Section>

      <Section title="Background">
        <Facts
          items={[
            ["Location", "Tuscaloosa, Alabama"],
            ["University", "The University of Alabama, Class of 2030"],
            ["Program", "Honors College, psychology and data science"],
            ["Shipped", <><Link className="ui-link" href="/digital/tools">26 free AI tools</Link> for small businesses, plus client sites and production apps, all designed and coded by me</>],
            ["AI agents", <>COSMIC, a station of 57 AI agents in 17 rooms that runs proposals, site audits, research and outreach for the company. <Link className="ui-link" href="/team">See the roster</Link></>],
            ["Company", `Purcell Ventures LLC, formed April 2025, Georgia control number ${CONTACT.llcControlNumber}`],
            ["Registered in", "Acworth, Georgia"],
            ["Email", <a key="e" className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>],
          ]}
        />
      </Section>

      <Section title="Missions">
        <Prose>
          <p>
            I am called to missions. I have served on mission trips to North Carolina, the Bahamas and Hawaii, and I have a heart for the nations. The verse behind that is Acts 1:8:
          </p>
          <blockquote>
            &ldquo;but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all Judea and Samaria, and even to the remotest part of the earth.&rdquo; (NASB)
          </blockquote>
        </Prose>
      </Section>

      <Section title="Where this is going">
        <Prose>
          <p>
            I am studying psychology and data science on a pre-med track toward psychiatry. I want to work where AI research meets clinical mental health care, and I think the people who build those tools should understand both the science and the patient.
          </p>
          <p>
            Running Purcell Ventures is practice for that work, because in both cases the technology has to be useful to the person who depends on it.
          </p>
          <p>
            I am a Christian, and I believe every person is made in the image of God. That belief shapes how I treat clients now and how I plan to treat patients later.
          </p>
        </Prose>
      </Section>

      <Section title="Divisions" intro="Five active divisions, one planned, and a sister brand. I run all of them.">
        <Rows items={DIVISIONS} />
      </Section>

      <Section id="contact" title="Contact" intro="Email works best, and I reply within one business day. Call or text if it is urgent.">
        <Facts
          items={[
            ["Email", <a key="e" className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>],
            ["Phone or text", <a key="p" className="ui-link" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>],
            ["LinkedIn", <a key="l" className="ui-link" href="https://www.linkedin.com/in/theelijahpurcell" target="_blank" rel="me noopener noreferrer">linkedin.com/in/theelijahpurcell</a>],
            ["GitHub", <a key="g" className="ui-link" href="https://github.com/thebigjah" target="_blank" rel="me noopener noreferrer">github.com/thebigjah</a>],
            ["Résumé", <Link key="r" className="ui-link" href="/resume">purcellventures.co/resume</Link>],
            ["Contact card", <Link key="c" className="ui-link" href="/contact">Save my details to your phone</Link>],
          ]}
        />
        <div className="ui-hero__actions">
          <Button href={`mailto:${CONTACT.email}`}>Email me</Button>
          <Button href={`tel:${CONTACT.phoneE164}`} ghost>Call {CONTACT.phone}</Button>
        </div>
        <h3 style={{ marginTop: 48, marginBottom: 8 }}>What to expect</h3>
        <Faq
          items={[
            { q: "Who will I talk to?", a: "Me. I handle every project myself, from the first message to delivery." },
            { q: "How fast do you respond?", a: "I reply within one business day. If you need an answer sooner, call or text." },
            { q: "Do you work outside Tuscaloosa and Atlanta?", a: "For websites, digital add-ons, consulting and software, yes, remotely. Gutter cleaning, pressure washing and lawn care go through the sister brand Mantle Field Services, in metro Atlanta only." },
            { q: "What is the best way to start?", a: "Send me an email with one sentence about what you need. I will tell you whether I can help and what the work involves." },
          ]}
        />
      </Section>

      {/* /about is one of the few pages Google has indexed, so it links recent posts to get
          them discovered. */}
      <Section title="Recent writing">
        <Rows items={WRITING} />
      </Section>
    </main>
  );
}
