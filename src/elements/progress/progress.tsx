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

export type ProgressModifierProps = Partial<{
  color: Variables["colors"];
  max: number;
  size: ProgressVariables["sizes"];
  value: number;
}>;

export type ProgressProps = HelpersProps & ProgressModifierProps;

export const Progress = forwardRefAs<HTMLProgressElement, ProgressProps>(
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
  {
    as: "progress",
    max: 100,
    value: 0,
  },
);

Progress.displayName = "Progress";
Progress.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.number,
};
