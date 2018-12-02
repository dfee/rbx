import { cx } from "emotion";
import React from "react";

import { Generic } from "@/extras/generic";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export interface ProgressModifierProps {
  color?: Colors;
  size?: "small" | "medium" | "large";
  max: number;
  value: number;
}

export type ProgressProps = Prefer<
  ModifierProps & ProgressModifierProps,
  React.HTMLAttributes<HTMLProgressElement>
>;

export const Progress = React.forwardRef<HTMLProgressElement, ProgressProps>(
  (props, ref) => {
    const { color, max, size, value, ...rest } = props;
    rest.className = cx("progress", rest.className, {
      [`is-${color}`]: color,
      [`is-${size}`]: size,
    });
    return (
      <Generic<"progress">
        as="progress"
        max={max}
        ref={ref}
        value={value}
        {...rest}
      />
    );
  },
);
