import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type MenuListItemModifierProps = Partial<{
  active: boolean;
  className: string;
  menu: React.ReactNode;
}>;

export type MenuListItemProps = ModifierProps & MenuListItemModifierProps;

export const MenuListItem = forwardRefAs<MenuListItemProps, "a">(
  (props, ref) => {
    const { active, as, menu, ...rest } = transformModifiers(props);
    rest.className = classNames({ "is-active": active }, rest.className) || undefined;
    return (
      <li>
        {React.createElement(as!, { ref, ...rest })}
        {menu && menu}
      </li>
    );
  },
  { as: "a" },
);
