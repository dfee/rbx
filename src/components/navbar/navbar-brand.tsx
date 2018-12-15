import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type NavbarBrandProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarBrand = forwardRefAs<NavbarBrandProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("navbar-brand", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
