import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";

export const INPUT_SIZES = tuple("small", "medium", "large");
export type InputSizes = (typeof INPUT_SIZES)[number];

export const INPUT_STATES = tuple("focused", "hovered");
export type InputStates = (typeof INPUT_STATES)[number];

export const INPUT_TYPES = tuple(
  "text",
  "email",
  "tel",
  "password",
  "number",
  "search",
  "color",
  "date",
  "time",
);
export type InputTypes = (typeof INPUT_TYPES)[number];

export type InputModifierProps = Partial<{
  color: Colors;
  rounded: boolean;
  size: InputSizes;
  state: InputStates;
  static: boolean;
  type: InputTypes;
}>;

export type InputProps = Prefer<
  ModifierProps & InputModifierProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      color,
      readOnly,
      rounded,
      size,
      state,
      static: isStatic,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("input", rest.className, {
      [`is-${color}`]: color,
      "is-rounded": rounded,
      [`is-${size}`]: size,
      "is-static": isStatic,
      [`is-${state}`]: state,
    });
    return <input ref={ref} readOnly={readOnly || isStatic} {...rest} />;
  },
);
