import Link from "next/link";
import { PageHero, Section, Prose, Button, Rows, Figures, Tiers, Faq, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. The session list used to be an accordion that
// hid each session's detail behind a click. Every session now shows in full: a buyer
// comparing five sessions should not have to open five panels, and the text reaches
// crawlers without the hidden-panel workaround the old page needed.

const SESSIONS = [
  {
    id: "ai-basics",
    title: "AI basics for business",
    duration: "2 hours",
    tag: "Introductory",
    desc: "What AI is, what it can do today, and where it fits in your business. No tech background needed. I built it for owners and managers who feel behind.",
    outcomes: [
      "Which AI tools exist and which ones matter for your type of business",
      "Three to five tools you can use the next day",
      "What to automate and what to keep with a person",
    ],
    bestFor: "Business owners, managers and non-technical teams",
    groupSize: "2 to 20 people",
  },
  {
    id: "chatgpt-workflow",
    title: "ChatGPT in your workflow",
    duration: "3 hours",
    tag: "Hands-on",
    desc: "We work through email drafting, customer responses, research, content and scheduling live, using scenarios from your own business.",
    outcomes: [
      "Faster drafts of emails and customer responses",
      "Content, proposals and summaries written on demand",
      "A personal prompt library for your own work",
    ],
    bestFor: "Any team that writes to customers and produces content every day",
    groupSize: "2 to 20 people",
  },
  {
    id: "ai-marketing",
    title: "AI for marketing and social media",
    duration: "2.5 hours",
    tag: "Marketing",
    desc: "Caption writing, ad copy, campaign planning and scheduling tools. Your team leaves with a content system it can repeat every month.",
    outcomes: [
      "A month of social content planned in one sitting",
      "Ad copy, captions and email campaigns drafted with AI",
      "A scheduling and approval workflow set up",
    ],
    bestFor: "Marketing teams, social media managers, and owners who post their own content",
    groupSize: "2 to 20 people",
  },
  {
    id: "automation",
    title: "Automating your business",
    duration: "4 hours",
    tag: "Half day",
    desc: "Connect your apps and automate manual work. Covers Zapier, Make, AI assistants and automations specific to your business.",
    outcomes: [
      "Your top three manual processes mapped and automated",
      "Email, CRM, forms and calendar connected without code",
      "At least one working automation built during the session",
    ],
    bestFor: "Operations managers, founders, and teams with repetitive digital work",
    groupSize: "2 to 15 people",
  },
  {
    id: "custom",
    title: "Custom team training",
    duration: "Length set by you",
    tag: "Custom",
    desc: "I learn your software and workflows, then build a session around your tools and problems. It suits established teams best.",
    outcomes: [
      "Training built around your exact tools and use cases",
      "Practice on your own software",
      "A takeaway guide written for your team",
    ],
    bestFor: "Companies with existing software and teams with a specific bottleneck",
    groupSize: "Any size",
  },
];

const PRICING = [
  {
    name: "1-on-1",
    price: "$175 an hour",
    for: "One person, working on your own situation, tools and problems. You set the agenda. I recommend a two-hour minimum.",
  },
  {
    name: "Small group",
    price: "$125 a person",
    for: "2 to 8 people, per session, with a two-hour minimum. Interactive and built around the group. It suits teams that work closely together.",
  },
  {
    name: "Workshop",
    price: "$2,500 flat",
    for: "A half day for up to 20 people. A structured session with Q&A and hands-on exercises, suited to all-hands training or a company event.",
  },
  {
    name: "Corporate or custom",
    price: "Quoted for the job",
    for: "Larger teams, programs of several sessions, or a fully custom curriculum. The quote includes prep time, materials and follow-up resources. Contact me for pricing.",
  },
];

const FAQ = [
  // The city question belongs on the page people land on for consulting, and it is the
  // internal link into /ai-consultant-tuscaloosa, which was reachable from /about only.
  {
    q: "Where are you based?",
    a: <>Tuscaloosa, Alabama. The LLC is registered in Acworth, Georgia, where I formed it, and I run it from Tuscaloosa, where I attend the University of Alabama. Local businesses can meet in person, which is the part that is hard to do remotely. A fuller page covers <Link className="ui-link" href="/ai-consultant-tuscaloosa">local work in Tuscaloosa</Link>.</>,
  },
  { q: "Does my team need any tech experience?", a: "No. I design most sessions for people who have never used AI tools. I start where your team is and build from there." },
  { q: "What do participants bring?", a: "A laptop or tablet and a willingness to try things. I handle the setup, demos, exercises and the takeaway guide." },
  { q: "Can you come to our location?", a: "Yes. I come to your office and train your team there. Examples from your own setting make the session more useful." },
  { q: "How is this different from using ChatGPT on my own?", a: "Most people use AI tools for one-off questions. I show you prompting techniques, integrations and workflows that save time in your type of business." },
  { q: "Will the session turn into a sales pitch for your other services?", a: "Only if something fits. Consulting stands on its own. If I see something in your business that I could build for you, I mention it once, after the session." },
  { q: "How far ahead do I need to book?", a: "Standard sessions need 1 to 2 weeks. Custom trainings need more prep time, so contact me as early as you can." },
];

const EMAIL = `mailto:${CONTACT.email}?subject=Consulting%20session%20inquiry`;

export default function ConsultingPage() {
  return (
    <main>
      <PageHero
        planet="consulting"
        kicker="AI consulting"
        title="Hands-on AI training for your team, from $125 a person."
        lede={<>I come to your business and teach your team to use AI, with each session built around the tools you already use. Your team leaves with a takeaway guide the same day. I am based in Tuscaloosa, Alabama, and work nationwide. <Link className="ui-link" href="/ai-consultant-tuscaloosa">Local work in Tuscaloosa</Link>.</>}
        meta="1-on-1 at $175 an hour. Small groups at $125 a person. Half-day workshop at $2,500 for up to 20 people."
        actions={<>
          <Button href="/consulting/book">Book a session</Button>
          <Button href="/ai-readiness" ghost>Take the 3-minute readiness test</Button>
          <Button href="#sessions" ghost>See the sessions</Button>
        </>}
      />

      <Section>
        <Figures
          items={[
            ["5", "core sessions"],
            ["1 to 20", "people, from 1-on-1 to a workshop"],
            ["$125", "a person, the lowest rate"],
            ["Same day", "takeaway guide for every participant"],
          ]}
        />
      </Section>

      <Section id="pricing" title="Pricing by group size" intro="The rate depends on group size and session length. The per-person cost drops as the group grows. Every session includes a takeaway guide.">
        <Tiers tiers={PRICING} />
        <p className="ui-muted" style={{ marginTop: 24 }}>
          If you are not sure which session fits, <a className="ui-link" href="#contact">send me a message</a> and I will recommend one.
        </p>
      </Section>

      <Section id="sessions" title="Five core sessions" intro="Pick a session. I build it around your industry, your tools and your team.">
        <div className="ui-entries">
          {SESSIONS.map((s) => (
            <article className="ui-entry" id={s.id} key={s.id}>
              <div>
                <h3>{s.title}</h3>
                <p className="ui-entry__org">{s.tag}</p>
              </div>
              <span className="ui-entry__when">{s.duration}</span>
              <div className="ui-entry__body">
                <p>{s.desc}</p>
                <p>What your team leaves with:</p>
                <ul>
                  {s.outcomes.map((o) => <li key={o}>{o}</li>)}
                </ul>
                <p className="ui-muted">Best for {s.bestFor.charAt(0).toLowerCase() + s.bestFor.slice(1)}. Group size: {s.groupSize}.</p>
                <p><Link className="ui-link" href="/consulting/book">Book this session</Link></p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Who books this" intro="Teams that know they should be using AI and have not started.">
        <Rows
          items={[
            { name: "Small business owners", line: "You run a tight operation. An hour a day saved on admin is 250 working hours a year." },
            { name: "Office and operations teams", line: "Your team does repetitive digital work. I show you which parts software can handle." },
            { name: "Marketing departments", line: "Content takes hours to produce. In a session I show how AI shortens drafting, and we time it on your own content." },
            { name: "Teams new to AI", line: "If your team has not used AI tools yet, the AI basics session starts from zero." },
          ]}
        />
      </Section>

      <Section title="How a session runs">
        <Rows
          items={[
            { name: "A 15-minute call", line: "You tell me about your business, your team and the tasks that eat the most time. I tell you which session fits and what I will customize." },
            { name: "I build your session", line: "I build the presentation around your tools, workflows and industry, so the session fits your team." },
            { name: "We run it", line: "I come to you. Live demos and exercises on your own tools. Every participant gets a takeaway guide." },
            { name: "Follow-up", line: "After the session I send a resource package with the key tools, prompts and next steps from what we covered. You can email me questions afterward." },
          ]}
        />
      </Section>

      <Section title="Why work with me" intro="I am nineteen and I have built these systems for a year.">
        <Prose>
          <p>
            I spent a year building autonomous systems and shipping production tools full-time while still in high school. The work I offer is the same work I do in my own business every day.
          </p>
        </Prose>
        <div style={{ marginTop: 32 }}>
          <Rows
            items={[
              { name: "34 college acceptances", line: "Acceptances from colleges and honors programs across the country." },
              { name: "7 security audits", line: "Read-only audits of live production applications, each finding delivered with a severity, a reproduction path and a fix." },
              { name: "UA Honors College, fall 2026", line: "A self-designed psychology and data science major in New College at the University of Alabama, on a pre-med path." },
              { name: "Tools I run myself", line: "Every tool I teach runs in my own business, starting with purcellventures.co." },
            ]}
          />
        </div>
      </Section>

      <Section title="Early client terms">
        <Prose>
          <p>I have no corporate testimonials yet. My consulting business is at its start.</p>
          <p>Early clients get my full attention and lower rates than I will charge in a year. I will also ask to publish the results as my first case studies.</p>
        </Prose>
      </Section>

      <Section title="Common questions">
        <Faq items={FAQ} />
      </Section>

      <div id="contact">
        <ClosingCall
          title="Tell me about your team"
          line={<>Email me about your team and I will come back with a session recommendation and a quote. I reply within one business day. You can also use the <Link className="ui-link" href="/consulting/book">booking form</Link>.</>}
          button="Email Elijah"
          href={EMAIL}
        />
      </div>
    </main>
  );
}
