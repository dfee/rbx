import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const LABEL_SIZES = tuple("small", "medium", "large");
export type LabelSizes = (typeof LABEL_SIZES)[number];

export const LABEL_SPECIFIERS = tuple("checkbox", "label", "radio");
export type LabelSpecifiers = (typeof LABEL_SPECIFIERS)[number];

export type LabelModifierProps = Partial<{
  disabled: boolean;
  size: LabelSizes;
  specifier: LabelSpecifiers;
}>;

export type LabelProps = Prefer<
  ModifierProps & LabelModifierProps,
  React.LabelHTMLAttributes<HTMLLabelElement>
>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const { disabled, size, specifier, ...rest } = transformModifiers(props);
    rest.className = cx(rest.className, {
      "is-disabled": disabled,
      [`is-${size}`]: size,
      [`${specifier}`]: specifier,
    });
    return <label {...rest} ref={ref} />;
  },
);

Label.defaultProps = { specifier: "label" };
