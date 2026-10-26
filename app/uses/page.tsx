import { PageHero, Section, Rows, Prose } from "@/app/components/ui";

// Rebuilt on the page kit 26 Oct 2026. The condenser mic line said "for worship"; he is not
// currently leading worship, so it now says singing.

const STACK: { category: string; items: { name: string; line: string }[] }[] = [
  {
    category: "Editor",
    items: [
      { name: "Claude Code", line: "The terminal AI assistant that wrote most of the code on this site. I pay for a subscription and use it every day." },
      { name: "VS Code", line: "For type-checking, debugging and design previews after the AI hands off." },
      { name: "Terminal", line: "PowerShell on Windows, iTerm2 and zsh on Mac." },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "TypeScript", line: "The default for anything that ships to a browser or a phone." },
      { name: "Python", line: "The default for scraping, automation, AI calls and server code." },
      { name: "Bash and PowerShell", line: "Bash on Mac, PowerShell on Windows. Every workflow eventually gets a script." },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "Next.js", line: "purcellventures.co, elijahbot-refresh and every web tool I ship." },
      { name: "React Native and Expo", line: "Mobile apps, including Persona AI and a prayer-walk app." },
      { name: "Electron", line: "Desktop apps. ElijahBot Overlay is one." },
      { name: "Tailwind CSS", line: "For styling when I am not writing my own CSS." },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "Claude API", line: "Anthropic's API. The default model for everything I build." },
      { name: "OpenAI API", line: "The backup model, and voice transcription with Whisper." },
      { name: "ElevenLabs", line: "Text to speech for the overlay's voice output." },
      { name: "Embedding APIs", line: "Semantic search across notes, memory and content libraries." },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Vercel", line: "Hosting for every Next.js site I ship." },
      { name: "Cloudflare Tunnel", line: "Exposes localhost so the phone can reach the desktop dashboard." },
      { name: "ntfy.sh", line: "Push notifications without an app. It powers ElijahBot's one-tap approvals on the phone." },
      { name: "Resend", line: "Transactional email, booking confirmations and lead notifications." },
      { name: "Supabase or Firebase", line: "Whichever fits the app. Supabase for SQL, Firebase for realtime data and auth." },
    ],
  },
  {
    category: "Automation",
    items: [
      { name: "yt-dlp", line: "Source footage for the YouTube pipeline." },
      { name: "MoviePy", line: "Assembles generated content into finished videos." },
      { name: "Selenium", line: "Headless scraping when no API exists." },
      { name: "Task Scheduler", line: "Cron for Windows. Every ElijahBot job runs on it." },
    ],
  },
  {
    category: "Hardware",
    items: [
      { name: "Windows desktop", line: "Runs the long-running automations." },
      { name: "MacBook", line: "For travel. It shares the same memory directory, synced through iCloud." },
      { name: "Android phone", line: "ntfy on the home screen for one-tap approvals from anywhere." },
      { name: "Condenser mic", line: "For singing, course recording and voiceover." },
    ],
  },
  {
    category: "Tools I refuse",
    items: [
      { name: "Subscription bloat", line: "If I do not open a subscription every week, I cancel it." },
      { name: "No-code platforms", line: "I used them and stopped, because moving off them is hard. I write custom code instead." },
      { name: "Generic AI productivity tools", line: "I write my own workflows." },
    ],
  },
];

export default function UsesPage() {
  return (
    <main>
      <PageHero
        planet="tools"
        kicker="Uses"
        title="The tools I use"
        lede="My stack: editor, languages, frameworks, AI, infrastructure, automation and hardware. I use every tool here in production work."
        meta="Updated May 2026"
      />

      {STACK.map((bucket) => (
        <Section key={bucket.category} title={bucket.category}>
          <Rows items={bucket.items} />
        </Section>
      ))}

      <Section>
        <Prose>
          <p className="ui-muted">
            I update this page when the stack changes. The idea comes from <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">uses.tech</a>.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
