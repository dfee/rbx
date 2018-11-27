import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type HeroHeadModifierProps = Partial<{
  children?: React.ReactNode;
  style?: {};
}>;

export type HeroHeadProps = ModifierProps & HeroHeadModifierProps;

export const HeroHead = renderAsExoticComponent<HeroHeadProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element ref={ref} {...props} className={cx(className, "hero-head")}>
      {children}
    </Element>
  ),
  "div",
);
HeroHead.defaultProps = Object.assign(
  {
    children: null,
  },
  HeroHead.defaultProps,
);
