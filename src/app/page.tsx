import FlipBook from "@/components/FlipBook";
import { book, pages } from "@/data/flipbook";
import { resolvePages } from "@/lib/resolve";

export default function Home() {
  // Checks which photos and videos exist in /public, hides optional
  // pages that have nothing to show, and keeps the page count even.
  const resolved = resolvePages(pages);
  return <FlipBook pages={resolved} book={book} />;
}
