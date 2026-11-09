import Link from "next/link";
import { PageHero, Section, Prose, Button, ClosingCall } from "@/app/components/ui";
import { UpdatedLine } from "@/app/components/PageDates";
import PageDates from "@/app/components/PageDates";

// CASE STUDIES, rebuilt on the page kit 26 Oct 2026.
//
// None are published yet. When a client approves one, add it to CASE_STUDIES with
// isPublic: true and it renders in place of the "first clients" section. No invented
// quotes or placeholder testimonials, ever.

interface CaseStudy {
  slug: string;
  industry: string;
  companyType: string;
  sessionType: string;
  problem: string;
  solution: string;
  outcome: string;
  quote: string;
  quoteAttribution: string;
  timeframe: string;
  isPublic: boolean;
}

const CASE_STUDIES: CaseStudy[] = [
  // When clients say yes to a testimonial, fill in the data and push.
];

export default function CaseStudiesPage() {
  const liveStudies = CASE_STUDIES.filter((cs) => cs.isPublic);

  return (
    <main>
      <PageHero
        planet="casestudies"
        kicker="Case studies"
        title="Case studies: an App Store app, a stall tracker, a 57-agent system and a town audit"
        lede="Four pieces of work anyone can check today: an iPhone app built for a client, a stall tracker for a ramen stand, the AI system that runs this company, and an audit of every business near the University of Alabama. Client case studies with results go up only when the client says yes."
      />

      <Section title="Rufus Rideshare: a client app on the App Store" intro="Client work, September to October 2026. Design, build and App Store release.">
        <Prose>
          <h3>The request</h3>
          <p>
            John White, a student at Georgia College &amp; State University, asked in September 2026 for a way to help students get rides from other students they can see and choose.
          </p>
          <h3>What I built</h3>
          <p>
            Rufus is an iPhone app. Everyone signs in with a school email, so riders only see other students. Before saying yes, a rider sees the driver, the car and the last four digits of the plate. One tap shares the ride with a friend or parent, who needs no app or account to follow it. Rufus takes no money. Drivers suggest a gas share and riders settle it between themselves.
          </p>
          <h3>The result</h3>
          <p>
            Apple approved Rufus for the App Store on 8 October 2026, about a month after the first conversation. You can <a href="https://apps.apple.com/us/app/rufus-rideshare/id6813645816">see it on the App Store</a> or read more on the <Link href="/portfolio">portfolio page</Link>. Rufus is an independent app and is not affiliated with or endorsed by Georgia College &amp; State University.
          </p>
        </Prose>
      </Section>

      <Section title="COSMIC: the AI system that runs Purcell Ventures" intro="In-house system that runs the company every day.">
        <Prose>
          <h3>The problem</h3>
          <p>
            One founder who is also a full-time student cannot find leads, build previews, write outreach and publish every day by hand.
          </p>
          <h3>What I built</h3>
          <p>
            COSMIC is a team of 57 AI agents in 17 rooms. Each agent has a name, one job and limited access, and a command app I built for Mac and Android coordinates them. They find local businesses, build preview sites, draft outreach and score every draft for clear writing. The sensitive steps wait for my approval.
          </p>
          <h3>What it shows a client</h3>
          <p>
            The same pattern works at a smaller size for a small business: one agent for one job, narrow access and a person who approves the risky step. The <Link href="/ai-automation">AI automation guide</Link> covers what to hand off first, and the <Link href="/team">team page</Link> lists the agents.
          </p>
        </Prose>
      </Section>

      <Section title="Kristian's Ramen: a site and stall tracker" intro="Client work for a friend's ramen stand.">
        <Prose>
          <h3>The request</h3>
          <p>
            A friend runs a ramen stand and kept the menu, the day's sales and the stock count in separate places.
          </p>
          <h3>What I built</h3>
          <p>
            One web app holds the menu, sales and inventory, so the stand checks what sold and what is left in one place. You can <a href="https://kristian-ramen.vercel.app">open it here</a>.
          </p>
          <h3>What it shows a client</h3>
          <p>
            A small food business rarely needs a large system. It needs the three numbers it checks every day in one place. The <Link href="/ai-for/restaurants">AI for restaurants guide</Link> covers what to add after that.
          </p>
        </Prose>
      </Section>

      <Section title="121 businesses near campus: an audit anyone can repeat" intro="Research, published on the Purcell Ventures blog.">
        <Prose>
          <h3>The question</h3>
          <p>
            How many independent businesses within walking distance of the University of Alabama Quad can a phone search, a map app or an AI assistant actually find?
          </p>
          <h3>The method</h3>
          <p>
            I pulled every independent business within 2,500 meters of the Quad from OpenStreetMap with a free query, then checked each one for a website a machine can reach and for opening hours recorded online.
          </p>
          <h3>The finding</h3>
          <p>
            Of 121 businesses, 27 had a website a machine could reach and 23 had opening hours recorded anywhere. The <Link href="/blog/121-businesses-near-campus">full write-up</Link> has the numbers, and the <Link href="/blog/audit-every-business-in-your-town">method post</Link> shows how to run the same audit on any town.
          </p>
        </Prose>
      </Section>

      {liveStudies.length === 0 ? (
        <Section title="Client case studies with results">
          <Prose>
            <p>
              I am taking a small number of first clients, and I will ask each one for permission to publish the results. I plan to publish the first case studies within 60 days of starting client work.
            </p>
            <p>
              Early clients pay a discounted rate and get more of my time. You can also use your case study in your own marketing.
            </p>
          </Prose>
          <div className="ui-hero__actions">
            <Button href="/consulting/book">Book a consulting call</Button>
          </div>
        </Section>
      ) : (
        liveStudies.map((cs) => (
          <Section key={cs.slug} title={cs.companyType} intro={`${cs.industry}, ${cs.timeframe}. ${cs.sessionType}.`}>
            <Prose>
              <h3>The problem</h3>
              <p>{cs.problem}</p>
              <h3>What I did</h3>
              <p>{cs.solution}</p>
              <h3>The outcome</h3>
              <p>{cs.outcome}</p>
              <blockquote>
                <p>&ldquo;{cs.quote}&rdquo;</p>
                <p className="ui-muted ui-small">{cs.quoteAttribution}</p>
              </blockquote>
            </Prose>
          </Section>
        ))
      )}

      <ClosingCall
        title="Consulting sessions"
        line="I start from how your team works today. Send me a message and I will recommend a session. I reply within one business day."
        button="See consulting sessions"
        href="/consulting"
      />
      <UpdatedLine path="/case-studies" />
      <PageDates path="/case-studies" />
    </main>
  );
}
