import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HeroFooterProps = ModifierProps;

export const HeroFooter = forwardRefAs<HeroFooterProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("hero-foot", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");
