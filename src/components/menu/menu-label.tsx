import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

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
