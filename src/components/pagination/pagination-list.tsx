import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationListProps = ModifierProps;

export const PaginationList = forwardRefAs<PaginationListProps, "ul">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("pagination-list", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "ul",
);
