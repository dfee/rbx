import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type FieldLabelModifierProps = Partial<{
  size: "small" | "normal" | "medium" | "large";
}>;

export type FieldLabelProps = ModifierProps & FieldLabelModifierProps;

export const FieldLabel = asExoticComponent<FieldLabelProps, "div">(
  (props, ref) => {
    const { as, size, ...rest } = modify(props);
    rest.className = cx("field-label", rest.className, {
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
