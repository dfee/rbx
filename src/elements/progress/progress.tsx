import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
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
  ...genericPropTypes,
  color: PropTypes.oneOf(COLORS),
  max: PropTypes.number,
  size: PropTypes.oneOf(PROGRESS_SIZES),
  value: PropTypes.number,
};

export const Progress = Object.assign(
  forwardRefAs<ProgressProps, "progress">(
    (props, ref) => {
      const { as, color, size, ...rest } = transformHelpers(props);
      rest.className = classNames("progress", rest.className, {
        [`is-${color}`]: color,
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "progress" },
  ),
  { propTypes },
);
