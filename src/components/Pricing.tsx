"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DownloadButton from "./DownloadButton";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/clutch-picks/id6759183746";

const freeFeatures = [
  "Live scores across 8 leagues",
  "Complete schedules & box scores",
  "Broadcasting info (TV & streaming)",
  "Pick creation & tracking",
  "Profile stats card",
  '"My Arena" game following',
];

const proFeatures = [
  "Everything in Free, plus:",
  "AI winner predictions with confidence %",
  "Complete 20-factor breakdown",
  "Score & outcome projections",
  "Performance & matchup ratings",
  "Full pick history access",
];

function AnimatedCheck({
  inView,
  delay,
  color,
}: {
  inView: boolean;
  delay: number;
  color: string;
}) {
  return (
    <svg
      className="w-5 h-5 mt-0.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2.5}
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

function LockedFeature({ feature }: { feature: string }) {
  return (
    <div className="flex items-start gap-3 opacity-40">
      <svg
        className="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-text-muted)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
      <span className="text-sm text-[var(--color-text-muted)] line-through">
        {feature}
      </span>
    </div>
  );
}

export default function Pricing() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const freeCardRef = useRef(null);
  const freeCardInView = useInView(freeCardRef, { once: true, margin: "-50px" });
  const proCardRef = useRef(null);
  const proCardInView = useInView(proCardRef, { once: true, margin: "-50px" });

  const proOnlyFeatures = proFeatures.slice(1); // skip "Everything in Free, plus:"

  return (
    <section id="pricing" className="relative py-28 sm:py-36">
      {/* Top divider */}
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[var(--color-coral)]/20 to-transparent" />

      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-coral)] opacity-[0.03] blur-[250px]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--color-teal)] opacity-[0.03] blur-[200px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.25em] text-[var(--color-coral)] uppercase font-medium">
            Pricing
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4 mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            START FREE.{" "}
            <span className="gradient-text">GO PRO.</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto text-lg">
            No commitment. No credit card required. Upgrade when you&apos;re ready
            for the full AI advantage.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* FREE Card */}
          <motion.div
            ref={freeCardRef}
            initial={{ opacity: 0, x: -40 }}
            animate={freeCardInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl p-8 sm:p-10"
          >
            <div className="mb-8">
              <h3
                className="text-xl font-bold tracking-wider mb-4 text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                FREE
              </h3>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-6xl font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  $0
                </span>
                <span className="text-[var(--color-text-muted)] text-lg">
                  forever
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mt-3">
                Everything you need to follow your favorite games.
              </p>
            </div>

            {/* Free features with animated checks */}
            <ul className="space-y-4 mb-8">
              {freeFeatures.map((feature, i) => (
                <li key={feature} className="flex items-start gap-3">
                  <AnimatedCheck
                    inView={freeCardInView}
                    delay={0.3 + i * 0.1}
                    color="var(--color-green)"
                  />
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* What you're missing */}
            <div className="border-t border-white/5 pt-6 mb-8">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-4 font-medium">
                Upgrade to unlock
              </p>
              <div className="space-y-3">
                {proOnlyFeatures.map((feature) => (
                  <LockedFeature key={feature} feature={feature} />
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <DownloadButton size="small" />
            </div>
          </motion.div>

          {/* PRO Card */}
          <motion.div
            ref={proCardRef}
            initial={{ opacity: 0, x: 40, y: -10 }}
            animate={proCardInView ? { opacity: 1, x: 0, y: -10 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Animated gradient border wrapper */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[var(--color-coral)] via-[var(--color-teal)] to-[var(--color-coral)] bg-[length:200%_200%] animate-[borderShift_4s_ease_infinite] opacity-80" />

            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--color-coral)] to-[var(--color-teal)] opacity-[0.08] blur-xl" />

            <div className="relative rounded-2xl bg-[var(--color-bg-card)] p-8 sm:p-10 pro-inner-glow overflow-hidden">
              {/* Shimmer overlay */}
              <div className="absolute inset-0 animate-shimmer rounded-2xl pointer-events-none" />

              {/* Most Popular badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={proCardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute -top-px left-1/2 -translate-x-1/2"
              >
                <span className="px-6 py-1.5 rounded-b-lg bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-teal)] text-black text-xs font-bold tracking-widest">
                  MOST POPULAR
                </span>
              </motion.div>

              <div className="mb-8 mt-4">
                <h3
                  className="text-xl font-bold tracking-wider mb-4 text-[var(--color-coral)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  CLUTCH PRO
                </h3>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-6xl font-bold gradient-text"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    $4.99
                  </span>
                  <span className="text-[var(--color-text-muted)] text-lg">
                    /month
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mt-3">
                  The full AI advantage. Cancel anytime.
                </p>
              </div>

              {/* Pro features with animated checks */}
              <ul className="space-y-4 mb-8">
                {proFeatures.map((feature, i) => (
                  <li key={feature} className="flex items-start gap-3">
                    <AnimatedCheck
                      inView={proCardInView}
                      delay={0.4 + i * 0.12}
                      color="var(--color-coral)"
                    />
                    <span
                      className={`text-sm ${
                        i === 0
                          ? "text-[var(--color-text-muted)]"
                          : "text-white/90 font-medium"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* AI Advantage callout */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={proCardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="rounded-xl bg-gradient-to-br from-[var(--color-coral)]/10 to-[var(--color-teal)]/5 border border-[var(--color-coral)]/15 p-4 mb-8"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-coral)] font-medium">
                      AI-Powered Advantage
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      20-factor analysis on every game. Stay ahead of the competition.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-center">
                <DownloadButton size="small" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-sm text-[var(--color-text-muted)] mt-12"
        >
          Both plans available on the App Store &bull; Cancel Pro anytime &bull; No hidden fees
        </motion.p>
      </div>
    </section>
  );
}
