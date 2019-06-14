import { Prefer } from "../../types";

export type VariablesDefinitions = {
  colors: Readonly<(string | number)[]>;
  shades: Readonly<(string | number)[]>;

  // Badge
  badgeSizes: Readonly<(string | number)[]>;

  // Float
  floatPulledAlignments: Readonly<(string | number)[]>;

  // Responsive
  breakpoints: Readonly<(string | number)[]>;
  breakpointsLimited: Readonly<(string | number)[]>;

  // Tooltip
  tooltipPositions: Readonly<(string | number)[]>;

  // Typography
  textAlignments: Readonly<(string | number)[]>;
  textSizes: Readonly<(string | number)[]>;
  textTransforms: Readonly<(string | number)[]>;
  textWeights: Readonly<(string | number)[]>;

  // Visibility
  displays: Readonly<(string | number)[]>;
};

export const DEFAULTS = {
  colors: [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark",
    "white",
    "black",
    "link",
  ] as const,
  shades: [
    "black-bis",
    "black-ter",
    "grey-darker",
    "grey-dark",
    "grey",
    "grey-light",
    "grey-lighter",
    "white-ter",
    "white-bis",
  ] as const,

  // Badge
  badgeSizes: ["small", "medium", "large"] as const,

  // Float
  floatPulledAlignments: ["left", "right"] as const,

  // Responsive
  breakpoints: [
    "mobile", // up to 768px
    "tablet", // between 769px and 1023px
    "desktop", // between 1024px and 1215px
    "widescreen", // between 1216px and 1407px
    "fullhd", // 1408px and above
    "touch", // mobile or tablet
  ] as const,
  /**
   * Breakpoints that are limited don't support the `only` option, e.g.:
   *   `is-hidden-mobile`: supported
   *   `is-hidden-mobile-only`: unsupported
   */
  breakpointsLimited: ["mobile", "fullhd", "touch"] as const,

  // Tooltips:
  tooltipPositions: ["top", "right", "bottom", "left"] as const,

  // Typography
  textAlignments: ["centered", "justified", "left", "right"] as const,
  textSizes: [1, 2, 3, 4, 5, 6, 7] as const,
  textTransforms: ["capitalized", "lowercase", "uppercase"] as const,
  textWeights: ["light", "medium", "normal", "semibold", "bold"] as const,

  // Visibility
  displays: ["block", "flex", "inline", "inline-block", "inline-flex"] as const,
};

// tslint:disable-next-line: no-empty-interface
export interface VariablesOverrides {}

export interface VariablesDefaults {
  colors: (typeof DEFAULTS.colors)[number];
  shades: (typeof DEFAULTS.shades)[number];

  // Badge
  badgeSizes: (typeof DEFAULTS.badgeSizes)[number];

  // Float
  floatPulledAlignments: (typeof DEFAULTS.floatPulledAlignments)[number];

  // Responsive
  breakpoints: (typeof DEFAULTS.breakpoints)[number];
  breakpointsLimited: (typeof DEFAULTS.breakpointsLimited)[number];

  // Typography
  tooltipPositions: (typeof DEFAULTS.tooltipPositions)[number];

  // Typography
  textAlignments: (typeof DEFAULTS.textAlignments)[number];
  textSizes: (typeof DEFAULTS.textSizes)[number];
  textTransforms: (typeof DEFAULTS.textTransforms)[number];
  textWeights: (typeof DEFAULTS.textWeights)[number];

  // Visibility
  displays: (typeof DEFAULTS.displays)[number];
}

export type Variables = Prefer<VariablesOverrides, VariablesDefaults>;
