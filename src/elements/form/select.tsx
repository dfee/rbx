import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { SelectContainer } from "./select-container";
import { SelectOption } from "./select-option";

export type SelectProps = Prefer<
  ModifierProps,
  React.SelectHTMLAttributes<HTMLSelectElement>
>;

export const Select = Object.assign(
  React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => (
    <select ref={ref} {...transformModifiers(props)} />
  )),
  {
    Container: SelectContainer,
    Option: SelectOption,
  },
);
