import { cx } from "emotion";
import React from "react";

import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export type TextareaModifierProps = Partial<{
  color: Colors;
  disabled: boolean;
  name: string;
  readOnly: boolean;
  rows: number;
  size: "small" | "medium" | "large";
  value: string;
}>;

export type TextareaProps = Prefer<
  ModifierProps & TextareaModifierProps,
  React.HTMLAttributes<HTMLTextAreaElement>
>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { color, size, ...rest } = modify(props);
    rest.className = cx("textarea", rest.className, {
      [`is-${size}`]: size,
      [`is-${color}`]: color,
    });
    return <textarea ref={ref} {...rest} />;
  },
);

Textarea.defaultProps = {
  disabled: false,
  readOnly: false,
  rows: 4,
};
