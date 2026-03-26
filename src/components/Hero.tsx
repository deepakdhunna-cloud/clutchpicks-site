"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

// ── Animated counter hook ──────────────────────────────────────────
function useCountUp(end: number, duration = 2, startOnView = true) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!startOnView || inView) {
      const controls = animate(motionVal, end, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return controls.stop;
    }
  }, [inView, end, duration, startOnView, motionVal]);

  return { value, ref };
}

// ── Fake game data ─────────────────────────────────────────────────
const GAMES = [
  {
    league: "NBA",
    away: { abbr: "LAL", score: 108 },
    home: { abbr: "BOS", score: 114 },
    aiPick: "BOS",
    confidence: 87,
    quarter: "FINAL",
  },
  {
    league: "NFL",
    away: { abbr: "KC", score: 24 },
    home: { abbr: "BUF", score: 21 },
    aiPick: "KC",
    confidence: 74,
    quarter: "Q4 2:31",
  },
  {
    league: "MLB",
    away: { abbr: "NYY", score: 5 },
    home: { abbr: "LAD", score: 3 },
    aiPick: "NYY",
    confidence: 91,
    quarter: "BOT 8",
  },
  {
    league: "NHL",
    away: { abbr: "TOR", score: 3 },
    home: { abbr: "MTL", score: 4 },
    aiPick: "MTL",
    confidence: 68,
    quarter: "3RD 5:12",
  },
];

// ── Single game card ───────────────────────────────────────────────
function GameCard({
  game,
  index,
}: {
  game: (typeof GAMES)[number];
  index: number;
}) {
  const [awayScore, setAwayScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [showPick, setShowPick] = useState(false);

  useEffect(() => {
    const delay = index * 400 + 1200;
    let awayControls: ReturnType<typeof animate> | null = null;
    let homeControls: ReturnType<typeof animate> | null = null;

    const t1 = setTimeout(() => {
      awayControls = animate(0, game.away.score, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (v) => setAwayScore(Math.round(v)),
      });
      homeControls = animate(0, game.home.score, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (v) => setHomeScore(Math.round(v)),
      });
    }, delay);

    const t2 = setTimeout(() => setBarWidth(game.confidence), delay + 600);
    const t3 = setTimeout(() => setShowPick(true), delay + 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      awayControls?.stop();
      homeControls?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPickAway = game.aiPick === game.away.abbr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      style={{ willChange: "transform" }}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
      <div className="relative rounded-xl sm:rounded-2xl bg-[#080c10]/90 backdrop-blur-xl border border-white/[0.04] p-3 sm:p-5 overflow-hidden">
        {/* League badge */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-1.5 sm:px-2 py-0.5 rounded">
            {game.league}
          </span>
          <span className="text-[8px] sm:text-[10px] text-[var(--color-text-muted)] tracking-wide">
            {game.quarter}
          </span>
        </div>

        {/* Teams & scores */}
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className={`flex items-center justify-between ${isPickAway && showPick ? "text-white" : "text-white/60"}`}>
            <div className="flex items-center gap-2">
              {isPickAway && showPick && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]"
                />
              )}
              <span className="text-xs sm:text-sm font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                {game.away.abbr}
              </span>
            </div>
            <span className="text-base sm:text-lg font-bold tabular-nums" style={{ fontFamily: "var(--font-heading)" }}>
              {awayScore}
            </span>
          </div>
          <div className={`flex items-center justify-between ${!isPickAway && showPick ? "text-white" : "text-white/60"}`}>
            <div className="flex items-center gap-2">
              {!isPickAway && showPick && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]"
                />
              )}
              <span className="text-xs sm:text-sm font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                {game.home.abbr}
              </span>
            </div>
            <span className="text-base sm:text-lg font-bold tabular-nums" style={{ fontFamily: "var(--font-heading)" }}>
              {homeScore}
            </span>
          </div>
        </div>

        {/* AI Confidence bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[8px] sm:text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase">
              AI Confidence
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[var(--color-coral)]">
              {barWidth > 0 ? `${game.confidence}%` : "..."}
            </span>
          </div>
          <div className="h-1 sm:h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full w-full rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: barWidth / 100 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              style={{
                transformOrigin: "left center",
                willChange: "transform",
                background: `linear-gradient(90deg, var(--color-coral), ${game.confidence >= 80 ? "var(--color-green)" : "var(--color-teal)"})`,
              }}
            />
          </div>
        </div>

        {/* Pick flash */}
        {showPick && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[var(--color-green)]/10 border border-[var(--color-green)]/20"
          >
            <svg className="w-3 h-3 text-[var(--color-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[10px] font-bold text-[var(--color-green)] tracking-wider">
              AI PICK: {game.aiPick}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ── Constellation & light-streak background ────────────────────────
const STREAKS = [
  { y: "18%", width: 360, duration: 11, delay: 0,  angle: -18 },
  { y: "43%", width: 260, duration: 15, delay: 5,  angle: -14 },
  { y: "67%", width: 420, duration:  9, delay: 10, angle: -21 },
  { y: "31%", width: 190, duration: 18, delay: 15, angle: -16 },
];

function ConstellationField() {
  const { stars, edges } = useMemo(() => {
    const stars = Array.from({ length: 65 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.2 + 0.5,
      base: Math.random() * 0.22 + 0.06,
      dur: 3 + Math.random() * 6,
      del: Math.random() * 10,
    }));

    const edges: { x1: number; y1: number; x2: number; y2: number; del: number; dur: number }[] = [];
    const added = new Set<string>();
    for (let i = 0; i < stars.length && edges.length < 24; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        if (dx * dx + dy * dy < 200) {
          const key = `${i}:${j}`;
          if (!added.has(key)) {
            added.add(key);
            edges.push({
              x1: stars[i].x, y1: stars[i].y,
              x2: stars[j].x, y2: stars[j].y,
              del: Math.random() * 8,
              dur: 7 + Math.random() * 6,
            });
          }
        }
      }
    }
    return { stars, edges };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars + constellation lines */}
      <svg className="absolute inset-0 w-full h-full">
        {edges.map((e, i) => (
          <motion.line
            key={`e-${i}`}
            x1={`${e.x1}%`} y1={`${e.y1}%`}
            x2={`${e.x2}%`} y2={`${e.y2}%`}
            stroke="white"
            strokeWidth="0.4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.12, 0.04, 0.1, 0] }}
            transition={{ duration: e.dur, delay: e.del, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {stars.map((s) => (
          <motion.circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="white"
            initial={{ opacity: s.base }}
            animate={{ opacity: [s.base, Math.min(s.base * 4, 0.75), s.base * 0.4, Math.min(s.base * 2.5, 0.5), s.base] }}
            transition={{ duration: s.dur, delay: s.del, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "opacity" }}
          />
        ))}
      </svg>

      {/* Diagonal light streaks */}
      {STREAKS.map((sk, i) => (
        <motion.div
          key={`sk-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: sk.y,
            left: 0,
            width: sk.width,
            height: 1,
            rotate: sk.angle,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.05) 80%, transparent 100%)",
            willChange: "transform",
          }}
          animate={{ x: ["120vw", "-30vw"] }}
          transition={{
            duration: sk.duration,
            delay: sk.delay,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: sk.duration * 0.6,
          }}
        />
      ))}
    </div>
  );
}

// ── Headline word-by-word animation ───────────────────────────────
const HEADLINE_WORDS_1 = ["KNOW", "WHO", "WINS"];
const HEADLINE_WORDS_2 = ["BEFORE", "THEY", "PLAY"];

function AnimatedHeadline() {
  return (
    <h1
      aria-label="KNOW WHO WINS BEFORE THEY PLAY"
      className="text-[2.8rem] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-bold leading-[0.88] tracking-tight"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      <span className="block overflow-hidden">
        {HEADLINE_WORDS_1.map((word, i) => (
          <motion.span
            key={word}
            className="inline-block mr-[0.18em] text-white"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.3 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden">
        {HEADLINE_WORDS_2.map((word, i) => (
          <motion.span
            key={word}
            className="inline-block mr-[0.18em] gradient-text"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.66 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

// ── Stats bar with count-up ───────────────────────────────────────
function StatsBar() {
  const s1 = useCountUp(8, 1.5);
  const s2 = useCountUp(20, 2);
  const s3 = useCountUp(92, 2.5);

  const stats = [
    { ref: s1.ref, value: s1.value.toString(), label: "Leagues Covered" },
    { ref: s2.ref, value: s2.value.toString(), label: "Factors Analyzed" },
    { ref: s3.ref, value: `${s3.value}%`, label: "Prediction Rate" },
    { ref: null, value: "FREE", label: "Live Scores" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 sm:mt-20"
    >
      <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-6 px-4 ${
                i < 3 ? "border-r border-white/[0.05] max-sm:last:border-r-0 max-sm:nth-2:border-r-0" : ""
              } ${i < 2 ? "max-sm:border-b max-sm:border-white/[0.05]" : ""} ${i === 2 ? "max-sm:border-b max-sm:border-white/[0.05]" : ""}`}
            >
              <span
                ref={stat.ref}
                className="block text-3xl sm:text-4xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </span>
              <span className="block text-xs text-[var(--color-text-muted)] mt-1 tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-visible pt-48 sm:pt-44 pb-20 sm:pb-0 max-w-[100vw]">
      {/* ── Background layers ── */}
      <ConstellationField />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-8 items-center">
          {/* Left — text column */}
          <div className="max-w-2xl">
            {/* Headline */}
            <AnimatedHeadline />

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-7 text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-lg"
            >
              Our AI crunches{" "}
              <span className="text-white font-medium">20 factors per game</span>{" "}
              across{" "}
              <span className="text-white font-medium">8 major leagues</span>{" "}
              — delivering confidence-rated picks and full breakdowns before tip-off.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.35 }}
              className="mt-9"
            >
              <a
                href="#features"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:border-[var(--color-coral)]/30 hover:bg-[var(--color-coral)]/[0.06] transition-all duration-300"
              >
                See How It Works
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </a>
            </motion.div>
          </div>

          {/* Right — Game cards stack */}
          <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 sm:gap-4 max-w-[500px] w-full">
              {GAMES.map((game, i) => (
                <GameCard key={game.away.abbr + game.home.abbr} game={game} index={i} />
              ))}
            </div>
            {/* Glow behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--color-coral)] opacity-[0.04] blur-[100px] pointer-events-none" />
          </div>
        </div>

        {/* Stats bar */}
        <StatsBar />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-[var(--color-coral)]"
            animate={{ opacity: [0.4, 1, 0.4], scaleY: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
