import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { Colors } from "../../base/helpers";

export type HelpModifierProps = Partial<{
  className: string;
  color: Colors;
}>;

export type HelpProps = HelpersProps & HelpModifierProps;

export const Help = forwardRefAs<HelpProps, "p">(
  (props, ref) => {
    const { as, color, ...rest } = transformHelpers(props);
    rest.className = classNames("help", rest.className, {
      [`is-${color}`]: color,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
