import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type RadioProps = Prefer<
  ModifierProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => (
    <input ref={ref} type="radio" {...transformModifiers(props)} />
  ),
);
