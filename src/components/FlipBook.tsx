"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Link2,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { FlipState, PageFlip } from "page-flip";
import type { BookSettings, Photo, ResolvedPage } from "@/lib/types";
import { playPageTurn } from "@/lib/sound";
import { BookContext, type BookContextValue } from "./BookContext";
import { Celebration } from "./Celebration";
import { FlipPage } from "./FlipPage";
import { FloatingDoodles } from "./FloatingDoodles";
import { Lightbox } from "./Lightbox";

/** Base page size. Only the proportions matter; the book scales to fit. */
const PAGE_W = 460;
const PAGE_H = 640;

type Props = { pages: ResolvedPage[]; book: BookSettings };

export default function FlipBook({ pages, book }: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  const total = pages.length;

  const appRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const currentRef = useRef(0);
  const soundRef = useRef(false);
  const lightboxOpenRef = useRef(false);

  const [nodes, setNodes] = useState<HTMLDivElement[] | null>(null);
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [hasTurned, setHasTurned] = useState(false);
  const [sound, setSound] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);
  const [fsSupported, setFsSupported] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<number | null>(null);
  const [stage, setStage] = useState<{ w: number; h: number } | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

  soundRef.current = sound;
  lightboxOpenRef.current = lightbox !== null;

  /* ── Create one DOM node per page. React renders into them via portals,
        and page-flip moves them around without React noticing. ── */
  useEffect(() => {
    const list = pages.map((p, i) => {
      const el = document.createElement("div");
      el.className = `page page--${p.type}`;
      if (p.type === "cover" || p.type === "back-cover") el.dataset.density = "hard";
      el.dataset.side = i === 0 ? "right" : i % 2 === 1 ? "left" : "right";
      return el;
    });
    setNodes(list);
  }, [pages]);

  const pauseVideos = useCallback(() => {
    nodes?.forEach((n) => n.querySelectorAll("video").forEach((v) => v.pause()));
  }, [nodes]);

  /* ── Start page-flip ── */
  useEffect(() => {
    const host = hostRef.current;
    if (!nodes || !host) return;

    let cancelled = false;
    let instance: PageFlip | null = null;
    const root = document.createElement("div");
    root.className = "book-root";
    host.appendChild(root);

    const measure = (pf: PageFlip) => {
      const rect = pf.getRender().getRect();
      setPageWidth(rect.pageWidth);
    };

    import("page-flip").then(({ PageFlip }) => {
      if (cancelled) return;
      const pf = new PageFlip(root, {
        width: PAGE_W,
        height: PAGE_H,
        size: "stretch",
        minWidth: 300,
        maxWidth: 560,
        minHeight: 200,
        maxHeight: 900,
        autoSize: false,
        showCover: true,
        usePortrait: true,
        mobileScrollSupport: true,
        drawShadow: true,
        maxShadowOpacity: 0.35,
        flippingTime: reducedMotion ? 220 : 900,
        showPageCorners: !reducedMotion,
        clickEventForward: true,
        swipeDistance: 30,
        startPage: currentRef.current,
      });
      instance = pf;

      pf.on("init", (e) => {
        currentRef.current = e.data.page;
        setCurrent(e.data.page);
        setPortrait(e.data.mode === "portrait");
        measure(pf);
        setReady(true);
      });
      pf.on("flip", (e) => {
        currentRef.current = e.data;
        setCurrent(e.data);
        if (e.data !== 0) setHasTurned(true);
      });
      pf.on("changeOrientation", (e) => {
        setPortrait(e.data === "portrait");
        measure(pf);
      });
      pf.on("changeState", (e) => {
        const state: FlipState = e.data;
        setFlipping(state === "flipping");
        if (state === "flipping" || state === "user_fold") pauseVideos();
        if (state === "flipping" && soundRef.current) playPageTurn();
      });

      pf.loadFromHTML(nodes);
      flipRef.current = pf;
    });

    const onResize = () => {
      requestAnimationFrame(() => {
        if (instance) measure(instance);
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      flipRef.current = null;
      if (instance) instance.destroy();
      else root.remove();
    };
  }, [nodes, reducedMotion, pauseVideos]);

  /* ── Fit the book to the space available ──
     The host is exactly as tall as the book, so it sits centred
     vertically on any screen. page-flip handles the width. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const footer = footerRef.current;
    const measure = () => {
      const fh = footer ? footer.offsetHeight : 0;
      setStage({ w: el.clientWidth, h: Math.max(160, el.clientHeight - fh - 12) });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (footer) ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  const bookHeight = (() => {
    if (!stage) return null;
    const ratio = PAGE_W / PAGE_H;
    const isPortrait = stage.w < 600; // matches minWidth × 2 below
    const pageW = Math.min(isPortrait ? stage.w : stage.w / 2, 560);
    return Math.floor(Math.min(pageW / ratio, stage.h));
  })();

  useEffect(() => {
    // Let page-flip re-measure once the host has its new height.
    const id = requestAnimationFrame(() => {
      const pf = flipRef.current;
      if (!pf) return;
      pf.update();
      setPageWidth(pf.getRender().getRect().pageWidth);
    });
    return () => cancelAnimationFrame(id);
  }, [bookHeight]);

  /* ── Navigation ── */
  const next = useCallback(() => {
    const pf = flipRef.current;
    if (!pf) return;
    if (reducedMotion) {
      pf.turnToPage(Math.min(total - 1, pf.getCurrentPageIndex() + (portrait || pf.getCurrentPageIndex() === 0 ? 1 : 2)));
      pauseVideos();
      if (soundRef.current) playPageTurn();
    } else pf.flipNext("top");
  }, [reducedMotion, portrait, total, pauseVideos]);

  const prev = useCallback(() => {
    const pf = flipRef.current;
    if (!pf) return;
    if (reducedMotion) {
      const i = pf.getCurrentPageIndex();
      pf.turnToPage(Math.max(0, i - (portrait ? 1 : i === total - 1 ? 1 : 2)));
      pauseVideos();
      if (soundRef.current) playPageTurn();
    } else pf.flipPrev("top");
  }, [reducedMotion, portrait, total, pauseVideos]);

  const goTo = useCallback(
    (page: number) => {
      const pf = flipRef.current;
      if (!pf) return;
      if (reducedMotion) pf.turnToPage(page);
      else pf.flip(page, "top");
    },
    [reducedMotion],
  );

  // Keyboard: ← and → turn pages.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpenRef.current || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("video, input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch: page-flip handles swipes and corner drags, and phones turn a
  // tap into a click, which page-flip uses to turn forward (right half)
  // or back (left half). So no extra tap handling is needed here.

  /* ── Small environment checks (client only) ── */
  useEffect(() => {
    setTouchDevice(window.matchMedia("(hover: none)").matches);
    setFsSupported(Boolean(document.fullscreenEnabled));
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Celebrate each time the last page is reached.
  const lastSeen = useRef(0);
  useEffect(() => {
    if (!ready) return;
    if (current === total - 1 && lastSeen.current !== total - 1) {
      setCelebration(Date.now());
      const t = window.setTimeout(() => setCelebration(null), 3600);
      lastSeen.current = current;
      return () => window.clearTimeout(t);
    }
    lastSeen.current = current;
  }, [current, total, ready]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void appRef.current?.requestFullscreen?.();
  };

  const copyLink = async () => {
    const url = window.location.href.split("#")[0];
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setToast("Link copied");
    window.setTimeout(() => setToast(null), 2200);
  };

  /* ── Derived UI state ── */
  const atStart = current === 0;
  const atEnd = current >= total - 1;
  // When the book is closed (front or back cover on a two-page spread),
  // slide it so the cover sits in the middle of the screen.
  const shift =
    !portrait && !flipping && pageWidth > 0
      ? atStart
        ? -pageWidth / 2
        : atEnd
          ? pageWidth / 2
          : 0
      : 0;

  const status =
    portrait || atStart || atEnd
      ? `Page ${current + 1} of ${total}`
      : `Pages ${current + 1}–${Math.min(current + 2, total)} of ${total}`;
  const progress = total > 1 ? (atEnd ? 1 : (current + (portrait || atStart ? 1 : 2)) / total) : 1;

  const hint = touchDevice ? "Tap or swipe the page to turn it" : "Click the cover to open it";

  const openPhoto = useCallback((photos: Photo[], index: number) => setLightbox({ photos, index }), []);

  const ctx = useMemo<BookContextValue>(
    () => ({ current, total, portrait, reducedMotion, openPhoto, goTo }),
    [current, total, portrait, reducedMotion, openPhoto, goTo],
  );

  return (
    <BookContext.Provider value={ctx}>
      <main ref={appRef} className="app">
        <h1 className="sr-only">
          {book.title}, for {book.recipient}
        </h1>

        <div className="stage" ref={stageRef}>
          <FloatingDoodles show={ready && atStart && !flipping} reducedMotion={reducedMotion} />
          <div
            ref={hostRef}
            className={`book-host ${ready ? "is-ready" : ""}`}
            style={{
              height: bookHeight ?? 0,
              transform: `translate3d(${shift}px, 0, 0)`,
              transition: reducedMotion ? "opacity .2s" : undefined,
            }}
            role="region"
            aria-roledescription="flipbook"
            aria-label={`${book.title}. Use the arrow keys or the buttons below to turn pages.`}
          />
          {!ready && (
            <div className="book-loading" aria-hidden="true">
              <span />
            </div>
          )}

          <div className="book-footer" ref={footerRef}>
        <p className={`hint font-hand ${ready && !hasTurned ? "is-visible" : ""}`} aria-hidden={hasTurned}>
          {hint}
        </p>

        <nav className="controls" aria-label="Book controls">
          <div className="controls__nav">
            <button type="button" className="icon-button icon-button--primary" onClick={prev} disabled={!ready || atStart} aria-label="Previous page">
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
            <div className="controls__status">
              <span aria-live="polite">{status}</span>
              <span className="progress" aria-hidden="true">
                <span style={{ transform: `scaleX(${progress})` }} />
              </span>
            </div>
            <button type="button" className="icon-button icon-button--primary" onClick={next} disabled={!ready || atEnd} aria-label="Next page">
              <ChevronRight aria-hidden="true" size={22} />
            </button>
          </div>

          <div className="controls__tools">
            <button
              type="button"
              className={`text-button ${atStart ? "is-hidden" : ""}`}
              onClick={() => goTo(0)}
              disabled={!ready || atStart}
              aria-hidden={atStart}
              aria-label="Back to cover"
            >
              <BookOpen aria-hidden="true" size={17} />
              <span>Back to cover</span>
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={() => setSound((s) => !s)}
              aria-pressed={sound}
              aria-label={sound ? "Turn page sound off" : "Turn page sound on"}
              title={sound ? "Sound on" : "Sound off"}
            >
              {sound ? <Volume2 aria-hidden="true" size={18} /> : <VolumeX aria-hidden="true" size={18} />}
            </button>
            {fsSupported && (
              <button
                type="button"
                className="icon-button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit full screen" : "View full screen"}
                title={isFullscreen ? "Exit full screen" : "Full screen"}
              >
                {isFullscreen ? <Minimize2 aria-hidden="true" size={18} /> : <Maximize2 aria-hidden="true" size={18} />}
              </button>
            )}
            <button type="button" className="icon-button" onClick={copyLink} aria-label="Copy link to this book" title="Copy link">
              <Link2 aria-hidden="true" size={18} />
            </button>
          </div>
        </nav>
          </div>
        </div>

        <div className="toast-region" aria-live="polite">
          <AnimatePresence>
            {toast && (
              <motion.p
                className="toast"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
              >
                {toast}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {celebration !== null && !reducedMotion && <Celebration key={celebration} confetti={book.confetti} />}

        <Lightbox
          state={lightbox}
          onClose={() => setLightbox(null)}
          onIndex={(index) => setLightbox((l) => (l ? { ...l, index } : l))}
          reducedMotion={reducedMotion}
        />

        {nodes?.map((node, i) =>
          createPortal(<FlipPage page={pages[i]} index={i} total={total} />, node, pages[i].id),
        )}
      </main>
    </BookContext.Provider>
  );
}
