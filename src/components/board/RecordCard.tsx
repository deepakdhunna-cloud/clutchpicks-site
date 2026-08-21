"use client";

import { motion } from "framer-motion";
import { Jersey } from "./icons";
import { useReducedSafe } from "../Reveal";

const TEAL = "#7A9DB8";
const TEAL_DARK = "#5A7A8A";
const MAROON = "#8B0A1F";
const MAROON_DEEP = "#6A0818";

interface Pick {
  team: string;
  abbr: string;
  variant: "basketball" | "football" | "baseball";
  colors: { primary: string; secondary: string };
  meta: string;
  result: "W" | "L";
}

const PICKS: Pick[] = [
  {
    team: "Celtics",
    abbr: "BOS",
    variant: "basketball",
    colors: { primary: "#007A33", secondary: "#BA9653" },
    meta: "vs Heat · Final",
    result: "W",
  },
  {
    team: "Yankees",
    abbr: "NYY",
    variant: "baseball",
    colors: { primary: "#0C2340", secondary: "#FFFFFF" },
    meta: "vs Dodgers · Final",
    result: "L",
  },
  {
    team: "Bills",
    abbr: "BUF",
    variant: "football",
    colors: { primary: "#00338D", secondary: "#C60C30" },
    meta: "vs Chiefs · Final",
    result: "W",
  },
];

function ResultBadge({ result }: { result: "W" | "L" }) {
  const win = result === "W";
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[14px] font-black text-white"
      style={{
        background: win
          ? `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`
          : `linear-gradient(135deg, ${MAROON}, ${MAROON_DEEP})`,
      }}
    >
      {result}
    </span>
  );
}

function PickRow({ pick }: { pick: Pick }) {
  const win = pick.result === "W";
  const accent = win ? TEAL : MAROON;
  return (
    <div
      className="relative flex items-center gap-3 overflow-hidden rounded-[14px] border py-2.5 pl-4 pr-3"
      style={{
        backgroundColor: "rgba(8,8,12,0.95)",
        borderColor: win ? "rgba(122,157,184,0.12)" : "rgba(139,10,31,0.12)",
      }}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundColor: accent }}
      />
      <Jersey
        variant={pick.variant}
        abbr={pick.abbr}
        primary={pick.colors.primary}
        secondary={pick.colors.secondary}
        size={34}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-extrabold tracking-tight text-white">
          {pick.team}
        </span>
        <span className="text-[11px] text-white/40">{pick.meta}</span>
      </div>
      <ResultBadge result={pick.result} />
    </div>
  );
}

function StatRing({
  label,
  value,
  frac,
  color,
  gradient = false,
}: {
  label: string;
  value: string;
  frac: number;
  color: string;
  gradient?: boolean;
}) {
  const reduced = useReducedSafe();
  const r = 22;
  const c = 2 * Math.PI * r;
  const stroke = gradient ? "url(#rate-gradient)" : color;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-[52px] w-[52px]">
        <svg viewBox="0 0 52 52" className="h-full w-full -rotate-90">
          {gradient && (
            <defs>
              <linearGradient id="rate-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={MAROON} />
                <stop offset="100%" stopColor={TEAL} />
              </linearGradient>
            </defs>
          )}
          <circle
            cx="26"
            cy="26"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3.5"
          />
          <motion.circle
            cx="26"
            cy="26"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - frac) }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : 0.2 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[15px] font-extrabold text-white tabular">
          {value}
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
        {label}
      </span>
    </div>
  );
}

/** Illustrative pick-history rows and stat rings. */
export default function RecordCard() {
  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-4"
      style={{
        backgroundColor: "rgba(8,8,12,0.95)",
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.85)",
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
          Pick History
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal tabular">
          W3 Streak
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {PICKS.map((p) => (
          <PickRow key={p.team} pick={p} />
        ))}
      </div>
      <div className="mt-4 flex items-start justify-around border-t border-white/[0.08] pt-4">
        <StatRing label="Wins" value="12" frac={12 / 19} color={TEAL} />
        <StatRing label="Losses" value="7" frac={7 / 19} color={MAROON} />
        <StatRing label="Rate" value="63%" frac={0.63} color={TEAL} gradient />
      </div>
    </div>
  );
}
