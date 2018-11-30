import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ContentModifierProps = Partial<{
  children: React.ReactNode;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
}>;

export type ContentProps = ModifierProps & ContentModifierProps;

export const Content = asExoticComponent<ContentProps, "div">((props, ref) => {
  const { as, size, ...rest } = transformModifiers(props);
  rest.className = cx("content", rest.className, {
    [`is-${size}`]: size,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");
