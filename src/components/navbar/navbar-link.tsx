import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarLinkModifierProps = Partial<{
  arrowless: boolean;
  className: string;
}>;

export type NavbarLinkProps = ModifierProps & NavbarLinkModifierProps;

export const NavbarLink = forwardRefAs<NavbarLinkProps, "span">(
  (props, ref) => {
    const { as, arrowless, ...rest } = transformModifiers(props);
    rest.className = classNames("navbar-link", rest.className, {
      "is-arrowless": arrowless,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
