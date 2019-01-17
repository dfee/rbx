import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PaginationListProps = HelpersProps;

export const PaginationList = forwardRefAs<PaginationListProps, "ul">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("pagination-list", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "ul" },
);

PaginationList.displayName = "Pagination.List";
