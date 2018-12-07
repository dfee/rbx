import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";

export const TEXTAREA_SIZES = tuple("small", "medium", "large");
export type TextareSizes = (typeof TEXTAREA_SIZES)[number];

export const TEXTAREA_STATES = tuple("focused", "hovered");
export type TextareaStates = (typeof TEXTAREA_STATES)[number];

export type TextareaModifierProps = Partial<{
  color: Colors;
  disabled: boolean;
  fixedSize: boolean;
  name: string;
  readOnly: boolean;
  rows: number;
  size: TextareSizes;
  state: TextareaStates;
  value: string;
}>;

export type TextareaProps = Prefer<
  ModifierProps & TextareaModifierProps,
  React.HTMLAttributes<HTMLTextAreaElement>
>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { color, fixedSize, size, state, ...rest } = transformModifiers(
      props,
    );
    rest.className = cx("textarea", rest.className, {
      "has-fixed-size": fixedSize,
      [`is-${color}`]: color,
      [`is-${size}`]: size,
      [`is-${state}`]: state,
    });
    return <textarea ref={ref} {...rest} />;
  },
);

Textarea.defaultProps = {
  disabled: false,
  readOnly: false,
  rows: 4,
};
