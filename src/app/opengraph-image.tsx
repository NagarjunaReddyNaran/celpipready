import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo badge */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "16px",
            padding: "12px 28px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 800,
              color: "#1d4ed8",
            }}
          >
            CR
          </div>
          <span style={{ color: "white", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            CelpipReady
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: "white",
            fontSize: "64px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "20px",
          }}
        >
          Score Higher on CELPIP.
        </div>
        <div
          style={{
            color: "white",
            fontSize: "64px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "28px",
          }}
        >
          Practice Smarter with AI.
        </div>

        {/* Subtext */}
        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "28px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          AI feedback on Writing &amp; Speaking. Free to start.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["Free to Start", "AI Writing Feedback", "AI Speaking Feedback", "CLB Score"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                borderRadius: "100px",
                padding: "10px 22px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
