import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type NavbarContainerModifierProps = Partial<{
  children: React.ReactNode;
  position: "start" | "end";
  style: React.CSSProperties;
}>;

export type NavbarContainerProps = ModifierProps & NavbarContainerModifierProps;

export const NavbarContainer = extendedForwardRef<
  NavbarContainerProps,
  "div"
>(
  ({ className, children, position, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx(
        {
          [`navbar-${position}`]: position,
        },
        className,
      )}
    >
      {children}
    </Element>
  ),
  "div",
);
NavbarContainer.defaultProps = Object.assign(
  {
    children: null,
    position: "start",
  },
  NavbarContainer.defaultProps,
);
