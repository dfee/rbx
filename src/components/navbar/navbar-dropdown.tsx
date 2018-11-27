import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type NavbarDropdownModifierProps = Partial<{
  boxed: boolean;
  children: React.ReactNode;
  right: boolean;
  style: React.CSSProperties;
}>;

export type NavbarDropdownProps = ModifierProps & NavbarDropdownModifierProps;

export const NavbarDropdown = renderAsExoticComponent<
  NavbarDropdownProps,
  "span"
>(
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
