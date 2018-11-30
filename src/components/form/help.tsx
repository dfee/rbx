import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export type HelpModifierProps = Partial<{
  color: Colors;
}>;

export type HelpProps = ModifierProps & HelpModifierProps;

export const Help = forwardRefAs<HelpProps, "p">((props, ref) => {
  const { as, color, ...rest } = transformModifiers(props);
  rest.className = cx("help", rest.className, {
    [`is-${color}`]: color,
  });
  return React.createElement(as!, { ref, ...rest });
}, "p");
