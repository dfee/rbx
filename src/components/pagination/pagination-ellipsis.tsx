import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PaginationEllipsisProps = HelpersProps;

export const PaginationEllipsis = forwardRefAs<
  HTMLSpanElement,
  PaginationEllipsisProps
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

PaginationEllipsis.displayName = "Pagination.Ellipsis";
