import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type BoxModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}>;

export type BoxProps = ModifierProps & BoxModifierProps;

export const Box = forwardRefAs<BoxProps, "div">((props, ref) => {
  const { as, children, ...rest } = transformModifiers(props);
  rest.className = cx("box", rest.className);
  return React.createElement(as!, { children, ref, ...rest });
}, "div");
