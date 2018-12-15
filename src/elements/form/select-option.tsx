import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type SelectOptionModifierProps = Partial<{ className: string }>;
export type SelectOptionProps = ModifierProps & SelectOptionModifierProps;

export const SelectOption = forwardRefAs<SelectOptionProps, "option">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "option" },
);
