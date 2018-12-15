import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type NavbarBrandProps = Prefer<
  HelpersProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const NavbarBrand = forwardRefAs<NavbarBrandProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("navbar-brand", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
