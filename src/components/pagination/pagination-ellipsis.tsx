import classNames from "classNames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type PaginationEllipsisProps = HelpersProps;

export const PaginationEllipsis = forwardRefAs<
  PaginationEllipsisProps,
  "span"
>(
  ({ className, ...rest }, ref) => (
    <li>
      <Generic
        className={classNames("pagination-ellipsis", className)}
        ref={ref}
        {...rest}
      />
    </li>
  ),
  {
    as: "span",
    children: "…",
  },
);
