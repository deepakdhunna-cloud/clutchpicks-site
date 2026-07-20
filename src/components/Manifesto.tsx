"use client";

import { motion } from "framer-motion";
import { MaskLines, Fade, useReducedSafe } from "./Reveal";

/** Hand-drawn goalpost + swoosh, drawing itself on scroll (teal stroke). */
function DrawnSign() {
  const reduced = useReducedSafe();
  const paths = [
    // goalpost: crossbar, uprights, center post, base
    "M116 78 L204 78 M124 78 L124 22 M196 78 L196 22 M160 78 L160 142 M144 142 L176 142",
    // football above the crossbar
    "M142 46 C 149 32, 171 32, 178 46 C 171 60, 149 60, 142 46 Z M152 46 L168 46",
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
            v3.0 unified simulation engine · 50,000 runs per game ·
            market-aware, never market-led
          </p>
        </Fade>
      </div>
    </section>
  );
}
