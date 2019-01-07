import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type NavbarEndProps = HelpersProps;

export const NavbarEnd = forwardRefAs<NavbarEndProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("navbar-end", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
