import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const PAGINATION_STEP_DEFAULTS = {
  directions: tuple("next", "previous"),
};

export interface PaginationStepVariablesOverrides {}

export interface PaginationStepVariablesDefaults {
  directions: (typeof PAGINATION_STEP_DEFAULTS["directions"])[number];
}

export type PaginationStepVariables = Prefer<
  PaginationStepVariablesOverrides,
  PaginationStepVariablesDefaults
>;

export type PaginationStepModifierProps = {
  direction: PaginationStepVariables["directions"];
};

export type PaginationStepProps = HelpersProps & PaginationStepModifierProps;

const propTypes = {
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export const PaginationStep = Object.assign(
  forwardRefAs<PaginationStepProps, "a">(
    ({ className, direction, ...rest }, ref) => (
      <Generic
        className={classNames(
          { [`pagination-${direction}`]: direction },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "a" },
  ),
  { propTypes },
);
