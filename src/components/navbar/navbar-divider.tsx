import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type NavbarDividerProps = HelpersProps;

export const NavbarDivider = forwardRefAs<NavbarDividerProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("navbar-divider", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

NavbarDivider.displayName = "Navbar.Divider";
