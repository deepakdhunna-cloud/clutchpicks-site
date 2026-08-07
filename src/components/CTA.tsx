"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AppStoreButton, EASE, LivePill } from "./ui";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="download" ref={ref} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#070a10] px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          {/* quiet corner glows inside the slab */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(38rem 22rem at 8% 0%, rgba(76,194,255,0.1), transparent 60%), radial-gradient(38rem 22rem at 94% 100%, rgba(224,35,63,0.09), transparent 60%)",
            }}
          />

          <div className="relative">
            <LivePill label="Ready when you are" />

            <h2 className="scoreboard-type display-section mx-auto mt-6 max-w-3xl text-white">
              Put the whole slate
              <span className="text-electric block">in your pocket.</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="duo-underline mx-auto mt-6 w-28 origin-center"
            />

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Free to download. Upgrade inside the app when you want the full AI
              breakdown behind every matchup.
            </p>

            <div className="mt-9 flex justify-center">
              <AppStoreButton />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Free to start · Pro $6.99/mo · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
