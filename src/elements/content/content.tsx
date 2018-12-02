import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ContentModifierProps = Partial<{
  className: string;
  size: "small" | "medium" | "large";
}>;

export type ContentProps = ModifierProps & ContentModifierProps;

export const Content = forwardRefAs<ContentProps, "div">((props, ref) => {
  const { as, size, ...rest } = transformModifiers(props);
  rest.className = cx("content", rest.className, {
    [`is-${size}`]: size,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");
