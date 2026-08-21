import { useId } from "react";
import { LEAGUES } from "@/lib/site";

/**
 * Pennant brand mark — a sports flag striped in the supported competition colors,
 * flying off a short mast. Ours, not anyone's globe.
 */
export default function StripeMark({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const w = size * 1.55;
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 31 20"
      className={`flex-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* pennant triangle, nose to the right */}
        <clipPath id={`pennant-${id}`}>
          <path d="M5 1 L30 10 L5 19 Z" />
        </clipPath>
      </defs>
      {/* mast */}
      <rect x="1.2" y="0" width="2.1" height="20" rx="1" fill="currentColor" opacity="0.85" />
      {/* league stripes fill the flag */}
      <g clipPath={`url(#pennant-${id})`}>
        {LEAGUES.map((l, i) => (
          <rect
            key={l.abbr}
            x="5"
            y={1 + i * (18 / LEAGUES.length)}
            width="25"
            height={18 / LEAGUES.length + 0.3}
            fill={l.color}
          />
        ))}
      </g>
    </svg>
  );
}
