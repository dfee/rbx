import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";

export const PROGRESS_SIZES = tuple("small", "medium", "large");
export type ProgressSizes = (typeof PROGRESS_SIZES)[number];

export interface ProgressModifierProps {
  className?: string;
  color?: Colors;
  size?: ProgressSizes;
  max: number;
  value: number;
}

export type ProgressProps = ModifierProps & ProgressModifierProps;

export const Progress = forwardRefAs<ProgressProps, "progress">(
  (props, ref) => {
    const { as, color, size, ...rest } = props;
    rest.className = cx("progress", rest.className, {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "progress" },
);
