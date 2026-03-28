import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
          gap: "4px",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-2px",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          CR
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 22,
            fontWeight: 500,
            fontFamily: "sans-serif",
            letterSpacing: "1px",
          }}
        >
          CELPIP
        </span>
      </div>
    ),
    { ...size }
  );
}
