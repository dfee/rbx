import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { MenuLabel } from "./menu-label";
import { MenuList } from "./menu-list";

export type MenuModifierProps = Partial<{ className: string }>;

export type MenuProps = ModifierProps & MenuModifierProps;

export const Menu = Object.assign(
  forwardRefAs<MenuProps, "aside">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = classNames("menu", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "aside" },
  ),
  {
    Label: MenuLabel,
    List: MenuList,
  },
);
