import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type NavbarBrandProps = HelpersProps;

export const NavbarBrand = forwardRefAs<NavbarBrandProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("navbar-brand", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

NavbarBrand.displayName = "Navbar.Brand";
