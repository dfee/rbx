import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const PAGINATION_STEP_DEFAULTS = {
  alignments: ["next", "previous"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

export const PaginationStep = Object.assign(
  forwardRefAs<PaginationStepProps>(
    ({ align, className, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames({ [`pagination-${align}`]: align }, className)}
        {...rest}
      />
    ),
    { as: "a" },
  ),
  {
    DEFAULTS: PAGINATION_STEP_DEFAULTS,
  },
);

PaginationStep.displayName = "Pagination.Step";
PaginationStep.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
