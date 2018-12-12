import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarEndModifierProps = Partial<{ className: string }>;

export type NavbarEndProps = ModifierProps & NavbarEndModifierProps;

export const NavbarEnd = Object.assign(
  forwardRefAs<NavbarEndProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = classNames("navbar-end", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
);
