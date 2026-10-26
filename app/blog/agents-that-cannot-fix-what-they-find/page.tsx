import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/agents-that-cannot-fix-what-they-find" },
  title: { absolute: "We built agents that cannot fix what they find, by Elijah Purcell" },
  description:
    "We split the agent that finds problems from the one that fixes them. That split kept agents out of files they had no business reading, and it also left every finding open forever until we built a way to close them.",
};

const head = { marginTop: "36px", marginBottom: "12px" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "We built agents that cannot fix what they find", href: "/blog/agents-that-cannot-fix-what-they-find" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering, August 17, 2026, 4 min read</div>
          <h1>
            We built agents that cannot{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>fix what they find</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>One of our agents can read every repository we own. It cannot change a single line of any of them. The separation is deliberate. It took one design decision and caused a failure we did not expect.</p>

          <h2 style={head}>Agents get text and no tools</h2>

          <p>The first version of our reasoning layer passed the model a prompt describing exactly what it was allowed to look at. The prompt described the scope accurately, and nothing enforced it.</p>

          <p>We found out when an agent asked to draft a payment-chase email refused to write it. It read the client file, found no matching record, and objected. The objection was correct. It was also proof that the scope in the prompt was only a request, because the process could open any file on the machine.</p>

          <p>Closing the filesystem was not enough either. Asked afterwards what it could still reach, the model listed email, calendar and drive, because removing built-in tools leaves externally configured servers inherited from the user&apos;s own config. An agent reasoning about a code repository must not be able to read your inbox.</p>

          <p>The fix was to hand the model nothing but text and no tools at all. The agent&apos;s own code passes in everything the model may see. That code already enforces the scope and is already tested. It reasons over what it was given and cannot go looking.</p>

          <p><strong>Code enforces a scope. A prompt only asks the model to respect one.</strong></p>

          <h2 style={head}>The failure this design creates</h2>

          <p>If the finder cannot fix, someone else has to, and that someone is a person. We built the finding half carefully and never built the closing half at all.</p>

          <p>So the ledger only ever grew. The auditor re-checked every property every morning, correctly refused to file duplicates, and had no way to record that anything had been resolved. If we had fixed a broken checkout, the finding describing it would have stayed open forever.</p>

          <p>The reporting agent, meanwhile, told us that zero findings had been resolved. That read as a bad statistic about follow-through. It was a hardcoded zero, because no code path could produce any other number. The report was correct and carried no information.</p>

          <h2 style={head}>What closing has to mean</h2>

          <p>A finding is now resolved when a later audit looks for it and cannot reproduce it.</p>

          <p>&quot;Not observed&quot; means &quot;fixed&quot; only if the audit checked. A property dropped from the registry, or one whose check errored, is unaudited. Closing those would report a gap as a fix, which is worse than leaving them open, because the resolved count would then overstate the work done.</p>

          <p>So a run can close only findings it checked, and the test that matters most is the one asserting that an unaudited property is never closed by silence.</p>

          <h2 style={head}>The pattern underneath</h2>

          <p>Every one of these failures had the same shape: an empty result that reads as good news, with no exception raised. An auditor that finds nothing, a ledger with nothing resolved, a scan that returns zero rows.</p>

          <p><strong>We now write tests that assert on counts and values.</strong> A test that only proves the code did not crash would have passed on all of these.</p>

        



          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/what-the-agents-get-wrong" style={{ color: "var(--color-warm-accent)" }}>The other four failures in the same system</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/ai-team-page-honesty" style={{ color: "var(--color-warm-accent)" }}>Why the team page says outright that they are software</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "agents-that-cannot-fix-what-they-find",
            title: "We built agents that cannot fix what they find",
            description: "We split the agent that finds problems from the one that fixes them. That split kept agents out of files they had no business reading, and it also left every finding open forever until we built a way to close them.",
            published: "2026-08-17",
          }} />

        </article>
      </main>
    </div>
  );
}
