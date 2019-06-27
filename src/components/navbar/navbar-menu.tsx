import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { useNavbar } from "./navbar-context";

export type NavbarMenuProps = HelpersProps;

export const NavbarMenu = forwardRefAs<NavbarMenuProps>(
  ({ className, ...rest }, ref) => {
    const { active } = useNavbar();

    return (
      <Generic
        ref={ref}
        className={classNames(
          "navbar-menu",
          { "is-active": active },
          className,
        )}
        {...rest}
      />
    );
  },
  { as: "div" },
);

NavbarMenu.displayName = "Navbar.Menu";
