import Shell, { SportPill } from "./Shell";
import { TvIcon, ChevronRightIcon, Jersey } from "./icons";

/* Kansas City Chiefs @ Buffalo Bills — team colors from team-colors.ts */
const KC = { primary: "#E31837", secondary: "#FFB81C" };
const BUF = { primary: "#00338D", secondary: "#C60C30" };

function TeamRow({
  colors,
  name,
  record,
  score,
  leading,
}: {
  colors: { primary: string; secondary: string };
  name: string;
  record: string;
  score: number;
  leading: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <Jersey primary={colors.primary} secondary={colors.secondary} size={40} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={`truncate text-[14px] leading-tight ${
            leading ? "font-extrabold text-white" : "font-medium text-white/40"
          }`}
        >
          {name}
        </span>
        <span className="text-[10px] text-white/25 tabular">{record}</span>
      </div>
      <span
        className={`font-led text-[26px] leading-none tabular ${
          leading ? "text-white" : "text-white/35"
        }`}
      >
        {score}
      </span>
    </div>
  );
}

/** Faithful replica of the app's live GameCard layout (red ambient glow, LED scores). */
export default function LiveCard() {
  return (
    <Shell away={KC.primary} home={BUF.primary} live>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <SportPill label="NFL" />
          <span className="flex items-center gap-1 rounded-[5px] bg-white px-1.5 py-0.5">
            <span className="animate-live-pulse h-[5px] w-[5px] rounded-full bg-[#DC2626]" />
            <span className="text-[10px] font-bold text-[#DC2626]">LIVE</span>
          </span>
        </div>
        <span
          className="flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-bold text-white"
          style={{
            backgroundColor: "rgba(122,157,184,0.15)",
            borderColor: "rgba(122,157,184,0.3)",
          }}
        >
          <TvIcon className="h-3 w-3 text-white" />
          CBS
        </span>
      </div>

      {/* Teams */}
      <div className="flex flex-col gap-3">
        <TeamRow colors={KC} name="Chiefs" record="11-3" score={20} leading={false} />
        <TeamRow colors={BUF} name="Bills" record="12-2" score={24} leading />
      </div>

      {/* Bottom bar */}
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-2.5">
        <span className="rounded-md border border-white/[0.18] bg-white/[0.12] px-2 py-1 text-[11px] font-bold text-white tabular">
          Q3 · 4:12
        </span>
        <span className="flex items-center gap-0.5 rounded-lg bg-black/40 px-2 py-1 text-[10px] font-bold text-white">
          Details
          <ChevronRightIcon className="h-3 w-3" />
        </span>
      </div>
    </Shell>
  );
}
