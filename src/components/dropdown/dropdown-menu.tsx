import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type DropdownMenuProps = HelpersProps;

export const DropdownMenu = forwardRefAs<DropdownMenuProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("dropdown-menu", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
