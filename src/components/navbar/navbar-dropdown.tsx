import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type NavbarDropdownModifierProps = Partial<{
  boxed: boolean;
  className: string;
  right: boolean;
}>;

export type NavbarDropdownProps = ModifierProps & NavbarDropdownModifierProps;

export const NavbarDropdown = forwardRefAs<NavbarDropdownProps, "span">(
  (props, ref) => {
    const { as, boxed, right, ...rest } = transformModifiers(props);
    rest.className = classNames("navbar-dropdown", rest.className, {
      "is-boxed": boxed,
      "is-right": right,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
