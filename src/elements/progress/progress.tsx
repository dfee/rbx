import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const PROGRESS_DEFAULTS = {
  sizes: tuple("small", "medium", "large"),
};

export interface ProgressVariablesOverrides {}

export interface ProgressVariablesDefaults {
  sizes: (typeof PROGRESS_DEFAULTS["sizes"])[number];
}

export type ProgressVariables = Prefer<
  ProgressVariablesOverrides,
  ProgressVariablesDefaults
>;

export interface ProgressModifierProps {
  color?: Variables["colors"];
  max: number;
  size?: ProgressVariables["sizes"];
  value: number;
}

export type ProgressProps = HelpersProps & ProgressModifierProps;

const propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.number.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.number.isRequired,
};

export const Progress = Object.assign(
  forwardRefAs<ProgressProps, "progress">(
    ({ className, color, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "progress",
          {
            [`is-${color}`]: color,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "progress" },
  ),
  { propTypes },
);
