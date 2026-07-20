"use client";

import type { ReactNode } from "react";
import { Eyebrow, Fade } from "./Reveal";
import GameCard from "./board/GameCard";
import LiveCard from "./board/LiveCard";
import RecordCard from "./board/RecordCard";
import AnalystCard from "./board/AnalystCard";

function BoardItem({
  children,
  tag,
  tagColor = "#7A9DB8",
  tagText = "#04070A",
  title,
  meta,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  tag: string;
  tagColor?: string;
  tagText?: string;
  title: string;
  meta: string;
  className?: string;
  delay?: number;
}) {
  return (
    <Fade
      className={`group relative flex flex-col gap-3 ${className}`}
      delay={delay}
      y={28}
    >
      <div className="relative transition-transform duration-500 ease-out lg:group-hover:-translate-y-1.5">
        <span
          className="absolute -top-2 right-3 z-10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
          style={{ backgroundColor: tagColor, color: tagText }}
        >
          {tag}
        </span>
        {children}
      </div>
      <div className="flex items-baseline justify-between gap-3 font-mono text-xs uppercase tracking-[0.12em]">
        <span className="min-w-0 truncate text-l2">{title}</span>
        <span className="whitespace-nowrap text-l4 tabular">{meta}</span>
      </div>
    </Fade>
  );
}

/** The board — replica app cards on a staggered editorial grid. */
export default function Board() {
  return (
    <section
      id="board"
      className="grid w-full grid-cols-12 gap-x-6 gap-y-16 px-4 py-24 lg:px-14 lg:py-32"
    >
      <Eyebrow
        index="01"
        title="The Board"
        meta="Real cards from the app — same layouts, same colors"
      />

      <BoardItem
        className="col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-6 lg:col-start-6"
        tag="Pro · Strong Pick"
        tagColor="#CBD5E1"
        title="Game Card — Pregame Read"
        meta="NBA · 68% Conf"
      >
        <GameCard />
      </BoardItem>

      <BoardItem
        className="col-span-12 sm:col-span-9 lg:col-span-5 lg:col-start-1"
        tag="Live"
        tagColor="#DC2626"
        tagText="#FFFFFF"
        title="Live Card — Real-Time Scores"
        meta="SSE · 3s Fallback"
        delay={0.08}
      >
        <LiveCard />
      </BoardItem>

      <BoardItem
        className="col-span-12 sm:col-span-9 sm:col-start-4 lg:col-span-5 lg:col-start-7"
        tag="Free"
        title="Pick History — Your Record"
        meta="Streaks & Rings"
        delay={0.05}
      >
        <RecordCard />
      </BoardItem>

      <BoardItem
        className="col-span-12 sm:col-span-9 lg:col-span-5 lg:col-start-2"
        tag="Share Card"
        tagColor="#B4D3EB"
        title="Analyst Card — Own Your Season"
        meta="Accuracy · Form"
        delay={0.1}
      >
        <AnalystCard />
      </BoardItem>
    </section>
  );
}
