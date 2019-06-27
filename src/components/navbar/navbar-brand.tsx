import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type NavbarBrandProps = HelpersProps;

export const NavbarBrand = forwardRefAs<NavbarBrandProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("navbar-brand", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

NavbarBrand.displayName = "Navbar.Brand";
