import { ImageResponse } from "next/og";

export const alt =
  "Nnamdi Uzoigwe — Crafting fluid, high-performance mobile and web apps.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5efe6",
          color: "#242124",
          padding: "52px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#10b981",
            }}
          />

          <span>Nnamdi Uzoigwe</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-4px",
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <span>Crafting</span>
            <span style={{ color: "#5b1f5e" }}>Fluid</span>
          </div>

          <span>High Performance</span>
          <span>Mobile & Web Apps.</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #d8cec4",
            paddingTop: 20,
            fontSize: 20,
            color: "#655c65",
          }}
        >
          <span>React Native · Expo · Next.js</span>
          <span>Selected work & project walkthroughs</span>
        </div>
      </div>
    ),
    size
  );
}