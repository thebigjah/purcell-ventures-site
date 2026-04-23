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
      {/* Bubble button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
          width: "52px", height: "52px", borderRadius: "50%",
          background: "#d4af37", border: "none", cursor: "pointer",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.15s",
        }}
        aria-label="Open chat"
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
          position: "fixed", bottom: "88px", right: "24px", zIndex: 999,
          width: "min(340px, calc(100vw - 48px))", height: "460px",
          background: "#0e0c0a", border: "1px solid #2e2820", borderRadius: "12px",
          boxShadow: "0 12px 60px rgba(0,0,0,0.7)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          fontFamily: "Inter, sans-serif",
        }}>
          {/* Header */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #2e2820", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#d4af37" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#f5f0e0", fontFamily: "'Cinzel', Georgia, serif" }}>Purcell Ventures</div>
              <div style={{ fontSize: "10px", color: "#6a6458", marginTop: "1px" }}>Virtual assistant · Typically replies instantly</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%", padding: "9px 13px", borderRadius: "10px",
                  background: m.role === "user" ? "#d4af37" : "#1a1714",
                  color: m.role === "user" ? "#0c0a08" : "#d8d0c4",
                  fontSize: "13px", lineHeight: 1.6,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex" }}>
                <div style={{ padding: "9px 16px", background: "#1a1714", borderRadius: "10px", color: "#6a6458", fontSize: "20px", letterSpacing: "2px" }}>···</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 14px", borderTop: "1px solid #2e2820", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask anything..."
              style={{
                flex: 1, padding: "9px 12px", background: "#161412", border: "1px solid #2e2820",
                borderRadius: "6px", color: "#f5f0e0", fontSize: "13px", fontFamily: "Inter, sans-serif",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                padding: "9px 14px", background: "#d4af37", border: "none", borderRadius: "6px",
                cursor: "pointer", fontSize: "14px", opacity: (!input.trim() || loading) ? 0.4 : 1,
              }}
            >→</button>
          </div>
        </div>
      )}
    </>
  );
}
