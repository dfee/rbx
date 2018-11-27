import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { MenuList } from "./menu-list";

export type MenuProps = ModifierProps;

export const Menu = Object.assign(
  renderAsExoticComponent<MenuProps, "aside">(
    ({ className, ...props }, ref) => (
      <Element {...props} ref={ref} className={cx("menu", className)} />
    ),
    "aside",
  ),
  { List: MenuList },
);
