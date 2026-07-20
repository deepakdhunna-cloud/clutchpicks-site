"use client";

import { motion } from "framer-motion";
import { MaskLines, Fade, useReducedSafe } from "./Reveal";

/** Hand-drawn goalpost + swoosh, drawing itself on scroll (teal stroke). */
function DrawnSign() {
  const reduced = useReducedSafe();
  const paths = [
    // the logo's goalpost-U: uprights curving into the dropped center stem
    "M128 20 L128 82 C128 96 137 102 148 102 L172 102 C183 102 192 96 192 82 L192 20 M160 102 L160 144",
    // football floating in the U's opening, laces across
    "M141 52 C 149 36, 171 36, 179 52 C 171 68, 149 68, 141 52 Z M151 52 L169 52",
    // swooping underline with end curl
    "M12 162 C 84 190, 200 184, 284 138 C 300 128, 296 112, 280 116 C 262 121, 262 146, 292 148",
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      className="pointer-events-none w-3/4 max-w-[300px]"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#7A9DB8"
          strokeWidth="5"
          strokeLinecap="round"
          initial={reduced ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={
            reduced ? { opacity: 1 } : { pathLength: 1, opacity: 1 }
          }
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{
            pathLength: {
              duration: 0.9,
              delay: 0.25 + i * 0.55,
              ease: [0.65, 0, 0.35, 1],
            },
            opacity: { duration: 0.01, delay: 0.25 + i * 0.55 },
          }}
        />
      ))}
    </svg>
  );
}

export default function Manifesto() {
  return (
    <section className="grid w-full grid-cols-12 gap-y-12 px-4 py-24 lg:px-14 lg:py-36">
      <div className="col-span-12 sm:col-span-4 lg:col-span-3">
        <DrawnSign />
      </div>

      <div className="col-span-12 flex flex-col gap-8 sm:col-span-8 lg:col-span-8 lg:col-start-5">
        <MaskLines
          as="p"
          className="text-2xl font-medium leading-[1.18] text-l1 md:text-[3.4svw] md:leading-[1.1]"
          lines={[
            "Every matchup runs through",
            "50,000 simulations before",
            "a pick reaches your screen.",
          ]}
          stagger={0.12}
        />
        <MaskLines
          as="p"
          className="text-2xl font-medium leading-[1.18] text-l3 md:text-[3.4svw] md:leading-[1.1]"
          lines={[
            "No inflated confidence.",
            "No fabricated data. When the",
            "model isn't sure — it tells you.",
          ]}
          stagger={0.12}
          delay={0.15}
        />
        <Fade delay={0.3}>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-l4">
            The Clutch engine · 50,000 runs per game · every league,
            every day
          </p>
        </Fade>
      </div>
    </section>
  );
}
