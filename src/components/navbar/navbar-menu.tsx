import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { NavbarContext } from "./navbar-context";

export type NavbarMenuProps = HelpersProps;

export const NavbarMenu = forwardRefAs<NavbarMenuProps>(
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

NavbarMenu.displayName = "Navbar.Menu";
