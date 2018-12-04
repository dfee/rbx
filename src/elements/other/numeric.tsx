import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NumericProps = ModifierProps;

export const Numeric = forwardRefAs<NumericProps, "p">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("number", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "p");
