"use client";

import { motion } from "framer-motion";
import { LEAGUES } from "@/lib/site";
import { Eyebrow, Fade } from "./Reveal";
import { EASE } from "@/lib/site";

function LeagueRow({
  abbr,
  name,
  color,
  notes,
  index,
}: {
  abbr: string;
  name: string;
  color: string;
  notes: string;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.03 }}
      className="group relative border-t border-line last:border-b"
    >
      <div className="grid grid-cols-12 items-baseline gap-x-4 py-4 lg:py-5">
        {/* accent bar on hover */}
        <span
          className="absolute inset-y-2 left-[-1rem] w-1 origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 lg:left-[-1.25rem]"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <span className="col-span-1 font-mono text-xs text-l4 tabular">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="col-span-7 flex items-center gap-3 sm:col-span-4 lg:col-span-3">
          <span className="font-sans text-[7.4svw] font-black uppercase leading-none transition-transform duration-300 ease-out font-wide group-hover:translate-x-2 sm:text-4xl lg:text-[3.2svw]">
            {abbr}
          </span>
        </span>
        <span className="col-span-4 hidden items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-l3 sm:flex lg:col-span-3">
          <span
            className="inline-block h-2 w-2 shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          {name}
        </span>
        <span className="col-span-5 hidden text-right font-mono text-[11px] uppercase tracking-[0.08em] text-l4 transition-colors duration-300 group-hover:text-l3 lg:block">
          {notes}
        </span>
      </div>
    </motion.li>
  );
}

/** Editorial index of the 11 marketed leagues, engine notes per row. */
export default function Leagues() {
  return (
    <section
      id="leagues"
      className="grid w-full grid-cols-12 px-4 py-24 lg:px-14 lg:py-32"
    >
      <Eyebrow
        index="03"
        title="The Leagues"
        meta="11 leagues · league-profiled simulators"
      />
      <ul className="col-span-12 list-none">
        {LEAGUES.map((l, i) => (
          <LeagueRow key={l.abbr} {...l} index={i} />
        ))}
      </ul>
      <Fade className="col-span-12 mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-l4">
          Each league runs its own simulation profile — the factors on the
          right are what the engine actually weighs.
        </p>
      </Fade>
    </section>
  );
}
