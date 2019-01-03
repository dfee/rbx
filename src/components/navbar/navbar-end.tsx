import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

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
