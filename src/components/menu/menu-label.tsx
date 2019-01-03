import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type MenuLabelProps = HelpersProps;

export const MenuLabel = forwardRefAs<MenuLabelProps, "p">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("menu-label", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "p" },
);
