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

/** Simple team jersey in team colors (after the app's JerseyIcon). */
export function Jersey({
  primary,
  secondary,
  size = 44,
  className = "",
}: {
  primary: string;
  secondary: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* body + sleeves */}
      <path
        d="M22 7 C25 12 39 12 42 7 L57 15 L51 30 L45 26 L45 57 L19 57 L19 26 L13 30 L7 15 Z"
        fill={primary}
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.5"
      />
      {/* sleeve trim */}
      <path d="M7 15 L13 30 L15.5 28.5 L10 13.5 Z" fill={secondary} />
      <path d="M57 15 L51 30 L48.5 28.5 L54 13.5 Z" fill={secondary} />
      {/* collar */}
      <path
        d="M22 7 C25 12 39 12 42 7"
        fill="none"
        stroke={secondary}
        strokeWidth="3"
      />
      {/* hem stripe */}
      <rect x="19" y="50" width="26" height="3.5" fill={secondary} opacity={0.85} />
    </svg>
  );
}
