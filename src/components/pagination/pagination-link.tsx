import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type PaginationLinkModifiers = Partial<{
  className: string;
  current: boolean;
}>;

export type PaginationLinkProps = ModifierProps & PaginationLinkModifiers;

export const PaginationLink = forwardRefAs<PaginationLinkProps, "a">(
  (props, ref) => {
    const { as, current, ...rest } = transformModifiers(props);
    rest.className = classNames("pagination-link", rest.className, {
      "is-current": current,
    });
    return <li children={React.createElement(as!, { ref, ...rest })} />;
  },
  { as: "a" },
);
