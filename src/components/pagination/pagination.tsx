import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

import { PaginationEllipsis } from "./pagination-ellipsis";
import { PaginationLink } from "./pagination-link";
import { PaginationList } from "./pagination-list";
import { PaginationStep } from "./pagination-step";

export const PAGINATION_DEFAULTS = {
  alignments: ["centered", "right"] as const,
  sizes: ["small", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaginationVariablesOverrides {}

export interface PaginationVariablesDefaults {
  alignments: (typeof PAGINATION_DEFAULTS["alignments"])[number];
  sizes: (typeof PAGINATION_DEFAULTS["sizes"])[number];
}

export type PaginationVariables = Prefer<
  PaginationVariablesOverrides,
  PaginationVariablesDefaults
>;

export type PaginationModifiers = {
  align?: PaginationVariables["alignments"];
  rounded?: boolean;
  size?: PaginationVariables["sizes"];
};

export type PaginationProps = HelpersProps & PaginationModifiers;

export const Pagination = Object.assign(
  forwardRefAs<PaginationProps>(
    ({ align, className, rounded, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "pagination",
          {
            [`is-${align}`]: align,
            "is-rounded": rounded,
            [`is-${size}`]: size,
          },
          className,
        )}
        {...rest}
      />
    ),
    { as: "nav" },
  ),
  {
    DEFAULTS: PAGINATION_DEFAULTS,
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
