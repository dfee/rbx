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
      <Generic className={classNames("menu", className)} ref={ref} {...rest} />
    ),
    { as: "aside" },
  ),
  {
    Label: MenuLabel,
    List: MenuList,
  },
);

Menu.displayName = "Menu";
