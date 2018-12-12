import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type RadioProps = Prefer<
  ModifierProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export const Radio = forwardRefAs<RadioProps, "input">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    return React.createElement(as!, { ref, type: "radio", ...rest });
  },
  { as: "input" },
);
