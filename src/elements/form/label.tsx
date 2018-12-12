import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";

export const LABEL_SIZES = tuple("small", "medium", "large");
export type LabelSizes = (typeof LABEL_SIZES)[number];

export type LabelModifierProps = Partial<{
  disabled: boolean;
  size: LabelSizes;
}>;

export type LabelProps = Prefer<
  ModifierProps & LabelModifierProps,
  React.LabelHTMLAttributes<HTMLLabelElement>
>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const { disabled, size, ...rest } = transformModifiers(props);
    let kind = "label";
    React.Children.forEach(rest.children, (child, i) => {
      if (typeof child === "object") {
        if (
          child.type === Checkbox ||
          (child.type === "input" && child.props.type === "checkbox")
        ) {
          kind = "checkbox";
        } else if (
          child.type === Radio ||
          (child.type === "input" && child.props.type === "radio")
        ) {
          kind = "radio";
        }
      }
    });
    rest.className = cx(rest.className, {
      "is-disabled": disabled,
      [`is-${size}`]: size,
      [`${kind}`]: kind,
    });
    return <label {...rest} ref={ref} />;
  },
);
