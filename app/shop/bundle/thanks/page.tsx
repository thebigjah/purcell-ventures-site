import Link from "next/link";
import { VignetteBackground } from "@/app/components/VignetteBackground";

export const metadata = { title: "Thanks — The Complete Pack" };

export default function ThanksPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "640px", margin: "0 auto", padding: "96px 36px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "100px", color: "var(--color-warm-accent)", lineHeight: 1, marginBottom: "20px" }}>✓</div>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--color-warm-text)", margin: "0 0 16px" }}>
          All three products, <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>headed your way.</em>
        </h1>
        <p style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.7, margin: "0 0 32px" }}>
          Stripe will email you a single ZIP within 60 seconds. 61 files, three folders, ready to use.
        </p>
        <div style={{ padding: "20px 24px", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", marginBottom: "32px", textAlign: "left" }}>
          <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "10px", marginTop: 0, fontWeight: 700 }}>What to do first</h3>
          <ol style={{ paddingLeft: "20px", fontSize: "13px", color: "var(--color-warm-text)", lineHeight: 1.7, margin: 0 }}>
            <li>Extract the ZIP — you&apos;ll see 3 folders inside</li>
            <li>Open <code>00-BUNDLE-README.md</code> for the overview</li>
            <li>Start with the Starter Kit — that&apos;s the foundation</li>
            <li>Add the Cold Email Pack templates to your CRM</li>
            <li>Use the Subject Line Library every time you compose a cold email</li>
          </ol>
        </div>
        <Link href="/" style={{ color: "var(--color-warm-text-muted)", textDecoration: "underline", fontSize: "13px" }}>Back to home</Link>
      </main>
    </div>
  );
}
