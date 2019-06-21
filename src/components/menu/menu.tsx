import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { MenuLabel } from "./menu-label";
import { MenuList } from "./menu-list";

export type MenuProps = HelpersProps;

export const Menu = Object.assign(
  forwardRefAs<MenuProps>(
    ({ className, ...rest }, ref) => (
      <Generic ref={ref} className={classNames("menu", className)} {...rest} />
    ),
    { as: "aside" },
  ),
  {
    Label: MenuLabel,
    List: MenuList,
  },
);

Menu.displayName = "Menu";
