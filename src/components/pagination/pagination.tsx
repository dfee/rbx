import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { PaginationEllipsis } from "./pagination-ellipsis";
import { PaginationLink } from "./pagination-link";
import { PaginationList } from "./pagination-list";
import { PaginationStep } from "./pagination-step";

export const PAGINATION_DEFAULTS = {
  alignments: tuple("centered", "right"),
  sizes: tuple("small", "medium", "large"),
};

export interface PaginationVariablesOverrides {}

export interface PaginationVariablesDefaults {
  alignments: (typeof PAGINATION_DEFAULTS["alignments"])[number];
  sizes: (typeof PAGINATION_DEFAULTS["sizes"])[number];
}

export type PaginationVariables = Prefer<
  PaginationVariablesOverrides,
  PaginationVariablesDefaults
>;

export type PaginationModifiers = Partial<{
  align: PaginationVariables["alignments"];
  rounded: boolean;
  size: PaginationVariables["sizes"];
}>;

export type PaginationProps = HelpersProps & PaginationModifiers;

export const Pagination = Object.assign(
  forwardRefAs<HTMLElement, PaginationProps>(
    ({ align, className, rounded, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "pagination",
          {
            [`is-${align}`]: align,
            "is-rounded": rounded,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "nav" },
  ),
  {
    Ellipsis: PaginationEllipsis,
    Link: PaginationLink,
    List: PaginationList,
    Step: PaginationStep,
  },
);

Pagination.displayName = "Pagination";
Pagination.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rounded: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
