"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedSafe } from "./Reveal";

const WORDS: { text: string; className: string }[] = [
  { text: "Built", className: "glow-serif-strong" },
  { text: "for the", className: "italic text-l3" },
  { text: "Clutch", className: "glow-ice italic" },
];

function Word({
  text,
  className,
  progress,
  index,
}: {
  text: string;
  className: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.1 + index * 0.13;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const y = useTransform(progress, [start, start + 0.12], [40, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`font-serif text-[13svw] font-semibold leading-[1.02] tracking-tight lg:text-[8svw] ${className}`}
    >
      {text}
    </motion.span>
  );
}

/** Scroll-pinned center statement (after haoqi's "Innovate with purpose"). */
export default function StickyStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (reduced) {
    return (
      <section
        id="signoff"
        className="flex min-h-svh flex-col items-center justify-center"
      >
        {WORDS.map((w) => (
          <span
            key={w.text}
            className={`font-serif text-[13svw] font-semibold leading-[1.02] tracking-tight lg:text-[8svw] ${w.className}`}
          >
            {w.text}
          </span>
        ))}
      </section>
    );
  }

  return (
    <div ref={ref} id="signoff" className="relative h-[190svh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center">
        {WORDS.map((w, i) => (
          <Word
            key={w.text}
            text={w.text}
            className={w.className}
            progress={scrollYProgress}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
