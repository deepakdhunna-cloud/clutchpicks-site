"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/site";

const INTRO_KEY = "cp-intro";

/** True once the intro has played this session — repeat visits skip the wait. */
export function introSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

/** Scale an intro reveal delay down to near-zero on repeat visits. */
export function introDelay(base: number): number {
  return introSeen() ? Math.min(base, 0.15) : base;
}

/** Minimal centered loading bar, then fade. Plays once per session. */
export default function Loader() {
  const [done, setDone] = useState(false);
  const [quick, setQuick] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (introSeen()) {
      // Returning within the session — dissolve immediately.
      setQuick(true);
      t = setTimeout(() => setDone(true), 50);
    } else {
      t = setTimeout(() => setDone(true), 1250);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* private mode — just replay next time */
      }
    }
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          exit={{
            opacity: 0,
            transition: { duration: quick ? 0.25 : 0.45, ease: "easeOut" },
          }}
          aria-hidden="true"
        >
          {!quick && (
            <div className="h-1.5 w-[140px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-l1"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
