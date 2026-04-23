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
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
        }}
      >
        {/* Gold top bar */}
        <div style={{ width: "64px", height: "3px", background: "#d4af37", marginBottom: "36px" }} />

        {/* Eyebrow */}
        <div style={{
          fontSize: "18px", color: "#d4af37", letterSpacing: "5px",
          textTransform: "uppercase", marginBottom: "28px", fontWeight: 700,
          display: "flex",
        }}>
          PURCELL VENTURES
        </div>

        {/* Headline */}
        <div style={{
          fontSize: "62px", color: "#f5f0e8", fontWeight: 700,
          lineHeight: 1.05, marginBottom: "36px",
          display: "flex", flexDirection: "column",
        }}>
          <span>Built to last.</span>
          <span style={{ color: "#d4af37" }}>Built to grow.</span>
        </div>

        {/* Description */}
        <div style={{
          fontSize: "22px", color: "#8a7a6a", maxWidth: "680px",
          lineHeight: 1.55, display: "flex",
        }}>
          Digital services · AI consulting · Custom software · Field services
        </div>

        {/* Domain bottom right */}
        <div style={{
          position: "absolute", right: "100px", bottom: "64px",
          fontSize: "18px", color: "#5a4a3a", display: "flex",
        }}>
          purcellventures.co
        </div>

        {/* PV mark - top right */}
        <div style={{
          position: "absolute", right: "100px", top: "80px",
          width: "80px", height: "80px",
          border: "2px solid #d4af37",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          fontWeight: 700,
          color: "#d4af37",
          letterSpacing: "2px",
        }}>
          PV
        </div>
      </div>
    ),
    { ...size }
  );
}
