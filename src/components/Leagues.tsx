"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { LEAGUES } from "@/lib/site";
import { Eyebrow, Fade, useReducedSafe } from "./Reveal";

/* Three opposing rows of giant serif league marks that shear with the
 * viewer's scroll speed — the coverage as a velocity wall. */
const ROWS = [
  { leagues: LEAGUES.slice(0, 4), duration: "30s", reverse: false, rotate: -1.4 },
  { leagues: LEAGUES.slice(4, 8), duration: "36s", reverse: true, rotate: 1.1 },
  { leagues: LEAGUES.slice(8), duration: "26s", reverse: false, rotate: -0.7 },
];

function MarqueeRow({
  leagues,
  duration,
  reverse,
  rotate,
}: {
  leagues: typeof LEAGUES;
  duration: string;
  reverse: boolean;
  rotate: number;
}) {
  const chunk = (
    <>
      {leagues.map((l) => (
        <span key={l.abbr} className="flex items-baseline gap-4 whitespace-nowrap">
          <span
            className="inline-block h-2.5 w-2.5 flex-none self-center rounded-full lg:h-[1.3vw] lg:w-[1.3vw]"
            style={{ backgroundColor: l.color, boxShadow: `0 0 22px ${l.color}88` }}
          />
          <span className="glow-serif font-serif text-[9.5vw] font-semibold leading-none tracking-tight lg:text-[6.5vw]">
            {l.abbr}
          </span>
          <span className="font-serif text-base italic text-l3 lg:text-[1.5vw]">
            {l.name}
          </span>
        </span>
      ))}
    </>
  );
  return (
    <div
      className="relative overflow-visible"
      style={{ rotate: `${rotate}deg` }}
      aria-hidden="true"
    >
      <div
        className="animate-marquee flex w-max items-center gap-[4vw] pr-[4vw]"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex items-center gap-[4vw]">{chunk}</div>
        <div className="flex items-center gap-[4vw]">{chunk}</div>
        <div className="flex items-center gap-[4vw]">{chunk}</div>
        <div className="flex items-center gap-[4vw]">{chunk}</div>
      </div>
    </div>
  );
}

/** Editorial index — reduced-motion fallback keeps the info plain. */
function LeaguesIndex() {
  return (
    <ul className="col-span-12 list-none">
      {LEAGUES.map((l, i) => (
        <li key={l.abbr} className="border-t border-line last:border-b">
          <div className="grid grid-cols-12 items-baseline gap-x-4 py-4">
            <span className="col-span-1 font-led text-base text-l4 tabular">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="col-span-7 font-serif text-3xl font-semibold tracking-tight">
              {l.abbr}
            </span>
            <span className="col-span-4 flex items-center justify-end gap-2.5 text-right font-serif text-[15px] italic text-l3">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              {l.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The coverage — supported competitions as a scroll-sheared marquee wall. */
export default function Leagues() {
  const reduced = useReducedSafe();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2600, 2600], [-11, 11]), {
    stiffness: 220,
    damping: 30,
  });

  return (
    <section
      id="leagues"
      className="w-full overflow-x-clip py-20 lg:py-28"
    >
      <div className="grid w-full grid-cols-12 px-4 lg:px-14">
        <h2 className="sr-only">The Leagues</h2>
        <Eyebrow index="04" title="The Leagues" meta="Supported competitions · one board" />
      </div>

      {reduced ? (
        <div className="grid w-full grid-cols-12 px-4 lg:px-14">
          <LeaguesIndex />
        </div>
      ) : (
        <motion.div
          style={{ skewX: skew }}
          className="flex flex-col gap-[3.5svh] py-6 will-change-transform"
        >
          {ROWS.map((row, i) => (
            <Fade key={i} delay={i * 0.1} y={34}>
              <MarqueeRow {...row} />
            </Fade>
          ))}
        </motion.div>
      )}

      <div className="grid w-full grid-cols-12 px-4 pt-10 lg:px-14">
        <Fade className="col-span-12">
          <p className="font-led text-base tracking-[0.08em] text-l4">
            LIVE SCORES, PICKS, AND SUPPORTED COVERAGE ACROSS THE COMPETITIONS ON THE BOARD.
          </p>
        </Fade>
      </div>
    </section>
  );
}
