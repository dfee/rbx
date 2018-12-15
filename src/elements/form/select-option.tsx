import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type SelectOptionModifierProps = Partial<{ className: string }>;
export type SelectOptionProps = HelpersProps & SelectOptionModifierProps;

export const SelectOption = forwardRefAs<SelectOptionProps, "option">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "option" },
);
