import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Purcell Ventures — Digital Services, AI Consulting & Custom Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0a08",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Brass top hairline */}
        <div style={{
          position: "absolute", top: "30px", left: "80px", right: "80px",
          height: "1px", background: "#d4af37", display: "flex",
        }} />

        {/* Brass corner brackets */}
        <div style={{ position: "absolute", top: "20px", left: "20px", width: "28px", height: "28px", borderTop: "2px solid #d4af37", borderLeft: "2px solid #d4af37", display: "flex" }} />
        <div style={{ position: "absolute", top: "20px", right: "20px", width: "28px", height: "28px", borderTop: "2px solid #d4af37", borderRight: "2px solid #d4af37", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "20px", left: "20px", width: "28px", height: "28px", borderBottom: "2px solid #d4af37", borderLeft: "2px solid #d4af37", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "28px", height: "28px", borderBottom: "2px solid #d4af37", borderRight: "2px solid #d4af37", display: "flex" }} />

        {/* Wordmark — PURCELL */}
        <div style={{
          fontFamily: "serif",
          fontSize: "84px",
          color: "#f5f0e0",
          letterSpacing: "30px",
          paddingLeft: "30px",
          fontWeight: 700,
          marginBottom: "20px",
          display: "flex",
        }}>
          PURCELL
        </div>

        {/* Rule + diamond endcaps */}
        <div style={{ position: "relative", width: "320px", marginBottom: "20px", display: "flex" }}>
          <div style={{ height: "1px", width: "100%", background: "#d4af37", display: "flex" }} />
        </div>

        {/* Wordmark — VENTURES */}
        <div style={{
          fontFamily: "serif",
          fontSize: "32px",
          color: "#d4af37",
          letterSpacing: "20px",
          paddingLeft: "20px",
          fontWeight: 400,
          marginBottom: "60px",
          display: "flex",
        }}>
          VENTURES
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: "22px", color: "#8a8070", maxWidth: "780px",
          lineHeight: 1.55, fontFamily: "serif", fontStyle: "italic",
          textAlign: "center", display: "flex", justifyContent: "center",
        }}>
          Built by one operator for the small businesses who move first.
        </div>

        {/* Meta strip, bottom */}
        <div style={{
          position: "absolute", bottom: "50px", left: "80px", right: "80px",
          display: "flex", justifyContent: "space-between",
          fontSize: "13px", color: "#524d45",
          letterSpacing: "5px", textTransform: "uppercase",
        }}>
          <div style={{ display: "flex" }}>EST · APRIL · MMXXV · ACWORTH GA</div>
          <div style={{ display: "flex", color: "#d4af37" }}>PURCELLVENTURES · CO</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
