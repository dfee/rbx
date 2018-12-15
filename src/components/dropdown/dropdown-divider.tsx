import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type DropdownDividerModifierProps = Partial<{ className: string }>;

export type DropdownDividerProps = HelpersProps & DropdownDividerModifierProps;

export const DropdownDivider = forwardRefAs<DropdownDividerProps, "hr">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("dropdown-divider", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "hr" },
);
