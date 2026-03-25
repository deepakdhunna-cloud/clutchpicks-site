"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

/* ───────────────────────────── Animated Visuals ───────────────────────────── */

/** Mini scoreboard that ticks through scores */
function LiveScoreVisual() {
  const games = [
    { away: "LAL", home: "BOS", awayScore: 104, homeScore: 108, quarter: "4Q", time: "2:14" },
    { away: "GSW", home: "MIA", awayScore: 97, homeScore: 95, quarter: "3Q", time: "5:42" },
    { away: "NYK", home: "CHI", awayScore: 88, homeScore: 91, quarter: "3Q", time: "8:01" },
  ];

  const [ticks, setTicks] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((prev) =>
        prev.map(() => (Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0))
      );
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 space-y-2.5 w-full">
      {games.map((g, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-between rounded-lg px-3 py-2 text-xs"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.15 }}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-white/90 font-semibold w-8">{g.away}</span>
            <span className="text-white font-bold tabular-nums w-7 text-right">
              {g.awayScore + ticks[i]}
            </span>
          </div>
          <div className="flex flex-col items-center px-3">
            <span className="text-[var(--color-green)] text-[10px] font-bold">{g.quarter}</span>
            <span className="text-white/40 text-[10px]">{g.time}</span>
          </div>
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="text-white font-bold tabular-nums w-7 text-left">
              {g.homeScore + (ticks[i] > 1 ? 2 : 0)}
            </span>
            <span className="text-white/90 font-semibold w-8 text-right">{g.home}</span>
          </div>
        </motion.div>
      ))}
      <div className="flex justify-center gap-1.5 pt-1">
        {["NBA", "NFL", "MLB", "NHL", "MLS", "EPL"].map((league) => (
          <span
            key={league}
            className="text-[9px] tracking-wider text-white/25 font-medium px-1.5 py-0.5 rounded bg-white/[0.03]"
          >
            {league}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Animated confidence gauge */
function AIPredictionVisual() {
  const confidence = useMotionValue(0);
  const smoothConfidence = useTransform(confidence, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(confidence, 87, {
      duration: 2,
      delay: 1,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = smoothConfidence.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [confidence, smoothConfidence]);

  const factors = [
    { label: "Elo Rating", value: 92 },
    { label: "Momentum", value: 78 },
    { label: "Rest Days", value: 85 },
    { label: "Matchups", value: 71 },
    { label: "Home Court", value: 88 },
  ];

  return (
    <div className="mt-6 w-full flex flex-col items-center gap-5">
      {/* Circular gauge */}
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--color-coral)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - 0.87) }}
            transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white tabular-nums">{display}%</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">confidence</span>
        </div>
      </div>
      {/* Factor bars */}
      <div className="w-full space-y-2">
        {factors.map((f, i) => (
          <div key={f.label} className="flex items-center gap-2 text-[11px]">
            <span className="text-white/50 w-16 text-right shrink-0">{f.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--color-coral)" }}
                initial={{ width: 0 }}
                animate={{ width: `${f.value}%` }}
                transition={{ duration: 1.2, delay: 1.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────── Feature Data ──────────────────────────────── */

interface FeatureData {
  title: string;
  description: string;
  tag: "FREE" | "PRO";
  tagColor: string;
  size: "large" | "medium" | "small";
  visual?: React.ReactNode;
  icon: React.ReactNode;
}

const features: FeatureData[] = [
  {
    title: "Live Scores",
    description:
      "Real-time scores across NBA, NFL, MLB, NHL, MLS, EPL, NCAAF, and NCAAB. Always free.",
    tag: "FREE",
    tagColor: "var(--color-green)",
    size: "large",
    visual: <LiveScoreVisual />,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "AI Predictions",
    description:
      "20 factors analyzed per game — momentum, matchups, rest days, home court, and more.",
    tag: "PRO",
    tagColor: "var(--color-coral)",
    size: "large",
    visual: <AIPredictionVisual />,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "Pick Selection",
    description: "Tap a jersey to lock in your pick. Change your mind anytime before tip-off.",
    tag: "FREE",
    tagColor: "var(--color-green)",
    size: "medium",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Detailed Analysis",
    description:
      "Elo ratings, point differentials, win streaks, injuries, and performance ratings for every game.",
    tag: "PRO",
    tagColor: "var(--color-coral)",
    size: "medium",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Profile & Rankings",
    description: "Your picks build your record. Level up from Rookie to GOAT. Track your journey.",
    tag: "FREE",
    tagColor: "var(--color-green)",
    size: "small",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Broadcast Info",
    description: "Know exactly where to watch. TV channels and streaming platforms for every game.",
    tag: "FREE",
    tagColor: "var(--color-green)",
    size: "small",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
];

/* ─────────────────────────── 3D Tilt Card Wrapper ─────────────────────────── */

function BentoCard({
  feature,
  index,
  className,
}: {
  feature: FeatureData;
  index: number;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-60px" });
  const [hovering, setHovering] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTiltStyle({ rotateX: -y * 8, rotateY: x * 8 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  const isLarge = feature.size === "large";

  return (
    <div ref={inViewRef} className={className} style={{ perspective: "800px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : {}
        }
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          rotateX: tiltStyle.rotateX,
          rotateY: tiltStyle.rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`
          group relative h-full rounded-2xl overflow-hidden
          transition-[box-shadow] duration-500
          ${hovering ? "shadow-[0_0_40px_rgba(122,157,184,0.12),0_0_80px_rgba(122,157,184,0.05)]" : ""}
        `}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "rgba(10, 14, 18, 0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        {/* Hover border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: "1px solid transparent",
            background:
              "linear-gradient(rgba(10,14,18,0),rgba(10,14,18,0)) padding-box, linear-gradient(135deg, var(--color-coral), var(--color-teal)) border-box",
            WebkitMask: "none",
            mask: "none",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovering ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Ambient gradient on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(122,157,184,0.08), transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div
          className={`relative z-10 h-full flex flex-col ${
            isLarge ? "p-7 sm:p-9" : "p-6 sm:p-7"
          }`}
        >
          {/* Header: icon + tag */}
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "var(--color-coral)",
              }}
            >
              {feature.icon}
            </div>
            <span
              className="text-[10px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full uppercase"
              style={{
                color: feature.tagColor,
                background: `color-mix(in srgb, ${feature.tagColor} 12%, transparent)`,
                border: `1px solid color-mix(in srgb, ${feature.tagColor} 20%, transparent)`,
              }}
            >
              {feature.tag}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold text-white group-hover:text-[var(--color-coral)] transition-colors duration-300"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.05em",
              fontSize: isLarge ? "1.5rem" : "1.25rem",
            }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-[var(--color-text-muted)] leading-relaxed text-sm mt-2">
            {feature.description}
          </p>

          {/* Visual element for large cards */}
          {feature.visual && (
            <div className="flex-1 flex items-end mt-2">{feature.visual}</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── Main Component ──────────────────────────────── */

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
            From live scores to AI-powered predictions, Clutch Picks gives you the full picture.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        {/*
          Desktop layout (4 columns):
          Row 1: [Live Scores — 2 cols]  [AI Predictions — 2 cols]
          Row 2: [Pick Selection]  [Detailed Analysis]  [Profile — 1col]  [Broadcast — 1col]

          The two large cards span 2 columns, medium cards get 1 col,
          and the two small cards share the remaining 2 columns.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-auto">
          {/* Row 1: Large cards */}
          <BentoCard
            feature={features[0]}
            index={0}
            className="md:col-span-2 min-h-[380px] sm:min-h-[420px]"
          />
          <BentoCard
            feature={features[1]}
            index={1}
            className="md:col-span-2 min-h-[380px] sm:min-h-[420px]"
          />

          {/* Row 2: Medium + Small cards */}
          <BentoCard
            feature={features[2]}
            index={2}
            className="lg:col-span-1 md:col-span-1"
          />
          <BentoCard
            feature={features[3]}
            index={3}
            className="lg:col-span-1 md:col-span-1"
          />
          <BentoCard
            feature={features[4]}
            index={4}
            className="lg:col-span-1 md:col-span-1"
          />
          <BentoCard
            feature={features[5]}
            index={5}
            className="lg:col-span-1 md:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
