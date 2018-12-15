import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type CheckboxProps = HelpersProps;

export const Checkbox = forwardRefAs<CheckboxProps, "input">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    return React.createElement(as!, { ref, type: "checkbox", ...rest });
  },
  { as: "input" },
);
