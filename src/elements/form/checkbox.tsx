import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type CheckboxProps = ModifierProps;

export const Checkbox = forwardRefAs<CheckboxProps, "input">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    return React.createElement(as!, { ref, type: "checkbox", ...rest });
  },
  { as: "input" },
);
