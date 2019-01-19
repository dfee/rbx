import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type MenuLabelProps = HelpersProps;

export const MenuLabel = forwardRefAs<MenuLabelProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("menu-label", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "p" },
);

MenuLabel.displayName = "Menu.Label";
