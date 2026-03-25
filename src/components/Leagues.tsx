"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";

const leagues = [
  { name: "NBA", color: "#E8936A" },
  { name: "NFL", color: "#7A9DB8" },
  { name: "MLB", color: "#4ADE80" },
  { name: "NHL", color: "#8eb0c8" },
  { name: "MLS", color: "#f0a580" },
  { name: "EPL", color: "#E8936A" },
  { name: "NCAAF", color: "#7A9DB8" },
  { name: "NCAAB", color: "#4ADE80" },
];

export default function Leagues() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background glow that follows hover */}
      <motion.div
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-coral)]/[0.04] blur-[150px]" />
      </motion.div>

      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 sm:mb-20 px-6"
      >
        <span className="text-sm tracking-[0.2em] text-[var(--color-teal)] uppercase font-medium">
          Full Coverage
        </span>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          EVERY MAJOR <span className="gradient-text">LEAGUE</span>
        </h2>
      </motion.div>

      {/* Stacked league names */}
      <div className="relative max-w-7xl mx-auto px-6">
        {leagues.map((league, i) => (
          <LeagueRow
            key={league.name}
            league={league}
            index={i}
            total={leagues.length}
            scrollYProgress={scrollYProgress}
            isHovered={hoveredIndex === i}
            anyHovered={hoveredIndex !== null}
            onHover={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

function LeagueRow({
  league,
  index,
  total,
  scrollYProgress,
  isHovered,
  anyHovered,
  onHover,
  onLeave,
}: {
  league: { name: string; color: string };
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isHovered: boolean;
  anyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  // Each row shifts horizontally at a different rate for parallax
  const direction = index % 2 === 0 ? 1 : -1;
  const intensity = 30 + (index % 3) * 15;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [direction * intensity, -direction * intensity]
  );

  // Stagger from alternating sides
  const entryX = index % 2 === 0 ? -80 : 80;

  // Base opacity varies to create depth
  const baseOpacity = anyHovered
    ? isHovered
      ? 1
      : 0.08
    : 0.12 + (index % 3) * 0.06;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: entryX }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ x }}
      className="relative flex items-center justify-center -my-3 sm:-my-4 md:-my-5 cursor-default select-none"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Glow layer behind text */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.25 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-full h-full max-w-4xl rounded-full blur-[60px]"
          style={{ backgroundColor: league.color }}
        />
      </motion.div>

      {/* League name */}
      <motion.span
        animate={{
          opacity: baseOpacity,
          scale: isHovered ? 1.05 : 1,
          letterSpacing: isHovered ? "0.08em" : "0.02em",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[10rem] font-bold leading-[0.85] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-heading)",
          color: isHovered ? league.color : "white",
          textShadow: isHovered
            ? `0 0 80px ${league.color}66, 0 0 160px ${league.color}33`
            : "none",
        }}
      >
        {league.name}
      </motion.span>

      {/* Horizontal accent line on hover */}
      <motion.div
        animate={{
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-32 origin-center"
        style={{
          background: `linear-gradient(90deg, transparent, ${league.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}
