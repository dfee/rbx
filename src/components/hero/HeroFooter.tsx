import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type HeroFooterModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type HeroFooterProps = ModifierProps & HeroFooterModifierProps;

const HeroFooter = renderAsExoticComponent<HeroFooterProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element ref={ref} {...props} className={cx(className, "hero-foot")}>
      {children}
    </Element>
  ),
  "div",
);
HeroFooter.defaultProps = Object.assign(
  {
    children: null,
  },
  HeroFooter.defaultProps,
);

export default HeroFooter;
