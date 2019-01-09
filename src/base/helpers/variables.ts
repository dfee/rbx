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
    "mobile",
    "tablet",
    "desktop",
    "widescreen",
    "fullhd",
    "touch",
  ),
  /**
   * Breakpoints that are limited don't support the `only` option, e.g.:
   *   `is-hidden-mobile`: supported
   *   `is-hidden-mobile-only`: unsupported
   */
  breakpointsLimited: tuple("mobile", "fullhd", "touch"),

  // Typography
  textAlignments: tuple("centered", "justified", "left", "right"),
  textSizes: tuple(1, 2, 3, 4, 5, 6),
  textTransforms: tuple("capitalized", "lowercase", "uppercase"),
  textWeights: tuple("light", "normal", "semibold", "bold"),

  // Visibility
  displays: tuple("block", "flex", "inline", "inline-block", "inline-flex"),
};

// tslint:disable-next-line: no-empty-interface
interface VariablesOverrides {}

interface VariablesDefaults {
  Colors: (typeof DEFAULTS.colors)[number];
  Shades: (typeof DEFAULTS.shades)[number];

  // Float
  FloatPulledAlignments: (typeof DEFAULTS.floatPulledAlignments)[number];

  // Responsive
  Breakpoints: (typeof DEFAULTS.breakpoints)[number];
  BreakpointsLimited: (typeof DEFAULTS.breakpointsLimited)[number];

  // Typography
  TextAlignments: (typeof DEFAULTS.textAlignments)[number];
  TextSizes: (typeof DEFAULTS.textSizes)[number];
  TextTransforms: (typeof DEFAULTS.textTransforms)[number];
  TextWeights: (typeof DEFAULTS.textWeights)[number];

  // Visibility
  Displays: (typeof DEFAULTS.displays)[number];
}

export type Variables = Prefer<VariablesOverrides, VariablesDefaults>;
