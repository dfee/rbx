import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HeadingProps = ModifierProps;

export const Heading = forwardRefAs<HeadingProps, "p">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("heading", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "p");
