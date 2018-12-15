import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type NumericModifierProps = Partial<{ className: string }>;

export type NumericProps = HelpersProps & NumericModifierProps;

export const Numeric = forwardRefAs<NumericProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("number", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
