import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PaginationNextModifierProps = Partial<{ className: string }>;

export type PaginationNextProps = HelpersProps & PaginationNextModifierProps;

export const PaginationNext = forwardRefAs<PaginationNextProps, "a">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("pagination-next", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "a",
    children: "Next page",
  },
);
