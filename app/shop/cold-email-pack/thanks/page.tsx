import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Thanks for your purchase: Cold Email Mastery Pack",
};

export default function ThanksPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "720px", margin: "0 auto", padding: "96px 36px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "120px", color: "var(--color-warm-accent)", lineHeight: 1, marginBottom: "20px" }}>✓</div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "44px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px", lineHeight: 1.15 }}>
          You&apos;re <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>in.</em>
        </h1>
        <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 32px" }}>
          Your download link is on its way to your email from Stripe — usually arrives within 60 seconds.
        </p>

        <div style={{ padding: "24px 28px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "32px", textAlign: "left" }}>
          <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "12px", marginTop: 0 }}>
            How to actually use this pack
          </h3>
          <ol style={{ paddingLeft: "20px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8, margin: 0 }}>
            <li>Open <code>00-INDEX.md</code> — table of contents</li>
            <li>Pick your target industry from <code>01-templates-by-industry/</code></li>
            <li>Take 1 template + customize the {`{{tokens}}`} for your specific business</li>
            <li>Send 10 emails. Track replies. Iterate.</li>
            <li>When stuck, use the <code>04-ai-scoring-rubric/</code> to score + improve your variants.</li>
          </ol>
        </div>

        <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "32px 0 12px", fontWeight: 600 }}>
          Want to go even deeper?
        </h3>
        <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 24px" }}>
          The <Link href="/shop/starter-kit" style={{ color: "var(--color-warm-accent)" }}>PV AI Starter Kit ($19)</Link> pairs perfectly — 24 AI tool prompts + full rep handbook + everything the Cold Email Pack doesn&apos;t cover.
        </p>
        <Link href="/shop/starter-kit" className="pv-btn-primary" style={{ marginRight: "12px" }}>See the Starter Kit</Link>
        <Link href="/" style={{ color: "var(--color-warm-text-muted)", textDecoration: "underline", fontSize: "14px" }}>Back to home</Link>

      </main>
    </div>
  );
}
