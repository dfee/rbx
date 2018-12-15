import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps } from "../../modifiers";
import { NavbarContext } from "./navbar-context";

export type NavbarMenuProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarMenu = forwardRefAs<NavbarMenuProps, "div">(
  (props, ref) => {
    return (
      <NavbarContext.Consumer>
        {({ active }) => {
          const { as, ...rest } = props;
          rest.className = classNames("navbar-menu", rest.className, {
            "is-active": active,
          });
          return React.createElement(as!, { ref, ...rest });
        }}
      </NavbarContext.Consumer>
    );
  },
  { as: "div" },
);
