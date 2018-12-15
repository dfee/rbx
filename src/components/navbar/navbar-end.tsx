import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type NavbarEndModifierProps = Partial<{ className: string }>;

export type NavbarEndProps = HelpersProps & NavbarEndModifierProps;

export const NavbarEnd = Object.assign(
  forwardRefAs<NavbarEndProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("navbar-end", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
);
