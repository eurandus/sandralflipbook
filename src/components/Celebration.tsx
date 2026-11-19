"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Heart } from "./Decorations";

const COLOURS = ["#FFD3B6", "#FFB88C", "#FFA76C", "#FFE8B6", "#FFF5EC", "#FFFFFF"];

/** Gentle pastel confetti, drawn on a canvas and removed after a few seconds. */
function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    c.scale(dpr, dpr);

    const pieces = Array.from({ length: 110 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * w * 0.5,
      y: h * 0.35 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 10 - 4,
      size: Math.random() * 7 + 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      colour: COLOURS[Math.floor(Math.random() * COLOURS.length)],
      round: Math.random() < 0.35,
    }));

    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame++;
      c.clearRect(0, 0, w, h);
      const fade = frame > 150 ? Math.max(0, 1 - (frame - 150) / 60) : 1;
      for (const p of pieces) {
        p.vy += 0.22;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        c.save();
        c.globalAlpha = fade;
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.fillStyle = p.colour;
        c.strokeStyle = "rgba(145,106,86,.35)";
        c.lineWidth = 1;
        if (p.round) {
          c.beginPath();
          c.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
          c.fill();
          c.stroke();
        } else {
          c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          c.strokeRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        c.restore();
      }
      if (fade > 0) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="celebration__confetti" aria-hidden="true" />;
}

/** Shown once each time the reader reaches the last page. */
export function Celebration({ confetti }: { confetti: boolean }) {
  const hearts = [
    { x: -60, d: 0, s: 26 },
    { x: 10, d: 0.25, s: 34 },
    { x: 70, d: 0.5, s: 22 },
    { x: -20, d: 0.8, s: 18 },
  ];
  return (
    <div className="celebration" aria-hidden="true">
      {confetti && <Confetti />}
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="celebration__heart"
          style={{ width: h.s, marginLeft: h.x }}
          initial={{ opacity: 0, y: 30, scale: 0.6 }}
          animate={{ opacity: [0, 1, 1, 0], y: -160, scale: 1, rotate: i % 2 ? 10 : -10 }}
          transition={{ duration: 2.6, delay: h.d, ease: "easeOut" }}
        >
          <Heart />
        </motion.div>
      ))}
    </div>
  );
}
