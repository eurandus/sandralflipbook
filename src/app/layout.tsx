import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/caveat";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { book } from "@/data/flipbook";

export const metadata: Metadata = {
  title: `${book.title} for ${book.recipient}`,
  description: book.description,
  // A personal gift: keep it out of search engines.
  robots: { index: false, follow: false },
  openGraph: {
    title: `${book.title} for ${book.recipient}`,
    description: book.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF5EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
