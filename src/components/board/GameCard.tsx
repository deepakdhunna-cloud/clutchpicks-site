"use client";

import { motion } from "framer-motion";
import Shell, { SportPill } from "./Shell";
import {
  ClockIcon,
  TrendingUpIcon,
  TvIcon,
  ChevronRightIcon,
  Jersey,
} from "./icons";

/* Boston Celtics @ Miami Heat — team colors from the app's team-colors.ts */
const BOS = { primary: "#007A33", secondary: "#BA9653", accent: "#007A33" };
const MIA = { primary: "#98002E", secondary: "#F9A01B", accent: "#98002E" };

const STRONG = "#CBD5E1"; // Strong Pick tier (67–74%)

function TeamColumn({
  colors,
  name,
  record,
  picked = false,
}: {
  colors: { primary: string; secondary: string };
  name: string;
  record: string;
  picked?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={picked ? "-translate-y-[3px]" : ""}>
        <Jersey primary={colors.primary} secondary={colors.secondary} size={52} />
      </div>
      {picked && (
        <span
          className="rounded-[4px] px-1.5 py-px text-[8px] font-black uppercase tracking-wide text-black"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          Your Pick
        </span>
      )}
      <span className="text-center text-[14px] font-extrabold leading-tight text-white">
        {name}
      </span>
      <span className="text-[10px] font-semibold text-l3 tabular">{record}</span>
    </div>
  );
}

/** Faithful replica of the app's pregame GameCard (premium prediction state). */
export default function GameCard() {
  return (
    <Shell away={BOS.accent} home={MIA.accent}>
      {/* Header pills */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <SportPill label="NBA" />
          <span
            className="flex items-center gap-1 rounded-[5px] border border-white/60 px-1.5 py-0.5 text-[10px] font-bold text-white"
            style={{ backgroundColor: "rgba(139,10,31,0.25)" }}
          >
            <TrendingUpIcon className="h-2 w-2" />
            BOS
          </span>
        </div>
        <span
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.18] px-2 py-1 text-[10px] font-bold text-white"
          style={{ backgroundColor: "rgba(2,3,8,0.92)" }}
        >
          <ClockIcon className="h-2.5 w-2.5 text-[#E0E0E0]" />
          Today 7:30 PM
        </span>
      </div>

      {/* Teams row */}
      <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TeamColumn colors={BOS} name="Celtics" record="44-18" picked />
        <div
          className="flex w-[92px] flex-col items-center rounded-[10px] border border-white/[0.13] py-2.5"
          style={{ backgroundColor: "rgba(2,3,8,0.88)" }}
        >
          <span className="text-[14px] font-bold text-white">VS</span>
          <span className="mt-0.5 text-[10px] text-white/40">Tonight</span>
        </div>
        <TeamColumn colors={MIA} name="Heat" record="37-25" />
      </div>

      {/* Community picks */}
      <div
        className="mb-2 rounded-[10px] border border-white/[0.14] p-3"
        style={{ backgroundColor: "rgba(2,3,8,0.92)" }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: BOS.accent }}
            />
            <span className="text-[14px] font-extrabold text-white tabular">
              62%
            </span>
            <span className="text-[10px] font-bold text-white/60">BOS</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
            <TrendingUpIcon className="h-2.5 w-2.5" />
            128 picks
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-white/60">MIA</span>
            <span className="text-[14px] font-extrabold text-white tabular">
              38%
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: MIA.accent }}
            />
          </span>
        </div>
        <div
          className="flex h-1.5 overflow-hidden rounded-[3px]"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <motion.div
            initial={{ width: "50%" }}
            whileInView={{ width: "62%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ backgroundColor: BOS.accent }}
          />
          <div className="w-[2px] bg-black/90" />
          <div className="flex-1" style={{ backgroundColor: MIA.accent }} />
        </div>
      </div>

      {/* Prediction panel */}
      <div
        className="rounded-[10px] border p-2.5"
        style={{
          backgroundColor: "rgba(2,3,8,0.92)",
          borderColor: "rgba(255,255,255,0.16)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="rounded-xl border px-3 py-1.5 text-[13px] font-extrabold tracking-[0.02em]"
            style={{
              borderColor: `${STRONG}40`,
              backgroundColor: `${STRONG}12`,
              color: STRONG,
            }}
          >
            Strong Pick
          </span>
          <span className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-white/45">
              Upset Risk
            </span>
            <span className="text-[12px] font-black text-white">Moderate</span>
          </span>
        </div>
        <div className="mt-2 border-t border-white/[0.08] pt-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-teal">
            Projected Score
          </span>
          <p className="mt-0.5 text-[12px] font-extrabold text-white tabular">
            BOS 112 · MIA 104
          </p>
          <p className="mt-0.5 text-[10px] font-bold text-white/50 tabular">
            Lean BOS · 68%
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-white/65">
            Boston&apos;s rest edge and top-five net rating hold up across the
            simulation set; Miami&apos;s home split keeps a live upset path.
          </p>
        </div>
      </div>

      {/* Footer chips */}
      <div className="mt-2 flex items-center justify-between">
        <span
          className="flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-bold text-white"
          style={{
            backgroundColor: "rgba(122,157,184,0.15)",
            borderColor: "rgba(122,157,184,0.3)",
          }}
        >
          <TvIcon className="h-3 w-3 text-teal" />
          TNT
        </span>
        <span className="flex items-center gap-0.5 rounded-lg border border-white/[0.16] bg-white/[0.08] px-2 py-1 text-[10px] font-bold text-white">
          Details
          <ChevronRightIcon className="h-3 w-3" />
        </span>
      </div>
    </Shell>
  );
}
