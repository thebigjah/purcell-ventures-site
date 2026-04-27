"use client";

export default function VideoEmbed({ url, title }: { url: string | null; title?: string }) {
  return (
    <div style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      overflow: "hidden",
      borderRadius: 8,
      background: "var(--color-warm-card)",
    }}>
      {url ? (
        <iframe
          src={url}
          title={title ?? "Lesson video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 12,
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-warm-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8" fill="var(--color-warm-border)" stroke="none"/>
          </svg>
          <span style={{ fontSize: "13px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.04em" }}>
            Video Coming Soon
          </span>
          <span style={{ fontSize: "11px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-inter), sans-serif" }}>
            You'll be notified when lessons drop.
          </span>
        </div>
      )}
    </div>
  );
}
