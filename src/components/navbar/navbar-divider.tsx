import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type NavbarDividerProps = HelpersProps;

export const NavbarDivider = forwardRefAs<NavbarDividerProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("navbar-divider", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
