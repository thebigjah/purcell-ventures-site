import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  title: "We built agents that cannot fix what they find | Purcell Ventures Blog",
  description:
    "Separating the finder from the fixer is the cheapest safety property you can buy in an agent system. It also creates a failure mode nobody warns you about, and we shipped it.",
};

const head = { marginTop: "36px", marginBottom: "12px" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering · August 17, 2026 · 4 min read</div>
          <h1>
            We built agents that cannot{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>fix what they find</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>One of our agents can read every repository we own. It cannot change a single line of any of them. That separation is deliberate, it is the cheapest safety property in the whole system, and it produced a failure we did not see coming.</p>

          <h2 style={head}>Remove the capability, don&apos;t deny the permission</h2>

          <p>The first version of our reasoning layer passed the model a prompt describing exactly what it was allowed to look at. That prompt was honest, specific, and completely unenforced.</p>

          <p>We found out when an agent asked to draft a payment-chase email refused to write it. It had gone and read the client file, found no matching record, and objected. The objection was correct. It was also proof that the scope in the prompt was a request rather than a constraint, because the process could open any file on the machine.</p>

          <p>Closing the filesystem was not enough either. Asked afterwards what it could still reach, the model listed email, calendar and drive, because removing built-in tools leaves externally configured servers inherited from the user&apos;s own config. An agent reasoning about a code repository must not be able to read your inbox.</p>

          <p>The fix was to hand the model nothing but text and no tools at all. Everything it may see is passed in by the agent&apos;s own code, which already enforces the scope and is already tested. It reasons over what it was given and cannot go looking.</p>

          <p><strong>A scope stated in a prompt is a request. A scope enforced by the process is a constraint.</strong> Only one of those survives a model that decides to be helpful.</p>

          <h2 style={head}>The failure this design creates</h2>

          <p>If the finder cannot fix, someone else has to, and that someone is a person. We built the finding half carefully and never built the closing half at all.</p>

          <p>So the ledger only ever grew. The auditor re-checked every property every morning, correctly refused to file duplicates, and had no way to record that anything had been resolved. Fix a broken checkout and the finding describing it would have stayed open forever.</p>

          <p>The reporting agent, meanwhile, told us that zero findings had been resolved. That read as a damning statistic about follow-through. It was actually a hardcoded zero, sitting there because no code path existed that could produce any other number. The report was accurate and told us nothing.</p>

          <h2 style={head}>What closing has to mean</h2>

          <p>A finding is now resolved when a later audit looks for it and cannot reproduce it. The subtlety is in the word <em>looks</em>.</p>

          <p>&quot;Not observed&quot; only means &quot;fixed&quot; if you actually checked. A property dropped from the registry, or one whose check errored, is unaudited, not repaired. Closing those would launder a gap into a win, which is worse than leaving them open, because now the number lies in the flattering direction.</p>

          <p>So closure is scoped to what a run genuinely checked, and the test that matters most is the one asserting that an unaudited property is never closed by silence.</p>

          <h2 style={head}>The pattern underneath</h2>

          <p>Every one of these failures had the same shape: an empty result that reads as good news. No exception, no error, no red anywhere. An auditor that finds nothing, a ledger with nothing resolved, a scan that returns zero rows.</p>

          <p>Which gives the rule we now build to: <strong>assert on counts and on values, never on the absence of an exception.</strong> A test that only proves the code did not crash would have passed on every single one of these.</p>

        

          <PostByline post={{
            slug: "agents-that-cannot-fix-what-they-find",
            title: "We built agents that cannot fix what they find",
            description: "Separating the finder from the fixer is the cheapest safety property you can buy in an agent system. It also creates a failure mode nobody warns you about, and we shipped it.",
            published: "2026-08-17",
          }} />

        </article>
      </main>
    </div>
  );
}
