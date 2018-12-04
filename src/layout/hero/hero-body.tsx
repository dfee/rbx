import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HeroBodyProps = ModifierProps;

export const HeroBody = forwardRefAs<HeroBodyProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("hero-body", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");
