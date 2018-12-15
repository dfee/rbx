import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { Colors } from "../../modifiers/color";

export type HelpModifierProps = Partial<{
  className: string;
  color: Colors;
}>;

export type HelpProps = ModifierProps & HelpModifierProps;

export const Help = forwardRefAs<HelpProps, "p">(
  (props, ref) => {
    const { as, color, ...rest } = transformModifiers(props);
    rest.className = classNames("help", rest.className, {
      [`is-${color}`]: color,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
