import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type PaginationListProps = HelpersProps;

export const PaginationList = forwardRefAs<PaginationListProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("pagination-list", className)}
      {...rest}
    />
  ),
  { as: "ul" },
);

PaginationList.displayName = "Pagination.List";
