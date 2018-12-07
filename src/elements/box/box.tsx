import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type BoxProps = ModifierProps;

export const Box = forwardRefAs<BoxProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("box", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");
