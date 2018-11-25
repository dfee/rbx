import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Breakpoints } from "modifiers/responsives";
import LevelItem from "./components/level-item";
import LevelSide from "./components/level-side";

export type LevelModifierProps = Partial<{
  breakpoint: Breakpoints;
  children: React.ReactNode;
  style: {};
}>;

export type LevelProps = ModifierProps & LevelModifierProps;

type Level = RenderAsExoticComponent<LevelProps, "div"> & {
  Item: typeof LevelItem;
  Side: typeof LevelSide;
};

const Level: Partial<Level> = renderAsExoticComponent<LevelProps, "div">(
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
);
Level.defaultProps = Object.assign(
  {
    children: null,
  },
  Level.defaultProps,
);

Level.Item = LevelItem;
Level.Side = LevelSide;

export default Level as Level;
