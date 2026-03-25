"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const leagues = [
  { name: "NBA", full: "National Basketball Association", color: "#E8936A" },
  { name: "NFL", full: "National Football League", color: "#7A9DB8" },
  { name: "MLB", full: "Major League Baseball", color: "#4ADE80" },
  { name: "NHL", full: "National Hockey League", color: "#8eb0c8" },
  { name: "MLS", full: "Major League Soccer", color: "#f0a580" },
  { name: "EPL", full: "English Premier League", color: "#E8936A" },
  { name: "NCAAF", full: "College Football", color: "#7A9DB8" },
  { name: "NCAAB", full: "College Basketball", color: "#4ADE80" },
];

export default function Leagues() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-6"
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

      {/* Top marquee — scrolls left */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-left">
          {[...leagues, ...leagues, ...leagues].map((league, i) => (
            <div
              key={`top-${i}`}
              className="flex-shrink-0 mx-3 sm:mx-5 group"
            >
              <div
                className="relative rounded-2xl border border-white/[0.06] bg-[#080c10]/80 backdrop-blur-sm px-8 sm:px-12 py-5 sm:py-6 flex items-center gap-4 sm:gap-6 transition-all duration-500 hover:border-opacity-40"
                style={{
                  ["--league-color" as string]: league.color,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${league.color}12 0%, transparent 70%)`,
                    boxShadow: `inset 0 1px 0 ${league.color}25, 0 0 30px ${league.color}10`,
                  }}
                />

                <span
                  className="relative text-5xl sm:text-6xl md:text-7xl font-bold text-white/40 group-hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {league.name}
                </span>
                <span
                  className="relative text-xs sm:text-sm text-[var(--color-text-muted)]/50 group-hover:text-[var(--color-text-muted)] transition-colors duration-300 whitespace-nowrap hidden sm:block"
                >
                  {league.full}
                </span>

                {/* Color dot */}
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: league.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom marquee — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-right">
          {[...leagues.slice(4), ...leagues.slice(0, 4), ...leagues, ...leagues.slice(4), ...leagues.slice(0, 4)].map((league, i) => (
            <div
              key={`bot-${i}`}
              className="flex-shrink-0 mx-3 sm:mx-5 group"
            >
              <div
                className="relative rounded-2xl border border-white/[0.06] bg-[#080c10]/80 backdrop-blur-sm px-8 sm:px-12 py-5 sm:py-6 flex items-center gap-4 sm:gap-6 transition-all duration-500 hover:border-opacity-40"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${league.color}12 0%, transparent 70%)`,
                    boxShadow: `inset 0 1px 0 ${league.color}25, 0 0 30px ${league.color}10`,
                  }}
                />

                <span
                  className="relative text-5xl sm:text-6xl md:text-7xl font-bold text-white/40 group-hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {league.name}
                </span>
                <span
                  className="relative text-xs sm:text-sm text-[var(--color-text-muted)]/50 group-hover:text-[var(--color-text-muted)] transition-colors duration-300 whitespace-nowrap hidden sm:block"
                >
                  {league.full}
                </span>

                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: league.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: scroll-left 30s linear infinite;
        }
        .marquee-left:hover {
          animation-play-state: paused;
        }
        .marquee-right {
          animation: scroll-right 35s linear infinite;
        }
        .marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
