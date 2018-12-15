import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type DropdownContentModifierProps = Partial<{ className: string }>;

export type DropdownContentProps = HelpersProps & DropdownContentModifierProps;

export const DropdownContent = forwardRefAs<DropdownContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("dropdown-content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
