/*
 * ─────────────────────────────────────────────────────────────
 *  A Little Book of Memories — content file
 * ─────────────────────────────────────────────────────────────
 *
 *  This is the only file you need to edit.
 *
 *  ✏️  marks text you should replace with your own words.
 *  📷  marks a photo. Put the file in `public/photos/` and keep
 *      the name here the same (e.g. "/photos/sandral-01.jpg").
 *  🎬  marks a video. Put the file in `public/videos/`.
 *
 *  Until a photo or video file exists, the book shows a soft
 *  placeholder instead, so nothing ever looks broken.
 *
 *  Pages appear in the order they're listed below. To remove a
 *  page, delete its block (from `{` to `},`) or add
 *  `hidden: true`. To add a page, copy a block and change the
 *  `id` to something new.
 *
 *  Tips:
 *  • Text goes between "double quotes". If your text contains a
 *    double quote, write it as \" instead.
 *  • Every block ends with a comma.
 *  • The book always needs an even number of pages, so a plain
 *    end-paper page is added automatically when needed.
 */

import type { BookPage, BookSettings } from "@/lib/types";

export const book: BookSettings = {
  title: "A Little Book of Memories",
  recipient: "Sandral",
  sender: "Germaine",
  description: "Snippets of Sandral, made with 𐙚⋆°｡⋆♡  by Germaine.",
  confetti: true, // set to false to turn off the confetti on the last page
};

export const pages: BookPage[] = [
  // ── Page 1 · Front cover ──────────────────────────────────
  {
    id: "cover",
    type: "cover",
    title: "For Sandral",
    subtitle: "The truest woman to herself ♡",
    quote: "You're like the coconut of the island, it's not tropical without you",
    signature: "Made with love, Germaine",
  },

  // ── Page 2 · Opening letter ───────────────────────────────
  {
    id: "opening-letter",
    type: "letter",
    style: "opening",
    heading: "Dear Sandral,",
    paragraphs: [
      // ✏️ Replace these three paragraphs with your own letter.
      "Hewwo Sandral, I decided to give you smtg digital where you can bookmark and view anytime whenever u miss us!.",
      "All these photos were moments I cherished and I wanted to let you know how happy I am here whenever ure around",
      "Feel feel to walk through memory lane... and im so gonna miss u.",
    ],
    signoff: "(₌ ᵕ̣̣̣̣̣ ᆽ ᵕ̣̣̣̣̣₌) Germaine ♡",
  },

  // ── Page 3 · Our Memories (3–4 photos) ────────────────────
  {
    id: "our-memories",
    type: "photo-collage",
    layout: "scatter",
    title: "Our Memories",
    photos: [
      // 📷 ✏️ Replace the file names and captions.
      { src: "/photos/sandral-01.jpg", caption: "The whole gang ♡", alt: "Ur bday and were quite shy about it" },
      { src: "/photos/sandral-02.jpg", caption: "Office selfie o'clock", alt: "IDK why we had this photo but look at our chin2 smell" },
      { src: "/photos/sandral-03.jpg", caption: "Team lunch ♡", alt: "I remembered u insisted walking in KL and everyone has to be dragged by u" },
      { src: "/photos/sandral-04.jpg", caption: "Us, being us", alt: "Purple hair era Sandral <3" },
    ],
  },

  // ── Page 4 · The Little Things ────────────────────────────
  {
    id: "little-things",
    type: "notes",
    title: "The Little Things",
    notes: [
      // ✏️ Replace the text after each heading.
      {
        heading: "Things I'll always remember…",
        text: "How you are always caring for others (altho u put up a tough jiejie vibe).",
      },
      {
        heading: "Our funniest moments…",
        text: "For some reason you always say me and Erina being siao zabo but u r our #1 siao zb",
      },
      {
        heading: "What makes you special…",
        text: "You notice people and youuuu care.",
      },
    ],
  },

  // ── Page 5 · Photo Memories (3 overlapping Polaroids) ─────
  {
    id: "photo-memories",
    type: "photo-collage",
    layout: "trio",
    title: "Photo Memories",
    photos: [
      // 📷 ✏️
      { src: "/photos/sandral-05.jpg", caption: "Karaoke superstar", alt: "Always the singing kween" },
      { src: "/photos/sandral-06.jpg", caption: "I forgot why we have these", alt: "But look at us being ladiesssss" },
      { src: "/photos/sandral-07.jpg", caption: "Bukit Timah!!!", alt: "This is actually my 1st time spending/talking more to u" },
    ],
     note: "I remembered that you lended me ur shoulder to cry on, I feel so safe. Thank you.", // ✏️ optional
  },

  // ── Page 6 · A Little Video Memory ────────────────────────
  {
    id: "video-1",
    type: "video",
    title: "The Bday Girl Surprise",
    video: {
      // 🎬 Put your video at public/videos/sandral-memory-1.mp4
      src: "/videos/sandral-memory-1.mp4",
      // 📷 Optional still image shown before it plays
      poster: "/videos/sandral-memory-1-poster.jpg",
      caption: "Sneaking up with cake ♡ Press play",
    },
  },

  // ── Page 7 · More Moments ─────────────────────────────────
  {
    id: "more-moments",
    type: "moments",
    title: "More Moments",
    // ✏️ A quote, a saying you two shared, or remove these lines
    quote: {
      text: "Everyday with you - makes everyday worth it.",
      by: "The Chinchin mei mei",
    },
    photos: [
      // 📷 ✏️ Up to two photos
      { src: "/photos/sandral-08.jpg", caption: "Us at Erina's wedding", alt: "So happy to see you here" },
      { src: "/photos/sandral-09.jpg", caption: "Supermodel pose", alt: "Two friends posing together on a wooden boardwalk" },
    ],
    note: "Sandral, you are reminder of what's being authentic and how ur energy brings joy to all of us.", // ✏️
  },

  // ── Page 8 · Another Video Memory (optional) ──────────────
  // This page hides itself until public/videos/sandral-memory-2.mp4 exists.
  {
    id: "video-2",
    type: "video",
    title: "Queennnn vibe",
    hideIfMissing: true,
    video: {
      src: "/videos/sandral-memory-2.mp4", // 🎬
      poster: "/videos/sandral-memory-2-poster.jpg",
      caption: "Always the diva",
    },
  },

  // ── Page 9 · What I'll Miss ───────────────────────────────
  {
    id: "what-ill-miss",
    type: "handwritten-note",
    heading: "Things won't be quite the same without you.",
    paragraphs: [
      // ✏️ Your longer personal message goes here.
      "I'll miss all the carrots u offered, the casual cheeky comments during middle of the office.",
      "Thank you for your kindness, your patience, and every time you show you cared.",
    ],
    signoff: "Germaine",
  },

  // ── Page 10 · The Next Chapter ────────────────────────────
  {
    id: "next-chapter",
    type: "next-chapter",
    title: "The Next Chapter",
    text: "Here's to new beginnings, unexpected adventures, and all the wonderful things waiting for you.",
    photo: { src: "/photos/sandral-10.jpg", caption: "Onwards ♡", alt: "Friends at a sunny brunch on a leafy terrace" }, // 📷 ✏️
  },

  // ── Page 11 · Final letter ────────────────────────────────
  {
    id: "final-letter",
    type: "letter",
    style: "closing",
    heading: "Before you go,",
    paragraphs: [
      // ✏️ Your closing message.
      "I hope you know how much you've meant to all of us, and to me.",
      "Wherever you go next, they're lucky to have you. Keep being exactly who you are.",
    ],
    signoff: "Always cheering for you, Germaine",
  },

  // ── Page 12 · Back cover ──────────────────────────────────
  {
    id: "back-cover",
    type: "back-cover",
    message: "I'll miss you soo sooooo much ♡",
    footer: "Love you so much ♥︎",
    replayLabel: "Read it again",
  },
];
