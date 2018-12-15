import classNames from "classnames";

import { tuple } from "../utils";
import { makeTransform } from "./utils";

export const FLOAT_PULLED_ALIGNMENTS = tuple("left", "right");
export type FloatPulledAlignments = (typeof FLOAT_PULLED_ALIGNMENTS)[number];

export type FloatHelpersProps = Partial<{
  /** Fixes an element's floating children */
  clearfix: boolean;
  /** Moves an element to the left or right */
  pull: FloatPulledAlignments;
}>;

export type SpacingHelpersProps = Partial<{
  /** Removes any margin */
  marginless: boolean;
  /** Removes any padding */
  paddingless: boolean;
}>;

export type OtherHelpersProps = Partial<{
  /** Adds overflow hidden */
  clipped: boolean;
  /** Hides an element (unclear on where this is documented in Bulma) */
  hidden: boolean;
  /** Adds visibility hidden */
  invisible: boolean;
  /** Completely covers the first positioned parent */
  overlay: boolean;
  /** Removes any radius */
  radiusless: boolean;
  /** Removes any shadow */
  shadowless: boolean;
  /**
   * Hide elements visually but keep the element available to be announced by a
   * screen reader
   */
  srOnly: boolean;
  /** Prevents the text from being selectable */
  unselectable: boolean;
}>;

export type HelpersProps = FloatHelpersProps &
  SpacingHelpersProps &
  OtherHelpersProps;

// tslint:disable:object-literal-sort-keys
export const transformHelpersModifiers = makeTransform<HelpersProps>(
  props =>
    classNames(props.className, {
      // Float
      "is-clearfix": props.clearfix,
      [`is-pulled-${props.pull}`]: props.pull,
      // Spacing
      "is-marginless": props.marginless,
      "is-paddingless": props.paddingless,
      // Other
      "is-clipped": props.clipped,
      "is-hidden": props.hidden,
      "is-invisible": props.invisible,
      "is-overlay": props.overlay,
      "is-radiusless": props.radiusless,
      "is-shadowless": props.shadowless,
      "is-sr-only": props.srOnly,
      "is-unselectable": props.unselectable,
    }),
  [
    // Float
    "clearfix",
    "pull",
    // Spacing
    "marginless",
    "paddingless",
    // Other
    "clipped",
    "hidden",
    "invisible",
    "overlay",
    "radiusless",
    "shadowless",
    "srOnly",
    "unselectable",
  ],
);
// tslint:enable:object-literal-sort-keys
