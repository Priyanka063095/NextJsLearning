import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/app/lib/site";

export const alt = `${SITE_NAME} — Warehouse Inventory Intelligence`;
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 50% 120%, rgba(234,88,12,0.35), rgba(9,9,11,0) 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          RAMS<span style={{ color: "#ea580c" }}>.</span>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 6, color: "#a1a1aa" }}>
            DIGITAL
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          Know what you have.
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: "#a1a1aa" }}>
          Know where it is.
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#a1a1aa", maxWidth: 900 }}>
          Warehouse inventory location, reconciliation and aging intelligence.
        </div>
      </div>
    ),
    { ...size }
  );
}
