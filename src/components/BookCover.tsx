"use client";

import { RotateCcw } from "lucide-react";
import type { BackCoverPage, CoverPage } from "@/lib/types";
import { useBook, useNoFlip } from "./BookContext";
import { Blossom, Heart, Orange, Sparkle, Sprig } from "./Decorations";

export function FrontCover({ page }: { page: CoverPage }) {
  return (
    <div className="cover cover--front">
      <Sprig className="deco" style={{ width: "26cqw", top: "6cqw", left: "9cqw", transform: "rotate(-8deg)" }} />
      <Blossom className="deco" style={{ width: "8cqw", top: "9cqw", right: "13cqw" }} />
      <Blossom className="deco" style={{ width: "5cqw", top: "19cqw", right: "22cqw", transform: "rotate(20deg)" }} />

      <div className="cover__label">
        <Orange className="cover__orange" />
        <h1 className="cover__title font-serif">{page.title}</h1>
        <p className="cover__subtitle font-hand">{page.subtitle}</p>
        <p className="cover__quote font-serif">“{page.quote}”</p>
      </div>

      <p className="cover__signature font-hand">{page.signature}</p>
      <Sparkle className="deco" style={{ width: "6cqw", bottom: "16cqw", right: "12cqw" }} />
      <Heart className="deco" style={{ width: "5cqw", bottom: "10cqw", left: "14cqw", transform: "rotate(-12deg)" }} />
    </div>
  );
}

export function BackCover({ page }: { page: BackCoverPage }) {
  const { goTo } = useBook();
  const ref = useNoFlip<HTMLButtonElement>();
  return (
    <div className="cover cover--back">
      <div className="cover__back-center">
        <Heart className="cover__back-heart" />
        <p className="cover__back-message font-serif">{page.message}</p>
        <button ref={ref} type="button" className="replay-button" onClick={() => goTo(0)}>
          <RotateCcw aria-hidden="true" size={16} strokeWidth={2} />
          {page.replayLabel}
        </button>
      </div>
      <p className="cover__signature font-hand">{page.footer}</p>
      <Blossom className="deco" style={{ width: "7cqw", top: "10cqw", left: "12cqw" }} />
      <Sprig className="deco" style={{ width: "22cqw", bottom: "20cqw", right: "8cqw", transform: "scaleX(-1) rotate(-6deg)" }} />
    </div>
  );
}
