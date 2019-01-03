import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

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
