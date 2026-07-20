"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const WORDS: { text: string; className: string }[] = [
  { text: "Built", className: "text-l1" },
  { text: "for the", className: "text-l3" },
  { text: "Clutch", className: "text-teal" },
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
  const start = 0.12 + index * 0.16;
  const opacity = useTransform(progress, [start, start + 0.14], [0, 1]);
  const y = useTransform(progress, [start, start + 0.14], [40, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`font-sans text-[13svw] font-black uppercase leading-[0.94] font-wide lg:text-[8svw] ${className}`}
    >
      {text}
    </motion.span>
  );
}

/** Scroll-pinned center statement (after haoqi's "Innovate with purpose"). */
export default function StickyStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (reduced) {
    return (
      <section className="flex min-h-svh flex-col items-center justify-center">
        {WORDS.map((w) => (
          <span
            key={w.text}
            className={`font-sans text-[13svw] font-black uppercase leading-[0.94] font-wide lg:text-[8svw] ${w.className}`}
          >
            {w.text}
          </span>
        ))}
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[260svh]">
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
