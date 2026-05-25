import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = {
  title: "Thanks — Whale Alerts Premium",
};

export default function ThanksPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "640px", margin: "0 auto", padding: "96px 36px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "100px", color: "var(--color-warm-accent)", lineHeight: 1, marginBottom: "20px" }}>✓</div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px" }}>
          You&apos;re in. <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>Welcome.</em>
        </h1>
        <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: "0 0 32px" }}>
          Within 60 seconds you should receive an email with your one-time Telegram invite link. Click it to join the premium channel.
        </p>
        <div style={{ padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "32px", textAlign: "left" }}>
          <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", marginTop: 0, fontWeight: 700 }}>Things to know</h3>
          <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7, margin: 0 }}>
            <li>Invite link is single-use and expires in 24 hours</li>
            <li>Alerts start firing as soon as you join (don&apos;t worry, no spam — typically 2-5 per day)</li>
            <li>To cancel: reply to the welcome email or go to your Stripe receipt → manage subscription</li>
            <li>If you miss the invite, reply to the welcome email and I&apos;ll regenerate within 24 hours</li>
          </ul>
        </div>
        <Link href="/" style={{ color: "var(--color-warm-text-muted)", textDecoration: "underline", fontSize: "13px" }}>Back to home</Link>
      </main>
    </div>
  );
}
