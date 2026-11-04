import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5b1f5e",
        }}
      >
        <svg
          width="112"
          height="112"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            d="M18 46V18H25L39 35V18H46V46H39L25 29V46H18Z"
            fill="#F5EFE6"
          />
        </svg>
      </div>
    ),
    size
  );
}