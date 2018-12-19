import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { MenuLabel } from "./menu-label";
import { MenuList } from "./menu-list";

export type MenuProps = HelpersProps;

export const Menu = Object.assign(
  forwardRefAs<MenuProps, "aside">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("menu", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "aside" },
  ),
  {
    Label: MenuLabel,
    List: MenuList,
    propTypes: genericPropTypes,
  },
);
