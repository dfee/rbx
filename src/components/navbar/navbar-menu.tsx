import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { ModifierProps } from "modifiers";
import { ShowContext } from "./context";

export type NavbarMenuModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}>;

export type NavbarMenuProps = ModifierProps &
  NavbarMenuModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"div">, "unselectable">>;

export const NavbarMenu = React.forwardRef<HTMLDivElement, NavbarMenuProps>(
  ({ className, children, ...props }, ref) => (
    <ShowContext.Consumer>
      {({ active }) => (
        <Element
          {...props}
          ref={ref}
          className={cx("navbar-menu", className, {
            "is-active": active,
          })}
        >
          {children}
        </Element>
      )}
    </ShowContext.Consumer>
  ),
);
NavbarMenu.defaultProps = {
  children: null,
};
