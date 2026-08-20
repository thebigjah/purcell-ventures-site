import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import PostFaq from "@/app/components/PostFaq";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/what-you-should-own" },
  title: "What you should own at the end of a website project | Elijah Purcell",
  description:
    "The seven accounts and assets that should be in your name when a web project finishes, why a provider holding your domain is the single worst arrangement, and the two questions to ask before you sign anything.",
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

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <Breadcrumbs trail={[
          { name: "Home", href: "/" },
          { name: "Writing", href: "/blog" },
          { name: "What you should own", href: "/blog/what-you-should-own" },
        ]} />

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Business · August 20, 2026 · 6 min read</div>
          <h1>
            What you should{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>own</em> at the end of a project
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75 }}>

          <p style={{ fontSize: "18px" }}>
            The question that decides whether a web project was a purchase or a lease is not
            in the proposal. It is: when this is finished, whose name is on everything?
          </p>

          <p>
            I build websites, so this article is against my own interest in the narrow sense
            and entirely in it in the long one. A client who owns their assets is a client
            who stays because they want to.
          </p>

          <h2 style={H2}>The seven things</h2>

          <div style={{ overflowX: "auto", margin: "20px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
              <thead>
                <tr><th style={{ ...th, width: "32%" }}>Asset</th><th style={th}>Why it matters</th></tr>
              </thead>
              <tbody>
                <tr><td style={{ ...td, fontWeight: 700 }}>The domain</td><td style={td}>Registered to you, in an account you can log into. This is the one that matters most and the one most often held by somebody else.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Hosting</td><td style={td}>An account in your name, with your billing on it. Being a sub-account inside a provider's reseller plan is not the same thing.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>The code</td><td style={td}>A repository you have access to, or at minimum a copy of the files delivered to you at launch.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>The content management login</td><td style={td}>An administrator account, not an editor account. There is a difference and it shows up when you want to leave.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Google Business Profile</td><td style={td}>Yours, in your own Google account. Never a provider's.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Analytics</td><td style={td}>Your property, with the provider added as a user. The reverse arrangement means your traffic history leaves with them.</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Email at the domain</td><td style={td}>Under your control, because losing it means losing password resets for everything else on this list.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style={H2}>Why the domain is the one that matters</h2>

          <p>
            Everything else is replaceable, inconveniently. The code can be rebuilt. Hosting
            can be moved in a day. Analytics history is a loss but not a catastrophe.
          </p>

          <p>
            The domain is your identity. It is where your email lives, what is printed on
            your van, and what people type. If somebody else holds it, they hold your ability
            to leave, and every conversation you have with them afterwards happens under that
            fact whether or not either of you mentions it.
          </p>

          <p>
            It is also not usually malice. It is usually convenience: the provider registered
            it during setup because it was faster than walking a client through it, and then
            years passed. Which means asking early is not an accusation, and a good provider
            will simply transfer it.
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
            Not everything is a red flag, and pretending otherwise would be dishonest.
          </p>

          <p>
            Their own internal tooling, their project management system, and any
            general-purpose components they built before you and will use again after you.
            That last one is normal and it is how anybody builds anything at a sensible
            price.
          </p>

          <p>
            What is not reasonable is your domain, your listing, your analytics history, or a
            content management system you cannot administer. The test is whether the thing is
            <em> about you</em>. If it is, it should be yours.
          </p>

          <h2 style={H2}>If you are already in this situation</h2>

          <p>
            Ask for the transfer, plainly and without accusation. Most providers will do it,
            and a surprising number never realised the client wanted it.
          </p>

          <p>
            If you get resistance, you have learned something worth knowing, and you have
            learned it now rather than during a dispute. A domain can be recovered through
            the registrar's own transfer process in most cases, and it is much easier while
            the relationship is still cordial.
          </p>

          <p>
            Related, on choosing between a solo operator and an agency and what to ask
            either:{" "}
            <Link href="/blog/what-one-operator-can-deliver" style={link}>what one operator
            can actually deliver</Link>, and{" "}
            <Link href="/blog/what-a-website-actually-costs" style={link}>what a website
            actually costs</Link>.
          </p>

          <PostFaq qa={[
            ["Who should own the domain name for a business website?",
             "The business, registered in its own name, in an account it can log into. A provider holding the domain holds the client's ability to leave, which changes every subsequent conversation whether either party mentions it. It is usually convenience rather than malice, which means asking for a transfer is not an accusation and a good provider will simply do it."],
            ["What should I get at the end of a website project?",
             "Seven things in your name: the domain, the hosting account, the code or at minimum a copy of the files, an administrator login to the content management system, your Google Business Profile in your own Google account, the analytics property with the provider added as a user rather than the reverse, and email at your domain."],
            ["What questions should I ask a web designer before signing?",
             "Two. Which of these assets will be in my name when we finish, asked about a specific list and answered in writing. And, if I wanted to move to another provider next year, what would that involve. The second answer should describe a process. Reassurance that you would not want to leave is the wrong answer."],
            ["Is it normal for a web agency to keep some things after a project?",
             "Yes. Their internal tooling, their project management system, and general-purpose components built before you and reused after you are all normal and are part of why work can be priced sensibly. The test is whether the asset is about you. Your domain, your listing, your analytics history and administrative access to your own site are not theirs to keep."],
          ]} />

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
