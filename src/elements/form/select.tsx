import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { SelectContainer } from "./select-container";
import { SelectOption } from "./select-option";

export type SelectProps = Prefer<
  HelpersProps,
  React.SelectHTMLAttributes<HTMLSelectElement>
>;

export const Select = Object.assign(
  forwardRefAs<SelectProps, "select">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "select" },
  ),
  {
    Container: SelectContainer,
    Option: SelectOption,
    propTypes: genericPropTypes,
  },
);
