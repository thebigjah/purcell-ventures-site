import { PageHero, Section, Prose, Button, Rows, Facts, Tiers, Faq, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. It was a client component for no reason (no
// state, no handlers), so it is a server component now. Every plan, package, table row,
// sample week and FAQ answer from the old page is still here.

const TIERS = [
  {
    name: "One-off help",
    price: "$99 flat",
    for: "One 90-minute session, in person in Tuscaloosa or metro Atlanta, or over video. You bring one problem and we solve it in that session.",
    items: ["Suits a single need: a new iPhone, a ChatGPT lesson, a smart speaker setup or a move to a password manager"],
  },
  {
    name: "Monthly care",
    price: "$79 a month",
    for: "Unlimited texts during business hours, a 30-minute video check-in every month, and one in-person visit a month in Tuscaloosa or metro Atlanta.",
    items: ["Suits ongoing help, when you have tech questions most weeks and want someone to text", "The plan I recommend for most people"],
  },
  {
    name: "Family care",
    price: "$149 a month",
    for: "Everything in Monthly care, for up to 4 family members on one plan.",
    items: ["Suits adult children who support their parents' devices. Your mom calls me instead of you."],
  },
];

const PACKAGES = [
  { name: "New phone setup", fig: "$79", line: "An iPhone or Android out of the box: contacts, email, photos, apps, a password manager, two-factor sign-in, accessibility settings, and unused apps removed." },
  { name: "ChatGPT crash course", fig: "$129", line: "A 90-minute hands-on lesson. By the end you can use ChatGPT or Claude for research, writing, planning and decisions. I build it around the things you want to use it for." },
  { name: "Password manager migration", fig: "$99", line: "I set up 1Password or Bitwarden, move every saved password out of your browsers, and set up family sharing. You stop reusing passwords." },
  { name: "Medication reminder setup", fig: "$99", line: "For an elderly parent or grandparent. Smart speaker reminders, phone reminders and a visual cue system. Includes a 30-minute training session with them." },
  { name: "Smart home starter", fig: "$199", line: "One Echo or Google Home, 4 smart bulbs, 2 plugs, and three routines I set up (morning, evening and away). Includes a 60-minute walkthrough." },
  { name: "Digital legacy plan", fig: "$149", line: "I document every account, password, subscription and digital asset so your family can reach them if something happens to you. I write the plan down, store it securely and test it." },
];

const PROBLEMS = [
  { name: "“My phone is a mess”", line: "I sort your apps, notifications and photos in one session." },
  { name: "“Everyone says to use AI”", line: "I show you which AI tools, such as ChatGPT, Claude or Gemini, save you time on the things you do." },
  { name: "“My passwords are everywhere”", line: "If you reuse passwords or keep them on sticky notes, one breach exposes every account. I set up a password manager." },
  { name: "“My mom can't keep track of her meds”", line: "I set up phone reminders, a smart speaker and visual cues, then teach her to use them." },
  { name: "“I bought an Echo and it is still in the box”", line: "I set up the smart home gear and walk you through it." },
  { name: "“My digital life is a mess”", line: "I clean up iCloud, Google Drive and forgotten subscriptions, then set up a system you can keep up with." },
];

const COMPARE: [string, string, string, string, string][] = [
  ["Patience with people who are not technical", "Built for people who are not technical", "Depends on the technician", "Often frustrated", "Nobody to ask"],
  ["Teaches you to do it yourself", "Every session", "Rarely", "Rarely, because they do it for you", "You teach yourself"],
  ["Available between visits", "Unlimited texts on Monthly and Family care", "Pay per visit", "Yes, when they have time", "Nobody to ask"],
  ["Cost in a typical month", "$79 to $149 a month", "Per-visit fees", "$0, paid in their patience", "$0, paid in your time"],
  ["Knows AI tools well", "My main focus", "Generally no", "Depends on the kid", "YouTube tutorials"],
  ["Handles family members", "Family care covers up to 4 people", "Each person pays separately", "You become the help desk", "Everyone on their own"],
];

const MONTH = [
  { week: "Week 1", events: [
    ["Monday", "Onboarding video call, 30 minutes. We meet on Zoom, you tell me what is broken, and I take notes."],
    ["Wednesday", "You text: “My mom can't print from her phone.” I send her a 3-step walkthrough with screenshots."],
  ] },
  { week: "Week 2", events: [
    ["Tuesday", "In-person visit (Tuscaloosa or metro Atlanta), 1 hour. We set up her smart speaker and medication reminders and make a card for her fridge that lists who to call."],
    ["Friday", "A short text from her: she called her sister with a voice command."],
  ] },
  { week: "Week 3", events: [
    ["Monday", "You text: “Dad got a new MacBook for Father's Day and he is lost.” I do a 45-minute screen share with him that evening."],
    ["Thursday", "A 30-minute ChatGPT lesson over video for your spouse, who wanted to use it and did not know where to start."],
  ] },
  { week: "Week 4", events: [
    ["Tuesday", "Monthly check-in. I send a summary of what we covered and 2 things to try this month. You forward it to the family group chat."],
    ["Friday", "A quick fix: your mom's iPad updated overnight, an app moved, and she could not find it. Solved by text in 5 minutes."],
  ] },
] as const;

const FAQ = [
  { q: "How is this different from your AI consulting?", a: "Consulting is for business teams: I train your staff to use AI in their work. Steady is for you, your household and your parents." },
  { q: "Where do you work in person?", a: "In-person visits cover Tuscaloosa and metro Atlanta. Remote help by video and screen share covers anywhere in the US. Most Monthly care work happens remotely, and I use the in-person visit for setup or family training." },
  { q: "Can you help my elderly parent, who is not comfortable with technology?", a: "Yes. I built Family care for that. I repeat things, write down steps, come back if something breaks, and explain things in plain words." },
  { q: "Do you fix broken devices?", a: "No. I am not a repair shop. I help you use devices that work. If your laptop is dead, take it to Apple or Best Buy first, and I will help you set up the new one." },
  { q: "What happens after the first month of Monthly care?", a: "It renews every month. You can cancel any time with a text. There is no contract." },
];

export default function SteadyPage() {
  return (
    <main>
      <PageHero
        planet="steady"
        kicker="Steady, personal IT"
        title="Personal IT help for families, from $79 a month."
        lede="For your mom, your dad, your grandparents and you. I set up your devices, teach you to use them, and answer when something breaks."
        meta="Monthly care $79 a month. Family care $149 a month. A one-off session $99."
        actions={<>
          <Button href="/steady/start">Fill out the intake</Button>
          <Button href="#tiers" ghost>See plans</Button>
          <Button href="#packages" ghost>One-off packages</Button>
          <Button href={`mailto:${CONTACT.email}`} ghost>Email Elijah</Button>
        </>}
      />

      <Section title="Who it is for">
        <Prose>
          <p>
            Steady is for the family tech person: the one who answers mom&apos;s phone questions, taught dad to use ChatGPT, and still gets texts about grandma&apos;s tablet. <strong>I can take that job.</strong>
          </p>
        </Prose>
      </Section>

      <Section id="tiers" title="Care plans" intro="Monthly care suits most people. One-off help covers a single problem.">
        <Tiers tiers={TIERS} />
      </Section>

      <Section id="packages" title="Done-for-you packages" intro="Each package has a flat fee and includes the setup and a short training session, so you, or the person you bought it for, can use it afterward.">
        <Rows items={PACKAGES} />
      </Section>

      <Section title="What I help with">
        <Rows items={PROBLEMS} />
      </Section>

      <Section title="How Steady compares" intro="Other ways to handle a mom who cannot work out her phone.">
        <div className="ui-prose" style={{ maxWidth: "none", overflowX: "auto" }}>
          <table style={{ minWidth: 640, display: "table" }}>
            <thead>
              <tr>
                <th scope="col"><span className="ui-muted">Question</span></th>
                <th scope="col" className="ui-gold">Steady</th>
                <th scope="col">Geek Squad at Best Buy</th>
                <th scope="col">Asking your kid</th>
                <th scope="col">Going it alone</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([q, steady, geek, kid, alone]) => (
                <tr key={q}>
                  <th scope="row">{q}</th>
                  <td className="ui-gold">{steady}</td>
                  <td>{geek}</td>
                  <td>{kid}</td>
                  <td>{alone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="A sample month of Monthly care" intro="What four weeks on the plan can look like for one family.">
        {MONTH.map((w, i) => (
          <div key={w.week} style={i ? { marginTop: 32 } : undefined}>
            <h3 style={{ fontSize: 21, margin: "0 0 14px" }}>{w.week}</h3>
            <Facts items={w.events.map(([d, t]) => [d, t])} />
          </div>
        ))}
      </Section>

      <Section title="Common questions">
        <Faq items={FAQ} />
      </Section>

      <ClosingCall
        title="The intake form"
        line="The form takes 5 minutes. I reply within one business day with a recommended plan, or I tell you that you do not need me. Steady is a service of Purcell Ventures LLC, and I run it myself."
        button="Fill out the intake"
        href="/steady/start"
      />
    </main>
  );
}
