import { PageHero, Section, Prose, Tiers, Facts, Rows, Note, Button, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026 as a server component (it had no state, only links).
// - The line saying his family runs most Mantle jobs is gone: public pages do not carry
//   his family.
// - The courses are not finished, so the rep catalog says the waitlist is open.

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScsnKqYgNWbJe3wD9ju3jRkToOf7Eiu4ecjCV-b99XemX59gQ/viewform";

const COMMISSION = [
  { name: "Apprentice", price: "15% on every close", for: "Sells courses and Mantle Field Services.", items: ["Promotion to Closer after 5 course closes and 80% on the quiz"] },
  { name: "Closer", price: "20%, plus a flat $100, $150 or $200 for each Digital tier", for: "Adds Digital Services subscriptions.", items: ["Promotion to Senior after 5 Digital closes and a co-pitch with Elijah"] },
  { name: "Senior", price: "20% on Consulting, 15% on Custom Software", for: "Adds AI Consulting and Custom Software.", items: ["The final tier"] },
];

const SERVICES: { division: string; blurb: string; tiers: [string, string][] }[] = [
  {
    division: "Digital Services",
    blurb: "Managed websites and AI tools for small businesses, billed monthly in three tiers.",
    tiers: [
      ["Starter", "$99 a month plus $400 setup. Site, AI chatbot and lead form."],
      ["Growth", "$179 a month plus $700 setup. Starter plus booking, email, social and reviews."],
      ["Full Service", "$279 a month plus $1,000 setup. Growth plus CRM, invoicing and AI content."],
    ],
  },
  {
    division: "AI Consulting",
    blurb: "AI training for business teams, held at their office.",
    tiers: [
      ["1-on-1", "$175 an hour. A 2-hour minimum is recommended."],
      ["Small group", "$125 a person. 2 to 8 people, 2-hour minimum."],
      ["Workshop", "$2,500 flat. Up to 20 people, half a day."],
      ["Corporate", "Custom quote. Larger teams, several sessions."],
    ],
  },
  {
    division: "Custom Software",
    blurb: "Apps, web platforms and automation, priced per deal. Senior reps only. Elijah scopes the project and the rep closes.",
    tiers: [
      ["Small project", "$1,500 to $3,500. Scripts and simple tools."],
      ["Full app", "$5,000 to $15,000. Mobile and web applications."],
      ["Retainer", "Custom. Ongoing engagement."],
    ],
  },
  {
    division: "Courses",
    blurb: "Pre-recorded video courses. They cost less than the services and take less time to close. None is finished yet, and the waitlist is open.",
    tiers: [
      ["College Apps", "$297. 17 lessons."],
      ["Business Launch", "$397. 26 lessons."],
      ["Zero to Automated", "$397 self-paced, $1,297 with coaching, $2,997 one-on-one. 25 lessons in 8 modules."],
    ],
  },
];

const ETHICS = [
  { name: "Tell them when they do not need it", line: "If a prospect does not need the product, the rep says so. Nobody lies to close a sale." },
  { name: "No fake urgency", line: "No invented deadlines, no selling on fear, and no claims of limited spots that do not exist." },
  { name: "Sell only what can be delivered", line: "If Purcell Ventures cannot build it, or cannot build it on time, you do not promise it." },
];

const AUTO_REJECTS = [
  "Picking the answer that accepts the cash bribe (B2)",
  "Picking the answer that closes the sale when the prospect does not need it (B5)",
  "Scoring below 6 of 10 on the ethics section, whatever the total",
  "A free response under 50 words",
  "A free response that is plagiarized or plainly written by AI",
];

const PROCESS = [
  { title: "Application and quiz", when: "20 to 30 minutes", body: "The quiz covers product knowledge, ethics and judgment." },
  { title: "Elijah reviews it", when: "Within 7 days", body: "You get an email either way: an interview invitation or a polite no." },
  { title: "Phone interview", when: "20 minutes", body: "A conversation about whether the role fits you." },
  { title: "Contractor agreement and handbook", when: "", body: "A 1099 contractor relationship on standard terms. A parent co-signs if you are under 18." },
  { title: "Onboarding call and materials", when: "30 minutes", body: "You get access to the rep portal: product encyclopedia, pricing, scripts and CRM." },
  { title: "First sales", when: "", body: "You work on your own schedule. Commission is paid on the 1st of each month, after the 30-day clawback window." },
];

export default function SalesRepPage() {
  return (
    <main>
      <PageHero
        kicker="Sales representative"
        title="A commission sales role at Purcell Ventures"
        lede="Commission only, as a 1099 contractor, on your own schedule. You sell digital services, AI consulting, custom software and courses for a Georgia company small enough that you talk to the owner every week."
        actions={<>
          <Button href={FORM_URL}>Take the application</Button>
          <Button href="#what" ghost>What you would sell</Button>
          <Button href="#prep" ghost>Quiz preparation</Button>
        </>}
      />

      <Section title="How you earn" intro="Three tiers. You move up by closing deals and passing the quiz.">
        <Tiers tiers={COMMISSION} />
        <div style={{ marginTop: 32 }}>
          <Note>
            <strong>Projected earnings.</strong> A rep working 10 hours a week could earn $300 to $500 a month at Apprentice, $1,000 to $1,500 at Closer and $2,000 or more at Senior. These are projections from the commission rates above. No rep has received these payouts yet. Commission is paid on the 1st of each month, after a 30-day clawback window clears.
          </Note>
        </div>
      </Section>

      <Section id="what" title="What you would sell">
        <div className="ui-entries">
          {SERVICES.map((svc) => (
            <article className="ui-entry" key={svc.division}>
              <div>
                <h3>{svc.division}</h3>
                <p className="ui-muted" style={{ margin: "6px 0 0" }}>{svc.blurb}</p>
              </div>
              <div className="ui-entry__body" style={{ marginTop: 16 }}>
                <Facts items={svc.tiers} />
              </div>
            </article>
          ))}
        </div>
        <Prose>
          <p style={{ marginTop: 32 }}>
            <strong>Also, at low priority for reps:</strong> Mantle Field Services, the sister brand. Gutter cleaning from $100, pressure washing from $75 and lawn care from $50. Reps rarely close Mantle jobs.
          </p>
        </Prose>
      </Section>

      <Section title="How Purcell Ventures sells" intro="Purcell Ventures is a Christian business. Reps follow three selling rules.">
        <Rows items={ETHICS} />
        <div style={{ marginTop: 32 }}>
          <Note>
            When a prospect offers you cash to drop the price, you refuse, document it, and tell Elijah. When a prospect does not need the full product, you point them to a smaller fit, even if it costs you the bigger commission. The quiz tests for this, and the role does not work without it.
          </Note>
        </div>
      </Section>

      <Section id="prep" title="Quiz preparation" intro="The application has a 20-minute quiz on product knowledge, ethics and customer fit. If you have read this page, you can pass it without studying.">
        <Facts
          items={[
            ["Section A, service knowledge", "5 questions, 1 point each. Do you know what Purcell Ventures sells and what it costs?"],
            ["Section B, ethics scenarios", "5 questions, 2 points each. Would you handle high-pressure or shady situations the right way?"],
            ["Section C, demographics", "3 questions, 1 point each. Can you match the right service to the right customer?"],
            ["Section D, open response", "200 words on why you would represent Purcell Ventures in particular."],
            ["To pass", "14 of 18 on the objective questions, at least 6 of 10 on Section B, and Elijah's approval of Section D."],
          ]}
        />
        <div style={{ marginTop: 32 }}>
          <Note tone="warn">
            <strong>Automatic rejection</strong>
            <ul style={{ margin: "8px 0 0", paddingLeft: "1.2em", listStyle: "disc" }}>
              {AUTO_REJECTS.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </Note>
        </div>
      </Section>

      <Section title="What happens next">
        <div className="ui-entries">
          {PROCESS.map((p) => (
            <article className="ui-entry" key={p.title}>
              <div><h3>{p.title}</h3></div>
              {p.when && <span className="ui-entry__when">{p.when}</span>}
              <div className="ui-entry__body"><p>{p.body}</p></div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="If you are under 18">
        <Prose>
          <p>
            You can represent Purcell Ventures, but a parent or legal guardian has to co-sign the contractor agreement. Pay goes through their account or a joint custodial account. You get the same handbook and commission structure as adult reps. Email Elijah before you submit so you can go through it together: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </Prose>
      </Section>

      <ClosingCall
        title="Apply"
        line={<>The application and quiz take 20 to 30 minutes. Questions before applying go to <a className="ui-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</>}
        button="Take the application"
        href={FORM_URL}
      />
    </main>
  );
}
