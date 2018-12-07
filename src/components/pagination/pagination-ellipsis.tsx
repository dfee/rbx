import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationEllipsisProps = ModifierProps;

export const PaginationEllipsis = forwardRefAs<PaginationEllipsisProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("pagination-ellipsis", rest.className);
    return <li children={React.createElement(as!, { ref, ...rest })} />;
  },
  "span",
);

PaginationEllipsis.defaultProps = Object.assign(
  { children: "…" },
  PaginationEllipsis.defaultProps,
);
