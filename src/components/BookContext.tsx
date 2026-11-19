"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type { Photo } from "@/lib/types";

export type BookContextValue = {
  current: number;
  total: number;
  portrait: boolean;
  reducedMotion: boolean;
  openPhoto: (photos: Photo[], index: number) => void;
  goTo: (page: number) => void;
};

export const BookContext = createContext<BookContextValue>({
  current: 0,
  total: 0,
  portrait: false,
  reducedMotion: false,
  openPhoto: () => {},
  goTo: () => {},
});

export const useBook = () => useContext(BookContext);

/**
 * Stops a press on this element from starting a page turn.
 * `touch: false` still lets a swipe that starts here turn the page
 * (good for photos on phones), while a mouse press won't.
 */
export function useNoFlip<T extends HTMLElement>({ touch = true }: { touch?: boolean } = {}) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener("mousedown", stop);
    if (touch) el.addEventListener("touchstart", stop, { passive: true });
    return () => {
      el.removeEventListener("mousedown", stop);
      el.removeEventListener("touchstart", stop);
    };
  }, [touch]);
  return ref;
}
