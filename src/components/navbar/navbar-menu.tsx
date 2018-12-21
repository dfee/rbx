import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Prefer } from "../../types";
import { NavbarContext } from "./navbar-context";

export type NavbarMenuProps = Prefer<
  HelpersProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarMenu = Object.assign(
  forwardRefAs<NavbarMenuProps, "div">(
    (props, ref) => {
      return (
        <NavbarContext.Consumer>
          {({ active }) => {
            const { as, ...rest } = transformHelpers(props);
            rest.className = classNames("navbar-menu", rest.className, {
              "is-active": active,
            });
            return React.createElement(as!, { ref, ...rest });
          }}
        </NavbarContext.Consumer>
      );
    },
    { as: "div" },
  ),
  { propTypes: genericPropTypes },
);
