"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Animated counter hook ──────────────────────────────────────────
function useCountUp(end: number, duration = 2, startOnView = true) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
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
      animate={{ y: [0, -5, 0] }}
      whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 350, damping: 28 } }}
      transition={{ duration: 3.5 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 + index * 0.3 }}
      style={{ willChange: "transform", cursor: "default" }}
    >
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
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
    </motion.div>
  );
}

// ── Sports AI data field ───────────────────────────────────────────
// Network nodes: deterministic positions, alternating brand colors
const NET_NODES = [
  { id: 0,  x:  8, y: 20, c: "coral" }, { id: 1,  x: 22, y:  9, c: "teal"  },
  { id: 2,  x: 38, y: 26, c: "coral" }, { id: 3,  x: 16, y: 44, c: "teal"  },
  { id: 4,  x: 52, y: 14, c: "coral" }, { id: 5,  x: 66, y: 31, c: "teal"  },
  { id: 6,  x: 79, y: 17, c: "coral" }, { id: 7,  x: 91, y: 11, c: "teal"  },
  { id: 8,  x: 11, y: 67, c: "teal"  }, { id: 9,  x: 27, y: 57, c: "coral" },
  { id: 10, x: 43, y: 73, c: "teal"  }, { id: 11, x: 60, y: 51, c: "coral" },
  { id: 12, x: 74, y: 64, c: "teal"  }, { id: 13, x: 87, y: 75, c: "coral" },
  { id: 14, x: 94, y: 45, c: "teal"  }, { id: 15, x: 39, y: 87, c: "coral" },
  { id: 16, x: 57, y: 90, c: "teal"  }, { id: 17, x: 76, y: 83, c: "coral" },
] as const;

// Edges — each fires in sequence, creating a cascading "data flow" wave
const NET_EDGES: { a: number; b: number; d: number }[] = [
  { a: 0, b: 1, d: 0.0 }, { a: 1, b: 2, d: 0.5 }, { a: 2, b: 4, d: 1.0 },
  { a: 4, b: 5, d: 1.5 }, { a: 5, b: 6, d: 2.0 }, { a: 6, b: 7, d: 2.5 },
  { a: 7, b: 14,d: 3.0 }, { a: 14,b:11, d: 3.5 }, { a: 11,b: 5, d: 4.0 },
  { a: 5, b:12, d: 4.5 }, { a: 12,b:13, d: 5.0 }, { a: 13,b:17, d: 5.5 },
  { a: 17,b:16, d: 6.0 }, { a: 16,b:15, d: 6.5 }, { a: 15,b:10, d: 7.0 },
  { a: 10,b: 9, d: 7.5 }, { a: 9, b: 8, d: 8.0 }, { a: 8, b: 3, d: 8.5 },
  { a: 3, b: 2, d: 9.0 }, { a: 2, b: 9, d: 9.5 }, { a: 9, b:11, d:10.0 },
  { a: 4, b:11, d:10.5 },
];

// Floating live-score / stat chips
const CHIPS = [
  { text: "LAL 108  ·  BOS 114", x: "4%",  y: "32%", d: 0,  dur: 13 },
  { text: "CONF  87%",            x: "68%", y: "26%", d: 4,  dur: 11 },
  { text: "ELO  Δ +4.2",          x: "20%", y: "72%", d: 8,  dur: 14 },
  { text: "KC 24  ·  BUF 21",    x: "54%", y: "78%", d: 2,  dur: 10 },
  { text: "W–STK  7",             x: "83%", y: "54%", d: 10, dur: 12 },
  { text: "NYY 5  ·  LAD 3",     x: "33%", y: "22%", d: 6,  dur:  9 },
  { text: "AI PICK: BOS  ✓",     x: "11%", y: "53%", d: 14, dur: 15 },
  { text: "QBR  94.2",            x: "88%", y: "36%", d: 18, dur: 11 },
];

const CORAL = "rgba(122,157,184,VAR)";
const TEAL  = "rgba(232,147,106,VAR)";
function nc(c: string, a: number) {
  return (c === "coral" ? CORAL : TEAL).replace("VAR", String(a));
}

function SportDataField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Neural network SVG */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Edges — cascade activation every 12s */}
        {NET_EDGES.map((e, i) => {
          const A = NET_NODES[e.a], B = NET_NODES[e.b];
          const color = A.c === "coral" ? "rgba(122,157,184,1)" : "rgba(232,147,106,1)";
          return (
            <motion.line
              key={`e${i}`}
              x1={`${A.x}%`} y1={`${A.y}%`}
              x2={`${B.x}%`} y2={`${B.y}%`}
              stroke={color}
              strokeWidth="0.6"
              initial={{ opacity: 0.03 }}
              animate={{ opacity: [0.03, 0.03, 0.35, 0.55, 0.35, 0.06, 0.03] }}
              transition={{ duration: 12, delay: e.d, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
        {/* Nodes — glow when adjacent edges fire */}
        {NET_NODES.map((n, i) => {
          const delay = (NET_EDGES.find(e => e.a === n.id || e.b === n.id)?.d ?? 0) + 0.2;
          return (
            <motion.circle
              key={`n${i}`}
              cx={`${n.x}%`} cy={`${n.y}%`} r={2.8}
              fill={nc(n.c, 0.6)}
              initial={{ opacity: 0.2, scale: 1 }}
              animate={{ opacity: [0.2, 0.2, 0.8, 1, 0.8, 0.25, 0.2], scale: [1, 1, 1.6, 2, 1.6, 1.1, 1] }}
              transition={{ duration: 12, delay, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "opacity, transform", transformOrigin: `${n.x}% ${n.y}%` }}
            />
          );
        })}
      </svg>

      {/* Floating score / stat chips */}
      {CHIPS.map((chip, i) => (
        <motion.div
          key={`chip${i}`}
          className="absolute font-mono text-[10px] sm:text-[11px] tracking-widest whitespace-nowrap px-2.5 py-1 rounded"
          style={{
            left: chip.x, top: chip.y,
            color: "rgba(255,255,255,0.28)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 0.9, 1, 0.9, 0],
            y: [0, 0, -6, -12, -18, -24],
          }}
          transition={{
            duration: chip.dur,
            delay: chip.d,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: chip.dur * 0.4,
          }}
        >
          {chip.text}
        </motion.div>
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
      <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
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
      <SportDataField />

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
              <motion.a
                href="#features"
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(122,157,184,0.18)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:border-[var(--color-coral)]/30 hover:bg-[var(--color-coral)]/[0.06] transition-colors duration-300"
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
              </motion.a>
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
