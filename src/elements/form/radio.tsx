import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type RadioProps = Prefer<
  HelpersProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export const Radio = Object.assign(
  forwardRefAs<RadioProps, "input">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      return React.createElement(as!, { ref, type: "radio", ...rest });
    },
    { as: "input" },
  ),
  { propTypes: genericPropTypes },
);
