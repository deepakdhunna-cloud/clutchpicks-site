"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, PhoneFrame, SectionHeading } from "./ui";

const features = [
  {
    eyebrow: "Clutch Picks",
    title: "Best Pick Per Sport",
    copy: "See the single highest-conviction call for every sport — with win probability, matchup context, and the reasoning behind each pick.",
    image: "/screenshots/best-pick-per-sport.jpg",
    chips: ["Pick strength", "Win probability", "Why this pick"],
    tone: "red",
  },
  {
    eyebrow: "Analysis",
    title: "Projection Center",
    copy: "Live score projections, value signals, and recent form in one focused view. Know the spread, the upset risk, and where the edge sits.",
    image: "/screenshots/projection-center.jpg",
    chips: ["Live projection", "Value signal", "Recent form"],
    tone: "cyan",
  },
  {
    eyebrow: "Game detail",
    title: "Track The Game Edge",
    copy: "Follow score movement, win probability, broadcast info, and box score as the matchup changes — the game state stays live with you.",
    image: "/screenshots/track-game-edge.jpg",
    chips: ["Live score", "Win probability", "Box score"],
    tone: "cyan",
  },
  {
    eyebrow: "My Arena",
    title: "Prep The Slate",
    copy: "Rank matchups by conviction, edge, and value before games open. Prep Mode turns the full slate into a clear board of where to look first.",
    image: "/screenshots/prep-the-slate.jpg",
    chips: ["Conviction", "Top grades", "Slate context"],
    tone: "red",
  },
  {
    eyebrow: "Profile",
    title: "Build Your Analyst Card",
    copy: "Your accuracy, signature calls, and full pick history become an identity you can share — track your record like a real analyst.",
    image: "/screenshots/analyst-card.jpg",
    chips: ["Accuracy", "Signature calls", "Pick history"],
    tone: "cyan",
  },
];

function FeatureBlock({
  feature,
  index,
  onActive,
  blockRef,
}: {
  feature: (typeof features)[number];
  index: number;
  onActive: (i: number) => void;
  blockRef: (el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const seen = useInView(ref, { once: true, margin: "-120px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const accent =
    feature.tone === "red"
      ? "text-[var(--color-red-bright)]"
      : "text-[var(--color-electric)]";

  return (
    <div
      ref={(el) => {
        ref.current = el;
        blockRef(el);
      }}
      className="flex min-h-[52vh] flex-col justify-center py-10 lg:min-h-[66vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={seen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
        className="max-w-xl"
      >
        <span className="scoreboard-type text-xs uppercase tracking-[0.2em] text-white/50">
          {feature.eyebrow}
        </span>
        <h3 className={`scoreboard-type mt-3 text-4xl leading-[0.95] sm:text-5xl ${accent}`}>
          {feature.title}
        </h3>
        <p className="mt-5 text-base leading-7 text-white/70">{feature.copy}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {feature.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/75"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* inline phone on mobile */}
        <div className="mt-8 w-full max-w-[250px] lg:hidden">
          <PhoneFrame src={feature.image} alt={`${feature.title} screen in Clutch Picks`} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="App experience"
          title="Complex signals."
          accent="Simple reads."
          kicker="Five screens, one thread — scroll through the app the way it feels in your hand."
          className="max-w-3xl"
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          {/* scrolling copy */}
          <div className="order-2 lg:order-1">
            {features.map((f, i) => (
              <FeatureBlock
                key={f.title}
                feature={f}
                index={i}
                onActive={setActive}
                blockRef={(el) => {
                  blockRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          {/* sticky phone (desktop) */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-[16vh] flex h-[68vh] items-center justify-center">
              <div className="relative w-full max-w-[300px]">
                {/* progress rail */}
                <div className="absolute -left-10 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 xl:flex">
                  {features.map((f, i) => (
                    <button
                      key={f.title}
                      type="button"
                      aria-label={`Show ${f.title}`}
                      aria-current={i === active ? "true" : undefined}
                      onClick={() =>
                        blockRefs.current[i]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        i === active
                          ? "h-8 bg-[var(--color-electric)]"
                          : "h-3 bg-white/15 hover:bg-white/35"
                      }`}
                    />
                  ))}
                </div>

                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={features[active].image}
                    initial={{ opacity: 0, y: 22, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -22, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <PhoneFrame
                      src={features[active].image}
                      alt={`${features[active].title} screen in Clutch Picks`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
