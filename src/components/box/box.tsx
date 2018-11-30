import { cx } from "emotion";
import * as React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type BoxModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
}>;

export type BoxProps = ModifierProps & BoxModifierProps;

export const Box = asExoticComponent<BoxProps, "div">((props, ref) => {
  const { as, children, ...rest } = modify(props);
  rest.className = cx("box", rest.className);
  return React.createElement(as!, { children, ref, ...rest });
}, "div");
