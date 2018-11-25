import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type FooterModifierProps = Partial<{
  children: React.ReactNode;
  style: {};
}>;

type FooterProps = ModifierProps & FooterModifierProps;

const Footer = renderAsExoticComponent<FooterProps, "div">(
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

export default Footer;
