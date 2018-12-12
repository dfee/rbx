import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
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
  className: string;
  color: Colors;
  readOnly: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
  rounded: boolean;
  size: InputSizes;
  state: InputStates;
  static: boolean;
  type: InputTypes;
}>;

export type InputProps = ModifierProps & InputModifierProps;

export const Input = forwardRefAs<InputProps, "input">(
  (props, ref) => {
    const {
      as,
      color,
      readOnly,
      rounded,
      size,
      state,
      static: isStatic,
      ...rest
    } = transformModifiers(props);
    rest.className = classNames("input", rest.className, {
      [`is-${color}`]: color,
      "is-rounded": rounded,
      [`is-${size}`]: size,
      "is-static": isStatic,
      [`is-${state}`]: state,
    });
    return React.createElement(as!, {
      readOnly: readOnly || isStatic,
      ref,
      ...rest,
    });
  },
  { as: "input" },
);
