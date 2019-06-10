import { Prefer } from "../../types";
import { tuple } from "../../utils";

export type VariablesDefinitions = {
  colors: (string | number)[];
  shades: (string | number)[];

  // Float
  floatPulledAlignments: (string | number)[];

  // Responsive
  breakpoints: (string | number)[];
  breakpointsLimited: (string | number)[];

  // Typography
  textAlignments: (string | number)[];
  textSizes: (string | number)[];
  textTransforms: (string | number)[];
  textWeights: (string | number)[];

  // Visibility
  displays: (string | number)[];
};

export const DEFAULTS = {
  colors: tuple(
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
  ),
  shades: tuple(
    "black-bis",
    "black-ter",
    "grey-darker",
    "grey-dark",
    "grey",
    "grey-light",
    "grey-lighter",
    "white-ter",
    "white-bis",
  ),

  // Float
  floatPulledAlignments: tuple("left", "right"),

  // Responsive
  breakpoints: tuple(
    "mobile", // up to 768px
    "tablet", // between 769px and 1023px
    "desktop", // between 1024px and 1215px
    "widescreen", // between 1216px and 1407px
    "fullhd", // 1408px and above
    "touch", // mobile or tablet
  ),
  /**
   * Breakpoints that are limited don't support the `only` option, e.g.:
   *   `is-hidden-mobile`: supported
   *   `is-hidden-mobile-only`: unsupported
   */
  breakpointsLimited: tuple("mobile", "fullhd", "touch"),

  // Typography
  textAlignments: tuple("centered", "justified", "left", "right"),
  textSizes: tuple(1, 2, 3, 4, 5, 6, 7),
  textTransforms: tuple("capitalized", "lowercase", "uppercase"),
  textWeights: tuple("light", "medium", "normal", "semibold", "bold"),

  // Visibility
  displays: tuple("block", "flex", "inline", "inline-block", "inline-flex"),
};

// tslint:disable-next-line: no-empty-interface
export interface VariablesOverrides {}

export interface VariablesDefaults {
  colors: (typeof DEFAULTS.colors)[number];
  shades: (typeof DEFAULTS.shades)[number];

  // Float
  floatPulledAlignments: (typeof DEFAULTS.floatPulledAlignments)[number];

  // Responsive
  breakpoints: (typeof DEFAULTS.breakpoints)[number];
  breakpointsLimited: (typeof DEFAULTS.breakpointsLimited)[number];

  // Typography
  textAlignments: (typeof DEFAULTS.textAlignments)[number];
  textSizes: (typeof DEFAULTS.textSizes)[number];
  textTransforms: (typeof DEFAULTS.textTransforms)[number];
  textWeights: (typeof DEFAULTS.textWeights)[number];

  // Visibility
  displays: (typeof DEFAULTS.displays)[number];
}

export type Variables = Prefer<VariablesOverrides, VariablesDefaults>;
