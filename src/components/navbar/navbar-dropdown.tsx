import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarDropdownModifierProps = Partial<{
  boxed: boolean;
  right: boolean;
}>;

export type NavbarDropdownProps = ModifierProps & NavbarDropdownModifierProps;

export const NavbarDropdown = asExoticComponent<NavbarDropdownProps, "span">(
  (props, ref) => {
    const { as, boxed, right, ...rest } = transformModifiers(props);
    rest.className = cx("navbar-dropdown", rest.className, {
      "is-boxed": boxed,
      "is-right": right,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "span",
);

NavbarDropdown.defaultProps = Object.assign(
  {
    boxed: false,
    right: false,
  },
  NavbarDropdown.defaultProps,
);
