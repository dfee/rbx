import { cx } from "emotion";

import { makeModify } from "./utils";

export type HelpersProps = Partial<{
  clearfix: boolean;
  pull: "right" | "left";
  marginless: boolean;
  paddingless: boolean;
  overlay: boolean;
  clipped: boolean;
  radiusless: boolean;
  shadowless: boolean;
  unselectable: boolean;
  invisible: boolean;
  hidden: boolean;
}>;

export const modify = makeModify<HelpersProps>(
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
