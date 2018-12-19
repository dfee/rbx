import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type MenuLabelProps = HelpersProps;

export const MenuLabel = Object.assign(
  forwardRefAs<MenuLabelProps, "p">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("menu-label", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "p" },
  ),
  { propTypes: genericPropTypes },
);
