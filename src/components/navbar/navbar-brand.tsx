import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type NavbarBrandModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}>;

export type NavbarBrandProps = ModifierProps &
  NavbarBrandModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"div">, "unselectable">>;

export const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, children, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("navbar-brand", className)}>
      {children}
    </Element>
  ),
);
NavbarBrand.defaultProps = {
  children: null,
};
