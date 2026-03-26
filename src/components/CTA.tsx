"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import DownloadButton from "./DownloadButton";

// SVG sport icons — crisp vector, brand colors, no emoji blur
const SPORT_ICONS = [
  {
    label: "Basketball",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="24" cy="24" r="19" />
        <path d="M5 24h38" />
        <path d="M24 5v38" />
        <path d="M9.5 9.5 Q16 16 16 24 Q16 32 9.5 38.5" />
        <path d="M38.5 9.5 Q32 16 32 24 Q32 32 38.5 38.5" />
      </svg>
    ),
    color: "var(--color-coral)", size: 44, x: "6%",  y: "22%", delay: 0,   dur: 5.2,
  },
  {
    label: "Baseball",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="24" cy="24" r="19" />
        <path d="M14 11 Q18 18 18 24 Q18 30 14 37" />
        <path d="M34 11 Q30 18 30 24 Q30 30 34 37" />
      </svg>
    ),
    color: "var(--color-teal)", size: 36, x: "84%", y: "20%", delay: 1.2, dur: 6.0,
  },
  {
    label: "Football",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <ellipse cx="24" cy="24" rx="18" ry="13" />
        <line x1="24" y1="11" x2="24" y2="37" />
        <line x1="16" y1="20" x2="32" y2="20" />
        <line x1="16" y1="24" x2="32" y2="24" />
        <line x1="16" y1="28" x2="32" y2="28" />
      </svg>
    ),
    color: "var(--color-coral)", size: 40, x: "10%", y: "70%", delay: 0.8, dur: 5.5,
  },
  {
    label: "Soccer",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="19" />
        <polygon points="24,13 29,19 27,25 21,25 19,19" fill="currentColor" opacity="0.25" />
        <line x1="19" y1="19" x2="9"  y2="23" />
        <line x1="29" y1="19" x2="39" y2="23" />
        <line x1="27" y1="25" x2="31" y2="35" />
        <line x1="21" y1="25" x2="17" y2="35" />
      </svg>
    ),
    color: "var(--color-teal)", size: 38, x: "88%", y: "66%", delay: 1.5, dur: 4.8,
  },
  {
    label: "Stats",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="8" y1="40" x2="40" y2="40" />
        <rect x="11" y="28" width="7" height="12" rx="1.5" fill="currentColor" opacity="0.35" />
        <rect x="20" y="18" width="7" height="22" rx="1.5" fill="currentColor" opacity="0.55" />
        <rect x="29" y="10" width="7" height="30" rx="1.5" fill="currentColor" opacity="0.75" />
      </svg>
    ),
    color: "var(--color-coral)", size: 36, x: "23%", y: "11%", delay: 2.0, dur: 6.5,
  },
  {
    label: "Target",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="24" cy="24" r="19" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="24" cy="24" r="5" fill="currentColor" opacity="0.45" />
        <line x1="24" y1="5"  x2="24" y2="43" strokeWidth="0.9" opacity="0.35" />
        <line x1="5"  y1="24" x2="43" y2="24" strokeWidth="0.9" opacity="0.35" />
      </svg>
    ),
    color: "var(--color-teal)", size: 40, x: "76%", y: "80%", delay: 0.5, dur: 5.0,
  },
  {
    label: "Trophy",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8 L30 8 L30 24 Q30 33 24 35 Q18 33 18 24 Z" />
        <path d="M18 12 Q10 12 10 20 Q10 27 18 27" />
        <path d="M30 12 Q38 12 38 20 Q38 27 30 27" />
        <line x1="24" y1="35" x2="24" y2="41" />
        <line x1="16" y1="41" x2="32" y2="41" />
      </svg>
    ),
    color: "var(--color-coral)", size: 34, x: "3%",  y: "45%", delay: 1.8, dur: 5.8,
  },
  {
    label: "Lightning",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M27 5 L13 27 L23 27 L21 43 L35 21 L25 21 Z" fill="currentColor" opacity="0.2" />
        <path d="M27 5 L13 27 L23 27 L21 43 L35 21 L25 21 Z" />
      </svg>
    ),
    color: "var(--color-teal)", size: 34, x: "90%", y: "42%", delay: 0.3, dur: 4.8,
  },
];

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const glitchVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const letterReveal = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.04,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const line1 = "STOP GUESSING.";
  const line2 = "START KNOWING.";

  return (
    <section
      id="download"
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* Top divider */}
      <motion.div
        className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/30 to-transparent origin-center"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
      />

      {/* Background glows — very subtle so text stays sharp */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full bg-[var(--color-coral)] opacity-[0.04] blur-[280px]" />
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] rounded-full bg-[var(--color-teal)] opacity-[0.025] blur-[240px]" />

      {/* Sport icon field — crisp SVG, smooth float, no rotation blur */}
      {SPORT_ICONS.map((el) => (
        <motion.div
          key={el.label}
          className="absolute pointer-events-none select-none"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            color: el.color,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: 0.55,
                  y: [0, -14, 0],
                }
              : {}
          }
          transition={{
            opacity: { duration: 1.2, delay: el.delay },
            y: {
              duration: el.dur,
              delay: el.delay + 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {el.svg}
        </motion.div>
      ))}

      <div ref={ref} className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Animated heading with letter reveal */}
        <div className="mb-4 overflow-hidden" style={{ perspective: "600px" }}>
          <div className="flex flex-wrap justify-center">
            {line1.split("").map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                custom={i}
                variants={letterReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] inline-block"
                style={{
                  fontFamily: "var(--font-heading)",
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mb-8 overflow-hidden" style={{ perspective: "600px" }}>
          <div className="flex flex-wrap justify-center">
            {line2.split("").map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                custom={i + line1.length}
                variants={letterReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] inline-block gradient-text"
                style={{
                  fontFamily: "var(--font-heading)",
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          variants={glitchVariants}
          initial="hidden"
          animate={controls}
          className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto mb-12"
        >
          AI-powered predictions. Real-time scores. Everything you need — free to start.
        </motion.p>

        <DownloadButton />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-sm text-[var(--color-text-muted)]"
        >
          Free to download &bull; No credit card required &bull; Upgrade anytime
        </motion.p>
      </div>
    </section>
  );
}
