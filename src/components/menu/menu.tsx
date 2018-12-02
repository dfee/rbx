import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { MenuList } from "./menu-list";

export type MenuProps = ModifierProps;

export const Menu = Object.assign(
  forwardRefAs<MenuProps, "aside">((props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("menu", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "aside"),
  { List: MenuList },
);
