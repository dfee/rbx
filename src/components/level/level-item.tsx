import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type LevelItemModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type LevelItemProps = ModifierProps & LevelItemModifierProps;

export const LevelItem = extendedForwardRef<LevelItemProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("level-item", className, {})}>
      {children}
    </Element>
  ),
  "div",
);
LevelItem.defaultProps = Object.assign(
  {
    children: null,
  },
  LevelItem.defaultProps,
);
