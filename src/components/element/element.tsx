import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type ElementProps = ModifierProps;

export const Element = forwardRefAs<ElementProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  return React.createElement(as!, { ref, ...rest });
}, "div");
