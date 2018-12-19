import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type MenuListItemModifierProps = Partial<{
  active: boolean;
  menu: React.ReactNode;
}>;

export type MenuListItemProps = HelpersProps & MenuListItemModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
  menu: PropTypes.node,
};

export const MenuListItem = Object.assign(
  forwardRefAs<MenuListItemProps, "a">(
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
  ),
  { propTypes },
);
