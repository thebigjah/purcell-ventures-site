"use client";

import { useState, useRef, useEffect } from "react";

interface Msg { role: "user" | "assistant"; content: string; }

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: "Hey — I'm the Purcell Ventures assistant. Ask me about our services, pricing, or how to get started." }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const updated: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.text }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Something went wrong. Try calling (770) 280-5319." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Bubble button — hard-edge square with brass corner brackets */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
          width: "56px", height: "56px", borderRadius: 0,
          background: "#d4af37", border: "none", cursor: "pointer",
          boxShadow: "0 4px 24px rgba(0,0,0,0.55), 0 0 0 1px #b8941e",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.15s",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="#0c0a08" strokeWidth="2.2" strokeLinecap="round"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18 10c0 4.418-3.582 8-8 8a7.96 7.96 0 01-4-.002l-4 1.002 1-4A7.96 7.96 0 012 10c0-4.418 3.582-8 8-8s8 3.582 8 8z" stroke="#0c0a08" strokeWidth="1.8" strokeLinejoin="round"/></svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: "92px", right: "24px", zIndex: 999,
          width: "min(360px, calc(100vw - 48px))", height: "480px",
          background: "#0e0c0a", border: "1px solid #d4af37", borderRadius: 0,
          boxShadow: "0 12px 60px rgba(0,0,0,0.75)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          fontFamily: "Inter, sans-serif",
        }}>
          {/* Brass corner brackets */}
          <span style={{ position: "absolute", top: 6, left: 6, width: 14, height: 14, borderTop: "1.5px solid #d4af37", borderLeft: "1.5px solid #d4af37" }} />
          <span style={{ position: "absolute", top: 6, right: 6, width: 14, height: 14, borderTop: "1.5px solid #d4af37", borderRight: "1.5px solid #d4af37" }} />
          <span style={{ position: "absolute", bottom: 6, left: 6, width: 14, height: 14, borderBottom: "1.5px solid #d4af37", borderLeft: "1.5px solid #d4af37" }} />
          <span style={{ position: "absolute", bottom: 6, right: 6, width: 14, height: 14, borderBottom: "1.5px solid #d4af37", borderRight: "1.5px solid #d4af37" }} />

          {/* Header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #2e2820", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "8px", height: "8px", background: "#d4af37" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#f5f0e0", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Purcell · Ventures
              </div>
              <div style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontSize: "9px", color: "#6a6458", marginTop: "3px",
                letterSpacing: "0.24em", textTransform: "uppercase",
              }}>
                Assistant · Replies instantly
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "84%", padding: "10px 14px", borderRadius: 0,
                  background: m.role === "user" ? "#d4af37" : "#1a1714",
                  border: m.role === "user" ? "1px solid #b8941e" : "1px solid #2e2820",
                  color: m.role === "user" ? "#0c0a08" : "#d8d0c4",
                  fontFamily: m.role === "user" ? "Inter, sans-serif" : "Georgia, serif",
                  fontStyle: m.role === "user" ? "normal" : "italic",
                  fontSize: "13.5px", lineHeight: 1.55,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex" }}>
                <div style={{ padding: "10px 18px", background: "#1a1714", border: "1px solid #2e2820", color: "#6a6458", fontSize: "20px", letterSpacing: "3px" }}>···</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "14px 16px", borderTop: "1px solid #2e2820", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask anything..."
              style={{
                flex: 1, padding: "10px 12px", background: "#161412", border: "1px solid #2e2820",
                borderRadius: 0, color: "#f5f0e0", fontSize: "13px", fontFamily: "Inter, sans-serif",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 16px", background: "#d4af37", border: "1px solid #b8941e",
                borderRadius: 0, cursor: (!input.trim() || loading) ? "not-allowed" : "pointer",
                fontSize: "15px", color: "#0c0a08",
                opacity: (!input.trim() || loading) ? 0.4 : 1,
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontWeight: 700,
              }}
              aria-label="Send"
            >→</button>
          </div>
        </div>
      )}
    </>
  );
}
