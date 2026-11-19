"use client";

import type { ResolvedPage } from "@/lib/types";
import { BackCover, FrontCover } from "./BookCover";
import { Orange, Sparkle } from "./Decorations";
import { ClosingLetter, NotesBoard, OpeningLetter, RuledNote, Snippet } from "./HandwrittenNote";
import { PhotoCollage, Polaroid } from "./PhotoCollage";
import { VideoMemory } from "./VideoMemory";

function PageTitle({ children }: { children: string }) {
  return <h2 className="page-title font-serif">{children}</h2>;
}

function PageContent({ page, index }: { page: ResolvedPage; index: number }) {
  switch (page.type) {
    case "cover":
      return <FrontCover page={page} />;

    case "back-cover":
      return <BackCover page={page} />;

    case "letter":
      return page.style === "closing" ? (
        <ClosingLetter heading={page.heading} paragraphs={page.paragraphs} signoff={page.signoff} />
      ) : (
        <OpeningLetter heading={page.heading} paragraphs={page.paragraphs} signoff={page.signoff} />
      );

    case "photo-collage":
      return (
        <>
          <PageTitle>{page.title}</PageTitle>
          <PhotoCollage photos={page.photos} layout={page.layout} note={page.note} />
        </>
      );

    case "notes":
      return (
        <>
          <PageTitle>{page.title}</PageTitle>
          <NotesBoard notes={page.notes} />
        </>
      );

    case "video":
      return (
        <>
          <PageTitle>{page.title}</PageTitle>
          <VideoMemory video={page.video} pageIndex={index} />
        </>
      );

    case "moments":
      return (
        <>
          <PageTitle>{page.title}</PageTitle>
          <div className="moments">
            {page.quote && (
              <blockquote className="moments__quote">
                <p className="font-serif">“{page.quote.text}”</p>
                {page.quote.by && <footer className="font-hand">— {page.quote.by}</footer>}
              </blockquote>
            )}
            {page.photos.length > 0 && (
              <div className="moments__photos">
                {page.photos.slice(0, 2).map((p, i) => (
                  <Polaroid
                    key={p.src + i}
                    photo={p}
                    photos={page.photos.slice(0, 2)}
                    index={i}
                    width={page.photos.length === 1 ? 52 : 37}
                    rotate={i === 0 ? -3.5 : 3}
                    aspect="1 / 1"
                    tape={i === 0 ? "grid" : "stripes"}
                    style={i === 1 ? { marginTop: "5cqw" } : undefined}
                  />
                ))}
              </div>
            )}
            {page.note && <Snippet rotate={1.5}>{page.note}</Snippet>}
          </div>
        </>
      );

    case "handwritten-note":
      return (
        <div className="miss">
          <h2 className="miss__heading font-serif">{page.heading}</h2>
          <RuledNote paragraphs={page.paragraphs} signoff={page.signoff} />
        </div>
      );

    case "next-chapter":
      return (
        <div className="next-chapter">
          <PageTitle>{page.title}</PageTitle>
          <PhotoCollage photos={[page.photo]} layout="feature" />
          <p className="next-chapter__text font-serif">{page.text}</p>
          <Sparkle className="deco" style={{ width: "7cqw", top: "4cqw", right: "6cqw" }} />
        </div>
      );

    case "blank":
      return (
        <div className="endpaper">
          <Orange className="endpaper__orange" />
        </div>
      );
  }
}

export function FlipPage({ page, index, total }: { page: ResolvedPage; index: number; total: number }) {
  const isCover = page.type === "cover" || page.type === "back-cover";
  return (
    <div className={`page-inner page-inner--${page.type}`}>
      <PageContent page={page} index={index} />
      {!isCover && page.type !== "blank" && (
        <span className="page-number font-hand" aria-hidden="true">
          {index + 1}
        </span>
      )}
      <span className="sr-only">
        Page {index + 1} of {total}
      </span>
    </div>
  );
}
