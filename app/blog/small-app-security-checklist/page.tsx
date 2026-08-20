import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";

// WRITTEN FROM REAL AUDITS, WITH NONE OF THE ATTRIBUTION.
//
// The experience behind this is seven read-only audits of live production applications.
// Some of those findings are still open, so nothing here names an application, gives a
// reproduction path, or says which property had which hole. The failure classes themselves
// are documented by the vendors whose products they involve, so describing them discloses
// nothing that is not already public. The specifics stay private until they are fixed.

export const metadata = {
  alternates: { canonical: "/blog/small-app-security-checklist" },
  title: "Five holes in almost every small production app | Elijah Purcell",
  description:
    "What actually turns up when you audit small production applications: row-level security that is enabled but not enforced, paid API routes with no authentication, auth cookies that are not auth, and two more. Written from seven read-only audits.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "44px 0 12px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const pre: React.CSSProperties = {
  background: "rgba(0,0,0,0.28)", border: "1px solid rgba(212,175,55,0.18)",
  padding: "14px 16px", overflowX: "auto", fontSize: "13.5px", lineHeight: 1.6,
  fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", margin: "16px 0",
};

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Engineering · August 20, 2026 · 8 min read</div>
          <h1>
            Five holes in almost every{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>small production app</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            I have run read-only security audits on seven live applications. Small ones:
            solo builds and two-person teams, the kind with real users and no security
            budget. The same five things come up almost every time, and none of them are
            exotic.
          </p>

          <p>
            No application is named here, and there are no reproduction steps. Some of what
            I found is still being fixed, and a writeup that points at live holes is not a
            writeup, it is a map. The categories below are documented by the vendors whose
            products they involve. The specifics stay private.
          </p>

          <h2 style={H2}>1. Row-level security is on, and enforcing nothing</h2>

          <p>
            This is the most common one and the most dangerous, because the dashboard says
            green.
          </p>

          <p>
            Enabling row-level security on a table does not protect it. It means <em>no rows
            are returned unless a policy permits them</em>. So people write a policy to make
            the app work again, and the policy they write is usually too broad. A policy
            written without a role clause applies to every role, including the anonymous one,
            and the anonymous key ships inside the page bundle by design. Anyone can read it
            out of view-source.
          </p>

          <p>
            The failure is that your application layer filters correctly and the attacker
            does not use your application layer. They call the database API directly with a
            key you published.
          </p>

          <p>
            <strong>What to check:</strong> for every policy, ask which roles it applies to.
            If the answer is "I did not specify," the answer is all of them.
          </p>

          <h2 style={H2}>2. Paid API routes with no authentication</h2>

          <p>
            Modern small apps ship server routes that call something metered: a language
            model, a maps API, a transcription service. The route works, the feature ships,
            and nobody adds authentication because during development you are the only one
            who knows the URL.
          </p>

          <p>
            The URL is in your JavaScript bundle.
          </p>

          <p>
            An unauthenticated route that calls a paid API is not a data breach, it is a
            billing surface. Someone loops it and your card pays for their traffic. It also
            fails silently in the worst possible direction: you find out from the invoice.
          </p>

          <p>
            <strong>Do the console fixes first.</strong> Spend caps and budget alerts on
            every provider, and referrer or IP restrictions on any key that supports them.
            Free, immediate, and they bound the damage while the code fix waits for a
            session where you have time to do it properly.
          </p>

          <h2 style={H2}>3. An auth cookie that is not authentication</h2>

          <p>
            Somewhere in the build, a gate got stubbed. A cookie is set on login, and the
            check is whether the cookie exists, or whether it equals a known constant.
          </p>

          <p>
            That is not a session. Anyone can set a cookie. If your check is a string
            comparison against something a client controls, the gate is decorative, and it
            is usually protecting whatever the developer considered too sensitive for the
            public routes.
          </p>

          <p>
            <strong>Test:</strong> open a private window, set the cookie in the console, and
            load the protected page. If you are in, so is everyone.
          </p>

          <h2 style={H2}>4. Sequential identifiers as authorisation</h2>

          <p>
            A record is at <code>/thing/41</code>. A logged-in user requests
            <code> /thing/42</code>. Does anything stop them?
          </p>

          <p>
            In an app where the identifier is also the only thing separating one user's data
            from another's, incrementing an integer is the entire attack. This shows up
            constantly in voting, ordering and messaging features, where the developer
            reasoned about the interface rather than about the endpoint.
          </p>

          <p>
            <strong>Rule:</strong> knowing an identifier is not permission to use it.
            Authorisation is checked server-side on every request, every time, or it is not
            checked at all.
          </p>

          <h2 style={H2}>5. Input that becomes markup</h2>

          <p>
            User text rendered as HTML rather than as text. A display name, a review, a
            business description, anything that goes in and comes back out.
          </p>

          <p>
            Frameworks escape by default now, which has made this rarer and also more
            dangerous, because the one place it survives is wherever someone deliberately
            opted out to get some formatting working. Search your codebase for whatever your
            framework calls "render this as raw HTML" and check where each one gets its
            input.
          </p>

          <h2 style={H2}>How to actually run one of these</h2>

          <p>
            Read-only, always. The point is to produce a list, not to fix things live at
            two in the morning.
          </p>

          <p>Every finding gets three parts, and it is not a finding without all three:</p>

          <div style={pre}>{`SEVERITY   what an attacker gets, in one sentence
REPRO      the exact request or steps that demonstrate it
FIX        the specific change, not "add validation"`}</div>

          <p>
            And keep two lists. Findings you verified against source, and findings you
            suspect but could not confirm. Mixing them is how an audit loses its
            credibility: one confident claim that turns out to be wrong makes a reader
            discount the four that were right.
          </p>

          <h2 style={H2}>The uncomfortable part</h2>

          <p>
            Every one of these was in an app whose author is competent. That is the point.
            None of these are caused by not knowing better. They are caused by the gap
            between the thing working and the thing being safe, and that gap is invisible
            from inside the code that works.
          </p>

          <p>
            Which is the argument for having someone else look. Not because they know more,
            but because they did not write it and therefore do not know what it is supposed
            to do.
          </p>

          <p>
            If you run a small app with real users and you would like a second pair of eyes
            on it, that offer is open and it does not cost anything:{" "}
            <a href="mailto:elijah@purcell-ventures.com" style={link}>elijah@purcell-ventures.com</a>.
          </p>

          <PostByline post={{
            slug: "small-app-security-checklist",
            title: "Five holes in almost every small production app",
            description: "What actually turns up when you audit small production applications, written from seven read-only audits.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
