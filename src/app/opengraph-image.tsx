import { ImageResponse } from "next/og";
import { book } from "@/data/flipbook";

export const alt = `${book.title} for ${book.recipient}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card shown when the link is shared in chat apps.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFF5EC",
        }}
      >
        <div
          style={{
            width: 440,
            height: 560,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFD3B6",
            borderRadius: "6px 22px 22px 6px",
            boxShadow: "0 30px 60px rgba(89,70,61,.22)",
            borderLeft: "18px solid #F5C3A2",
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 999,
              background: "#FFB88C",
              border: "4px solid #916A56",
              marginBottom: 28,
            }}
          />
          <div style={{ fontSize: 44, color: "#59463D", textAlign: "center", lineHeight: 1.15, padding: "0 40px", display: "flex" }}>
            {book.title}
          </div>
          <div style={{ fontSize: 30, color: "#916A56", marginTop: 18, display: "flex" }}>For {book.recipient}</div>
        </div>
      </div>
    ),
    size,
  );
}
