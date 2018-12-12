import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type SelectOptionProps = Prefer<
  ModifierProps,
  React.OptionHTMLAttributes<HTMLOptionElement>
>;

export const SelectOption = React.forwardRef<
  HTMLOptionElement,
  SelectOptionProps
>((props, ref) => <option ref={ref} {...transformModifiers(props)} />);
