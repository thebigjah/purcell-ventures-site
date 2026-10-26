import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

// WRITTEN FROM REAL AUDITS, WITH NONE OF THE ATTRIBUTION.
//
// The experience behind this is seven read-only audits of live production applications.
// Some of those findings are still open, so nothing here names an application, gives a
// reproduction path, or says which property had which hole. The failure classes themselves
// are documented by the vendors whose products they involve, so describing them discloses
// nothing that is not already public. The specifics stay private until they are fixed.

export const metadata = {
  alternates: { canonical: "/blog/small-app-security-checklist" },
  title: { absolute: "Five holes in almost every small production app, by Elijah Purcell" },
  description:
    "What turns up when you audit small production applications: row-level security with policies that let everyone in, paid API routes with no authentication, auth cookies anyone can forge, and two more. Written from seven read-only audits.",
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: "Five holes in almost every small production app", href: "/blog/small-app-security-checklist" },
      ]} />}
      kicker="Engineering"
      title="Five holes in almost every small production app"
      meta="20 August 2026, 8 minute read"
    >
      <p>
        I have run read-only security audits on 7 live applications. Small ones: solo builds
        and two-person teams, the kind with users and no security budget. The same five
        problems kept coming up, and none of them are exotic.
      </p>

      <p>
        No application is named here, and there are no reproduction steps. Some of what I
        found is still being fixed, and a writeup that points at live holes would help
        attackers. The vendors whose products these categories involve document them. The
        specifics stay private.
      </p>

      <h2>Row-level security is on and enforcing nothing</h2>

      <p>
        This was the most common one in my audits, and it is easy to miss because the
        dashboard shows green.
      </p>

      <p>
        Enabling row-level security on a table means <em>no rows are returned unless a
        policy permits them</em>, as{" "}
        <a href="https://supabase.com/docs/guides/database/postgres/row-level-security" rel="noopener">the vendor documentation says</a>.
        Many people misread that sentence. They write a policy to make the app work again,
        and the policy they write is usually too broad. A policy written without a role
        clause applies to every role, including the anonymous one, and the anonymous key
        ships inside the page bundle by design. Anyone can read it out of view-source.
      </p>

      <p>
        The failure is that your application layer filters correctly and the attacker does
        not use your application layer. They call the database API directly with a key you
        published.
      </p>

      <p>
        For every policy, check which roles it applies to. If you did not specify a role, it
        applies to all of them.
      </p>

      <h2>Paid API routes with no authentication</h2>

      <p>
        Modern small apps ship server routes that call something metered: a language model,
        a maps API, a transcription service. The route works, the feature ships, and nobody
        adds authentication because during development you are the only one who knows the
        URL.
      </p>

      <p>The URL is in your JavaScript bundle.</p>

      <p>
        An unauthenticated route that calls a paid API lets anyone run up your bill. Someone
        loops it and your card pays for their traffic. Nothing alerts you. You find out from
        the invoice.
      </p>

      <p>
        Do the console fixes first. Set spend caps and budget alerts on every provider, and
        add referrer or IP restrictions to any key that supports them. They cost nothing and
        limit the damage right away, while the code fix waits for a session where you have
        time to do it properly.
      </p>

      <h2>An auth cookie anyone can set</h2>

      <p>
        Somewhere in the build, a developer stubbed a gate. The app sets a cookie on login,
        and the check asks whether the cookie exists, or whether it equals a known constant.
      </p>

      <p>
        Anyone can set a cookie. If your check is a string comparison against something a
        client controls, the gate does nothing, and it is usually protecting whatever the
        developer considered too sensitive for the public routes.
      </p>

      <p>
        To test it, open a private window, set the cookie in the console, and load the
        protected page. If you get in, so can anyone.
      </p>

      <h2>Sequential identifiers as authorisation</h2>

      <p>
        A record is at <code>/thing/41</code>. A logged-in user requests{" "}
        <code>/thing/42</code>. Does anything stop them?
      </p>

      <p>
        In an app where the identifier is also the only thing separating one user&apos;s data
        from another&apos;s, incrementing an integer is the entire attack. I found this in
        voting, ordering and messaging features, where the developer thought about the
        interface and never about the endpoint.
      </p>

      <p>
        Check authorisation on the server for every request, whether or not the user knows
        the identifier.
      </p>

      <h2>Input that becomes markup</h2>

      <p>
        This is user text rendered as HTML. A display name, a review, a business
        description, anything that goes in and comes back out. Injection is on{" "}
        <a href="https://owasp.org/www-project-top-ten/" rel="noopener">the OWASP Top Ten</a>,
        and I still found it.
      </p>

      <p>
        Frameworks escape by default now, which has made this rarer. Where it survives, it
        is because someone deliberately opted out to get formatting working. Search your
        codebase for whatever your framework calls &quot;render this as raw HTML&quot; and check
        where each one gets its input.
      </p>

      <h2>How I run one of these audits</h2>

      <p>
        I keep every audit read-only. The output is a list, and the fixes happen later in a
        planned session.
      </p>

      <p>
        Every finding gets three parts, and I do not count it as a finding until it has all
        three.
      </p>

      <pre><code>{`SEVERITY   what an attacker gets, in one sentence
REPRO      the exact request or steps that demonstrate it
FIX        the specific change, not "add validation"`}</code></pre>

      <p>
        Keep two lists, one for findings you verified against source and one for findings
        you suspect but could not confirm. Mixing them is how an audit loses its
        credibility: one confident claim that turns out to be wrong makes a reader discount
        the four that were right.
      </p>

      <h2>Why competent authors miss these</h2>

      <p>
        These problems come from the gap between the app working and the app being safe, and
        the author cannot see that gap from inside code that works.
      </p>

      <p>
        Someone else should look because they did not write it, so they do not assume they
        know what it does.
      </p>

      <p>
        If you run a small app with users and you would like a second pair of eyes on it, the
        offer is free:{" "}
        <a href="mailto:elijah@purcell-ventures.com">elijah@purcell-ventures.com</a>.
      </p>

      <PostByline post={{
        slug: "small-app-security-checklist",
        title: "Five holes in almost every small production app",
        description: "What turns up when you audit small production applications, written from seven read-only audits.",
        published: "2026-08-20",
      }} />
    </PostLayout>
  );
}
