import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationListModifierProps = Partial<{ className: string }>;

export type PaginationListProps = ModifierProps & PaginationListModifierProps;

export const PaginationList = forwardRefAs<PaginationListProps, "ul">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("pagination-list", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "ul" },
);
