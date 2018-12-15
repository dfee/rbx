import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type DropdownMenuModifierProps = Partial<{ className: string }>;
export type DropdownMenuProps = HelpersProps & DropdownMenuModifierProps;

export const DropdownMenu = forwardRefAs<DropdownMenuProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("dropdown-menu", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
