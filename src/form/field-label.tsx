import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const FILED_LABEL_SIZES = tuple("small", "normal", "medium", "large");
export type FieldLabelSizes = (typeof FILED_LABEL_SIZES)[number];

export type FieldLabelModifierProps = Partial<{
  size: FieldLabelSizes;
}>;

export type FieldLabelProps = ModifierProps & FieldLabelModifierProps;

export const FieldLabel = forwardRefAs<FieldLabelProps, "div">((props, ref) => {
  const { as, size, ...rest } = transformModifiers(props);
  rest.className = cx("field-label", rest.className, {
    [`is-${size}`]: size,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");
