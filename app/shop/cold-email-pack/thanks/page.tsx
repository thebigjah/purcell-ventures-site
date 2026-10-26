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
          Your purchase <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>went through</em>
        </h1>
        <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 32px" }}>
          Stripe is emailing your download link. It usually arrives within 60 seconds.
        </p>

        <div style={{ padding: "24px 28px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "32px", textAlign: "left" }}>
          <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "12px", marginTop: 0 }}>
            How to use this pack
          </h3>
          <ol style={{ paddingLeft: "20px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8, margin: 0 }}>
            <li>Open <code>00-INDEX.md</code>, the table of contents</li>
            <li>Pick your target industry from <code>01-templates-by-industry/</code></li>
            <li>Take 1 template and fill in the {`{{tokens}}`} for your specific business</li>
            <li>Send 10 emails and track the replies</li>
            <li>When stuck, use the <code>04-ai-scoring-rubric/</code> to score and improve your drafts.</li>
          </ol>
        </div>

        <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "32px 0 12px", fontWeight: 600 }}>
          Next: the PV AI Starter Kit
        </h3>
        <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 24px" }}>
          The <Link href="/shop/starter-kit" style={{ color: "var(--color-warm-accent)" }}>PV AI Starter Kit ($19)</Link> adds 24 AI tool prompts and the full rep handbook, which this pack doesn&apos;t include.
        </p>
        <Link href="/shop/starter-kit" className="pv-btn-primary" style={{ marginRight: "12px" }}>See the Starter Kit</Link>
        <Link href="/" style={{ color: "var(--color-warm-text-muted)", textDecoration: "underline", fontSize: "14px" }}>Back to home</Link>

      </main>
    </div>
  );
}
