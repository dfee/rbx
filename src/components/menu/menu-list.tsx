import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { MenuListItem } from "./menu-list-item";

export type MenuListModifierProps = Partial<{ className: string }>;

export type MenuListProps = ModifierProps & MenuListModifierProps;

export const MenuList = Object.assign(
  forwardRefAs<MenuListProps, "ul">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = classNames("menu-list", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "ul" },
  ),
  {
    Item: MenuListItem,
  },
);
