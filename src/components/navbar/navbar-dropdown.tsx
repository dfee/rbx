import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type NavbarDropdownModifierProps = Partial<{
  boxed: boolean;
  className: string;
  right: boolean;
}>;

export type NavbarDropdownProps = HelpersProps & NavbarDropdownModifierProps;

export const NavbarDropdown = forwardRefAs<NavbarDropdownProps, "span">(
  (props, ref) => {
    const { as, boxed, right, ...rest } = transformHelpers(props);
    rest.className = classNames("navbar-dropdown", rest.className, {
      "is-boxed": boxed,
      "is-right": right,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
