import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";
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
