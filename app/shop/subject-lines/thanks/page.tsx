import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Thanks: Subject Line Library",
};

export default function ThanksPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "640px", margin: "0 auto", padding: "96px 36px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "100px", color: "var(--color-warm-accent)", lineHeight: 1, marginBottom: "20px" }}>✓</div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px" }}>
          Your download is <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>on its way.</em>
        </h1>
        <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: "0 0 32px" }}>
          Stripe will email you the PDF and markdown files within 60 seconds. Check your inbox and spam folder.
        </p>
        <div style={{ padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "32px", textAlign: "left" }}>
          <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", marginTop: 0, fontWeight: 700 }}>What to do first</h3>
          <ol style={{ paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7, margin: 0 }}>
            <li>Open the PDF. The first section is a cheat sheet of the categories</li>
            <li>Pick the subject line category that fits your next outreach</li>
            <li>Replace the {`{{tokens}}`} with the prospect&apos;s details</li>
            <li>Send, track opens, and save the 1 or 2 lines per campaign that get good open rates.</li>
          </ol>
        </div>
        <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "20px", color: "var(--color-warm-text)", margin: "32px 0 12px", fontWeight: 600 }}>
          Want the full playbook?
        </h3>
        <p style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", margin: "0 0 20px" }}>
          The <Link href="/shop/cold-email-pack" style={{ color: "var(--color-warm-accent)" }}>Cold Email Mastery Pack ($29)</Link> includes 100+ industry templates, reply scripts and cadences.
        </p>
        <Link href="/shop/cold-email-pack" className="pv-btn-primary" style={{ marginRight: "12px" }}>See the full pack</Link>
        <Link href="/" style={{ color: "var(--color-warm-text-muted)", textDecoration: "underline", fontSize: "13px" }}>Back to home</Link>
      </main>
    </div>
  );
}
