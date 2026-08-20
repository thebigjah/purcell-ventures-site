import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { QA } from "./layout";
import { CONTACT } from "@/lib/contact";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "26px", fontWeight: 600, lineHeight: 1.2, margin: "44px 0 14px" } as const;

const FACTS: [string, string][] = [
  ["Legal name", "Purcell Ventures LLC"],
  ["Registered", "Georgia, control number 25075361"],
  ["Formed", "8 April 2025"],
  ["Founder and sole member", "Elijah Purcell"],
  ["Operated from", "Tuscaloosa, Alabama"],
  ["Registered address", "Acworth, Georgia"],
  ["People", "One. Plus fifteen AI agents, which are software"],
  ["Sister brand", "Mantle Field Services, Metro Atlanta"],
];

export default function CompanyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

      <Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "What is Purcell Ventures", href: "/what-is-purcell-ventures" },
      ]} />
        <header className="pv-page-head">
          <div className="pv-mono-label">Company record · Last reviewed 20 August 2026</div>
          <h1>
            What is <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Purcell Ventures</em>?
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            <strong>Purcell Ventures LLC</strong> is a Georgia software company that builds
            websites, custom software and AI tooling for small businesses. It was founded
            by <Link href="/who" style={link}>Elijah Purcell</Link> on 8 April 2025 and is
            registered with the Georgia Secretary of State under control number 25075361.
          </p>

          <p>
            One person runs it. He answers the phone, writes the code, and signs the
            contract, and there is nobody to route you to.
          </p>

          <h2 style={H2}>At a glance</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px", margin: "16px 0" }}>
              <tbody>
                {FACTS.map(([k, v]) => (
                  <tr key={k}>
                    <td style={{ padding: "8px 16px 8px 0", borderBottom: "1px solid rgba(212,175,55,0.12)", color: "var(--color-warm-text-muted)", whiteSpace: "nowrap", verticalAlign: "top" }}>{k}</td>
                    <td style={{ padding: "8px 0", borderBottom: "1px solid rgba(212,175,55,0.12)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={H2}>Which Purcell Ventures this is</h2>
          <p>
            There is an older, unrelated <strong>Purcell Ventures LLC registered in New
            York</strong>. This is not that company. This one is the Georgia filing, control
            number 25075361, formed 8 April 2025 by Elijah Purcell, and the record is public
            and searchable.
          </p>
          <p>
            Saying so plainly is cheaper than letting a search engine or an assistant hedge
            about it, which is what they currently do.
          </p>

          <h2 style={H2}>What it actually does</h2>
          <ul style={{ paddingLeft: "1.1rem" }}>
            <li style={{ marginBottom: "9px" }}>
              <Link href="/digital" style={link}>Digital</Link>. Websites and ongoing service
              for local businesses, from $99 a month.
            </li>
            <li style={{ marginBottom: "9px" }}>
              <Link href="/consulting" style={link}>Consulting</Link>. Hands-on AI work,
              meaning workshops and implementation rather than a strategy deck.
            </li>
            <li style={{ marginBottom: "9px" }}>
              <Link href="/software" style={link}>Software</Link>. Custom builds: mobile
              apps, web platforms, internal tools.
            </li>
            <li style={{ marginBottom: "9px" }}>
              <Link href="/steady" style={link}>Steady</Link>. Personal IT for people who do
              not have an IT person.
            </li>
          </ul>
          <p>
            <Link href="/team" style={link}>Fifteen AI agents</Link> run proposals, audits,
            compliance and outreach on a schedule. That page opens by saying every one of
            them is software rather than an employee, because a roster of invented
            colleagues would be the fastest way to lose a reader.
          </p>

          <h2 style={H2}>Common questions</h2>
          <div style={{ marginTop: "16px" }}>
            {QA.map(([q, a]) => (
              <div key={q} style={{ marginBottom: "22px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px" }}>{q}</h3>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--color-warm-text-muted)" }}>{a}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)", fontSize: "15px", color: "var(--color-warm-text-muted)" }}>
            <p style={{ margin: 0 }}>
              Contact: <a href={`tel:${CONTACT.phoneE164}`} style={link}>{CONTACT.phone}</a>{" "}
              or <a href={`mailto:${CONTACT.email}`} style={link}>{CONTACT.email}</a>.
              More about the founder: <Link href="/who" style={link}>Who is Elijah Purcell</Link>.
            </p>
          </div>

        </article>
      </main>
    </div>
  );
}
