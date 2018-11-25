import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type NavbarDropdownModifierProps = Partial<{
  boxed: boolean;
  children: React.ReactNode;
  right: boolean;
  style: {};
}>;

export type NavbarDropdownProps = ModifierProps & NavbarDropdownModifierProps;

const NavbarDropdown = renderAsExoticComponent<NavbarDropdownProps, "span">(
  ({ className, boxed, right, children, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("navbar-dropdown", className, {
        "is-boxed": boxed,
        "is-right": right,
      })}
    >
      {children}
    </Element>
  ),
  "span",
);
NavbarDropdown.defaultProps = Object.assign(
  {
    boxed: false,
    children: null,
    right: false,
  },
  NavbarDropdown.defaultProps,
);

export default NavbarDropdown;
