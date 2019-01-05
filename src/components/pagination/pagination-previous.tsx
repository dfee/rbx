import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type PaginationPreviousProps = HelpersProps;

export const PaginationPrevious = forwardRefAs<
  PaginationPreviousProps,
  "a"
>(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("pagination-previous", className)}
      ref={ref}
      {...rest}
    />
  ),
  {
    as: "a",
    children: "Previous",
  },
);
