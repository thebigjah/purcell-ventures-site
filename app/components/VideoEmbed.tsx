"use client";

export default function VideoEmbed({ url, title }: { url: string | null; title?: string }) {
  return (
    <div className="video-embed">
      <style dangerouslySetInnerHTML={{ __html: `
.video-embed { position: relative; aspect-ratio: 16 / 9; width: 100%; background: var(--surface); border: 1px solid var(--line); overflow: hidden; }
.video-embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.video-embed__empty { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 16px; text-align: center; font-family: var(--font-body); }
.video-embed__empty strong { font-family: var(--font-display); font-weight: 600; font-size: 18px; color: var(--fg-2); }
.video-embed__empty span { font-size: 14px; color: var(--muted); }
` }} />
      {url ? (
        <iframe
          src={url}
          title={title ?? "Lesson video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="video-embed__empty">
          <strong>Video coming soon</strong>
          <span>The lesson notes below cover the full lesson in the meantime.</span>
        </div>
      )}
    </div>
  );
}
