import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationEllipsisModifierProps = Partial<{ className: string }>;

export type PaginationEllipsisProps = ModifierProps &
  PaginationEllipsisModifierProps;

export const PaginationEllipsis = forwardRefAs<PaginationEllipsisProps, "span">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("pagination-ellipsis", rest.className);
    return <li children={React.createElement(as!, { ref, ...rest })} />;
  },
  {
    as: "span",
    children: "…",
  },
);
