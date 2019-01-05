import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

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
