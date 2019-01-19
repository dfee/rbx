import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type DropdownMenuProps = HelpersProps;

export const DropdownMenu = forwardRefAs<DropdownMenuProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("dropdown-menu", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

DropdownMenu.displayName = "Dropdown.Menu";
