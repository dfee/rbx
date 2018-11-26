import { cx } from "emotion";
import { ComponentProps } from "react";

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

export default {
  classNames: (props: ComponentProps<any>) =>
    cx({
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
  clean: ({
    hidden,
    clearfix,
    paddingless,
    pull,
    marginless,
    overlay,
    clipped,
    radiusless,
    shadowless,
    unselectable,
    invisible,
    ...props
  }: ComponentProps<any>) => props,
};
