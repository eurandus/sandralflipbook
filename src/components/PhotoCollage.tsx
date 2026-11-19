"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Photo, PhotoLayout } from "@/lib/types";
import { useBook, useNoFlip } from "./BookContext";
import { Heart, Sparkle, Tape } from "./Decorations";

/* ─── Photo or placeholder ─────────────────────────────────── */

const PLACEHOLDER_TONES = [
  ["#FFE8B6", "#FFD3B6"],
  ["#FFD3B6", "#FFB88C"],
  ["#FFF0DD", "#FFE8B6"],
  ["#FFE1CC", "#FFC9A6"],
];

function fileName(src: string) {
  return decodeURIComponent(src.split("/").pop() ?? src);
}

/** Soft illustrated stand-in shown until the real photo is added. */
export function PhotoPlaceholder({ src, tone = 0 }: { src: string; tone?: number }) {
  const [a, b] = PLACEHOLDER_TONES[tone % PLACEHOLDER_TONES.length];
  return (
    <div className="photo-placeholder" style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}>
      <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle cx="72" cy="22" r="9" fill="#FFF5EC" opacity=".85" />
        <path d="M0 70V48c14-10 26-12 38-4s22 6 34-4 22-8 28-4v34z" fill="#FFF5EC" opacity=".55" />
        <path d="M0 70V58c18-8 34-8 50-2s32 4 50-4v18z" fill="#FFF5EC" opacity=".8" />
      </svg>
      <span className="photo-placeholder__label">
        <span className="font-hand">photo goes here</span>
        <span className="photo-placeholder__file">{fileName(src)}</span>
      </span>
    </div>
  );
}

export function PhotoImage({
  photo,
  sizes,
  tone = 0,
}: {
  photo: Photo;
  sizes: string;
  tone?: number;
}) {
  if (!photo.available) return <PhotoPlaceholder src={photo.src} tone={tone} />;
  return (
    <Image
      src={photo.src}
      alt={photo.alt ?? ""}
      fill
      sizes={sizes}
      quality={75}
      unoptimized={/^https?:/i.test(photo.src)}
      className="object-cover"
      draggable={false}
    />
  );
}

/* ─── Polaroid ─────────────────────────────────────────────── */

type PolaroidProps = {
  photo: Photo;
  photos: Photo[];
  index: number;
  /** Width as a share of the page width (cqw) */
  width: number;
  rotate?: number;
  aspect?: string;
  tape?: "stripes" | "dots" | "grid" | "plain" | null;
  tapeSide?: "top" | "corner";
  style?: CSSProperties;
  sizes?: string;
};

export function Polaroid({
  photo,
  photos,
  index,
  width,
  rotate = 0,
  aspect = "1 / 1",
  tape = "stripes",
  tapeSide = "top",
  style,
  sizes = "(max-width: 640px) 60vw, 280px",
}: PolaroidProps) {
  const { openPhoto } = useBook();
  // Mouse presses open the photo; a swipe that starts here can still turn the page.
  const ref = useNoFlip<HTMLButtonElement>({ touch: false });
  const label = photo.caption
    ? `Open photo: ${photo.caption}`
    : `Open photo ${index + 1} of ${photos.length}`;

  return (
    <button
      ref={ref}
      type="button"
      className="polaroid"
      aria-label={label}
      onClick={() => openPhoto(photos, index)}
      style={{ width: `${width}cqw`, "--rot": `${rotate}deg`, ...style } as CSSProperties}
    >
      {tape && (
        <Tape
          pattern={tape}
          className={tapeSide === "top" ? "tape--on-top" : "tape--on-corner"}
        />
      )}
      <span className="polaroid__photo" style={{ aspectRatio: aspect }}>
        <PhotoImage photo={photo} sizes={sizes} tone={index} />
      </span>
      <span className="polaroid__caption font-hand">{photo.caption ?? "\u00a0"}</span>
    </button>
  );
}

/* ─── Collage layouts ──────────────────────────────────────── */

type Slot = { left?: string; right?: string; top: string; w: number; rot: number; z?: number; tape?: PolaroidProps["tape"] };

const SCATTER: Slot[] = [
  { left: "0%", top: "1%", w: 44, rot: -4, tape: "stripes" },
  { right: "0%", top: "5%", w: 42, rot: 3.5, tape: "dots" },
  { left: "3%", top: "53%", w: 42, rot: 2.5, tape: "grid", z: 2 },
  { right: "1%", top: "56%", w: 43, rot: -3, tape: "stripes" },
];

const SCATTER_THREE: Slot[] = [
  { left: "0%", top: "1%", w: 45, rot: -4, tape: "stripes" },
  { right: "0%", top: "6%", w: 43, rot: 3.5, tape: "dots" },
  { left: "24%", top: "54%", w: 47, rot: -1.5, tape: "grid", z: 2 },
];

const TRIO: Slot[] = [
  { left: "0%", top: "7%", w: 46, rot: -7, tape: "dots" },
  { right: "0%", top: "0%", w: 45, rot: 5, tape: "stripes" },
  { left: "22%", top: "37%", w: 48, rot: -1, tape: "grid", z: 3 },
];

export function PhotoCollage({
  photos,
  layout,
  note,
}: {
  photos: Photo[];
  layout: PhotoLayout;
  note?: string;
}) {
  if (photos.length === 0) return null;

  if (layout === "feature") {
    return (
      <div className="collage collage--feature">
        <Polaroid photo={photos[0]} photos={photos} index={0} width={68} rotate={-1.5} aspect="4 / 3" sizes="(max-width: 640px) 85vw, 420px" />
        {note && <p className="collage__note font-hand">{note}</p>}
      </div>
    );
  }

  if (layout === "pair") {
    return (
      <div className="collage collage--pair">
        <div className="collage__pair-row">
          {photos.slice(0, 2).map((p, i) => (
            <Polaroid
              key={p.src + i}
              photo={p}
              photos={photos}
              index={i}
              width={40}
              rotate={i === 0 ? -3 : 2.5}
              aspect="4 / 5"
              tape={i === 0 ? "stripes" : "dots"}
              style={i === 1 ? { marginTop: "6cqw" } : undefined}
            />
          ))}
        </div>
        {note && <p className="collage__note font-hand">{note}</p>}
      </div>
    );
  }

  const shown = layout === "trio" ? photos.slice(0, 3) : photos.slice(0, 4);
  const slots = layout === "trio" ? TRIO : shown.length === 4 ? SCATTER : SCATTER_THREE;

  return (
    <div className={`collage collage--${layout}`}>
      <div className="collage__field">
        {shown.map((p, i) => {
          const s = slots[i] ?? slots[0];
          return (
            <Polaroid
              key={p.src + i}
              photo={p}
              photos={shown}
              index={i}
              width={s.w}
              rotate={s.rot}
              tape={s.tape}
              aspect={layout === "scatter" ? "4 / 3" : "1 / 1"}
              style={{ position: "absolute", left: s.left, right: s.right, top: s.top, zIndex: s.z ?? 1 }}
            />
          );
        })}
        {layout === "scatter" && <Heart className="deco" style={{ width: "7cqw", left: "45%", top: "47%", zIndex: 4, transform: "rotate(-10deg)" }} />}
        {layout === "trio" && <Sparkle className="deco" style={{ width: "7cqw", right: "4%", bottom: "8%", zIndex: 4 }} />}
      </div>
      {note && <p className="collage__note font-hand">{note}</p>}
    </div>
  );
}
