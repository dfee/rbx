import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type NavbarLinkModifierProps = Partial<{
  arrowless: boolean;
  className: string;
}>;

export type NavbarLinkProps = HelpersProps & NavbarLinkModifierProps;

export const NavbarLink = forwardRefAs<NavbarLinkProps, "span">(
  (props, ref) => {
    const { as, arrowless, ...rest } = transformHelpers(props);
    rest.className = classNames("navbar-link", rest.className, {
      "is-arrowless": arrowless,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
