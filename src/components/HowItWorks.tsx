"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const steps = [
  {
    number: "01",
    title: "Open the App",
    description:
      "See today's games across all 8 leagues",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="16" y="8" width="48" height="64" rx="8" stroke="url(#g1)" strokeWidth="2" />
        <rect x="24" y="20" width="32" height="6" rx="2" fill="url(#g1)" opacity="0.6" />
        <rect x="24" y="30" width="32" height="6" rx="2" fill="url(#g1)" opacity="0.4" />
        <rect x="24" y="40" width="32" height="6" rx="2" fill="url(#g1)" opacity="0.3" />
        <rect x="24" y="50" width="32" height="6" rx="2" fill="url(#g1)" opacity="0.2" />
        <circle cx="40" cy="66" r="3" stroke="url(#g1)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="80" y2="80">
            <stop stopColor="var(--color-coral)" />
            <stop offset="1" stopColor="var(--color-teal)" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Review AI Analysis",
    description:
      "Each game gets a full breakdown — 20 factors, confidence rating, and prediction",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="28" stroke="url(#g2)" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="40" cy="40" r="18" stroke="url(#g2)" strokeWidth="1.5" />
        <path d="M40 22 L40 40 L54 48" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="40" r="3" fill="url(#g2)" />
        <circle cx="58" cy="24" r="4" stroke="url(#g2)" strokeWidth="1.5" />
        <path d="M56 22 L60 26" stroke="url(#g2)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="80" y2="80">
            <stop stopColor="var(--color-coral)" />
            <stop offset="1" stopColor="var(--color-teal)" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Make Your Pick",
    description:
      "Tap the jersey of the team you think wins",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <path
          d="M28 20 L20 28 L20 40 L26 40 L26 60 L54 60 L54 40 L60 40 L60 28 L52 20 L46 26 L34 26 L28 20Z"
          stroke="url(#g3)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M34 26 L34 18 Q40 14 46 18 L46 26" stroke="url(#g3)" strokeWidth="1.5" />
        <circle cx="40" cy="42" r="6" stroke="url(#g3)" strokeWidth="1.5" />
        <path d="M37.5 42 L39 43.5 L42.5 40" stroke="url(#g3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2="80" y2="80">
            <stop stopColor="var(--color-coral)" />
            <stop offset="1" stopColor="var(--color-teal)" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Track Your Record",
    description:
      "Watch your stats grow. Level up from Rookie to GOAT",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <path d="M16 60 L30 40 L42 48 L56 24 L64 28" stroke="url(#g4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="56" cy="24" r="4" fill="url(#g4)" opacity="0.3" stroke="url(#g4)" strokeWidth="1.5" />
        <path d="M16 64 L64 64" stroke="url(#g4)" strokeWidth="1.5" opacity="0.3" />
        <path d="M16 16 L16 64" stroke="url(#g4)" strokeWidth="1.5" opacity="0.3" />
        <path d="M50 18 L56 12 L62 18" stroke="url(#g4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="g4" x1="0" y1="0" x2="80" y2="80">
            <stop stopColor="var(--color-coral)" />
            <stop offset="1" stopColor="var(--color-teal)" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const panelWidth = el.scrollWidth / steps.length;
    const index = Math.round(scrollLeft / panelWidth);
    setActiveIndex(Math.min(index, steps.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const panelWidth = el.scrollWidth / steps.length;
    el.scrollTo({ left: panelWidth * index, behavior: "smooth" });
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/20 to-transparent" />

      {/* Parallax background orbs */}
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-[var(--color-coral)]/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--color-teal)]/[0.03] blur-[100px]" />
      </motion.div>

      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 px-6"
      >
        <span className="text-sm tracking-[0.2em] text-[var(--color-teal)] uppercase font-medium">
          How It Works
        </span>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SIMPLE AS <span className="gradient-text">1-2-3-4</span>
        </h2>
      </motion.div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="flex-shrink-0 snap-center w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[50vw] px-4 sm:px-6"
            style={{ marginLeft: i === 0 ? "calc((100vw - 85vw) / 2)" : undefined }}
          >
            <StepPanel step={step} index={i} activeIndex={activeIndex} />
          </div>
        ))}
        {/* Right spacer for last card centering */}
        <div
          className="flex-shrink-0"
          style={{ width: "calc((100vw - 85vw) / 2)" }}
        />
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-3 mt-10">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className="relative group p-1"
            aria-label={`Go to step ${i + 1}`}
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: activeIndex === i ? 32 : 8,
                height: 8,
                background:
                  activeIndex === i
                    ? "linear-gradient(135deg, var(--color-coral), var(--color-teal))"
                    : "rgba(255,255,255,0.15)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </button>
        ))}
      </div>

      {/* Hide scrollbar globally for this component */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function StepPanel({
  step,
  index,
  activeIndex,
}: {
  step: (typeof steps)[number];
  index: number;
  activeIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isActive = index === activeIndex;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="relative rounded-3xl border border-white/[0.04] overflow-hidden bg-[var(--color-bg-card)] p-8 sm:p-10 md:p-12 h-full min-h-[420px] flex flex-col">
        {/* Active border overlay — opacity-only transition, no repaint per frame */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-3xl border border-[rgba(122,157,184,0.2)] pointer-events-none"
          style={{ willChange: "opacity" }}
        />
        {/* Background gradient glow when active */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--color-coral)]/[0.06] blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[var(--color-teal)]/[0.04] blur-[80px]" />
        </motion.div>

        {/* Top row: step number + icon */}
        <div className="relative flex items-start justify-between mb-8">
          {/* Large step number */}
          <div className="relative">
            <span
              className="text-[7rem] sm:text-[8rem] md:text-[9rem] font-bold leading-none gradient-text opacity-20"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {step.number}
            </span>
            {/* Glow behind number when active */}
            <motion.div
              animate={{ opacity: isActive ? 0.4 : 0.15 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 blur-2xl bg-gradient-to-br from-[var(--color-coral)] to-[var(--color-teal)]"
              style={{ zIndex: -1 }}
            />
          </div>

          {/* Animated icon */}
          <motion.div
            animate={{
              scale: isActive ? 1 : 0.85,
              opacity: isActive ? 1 : 0.4,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-16 h-16 sm:w-20 sm:h-20 mt-4"
          >
            {step.icon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative mt-auto">
          <h3
            className="text-2xl sm:text-3xl font-bold mb-3 tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step.title}
          </h3>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-md">
            {step.description}
          </p>
        </div>

        {/* Decorative bottom line */}
        <motion.div
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-teal)] to-transparent origin-left"
          style={{ willChange: "transform" }}
        />
      </div>
    </motion.div>
  );
}
