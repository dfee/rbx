import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FieldLabelModifierProps = Partial<{
  size: "small" | "normal" | "medium" | "large";
}>;

export type FieldLabelProps = ModifierProps & FieldLabelModifierProps;

export const FieldLabel = forwardRefAs<FieldLabelProps, "div">((props, ref) => {
  const { as, size, ...rest } = transformModifiers(props);
  rest.className = cx("field-label", rest.className, {
    [`is-${size}`]: size,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");
