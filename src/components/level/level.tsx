import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { Breakpoints } from "@/modifiers/responsives";
import { LevelItem } from "./level-item";
import { LevelSide } from "./level-side";

export type LevelModifierProps = Partial<{
  breakpoint: Breakpoints;
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type LevelProps = ModifierProps & LevelModifierProps;

export const Level = Object.assign(
  renderAsExoticComponent<LevelProps, "div">(
    ({ children, className, breakpoint, ...props }, ref) => (
      <Element
        {...props}
        ref={ref}
        className={cx("level", className, {
          [`is-${breakpoint}`]: breakpoint,
        })}
      >
        {children}
      </Element>
    ),
    "div",
  ),
  {
    Item: LevelItem,
    Side: LevelSide,
  },
);
Level.defaultProps = Object.assign(
  {
    children: null,
  },
  Level.defaultProps,
);
