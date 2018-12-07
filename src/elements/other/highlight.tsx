import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type HighlightModifierProps = Partial<{ className: string }>;
export type HighlightProps = ModifierProps & HighlightModifierProps;

export const Highlight = forwardRefAs<HighlightProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("highlight", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
