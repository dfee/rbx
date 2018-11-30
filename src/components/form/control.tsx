import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ControlModifierProps = Partial<{
  fullwidth: boolean;
  iconLeft: boolean;
  iconRight: boolean;
  loading: boolean;
  size: "small" | "medium" | "large";
}>;

export type ControlProps = ModifierProps & ControlModifierProps;

export const Control = forwardRefAs<ControlProps, "div">((props, ref) => {
  const {
    as,
    fullwidth,
    iconLeft,
    iconRight,
    loading,
    size,
    ...rest
  } = transformModifiers(props);
  rest.className = cx("control", rest.className, {
    "has-icons-left": iconLeft,
    "has-icons-right": iconRight,
    "is-expanded": fullwidth,
    "is-loading": loading,
    [`is-${size}`]: size,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");

Control.defaultProps = Object.assign(
  {
    fullwidth: false,
    iconLeft: false,
    iconRight: false,
    loading: false,
  },
  Control.defaultProps,
);
