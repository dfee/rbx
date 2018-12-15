import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { MenuListItem } from "./menu-list-item";

export type MenuListModifierProps = Partial<{ className: string }>;

export type MenuListProps = HelpersProps & MenuListModifierProps;

export const MenuList = Object.assign(
  forwardRefAs<MenuListProps, "ul">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("menu-list", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "ul" },
  ),
  {
    Item: MenuListItem,
  },
);
