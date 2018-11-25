import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import MenuList from "./components/list";

export type MenuProps = ModifierProps;

type Menu = RenderAsExoticComponent<MenuProps, "aside"> & {
  List: typeof MenuList;
};

const Menu: Partial<Menu> = renderAsExoticComponent<MenuProps, "aside">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("menu", className)} />
  ),
  "aside",
);

Menu.List = MenuList;

export default Menu as Menu;
