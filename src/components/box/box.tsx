import { cx } from "emotion";
import * as React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type BoxModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}>;

export type BoxProps = ModifierProps & BoxModifierProps;

export const Box = extendedForwardRef<BoxProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element ref={ref} {...props} className={cx("box", className)}>
      {children}
    </Element>
  ),
  "div",
);
