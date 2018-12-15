import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type NavbarStartModifierProps = Partial<{ className: string }>;

export type NavbarStartProps = ModifierProps & NavbarStartModifierProps;

export const NavbarStart = forwardRefAs<NavbarStartProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("navbar-start", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
