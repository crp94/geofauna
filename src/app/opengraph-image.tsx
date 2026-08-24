import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GeoFauna — The Species Distribution Game";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #060A11 0%, #0A1424 50%, #0F1F38 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(16, 185, 129, 0.2)",
              border: "2px solid rgba(16, 185, 129, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            🐾
          </div>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            Geo<span style={{ color: "#10B981" }}>Fauna</span>
          </span>
        </div>

        <p
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "36px",
          }}
        >
          The open-biodiversity species distribution deduction game.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34D399",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            🌍 Robinson Projection
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              background: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.4)",
              color: "#38BDF8",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            📊 IUCN Conservation
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#FBBF24",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            🌡️ 2050 Climate Vulnerability
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
