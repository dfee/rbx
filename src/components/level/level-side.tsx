import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type LevelSideModifierProps = Partial<{
  align: string;
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type LevelSideProps = ModifierProps & LevelSideModifierProps;

export const LevelSide = renderAsExoticComponent<LevelSideProps, "div">(
  ({ children, className, align, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx(className, {
        [`level-${align}`]: align,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);
LevelSide.defaultProps = Object.assign(
  {
    align: "left",
    children: null,
  },
  LevelSide.defaultProps,
);
