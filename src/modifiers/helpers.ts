import { cx } from "emotion";

import { makeTransform } from "./utils";

export type HelpersProps = Partial<{
  clearfix: boolean;
  clipped: boolean;
  hidden: boolean;
  invisible: boolean;
  marginless: boolean;
  overlay: boolean;
  paddingless: boolean;
  pull: "right" | "left";
  radiusless: boolean;
  shadowless: boolean;
  unselectable: boolean;
}>;

export const transformHelpersModifiers = makeTransform<HelpersProps>(
  props =>
    cx(props.className, {
      "is-clearfix": props.clearfix,
      "is-clipped": props.clipped,
      "is-hidden": props.hidden,
      "is-invisible": props.invisible,
      "is-marginless": props.marginless,
      "is-overlay": props.overlay,
      "is-paddingless": props.paddingless,
      [`is-pulled-${props.pull}`]: props.pull,
      "is-radiusless": props.radiusless,
      "is-shadowless": props.shadowless,
      "is-unselectable": props.unselectable,
    }),
  [
    "clearfix",
    "clipped",
    "hidden",
    "invisible",
    "marginless",
    "overlay",
    "paddingless",
    "pull",
    "radiusless",
    "shadowless",
    "unselectable",
  ],
);
