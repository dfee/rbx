import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { MenuListItem } from "./menu-list-item";

export type MenuListProps = HelpersProps;

export const MenuList = Object.assign(
  forwardRefAs<MenuListProps, "ul">(
    ({ className, ...rest }, ref) => (
      <Generic
        className={classNames("menu-list", className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "ul" },
  ),
  { Item: MenuListItem },
);

MenuList.displayName = "Menu.List";
