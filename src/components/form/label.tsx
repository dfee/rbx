import { cx } from "emotion";
import React from "react";

import { ModifierProps, modify } from "@/modifiers";

export type LabelModifierProps = Partial<{
  htmlFor: string;
  size: "small" | "medium" | "large";
}>;

export type LabelProps = Prefer<
  ModifierProps & LabelModifierProps,
  React.HTMLAttributes<HTMLLabelElement>
>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const { size, ...rest } = modify(props);
    rest.className = cx("label", rest.className, {
      [`is-${size}`]: size,
    });
    return <label {...rest} ref={ref} />;
  },
);
