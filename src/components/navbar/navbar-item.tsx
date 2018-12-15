import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type NavbarItemModifierProps = Partial<{
  active: boolean;
  className: string;
  dropdown: boolean;
  dropdownUp: boolean;
  hoverable: boolean;
}>;

export type NavbarItemProps = HelpersProps & NavbarItemModifierProps;

export const NavbarItem = forwardRefAs<NavbarItemProps, "a">(
  (props, ref) => {
    const {
      as,
      active,
      dropdown,
      dropdownUp,
      hoverable,
      ...rest
    } = transformHelpers(props);
    rest.className = classNames("navbar-item", rest.className, {
      "has-dropdown": dropdown,
      "has-dropdown-up": dropdownUp,
      "is-active": active,
      "is-hoverable": hoverable,
    });

    const asOverride = dropdown && as === "a" ? "div" : as;
    return React.createElement(asOverride!, { ref, ...rest });
  },
  { as: "a" },
);
