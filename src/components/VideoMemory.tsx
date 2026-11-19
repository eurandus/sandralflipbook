"use client";

import { useState, type CSSProperties } from "react";
import { Clapperboard } from "lucide-react";
import type { VideoClip } from "@/lib/types";
import { useBook, useNoFlip } from "./BookContext";
import { Tape } from "./Decorations";

/**
 * A video styled like a photo taped into the scrapbook.
 * - Never autoplays; native controls.
 * - Only fetches anything once its page is close to being opened.
 * - Paused automatically when the page turns (handled in FlipBook).
 */
export function VideoMemory({ video, pageIndex }: { video: VideoClip; pageIndex: number }) {
  const { current } = useBook();
  // Presses on the video never turn the page (mouse or touch).
  const ref = useNoFlip<HTMLDivElement>();
  const [ratio, setRatio] = useState(16 / 9);
  const near = Math.abs(current - pageIndex) <= 2;

  return (
    <figure className="video-memory">
      <div
        ref={ref}
        data-noflip
        className="video-memory__frame"
        style={{ "--ar": ratio } as CSSProperties}
      >
        <Tape pattern="stripes" className="tape--video-left" />
        <Tape pattern="dots" className="tape--video-right" />
        <div className="video-memory__screen">
          {video.available ? (
            <video
              controls
              playsInline
              preload={near ? "metadata" : "none"}
              poster={video.posterAvailable ? video.poster : undefined}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
              }}
              aria-label={video.caption ? `Video: ${video.caption}` : "Video memory"}
            >
              <source src={video.src} type={video.src.toLowerCase().endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
              Your browser can’t play this video.
            </video>
          ) : (
            <div className="video-memory__placeholder">
              <Clapperboard aria-hidden="true" strokeWidth={1.6} />
              <span className="font-hand">video goes here</span>
              <span className="photo-placeholder__file">{decodeURIComponent(video.src.split("/").pop() ?? "")}</span>
            </div>
          )}
        </div>
      </div>
      {video.caption && <figcaption className="video-memory__caption font-hand">{video.caption}</figcaption>}
    </figure>
  );
}
