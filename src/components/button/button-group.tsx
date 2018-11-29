import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type ButtonGroupModifierProps = Partial<{
  className: string;
  hasAddons: boolean;
  position: "centered" | "right";
}>;

export type ButtonGroupProps = ModifierProps & ButtonGroupModifierProps;

export const ButtonGroup = extendedForwardRef<ButtonGroupProps, "div">(
  ({ children, className, hasAddons, position, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("buttons", className, {
        "has-addons": hasAddons,
        [`is-${[position]}`]: position,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);
