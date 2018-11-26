import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type BoxModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type BoxProps = ModifierProps & BoxModifierProps;

const Box = renderAsExoticComponent<BoxProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element ref={ref} {...props} className={cx("box", className)}>
      {children}
    </Element>
  ),
  "div",
);

export default Box;
