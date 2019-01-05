import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type DropdownDividerProps = HelpersProps;

export const DropdownDivider = forwardRefAs<DropdownDividerProps, "hr">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("dropdown-divider", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "hr" },
);
