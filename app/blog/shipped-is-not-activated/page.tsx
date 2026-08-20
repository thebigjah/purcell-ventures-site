import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import PostByline from "@/app/components/PostByline";

export const metadata = {
  title: "Shipping is not the same as being able to take a payment | Purcell Ventures Blog | Elijah Purcell",
  description:
    "A site can be live, green in the deploy log, and still unable to accept a dollar. The gap between a finished site and a working business is usually one broken path, and it is invisible from the inside.",
};

const linkStyle = { color: "var(--color-warm-accent)", textDecoration: "underline" };
const head = { marginTop: "36px", marginBottom: "12px" };

export default function Post() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "72px 36px 96px" }}>

        <Link href="/blog" style={{ color: "var(--color-warm-text-muted)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif" }}>← All posts</Link>

        <header className="pv-page-head" style={{ marginTop: "16px" }}>
          <div className="pv-mono-label">Opinion · August 17, 2026 · 3 min read</div>
          <h1>
            Shipping is not the same as being able to{" "}
            <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>take a payment</em>
          </h1>
        </header>

        <article style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-warm-text)" }}>

          <p>A checkout button sits three clicks deep, behind a menu labeled Services, under a tab nobody opens. The site is live. The business isn&apos;t.</p>

          <p>Ask one question of everything you&apos;ve shipped: can a stranger pay for this today? Not a warm lead who already emailed you. A stranger. Someone who found the page, decided in forty seconds, and reached for a card.</p>

          <h2 style={head}>The failures are boring, which is why they survive</h2>

          <p>Most launched sites fail that question in unremarkable ways. A payment link still carries a placeholder token from testing, so it renders, it loads, it looks finished, and it takes nothing. A pricing page lists tiers with no way to select one. A form collects an email and promises a follow-up that never got automated.</p>

          <p>None of that shows up in a deploy log. Everything&apos;s green. The gap between a finished site and a working business is usually one broken path, and it stays broken because it&apos;s invisible from the inside. You know where the checkout is, so you never go looking for it.</p>

          <h2 style={head}>Why nobody catches it</h2>

          <p>Building and buying are different jobs, and almost nobody does the second one on their own site. The person who built it tests that the page renders. Nobody tests that a stranger can complete a purchase, because completing a purchase means spending real money on yourself, and that feels absurd.</p>

          <p>So the check never happens. The site sits there looking finished for months.</p>

          <h2 style={head}>The check itself</h2>

          <p>Open your own site in a private window. Start from wherever a stranger would land, not from the page you&apos;re proud of. Try to buy from yourself. Pay attention to where you stall.</p>

          <p>Write down every place you had to already know something to keep going. That list is the actual gap between shipped and activated.</p>

          <h2 style={head}>A finished site and a working business are different claims</h2>

          <p>&quot;It&apos;s live&quot; is a statement about hosting. &quot;It can take money&quot; is a statement about the business. They get confused constantly, and only one of them pays for anything.</p>

          <p>If you&apos;re sitting on something you shipped and never activated, the fix usually isn&apos;t a redesign. It&apos;s one path, made obvious.</p>

        

          <PostByline post={{
            slug: "shipped-is-not-activated",
            title: "Shipping is not the same as being able to take a payment",
            description: "A site can be live, green in the deploy log, and still unable to accept a dollar. The gap between a finished site and a working business is usually one broken path, and it is invisible from the inside.",
            published: "2026-08-17",
          }} />

        </article>
      </main>
    </div>
  );
}
