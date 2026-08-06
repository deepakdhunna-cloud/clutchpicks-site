"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Eyebrow,
  Fade,
  MaskLines,
  useDesktop,
  useReducedSafe,
} from "./Reveal";
import GameCard from "./board/GameCard";
import LiveCard from "./board/LiveCard";
import RecordCard from "./board/RecordCard";
import AnalystCard from "./board/AnalystCard";

interface FrameSpec {
  tag: string;
  tagColor: string;
  tagText: string;
  title: string;
  meta: string;
  card: ReactNode;
}

const FRAMES: FrameSpec[] = [
  {
    tag: "PRO · STRONG PICK",
    tagColor: "#CBD5E1",
    tagText: "#04070A",
    title: "Game Card — Pregame Read",
    meta: "NBA · 68% CONF",
    card: <GameCard />,
  },
  {
    tag: "LIVE",
    tagColor: "#DC2626",
    tagText: "#FFFFFF",
    title: "Live Card — Real-Time Scores",
    meta: "SSE · 3S FALLBACK",
    card: <LiveCard />,
  },
  {
    tag: "FREE",
    tagColor: "#7A9DB8",
    tagText: "#04070A",
    title: "Pick History — Your Record",
    meta: "STREAKS & RINGS",
    card: <RecordCard />,
  },
  {
    tag: "SHARE CARD",
    tagColor: "#B4D3EB",
    tagText: "#04070A",
    title: "Analyst Card — Own Your Season",
    meta: "ACCURACY · FORM",
    card: <AnalystCard />,
  },
];

/** Game-tape edge — broadcast timecode ruler in place of film sprockets. */
function TapeEdge({ frame, bottom = false }: { frame: number; bottom?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 ${
        bottom ? "border-t" : "border-b"
      } border-line`}
      aria-hidden="true"
    >
      <span className="flex items-center gap-1.5 font-led text-sm text-l4">
        {bottom ? (
          "CLUTCH GAME TAPE"
        ) : (
          <>
            <span className="animate-live-pulse inline-block h-1.5 w-1.5 rounded-full bg-live" />
            REC
          </>
        )}
      </span>
      <span
        className="h-2.5 flex-1 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(238,244,250,0.35) 0 1px, transparent 1px 7px), repeating-linear-gradient(90deg, rgba(238,244,250,0.6) 0 2px, transparent 2px 35px)",
        }}
      />
      <span className="font-led text-sm text-l4 tabular">
        TC 00:0{frame}:00
      </span>
    </div>
  );
}

function Frame({
  spec,
  index,
  wide = false,
}: {
  spec: FrameSpec;
  index: number;
  wide?: boolean;
}) {
  return (
    <figure
      className={`flex-none snap-center ${
        wide ? "w-[min(36vw,560px)]" : "w-[min(86vw,500px)]"
      }`}
    >
      <div className="group border border-line bg-black/45 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <TapeEdge frame={index + 1} />
        <div className="relative px-2.5 py-3 transition-transform duration-500 ease-out lg:group-hover:-translate-y-1">
          <span
            className="absolute -top-1 right-5 z-10 px-2 py-0.5 font-led text-sm tracking-[0.08em]"
            style={{ backgroundColor: spec.tagColor, color: spec.tagText }}
          >
            {spec.tag}
          </span>
          {spec.card}
        </div>
        <TapeEdge frame={index + 1} bottom />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3 px-1">
        <span className="min-w-0 truncate font-serif text-[16px] italic text-l2">
          {String(index + 1).padStart(2, "0")}. {spec.title}
        </span>
        <span className="whitespace-nowrap font-led text-base text-l4 tabular">
          {spec.meta}
        </span>
      </figcaption>
    </figure>
  );
}

/** Pinned tape theater — vertical scroll drives the reel sideways. */
function BoardTheater() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(p, [0.05, 0.95], ["3vw", "-102vw"]);
  const ghostX = useTransform(p, [0, 1], ["4vw", "-30vw"]);
  const [reel, setReel] = useState(1);
  useMotionValueEvent(p, "change", (v) => {
    setReel(Math.min(4, Math.max(1, Math.floor(((v - 0.1) / 0.85) * 4) + 1)));
  });

  return (
    <section ref={ref} id="board" className="relative h-[300svh]">
      <h2 className="sr-only">The Board</h2>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* ghost title drifting behind the reel */}
        <motion.span
          aria-hidden="true"
          style={{ x: ghostX }}
          className="text-ghost pointer-events-none absolute top-[15svh] left-0 whitespace-nowrap font-serif text-[15vw] font-semibold italic leading-none"
        >
          The Board · The Board
        </motion.span>

        {/* eyebrow pinned at the top of the scene */}
        <div className="absolute inset-x-0 top-[max(9svh,5.5rem)] grid grid-cols-12 px-14">
          <Eyebrow
            index="02"
            title="The Board"
            meta="Real cards from the app — same layouts, same colors"
          />
        </div>

        {/* reel counter */}
        <div className="absolute bottom-[10svh] right-14 font-led text-lg text-l3 tabular">
          REEL 0{reel} / 04
        </div>

        {/* the tape itself */}
        <motion.div style={{ x }} className="flex w-max items-center gap-12 pl-[5vw]">
          <div className="w-[30vw] flex-none pr-4">
            <MaskLines
              as="p"
              className="glow-serif-strong font-serif text-[3.7vw] font-semibold leading-[1.06] tracking-tight"
              lines={["The Board,", "On Tape."]}
            />
            <p className="mt-5 max-w-sm font-serif text-[17px] leading-relaxed text-l2">
              Scroll to run the reel — every frame is a{" "}
              <span className="italic text-l1">real card from the app</span>,
              same layouts, same colors, same numbers.
            </p>
          </div>
          {FRAMES.map((spec, i) => (
            <div
              key={spec.title}
              className="flex-none"
              style={{ rotate: `${i % 2 ? 1.6 : -1.8}deg` }}
            >
              <Frame spec={spec} index={i} wide />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** Swipeable strip — phones and reduced motion. */
function BoardStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const scrollByFrame = (dir: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.min(el.clientWidth * 0.72, 540),
      behavior: "smooth",
    });
  };

  return (
    <section id="board" className="w-full py-20 lg:py-28">
      <div className="grid w-full grid-cols-12 px-4 lg:px-14">
        <h2 className="sr-only">The Board</h2>
        <Eyebrow
          index="02"
          title="The Board"
          meta="Real cards from the app — same layouts, same colors"
        />
        <div className="col-span-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div>
            <MaskLines
              as="p"
              className="glow-serif-strong font-serif text-[9svw] font-semibold leading-[1.04] tracking-tight lg:text-[3.8svw]"
              lines={["The Board,", "On Tape."]}
            />
            <Fade delay={0.2}>
              <p className="mt-5 max-w-md font-serif text-[17px] leading-relaxed text-l2">
                Browse the reel — every frame is a{" "}
                <span className="italic text-l1">real card from the app</span>,
                same layouts, same colors, same numbers.
              </p>
            </Fade>
          </div>
          <Fade delay={0.15} className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollByFrame(-1)}
              aria-label="Previous card"
              className="flex h-12 w-12 items-center justify-center border border-line bg-white/[0.04] font-serif text-xl text-l1 transition-colors duration-300 hover:bg-cream hover:text-[#0a0a0a]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByFrame(1)}
              aria-label="Next card"
              className="flex h-12 w-12 items-center justify-center border border-line bg-white/[0.04] font-serif text-xl text-l1 transition-colors duration-300 hover:bg-cream hover:text-[#0a0a0a]"
            >
              →
            </button>
          </Fade>
        </div>
      </div>

      <Fade className="mt-10" y={30}>
        <div
          ref={stripRef}
          className="flex snap-x snap-mandatory gap-7 overflow-x-auto px-[7vw] pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FRAMES.map((spec, i) => (
            <Frame key={spec.title} spec={spec} index={i} />
          ))}
        </div>
      </Fade>
    </section>
  );
}

/** The board — replica app cards spliced into the broadcast's game tape. */
export default function Board() {
  const desktop = useDesktop();
  const reduced = useReducedSafe();
  return desktop && !reduced ? <BoardTheater /> : <BoardStrip />;
}
