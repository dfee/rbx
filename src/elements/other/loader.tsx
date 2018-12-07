import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type LoaderProps = ModifierProps;

export const Loader = forwardRefAs<LoaderProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("loader", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");

Loader.defaultProps = Object.assign({ children: null }, Loader.defaultProps);
