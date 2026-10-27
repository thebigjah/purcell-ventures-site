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
      setMessages([{ role: "assistant", content: "Hi, I am an AI assistant for Purcell Ventures. Ask me about services, prices or how to start a project." }]);
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
      setMessages(m => [...m, { role: "assistant", content: "The assistant could not reply. Call or text Elijah at (205) 462-7839." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CHAT_CSS }} />
      <button className="chat-btn" onClick={() => setOpen(o => !o)} aria-label={open ? "Close chat" : "Ask a question"}>
        {open ? (
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M18 10c0 4.418-3.582 8-8 8a7.96 7.96 0 01-4-.002l-4 1.002 1-4A7.96 7.96 0 012 10c0-4.418 3.582-8 8-8s8 3.582 8 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Ask Purcell Ventures">
          <div className="chat-head">
            <b>Ask a question</b>
            <span>An AI assistant answers here. For anything it cannot answer, call Elijah at {CONTACT_PHONE}.</span>
          </div>
          <div className="chat-msgs">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.role}`}>{m.content}</div>
            ))}
            {loading && <div className="chat-msg chat-msg--assistant chat-msg--wait">Writing a reply</div>}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about services, prices or timing"
              aria-label="Your question"
            />
            <button className="ui-btn" onClick={send} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

const CONTACT_PHONE = "(205) 462-7839";

const CHAT_CSS = `
.chat-btn{position:fixed;right:max(18px,env(safe-area-inset-right,0px));bottom:max(18px,env(safe-area-inset-bottom,0px));z-index:1000;width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#1c1813;color:var(--gold-text);border:1px solid #6b5a3a;box-shadow:0 6px 22px rgba(0,0,0,.6);cursor:pointer;transition:border-color .15s}
.chat-btn:hover{border-color:var(--gold)}
.chat-panel{position:fixed;right:max(18px,env(safe-area-inset-right,0px));bottom:76px;z-index:999;width:min(380px,calc(100vw - 36px));height:min(500px,calc(100dvh - 120px));background:var(--surface);border:1px solid var(--line);display:flex;flex-direction:column;overflow:hidden;font-family:var(--font-body)}
.chat-head{padding:16px 18px;border-bottom:1px solid var(--line)}
.chat-head b{display:block;font:600 18px/1.2 var(--font-display);color:var(--fg)}
.chat-head span{display:block;color:var(--muted);font-size:13px;margin-top:4px}
.chat-msgs{flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:10px}
.chat-msg{max-width:86%;padding:10px 13px;font-size:15px;line-height:1.5}
.chat-msg--assistant{align-self:flex-start;background:var(--surface-2);color:var(--fg-2)}
.chat-msg--user{align-self:flex-end;background:var(--gold);color:#0c0a08}
.chat-msg--wait{color:var(--muted)}
.chat-input{padding:12px;border-top:1px solid var(--line);display:flex;gap:8px}
.chat-input input{flex:1;min-width:0;padding:11px 12px;background:var(--bg);border:1px solid #3a332a;color:var(--fg);font:400 15px/1.3 var(--font-body);border-radius:0}
.chat-input input:focus{outline:none;border-color:var(--gold)}
.chat-input .ui-btn{padding:11px 14px}
.chat-input .ui-btn:disabled{opacity:.45;cursor:not-allowed}`;
