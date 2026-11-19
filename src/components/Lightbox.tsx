"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/types";
import { PhotoPlaceholder } from "./PhotoCollage";

type Props = {
  state: { photos: Photo[]; index: number } | null;
  onClose: () => void;
  onIndex: (index: number) => void;
  reducedMotion: boolean;
};

/** Enlarged photo viewer. Esc closes, arrow keys move between photos. */
export function Lightbox({ state, onClose, onIndex, reducedMotion }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = state !== null;

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && state.index < state.photos.length - 1) {
        onIndex(state.index + 1);
      } else if (e.key === "ArrowLeft" && state.index > 0) {
        onIndex(state.index - 1);
      } else if (e.key === "Tab") {
        // Keep focus inside the viewer.
        const items = Array.from(document.querySelectorAll<HTMLElement>(".lightbox button:not([disabled])"));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onClose, onIndex]);

  if (typeof document === "undefined") return null;

  const photo = state ? state.photos[state.index] : null;
  const many = state ? state.photos.length > 1 : false;

  return createPortal(
    <AnimatePresence>
      {state && photo && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption ?? "Photo"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.figure
            key={photo.src + state.index}
            className="lightbox__card"
            initial={reducedMotion ? false : { scale: 0.94, rotate: -1.5, y: 12 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="lightbox__photo">
              {photo.available ? (
                <Image
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  fill
                  sizes="(max-width: 900px) 92vw, 820px"
                  quality={85}
                  unoptimized={/^https?:/i.test(photo.src)}
                  className="object-contain"
                  priority
                />
              ) : (
                <PhotoPlaceholder src={photo.src} tone={state.index} />
              )}
            </div>
            {photo.caption && <figcaption className="lightbox__caption font-hand">{photo.caption}</figcaption>}
          </motion.figure>

          <button ref={closeRef} type="button" className="icon-button lightbox__close" onClick={onClose} aria-label="Close photo">
            <X aria-hidden="true" size={20} />
          </button>
          {many && (
            <>
              <button
                type="button"
                className="icon-button lightbox__prev"
                onClick={() => onIndex(state.index - 1)}
                disabled={state.index === 0}
                aria-label="Previous photo"
              >
                <ChevronLeft aria-hidden="true" size={22} />
              </button>
              <button
                type="button"
                className="icon-button lightbox__next"
                onClick={() => onIndex(state.index + 1)}
                disabled={state.index === state.photos.length - 1}
                aria-label="Next photo"
              >
                <ChevronRight aria-hidden="true" size={22} />
              </button>
              <p className="lightbox__count" aria-live="polite">
                Photo {state.index + 1} of {state.photos.length}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
