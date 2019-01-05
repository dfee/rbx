import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Colors, COLORS } from "src/base/helpers";
import { tuple } from "src/utils";

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
