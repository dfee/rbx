import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { NavbarDropdown } from "./navbar-dropdown";
import { NavbarLink } from "./navbar-link";

export type NavbarItemModifierProps = Partial<{
  active: boolean;
  dropdown: boolean;
  dropdownUp: boolean;
  hoverable: boolean;
}>;

export type NavbarItemProps = ModifierProps & NavbarItemModifierProps;

export const NavbarItem = Object.assign(
  forwardRefAs<NavbarItemProps, "a">((props, ref) => {
    const {
      as,
      active,
      dropdown,
      dropdownUp,
      hoverable,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("navbar-item", rest.className, {
      "has-dropdown": dropdown,
      "has-dropdown-up": dropdownUp,
      "is-active": active,
      "is-hoverable": hoverable,
    });

    const asOverride = dropdown && as === "a" ? "span" : as;
    return React.createElement(asOverride!, { ref, ...rest });
  }, "a"),
  {
    Dropdown: NavbarDropdown,
    Link: NavbarLink,
  },
);

NavbarItem.defaultProps = Object.assign(
  {
    active: false,
    dropdown: false,
    dropdownUp: false,
    hoverable: false,
  },
  NavbarItem.defaultProps,
);
