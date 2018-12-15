import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PaginationEllipsisModifierProps = Partial<{ className: string }>;

export type PaginationEllipsisProps = HelpersProps &
  PaginationEllipsisModifierProps;

export const PaginationEllipsis = forwardRefAs<PaginationEllipsisProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("pagination-ellipsis", rest.className);
    return <li children={React.createElement(as!, { ref, ...rest })} />;
  },
  {
    as: "span",
    children: "…",
  },
);
