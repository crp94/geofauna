import { ImageResponse } from "next/og";
import { paper, ink, rule, accent, ochre, terracotta } from "@/lib/theme";

export const runtime = "edge";
export const alt = "GeoFauna — a naturalist's atlas of living species";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function loadFrauncesFont(): Promise<ArrayBuffer> {
  const res = await fetch(new URL("./fonts/fraunces-600.ttf", import.meta.url));
  return res.arrayBuffer();
}

/**
 * A 280x280 pre-shrunk copy of public/brand/geofauna-logo.png (~28KB vs.
 * the ~261KB source, which alone pushed this Edge Function's bundle over
 * Vercel's 1MB limit). Lives beside ./fonts rather than under /public: that
 * traversal is reliably part of this module's graph, the same way the font
 * file is, whereas the original /public/brand path needed a try/catch
 * fallback because it wasn't guaranteed to resolve once bundled for edge.
 */
async function loadLogoDataUri(): Promise<string> {
  const res = await fetch(new URL("./og-assets/logo.png", import.meta.url));
  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
}

function Chip({ label, color, soft }: { label: string; color: string; soft: string }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "10px 18px",
        border: `1px solid ${color}`,
        background: soft,
        color,
        fontSize: 16,
        letterSpacing: "2px",
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
}

export default async function Image() {
  const [fontData, logoDataUri] = await Promise.all([loadFrauncesFont(), loadLogoDataUri()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: paper.base,
        }}
      >
        {/* outer ink rule */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            display: "flex",
            border: `3px solid ${ink[700]}`,
          }}
        />
        {/* inner hairline rule */}
        <div
          style={{
            position: "absolute",
            top: 34,
            left: 34,
            right: 34,
            bottom: 34,
            display: "flex",
            border: `1px solid ${rule.strong}`,
          }}
        />

        {/* corner stamp */}
        <div
          style={{
            position: "absolute",
            top: 58,
            right: 62,
            display: "flex",
            padding: 4,
            border: `1px solid ${ochre.DEFAULT}`,
            transform: "rotate(-3deg)",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              border: `1px solid ${ochre.DEFAULT}`,
              color: ochre.DEFAULT,
              fontSize: 14,
              letterSpacing: "2px",
              fontWeight: 600,
            }}
          >
            DAILY EXPEDITION
          </div>
        </div>

        {/* content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 100px",
          }}
        >
          <img
            src={logoDataUri}
            width={140}
            height={140}
            style={{ marginBottom: 28 }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 600,
              color: ink[900],
            }}
          >
            Geo<span style={{ color: accent.DEFAULT }}>Fauna</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: ink[700],
              marginTop: 18,
              transform: "rotate(-1.5deg)",
            }}
          >
            A naturalist&apos;s atlas of living species
          </div>

          <div
            style={{
              display: "flex",
              width: 420,
              height: 1,
              background: rule.strong,
              marginTop: 32,
              marginBottom: 32,
            }}
          />

          <div style={{ display: "flex", gap: 16 }}>
            <Chip label="ROBINSON PROJECTION" color={accent.DEFAULT} soft={accent.soft} />
            <Chip label="IUCN RED LIST CONTEXT" color={ochre.DEFAULT} soft={ochre.soft} />
            <Chip label="OPEN BIODIVERSITY DATA" color={terracotta.DEFAULT} soft={terracotta.soft} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: fontData,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}
