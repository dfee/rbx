import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export type HelpModifierProps = Partial<{
  color: Colors;
}>;

export type HelpProps = ModifierProps & HelpModifierProps;

export const Help = asExoticComponent<HelpProps, "p">((props, ref) => {
  const { as, color, ...rest } = modify(props);
  rest.className = cx("help", rest.className, {
    [`is-${color}`]: color,
  });
  return React.createElement(as!, { ref, ...rest });
}, "p");
