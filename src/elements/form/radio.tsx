import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type RadioProps = Prefer<
  HelpersProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export const Radio = forwardRefAs<RadioProps, "input">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    return React.createElement(as!, { ref, type: "radio", ...rest });
  },
  { as: "input" },
);
