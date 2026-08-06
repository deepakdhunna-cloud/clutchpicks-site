"use client";

import { motion } from "framer-motion";
import { LEAGUES, EASE } from "@/lib/site";
import { Eyebrow, Fade } from "./Reveal";

function LeagueRow({
  abbr,
  name,
  color,
  index,
}: {
  abbr: string;
  name: string;
  color: string;
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
        <span className="col-span-1 font-led text-base text-l4 tabular">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="col-span-7 flex items-center gap-3 sm:col-span-5 lg:col-span-4">
          <span className="glow-serif font-serif text-[7.4svw] font-semibold leading-none tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:italic sm:text-4xl lg:text-[3.1svw]">
            {abbr}
          </span>
        </span>
        <span className="col-span-4 hidden items-center justify-end gap-2.5 text-right font-serif text-[15px] italic text-l3 transition-colors duration-300 group-hover:text-l2 sm:flex sm:col-start-9 lg:col-span-4 lg:col-start-9">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          {name}
        </span>
      </div>
    </motion.li>
  );
}

/** Editorial index of the 11 marketed leagues. */
export default function Leagues() {
  return (
    <section
      id="leagues"
      className="grid w-full grid-cols-12 px-4 py-24 lg:px-14 lg:py-32"
    >
      <h2 className="sr-only">The Leagues</h2>
      <Eyebrow
        index="04"
        title="The Leagues"
        meta="11 leagues · one board"
      />
      <ul className="col-span-12 list-none">
        {LEAGUES.map((l, i) => (
          <LeagueRow key={l.abbr} {...l} index={i} />
        ))}
      </ul>
      <Fade className="col-span-12 mt-8">
        <p className="font-led text-base tracking-[0.08em] text-l4">
          LIVE SCORES, PICKS, AND FULL COVERAGE FOR EVERY LEAGUE ON THE BOARD.
        </p>
      </Fade>
    </section>
  );
}
