import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Colors, COLORS } from "../../base/helpers";
import { tuple } from "../../utils";

export const PROGRESS_SIZES = tuple("small", "medium", "large");
export type ProgressSizes = (typeof PROGRESS_SIZES)[number];

export interface ProgressModifierProps {
  color?: Colors;
  max: number;
  size?: ProgressSizes;
  value: number;
}

export type ProgressProps = HelpersProps & ProgressModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
  max: PropTypes.number.isRequired,
  size: PropTypes.oneOf(PROGRESS_SIZES),
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
