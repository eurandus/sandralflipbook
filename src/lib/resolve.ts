import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { BookPage, Photo, ResolvedPage, VideoClip } from "./types";

const PUBLIC_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), "public");

/**
 * Finds a file in /public, forgiving a missing leading slash and
 * upper/lower-case differences (e.g. IMG_01.JPG vs img_01.jpg),
 * which matter once the site is on Vercel.
 * Returns the correctly-cased public path, or null if missing.
 */
function findPublicFile(src?: string): string | null {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;

  const clean = src.trim().replace(/^\/+/, "");
  const segments = clean.split("/").filter(Boolean);
  let dir = PUBLIC_DIR;
  const resolved: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    let entries: string[];
    try {
      entries = fs.readdirSync(/*turbopackIgnore: true*/ dir);
    } catch {
      return null;
    }
    const wanted = decodeURIComponent(segments[i]);
    const match =
      entries.find((e) => e === wanted) ??
      entries.find((e) => e.toLowerCase() === wanted.toLowerCase());
    if (!match) return null;
    resolved.push(match);
    dir = path.join(/*turbopackIgnore: true*/ dir, match);
  }

  try {
    if (!fs.statSync(/*turbopackIgnore: true*/ dir).isFile()) return null;
  } catch {
    return null;
  }
  return "/" + resolved.map(encodeURIComponent).join("/");
}

function resolvePhoto(photo: Photo): Photo {
  const found = findPublicFile(photo.src);
  return {
    ...photo,
    src: found ?? photo.src,
    alt: photo.alt ?? photo.caption ?? "A photo from our time together",
    available: Boolean(found),
  };
}

function resolveVideo(video: VideoClip): VideoClip {
  const found = findPublicFile(video.src);
  const poster = findPublicFile(video.poster);
  return {
    ...video,
    src: found ?? video.src,
    poster: poster ?? undefined,
    available: Boolean(found),
    posterAvailable: Boolean(poster),
  };
}

/* Turns straight quotes typed in flipbook.ts into curly ones: ' → ’, "…" → “…” */
const NOT_TEXT = new Set(["src", "poster", "id", "type", "layout", "style"]);

function smarten(text: string) {
  return text
    .replace(/(^|[\s([{\u2014\u2013-])"/g, "$1\u201C")
    .replace(/"/g, "\u201D")
    .replace(/(^|[\s([{\u2014\u2013-])'/g, "$1\u2018")
    .replace(/'/g, "\u2019");
}

function smartenDeep<T>(value: T, key?: string): T {
  if (typeof value === "string") return (key && NOT_TEXT.has(key) ? value : smarten(value)) as T;
  if (Array.isArray(value)) return value.map((v) => smartenDeep(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, smartenDeep(v, k)]),
    ) as T;
  }
  return value;
}

/** Prepares the pages from flipbook.ts for the book. Runs at build time. */
export function resolvePages(pages: BookPage[]): ResolvedPage[] {
  const seen = new Set<string>();
  const out: ResolvedPage[] = [];

  for (const raw of pages) {
    if (raw.hidden) continue;
    const page = smartenDeep(raw);

    let next: ResolvedPage = page;
    switch (page.type) {
      case "photo-collage":
      case "moments":
        next = { ...page, photos: page.photos.map(resolvePhoto) };
        break;
      case "next-chapter":
        next = { ...page, photo: resolvePhoto(page.photo) };
        break;
      case "video": {
        const video = resolveVideo(page.video);
        if (page.hideIfMissing && !video.available) continue;
        next = { ...page, video };
        break;
      }
    }

    // Keep ids unique so React never mixes pages up.
    let id = next.id || next.type;
    while (seen.has(id)) id += "-x";
    seen.add(id);
    out.push({ ...next, id });
  }

  // A physical book has an even number of pages. If needed, add a
  // plain end-paper just before the back cover (or at the end).
  if (out.length % 2 === 1) {
    const blank: ResolvedPage = { id: "endpaper", type: "blank" };
    const last = out[out.length - 1];
    if (last && last.type === "back-cover") out.splice(out.length - 1, 0, blank);
    else out.push(blank);
  }

  return out;
}
