"use client";

import { useState, useRef, useEffect } from "react";
import { VignetteBackground } from "@/app/components/VignetteBackground";
import { PortalNav } from "../_components/PortalNav";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "How do I handle 'we already have a website'?",
  "A prospect with 12 employees wants AI training, what do I quote?",
  "Walk me through the Pilot Partner pitch verbatim",
  "Customer says $179/mo is too much, what do I say?",
  "When do I escalate to Elijah vs handle solo?",
  "What's my commission if I close a Growth subscription?",
];

export default function RepAskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/rep-ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages([...newMessages, { role: "assistant", content: data.error || "Error. Try again." }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.text }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Network error. Try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", color: "var(--color-warm-text)", position: "relative", display: "flex", flexDirection: "column" }}>
      <VignetteBackground />
      <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <PortalNav />
        <main style={{ flex: 1, maxWidth: "880px", width: "100%", margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column" }}>

          <header style={{ marginBottom: "24px" }}>
            <div className="pv-mono-label" style={{ marginBottom: "8px" }}>Rep Portal · Ask</div>
            <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--color-warm-text)", margin: 0, lineHeight: 1 }}>
              Ask me <em className="pv-italic" style={{ fontWeight: 400, color: "var(--color-warm-accent)" }}>anything.</em>
            </h1>
            <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", margin: "12px 0 0", lineHeight: 1.6, maxWidth: "560px" }}>
              Internal sales assistant. Knows pricing, commission, Pilot Partner mechanics, objection scripts, escalation rules. Mid-pitch? Drop the question here and get a tactical answer in seconds.
            </p>
          </header>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", background: "var(--color-warm-bg-alt)", border: "1px solid var(--color-warm-border)", padding: "20px", marginBottom: "16px", minHeight: "400px", maxHeight: "60vh" }}>
            {messages.length === 0 ? (
              <div>
                <p style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: "16px" }}>Try one of these:</p>
                <div style={{ display: "grid", gap: "8px" }}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{ textAlign: "left", padding: "12px 16px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text)", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", borderRadius: 0, transition: "border-color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-warm-accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-warm-border)")}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "80%",
                      padding: "12px 16px",
                      background: m.role === "user" ? "var(--color-warm-accent)" : "var(--color-warm-bg)",
                      color: m.role === "user" ? "var(--color-warm-bg)" : "var(--color-warm-text)",
                      border: m.role === "assistant" ? "1px solid var(--color-warm-border)" : "none",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                    }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {busy && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "12px 16px", background: "var(--color-warm-bg)", border: "1px solid var(--color-warm-border)", color: "var(--color-warm-text-muted)", fontSize: "14px", fontStyle: "italic" }}>
                      thinking…
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about pricing, scripts, objections, escalation…"
              disabled={busy}
              style={{ flex: 1, padding: "14px 16px", background: "var(--color-warm-bg-alt)", color: "var(--color-warm-text)", border: "1px solid var(--color-warm-border)", borderRadius: 0, fontSize: "15px", fontFamily: "var(--font-inter), sans-serif" }}
            />
            <button type="submit" disabled={busy || !input.trim()} className="pv-btn-primary" style={{ border: "none", cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1 }}>
              Send
            </button>
          </form>

          <p style={{ fontSize: "11px", color: "var(--color-warm-text-light)", marginTop: "16px", textAlign: "center", fontStyle: "italic" }}>
            Conversations aren&apos;t saved, refresh to clear. If you hit a question the bot can&apos;t answer, text Elijah and we&apos;ll add the answer to its training.
          </p>
        </main>
      </div>
    </div>
  );
}
