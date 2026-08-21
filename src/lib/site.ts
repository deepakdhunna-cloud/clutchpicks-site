/* Shared constants for the Clutch Picks marketing site.
 * League colors mirror the app repo (src/types/sports.ts SPORT_META). */

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/clutch-picks/id6759183746";

export const SUPPORT_EMAIL = "support@clutchpicksapp.com";

/** Signature easing — matches the reference site's --cubic-66. */
export const EASE: [number, number, number, number] = [0.66, 0, 0.01, 1];

export interface League {
  abbr: string;
  name: string;
  color: string;
}

/** Current supported competitions, using colors from the app's SPORT_META. */
export const LEAGUES: League[] = [
  { abbr: "NBA", name: "NBA Basketball", color: "#8B0A1F" },
  { abbr: "NFL", name: "NFL Football", color: "#2E4A5E" },
  { abbr: "MLB", name: "MLB Baseball", color: "#9FABB8" },
  { abbr: "NHL", name: "NHL Hockey", color: "#3D5A6F" },
  { abbr: "MLS", name: "MLS Soccer", color: "#C9BDA8" },
  { abbr: "EPL", name: "Premier League", color: "#6A0818" },
  { abbr: "UCL", name: "Champions League", color: "#1A2A6C" },
  { abbr: "WC", name: "World Cup", color: "#B49A56" },
  { abbr: "IPL", name: "IPL Cricket", color: "#D7A21E" },
  { abbr: "TENNIS", name: "ATP & WTA Tennis", color: "#7A9DB8" },
  { abbr: "CFB", name: "College Football", color: "#5A7A8A" },
  { abbr: "CBB", name: "College Basketball", color: "#D98E76" },
];

export interface ConfidenceTier {
  label: string;
  range: string;
  color: string;
  width: number; // % of ladder bar
}

/** Confidence tiers — exact ramp from the app's display-confidence.ts. */
export const CONFIDENCE_TIERS: ConfidenceTier[] = [
  { label: "Toss-Up", range: "< 53%", color: "#6B7280", width: 53 },
  { label: "Lean Pick", range: "53–59%", color: "#8EA4B8", width: 59 },
  { label: "Solid Pick", range: "60–66%", color: "#A8BAC8", width: 66 },
  { label: "Strong Pick", range: "67–74%", color: "#CBD5E1", width: 74 },
  { label: "Lock", range: "75%+", color: "#F1F5F9", width: 100 },
];
