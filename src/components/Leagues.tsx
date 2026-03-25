"use client";

import { motion, useInView } from "framer-motion";
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
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

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

      {/* League grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {leagues.map((league, i) => (
            <motion.div
              key={league.name}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group cursor-default"
            >
              {/* Card */}
              <div
                className="relative rounded-2xl border border-white/[0.06] bg-[#080c10]/80 backdrop-blur-sm p-6 sm:p-8 text-center transition-all duration-400 overflow-hidden"
                style={{
                  borderColor:
                    hoveredIndex === i
                      ? `${league.color}40`
                      : "rgba(255,255,255,0.06)",
                  boxShadow:
                    hoveredIndex === i
                      ? `0 0 40px ${league.color}15, inset 0 1px 0 ${league.color}20`
                      : "none",
                }}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${league.color}10 0%, transparent 70%)`,
                  }}
                />

                {/* League name */}
                <span
                  className="relative text-4xl sm:text-5xl md:text-6xl font-bold transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color:
                      hoveredIndex === i
                        ? league.color
                        : hoveredIndex !== null
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.5)",
                  }}
                >
                  {league.name}
                </span>

                {/* Accent line */}
                <div
                  className="mt-4 mx-auto h-[2px] rounded-full transition-all duration-400"
                  style={{
                    width: hoveredIndex === i ? "40px" : "20px",
                    backgroundColor:
                      hoveredIndex === i ? league.color : "rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
