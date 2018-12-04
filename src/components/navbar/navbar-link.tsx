import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarLinkModifierProps = Partial<{
  arrowless: boolean;
}>;

export type NavbarLinkProps = ModifierProps & NavbarLinkModifierProps;

export const NavbarLink = forwardRefAs<NavbarLinkProps, "span">(
  (props, ref) => {
    const { as, arrowless, ...rest } = transformModifiers(props);
    rest.className = cx("navbar-link", rest.className, {
      "is-arrowless": arrowless,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "span",
);
