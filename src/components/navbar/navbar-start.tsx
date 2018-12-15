import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type NavbarStartModifierProps = Partial<{ className: string }>;

export type NavbarStartProps = HelpersProps & NavbarStartModifierProps;

export const NavbarStart = forwardRefAs<NavbarStartProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("navbar-start", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
