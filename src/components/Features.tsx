"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Live Scores",
    description: "Real-time scores across NBA, NFL, MLB, NHL, MLS, EPL, NCAAF, and NCAAB. Always free.",
    tag: "FREE",
    tagColor: "var(--color-green)",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "AI Predictions",
    description: "20 factors analyzed per game — momentum, matchups, rest days, home court, and more.",
    tag: "PRO",
    tagColor: "var(--color-coral)",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Pick Selection",
    description: "Tap a jersey to lock in your pick. Change your mind anytime before tip-off.",
    tag: "FREE",
    tagColor: "var(--color-green)",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Detailed Analysis",
    description: "Elo ratings, point differentials, win streaks, injuries, and edge ratings for every game.",
    tag: "PRO",
    tagColor: "var(--color-coral)",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Profile & Rankings",
    description: "Your picks build your record. Level up from Rookie to GOAT. Track your journey.",
    tag: "FREE",
    tagColor: "var(--color-green)",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Broadcast Info",
    description: "Know exactly where to watch. TV channels and streaming platforms for every game.",
    tag: "FREE",
    tagColor: "var(--color-green)",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative glass-card rounded-2xl p-6 sm:p-8 hover:bg-[var(--color-bg-card-hover)] transition-all duration-500"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--color-coral)]/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Icon + Tag */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-coral)] group-hover:scale-110 group-hover:bg-[var(--color-coral)]/10 transition-all duration-300">
            {feature.icon}
          </div>
          <span
            className="text-xs font-bold tracking-wider px-3 py-1 rounded-full"
            style={{
              color: feature.tagColor,
              background: `color-mix(in srgb, ${feature.tagColor} 10%, transparent)`,
            }}
          >
            {feature.tag}
          </span>
        </div>

        {/* Content */}
        <h3
          className="text-xl font-bold mb-2 text-white group-hover:text-[var(--color-coral)] transition-colors duration-300"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.05em" }}
        >
          {feature.title}
        </h3>
        <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Section divider */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-coral)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] text-[var(--color-coral)] uppercase font-medium">
            Features
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            EVERYTHING YOU NEED
            <br />
            <span className="gradient-text">IN ONE APP</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            From live scores to AI-powered predictions, Clutch Picks gives you the edge.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
