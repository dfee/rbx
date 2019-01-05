import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type MenuListItemModifierProps = Partial<{
  active: boolean;
  menu: React.ReactNode;
}>;

export type MenuListItemProps = HelpersProps & MenuListItemModifierProps;

const propTypes = {
  active: PropTypes.bool,
  menu: PropTypes.node,
};

export const MenuListItem = Object.assign(
  forwardRefAs<MenuListItemProps, "a">(
    ({ active, className, menu, ...rest }, ref) => (
      <li>
        <Generic
          className={classNames({ "is-active": active }, className)}
          ref={ref}
          {...rest}
        />
        {menu}
      </li>
    ),
    { as: "a" },
  ),
  { propTypes },
);
