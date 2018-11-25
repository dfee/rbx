import { cx } from "emotion";
import * as React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export interface BoxProps extends ModifierProps {
  children?: React.ReactNode;
  style?: {};
}

/**
 * Box
 * @visibleName MyBox
 */
const Box = renderAsExoticComponent<BoxProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element ref={ref} {...props} className={cx("box", className)}>
      {children}
    </Element>
  ),
  "div",
);

export default Box;
