import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import { ModifierProps } from "modifiers";

export type NavbarDividerModifierProps = Partial<{
  className: string;
  style: React.CSSProperties;
}>;

export type NavbarDividerProps = ModifierProps &
  NavbarDividerModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"div">, "unselectable">>;

const NavbarDivider = React.forwardRef<HTMLDivElement, NavbarDividerProps>(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("navbar-divider", className)} />
  ),
);

export default NavbarDivider;
