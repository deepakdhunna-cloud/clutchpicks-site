"use client";

import { motion } from "framer-motion";
import { useReducedSafe } from "../Reveal";

const TEAL = "#7A9DB8";
const MAROON = "#8B0A1F";
const TRACK = "#2A3444";

/* Last 10 picks: teal = win, red = loss (app form line) */
const FORM: ("W" | "L")[] = ["W", "W", "L", "W", "W", "W", "L", "W", "W", "W"];

/** Illustrative analyst-card layout. */
export default function AnalystCard() {
  const reduced = useReducedSafe();
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border p-5"
      style={{
        borderColor: "rgba(122,157,184,0.26)",
        backgroundColor: "rgba(8,8,12,0.95)",
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.85)",
      }}
    >
      {/* corner washes: maroon top-left → teal bottom-right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,10,31,0.4) 0%, transparent 38%, transparent 62%, rgba(122,157,184,0.18) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative">
        {/* Identity row */}
        <div className="flex items-center gap-3">
          <span
            className="rounded-full p-[3px]"
            style={{
              background: `linear-gradient(135deg, ${MAROON}, ${TEAL})`,
            }}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A0E14] text-[18px] font-black text-white">
              CP
            </span>
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[19px] font-extrabold leading-none text-white">
              Your Analyst Card
            </span>
            <span className="text-[12px] text-white/48">@yourhandle</span>
            <span
              className="flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5"
              style={{ backgroundColor: "rgba(139,10,31,0.15)" }}
            >
              <span
                className="h-[5px] w-[5px] rounded-full"
                style={{ backgroundColor: MAROON }}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#D25668]">
                Verified
              </span>
            </span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-[52px] font-extrabold leading-none tracking-[-0.02em] text-white tabular">
              62.5
              <span className="text-[24px] text-white/70">%</span>
            </span>
            <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">
              Accuracy
            </p>
          </div>
          <span className="mb-1 flex items-center gap-1 text-[12px] font-bold text-teal tabular">
            ▲ +2.1 this week
          </span>
        </div>

        {/* Accuracy bar */}
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full"
          style={{ backgroundColor: TRACK }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${MAROON}, ${TEAL})`,
            }}
            initial={{ width: "0%" }}
            whileInView={{ width: "62.5%" }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : 0.25 }}
          />
        </div>

        {/* Form line */}
        <div className="mt-4 flex gap-1">
          {FORM.map((r, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-sm"
              style={{
                backgroundColor:
                  r === "W" ? TEAL : "rgba(239,68,68,0.5)",
              }}
            />
          ))}
        </div>
        <p className="mt-1.5 text-[10px] text-white/40">Last 10 predictions</p>
      </div>
    </div>
  );
}
