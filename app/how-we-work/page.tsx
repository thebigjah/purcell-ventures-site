import { PageHero, Section, Prose, Rows, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. The company is one person, so the page says "I".
// The stages are a real sequence, so they stay in order, without numerals.

const START = `mailto:${CONTACT.email}?subject=Considering%20working%20together`;

const STAGES = [
  {
    title: "First conversation",
    when: "Free, 30 minutes",
    body: "You email me one sentence about the problem. I reply within one business day. We set up a 30-minute call by phone or Zoom, or in person if you are in metro Atlanta or Tuscaloosa. On the call I scope the work and tell you which of my services fits, which does not, and whether someone else would serve you better.",
    bullets: [
      "30 minutes, free, with no slides",
      "A written recommendation by email the same day",
    ],
  },
  {
    title: "Written proposal",
    when: "Within 2 business days of the call",
    body: "If we are a fit, you get a written proposal within 2 business days. It lists what I will build, what I will not build (the out-of-scope section), a price breakdown, a timeline with milestones, and what I need from you to start.",
    bullets: [
      "A specific scope and a list of deliverables",
      "We both sign the out-of-scope section, which keeps the project from growing past what you agreed to pay for",
      "Milestones every 2 weeks for custom software, or every week for digital services setup",
      "The total cost up front, with setup and monthly fees listed",
    ],
  },
  {
    title: "Build",
    when: "Per the scope",
    body: "Work starts once you sign and pay the deposit: 50% for custom software, or the full setup fee for digital services. Custom software gets a milestone review every 2 weeks. A Starter site goes live in 7 to 10 business days and a Pro site in 14 to 21. I send updates without you asking, and if something is going to be late, I tell you before the deadline.",
    bullets: [
      "Websites: 7 to 10 business days for Starter, 14 to 21 for Pro",
      "Custom software: a milestone review every 2 weeks, and your sign-off before the next phase",
      "Updates on a schedule, so you never have to ask",
      "On the channel you prefer: Slack, text or email",
    ],
  },
  {
    title: "Launch and handoff",
    when: "At completion",
    body: "For digital services, the site goes live and you get a walkthrough video and a written handoff document. For custom software, I transfer the code and IP to you and document the deployment steps. You own everything. If you leave, I hand it all over. The monthly retainer pays for maintenance.",
    bullets: [
      "Full code and IP transfer to you on completion",
      "Documentation in plain language",
      "A 30-day warranty after launch: I fix anything that breaks at no charge",
      "An off-ramp clause: end the retainer with 14 days notice and I hand over everything",
    ],
  },
  {
    title: "Ongoing relationship",
    when: "Year one to year three",
    body: "Digital services clients get monthly updates and a quarterly review of what is working. Custom software clients can choose a maintenance retainer or pay per fix. I reply to client email within one business day. For something urgent, call or text the business line.",
    bullets: [
      "A monthly check-in for digital services clients",
      "A quarterly review of the numbers, with your input on what comes next",
      `Call or text ${CONTACT.phone} about urgent problems`,
      "A monthly update on what I am working on and why",
    ],
  },
];

const COMMITMENTS = [
  { name: "No surprise invoices", line: "Every dollar I charge is in the written proposal. If something changes the scope, you sign off before any work happens." },
  { name: "No vendor lock-in", line: "You own your code, IP, domain and data. If you leave, you take all of it with no exit fee." },
  { name: "I say when a product does not fit", line: "When my product is the wrong fit, I tell you. I have turned down deals for that reason." },
  { name: "Response times", line: "I reply within one business day. If I am going to miss, I tell you first." },
  { name: "Code you can read", line: "Every custom software project ships with documentation in plain language. A developer who has never worked with me can maintain it later." },
  { name: "Christian ethics", line: "I do not evangelize to clients. My work follows Christian ethics: honesty over closing a sale, and respect over pressure. These standards apply to every client, whether or not you share the faith." },
];

export default function HowWeWorkPage() {
  return (
    <main>
      <PageHero
        planet="book"
        kicker="How I work"
        title="What happens, in order, from the first email to year three"
        lede="Five stages, six commitments written into every contract, and the work I turn down."
      />

      <Section title="The five stages">
        <div className="ui-entries">
          {STAGES.map((s) => (
            <article className="ui-entry" key={s.title}>
              <div><h3>{s.title}</h3></div>
              <span className="ui-entry__when">{s.when}</span>
              <div className="ui-entry__body">
                <p>{s.body}</p>
                <ul>
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Commitments" intro="These appear in every contract. If I break one, you can end the contract and I refund you.">
        <Rows items={COMMITMENTS} />
      </Section>

      <Section title="When I say no">
        <Prose>
          <p>I turn down work in these cases:</p>
          <ul>
            <li>Your business model relies on practices I will not support: adult content, gambling, predatory finance or MLM.</li>
            <li>You want me to build something that misleads your customers, such as fake reviews, deceptive countdown timers or dark patterns.</li>
            <li>You need it faster than I can deliver it well. I would rather refer you elsewhere than ship something I would be embarrassed by.</li>
            <li>Either of us finds on the first call that we do not work well together.</li>
            <li>An off-the-shelf tool solves your problem better. I will tell you which one to use.</li>
          </ul>
        </Prose>
      </Section>

      <ClosingCall
        title="The first conversation"
        line="Email me one sentence about what you are trying to do. I reply within one business day with whether we are a fit."
        button="Email me"
        href={START}
      />
    </main>
  );
}
