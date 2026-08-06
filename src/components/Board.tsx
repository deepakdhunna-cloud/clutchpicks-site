"use client";

import { useRef, type ReactNode } from "react";
import { Eyebrow, Fade, MaskLines } from "./Reveal";
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

function Frame({ spec, index }: { spec: FrameSpec; index: number }) {
  return (
    <figure className="w-[min(86vw,500px)] flex-none snap-center">
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

/** The board — replica app cards spliced into a broadcast film strip. */
export default function Board() {
  const stripRef = useRef<HTMLDivElement>(null);
  const scrollByFrame = (dir: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.72, 540), behavior: "smooth" });
  };

  return (
    <section id="board" className="w-full py-24 lg:py-32">
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

          {/* reel controls */}
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

      {/* the strip — full bleed, snap scrolling */}
      <Fade className="mt-10 lg:mt-14" y={30}>
        <div
          ref={stripRef}
          className="flex snap-x snap-mandatory gap-7 overflow-x-auto px-[7vw] pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-9 lg:px-[10vw]"
        >
          {FRAMES.map((spec, i) => (
            <Frame key={spec.title} spec={spec} index={i} />
          ))}
        </div>
      </Fade>
    </section>
  );
}
