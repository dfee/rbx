import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { SelectContainer } from "./select-container";
import { SelectOption } from "./select-option";

export type SelectProps = Prefer<
  ModifierProps,
  React.SelectHTMLAttributes<HTMLSelectElement>
>;

export const Select = Object.assign(
  forwardRefAs<SelectProps, "select">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "select" },
  ),
  {
    Container: SelectContainer,
    Option: SelectOption,
  },
);
