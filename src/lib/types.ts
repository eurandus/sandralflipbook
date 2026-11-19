/*
 * The shapes of everything in src/data/flipbook.ts.
 * You don't need to edit this file to change the book's content.
 */

export type Photo = {
  /** Path inside the `public` folder, e.g. "/photos/sandral-01.jpg" */
  src: string;
  /** Short handwritten caption under the photo (optional) */
  caption?: string;
  /** Describes the photo for screen readers. Falls back to the caption. */
  alt?: string;
  /** Filled in automatically when the site builds. Don't set this yourself. */
  available?: boolean;
};

export type VideoClip = {
  /** Path inside the `public` folder, e.g. "/videos/sandral-memory-1.mp4" */
  src: string;
  /** Still image shown before the video plays (optional) */
  poster?: string;
  /** Handwritten caption under the video (optional) */
  caption?: string;
  /** Filled in automatically when the site builds. */
  available?: boolean;
  /** Filled in automatically when the site builds. */
  posterAvailable?: boolean;
};

type BasePage = {
  /** A unique name for the page. Any short word works. */
  id: string;
  /** Set to true to leave this page out of the book. */
  hidden?: boolean;
};

export type CoverPage = BasePage & {
  type: "cover";
  title: string;
  subtitle: string;
  quote: string;
  signature: string;
};

export type LetterPage = BasePage & {
  type: "letter";
  heading: string;
  paragraphs: string[];
  signoff: string;
  /** "opening" is handwritten; "closing" uses elegant serif type. */
  style?: "opening" | "closing";
};

export type PhotoLayout = "scatter" | "trio" | "pair" | "feature";

export type PhotoCollagePage = BasePage & {
  type: "photo-collage";
  title: string;
  /**
   * scatter: 3–4 Polaroids · trio: 3 overlapping Polaroids
   * pair: 2 side by side · feature: 1 large photo
   */
  layout: PhotoLayout;
  photos: Photo[];
  /** Optional handwritten line at the bottom of the page */
  note?: string;
};

export type NotesPage = BasePage & {
  type: "notes";
  title: string;
  /** 2–3 notes fit best */
  notes: { heading: string; text: string }[];
};

export type VideoPage = BasePage & {
  type: "video";
  title: string;
  video: VideoClip;
  /** Leave the page out automatically if the video file isn't there yet */
  hideIfMissing?: boolean;
};

export type MomentsPage = BasePage & {
  type: "moments";
  title: string;
  quote?: { text: string; by?: string };
  /** Up to 2 photos */
  photos: Photo[];
  note?: string;
};

export type HandwrittenNotePage = BasePage & {
  type: "handwritten-note";
  heading: string;
  paragraphs: string[];
  signoff?: string;
};

export type NextChapterPage = BasePage & {
  type: "next-chapter";
  title: string;
  text: string;
  photo: Photo;
};

export type BackCoverPage = BasePage & {
  type: "back-cover";
  message: string;
  footer: string;
  replayLabel: string;
};

/** Added automatically when the book needs an even number of pages. */
export type BlankPage = BasePage & { type: "blank" };

export type BookPage =
  | CoverPage
  | LetterPage
  | PhotoCollagePage
  | NotesPage
  | VideoPage
  | MomentsPage
  | HandwrittenNotePage
  | NextChapterPage
  | BackCoverPage;

export type ResolvedPage = BookPage | BlankPage;

export type BookSettings = {
  title: string;
  recipient: string;
  sender: string;
  /** Short description used when the link is shared in chat apps */
  description: string;
  /** Pastel confetti when the last page is reached */
  confetti: boolean;
};
