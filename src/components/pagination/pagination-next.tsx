import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationNextModifierProps = Partial<{ className: string }>;

export type PaginationNextProps = ModifierProps & PaginationNextModifierProps;

export const PaginationNext = forwardRefAs<PaginationNextProps, "a">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("pagination-next", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "a",
    children: "Next page",
  },
);
