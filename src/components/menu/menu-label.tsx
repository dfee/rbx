import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type MenuLabelModifierProps = Partial<{ className: string }>;

export type MenuLabelProps = HelpersProps & MenuLabelModifierProps;

export const MenuLabel = forwardRefAs<MenuLabelProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("menu-label", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
