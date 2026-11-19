"use client";

import { AnimatePresence, motion } from "motion/react";
import { Blossom, Heart, Orange, Sparkle, Star } from "./Decorations";

const DOODLES = [
  { C: Orange, left: "8%", top: "14%", size: 54, rot: -12, dur: 7 },
  { C: Sparkle, left: "18%", top: "70%", size: 26, rot: 0, dur: 6 },
  { C: Heart, left: "85%", top: "18%", size: 28, rot: 10, dur: 8 },
  { C: Orange, left: "88%", top: "66%", size: 40, rot: 14, dur: 9 },
  { C: Star, left: "6%", top: "44%", size: 24, rot: 8, dur: 7.5 },
  { C: Blossom, left: "78%", top: "84%", size: 26, rot: -6, dur: 6.5 },
];

/** A few orange doodles drifting around the closed book. */
export function FloatingDoodles({ show, reducedMotion }: { show: boolean; reducedMotion: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="doodles"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
          {DOODLES.map(({ C, left, top, size, rot, dur }, i) => (
            <motion.div
              key={i}
              className="doodles__item"
              style={{ left, top, width: size }}
              initial={{ rotate: rot }}
              animate={reducedMotion ? { rotate: rot } : { y: [0, -10, 0], rotate: [rot, rot + 6, rot] }}
              transition={reducedMotion ? { duration: 0 } : { duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              <C />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
