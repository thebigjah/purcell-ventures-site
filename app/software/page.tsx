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
    desc: "This site. It carries several business divisions, AI tools, a business finder built on the Google Places API, and a private sales system.",
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
    desc: "An AI companion chat app, still in development. I plan for it to track goals, habits and fitness.",
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
    for: "Landing pages, Chrome extensions, small tools and automation scripts. The exact price comes out of the discovery call.",
  },
  {
    name: "Full apps",
    price: "$5,000 to $15,000 and up",
    for: "Mobile apps, web platforms, AI tools and full-stack applications. The exact price comes out of the discovery call.",
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
        title="Mobile apps, web platforms and AI tools built for one business."
        lede="I scope each project on a free 30-minute discovery call, write the proposal, build it, and stay involved after launch."
        meta="Small projects $1,500 to $3,500. Full apps $5,000 to $15,000 and up."
        actions={<>
          <Button href={MAIL}>Start a project</Button>
          <Button href="#work" ghost>See my work</Button>
        </>}
      />

      <Section title="What it costs" intro="Every project starts with a free 30-minute discovery call. I set the scope and the price on that call.">
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
            { name: "Build", line: "You get updates throughout. I use Claude Code to write drafts and I review every change." },
            { name: "Launch and support", line: "I test and deploy, then stay available for fixes and follow-on work after launch." },
          ]}
        />
      </Section>

      <ClosingCall
        title="Start a project"
        line="Tell me what you want to build. I tell you whether I can help and what it takes. I reply within one business day."
        button="Email Elijah"
        href={MAIL}
      />
    </main>
  );
}
