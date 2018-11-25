import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";

export type ProgressModifierProps = Partial<{
  className: string;
  color: Colors;
  size: "small" | "medium" | "large";
  style: {};
}> & {
  // todo: https://github.com/couds/react-bulma-components/issues/112
  max: number;
  value: number;
};

export type ProgressProps = ModifierProps &
  ProgressModifierProps &
  Partial<
    Omit<
      React.ComponentPropsWithoutRef<"progress">,
      "color" | "max" | "value" | "unselectable"
    >
  >;

const Progress = React.forwardRef<HTMLProgressElement, ProgressProps>(
  ({ className, value, max, color, size, ...props }, ref) => (
    <Element
      ref={ref}
      renderAs="progress"
      {...props}
      value={value}
      max={max}
      className={cx("progress", className, {
        [`is-${color}`]: color,
        [`is-${size}`]: size,
      })}
    />
  ),
);

export default Progress;
