import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/colors";

export type HelpModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  color: Colors;
}>;

export type HelpProps = ModifierProps & HelpModifierProps;

export const Help = renderAsExoticComponent<HelpProps, "p">(
  ({ className, children, color, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("help", className, {
        [`is-${color}`]: color,
      })}
    >
      {children}
    </Element>
  ),
  "p",
);
Help.defaultProps = Object.assign(
  {
    children: null,
  },
  Help.defaultProps,
);
