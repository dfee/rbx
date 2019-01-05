import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { MenuLabel } from "./menu-label";
import { MenuList } from "./menu-list";

export type MenuProps = HelpersProps;

export const Menu = Object.assign(
  forwardRefAs<MenuProps, "aside">(
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
