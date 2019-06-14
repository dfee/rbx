import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const PAGINATION_STEP_DEFAULTS = {
  alignments: ["next", "previous"] as const,
};

export interface PaginationStepVariablesOverrides {}

export interface PaginationStepVariablesDefaults {
  alignments: (typeof PAGINATION_STEP_DEFAULTS["alignments"])[number];
}

export type PaginationStepVariables = Prefer<
  PaginationStepVariablesOverrides,
  PaginationStepVariablesDefaults
>;

export type PaginationStepModifierProps = {
  align: PaginationStepVariables["alignments"];
};

export type PaginationStepProps = HelpersProps & PaginationStepModifierProps;

export const PaginationStep = forwardRefAs<PaginationStepProps>(
  ({ align, className, ...rest }, ref) => (
    <Generic
      className={classNames({ [`pagination-${align}`]: align }, className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "a" },
);

PaginationStep.displayName = "Pagination.Step";
PaginationStep.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
