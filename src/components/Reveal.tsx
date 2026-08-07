"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { EASE } from "@/lib/site";

/**
 * SSR-safe reduced-motion flag. useReducedMotion() is null at build time but
 * true on a reduced-motion client's first render, which changes rendered
 * markup and breaks hydration against the static export. Always render the
 * non-reduced tree first, then swap after mount.
 */
export function useReducedSafe() {
  const prefers = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(!!prefers), [prefers]);
  return reduced;
}

/**
 * SSR-safe desktop flag (min-width: 1024px) for choosing between the
 * pinned cinematic scenes and their stacked mobile fallbacks. False on
 * the server and first client render, so both trees hydrate identically.
 */
export function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

const MOTION_TAGS = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

/**
 * Masked line reveal — each line slides up from behind an overflow mask.
 * The container (not the translated line) is observed: a line translated
 * 110% is fully clipped by its overflow-hidden mask and would never
 * intersect, so whileInView must live on the wrapper.
 */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
  as = "div",
  once = true,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: keyof typeof MOTION_TAGS;
  once?: boolean;
}) {
  const reduced = useReducedSafe();
  const MotionTag = MOTION_TAGS[as];
  const lineVariants = {
    hidden: reduced ? { opacity: 0 } : { y: "110%" },
    visible: reduced
      ? { opacity: 1, transition: { duration: 0.6 } }
      : { y: "0%", transition: { duration: 0.9, ease: EASE } },
  };
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Simple fade-up reveal for body copy and UI blocks. */
export function Fade({
  children,
  className = "",
  delay = 0,
  y = 16,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduced = useReducedSafe();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section eyebrow row — glowing serif index + title left, terminal meta right. */
export function Eyebrow({
  index,
  title,
  meta,
  className = "",
}: {
  index: string;
  title: string;
  meta?: string;
  className?: string;
}) {
  return (
    <Fade
      className={`col-span-12 mb-10 flex items-baseline justify-between border-t border-line pt-4 lg:mb-14 ${className}`}
    >
      <span className="flex items-baseline gap-3">
        <span className="glow-ice font-led text-lg tracking-[0.1em] tabular sm:text-xl">
          CH {index}
        </span>
        <span className="glow-serif font-serif text-lg italic sm:text-xl">
          · {title}
        </span>
      </span>
      {meta ? (
        <span className="hidden font-led text-base tracking-[0.08em] text-l4 sm:inline">
          {meta}
        </span>
      ) : null}
    </Fade>
  );
}
