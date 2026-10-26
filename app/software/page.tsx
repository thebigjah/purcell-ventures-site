import { PageHero, Section, Tiers, Rows, Button, ClosingCall } from "@/app/components/ui";
import { CONTACT } from "@/lib/contact";

// Rebuilt on the page kit 26 Oct 2026. The price ranges were already in this page's
// metadata and schema. They now show on the page too, so the visible page and the
// search result say the same thing.

const MAIL = `mailto:${CONTACT.email}?subject=Software%20project%20inquiry`;

const PROJECTS = [
  {
    name: "Pulse",
    type: "Android app",
    status: "Live on Google Play",
    desc: "A rhythm game with Spotify integration. Players tap to their own music as rings expand on the beat.",
    tags: ["React Native", "Phaser.js", "Firebase", "Spotify API", "Capacitor"],
  },
  {
    name: "Purcell Ventures",
    type: "Web platform",
    status: "Live site",
    desc: "This website, with a page for each business division, free AI tools, a business finder built on the Google Places API, and a private sales system.",
    tags: ["Next.js", "TypeScript", "Vercel", "Google Places API"],
  },
  {
    name: "ColdMaid",
    type: "Chrome extension",
    status: "Live extension",
    desc: "A multiplayer card game in a Chrome extension. Neural network bots, trained by a genetic algorithm, play against human players.",
    tags: ["Chrome Extension", "Firebase", "Neural Networks", "OAuth"],
  },
  {
    name: "ElijahBot Overlay",
    type: "Desktop app",
    status: "Live on desktop",
    desc: "A desktop overlay that takes voice input, reads the screen, answers with text-to-speech, and shows a custom neural net visualizer. Built with Electron and the Claude API.",
    tags: ["Electron", "Claude API", "ElevenLabs", "Web Speech API"],
  },
  {
    name: "Persona AI",
    type: "Mobile app",
    status: "In development",
    desc: "An AI companion chat app. I plan to add goal, habit and fitness tracking.",
    tags: ["Expo", "React Native", "Claude API", "Express"],
  },
];

const SERVICES = [
  {
    name: "Mobile apps",
    line: "iOS and Android apps built with React Native or Expo. I design them, build them and publish them to the app stores. Social apps, business tools, games and AI apps.",
  },
  {
    name: "Web applications",
    line: "Full-stack web apps built with Next.js, from landing pages to full SaaS platforms. Business platforms, dashboards, online stores and APIs.",
  },
  {
    name: "AI integration",
    line: "I add AI to your product: chatbots, content generation pipelines, voice tools, recommendations and automation.",
  },
  {
    name: "Automation and tools",
    line: "Custom tools, scripts and pipelines that take over manual work. Chrome extensions, batch processors, scrapers and schedulers.",
  },
];

const ENGAGE = [
  {
    name: "Small projects",
    price: "$1,500 to $3,500",
    for: "Landing pages, Chrome extensions, small tools and automation scripts.",
  },
  {
    name: "Full apps",
    price: "$5,000 to $15,000 and up",
    for: "Mobile apps, web platforms, AI tools and full-stack applications.",
  },
  {
    name: "Ongoing work",
    price: "Quoted on the discovery call",
    for: "Retainer work, long-term projects and feature development over time.",
  },
];

export default function SoftwarePage() {
  return (
    <main>
      <PageHero
        planet="software"
        kicker="Custom software"
        title="I build mobile apps, web platforms and AI tools for businesses."
        lede="I scope each project on a free 30-minute discovery call, then write the proposal, build it and stay involved after launch."
        meta="Small projects $1,500 to $3,500. Full apps $5,000 to $15,000 and up."
        actions={<>
          <Button href={MAIL}>Start a project</Button>
          <Button href="#work" ghost>See my work</Button>
        </>}
      />

      <Section title="Prices" intro="Every project starts with a free 30-minute discovery call, and I set the exact scope and price on that call.">
        <Tiers tiers={ENGAGE} />
      </Section>

      <Section title="What I build">
        <Rows items={SERVICES} />
      </Section>

      <Section id="work" title="Recent work">
        <div className="ui-entries">
          {PROJECTS.map((p) => (
            <article className="ui-entry" key={p.name}>
              <div>
                <h3>{p.name}</h3>
                <p className="ui-entry__org">{p.type}</p>
              </div>
              <span className="ui-entry__when">{p.status}</span>
              <div className="ui-entry__body"><p>{p.desc}</p></div>
              <p className="ui-entry__stack">{p.tags.join(", ")}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="How a project runs">
        <Rows
          items={[
            { name: "Discovery call", line: "30 minutes. You explain the problem. I ask questions and tell you what it takes to build." },
            { name: "Scoped proposal", line: "I send a written breakdown of what gets built, what it costs and the timeline." },
            { name: "Build", line: "I send you updates as I build. Claude Code writes first drafts of the code, and I review every change." },
            { name: "Launch and support", line: "I test and deploy, then stay available for fixes and follow-on work after launch." },
          ]}
        />
      </Section>

      <ClosingCall
        title="Starting a project"
        line="Tell me what you want built, and I will tell you whether I can help and what it would take. I reply within one business day."
        button="Email Elijah"
        href={MAIL}
      />
    </main>
  );
}
