"use client";

import { LEAGUES } from "@/lib/site";

function List({ dup = false }: { dup?: boolean }) {
  return (
    <ul
      aria-hidden={dup || undefined}
      data-dup={dup ? "" : undefined}
      className="flex w-max items-center gap-12 pr-12"
    >
      {LEAGUES.map((league) => (
        <li key={league.abbr} className="flex items-center gap-12">
          <span
            className="scoreboard-type text-3xl text-white/25 transition-colors duration-300 hover:text-white sm:text-4xl"
            title={league.name}
          >
            {league.abbr}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[var(--color-electric)]/40" />
        </li>
      ))}
    </ul>
  );
}

export default function Leagues() {
  return (
    <section
      aria-label="Leagues covered"
      className="border-y border-white/[0.06] py-10 sm:py-12"
    >
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">
        Eleven leagues · One board · Every slate
      </p>
      <div className="ticker-mask mt-7">
        <div className="ticker-track">
          <List />
          <List dup />
        </div>
      </div>
    </section>
  );
}
