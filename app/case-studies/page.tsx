import { PageHero, Section, Prose, Button, ClosingCall } from "@/app/components/ui";

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
        title="Case studies, published once each client approves."
        lede="Each case study will describe the team, the workflow and the hours it saved, and it goes up only with the client's permission."
      />

      {liveStudies.length === 0 ? (
        <Section title="First clients wanted">
          <Prose>
            <p>
              I am taking a small number of first clients and will ask each one for permission to publish the results. I plan to publish the first case studies within 60 days of starting client work.
            </p>
            <p>
              Early clients get a discounted rate and more of my attention. If you want, you can use the case study in your own marketing.
            </p>
          </Prose>
          <div className="ui-hero__actions">
            <Button href="/consulting/book">Book the conversation</Button>
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
        line="I work from your team's own workflows. Send me a message and I will recommend a session. I reply within one business day."
        button="See consulting sessions"
        href="/consulting"
      />
    </main>
  );
}
