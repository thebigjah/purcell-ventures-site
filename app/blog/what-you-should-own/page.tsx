import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/what-you-should-own" },
  title: { absolute: "What you should own at the end of a website project, by Elijah Purcell" },
  description:
    "The seven accounts and assets that should be in your name when a web project finishes, why the domain matters most, and the two questions to ask before you sign anything.",
};

const H2 = { fontFamily: "'Cinzel', Georgia, serif", fontSize: "25px", fontWeight: 600, lineHeight: 1.2, margin: "40px 0 10px" } as const;
const link = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const td: React.CSSProperties = { padding: "11px 14px 11px 0", borderBottom: "1px solid rgba(212,175,55,0.12)", verticalAlign: "top" };
const th: React.CSSProperties = { ...td, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-warm-text-muted)", fontWeight: 700, borderBottom: "2px solid rgba(212,175,55,0.3)" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What you should own", href: "/blog/what-you-should-own" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business, August 20, 2026, 6 min read</div>
          <h1>
            What you should{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>own</em> at the end of a project
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            Before you sign for a website, ask who will own each account and asset when the
            project ends. Most proposals do not say.
          </p>

          <p>
            I build websites, and I want my clients to own all of it. A client who can leave
            easily and stays anyway is the kind I want to keep.
          </p>

          <h2 style={H2}>The seven things</h2>

          <div style={{ overflowX: "auto", margin: "20px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
              <thead>
                <tr><th style={{ ...th, width: "32%" }}>Asset</th><th style={th}>Why it matters</th></tr>
              </thead>
              <tbody>
                <tr><td style={{ ...td, fontWeight: 700 }}>The domain</td><td style={td}>Registered to you, in an account you can log into. Providers often register it in their own name.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Hosting</td><td style={td}>An account in your name, with your billing on it. A sub-account inside a provider's reseller plan leaves them in control of it.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>The code</td><td style={td}>A repository you have access to, or at minimum a copy of the files delivered to you at launch.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>The content management login</td><td style={td}>An administrator account. An editor account cannot export the site or add users.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Google Business Profile</td><td style={td}>Yours, in your own Google account.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Analytics</td><td style={td}>Your property, with the provider added as a user. The reverse arrangement means your traffic history leaves with them.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Email at the domain</td><td style={td}>Under your control, because losing it means losing password resets for everything else on this list.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style={H2}>Why the domain comes first</h2>

          <p>
            Everything else can be replaced, though not conveniently. The code can be rebuilt. Hosting
            can be moved in a day. Losing analytics history hurts, and you recover from it.
          </p>

          <p>
            Your email, your printed materials and the address customers type all depend on
            the domain. If your provider holds it, you cannot leave without their cooperation.
          </p>

          <p>
            Providers usually register it for convenience, because it was faster during setup
            than walking a client through it, and then years passed. Ask early, and a good
            provider will transfer it.
          </p>

          <h2 style={H2}>Two questions before you sign</h2>

          <p>
            <strong>"When we finish, which of these will be in my name?"</strong> Ask it about
            the list above, specifically, and get the answer in writing. The answer should be
            all of them.
          </p>

          <p>
            <strong>"If I wanted to move to another provider next year, what would that
            involve?"</strong> The answer you want is a description of a process. The answer
            that should worry you is reassurance that you would not want to.
          </p>

          <h2 style={H2}>What is reasonable for a provider to keep</h2>

          <p>
            Providers can reasonably keep their own internal tooling, their project management system, and any
            general-purpose components they built before you and will use again after you.
            Reusing components is normal, and it keeps prices down.
          </p>

          <p>
            They should not keep your domain, your listing, your analytics history, or a
            content management system you cannot administer. The test is whether the thing is
            <em> about you</em>. If it is, it should be yours.
          </p>

          <h2 style={H2}>If you are already in this situation</h2>

          <p>
            Ask for the transfer plainly. Most providers will do it, and some never realised
            the client wanted it.
          </p>

          <p>
            If you get resistance, you learn early which kind of provider you hired, before
            any dispute starts. A domain can be recovered through
            the registrar's own transfer process in most cases, and it is much easier while
            the relationship is still cordial.
          </p>

          <p>
            Related, on choosing between a solo operator and an agency and what to ask
            either:{" "}
            <Link href="/blog/what-one-operator-can-deliver" style={link}>what one operator
            can deliver</Link>, and{" "}
            <Link href="/blog/what-a-website-actually-costs" style={link}>what a website
            costs</Link>.
          </p>

          <PostByline post={{
            slug: "what-you-should-own",
            title: "What you should own at the end of a website project",
            description: "The seven accounts and assets that should be in your name, and the two questions to ask before you sign anything.",
            published: "2026-08-20",
          }} />

        </article>
      </main>
    </div>
  );
}
