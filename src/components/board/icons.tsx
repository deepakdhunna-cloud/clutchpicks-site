/** Tiny inline icons used by the replica app cards. */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function TrendingUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

export function TvIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 2l4 5 4-5" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

import {
  MiniJerseyModel,
  type JerseyModelVariant,
} from "./jerseyVisuals";

/** The app's real jersey renderer (ported MiniJerseyModel). */
export function Jersey({
  primary,
  secondary,
  abbr,
  teamName,
  variant = "football",
  size = 44,
}: {
  primary: string;
  secondary: string;
  abbr: string;
  teamName?: string;
  variant?: JerseyModelVariant;
  size?: number;
}) {
  return (
    <MiniJerseyModel
      variant={variant}
      primary={primary}
      secondary={secondary}
      accent="#FFFFFF"
      abbr={abbr}
      teamName={teamName}
      size={size}
    />
  );
}
