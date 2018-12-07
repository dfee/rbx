import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarStartProps = ModifierProps;

export const NavbarStart = forwardRefAs<NavbarStartProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("navbar-start", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
