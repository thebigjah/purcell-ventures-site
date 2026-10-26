import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata = {
  alternates: { canonical: "/blog/shipped-is-not-activated" },
  title: { absolute: "A shipped site can still fail to take a payment, by Elijah Purcell" },
  description:
    "A site can be live with every deploy check passing and still unable to accept a dollar. Usually one path is broken, and the owner never sees it because they already know where the checkout is.",
};

const linkStyle = { color: "var(--color-warm-accent)", textDecoration: "underline" };
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
          { name: "A shipped site can still fail to take a payment", href: "/blog/shipped-is-not-activated" },
        ]} />
        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Opinion, August 17, 2026, 3 min read</div>
          <h1>
            A shipped site can still fail to{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>take a payment</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>A checkout button sits three clicks deep, behind a menu labeled Services, under a tab few visitors open. The site is live and cannot take a payment.</p>

          <p>Ask one question of everything you&apos;ve shipped: can a stranger pay for this today? Ask it about someone who found the page cold, decided quickly, and reached for a card, and leave out the warm lead who already emailed you.</p>

          <h2 style={head}>The failures are small, so they last</h2>

          <p>Most launched sites fail that question in unremarkable ways. A payment link still carries a placeholder token from testing, so it loads and looks finished but takes no money. A pricing page lists tiers with no way to select one. A form collects an email and promises a follow-up that never got automated.</p>

          <p>None of that shows up in a deploy log, where every check passes. The gap between a finished site and a working business is usually one broken path, and it stays broken because the owner can&apos;t see it from the inside. You know where the checkout is, so you never go looking for it.</p>

          <h2 style={head}>Why nobody catches it</h2>

          <p>Building and buying are different jobs, and few owners do the second one on their own site. The person who built it tests that the page renders. Few people test that a stranger can complete a purchase, because that means spending money on yourself, and that feels absurd.</p>

          <p>So the check never happens, and the site sits there for months looking finished.</p>

          <h2 style={head}>The check itself</h2>

          <p>Open your own site in a private window. Start from wherever a stranger would land, which is often a different page from the one you&apos;re proud of. Try to buy from yourself. Pay attention to where you stall.</p>

          <p>Write down every place you had to already know something to keep going. That list is the gap between shipped and activated. Usually the fix is a clear path from the homepage to the payment, and a redesign is rarely needed.</p>

          <section style={{ marginTop: "44px", paddingTop: "22px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
              Related reading
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "15px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/121-businesses-near-campus" style={{ color: "var(--color-warm-accent)" }}>The same gap, measured across 121 businesses near campus</Link></li>
              <li style={{ marginBottom: "7px" }}><Link href="/blog/is-your-business-invisible" style={{ color: "var(--color-warm-accent)" }}>A ten-minute self-check for whether yours is one of them</Link></li>
            </ul>
          </section>

          <PostByline post={{
            slug: "shipped-is-not-activated",
            title: "A shipped site can still fail to take a payment",
            description: "A site can be live with every deploy check passing and still unable to accept a dollar. Usually one path is broken, and the owner never sees it because they already know where the checkout is.",
            published: "2026-08-17",
          }} />

        </article>
      </main>
    </div>
  );
}
