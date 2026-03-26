"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import DownloadButton from "./DownloadButton";

const floatingElements = [
  { icon: "🏀", size: 36, x: "8%", y: "15%", delay: 0, duration: 5 },
  { icon: "⚾", size: 28, x: "85%", y: "20%", delay: 1.2, duration: 6 },
  { icon: "🏈", size: 32, x: "12%", y: "75%", delay: 0.8, duration: 5.5 },
  { icon: "⚽", size: 30, x: "90%", y: "70%", delay: 1.5, duration: 4.5 },
  { icon: "🏒", size: 26, x: "25%", y: "10%", delay: 2, duration: 6.5 },
  { icon: "📊", size: 28, x: "78%", y: "85%", delay: 0.5, duration: 5 },
  { icon: "🎯", size: 32, x: "5%", y: "45%", delay: 1.8, duration: 5.8 },
  { icon: "🔥", size: 26, x: "92%", y: "45%", delay: 0.3, duration: 4.8 },
];

const statsCards = [
  { label: "87% CONF", value: "+4.5", x: "3%", y: "30%", delay: 0.6, duration: 5.5 },
  { label: "ACCURACY", value: "92%", x: "88%", y: "35%", delay: 1.4, duration: 6 },
  { label: "PICK", value: "W", x: "6%", y: "65%", delay: 1.0, duration: 5 },
  { label: "VALUE", value: "A+", x: "85%", y: "60%", delay: 2.2, duration: 6.2 },
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
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/30 to-transparent" />

      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full bg-[var(--color-coral)] opacity-[0.06] blur-[250px]" />
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] rounded-full bg-[var(--color-teal)] opacity-[0.04] blur-[200px]" />

      {/* Floating emoji elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: el.x,
            top: el.y,
            fontSize: el.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.25, 0.15, 0.25],
                  scale: 1,
                  y: [0, -15, 0, -15],
                  rotate: [0, 5, -3, 5],
                }
              : {}
          }
          transition={{
            opacity: { duration: 2, delay: el.delay, repeat: Infinity, repeatType: "reverse" },
            scale: { duration: 0.6, delay: el.delay },
            y: { duration: el.duration, delay: el.delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            rotate: { duration: el.duration * 1.2, delay: el.delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Floating stat cards */}
      {statsCards.map((card, i) => (
        <motion.div
          key={`stat-${i}`}
          className="absolute pointer-events-none hidden sm:block"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.4, 0.25, 0.4],
                  scale: 1,
                  y: [0, -10, 0, -10],
                }
              : {}
          }
          transition={{
            opacity: { duration: 3, delay: card.delay, repeat: Infinity, repeatType: "reverse" },
            scale: { duration: 0.5, delay: card.delay },
            y: { duration: card.duration, delay: card.delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          }}
        >
          <div className="glass-card rounded-lg px-3 py-2 text-center border border-white/5">
            <div
              className="text-[10px] tracking-wider text-[var(--color-text-muted)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {card.label}
            </div>
            <div
              className="text-sm font-bold text-[var(--color-coral)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {card.value}
            </div>
          </div>
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
                className="text-[2.5rem] sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] inline-block"
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
