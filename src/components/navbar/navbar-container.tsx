import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarContainerModifierProps = Partial<{
  position: "start" | "end";
}>;

export type NavbarContainerProps = ModifierProps & NavbarContainerModifierProps;

export const NavbarContainer = asExoticComponent<NavbarContainerProps, "div">(
  (props, ref) => {
    const { as, position, ...rest } = transformModifiers(props);
    rest.className = cx(rest.className, {
      [`navbar-${position}`]: position,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);

NavbarContainer.defaultProps = Object.assign(
  { position: "start" },
  NavbarContainer.defaultProps,
);
