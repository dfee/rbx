import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type NavbarLinkModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type NavbarLinkProps = ModifierProps & NavbarLinkModifierProps;

export const NavbarLink = extendedForwardRef<NavbarLinkProps, "span">(
  ({ className, children, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("navbar-link", className)}>
      {children}
    </Element>
  ),
  "span",
);
NavbarLink.defaultProps = Object.assign(
  {
    children: null,
  },
  NavbarLink.defaultProps,
);
