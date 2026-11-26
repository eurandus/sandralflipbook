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
  description: "A little book of memories for Sandral, made with love by Germaine.",
  confetti: true, // set to false to turn off the confetti on the last page
};

export const pages: BookPage[] = [
  // ── Page 1 · Front cover ──────────────────────────────────
  {
    id: "cover",
    type: "cover",
    title: "A Little Book of Memories",
    subtitle: "For Sandral ♡",
    quote: "Some people make ordinary workdays extraordinary.",
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
      "I wanted to give you something you could keep, so I made you a little book.",
      "Inside are some of the moments I'm grateful for: the busy days, the quiet ones, and all the small things that felt lighter because you were there.",
      "Take your time with it. There's a lot of love tucked in these pages.",
    ],
    signoff: "With lots of love, Germaine ♡",
  },

  // ── Page 3 · Our Memories (3–4 photos) ────────────────────
  {
    id: "our-memories",
    type: "photo-collage",
    layout: "scatter",
    title: "Our Memories",
    photos: [
      // 📷 ✏️ Replace the file names and captions.
      { src: "/photos/sandral-01.jpg", caption: "The whole gang ♡", alt: "The team gathered around a desk, celebrating with a box of treats" },
      { src: "/photos/sandral-02.jpg", caption: "Office selfie o'clock", alt: "Two colleagues taking a happy selfie in the office" },
      { src: "/photos/sandral-03.jpg", caption: "Team lunch ♡", alt: "The team smiling around a long lunch table" },
      { src: "/photos/sandral-04.jpg", caption: "Us, being us", alt: "Two friends smiling in a selfie at the office" },
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
        text: "How you always made time to help, even on your busiest days.",
      },
      {
        heading: "Our funniest moments…",
        text: "The conversations that started as work and somehow ended in laughter.",
      },
      {
        heading: "What makes you special…",
        text: "You notice people. You make everyone around you feel seen.",
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
      { src: "/photos/sandral-05.jpg", caption: "Karaoke superstar 🎤", alt: "Striking a dramatic pose in a karaoke room" },
      { src: "/photos/sandral-06.jpg", caption: "Self-care break ✨", alt: "Three friends wearing under-eye patches, posing for a selfie" },
      { src: "/photos/sandral-07.jpg", caption: "We made it to the top! ⛰️", alt: "A group selfie at the Bukit Timah Summit marker after a hike" },
    ],
    // note: "A handwritten line can go here", // ✏️ optional
  },

  // ── Page 6 · A Little Video Memory ────────────────────────
  {
    id: "video-1",
    type: "video",
    title: "A Little Video Memory",
    video: {
      // 🎬 Put your video at public/videos/sandral-memory-1.mp4
      src: "/videos/sandral-memory-1.mp4",
      // 📷 Optional still image shown before it plays
      poster: "/videos/sandral-memory-1-poster.jpg",
      caption: "Press play ♡", // ✏️
    },
  },

  // ── Page 7 · More Moments ─────────────────────────────────
  {
    id: "more-moments",
    type: "moments",
    title: "More Moments",
    // ✏️ A quote, a saying you two shared, or remove these lines
    quote: {
      text: "The days were long, but they were better together.",
      by: "Me, about us",
    },
    photos: [
      // 📷 ✏️ Up to two photos
      { src: "/photos/sandral-08.jpg", caption: "Twinning in sage 🌿", alt: "Two friends smiling in a selfie under fairy lights at an evening party" },
      { src: "/photos/sandral-09.jpg", caption: "Striking a pose", alt: "Two friends posing together on a wooden boardwalk" },
    ],
    note: "Write a little memory or reflection here.", // ✏️
  },

  // ── Page 8 · Another Video Memory (optional) ──────────────
  // This page hides itself until public/videos/sandral-memory-2.mp4 exists.
  {
    id: "video-2",
    type: "video",
    title: "Another Video Memory",
    hideIfMissing: true,
    video: {
      src: "/videos/sandral-memory-2.mp4", // 🎬
      poster: "/videos/sandral-memory-2-poster.jpg",
      caption: "One more for the road", // ✏️
    },
  },

  // ── Page 9 · What I'll Miss ───────────────────────────────
  {
    id: "what-ill-miss",
    type: "handwritten-note",
    heading: "Things won't be quite the same without you.",
    paragraphs: [
      // ✏️ Your longer personal message goes here.
      "I'll miss our little check-ins, the way you made hard days feel manageable, and how you always found something to smile about.",
      "Thank you for your kindness, your patience, and every time you said \"we'll figure it out\" and we did.",
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
    message: "Not goodbye, just see you around ♡",
    footer: "Made with love, Germaine 🍊",
    replayLabel: "Read it again",
  },
];
