import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { MenuListItem } from "./menu-list-item";

export type MenuListModifierProps = Partial<{
  title: string;
}>;

export type MenuListProps = ModifierProps &
  MenuListModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"ul">, "unselectable">>;

interface MenuList extends React.ForwardRefExoticComponent<MenuListProps> {
  Item: typeof MenuListItem;
}

export const MenuList = Object.assign(
  React.forwardRef<HTMLUListElement, MenuListProps>(
    ({ className, title, ...props }, ref) => (
      <React.Fragment>
        {title && <p className="menu-label">{title}</p>}
        <Element
          ref={ref}
          renderAs="ul"
          className={cx("menu-list", className)}
          {...props}
        />
      </React.Fragment>
    ),
  ),
  { Item: MenuListItem },
);
