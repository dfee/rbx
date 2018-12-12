import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type CheckboxProps = Prefer<
  ModifierProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => (
    <input ref={ref} type="checkbox" {...transformModifiers(props)} />
  ),
);
