import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PaginationEllipsisProps = HelpersProps;

export const PaginationEllipsis = forwardRefAs<PaginationEllipsisProps>(
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
