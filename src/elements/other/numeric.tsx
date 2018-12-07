import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type NumericModifierProps = Partial<{ className: string }>;

export type NumericProps = ModifierProps & NumericModifierProps;

export const Numeric = forwardRefAs<NumericProps, "p">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("number", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "p" },
);
