import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type FooterModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

type FooterProps = ModifierProps & FooterModifierProps;

export const Footer = extendedForwardRef<FooterProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("footer", className)}>
      {children}
    </Element>
  ),
  "div",
);
Footer.defaultProps = Object.assign(
  {
    children: null,
  },
  Footer.defaultProps,
);
