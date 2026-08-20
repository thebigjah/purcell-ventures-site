"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VignetteBackground } from "@/app/components/VignetteBackground";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/rep-portal";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [authMode, setAuthMode] = useState<"per-rep" | "shared" | "unconfigured" | "unknown">("unknown");

  useEffect(() => {
    // Detect server's auth mode so we know whether to ask for name
    fetch("/api/rep-auth").then(async (res) => {
      if (!res.ok) {
        setAuthMode("unknown");
        return;
      }
      const data = await res.json();
      setAuthMode(data.mode);
    }).catch(() => setAuthMode("unknown"));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const body = authMode === "per-rep" ? { password } : { name, password };
      const res = await fetch("/api/rep-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setBusy(false);
        return;
      }
      router.push(redirect);
    } catch {
      setError("Network error. Try again.");
      setBusy(false);
    }
  }

  const showNameField = authMode === "shared";

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px", margin: "0 auto" }}>
      {showNameField && (
        <div>
          <label style={fieldLabel}>Your name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Luke Keebler"
            style={fieldStyle}
          />
        </div>
      )}
      <div>
        <label style={fieldLabel}>{authMode === "per-rep" ? "Your password" : "Portal password"}</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={authMode === "per-rep" ? "The one Elijah sent you" : "Given to you during onboarding"}
          style={fieldStyle}
          autoFocus
        />
      </div>
      {error && (
        <div style={{ background: "rgba(229, 74, 40, 0.1)", border: "1px solid #e54a28", padding: "10px 14px", color: "#e54a28", fontSize: "13px" }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={busy}
        className="pv-btn-primary"
        style={{ marginTop: "8px", border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
      {authMode === "per-rep" && (
        <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", marginTop: "16px", lineHeight: 1.6, fontStyle: "italic" }}>
          Your password identifies you — every action you take in the portal is attributed to your account. Don&apos;t share your password. If you forgot it or need it rotated, text Elijah at (205) 462-7839.
        </p>
      )}
      {authMode === "shared" && (
        <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", marginTop: "16px", lineHeight: 1.6, fontStyle: "italic" }}>
          Your name is logged with every action you take. Don&apos;t share the password — if it leaks, Elijah rotates and everyone re-logs in.
        </p>
      )}
      {authMode === "unconfigured" && (
        <p style={{ fontSize: "12px", color: "#e54a28", marginTop: "16px", lineHeight: 1.6, fontStyle: "italic" }}>
          Server is not configured for login. Elijah needs to set REP_PASSWORDS (preferred) or REP_PORTAL_PASSWORD env var on Vercel.
        </p>
      )}
    </form>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px",
  background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)",
  border: "1px solid var(--color-warm-border)", borderRadius: 0,
  fontSize: "15px", fontFamily: "var(--font-inter), sans-serif",
};

const fieldLabel: React.CSSProperties = {
  display: "block", fontSize: "11px", fontWeight: 700,
  letterSpacing: "0.18em", textTransform: "uppercase",
  color: "var(--color-warm-accent)", marginBottom: "6px",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", overflowX: "hidden" }}>
      <VignetteBackground />
      <main style={{ position: "relative", zIndex: 5, maxWidth: "540px", margin: "0 auto", padding: "120px 36px 80px" }}>
        <header style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="pv-mono-label" style={{ marginBottom: "12px" }}>Rep Portal · Sign in</div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "42px", fontWeight: 700, color: "var(--color-warm-text)", margin: 0, lineHeight: 1 }}>
            Welcome <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>back.</em>
          </h1>
        </header>
        <Suspense fallback={<div style={{ textAlign: "center", color: "var(--color-warm-text-muted)" }}>Loading…</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
