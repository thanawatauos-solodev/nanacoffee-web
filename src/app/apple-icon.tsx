import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iPhone: the same cup mark as icon.svg, drawn full-bleed. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#2a1a12" }}>
        <svg width="180" height="180" viewBox="0 0 48 48" fill="none">
          <path d="M12 21h20v6.5a9 9 0 0 1-9 9h-2a9 9 0 0 1-9-9V21Z" fill="#e6bb7c" />
          <path d="M32 23.5h2.2a3.8 3.8 0 0 1 0 7.6H31" stroke="#e6bb7c" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M10 39.5h26" stroke="#e6bb7c" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22.5 17.5c-2.6-1.2-3.9-4.6-2.4-8.6 3.9.7 6 3.4 5.3 6.9-.2.8-1.3 2.2-2.9 1.7Z" fill="#8ea582" />
        </svg>
      </div>
    ),
    size,
  );
}
