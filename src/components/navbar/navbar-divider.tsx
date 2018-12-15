import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type NavbarDividerProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarDivider = forwardRefAs<NavbarDividerProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("navbar-divider", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
