"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Open the App",
    description:
      "See today's games across all 8 leagues — NBA, NFL, MLB, NHL, MLS, EPL, NCAAF, and NCAAB.",
  },
  {
    number: "02",
    title: "Review AI Analysis",
    description:
      "Each game gets a full breakdown — 20 factors, confidence rating, and a clear prediction.",
  },
  {
    number: "03",
    title: "Make Your Pick",
    description:
      "Tap the jersey of the team you think wins. Change it anytime before the game starts.",
  },
  {
    number: "04",
    title: "Track Your Record",
    description:
      "Watch your stats grow. Level up from Rookie to GOAT as your accuracy climbs.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] text-[var(--color-teal)] uppercase font-medium">
            How It Works
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SIMPLE AS{" "}
            <span className="gradient-text">1-2-3-4</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[var(--color-coral)]/30 via-[var(--color-teal)]/30 to-[var(--color-coral)]/30" />

          {steps.map((step, i) => {
            const stepRef = useRef(null);
            const stepInView = useInView(stepRef, { once: true, margin: "-50px" });

            return (
              <motion.div
                key={step.number}
                ref={stepRef}
                initial={{ opacity: 0, y: 40 }}
                animate={stepInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative text-center"
              >
                {/* Number circle */}
                <div className="relative mx-auto w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-coral)] to-[var(--color-teal)] opacity-20 blur-lg" />
                  <div className="relative w-full h-full rounded-full gradient-border bg-[var(--color-bg)] flex items-center justify-center">
                    <span
                      className="text-2xl font-bold gradient-text"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.05em" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
