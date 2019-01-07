import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type DropdownContentProps = HelpersProps;

export const DropdownContent = forwardRefAs<DropdownContentProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("dropdown-content", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
