import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { tuple } from "../../utils";
import { PaginationEllipsis } from "./pagination-ellipsis";
import { PaginationLink } from "./pagination-link";
import { PaginationList } from "./pagination-list";
import { PaginationNext } from "./pagination-next";
import { PaginationPrevious } from "./pagination-previous";

export const PAGINATION_ALIGNMENTS = tuple("centered", "right");
export type PaginationAlignments = (typeof PAGINATION_ALIGNMENTS)[number];

export const PAGINATION_SIZES = tuple("small", "medium", "large");
export type PaginationSizes = (typeof PAGINATION_SIZES)[number];

export type PaginationModifiers = Partial<{
  align: PaginationAlignments;
  className: string;
  rounded: boolean;
  size: PaginationSizes;
}>;

export type PaginationProps = ModifierProps & PaginationModifiers;

export const Pagination = Object.assign(
  forwardRefAs<PaginationProps, "nav">(
    (props, ref) => {
      const { as, align, rounded, size, ...rest } = transformModifiers(props);
      rest.className = classNames("pagination", rest.className, {
        [`is-${align}`]: align,
        "is-rounded": rounded,
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "nav" },
  ),
  {
    Ellipsis: PaginationEllipsis,
    Link: PaginationLink,
    List: PaginationList,
    Next: PaginationNext,
    Previous: PaginationPrevious,
  },
);
