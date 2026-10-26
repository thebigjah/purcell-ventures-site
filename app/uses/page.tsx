import { PageHero, Section, Rows, Prose } from "@/app/components/ui";

// Rebuilt on the page kit 26 Oct 2026. The condenser mic line used to mention worship and
// then singing. Singing never appears on public pages, so the line now names only the work uses.

const STACK: { category: string; items: { name: string; line: string }[] }[] = [
  {
    category: "Editor",
    items: [
      { name: "Claude Code", line: "An AI coding assistant that runs in the terminal. It wrote most of the code on this site, and I use it every day." },
      { name: "VS Code", line: "For type-checking, debugging and design previews once the AI has written the code." },
      { name: "Terminal", line: "PowerShell on Windows, iTerm2 and zsh on Mac." },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "TypeScript", line: "The default for anything that ships to a browser or a phone." },
      { name: "Python", line: "The default for scraping, automation, AI calls and server code." },
      { name: "Bash and PowerShell", line: "Bash on Mac and PowerShell on Windows, for scripts that run the tasks I repeat." },
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
      { name: "Claude API", line: "Anthropic's API, and the model I use by default in everything I build." },
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
      { name: "MacBook", line: "For travel. It shares the desktop's memory directory through iCloud." },
      { name: "Android phone", line: "ntfy on the home screen for one-tap approvals from anywhere." },
      { name: "Condenser mic", line: "For course recording and voiceover." },
    ],
  },
  {
    category: "Tools I stopped using",
    items: [
      { name: "Unused subscriptions", line: "If I do not open a subscription every week, I cancel it." },
      { name: "No-code platforms", line: "I used them and stopped, because moving off them is hard. I write custom code instead." },
      { name: "General AI productivity apps", line: "I write my own workflows instead." },
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
        lede="The software and hardware I use for client work and for running the company."
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
            I got the idea for a /uses page from <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">uses.tech</a>, and I update it when my tools change.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
