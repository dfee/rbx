import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type DropdownContentProps = HelpersProps;

export const DropdownContent = forwardRefAs<DropdownContentProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("dropdown-content", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

DropdownContent.displayName = "Dropdown.Content";
