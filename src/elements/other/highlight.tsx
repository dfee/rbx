import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HighlightProps = ModifierProps;

export const Highlight = forwardRefAs<HighlightProps, "p">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("highlight", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "p");
