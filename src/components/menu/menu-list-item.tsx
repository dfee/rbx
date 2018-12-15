import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type MenuListItemModifierProps = Partial<{
  active: boolean;
  className: string;
  menu: React.ReactNode;
}>;

export type MenuListItemProps = HelpersProps & MenuListItemModifierProps;

export const MenuListItem = forwardRefAs<MenuListItemProps, "a">(
  (props, ref) => {
    const { active, as, menu, ...rest } = transformHelpers(props);
    rest.className =
      classNames({ "is-active": active }, rest.className) || undefined;
    return (
      <li>
        {React.createElement(as!, { ref, ...rest })}
        {menu && menu}
      </li>
    );
  },
  { as: "a" },
);
