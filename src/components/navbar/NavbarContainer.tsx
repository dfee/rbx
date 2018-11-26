import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type NavbarContainerModifierProps = Partial<{
  children: React.ReactNode;
  position: "start" | "end";
  style: React.CSSProperties;
}>;

export type NavbarContainerProps = ModifierProps & NavbarContainerModifierProps;

const NavbarContainer = renderAsExoticComponent<NavbarContainerProps, "div">(
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

export default NavbarContainer;
