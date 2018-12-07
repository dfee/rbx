import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationPreviousModifierProps = Partial<{ className: string }>;
export type PaginationPreviousProps = ModifierProps &
  PaginationPreviousModifierProps;

export const PaginationPrevious = forwardRefAs<PaginationPreviousProps, "a">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("pagination-previous", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "a",
    children: "Previous",
  },
);
