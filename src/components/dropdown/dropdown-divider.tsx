import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type DropdownDividerProps = HelpersProps;

export const DropdownDivider = forwardRefAs<DropdownDividerProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("dropdown-divider", className)}
      {...rest}
    />
  ),
  { as: "hr" },
);

DropdownDivider.displayName = "Dropdown.Divider";
