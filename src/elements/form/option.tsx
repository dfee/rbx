import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";

export type OptionModifierProps = Partial<{
  selected: boolean;
  value: string;
}>;

export type OptionProps = Prefer<
  ModifierProps & OptionModifierProps,
  React.HTMLAttributes<HTMLOptionElement>
>;

export const Option = React.forwardRef<HTMLOptionElement, OptionProps>(
  (props, ref) => {
    const modified = transformModifiers(props);
    return <option ref={ref} {...modified} />;
  },
);
