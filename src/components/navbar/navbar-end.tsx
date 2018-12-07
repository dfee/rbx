import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NavbarEndProps = ModifierProps;

export const NavbarEnd = Object.assign(
  forwardRefAs<NavbarEndProps, "div">((props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("navbar-end", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "div"),
);
