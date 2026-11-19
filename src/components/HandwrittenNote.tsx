import type { CSSProperties, ReactNode } from "react";
import { Heart, Orange, PaperClip, Sparkle, Squiggle, Star, Tape } from "./Decorations";

/** Opening letter: handwritten on the page, held by a paper clip. */
export function OpeningLetter({
  heading,
  paragraphs,
  signoff,
}: {
  heading: string;
  paragraphs: string[];
  signoff: string;
}) {
  return (
    <div className="letter letter--opening">
      <PaperClip className="deco" style={{ width: "5.5cqw", top: "-3cqw", right: "10cqw", transform: "rotate(8deg)" }} />
      <h2 className="letter__greeting font-hand">{heading}</h2>
      <div className="letter__body font-hand">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="letter__signoff font-hand">{signoff}</p>
      <Squiggle className="deco" style={{ width: "26cqw", left: "0", bottom: "1cqw", opacity: 0.8 }} />
    </div>
  );
}

/** Final letter: quieter, set in serif with lots of air. */
export function ClosingLetter({
  heading,
  paragraphs,
  signoff,
}: {
  heading: string;
  paragraphs: string[];
  signoff: string;
}) {
  return (
    <div className="letter letter--closing">
      <Orange className="letter__orange" />
      <h2 className="letter__closing-heading font-serif">{heading}</h2>
      <div className="letter__closing-body font-serif">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="letter__closing-signoff font-hand">{signoff}</p>
    </div>
  );
}

const NOTE_STYLES: { kind: "sticky" | "snippet"; color: string; rot: number; shift: string; tape: "stripes" | "dots" | "grid" | null }[] = [
  { kind: "sticky", color: "#FFE8B6", rot: -2.5, shift: "0cqw", tape: null },
  { kind: "snippet", color: "#FFFDF9", rot: 1.8, shift: "9cqw", tape: "stripes" },
  { kind: "sticky", color: "#FFD3B6", rot: -1.2, shift: "2cqw", tape: "dots" },
];

/** "The Little Things": sticky notes and torn paper snippets. */
export function NotesBoard({ notes }: { notes: { heading: string; text: string }[] }) {
  return (
    <div className="notes-board">
      {notes.slice(0, 3).map((n, i) => {
        const s = NOTE_STYLES[i % NOTE_STYLES.length];
        return (
          <div
            key={i}
            className={`note note--${s.kind}`}
            style={{ "--rot": `${s.rot}deg`, "--note-bg": s.color, marginLeft: s.shift } as CSSProperties}
          >
            {s.tape && <Tape pattern={s.tape} className="tape--on-top" />}
            <p className="note__heading font-hand">{n.heading}</p>
            <p className="note__text font-hand">{n.text}</p>
          </div>
        );
      })}
      <Star className="deco" style={{ width: "8cqw", right: "4cqw", top: "2cqw", transform: "rotate(12deg)" }} />
      <Heart className="deco" style={{ width: "7cqw", right: "10cqw", bottom: "6cqw", transform: "rotate(8deg)" }} />
    </div>
  );
}

/** "What I'll Miss": a longer note on ruled paper. */
export function RuledNote({
  paragraphs,
  signoff,
}: {
  paragraphs: string[];
  signoff?: string;
}) {
  return (
    <div className="ruled-note">
      <Tape pattern="grid" className="tape--on-top" />
      <div className="ruled-note__lines font-hand">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {signoff && <p className="ruled-note__signoff">{signoff} ♡</p>}
      </div>
      <Sparkle className="deco" style={{ width: "7cqw", right: "-2cqw", bottom: "-3cqw" }} />
    </div>
  );
}

/** Small torn-paper note used on mixed pages. */
export function Snippet({ children, rotate = -1.5 }: { children: ReactNode; rotate?: number }) {
  return (
    <div className="note note--snippet note--small" style={{ "--rot": `${rotate}deg`, "--note-bg": "#FFFDF9" } as CSSProperties}>
      <p className="note__text font-hand">{children}</p>
    </div>
  );
}
