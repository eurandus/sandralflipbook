/*
 * Small hand-drawn decorations used around the book.
 * All are inline SVG, so there are no image files to lose.
 */
import { useId, type CSSProperties } from "react";

type DecoProps = {
  className?: string;
  style?: CSSProperties;
};

const INK = "#59463D";
const COCOA = "#916A56";

export function Orange({ className, style }: DecoProps) {
  // Each orange needs its own gradient id, or hidden pages break the fill.
  const id = `orange-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#FFD3B6" />
          <stop offset="45%" stopColor="#FFB88C" />
          <stop offset="100%" stopColor="#FFA76C" />
        </radialGradient>
      </defs>
      {/* leaves */}
      <path
        d="M62 30c6-14 20-19 33-16-3 13-15 22-33 16z"
        fill="#C9C79A"
        stroke={COCOA}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M64 29c9-5 17-9 27-12" fill="none" stroke={COCOA} strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M58 30c-5-10-15-13-24-11 3 9 12 14 24 11z"
        fill="#DCD8AC"
        stroke={COCOA}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* fruit, slightly wobbly so it feels drawn */}
      <path
        d="M60 31c25-1 44 17 43 41-1 25-20 41-44 40-24 0-42-18-41-42 1-23 18-38 42-39z"
        fill={`url(#${id})`}
        stroke={COCOA}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M60 31c-1-4 0-8 2-11" fill="none" stroke={COCOA} strokeWidth="2.4" strokeLinecap="round" />
      {/* shine + dimples */}
      <path d="M35 58c3-9 10-15 18-17" fill="none" stroke="#FFF5EC" strokeWidth="4" strokeLinecap="round" opacity=".85" />
      <g fill={COCOA} opacity=".35">
        <circle cx="74" cy="62" r="1.4" />
        <circle cx="82" cy="78" r="1.4" />
        <circle cx="66" cy="90" r="1.4" />
        <circle cx="50" cy="80" r="1.4" />
        <circle cx="88" cy="94" r="1.2" />
      </g>
    </svg>
  );
}

export function Heart({ className, style, filled = true }: DecoProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 40 36" className={className} style={style} aria-hidden="true">
      <path
        d="M20 33C10 25 3 19 3.5 11.5 4 6 8.5 3 13 3.6c3.3.4 5.5 2.6 7 5.4 1.6-3 4-5.1 7.4-5.4 4.6-.4 8.8 3 8.9 8.3.2 7.7-7.3 13.6-16.3 21.1z"
        fill={filled ? "#FFB88C" : "none"}
        stroke={COCOA}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className, style }: DecoProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      <path
        d="M20 3c1.3 9 4.6 13.6 17 17-12.4 3.4-15.7 8-17 17-1.3-9-4.6-13.6-17-17C15.4 16.6 18.7 12 20 3z"
        fill="#FFE8B6"
        stroke={COCOA}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className, style }: DecoProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      <path
        d="M20 4.5l4.4 10 10.8.9-8.3 7 2.6 10.6L20 27.4l-9.5 5.6 2.6-10.6-8.3-7 10.8-.9z"
        fill="none"
        stroke="#FFA76C"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlossomGroup() {
  return (
    <g>
      <g stroke={COCOA} strokeWidth="1.6" fill="#FFFBF6" strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d="M20 20c-5-4-6-11 0-15 6 4 5 11 0 15z" transform={`rotate(${r} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="3.4" fill="#FFA76C" stroke={COCOA} strokeWidth="1.4" />
    </g>
  );
}

/** Orange blossom — five soft petals with an apricot centre */
export function Blossom({ className, style }: DecoProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      <BlossomGroup />
    </svg>
  );
}

export function Sprig({ className, style }: DecoProps) {
  return (
    <svg viewBox="0 0 80 50" className={className} style={style} aria-hidden="true">
      <path d="M4 44C22 36 40 22 74 8" fill="none" stroke={COCOA} strokeWidth="1.8" strokeLinecap="round" />
      <g fill="#DCD8AC" stroke={COCOA} strokeWidth="1.4" strokeLinejoin="round">
        <path d="M22 35c-1-7 3-11 9-12-1 7-4 10-9 12z" />
        <path d="M38 25c-1-7 3-11 9-12-1 7-4 10-9 12z" />
        <path d="M28 33c6 2 10 7 9 12-6-1-9-6-9-12z" />
        <path d="M46 22c6 2 10 6 10 11-6 0-10-5-10-11z" />
      </g>
      <g transform="translate(58 -2) scale(.55)">
        <BlossomGroup />
      </g>
    </svg>
  );
}

export function PaperClip({ className, style }: DecoProps) {
  return (
    <svg viewBox="0 0 24 60" className={className} style={style} aria-hidden="true">
      <path
        d="M16 20v26c0 4-2.6 7-6 7s-6-3-6-7V12c0-5 3.2-8.5 8-8.5S20 7 20 12v30c0 2.6-1.6 4.4-4 4.4S12 44.6 12 42V18"
        fill="none"
        stroke="#A99083"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Squiggle({ className, style }: DecoProps) {
  return (
    <svg viewBox="0 0 120 16" className={className} style={style} aria-hidden="true">
      <path
        d="M3 9c8-7 14 7 22 0s14 7 22 0 14 7 22 0 14 7 22 0 14 7 22 0"
        fill="none"
        stroke="#FFA76C"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Strip of washi tape. Position it with className/style. */
export function Tape({
  className = "",
  style,
  pattern = "stripes",
}: DecoProps & { pattern?: "stripes" | "dots" | "grid" | "plain" }) {
  return <span aria-hidden="true" className={`tape tape--${pattern} ${className}`} style={style} />;
}

export const decoInk = INK;
