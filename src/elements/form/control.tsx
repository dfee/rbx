import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const CONTROL_SIZES = tuple("small", "medium", "large");
export type ControlSizes = (typeof CONTROL_SIZES)[number];

export type ControlModifierProps = Partial<{
  expanded: boolean;
  iconLeft: boolean;
  iconRight: boolean;
  loading: boolean;
  size: ControlSizes;
}>;

export type ControlProps = ModifierProps & ControlModifierProps;

export const Control = forwardRefAs<ControlProps, "div">((props, ref) => {
  const {
    as,
    expanded,
    iconLeft,
    iconRight,
    loading,
    size,
    ...rest
  } = transformModifiers(props);
  rest.className = cx("control", rest.className, {
    "has-icons-left": iconLeft,
    "has-icons-right": iconRight,
    "is-expanded": expanded,
    "is-loading": loading,
    [`is-${size}`]: size,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");
