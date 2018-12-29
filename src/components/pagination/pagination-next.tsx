import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PaginationNextProps = HelpersProps;

export const PaginationNext = forwardRefAs<PaginationNextProps, "a">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("pagination-next", className)}
      ref={ref}
      {...rest}
    />
  ),
  {
    as: "a",
    children: "Next page",
  },
);
