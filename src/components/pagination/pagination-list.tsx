import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PaginationListModifierProps = Partial<{ className: string }>;

export type PaginationListProps = HelpersProps & PaginationListModifierProps;

export const PaginationList = forwardRefAs<PaginationListProps, "ul">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("pagination-list", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "ul" },
);
