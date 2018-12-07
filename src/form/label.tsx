import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const LABEL_SIZES = tuple("small", "medium", "large");
export type LabelSizes = (typeof LABEL_SIZES)[number];

export type LabelModifierProps = Partial<{
  htmlFor: string;
  size: LabelSizes;
}>;

export type LabelProps = Prefer<
  ModifierProps & LabelModifierProps,
  React.HTMLAttributes<HTMLLabelElement>
>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const { size, ...rest } = transformModifiers(props);
    rest.className = cx("label", rest.className, {
      [`is-${size}`]: size,
    });
    return <label {...rest} ref={ref} />;
  },
);
