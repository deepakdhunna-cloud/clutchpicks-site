import type { ReactNode } from "react";

/**
 * The app's "raised hyper-glass" card shell (GameCard.tsx):
 * radius-24 outer bevel filled by a diagonal gradient tinted with the away
 * accent top-left and home accent bottom-right, white specular corners,
 * a 1px inner bevel, then the dark card body with team-color corner bleeds.
 */
export default function Shell({
  away,
  home,
  live = false,
  children,
}: {
  away: string;
  home: string;
  live?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative rounded-[24px]"
      style={{
        boxShadow: live
          ? "0 24px 48px -12px rgba(0,0,0,0.85), 0 0 22px rgba(220,38,38,0.18)"
          : "0 24px 48px -12px rgba(0,0,0,0.85)",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[24px] p-[4px]"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.40) 0%, ${away}B8 8%, ${away}58 22%, #0D1118 43%, #020409 57%, ${home}58 78%, ${home}B8 92%, rgba(255,255,255,0.22) 100%)`,
        }}
      >
        {/* top glint strip */}
        <div
          className="absolute left-1/3 top-0 h-[3px] w-1/3 rounded-full bg-white/25 blur-[1px]"
          aria-hidden="true"
        />
        <div className="rounded-[20px] bg-black/75 p-px">
          <div
            className="relative overflow-hidden rounded-[19px]"
            style={{ background: "rgba(8,8,12,0.95)" }}
          >
            {/* team-color corner bleeds */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(to top right, ${away}66 0%, ${away}14 34%, transparent 62%)`,
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(to top left, ${home}66 0%, ${home}14 34%, transparent 62%)`,
              }}
              aria-hidden="true"
            />
            {/* light from above */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[50px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.14), rgba(255,255,255,0.04), transparent)",
              }}
              aria-hidden="true"
            />
            <div className="relative p-3">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small league pill (bg TEAL_15, teal border) used across cards. */
export function SportPill({ label }: { label: string }) {
  return (
    <span
      className="rounded-[5px] border px-1.5 py-0.5 text-[10px] font-bold text-white"
      style={{
        backgroundColor: "rgba(122,157,184,0.15)",
        borderColor: "rgba(122,157,184,0.3)",
      }}
    >
      {label}
    </span>
  );
}
