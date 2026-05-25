import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Thanks for your purchase — PV AI Starter Kit",
  description: "Your download link is in your email. Check spam if you don't see it within 2 minutes.",
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
        <p style={{ fontSize: "17px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
          Your <strong style={{ color: "var(--color-warm-text)" }}>download link is on its way to your email</strong> right now from Stripe. Usually arrives within 60 seconds.
        </p>
        <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: "0 0 32px" }}>
          Check your inbox for a message from <code style={{ background: "var(--color-warm-bg-alt)", padding: "2px 6px", color: "var(--color-warm-accent)", fontSize: "12px" }}>noreply@stripe.com</code> or <code style={{ background: "var(--color-warm-bg-alt)", padding: "2px 6px", color: "var(--color-warm-accent)", fontSize: "12px" }}>receipts@stripe.com</code>. If you don&apos;t see it in 2 minutes, check spam.
        </p>

        <div style={{ padding: "24px 28px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "32px", textAlign: "left" }}>
          <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", fontWeight: 700, marginBottom: "12px", marginTop: 0 }}>
            What to do first when you have the kit
          </h3>
          <ol style={{ paddingLeft: "20px", fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.8, margin: 0 }}>
            <li>Open <code>00-INDEX.pdf</code> — it&apos;s the table of contents</li>
            <li>Pick ONE folder to start with based on your most-pressing need (probably <code>01-ai-prompts/</code> or <code>02-sales-scripts/</code>)</li>
            <li>Copy-paste one prompt into ChatGPT or Claude and run it on YOUR business. See the magic in 30 seconds.</li>
            <li>Use the kit. Edit it. Make it yours.</li>
          </ol>
        </div>

        <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "22px", color: "var(--color-warm-text)", margin: "32px 0 12px", fontWeight: 600 }}>
          Want the white-glove version?
        </h3>
        <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", lineHeight: 1.6, margin: "0 0 24px" }}>
          We also build, deploy, and maintain custom AI tools for businesses — starting at $99/mo. Same playbook as the kit, but we do the work.
        </p>
        <Link href="/digital" className="pv-btn-primary" style={{ marginRight: "12px" }}>See Digital Services</Link>
        <Link href="/" style={{ color: "var(--color-warm-text-muted)", textDecoration: "underline", fontSize: "14px" }}>Back to home</Link>

      </main>
    </div>
  );
}
