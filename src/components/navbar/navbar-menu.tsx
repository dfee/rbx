import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { NavbarContext } from "./navbar-context";

export type NavbarMenuProps = HelpersProps;

export const NavbarMenu = forwardRefAs<NavbarMenuProps, "div">(
  ({ className, ...rest }, ref) => (
    <NavbarContext.Consumer>
      {({ active }) => (
        <Generic
          className={classNames(
            "navbar-menu",
            { "is-active": active },
            className,
          )}
          ref={ref}
          {...rest}
        />
      )}
    </NavbarContext.Consumer>
  ),
  { as: "div" },
);
