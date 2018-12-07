import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type FooterProps = ModifierProps;

export const Footer = forwardRefAs<FooterProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("footer", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");
