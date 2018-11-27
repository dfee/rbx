import { cx } from "emotion";
import * as React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type BoxModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type BoxProps = ModifierProps & BoxModifierProps;

export const Box = renderAsExoticComponent<BoxProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element ref={ref} {...props} className={cx("box", className)}>
      {children}
    </Element>
  ),
  "div",
);
