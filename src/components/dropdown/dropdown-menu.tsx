import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type DropdownMenuProps = HelpersProps;

export const DropdownMenu = forwardRefAs<DropdownMenuProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("dropdown-menu", className)}
      {...rest}
    />
  ),
  { as: "div" },
);

DropdownMenu.displayName = "Dropdown.Menu";
