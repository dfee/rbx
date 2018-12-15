import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type PaginationPreviousModifierProps = Partial<{ className: string }>;
export type PaginationPreviousProps = HelpersProps &
  PaginationPreviousModifierProps;

export const PaginationPrevious = forwardRefAs<PaginationPreviousProps, "a">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("pagination-previous", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "a",
    children: "Previous",
  },
);
