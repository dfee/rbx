import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationNextProps = ModifierProps;

export const PaginationNext = forwardRefAs<PaginationNextProps, "a">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("pagination-next", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "a",
);

PaginationNext.defaultProps = Object.assign(
  { children: "Next page" },
  PaginationNext.defaultProps,
);
