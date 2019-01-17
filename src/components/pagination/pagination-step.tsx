import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const PAGINATION_STEP_DEFAULTS = {
  alignments: tuple("next", "previous"),
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

export const PaginationStep = forwardRefAs<PaginationStepProps, "a">(
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
