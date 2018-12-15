import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Colors } from "../../base/helpers";
import { tuple } from "../../utils";

export const PROGRESS_SIZES = tuple("small", "medium", "large");
export type ProgressSizes = (typeof PROGRESS_SIZES)[number];

export interface ProgressModifierProps {
  className?: string;
  color?: Colors;
  size?: ProgressSizes;
  max: number;
  value: number;
}

export type ProgressProps = HelpersProps & ProgressModifierProps;

export const Progress = forwardRefAs<ProgressProps, "progress">(
  (props, ref) => {
    const { as, color, size, ...rest } = transformHelpers(props);
    rest.className = classNames("progress", rest.className, {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "progress" },
);
