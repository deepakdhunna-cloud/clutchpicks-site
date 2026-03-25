"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const leagues = [
  "NBA",
  "NFL",
  "MLB",
  "NHL",
  "MLS",
  "EPL",
  "NCAAF",
  "NCAAB",
];

export default function Leagues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <p className="text-center text-sm text-[var(--color-text-muted)] mb-8 tracking-wider uppercase">
          Covering every major league
        </p>

        {/* Scrolling marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

          <div className="flex animate-marquee">
            {[...leagues, ...leagues, ...leagues].map((league, i) => (
              <div
                key={`${league}-${i}`}
                className="flex-shrink-0 mx-6 sm:mx-10"
              >
                <span
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/10 hover:text-white/30 transition-colors duration-500 cursor-default"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {league}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
